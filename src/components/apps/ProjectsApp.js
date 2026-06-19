import cardsData from "../../data/cardsData";
import { XP_ICONS } from "../../data/xpIcons";

const FOLDER_ITEMS = [
  ...cardsData.map((card, index) => ({
    ...card,
    folderLabel: `Folder (${index + 1} of ${cardsData.length + 1})`,
  })),
  {
    icon: XP_ICONS.folder,
    title: "New Folder",
    desc: "Right-click the desktop to add more projects.",
    folderLabel: `Folder (${cardsData.length + 1} of ${cardsData.length + 1})`,
    isPlaceholder: true,
  },
];

function ProjectsApp() {
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

      <div className="projects-app__grid">
        {FOLDER_ITEMS.map(({ icon, title, desc, folderLabel, isPlaceholder }) => (
          <article
            key={title}
            className={`service-card xp-folder-item ${
              isPlaceholder ? "xp-folder-item--empty" : ""
            }`}
          >
            <div className="service-card__icon-wrap">
              <img
                src={icon}
                alt=""
                width={40}
                height={40}
                decoding="async"
                className="service-card__icon"
              />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className="service-card__index">{folderLabel}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProjectsApp;
