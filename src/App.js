import React, { useRef, useState, useEffect } from "react";
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
import certificationTimeline from "./data/certificationTimeline";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function App() {
  const containerRef = useRef(null);
  const windowWidth = useWindowWidth();

  const heroMinFontSize = windowWidth < 480 ? 22 : windowWidth < 768 ? 28 : 36;
  const splideFixedWidth =
    windowWidth < 380 ? "90px" : windowWidth < 480 ? "100px" : windowWidth < 768 ? "120px" : "145px";

  return (
    <div className="App">
      <main>
        <section className="hero-section" aria-label="Introduction">
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
            minFontSize={heroMinFontSize}
          />
          <div ref={containerRef} className="hero-tagline">
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
              radius={windowWidth < 768 ? 60 : 100}
              falloff="linear"
            />
          </div>
        </section>

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
              <img src={icon} alt={`${title.toLowerCase()}-icon`} loading="lazy" decoding="async" />
              <h3>{title}</h3>
              <p>{desc}</p>
            </SpotlightCard>
          ))}
        </div>

        <h1 className="section-title">MY TECH STACK</h1>
        <p className="section-desc tech-stack-desc">
          My expertise spans{" "}
          <span className="highlight-yellow">
            Data Science and AI technologies
          </span>
          , enabling me to deliver{" "}
          <span className="highlight-teal">
            Machine Learning-driven solutions across various platforms.
          </span>
        </p>

        <section className="carousel-section" aria-label="Technology stack">
          <div className="container">
            <Splide
              tag="div"
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
                fixedWidth: splideFixedWidth,
                gap: "2px",
                slideFocus: false,
                isNavigation: false,
              }}
              extensions={{ AutoScroll }}
              aria-label="Technology stack carousel"
            >
              {techLogos.map(({ src, alt, name }) => (
                <SplideSlide key={alt}>
                  <img src={src} alt={alt} className="tech-logo" loading="lazy" decoding="async" />
                  <p className="tech-name">{name}</p>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </section>

        <h1 className="section-title">MY EDUCATION</h1>
        <div className="timeline">
          <ul>
            {educationTimeline.map(({ title, highlighted, desc, date }, index) => (
              <li key={index}>
                <div className="right_content">
                  <h2>{title}</h2>
                  <p className="desc-paragraph">
                    <span className="highlight-blue">{highlighted}</span>
                    {desc}{" "}
                  </p>
                </div>
                <div className="left_content">
                  <span className="timeline-date">{date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <h1 className="section-title">MY EXPERIENCE</h1>
        <div className="timeline">
          <ul>
            {experienceTimeline.map(({ title, highlighted, desc, date }, index) => (
              <li key={index}>
                <div className="right_content">
                  <h2>{title}</h2>
                  <p className="desc-paragraph">
                    <span className="highlight-blue">{highlighted}</span>
                    {desc}{" "}
                  </p>
                </div>
                <div className="left_content">
                  <span className="timeline-date">{date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <h1 className="section-title">LICENSES & CERTIFICATIONS</h1>
        <div className="timeline">
          <ul>
            {certificationTimeline.map(
              ({ name, issueOrganization, desc, issueDate, link }, index) => (
                <li key={index}>
                  <div className="right_content">
                    <h2>{name}</h2>
                    <p className="desc-paragraph">
                      <span className="highlight-blue">{issueOrganization}</span>
                      {desc}{" "}
                      <a href={link} aria-label={`View ${name} Certificate`}>
                        View Certificate
                      </a>
                    </p>
                  </div>
                  <div className="left_content date_only">
                    <span className="timeline-date">{issueDate}</span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <h1 className="section-title">CONNECT WITH ME</h1>
        <section className="social-section" aria-label="Social media links">
          <div className="social-media-div">
            {socialLogos.map(({ src, alt, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <img src={src} alt={alt} className="social-logo" loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
