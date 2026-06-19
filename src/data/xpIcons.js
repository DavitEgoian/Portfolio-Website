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

export default XpIcon;
