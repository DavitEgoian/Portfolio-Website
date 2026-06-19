import educationTimeline from "../../data/educationTimeline";
import experienceTimeline from "../../data/experienceTimeline";
import certificationTimeline from "../../data/certificationTimeline";

const JOURNEY_SECTIONS = [
  {
    key: "education",
    label: "Education",
    items: educationTimeline.map(({ title, highlighted, desc, date }) => ({
      title,
      highlight: highlighted,
      desc,
      meta: date,
    })),
  },
  {
    key: "experience",
    label: "Experience",
    items: experienceTimeline.map(({ title, highlighted, desc, date }) => ({
      title,
      highlight: highlighted,
      desc,
      meta: date,
    })),
  },
  {
    key: "certifications",
    label: "Certifications",
    items: certificationTimeline.map(
      ({ name, issueOrganization, desc, issueDate, link }) => ({
        title: name,
        highlight: issueOrganization,
        desc,
        meta: issueDate,
        link,
      })
    ),
  },
];

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
        {JOURNEY_SECTIONS.map(({ key, label, items }) => (
          <div key={key} className="journey__group">
            <h3 className="journey__group-label">📁 {label}</h3>
            <div className="journey__stream">
              {items.map(({ title, highlight, desc, meta, link }) => (
                <article key={`${title}-${meta}`} className="journey__item">
                  <div className="journey__content">
                    <time className="journey__date">{meta}</time>
                    <h4>{title}</h4>
                    <p>
                      <span className="journey__highlight">{highlight}</span>
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
