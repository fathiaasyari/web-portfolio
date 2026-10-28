"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ElementType } from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  delay?: number; // seconds
  as?: "div" | "li" | "article" | "section" | "header";
};

/**
 * Progressive-enhancement scroll reveal.
 *
 * Content is server-rendered fully visible. Only when JS has run (html.js) and
 * the user allows motion does CSS hide [data-reveal] until it enters the
 * viewport. No JS, crawlers and reduced-motion users always see everything.
 */
export function Reveal({ delay = 0, as = "div", style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ ...style, "--reveal-delay": `${delay}s` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
