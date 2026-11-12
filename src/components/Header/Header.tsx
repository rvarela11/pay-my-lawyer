import {
  AppBar,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { navItems } from '../../routes/nav.ts';
import { paths } from '../../routes/paths.ts';
import { Container } from '../Container/Container.tsx';
import styles from './Header.module.css';
import { Logo } from '../Logo/Logo.tsx';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

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
            onClick={() => setOpen((value) => !value)}
            variant='outlined'
          >
            {open ? 'Close' : 'Menu'}
          </Button>
        </Toolbar>

        <Collapse
          className={styles.mobileNav}
          in={open}
          timeout='auto'
          unmountOnExit
        >
          <nav aria-label='Primary' id='mobile-nav'>
            <List disablePadding>
              {[...navItems, { label: 'Sign in', to: paths.signIn }].map(
                ({ label, to }) => (
                  <ListItemButton
                    className={styles.mobileLink}
                    component={NavLink}
                    key={to}
                    onClick={close}
                    to={to}
                  >
                    <ListItemText primary={label} />
                  </ListItemButton>
                ),
              )}
            </List>
          </nav>
        </Collapse>
      </Container>
    </AppBar>
  );
};
