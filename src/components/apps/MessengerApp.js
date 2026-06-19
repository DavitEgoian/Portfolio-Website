import socialLogos from "../../data/socialLogos";

function MessengerApp() {
  return (
    <div className="messenger-app app-panel">
      <div className="connect__buddy-list" aria-hidden="true">
        <p className="connect__buddy-header">Online (3)</p>
      </div>

      <h2 className="connect__heading">Send me a message!</h2>
      <p className="connect__sub">
        Double-click a contact below to open their profile in a new window.
      </p>

      <div className="connect__links">
        {socialLogos.map(({ src, alt, href, name }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="connect__card"
          >
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            <span>{name}</span>
            <span className="connect__status">● Online</span>
          </a>
        ))}
      </div>

      <footer className="connect__footer">
        <span>© {new Date().getFullYear()} Davit Egoian</span>
        <span>Windows Messenger — Ready to chat</span>
      </footer>
    </div>
  );
}

export default MessengerApp;
