import { useMemo } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import techLogos from "../data/techLogos";
import SectionTitle from "./SectionTitle";

function TechStack({ viewport }) {
  const splideOptions = useMemo(
    () => ({
      type: "loop",
      autoScroll: viewport.reduceMotion
        ? false
        : {
            pauseOnHover: false,
            pauseOnFocus: false,
            rewind: true,
            speed: 3,
          },
      arrows: false,
      pagination: false,
      fixedWidth:
        viewport.width < 380
          ? "80px"
          : viewport.width < 480
            ? "90px"
            : viewport.width < 768
              ? "110px"
              : "145px",
      gap: "2px",
      slideFocus: false,
      isNavigation: false,
    }),
    [viewport]
  );

  return (
    <section aria-labelledby="tech-stack">
      <SectionTitle id="tech-stack">MY TECH STACK</SectionTitle>
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

      <div className="tech-stack-section">
        <div className="container tech-stack-carousel">
          <Splide
            tag="div"
            options={splideOptions}
            extensions={viewport.reduceMotion ? {} : { AutoScroll }}
            aria-label="Technology stack carousel"
          >
            {techLogos.map(({ src, alt, name }) => (
              <SplideSlide key={alt}>
                <img
                  src={src}
                  alt={alt}
                  className="tech-logo"
                  loading="lazy"
                  decoding="async"
                />
                <p className="tech-name">{name}</p>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
