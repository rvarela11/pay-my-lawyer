import { Grid, Stack, Typography } from '@mui/material';
import { Container } from '@/components/Container/Container.tsx';
import { Section } from '@/components/Section/Section.tsx';
import { SectionLabel } from '@/components/SectionLabel/SectionLabel.tsx';
import { type Product, PRODUCTS } from '../products.ts';
import styles from './ProductGroup.module.css';
import { ProductRow } from './ProductRow/ProductRow.tsx';

type Props = {
  id: string;
  name: string;
  products: Product[];
  statement: string;
};

// Laid out like the product list on Home: a statement on the left, ruled rows on the right.
// Groups sit close together, so each label stays nearer its own content than the group above (LabeledSection's gap is wider).
export const ProductGroup = ({ id, name, products, statement }: Props) => (
  <Section aria-labelledby={`${id}-title`} className={styles.group}>
    <Container>
      <Stack spacing={{ md: 6, xs: 5 }} useFlexGap>
        <SectionLabel id={`${id}-title`}>{name}</SectionLabel>
        <Grid container spacing={5}>
          <Grid size={{ md: 4, xs: 12 }}>
            <Typography className={styles.statement} component='p' variant='h2'>
              {statement}
            </Typography>
          </Grid>
          <Grid size={{ md: 8, xs: 12 }}>
            <ol role='list'>
              {products.map((product) => (
                <li key={product.id}>
                  <ProductRow
                    accent={product.accent}
                    description={product.description}
                    details={product.details}
                    id={product.id}
                    name={product.name}
                    number={PRODUCTS.indexOf(product) + 1}
                  />
                </li>
              ))}
            </ol>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  </Section>
);
