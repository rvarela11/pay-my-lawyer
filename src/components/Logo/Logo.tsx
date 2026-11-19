import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PATHS } from '@/routes/paths.ts';
import styles from './Logo.module.css';

type Props = {
  onClick?: () => void;
};

export const Logo = ({ onClick }: Props) => (
  <Link
    aria-label='Pay My Lawyer, home'
    className={styles.logo}
    component={RouterLink}
    onClick={onClick}
    to={PATHS.home}
    underline='none'
    variant='h6'
  >
    Pay My Lawyer
  </Link>
);
