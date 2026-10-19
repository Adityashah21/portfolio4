import React from "react";
import { FileDown, Mail, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./icons/SocialIcons";

interface FooterProps {
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  return (
    <footer className="border-t-[3px] border-ink py-12 text-center bg-background">
      <div className="portfolio-shell mx-auto max-w-4xl">
        {/* Social, Email & Resume Links */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/Adityashah21"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/aditya-shah-80040232a"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="size-4 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/u/Adityacodes03/"
            target="_blank"
            rel="noreferrer"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="LeetCode Profile"
          >
            <LeetCodeIcon className="size-4 text-[#FFA116]" />
            <span>LeetCode</span>
          </a>
          <a
            href="mailto:Adityashahofficial22@gmail.com"
            className="comic-panel comic-hover inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            title="Email Aditya Shah"
          >
            <Mail className="size-4 text-accent" />
            <span>Email</span>
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

        {/* Professional sign-off line */}
        <p className="font-pixel text-[9px] text-muted-foreground">
          <Code2 className="mr-2 inline size-4 text-accent" /> ENGINEERED BY ADITYA SHAH · B.TECH CSE &apos;27 · FULL-STACK MERN DEVELOPER
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
