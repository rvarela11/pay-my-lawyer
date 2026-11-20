import { Stack, Typography } from '@mui/material';
import { VisuallyHidden } from '@/components/VisuallyHidden/VisuallyHidden.tsx';
import styles from './OwnerDetail.module.css';

type Props = {
  // For values that read on their own, like a title or a percentage; screen readers still hear the label.
  hideLabel?: boolean;
  label: string;
  value: string;
  variant?: 'body2' | 'subtitle1';
};

// One label/value pair in a <dl>, on one line.
export const OwnerDetail = ({
  hideLabel = false,
  label,
  value,
  variant = 'body2',
}: Props) => (
  <Stack direction='row' spacing={0.5} useFlexGap>
    {hideLabel ? (
      <VisuallyHidden component='dt'>{label}</VisuallyHidden>
    ) : (
      <Typography className={styles.term} component='dt' variant={variant}>
        {label}
      </Typography>
    )}
    <Typography
      className={styles.value}
      component='dd'
      title={value}
      variant={variant}
    >
      {value}
    </Typography>
  </Stack>
);
