import { Stack, Typography } from '@mui/material';
import { DateOfBirthField } from '@/pages/CreateAccountSetup/components/form/DateOfBirthField/DateOfBirthField.tsx';
import {
  FormGrid,
  FormGridFullRow,
} from '@/pages/CreateAccountSetup/components/form/FormGrid/FormGrid.tsx';
import { FormTextField } from '@/pages/CreateAccountSetup/components/form/FormTextField/FormTextField.tsx';
import { OwnershipField } from '@/pages/CreateAccountSetup/components/form/OwnershipField/OwnershipField.tsx';
import { SsnField } from '@/pages/CreateAccountSetup/components/form/SsnField/SsnField.tsx';
import { StateSelect } from '@/pages/CreateAccountSetup/components/form/StateSelect/StateSelect.tsx';
import { DWOLLA_FIELDS } from '../fields.ts';

export const DwollaAboutScreen = () => (
  <Stack spacing={3} useFlexGap>
    <Typography component='p'>We use this to verify your identity.</Typography>
    <FormGrid>
      <FormGridFullRow>
        <FormTextField
          autoComplete='email'
          label='Email'
          name={DWOLLA_FIELDS.email}
          type='email'
        />
      </FormGridFullRow>
      <FormTextField
        autoComplete='given-name'
        label='First name'
        name={DWOLLA_FIELDS.firstName}
      />
      <FormTextField
        autoComplete='family-name'
        label='Last name'
        name={DWOLLA_FIELDS.lastName}
      />
      <FormTextField
        autoComplete='organization-title'
        label='Job title'
        name={DWOLLA_FIELDS.jobTitle}
      />
      <FormTextField
        autoComplete='off'
        label='Bar Card number'
        name={DWOLLA_FIELDS.barNumber}
      />
      <OwnershipField name={DWOLLA_FIELDS.ownership} />
      <DateOfBirthField name={DWOLLA_FIELDS.dateOfBirth} />
      <SsnField name={DWOLLA_FIELDS.ssn} />
      <FormGridFullRow>
        <FormTextField
          autoComplete='address-line1'
          label='Home address'
          name={DWOLLA_FIELDS.homeAddress1}
        />
      </FormGridFullRow>
      <FormTextField
        autoComplete='address-line2'
        label='Address 2 (optional)'
        name={DWOLLA_FIELDS.homeAddress2}
      />
      <FormTextField
        autoComplete='address-level2'
        label='City'
        name={DWOLLA_FIELDS.homeCity}
      />
      <StateSelect
        autoComplete='address-level1'
        label='State'
        name={DWOLLA_FIELDS.homeState}
      />
      <FormTextField
        autoComplete='postal-code'
        label='ZIP code'
        name={DWOLLA_FIELDS.homeZip}
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
      />
    </FormGrid>
  </Stack>
);
