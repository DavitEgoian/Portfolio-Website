const ABOUT_TEXT =
  "Hi, I'm Davit, a Data Science and AI student at Georgian National University SEU in Tbilisi, Georgia. " +
  "I build impactful tech solutions—from statistical models and visualizations to automated feature engineering and explainable AI. " +
  "Beyond coding, I mentor teams and lead hackathons to drive real-world innovation.";

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
