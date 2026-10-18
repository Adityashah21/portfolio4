import React from "react";
import { Button } from "./ui/button";
import { ArrowDown, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./icons/SocialIcons";

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-ink">
      {/* Background City Image */}
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

      <div className="portfolio-shell relative flex min-h-[76vh] flex-col justify-center py-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Left Column: Player Info & Name */}
          <div className="max-w-2xl">
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
          </div>

          {/* Right Column: Comic Avatar (Opposite the Name) */}
          <div className="relative mx-auto lg:mr-4 shrink-0 flex items-center justify-center">
            {/* Comic LEVEL UP Burst sticker */}
            <span
              className="hero-burst hidden lg:flex !static lg:!absolute -top-8 -right-6 z-20"
              aria-hidden="true"
            >
              LEVEL
              <br />
              UP!
            </span>

            {/* Avatar Frame with comic border, shadow and halftone texture */}
            <div className="relative group">
              <div className="relative size-64 sm:size-72 md:size-80 lg:size-88 rounded-2xl border-[3px] border-ink bg-card/85 p-3 shadow-[var(--shadow-comic-lg)] halftone overflow-hidden flex items-end justify-center">
                <img
                  src="/avatar.png"
                  alt="Aditya Shah - Comic Avatar"
                  className="h-full w-full object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                />
                {/* Comic Nameplate Tag */}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-accent px-3 py-0.5 font-pixel text-[9px] text-accent-foreground shadow-[var(--shadow-comic)] uppercase">
                  PLAYER 1 · ADITYA
                </span>
              </div>
            </div>
          </div>
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
