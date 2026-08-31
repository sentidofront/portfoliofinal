import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  /* Relative, so the same build works at a domain root and under a GitHub
     Pages project path like /portfolio/. An absolute base would make every
     asset request resolve above the repo folder and 404. */
  base: './',
  plugins: [react()],
  server: { host: true },
});
