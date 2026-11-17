import { Navigate, type RouteObject } from 'react-router';
import { PATHS } from '../../routes/paths.ts';
import { CreateAccountSetup } from './CreateAccountSetup.tsx';
import { BusinessScreen } from './screens/BusinessScreen/BusinessScreen.tsx';
import { PlaceholderScreen } from './screens/PlaceholderScreen/PlaceholderScreen.tsx';
import { ProviderScreen } from './screens/ProviderScreen/ProviderScreen.tsx';
import { SCREENS } from './steps.ts';

const SCREEN_ELEMENTS = {
  business: <BusinessScreen />,
  provider: <ProviderScreen />,
};

// /create-account/setup is the entry point callers link to; it opens the provider choice.
export const CREATE_ACCOUNT_SETUP_ROUTE: RouteObject = {
  children: [
    { element: <Navigate replace to={PATHS.setupProvider} />, index: true },
    ...Object.entries(SCREENS).map(([id, { path }]) => ({
      element: SCREEN_ELEMENTS[id as keyof typeof SCREEN_ELEMENTS] ?? (
        <PlaceholderScreen />
      ),
      path,
    })),
  ],
  element: <CreateAccountSetup />,
  path: PATHS.createAccountSetup,
};
