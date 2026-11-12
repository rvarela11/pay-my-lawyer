import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { NavLink } from 'react-router';
import { navItems } from '../../../routes/nav.ts';
import { paths } from '../../../routes/paths.ts';
import { Container } from '../../Container/Container.tsx';
import { Logo } from '../../Logo/Logo.tsx';
import styles from './MobileMenu.module.css';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const MobileMenu = ({ onClose, open }: Props) => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <Drawer
      anchor='right'
      keepMounted
      onClose={onClose}
      open={open}
      slotProps={{ paper: { className: styles.drawerPaper } }}
      transitionDuration={reducedMotion ? 0 : undefined}
    >
      <nav aria-label='Primary' id='mobile-nav'>
        <Container>
          <Toolbar className={styles.toolbar} disableGutters>
            <Logo onClick={onClose} />
            <Button
              className={styles.closeButton}
              onClick={onClose}
              variant='outlined'
            >
              Close
            </Button>
          </Toolbar>
        </Container>
        <Container>
          <List disablePadding>
            {[...navItems, { label: 'Sign in', to: paths.signIn }].map(
              ({ label, to }) => (
                <ListItemButton
                  className={styles.mobileLink}
                  component={NavLink}
                  disableGutters
                  key={to}
                  onClick={onClose}
                  to={to}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ),
            )}
          </List>
        </Container>
      </nav>
    </Drawer>
  );
};
