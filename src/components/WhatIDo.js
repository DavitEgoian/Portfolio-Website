import SpotlightCard from "../SpotlightCard";
import cardsData from "../data/cardsData";
import SectionTitle from "./SectionTitle";

function WhatIDo() {
  return (
    <section aria-labelledby="what-i-do">
      <SectionTitle id="what-i-do">WHAT I DO</SectionTitle>
      <div className="cards-container">
        {cardsData.map(({ icon, title, desc }) => (
          <SpotlightCard
            key={title}
            className="custom-spotlight-card"
            spotlightColor="rgb(163, 116, 255)"
          >
            <img
              src={icon}
              alt={`${title.toLowerCase()}-icon`}
              loading="lazy"
              decoding="async"
            />
            <h3>{title}</h3>
            <p>{desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export default WhatIDo;
