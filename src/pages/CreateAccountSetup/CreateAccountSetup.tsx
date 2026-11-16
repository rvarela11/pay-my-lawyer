import { Typography } from '@mui/material';
import { Container } from '../../components/Container/Container.tsx';
import { Section } from '../../components/Section/Section.tsx';

export const CreateAccountSetup = () => {
  return (
    <Section aria-labelledby='create-account-setup-title'>
      <Container>
        <Typography component='h1' id='create-account-setup-title' variant='h4'>
          Account setup
        </Typography>
        <Typography component='p'>Account setup is coming next.</Typography>
      </Container>
    </Section>
  );
};
