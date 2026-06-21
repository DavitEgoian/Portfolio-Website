import SectionTitle from "./SectionTitle";

function About() {
  return (
    <section aria-labelledby="about">
      <SectionTitle id="about">ABOUT ME</SectionTitle>
      <p className="section-desc about-me-section-text">
        Hi, I&apos;m Davit, a{" "}
        <span className="highlight-yellow">Data Science and AI student</span> at{" "}
        Georgian National University SEU in Tbilisi, Georgia. I&apos;m passionate
        about creating impactful tech solutions—building everything from advanced
        statistical models and interactive visualizations to automated feature
        engineering and explainable AI. Beyond coding, I{" "}
        <span className="highlight-teal">mentor teams</span> and{" "}
        <span className="highlight-teal">lead hackathons</span> to drive real-world
        innovation.
      </p>
    </section>
  );
}

export default About;
