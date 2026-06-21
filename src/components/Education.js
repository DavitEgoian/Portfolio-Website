import SpotlightCard from "../SpotlightCard";
import educationTimeline from "../data/educationTimeline";
import SectionTitle from "./SectionTitle";

function Education() {
  return (
    <section aria-labelledby="education">
      <SectionTitle id="education">MY EDUCATION</SectionTitle>
      <div className="resume-cards">
        {educationTimeline.map(({ title, highlighted, desc, date }) => (
          <SpotlightCard
            key={`${title}-${date}`}
            className="resume-card"
            spotlightColor="rgb(163, 116, 255)"
          >
            <div className="resume-card-header">
              <h3 className="resume-card-title">{title}</h3>
              <span className="resume-card-date">{date}</span>
            </div>
            <p className="resume-card-desc">
              <span className="highlight-teal">{highlighted}</span>
              {desc}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export default Education;
