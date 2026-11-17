export const FIELDS = {
  legalBusinessName: 'legalBusinessName',
  provider: 'provider',
} as const;

export type FieldName = (typeof FIELDS)[keyof typeof FIELDS];
