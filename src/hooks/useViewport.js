import { useState, useEffect } from "react";

export default function useViewport() {
  const [viewport, setViewport] = useState({
    width: 1200,
    reduceMotion: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        reduceMotion: motionQuery?.matches ?? false,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    if (motionQuery?.addEventListener) {
      motionQuery.addEventListener("change", updateViewport);
    }

    return () => {
      window.removeEventListener("resize", updateViewport);
      motionQuery?.removeEventListener?.("change", updateViewport);
    };
  }, []);

  return viewport;
}
