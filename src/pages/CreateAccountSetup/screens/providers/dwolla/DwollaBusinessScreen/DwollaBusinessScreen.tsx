import { BusinessTypeSelect } from '../../../../components/BusinessTypeSelect/BusinessTypeSelect.tsx';
import { EinField } from '../../../../components/EinField/EinField.tsx';
import {
  FormGrid,
  FormGridFullRow,
} from '../../../../components/FormGrid/FormGrid.tsx';
import { FormTextField } from '../../../../components/FormTextField/FormTextField.tsx';
import { PhoneField } from '../../../../components/PhoneField/PhoneField.tsx';
import { StateSelect } from '../../../../components/StateSelect/StateSelect.tsx';
import { DWOLLA_FIELDS } from '../fields.ts';

export const DwollaBusinessScreen = () => (
  <FormGrid>
    <BusinessTypeSelect name={DWOLLA_FIELDS.businessType} />
    <FormTextField
      autoComplete='organization'
      label='Legal business name'
      name={DWOLLA_FIELDS.legalBusinessName}
    />
    <FormTextField
      label='Doing business as (optional)'
      name={DWOLLA_FIELDS.dba}
    />
    <EinField name={DWOLLA_FIELDS.ein} />
    <FormGridFullRow>
      <FormTextField
        autoComplete='address-line1'
        label='Address'
        name={DWOLLA_FIELDS.address1}
      />
    </FormGridFullRow>
    <FormTextField
      autoComplete='address-line2'
      label='Address 2 (optional)'
      name={DWOLLA_FIELDS.address2}
    />
    <FormTextField
      autoComplete='address-level2'
      label='City'
      name={DWOLLA_FIELDS.city}
    />
    <StateSelect
      autoComplete='address-level1'
      label='State'
      name={DWOLLA_FIELDS.state}
    />
    <FormTextField
      autoComplete='postal-code'
      label='ZIP code'
      name={DWOLLA_FIELDS.zip}
      slotProps={{ htmlInput: { inputMode: 'numeric' } }}
    />
    <PhoneField label='Phone' name={DWOLLA_FIELDS.phone} />
    <FormTextField
      autoComplete='url'
      label='Website (optional)'
      name={DWOLLA_FIELDS.website}
    />
  </FormGrid>
);
