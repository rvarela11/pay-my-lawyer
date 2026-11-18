import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { formatPhone } from './formatPhone.ts';

type Props = { label: string; name: string };

export const PhoneField = ({ label, name }: Props) => (
  <FormTextField
    autoComplete='tel-national'
    format={formatPhone}
    label={label}
    name={name}
    slotProps={{ htmlInput: { inputMode: 'tel' } }}
  />
);
