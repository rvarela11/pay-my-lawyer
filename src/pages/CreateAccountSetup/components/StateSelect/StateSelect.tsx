import { MenuItem } from '@mui/material';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import { US_STATES } from './usStates.ts';

type Props = {
  autoComplete: string;
  label: string;
  name: string;
};

export const StateSelect = ({ autoComplete, label, name }: Props) => (
  <FormTextField
    label={label}
    name={name}
    select
    slotProps={{ htmlInput: { autoComplete } }}
  >
    {US_STATES.map(({ code, name: stateName }) => (
      <MenuItem key={code} value={code}>
        {stateName}
      </MenuItem>
    ))}
  </FormTextField>
);
