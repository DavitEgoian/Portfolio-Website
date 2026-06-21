import { useEffect, useRef, useState, useCallback } from "react";

const TextPressure = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = `${process.env.PUBLIC_URL}/fonts/CompressaPRO-GX.woff2`,

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = "#FFFFFF",
  strokeColor = "#FF0000",
  className = "",

  minFontSize = 24,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const isTouchRef = useRef(false);
  const useGyroRef = useRef(false);
  const touchActiveRef = useRef(false);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = motionQuery.matches;
    const onChange = () => {
      reduceMotionRef.current = motionQuery.matches;
    };
    motionQuery.addEventListener("change", onChange);
    return () => motionQuery.removeEventListener("change", onChange);
  }, []);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(pointer: coarse)").matches;

    const handleMouseMove = (e) => {
      if (isTouchRef.current) return;
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchStart = () => {
      touchActiveRef.current = true;
    };
    const handleTouchEnd = () => {
      touchActiveRef.current = false;
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const baseline = { beta: null, gamma: null };
    // Degrees of tilt needed to sweep across the full text width
    const DEGREES_FOR_FULL_TRAVEL = 28;
    const tiltTarget = { x: 0, y: 0 };
    let tiltTargetInitialized = false;

    const updateCursorFromTilt = (beta, gamma) => {
      if (!containerRef.current) return;

      if (baseline.beta === null) {
        baseline.beta = beta;
        baseline.gamma = gamma;
        return;
      }

      const deltaBeta = beta - baseline.beta;
      const deltaGamma = gamma - baseline.gamma;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const travelX = width / DEGREES_FOR_FULL_TRAVEL;
      const travelY = height / DEGREES_FOR_FULL_TRAVEL;
      const paddingX = width * 0.25;
      const paddingY = height * 0.35;

      const rawX = Math.max(
        left - paddingX,
        Math.min(left + width + paddingX, centerX + deltaGamma * travelX)
      );
      const rawY = Math.max(
        top - paddingY,
        Math.min(top + height + paddingY, centerY + deltaBeta * travelY)
      );

      if (!tiltTargetInitialized) {
        tiltTarget.x = rawX;
        tiltTarget.y = rawY;
        tiltTargetInitialized = true;
      } else {
        // Low-pass filter on tilt input so rotation feels gradual, not jumpy
        const inputSmoothing = 0.12;
        tiltTarget.x += (rawX - tiltTarget.x) * inputSmoothing;
        tiltTarget.y += (rawY - tiltTarget.y) * inputSmoothing;
      }

      cursorRef.current.x = tiltTarget.x;
      cursorRef.current.y = tiltTarget.y;
      useGyroRef.current = true;
    };

    const handleOrientation = (e) => {
      if (touchActiveRef.current) return;
      if (e.beta == null || e.gamma == null) return;
      updateCursorFromTilt(e.beta, e.gamma);
    };

    const resetBaseline = () => {
      baseline.beta = null;
      baseline.gamma = null;
      tiltTargetInitialized = false;
    };

    const startGyro = () => {
      window.addEventListener("deviceorientation", handleOrientation);
    };

    const requestGyroAccess = async () => {
      let granted = true;

      if (
        window.DeviceOrientationEvent &&
        typeof window.DeviceOrientationEvent.requestPermission === "function"
      ) {
        granted = false;
        try {
          granted =
            (await window.DeviceOrientationEvent.requestPermission()) ===
            "granted";
        } catch (_) {
          /* permission denied */
        }
      }

      if (
        granted &&
        window.DeviceMotionEvent &&
        typeof window.DeviceMotionEvent.requestPermission === "function"
      ) {
        try {
          const motionState = await window.DeviceMotionEvent.requestPermission();
          if (motionState !== "granted") granted = false;
        } catch (_) {
          granted = false;
        }
      }

      if (granted) startGyro();
    };

    if (
      (window.DeviceOrientationEvent &&
        typeof window.DeviceOrientationEvent.requestPermission ===
          "function") ||
      (window.DeviceMotionEvent &&
        typeof window.DeviceMotionEvent.requestPermission === "function")
    ) {
      window.addEventListener("touchstart", requestGyroAccess, {
        once: true,
        passive: true,
      });
      window.addEventListener("click", requestGyroAccess, { once: true });
    } else {
      startGyro();
    }

    window.addEventListener("orientationchange", resetBaseline);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("touchstart", requestGyroAccess);
      window.removeEventListener("click", requestGyroAccess);
      window.removeEventListener("orientationchange", resetBaseline);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      if (reduceMotionRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const smoothing =
        isTouchRef.current && useGyroRef.current && !touchActiveRef.current
          ? 42
          : 15;

      mouseRef.current.x +=
        (cursorRef.current.x - mouseRef.current.x) / smoothing;
      mouseRef.current.y +=
        (cursorRef.current.y - mouseRef.current.y) / smoothing;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const getAttr = (distance, minVal, maxVal) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length]);

  const dynamicClassName = [
    className,
    flex ? "text-pressure-flex" : "",
    stroke ? "text-pressure-stroke" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className="text-pressure-root"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}') format('woff2');
          font-style: normal;
          font-display: swap;
        }

        .text-pressure-flex {
          display: flex;
          justify-content: space-between;
        }

        .text-pressure-stroke span {
          position: relative;
          color: ${textColor};
        }
        .text-pressure-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: "uppercase",
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            data-char={char}
            style={{
              display: "inline-block",
              color: stroke ? undefined : textColor,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
