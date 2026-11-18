import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { formatOwnership } from './formatOwnership.ts';

type Props = { name: string };

export const OwnershipField = ({ name }: Props) => (
  <FormTextField
    autoComplete='off'
    format={formatOwnership}
    label='Ownership (%)'
    name={name}
    slotProps={{ htmlInput: { inputMode: 'numeric' } }}
  />
);
