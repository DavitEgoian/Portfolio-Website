import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cardsData from "../data/cardsData";

gsap.registerPlugin(ScrollTrigger);

function ServicesScene() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const getScrollDistance = () =>
        Math.max(track.scrollWidth - window.innerWidth + 120, 0);

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="scene scene--services">
      <div className="services__header">
        <div className="section-label">
          <span>02</span>
          <span>CAPABILITIES</span>
        </div>
        <h2 ref={headingRef} className="services__heading">
          What I engineer
        </h2>
      </div>

      <div className="services__viewport">
        <div ref={trackRef} className="services__track">
          {cardsData.map(({ icon, title, desc }, index) => (
            <article key={title} className="service-card">
              <span className="service-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="service-card__icon-wrap">
                <img src={icon} alt="" loading="lazy" decoding="async" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="service-card__glow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesScene;
