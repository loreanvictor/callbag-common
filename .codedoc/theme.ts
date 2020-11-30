import { createTheme, DefaultCodeThemeLight } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#07689f',
    background: '#faf9f4',
  },
  dark: {
    primary: '#40a8c4',
    background: '#1D2D50',
  },
  quote: {
    light: {
      background: '#eaf2ea',
    },
    dark: {
      background: '#182448',
      border: '#133b5c',
    }
  },
  toc: {
    dark: {
      background: '#182448',
    },
    light: {
      background: '#eaf2ea',
    }
  },
  code: {
    wmbar: false,
    dark: {
      shadow: '0px 1px 3px #102030',
      background: 'none',
    },
    light: {
      ...DefaultCodeThemeLight,
      shadow: '0px 1px 3px #e0e0e0',
      background: 'none',
    }
  },
});
