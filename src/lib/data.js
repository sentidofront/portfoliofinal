// Source content extracted from Guilherme Ribeiro's CV.
// PROFILE.name is the single source for the page title, the Open Graph tags,
// the JSON-LD Person and llms.txt — one edit here renames the site everywhere.

export const PROFILE = {
  name: 'Guilherme Ribeiro',
  role: 'CMO & Head of Product · Product Designer',
  location: 'Praia Grande · SP · Brazil',
  phone: '+55 (13) 99776-0984',
  email: 'guilhermerfc.contato@gmail.com',
  links: {
    figma: { label: 'Figma', url: 'https://figma.com/@carvalh', handle: '@carvalh' },
    github: { label: 'GitHub', url: 'https://github.com/sentidofront', handle: 'sentidofront' },
    linkedin: { label: 'LinkedIn', url: 'https://linkedin.com/in/GuilhermeUX', handle: 'GuilhermeUX' },
  },
  intro:
    'Designer at the intersection of product, neuroscience and code — engineering interfaces where usability, scalability and human behaviour converge.',
};

// Reverse-chronological: most recent first. Each entry becomes a node on the rolling timeline.
export const EXPERIENCE = [
  {
    id: 'reune',
    fig: 'FIG. 01',
    role: 'CMO & Head of Product',
    company: 'Reune Digital',
    period: 'PRESENT',
    tags: ['Product Strategy', 'Leadership', 'Go-to-Market', 'Design Ops'],
    summary:
      'Owning product direction and marketing for the company — strategy, roadmap and team leadership, with design still in my own hands.',
    points: [
      'Set product vision and roadmap as Product Owner — prioritising the backlog, defining scope and steering delivery with engineering and design.',
      'Lead marketing as CMO: positioning, brand, go-to-market and the acquisition funnel from first touch to activation.',
      'Lead the design function — design system, UX standards and critique — keeping craft consistent as the product surface grows.',
      'Sit between stakeholders, engineering and clients, translating business goals into shipped product decisions.',
    ],
  },
  {
    id: 'azape',
    fig: 'FIG. 02',
    role: 'Product Designer',
    company: 'Azape',
    period: '2024 — 2025',
    tags: ['Fintech', 'Design Systems', 'Enterprise SaaS', 'Crypto'],
    summary:
      'Design & UX strategy for published digital products and internal platforms across large-scale Brazilian companies.',
    points: [
      'Led UX for Buffon (fuel logistics), AZ Pay (mobile fintech with crypto & Pix payments) and Cripto.Host (crypto hosting & mining) — balancing usability, scalability and financial compliance.',
      'Supported front-end handoffs with code-friendly assets and clear specs across HTML, CSS, JS, React and Git-based workflows.',
      'Delivered design-system foundations for enterprise SaaS — reusable UI patterns, responsive components and accessibility compliance.',
      'Owned the full arc: research → wireframing → prototyping → handoff, alongside lead designers and cross-functional teams.',
    ],
  },
  {
    id: 'mamba',
    fig: 'FIG. 03',
    role: 'UX/UI Designer',
    company: 'Mamba Digital',
    period: '2021 — 2022',
    tags: ['Neuromarketing', 'Componentization', 'Usability', 'Mobile'],
    summary:
      'E-commerce UX powered by neuromarketing — flows, high-fidelity UI and a scalable component library.',
    points: [
      'Created user flows, wireframes and mockups leveraging neuromarketing and consumer psychology.',
      'Designed and built high-fidelity UI screens & components for web and mobile, collaborating closely with developers.',
      'Led componentization of UI elements — reusable patterns and scalable structures for visual consistency.',
      'Conducted research via surveys, interviews and usability testing, then validated with interactive prototypes.',
    ],
  },
  {
    id: 'libertaria',
    fig: 'FIG. 04',
    role: 'UX/UI Designer',
    company: 'Universidade Libertária',
    period: 'VOLUNTEER',
    tags: ['Volunteer', 'DAO', 'Mobile App', 'User Research'],
    summary:
      'Volunteer work — designed a DAO mobile app and website from scratch with a team of three front-end developers.',
    points: [
      "Designed the client's DAO — Decentralized Autonomous Organization — mobile app and website from zero.",
      'Ran usability testing and research with core user groups inside the community Discord server.',
      'Translated findings into personas, user stories and user flows that steered the build.',
    ],
  },
];

/* Capabilities. Each entry is [ name, level, note? ].

   level  4 Lead · 3 Advanced · 2 Proficient · 1 Working  (see SKILL_LEVELS)
   note   optional; when absent the panel falls back to the level definition,
          so a term never opens an empty box. Written only where the claim can
          be tied to real work rather than padded out for every row. */
export const SKILL_LEVELS = {
  5: { name: 'Lead',       gloss: 'I set the standard here, and other people work to it.' },
  4: { name: 'Advanced',   gloss: 'Used repeatedly on shipped, paid work.' },
  3: { name: 'Proficient', gloss: 'Shipped with it. I bring in a specialist for the deep end.' },
  2: { name: 'Working',    gloss: 'Enough to be useful, and to brief a specialist properly.' },
  1: { name: 'Familiar',   gloss: 'I can read it and work alongside it. I would not claim to own it.' },
};

export const SKILLS = {
  product: [
    ['Product Strategy', 5, 'Reune went from an idea to a funded company on a strategy I owned end to end.'],
    ['Product Discovery', 5, 'More than thirty restaurants visited before a single screen was drawn.'],
    ['Backlog & Prioritisation', 5, 'Forty-six decisions across ten fronts, ordered by what breaks service first.'],
    ['Roadmapping', 5],
    ['Scope Definition', 5],
    ['Continuous Discovery', 4],
    ['Jobs to be Done', 4],
    ['Stakeholder Alignment', 4],
    ['Metrics & OKRs', 4],
    ['Pricing & Packaging', 4, 'Four tiers and seat billing, priced against what a restaurant already pays.'],
    ['Design Ops', 4],
    ['Go-to-Market', 4],
  ],
  ux: [
    ['User Research', 5, 'Field research in kitchens and dining rooms, not a lab.'],
    ['Information Architecture', 5, 'Five sales channels collapsed into one queue an operator can actually work.'],
    ['User Flows', 5],
    ['Interviews & Surveys', 5],
    ['Usability Testing', 5],
    ['Service Design', 4, 'Salao, Caixa, Producao and Gestao mapped as four contexts with different hardware and different pain.'],
    ['Journey Mapping', 4],
    ['Personas', 4],
    ['User Stories', 4],
    ['Card Sorting', 4],
    ['Heuristic Evaluation', 4],
    ['Accessibility', 4, 'Contrast, focus order and target size treated as acceptance criteria, not a later audit.'],
    ['Design QA', 4],
    ['A/B Testing', 3],
  ],
  ui: [
    ['Design Systems', 5, 'Cosa Nostra: thirty-four documented components with a governance section saying who may change them.'],
    ['Design Tokens', 5, 'Three token layers, both themes drawn rather than derived.'],
    ['Brand Identity', 5, 'The Reune mark, palette and type system are mine.'],
    ['Component Libraries', 4],
    ['Typography', 4],
    ['Wireframing', 4],
    ['Low to High Fidelity', 4],
    ['Prototyping', 4],
    ['Responsive Layout', 4],
    ['Mockups', 4],
    ['Data Visualisation', 4, 'Dense operational dashboards where one accent carries all the meaning.'],
    ['Desktop & Mobile', 4],
    ['Motion Design', 3],
    ['Micro-interactions', 3],
  ],
  ai: [
    ['Prompt Engineering', 5],
    ['AI-Assisted Delivery', 5, 'This site, Magic Sprite and the Reune front-end were all built with an agent in the loop.'],
    ['AX Design', 4, 'Agent Experience: designing the surface a model reads and acts on, not just the one a person sees.'],
    ['AI Product Design', 4],
    ['Context Engineering', 4],
    ['Agentic Workflows', 3],
    ['Human-AI Interaction', 3],
    ['Conversational Design', 3],
    ['Evaluation & Guardrails', 2],
    ['RAG & Retrieval', 2],
    ['Multimodal Interfaces', 2],
  ],
  tooling: [
    ['Figma', 5],
    ['Claude Code', 5],
    ['Illustrator', 4],
    ['Photoshop', 4],
    ['Miro', 3],
    ['Webflow', 3],
    ['Framer', 3],
    ['After Effects', 2],
    ['InDesign', 2],
    ['DaVinci', 1],
    ['Adobe XD', 1],
  ],
  code: [
    ['CSS', 5],
    ['React', 4, 'This portfolio, the Reune admin tool and the Morrigan atlas.'],
    ['JavaScript', 4],
    ['Git & GitHub', 4],
    ['Vite', 3],
    ['SPAs', 3],
    ['GSAP', 3],
    ['Three.js & R3F', 3, 'The WebGL stage this page is running on.'],
    ['Python', 3],
    ['Vue', 2],
    ['Angular', 2],
    ['TWIG', 1],
    ['WebGL', 1],
    ['Linux', 1],
  ],
  mind: [
    ['Neuromarketing', 5, 'Consumer Neuroscience, Copenhagen Business School.'],
    ['Consumer Psychology', 5, 'Cognitive Psychology & Neuropsychology, Cambridge.'],
    ['Cognitive Biases', 4],
    ['Behavioural Economics', 4],
    ['UX Writing', 4],
    ['Decision Architecture', 3],
    ['Copywriting', 3],
    ['Data Science', 2],
  ],
};

export const CREDENTIALS = [
  { title: 'Product Design', org: 'EBAC — Escola Britânica de Artes Criativas' },
  { title: 'Fundamentals of Neuroscience', org: 'Harvard University' },
  { title: 'Cognitive Psychology & Neuropsychology', org: 'University of Cambridge' },
  { title: 'Consumer Neuroscience', org: 'Copenhagen Business School', date: '2023' },
  { title: 'React JS — Complete Frontend Guide', org: 'Certification', date: '2022' },
  { title: 'UX / UI Design', org: 'Google', date: '2022' },
  { title: 'Complete Course in Interface Design', org: 'Certification', date: '2022' },
  { title: 'B.Sc. System Analysis & Development', org: 'Universidade Cruzeiro do Sul', date: 'Ongoing' },
];

export const PURSUITS = [
  'Jazz — the saxophone above all; the record playing on this site is “Old Bird Tape”.',
  'Philosophy — Bataille and Nick Land, Girard on mimetic desire, Hayek on the sensory order.',
  'Cinema — watched closely and argued about at length, in essays on a personal YouTube channel.',
];

/* Portfolio pieces. `mockup` picks which CSS-drawn placeholder frame the card
   renders — no thumbnail images required. Swap in `image` later and the card
   will use it instead. */
export const PROJECTS = [
  {
    id: 'reune',
    title: 'Reune Digital',
    client: 'Reune Digital',
    year: '2024 — present',
    role: 'Head of Product · Design · Brand',
    mockup: 'dashboard',
    image: '/work/reune-thumb.webp',
    study: 'reune',
    summary:
      'A management system for Brazilian restaurants, taken from an idea to a funded company. Orders, tables, till, stock, kitchen and delivery in one place, with five sales channels landing in a single queue.',
    detail:
      'Research first: more than thirty restaurants visited before anything was drawn. I am Head of Product, and the brand, the product design and the landing page are mine.',
    tags: ['SaaS', 'Product Strategy', 'Research', 'Brand', 'Front-end'],
  },
  {
    id: 'cosanostra',
    title: 'Cosa Nostra',
    client: 'Self-initiated',
    year: '',
    role: 'Design Systems',
    mockup: 'library',
    image: '/work/cosanostra-thumb.webp',
    study: 'cosanostra',
    summary:
      'A complete design system in the Apple register — 34 documented components, three token layers, both themes drawn, and a governance section that says who gets to change it.',
    detail:
      'Twenty-four numbered sections carry it from colour and grid through to versioning. The library ships as specified components with props, states and dark mode rather than as a swatch sheet.',
    tags: ['Design System', 'Tokens', 'Accessibility', 'Governance'],
  },
  {
    id: 'magicsprite',
    title: 'Magic Sprite',
    client: 'Self-initiated',
    year: '',
    role: 'Design & Development',
    mockup: 'web',
    image: '/work/magicsprite-thumb.webp',
    url: '',
    summary:
      'A pixel art editor and animation tool. I designed it and I wrote it, aimed at the friction that makes spriting and frame-by-frame animation slower than the drawing itself.',
    detail:
      'Design and code are both mine here, which is the reason it sits on this list rather than a shelf. The target is the gap between having an idea for a sprite and watching it move: the repetitive setup, the fiddly frame work, and the small steps that break concentration between the two.',
    tags: ['Pixel Art', 'Animation', 'Creative Tools', 'Design & Code'],
  },
  {
    id: 'axis',
    title: 'Axis',
    client: '',
    year: '',
    role: 'Product Designer',
    mockup: 'control',
    image: '/work/axis-thumb.webp',
    study: 'axis',
    summary:
      'Cement plant automation — quarry to dispatch on a single spine, so an operator moves along the process instead of between vendor screens.',
    detail:
      'Neutral grey carries all the structure. One pastel cyan carries meaning, and only three: a value under live control, the active navigation item, or a number that needs a decision. Nothing else is coloured.',
    tags: ['Industrial', 'SCADA', 'Data Density', 'Dark UI'],
  },
];

/* Writing & translation — fill these in. Shape:
     title   — headline
     outlet  — where it was published
     year    — date or "Ongoing"
     kind    — Essay / Translation / Book …
     blurb   — one line, shown on the card and at the top of the modal
     detail  — longer paragraph, modal only
     tags    — array of short labels
     mockup  — placeholder frame: 'article' | 'book' | 'web'
     url     — optional; adds a "Read" link to the modal
     image   — optional; replaces the placeholder thumbnail */
export const ARTICLES = [
  { id: 'a1', title: '', outlet: '', year: '', kind: '', blurb: '', detail: '', tags: [], mockup: 'article', url: '' },
  { id: 'a2', title: '', outlet: '', year: '', kind: '', blurb: '', detail: '', tags: [], mockup: 'article', url: '' },
  { id: 'a3', title: '', outlet: '', year: '', kind: '', blurb: '', detail: '', tags: [], mockup: 'book',    url: '' },
  { id: 'a4', title: '', outlet: '', year: '', kind: '', blurb: '', detail: '', tags: [], mockup: 'web',     url: '' },
];
