import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import techLogos from "../data/techLogos";
import XpWindow from "./xp/XpWindow";
import { XpNotepadIcon } from "./xp/XpIcons";

gsap.registerPlugin(ScrollTrigger);

function TechScene() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const gridRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const grid = gridRef.current;
    if (!section || !pin || !grid) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(itemsRef.current, { opacity: 1, scale: 1 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: pin,
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      timeline.fromTo(
        grid,
        { y: 40, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 1 },
        0
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        timeline.fromTo(
          item,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.08 },
          0.1 + index * 0.018
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="scene scene--stack">
      <div ref={pinRef} className="scene__pin">
        <XpWindow
          title="Control Panel — Installed Programs"
          icon={<XpNotepadIcon />}
          className="stack__window"
          menu
        >
          <p className="stack__heading">
            Currently installed technologies on this system:
          </p>

          <div ref={gridRef} className="stack__grid">
            {techLogos.map(({ src, alt, name }, index) => (
              <div
                key={alt}
                ref={(element) => {
                  itemsRef.current[index] = element;
                }}
                className="stack__item"
              >
                <img src={src} alt={alt} loading="lazy" decoding="async" />
                <span>{name}</span>
              </div>
            ))}
          </div>

          <div className="stack__marquee" aria-hidden="true">
            <div className="stack__marquee-track">
              {[...techLogos, ...techLogos].map(({ alt, name }, index) => (
                <span key={`${alt}-${index}`}>{name}</span>
              ))}
            </div>
          </div>
        </XpWindow>
      </div>
    </section>
  );
}

export default TechScene;
