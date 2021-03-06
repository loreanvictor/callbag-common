
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  src: {
    base: 'docs/'
  },
  dest: {
    namespace: '/callbag-common',
    html: 'dist',
    assets: process.env.GITHUB_BUILD === 'true' ? 'dist' : '.',
    bundle: process.env.GITHUB_BUILD === 'true' ? 'bundle' : 'dist/bundle',
    styles: process.env.GITHUB_BUILD === 'true' ? 'styles' : 'dist/styles',
  },
  page: {
    title: {
      extractor: (content) => {
        const base = 'callbag-common';
        const pt = content.querySelector('h1')?.textContent;

        return pt ? `${base} | ${pt}` : base;
      }
    },
    fonts: {
      text: {
        url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
        name: 'Open Sans',
        fallback: 'Helvetica Neue, Arial, sans-serif'
      }
    }
  },
  misc: {
    github: {
      user: 'loreanvictor',
      repo: 'callbag-common',
    }
  },
});
