import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import techLogos from "../data/techLogos";

gsap.registerPlugin(ScrollTrigger);

function TechScene() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const ringRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const ring = ringRef.current;
    if (!section || !pin || !ring) return undefined;

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
        ring,
        { rotate: 0, scale: 0.85 },
        { rotate: 180, scale: 1, duration: 1 },
        0
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        timeline.fromTo(
          item,
          { opacity: 0, scale: 0.4, filter: "blur(6px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.12 },
          0.1 + index * 0.018
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const radius = 42;

  return (
    <section id="stack" ref={sectionRef} className="scene scene--stack">
      <div ref={pinRef} className="scene__pin stack__pin">
        <div className="section-label">
          <span>03</span>
          <span>TECH STACK</span>
        </div>

        <h2 className="stack__heading">
          Tools orbiting the same mission:
          <span> scalable intelligence.</span>
        </h2>

        <div className="stack__orbit-wrap">
          <div ref={ringRef} className="stack__orbit">
            {techLogos.map(({ src, alt, name }, index) => {
              const angle = (index / techLogos.length) * Math.PI * 2;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <div
                  key={alt}
                  ref={(element) => {
                    itemsRef.current[index] = element;
                  }}
                  className="stack__node"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <img src={src} alt={alt} loading="lazy" decoding="async" />
                  <span>{name}</span>
                </div>
              );
            })}
            <div className="stack__center">
              <span>ML</span>
              <span>OPS</span>
            </div>
          </div>
        </div>

        <div className="stack__marquee" aria-hidden="true">
          <div className="stack__marquee-track">
            {[...techLogos, ...techLogos].map(({ alt, name }, index) => (
              <span key={`${alt}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechScene;
