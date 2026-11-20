import dayjs, { type Dayjs } from 'dayjs';
import { mixed, string } from 'yup';
import { BUSINESS_TYPES } from '@/pages/CreateAccountSetup/components/form/BusinessTypeSelect/businessTypes.ts';
import { US_STATES } from '@/pages/CreateAccountSetup/components/form/StateSelect/usStates.ts';

// Rules shared by every provider's field set. Each starts empty, so nothing shows on load.
// Empty fields say "<Label> is required"; a wrong format says how to fix it ("Enter a …").
// Lengths follow Usio's Enrollment API (https://enroll.usiopay.com/documentation/), the only provider that publishes
// limits; Dwolla's schema states none. The Bar Card number is our own field.

// Read by the rules below while the module loads, so they come first.
const atLeast = (min: number) => `Enter at least ${min} characters`;
const atMost = (max: number) => `Enter ${max} characters or fewer`;

export const ADDRESS_LINE_2_RULE = string()
  .trim()
  .default('')
  .max(50, atMost(50));

export const BAR_NUMBER_RULE = string()
  .trim()
  .default('')
  .required('Bar Card number is required')
  .max(40, atMost(40));

export const BUSINESS_ADDRESS_RULE = string()
  .trim()
  .default('')
  .required('Address is required')
  .min(2, atLeast(2))
  .max(50, atMost(50));

export const BUSINESS_TYPE_RULE = string()
  .default('')
  .required('Business type is required')
  .oneOf(['', ...BUSINESS_TYPES], 'Business type is required');

export const CITY_RULE = string()
  .trim()
  .default('')
  .required('City is required')
  .min(2, atLeast(2))
  .max(38, atMost(38));

// Optional, but 2 to 50 characters once filled in.
export const DBA_RULE = string()
  .trim()
  .default('')
  .test('min', atLeast(2), (value) => !value || value.length >= 2)
  .max(50, atMost(50));

// Checked in order: empty, then a real date, then 18 or older (a birthday today counts).
// An unfinished date reaches the form as null, like an empty one, so one message covers both.
export const DATE_OF_BIRTH_RULE = mixed<Dayjs>()
  .nullable()
  .default(null)
  .test('required', 'Enter full date of birth', (value) => value != null)
  .test('real', 'Enter a real date of birth', (value) => !!value?.isValid())
  .test(
    'adult',
    'Must be 18 or older',
    (value) => !value?.isAfter(dayjs().subtract(18, 'year'), 'day'),
  );

export const EIN_RULE = string()
  .default('')
  .required('EIN is required')
  .test('ein', 'Enter a 9-digit EIN', (value) => digitCount(value) === 9);

export const EMAIL_RULE = string()
  .trim()
  .default('')
  .required('Email is required')
  .email('Enter a valid email')
  .max(50, atMost(50));

export const FIRST_NAME_RULE = string()
  .trim()
  .default('')
  .required('First name is required')
  .min(2, atLeast(2))
  .max(50, atMost(50));

export const HOME_ADDRESS_RULE = string()
  .trim()
  .default('')
  .required('Home address is required')
  .min(2, atLeast(2))
  .max(50, atMost(50));

export const JOB_TITLE_RULE = string()
  .trim()
  .default('')
  .required('Job title is required')
  .max(50, atMost(50));

export const LAST_NAME_RULE = string()
  .trim()
  .default('')
  .required('Last name is required')
  .min(2, atLeast(2))
  .max(50, atMost(50));

export const LEGAL_BUSINESS_NAME_RULE = string()
  .trim()
  .default('')
  .required('Legal business name is required')
  .min(5, atLeast(5))
  .max(50, atMost(50));

// The owner dialog's Bar Card number is optional.
export const OPTIONAL_BAR_NUMBER_RULE = string()
  .trim()
  .default('')
  .max(40, atMost(40));

export const OWNERSHIP_RULE = string()
  .trim()
  .default('')
  .required('Ownership is required')
  .test(
    'ownership',
    'Enter a percentage from 1 to 100',
    (value) =>
      /^\d+$/.test(value ?? '') && Number(value) >= 1 && Number(value) <= 100,
  );

export const PHONE_RULE = string()
  .default('')
  .required('Phone is required')
  .test(
    'phone',
    'Enter a 10-digit phone number',
    (value) => digitCount(value) === 10,
  );

// Dashes and spaces are fine; the SSN needs exactly 9 digits.
export const SSN_RULE = string()
  .default('')
  .required('SSN is required')
  .test(
    'ssn',
    'Enter a 9-digit SSN',
    (value) => /^[\d\s-]+$/.test(value ?? '') && digitCount(value) === 9,
  );

export const STATE_RULE = string()
  .default('')
  .required('State is required')
  .oneOf(['', ...US_STATES.map(({ code }) => code)], 'State is required');

export const WEBSITE_RULE = string()
  .default('')
  .max(50, atMost(50))
  .test(
    'website',
    'Enter a web address, like https://yourfirm.com',
    // Optional. With or without http(s)://, then a domain like yourfirm.com and an optional path.
    (value) =>
      !value?.trim() ||
      /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(value.trim()),
  );

export const ZIP_RULE = string()
  .trim()
  .default('')
  .required('ZIP code is required')
  .matches(/^\d{5}$/, 'Enter a 5-digit ZIP code');

// Called only while validating, after the module has loaded.
const digitCount = (value: string | undefined) =>
  (value ?? '').replace(/\D/g, '').length;
