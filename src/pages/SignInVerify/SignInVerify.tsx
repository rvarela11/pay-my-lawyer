import { Typography } from '@mui/material';
import { Container } from '../../components/Container/Container.tsx';
import { Section } from '../../components/Section/Section.tsx';

export const SignInVerify = () => {
  return (
    <Section aria-labelledby='sign-in-verify-title'>
      <Container>
        <Typography component='h1' id='sign-in-verify-title' variant='h4'>
          Verify your sign-in
        </Typography>
        <Typography component='p'>The verification step is coming next.</Typography>
      </Container>
    </Section>
  );
};
