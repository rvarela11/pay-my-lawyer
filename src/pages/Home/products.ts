import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InventoryIcon from '@mui/icons-material/Inventory';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const products = [
  {
    description: 'Accept cash, card, check, or digital transfers in one app.',
    icon: PaymentsIcon,
    id: 'payment-processing',
    name: 'Payment processing',
  },
  {
    description: 'Send invoices to clients and track what has been paid.',
    icon: ReceiptIcon,
    id: 'billing-invoicing',
    name: 'Billing and invoicing',
  },
  {
    description: 'Keep client details and payment history in one place.',
    icon: InventoryIcon,
    id: 'client-inventory',
    name: 'Client inventory',
  },
  {
    description: 'Schedule meetings and court dates, and charge for paid ones.',
    icon: CalendarMonthIcon,
    id: 'appointment-calendar',
    name: 'Appointment calendar',
  },
  {
    description: 'Opt in to be found by potential clients.',
    icon: ManageSearchIcon,
    id: 'attorney-directory',
    name: 'Attorney directory',
  },
  {
    description: 'Refer cases to trusted attorneys and receive referrals back.',
    icon: PeopleIcon,
    id: 'referral-network',
    name: 'Referral network',
  },
];
