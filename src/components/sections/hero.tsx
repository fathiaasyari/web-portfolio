"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { cv, hero, person } from "@/content/site";
import { WestJavaMap } from "@/components/west-java-map";
import "@/components/folio.css";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  return (
    <section ref={section} id="home" aria-labelledby="hero-title" className={"folio-hero"}>
      <div className={"folio-heroInner"}>
        <div className={"folio-heroGrid"}>
          <div className={"folio-introduction"}>
            <motion.div style={{ y: reduce ? 0 : nameY }}>
              <h1 id="hero-title" className={"folio-name"}>
                <span className={"folio-greeting"}>{hero.greeting}</span>
                <span className={"folio-nameMask"}><span className={"folio-nameLetters"}>{person.wordmark}<span className={"folio-nameDot"}>.</span></span></span>
                <span className="sr-only"> — {person.fullName}</span>
              </h1>
            </motion.div>
            <div className={"folio-heroCopy"}>
              <p className={"folio-fullName"}>{person.fullName}</p>
              <p className={"folio-profession"}>{person.role}</p>
              <p className={"folio-lede"}>{hero.lede}</p>
              <div className={"folio-heroActions"}>
                <a href={hero.primaryCta.href} className={"folio-workLink"}>{hero.primaryCta.label}<ArrowUpRight aria-hidden size={19} /></a>
                {cv.available ? (
                  <a href={cv.href} download={cv.fileName} className={"folio-cvLink"}>{hero.secondaryCta.label}<Download aria-hidden size={16} /></a>
                ) : <span className={"folio-cvPending"} aria-disabled="true">{hero.cvPending}</span>}
              </div>
              <p className={"folio-availability"}><span aria-hidden />{hero.status}</p>
            </div>
          </div>
          <motion.div className={"folio-visual"} style={{ y: reduce ? 0 : artY, rotate: reduce ? -4 : artRotate }}>
            <div aria-hidden className={"folio-visualField"} />
            <div className={"folio-atlas"}>
              <div className={"folio-atlasTop"}><span>{hero.atlasTitle}</span><span>{hero.atlasScope}</span></div>
              <WestJavaMap regions={hero.regions} caption={hero.figureCaption} />
            </div>
            <p className={"folio-visualNote"}>{hero.atlasNote}</p>
          </motion.div>
        </div>
        <div className={"folio-heroFoot"}>
          <p>{person.degree}<span aria-hidden> / </span><span>{person.university}</span></p>
          <p className={"folio-footTools"}>{hero.toolkit}</p>
          <a href="#about" className={"folio-scrollLink"}>{hero.scrollLabel}<ArrowDown aria-hidden size={16} /></a>
        </div>
      </div>
    </section>
  );
}

