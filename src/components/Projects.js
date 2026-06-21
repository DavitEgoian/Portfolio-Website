import SpotlightCard from "../SpotlightCard";
import projectsData from "../data/projectsData";
import SectionTitle from "./SectionTitle";

function Projects() {
  return (
    <section aria-labelledby="projects">
      <SectionTitle id="projects">MY PROJECTS</SectionTitle>
      <div className="projects-grid">
        {projectsData.map(
          ({ title, period, description, tags, githubUrl, liveUrl }) => (
            <SpotlightCard
              key={title}
              className="project-card"
              spotlightColor="rgb(163, 116, 255)"
            >
              <div className="project-card-top">
                <span className="project-period">{period}</span>
              </div>
              <h3 className="project-title">{title}</h3>
              <p className="project-desc">{description}</p>
              <div className="project-tags">
                {tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Demo
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </SpotlightCard>
          )
        )}
      </div>
    </section>
  );
}

export default Projects;
