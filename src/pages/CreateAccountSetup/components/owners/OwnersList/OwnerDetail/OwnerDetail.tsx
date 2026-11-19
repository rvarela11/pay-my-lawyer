import { Typography } from '@mui/material';
import styles from './OwnerDetail.module.css';

type Props = {
  label: string;
  value: string;
  variant?: 'body2' | 'subtitle2';
};

// One label/value pair in a <dl>: muted label on the left, ink value on the right edge.
export const OwnerDetail = ({ label, value, variant = 'body2' }: Props) => (
  <>
    <Typography className={styles.term} component='dt' variant={variant}>
      {label}
    </Typography>
    <Typography className={styles.value} component='dd' variant={variant}>
      {value}
    </Typography>
  </>
);
