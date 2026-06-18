import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = [
  "Intelligent systems.",
  "Interpretable by design.",
  "Built for 2045.",
];

function HeroScene() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const linesRef = useRef([]);
  const orbitRef = useRef(null);
  const scrollCueRef = useRef(null);
  const yearRef = useRef(null);

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
          { opacity: 1, scale: 1, filter: "blur(0px)" },
          { opacity: 0, scale: 1.4, filter: "blur(12px)", duration: 1 },
          0
        )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 80, letterSpacing: "0.6em" },
          { opacity: 1, y: 0, letterSpacing: "0.08em", duration: 1 },
          0.35
        )
        .fromTo(
          orbitRef.current,
          { scale: 0.6, opacity: 0, rotate: -30 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1 },
          0.5
        );

      linesRef.current.forEach((line, index) => {
        if (!line) return;
        timeline.fromTo(
          line,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60, filter: "blur(8px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7 },
          0.9 + index * 0.25
        );
      });

      timeline
        .fromTo(
          yearRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6 },
          1.6
        )
        .to(scrollCueRef.current, { opacity: 0, y: 20, duration: 0.4 }, 0.2)
        .to(pin, { opacity: 0.35, filter: "blur(2px)", duration: 0.8 }, 2.2);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="scene scene--hero">
      <div ref={pinRef} className="scene__pin hero__pin">
        <div ref={orbitRef} className="hero__orbit" aria-hidden="true">
          <span className="hero__ring hero__ring--outer" />
          <span className="hero__ring hero__ring--inner" />
          <span className="hero__core" />
        </div>

        <p className="hero__meta">
          <span>TBILISI, GE</span>
          <span>DATA SCIENCE × AI</span>
        </p>

        <h1 ref={greetingRef} className="hero__greeting">
          HELLO
        </h1>

        <h2 ref={nameRef} className="hero__name">
          DAVIT EGOIAN
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

        <div ref={yearRef} className="hero__year">
          <span className="hero__year-label">TEMPORAL INDEX</span>
          <span className="hero__year-value">2045</span>
        </div>

        <div ref={scrollCueRef} className="hero__scroll-cue">
          <span>SCROLL TO INITIALIZE</span>
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}

export default HeroScene;
