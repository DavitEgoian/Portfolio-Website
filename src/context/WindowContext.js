import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { XP_APPS } from "../data/xpApps";

const WindowContext = createContext(null);

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [focusedId, setFocusedId] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const zIndexRef = useRef(100);

  const focusWindow = useCallback((instanceId) => {
    zIndexRef.current += 1;
    setFocusedId(instanceId);
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, zIndex: zIndexRef.current, minimized: false }
          : window
      )
    );
  }, []);

  const openApp = useCallback(
    (appId) => {
      const app = XP_APPS[appId];
      if (!app) return;

      setStartMenuOpen(false);
      setSelectedIcon(appId);

      setWindows((prev) => {
        const existing = prev.find((window) => window.appId === appId);
        if (existing) {
          zIndexRef.current += 1;
          setFocusedId(existing.instanceId);
          return prev.map((window) =>
            window.appId === appId
              ? { ...window, minimized: false, zIndex: zIndexRef.current }
              : window
          );
        }

        zIndexRef.current += 1;
        const instanceId = appId;
        const newWindow = {
          instanceId,
          appId,
          x: app.defaultPosition.x,
          y: app.defaultPosition.y,
          width: app.defaultSize.width,
          height: app.defaultSize.height,
          minimized: false,
          maximized: false,
          zIndex: zIndexRef.current,
        };
        setFocusedId(instanceId);
        return [...prev, newWindow];
      });
    },
    []
  );

  const closeWindow = useCallback((instanceId) => {
    setWindows((prev) => prev.filter((window) => window.instanceId !== instanceId));
    setFocusedId((current) => (current === instanceId ? null : current));
  }, []);

  const minimizeWindow = useCallback((instanceId) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId ? { ...window, minimized: true } : window
      )
    );
    setFocusedId((current) => (current === instanceId ? null : current));
  }, []);

  const toggleMaximize = useCallback((instanceId) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId
          ? { ...window, maximized: !window.maximized }
          : window
      )
    );
    focusWindow(instanceId);
  }, [focusWindow]);

  const moveWindow = useCallback((instanceId, x, y) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.instanceId === instanceId ? { ...window, x, y, maximized: false } : window
      )
    );
  }, []);

  const toggleStartMenu = useCallback(() => {
    setStartMenuOpen((open) => !open);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      selectedIcon,
      startMenuOpen,
      openApp,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      setSelectedIcon,
      toggleStartMenu,
      setStartMenuOpen,
    }),
    [
      windows,
      focusedId,
      selectedIcon,
      startMenuOpen,
      openApp,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      toggleStartMenu,
    ]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindows must be used within WindowProvider");
  }
  return context;
}
