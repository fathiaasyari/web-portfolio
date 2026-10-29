"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";
import { cv, hero, person, photo } from "@/content/site";
import { WestJavaMap } from "@/components/west-java-map";
import "@/components/folio.css";
import "@/components/hero-collage.css";
import "@/components/hero-stage.css";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 100, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 24 });
  const rotate = useTransform(x, [-10, 10], [-2, 2]);
  const counterX = useTransform(x, (value) => value * -0.65);
  const counterY = useTransform(y, (value) => value * -0.65);
  function moveArt(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 20);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 16);
  }
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  return (
    <section ref={section} id="home" aria-labelledby="hero-title" className={"folio-hero"}>
      <div className={"folio-heroInner"}>
        <div className="folio-heroGrid folio-heroStage">
          <div className={"folio-introduction"}>
            <motion.div style={{ y: reduce ? 0 : nameY }}>
              <h1 id="hero-title" className={"folio-name"}>
                <span className={"folio-greeting"}>{hero.greeting}</span>
                <span className={"folio-nameMask"}><span className={"folio-nameLetters"}>{person.wordmark}<span className={"folio-nameDot"}>.</span></span></span>
                <span className="sr-only"> — {person.fullName}</span>
              </h1>
            </motion.div>
            <p className={"folio-fullName"}>{person.fullName}</p>
              <div className={"folio-heroActions"}>
                <a href={hero.primaryCta.href} className={"folio-workLink"}>{hero.primaryCta.label}<ArrowUpRight aria-hidden size={19} /></a>
                {cv.available ? (
                  <a href={cv.href} download={cv.fileName} className={"folio-cvLink"}>{hero.secondaryCta.label}<Download aria-hidden size={16} /></a>
                ) : <span className={"folio-cvPending"} aria-disabled="true">{hero.cvPending}</span>}
              </div>
              <p className={"folio-availability"}><span aria-hidden />{hero.status}</p>
          </div>
          <div className="folio-heroCopy">
            <p className="folio-profession">
              <span className="sr-only">{person.role}</span>
              <span className="folio-professionLines" aria-hidden>{hero.roleLines.map((line) => <span key={line}>{line}</span>)}</span>
            </p>
            <p className="folio-lede">{hero.lede}</p>
          </div>
          <motion.div className="folio-visual folio-collage" style={{ y: reduce ? 0 : artY }} onPointerMove={moveArt} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
            <div aria-hidden className="folio-collageWash" />
            <svg aria-hidden className="folio-collageOrbit" viewBox="0 0 520 540" fill="none">
              <ellipse cx="260" cy="260" rx="235" ry="171" transform="rotate(-32 260 260)" />
              <path d="M65 378C10 256 116 71 322 69M427 106l17 6-6-17" />
              <circle cx="69" cy="368" r="5" />
            </svg>
            <motion.div aria-hidden className="folio-collageType" style={{ x: reduce ? 0 : counterX, y: reduce ? 0 : counterY }}>
              <span className="folio-collageWord folio-collageWordData">{hero.collageWords[0]}<span>.</span></span>
              <span className="folio-collageWord folio-collageWordBusiness">{hero.collageWords[1]}</span>
              <span className="folio-collageCuriosity">{hero.collageWords[2]}</span>
            </motion.div>
            <motion.figure className="folio-portrait" style={{ x: reduce ? 0 : x, y: reduce ? 0 : y, rotate: reduce ? 0 : rotate }}>
              <div className="folio-portraitWindow">
                {photo.src && !photoFailed ? (
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 699px) 65vw, (max-width: 1023px) 30vw, 300px" preload className="folio-portraitImage" onError={() => setPhotoFailed(true)} />
                ) : (
                  <div className="folio-portraitPending"><span aria-hidden>{person.wordmark}<i>.</i></span><p>{hero.portraitPending}</p></div>
                )}
              </div>
              <figcaption>{person.fullName}<span>{person.interests[0]}</span></figcaption>
            </motion.figure>
            <div aria-hidden className="folio-collageFlower"><svg viewBox="0 0 100 100"><g fill="currentColor"><ellipse cx="50" cy="50" rx="18" ry="48" /><ellipse cx="50" cy="50" rx="18" ry="48" transform="rotate(60 50 50)" /><ellipse cx="50" cy="50" rx="18" ry="48" transform="rotate(120 50 50)" /></g><circle cx="50" cy="50" r="10" fill="var(--folio-cream)" /></svg></div>
            <div aria-hidden className="folio-collageBars"><span /><span /><span /><svg viewBox="0 0 100 70" fill="none"><path d="M8 58Q43 62 78 12M60 14l20-5 3 21" /></svg></div>
            <p className="folio-collageNote">{hero.atlasNote}</p>
            <details className="folio-collageAtlas">
              <summary><span>{hero.atlasTitle}<small>{hero.atlasScope}</small></span><span className="folio-atlasToggle" aria-hidden>+</span></summary>
              <div className="folio-atlas"><WestJavaMap regions={hero.regions} caption={hero.figureCaption} /></div>
            </details>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

