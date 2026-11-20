import type { ThemeOptions } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

// MUI's idle outline is ~1.5:1 on white; draw it in ink like the site's other borders (and above the 3:1 non-text contrast, WCAG 1.4.11).
// With an ink outline at rest, MUI's focused outline (2px) is barely different, so focus thickens it to 3px instead. An outside
// focus ring would cross the floating label. Hover, error and disabled keep MUI's colors. Read by COMPONENTS while the module
// loads, so it comes first. The fill is the surface color, so a field reads as a box to type in, not a line drawn on the page.
const inkOutline = (outline: string) => ({
  backgroundColor: 'var(--mui-palette-background-paper)',
  [`&.Mui-focused ${outline}`]: { borderWidth: 3 },
  [`&:not(:hover, .Mui-disabled, .Mui-error, .Mui-focused) ${outline}`]: {
    borderColor: 'var(--mui-palette-primary-main)',
  },
  // Touch browsers keep :hover on the last tapped field, where MUI falls back to its faint outline.
  '@media (hover: none)': {
    [`&:not(.Mui-disabled, .Mui-error, .Mui-focused) ${outline}`]: {
      borderColor: 'var(--mui-palette-primary-main)',
    },
  },
});

export const COMPONENTS = {
  // MUI's medium button is ~36px tall; raise it to a 44px touch target (WCAG 2.5.5) so components don't set heights one by one.
  // Keyboard focus draws the site's 3px ring in ink instead of MUI's grey ripple, which is too faint (WCAG 1.4.11). Ink, not
  // currentColor: on Next the text is white, and the ring sits outside the button on the light page.
  MuiButton: {
    defaultProps: { disableElevation: true, disableFocusRipple: true },
    styleOverrides: {
      root: {
        borderRadius: 999,
        minHeight: 44,
        paddingInline: 22,
        '&:focus-visible': {
          outline: '3px solid var(--mui-palette-primary-main)',
          outlineOffset: 3,
        },
      },
    },
    variants: [
      { props: { size: 'large' }, style: { minHeight: 48 } },
      // Outlined buttons are an ink pill filled with the surface color, like the text fields; on the page they link to, they
      // fill with ink. MUI's hover tint is mixed into the fill, and touch screens (which keep :hover after a tap) keep the fill.
      {
        props: { color: 'primary', variant: 'outlined' },
        style: {
          '&, &:hover': {
            borderColor: 'var(--mui-palette-primary-main)',
            borderWidth: 2,
          },
          backgroundColor: 'var(--mui-palette-background-paper)',
          '&:hover': {
            backgroundColor:
              'color-mix(in srgb, var(--mui-palette-primary-main) 4%, var(--mui-palette-background-paper))',
            '@media (hover: none)': {
              backgroundColor: 'var(--mui-palette-background-paper)',
            },
          },
          "&[aria-current='page']": {
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: 'var(--mui-palette-primary-contrastText)',
          },
        },
      },
    ],
  },
  MuiCssBaseline: {
    styleOverrides: {
      // currentColor keeps the ring visible on light and dark backgrounds. Text fields keep MUI's own focus border.
      ':where(a, button, [tabindex]):focus-visible': {
        outline: '3px solid currentColor',
        outlineOffset: 3,
      },
      'main:focus': { outline: 'none' },
      // role='list' keeps list semantics in Safari once the bullets are gone.
      "ol[role='list'], ul[role='list']": {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
    },
  },
  // Dialog buttons sit inside the dialog's 24px padding instead of MUI's tight 8px.
  // Dialogs sit flat with an ink border, like the site's panels, instead of MUI's drop shadow; the backdrop still dims the page.
  MuiDialog: {
    styleOverrides: {
      paper: {
        border: '1px solid var(--mui-palette-primary-main)',
        boxShadow: 'none',
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({ padding: theme.spacing(0, 3, 3) }),
    },
  },
  // The progress bar stops sliding between values for people who reduce motion.
  // Icon buttons (show password, the date picker's calendar) get the same ring; currentColor is their ink icon.
  MuiIconButton: {
    defaultProps: { disableFocusRipple: true },
    styleOverrides: {
      root: {
        '&:focus-visible': {
          outline: '3px solid currentColor',
          outlineOffset: 3,
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      bar: {
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      },
    },
  },
  MuiLink: { defaultProps: { color: 'inherit', underline: 'hover' } },
  MuiOutlinedInput: {
    styleOverrides: { root: inkOutline('.MuiOutlinedInput-notchedOutline') },
  },
  // The date picker (MUI X) draws its field with its own input, so it needs the same outline.
  MuiPickersOutlinedInput: {
    styleOverrides: {
      root: inkOutline('.MuiPickersOutlinedInput-notchedOutline'),
    },
  },
  // The header and mobile menu bars: logo on the left, actions on the right.
  // The wizard's stepper: the current step in the accent (with ink numbers, which read on it), finished steps in ink.
  MuiStepIcon: {
    styleOverrides: {
      root: {
        '&.Mui-active': { color: 'var(--mui-palette-brand-accent)' },
        '&.Mui-active .MuiStepIcon-text': {
          fill: 'var(--mui-palette-primary-main)',
        },
        '&.Mui-completed': { color: 'var(--mui-palette-primary-main)' },
      },
    },
  },
  // Table rules in ink, like the site's other lines (MUI's default is a faint grey).
  MuiTableCell: {
    styleOverrides: {
      root: { borderBottomColor: 'var(--mui-palette-primary-main)' },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: theme.spacing(3),
        justifyContent: 'space-between',
        minHeight: 64,
        paddingBlock: theme.spacing(1),
      }),
    },
  },
} satisfies ThemeOptions['components'];
