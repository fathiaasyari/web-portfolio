"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects, projectsSection, projectPresentation, type Project } from "@/content/site";
import { MaybeLink, Text } from "@/components/ui";
import "@/components/folio.css";

/** Illustrative method diagrams, never presented as screenshots or project results. */
function Cover({ slug }: { slug: string }) {
  if (slug.includes("dashboard")) {
    return (
      <svg viewBox="0 0 420 270" aria-hidden focusable="false">
        {[65, 115, 165, 215].map((y) => <line key={y} x1="32" y1={y} x2="388" y2={y} stroke="currentColor" strokeOpacity="0.14" />)}
        {[82, 128, 104, 164, 138, 184, 158].map((height, index) => <rect key={index} x={43 + index * 49} y={215 - height} width="29" height={height} rx="2" fill={index === 5 ? "var(--folio-rose)" : "currentColor"} fillOpacity={index === 5 ? 1 : 0.85} />)}
        <line x1="32" y1="215" x2="388" y2="215" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (slug.includes("fuzzy")) {
    return (
      <svg viewBox="0 0 420 270" aria-hidden focusable="false">
        <line x1="32" y1="219" x2="388" y2="219" stroke="currentColor" strokeOpacity="0.3" />
        <line x1="32" y1="35" x2="32" y2="219" stroke="currentColor" strokeOpacity="0.3" />
        <path d="M32 219 122 47 212 219" fill="var(--folio-cream)" fillOpacity="0.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M122 219 212 47 302 219" fill="var(--folio-rose)" fillOpacity="0.15" stroke="var(--folio-rose)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M212 219 302 47 388 47" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <line x1="212" y1="47" x2="212" y2="219" stroke="var(--folio-rose)" strokeOpacity="0.5" strokeDasharray="3 6" />
        <circle cx="212" cy="47" r="5" fill="var(--folio-rose)" />
      </svg>
    );
  }
  const points = [[62, 74], [89, 108], [74, 162], [121, 62], [113, 148], [154, 111], [253, 150], [294, 95], [335, 172], [286, 205], [355, 117], [231, 194]];
  return (
    <svg viewBox="0 0 420 270" aria-hidden focusable="false">
      {[72, 120, 168, 216].map((y) => <line key={y} x1="32" y1={y} x2="388" y2={y} stroke="currentColor" strokeOpacity="0.12" />)}
      <path d="M208 30 C182 90 231 170 205 231" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 6" />
      {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="7" fill={index < 6 ? "var(--folio-cream)" : "var(--folio-blush)"} />)}
      <line x1="32" y1="231" x2="388" y2="231" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  );
}

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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: article, offset: ["start end", "end start"] });
  const figureY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const figureRotate = useTransform(scrollYProgress, [0, 1], index % 2 ? [1.2, -1.2] : [-1.2, 1.2]);
  const method = projectPresentation.methods[index];
  return (
    <article ref={article} aria-labelledby={`${p.slug}-title`} className="folio-projectRow" data-reversed={index % 2 === 1}>
      <figure className="folio-projectFigure">
        <motion.div className="folio-projectPlate" data-method={index} style={{ y: reduce ? 0 : figureY, rotate: reduce ? 0 : figureRotate }}>
          <div className="folio-projectPlateMeta"><span>{p.number}</span><span>{p.category}</span></div>
          <Cover slug={p.slug} />
          <p className="folio-projectMethod">{method}</p>
        </motion.div>
        <figcaption>{projectPresentation.diagramCaption}</figcaption>
      </figure>
      <div className="folio-projectCopy">
        <p className="folio-projectCategory">{p.category}</p>
        <h3 id={`${p.slug}-title`}>{p.title}</h3>
        <p className="folio-projectSummary"><Text value={p.summary} /></p>
        <ul aria-label="Tech stack" className="folio-projectStack">{p.stack.map((item, itemIndex) => <li key={itemIndex}><Text value={item} /></li>)}</ul>
        <CaseStudy p={p} />
        <div className="folio-projectLinks">{p.links.map((link) => <MaybeLink key={link.label} link={link} className="text-link">{link.label}<ArrowUpRight aria-hidden size={16} /></MaybeLink>)}</div>
      </div>
    </article>
  );
}

export function Projects() {
  const headingParts = projectsSection.heading.split(/\*([^*]+)\*/);
  return (
    <section id="projects" aria-labelledby="projects-title" className="folio-projects">
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
