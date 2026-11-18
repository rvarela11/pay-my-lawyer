import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

type Props = { name: string };

export const DateOfBirthField = ({ name }: Props) => {
  const { control } = useFormContext();

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
