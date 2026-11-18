import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, type FieldPath, useFormContext } from 'react-hook-form';
import type { SetupValues } from '../../validation.ts';
import styles from './SsnField.module.css';

type Props = { name: FieldPath<SetupValues> };

// A text input with the digits masked by CSS, not type='password': password managers
// ignore autoComplete='off' on password fields and could fill a saved password here.
export const SsnField = ({ name }: Props) => {
  const { control } = useFormContext<SetupValues>();
  const [isShown, setIsShown] = useState(false);

  const handleToggle = () => {
    setIsShown((shown) => !shown);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          autoComplete='off'
          error={!!error}
          fullWidth
          helperText={error?.message}
          inputRef={ref}
          label='SSN'
          slotProps={{
            htmlInput: {
              className: styles.input,
              'data-masked': String(!isShown),
              inputMode: 'numeric',
            },
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={isShown ? 'Hide SSN' : 'Show SSN'}
                    edge='end'
                    onClick={handleToggle}
                  >
                    {isShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          type='text'
          value={value ?? ''}
        />
      )}
    />
  );
};
