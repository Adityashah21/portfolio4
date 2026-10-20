import { createClient } from "@supabase/supabase-js";
import { PortfolioData, PortfolioTable } from "../types";

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://c--dad51d8b-c18e-58fe-b39e-c6d0284acc05-prod.lovable.cloud";
export const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_sIs5Tb_fwDApcfEVazzXQQ_ayYY6e8T";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const initialPortfolioData: PortfolioData = {
  projects: [
    {
      id: "2553b44e-b258-4ffb-9f22-f1305546c35d",
      title: "Web-Slinger Portfolio",
      description: "This very site — a comic + gaming styled portfolio with its own admin panel.",
      tech: ["React", "TypeScript", "Tailwind"],
      live_url: null,
      repo_url: null,
      image_url: null,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
  skills: [
    {
      id: "3a869f02-1e9b-43f5-88c3-a734546d4606",
      name: "JavaScript",
      category: "Code",
      level: 80,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "c93c6e26-6b58-4a25-9ef6-1f628cd61cc5",
      name: "React",
      category: "Code",
      level: 75,
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "10689962-10dd-47e3-8952-2411e8451925",
      name: "Python",
      category: "Code",
      level: 70,
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "21684b76-d839-4f0d-b613-3b3809b7959b",
      name: "C / C++",
      category: "Code",
      level: 65,
      sort_order: 4,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "6c717b78-cb9f-4dcc-a8bc-47d71622f3e0",
      name: "Git & GitHub",
      category: "Tools",
      level: 70,
      sort_order: 5,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
  certifications: [
    {
      id: "e490991a-bb73-4caa-a2e4-59187486d83e",
      title: "Sample Certificate — replace me",
      issuer: "Issuer name",
      issued_on: "2026",
      credential_url: null,
      image_url: null,
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
  interests: [
    {
      id: "a34a377e-964a-48a0-a367-9fa9e3a6804d",
      name: "Gaming",
      emoji: "🎮",
      sort_order: 1,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "0d3ff63b-780a-4f40-919c-5c7fc1048b53",
      name: "Comics",
      emoji: "🕷️",
      sort_order: 2,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "4f711877-e96d-4cb5-893d-4c4ff304389a",
      name: "Web Dev",
      emoji: "💻",
      sort_order: 3,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
    {
      id: "d8f4b9e5-291b-404f-87d8-2aa8bec478c1",
      name: "Problem Solving",
      emoji: "🧩",
      sort_order: 4,
      created_at: "2026-10-18T15:38:36.782834+00:00",
    },
  ],
};

const STORAGE_KEY = "questfolio_data_v1";

export function getLocalPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
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
    const [pRes, sRes, cRes, iRes] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order").order("created_at"),
      supabase.from("skills").select("*").order("sort_order").order("created_at"),
      supabase.from("certifications").select("*").order("sort_order").order("created_at"),
      supabase.from("interests").select("*").order("sort_order").order("created_at"),
    ]);

    if (!pRes.error && !sRes.error && !cRes.error && !iRes.error) {
      const data: PortfolioData = {
        projects: pRes.data && pRes.data.length > 0 ? pRes.data : initialPortfolioData.projects,
        skills: sRes.data && sRes.data.length > 0 ? sRes.data : initialPortfolioData.skills,
        certifications:
          cRes.data && cRes.data.length > 0 ? cRes.data : initialPortfolioData.certifications,
        interests: iRes.data && iRes.data.length > 0 ? iRes.data : initialPortfolioData.interests,
      };
      saveLocalPortfolioData(data);
      return data;
    }
  } catch (e) {
    console.warn("Supabase fetch failed, falling back to local data:", e);
  }

  return getLocalPortfolioData();
}

export async function addItem(table: PortfolioTable, item: any): Promise<void> {
  const local = getLocalPortfolioData();
  const newItem = {
    ...item,
    id: item.id || crypto.randomUUID(),
    created_at: item.created_at || new Date().toISOString(),
  };

  local[table] = [...(local[table] as any[]), newItem];
  saveLocalPortfolioData(local);

  try {
    await supabase.from(table).insert(item);
  } catch (e) {
    console.warn(`Supabase insert to ${table} failed, saved locally:`, e);
  }
}

export async function deleteItem(table: PortfolioTable, id: string): Promise<void> {
  const local = getLocalPortfolioData();
  local[table] = (local[table] as any[]).filter((x) => String(x.id) !== String(id));
  saveLocalPortfolioData(local);

  try {
    await supabase.from(table).delete().eq("id", id);
  } catch (e) {
    console.warn(`Supabase delete from ${table} failed, deleted locally:`, e);
  }
}
