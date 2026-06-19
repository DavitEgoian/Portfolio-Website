import { useEffect, useRef } from "react";
import cardsData from "../../data/cardsData";
import { XP_ICONS } from "../../data/xpIcons";

function ProjectsApp() {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        viewport.scrollLeft += event.deltaY;
      }
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="projects-app app-panel">
      <div className="explorer-toolbar" aria-hidden="true">
        <span>Back</span>
        <span>Forward</span>
        <span>Up</span>
        <span>Search</span>
        <span>Folders</span>
      </div>
      <p className="services__addressbar">
        Address: <strong>C:\Documents and Settings\Davit\My Projects</strong>
      </p>
      <p className="services__hint">Use mouse wheel to scroll through folders →</p>

      <div ref={viewportRef} className="projects-app__viewport">
        <div className="projects-app__track">
          {cardsData.map(({ icon, title, desc }, index) => (
            <article key={title} className="service-card xp-folder-item">
              <div className="service-card__icon-wrap">
                <img src={icon} alt="" loading="lazy" decoding="async" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="service-card__index">
                Folder ({index + 1} of {cardsData.length})
              </span>
            </article>
          ))}
          <article className="service-card xp-folder-item xp-folder-item--empty">
            <img src={XP_ICONS.folder} alt="" width={48} height={48} />
            <h3>New Folder</h3>
            <p>Right-click the desktop to add more projects.</p>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ProjectsApp;
