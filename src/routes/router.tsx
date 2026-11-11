import { createBrowserRouter } from 'react-router';
import { App } from '../App.tsx';
import { About } from '../pages/About.tsx';
import { Contact } from '../pages/Contact.tsx';
import { ErrorPage } from '../pages/ErrorPage.tsx';
import { Home } from '../pages/Home/Home.tsx';
import { NotFound } from '../pages/NotFound.tsx';
import { Products } from '../pages/Products.tsx';
import { paths } from './paths.ts';

export const router = createBrowserRouter(
  [
    {
      path: paths.home,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: paths.products, element: <Products /> },
        { path: paths.aboutUs, element: <About /> },
        { path: paths.contactUs, element: <Contact /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
