import type { FieldPath } from 'react-hook-form';
import type { SetupValues } from '../../validation.ts';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { formatEin } from './formatEin.ts';

type Props = { name: FieldPath<SetupValues> };

export const EinField = ({ name }: Props) => (
  <FormTextField
    autoComplete='off'
    format={formatEin}
    label='EIN'
    name={name}
    slotProps={{ htmlInput: { inputMode: 'numeric' } }}
  />
);
