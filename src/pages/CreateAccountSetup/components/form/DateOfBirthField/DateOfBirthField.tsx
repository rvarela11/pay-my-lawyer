import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useController, useFormContext } from 'react-hook-form';

type Props = { name: string };

// Starts empty, so nobody submits a date they didn't choose. The date can be typed, and the
// calendar opens on the years so nobody pages back decades.
export const DateOfBirthField = ({ name }: Props) => {
  const { control } = useFormContext();
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
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
    </LocalizationProvider>
  );
};
