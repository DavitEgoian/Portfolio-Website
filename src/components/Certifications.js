import SpotlightCard from "../SpotlightCard";
import certificationTimeline from "../data/certificationTimeline";
import SectionTitle from "./SectionTitle";

function Certifications() {
  return (
    <section aria-labelledby="certifications">
      <SectionTitle id="certifications">LICENSES & CERTIFICATIONS</SectionTitle>
      <div className="certifications-grid">
        {certificationTimeline.map(
          ({ name, issueOrganization, desc, issueDate, link }) => (
            <SpotlightCard
              key={`${name}-${issueDate}`}
              className="certification-card"
              spotlightColor="rgb(163, 116, 255)"
            >
              <div className="certification-card-top">
                <span className="certification-date">{issueDate}</span>
              </div>
              <h3 className="certification-title">{name}</h3>
              <p className="certification-org">{issueOrganization}</p>
              <p className="certification-desc">{desc}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-link"
                aria-label={`View ${name} Certificate`}
              >
                View Certificate
              </a>
            </SpotlightCard>
          )
        )}
      </div>
    </section>
  );
}

export default Certifications;
