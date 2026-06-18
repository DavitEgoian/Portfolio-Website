import {
  XpComputerIcon,
  XpFolderIcon,
  XpIeIcon,
  XpMessengerIcon,
  XpMyDocsIcon,
  XpNotepadIcon,
  XpRecycleIcon,
} from "./xp/XpIcons";

const DESKTOP_ICONS = [
  { label: "My Computer", icon: <XpComputerIcon />, id: "hero" },
  { label: "My Documents", icon: <XpMyDocsIcon />, id: "about" },
  { label: "My Projects", icon: <XpFolderIcon />, id: "services" },
  { label: "Control Panel", icon: <XpNotepadIcon />, id: "stack" },
  { label: "Internet Explorer", icon: <XpIeIcon />, id: "journey" },
  { label: "MSN Messenger", icon: <XpMessengerIcon />, id: "connect" },
  { label: "Recycle Bin", icon: <XpRecycleIcon />, id: "connect" },
];

function XpDesktop() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="xp-desktop" aria-hidden="true">
      <ul className="xp-desktop__icons">
        {DESKTOP_ICONS.map(({ label, icon, id }) => (
          <li key={label}>
            <button type="button" className="xp-desktop__icon" onClick={() => scrollTo(id)}>
              {icon}
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default XpDesktop;
