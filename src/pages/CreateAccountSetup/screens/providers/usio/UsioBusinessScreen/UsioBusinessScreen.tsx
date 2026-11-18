import { BusinessTypeSelect } from '../../../../components/BusinessTypeSelect/BusinessTypeSelect.tsx';
import { EinField } from '../../../../components/EinField/EinField.tsx';
import { FormTextField } from '../../../../components/FormTextField/FormTextField.tsx';
import { PhoneField } from '../../../../components/PhoneField/PhoneField.tsx';
import { StateSelect } from '../../../../components/StateSelect/StateSelect.tsx';
import { WebsiteField } from '../../../../components/WebsiteField/WebsiteField.tsx';
import { USIO_FIELDS } from '../fields.ts';
import styles from './UsioBusinessScreen.module.css';

export const UsioBusinessScreen = () => (
  <div className={styles.grid}>
    <BusinessTypeSelect name={USIO_FIELDS.usioBusinessType} />
    <FormTextField
      autoComplete='organization'
      label='Legal business name'
      name={USIO_FIELDS.usioLegalBusinessName}
    />
    <FormTextField
      label='Doing business as (optional)'
      name={USIO_FIELDS.usioDba}
    />
    <EinField name={USIO_FIELDS.usioEin} />
    <FormTextField
      autoComplete='address-line1'
      className={styles.wide}
      label='Address'
      name={USIO_FIELDS.usioAddress1}
    />
    <FormTextField
      autoComplete='address-line2'
      label='Address 2 (optional)'
      name={USIO_FIELDS.usioAddress2}
    />
    <FormTextField
      autoComplete='address-level2'
      label='City'
      name={USIO_FIELDS.usioCity}
    />
    <StateSelect
      autoComplete='address-level1'
      label='State'
      name={USIO_FIELDS.usioState}
    />
    <FormTextField
      autoComplete='postal-code'
      label='ZIP code'
      name={USIO_FIELDS.usioZip}
      slotProps={{ htmlInput: { inputMode: 'numeric' } }}
    />
    <PhoneField label='Phone' name={USIO_FIELDS.usioPhone} />
    <WebsiteField name={USIO_FIELDS.usioWebsite} />
  </div>
);
