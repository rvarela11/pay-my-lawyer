import { LinearProgress, Step, StepLabel, Stepper } from '@mui/material';
import styles from './StepIndicator.module.css';

type Props = {
  labels: readonly string[];
  number: number;
  total: number;
};

// Visual only: the layout reads "Step N of M" out as text right after the heading.
export const StepIndicator = ({ labels, number, total }: Props) => (
  <div aria-hidden='true' className={styles.indicator}>
    <Stepper
      activeStep={number - 1}
      alternativeLabel
      className={styles.stepper}
    >
      {labels.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <LinearProgress
      className={styles.bar}
      value={(number / total) * 100}
      variant='determinate'
    />
  </div>
);
