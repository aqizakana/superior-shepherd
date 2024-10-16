// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'hybrid',
  prefetch:true,

});