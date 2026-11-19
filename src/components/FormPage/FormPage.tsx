import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Container } from '../Container/Container.tsx';
import styles from './FormPage.module.css';
import { Section } from '../Section/Section.tsx';

type Props = {
  alert?: ReactNode;
  children: ReactNode;
  subtitle: ReactNode;
  title: string;
  titleId: string;
};

// The narrow page around Sign in and Create account: heading, a line under it, an optional alert, then the form.
export const FormPage = ({
  alert,
  children,
  subtitle,
  title,
  titleId,
}: Props) => (
  <Section aria-labelledby={titleId} spacing='form'>
    <Container size='narrow'>
      <Stack spacing={1} useFlexGap>
        <Typography component='h1' id={titleId} variant='h4'>
          {title}
        </Typography>
        <Typography component='p'>{subtitle}</Typography>
      </Stack>
      <Stack className={styles.body} spacing={3} useFlexGap>
        {alert}
        {children}
      </Stack>
    </Container>
  </Section>
);
