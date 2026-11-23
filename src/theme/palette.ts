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

// The product color names to pick from (PRODUCT_ACCENTS.orange), so no file spells one out.
export const PRODUCT_ACCENTS = {
  blue: 'blue',
  green: 'green',
  orange: 'orange',
  pink: 'pink',
  yellow: 'yellow',
} as const;
export type ProductAccent =
  (typeof PRODUCT_ACCENTS)[keyof typeof PRODUCT_ACCENTS];

// Each product's color: its Home row's fill on hover and its line on Products.
// Softened to the accent's lightness, so they read as one family. satisfies makes sure every name has a color.
const PRODUCT_ACCENT_COLORS = {
  [PRODUCT_ACCENTS.blue]: '#a9bee8',
  [PRODUCT_ACCENTS.green]: '#93c8b8',
  [PRODUCT_ACCENTS.orange]: '#e8b08a',
  [PRODUCT_ACCENTS.pink]: '#e7a6b8',
  [PRODUCT_ACCENTS.yellow]: '#ead38a',
} satisfies Record<ProductAccent, string>;

const BRAND = {
  accent: '#9dc08b',
  paper: '#fbfcf8',
  ...PRODUCT_ACCENT_COLORS,
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
