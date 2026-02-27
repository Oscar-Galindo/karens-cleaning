import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from '@unocss/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourdomain.com',
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    UnoCSS({
      injectReset: true,
    }),
    sitemap({
      filter: (page) => !page.includes('forms-demo') && !page.includes('i18n-demo'),
      customPages: [
        'https://yourdomain.com/',
        'https://yourdomain.com/who-am-i',
        'https://yourdomain.com/what-gets-handled',
        'https://yourdomain.com/faq',
        'https://yourdomain.com/articles',
      ],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
