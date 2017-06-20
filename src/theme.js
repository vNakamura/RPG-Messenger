// @flow

import darken from 'polished/lib/color/darken';

type Palette = {
  text: string,
  canvas: string,
  primary1: string,
  primary2: string,
  accent1: string,
  accent2: string
};
const darkPallete: Palette = {
  text: '#e6e5f1',
  canvas: '#2a2932',
  primary1: '#e05858',
  primary2: '#c73661',
  accent1: '#4B4E6D',
  accent2: '#6A8D92'
};
type Fonts = {
  display: string,
  copy: string
};
const basicFonts = {
  display: 'Dosis',
  copy: 'Open Sans',
};

export type Theme = {
  palette: Palette,
  fonts: Fonts,
  sidebar: {
    bg: string,
    width: number,
    breakpoint: number,
    overlayColor: string,
    textColor: string,
    itemHighlight: string,
  },
  topbar: {
    height: string,
    textColor: string,
    invertedTextColor: string,
  }
};
const darkTheme: Theme = {
  palette: darkPallete,
  fonts: basicFonts,
  sidebar: {
    bg: `linear-gradient(11deg, ${darkPallete.canvas} 25%, ${darken(.05, darkPallete.canvas)} 82%);`,
    width: 320,
    breakpoint: 768,
    textColor: darkPallete.text,
    overlayColor: darkPallete.canvas,
    itemHighlight: darkPallete.accent1,
  },
  topbar: {
    height: '56px',
    textColor: darkPallete.text,
    invertedTextColor: darkPallete.canvas,
  },
};

export const defaultTheme: Theme = darkTheme;
export default {...defaultTheme};
