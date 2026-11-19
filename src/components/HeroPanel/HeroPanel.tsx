import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import { Container } from '../Container/Container.tsx';
import styles from './HeroPanel.module.css';
import { Section } from '../Section/Section.tsx';

type Props = ComponentPropsWithoutRef<'section'> & {
  fullHeight?: boolean;
  panelClassName?: string;
};

export const HeroPanel = ({
  children,
  className,
  fullHeight = false,
  panelClassName,
  ...props
}: Props) => (
  <Section className={classNames(styles.hero, className)} {...props}>
    <Container>
      <div
        className={classNames(
          styles.panel,
          { [styles.fullHeight]: fullHeight },
          panelClassName,
        )}
      >
        {children}
      </div>
    </Container>
  </Section>
);
