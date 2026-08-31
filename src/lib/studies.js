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
  /* ────────────────────────────  REUNE DIGITAL  ──────────────────────────── */
  reune: {
    kicker: 'Restaurant SaaS',
    title: 'Reune Digital',
    tagline: 'Head of Product. The brand, the landing page and the design system are mine.',
    hero: '/work/reune-hero.webp',
    heroAlt: 'The Reune Digital dashboard, showing the day of a restaurant in one screen',
    link: {
      label: 'Open the landing page',
      url: 'https://reunedigital.com/',
    },
    intro:
      'Reune is a management system for Brazilian restaurants: orders, tables, till, stock, kitchen, delivery and the books, in one place. It started in 2024 as an idea, went through research and a prototype, took investment, and is now a working SaaS product sold in four tiers. I set the direction and the standards, and I drew most of what a customer actually sees.',

    blocks: [
      {
        kind: 'stats',
        title: 'The company',
        num: '01',
        items: [
          { k: 'Started', v: '2024', sub: 'idea to funded company' },
          { k: 'Restaurants visited', v: '30+', sub: 'before the first screen' },
          { k: 'Screens', v: '74', sub: 'in the panel' },
          { k: 'Backend modules', v: '60+', sub: 'counted from the code' },
          { k: 'Decisions logged', v: '46', sub: 'across ten fronts' },
          { k: 'Plans', v: '4', sub: 'Essencial to Empresarial' },
        ],
      },
      {
        kind: 'text',
        title: 'What the market looked like',
        num: '02',
        body: [
          'Brazilian restaurant software was legacy. The systems worked, in the sense that they eventually produced a number, but they were built by people who had never watched a till at eight on a Friday. Dense grids, function keys, no thought given to who was actually holding the mouse.',
          'That is a strange gap to find in an industry this large, and it is the whole reason Reune exists. The bet was not a better feature list. It was that a restaurant owner with no patience and no training budget would switch systems for one that simply made sense on the first day.',
        ],
      },
      {
        kind: 'text',
        title: 'Thirty restaurants',
        num: '03',
        body: [
          'Before anything was drawn, I visited more than thirty restaurants. Not interviews in a meeting room: kitchens, tills, service, the part of the evening where everything happens at once.',
          'That is where the product actually came from. You cannot invent the moment a waiter retypes an app order into the till, or the argument at closing time about which channel the money came from. You have to stand there while it happens, and then design so it stops happening.',
        ],
      },
      {
        kind: 'table',
        title: 'The four contexts',
        num: '04',
        lead:
          'Almost every decision in the product depends less on the screen than on where the person is standing when they use it. Four conditions of use that cannot be compared to each other, and the split the rest of the work comes out of.',
        cols: ['Context', 'Device and condition', 'What hurts'],
        rows: [
          ['Salão', 'Tablet, standing, one hand. Rush, noise, changing light, a finger rather than a cursor', 'Finding the right table in two seconds without mistouching'],
          ['Caixa', 'Desktop, seated, queue waiting, money involved', 'Precision. An error costs money and trust'],
          ['Produção', 'Large screen read from a distance, hands busy or dirty', 'Reading from far away and knowing what is running late'],
          ['Gestão', 'Desktop or phone, outside the rush, long session', 'Trusting the number and taking it out of the system'],
        ],
      },
      {
        kind: 'quote',
        title: 'Who it is really for',   // no heading is drawn; this feeds the reading marker
        num: '05',
        text:
          'The classic mistake in this kind of product is to design everything for Gestão, who is the one asking, and ship it to Salão, who is the one using it all day.',
        cite: 'Internal UX research, section 1',
      },
      {
        kind: 'figure',
        title: 'Five channels, one queue',
        num: '06',
        name: 'one-queue',
        lead: 'The single decision the rest of the product hangs off.',
        caption:
          'iFood, 99Food and aiqfome bring in the delivery apps. Goomer and Wabiz bring the digital menu, the table QR code and the self-service totem. All of it lands in the same panel as the order taken at the table, tagged with where it came from. Nobody retypes an app order into the till, stock comes down the same way whatever the source, and the end of day adds every channel into one report.',
      },
      {
        kind: 'list',
        title: 'States the product invents',
        num: '07',
        lead:
          'The database stores what happened. An operation needs to know what is pending, and that is almost never a column. Four states that exist only because the product derives them.',
        items: [
          { k: 'Table needs clearing', v: 'The backend has no such status: a table returns to available when the bill closes. The state is born in the front end, watching the transition from occupied-with-a-bill to free-and-empty, and it lives in localStorage so it survives a refresh. It fades on its own, so a forgotten table does not become permanent visual noise' },
          { k: 'Table colour comes from the bill', v: 'The block colour is computed from open bills rather than the raw status field. Served is deliberately neutral, because a served table asks nothing of anyone and should not compete with one that is waiting' },
          { k: 'Audit trail from timestamps', v: 'The audit screen reconstructs history from entity timestamps instead of requiring a log table that was filled in from day one. The backend resolves the entity name before the handler, so the trail says which user was deleted rather than users #365' },
          { k: 'RFV by quintile of its own base', v: 'Recency, frequency and value are ranked against that restaurant’s own customers, not a fixed threshold. A neighbourhood place and an all-you-can-eat have incomparable visit rates, and a fixed cut would misclassify both' },
        ],
      },
      {
        kind: 'list',
        title: 'Where the software meets the kitchen',
        num: '08',
        lead:
          'The part most competitors leave to the notebook next to the tablet: scales, buffet counters, ovens, paper.',
        items: [
          { k: 'Scale over a serial port', v: 'Reads a real URANO POP-S live, with two separate tare values because they are two separate problems: the standing weight of the dish, and zeroing whatever container is on the plate right now' },
          { k: 'Buffet lanes on a rotation timer', v: 'Cold and hot stations, each with a timer that says when the food needs checking. No till models this, and exposed food has a deadline' },
          { k: 'Prep runs with the browser closed', v: 'Recipes can repeat on a schedule. A cron writes the stock movement whether or not anyone has the panel open, because kitchen prep happens at six in the morning' },
          { k: 'Table timer as a business rule', v: 'It starts when the first order is delivered and orders are still outstanding, and clears itself when none are. What matters is how long the table has been waiting, not how old any single order is' },
          { k: 'Stock labels in millimetres', v: 'The on-screen preview uses the same builder as the final PDF, so what you see is literally what prints. It fills what the system knows and leaves a blank line for what it does not, because a pen still works' },
        ],
      },
      {
        kind: 'list',
        title: 'Where an order is born',
        num: '09',
        lead:
          'Several front doors into the same bill. The decision was to privilege none of them.',
        items: [
          { k: 'A WhatsApp bot that reads a filled-in template', v: 'The parser tolerates accents and case, and matches each line against the menu in three passes: normalised equality, then contains, then starts-with. Unmatched items go back to the customer to resend. It deliberately avoids the normal ticket path, which demands an open till and a human attendant, because the bot has neither and has to work when the till is shut' },
          { k: 'The floor map as a grid of targets', v: 'Explicitly not a floor plan. Large blocks coloured by state, sized to be hit quickly with a thumb on a tablet' },
          { k: 'Customer lookup by phone', v: 'Search used to be by name only. The real case is answering the phone, where the caller says a number, not the name on file. Registering a new customer now happens inside the order rather than abandoning it' },
          { k: 'Bulk entry at end of shift', v: 'Recognises that paper exists. Rather than pretending every order passes through the system live, it gives a fast way to reconcile the tickets that did not' },
          { k: 'Availability that propagates', v: 'Pausing an item removes it from the digital menu, the PDF, the waiter app and the till, and makes order creation refuse it, including through the bot' },
        ],
      },
      {
        kind: 'text',
        title: 'What the marketplace owns',
        num: '10',
        body: [
          'The most unusual decision in the system is a piece of restraint. A customer who arrives through iFood, 99food, Goomer, Keeta, WAbiz or aiqfome does not become a contact you can message. The marketplace owns that relationship, and the product says so out loud: the contact appears with the name and phone masked. You can see what they are worth, how much they spent, which channel and when. You cannot call them. Unmasking costs a few cents per contact.',
          'The vocabulary is deliberate too. The word "lead" is kept away from this screen, because there is a separate Leads screen for imported people who have never bought. Calling someone with three purchases a lead would blur two different things in the head of whoever is using it.',
        ],
      },
      {
        kind: 'list',
        title: 'The owner’s arithmetic',
        num: '11',
        lead:
          'The calculator is the one screen that manages nothing. It replaces the paper an owner did the sums on before setting a price.',
        items: [
          { k: 'Price with platform fees built in', v: 'Five tabs: selling price after commission, the same dish compared across channels, cost of goods, break-even, and the fees themselves. Comparing one dish across channels is the sum that decides whether being on iFood is worth it, and no till asks it' },
          { k: 'Fees stored per restaurant', v: 'The built-in constants are market reference with a checked-on date, used for the first visit and the reset button, because marketplace commission is negotiated case by case' },
          { k: 'Tax notes as drafts', v: 'An invoice can be saved without going to the tax authority and issued later from the list' },
          { k: 'Reports built to leave', v: 'CSV export and a dedicated print stylesheet. The hypothesis is explicit: the manager does not want to look at the dashboard, they want the number out of the system and into an accountant’s inbox' },
          { k: 'A billing banner that cannot be dismissed', v: 'It sits above the header and pushes content down rather than floating over it. A warning that scrolls away is not warning anyone' },
        ],
      },
      {
        kind: 'text',
        title: 'The system outside the tab',
        num: '12',
        body: [
          'The premise that changes everything: during service the panel is in the background. The operator is in WhatsApp, in iFood, in another program. A notice that only exists inside the page notifies nobody, and for a while that was the bug. Orders arrived and nobody knew.',
          'So alerts now run in three layers, including operating-system notifications that surface over any other window. The sounds are synthesised on the spot from a few oscillators rather than shipped as audio files, which means a different sound per event type and no downloads. That is information through the ear, not decoration: the operator knows what arrived without looking.',
        ],
      },
      {
        kind: 'list',
        title: 'Design system and access',
        num: '13',
        lead:
          'Less about pretty components, more about not deciding the same thing again on every screen.',
        items: [
          { k: 'One home for chart chrome', v: 'Axis, gridline, tooltip, bar radius and width ceiling moved out of the screen that was already the de facto reference and into a shared module, so style divergence stops being possible by accident' },
          { k: 'Every empty state has an exit', v: 'The same block had been copied into three screens with three different greys. A dead end with no action never lets someone find out the tool does that thing' },
          { k: 'Skeletons instead of spinners', v: 'Analysis screens load into the shape the content will occupy, so nothing jumps in front of someone who is reading' },
          { k: 'Visible focus, with one exception', v: 'A global focus ring, suppressed on form fields where it drew a second rectangle inside the one already there. Label and field association on the profile screen was missing entirely, which is a defect rather than pending polish' },
          { k: 'Permission per tab, not per screen', v: 'Screens with internal tabs now check tab by tab. Existing groups would have locked current customers out on the switch, so the profiles had to be backfilled before release' },
          { k: 'Front-end permission is a navigation map', v: 'It is declared in the file as navigation, not as protection. Anyone calling the API directly is stopped by the backend guard, which is where the rule actually holds. Confusing the two is the classic hole: hide the button, leave the route open' },
        ],
      },
      {
        kind: 'list',
        title: 'The method',
        num: '14',
        lead:
          'The least visible part, and probably the most durable: the product records why each decision was made, including what was wrong before and what is still unresolved.',
        items: [
          { k: 'Comments explain the decision', v: 'The header of each file describes the problem that existed and what was deliberately left out, rather than restating the syntax below it' },
          { k: 'Hypotheses marked as hypotheses', v: 'The research document separates what was observed from what was assumed, and closes with a section saying plainly that none of it has been watched with a real user of this product yet' },
          { k: 'Risks declared before anyone complains', v: 'The heuristic review lists what should break, ordered by risk rather than by effort. An export button that opens a print dialog is first, because it promises a file and delivers something else' },
          { k: 'Instrument before shipping', v: 'Baselines are defined ahead of the change: time from free table to order created, share of orders with an identified customer, drag error rate measured as a move undone within five seconds' },
        ],
      },
      {
        kind: 'quote',
        title: 'The signal worth trusting',
        num: '15',
        text:
          'The most reliable signal is not what someone says in a test. It is what they do when they think nobody is watching. For example, still using the notebook next to the tablet.',
        cite: 'Internal UX research, section 4.4',
      },
      {
        kind: 'list',
        title: 'What is still open',
        num: '16',
        lead:
          'Carried over from the internal review rather than tidied away, because these are the ones a usability test should go after first.',
        items: [
          { k: 'Export to PDF', v: 'The label promises a file and opens the browser print dialog. First candidate for testing' },
          { k: 'Colour on the floor map', v: 'Colour is the main carrier of meaning. There is an icon and a short label to soften it, but the research marks this as needing to be checked with a user rather than assumed' },
          { k: 'Missing print client', v: 'Without QZ Tray installed the message needs to say what to install' },
          { k: 'Automatic tax issuing', v: 'A failure is swallowed into a log. The manual path is the reliable one and stays recommended until the automatic one reports on screen' },
        ],
      },
      {
        kind: 'table',
        title: 'The pricing ladder',
        num: '17',
        lead:
          'Four tiers, priced annually, each one gated on what a restaurant of that size genuinely needs rather than on arbitrary limits. Getting this ladder right is product work, not a spreadsheet exercise.',
        cols: ['Plan', 'Monthly, billed annually', 'For'],
        rows: [
          ['Essencial', 'R$ 242,99', 'Small operations that need the basics without complexity'],
          ['Profissional', 'R$ 341,99', 'Restaurants expanding, with more visibility and control'],
          ['Premium', 'R$ 467,99', 'Larger operations, from the order through to the till'],
          ['Empresarial', 'On request', 'Chains and franchises needing a bespoke setup'],
        ],
        note: 'Annual billing carries a 10 per cent discount. The top tier adds WhatsApp conversations, a self-service totem, audit, and market and popularity analysis.',
      },
      {
        kind: 'swatches',
        title: 'The brand',
        num: '18',
        lead:
          'I designed the wordmark: REUNE with the U replaced by a red circle holding a fork and knife. White ground, charcoal text, one red doing all the shouting.',
        items: [
          { name: 'Primary red', hex: '#D81F1F', note: 'Logo mark, buttons, accents' },
          { name: 'Landing accent', hex: '#C91818', note: 'The red as it ships on the site' },
          { name: 'Charcoal', hex: '#1E1E1E', note: 'Text and dark bands' },
          { name: 'Section ground', hex: '#F6F6F4', note: 'Light sections against white' },
        ],
      },
      {
        kind: 'list',
        title: 'The landing page',
        num: '19',
        lead:
          'Designed and built by me, in Portuguese, at reunedigital.com. It has to do sales work, not just look like a product site.',
        items: [
          { k: 'Live product in the hero', v: 'The dashboard is shown running rather than described, so the first thing a visitor sees is the thing they are buying' },
          { k: 'The integrations section', v: 'Argues the one-queue idea directly, since that is what competitors cannot match' },
          { k: 'Eleven niche pages', v: 'Pizzaria, lanchonete, hamburgueria, delivery, doceria, açaí, bar, marmitaria, japonês, franquias, each aimed at how that owner searches' },
          { k: 'A working blog', v: 'Practical pieces on pricing a dish, closing the till and marketplace versus own delivery, written for the owner rather than for the algorithm' },
        ],
      },
      {
        kind: 'list',
        title: 'What I do here',
        num: '20',
        lead: 'This is the project where the roles stopped being separable.',
        items: [
          { k: 'Head of Product', v: 'Direction, roadmap, scope and the calls about what ships and what waits' },
          { k: 'Design', v: 'The product itself, the design system behind it, and the standards the team works to' },
          { k: 'Brand', v: 'The logo, the palette, the voice, and being the face of it publicly' },
          { k: 'Front-end', v: 'The landing page is my design and my code' },
        ],
      },
    ],
  },
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
