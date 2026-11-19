import { Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { HeroPanel } from '../HeroPanel/HeroPanel.tsx';
import { LabeledSection } from '../LabeledSection/LabeledSection.tsx';
import styles from './PageHero.module.css';

type Props = {
  label: string;
  statement: ReactNode;
  title: string;
};

export const PageHero = ({ label, statement, title }: Props) => (
  <>
    <HeroPanel aria-labelledby='page-title'>
      <Typography className={styles.title} id='page-title' variant='h1'>
        {title}
      </Typography>
    </HeroPanel>

    <LabeledSection id='page-label' label={label}>
      <Typography className={styles.statement} component='p' variant='h2'>
        {statement}
      </Typography>
    </LabeledSection>
  </>
);
