import { Link, List, ListItem, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { navItems } from '../../routes/nav.ts';
import { Container } from '../Container/Container.tsx';
import styles from './Footer.module.css';
import { Logo } from '../Logo/Logo.tsx';

export const Footer = () => (
  <footer className={styles.footer}>
    <Container className={styles.inner}>
      <div className={styles.about}>
        <Logo />
        <Typography className={styles.aboutText} variant='body2'>
          Pay My Lawyer offers secure payment processing for law firms.
        </Typography>
      </div>

      <nav aria-labelledby='footer-links'>
        <Typography
          className={styles.heading}
          component='h2'
          id='footer-links'
          variant='h4'
        >
          Links
        </Typography>
        <List disablePadding>
          {navItems.map(({ label, to }) => (
            <ListItem disablePadding key={to}>
              <Link className={styles.link} component={RouterLink} to={to}>
                {label}
              </Link>
            </ListItem>
          ))}
        </List>
      </nav>

      <div>
        <Typography className={styles.heading} component='h2' variant='h4'>
          Contact
        </Typography>
        <address className={styles.address}>
          <List disablePadding>
            <ListItem disablePadding>
              <Link className={styles.link} href='mailto:ceo@paymylawyer.cc'>
                ceo@paymylawyer.cc
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link className={styles.link} href='tel:+19564666918'>
                956-466-6918
              </Link>
            </ListItem>
            <ListItem className={styles.addressLine} disablePadding>
              1304 E Adams St.
              <br />
              Brownsville, TX 78520
            </ListItem>
          </List>
        </address>
      </div>
    </Container>
  </footer>
);
