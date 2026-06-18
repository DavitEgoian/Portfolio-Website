import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import XpWindow from "./xp/XpWindow";
import { XP_ICONS } from "../data/xpIcons";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = [
  "Intelligent systems that balance accuracy,",
  "scalability, and interpretability.",
  "Welcome to my digital workspace.",
];

function HeroScene() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const linesRef = useRef([]);
  const logoRef = useRef(null);
  const scrollCueRef = useRef(null);
  const versionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([greetingRef.current, nameRef.current, ...linesRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          pin: pin,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(
          greetingRef.current,
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 1.08, duration: 1 },
          0
        )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          0.35
        )
        .fromTo(
          logoRef.current,
          { scale: 0.5, opacity: 0, rotate: -20 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1 },
          0.5
        );

      linesRef.current.forEach((line, index) => {
        if (!line) return;
        timeline.fromTo(
          line,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          { opacity: 1, x: 0, duration: 0.7 },
          0.9 + index * 0.25
        );
      });

      timeline
        .fromTo(
          versionRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6 },
          1.6
        )
        .to(scrollCueRef.current, { opacity: 0, y: 10, duration: 0.4 }, 0.2)
        .to(pin, { opacity: 0.6, duration: 0.8 }, 2.2);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="scene scene--hero">
      <div ref={pinRef} className="scene__pin">
        <XpWindow
          title="Welcome to Davit Egoian — Portfolio Edition"
          iconSrc={XP_ICONS.myComputer}
          className="hero__window"
          active
        >
          <div className="hero__content">
            <div ref={logoRef} className="hero__xp-logo" aria-hidden="true">
              <img src={XP_ICONS.myComputer} alt="" width={64} height={64} draggable={false} />
            </div>

            <p className="hero__meta">
              <span>📍 Tbilisi, Georgia</span>
              <span>💾 Data Science &amp; AI Student</span>
            </p>

            <h1 ref={greetingRef} className="hero__greeting">
              Hello!
            </h1>

            <h2 ref={nameRef} className="hero__name">
              Davit Egoian
            </h2>

            <div className="hero__lines">
              {HERO_LINES.map((line, index) => (
                <p
                  key={line}
                  ref={(element) => {
                    linesRef.current[index] = element;
                  }}
                  className="hero__line"
                >
                  {line}
                </p>
              ))}
            </div>

            <div ref={versionRef} className="hero__version">
              <span>Microsoft® Windows</span>
              <strong>Portfolio XP</strong>
              <span>Version 2001 (Build 5.1.2600)</span>
            </div>

            <div ref={scrollCueRef} className="hero__scroll-cue">
              <span>▼ Scroll to begin the tour</span>
            </div>
          </div>
        </XpWindow>
      </div>
    </section>
  );
}

export default HeroScene;
