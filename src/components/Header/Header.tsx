import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  useMediaQuery,
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
  const desktop = useMediaQuery('(min-width: 900px)');
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
        <Toolbar className={styles.toolbar} disableGutters>
          <Logo />

          <nav aria-label='Primary' className={styles.desktopNav}>
            <ul className={styles.navList}>
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
            </ul>
            <div className={styles.actions}>
              <Button
                className={styles.signIn}
                component={NavLink}
                to={PATHS.signIn}
                variant='outlined'
              >
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
            </div>
          </nav>

          <IconButton
            aria-controls='mobile-nav'
            aria-expanded={open}
            aria-label='Menu'
            className={styles.menuButton}
            edge='end'
            onClick={handleOpen}
            size='large'
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <MobileMenu onClose={handleClose} open={open} />
    </AppBar>
  );
};
