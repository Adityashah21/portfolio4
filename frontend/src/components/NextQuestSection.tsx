import React from "react";
import { Button } from "./ui/button";
import { ArrowUpRight, ArrowDown, Gamepad2, FileDown } from "lucide-react";

export const NextQuestSection: React.FC = () => {
  return (
    <section
      id="next"
      className="mission-finale relative overflow-hidden border-t-[3px] border-ink bg-secondary"
      data-reveal
    >
      <div className="web-corner web-corner-finale" aria-hidden="true" />
      <div className="relative portfolio-shell py-24 md:py-28">
        <p className="font-pixel text-[10px] leading-6 text-accent">
          SAVE POINT REACHED
        </p>
        <h2 className="comic-title mt-5 text-5xl leading-tight sm:text-6xl md:text-7xl">
          THE NEXT QUEST
          <br />
          IS STILL LOADING.
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-secondary-foreground">
          Every project adds another chapter. Explore the builds, check out the
          skills, and come back for the next level.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="comicYellow" size="lg">
            <a href="#projects">
              Replay the quests <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="comic" size="lg">
            <a href="#top">
              Back to spawn <ArrowDown className="size-4 rotate-180" />
            </a>
          </Button>
          <Button asChild variant="comicBlue" size="lg">
            <a
              href="/resume.pdf"
              download="Aditya_Shah_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume <FileDown className="size-4" />
            </a>
          </Button>
        </div>
        <div className="mt-14 flex items-center gap-4 font-pixel text-[8px] leading-6 text-secondary-foreground">
          <Gamepad2 className="size-6 shrink-0" />
          <span>ADITYA SHAH · PLAYER ONE · TO BE CONTINUED</span>
        </div>
      </div>
    </section>
  );
};
