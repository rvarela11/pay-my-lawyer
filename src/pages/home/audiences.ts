import { paths } from '../../routes/paths.ts';

export const audiences = [
  {
    title: 'I need a lawyer',
    detail: 'See the attorney directory',
    to: paths.findLawyer,
  },
  {
    title: 'I’m a legal professional',
    detail: 'Start accepting payments',
    to: paths.createAccount,
  },
];
