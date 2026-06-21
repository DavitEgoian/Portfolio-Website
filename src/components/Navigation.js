import { useState, useEffect } from "react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "what-i-do", label: "What I Do" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "connect", label: "Connect" },
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#top" className="site-nav-brand" onClick={handleNavClick}>
          Davit Egoian
        </a>
        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <ul
          id="site-nav-menu"
          className={`site-nav-links${menuOpen ? " is-open" : ""}`}
        >
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={handleNavClick}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
