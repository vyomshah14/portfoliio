import StaticPage from '../components/StaticPage.jsx';
import { pageMarkup } from '../data/pageMarkup.js';

export default function About() {
  return <StaticPage html={pageMarkup.about} />;
}
