import React from "react";
import { Button } from "./ui/button";
import { ArrowDown, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./icons/SocialIcons";

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-ink">
      <img
        src="/hero.jpg"
        alt="Comic-style night city laced with glowing webs"
        width={1600}
        height={1008}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="web-corner" aria-hidden="true" />
      <span className="hero-burst hidden lg:flex" aria-hidden="true">
        LEVEL
        <br />
        UP!
      </span>
      <div className="portfolio-shell relative flex min-h-[76vh] flex-col justify-center py-16 md:py-20">
        <p className="font-pixel text-xs text-accent">
          PLAYER 1 · READY <span className="blink">▮</span>
        </p>
        <h1 className="comic-title glitch mt-4 text-7xl leading-none text-foreground md:text-9xl">
          ADITYA
          <br />
          <span className="text-primary">SHAH</span>
        </h1>
        <div className="speech mt-8 max-w-md rounded-sm px-5 py-4 font-comic text-2xl tracking-wide">
          &quot;With great power comes great responsibility.&quot;
        </div>
        <p className="mt-8 max-w-md text-lg text-muted-foreground">
          Engineering student @ Greater Noida Institute of Technology — your friendly neighbourhood developer.
        </p>

        {/* Action Buttons with Download Resume */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="comic" size="lg">
            <a href="#projects">Start Mission</a>
          </Button>
          <Button asChild variant="comicBlue" size="lg">
            <a href="#skills">View Stats</a>
          </Button>
          <Button asChild variant="comicYellow" size="lg">
            <a
              href="/resume.pdf"
              download="Aditya_Shah_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileDown className="size-4" /> Download Resume
            </a>
          </Button>
        </div>

        {/* Social & Coding Profiles */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-pixel text-[9px] text-muted-foreground mr-1">
            PLAYER LINKS:
          </span>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="size-4 text-foreground" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="size-4 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-foreground hover:text-accent transition-colors"
            title="LeetCode Profile"
          >
            <LeetCodeIcon className="size-4 text-[#FFA116]" />
            <span>LeetCode</span>
          </a>
        </div>

        <a
          href="#about"
          className="mt-10 inline-flex w-fit items-center gap-3 font-pixel text-[8px] leading-6 text-accent hover:text-accent-foreground transition-colors"
        >
          <ArrowDown className="scroll-cue size-5" /> THE STORY CONTINUES
        </a>
      </div>
    </section>
  );
};
