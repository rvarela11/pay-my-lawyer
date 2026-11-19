import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { PageHero } from '../components/PageHero/PageHero.tsx';
import { PATHS } from '../routes/paths.ts';

export const NotFound = () => {
  return (
    <PageHero
      label='Error 404'
      statement={
        <>
          This page doesn’t exist or has moved. Go to the{' '}
          <Link component={RouterLink} to={PATHS.home} underline='always'>
            home page
          </Link>
          .
        </>
      }
      title='Page not found'
    />
  );
};
