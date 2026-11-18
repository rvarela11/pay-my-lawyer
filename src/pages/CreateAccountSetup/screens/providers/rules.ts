import dayjs, { type Dayjs } from 'dayjs';
import { mixed, string } from 'yup';
import { BUSINESS_TYPES } from '../../components/BusinessTypeSelect/businessTypes.ts';
import { US_STATES } from '../../components/StateSelect/usStates.ts';
import { normalizeWebsite } from '../../components/WebsiteField/normalizeWebsite.ts';

// Rules shared by every provider's field set. Each starts empty, so nothing shows on load.
export const BUSINESS_ADDRESS_RULE = string()
  .trim()
  .default('')
  .required('Enter the business address');

export const BUSINESS_TYPE_RULE = string()
  .default('')
  .required('Choose a business type')
  .oneOf(['', ...BUSINESS_TYPES], 'Choose a business type');

export const CITY_RULE = string().trim().default('').required('Enter a city');

// Checked in order: empty, then a real date, then 18 or older (a birthday today counts).
// An unfinished date reaches the form as null, like an empty one, so one message covers both.
export const DATE_OF_BIRTH_RULE = mixed<Dayjs>()
  .nullable()
  .default(null)
  .test('required', 'Enter your full date of birth', (value) => value != null)
  .test('real', 'Enter a real date of birth', (value) => !!value?.isValid())
  .test(
    'adult',
    'You must be 18 or older',
    (value) => !value?.isAfter(dayjs().subtract(18, 'year'), 'day'),
  );

export const EIN_RULE = string()
  .default('')
  .test('ein', 'Enter a 9-digit EIN', (value) => digitCount(value) === 9);

export const EMAIL_RULE = string()
  .trim()
  .default('')
  .required('Enter an email address, like name@yourfirm.com')
  .email('Enter an email address, like name@yourfirm.com');

export const FIRST_NAME_RULE = string()
  .trim()
  .default('')
  .required('Enter your first name');

export const HOME_ADDRESS_RULE = string()
  .trim()
  .default('')
  .required('Enter your home address');

export const JOB_TITLE_RULE = string()
  .trim()
  .default('')
  .required('Enter your job title');

export const LAST_NAME_RULE = string()
  .trim()
  .default('')
  .required('Enter your last name');

export const LEGAL_BUSINESS_NAME_RULE = string()
  .trim()
  .default('')
  .required('Enter your legal business name');

export const OPTIONAL_TEXT_RULE = string().trim().default('');

export const OWNERSHIP_RULE = string()
  .trim()
  .default('')
  .test(
    'ownership',
    'Enter a number from 25 to 100',
    (value) =>
      /^\d+$/.test(value ?? '') && Number(value) >= 25 && Number(value) <= 100,
  );

export const PHONE_RULE = string()
  .default('')
  .test(
    'phone',
    'Enter a 10-digit phone number',
    (value) => digitCount(value) === 10,
  );

// Dashes and spaces are fine; the SSN needs exactly 9 digits.
export const SSN_RULE = string()
  .default('')
  .test(
    'ssn',
    'Enter a 9-digit SSN',
    (value) => /^[\d\s-]+$/.test(value ?? '') && digitCount(value) === 9,
  );

export const STATE_RULE = string()
  .default('')
  .required('Choose a state')
  .oneOf(['', ...US_STATES.map(({ code }) => code)], 'Choose a state');

export const WEBSITE_RULE = string()
  .default('')
  .test(
    'website',
    'Enter a web address, like https://yourfirm.com',
    (value) =>
      !value?.trim() ||
      /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(normalizeWebsite(value)),
  );

export const ZIP_RULE = string()
  .default('')
  .matches(/^\d{5}$/, 'Enter a 5-digit ZIP code');

// Called only while validating, after the module has loaded.
const digitCount = (value: string | undefined) =>
  (value ?? '').replace(/\D/g, '').length;
