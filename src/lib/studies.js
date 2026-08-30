/* Long-form case studies, keyed by project id. A project in data.js that has a
   matching entry here opens the full reader instead of the short modal.

   Block kinds understood by CaseStudy.jsx:
     text     { title, num, body: [paragraph, …] }
     list     { title, num, lead?, items: [string] | [{ k, v }], columns? }
     index    { title, num, lead?, groups: [{ label, items: [string] }] }
     table    { title, num, lead?, cols: [string], rows: [[cell, …]], note? }
     swatches { title, num, lead?, items: [{ name, hex, note }] }
     contrast { title, num, lead?, pairs: [{ label, fg, bg, large? }], note? }
     stats    { title, num, items: [{ k, v, sub }] }
     figure   { title, num, name, lead?, caption? }
     chart    { title, num, lead?, unit, bars: [{ label, value, note?, mark? }],
                caption?, source? }

   Charts are single-series: bar length carries the magnitude, so nothing is
   encoded in colour. Every bar is directly labelled, which is also what the
   accent bar needs since it sits below 3:1 against this surface.
*/

export const STUDIES = {
  /* ─────────────────────────────  COSA NOSTRA  ───────────────────────────── */
  cosanostra: {
    kicker: 'Design system · Self-initiated',
    title: 'Cosa Nostra',
    tagline: 'A design system documented all the way down to who gets to change it.',
    hero: '/work/cosanostra-hero.webp',
    heroAlt: 'The Cosa Nostra component library screen, showing the red house palette',
    link: {
      label: 'Open the Figma library',
      url: 'https://www.figma.com/design/AOq4cssofK5E1PixxBQghB/CosaNostra-%7C-Design-System-by-Guilherme-Ribeiro?node-id=10-5&t=gZ5MZk6SY7odoYlg-1',
    },
    intro:
      'A design system in the Apple register: soft surfaces and high-contrast display type, with one very loud red. It runs to twenty-four sections, from colour and grid through to governance, and the library ships as documented components with props, states, dark mode and a changelog.',

    blocks: [
      {
        kind: 'stats',
        title: 'The library',
        num: '01',
        items: [
          { k: 'Components', v: '34', sub: 'at v1.0' },
          { k: 'Sections', v: '24', sub: 'foundations + library' },
          { k: 'Token layers', v: '3', sub: 'primitive → semantic → component' },
          { k: 'Themes', v: '2', sub: 'light and dark, both drawn' },
        ],
      },
      {
        kind: 'text',
        title: 'The problem with pretty systems',
        num: '02',
        body: [
          'Most personal design systems stop at a colour ramp and a button. They look finished in a portfolio thumbnail and fall apart the moment two people need to disagree about a radius.',
          'This one was built to survive that argument. Every section answers a question a second designer would actually ask: which red, at what size, on which surface, and who gets to change it. The look is Apple-adjacent, all generous radii and quiet greys, but most of the work went into the rulebook underneath.',
        ],
      },
      {
        kind: 'index',
        title: 'How it is organised',
        num: '03',
        lead:
          'Twenty-four numbered sections, split in two. Foundations first, then the library that has to obey them.',
        groups: [
          {
            label: 'Foundations',
            items: ['Colour', 'Type', 'Metrics', 'Grid', 'Icons', 'Motion',
                    'House rules', 'Voice', 'Accessibility', 'Tokens', 'Density', 'Governance'],
          },
          {
            label: 'Library',
            items: ['Buttons', 'Controls', 'Surfaces', 'Navigation', 'Feedback', 'Overlays',
                    'Data', 'States', 'Component spec', 'Extended library', 'Charts', 'Dark mode',
                    'Case uses'],
          },
        ],
      },
      {
        kind: 'text',
        title: 'The house rules',
        num: '04',
        body: [
          'One spread, printed red, that overrides everything else in the document. It is the part I would hand to someone on their first day.',
          'The rules are deliberately blunt. The accent is for one thing per screen. Grey is for structure and nothing else. Radius follows the touch target rather than my taste. And if a component needs a paragraph explaining when to use it, it is not ready for the library yet.',
        ],
      },
      {
        kind: 'swatches',
        title: 'Colour',
        num: '05',
        lead:
          'A neutral field and a single accent. The dark theme lightens that accent so it survives on a dark surface instead of vibrating against it.',
        items: [
          { name: 'Accent · dark theme', hex: '#FF5A41', note: 'Lightened from the light-theme red' },
          { name: 'Surface 01 · dark', hex: '#000000', note: 'Base' },
          { name: 'Surface 02 · dark', hex: '#1C1C1E', note: 'Raised' },
          { name: 'Surface 03 · dark', hex: '#2C2C2E', note: 'Overlay' },
        ],
      },
      {
        kind: 'figure',
        title: 'Tokens',
        num: '06',
        name: 'token-layers',
        lead:
          'Three layers, and traffic only flows one way. A component never reaches past its own layer, which is why switching to the dark theme means swapping tokens instead of redrawing anything.',
        caption: 'Primitive holds raw values. Semantic holds intent. The component layer holds the contract a button actually consumes, and the whole thing ships as CSS custom properties and JSON.',
      },
      {
        kind: 'table',
        title: 'Token output',
        num: '07',
        cols: ['Layer', 'Example', 'Consumed by'],
        rows: [
          ['Primitive', 'red-50 · grey-900 · space-4', 'Semantic layer only'],
          ['Semantic', 'accent · surface-raised · text-secondary', 'Component layer, themes'],
          ['Component', 'button-bg · button-radius · field-border', 'Components in the library'],
        ],
        note: 'Emitted as CSS custom properties and JSON from the same source.',
      },
      {
        kind: 'text',
        title: 'Component spec',
        num: '08',
        body: [
          'Every component carries the same four-part spec, modelled on the button: an anatomy diagram with numbered parts, a props table giving each prop a type and a default, behaviour notes covering keyboard and loading states, and a short "use it when / reach for something else" pair.',
          'That last pair does most of the work, and it is the part people skip. Anyone can publish a component. Telling someone when to leave it alone is the harder half.',
        ],
      },
      {
        kind: 'table',
        title: 'Button props',
        num: '09',
        lead: 'The shape every other component spec follows.',
        cols: ['Prop', 'Type', 'Default'],
        rows: [
          ['variant', 'primary | secondary | ghost | destructive', 'primary'],
          ['size', 'sm | md | lg', 'md'],
          ['icon', 'leading | trailing | none', 'none'],
          ['loading', 'boolean', 'false'],
          ['disabled', 'boolean', 'false'],
          ['fullWidth', 'boolean', 'false'],
        ],
      },
      {
        kind: 'list',
        title: 'Extended library',
        num: '10',
        lead:
          'The components past the obvious ones. These are the ones that usually get skipped, and the ones a real screen ends up asking for.',
        columns: true,
        items: ['Date picker', 'Accordion', 'File upload', 'Autocomplete', 'Multi-select',
                'Rating', 'Skeleton', 'Avatar group', 'Command palette', 'Vertical tabs', 'Code block'],
      },
      {
        kind: 'list',
        title: 'Charts',
        num: '11',
        lead: 'Rules instead of a chart library, so the constraints hold whatever ends up drawing them.',
        items: [
          { k: 'Series order', v: 'Fixed, so the same category keeps the same colour across every chart' },
          { k: 'Series limit', v: 'Four. Past that the chart is answering more than one question' },
          { k: 'Axis', v: 'Bars baseline at zero, and units always labelled' },
          { k: 'Legend', v: 'Omitted when a direct label will fit' },
        ],
      },
      {
        kind: 'table',
        title: 'Voice',
        num: '12',
        lead: 'Write-this / not-that pairs, with the number and date formats pinned so two writers produce the same thing.',
        cols: ['Write this', 'Not that', 'Why'],
        rows: [
          ['Delete project', 'Are you sure?', 'Say what the button does'],
          ['3 items selected', '3 Items Selected', 'Sentence case everywhere except proper nouns'],
          ['1,240 t/h', '1240 t/h', 'Thousands separated, unit always present'],
          ['12 Mar 2026', '03/12/26', 'Unambiguous across locales'],
          ['Save', 'Submit', 'Use the word the reader would use'],
        ],
      },
      {
        kind: 'contrast',
        title: 'Accessibility',
        num: '13',
        lead:
          'The ratios below are computed from the tokens at render time instead of typed in, so the table cannot drift away from the palette it describes. White on the accent fails at body size and is documented as large-and-above. Accent on the overlay surface clears AA by 0.01, which is close enough to be worth watching. The light-theme pairs are missing until that accent is recorded.',
        pairs: [
          { label: 'Accent on black', fg: '#FF5A41', bg: '#000000' },
          { label: 'Accent on raised surface', fg: '#FF5A41', bg: '#1C1C1E' },
          { label: 'Accent on overlay surface', fg: '#FF5A41', bg: '#2C2C2E' },
          { label: 'White on accent', fg: '#FFFFFF', bg: '#FF5A41' },
          { label: 'Black on accent', fg: '#000000', bg: '#FF5A41' },
        ],
        note:
          'Past contrast, the rules are a visible focus ring on every interactive element, a 44×44 minimum touch target, and no state signalled by colour alone.',
      },
      {
        kind: 'table',
        title: 'Density',
        num: '14',
        lead:
          'One system, two densities. Comfortable is the default. Compact is there for tables and dashboards dense enough to need it.',
        cols: ['', 'Comfortable', 'Compact'],
        rows: [
          ['Row height', '48px', '32px'],
          ['Control height', '40px', '32px'],
          ['Cell padding', '16px', '8px'],
          ['Type scale', 'Base', 'Base − 1 step'],
        ],
        note: 'Table, dialog and sidebar each carry their own responsive behaviour across both densities.',
      },
      {
        kind: 'list',
        title: 'Governance',
        num: '15',
        lead: 'Almost nobody writes this section, and skipping it is how libraries rot.',
        items: [
          { k: 'Changelog', v: 'Every token and component change recorded with author, date and state' },
          { k: 'Versioning', v: 'Semantic. Renaming a token is a breaking change, adding a variant is not' },
          { k: 'Contribution', v: 'A component arrives with its spec, its states and its dark theme, or it waits outside' },
        ],
      },
    ],
  },

  /* ────────────────────────────────  AXIS  ──────────────────────────────── */
  axis: {
    kicker: 'Industrial product design',
    title: 'Axis',
    tagline: 'A cement plant, from quarry to dispatch, on one spine.',
    hero: '/work/axis-hero.webp',
    heroAlt: 'The Axis line overview screen for a cement plant control room',
    link: {
      label: 'Open the Figma file',
      url: 'https://www.figma.com/design/7S3VV7sXiKe6jE1wqFJidb/Axis-%7C-Product-Design-by-Guilherme-Ribeiro?node-id=1-2182&t=ZSWHMFDSwimrGvIq-1',
    },
    intro:
      'Cement plant automation. The plant itself runs as one continuous process, from quarry through crusher, raw mill, kiln, cement mill and dispatch. The software watching it usually does not: it tends to be a stack of unrelated screens, one per machine supplier. Axis puts the whole line on a single spine so an operator follows the material instead of hopping between vendors.',

    blocks: [
      {
        kind: 'text',
        title: 'The brief',
        num: '01',
        body: [
          'Cement manufacturing is continuous and unforgiving. A stoppage anywhere upstream carries down the line, and the people watching for it are process engineers on shift, reading numbers in a control room for hours at a stretch.',
          'The goal I set was narrow on purpose: one concise product that carries the whole flow of industrial software, instead of the collection of vendor consoles a plant usually ends up operating. Every decision below comes back to that.',
        ],
      },
      {
        kind: 'text',
        title: 'The research',
        num: '02',
        body: [
          'The study ran on two sources. The first was people. My father spent years at Votorantim and I have friends working in cement now, so the plant was already something I could ask real questions about, and that is why the project starts at the process instead of at a screen.',
          'The second was documented practice. Process control is one of the few software fields where the interface conventions are written down and argued over in public standards, so every decision here could be checked against something firmer than taste.',
        ],
      },
      {
        kind: 'text',
        title: 'What the standards already say',
        num: '03',
        body: [
          'Two documents govern most of what a plant interface should do, and they point the same way. ISA-101, the standard for high performance HMI, asks for almost entirely grey screens: normal equipment drawn as grey outlines on a grey field, a muted palette throughout, and saturated colour held back for abnormal conditions and states that need a person. The screen is supposed to be boring while the plant is fine.',
          'EEMUA 191 covers the other half, which is how much the plant is allowed to say. Its steady state benchmarks are unusually blunt for a standard, and they are the reason a quiet interface is a safety argument rather than an aesthetic one.',
        ],
      },
      {
        kind: 'chart',
        title: 'How much a plant may say',
        num: '04',
        lead:
          'EEMUA 191 rates an alarm system by how often it interrupts one operator in steady state. Past roughly twelve an hour the system is working against the person reading it.',
        unit: 'alarms per hour, one operator, steady state',
        bars: [
          { label: 'Acceptable', value: 6, note: 'about one every ten minutes' },
          { label: 'Manageable', value: 12, note: 'one every five minutes' },
          { label: 'Over-demanding', value: 30, note: 'one every two minutes' },
          { label: 'Unacceptable', value: 60, note: 'more than one a minute', mark: true },
        ],
        source: 'EEMUA 191 steady-state performance bands',
        caption:
          'An interface that colours everything is making the same mistake as an alarm system that fires constantly. Both spend the attention of the operator before anything has gone wrong.',
      },
      {
        kind: 'figure',
        title: 'One colour, three meanings',
        num: '05',
        name: 'colour-rule',
        lead: 'The rule the whole interface is built on.',
        caption:
          'Surfaces are neutral grey and carry structure. A single pastel cyan carries meaning, and only three: a value under live control, the active navigation item, or a number that needs a decision. Nothing else is coloured. The diagram is drawn in the accent of this page rather than the cyan of the product.',
      },
      {
        kind: 'text',
        title: 'Why so little colour',
        num: '06',
        body: [
          'Plant software traditionally colours everything: green for running, blue for auto, yellow for warning, red for alarm. Past a certain density none of it registers any more, and operators end up navigating by position instead.',
          'So Axis uses cyan once and spends nothing else. Grey carries all the structure, which means the eye finds cyan straight away, and cyan only ever says one of three things. A screen with none on it is a screen that wants nothing from you.',
        ],
      },
      {
        kind: 'figure',
        title: 'The process line',
        num: '07',
        name: 'process-line',
        lead: 'Nine sections, quarry to dispatch, always in physical order.',
        caption:
          'Every section carries its plant tag, 2-CR-010 or 2-MI-100, so the screen and the equipment are called the same thing. The order never changes, which lets an operator find a section by where it sits.',
      },
      {
        kind: 'chart',
        title: 'Where the electricity goes',
        num: '08',
        lead:
          'Grinding takes roughly 60 to 70 per cent of the electrical energy in a plant, split across the two mills. That is the clearest reason the raw mill and the cement mill sit at the top level of the navigation instead of inside a submenu.',
        unit: 'approximate share of plant electrical energy',
        bars: [
          { label: 'Finish grinding', value: 38, note: 'cement mill' },
          { label: 'Raw grinding', value: 33, note: 'raw mill' },
          { label: 'Everything else', value: 29, note: 'kiln, fans, conveying, packing' },
        ],
        source: 'Published cement industry averages, around 110 to 120 kWh per tonne overall',
        caption:
          'Navigation follows cost as well as material. The two sections that dominate the power bill are also the two an engineer is most often asked about.',
      },
      {
        kind: 'chart',
        title: 'Reading the kiln',
        num: '09',
        lead:
          'Specific heat is the number a pyro engineer lives by, which is why it sits in the header of the line overview rather than three screens down. The figure on the reference screen is 3 142 kJ/kg, and the point of the chart is that it lands where a real modern kiln lands.',
        unit: 'kJ per kg of clinker',
        bars: [
          { label: 'Chemistry alone', value: 1800, note: 'theoretical mineralogical demand' },
          { label: 'Best available tech', value: 3000, note: 'modern dry kiln benchmark' },
          { label: 'On the Axis screen', value: 3142, note: 'the value shown in the header', mark: true },
          { label: 'Older wet kiln', value: 5440, note: 'low end of the wet-process range' },
        ],
        source: 'Published kiln heat-balance benchmarks',
        caption:
          'A headline figure is useless without a reference, so the screen shows it against a seven-day mean. Without that, 3 142 is a number nobody can act on.',
      },
      {
        kind: 'index',
        title: 'Navigation',
        num: '10',
        lead:
          'Three groups. Process follows the material through the plant, analysis is for looking back at what happened, and management covers what gets reported outward.',
        groups: [
          { label: 'Process', items: ['Line overview', 'Pyro line', 'Raw mill', 'Cement mill', 'Packing & dispatch'] },
          { label: 'Analysis', items: ['Alarms & events', 'Historian', 'Quality & lab'] },
          { label: 'Management', items: ['Energy & emissions', 'Asset health', 'Reports'] },
        ],
      },
      {
        kind: 'list',
        title: 'The line overview',
        num: '11',
        lead:
          'The default screen, and the one an engineer leaves open. Four tabs sit on it: Summary, Mimic, Production and Shift log.',
        items: [
          { k: 'Headline figures', v: 'Clinker production against target, and specific heat against a seven-day mean' },
          { k: 'Process line', v: 'All nine sections with live rate and state, in physical order' },
          { k: 'Kiln stability', v: 'The last eight hours of it, on the same screen as the live figures' },
          { k: 'Context bar', v: 'Plant and line at the top, signed-in engineer at the bottom' },
        ],
      },
      {
        kind: 'table',
        title: 'Equipment state',
        num: '12',
        lead:
          'States are spelled out in words. Only "Controlled" also takes the accent, because that is the one state where a human decision is currently holding.',
        cols: ['State', 'Meaning', 'Carries accent'],
        rows: [
          ['Running', 'Operating within its own limits, no attention needed', 'No'],
          ['Controlled', 'A setpoint is being actively held or overridden', 'Yes'],
          ['Stopped', 'Not running, planned or otherwise', 'No'],
          ['Fault', 'Escalated to Alarms & events', 'No, handled there'],
        ],
      },
      {
        kind: 'list',
        title: 'Reading rules',
        num: '13',
        lead: 'Conventions applied to every number on every screen.',
        items: [
          { k: 'Units always shown', v: 't/d, kJ/kg, t/h. A figure never appears on its own' },
          { k: 'Always a reference', v: 'A value appears against a target, a mean or a limit' },
          { k: 'Tabular figures', v: 'Digits align between rows so a column can be scanned at a glance' },
          { k: 'Tags are shared', v: 'The screen uses the same identifier painted on the equipment' },
        ],
      },
    ],
  },
};
