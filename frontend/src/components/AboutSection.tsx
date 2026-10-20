import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Zap, Crosshair, Gamepad2, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "./icons/SocialIcons";
import { Button } from "./ui/button";

interface AboutSectionProps {
  projectsCount: number;
  skillsCount: number;
  achievementsCount: number;
  resumeUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  projectsCount,
  skillsCount,
  achievementsCount,
  resumeUrl = "/resume.pdf",
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
              <Zap className="size-5" /> FULL-STACK MERN ARCHITECTURE{" "}
              <Crosshair className="size-5" /> REAL-TIME SOCKET.IO SYSTEMS{" "}
              <Gamepad2 className="size-5" /> 150+ DSA PROBLEMS SOLVED
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
          title="BEHIND THE CODE"
          subtitle="Full-Stack Developer (MERN) &amp; B.Tech CSE Student — turning complex engineering challenges into elegant, resilient software."
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
              ENGINEERED WITH PRECISION &amp; PASSION.
            </h3>
            <p className="mt-5 leading-7 text-muted-foreground">
              I am Aditya Shah, a Computer Science &amp; Engineering undergraduate at Greater Noida Institute of Technology (&apos;23–&apos;27) and a Full-Stack MERN Developer. I specialize in designing scalable web architectures, event-driven real-time applications with Socket.IO, and secure RESTful services.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              With 150+ Data Structures &amp; Algorithms challenges solved and multiple deployed production platforms under my belt, I bridge backend performance with intuitive front-end engineering. This portfolio showcases verified projects, technical competencies, and hackathon milestones.
            </p>

            <dl className="mt-7 divide-y divide-border border-y border-border">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Class</dt>
                <dd className="font-bold">Full Stack Developer (MERN)</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Guild</dt>
                <dd className="max-w-[70%] text-right font-bold">
                  Greater Noida Institute of Tech (CSE &apos;27)
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Core Focus</dt>
                <dd className="font-bold">Web Architectures &amp; Real-Time Systems</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">DSA Record</dt>
                <dd className="font-bold">150+ Problems Solved</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Equipped Links</dt>
                <dd className="flex items-center gap-2">
                  <a
                    href="https://github.com/Adityashah21"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-ink bg-muted p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon className="size-3.5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/aditya-shah-80040232a"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-ink bg-muted p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="size-3.5" />
                  </a>
                  <a
                    href="https://leetcode.com/u/Adityacodes03/"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-ink bg-muted p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
                    title="LeetCode"
                  >
                    <LeetCodeIcon className="size-3.5 text-[#FFA116]" />
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-3">
              <Button asChild variant="comicYellow" size="sm">
                <a
                  href={resumeUrl}
                  download="Aditya_Shah_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileDown className="size-4" /> Download Resume
                </a>
              </Button>
            </div>
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
