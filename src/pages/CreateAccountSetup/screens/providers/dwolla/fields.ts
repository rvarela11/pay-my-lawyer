export const DWOLLA_FIELDS = {
  legalBusinessName: 'legalBusinessName',
} as const;

// Each screen's fields in on-screen order: Next checks them and focuses the first invalid one.
// About you has none until #55.
export const DWOLLA_ABOUT_FIELDS = [] as const;

export const DWOLLA_BUSINESS_FIELDS = [
  DWOLLA_FIELDS.legalBusinessName,
] as const;
