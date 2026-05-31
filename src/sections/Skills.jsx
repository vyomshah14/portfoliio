import StaticPage from '../components/StaticPage.jsx';
import { pageMarkup } from '../data/pageMarkup.js';

export default function Skills() {
  return <StaticPage html={pageMarkup.skills} />;
}
