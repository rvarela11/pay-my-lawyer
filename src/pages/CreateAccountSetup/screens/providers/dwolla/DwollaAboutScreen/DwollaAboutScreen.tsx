import { Typography } from '@mui/material';
import { DateOfBirthField } from '../../../../components/DateOfBirthField/DateOfBirthField.tsx';
import {
  FormGrid,
  FormGridFullRow,
} from '../../../../components/FormGrid/FormGrid.tsx';
import { FormTextField } from '../../../../components/FormTextField/FormTextField.tsx';
import { SsnField } from '../../../../components/SsnField/SsnField.tsx';
import { StateSelect } from '../../../../components/StateSelect/StateSelect.tsx';
import { DWOLLA_FIELDS } from '../fields.ts';
import styles from './DwollaAboutScreen.module.css';

export const DwollaAboutScreen = () => (
  <div className={styles.screen}>
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
      <FormTextField
        autoComplete='off'
        label='Ownership (%)'
        name={DWOLLA_FIELDS.ownership}
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
      />
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
  </div>
);
