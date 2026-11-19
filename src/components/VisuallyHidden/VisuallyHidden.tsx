import type { HTMLAttributes } from 'react';
import styles from './VisuallyHidden.module.css';

type Props = HTMLAttributes<HTMLElement> & {
  component?: 'caption' | 'p' | 'span' | 'thead';
};

// Text for screen readers only, like a table caption or an icon column's header.
export const VisuallyHidden = ({
  component: Component = 'span',
  ...props
}: Props) => <Component className={styles.hidden} {...props} />;
