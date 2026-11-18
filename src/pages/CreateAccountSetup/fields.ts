import { DWOLLA_FIELDS } from './screens/providers/dwolla/fields.ts';
import { USIO_FIELDS } from './screens/providers/usio/fields.ts';

// Every field in the wizard's one form: the provider choice plus each provider's own fields.
export const FIELDS = {
  ...DWOLLA_FIELDS,
  provider: 'provider',
  ...USIO_FIELDS,
} as const;

export type FieldName = (typeof FIELDS)[keyof typeof FIELDS];
