import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readDb, writeDb, uploadsDir } from "./db.js";
import { authMiddleware, JWT_SECRET } from "./middleware/auth.js";
import { connectMongo, isMongoConnected } from "./mongo.js";
import { initCloudinary, isCloudinaryConfigured, uploadToCloudinary } from "./cloudinary.js";
import { User, Project, Skill, Certification, Interest, Setting } from "./models/index.js";

// Initialize Cloud Services if configured in environment variables
initCloudinary();
connectMongo();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to support local development and deployed Vercel frontends
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    try {
      const url = new URL(origin);
      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname.endsWith(".vercel.app") ||
        origin === "https://portfolioadishah.vercel.app"
      ) {
        return callback(null, true);
      }
    } catch {
      // Fall through on malformed origin
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve local uploaded files statically (fallback)
app.use("/uploads", express.static(uploadsDir));

// Memory storage multer to support both Cloudinary cloud streaming and local disk fallback
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

// ---------------- AUTH ROUTES ---------------- //

// Register Admin
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    if (isMongoConnected()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      const totalUsers = await User.countDocuments();
      const role = totalUsers === 0 ? "admin" : "user";

      const newUser = await User.create({
        id: userId,
        email: normalizedEmail,
        password: hashedPassword,
        role,
        created_at: new Date().toISOString(),
      });

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        message: "User registered successfully.",
        token,
        user: { id: newUser.id, email: newUser.email, role: newUser.role },
      });
    }

    // Fallback: Local JSON database
    const db = readDb();
    const existingUser = db.users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const isFirstUser = db.users.length === 0;
    const role = isFirstUser ? "admin" : "user";

    const newUser = {
      id: userId,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      created_at: new Date().toISOString(),
    };

    db.users.push(newUser);
    writeDb(db);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = null;

    if (isMongoConnected()) {
      user = await User.findOne({ email: normalizedEmail });
    } else {
      const db = readDb();
      user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "This account isn't the admin. Access denied, web-head." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Logged in successfully.",
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Current User (Session verification)
app.get("/api/auth/me", authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});

// ---------------- PORTFOLIO ROUTES ---------------- //

// Get all portfolio data
app.get("/api/portfolio", async (_req, res) => {
  try {
    if (isMongoConnected()) {
      const [projects, skills, certifications, interests, resumeSetting] = await Promise.all([
        Project.find().sort({ sort_order: 1, created_at: 1 }).lean(),
        Skill.find().sort({ sort_order: 1, created_at: 1 }).lean(),
        Certification.find().sort({ sort_order: 1, created_at: 1 }).lean(),
        Interest.find().sort({ sort_order: 1, created_at: 1 }).lean(),
        Setting.findOne({ key: "resume_url" }).lean(),
      ]);

      return res.json({
        projects,
        skills,
        certifications,
        interests,
        resume_url: resumeSetting?.value || null,
      });
    }

    // Fallback: Local JSON database
    const db = readDb();
    const sortFn = (a, b) =>
      (a.sort_order || 0) - (b.sort_order || 0) ||
      new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();

    return res.json({
      projects: [...db.projects].sort(sortFn),
      skills: [...db.skills].sort(sortFn),
      certifications: [...db.certifications].sort(sortFn),
      interests: [...db.interests].sort(sortFn),
      resume_url: db.resume_url || null,
    });
  } catch (err) {
    console.error("Get portfolio error:", err);
    return res.status(500).json({ error: "Failed to fetch portfolio data." });
  }
});

// Resume Management (Get current resume or upload/update new resume)
app.get("/api/resume", async (_req, res) => {
  try {
    if (isMongoConnected()) {
      const setting = await Setting.findOne({ key: "resume_url" }).lean();
      if (setting?.value) {
        return res.json({ resume_url: setting.value });
      }
    }
    const db = readDb();
    return res.json({ resume_url: db.resume_url || "/resume.pdf" });
  } catch (err) {
    return res.json({ resume_url: "/resume.pdf" });
  }
});

app.post("/api/resume", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    let resumeUrl = req.body?.resume_url;

    // Handle direct file upload for resume
    if (req.file) {
      if (isCloudinaryConfigured()) {
        try {
          const result = await uploadToCloudinary(req.file.buffer, req.file.originalname || "resume.pdf");
          resumeUrl = result.secure_url;
        } catch (cloudErr) {
          console.warn("⚠️ Cloudinary upload failed for resume, falling back to local storage:", cloudErr.message);
        }
      }
      if (!resumeUrl) {
        const ext = path.extname(req.file.originalname) || ".pdf";
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e6);
        const filename = `resume_${uniqueSuffix}${ext}`;
        const destinationPath = path.join(uploadsDir, filename);
        await fs.promises.writeFile(destinationPath, req.file.buffer);
        resumeUrl = `/uploads/${filename}`;
      }
    }

    if (!resumeUrl) {
      return res.status(400).json({ error: "No resume file or URL provided." });
    }

    if (isMongoConnected()) {
      await Setting.findOneAndUpdate(
        { key: "resume_url" },
        { key: "resume_url", value: resumeUrl },
        { upsert: true, new: true }
      );
    }

    const db = readDb();
    db.resume_url = resumeUrl;
    writeDb(db);

    return res.json({
      message: "Resume updated successfully.",
      resume_url: resumeUrl,
    });
  } catch (err) {
    console.error("Update resume error:", err);
    return res.status(500).json({ error: "Failed to update resume: " + err.message });
  }
});

// Upload File (Certificates / Project Images -> Cloudinary or local disk fallback)
app.post("/api/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded." });
    }

    // 1. If Cloudinary is configured, upload directly to the cloud CDN
    if (isCloudinaryConfigured()) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        return res.json({
          url: result.secure_url,
          filename: result.public_id,
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
          provider: "cloudinary",
        });
      } catch (cloudErr) {
        console.warn("⚠️ Cloudinary upload failed, falling back to local storage:", cloudErr.message);
      }
    }

    // 2. Fallback: Save to local uploads directory
    const ext = path.extname(req.file.originalname);
    const sanitizedBase = path
      .basename(req.file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e6);
    const filename = `${sanitizedBase}_${uniqueSuffix}${ext}`;
    const destinationPath = path.join(uploadsDir, filename);

    await fs.promises.writeFile(destinationPath, req.file.buffer);

    return res.json({
      url: `/uploads/${filename}`,
      filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      provider: "local",
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "File upload failed: " + err.message });
  }
});

// ---------------- PROJECTS CRUD ---------------- //

app.post("/api/projects", authMiddleware, async (req, res) => {
  try {
    const { title, description, tech, live_url, repo_url, image_url } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const techArray = Array.isArray(tech)
      ? tech
      : typeof tech === "string"
      ? tech.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const newProject = {
      id: crypto.randomUUID(),
      title,
      description: description || "",
      tech: techArray,
      live_url: live_url || null,
      repo_url: repo_url || null,
      image_url: image_url || null,
      created_at: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const count = await Project.countDocuments();
      newProject.sort_order = count + 1;
      const created = await Project.create(newProject);
      return res.status(201).json(created);
    }

    const db = readDb();
    newProject.sort_order = db.projects.length + 1;
    db.projects.push(newProject);
    writeDb(db);
    return res.status(201).json(newProject);
  } catch (err) {
    console.error("Create project error:", err);
    return res.status(500).json({ error: "Failed to create project." });
  }
});

app.delete("/api/projects/:id", authMiddleware, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const deleted = await Project.findOneAndDelete({ id: req.params.id });
      if (!deleted) {
        return res.status(404).json({ error: "Project not found." });
      }
      return res.json({ message: "Project deleted successfully." });
    }

    const db = readDb();
    const initialLength = db.projects.length;
    db.projects = db.projects.filter((p) => String(p.id) !== String(req.params.id));
    if (db.projects.length === initialLength) {
      return res.status(404).json({ error: "Project not found." });
    }
    writeDb(db);
    return res.json({ message: "Project deleted successfully." });
  } catch (err) {
    console.error("Delete project error:", err);
    return res.status(500).json({ error: "Failed to delete project." });
  }
});

// ---------------- SKILLS CRUD ---------------- //

app.post("/api/skills", authMiddleware, async (req, res) => {
  try {
    const { name, category, level } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Skill name is required." });
    }

    const parsedLevel = Math.max(0, Math.min(100, Number(level) || 0));
    const newSkill = {
      id: crypto.randomUUID(),
      name,
      category: category || "Code",
      level: parsedLevel,
      created_at: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const count = await Skill.countDocuments();
      newSkill.sort_order = count + 1;
      const created = await Skill.create(newSkill);
      return res.status(201).json(created);
    }

    const db = readDb();
    newSkill.sort_order = db.skills.length + 1;
    db.skills.push(newSkill);
    writeDb(db);
    return res.status(201).json(newSkill);
  } catch (err) {
    console.error("Create skill error:", err);
    return res.status(500).json({ error: "Failed to create skill." });
  }
});

app.delete("/api/skills/:id", authMiddleware, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const deleted = await Skill.findOneAndDelete({ id: req.params.id });
      if (!deleted) {
        return res.status(404).json({ error: "Skill not found." });
      }
      return res.json({ message: "Skill deleted successfully." });
    }

    const db = readDb();
    const initialLength = db.skills.length;
    db.skills = db.skills.filter((s) => String(s.id) !== String(req.params.id));
    if (db.skills.length === initialLength) {
      return res.status(404).json({ error: "Skill not found." });
    }
    writeDb(db);
    return res.json({ message: "Skill deleted successfully." });
  } catch (err) {
    console.error("Delete skill error:", err);
    return res.status(500).json({ error: "Failed to delete skill." });
  }
});

// ---------------- CERTIFICATIONS CRUD ---------------- //

app.post("/api/certifications", authMiddleware, async (req, res) => {
  try {
    const { title, issuer, issued_on, credential_url, image_url } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newCert = {
      id: crypto.randomUUID(),
      title,
      issuer: issuer || "",
      issued_on: issued_on || null,
      credential_url: credential_url || null,
      image_url: image_url || null,
      created_at: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const count = await Certification.countDocuments();
      newCert.sort_order = count + 1;
      const created = await Certification.create(newCert);
      return res.status(201).json(created);
    }

    const db = readDb();
    newCert.sort_order = db.certifications.length + 1;
    db.certifications.push(newCert);
    writeDb(db);
    return res.status(201).json(newCert);
  } catch (err) {
    console.error("Create certification error:", err);
    return res.status(500).json({ error: "Failed to create certification." });
  }
});

app.delete("/api/certifications/:id", authMiddleware, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const deleted = await Certification.findOneAndDelete({ id: req.params.id });
      if (!deleted) {
        return res.status(404).json({ error: "Certification not found." });
      }
      return res.json({ message: "Certification deleted successfully." });
    }

    const db = readDb();
    const initialLength = db.certifications.length;
    db.certifications = db.certifications.filter(
      (c) => String(c.id) !== String(req.params.id)
    );
    if (db.certifications.length === initialLength) {
      return res.status(404).json({ error: "Certification not found." });
    }
    writeDb(db);
    return res.json({ message: "Certification deleted successfully." });
  } catch (err) {
    console.error("Delete certification error:", err);
    return res.status(500).json({ error: "Failed to delete certification." });
  }
});

// ---------------- INTERESTS CRUD ---------------- //

app.post("/api/interests", authMiddleware, async (req, res) => {
  try {
    const { name, emoji } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const newInterest = {
      id: crypto.randomUUID(),
      name,
      emoji: emoji || "✨",
      created_at: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const count = await Interest.countDocuments();
      newInterest.sort_order = count + 1;
      const created = await Interest.create(newInterest);
      return res.status(201).json(created);
    }

    const db = readDb();
    newInterest.sort_order = db.interests.length + 1;
    db.interests.push(newInterest);
    writeDb(db);
    return res.status(201).json(newInterest);
  } catch (err) {
    console.error("Create interest error:", err);
    return res.status(500).json({ error: "Failed to create interest." });
  }
});

app.delete("/api/interests/:id", authMiddleware, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const deleted = await Interest.findOneAndDelete({ id: req.params.id });
      if (!deleted) {
        return res.status(404).json({ error: "Interest not found." });
      }
      return res.json({ message: "Interest deleted successfully." });
    }

    const db = readDb();
    const initialLength = db.interests.length;
    db.interests = db.interests.filter((i) => String(i.id) !== String(req.params.id));
    if (db.interests.length === initialLength) {
      return res.status(404).json({ error: "Interest not found." });
    }
    writeDb(db);
    return res.json({ message: "Interest deleted successfully." });
  } catch (err) {
    console.error("Delete interest error:", err);
    return res.status(500).json({ error: "Failed to delete interest." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Web-Slinger Questfolio Backend running on http://localhost:${PORT}`);
});
