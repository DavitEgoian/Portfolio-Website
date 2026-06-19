import MyComputerApp from "../components/apps/MyComputerApp";
import AboutApp from "../components/apps/AboutApp";
import ProjectsApp from "../components/apps/ProjectsApp";
import ControlPanelApp from "../components/apps/ControlPanelApp";
import InternetExplorerApp from "../components/apps/InternetExplorerApp";
import MessengerApp from "../components/apps/MessengerApp";
import RecycleBinApp from "../components/apps/RecycleBinApp";
import { XP_ICONS } from "./xpIcons";

export const APP_IDS = {
  MY_COMPUTER: "my-computer",
  MY_DOCUMENTS: "my-documents",
  MY_PROJECTS: "my-projects",
  CONTROL_PANEL: "control-panel",
  INTERNET_EXPLORER: "internet-explorer",
  MSN_MESSENGER: "msn-messenger",
  RECYCLE_BIN: "recycle-bin",
};

export const XP_APPS = {
  [APP_IDS.MY_COMPUTER]: {
    id: APP_IDS.MY_COMPUTER,
    label: "My Computer",
    title: "My Computer",
    icon: XP_ICONS.myComputer,
    component: MyComputerApp,
    menu: false,
    defaultPosition: { x: 110, y: 36 },
    defaultSize: { width: 520, height: 420 },
  },
  [APP_IDS.MY_DOCUMENTS]: {
    id: APP_IDS.MY_DOCUMENTS,
    label: "My Documents",
    title: "about_me.txt — Notepad",
    icon: XP_ICONS.notepad,
    component: AboutApp,
    menu: true,
    defaultPosition: { x: 160, y: 72 },
    defaultSize: { width: 560, height: 440 },
  },
  [APP_IDS.MY_PROJECTS]: {
    id: APP_IDS.MY_PROJECTS,
    label: "What I do",
    title: "What I do",
    icon: XP_ICONS.folder,
    component: ProjectsApp,
    menu: false,
    defaultPosition: { x: 180, y: 40 },
    defaultSize: { width: 780, height: 580 },
  },
  [APP_IDS.CONTROL_PANEL]: {
    id: APP_IDS.CONTROL_PANEL,
    label: "Control Panel",
    title: "Control Panel — Installed Programs",
    icon: XP_ICONS.controlPanel,
    component: ControlPanelApp,
    menu: true,
    defaultPosition: { x: 190, y: 96 },
    defaultSize: { width: 640, height: 480 },
  },
  [APP_IDS.INTERNET_EXPLORER]: {
    id: APP_IDS.INTERNET_EXPLORER,
    label: "Internet Explorer",
    title: "Internet Explorer — Favorites",
    icon: XP_ICONS.internetExplorer,
    component: InternetExplorerApp,
    menu: true,
    defaultPosition: { x: 130, y: 118 },
    defaultSize: { width: 600, height: 520 },
  },
  [APP_IDS.MSN_MESSENGER]: {
    id: APP_IDS.MSN_MESSENGER,
    label: "MSN Messenger",
    title: "Windows Messenger",
    icon: XP_ICONS.msnMessenger,
    component: MessengerApp,
    menu: false,
    defaultPosition: { x: 270, y: 132 },
    defaultSize: { width: 420, height: 460 },
  },
  [APP_IDS.RECYCLE_BIN]: {
    id: APP_IDS.RECYCLE_BIN,
    label: "Recycle Bin",
    title: "Recycle Bin",
    icon: XP_ICONS.recycleBin,
    component: RecycleBinApp,
    menu: false,
    defaultPosition: { x: 150, y: 150 },
    defaultSize: { width: 480, height: 360 },
  },
};

export const DESKTOP_SHORTCUTS = Object.values(XP_APPS).map((app) => ({
  appId: app.id,
  label: app.label,
  icon: app.icon,
}));

export const START_MENU_APPS = DESKTOP_SHORTCUTS;
