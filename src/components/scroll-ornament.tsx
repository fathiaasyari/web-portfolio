"use client";

import { useMotionPreference } from "@/components/use-motion-preference";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Decorative geometry shares one gentle scroll rhythm across the portfolio. */
export function ScrollOrnament({ variant, className = "" }: { variant: "growth" | "tools" | "bloom" | "letter"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const rotate = useTransform(progress, [0, 1], [-12, 22]);
  const y = useTransform(progress, [0, 1], [10, -10]);
  const line = useTransform(progress, [0.05, 0.65], [reduce ? 1 : 0.25, 1]);
  const scaleY = useTransform(progress, [0.05, 0.65], [reduce ? 1 : 0.4, 1]);
  return (
    <div ref={ref} className={`folio-scrollOrnament ${className}`} aria-hidden>
      <motion.svg viewBox="0 0 260 180" fill="none" style={{ y: reduce ? 0 : y }}>
        {variant !== "bloom" && <motion.ellipse cx="130" cy="94" rx="112" ry="59" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" style={{ rotate: reduce ? 0 : rotate, transformOrigin: "130px 94px" }} />}
        {variant === "growth" && <>
          <motion.g style={{ scaleY, originX: 0.5, originY: 1, transformBox: "fill-box" }} fill="currentColor"><rect x="62" y="96" width="24" height="45" rx="12" /><rect x="101" y="72" width="24" height="69" rx="12" /><rect x="140" y="40" width="24" height="101" rx="12" /></motion.g>
          <motion.path d="M44 84Q87 29 173 20m-17-5 20 4-10 17" stroke="var(--ornament-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: line }} />
          <circle cx="202" cy="118" r="5" fill="var(--ornament-accent)" />
        </>}
        {variant === "tools" && <>
          <g transform="translate(52 49) rotate(-10 42 42)" fill="currentColor">{Array.from({ length: 9 }, (_, i) => <rect key={i} x={(i % 3) * 26} y={Math.floor(i / 3) * 26} width="18" height="18" rx={i === 4 ? 9 : 3} fill={i === 4 ? "var(--ornament-accent)" : undefined} />)}</g>
          <motion.g style={{ rotate: reduce ? 0 : rotate, transformOrigin: "183px 88px" }}><circle cx="183" cy="88" r="34" fill="var(--ornament-paper)" stroke="currentColor" strokeWidth="1.5" /><path d="m165 89 11 11 24-26" stroke="var(--ornament-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></motion.g>
          <circle cx="223" cy="132" r="4" fill="var(--ornament-accent)" />
        </>}
        {variant === "bloom" && <motion.g fill="currentColor" style={{ rotate: reduce ? 0 : rotate, transformOrigin: "130px 90px" }}>
          <ellipse cx="130" cy="90" rx="23" ry="66" /><ellipse cx="130" cy="90" rx="23" ry="66" transform="rotate(60 130 90)" /><ellipse cx="130" cy="90" rx="23" ry="66" transform="rotate(120 130 90)" /><circle cx="130" cy="90" r="13" fill="var(--ornament-paper)" />
        </motion.g>}
        {variant === "letter" && <>
          <motion.g style={{ rotate: reduce ? 0 : rotate, transformOrigin: "128px 92px" }}><rect x="63" y="51" width="132" height="85" rx="4" fill="var(--ornament-paper)" stroke="currentColor" strokeWidth="1.5" /><motion.path d="m64 53 65 49 64-49M64 134l44-43m85 43-44-43" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" style={{ pathLength: line }} /></motion.g>
          <circle cx="223" cy="59" r="5" fill="var(--ornament-accent)" /><path d="M31 109v16m-8-8h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>}
      </motion.svg>
    </div>
  );
}
