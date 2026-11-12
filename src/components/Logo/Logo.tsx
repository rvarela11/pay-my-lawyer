import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { paths } from '../../routes/paths.ts';
import styles from './Logo.module.css';

export const Logo = () => (
  <Link
    aria-label='Pay My Lawyer, home'
    className={styles.logo}
    component={RouterLink}
    to={paths.home}
    underline='none'
  >
    <img
      alt=''
      className={styles.image}
      src={`${import.meta.env.BASE_URL}pay-my-lawyer-logo.png`}
    />
    <Typography component='span' variant='h4'>
      Pay My Lawyer
    </Typography>
  </Link>
);
