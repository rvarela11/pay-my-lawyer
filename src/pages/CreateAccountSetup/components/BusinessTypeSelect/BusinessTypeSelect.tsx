import { MenuItem } from '@mui/material';
import type { FieldPath } from 'react-hook-form';
import type { SetupValues } from '../../validation.ts';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { BUSINESS_TYPES } from './businessTypes.ts';

type Props = { name: FieldPath<SetupValues> };

export const BusinessTypeSelect = ({ name }: Props) => (
  <FormTextField label='Business type' name={name} select>
    {BUSINESS_TYPES.map((type) => (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    ))}
  </FormTextField>
);
