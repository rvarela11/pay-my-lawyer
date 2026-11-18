import type { FieldPath } from 'react-hook-form';
import type { SetupValues } from '../../validation.ts';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { formatPhone } from './formatPhone.ts';

type Props = { label: string; name: FieldPath<SetupValues> };

export const PhoneField = ({ label, name }: Props) => (
  <FormTextField
    autoComplete='tel-national'
    format={formatPhone}
    label={label}
    name={name}
    slotProps={{ htmlInput: { inputMode: 'tel' } }}
  />
);
