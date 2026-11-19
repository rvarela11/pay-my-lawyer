import type { ReactNode } from 'react';
import styles from './FormGrid.module.css';

type Props = { children: ReactNode };

// The form layout for the provider screens: one column on phones, two from 600px.
export const FormGrid = ({ children }: Props) => (
  <div className={styles.grid}>{children}</div>
);

// A field that takes the full width of the grid, like an address.
export const FormGridFullRow = ({ children }: Props) => (
  <div className={styles.fullRow}>{children}</div>
);
