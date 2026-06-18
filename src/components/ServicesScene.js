import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cardsData from "../data/cardsData";
import XpWindow from "./xp/XpWindow";
import { XpFolderIcon } from "./xp/XpIcons";

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
        { opacity: 0, y: 20 },
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
      <XpWindow
        title="My Projects"
        icon={<XpFolderIcon />}
        className="services__window"
      >
        <div className="services__header">
          <p ref={headingRef} className="services__addressbar">
            Address: <strong>C:\Documents and Settings\Davit\My Projects</strong>
          </p>
          <p className="services__hint">Scroll to browse folders →</p>
        </div>
      </XpWindow>

      <div className="services__viewport">
        <div ref={trackRef} className="services__track">
          {cardsData.map(({ icon, title, desc }, index) => (
            <article key={title} className="service-card xp-folder-item">
              <div className="service-card__icon-wrap">
                <img src={icon} alt="" loading="lazy" decoding="async" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="service-card__index">
                Folder ({index + 1} of {cardsData.length})
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesScene;
