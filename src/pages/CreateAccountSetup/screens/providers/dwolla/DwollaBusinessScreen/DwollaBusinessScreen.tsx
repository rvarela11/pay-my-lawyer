import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DWOLLA_FIELDS } from '../fields.ts';
import type { DwollaValues } from '../validation.ts';

export const DwollaBusinessScreen = () => {
  const { control } = useFormContext<DwollaValues>();

  return (
    <Controller
      control={control}
      name={DWOLLA_FIELDS.legalBusinessName}
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
