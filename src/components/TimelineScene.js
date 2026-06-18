import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import educationTimeline from "../data/educationTimeline";
import experienceTimeline from "../data/experienceTimeline";
import certificationTimeline from "../data/certificationTimeline";
import XpWindow from "./xp/XpWindow";
import { XP_ICONS } from "../data/xpIcons";

gsap.registerPlugin(ScrollTrigger);

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
          { opacity: 0.2, x: 30 },
          {
            opacity: 1,
            x: 0,
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
      <XpWindow
        title="Internet Explorer — Favorites"
        iconSrc={XP_ICONS.internetExplorer}
        className="journey__window"
        menu
      >
        <div className="journey__toolbar" aria-hidden="true">
          <span>← Back</span>
          <span>→ Forward</span>
          <span>🔄 Refresh</span>
          <span>🏠 Home</span>
        </div>
        <p className="journey__addressbar">
          Address: <strong>https://davitegoian.tech/history</strong>
        </p>
      </XpWindow>

      {JOURNEY_SECTIONS.map(({ key, label, items }) => (
        <div key={key} className="journey__group">
          <h3 className="journey__group-label">📁 {label}</h3>
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
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default TimelineScene;
