import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Container } from '../Container/Container.tsx';
import styles from './Footer.module.css';
import { FOOTER_LINKS } from './links.ts';
import { Section } from '../Section/Section.tsx';

export const Footer = () => (
  <Section className={styles.footer} component='footer'>
    <Container>
      <div className={styles.inner}>
        <Typography className={styles.wordmark} component='p' variant='h2'>
          Pay My Lawyer
        </Typography>

        <address className={styles.contact}>
          <Link className={styles.contactLink} href='mailto:ceo@paymylawyer.cc'>
            <span aria-hidden className={styles.badge}>
              E
            </span>
            ceo@paymylawyer.cc
          </Link>
          <Link className={styles.contactLink} href='tel:+19564666918'>
            <span aria-hidden className={styles.badge}>
              P
            </span>
            956-466-6918
          </Link>
          <Typography className={styles.addressLine} variant='body2'>
            1304 E Adams St., Brownsville, TX 78520
          </Typography>
        </address>

        <nav aria-label='Footer' className={styles.nav}>
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <Typography
                className={styles.heading}
                component='h2'
                variant='body2'
              >
                {heading}
              </Typography>
              <ul className={styles.linkList}>
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link component={RouterLink} to={to} variant='body2'>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <Typography className={styles.eligibility} variant='body2'>
        Services are only offered to licensed attorneys within the United
        States.
      </Typography>
      <Typography className={styles.copyright} variant='caption'>
        Copyright © {new Date().getFullYear()} Pay My Lawyer
      </Typography>
    </Container>
  </Section>
);
