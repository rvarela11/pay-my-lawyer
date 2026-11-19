import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { COMPONENTS } from './components.ts';
import { PALETTE } from './palette.ts';
import { RESPONSIVE_VARIANTS, TYPOGRAPHY } from './typography.ts';

export const theme = responsiveFontSizes(
  createTheme({
    components: COMPONENTS,
    cssVariables: true,
    palette: PALETTE,
    typography: TYPOGRAPHY,
  }),
  { variants: [...RESPONSIVE_VARIANTS] },
);
