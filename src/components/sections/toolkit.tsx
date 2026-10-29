"use client";

import { useMotionPreference } from "@/components/use-motion-preference";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { toolkit, toolkitSection } from "@/content/site";
import { Text } from "@/components/ui";
import { ScrollOrnament } from "@/components/scroll-ornament";
import "@/components/folio.css";
import "@/components/folio-finishing.css";

export function Toolkit() {
  const section = useRef<HTMLElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const headingParts = toolkitSection.heading.split(/\*([^*]+)\*/);
  return (
    <section ref={section} id="skills" aria-labelledby="skills-title" className="folio-toolkit folio-finished">
      <div className="folio-toolkitInner">
        <div className="folio-toolkitIntro">
          <motion.div style={{ y: reduce ? 0 : headingY }}>
            <h2 id="skills-title">{headingParts.map((part, index) => index % 2 ? <span className="folio-toolkitAccent" key={index}>{part}</span> : <span key={index}>{part}</span>)}</h2>
          </motion.div>
          <ScrollOrnament variant="tools" className="folio-toolkitOrnament" />
        </div>
        <ul className="folio-toolkitGroups">
          {toolkit.map((group) => (
            <li key={group.title} className="folio-toolkitGroup">
              <h3>{group.title}</h3>
              <p>{group.blurb}</p>
              <ul aria-label={`${group.title} tools`} className="folio-toolkitTools">
                {group.items.map((item, index) => <li key={index}><Text value={item} /></li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
