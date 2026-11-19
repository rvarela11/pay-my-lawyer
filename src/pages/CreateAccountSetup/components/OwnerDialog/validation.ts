import { array, type InferType, object, string } from 'yup';
import {
  CITY_RULE,
  DATE_OF_BIRTH_RULE,
  FIRST_NAME_RULE,
  HOME_ADDRESS_RULE,
  JOB_TITLE_RULE,
  LAST_NAME_RULE,
  OPTIONAL_TEXT_RULE,
  OWNERSHIP_RULE,
  SSN_RULE,
  STATE_RULE,
  ZIP_RULE,
} from '../../screens/providers/rules.ts';
import { OWNER_FIELDS } from './fields.ts';

// One beneficial owner other than the applicant. The dialog passes `remaining` (the % nobody
// else owns) as the Yup context, so an owner can't push the total over 100%.
export const ownerSchema = object({
  [OWNER_FIELDS.barNumber]: OPTIONAL_TEXT_RULE,
  [OWNER_FIELDS.dateOfBirth]: DATE_OF_BIRTH_RULE,
  [OWNER_FIELDS.firstName]: FIRST_NAME_RULE,
  [OWNER_FIELDS.homeAddress1]: HOME_ADDRESS_RULE,
  [OWNER_FIELDS.homeAddress2]: OPTIONAL_TEXT_RULE,
  [OWNER_FIELDS.homeCity]: CITY_RULE,
  [OWNER_FIELDS.homeState]: STATE_RULE,
  [OWNER_FIELDS.homeZip]: ZIP_RULE,
  [OWNER_FIELDS.id]: string().default(''),
  [OWNER_FIELDS.jobTitle]: JOB_TITLE_RULE,
  [OWNER_FIELDS.lastName]: LAST_NAME_RULE,
  [OWNER_FIELDS.ownership]: OWNERSHIP_RULE.test('remaining', function (value) {
    const remaining = Number(this.options.context?.remaining ?? 100);

    return (
      Number(value) <= remaining ||
      this.createError({ message: "Total ownership can't be over 100%" })
    );
  }),
  [OWNER_FIELDS.ssn]: SSN_RULE,
});

export type Owner = InferType<typeof ownerSchema>;

// Every owner other than the applicant. Checked on Next: the applicant's own % (a sibling field
// in each provider's form) plus the owners' can't go over 100, for example after the applicant
// raises their % in About you.
export const OWNERS_RULE = array(ownerSchema)
  .default([])
  .test('total', function (owners) {
    const total = (owners ?? []).reduce(
      (sum, owner) => sum + Number(owner.ownership),
      Number(this.parent.ownership),
    );

    return (
      total <= 100 ||
      this.createError({
        message: `Total ownership is ${total}%. It can't be over 100%.`,
      })
    );
  });
