import StaticPage from '../components/StaticPage.jsx';
import { pageMarkup } from '../data/pageMarkup.js';

export default function Education() {
  return <StaticPage html={pageMarkup.education} />;
}
