import { PortfolioData, PortfolioTable } from "../types";
export const BASE_URL = "https://portfolio4-qzqy.onrender.com";

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
export const initialPortfolioData: PortfolioData = {
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
  skills: [],
  certifications: [
    {
      id: "75847c5a-127a-4505-b49b-fc10d53b06db",
      title: "Web Development for Beginners",
      issuer: "Simplilearn",
      issued_on: "Sep 2025",
      credential_url: null,
      image_url: "/uploads/Simplilearn_Certificate-1_1792614603000_30203.pdf",
      sort_order: 1,
      created_at: "2026-10-21T20:31:37.924Z"
    },
    {
      id: "d325b3c5-83d3-4d98-b0a5-32bc4e576c93",
      title: "JavaScript for Beginners",
      issuer: "Simplilearn",
      issued_on: "Aug 2025",
      credential_url: null,
      image_url: "/uploads/Simplilearn_Certificate_1792614714445_396237.pdf",
      sort_order: 2,
      created_at: "2026-10-21T20:32:33.380Z"
    },
    {
      id: "886fc41d-8755-4539-a721-fa4587e7dcf8",
      title: "Programming Fundamentals using Python – Science Graduates – Foundation Program",
      issuer: "Wingspan",
      issued_on: "Sep 2024",
      credential_url: "https://verify.onwingspan.com",
      image_url: "/uploads/python_1792614762258_897212.pdf",
      sort_order: 3,
      created_at: "2026-10-21T20:33:30.008Z"
    },
    {
      id: "ab07102c-2595-42f6-aa56-9ab5a5845dec",
      title: "Peer Training on Web Development",
      issuer: "GNIOT CSE-Tech Club & Department of Computer Science and Engineering, Greater Noida Institute of Technology (GNIOT)",
      issued_on: "Apr 2025",
      credential_url: null,
      image_url: "/uploads/PT_certificate_1792614818072_288419.pdf",
      sort_order: 4,
      created_at: "2026-10-21T20:35:11.684Z"
    },
    {
      id: "eb122cef-5d2b-4e5c-a9d1-17d17abdb19a",
      title: "Introduction to Front End Development",
      issuer: "Simplilearn",
      issued_on: "Aug 2025",
      credential_url: null,
      image_url: null,
      sort_order: 5,
      created_at: "2026-10-21T20:37:28.386Z"
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

const RESUME_KEY = "questfolio_resume_url";

export function getStoredResumeUrl(): string | null {
  try {
    return localStorage.getItem(RESUME_KEY);
  } catch {
    return null;
  }
}

export function saveStoredResumeUrl(url: string): void {
  try {
    localStorage.setItem(RESUME_KEY, url);
  } catch (err) {
    console.error("Failed to save resume URL to localStorage:", err);
  }
}

export function getLocalPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.resume_url) {
        parsed.resume_url = getStoredResumeUrl() || "/resume.pdf";
      }
      if (Array.isArray(parsed.skills)) {
        parsed.skills = parsed.skills.filter((s: any) => !String(s.id).startsWith("skill-"));
      }
      if (Array.isArray(parsed.certifications)) {
        const dummyCertIds = ["cert-nptel-dsa", "cert-yukti-hackathon", "cert-sih"];
        parsed.certifications = parsed.certifications.filter((c: any) => !dummyCertIds.includes(String(c.id)));
      }
      return parsed;
    }
  } catch (err) {
    console.error("Failed to read localStorage:", err);
  }
  return {
    ...initialPortfolioData,
    resume_url: getStoredResumeUrl() || "/resume.pdf",
  };
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
      const storedResume = getStoredResumeUrl();
      if (!data.resume_url && storedResume) {
        data.resume_url = storedResume;
      }
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

export async function addItem(table: PortfolioTable, item: any): Promise<void> {
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

export async function deleteItem(table: PortfolioTable, id: string): Promise<void> {
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

export async function updateItem(
  table: PortfolioTable,
  id: string,
  item: any
): Promise<void> {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/api/${table}/${id}`, {
      method: "PUT",
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
    console.warn(`Backend PUT to ${table}/${id} failed, updating local fallback:`, e);
  }

  // Local fallback
  const local = getLocalPortfolioData();
  const list = (local[table] as any[]) || [];
  const idx = list.findIndex((x) => String(x.id) === String(id));
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...item, id };
    local[table] = [...list] as any;
    saveLocalPortfolioData(local);
  }
}

export async function updateResume(input: File | string): Promise<{ resume_url: string }> {
  let resumeUrl = "";

  if (typeof input === "string") {
    resumeUrl = input.trim();
  } else {
    // 1. Use the working uploadFile service (/api/upload) to upload the PDF
    const uploadRes = await uploadFile(input);
    resumeUrl = uploadRes.url;
  }

  if (!resumeUrl) {
    throw new Error("No resume file or URL provided.");
  }

  // 2. Persist in local storage immediately
  saveStoredResumeUrl(resumeUrl);
  const local = getLocalPortfolioData();
  local.resume_url = resumeUrl;
  saveLocalPortfolioData(local);

  // 3. Attempt to sync with backend /api/resume if available (gracefully ignore if 404)
  const token = getToken();
  try {
    await fetch(`${BASE_URL}/api/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ resume_url: resumeUrl }),
    });
  } catch (err) {
    console.warn("Backend /api/resume sync skipped or not yet redeployed:", err);
  }

  return { resume_url: resumeUrl };
}

export async function resetResume(): Promise<void> {
  const defaultUrl = "/resume.pdf";
  saveStoredResumeUrl(defaultUrl);
  const local = getLocalPortfolioData();
  local.resume_url = defaultUrl;
  saveLocalPortfolioData(local);

  const token = getToken();
  try {
    await fetch(`${BASE_URL}/api/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ resume_url: defaultUrl }),
    });
  } catch {}
}

