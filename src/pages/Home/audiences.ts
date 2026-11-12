import { paths } from '../../routes/paths.ts';

export const audiences = [
  {
    detail: 'Browse attorneys',
    title: 'Find a lawyer',
    to: paths.findLawyer,
  },
  {
    detail: 'Accept payments',
    title: 'Legal professional',
    to: paths.createAccount,
  },
];
