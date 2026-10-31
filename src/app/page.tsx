import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { MoreProjects } from "@/components/sections/more-projects";
import { Toolkit } from "@/components/sections/toolkit";
import { Beyond } from "@/components/sections/beyond";
import { Activity } from "@/components/sections/activity";
import { Contact, SiteFooter } from "@/components/sections/contact";
import { auditContent } from "@/content/audit";
import { PortfolioMotion } from "@/components/portfolio-motion";
import "@/components/portfolio-motion.css";

export default function Home() {
  auditContent(); // logs unconfirmed content at build time; no runtime cost in the browser

  return (
    <>
      <SiteNav />
      <PortfolioMotion />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <MoreProjects />
        <Toolkit />
        <Beyond />
        <Activity />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
