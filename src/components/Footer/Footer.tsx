import { Divider, Link, Typography } from '@mui/material';
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

      <div>
        <Typography className={styles.heading} component='h2' variant='h4'>
          Contact
        </Typography>
        <address className={styles.address}>
          <ul className={styles.contactList}>
            <li>
              <Link className={styles.link} href='mailto:ceo@paymylawyer.cc'>
                ceo@paymylawyer.cc
              </Link>
            </li>
            <Divider
              aria-hidden
              className={styles.divider}
              component='li'
              flexItem
              orientation='vertical'
            />
            <li>
              <Link className={styles.link} href='tel:+19564666918'>
                956-466-6918
              </Link>
            </li>
          </ul>
          <div className={styles.addressLine}>
            1304 E Adams St., Brownsville, TX 78520
          </div>
        </address>
      </div>
    </Container>
  </footer>
);
