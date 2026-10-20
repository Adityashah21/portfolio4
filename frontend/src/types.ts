export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  sort_order: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  sort_order: number;
  created_at?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued_on: string | null;
  credential_url: string | null;
  image_url: string | null;
  sort_order: number;
  created_at?: string;
}

export interface Interest {
  id: string;
  name: string;
  emoji: string;
  sort_order: number;
  created_at?: string;
}

export type PortfolioTable = "projects" | "skills" | "certifications" | "interests";

export interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  interests: Interest[];
  resume_url?: string | null;
}

export function getTier(level: number): "LEGENDARY" | "EPIC" | "RARE" | "COMMON" {
  if (level >= 90) return "LEGENDARY";
  if (level >= 75) return "EPIC";
  if (level >= 50) return "RARE";
  return "COMMON";
}
