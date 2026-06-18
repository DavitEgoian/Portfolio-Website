import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4 },
        0
      );

      wordsRef.current.forEach((word, index) => {
        if (!word) return;
        timeline.fromTo(
          word,
          { opacity: 0.12, y: 16, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.08 },
          0.15 + index * 0.025
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="scene scene--about">
      <div ref={pinRef} className="scene__pin about__pin">
        <div className="section-label">
          <span>01</span>
          <span>ABOUT</span>
        </div>

        <h2 ref={headingRef} className="about__heading">
          Signal decoded from the noise.
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
      </div>
    </section>
  );
}

export default AboutScene;
