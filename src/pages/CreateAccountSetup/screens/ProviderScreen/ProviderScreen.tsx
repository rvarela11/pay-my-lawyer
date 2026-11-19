import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FIELDS } from '@/pages/CreateAccountSetup/fields.ts';
import { PROVIDER_IDS, TITLE_ID } from '@/pages/CreateAccountSetup/ids.ts';
import type { ProviderValues } from '@/pages/CreateAccountSetup/validation.ts';
import styles from './ProviderScreen.module.css';

const ERROR_ID = 'provider-error';

const LATER = {
  label: 'Set up payments later',
  needs: 'Create your portal now and add payments later.',
  value: PROVIDER_IDS.later,
} as const;

// "accepts" and "needs" answer the same two questions for each provider, so they're easy to compare.
// Usio's "No ID documents needed" depends on #21's decision; update it if Usio applicants need IDs.
const PROVIDER_OPTIONS = [
  {
    accepts: 'Cards and ACH',
    label: 'Usio',
    needs: 'Short application. No ID documents needed.',
    value: PROVIDER_IDS.usio,
  },
  {
    accepts: 'Bank transfers',
    label: 'Dwolla',
    needs:
      'Needs ownership details, an ID for each owner and a linked bank account.',
    value: PROVIDER_IDS.dwolla,
  },
] as const;

export const ProviderScreen = () => {
  const { control } = useFormContext<ProviderValues>();

  return (
    <Stack spacing={3} useFlexGap>
      <Controller
        control={control}
        name={FIELDS.provider}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <FormControl
            className={error ? styles.groupError : undefined}
            error={!!error}
          >
            {error && (
              <Stack
                className={styles.error}
                component={Typography}
                direction='row'
                id={ERROR_ID}
                spacing={1}
                useFlexGap
              >
                <ErrorOutlineOutlined aria-hidden='true' fontSize='small' />
                {error.message}
              </Stack>
            )}
            <RadioGroup
              {...field}
              aria-describedby={error ? ERROR_ID : undefined}
              aria-labelledby={TITLE_ID}
              className={styles.options}
            >
              {PROVIDER_OPTIONS.map(
                ({ accepts, label, needs, value }, index) => (
                  <FormControlLabel
                    className={styles.option}
                    control={
                      <Radio
                        // The form focuses the first option when Next is pressed without a choice.
                        slotProps={{
                          input: {
                            ref: index === 0 ? ref : undefined,
                            'aria-describedby': `${value}-accepts ${value}-needs`,
                            'aria-labelledby': `${value}-label`,
                          },
                        }}
                      />
                    }
                    key={value}
                    label={
                      <Stack
                        className={styles.text}
                        component='span'
                        spacing={0.5}
                        useFlexGap
                      >
                        <Typography
                          component='span'
                          id={`${value}-label`}
                          variant='h6'
                        >
                          {label}
                        </Typography>
                        <Typography component='span' id={`${value}-accepts`}>
                          {accepts}
                        </Typography>
                        <Typography
                          component='span'
                          id={`${value}-needs`}
                          variant='body2'
                        >
                          {needs}
                        </Typography>
                      </Stack>
                    }
                    value={value}
                  />
                ),
              )}
              <FormControlLabel
                className={styles.later}
                control={
                  <Radio
                    slotProps={{
                      input: {
                        'aria-describedby': `${LATER.value}-needs`,
                        'aria-labelledby': `${LATER.value}-label`,
                      },
                    }}
                  />
                }
                label={
                  <Stack
                    className={styles.text}
                    component='span'
                    spacing={0.5}
                    useFlexGap
                  >
                    <Typography component='span' id={`${LATER.value}-label`}>
                      {LATER.label}
                    </Typography>
                    <Typography
                      component='span'
                      id={`${LATER.value}-needs`}
                      variant='body2'
                    >
                      {LATER.needs}
                    </Typography>
                  </Stack>
                }
                value={LATER.value}
              />
            </RadioGroup>
          </FormControl>
        )}
      />
    </Stack>
  );
};
