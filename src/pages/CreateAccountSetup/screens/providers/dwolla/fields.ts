// Dwolla's own field names. The prefix keeps them apart from Usio's in the shared form.
export const DWOLLA_FIELDS = {
  dwollaLegalBusinessName: 'dwollaLegalBusinessName',
} as const;

// Each screen's fields in on-screen order: Next checks them and focuses the first invalid one.
// About you has none until #55.
export const DWOLLA_ABOUT_FIELDS = [] as const;

export const DWOLLA_BUSINESS_FIELDS = [
  DWOLLA_FIELDS.dwollaLegalBusinessName,
] as const;
