import { PortfolioData } from "../types";
export const BASE_URL = "https://portfolio4-qzqy.onrender.com";

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
export const initialPortfolioData: PortfolioData = {
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
      created_at: "2026-10-18T15:38:36.782834+00:00"
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
      created_at: "2026-10-18T16:00:00.000000+00:00"
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
      created_at: "2026-10-18T17:00:00.000000+00:00"
    }
  ],
  skills: [
    {
      id: "skill-javascript",
      name: "JavaScript (ES6+)",
      category: "Languages",
      level: 90,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-react",
      name: "React.js & Router",
      category: "Frontend",
      level: 88,
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-nodejs",
      name: "Node.js & Express.js",
      category: "Backend",
      level: 85,
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-mongodb",
      name: "MongoDB & Mongoose",
      category: "Databases",
      level: 82,
      sort_order: 4,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-java",
      name: "Java & OOPs",
      category: "Languages",
      level: 80,
      sort_order: 5,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-dsa",
      name: "Data Structures & Algorithms",
      category: "Core CS",
      level: 85,
      sort_order: 6,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-socketio",
      name: "Socket.IO & Real-Time Events",
      category: "Backend",
      level: 80,
      sort_order: 7,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-tailwind",
      name: "Tailwind CSS & Responsive UI",
      category: "Frontend",
      level: 90,
      sort_order: 8,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-sql",
      name: "SQL & Relational DBs",
      category: "Databases",
      level: 78,
      sort_order: 9,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "skill-git",
      name: "Git & GitHub Workflow",
      category: "Tools",
      level: 85,
      sort_order: 10,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    }
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
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "cert-yukti-hackathon",
      title: "Yukti Startup Hackathon — Top 7 Finalist",
      issuer: "Yukti Innovation Initiative",
      issued_on: "2024",
      credential_url: null,
      image_url: null,
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "cert-sih",
      title: "Smart India Hackathon — College Round Qualifier",
      issuer: "Ministry of Education / AICTE",
      issued_on: "2024 & 2025",
      credential_url: null,
      image_url: null,
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    }
  ],
  interests: [
    {
      id: "interest-mern",
      name: "MERN Stack",
      emoji: "⚛️",
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "interest-dsa",
      name: "DSA & Problem Solving",
      emoji: "🧩",
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "interest-realtime",
      name: "Socket.IO & Real-Time",
      emoji: "⚡",
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "interest-ai",
      name: "AI-Powered Apps",
      emoji: "🤖",
      sort_order: 4,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "interest-system",
      name: "REST API Architecture",
      emoji: "🛠️",
      sort_order: 5,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    },
    {
      id: "interest-cloud",
      name: "Cloud Deployment",
      emoji: "☁️",
      sort_order: 6,
      created_at: "2026-10-18T15:38:36.782834+00:00"
    }
  ],
};

const STORAGE_KEY = "questfolio_data_v2";
const TOKEN_KEY = "questfolio_token";
const USER_KEY = "questfolio_user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthSession(token: string, user: any) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): any | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getLocalPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read localStorage:", err);
  }
  return initialPortfolioData;
}

export function saveLocalPortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${BASE_URL}/api/portfolio`);
    if (res.ok) {
      const data = await res.json();
      saveLocalPortfolioData(data);
      return data;
    }
  } catch (e) {
    console.warn("Backend API fetch failed, falling back to local cache:", e);
  }

  return getLocalPortfolioData();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  setAuthSession(data.token, data.user);
  return data;
}

export async function register(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }
  setAuthSession(data.token, data.user);
  return data;
}

export async function uploadFile(file: File): Promise<{ url: string; filename: string }> {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "File upload failed");
  }
  return data;
}

export async function addItem(table: keyof PortfolioData, item: any): Promise<void> {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/api/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      return;
    }
  } catch (e) {
    console.warn(`Backend POST to ${table} failed, updating local fallback:`, e);
  }

  // Local fallback
  const local = getLocalPortfolioData();
  const newItem = {
    ...item,
    id: item.id || crypto.randomUUID(),
    created_at: item.created_at || new Date().toISOString(),
  };
  local[table] = [...(local[table] as any[]), newItem];
  saveLocalPortfolioData(local);
}

export async function deleteItem(table: keyof PortfolioData, id: string): Promise<void> {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/api/${table}/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (res.ok) {
      return;
    }
  } catch (e) {
    console.warn(`Backend DELETE from ${table} failed, updating local fallback:`, e);
  }

  // Local fallback
  const local = getLocalPortfolioData();
  local[table] = (local[table] as any[]).filter((x) => String(x.id) !== String(id));
  saveLocalPortfolioData(local);
}
