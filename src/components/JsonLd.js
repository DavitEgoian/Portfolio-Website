import { useEffect } from "react";

const SITE_URL = "https://davit-egoian.tech";
const CONTACT_EMAIL = "dato.egoyan@gmail.com";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Davit Egoian",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  jobTitle: "Data Science and AI Student",
  worksFor: {
    "@type": "Organization",
    name: "Georgian National University SEU",
  },
  sameAs: [
    "https://github.com/davitegoian",
    "https://www.linkedin.com/in/davitegoian/",
    "https://www.kaggle.com/davitegoian",
  ],
  knowsAbout: [
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Python",
    "React",
  ],
};

function JsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "person-jsonld";
    script.textContent = JSON.stringify(personSchema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("person-jsonld")?.remove();
    };
  }, []);

  return null;
}

export default JsonLd;
