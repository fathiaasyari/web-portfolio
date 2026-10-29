"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ScrollOrnament } from "@/components/scroll-ornament";
import { experience, experienceSection } from "@/content/site";
import { Text } from "@/components/ui";
import "@/components/folio.css";
import "@/components/folio-finishing.css";

export function Experience() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 85%", "end 70%"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const readingProgress = useTransform(smoothProgress, [0, 1], [0, 1]);
  const headingParts = experienceSection.heading.split(/\*([^*]+)\*/);

  return (
    <section ref={section} id="experience" aria-labelledby="experience-title" className="folio-experience folio-finished">
      <div className="folio-experienceInner">
        <div className="folio-experienceHeadingRow"><h2 id="experience-title" className="folio-experienceHeading">
          {headingParts.map((part, index) => index % 2 ? <span key={index} className="folio-experienceAccent">{part}</span> : <span key={index}>{part}</span>)}
        </h2><ScrollOrnament variant="growth" className="folio-experienceOrnament" /></div>
        <ol className="folio-jobs">
          {experience.map((job) => (
            <li key={job.org}>
              <article className="folio-job">
                <div className="folio-jobIdentity">
                  <p className="folio-jobPeriod"><time dateTime={job.start}>{job.period}</time></p>
                  <h3 className="folio-jobOrg">{job.org}</h3>
                  <p className="folio-jobOrgLong">{job.orgLong}</p>
                  <div className="folio-jobRole"><span><Text value={job.role} /></span><Text value={job.roleDetail} /></div>
                  <p className="folio-jobScope"><strong>{job.highlight.value}</strong><span>{job.highlight.label}</span></p>
                </div>
                <div className="folio-jobWork">
                  <p className="folio-jobSummary">{job.summary}</p>
                  <div className="folio-contributions">
                    <span aria-hidden className="folio-contributionTrack"><motion.span className="folio-contributionProgress" style={{ scaleY: reduce ? 1 : readingProgress }} /></span>
                    <ul>
                      {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                  <ul aria-label="Skills used" className="folio-jobSkills">
                    {job.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
