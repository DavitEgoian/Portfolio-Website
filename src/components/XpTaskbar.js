import { useEffect, useState } from "react";
import { DESKTOP_SHORTCUTS, XP_ICONS } from "../data/xpIcons";
import XpIcon from "../data/xpIcons";
import { scrollToSection } from "../utils/scrollToSection";

const TASKBAR_PROGRAMS = DESKTOP_SHORTCUTS.filter(
  (shortcut) => !shortcut.shortcutKey
);

function XpTaskbar() {
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");

  useEffect(() => {
    const sectionIds = [...new Set(TASKBAR_PROGRAMS.map(({ id }) => id))];
    const observers = sectionIds.map((id) => {
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

  return (
    <footer className="xp-taskbar" aria-label="Windows taskbar">
      <button type="button" className="xp-taskbar__start">
        <XpIcon src={XP_ICONS.startLogo} size={20} className="xp-icon--start" />
        <span>start</span>
      </button>

      <div className="xp-taskbar__programs">
        {TASKBAR_PROGRAMS.map((shortcut) => (
          <button
            key={shortcut.id}
            type="button"
            className={`xp-taskbar__program ${active === shortcut.id ? "is-active" : ""}`}
            onClick={() => scrollToSection(shortcut.id)}
            aria-current={active === shortcut.id ? "true" : undefined}
          >
            <XpIcon src={shortcut.icon} size={16} />
            <span>{shortcut.windowTitle}</span>
          </button>
        ))}
      </div>

      <div className="xp-taskbar__tray">
        <XpIcon src={XP_ICONS.applicationWindow} size={16} title="Volume" />
        <XpIcon src={XP_ICONS.internetExplorer} size={16} title="Network" />
        <time className="xp-taskbar__clock">{time}</time>
      </div>
    </footer>
  );
}

export default XpTaskbar;
