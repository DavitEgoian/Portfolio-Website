import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import socialLogos from "../data/socialLogos";
import XpWindow from "./xp/XpWindow";
import { XP_ICONS } from "../data/xpIcons";

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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        0
      );

      linksRef.current.forEach((link, index) => {
        if (!link) return;
        timeline.fromTo(
          link,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.25 },
          0.35 + index * 0.15
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="scene scene--connect">
      <div ref={pinRef} className="scene__pin">
        <XpWindow
          title="Windows Messenger"
          iconSrc={XP_ICONS.msnMessenger}
          className="connect__window"
        >
          <div className="connect__buddy-list" aria-hidden="true">
            <p className="connect__buddy-header">Online (3)</p>
          </div>

          <h2 ref={headingRef} className="connect__heading">
            Send me a message!
          </h2>
          <p className="connect__sub">
            Double-click a contact below to open their profile in a new window.
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
                <span className="connect__status">● Online</span>
              </a>
            ))}
          </div>

          <footer className="connect__footer">
            <span>© {new Date().getFullYear()} Davit Egoian</span>
            <span>Built with nostalgia · Powered by scroll hijacking</span>
          </footer>
        </XpWindow>
      </div>
    </section>
  );
}

export default ConnectScene;
