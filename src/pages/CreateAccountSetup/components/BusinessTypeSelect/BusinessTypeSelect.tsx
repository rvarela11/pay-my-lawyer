import { MenuItem } from '@mui/material';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { BUSINESS_TYPES } from './businessTypes.ts';

type Props = { name: string };

export const BusinessTypeSelect = ({ name }: Props) => (
  <FormTextField label='Business type' name={name} select>
    {BUSINESS_TYPES.map((type) => (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    ))}
  </FormTextField>
);
