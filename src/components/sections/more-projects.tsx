import { moreProjects, moreProjectsSection } from "@/content/site";
import "@/components/folio.css";
import "@/components/more-projects.css";

export function MoreProjects() {
  return (
    <section id="more-projects" aria-labelledby="more-projects-title" className="folio-projects folio-moreProjects">
      <div className="folio-moreProjectsInner">
        <div className="folio-moreProjectsIntro">
          <h2 id="more-projects-title">{moreProjectsSection.heading}</h2>
          <p>{moreProjectsSection.intro}</p>
        </div>
        <ol className="folio-moreProjectsList">
          {moreProjects.map((project) => (
            <li key={project.slug}>
              <article aria-labelledby={`${project.slug}-title`} className="folio-moreProject">
                <span className="folio-moreProjectNumber" aria-hidden="true">{project.number}</span>
                <div className="folio-moreProjectIdentity">
                  <h3 id={`${project.slug}-title`}>{project.title}</h3>
                  <p className="folio-moreProjectCategory">{project.category}</p>
                </div>
                <div className="folio-moreProjectDetail">
                  <p>{project.description}</p>
                  <p className="folio-moreProjectStack"><strong>{moreProjectsSection.stackLabel}:</strong> {project.stack.join(" · ")}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
