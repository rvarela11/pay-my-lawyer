import { Button, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Container } from '../../components/Container/Container.tsx';
import { paths } from '../../routes/paths.ts';
import styles from './Home.module.css';
import { PaymentDemo } from './PaymentDemo/PaymentDemo.tsx';
import { products } from './products.ts';

export const Home = () => {
  return (
    <>
      <section aria-labelledby='hero-title' className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Typography
              className={styles.heroTitle}
              component='h1'
              id='hero-title'
              variant='h2'
            >
              Legal fees, paid without the chase.
            </Typography>
            <Typography className={styles.lede} component='p' variant='h6'>
              Streamline your practice, connect with clients, and grow your
              network.
            </Typography>
            <div className={styles.heroActions}>
              <Button
                className={styles.heroButton}
                color='secondary'
                component={RouterLink}
                size='large'
                to={paths.createAccount}
                variant='contained'
              >
                Create account
              </Button>
              <Button
                className={styles.heroButtonQuiet}
                component={RouterLink}
                size='large'
                to={paths.products}
                variant='outlined'
              >
                See products
              </Button>
            </div>
          </div>

          <div className={styles.heroDemo}>
            <PaymentDemo />
          </div>
        </Container>
      </section>

      <section aria-label='Products' className={styles.products}>
        <Container>
          <ul className={styles.productList}>
            {products.map(({ description, icon: Icon, id, name }) => (
              <li className={styles.product} key={id}>
                <Typography
                  className={styles.productName}
                  component='h2'
                  variant='h5'
                >
                  <Icon aria-hidden fontSize='inherit' />
                  <Link component={RouterLink} to={`${paths.products}#${id}`}>
                    {name}
                  </Link>
                </Typography>
                <Typography>{description}</Typography>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby='cta-title' className={styles.cta}>
        <Container className={styles.ctaInner}>
          <div>
            <Typography id='cta-title' variant='h2'>
              Start accepting payments from your clients.
            </Typography>
            <Typography className={styles.ctaText}>
              Services are only offered to licensed attorneys within the United
              States.
            </Typography>
          </div>
          <Button
            className={styles.ctaButton}
            color='secondary'
            component={RouterLink}
            to={paths.createAccount}
            variant='contained'
          >
            Create account
          </Button>
        </Container>
      </section>
    </>
  );
};
