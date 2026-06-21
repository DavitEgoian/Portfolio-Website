function SectionTitle({ id, children }) {
  return (
    <h2 id={id} className="section-title">
      {children}
    </h2>
  );
}

export default SectionTitle;
