// Names other code refers to: HTML element ids, screen ids and payment provider ids.

export const PROVIDER_IDS = {
  dwolla: 'dwolla',
  later: 'later',
  usio: 'usio',
} as const;

export type Provider = (typeof PROVIDER_IDS)[keyof typeof PROVIDER_IDS];

export const SCREEN_IDS = {
  agreement: 'agreement',
  bankAccount: 'bankAccount',
  dwollaAbout: 'dwollaAbout',
  dwollaBusiness: 'dwollaBusiness',
  dwollaOwners: 'dwollaOwners',
  ids: 'ids',
  portal: 'portal',
  provider: 'provider',
  review: 'review',
  usioAbout: 'usioAbout',
  usioBusiness: 'usioBusiness',
  usioOwners: 'usioOwners',
} as const;

export type ScreenId = (typeof SCREEN_IDS)[keyof typeof SCREEN_IDS];

export const TITLE_ID = 'create-account-setup-title';
