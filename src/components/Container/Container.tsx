import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Container.module.css';

type Props = ComponentPropsWithoutRef<'div'> & {
  size?: 'large' | 'medium' | 'narrow' | 'wide';
};

export const Container = ({ className, size = 'wide', ...props }: Props) => (
  <div
    className={classNames(styles.container, styles[size], className)}
    {...props}
  />
);
