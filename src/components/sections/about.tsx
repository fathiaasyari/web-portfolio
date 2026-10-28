"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { about, person } from "@/content/site";
import "@/components/folio.css";

export function About() {
  const section = useRef<HTMLElement>(null);
  const entered = useInView(section, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const noteY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const headingParts = about.heading.split(/\*([^*]+)\*/);

  return (
    <section ref={section} id="about" aria-labelledby="about-title" className="folio-about" data-entered={entered && !reduce ? "true" : undefined}>
      <div className="folio-aboutInner">
        <div className="folio-aboutGrid">
          <div className="folio-aboutIdentity">
            <h2 id="about-title" className="folio-aboutHeading">
              {headingParts.map((part, index) => index % 2 ? <span className="folio-aboutAccent" key={index}>{part}</span> : <span key={index}>{part}</span>)}
            </h2>
            <motion.blockquote className="folio-aboutNote" style={{ y: reduce ? 0 : noteY }}>
              <span aria-hidden className="folio-quoteMark">“</span>
              <p>{about.paragraphs[2]}</p>
              <footer>{person.shortName}<span aria-hidden>.</span></footer>
            </motion.blockquote>
          </div>
          <div className="folio-aboutStory">
            <div className="folio-aboutProse">
              <p className="folio-aboutLead">{about.paragraphs[0]}</p>
              <p>{about.paragraphs[1]}</p>
            </div>
            <ul className="folio-aboutTraits">
              {about.traits.map((trait) => (
                <li key={trait.title}>
                  <h3>{trait.title}</h3>
                  <p>{trait.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
