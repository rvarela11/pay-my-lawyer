import type { ThemeOptions } from '@mui/material/styles';

export const COMPONENTS = {
  // MUI's medium button is ~36px tall; raise it to a 44px touch target (WCAG 2.5.5) so components don't set heights one by one.
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: 999, minHeight: 44, paddingInline: 22 },
    },
    variants: [
      { props: { size: 'large' }, style: { minHeight: 48 } },
      // Outlined buttons are an ink pill; on the page they link to, they fill in.
      {
        props: { color: 'primary', variant: 'outlined' },
        style: {
          '&, &:hover': {
            borderColor: 'var(--mui-palette-primary-main)',
            borderWidth: 2,
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
      // Text for screen readers only, like a table caption or an icon column's header.
      '.visually-hidden': {
        border: 0,
        clipPath: 'inset(50%)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: 1,
      },
      // role='list' keeps list semantics in Safari once the bullets are gone.
      "ol[role='list'], ul[role='list']": {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
    },
  },
  // Dialog buttons sit inside the dialog's 24px padding instead of MUI's tight 8px.
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({ padding: theme.spacing(0, 3, 3) }),
    },
  },
  MuiLink: { defaultProps: { color: 'inherit', underline: 'hover' } },
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
  // The header and mobile menu bars: logo on the left, actions on the right.
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
