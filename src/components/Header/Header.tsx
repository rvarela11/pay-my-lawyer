import { AppBar, Button, Toolbar, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { navItems } from '../../routes/nav.ts';
import { paths } from '../../routes/paths.ts';
import { Container } from '../Container/Container.tsx';
import styles from './Header.module.css';
import { Logo } from '../Logo/Logo.tsx';
import { MobileMenu } from './MobileMenu/MobileMenu.tsx';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const desktop = useMediaQuery('(min-width: 900px)');
  const open = menuOpen && !desktop;

  const handleClose = () => setMenuOpen(false);

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
              {navItems.map(({ label, to, end }) => (
                <li key={to}>
                  <Button
                    className={styles.navLink}
                    color='inherit'
                    component={NavLink}
                    end={end}
                    to={to}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
            <Button component={NavLink} to={paths.signIn} variant='contained'>
              Sign in
            </Button>
          </nav>

          <Button
            aria-controls='mobile-nav'
            aria-expanded={open}
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            variant='outlined'
          >
            Menu
          </Button>
        </Toolbar>
      </Container>

      <MobileMenu onClose={handleClose} open={open} />
    </AppBar>
  );
};
