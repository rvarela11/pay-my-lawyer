import { yupResolver } from '@hookform/resolvers/yup';
import {
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';
import {
  PROVIDER_IDS,
  type Provider,
  SCREEN_IDS,
  type ScreenId,
} from '../ids.ts';
import {
  type FormProviderId,
  hasProviderForm,
  PROVIDER_SCHEMAS,
} from '../screens/providers/schemas.ts';
import { type ProviderValues, providerSchema } from '../validation.ts';

const FORM_OPTIONS = { mode: 'onTouched', reValidateMode: 'onChange' } as const;

const formOptions = <Values extends FieldValues>(
  schema: AnyObjectSchema,
): UseFormProps<Values> => ({
  ...FORM_OPTIONS,
  defaultValues: schema.getDefault(),
  resolver: yupResolver(schema),
});

// One form for the provider choice and one per provider, so providers never share a field.
// They live in the layout, so each provider's answers survive switching back and forth.
// React's rules of hooks need one useForm call per provider; everything else is a lookup.
export const useSetupForms = () => {
  const providerForm = useForm<ProviderValues>(
    formOptions<ProviderValues>(providerSchema),
  );
  const providerForms: Record<FormProviderId, UseFormReturn<FieldValues>> = {
    [PROVIDER_IDS.dwolla]: useForm(formOptions(PROVIDER_SCHEMAS.dwolla)),
    [PROVIDER_IDS.usio]: useForm(formOptions(PROVIDER_SCHEMAS.usio)),
  };

  // The provider screen uses the choice form; later screens use the chosen provider's form.
  const getForm = (
    screen: ScreenId | null,
    provider: Provider | null,
  ): UseFormReturn<FieldValues> =>
    screen !== SCREEN_IDS.provider && hasProviderForm(provider)
      ? providerForms[provider]
      : (providerForm as unknown as UseFormReturn<FieldValues>);

  // Whether the provider's own form has anything typed in it, compared with its empty defaults.
  const hasAnswers = (provider: Provider | null) => {
    if (!hasProviderForm(provider)) {
      return false;
    }

    const defaults: FieldValues = PROVIDER_SCHEMAS[provider].getDefault();

    return Object.entries(providerForms[provider].getValues()).some(
      ([name, value]) => value !== defaults[name],
    );
  };

  const resetAll = () => {
    providerForm.reset(providerSchema.getDefault());
    (Object.keys(providerForms) as FormProviderId[]).forEach((id) => {
      providerForms[id].reset(PROVIDER_SCHEMAS[id].getDefault());
    });
  };

  return { getForm, hasAnswers, providerForm, resetAll };
};
