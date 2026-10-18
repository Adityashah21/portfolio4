import React from "react";
import { Gamepad2 } from "lucide-react";

interface FooterProps {
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  return (
    <footer className="border-t-[3px] border-ink py-8 text-center bg-background">
      <p className="font-pixel text-[9px] text-muted-foreground">
        <Gamepad2 className="mr-2 inline size-4" /> GAME OVER? NAH — TO BE CONTINUED…
      </p>
      <a
        className="mt-3 inline-block font-pixel text-[8px] text-muted-foreground/50 hover:text-accent cursor-pointer transition-colors"
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
    </footer>
  );
};
