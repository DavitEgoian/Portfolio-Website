export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 400);
}
