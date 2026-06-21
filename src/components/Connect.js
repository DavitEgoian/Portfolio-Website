import socialLogos from "../data/socialLogos";
import SectionTitle from "./SectionTitle";

function Connect() {
  return (
    <section aria-labelledby="connect">
      <SectionTitle id="connect">CONNECT WITH ME</SectionTitle>
      <div className="social-media-div">
        <div className="social-media-inner">
          {socialLogos.map(({ src, alt, href }) => {
            const isEmail = href.startsWith("mailto:");
            return (
              <a
                key={href}
                href={href}
                {...(isEmail
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <img
                  src={src}
                  alt={alt}
                  className={`social-logo${isEmail ? " social-logo--email" : ""}`}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Connect;
