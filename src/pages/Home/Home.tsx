import { Button, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { HeroPanel } from '@/components/HeroPanel/HeroPanel.tsx';
import { LabeledSection } from '@/components/LabeledSection/LabeledSection.tsx';
import { PATHS } from '@/routes/paths.ts';
import styles from './Home.module.css';
import { PaymentDemo } from './PaymentDemo/PaymentDemo.tsx';
import { ProductList } from './ProductList/ProductList.tsx';

export const Home = () => {
  return (
    <>
      <HeroPanel aria-labelledby='hero-title' fullHeight>
        <Grid className={styles.hero} container spacing={{ lg: 6, xs: 5 }}>
          <Grid size={{ lg: 'grow', xs: 12 }}>
            <Stack className={styles.heroCopy} spacing={3} useFlexGap>
              <Typography
                className={styles.heroTitle}
                id='hero-title'
                variant='h1'
              >
                Legal fees, paid without the chase.
              </Typography>
              <Typography
                className={styles.heroText}
                component='p'
                variant='h4'
              >
                Payment processing, invoicing and client records for law firms,
                in one place.
              </Typography>
              <Button
                className={styles.heroAction}
                component={RouterLink}
                size='large'
                to={PATHS.createAccount}
                variant='contained'
              >
                Create account
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ lg: 'auto', xs: 12 }}>
            <PaymentDemo />
          </Grid>
        </Grid>
      </HeroPanel>

      <LabeledSection id='products-title' label='What we offer'>
        <Grid container spacing={5}>
          <Grid size={{ md: 4, xs: 12 }}>
            <Typography
              className={styles.splitTitle}
              component='p'
              variant='h2'
            >
              Everything a firm needs to get paid.
            </Typography>
          </Grid>
          <Grid size={{ md: 8, xs: 12 }}>
            <ProductList />
          </Grid>
        </Grid>
      </LabeledSection>
    </>
  );
};
