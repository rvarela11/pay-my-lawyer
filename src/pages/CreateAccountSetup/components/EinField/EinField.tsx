import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { formatEin } from './formatEin.ts';

type Props = { name: string };

export const EinField = ({ name }: Props) => (
  <FormTextField
    autoComplete='off'
    format={formatEin}
    label='EIN'
    name={name}
    slotProps={{ htmlInput: { inputMode: 'numeric' } }}
  />
);
