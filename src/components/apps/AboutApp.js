const ABOUT_TEXT =
  "Hi, I'm Davit, a creative from Tbilisi, Georgia. I do visual concepts and brand experiences that combine strategy, design, and storytelling. " +
  "My work focuses on shaping campaigns and helping teams turn ideas into real results. " +
  "I'm especially interested in work that feels both visually memorable and strategically clear.";

function AboutApp() {
  return (
    <div className="about-app app-panel">
      <div className="about__toolbar" aria-hidden="true">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>
      <h2 className="about__heading">* About Davit Egoian *</h2>
      <p className="about__copy">{ABOUT_TEXT}</p>
      <div className="about__statusbar" aria-hidden="true">
        Ln 1, Col 1
      </div>
    </div>
  );
}

export default AboutApp;
