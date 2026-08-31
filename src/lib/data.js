// Source content extracted from Guilherme Carvalho's CV.

export const PROFILE = {
  name: 'Guilherme Carvalho',
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

export const SKILLS = {
  product: ['Product Strategy', 'Roadmapping', 'Backlog & Prioritisation', 'Scope Definition',
            'Product Discovery', 'Stakeholder Alignment', 'Design Ops', 'Go-to-Market'],
  ux:      ['User Research', 'Interviews & Surveys', 'Personas', 'User Stories', 'User Flows',
            'Card Sorting', 'Usability Testing', 'A/B Testing', 'Heuristic Evaluation', 'Accessibility'],
  ui:      ['Design Systems', 'Component Libraries', 'Wireframing', 'Low → High Fidelity',
            'Prototyping', 'Mockups', 'Responsive Layout', 'Desktop & Mobile', 'Typography'],
  tooling: ['Figma', 'Miro', 'Webflow', 'Framer', 'Adobe XD', 'Photoshop', 'After Effects',
            'InDesign', 'Illustrator', 'DaVinci'],
  code:    ['JavaScript', 'React', 'Vue', 'Angular', 'Python', 'TWIG', 'CSS', 'SPAs',
            'Git & GitHub', 'Linux'],
  mind:    ['Neuromarketing', 'Consumer Psychology', 'Cognitive Biases', 'UX Writing',
            'Copywriting', 'Data Science', 'Prompt Engineering'],
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
  {
    id: 'azpay',
    title: 'AZ Pay',
    client: 'Azape',
    year: '2025',
    role: 'Product Designer',
    mockup: 'mobile',
    summary:
      'A mobile fintech wallet handling crypto and Pix payments — designed around trust, speed and financial compliance.',
    detail:
      'Owned the end-to-end product design: onboarding and KYC, wallet and balance states, Pix transfer flows and crypto conversion. The challenge was carrying regulatory requirements without making the interface feel bureaucratic, so the flows lean on progressive disclosure and plain-language copy.',
    tags: ['Fintech', 'Mobile', 'Crypto & Pix', 'Compliance'],
  },
  {
    id: 'buffon',
    title: 'Buffon',
    client: 'Azape',
    year: '2024',
    role: 'Product Designer',
    mockup: 'dashboard',
    summary:
      'Fuel logistics platform — fleet, routing and supply operations condensed into one operational dashboard.',
    detail:
      'Research with operations staff surfaced that the real job was exception handling, not routine monitoring. The dashboard was rebuilt around alerts and deviations first, with the full fleet table as a secondary view, cutting the time to spot a stalled delivery.',
    tags: ['Logistics', 'Enterprise SaaS', 'Dashboard', 'Research'],
  },
  {
    id: 'criptohost',
    title: 'Cripto.Host',
    client: 'Azape',
    year: '2024',
    role: 'Product Designer',
    mockup: 'web',
    summary:
      'Cryptocurrency hosting and mining platform — rig monitoring, contracts and payouts.',
    detail:
      'Designed the customer-facing surface for provisioning mining capacity and tracking returns, plus the internal views for rig health. Heavy data density meant establishing a strict type and spacing scale before any screen work began.',
    tags: ['Crypto', 'Mining', 'Design System', 'Data Density'],
  },
  {
    id: 'dao',
    title: 'DAO Platform',
    client: 'Universidade Libertária',
    year: '2022',
    role: 'UX/UI Designer — Volunteer',
    mockup: 'mobile',
    summary:
      'A decentralised autonomous organisation, designed from zero with three front-end developers.',
    detail:
      'Governance and proposal voting for a community that had never used a DAO interface before. Usability testing ran inside the community Discord, and the findings became the personas and user flows that shaped the build.',
    tags: ['Web3', 'DAO', 'Mobile App', 'User Research'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce UX',
    client: 'Mamba Digital',
    year: '2021',
    role: 'UX/UI Designer',
    mockup: 'web',
    summary:
      'Storefront and checkout work grounded in neuromarketing and consumer psychology.',
    detail:
      'Flows, wireframes and high-fidelity UI for web and mobile storefronts, validated through surveys, interviews and usability testing. Also led the componentisation effort that gave the team reusable patterns instead of one-off screens.',
    tags: ['E-commerce', 'Neuromarketing', 'Componentization', 'Testing'],
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
