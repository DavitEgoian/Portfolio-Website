import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import socialLogos from "../data/socialLogos";

gsap.registerPlugin(ScrollTrigger);

function ConnectScene() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: pin,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      timeline.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        0
      );

      linksRef.current.forEach((link, index) => {
        if (!link) return;
        timeline.fromTo(
          link,
          { opacity: 0, y: 40, rotateX: 25 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.25 },
          0.35 + index * 0.15
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="scene scene--connect">
      <div ref={pinRef} className="scene__pin connect__pin">
        <div className="section-label">
          <span>05</span>
          <span>CONNECT</span>
        </div>

        <h2 ref={headingRef} className="connect__heading">
          Initialize contact protocol.
        </h2>
        <p className="connect__sub">
          Open channels for collaboration, research, and building what&apos;s next.
        </p>

        <div className="connect__links">
          {socialLogos.map(({ src, alt, href, name }, index) => (
            <a
              key={href}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="connect__card"
            >
              <img src={src} alt={alt} loading="lazy" decoding="async" />
              <span>{name}</span>
              <span className="connect__arrow">↗</span>
            </a>
          ))}
        </div>

        <footer className="connect__footer">
          <span>© {new Date().getFullYear()} Davit Egoian</span>
          <span>Engineered in Tbilisi · Deployed to the future</span>
        </footer>
      </div>
    </section>
  );
}

export default ConnectScene;
