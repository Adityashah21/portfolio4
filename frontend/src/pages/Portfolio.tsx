import React from "react";
import { PortfolioData } from "../types";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { InterestsSection } from "../components/InterestsSection";
import { Footer } from "../components/Footer";

interface PortfolioProps {
  data: PortfolioData;
  onNavigateAdmin: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ data, onNavigateAdmin }) => {
  const totalXp = data.skills.reduce((acc, s) => acc + s.level, 0);

  return (
    <main className="min-h-screen">
      <Navbar totalXp={totalXp} />
      <Hero />
      <ProjectsSection projects={data.projects} />
      <SkillsSection skills={data.skills} />
      <CertificationsSection certifications={data.certifications} />
      <InterestsSection interests={data.interests} />
      <Footer onNavigateAdmin={onNavigateAdmin} />
    </main>
  );
};
