import { type InferType, object } from 'yup';
import { LEGAL_BUSINESS_NAME_RULE } from '../rules.ts';
import { DWOLLA_FIELDS } from './fields.ts';

export const dwollaSchema = object({
  [DWOLLA_FIELDS.legalBusinessName]: LEGAL_BUSINESS_NAME_RULE,
});

export type DwollaValues = InferType<typeof dwollaSchema>;
