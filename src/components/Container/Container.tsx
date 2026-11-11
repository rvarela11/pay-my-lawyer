import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Container.module.css';

export const Container = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={classNames(styles.container, className)} {...props} />
);
