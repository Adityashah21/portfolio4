import React from "react";
import { Skill, getTier } from "../types";
import { Zap } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
  totalXp: number;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  totalXp,
}) => {
  return (
    <section
      id="skills"
      className="border-y-[3px] border-ink bg-card/60"
      data-reveal
    >
      <div className="portfolio-shell py-24 md:py-28">
        <div className="mb-8 flex items-end gap-4">
          <span className="font-pixel text-[10px] text-accent">ISSUE #02</span>
          <h2 className="comic-title text-5xl text-foreground md:text-6xl">
            SKILL TREE
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6">
          <p className="max-w-lg leading-7 text-muted-foreground">
            Comprehensive technical competencies across modern frontend frameworks, backend runtimes, database architecture, and core computer science.
          </p>
          <span className="inline-flex items-center gap-2 font-pixel text-[10px] text-xp">
            <Zap className="size-5" /> {totalXp} TOTAL XP
          </span>
        </div>

        {skills.length === 0 && (
          <div className="flex min-h-52 flex-col items-center justify-center gap-4 text-center">
            <Zap className="size-12 text-accent" />
            <p className="font-comic text-3xl">NEW ABILITIES LOADING…</p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.id} className="comic-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-comic text-2xl tracking-wide">
                  {skill.name}
                </span>
                <span className="font-pixel text-[9px] text-accent">
                  {getTier(skill.level)} · LV {skill.level}
                </span>
              </div>
              <p className="font-pixel text-[8px] text-muted-foreground">
                {skill.category.toUpperCase()}
              </p>
              <div className="mt-3 h-4 border-2 border-ink bg-muted overflow-hidden">
                <div
                  className="xp-bar h-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
