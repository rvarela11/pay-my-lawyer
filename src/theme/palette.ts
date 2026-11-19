import type { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: Brand;
  }
  interface PaletteOptions {
    brand?: Brand;
  }
}

// The product rows' hover colors are softened to the accent's lightness, so they read as one family.
const BRAND = {
  accent: '#9dc08b',
  blue: '#a9bee8',
  green: '#93c8b8',
  orange: '#e8b08a',
  paper: '#fbfcf8',
  pink: '#e7a6b8',
  yellow: '#ead38a',
};
type Brand = typeof BRAND;

const INK = '#0d0d0d';

export const PALETTE = {
  background: { default: '#f3f4ee', paper: BRAND.paper },
  brand: BRAND,
  primary: { contrastText: '#fff', main: INK },
  secondary: { contrastText: INK, main: BRAND.accent },
  text: { primary: INK, secondary: INK },
} satisfies ThemeOptions['palette'];
