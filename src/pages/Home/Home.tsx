import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Container } from '../../components/Container/Container.tsx';
import { paths } from '../../routes/paths.ts';
import { audiences } from './audiences.ts';
import styles from './Home.module.css';
import { products } from './products.ts';

export const Home = () => {
  return (
    <>
      <section aria-labelledby='hero-title' className={styles.hero}>
        <Container className={styles.heroInner}>
          <div>
            <Typography
              className={styles.heroTitle}
              id='hero-title'
              variant='h1'
            >
              Legal fees, paid without the chase.
            </Typography>
            <Typography className={styles.lede} variant='subtitle1'>
              Streamline your practice, connect with clients, and grow your
              network.
            </Typography>
          </div>

          <ul
            aria-label='Choose how you will use Pay My Lawyer'
            className={styles.audienceList}
          >
            {audiences.map(({ detail, title, to }) => (
              <li key={to}>
                <Card variant='outlined'>
                  <CardActionArea
                    className={styles.audienceAction}
                    component={RouterLink}
                    to={to}
                  >
                    <div className={styles.audienceTitle}>
                      <Typography component='h3' variant='h5'>
                        {title}
                      </Typography>
                    </div>
                    <CardContent className={styles.audienceDetail}>
                      <Typography>{detail}</Typography>
                      <ArrowForwardIcon
                        aria-hidden
                        className={styles.audienceArrow}
                        fontSize='small'
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={styles.products}>
        <Container className={styles.productsInner}>
          <ul className={styles.productList}>
            {products.map(({ description, icon: Icon, id, name }) => (
              <li className={styles.product} key={id}>
                <Typography
                  className={styles.productName}
                  component='h3'
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
              Your payment is just a click away.
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
