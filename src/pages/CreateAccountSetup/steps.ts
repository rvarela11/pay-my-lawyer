import { PATHS } from '../../routes/paths.ts';
import { FIELDS, type FieldName } from './fields.ts';

export const PROVIDERS = ['usio', 'dwolla', 'later'] as const;

export type Provider = (typeof PROVIDERS)[number];

export type ScreenId =
  | 'agreement'
  | 'bankAccount'
  | 'business'
  | 'controller'
  | 'ids'
  | 'owners'
  | 'portal'
  | 'provider'
  | 'review';

export type Stage = { label: string; screens: readonly ScreenId[] };

type Screen = { fields: readonly FieldName[]; path: string; title: string };

// Every screen, by id. Order and grouping come from STAGES, never from numbers.
export const SCREENS: Record<ScreenId, Screen> = {
  agreement: { fields: [], path: PATHS.setupAgreement, title: 'Agreement' },
  bankAccount: {
    fields: [],
    path: PATHS.setupBankAccount,
    title: 'Bank account',
  },
  business: {
    fields: [FIELDS.legalBusinessName],
    path: PATHS.setupBusiness,
    title: 'Business details',
  },
  controller: {
    fields: [],
    path: PATHS.setupController,
    title: 'Business controller',
  },
  ids: { fields: [], path: PATHS.setupIds, title: 'ID documents' },
  owners: { fields: [], path: PATHS.setupOwners, title: 'Beneficial owners' },
  portal: { fields: [], path: PATHS.setupPortal, title: 'Portal' },
  provider: {
    fields: [FIELDS.provider],
    path: PATHS.setupProvider,
    title: 'How would you like to get paid?',
  },
  review: { fields: [], path: PATHS.setupReview, title: 'Review & submit' },
};

// The stages each path shows in the step indicator. "later" has no indicator.
export const STAGES: Record<Provider, readonly Stage[]> = {
  dwolla: [
    { label: 'Business details', screens: ['business', 'controller'] },
    { label: 'Ownership & ID', screens: ['owners', 'ids'] },
    { label: 'Review & submit', screens: ['review'] },
    { label: 'Bank account', screens: ['bankAccount'] },
    { label: 'Portal', screens: ['portal'] },
  ],
  later: [],
  usio: [
    { label: 'Business details', screens: ['business'] },
    { label: 'Review & submit', screens: ['review'] },
    { label: 'Agreement', screens: ['agreement'] },
    { label: 'Portal', screens: ['portal'] },
  ],
};

export const isProvider = (value: unknown): value is Provider =>
  PROVIDERS.includes(value as Provider);

export const isScreenId = (value: unknown): value is ScreenId =>
  typeof value === 'string' && Object.hasOwn(SCREENS, value);

// The screens after the provider choice, in order.
export const getScreenOrder = (provider: Provider): ScreenId[] =>
  provider === 'later'
    ? ['portal']
    : STAGES[provider].flatMap((stage) => stage.screens);

export const getStagePosition = (
  provider: Provider | null,
  screen: ScreenId,
): { label: string; number: number; total: number } | null => {
  if (!provider) {
    return null;
  }

  const stages = STAGES[provider];
  const index = stages.findIndex((stage) => stage.screens.includes(screen));

  return index === -1
    ? null
    : { label: stages[index].label, number: index + 1, total: stages.length };
};

export const getScreenByPath = (pathname: string): ScreenId | null => {
  const match = Object.entries(SCREENS).find(
    ([, { path }]) => pathname === path || pathname === `${path}/`,
  );

  return match ? (match[0] as ScreenId) : null;
};
