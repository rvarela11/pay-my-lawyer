import { PROVIDER_IDS, type Provider } from '@/pages/CreateAccountSetup/ids.ts';
import { dwollaSchema } from './dwolla/validation.ts';
import { usioSchema } from './usio/validation.ts';

// Every provider with its own form. A new provider needs an entry here and its useForm line
// in hooks/useSetupForms.ts; TypeScript fails the build if the two don't match.
export const PROVIDER_SCHEMAS = {
  [PROVIDER_IDS.dwolla]: dwollaSchema,
  [PROVIDER_IDS.usio]: usioSchema,
} as const;

export type FormProviderId = keyof typeof PROVIDER_SCHEMAS;

// "Set up payments later" has no form.
export const hasProviderForm = (
  provider: Provider | null,
): provider is FormProviderId =>
  provider !== null && provider in PROVIDER_SCHEMAS;
