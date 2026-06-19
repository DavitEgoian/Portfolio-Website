import { useWindows } from "../context/WindowContext";
import { DESKTOP_SHORTCUTS } from "../data/xpApps";
import XpIcon from "../data/xpIcons";

function XpDesktop() {
  const { selectedIcon, setSelectedIcon, openApp } = useWindows();

  const handleDesktopClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedIcon(null);
    }
  };

  const handleKeyDown = (event, appId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openApp(appId);
    }
  };

  return (
    <div
      className="xp-desktop"
      onClick={handleDesktopClick}
      onKeyDown={(event) => {
        if (event.key === "Escape") setSelectedIcon(null);
      }}
      role="presentation"
    >
      <ul className="xp-desktop__icons">
        {DESKTOP_SHORTCUTS.map((shortcut) => {
          const isSelected = selectedIcon === shortcut.appId;

          return (
            <li key={shortcut.appId}>
              <button
                type="button"
                className={`xp-desktop__icon ${isSelected ? "is-selected" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedIcon(shortcut.appId);
                }}
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  openApp(shortcut.appId);
                }}
                onKeyDown={(event) => handleKeyDown(event, shortcut.appId)}
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
