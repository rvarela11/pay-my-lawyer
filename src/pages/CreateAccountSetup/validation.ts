import { type InferType, object, string } from 'yup';
import { FIELDS } from './fields.ts';
import { PROVIDER_IDS } from './ids.ts';
import { DWOLLA_FIELDS_SCHEMA } from './screens/providers/dwolla/validation.ts';
import { USIO_FIELDS_SCHEMA } from './screens/providers/usio/validation.ts';

const PROVIDER_REQUIRED_MESSAGE = 'Choose how you want to get paid';

// The wizard's one form: the provider choice plus each provider's own field set.
export const setupSchema = object({
  ...DWOLLA_FIELDS_SCHEMA,
  ...USIO_FIELDS_SCHEMA,
  [FIELDS.provider]: string()
    .default('')
    .required(PROVIDER_REQUIRED_MESSAGE)
    // '' is the unchosen default; required() still rejects it.
    .oneOf(['', ...Object.values(PROVIDER_IDS)], PROVIDER_REQUIRED_MESSAGE),
});

export type SetupValues = InferType<typeof setupSchema>;
