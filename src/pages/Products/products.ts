import type { ProductAccent } from '@/theme/palette.ts';

export type Product = {
  accent: ProductAccent;
  description: string;
  details: string;
  group: ProductGroupId;
  id: string;
  name: string;
};

export const PRODUCT_GROUPS = [
  {
    id: 'get-paid',
    name: 'Get paid',
    statement: 'Bill clients and collect what you’re owed.',
  },
  {
    id: 'run-your-practice',
    name: 'Run your practice',
    statement: 'Stay on top of clients and appointments.',
  },
  {
    id: 'grow-your-practice',
    name: 'Grow your practice',
    statement: 'Send work out, get work back.',
  },
] as const;
type ProductGroupId = (typeof PRODUCT_GROUPS)[number]['id'];

export const PRODUCTS: Product[] = [
  {
    accent: 'orange',
    description: 'Accept cash, card, check or digital transfers in one app.',
    details:
      'Log every payment a client makes in one record, however they pay.',
    group: 'get-paid',
    id: 'payment-processing',
    name: 'Payment processing',
  },
  {
    accent: 'pink',
    description: 'Send invoices to clients and track what has been paid.',
    details:
      'Create an invoice, email it to your client and follow up on anything still owed.',
    group: 'get-paid',
    id: 'billing-invoicing',
    name: 'Billing and invoicing',
  },
  {
    accent: 'green',
    description: 'Keep client details and payment history in one place.',
    details:
      'Pull up how to reach a client and what they’ve paid before you call or meet them.',
    group: 'run-your-practice',
    id: 'client-records',
    name: 'Client records',
  },
  {
    accent: 'blue',
    description: 'Schedule meetings and court dates, and charge for paid ones.',
    details:
      'Keep client meetings and court dates on one calendar, and invoice the appointments that need payment.',
    group: 'run-your-practice',
    id: 'appointment-calendar',
    name: 'Appointment calendar',
  },
  {
    accent: 'yellow',
    description: 'Refer cases to trusted attorneys and receive referrals back.',
    details:
      'Send cases you can’t take to attorneys in the Pay My Lawyer network, so your clients still get the right lawyer.',
    group: 'grow-your-practice',
    id: 'referral-network',
    name: 'Referral network',
  },
];
