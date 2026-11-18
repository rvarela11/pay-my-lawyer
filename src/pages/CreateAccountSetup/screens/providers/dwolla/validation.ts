import { LEGAL_BUSINESS_NAME_RULE } from '../validation.ts';
import { DWOLLA_FIELDS } from './fields.ts';

export const DWOLLA_FIELDS_SCHEMA = {
  [DWOLLA_FIELDS.dwollaLegalBusinessName]: LEGAL_BUSINESS_NAME_RULE,
};
