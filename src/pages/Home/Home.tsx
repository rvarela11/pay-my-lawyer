import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Container } from '../../components/Container/Container.tsx';
import { Rule } from '../../components/Rule/Rule.tsx';
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

      <Section aria-labelledby='cta-title' className={styles.cta}>
        <Container>
          <Rule />
          <div className={styles.ctaInner}>
            <div>
              <Typography id='cta-title' variant='h2'>
                Start accepting payments from your clients.
              </Typography>
              <Typography className={styles.ctaText} variant='body2'>
                Services are only offered to licensed attorneys within the
                United States.
              </Typography>
            </div>
            <Button
              color='secondary'
              component={RouterLink}
              size='large'
              startIcon={<ArrowForwardIcon />}
              to={PATHS.createAccount}
              variant='contained'
            >
              Create account
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};
