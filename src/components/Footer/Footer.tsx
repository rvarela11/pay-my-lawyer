import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PATHS } from '@/routes/paths.ts';
import { Container } from '../Container/Container.tsx';
import styles from './Footer.module.css';
import { Section } from '../Section/Section.tsx';

export const Footer = () => (
  <Section className={styles.footer} component='footer'>
    <Container>
      <Stack
        className={styles.columns}
        direction={{ md: 'row', xs: 'column' }}
        spacing={{ md: 6, xs: 5 }}
        useFlexGap
      >
        <Typography className={styles.wordmark} component='p' variant='h2'>
          Pay My Lawyer
        </Typography>

        <Stack
          className={styles.contact}
          component='address'
          spacing={0}
          useFlexGap
        >
          <Stack
            className={styles.contactLink}
            component={Link}
            direction='row'
            href='mailto:ceo@paymylawyer.cc'
            spacing={1.5}
            useFlexGap
          >
            <span aria-hidden className={styles.badge}>
              E
            </span>
            ceo@paymylawyer.cc
          </Stack>
          <Stack
            className={styles.contactLink}
            component={Link}
            direction='row'
            href='tel:+19564666918'
            spacing={1.5}
            useFlexGap
          >
            <span aria-hidden className={styles.badge}>
              P
            </span>
            956-466-6918
          </Stack>
          <Typography className={styles.addressLine} variant='body2'>
            1304 E Adams St., Brownsville, TX 78520
          </Typography>
        </Stack>
      </Stack>

      <Stack className={styles.fine} spacing={1} useFlexGap>
        <Typography variant='body2'>
          Services are only offered to licensed attorneys within the United
          States.
        </Typography>
        <Stack className={styles.legal} direction='row' spacing={3} useFlexGap>
          <Typography variant='caption'>
            Copyright © {new Date().getFullYear()} Pay My Lawyer
          </Typography>
          <Stack
            className={styles.legalLinks}
            component='ul'
            direction='row'
            role='list'
            spacing={3}
            useFlexGap
          >
            <li>
              <Link component={RouterLink} to={PATHS.terms} variant='caption'>
                Terms of service
              </Link>
            </li>
            <li>
              <Link component={RouterLink} to={PATHS.privacy} variant='caption'>
                Privacy policy
              </Link>
            </li>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  </Section>
);
