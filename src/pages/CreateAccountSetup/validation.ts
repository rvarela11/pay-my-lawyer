import dayjs, { type Dayjs } from 'dayjs';
import { type InferType, mixed, object, string } from 'yup';
import { BUSINESS_TYPES } from './components/BusinessTypeSelect/businessTypes.ts';
import { US_STATES } from './components/StateSelect/usStates.ts';
import { normalizeWebsite } from './components/WebsiteField/normalizeWebsite.ts';
import { FIELDS } from './fields.ts';
import { PROVIDER_IDS } from './ids.ts';

// Rules shared by both providers' field sets. Each starts empty, so nothing shows on load.
const BUSINESS_ADDRESS_RULE = string()
  .trim()
  .default('')
  .required('Enter the business address');

const BUSINESS_TYPE_RULE = string()
  .default('')
  .required('Choose a business type')
  .oneOf(['', ...BUSINESS_TYPES], 'Choose a business type');

const CITY_RULE = string().trim().default('').required('Enter a city');

// Checked in order: empty, then a real date, then 18 or older (a birthday today counts).
// An unfinished date reaches the form as null, like an empty one, so one message covers both.
const DATE_OF_BIRTH_RULE = mixed<Dayjs>()
  .nullable()
  .default(null)
  .test('required', 'Enter your full date of birth', (value) => value != null)
  .test('real', 'Enter a real date of birth', (value) => !!value?.isValid())
  .test(
    'adult',
    'You must be 18 or older',
    (value) => !value?.isAfter(dayjs().subtract(18, 'year'), 'day'),
  );

const EMAIL_RULE = string()
  .trim()
  .default('')
  .required('Enter an email address, like name@yourfirm.com')
  .email('Enter an email address, like name@yourfirm.com');

const EIN_RULE = string()
  .default('')
  .test('ein', 'Enter a 9-digit EIN', (value) => digitCount(value) === 9);

const FIRST_NAME_RULE = string()
  .trim()
  .default('')
  .required('Enter your first name');

const HOME_ADDRESS_RULE = string()
  .trim()
  .default('')
  .required('Enter your home address');

const JOB_TITLE_RULE = string()
  .trim()
  .default('')
  .required('Enter your job title');

const LAST_NAME_RULE = string()
  .trim()
  .default('')
  .required('Enter your last name');

const LEGAL_BUSINESS_NAME_RULE = string()
  .trim()
  .default('')
  .required('Enter your legal business name');

const OPTIONAL_TEXT_RULE = string().trim().default('');

const OWNERSHIP_RULE = string()
  .trim()
  .default('')
  .test(
    'ownership',
    'Enter a number from 25 to 100',
    (value) =>
      /^\d+$/.test(value ?? '') && Number(value) >= 25 && Number(value) <= 100,
  );

const PHONE_RULE = string()
  .default('')
  .test(
    'phone',
    'Enter a 10-digit phone number',
    (value) => digitCount(value) === 10,
  );

// Dashes and spaces are fine; the SSN needs exactly 9 digits.
const SSN_RULE = string()
  .default('')
  .test(
    'ssn',
    'Enter a 9-digit SSN',
    (value) => /^[\d\s-]+$/.test(value ?? '') && digitCount(value) === 9,
  );

const STATE_RULE = string()
  .default('')
  .required('Choose a state')
  .oneOf(['', ...US_STATES.map(({ code }) => code)], 'Choose a state');

const WEBSITE_RULE = string()
  .default('')
  .test(
    'website',
    'Enter a web address, like https://yourfirm.com',
    (value) =>
      !value?.trim() ||
      /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(normalizeWebsite(value)),
  );

const ZIP_RULE = string()
  .default('')
  .matches(/^\d{5}$/, 'Enter a 5-digit ZIP code');

const DWOLLA_FIELDS_SCHEMA = {
  [FIELDS.dwollaLegalBusinessName]: LEGAL_BUSINESS_NAME_RULE,
};

const PROVIDER_REQUIRED_MESSAGE = 'Choose how you want to get paid';

const USIO_FIELDS_SCHEMA = {
  [FIELDS.usioAddress1]: BUSINESS_ADDRESS_RULE,
  [FIELDS.usioAddress2]: OPTIONAL_TEXT_RULE,
  [FIELDS.usioBusinessType]: BUSINESS_TYPE_RULE,
  [FIELDS.usioCity]: CITY_RULE,
  [FIELDS.usioDateOfBirth]: DATE_OF_BIRTH_RULE,
  [FIELDS.usioDba]: OPTIONAL_TEXT_RULE,
  [FIELDS.usioEin]: EIN_RULE,
  [FIELDS.usioEmail]: EMAIL_RULE,
  [FIELDS.usioFirstName]: FIRST_NAME_RULE,
  [FIELDS.usioHomeAddress1]: HOME_ADDRESS_RULE,
  [FIELDS.usioHomeAddress2]: OPTIONAL_TEXT_RULE,
  [FIELDS.usioHomeCity]: CITY_RULE,
  [FIELDS.usioHomeState]: STATE_RULE,
  [FIELDS.usioHomeZip]: ZIP_RULE,
  [FIELDS.usioJobTitle]: JOB_TITLE_RULE,
  [FIELDS.usioLastName]: LAST_NAME_RULE,
  [FIELDS.usioLegalBusinessName]: LEGAL_BUSINESS_NAME_RULE,
  [FIELDS.usioOwnership]: OWNERSHIP_RULE,
  [FIELDS.usioPhone]: PHONE_RULE,
  [FIELDS.usioSsn]: SSN_RULE,
  [FIELDS.usioState]: STATE_RULE,
  [FIELDS.usioWebsite]: WEBSITE_RULE,
  [FIELDS.usioZip]: ZIP_RULE,
};

export const setupSchema = object({
  ...DWOLLA_FIELDS_SCHEMA,
  ...USIO_FIELDS_SCHEMA,
  [FIELDS.provider]: string()
    .default('')
    .required(PROVIDER_REQUIRED_MESSAGE)
    // '' is the unchosen default; required() still rejects it.
    .oneOf(['', ...Object.values(PROVIDER_IDS)], PROVIDER_REQUIRED_MESSAGE),
});

export type SetupValues = InferType<typeof setupSchema>;

// Called only while validating, after the module has loaded.
const digitCount = (value: string | undefined) =>
  (value ?? '').replace(/\D/g, '').length;
