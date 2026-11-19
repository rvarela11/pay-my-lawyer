import { Typography } from '@mui/material';
import styles from './SectionLabel.module.css';

type Props = {
  children: string;
  id: string;
};

export const SectionLabel = ({ children, id }: Props) => (
  <div>
    <div aria-hidden className={styles.line} />
    <Typography className={styles.label} component='h2' id={id} variant='h5'>
      {children}
    </Typography>
  </div>
);
