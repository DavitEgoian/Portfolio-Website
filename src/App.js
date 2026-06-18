import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import XpDesktop from "./components/XpDesktop";
import XpTaskbar from "./components/XpTaskbar";
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
    <div
      className="app xp-desktop-shell"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bliss.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <XpDesktop />
      <ScrollProgress />

      <main className="app__main">
        <HeroScene />
        <AboutScene />
        <ServicesScene />
        <TechScene />
        <TimelineScene />
        <ConnectScene />
      </main>

      <XpTaskbar />
    </div>
  );
}

export default App;
