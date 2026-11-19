import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { NAV_ITEMS } from '../../routes/nav.ts';
import { PATHS } from '../../routes/paths.ts';
import { Container } from '../Container/Container.tsx';
import styles from './Header.module.css';
import { Logo } from '../Logo/Logo.tsx';
import { MobileMenu } from './MobileMenu/MobileMenu.tsx';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const open = menuOpen && !desktop;

  const handleClose = () => setMenuOpen(false);
  const handleOpen = () => setMenuOpen(true);

  return (
    <AppBar
      className={styles.header}
      color='inherit'
      component='header'
      elevation={0}
      position='sticky'
    >
      <Container>
        <Toolbar disableGutters>
          <Logo />

          <Stack
            aria-label='Primary'
            component='nav'
            direction='row'
            spacing={4}
            sx={{ alignItems: 'center', display: { md: 'flex', xs: 'none' } }}
            useFlexGap
          >
            <Stack
              component='ul'
              direction='row'
              role='list'
              spacing={3}
              useFlexGap
            >
              {NAV_ITEMS.map(({ label, to, end }) => (
                <li key={to}>
                  <Link
                    className={styles.navLink}
                    component={NavLink}
                    end={end}
                    to={to}
                    underline='none'
                    variant='subtitle1'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </Stack>
            <Stack
              direction='row'
              spacing={1.5}
              sx={{ alignItems: 'center' }}
              useFlexGap
            >
              <Button component={NavLink} to={PATHS.signIn} variant='outlined'>
                Sign in
              </Button>
              <Button
                color='secondary'
                component={NavLink}
                to={PATHS.createAccount}
                variant='contained'
              >
                Create account
              </Button>
            </Stack>
          </Stack>

          <IconButton
            aria-controls='mobile-nav'
            aria-expanded={open}
            aria-label='Menu'
            edge='end'
            onClick={handleOpen}
            size='large'
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <MobileMenu onClose={handleClose} open={open} />
    </AppBar>
  );
};
