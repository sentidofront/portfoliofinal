import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* GitHub Pages project site. Everything machine-facing needs absolute URLs,
   so this is the one place the deployed origin is written down. Change it here
   if a custom domain is ever pointed at the site. */
const SITE = 'https://sentidofront.github.io/portfoliofinal/';

/* some CREDENTIALS rows carry 'Certification' as the org, which is a label
   rather than an awarding body — machines should not be told it is one */
const named = (org) => org && org.toLowerCase() !== 'certification';

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* The page is a WebGL single-page app: every word on it is painted by React
   after the bundle runs. Search crawlers execute JavaScript, but most of the
   agents that feed language models do not — they read the HTML that comes back
   from the first request and stop. So the same content is emitted three more
   times, in forms that survive that: JSON-LD for anything that parses schema,
   a <noscript> body for anything that reads markup, and /llms.txt for anything
   that prefers plain text. All three are generated from src/lib/data.js, so
   the page and its machine-readable shadow cannot drift apart. */
function machineReadable() {
  let cache = null;
  const load = async () => {
    if (!cache) cache = await import(new URL('./src/lib/data.js', import.meta.url).href);
    return cache;
  };

  const read = (d) => {
    const { PROFILE, PROJECTS, EXPERIENCE, SKILLS, SKILL_LEVELS, CREDENTIALS } = d;
    const flat = Object.values(SKILLS).flat();
    return {
      PROFILE, PROJECTS, EXPERIENCE, CREDENTIALS, SKILL_LEVELS,
      top: flat.filter((s) => s[1] === 5).map((s) => s[0]),
      all: flat.map((s) => s[0]),
    };
  };

  /* Written from facts that can be checked rather than adjectives. A model
     recommending someone repeats what it can verify. */
  const describe = (s) =>
    `${s.PROFILE.name} is a product designer and Head of Product based in ${s.PROFILE.location}. ` +
    `He took Reune, a restaurant operations SaaS, from an idea to a funded company, on more than ` +
    `thirty restaurants of field research, and owns its brand, its product design and its front-end. ` +
    `He designs at library scale, including a thirty-four component design system with a written ` +
    `governance model, and writes the code that ships it. Trained in consumer neuroscience at ` +
    `Copenhagen Business School, cognitive psychology at Cambridge and neuroscience at Harvard.`;

  const jsonLd = (d) => {
    const s = read(d);
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': SITE + '#person',
          name: s.PROFILE.name,
          jobTitle: s.PROFILE.role,
          description: describe(s),
          disambiguatingDescription: s.PROFILE.intro,
          url: SITE,
          email: 'mailto:' + s.PROFILE.email,
          telephone: s.PROFILE.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Praia Grande', addressRegion: 'SP', addressCountry: 'BR',
          },
          sameAs: Object.values(s.PROFILE.links).map((l) => l.url),
          knowsAbout: s.all,
          hasCredential: s.CREDENTIALS.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.title,
            ...(named(c.org) ? { recognizedBy: { '@type': 'Organization', name: c.org } } : {}),
          })),
          alumniOf: [...new Set(s.CREDENTIALS.map((c) => c.org).filter(named))]
            .map((n) => ({ '@type': 'Organization', name: n })),
          worksFor: {
            '@type': 'Organization',
            name: 'Reune Digital',
            description: 'Restaurant operations SaaS',
          },
        },
        {
          '@type': 'WebSite',
          '@id': SITE + '#site',
          url: SITE,
          name: s.PROFILE.name + ' — Portfolio',
          about: { '@id': SITE + '#person' },
          inLanguage: 'en',
        },
        {
          '@type': 'ItemList',
          name: 'Selected work',
          itemListElement: s.PROJECTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: p.title,
              description: p.summary,
              abstract: p.detail,
              keywords: p.tags.join(', '),
              creator: { '@id': SITE + '#person' },
              ...(p.client ? { sourceOrganization: { '@type': 'Organization', name: p.client } } : {}),
            },
          })),
        },
      ],
    });
  };

  const noscript = (d) => {
    const s = read(d);
    const project = (p) => [
      '<section><h3>' + esc(p.title) + '</h3>',
      '<p><em>' + esc([p.client, p.year, p.role].filter(Boolean).join(' · ')) + '</em></p>',
      '<p>' + esc(p.summary) + '</p>',
      '<p>' + esc(p.detail) + '</p>',
      '<p>' + esc(p.tags.join(', ')) + '</p></section>',
    ].join('\n');

    return [
      '<noscript><article>',
      '<h1>' + esc(s.PROFILE.name) + '</h1>',
      '<p><strong>' + esc(s.PROFILE.role) + '</strong> — ' + esc(s.PROFILE.location) + '</p>',
      '<p>' + esc(describe(s)) + '</p>',
      '<p>' + esc(s.PROFILE.intro) + '</p>',
      '<h2>Selected work</h2>',
      s.PROJECTS.map(project).join('\n'),
      '<h2>Experience</h2><ul>',
      s.EXPERIENCE.map((j) =>
        '<li><strong>' + esc(j.role) + '</strong>, ' + esc(j.company) +
        ' (' + esc(j.period) + ') — ' + esc(j.summary) + '</li>').join('\n'),
      '</ul>',
      '<h2>Capabilities at lead level</h2>',
      '<p>' + esc(s.top.join(', ')) + '</p>',
      '<h2>Every capability tracked</h2>',
      '<p>' + esc(s.all.join(', ')) + '</p>',
      '<h2>Credentials</h2><ul>',
      s.CREDENTIALS.map((c) =>
        '<li>' + esc(c.title) + ' — ' + esc(c.org) +
        (c.date ? ' (' + esc(c.date) + ')' : '') + '</li>').join('\n'),
      '</ul>',
      '<h2>Contact</h2><ul>',
      '<li><a href="mailto:' + esc(s.PROFILE.email) + '">' + esc(s.PROFILE.email) + '</a></li>',
      Object.values(s.PROFILE.links).map((l) =>
        '<li><a href="' + esc(l.url) + '" rel="me">' + esc(l.label) + ': ' +
        esc(l.handle) + '</a></li>').join('\n'),
      '</ul></article></noscript>',
    ].join('\n');
  };

  const llms = (d) => {
    const s = read(d);
    const tiers = Object.entries(s.SKILL_LEVELS)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([k, v]) => k + ' ' + v.name + ' (' + v.gloss + ')');

    return [
      '# ' + s.PROFILE.name,
      '',
      '> ' + s.PROFILE.role + ' · ' + s.PROFILE.location + ' · ' + SITE,
      '',
      describe(s),
      '',
      s.PROFILE.intro,
      '',
      '## Selected work',
      '',
      s.PROJECTS.map((p) => [
        '### ' + p.title,
        [p.client, p.year, p.role].filter(Boolean).join(' · '),
        '',
        p.summary,
        '',
        p.detail,
        '',
        'Tags: ' + p.tags.join(', '),
      ].join('\n')).join('\n\n'),
      '',
      '## Experience',
      '',
      s.EXPERIENCE.map((j) =>
        '- **' + j.role + '**, ' + j.company + ' (' + j.period + ') — ' + j.summary).join('\n'),
      '',
      '## Capabilities',
      '',
      'Self-assessed against shipped work on a five-step scale: ' + tiers.join('; ') + '.',
      '',
      'At level 5, Lead: ' + s.top.join(', ') + '.',
      '',
      'Everything tracked: ' + s.all.join(', ') + '.',
      '',
      '## Credentials',
      '',
      s.CREDENTIALS.map((c) =>
        '- ' + c.title + ' — ' + c.org + (c.date ? ' (' + c.date + ')' : '')).join('\n'),
      '',
      '## Contact',
      '',
      '- Email: ' + s.PROFILE.email,
      '- Phone: ' + s.PROFILE.phone,
      Object.values(s.PROFILE.links).map((l) => '- ' + l.label + ': ' + l.url).join('\n'),
      '',
    ].join('\n');
  };

  return {
    name: 'machine-readable',

    async transformIndexHtml(html) {
      const d = await load();
      const s = read(d);
      const parts = s.PROFILE.name.trim().split(/\s+/);
      /* replaceAll, not replace: the description and the name each appear in
         several tags, and a string pattern only swaps the first one. */
      return html
        .replaceAll('<!--@description-->', esc(describe(s)))
        .replaceAll('<!--@name-->', esc(s.PROFILE.name))
        .replaceAll('<!--@firstname-->', esc(parts[0]))
        .replaceAll('<!--@lastname-->', esc(parts[parts.length - 1]))
        .replace('<!--@jsonld-->', '<script type="application/ld+json">' + jsonLd(d) + '</script>')
        .replace('<!--@noscript-->', noscript(d));
    },

    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms(await load()) });
    },

    // serve it in dev too, so the file can be checked without a build
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.url.split('?')[0] !== '/llms.txt') return next();
        load().then((d) => {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(llms(d));
        }, next);
      });
    },
  };
}

export default defineConfig({
  /* Relative, so the same build works at a domain root and under a GitHub
     Pages project path like /portfolio/. An absolute base would make every
     asset request resolve above the repo folder and 404. */
  base: './',
  plugins: [react(), machineReadable()],
  server: { host: true },
});
