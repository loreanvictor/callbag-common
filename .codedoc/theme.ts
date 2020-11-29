import { createTheme, DefaultCodeThemeLight } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#07689f',
    background: '#faf9f4',
  },
  dark: {
    primary: '#40a8c4',
    background: '#111111',
  },
  quote: {
    light: {
      background: '#eaf2ea',
    },
    dark: {
      background: '#161616',
    }
  },
  toc: {
    dark: {
      background: '#161616',
    },
    light: {
      background: '#eaf4f1',
    }
  },
  code: {
    wmbar: false,
    dark: {
      shadow: '0px 1px 3px #000000',
      background: 'none',
    },
    light: {
      ...DefaultCodeThemeLight,
      shadow: '0px 1px 3px #e0e0e0',
      background: 'none',
    }
  },
});
