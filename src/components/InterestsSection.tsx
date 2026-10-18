import React from "react";
import { Interest } from "../types";

interface InterestsSectionProps {
  interests: Interest[];
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({ interests }) => {
  return (
    <section
      id="interests"
      className="border-t-[3px] border-ink bg-primary/90 halftone"
    >
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-8 flex items-end gap-4">
          <span className="font-pixel text-[10px] text-accent">ISSUE #04</span>
          <h2 className="comic-title text-5xl text-foreground md:text-6xl">
            PASSIVE PERKS
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {interests.map((interest) => (
            <span
              key={interest.id}
              className="comic-panel comic-hover px-5 py-3 font-comic text-2xl tracking-wide select-none"
            >
              {interest.emoji} {interest.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
