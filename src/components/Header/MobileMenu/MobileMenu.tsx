import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { NavLink } from 'react-router';
import { Container } from '@/components/Container/Container.tsx';
import { Logo } from '@/components/Logo/Logo.tsx';
import { NAV_ITEMS } from '@/routes/nav.ts';
import { PATHS } from '@/routes/paths.ts';
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
      <Stack
        aria-label='Primary'
        className={styles.nav}
        component='nav'
        id='mobile-nav'
      >
        <Container>
          <Toolbar disableGutters>
            <Logo onClick={onClose} />
            <Button className={styles.closeButton} onClick={onClose}>
              Close
            </Button>
          </Toolbar>
        </Container>
        <Container>
          <List disablePadding>
            {NAV_ITEMS.map(({ label, to }) => (
              <ListItemButton
                className={styles.mobileLink}
                component={NavLink}
                disableGutters
                key={to}
                onClick={onClose}
                to={to}
              >
                <ListItemText
                  primary={label}
                  slotProps={{ primary: { variant: 'h3' } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Container>
        <Container className={styles.actions}>
          <Stack spacing={1.5} useFlexGap>
            <Button
              color='secondary'
              component={NavLink}
              fullWidth
              onClick={onClose}
              size='large'
              to={PATHS.createAccount}
              variant='contained'
            >
              Create account
            </Button>
            <Button
              component={NavLink}
              fullWidth
              onClick={onClose}
              size='large'
              to={PATHS.signIn}
              variant='outlined'
            >
              Sign in
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Drawer>
  );
};
