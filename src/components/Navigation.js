import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "00" },
  { id: "about", label: "01" },
  { id: "services", label: "02" },
  { id: "stack", label: "03" },
  { id: "journey", label: "04" },
  { id: "connect", label: "05" },
];

function Navigation() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.45 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="site-nav" aria-label="Section navigation">
      <div className="site-nav__brand">
        <span className="site-nav__pulse" />
        DE
      </div>
      <ul className="site-nav__list">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className={`site-nav__link ${active === id ? "is-active" : ""}`}
              onClick={() => scrollTo(id)}
              aria-current={active === id ? "true" : undefined}
            >
              <span className="site-nav__index">{label}</span>
              <span className="site-nav__dot" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
