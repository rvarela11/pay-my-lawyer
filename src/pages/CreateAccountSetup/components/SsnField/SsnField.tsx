import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { FormTextField } from '../FormTextField/FormTextField.tsx';
import styles from './SsnField.module.css';

type Props = { name: string };

// A text input with the digits masked by CSS, not type='password': password managers
// ignore autoComplete='off' on password fields and could fill a saved password here.
export const SsnField = ({ name }: Props) => {
  const [isShown, setIsShown] = useState(false);

  const handleToggle = () => {
    setIsShown((shown) => !shown);
  };

  return (
    <FormTextField
      autoComplete='off'
      label='SSN'
      name={name}
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
    />
  );
};
