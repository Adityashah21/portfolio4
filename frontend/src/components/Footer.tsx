import React from "react";
import { Gamepad2, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./icons/SocialIcons";

interface FooterProps {
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  return (
    <footer className="border-t-[3px] border-ink py-12 text-center bg-background">
      <div className="portfolio-shell mx-auto max-w-4xl">
        {/* Social & Resume Links */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="size-4 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="LeetCode Profile"
          >
            <LeetCodeIcon className="size-4 text-[#FFA116]" />
            <span>LeetCode</span>
          </a>
          <a
            href="/resume.pdf"
            download="Aditya_Shah_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 text-sm font-bold transition-colors"
            title="Download Resume"
          >
            <FileDown className="size-4" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Arcade ending line */}
        <p className="font-pixel text-[9px] text-muted-foreground">
          <Gamepad2 className="mr-2 inline size-4" /> GAME OVER? NAH — TO BE CONTINUED…
        </p>

        {/* Admin Link */}
        <a
          className="mt-4 inline-block font-pixel text-[8px] text-muted-foreground/50 hover:text-accent cursor-pointer transition-colors"
          href="/admin"
          onClick={(e) => {
            if (onNavigateAdmin) {
              e.preventDefault();
              onNavigateAdmin();
            }
          }}
        >
          ADMIN
        </a>
      </div>
    </footer>
  );
};
