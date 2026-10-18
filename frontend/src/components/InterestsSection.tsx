import React from "react";
import { Interest } from "../types";
import { Gamepad2, Zap } from "lucide-react";

interface InterestsSectionProps {
  interests: Interest[];
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  interests,
}) => {
  return (
    <section
      id="interests"
      className="border-t-[3px] border-ink bg-primary/90 halftone"
      data-reveal
    >
      <div className="portfolio-shell py-24 md:py-28">
        <div className="mb-8 flex items-end gap-4">
          <span className="font-pixel text-[10px] text-accent">ISSUE #04</span>
          <h2 className="comic-title text-5xl text-foreground md:text-6xl">
            PASSIVE PERKS
          </h2>
        </div>
        <p className="mb-10 max-w-xl text-lg leading-8 text-primary-foreground">
          Beyond the main quest — the interests that make this player, this player.
        </p>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <div className="border-l-4 border-accent pl-6">
            <Gamepad2 className="mb-3 size-8 text-accent" />
            <h3 className="font-comic text-4xl">GAMING</h3>
            <p className="mt-3 max-w-sm leading-7 text-primary-foreground">
              Another world, another challenge, another reason to press continue.
            </p>
          </div>
          <div className="border-l-4 border-accent pl-6">
            <Zap className="mb-3 size-8 text-accent" />
            <h3 className="font-comic text-4xl">SPIDER-MAN</h3>
            <p className="mt-3 max-w-sm leading-7 text-primary-foreground">
              A friendly neighbourhood reminder to keep showing up — even when the
              next level gets tough.
            </p>
          </div>
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
