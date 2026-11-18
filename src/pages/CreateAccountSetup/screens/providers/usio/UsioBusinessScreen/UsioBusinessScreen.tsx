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
    <BusinessTypeSelect name={USIO_FIELDS.businessType} />
    <FormTextField
      autoComplete='organization'
      label='Legal business name'
      name={USIO_FIELDS.legalBusinessName}
    />
    <FormTextField
      label='Doing business as (optional)'
      name={USIO_FIELDS.dba}
    />
    <EinField name={USIO_FIELDS.ein} />
    <FormTextField
      autoComplete='address-line1'
      className={styles.wide}
      label='Address'
      name={USIO_FIELDS.address1}
    />
    <FormTextField
      autoComplete='address-line2'
      label='Address 2 (optional)'
      name={USIO_FIELDS.address2}
    />
    <FormTextField
      autoComplete='address-level2'
      label='City'
      name={USIO_FIELDS.city}
    />
    <StateSelect
      autoComplete='address-level1'
      label='State'
      name={USIO_FIELDS.state}
    />
    <FormTextField
      autoComplete='postal-code'
      label='ZIP code'
      name={USIO_FIELDS.zip}
      slotProps={{ htmlInput: { inputMode: 'numeric' } }}
    />
    <PhoneField label='Phone' name={USIO_FIELDS.phone} />
    <WebsiteField name={USIO_FIELDS.website} />
  </div>
);
