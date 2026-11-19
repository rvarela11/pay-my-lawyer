import NorthEastIcon from '@mui/icons-material/NorthEast';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PATHS } from '../../../routes/paths.ts';
import { PRODUCTS } from '../products.ts';
import styles from './ProductList.module.css';

// Each row fills with its own accent on hover, in this order.
const ACCENTS = ['orange', 'pink', 'green', 'blue', 'yellow'] as const;

export const ProductList = () => (
  <ol className={styles.list} role='list'>
    {PRODUCTS.map(({ description, id, name }, index) => (
      <li key={id}>
        <Link
          className={styles.row}
          component={RouterLink}
          data-accent={ACCENTS[index % ACCENTS.length]}
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
          <span className={styles.text}>
            <Typography component='h3' variant='h3'>
              {name}
            </Typography>
            <Typography className={styles.description} component='span'>
              {description}
            </Typography>
          </span>
          <span aria-hidden className={styles.arrow}>
            <NorthEastIcon fontSize='small' />
          </span>
        </Link>
      </li>
    ))}
  </ol>
);
