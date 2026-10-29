"use client";

import { useMotionPreference } from "@/components/use-motion-preference";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects, projectsSection, type Project } from "@/content/site";
import { MaybeLink, Text } from "@/components/ui";
import "@/components/folio.css";
import "@/components/projects-collage.css";

function ProjectOrnaments() {
  return <div className="folio-projectOrnaments" aria-hidden>
    <svg className="folio-projectOrbit" viewBox="0 0 600 480" fill="none"><ellipse cx="300" cy="245" rx="277" ry="173" transform="rotate(-19 300 245)" /><path d="M48 324Q80 396 160 405m-12-12 15 13-20 2" /><circle cx="542" cy="174" r="5" /></svg>
    <svg className="folio-projectBloom" viewBox="0 0 100 100"><g fill="currentColor"><ellipse cx="50" cy="50" rx="17" ry="46" /><ellipse cx="50" cy="50" rx="17" ry="46" transform="rotate(60 50 50)" /><ellipse cx="50" cy="50" rx="17" ry="46" transform="rotate(120 50 50)" /></g><circle cx="50" cy="50" r="9" fill="var(--folio-cream)" /></svg>
    <span className="folio-projectConfetti"><i /><i /><i /></span>
  </div>;
}

const projectImages = [
  { src: "/images/project-dashboard.jpg", alt: "Regional financial dashboard with charts and a map of West Java", caption: "Regional financial analytics dashboard" },
  { src: "/images/project-scholarship.jpg", alt: "Scholarship selection system model performance and confusion matrix", caption: "Scholarship selection model performance" },
  { src: "/images/project-classification.jpeg", alt: "Published article on poverty classification in Indonesia using machine learning", caption: "Poverty classification research article" },
];

function CaseStudy({ p }: { p: Project }) {
  return (
    <details className="folio-caseStudy">
      <summary><span>Read the case study<span className="sr-only">: {p.title}</span></span><Plus aria-hidden size={18} /></summary>
      <dl>
        <div className="folio-caseWide"><dt>The problem</dt><dd><Text value={p.problem} /></dd></div>
        <div><dt>My role</dt><dd><Text value={p.role} /></dd></div>
        <div><dt>Results</dt><dd><ul>{p.results.map((result, index) => <li key={index}><Text value={result} /></li>)}</ul></dd></div>
        <div className="folio-caseWide"><dt>Process</dt><dd><ol>{p.process.map((step, index) => <li key={index}><Text value={step} /></li>)}</ol></dd></div>
      </dl>
    </details>
  );
}

function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const article = useRef<HTMLElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: article, offset: ["start end", "end start"] });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const figureY = useTransform(smoothScroll, [0, 1], [36, -36]);
  const figureRotate = useTransform(smoothScroll, [0, 0.6, 1], index % 2 ? [7, 2, -1] : [-7, -2, 1]);
  const ornamentRotate = useTransform(smoothScroll, [0, 1], [-12, 24]);
  const copyY = useTransform(smoothScroll, [0, 1], [18, -18]);
  const image = projectImages[index];
  return (
    <article ref={article} aria-labelledby={`${p.slug}-title`} className="folio-projectRow" data-reversed={index % 2 === 1}>
      <figure className="folio-projectFigure">
        <motion.div className="folio-projectDecoration" style={{ rotate: reduce ? 0 : ornamentRotate }}><ProjectOrnaments /></motion.div>
        <motion.div className="folio-projectPlate" data-method={index} style={{ y: reduce ? 0 : figureY, rotate: reduce ? 0 : figureRotate }}>
          <div className="folio-projectPlateMeta"><span>{p.number}</span><span>{p.category}</span></div>
          <div className="folio-projectImage"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 85vw, (max-width: 899px) 45vw, 500px" /></div>
        </motion.div>
        <figcaption>{image.caption}</figcaption>
      </figure>
      <motion.div className="folio-projectCopy" style={{ y: reduce ? 0 : copyY }}>
        <p className="folio-projectCategory">{p.category}</p>
        <h3 id={`${p.slug}-title`}>{p.title}</h3>
        <p className="folio-projectSummary"><Text value={p.summary} /></p>
        <ul aria-label="Tech stack" className="folio-projectStack">{p.stack.map((item, itemIndex) => <li key={itemIndex}><Text value={item} /></li>)}</ul>
        <CaseStudy p={p} />
        <div className="folio-projectLinks">{p.links.map((link) => <MaybeLink key={link.label} link={link} className="text-link">{link.label}<ArrowUpRight aria-hidden size={16} /></MaybeLink>)}</div>
      </motion.div>
    </article>
  );
}

export function Projects() {
  const headingParts = projectsSection.heading.split(/\*([^*]+)\*/);
  return (
    <section id="projects" aria-labelledby="projects-title" className="folio-projects folio-projectsCollage">
      <div className="folio-projectsInner">
        <div className="folio-projectsIntro">
          <h2 id="projects-title">{headingParts.map((part, index) => index % 2 ? <span className="folio-projectsAccent" key={index}>{part}</span> : <span key={index}>{part}</span>)}</h2>
          <p>{projectsSection.intro}</p>
        </div>
        <ul className="folio-projectList">{projects.map((project, index) => <li key={project.slug}><ProjectRow project={project} index={index} /></li>)}</ul>
      </div>
    </section>
  );
}
