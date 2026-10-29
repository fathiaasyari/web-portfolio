"use client";

import { useEffect } from "react";
import { animate } from "motion";

/** Enhance the existing markup; server-rendered content is always visible. */
export function PortfolioMotion() {
  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown = () => {};

    function setup() {
      teardown();
      if (preference.matches || !main) return;

      const headings = Array.from(main.querySelectorAll<HTMLElement>("section h2"));
      const originals = new Map(headings.map((el) => [el, el.getAttribute("style")]));
      const running = new Map<HTMLElement, ReturnType<typeof animate>>();
      main.dataset.motionReady = "";

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          // Anchors and keyboard navigation never wait for a heading reveal.
          if (el.closest("section")?.contains(document.activeElement)) continue;
          const controls = animate(el, {
            y: [28, 0],
            opacity: [0.55, 1],
            clipPath: ["inset(0 -8% 100% -8%)", "inset(-20% -8% -20% -8%)"],
          }, { duration: 0.85, ease: [0.16, 1, 0.3, 1] });
          running.set(el, controls);
        }
      }, { rootMargin: "0px 0px -5% 0px" });
      headings.forEach((el) => observer.observe(el));

      const finishFocused = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        for (const [el, controls] of running) {
          if (el.closest("section")?.contains(target)) controls.complete();
        }
      };
      // Existing ambient CSS only runs while its artwork can actually be seen.
      const ambient = Array.from(main.querySelectorAll<HTMLElement>(".folio-collage, .folio-about"));
      const ambientObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.motionVisible = String(entry.isIntersecting);
        }
      });
      ambient.forEach((el) => ambientObserver.observe(el));
      const visibility = () => { main.dataset.motionPaused = String(document.hidden); };
      visibility();
      document.addEventListener("visibilitychange", visibility);
      main.addEventListener("focusin", finishFocused);

      teardown = () => {
        observer.disconnect();
        ambientObserver.disconnect();
        running.forEach((controls) => controls.cancel());
        originals.forEach((style, el) => {
          if (style === null) el.removeAttribute("style");
          else el.setAttribute("style", style);
        });
        ambient.forEach((el) => delete el.dataset.motionVisible);
        delete main.dataset.motionReady;
        delete main.dataset.motionPaused;
        document.removeEventListener("visibilitychange", visibility);
        main.removeEventListener("focusin", finishFocused);
      };
    }

    setup();
    preference.addEventListener("change", setup);
    return () => {
      teardown();
      preference.removeEventListener("change", setup);
    };
  }, []);

  return null;
}
