import { type InferType, object, string } from 'yup';
import { FIELDS } from './fields.ts';
import { PROVIDER_IDS } from './ids.ts';

const PROVIDER_REQUIRED_MESSAGE = 'Choose how you want to get paid';

// The provider choice has its own small form; each provider's answers live in that provider's
// form (screens/providers/<provider>/validation.ts).
export const providerSchema = object({
  [FIELDS.provider]: string()
    .default('')
    .required(PROVIDER_REQUIRED_MESSAGE)
    // '' is the unchosen default; required() still rejects it.
    .oneOf(['', ...Object.values(PROVIDER_IDS)], PROVIDER_REQUIRED_MESSAGE),
});

export type ProviderValues = InferType<typeof providerSchema>;
