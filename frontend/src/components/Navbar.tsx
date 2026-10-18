import React from "react";

interface NavbarProps {
  totalXp: number;
}

export const Navbar: React.FC<NavbarProps> = ({ totalXp }) => {
  return (
    <nav className="sticky top-0 z-30 border-b-[3px] border-ink bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="comic-title text-2xl text-primary">
          A.SHAH
        </a>
        <div className="hidden gap-6 font-pixel text-[10px] md:flex">
          <a href="#projects" className="hover:text-accent transition-colors">
            QUESTS
          </a>
          <a href="#skills" className="hover:text-accent transition-colors">
            SKILLS
          </a>
          <a href="#certs" className="hover:text-accent transition-colors">
            LOOT
          </a>
          <a href="#interests" className="hover:text-accent transition-colors">
            PERKS
          </a>
        </div>
        <span className="font-pixel text-[10px] text-xp">
          XP {totalXp}
        </span>
      </div>
    </nav>
  );
};
