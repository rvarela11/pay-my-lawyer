import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: { green: string; sage: string; cream: string };
  }
  interface PaletteOptions {
    brand?: { green: string; sage: string; cream: string };
  }
}

const ink = '#40513b';
const brand = { green: '#609966', sage: '#9dc08b', cream: '#edf1d6' };

export const theme = responsiveFontSizes(createTheme({
  cssVariables: true,
  palette: {
    primary: { main: ink, contrastText: '#fff' },
    secondary: { main: brand.cream, contrastText: ink },
    text: { primary: ink, secondary: ink },
    brand,
  },
  typography: { button: { textTransform: 'none' } },
  components: {
    MuiCssBaseline: { styleOverrides: { 'main:focus': { outline: 'none' } } },
    MuiLink: { defaultProps: { underline: 'hover', color: 'inherit' } },
  },
}));
