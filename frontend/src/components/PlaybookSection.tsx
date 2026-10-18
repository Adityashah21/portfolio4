import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Lightbulb, BookOpen, Wrench, Rocket } from "lucide-react";

export const PlaybookSection: React.FC = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Architect",
      copy: "Analyze system requirements, data flow, and user workflows to establish an optimal architectural foundation.",
    },
    {
      icon: BookOpen,
      title: "Design",
      copy: "Select targeted tech stacks (MERN, Socket.IO, Tailwind) and construct robust data schemas and API contracts.",
    },
    {
      icon: Wrench,
      title: "Engineer",
      copy: "Write clean, modular code with secure JWT authentication, bidirectional event sockets, and responsive interfaces.",
    },
    {
      icon: Rocket,
      title: "Ship & Iterate",
      copy: "Benchmark algorithmic performance, validate edge cases, and deploy reliable production releases.",
    },
  ];

  return (
    <section id="process" className="portfolio-shell py-24 md:py-28" data-reveal>
      <SectionHeader
        issue="ENGINEERING PLAYBOOK"
        title="HOW I BUILD &amp; SHIP"
        subtitle="A disciplined, structured methodology transforming real-world problem statements into scalable software."
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
