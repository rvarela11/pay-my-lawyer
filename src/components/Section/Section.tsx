import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Section.module.css';

type Props = ComponentPropsWithoutRef<'section'> & {
  component?: 'footer' | 'section';
  spacing?: 'default' | 'form';
};

export const Section = ({
  className,
  component: Component = 'section',
  spacing = 'default',
  ...props
}: Props) => (
  <Component
    className={classNames(
      styles.section,
      { [styles.form]: spacing === 'form' },
      className,
    )}
    {...props}
  />
);
