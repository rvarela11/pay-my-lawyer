import { createBrowserRouter } from 'react-router';
import { App } from '../App.tsx';
import { About } from '../pages/About.tsx';
import { Contact } from '../pages/Contact.tsx';
import { CreateAccount } from '../pages/CreateAccount/CreateAccount.tsx';
import { CreateAccountSetup } from '../pages/CreateAccountSetup/CreateAccountSetup.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { Home } from '../pages/Home/Home.tsx';
import { NotFound } from '../pages/NotFound.tsx';
import { Products } from '../pages/Products.tsx';
import { PATHS } from './paths.ts';

export const router = createBrowserRouter(
  [
    {
      path: PATHS.home,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: PATHS.products, element: <Products /> },
        { path: PATHS.aboutUs, element: <About /> },
        { path: PATHS.contactUs, element: <Contact /> },
        { path: PATHS.createAccount, element: <CreateAccount /> },
        { path: PATHS.createAccountSetup, element: <CreateAccountSetup /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
