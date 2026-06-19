import XpIcon from "../../data/xpIcons";

function XpWindowControls({ onMinimize, onMaximize, onClose }) {
  return (
    <div className="xp-window__controls">
      <button
        type="button"
        className="xp-window__btn xp-window__btn--min"
        aria-label="Minimize"
        onClick={(event) => {
          event.stopPropagation();
          onMinimize?.();
        }}
      />
      <button
        type="button"
        className="xp-window__btn xp-window__btn--max"
        aria-label="Maximize"
        onClick={(event) => {
          event.stopPropagation();
          onMaximize?.();
        }}
      />
      <button
        type="button"
        className="xp-window__btn xp-window__btn--close"
        aria-label="Close"
        onClick={(event) => {
          event.stopPropagation();
          onClose?.();
        }}
      />
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
  onTitleMouseDown,
  onMinimize,
  onMaximize,
  onClose,
}) {
  return (
    <div className={`xp-window ${active ? "is-active" : ""} ${className}`.trim()}>
      <div
        className="xp-window__titlebar"
        onMouseDown={onTitleMouseDown}
        role="presentation"
      >
        {iconSrc && (
          <span className="xp-window__icon">
            <XpIcon src={iconSrc} size={16} />
          </span>
        )}
        <span className="xp-window__title">{title}</span>
        <XpWindowControls
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={onClose}
        />
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
