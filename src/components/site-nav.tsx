"use client";

import { useMotionPreference } from "@/components/use-motion-preference";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cv, nav, person, headerPresentation } from "@/content/site";
import "@/components/folio.css";

export function SiteNav() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useMotionPreference();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const sections = nav.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
      const first = links?.[0];
      const last = links?.[links.length - 1];
      if (event.shiftKey && document.activeElement === toggle.current) {
        event.preventDefault(); last?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); toggle.current?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (query.matches) setOpen(false); };
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className={"folio-header"} data-scrolled={scrolled || open}>
      <nav aria-label="Primary" className={"folio-nav"}>
        <a href="#home" aria-label={`${person.fullName} — back to top`} className={"folio-wordmark"} onClick={() => setOpen(false)}>{person.wordmark}<span>.</span></a>
        <ul className={"folio-desktopLinks"}>
          {nav.filter(({ id }) => id !== "home" && id !== "contact").map(({ id, label }) => (
            <li key={id}><a href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a></li>
          ))}
        </ul>
        <div className={"folio-navActions"}>
          <a href="#contact" className={"folio-contactLink"} onClick={() => setOpen(false)}>{headerPresentation.contactLabel}<ArrowUpRight aria-hidden size={16} /></a>
          <button ref={toggle} type="button" className={"folio-menuToggle"} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X aria-hidden size={21} /> : <Menu aria-hidden size={21} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div ref={panel} id="mobile-menu" className={"folio-mobileMenu"} initial={reduce ? false : { opacity: 0.6, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <ul>
              {nav.map(({ id, label }) => <li key={id}><a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight aria-hidden size={20} /></a></li>)}
            </ul>
            {cv.available && <a className={"folio-mobileCv"} href={cv.href} download={cv.fileName}>Download CV<ArrowUpRight aria-hidden size={17} /></a>}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

