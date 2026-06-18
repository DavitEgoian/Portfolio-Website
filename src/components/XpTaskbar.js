import { useEffect, useState } from "react";
import { XpStartLogo } from "./xp/XpIcons";

const SECTIONS = [
  { id: "hero", label: "Welcome Tour" },
  { id: "about", label: "About Me - Notepad" },
  { id: "services", label: "My Projects" },
  { id: "stack", label: "Control Panel" },
  { id: "journey", label: "Internet Explorer" },
  { id: "connect", label: "MSN Messenger" },
];

function XpTaskbar() {
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="xp-taskbar" aria-label="Windows taskbar">
      <button type="button" className="xp-taskbar__start">
        <XpStartLogo />
        <span>start</span>
      </button>

      <div className="xp-taskbar__programs">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`xp-taskbar__program ${active === id ? "is-active" : ""}`}
            onClick={() => scrollTo(id)}
            aria-current={active === id ? "true" : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="xp-taskbar__tray">
        <span className="xp-taskbar__tray-icon" title="Volume" aria-hidden="true">
          🔊
        </span>
        <span className="xp-taskbar__tray-icon" title="Network" aria-hidden="true">
          📶
        </span>
        <time className="xp-taskbar__clock">{time}</time>
      </div>
    </footer>
  );
}

export default XpTaskbar;
