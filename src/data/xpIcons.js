const ICON_BASE = `${process.env.PUBLIC_URL}/xp-icons`;

export const XP_ICONS = {
  myComputer: `${ICON_BASE}/my-computer.png`,
  myDocuments: `${ICON_BASE}/my-documents.png`,
  folder: `${ICON_BASE}/folder.png`,
  controlPanel: `${ICON_BASE}/control-panel.png`,
  internetExplorer: `${ICON_BASE}/internet-explorer.png`,
  msnMessenger: `${ICON_BASE}/msn-messenger.png`,
  recycleBin: `${ICON_BASE}/recycle-bin.png`,
  notepad: `${ICON_BASE}/notepad.png`,
  windowsMessenger: `${ICON_BASE}/windows-messenger.png`,
  applicationWindow: `${ICON_BASE}/application-window.png`,
  startLogo: `${ICON_BASE}/start-logo.ico`,
};

export const DESKTOP_SHORTCUTS = [
  {
    id: "hero",
    label: "My Computer",
    icon: XP_ICONS.myComputer,
    windowTitle: "Welcome Tour",
  },
  {
    id: "about",
    label: "My Documents",
    icon: XP_ICONS.myDocuments,
    windowTitle: "About Me - Notepad",
  },
  {
    id: "services",
    label: "My Projects",
    icon: XP_ICONS.folder,
    windowTitle: "My Projects",
  },
  {
    id: "stack",
    label: "Control Panel",
    icon: XP_ICONS.controlPanel,
    windowTitle: "Control Panel",
  },
  {
    id: "journey",
    label: "Internet Explorer",
    icon: XP_ICONS.internetExplorer,
    windowTitle: "Internet Explorer",
  },
  {
    id: "connect",
    label: "MSN Messenger",
    icon: XP_ICONS.msnMessenger,
    windowTitle: "MSN Messenger",
  },
  {
    id: "connect",
    label: "Recycle Bin",
    icon: XP_ICONS.recycleBin,
    windowTitle: "Recycle Bin",
    shortcutKey: "recycle-bin",
  },
];

function XpIcon({ src, size = 32, className = "" }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`xp-icon ${className}`.trim()}
      draggable={false}
    />
  );
}

export function XpStartLogo({ size = 20 }) {
  return <XpIcon src={XP_ICONS.startLogo} size={size} className="xp-icon--start" />;
}

export default XpIcon;
