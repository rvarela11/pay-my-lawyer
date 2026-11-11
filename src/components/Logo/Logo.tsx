import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
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
    <AccountBalanceIcon fontSize='large' />
    <Typography component='span' variant='h4'>
      Pay My Lawyer
    </Typography>
  </Link>
);
