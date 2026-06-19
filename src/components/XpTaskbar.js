import { useEffect, useState } from "react";
import { useWindows } from "../context/WindowContext";
import { XP_APPS } from "../data/xpApps";
import { XP_ICONS } from "../data/xpIcons";
import XpIcon from "../data/xpIcons";

function XpTaskbar() {
  const {
    windows,
    focusedId,
    focusWindow,
    minimizeWindow,
    toggleStartMenu,
    startMenuOpen,
  } = useWindows();
  const [time, setTime] = useState("");

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

  const handleProgramClick = (instanceId) => {
    const window = windows.find((entry) => entry.instanceId === instanceId);
    if (!window) return;

    if (window.minimized || focusedId !== instanceId) {
      focusWindow(instanceId);
      return;
    }

    minimizeWindow(instanceId);
  };

  return (
    <footer className="xp-taskbar" aria-label="Windows taskbar">
      <button
        type="button"
        className={`xp-taskbar__start ${startMenuOpen ? "is-pressed" : ""}`}
        onClick={toggleStartMenu}
        aria-expanded={startMenuOpen}
        aria-haspopup="menu"
      >
        <XpIcon src={XP_ICONS.startLogo} size={20} className="xp-icon--start" />
        <span>start</span>
      </button>

      <div className="xp-taskbar__programs">
        {windows.map((window) => {
          const app = XP_APPS[window.appId];
          const isActive = focusedId === window.instanceId && !window.minimized;

          return (
            <button
              key={window.instanceId}
              type="button"
              className={`xp-taskbar__program ${isActive ? "is-active" : ""} ${
                window.minimized ? "is-minimized" : ""
              }`}
              onClick={() => handleProgramClick(window.instanceId)}
              aria-current={isActive ? "true" : undefined}
            >
              <XpIcon src={app.icon} size={16} />
              <span>{app.title}</span>
            </button>
          );
        })}
      </div>

      <div className="xp-taskbar__tray">
        <XpIcon src={XP_ICONS.applicationWindow} size={16} />
        <XpIcon src={XP_ICONS.internetExplorer} size={16} />
        <time className="xp-taskbar__clock">{time}</time>
      </div>
    </footer>
  );
}

export default XpTaskbar;
