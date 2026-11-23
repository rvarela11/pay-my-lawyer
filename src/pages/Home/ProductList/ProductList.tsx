import NorthEastIcon from '@mui/icons-material/NorthEast';
import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PRODUCTS } from '@/pages/Products/products.ts';
import { PATHS } from '@/routes/paths.ts';
import styles from './ProductList.module.css';

export const ProductList = () => (
  <ol className={styles.list} role='list'>
    {PRODUCTS.map(({ accent, description, id, name }, index) => (
      <li key={id}>
        <Link
          className={styles.row}
          component={RouterLink}
          data-accent={accent}
          to={`${PATHS.products}#${id}`}
          underline='none'
        >
          <Typography
            aria-hidden
            className={styles.number}
            component='span'
            variant='h6'
          >
            {String(index + 1).padStart(2, '0')}
          </Typography>
          <Grid className={styles.text} component='span' container spacing={1}>
            <Grid component='span' size={{ md: 6, xs: 12 }}>
              <Typography component='h3' variant='h3'>
                {name}
              </Typography>
            </Grid>
            <Grid component='span' size={{ md: 6, xs: 12 }}>
              <Typography className={styles.description} component='span'>
                {description}
              </Typography>
            </Grid>
          </Grid>
          <span aria-hidden className={styles.arrow}>
            <NorthEastIcon fontSize='small' />
          </span>
        </Link>
      </li>
    ))}
  </ol>
);
