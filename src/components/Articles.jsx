import CardDeck from './CardDeck.jsx';
import { ARTICLES } from '../lib/data.js';

const items = ARTICLES.map((a) => ({
  id: a.id,
  title: a.title,
  meta: [a.outlet, a.year].filter(Boolean).join(' · '),
  sub: a.kind,
  summary: a.blurb,
  detail: a.detail,
  tags: a.tags,
  mockup: a.mockup,
  image: a.image,
  url: a.url,
}));

export default function Articles() {
  return <CardDeck label="Writing & Translation" items={items} className="writing" />;
}
