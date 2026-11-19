import type { ThemeOptions } from '@mui/material/styles';

// responsiveFontSizes scales these variants down on small screens; h1 scales itself with clamp() instead.
export const RESPONSIVE_VARIANTS = [
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
] as const;

export const TYPOGRAPHY = {
  button: { fontWeight: 500, textTransform: 'none' },
  fontFamily: '"Inter Tight", "Helvetica Neue", "Arial", sans-serif',
  fontWeightBold: 600,
  // Scales with the viewport so the headline fits beside the payment demo.
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
} satisfies ThemeOptions['typography'];
