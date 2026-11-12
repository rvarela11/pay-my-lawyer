import BalanceIcon from '@mui/icons-material/Balance';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { paths } from '../../routes/paths.ts';

export const audiences = [
  {
    detail: 'Browse attorneys',
    icon: ManageSearchIcon,
    title: 'Find a lawyer',
    to: paths.findLawyer,
  },
  {
    detail: 'Accept payments',
    icon: BalanceIcon,
    title: 'Legal professional',
    to: paths.createAccount,
  },
];
