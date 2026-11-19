import { type InferType, object } from 'yup';
import { OWNERS_RULE } from '../../../components/OwnerDialog/validation.ts';
import {
  BAR_NUMBER_RULE,
  BUSINESS_ADDRESS_RULE,
  BUSINESS_TYPE_RULE,
  CITY_RULE,
  DATE_OF_BIRTH_RULE,
  EIN_RULE,
  EMAIL_RULE,
  FIRST_NAME_RULE,
  HOME_ADDRESS_RULE,
  JOB_TITLE_RULE,
  LAST_NAME_RULE,
  LEGAL_BUSINESS_NAME_RULE,
  OPTIONAL_TEXT_RULE,
  OWNERSHIP_RULE,
  PHONE_RULE,
  SSN_RULE,
  STATE_RULE,
  WEBSITE_RULE,
  ZIP_RULE,
} from '../rules.ts';
import { USIO_FIELDS } from './fields.ts';

export const usioSchema = object({
  [USIO_FIELDS.address1]: BUSINESS_ADDRESS_RULE,
  [USIO_FIELDS.address2]: OPTIONAL_TEXT_RULE,
  [USIO_FIELDS.barNumber]: BAR_NUMBER_RULE,
  [USIO_FIELDS.businessType]: BUSINESS_TYPE_RULE,
  [USIO_FIELDS.city]: CITY_RULE,
  [USIO_FIELDS.dateOfBirth]: DATE_OF_BIRTH_RULE,
  [USIO_FIELDS.dba]: OPTIONAL_TEXT_RULE,
  [USIO_FIELDS.ein]: EIN_RULE,
  [USIO_FIELDS.email]: EMAIL_RULE,
  [USIO_FIELDS.firstName]: FIRST_NAME_RULE,
  [USIO_FIELDS.homeAddress1]: HOME_ADDRESS_RULE,
  [USIO_FIELDS.homeAddress2]: OPTIONAL_TEXT_RULE,
  [USIO_FIELDS.homeCity]: CITY_RULE,
  [USIO_FIELDS.homeState]: STATE_RULE,
  [USIO_FIELDS.homeZip]: ZIP_RULE,
  [USIO_FIELDS.jobTitle]: JOB_TITLE_RULE,
  [USIO_FIELDS.lastName]: LAST_NAME_RULE,
  [USIO_FIELDS.legalBusinessName]: LEGAL_BUSINESS_NAME_RULE,
  [USIO_FIELDS.owners]: OWNERS_RULE,
  [USIO_FIELDS.ownership]: OWNERSHIP_RULE,
  [USIO_FIELDS.phone]: PHONE_RULE,
  [USIO_FIELDS.ssn]: SSN_RULE,
  [USIO_FIELDS.state]: STATE_RULE,
  [USIO_FIELDS.website]: WEBSITE_RULE,
  [USIO_FIELDS.zip]: ZIP_RULE,
});

export type UsioValues = InferType<typeof usioSchema>;
