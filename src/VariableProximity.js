import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./VariableProximity.css";

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = "linear",
    className = "",
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const letterMetricsRef = useRef([]);
  const appliedSettingsRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);
  const reduceMotionRef = useRef(false);
  const touchActiveRef = useRef(false);
  const radiusSqRef = useRef(radius * radius);

  useEffect(() => {
    radiusSqRef.current = radius * radius;
  }, [radius]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = motionQuery.matches;
    const onChange = () => {
      reduceMotionRef.current = motionQuery.matches;
    };
    motionQuery.addEventListener("change", onChange);
    return () => motionQuery.removeEventListener("change", onChange);
  }, []);

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const parsedSettingsRef = useRef(parsedSettings);
  const fromSettingsRef = useRef(fromFontVariationSettings);
  const falloffRef = useRef(falloff);

  useEffect(() => {
    parsedSettingsRef.current = parsedSettings;
    fromSettingsRef.current = fromFontVariationSettings;
    falloffRef.current = falloff;
  }, [parsedSettings, fromFontVariationSettings, falloff]);

  const measureLetters = useCallback(() => {
    if (!containerRef?.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    letterMetricsRef.current = letterRefs.current.map((letterRef) => {
      if (!letterRef) return null;
      const rect = letterRef.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });
  }, [containerRef]);

  const calculateFalloff = useCallback((distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloffRef.current) {
      case "exponential":
        return norm ** 2;
      case "gaussian":
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case "linear":
      default:
        return norm;
    }
  }, [radius]);

  const applyProximity = useCallback(() => {
    if (!containerRef?.current || !isVisibleRef.current) {
      return;
    }

    if (reduceMotionRef.current) {
      return;
    }

    const { x, y } = mousePositionRef.current;
    const radiusSq = radiusSqRef.current;
    const fromSettings = fromSettingsRef.current;
    const settings = parsedSettingsRef.current;

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const metrics = letterMetricsRef.current[index];
      if (!metrics) return;

      const dx = x - metrics.x;
      const dy = y - metrics.y;
      const distSq = dx * dx + dy * dy;

      if (distSq >= radiusSq) {
        if (appliedSettingsRef.current[index] !== fromSettings) {
          letterRef.style.fontVariationSettings = fromSettings;
          appliedSettingsRef.current[index] = fromSettings;
        }
        return;
      }

      const distance = Math.sqrt(distSq);
      const falloffValue = calculateFalloff(distance);
      const newSettings = settings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue =
            fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(", ");

      if (appliedSettingsRef.current[index] !== newSettings) {
        letterRef.style.fontVariationSettings = newSettings;
        appliedSettingsRef.current[index] = newSettings;
      }
    });
  }, [calculateFalloff, containerRef]);

  const queueUpdate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      applyProximity();
    });
  }, [applyProximity]);

  useEffect(() => {
    const remeasure = () => {
      measureLetters();
      requestAnimationFrame(measureLetters);
    };

    remeasure();
    window.addEventListener("resize", remeasure);

    const container = containerRef?.current;
    let resizeObserver;
    if (container && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(remeasure);
      resizeObserver.observe(container);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(remeasure);
    }

    let intersectionObserver;
    if (container && typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);
    }

    return () => {
      window.removeEventListener("resize", remeasure);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerRef, measureLetters, label]);

  useEffect(() => {
    const updatePosition = (clientX, clientY) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePositionRef.current = {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      } else {
        mousePositionRef.current = { x: clientX, y: clientY };
      }
      queueUpdate();
    };

    const handleMouseMove = (ev) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      updatePosition(ev.clientX, ev.clientY);
    };
    const handleTouchStart = () => {
      touchActiveRef.current = true;
    };
    const handleTouchEnd = () => {
      touchActiveRef.current = false;
    };
    const handleTouchMove = (ev) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef, queueUpdate]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const baseline = { beta: null, gamma: null };
    const DEGREES_FOR_FULL_TRAVEL = 1;

    const updateFromTilt = (beta, gamma) => {
      if (touchActiveRef.current || !containerRef?.current) return;

      if (baseline.beta === null) {
        baseline.beta = beta;
        baseline.gamma = gamma;
        return;
      }

      const deltaBeta = beta - baseline.beta;
      const deltaGamma = gamma - baseline.gamma;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      const travelX = width / DEGREES_FOR_FULL_TRAVEL;
      const travelY = height / DEGREES_FOR_FULL_TRAVEL;
      const paddingX = width * 0.35;
      const paddingY = height * 0.5;

      mousePositionRef.current = {
        x: Math.max(
          -paddingX,
          Math.min(width + paddingX, centerX + deltaGamma * travelX)
        ),
        y: Math.max(
          -paddingY,
          Math.min(height + paddingY, centerY + deltaBeta * travelY)
        ),
      };
      queueUpdate();
    };

    const handleOrientation = (e) => {
      if (e.beta == null || e.gamma == null) return;
      updateFromTilt(e.beta, e.gamma);
    };

    const handleMotion = (e) => {
      if (touchActiveRef.current || !containerRef?.current) return;
      const rate = e.rotationRate;
      if (!rate) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const microScale = width / 25;
      const paddingX = width * 0.35;
      const paddingY = height * 0.5;

      mousePositionRef.current = {
        x: Math.max(
          -paddingX,
          Math.min(
            width + paddingX,
            mousePositionRef.current.x + (rate.gamma || 0) * microScale
          )
        ),
        y: Math.max(
          -paddingY,
          Math.min(
            height + paddingY,
            mousePositionRef.current.y + (rate.beta || 0) * microScale
          )
        ),
      };
      queueUpdate();
    };

    const resetBaseline = () => {
      baseline.beta = null;
      baseline.gamma = null;
    };

    const startGyro = () => {
      window.addEventListener("deviceorientation", handleOrientation);
      window.addEventListener("devicemotion", handleMotion);
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
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("touchstart", requestGyroAccess);
      window.removeEventListener("click", requestGyroAccess);
      window.removeEventListener("orientationchange", resetBaseline);
    };
  }, [containerRef, queueUpdate]);

  const words = label.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: "inline", ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++;
            return (
              <span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: "inline-block",
                  fontVariationSettings: fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
