import React from "react";
import { Certification } from "../types";
import { Award, ExternalLink } from "lucide-react";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
}) => {
  return (
    <section
      id="certs"
      className="portfolio-shell py-24 md:py-28"
      data-reveal
    >
      <div className="mb-8 flex items-end gap-4">
        <span className="font-pixel text-[10px] text-accent">ISSUE #03</span>
        <h2 className="comic-title text-5xl text-foreground md:text-6xl">
          LOOT &amp; ACHIEVEMENTS
        </h2>
      </div>
      <p className="mb-10 max-w-xl leading-7 text-muted-foreground">
        Verified technical certifications and national hackathon achievements recognized by premier academic institutions and innovation bodies.
      </p>

      {certifications.length === 0 && (
        <div className="flex min-h-52 flex-col items-center justify-center gap-4 border-y border-border text-center">
          <Award className="size-12 text-accent" />
          <p className="font-comic text-3xl">THE TROPHY CASE IS WAITING</p>
          <p className="text-muted-foreground">
            The next achievement is part of the journey.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="comic-panel comic-hover flex flex-col p-5"
          >
            {cert.image_url && (
              <img
                src={cert.image_url}
                alt={cert.title}
                loading="lazy"
                className="mb-4 aspect-video w-full border-2 border-ink object-cover"
              />
            )}
            <div className="flex items-center gap-2 font-pixel text-[9px] text-xp">
              <Award className="size-4" /> ACHIEVEMENT UNLOCKED
            </div>
            <h3 className="mt-3 font-comic text-2xl tracking-wide">
              {cert.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {cert.issuer}
              {cert.issued_on ? ` · ${cert.issued_on}` : ""}
            </p>
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline"
              >
                View credential <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
