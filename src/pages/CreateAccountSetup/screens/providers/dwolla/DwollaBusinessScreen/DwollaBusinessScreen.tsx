import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import type { SetupValues } from '../../../../validation.ts';
import { DWOLLA_FIELDS } from '../fields.ts';

export const DwollaBusinessScreen = () => {
  const { control } = useFormContext<SetupValues>();

  return (
    <Controller
      control={control}
      name={DWOLLA_FIELDS.dwollaLegalBusinessName}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          autoComplete='organization'
          error={!!error}
          fullWidth
          helperText={error?.message}
          inputRef={ref}
          label='Legal business name'
        />
      )}
    />
  );
};
