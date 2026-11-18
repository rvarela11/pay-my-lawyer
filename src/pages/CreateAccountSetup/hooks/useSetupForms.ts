import { yupResolver } from '@hookform/resolvers/yup';
import { type FieldValues, useForm, type UseFormReturn } from 'react-hook-form';
import {
  PROVIDER_IDS,
  type Provider,
  SCREEN_IDS,
  type ScreenId,
} from '../ids.ts';
import {
  type DwollaValues,
  dwollaSchema,
} from '../screens/providers/dwolla/validation.ts';
import {
  type UsioValues,
  usioSchema,
} from '../screens/providers/usio/validation.ts';
import { type ProviderValues, providerSchema } from '../validation.ts';

const FORM_OPTIONS = { mode: 'onTouched', reValidateMode: 'onChange' } as const;

// One form for the provider choice and one per provider, so providers never share a field.
// They live in the layout, so each provider's answers survive switching back and forth.
export const useSetupForms = () => {
  const providerForm = useForm<ProviderValues>({
    ...FORM_OPTIONS,
    defaultValues: providerSchema.getDefault(),
    resolver: yupResolver(providerSchema),
  });
  const usioForm = useForm<UsioValues>({
    ...FORM_OPTIONS,
    defaultValues: usioSchema.getDefault(),
    resolver: yupResolver(usioSchema),
  });
  const dwollaForm = useForm<DwollaValues>({
    ...FORM_OPTIONS,
    defaultValues: dwollaSchema.getDefault(),
    resolver: yupResolver(dwollaSchema),
  });

  // The provider screen uses the choice form; later screens use the chosen provider's form.
  // "Set up payments later" has no provider form, and its only screen (Portal) has no fields.
  const getForm = (
    screen: ScreenId | null,
    provider: Provider | null,
  ): UseFormReturn<FieldValues> => {
    if (screen !== SCREEN_IDS.provider && provider === PROVIDER_IDS.usio) {
      return usioForm as unknown as UseFormReturn<FieldValues>;
    }

    if (screen !== SCREEN_IDS.provider && provider === PROVIDER_IDS.dwolla) {
      return dwollaForm as unknown as UseFormReturn<FieldValues>;
    }

    return providerForm as unknown as UseFormReturn<FieldValues>;
  };

  // Whether the provider's own form has anything typed in it, compared with its empty defaults.
  // "Set up payments later" has no form, so there's nothing to lose.
  const hasAnswers = (provider: Provider | null) => {
    const [values, defaults]: [FieldValues, FieldValues] =
      provider === PROVIDER_IDS.usio
        ? [usioForm.getValues(), usioSchema.getDefault()]
        : provider === PROVIDER_IDS.dwolla
          ? [dwollaForm.getValues(), dwollaSchema.getDefault()]
          : [{}, {}];

    return Object.entries(values).some(
      ([name, value]) => value !== defaults[name],
    );
  };

  const resetAll = () => {
    providerForm.reset(providerSchema.getDefault());
    usioForm.reset(usioSchema.getDefault());
    dwollaForm.reset(dwollaSchema.getDefault());
  };

  return { getForm, hasAnswers, providerForm, resetAll };
};
