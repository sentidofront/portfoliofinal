import CardDeck from './CardDeck.jsx';
import { PROJECTS } from '../lib/data.js';

const items = PROJECTS.map((p) => ({
  id: p.id,
  title: p.title,
  meta: [p.client, p.year].filter(Boolean).join(' · '),
  sub: p.role,
  summary: p.summary,
  detail: p.detail,
  tags: p.tags,
  mockup: p.mockup,
  image: p.image,
  study: p.study,
}));

export default function Portfolio() {
  return <CardDeck label="Selected Work" items={items} />;
}
