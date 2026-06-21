import "./App.css";
import useViewport from "./hooks/useViewport";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Connect from "./components/Connect";
import JsonLd from "./components/JsonLd";

function App() {
  const viewport = useViewport();

  const proximityRadius =
    viewport.width < 640 ? 45 : viewport.width < 1024 ? 70 : 100;

  const helloMinFontSize =
    viewport.width < 380 ? 26 : viewport.width < 480 ? 30 : 36;

  return (
    <div className="App">
      <JsonLd />
      <Navigation />
      <main>
        <Hero
          helloMinFontSize={helloMinFontSize}
          proximityRadius={proximityRadius}
        />
        <About />
        <WhatIDo />
        <TechStack viewport={viewport} />
        <Projects />
        <Education />
        <Experience />
        <Certifications />
        <Connect />
      </main>
    </div>
  );
}

export default App;
