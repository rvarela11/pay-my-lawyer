import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FIELDS } from '../../fields.ts';
import type { SetupValues } from '../../validation.ts';

// One real field for now; #18 builds the full business form.
export const BusinessScreen = () => {
  const { control } = useFormContext<SetupValues>();

  return (
    <Controller
      control={control}
      name={FIELDS.legalBusinessName}
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
