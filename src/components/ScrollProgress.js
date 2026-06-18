import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
      },
    });

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div className="xp-download" aria-hidden="true">
      <span className="xp-download__label">Copying portfolio files...</span>
      <div className="xp-download__track">
        <div ref={barRef} className="xp-download__bar" />
      </div>
    </div>
  );
}

export default ScrollProgress;
