import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Container } from '../../components/Container/Container.tsx';
import { Section } from '../../components/Section/Section.tsx';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.tsx';
import { PATHS } from '../../routes/paths.ts';
import styles from './Home.module.css';
import { PaymentDemo } from './PaymentDemo/PaymentDemo.tsx';
import { ProductList } from './ProductList/ProductList.tsx';

export const Home = () => {
  return (
    <>
      <Section aria-labelledby='hero-title' className={styles.hero}>
        <Container>
          <div className={styles.heroPanel}>
            <div className={styles.heroCopy}>
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
            </div>
            <div className={styles.heroDemo}>
              <PaymentDemo />
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='products-title'>
        <Container className={styles.stack}>
          <SectionLabel id='products-title'>What we offer</SectionLabel>
          <div className={styles.split}>
            <Typography
              className={styles.splitTitle}
              component='p'
              variant='h2'
            >
              Everything a firm needs to get paid.
            </Typography>
            <ProductList />
          </div>
        </Container>
      </Section>
    </>
  );
};
