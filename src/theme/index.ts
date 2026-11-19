import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { COMPONENTS } from './components.ts';
import { PALETTE } from './palette.ts';
import { RESPONSIVE_VARIANTS, TYPOGRAPHY } from './typography.ts';

export const theme = responsiveFontSizes(
  createTheme({
    components: COMPONENTS,
    cssVariables: true,
    palette: PALETTE,
    // Square corners on inputs, dialogs, menus and alerts, like the site's panels and tables. Buttons stay pills.
    shape: { borderRadius: 0 },
    typography: TYPOGRAPHY,
  }),
  { variants: [...RESPONSIVE_VARIANTS] },
);
