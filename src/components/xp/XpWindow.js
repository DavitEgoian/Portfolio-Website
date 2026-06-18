import XpIcon from "../../data/xpIcons";

function XpWindowControls() {
  return (
    <div className="xp-window__controls" aria-hidden="true">
      <button type="button" className="xp-window__btn xp-window__btn--min" tabIndex={-1} />
      <button type="button" className="xp-window__btn xp-window__btn--max" tabIndex={-1} />
      <button type="button" className="xp-window__btn xp-window__btn--close" tabIndex={-1} />
    </div>
  );
}

function XpWindow({
  title,
  iconSrc,
  children,
  className = "",
  active = false,
  menu = false,
}) {
  return (
    <div className={`xp-window ${active ? "is-active" : ""} ${className}`.trim()}>
      <div className="xp-window__titlebar">
        {iconSrc && (
          <span className="xp-window__icon">
            <XpIcon src={iconSrc} size={16} />
          </span>
        )}
        <span className="xp-window__title">{title}</span>
        <XpWindowControls />
      </div>
      {menu && (
        <div className="xp-window__menubar" aria-hidden="true">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>
      )}
      <div className="xp-window__body">{children}</div>
    </div>
  );
}

export default XpWindow;
