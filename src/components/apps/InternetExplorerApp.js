import educationTimeline from "../../data/educationTimeline";
import experienceTimeline from "../../data/experienceTimeline";
import certificationTimeline from "../../data/certificationTimeline";
import { getOrganizationLogo } from "../../data/organizationLogos";

const JOURNEY_SECTIONS = [
  {
    key: "education",
    label: "Education",
    logoOn: "heading",
    items: educationTimeline.map(({ title, highlighted, desc, date }) => ({
      heading: title,
      organization: title,
      highlight: highlighted,
      desc,
      meta: date,
    })),
  },
  {
    key: "experience",
    label: "Experience",
    logoOn: "organization",
    items: experienceTimeline.map(({ title, highlighted, desc, date }) => ({
      heading: title,
      organization: highlighted,
      highlight: highlighted,
      desc,
      meta: date,
    })),
  },
  {
    key: "certifications",
    label: "Certifications",
    logoOn: "organization",
    items: certificationTimeline.map(
      ({ name, issueOrganization, desc, issueDate, link }) => ({
        heading: name,
        organization: issueOrganization,
        highlight: issueOrganization,
        desc,
        meta: issueDate,
        link,
      })
    ),
  },
];

function OrgLogo({ organization }) {
  const src = getOrganizationLogo(organization);
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      width={36}
      height={36}
      className="journey__org-logo"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

function InternetExplorerApp() {
  return (
    <div className="ie-app app-panel">
      <div className="journey__toolbar" aria-hidden="true">
        <span>← Back</span>
        <span>→ Forward</span>
        <span>🔄 Refresh</span>
        <span>🏠 Home</span>
        <span>🔍 Search</span>
        <span>⭐ Favorites</span>
      </div>
      <p className="journey__addressbar">
        Address: <strong>https://davitegoian.tech/history</strong>
      </p>

      <div className="ie-app__content">
        {JOURNEY_SECTIONS.map(({ key, label, logoOn, items }) => (
          <div key={key} className="journey__group">
            <h3 className="journey__group-label">📁 {label}</h3>
            <div className="journey__stream">
              {items.map(({ heading, organization, highlight, desc, meta, link }) => (
                <article key={`${heading}-${meta}`} className="journey__item">
                  <div className="journey__content">
                    <time className="journey__date">{meta}</time>
                    <h4 className="journey__heading">
                      {logoOn === "heading" && <OrgLogo organization={organization} />}
                      <span>{heading}</span>
                    </h4>
                    <p>
                      <span className="journey__org-line">
                        {logoOn === "organization" && (
                          <OrgLogo organization={organization} />
                        )}
                        <span className="journey__highlight">{highlight}</span>
                      </span>
                      {desc}
                    </p>
                    {link && (
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        View Certificate
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternetExplorerApp;
