import { type InferType, object, string } from 'yup';
import { FIELDS } from './fields.ts';
import { PROVIDER_IDS } from './ids.ts';
import { DWOLLA_FIELD_RULES } from './screens/providers/dwolla/rules.ts';
import { USIO_FIELD_RULES } from './screens/providers/usio/rules.ts';

const PROVIDER_REQUIRED_MESSAGE = 'Choose how you want to get paid';

// The wizard's one form: the provider choice plus each provider's own field set.
export const setupSchema = object({
  ...DWOLLA_FIELD_RULES,
  ...USIO_FIELD_RULES,
  [FIELDS.provider]: string()
    .default('')
    .required(PROVIDER_REQUIRED_MESSAGE)
    // '' is the unchosen default; required() still rejects it.
    .oneOf(['', ...Object.values(PROVIDER_IDS)], PROVIDER_REQUIRED_MESSAGE),
});

export type SetupValues = InferType<typeof setupSchema>;
