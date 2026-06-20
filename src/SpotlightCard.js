import { useRef, useCallback } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef(null);

  const updateSpotlight = useCallback((clientX, clientY) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
    divRef.current.classList.add("spotlight-active");
  }, [spotlightColor]);

  const handleMouseMove = (e) => {
    updateSpotlight(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch) updateSpotlight(touch.clientX, touch.clientY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (touch) updateSpotlight(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    divRef.current?.classList.remove("spotlight-active");
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
