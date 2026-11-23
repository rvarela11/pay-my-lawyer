import { PageHero } from '@/components/PageHero/PageHero.tsx';
import { useScrollToHash } from './hooks/useScrollToHash.ts';
import { ProductGroup } from './ProductGroup/ProductGroup.tsx';
import { PRODUCT_GROUPS, PRODUCTS } from './products.ts';

export const Products = () => {
  useScrollToHash();

  return (
    <>
      <PageHero
        label='What we offer'
        statement='Everything a firm needs to get paid, run the practice and grow it.'
        title='Products'
      />

      {PRODUCT_GROUPS.map(({ id, name, statement }) => (
        <ProductGroup
          key={id}
          id={id}
          name={name}
          products={PRODUCTS.filter(({ group }) => group === id)}
          statement={statement}
        />
      ))}
    </>
  );
};
