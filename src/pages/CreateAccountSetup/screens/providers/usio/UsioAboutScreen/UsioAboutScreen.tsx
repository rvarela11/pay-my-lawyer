import { Typography } from '@mui/material';
import { DateOfBirthField } from '../../../../components/DateOfBirthField/DateOfBirthField.tsx';
import {
  FormGrid,
  FormGridFullRow,
} from '../../../../components/FormGrid/FormGrid.tsx';
import { FormTextField } from '../../../../components/FormTextField/FormTextField.tsx';
import { OwnershipField } from '../../../../components/OwnershipField/OwnershipField.tsx';
import { SsnField } from '../../../../components/SsnField/SsnField.tsx';
import { StateSelect } from '../../../../components/StateSelect/StateSelect.tsx';
import { USIO_FIELDS } from '../fields.ts';
import styles from './UsioAboutScreen.module.css';

export const UsioAboutScreen = () => (
  <div className={styles.screen}>
    <Typography component='p'>We use this to verify your identity.</Typography>
    <FormGrid>
      <FormGridFullRow>
        <FormTextField
          autoComplete='email'
          label='Email'
          name={USIO_FIELDS.email}
          type='email'
        />
      </FormGridFullRow>
      <FormTextField
        autoComplete='given-name'
        label='First name'
        name={USIO_FIELDS.firstName}
      />
      <FormTextField
        autoComplete='family-name'
        label='Last name'
        name={USIO_FIELDS.lastName}
      />
      <FormTextField
        autoComplete='organization-title'
        label='Job title'
        name={USIO_FIELDS.jobTitle}
      />
      <FormTextField
        autoComplete='off'
        label='Bar Card number'
        name={USIO_FIELDS.barNumber}
      />
      <OwnershipField name={USIO_FIELDS.ownership} />
      <DateOfBirthField name={USIO_FIELDS.dateOfBirth} />
      <SsnField name={USIO_FIELDS.ssn} />
      <FormGridFullRow>
        <FormTextField
          autoComplete='address-line1'
          label='Home address'
          name={USIO_FIELDS.homeAddress1}
        />
      </FormGridFullRow>
      <FormTextField
        autoComplete='address-line2'
        label='Address 2 (optional)'
        name={USIO_FIELDS.homeAddress2}
      />
      <FormTextField
        autoComplete='address-level2'
        label='City'
        name={USIO_FIELDS.homeCity}
      />
      <StateSelect
        autoComplete='address-level1'
        label='State'
        name={USIO_FIELDS.homeState}
      />
      <FormTextField
        autoComplete='postal-code'
        label='ZIP code'
        name={USIO_FIELDS.homeZip}
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
      />
    </FormGrid>
  </div>
);
