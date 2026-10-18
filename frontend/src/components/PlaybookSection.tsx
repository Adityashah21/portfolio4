import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Lightbulb, BookOpen, Wrench, Rocket } from "lucide-react";

export const PlaybookSection: React.FC = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discover",
      copy: "Start with a question. Find a problem worth exploring.",
    },
    {
      icon: BookOpen,
      title: "Learn",
      copy: "Understand the tools and connect the dots.",
    },
    {
      icon: Wrench,
      title: "Build",
      copy: "Turn the idea into something you can try.",
    },
    {
      icon: Rocket,
      title: "Improve",
      copy: "Test, learn from the result, and take the next step.",
    },
  ];

  return (
    <section id="process" className="portfolio-shell py-24 md:py-28" data-reveal>
      <SectionHeader
        issue="MISSION PLAYBOOK"
        title="FROM IDEA TO CHECKPOINT"
        subtitle="The mindset behind the next build: stay curious, experiment, and keep improving."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <article
              key={step.title}
              className="comic-panel comic-hover relative p-6"
            >
              <span className="absolute right-4 top-4 font-comic text-4xl text-secondary">
                0{idx + 1}
              </span>
              <Icon className="mb-8 size-8 text-accent" />
              <h3 className="font-comic text-3xl">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{step.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
