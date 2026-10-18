import React from "react";
import { Skill, getTier } from "../types";

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" className="border-y-[3px] border-ink bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-8 flex items-end gap-4">
          <span className="font-pixel text-[10px] text-accent">ISSUE #02</span>
          <h2 className="comic-title text-5xl text-foreground md:text-6xl">
            SKILL TREE
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.id} className="comic-panel p-5">
              <div className="flex items-center justify-between">
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
