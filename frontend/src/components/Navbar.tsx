import React, { useState, useEffect } from "react";

interface NavbarProps {
  totalXp: number;
}

export const Navbar: React.FC<NavbarProps> = ({ totalXp }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-30 border-b-[3px] border-ink bg-background/90 backdrop-blur">
      <div
        className="absolute bottom-[-3px] left-0 h-[3px] bg-accent transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <div className="portfolio-shell flex items-center justify-between py-3">
        <a href="#top" className="comic-title text-2xl text-primary">
          A.SHAH
        </a>
        <div className="hidden gap-6 font-pixel text-[10px] md:flex">
          <a href="#about" className="hover:text-accent transition-colors">
            ORIGIN
          </a>
          <a href="#projects" className="hover:text-accent transition-colors">
            QUESTS
          </a>
          <a href="#skills" className="hover:text-accent transition-colors">
            SKILLS
          </a>
          <a href="#certs" className="hover:text-accent transition-colors">
            LOOT
          </a>
          <a href="#journey" className="hover:text-accent transition-colors">
            JOURNEY
          </a>
        </div>
        <span className="font-pixel text-[10px] text-xp">
          XP {totalXp}
        </span>
      </div>
      <div className="flex gap-5 overflow-x-auto border-t border-border px-4 py-3 font-pixel text-[8px] md:hidden">
        <a href="#about" className="hover:text-accent">ORIGIN</a>
        <a href="#projects" className="hover:text-accent">QUESTS</a>
        <a href="#skills" className="hover:text-accent">SKILLS</a>
        <a href="#certs" className="hover:text-accent">LOOT</a>
        <a href="#journey" className="hover:text-accent">JOURNEY</a>
      </div>
    </nav>
  );
};
