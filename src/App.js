import "./App.css";
import { WindowProvider } from "./context/WindowContext";
import XpDesktop from "./components/XpDesktop";
import XpTaskbar from "./components/XpTaskbar";
import XpWindowLayer from "./components/XpWindowLayer";
import XpStartMenu from "./components/XpStartMenu";

function App() {
  return (
    <WindowProvider>
      <div
        className="app xp-desktop-shell"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/bliss.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <XpDesktop />
        <XpWindowLayer />
        <XpStartMenu />
        <XpTaskbar />
      </div>
    </WindowProvider>
  );
}

export default App;
