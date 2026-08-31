/* GitHub Pages serves a project site from /<repo>/, not from the domain root,
   so an absolute path like "/audio/track.mp3" resolves one level too high and
   404s. Vite rewrites the paths it can see (the bundle, and url() in CSS), but
   a path written as a plain string in JS is invisible to it, so those go
   through here instead.

   BASE_URL is "./" in this build, which resolves against the page rather than
   the domain and works whether the site sits at the root or under a repo name. */
const BASE = import.meta.env.BASE_URL || '/';

export const asset = (path) =>
  BASE.replace(/\/$/, '') + '/' + String(path == null ? '' : path).replace(/^\//, '');
