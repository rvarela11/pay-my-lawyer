import { BusinessTypeSelect } from '../../../../components/BusinessTypeSelect/BusinessTypeSelect.tsx';
import { EinField } from '../../../../components/EinField/EinField.tsx';
import { FormTextField } from '../../../../components/FormTextField/FormTextField.tsx';
import { PhoneField } from '../../../../components/PhoneField/PhoneField.tsx';
import { StateSelect } from '../../../../components/StateSelect/StateSelect.tsx';
import { WebsiteField } from '../../../../components/WebsiteField/WebsiteField.tsx';
import { FIELDS } from '../../../../fields.ts';
import styles from './UsioBusinessScreen.module.css';

export const UsioBusinessScreen = () => (
  <div className={styles.grid}>
    <BusinessTypeSelect name={FIELDS.usioBusinessType} />
    <FormTextField
      autoComplete='organization'
      label='Legal business name'
      name={FIELDS.usioLegalBusinessName}
    />
    <FormTextField label='Doing business as (optional)' name={FIELDS.usioDba} />
    <EinField name={FIELDS.usioEin} />
    <FormTextField
      autoComplete='address-line1'
      className={styles.wide}
      label='Address'
      name={FIELDS.usioAddress1}
    />
    <FormTextField
      autoComplete='address-line2'
      label='Address 2 (optional)'
      name={FIELDS.usioAddress2}
    />
    <FormTextField
      autoComplete='address-level2'
      label='City'
      name={FIELDS.usioCity}
    />
    <StateSelect
      autoComplete='address-level1'
      label='State'
      name={FIELDS.usioState}
    />
    <FormTextField
      autoComplete='postal-code'
      label='ZIP code'
      name={FIELDS.usioZip}
      slotProps={{ htmlInput: { inputMode: 'numeric' } }}
    />
    <PhoneField label='Phone' name={FIELDS.usioPhone} />
    <WebsiteField name={FIELDS.usioWebsite} />
  </div>
);
