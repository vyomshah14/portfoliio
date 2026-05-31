export default function StaticPage({ html }) {
  return <div className="static-page" dangerouslySetInnerHTML={{ __html: html }} />;
}
