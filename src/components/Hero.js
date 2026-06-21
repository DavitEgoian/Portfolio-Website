import { useRef } from "react";
import TextPressure from "../TextPressure";
import VariableProximity from "../VariableProximity";

function Hero({ helloMinFontSize, proximityRadius }) {
  const containerRef = useRef(null);

  return (
    <section className="hero-section" aria-label="Introduction" id="top">
      <div className="text-pressure-wrapper">
        <TextPressure
          text="Hello!"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={helloMinFontSize}
        />
      </div>
      <div ref={containerRef} className="hero-tagline">
        <VariableProximity
          label="I build intelligent systems that balance accuracy, scalability, and interpretability."
          className="variable-proximity-demo"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={proximityRadius}
          falloff="linear"
        />
      </div>
    </section>
  );
}

export default Hero;
