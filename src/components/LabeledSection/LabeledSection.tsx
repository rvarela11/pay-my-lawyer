import { Stack } from '@mui/material';
import type { ReactNode } from 'react';
import { Container } from '../Container/Container.tsx';
import { Section } from '../Section/Section.tsx';
import { SectionLabel } from '../SectionLabel/SectionLabel.tsx';

type Props = {
  children: ReactNode;
  id: string;
  label: string;
};

// A page section that opens with a SectionLabel, then its content after a wide gap.
export const LabeledSection = ({ children, id, label }: Props) => (
  <Section aria-labelledby={id}>
    <Container>
      <Stack spacing='clamp(48px, 7.8vw, 112px)' useFlexGap>
        <SectionLabel id={id}>{label}</SectionLabel>
        {children}
      </Stack>
    </Container>
  </Section>
);
