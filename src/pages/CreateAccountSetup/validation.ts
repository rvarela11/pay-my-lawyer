import { type InferType, object, string } from 'yup';
import { FIELDS } from './fields.ts';
import { PROVIDERS } from './steps.ts';

const PROVIDER_REQUIRED_MESSAGE = 'Choose how you want to get paid';

export const setupSchema = object({
  [FIELDS.legalBusinessName]: string()
    .trim()
    .default('')
    .required('Legal business name is required'),
  [FIELDS.provider]: string()
    .default('')
    .required(PROVIDER_REQUIRED_MESSAGE)
    // '' is the unchosen default; required() still rejects it.
    .oneOf(['', ...PROVIDERS], PROVIDER_REQUIRED_MESSAGE),
});

export type SetupValues = InferType<typeof setupSchema>;
