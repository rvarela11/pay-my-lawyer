import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Link, Typography } from '@mui/material';
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
            <Typography
              className={styles.heroTitle}
              id='hero-title'
              variant='h1'
            >
              Legal fees, paid without the chase.
            </Typography>
            <Typography className={styles.heroText} component='p' variant='h4'>
              Payment processing, invoicing and client records for law firms, in
              one place.
            </Typography>
            <div className={styles.heroActions}>
              <Button
                component={RouterLink}
                size='large'
                to={PATHS.createAccount}
                variant='contained'
              >
                Create account
              </Button>
              <Link href='#how-it-works' underline='always' variant='subtitle1'>
                See how it works
              </Link>
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

      <Section
        aria-labelledby='demo-title'
        className={styles.dark}
        id='how-it-works'
      >
        <Container className={styles.stack}>
          <SectionLabel id='demo-title'>See it work</SectionLabel>
          <div className={styles.demoSplit}>
            <div className={styles.demoCopy}>
              <Typography component='p' variant='h2'>
                Your client pays. You see it.
              </Typography>
              <Typography className={styles.darkText} variant='subtitle1'>
                Clients pay from their phone by card, bank transfer or check.
                The payment shows up on your dashboard the moment it clears.
              </Typography>
            </div>
            <PaymentDemo />
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
