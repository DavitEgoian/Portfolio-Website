import { XP_ICONS } from "../../data/xpIcons";

function RecycleBinApp() {
  return (
    <div className="recycle-bin-app app-panel">
      <div className="recycle-bin-app__toolbar" aria-hidden="true">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>

      <div className="recycle-bin-app__empty">
        <img src={XP_ICONS.recycleBin} alt="" width={96} height={96} draggable={false} />
        <p>Recycle Bin is empty.</p>
        <span className="recycle-bin-app__hint">
          Items you delete from the desktop or hard drive appear here.
        </span>
      </div>

      <div className="recycle-bin-app__statusbar" aria-hidden="true">
        0 object(s)
      </div>
    </div>
  );
}

export default RecycleBinApp;
