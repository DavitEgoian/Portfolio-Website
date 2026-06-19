import techLogos from "../../data/techLogos";

function ControlPanelApp() {
  return (
    <div className="control-panel-app app-panel">
      <p className="stack__heading">
        Creative tools and skills installed on this system:
      </p>

      <div className="stack__grid">
        {techLogos.map(({ src, alt, name }) => (
          <div key={alt} className="stack__item">
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            <span>{name}</span>
          </div>
        ))}
      </div>

      <div className="stack__marquee" aria-hidden="true">
        <div className="stack__marquee-track">
          {[...techLogos, ...techLogos].map(({ alt, name }, index) => (
            <span key={`${alt}-${index}`}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ControlPanelApp;
