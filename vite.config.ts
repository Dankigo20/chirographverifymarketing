import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base so the built site works BOTH at the GitHub Pages project
  // sub-path (https://<user>.github.io/chirographverifymarketing/) and at the
  // custom domain root (https://chirographverify.com) with no rebuild.
  //
  // An absolute base ('/') emits root-relative asset URLs, which 404 under the
  // Pages sub-path and render a blank page. './' resolves against the current
  // document, so the same bundle is correct at either origin. The app uses
  // hash routing, so no route depends on a fixed absolute path.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
