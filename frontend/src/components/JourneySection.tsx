import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./ui/button";
import { GraduationCap, CodeXml, Rocket, Zap } from "lucide-react";

export const JourneySection: React.FC = () => {
  const milestones = [
    {
      icon: GraduationCap,
      label: "CORE MILESTONE",
      title: "B.Tech Computer Science (2023 - 2027)",
      copy: "Greater Noida Institute of Technology — building rigorous foundations in Data Structures, Algorithms, Database Systems, and Object-Oriented Software Design.",
      status: "IN PROGRESS (B.TECH '27)",
    },
    {
      icon: CodeXml,
      label: "DEPLOYMENT MILESTONE",
      title: "Production Web Platforms",
      copy: "Engineered and deployed scalable MERN web applications including ResCrafted (e-commerce marketplace with 10+ REST APIs) and WarmSpace (real-time Socket.IO wellness platform).",
      status: "DEPLOYED & ACTIVE",
    },
    {
      icon: Rocket,
      label: "COMPETITIVE RECOGNITION",
      title: "Hackathons & Certifications",
      copy: "Rank 7 / 500+ teams in Yukti Startup Hackathon, consecutive internal qualifier in Smart India Hackathon ('24 & '25), and NPTEL Elite Silver in DSA from IIT Kanpur.",
      status: "ACHIEVED & EXPANDING",
    },
  ];

  return (
    <section
      id="journey"
      className="border-y-[3px] border-ink bg-card/60"
      data-reveal
    >
      <div className="portfolio-shell py-24 md:py-28">
        <SectionHeader
          issue="CAMPAIGN MODE"
          title="THE ENGINEERING ARC"
          subtitle="Milestones in academic rigor, production-grade software development, and competitive hackathons."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <span className="font-pixel text-[10px] text-xp">
              CURRENT CHAPTER
            </span>
            <h3 className="mt-5 font-comic text-4xl text-accent">
              LEARN. BUILD.
              <br />
              LEVEL UP. REPEAT.
            </h3>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              Driven by architectural excellence and algorithmic problem-solving. Each milestone represents deployed full-stack products, validated credentials, and continuous learning.
            </p>
            <Button asChild variant="comicBlue" className="mt-7">
              <a href="#skills">
                <Zap className="size-4" /> Explore skill tree
              </a>
            </Button>
          </div>

          <ol className="relative space-y-10 border-l-[3px] border-secondary pl-8">
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <li key={m.label} className="relative">
                  <span className="absolute -left-[50px] flex size-9 items-center justify-center border-[3px] border-ink bg-secondary text-secondary-foreground shadow-[var(--shadow-comic)]">
                    <Icon className="size-4" />
                  </span>
                  <p className="font-pixel text-[8px] text-accent">{m.label}</p>
                  <h3 className="mt-3 font-comic text-3xl">{m.title}</h3>
                  <p className="mt-2 max-w-md leading-7 text-muted-foreground">
                    {m.copy}
                  </p>
                  <p className="mt-3 font-pixel text-[8px] leading-5 text-xp">
                    {m.status}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
