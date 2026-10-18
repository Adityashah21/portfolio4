import React, { useEffect } from "react";
import { PortfolioData } from "../types";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { JourneySection } from "../components/JourneySection";
import { CertificationsSection } from "../components/CertificationsSection";
import { PlaybookSection } from "../components/PlaybookSection";
import { InterestsSection } from "../components/InterestsSection";
import { NextQuestSection } from "../components/NextQuestSection";
import { Footer } from "../components/Footer";

interface PortfolioProps {
  data: PortfolioData;
  onNavigateAdmin: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  data,
  onNavigateAdmin,
}) => {
  const totalXp = data.skills.reduce((acc, s) => acc + s.level, 0);

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const revealElements = document.querySelectorAll("[data-reveal]");
    revealElements.forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [data]);

  return (
    <main className="min-h-screen">
      <Navbar totalXp={totalXp} />
      <Hero />
      <AboutSection
        projectsCount={data.projects.length}
        skillsCount={data.skills.length}
        achievementsCount={data.certifications.length}
      />
      <ProjectsSection projects={data.projects} />
      <SkillsSection skills={data.skills} totalXp={totalXp} />
      <JourneySection />
      <CertificationsSection certifications={data.certifications} />
      <PlaybookSection />
      <InterestsSection interests={data.interests} />
      <NextQuestSection />
      <Footer onNavigateAdmin={onNavigateAdmin} />
    </main>
  );
};
