import React from "react";

interface SectionHeaderProps {
  issue: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  issue,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-10">
      <p className="mb-3 font-pixel text-[10px] leading-relaxed text-accent">
        {issue}
      </p>
      <h2 className="comic-title text-4xl leading-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};
