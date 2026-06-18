import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import educationTimeline from "../data/educationTimeline";
import experienceTimeline from "../data/experienceTimeline";
import certificationTimeline from "../data/certificationTimeline";

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_SECTIONS = [
  {
    key: "education",
    label: "EDUCATION",
    items: educationTimeline.map(
      ({ title, highlighted, desc, date }) => ({
        title,
        highlight: highlighted,
        desc,
        meta: date,
      })
    ),
  },
  {
    key: "experience",
    label: "EXPERIENCE",
    items: experienceTimeline.map(
      ({ title, highlighted, desc, date }) => ({
        title,
        highlight: highlighted,
        desc,
        meta: date,
      })
    ),
  },
  {
    key: "certifications",
    label: "CERTIFICATIONS",
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

function TimelineScene() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item || prefersReducedMotion) {
          if (item) gsap.set(item, { opacity: 1, x: 0 });
          return;
        }

        gsap.fromTo(
          item,
          { opacity: 0.15, x: 48, filter: "blur(4px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  let itemIndex = 0;

  return (
    <section id="journey" ref={sectionRef} className="scene scene--journey">
      <div className="journey__intro">
        <div className="section-label">
          <span>04</span>
          <span>TRAJECTORY</span>
        </div>
        <h2 className="journey__heading">Chronicle of growth</h2>
        <p className="journey__sub">
          Education, experience, and credentials—mapped as a living timeline.
        </p>
      </div>

      {JOURNEY_SECTIONS.map(({ key, label, items }) => (
        <div key={key} className="journey__group">
          <h3 className="journey__group-label">{label}</h3>
          <div className="journey__stream">
            {items.map(({ title, highlight, desc, meta, link }) => {
              const currentIndex = itemIndex;
              itemIndex += 1;

              return (
                <article
                  key={`${title}-${meta}`}
                  ref={(element) => {
                    itemsRef.current[currentIndex] = element;
                  }}
                  className="journey__item"
                >
                  <div className="journey__marker" aria-hidden="true" />
                  <div className="journey__content">
                    <time className="journey__date">{meta}</time>
                    <h4>{title}</h4>
                    <p>
                      <span className="journey__highlight">{highlight}</span>
                      {desc}
                    </p>
                    {link && (
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        View credential →
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default TimelineScene;
