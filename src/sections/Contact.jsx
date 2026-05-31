import StaticPage from '../components/StaticPage.jsx';
import { pageMarkup } from '../data/pageMarkup.js';

export default function Contact() {
  return <StaticPage html={pageMarkup.contact} />;
}
