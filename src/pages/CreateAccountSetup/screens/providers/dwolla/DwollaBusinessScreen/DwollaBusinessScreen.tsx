import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FIELDS } from '../../../../fields.ts';
import type { SetupValues } from '../../../../validation.ts';

export const DwollaBusinessScreen = () => {
  const { control } = useFormContext<SetupValues>();

  return (
    <Controller
      control={control}
      name={FIELDS.dwollaLegalBusinessName}
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
