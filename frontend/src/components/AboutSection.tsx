import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Zap, Crosshair, Gamepad2 } from "lucide-react";

interface AboutSectionProps {
  projectsCount: number;
  skillsCount: number;
  achievementsCount: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  projectsCount,
  skillsCount,
  achievementsCount,
}) => {
  return (
    <>
      {/* Ticker marquee */}
      <div
        className="signal-strip overflow-hidden border-y-[3px] border-ink bg-accent py-4 text-accent-foreground select-none"
        aria-hidden="true"
      >
        <div className="signal-track flex w-max items-center gap-10 font-comic text-2xl">
          {[0, 1, 2, 3].map((idx) => (
            <span key={idx} className="flex items-center gap-10">
              <Zap className="size-5" /> ENGINEER IN THE MAKING{" "}
              <Crosshair className="size-5" /> ONE QUEST AT A TIME{" "}
              <Gamepad2 className="size-5" /> PLAYER ONE ENERGY
            </span>
          ))}
        </div>
      </div>

      {/* Origin story section */}
      <section
        id="about"
        className="portfolio-shell py-24 md:py-28"
        data-reveal
      >
        <SectionHeader
          issue="THE ORIGIN STORY"
          title="BEHIND THE MASK"
          subtitle="An engineering student. A gamer. A fan of stories where ordinary people do extraordinary things."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left workbench illustration with comic stamp */}
          <div className="relative">
            <img
              src="/workbench.jpg"
              width={1536}
              height={1024}
              loading="lazy"
              alt="Comic illustration of an engineering workbench with a laptop, circuits, and a game controller"
              className="aspect-[3/2] w-full border-[3px] border-ink object-cover shadow-[var(--shadow-comic-lg)]"
            />
            <span className="comic-stamp absolute -bottom-5 right-4 rotate-[-6deg] border-[3px] border-ink bg-primary px-5 py-2 font-comic text-3xl text-primary-foreground shadow-[var(--shadow-comic)]">
              WORK IN PROGRESS!
            </span>
          </div>

          {/* Right bio profile */}
          <div className="pt-6 lg:pt-0">
            <p className="font-pixel text-[10px] leading-6 text-xp">
              PLAYER PROFILE / ADITYA SHAH
            </p>
            <h3 className="mt-4 font-comic text-4xl">
              NO SUPERPOWERS. JUST CURIOSITY.
            </h3>
            <p className="mt-5 leading-7 text-muted-foreground">
              I’m Aditya, an engineering student at Greater Noida Institute of
              Technology. This is my corner of the web: the things I build, the
              skills I pick up, and the milestones along the way.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Spider-Man and gaming are two things I love. So this portfolio is
              a little less ordinary — a collection of quests, experience
              points, and a story that’s still being written.
            </p>

            <dl className="mt-7 divide-y divide-border border-y border-border">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Class</dt>
                <dd className="font-bold">Engineering student</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Guild</dt>
                <dd className="max-w-[70%] text-right font-bold">
                  Greater Noida Institute of Technology
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Side quests</dt>
                <dd className="font-bold">Gaming &amp; comics</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 3 Stats Banner */}
        <div className="mt-16 grid grid-cols-3 border-y-[3px] border-ink bg-card py-7">
          {[
            { label: "QUESTS", value: projectsCount },
            { label: "SKILLS", value: skillsCount },
            { label: "ACHIEVEMENTS", value: achievementsCount },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="min-w-0 border-r border-border px-2 text-center last:border-0"
            >
              <p className="font-comic text-5xl text-accent">
                {String(value).padStart(2, "0")}
              </p>
              <p className="mt-2 font-pixel text-[7px] leading-5 sm:text-[9px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
