"use client";

import { useMotionPreference } from "@/components/use-motion-preference";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { beyond } from "@/content/site";
import { Text } from "@/components/ui";
import { ScrollOrnament } from "@/components/scroll-ornament";
import "@/components/folio.css";
import "@/components/folio-finishing.css";

export function Beyond() {
  const section = useRef<HTMLElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const noteY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const noteRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1]);
  const headingParts = beyond.heading.split(/\*([^*]+)\*/);
  return (
    <section ref={section} id="beyond" aria-labelledby="beyond-title" className="folio-beyond folio-finished">
      <div className="folio-beyondInner">
        <div className="folio-beyondIntro">
          <h2 id="beyond-title">{headingParts.map((part, index) => index % 2 ? <span className="folio-beyondAccent" key={index}>{part}</span> : <span key={index}>{part}</span>)}</h2>
          <p>{beyond.intro}</p>
        </div>
        <div className="folio-beyondGrid">
          <motion.aside className="folio-personalNote" aria-labelledby="qualities-title" style={{ y: reduce ? 0 : noteY, rotate: reduce ? 0 : noteRotate }}>
            <ScrollOrnament variant="bloom" className="folio-personalBloom" />
            <p id="qualities-title">{beyond.qualitiesLabel}</p>
            <ul>{beyond.qualities.map((quality, index) => <li key={index}><Text value={quality} /></li>)}</ul>
          </motion.aside>
          <ul className="folio-beyondEntries">
            {beyond.entries.map((entry) => (
              <li key={entry.kind}>
                <div className="folio-beyondEntryMeta"><h3>{entry.kind}</h3><p><Text value={entry.period} /></p></div>
                <p className="folio-beyondEntryTitle"><Text value={entry.title} /></p>
                <p className="folio-beyondEntryBody"><Text value={entry.body} /></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
