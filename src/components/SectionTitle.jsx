export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title-wrap">
      <h2 className="section-heading">{title}</h2>
      {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
    </div>
  );
}
