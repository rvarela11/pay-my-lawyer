import { PATHS } from '../../routes/paths.ts';

export const FOOTER_LINKS = [
  {
    heading: 'Products',
    links: [
      {
        label: 'Payment processing',
        to: `${PATHS.products}#payment-processing`,
      },
      {
        label: 'Billing and invoicing',
        to: `${PATHS.products}#billing-invoicing`,
      },
      { label: 'Client records', to: `${PATHS.products}#client-records` },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', to: PATHS.aboutUs },
      { label: 'Contact us', to: PATHS.contactUs },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign in', to: PATHS.signIn },
      { label: 'Create account', to: PATHS.createAccount },
    ],
  },
];
