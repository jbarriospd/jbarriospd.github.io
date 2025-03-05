import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://projectsjb.website',
  integrations: [
    preact(),
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    service: passthroughImageService(),
  },
});