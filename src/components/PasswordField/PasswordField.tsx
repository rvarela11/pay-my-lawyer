import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { useState } from 'react';

type Props = Omit<TextFieldProps, 'type'>;

export const PasswordField = ({ slotProps, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((shown) => !shown);
  };

  return (
    <TextField
      {...props}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                edge='end'
                onClick={handleTogglePassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      type={showPassword ? 'text' : 'password'}
    />
  );
};
