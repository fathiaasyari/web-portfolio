"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Brain, Compass, MessagesSquare, Palette } from "lucide-react";
import { about, person } from "@/content/site";
import "@/components/folio.css";
import "@/components/about-collage.css";

const traitIcons = { brain: Brain, palette: Palette, messages: MessagesSquare, compass: Compass };

/** Decorative geometry: a little constellation of pattern, discovery and play. */
function CuriosityArtwork() {
  return (
    <div className="folio-curiosityArt" aria-hidden>
      <svg viewBox="0 0 400 220" fill="none">
        <ellipse className="folio-curiosityOrbit" cx="200" cy="116" rx="169" ry="67" transform="rotate(-16 200 116)" />
        <path className="folio-curiosityTrail" d="M33 151C68 187 114 203 163 192M152 183l14 9-14 6" />
        <g className="folio-curiosityMatrix" transform="translate(69 60) rotate(-12 45 45)">
          {Array.from({ length: 9 }, (_, index) => <rect key={index} x={(index % 3) * 28} y={Math.floor(index / 3) * 28} width="20" height="20" rx={index === 4 ? 10 : 3} className={index === 4 || index === 8 ? "folio-curiosityTileRose" : undefined} />)}
        </g>
        <g className="folio-curiosityLens">
          <circle cx="224" cy="105" r="54" fill="var(--folio-cream)" />
          <circle cx="224" cy="105" r="47" fill="var(--folio-blush)" stroke="var(--folio-ink)" strokeWidth="2" />
          <path d="m260 142 30 31" stroke="var(--folio-ink)" strokeWidth="12" strokeLinecap="round" />
          <path d="m260 142 30 31" stroke="var(--folio-olive)" strokeWidth="8" strokeLinecap="round" />
          <path d="m205 108 13 12 25-30" stroke="var(--folio-rose)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M191 91a37 37 0 0 1 24-21" stroke="var(--folio-cream)" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g className="folio-curiosityBloom" fill="var(--folio-rose)">
          <ellipse cx="332" cy="64" rx="10" ry="28" />
          <ellipse cx="332" cy="64" rx="10" ry="28" transform="rotate(60 332 64)" />
          <ellipse cx="332" cy="64" rx="10" ry="28" transform="rotate(120 332 64)" />
          <circle cx="332" cy="64" r="6" fill="var(--folio-cream)" />
        </g>
        <circle cx="44" cy="120" r="5" fill="var(--folio-rose)" />
        <circle cx="324" cy="162" r="4" fill="var(--folio-olive)" />
        <path d="M168 28v16m-8-8h16M351 119v12m-6-6h12" stroke="var(--folio-olive)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function About() {
  const section = useRef<HTMLElement>(null);
  const entered = useInView(section, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const noteY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const headingParts = about.heading.split(/\*([^*]+)\*/);

  return (
    <section ref={section} id="about" aria-labelledby="about-title" className="folio-about folio-aboutCollage" data-entered={entered && !reduce ? "true" : undefined}>
      <div className="folio-aboutInner">
        <div className="folio-aboutGrid">
          <div className="folio-aboutIdentity">
            <h2 id="about-title" className="folio-aboutHeading">
              {headingParts.map((part, index) => index % 2 ? <span className="folio-aboutAccent" key={index}>{part}</span> : <span key={index}>{part}</span>)}
            </h2>
            <CuriosityArtwork />
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
              {about.traits.map((trait) => {
                const Icon = traitIcons[trait.icon];
                return (
                  <li key={trait.title}>
                    <span className="folio-traitEmblem" aria-hidden><Icon size={27} strokeWidth={1.5} /></span>
                    <h3>{trait.title}</h3>
                    <p>{trait.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
