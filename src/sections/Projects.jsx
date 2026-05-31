import StaticPage from '../components/StaticPage.jsx';
import { pageMarkup } from '../data/pageMarkup.js';

export default function Projects() {
  return <StaticPage html={pageMarkup.projects} />;
}
