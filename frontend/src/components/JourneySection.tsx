import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "./ui/button";
import { GraduationCap, CodeXml, Rocket, Zap } from "lucide-react";

export const JourneySection: React.FC = () => {
  const milestones = [
    {
      icon: GraduationCap,
      label: "MAIN QUEST",
      title: "Engineering at GNIOT",
      copy: "Building a foundation at Greater Noida Institute of Technology.",
      status: "IN PROGRESS",
    },
    {
      icon: CodeXml,
      label: "SIDE QUESTS",
      title: "Projects & practical learning",
      copy: "A place for ideas to become working projects, with live links and code to explore.",
      status: "ONGOING",
    },
    {
      icon: Rocket,
      label: "NEXT CHAPTER",
      title: "Keep growing",
      copy: "More skills to learn, more problems to explore, and more achievements to collect.",
      status: "TO BE CONTINUED",
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
          subtitle="Not a finished story. A new level, a new challenge, and something to learn at every stage."
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
              Engineering is the main quest. Projects and new skills are the
              checkpoints. This portfolio keeps those pieces together as the
              journey grows.
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
