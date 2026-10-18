import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readDb, writeDb, uploadsDir } from "./db.js";
import { authMiddleware, JWT_SECRET } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedBase}_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
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

    const db = readDb();
    const existingUser = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // First user registered becomes the admin
    const isFirstUser = db.users.length === 0;
    const role = isFirstUser ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: crypto.randomUUID(),
      email,
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

    const db = readDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
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
app.get("/api/portfolio", (_req, res) => {
  const db = readDb();
  const sortFn = (a, b) =>
    (a.sort_order || 0) - (b.sort_order || 0) ||
    new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();

  return res.json({
    projects: [...db.projects].sort(sortFn),
    skills: [...db.skills].sort(sortFn),
    certifications: [...db.certifications].sort(sortFn),
    interests: [...db.interests].sort(sortFn),
  });
});

// Upload File (Certificates / Project Images)
app.post("/api/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded." });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  return res.json({
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

// ---------------- PROJECTS CRUD ---------------- //

app.post("/api/projects", authMiddleware, (req, res) => {
  try {
    const { title, description, tech, live_url, repo_url, image_url } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const db = readDb();
    const newProject = {
      id: crypto.randomUUID(),
      title,
      description: description || "",
      tech: Array.isArray(tech)
        ? tech
        : typeof tech === "string"
        ? tech.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      live_url: live_url || null,
      repo_url: repo_url || null,
      image_url: image_url || null,
      sort_order: db.projects.length + 1,
      created_at: new Date().toISOString(),
    };

    db.projects.push(newProject);
    writeDb(db);
    return res.status(201).json(newProject);
  } catch (err) {
    console.error("Create project error:", err);
    return res.status(500).json({ error: "Failed to create project." });
  }
});

app.delete("/api/projects/:id", authMiddleware, (req, res) => {
  const db = readDb();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => String(p.id) !== String(req.params.id));
  if (db.projects.length === initialLength) {
    return res.status(404).json({ error: "Project not found." });
  }
  writeDb(db);
  return res.json({ message: "Project deleted successfully." });
});

// ---------------- SKILLS CRUD ---------------- //

app.post("/api/skills", authMiddleware, (req, res) => {
  try {
    const { name, category, level } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Skill name is required." });
    }

    const db = readDb();
    const parsedLevel = Math.max(0, Math.min(100, Number(level) || 0));
    const newSkill = {
      id: crypto.randomUUID(),
      name,
      category: category || "Code",
      level: parsedLevel,
      sort_order: db.skills.length + 1,
      created_at: new Date().toISOString(),
    };

    db.skills.push(newSkill);
    writeDb(db);
    return res.status(201).json(newSkill);
  } catch (err) {
    console.error("Create skill error:", err);
    return res.status(500).json({ error: "Failed to create skill." });
  }
});

app.delete("/api/skills/:id", authMiddleware, (req, res) => {
  const db = readDb();
  const initialLength = db.skills.length;
  db.skills = db.skills.filter((s) => String(s.id) !== String(req.params.id));
  if (db.skills.length === initialLength) {
    return res.status(404).json({ error: "Skill not found." });
  }
  writeDb(db);
  return res.json({ message: "Skill deleted successfully." });
});

// ---------------- CERTIFICATIONS CRUD ---------------- //

app.post("/api/certifications", authMiddleware, (req, res) => {
  try {
    const { title, issuer, issued_on, credential_url, image_url } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const db = readDb();
    const newCert = {
      id: crypto.randomUUID(),
      title,
      issuer: issuer || "",
      issued_on: issued_on || null,
      credential_url: credential_url || null,
      image_url: image_url || null,
      sort_order: db.certifications.length + 1,
      created_at: new Date().toISOString(),
    };

    db.certifications.push(newCert);
    writeDb(db);
    return res.status(201).json(newCert);
  } catch (err) {
    console.error("Create certification error:", err);
    return res.status(500).json({ error: "Failed to create certification." });
  }
});

app.delete("/api/certifications/:id", authMiddleware, (req, res) => {
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
});

// ---------------- INTERESTS CRUD ---------------- //

app.post("/api/interests", authMiddleware, (req, res) => {
  try {
    const { name, emoji } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = readDb();
    const newInterest = {
      id: crypto.randomUUID(),
      name,
      emoji: emoji || "✨",
      sort_order: db.interests.length + 1,
      created_at: new Date().toISOString(),
    };

    db.interests.push(newInterest);
    writeDb(db);
    return res.status(201).json(newInterest);
  } catch (err) {
    console.error("Create interest error:", err);
    return res.status(500).json({ error: "Failed to create interest." });
  }
});

app.delete("/api/interests/:id", authMiddleware, (req, res) => {
  const db = readDb();
  const initialLength = db.interests.length;
  db.interests = db.interests.filter((i) => String(i.id) !== String(req.params.id));
  if (db.interests.length === initialLength) {
    return res.status(404).json({ error: "Interest not found." });
  }
  writeDb(db);
  return res.json({ message: "Interest deleted successfully." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Web-Slinger Questfolio Backend running on http://localhost:${PORT}`);
});
