import { BusinessTypeSelect } from '../../../../components/form/BusinessTypeSelect/BusinessTypeSelect.tsx';
import { EinField } from '../../../../components/form/EinField/EinField.tsx';
import {
  FormGrid,
  FormGridFullRow,
} from '../../../../components/form/FormGrid/FormGrid.tsx';
import { FormTextField } from '../../../../components/form/FormTextField/FormTextField.tsx';
import { PhoneField } from '../../../../components/form/PhoneField/PhoneField.tsx';
import { StateSelect } from '../../../../components/form/StateSelect/StateSelect.tsx';
import { USIO_FIELDS } from '../fields.ts';

export const UsioBusinessScreen = () => (
  <FormGrid>
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
    <FormGridFullRow>
      <FormTextField
        autoComplete='address-line1'
        label='Address'
        name={USIO_FIELDS.address1}
      />
    </FormGridFullRow>
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
    <FormTextField
      autoComplete='url'
      label='Website (optional)'
      name={USIO_FIELDS.website}
    />
  </FormGrid>
);
