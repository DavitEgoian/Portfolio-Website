import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import XpWindow from "./xp/XpWindow";
import { XP_ICONS } from "../data/xpIcons";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_WORDS = [
  "Hi,",
  "I'm",
  "Davit,",
  "a",
  "Data",
  "Science",
  "and",
  "AI",
  "student",
  "at",
  "Georgian",
  "National",
  "University",
  "SEU",
  "in",
  "Tbilisi,",
  "Georgia.",
  "I",
  "build",
  "impactful",
  "tech",
  "solutions—",
  "from",
  "statistical",
  "models",
  "and",
  "visualizations",
  "to",
  "automated",
  "feature",
  "engineering",
  "and",
  "explainable",
  "AI.",
  "Beyond",
  "coding,",
  "I",
  "mentor",
  "teams",
  "and",
  "lead",
  "hackathons",
  "to",
  "drive",
  "real-world",
  "innovation.",
];

const HIGHLIGHT_WORDS = new Set([
  "Data",
  "Science",
  "AI",
  "mentor",
  "lead",
  "hackathons",
]);

function AboutScene() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const wordsRef = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, ...wordsRef.current], { opacity: 1 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      timeline.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        0
      );

      wordsRef.current.forEach((word, index) => {
        if (!word) return;
        timeline.fromTo(
          word,
          { opacity: 0.15, backgroundColor: "transparent" },
          { opacity: 1, backgroundColor: "#316ac5", color: "#fff", duration: 0.08 },
          0.15 + index * 0.025
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="scene scene--about">
      <div ref={pinRef} className="scene__pin">
        <XpWindow
          title="about_me.txt — Notepad"
          iconSrc={XP_ICONS.notepad}
          className="about__window"
          menu
        >
          <div className="about__toolbar" aria-hidden="true">
            <span>Font</span>
            <span>Search</span>
            <span>Help</span>
          </div>
          <h2 ref={headingRef} className="about__heading">
            * About Davit Egoian *
          </h2>
          <p className="about__copy">
            {ABOUT_WORDS.map((word, index) => (
              <span
                key={`${word}-${index}`}
                ref={(element) => {
                  wordsRef.current[index] = element;
                }}
                className={`about__word ${
                  HIGHLIGHT_WORDS.has(word.replace(/[,.]/g, "")) ? "is-highlight" : ""
                }`}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="about__statusbar" aria-hidden="true">
            Ln 1, Col 1
          </div>
        </XpWindow>
      </div>
    </section>
  );
}

export default AboutScene;
