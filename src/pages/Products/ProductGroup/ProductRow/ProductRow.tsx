import { Grid, Stack, Typography } from '@mui/material';
import type { Product } from '@/pages/Products/products.ts';
import styles from './ProductRow.module.css';

type Props = Pick<
  Product,
  'accent' | 'description' | 'details' | 'id' | 'name'
> & {
  // The product's number on Home, so each product keeps one number across the site.
  number: number;
};

export const ProductRow = ({
  accent,
  description,
  details,
  id,
  name,
  number,
}: Props) => (
  <Stack
    aria-labelledby={`${id}-name`}
    className={styles.row}
    component='article'
    data-accent={accent}
    direction='row'
    id={id}
    spacing={2}
    useFlexGap
  >
    <Typography
      aria-hidden
      className={styles.number}
      component='span'
      variant='h6'
    >
      {String(number).padStart(2, '0')}
    </Typography>
    <Grid className={styles.text} container spacing={{ md: 3, xs: 1.5 }}>
      <Grid size={{ md: 6, xs: 12 }}>
        <Typography component='h3' id={`${id}-name`} variant='h3'>
          {name}
        </Typography>
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <Stack spacing={1.5} useFlexGap>
          <Typography component='p' variant='h6'>
            {description}
          </Typography>
          <Typography>{details}</Typography>
        </Stack>
      </Grid>
    </Grid>
  </Stack>
);
