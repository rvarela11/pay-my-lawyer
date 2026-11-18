import { LEGAL_BUSINESS_NAME_RULE } from '../rules.ts';
import { DWOLLA_FIELDS } from './fields.ts';

export const DWOLLA_FIELD_RULES = {
  [DWOLLA_FIELDS.dwollaLegalBusinessName]: LEGAL_BUSINESS_NAME_RULE,
};
