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
          OPEN FOR OPPORTUNITIES
        </p>
        <h2 className="comic-title mt-5 text-5xl leading-tight sm:text-6xl md:text-7xl">
          LET&apos;S BUILD THE
          <br />
          NEXT BIG THING.
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-8 text-secondary-foreground">
          Ready to engineer scalable full-stack applications, architect real-time systems, and solve hard computational challenges. Reach out for collaborations and software engineering roles.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="comicYellow" size="lg">
            <a href="#projects">
              Explore Projects <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="comic" size="lg">
            <a href="mailto:Adityashahofficial22@gmail.com">
              Get in Touch <ArrowUpRight className="size-4" />
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
          <span>ADITYA SHAH · B.TECH CSE &apos;27 · FULL-STACK MERN DEVELOPER</span>
        </div>
      </div>
    </section>
  );
};
