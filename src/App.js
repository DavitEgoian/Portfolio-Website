import React, { useRef } from "react";
import "./App.css";
import TextPressure from "./TextPressure";
import VariableProximity from "./VariableProximity";
import SpotlightCard from "./SpotlightCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import techLogos from "./data/techLogos";
import cardsData from "./data/cardsData";
import socialLogos from "./data/socialLogos";
import educationTimeline from "./data/educationTimeline";
import experienceTimeline from "./data/experienceTimeline";

function App() {
  const containerRef = useRef(null);

  return (
    <div className="App">
      <div
        style={{
          position: "static",
          height: "auto",
          width: "100%",
          marginBottom: "1rem",
          display: "block",
        }}
      >
        <TextPressure
          text="Hello!"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
        <br />
        <div ref={containerRef} style={{ position: "relative" }}>
          <VariableProximity
            label={
              "I build intelligent systems that balance\n " +
              "accuracy," +
              " scalability, and interpretability."
            }
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
      </div>
      <h1 className="section-title">ABOUT ME</h1>

      <p className="section-desc about-me-section-text">
        Hi, I&apos;m Davit, a{" "}
        <span className="highlight-yellow">Data Science and AI student</span> at{" "}
        Georgian National University SEU in Tbilisi, Georgia. I&apos;m{" "}
        passionate about creating impactful tech solutions—building everything
        from advanced statistical models and interactive visualizations to{" "}
        automated feature engineering and explainable AI. Beyond coding, I{" "}
        <span className="highlight-teal">mentor teams</span> and{" "}
        <span className="highlight-teal">lead hackathons</span> to drive
        real-world innovation.
      </p>
      <h1 className="section-title">WHAT I DO</h1>
      <div className="cards-container">
        {cardsData.map(({ icon, title, desc }) => (
          <SpotlightCard
            key={title}
            className="custom-spotlight-card"
            spotlightColor="rgb(163, 116, 255)"
          >
            <img src={icon} alt={`${title.toLowerCase()}-icon`} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </SpotlightCard>
        ))}
      </div>

      <h1 className="section-title">MY TECH STACK</h1>
      <p className="section-desc">
        My expertise spans{" "}
        <span className="highlight-yellow">
          Data Science and AI technologies
        </span>
        , enabling me to deliver
        <br />
        <span className="highlight-teal">
          Machine Learning-driven solutions across various platforms.
        </span>
      </p>

      <div className="relative flex h-full bg-black">
        <div
          className="container max-w-screen-xl mx-auto relative z-20 overflow-x-hidden"
          style={{
            overflowX: "hidden",
            paddingTop: "5rem",
            paddingBottom: "5rem",
          }}
        >
          <Splide
            options={{
              type: "loop",
              autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false,
                rewind: true,
                speed: 3,
              },
              arrows: false,
              pagination: false,
              fixedWidth: "145px",
              gap: "2px",
            }}
            extensions={{ AutoScroll }}
          >
            {techLogos.map(({ src, alt, name }) => (
              <SplideSlide key={alt}>
                <img src={src} alt={alt} className="tech-logo" />
                <p className="tech-name">{name}</p>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
      <h1 className="section-title">CONNECT WITH ME</h1>
      <div className="social-media-div">
        <div
          style={{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            margin: "auto",
          }}
        >
          {socialLogos.map(({ src, alt, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              <img src={src} alt={alt} className="social-logo" />
            </a>
          ))}
        </div>
      </div>
      <h1 className="section-title">MY EDUCATION</h1>
      <div className="timeline">
        <ul>
          {educationTimeline.map(({ title, highlighted, desc, date }) => (
            <li>
              <div className="right_content">
                <h2>{title}</h2>
                <p className="desc-paragraph">
                  <span className="highlight-blue">{highlighted}</span>
                  {desc}{" "}
                </p>
              </div>
              <div className="left_content">
                <h3>{date}</h3>
              </div>
            </li>
          ))}
          <div style={{ clear: "both" }} />
        </ul>
      </div>
      <h1 className="section-title">MY EXPERIENCE</h1>
      <div className="timeline">
        <ul>
          {experienceTimeline.map(({ title, highlighted, desc, date }) => (
            <li>
              <div className="right_content">
                <h2>{title}</h2>
                <p className="desc-paragraph">
                  <span className="highlight-blue">{highlighted}</span>
                  {desc}{" "}
                </p>
              </div>
              <div className="left_content">
                <h3>{date}</h3>
              </div>
            </li>
          ))}
          <div style={{ clear: "both" }} />
        </ul>
      </div>
    </div>
  );
}

export default App;
