import { TextField, type TextFieldProps } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

type Props = Omit<TextFieldProps, 'name'> & {
  // Rewrites the value as the user types, like (555) 123-4567.
  format?: (value: string) => string;
  name: string;
  // Rewrites the value when the field is left, like adding https://.
  normalize?: (value: string) => string;
};

// A TextField wired to the surrounding form: its value, its error and its ref for focus on Next.
export const FormTextField = ({ format, name, normalize, ...props }: Props) => {
  const { control } = useFormContext();
  const {
    field: { onBlur, onChange, ref, value, ...field },
    fieldState: { error },
  } = useController({ control, name });

  const handleBlur = () => {
    if (normalize && typeof value === 'string') {
      onChange(normalize(value));
    }

    onBlur();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(format ? format(event.target.value) : event.target.value);
  };

  return (
    <TextField
      {...props}
      {...field}
      error={!!error}
      fullWidth
      helperText={error?.message}
      inputRef={ref}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value ?? ''}
    />
  );
};
