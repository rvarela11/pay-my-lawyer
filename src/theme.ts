import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: { green: string; sage: string; cream: string };
  }
  interface PaletteOptions {
    brand?: { green: string; sage: string; cream: string };
  }
}

const INK = '#40513b';
const BRAND = { green: '#609966', sage: '#9dc08b', cream: '#edf1d6' };

export const theme = responsiveFontSizes(createTheme({
  cssVariables: true,
  palette: {
    primary: { main: INK, contrastText: '#fff' },
    secondary: { main: BRAND.cream, contrastText: INK },
    text: { primary: INK, secondary: INK },
    brand: BRAND,
  },
  typography: {
    button: { textTransform: 'none' },
    fontFamily: '"IBM Plex Sans", "Helvetica", "Arial", sans-serif',
  },
  components: {
    // MUI's medium button is ~36px tall; raise it to a 44px touch target (WCAG 2.5.5) so components don't set heights one by one.
    MuiButton: {
      styleOverrides: { root: { minHeight: 44 } },
      variants: [{ props: { size: 'large' }, style: { minHeight: 48 } }],
    },
    MuiCssBaseline: { styleOverrides: { 'main:focus': { outline: 'none' } } },
    MuiLink: { defaultProps: { underline: 'hover', color: 'inherit' } },
  },
}));
