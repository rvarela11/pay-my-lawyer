import { Typography } from '@mui/material';
import { DateOfBirthField } from '../../../../components/DateOfBirthField/DateOfBirthField.tsx';
import { FormTextField } from '../../../../components/FormTextField/FormTextField.tsx';
import { SsnField } from '../../../../components/SsnField/SsnField.tsx';
import { StateSelect } from '../../../../components/StateSelect/StateSelect.tsx';
import { FIELDS } from '../../../../fields.ts';
import styles from './UsioAboutScreen.module.css';

export const UsioAboutScreen = () => (
  <div className={styles.screen}>
    <Typography component='p'>We use this to verify your identity.</Typography>
    <div className={styles.grid}>
      <FormTextField
        autoComplete='email'
        className={styles.wide}
        label='Email'
        name={FIELDS.usioEmail}
        type='email'
      />
      <FormTextField
        autoComplete='given-name'
        label='First name'
        name={FIELDS.usioFirstName}
      />
      <FormTextField
        autoComplete='family-name'
        label='Last name'
        name={FIELDS.usioLastName}
      />
      <FormTextField
        autoComplete='organization-title'
        label='Job title'
        name={FIELDS.usioJobTitle}
      />
      <FormTextField
        autoComplete='off'
        label='Ownership (%)'
        name={FIELDS.usioOwnership}
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
      />
      <DateOfBirthField name={FIELDS.usioDateOfBirth} />
      <SsnField name={FIELDS.usioSsn} />
      <FormTextField
        autoComplete='address-line1'
        className={styles.wide}
        label='Home address'
        name={FIELDS.usioHomeAddress1}
      />
      <FormTextField
        autoComplete='address-line2'
        label='Address 2 (optional)'
        name={FIELDS.usioHomeAddress2}
      />
      <FormTextField
        autoComplete='address-level2'
        label='City'
        name={FIELDS.usioHomeCity}
      />
      <StateSelect
        autoComplete='address-level1'
        label='State'
        name={FIELDS.usioHomeState}
      />
      <FormTextField
        autoComplete='postal-code'
        label='ZIP code'
        name={FIELDS.usioHomeZip}
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
      />
    </div>
  </div>
);
