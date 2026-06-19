import { useCallback, useEffect, useRef } from "react";
import XpWindow from "./xp/XpWindow";
import { XP_APPS } from "../data/xpApps";
import { useWindows } from "../context/WindowContext";

function XpDesktopWindow({ windowState }) {
  const {
    focusedId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
  } = useWindows();

  const dragOffset = useRef({ x: 0, y: 0 });
  const app = XP_APPS[windowState.appId];
  const AppComponent = app.component;
  const isFocused = focusedId === windowState.instanceId;

  const handleDragMove = useCallback(
    (event) => {
      moveWindow(
        windowState.instanceId,
        event.clientX - dragOffset.current.x,
        event.clientY - dragOffset.current.y
      );
    },
    [moveWindow, windowState.instanceId]
  );

  const handleDragEnd = useCallback(() => {
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
  }, [handleDragMove]);

  const handleDragStart = (event) => {
    if (windowState.maximized) return;
    focusWindow(windowState.instanceId);
    dragOffset.current = {
      x: event.clientX - windowState.x,
      y: event.clientY - windowState.y,
    };
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
  };

  useEffect(() => () => handleDragEnd(), [handleDragEnd]);

  if (windowState.minimized) return null;

  const style = windowState.maximized
    ? {
        left: "7.5rem",
        top: 0,
        width: "calc(100% - 7.5rem)",
        height: "calc(100% - var(--xp-taskbar-height))",
        zIndex: windowState.zIndex,
      }
    : {
        left: windowState.x,
        top: windowState.y,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
      };

  return (
    <div
      className={`xp-desktop-window ${isFocused ? "is-focused" : ""} ${
        windowState.maximized ? "is-maximized" : ""
      }`}
      style={style}
      onMouseDown={() => focusWindow(windowState.instanceId)}
    >
      <XpWindow
        title={app.title}
        iconSrc={app.icon}
        className={`xp-desktop-window__frame ${app.id}-window`}
        active={isFocused}
        menu={app.menu}
        onTitleMouseDown={handleDragStart}
        onMinimize={() => minimizeWindow(windowState.instanceId)}
        onMaximize={() => toggleMaximize(windowState.instanceId)}
        onClose={() => closeWindow(windowState.instanceId)}
      >
        <AppComponent />
      </XpWindow>
    </div>
  );
}

export default XpDesktopWindow;
