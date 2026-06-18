import { useCallback, useEffect, useState } from "react";
import { DESKTOP_SHORTCUTS } from "../data/xpIcons";
import XpIcon from "../data/xpIcons";
import { scrollToSection } from "../utils/scrollToSection";

function XpDesktop() {
  const [selectedKey, setSelectedKey] = useState("hero");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = [...new Set(DESKTOP_SHORTCUTS.map(({ id }) => id))];
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const openShortcut = useCallback((shortcut) => {
    setSelectedKey(shortcut.shortcutKey || shortcut.id);
    scrollToSection(shortcut.id);
  }, []);

  const handleIconClick = (shortcut) => {
    setSelectedKey(shortcut.shortcutKey || shortcut.id);
  };

  const handleDesktopClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedKey(null);
    }
  };

  const handleKeyDown = (event, shortcut) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openShortcut(shortcut);
    }
  };

  return (
    <div
      className="xp-desktop"
      onClick={handleDesktopClick}
      onKeyDown={(event) => {
        if (event.key === "Escape") setSelectedKey(null);
      }}
      role="presentation"
    >
      <p className="xp-desktop__hint">Double-click icons to open</p>
      <ul className="xp-desktop__icons">
        {DESKTOP_SHORTCUTS.map((shortcut) => {
          const key = shortcut.shortcutKey || shortcut.id;
          const isSelected = selectedKey === key;
          const isActive = activeSection === shortcut.id && !shortcut.shortcutKey;

          return (
            <li key={key}>
              <button
                type="button"
                className={`xp-desktop__icon ${isSelected ? "is-selected" : ""} ${
                  isActive ? "is-active" : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleIconClick(shortcut);
                }}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  openShortcut(shortcut);
                }}
                onKeyDown={(event) => handleKeyDown(event, shortcut)}
                aria-label={`Open ${shortcut.label}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <XpIcon src={shortcut.icon} size={48} className="xp-desktop__icon-img" />
                <span>{shortcut.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default XpDesktop;
