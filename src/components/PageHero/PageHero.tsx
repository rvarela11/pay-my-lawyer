import { Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Container } from '../Container/Container.tsx';
import styles from './PageHero.module.css';
import { Section } from '../Section/Section.tsx';
import { SectionLabel } from '../SectionLabel/SectionLabel.tsx';

type Props = {
  label: string;
  statement: ReactNode;
  title: string;
};

export const PageHero = ({ label, statement, title }: Props) => (
  <>
    <Section aria-labelledby='page-title' className={styles.hero}>
      <Container>
        <div className={styles.panel}>
          <Typography className={styles.title} id='page-title' variant='h1'>
            {title}
          </Typography>
        </div>
      </Container>
    </Section>

    <Section aria-labelledby='page-label'>
      <Container className={styles.intro}>
        <SectionLabel id='page-label'>{label}</SectionLabel>
        <Typography className={styles.statement} component='p' variant='h2'>
          {statement}
        </Typography>
      </Container>
    </Section>
  </>
);
