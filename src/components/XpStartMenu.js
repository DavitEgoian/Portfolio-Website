import { useWindows } from "../context/WindowContext";
import { START_MENU_APPS } from "../data/xpApps";
import XpIcon from "../data/xpIcons";

function XpStartMenu() {
  const { startMenuOpen, openApp, setStartMenuOpen } = useWindows();

  if (!startMenuOpen) return null;

  return (
    <>
      <button
        type="button"
        className="xp-startmenu-backdrop"
        aria-label="Close Start menu"
        onClick={() => setStartMenuOpen(false)}
      />
      <div className="xp-startmenu" role="menu">
        <div className="xp-startmenu__header">
          <strong>Davit</strong>
          <span>Portfolio XP</span>
        </div>
        <ul className="xp-startmenu__list">
          {START_MENU_APPS.map((app) => (
            <li key={app.appId}>
              <button
                type="button"
                className="xp-startmenu__item"
                onClick={() => openApp(app.appId)}
              >
                <XpIcon src={app.icon} size={24} />
                <span>{app.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="xp-startmenu__footer">
          <button type="button" className="xp-startmenu__shutdown">
            Turn Off Computer
          </button>
        </div>
      </div>
    </>
  );
}

export default XpStartMenu;
