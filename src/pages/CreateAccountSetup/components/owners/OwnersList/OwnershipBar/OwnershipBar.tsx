import classNames from 'classnames';
import styles from './OwnershipBar.module.css';

type Props = {
  // On the total, the bar sits on a line that shows the share still unassigned.
  track?: boolean;
  // A percentage; anything over 100 fills the bar.
  value: number;
};

// A Paid-green bar as wide as a share of the business. Decoration only: the percentage is always in the text next to it.
export const OwnershipBar = ({ track = false, value }: Props) => (
  <div aria-hidden className={classNames(styles.bar, track && styles.track)}>
    <div
      className={styles.fill}
      style={{ width: `${Math.min(value, 100)}%` }}
    />
  </div>
);
