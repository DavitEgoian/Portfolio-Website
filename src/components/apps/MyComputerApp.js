import { useEffect, useRef } from "react";
import gsap from "gsap";
import XpIcon, { XP_ICONS } from "../../data/xpIcons";

const HERO_LINES = [
  "A creative person shaping brands, campaigns,",
  "and digital experiences that turn ideas into memorable, high-performing work.",
  "Welcome to my digital workspace.",
];

function MyComputerApp() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".hero-animate"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="hero__content app-panel">
      <div className="hero__xp-logo hero-animate" aria-hidden="true">
        <img src={XP_ICONS.myComputer} alt="" width={64} height={64} draggable={false} />
      </div>

      <p className="hero__meta hero-animate">
        <span className="hero__meta-item">
          <XpIcon src={XP_ICONS.mapNetwork} size={16} className="hero__meta-icon" />
          Tbilisi, Georgia
        </span>
        <span className="hero__meta-item">
          <XpIcon src={XP_ICONS.floppyDisk} size={16} className="hero__meta-icon" />
          Creative Director
        </span>
      </p>

      <h1 className="hero__greeting hero-animate">Hello!</h1>
      <h2 className="hero__name hero-animate">My name is Davit Egoian</h2>

      <div className="hero__lines">
        {HERO_LINES.map((line) => (
          <p key={line} className="hero__line hero-animate">
            {line}
          </p>
        ))}
      </div>

      <div className="hero__version hero-animate">
        <span>Microsoft® Windows</span>
        <strong>Portfolio XP</strong>
        <span>Version 2001 (Build 5.1.2600)</span>
      </div>
    </div>
  );
}

export default MyComputerApp;
