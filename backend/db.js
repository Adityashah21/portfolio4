import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "db.json");
export const uploadsDir = path.join(__dirname, "uploads");

// Ensure data and uploads directories exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const initialData = {
  users: [],
  resume_url: "/resume.pdf",
  projects: [
    {
      id: "rescrafted-mern-marketplace",
      title: "ResCrafted — Recycled Items Marketplace",
      description: "Full-stack MERN e-commerce marketplace for buying and selling recycled/second-hand products supporting 100+ listings. Features JWT authentication, product search & multi-category filtering, 10+ RESTful APIs, and comprehensive CRUD with image uploads.",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "JWT",
        "REST API"
      ],
      live_url: "https://github.com/Adityashah21/ResCrafted",
      repo_url: "https://github.com/Adityashah21/ResCrafted",
      image_url: null,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "warmspace-wellness-platform",
      title: "WarmSpace — Emotional Wellness Platform",
      description: "Deployed full-stack MERN emotional wellness platform featuring anonymous community interactions, digital journaling, peer badge system, and real-time bidirectional messaging powered by Socket.IO with JWT session security.",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.IO",
        "JWT",
        "Tailwind CSS"
      ],
      live_url: "https://github.com/Adityashah21/WarmSpace",
      repo_url: "https://github.com/Adityashah21/WarmSpace",
      image_url: null,
      sort_order: 2,
      created_at: "2026-10-18T16:00:00.000000+00:00",
    },
    {
      id: "webslinger-questfolio",
      title: "Web-Slinger Questfolio & Admin System",
      description: "Gamified full-stack developer portfolio and content management control room. Engineered with React 18, TypeScript, Tailwind CSS, and a Node/Express backend with JWT authentication and file upload pipelines.",
      tech: [
        "React.js",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Tailwind CSS",
        "JWT",
        "Multer"
      ],
      live_url: "https://github.com/Adityashah21",
      repo_url: "https://github.com/Adityashah21",
      image_url: null,
      sort_order: 3,
      created_at: "2026-10-18T17:00:00.000000+00:00",
    },
  ],
  skills: [
    {
      id: "skill-javascript",
      name: "JavaScript (ES6+)",
      category: "Languages",
      level: 90,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-react",
      name: "React.js & Router",
      category: "Frontend",
      level: 88,
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-nodejs",
      name: "Node.js & Express.js",
      category: "Backend",
      level: 85,
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-mongodb",
      name: "MongoDB & Mongoose",
      category: "Databases",
      level: 82,
      sort_order: 4,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-java",
      name: "Java & OOPs",
      category: "Languages",
      level: 80,
      sort_order: 5,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-dsa",
      name: "Data Structures & Algorithms",
      category: "Core CS",
      level: 85,
      sort_order: 6,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-socketio",
      name: "Socket.IO & Real-Time Events",
      category: "Backend",
      level: 80,
      sort_order: 7,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-tailwind",
      name: "Tailwind CSS & Responsive UI",
      category: "Frontend",
      level: 90,
      sort_order: 8,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-sql",
      name: "SQL & Relational DBs",
      category: "Databases",
      level: 78,
      sort_order: 9,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "skill-git",
      name: "Git & GitHub Workflow",
      category: "Tools",
      level: 85,
      sort_order: 10,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
  certifications: [
    {
      id: "cert-nptel-dsa",
      title: "NPTEL Elite (Silver) — Data Structures and Algorithms",
      issuer: "IIT Kanpur",
      issued_on: "Jul–Oct 2023",
      credential_url: "https://nptel.ac.in/",
      image_url: null,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "cert-yukti-hackathon",
      title: "Yukti Startup Hackathon — Top 7 Finalist",
      issuer: "Yukti Innovation Initiative",
      issued_on: "2024",
      credential_url: null,
      image_url: null,
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "cert-sih",
      title: "Smart India Hackathon — College Round Qualifier",
      issuer: "Ministry of Education / AICTE",
      issued_on: "2024 & 2025",
      credential_url: null,
      image_url: null,
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
  interests: [
    {
      id: "interest-mern",
      name: "MERN Stack",
      emoji: "⚛️",
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "interest-dsa",
      name: "DSA & Problem Solving",
      emoji: "🧩",
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "interest-realtime",
      name: "Socket.IO & Real-Time",
      emoji: "⚡",
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "interest-ai",
      name: "AI-Powered Apps",
      emoji: "🤖",
      sort_order: 4,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "interest-system",
      name: "REST API Architecture",
      emoji: "🛠️",
      sort_order: 5,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "interest-cloud",
      name: "Cloud Deployment",
      emoji: "☁️",
      sort_order: 6,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
};

export function readDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }
  try {
    const raw = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file:", err);
    return initialData;
  }
}

export function writeDb(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing database file:", err);
    return false;
  }
}
