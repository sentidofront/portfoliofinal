/* Seven movements. All work experiences live in ONE table act
   ("work"), so the CV isn't over-weighted. The saxophone appears only on the
   first and last acts (see Background). */
export const ACTS = [
  { id: 'intro', kind: 'intro', anchor: 'bl' },
  { id: 'work', kind: 'worktable', anchor: 'bottom' },
  { id: 'portfolio', kind: 'portfolio', anchor: 'bottom' },
  { id: 'articles', kind: 'articles', anchor: 'bottom' },
  { id: 'capabilities', kind: 'skills', anchor: 'bottom' },
  { id: 'dossier', kind: 'dossier', anchor: 'bl' },
  { id: 'contact', kind: 'contact', anchor: 'bl' },
];
