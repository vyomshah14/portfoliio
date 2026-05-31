import StaticPage from '../components/StaticPage.jsx';
import { pageMarkup } from '../data/pageMarkup.js';

export default function Experience() {
  return <StaticPage html={pageMarkup.experience} />;
}
