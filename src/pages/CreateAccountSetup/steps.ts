import { PATHS } from '../../routes/paths.ts';
import { FIELDS } from './fields.ts';
import {
  PROVIDER_IDS,
  type Provider,
  SCREEN_IDS,
  type ScreenId,
} from './ids.ts';
import {
  DWOLLA_ABOUT_FIELDS,
  DWOLLA_BUSINESS_FIELDS,
} from './screens/providers/dwolla/fields.ts';
import {
  USIO_ABOUT_FIELDS,
  USIO_BUSINESS_FIELDS,
} from './screens/providers/usio/fields.ts';

// fields: the names Next checks, in the form the screen belongs to.
type Screen = { fields: readonly string[]; path: string; title: string };

export type Stage = { label: string; screens: readonly ScreenId[] };

// Every screen, by id. Order and grouping come from STAGES, never from numbers.
export const SCREENS: Record<ScreenId, Screen> = {
  [SCREEN_IDS.agreement]: {
    fields: [],
    path: PATHS.setupAgreement,
    title: 'Agreement',
  },
  [SCREEN_IDS.bankAccount]: {
    fields: [],
    path: PATHS.setupBankAccount,
    title: 'Bank account',
  },
  [SCREEN_IDS.dwollaAbout]: {
    fields: DWOLLA_ABOUT_FIELDS,
    path: PATHS.setupDwollaAbout,
    title: 'About you',
  },
  [SCREEN_IDS.dwollaBusiness]: {
    fields: DWOLLA_BUSINESS_FIELDS,
    path: PATHS.setupDwollaBusiness,
    title: 'Business details',
  },
  [SCREEN_IDS.ids]: { fields: [], path: PATHS.setupIds, title: 'ID documents' },
  [SCREEN_IDS.owners]: {
    fields: [],
    path: PATHS.setupOwners,
    title: 'Beneficial owners',
  },
  [SCREEN_IDS.portal]: { fields: [], path: PATHS.setupPortal, title: 'Portal' },
  [SCREEN_IDS.provider]: {
    fields: [FIELDS.provider],
    path: PATHS.setupProvider,
    title: 'How would you like to get paid?',
  },
  [SCREEN_IDS.review]: {
    fields: [],
    path: PATHS.setupReview,
    title: 'Review & submit',
  },
  [SCREEN_IDS.usioAbout]: {
    fields: USIO_ABOUT_FIELDS,
    path: PATHS.setupUsioAbout,
    title: 'About you',
  },
  [SCREEN_IDS.usioBusiness]: {
    fields: USIO_BUSINESS_FIELDS,
    path: PATHS.setupUsioBusiness,
    title: 'Business details',
  },
};

// The stages each path shows in the step indicator. "later" has no indicator.
export const STAGES: Record<Provider, readonly Stage[]> = {
  [PROVIDER_IDS.dwolla]: [
    {
      label: 'Business details',
      screens: [SCREEN_IDS.dwollaBusiness, SCREEN_IDS.dwollaAbout],
    },
    { label: 'Ownership & ID', screens: [SCREEN_IDS.owners, SCREEN_IDS.ids] },
    { label: 'Review & submit', screens: [SCREEN_IDS.review] },
    { label: 'Bank account', screens: [SCREEN_IDS.bankAccount] },
    { label: 'Portal', screens: [SCREEN_IDS.portal] },
  ],
  [PROVIDER_IDS.later]: [],
  [PROVIDER_IDS.usio]: [
    {
      label: 'Business details',
      screens: [SCREEN_IDS.usioBusiness, SCREEN_IDS.usioAbout],
    },
    { label: 'Review & submit', screens: [SCREEN_IDS.review] },
    { label: 'Agreement', screens: [SCREEN_IDS.agreement] },
    { label: 'Portal', screens: [SCREEN_IDS.portal] },
  ],
};

export const getScreenByPath = (pathname: string): ScreenId | null => {
  const match = Object.entries(SCREENS).find(
    ([, { path }]) => pathname === path || pathname === `${path}/`,
  );

  return match ? (match[0] as ScreenId) : null;
};

// The screens after the provider choice, in order.
export const getScreenOrder = (provider: Provider): ScreenId[] =>
  provider === PROVIDER_IDS.later
    ? [SCREEN_IDS.portal]
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

export const isProvider = (value: unknown): value is Provider =>
  (Object.values(PROVIDER_IDS) as unknown[]).includes(value);

export const isScreenId = (value: unknown): value is ScreenId =>
  (Object.values(SCREEN_IDS) as unknown[]).includes(value);
