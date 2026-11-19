import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    brand: Brand;
  }
  interface PaletteOptions {
    brand?: Brand;
  }
}

const BRAND = {
  blue: '#3358ff',
  green: '#2bb36d',
  orange: '#ff6a00',
  paper: '#fffbf7',
  pink: '#ff4bac',
  yellow: '#ffd230',
};
type Brand = typeof BRAND;

const INK = '#0d0d0d';

export const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    palette: {
      background: { default: '#f5f0eb', paper: BRAND.paper },
      primary: { main: INK, contrastText: '#fff' },
      secondary: { main: BRAND.yellow, contrastText: INK },
      text: { primary: INK, secondary: INK },
      brand: BRAND,
    },
    typography: {
      button: { fontWeight: 500, textTransform: 'none' },
      fontFamily: '"Inter Tight", "Helvetica Neue", "Arial", sans-serif',
      fontWeightBold: 600,
      // Grotesk display scale: medium weight, tight leading, slightly negative tracking on the large sizes.
      // Scales with the viewport so the headline fits beside the payment demo; responsiveFontSizes skips it below.
      h1: {
        fontSize: 'clamp(4rem, 6.5vw, 7.5rem)',
        fontWeight: 500,
        letterSpacing: '-0.025em',
        lineHeight: 1.05,
      },
      h2: {
        fontSize: '2.75rem',
        fontWeight: 500,
        letterSpacing: '-0.015em',
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '2.75rem',
        fontWeight: 400,
        letterSpacing: '-0.015em',
        lineHeight: 1.2,
      },
      h4: {
        fontSize: '1.75rem',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        lineHeight: 1.25,
      },
      h5: { fontSize: '1.35rem', fontWeight: 500, lineHeight: 1.25 },
      h6: { fontSize: '1.2rem', fontWeight: 500, lineHeight: 1.3 },
      subtitle1: { fontSize: '1.25rem', lineHeight: 2 },
    },
    components: {
      // MUI's medium button is ~36px tall; raise it to a 44px touch target (WCAG 2.5.5) so components don't set heights one by one.
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999, minHeight: 44, paddingInline: 22 },
        },
        variants: [{ props: { size: 'large' }, style: { minHeight: 48 } }],
      },
      MuiCssBaseline: { styleOverrides: { 'main:focus': { outline: 'none' } } },
      MuiLink: { defaultProps: { underline: 'hover', color: 'inherit' } },
      // MUI's idle outline is ~1.5:1 on white; darken it to ink at 70% to meet the 3:1 non-text contrast (WCAG 1.4.11). Hover, focus, error and disabled keep MUI's colors.
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => {
            const borderColor = `rgb(${theme.vars?.palette.text.primaryChannel} / 0.7)`;

            return {
              '&:not(:hover, .Mui-disabled, .Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline':
                {
                  borderColor,
                },
              // Touch browsers keep :hover on the last tapped field, where MUI falls back to its faint outline.
              '@media (hover: none)': {
                '&:not(.Mui-disabled, .Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor,
                  },
              },
            };
          },
        },
      },
    },
  }),
  {
    variants: [
      'body1',
      'body2',
      'button',
      'caption',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'overline',
      'subtitle1',
      'subtitle2',
    ],
  },
);
