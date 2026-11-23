import type { CSSProperties } from 'react';
import type { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: Brand;
  }
  interface PaletteOptions {
    brand?: Brand;
  }
}

// Lets an element set the --accent its CSS Module reads, without a cast.
declare module 'react' {
  interface CSSProperties {
    '--accent'?: string;
  }
}

// Each product's color: its Home row's fill on hover and its line on Products.
// Softened to the accent's lightness, so they read as one family.
const PRODUCT_ACCENTS = {
  blue: '#a9bee8',
  green: '#93c8b8',
  orange: '#e8b08a',
  pink: '#e7a6b8',
  yellow: '#ead38a',
};
export type ProductAccent = keyof typeof PRODUCT_ACCENTS;

const BRAND = {
  accent: '#9dc08b',
  paper: '#fbfcf8',
  ...PRODUCT_ACCENTS,
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

// Sets --accent to a product's color, read from the theme's CSS variables.
export const productAccentStyle = (accent: ProductAccent): CSSProperties => ({
  '--accent': `var(--mui-palette-brand-${accent})`,
});
