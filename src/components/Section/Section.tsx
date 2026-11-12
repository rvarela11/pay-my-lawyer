import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Section.module.css';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  component?: 'footer' | 'section';
};

export const Section = ({
  className,
  component: Component = 'section',
  ...props
}: SectionProps) => (
  <Component className={classNames(styles.section, className)} {...props} />
);
