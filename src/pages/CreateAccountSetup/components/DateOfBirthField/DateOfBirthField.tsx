import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import {
  Controller,
  type FieldPathByValue,
  useFormContext,
} from 'react-hook-form';
import type { SetupValues } from '../../validation.ts';

type Props = { name: FieldPathByValue<SetupValues, Dayjs | null | undefined> };

// Starts empty (legacy pre-filled a date 18 years ago). The date can be typed, and the
// calendar opens on the years so nobody pages back decades.
export const DateOfBirthField = ({ name }: Props) => {
  const { control } = useFormContext<SetupValues>();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onBlur, onChange, ref, value },
          fieldState: { error },
        }) => (
          <DatePicker
            disableFuture
            label='Date of birth'
            maxDate={dayjs().subtract(18, 'year')}
            onChange={onChange}
            openTo='year'
            slotProps={{
              textField: {
                error: !!error,
                fullWidth: true,
                helperText: error?.message,
                inputRef: ref,
                onBlur,
              },
            }}
            value={value ?? null}
            views={['year', 'month', 'day']}
          />
        )}
      />
    </LocalizationProvider>
  );
};
