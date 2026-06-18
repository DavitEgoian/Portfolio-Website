import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import AmbientCanvas from "./components/AmbientCanvas";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import HeroScene from "./components/HeroScene";
import AboutScene from "./components/AboutScene";
import ServicesScene from "./components/ServicesScene";
import TechScene from "./components/TechScene";
import TimelineScene from "./components/TimelineScene";
import ConnectScene from "./components/ConnectScene";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="app">
      <div className="app__grain" aria-hidden="true" />
      <div className="app__grid" aria-hidden="true" />
      <AmbientCanvas />
      <ScrollProgress />
      <Navigation />

      <main className="app__main">
        <HeroScene />
        <AboutScene />
        <ServicesScene />
        <TechScene />
        <TimelineScene />
        <ConnectScene />
      </main>
    </div>
  );
}

export default App;
