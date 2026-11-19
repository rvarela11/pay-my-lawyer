import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router';
import { FormPage } from '@/components/FormPage/FormPage.tsx';
import { PasswordField } from '@/components/PasswordField/PasswordField.tsx';
import { PATHS } from '@/routes/paths.ts';
import styles from './CreateAccount.module.css';
import { FIELDS } from './fields.ts';
import { submitCreateAccount } from './submitCreateAccount.ts';
import {
  type CreateAccountValues,
  createAccountSchema,
  PASSWORD_MIN_LENGTH,
} from './validation.ts';

const SERVER_ERROR_MESSAGE =
  'We could not create your account. Try again later.';

export const CreateAccount = () => {
  const alertRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<CreateAccountValues>({
    defaultValues: createAccountSchema.getDefault(),
    mode: 'onTouched',
    resolver: yupResolver(createAccountSchema),
    reValidateMode: 'onChange',
  });

  const serverError = errors.root?.serverError;

  const handleCreateAccount = async (values: CreateAccountValues) => {
    try {
      const { status } = await submitCreateAccount(values);

      if (status === 200) {
        await navigate(PATHS.createAccountSetup);
      } else if (status === 400) {
        setError(
          FIELDS.email,
          {
            message: 'An account with this email already exists.',
            type: 'server',
          },
          { shouldFocus: true },
        );
      } else {
        setError('root.serverError', { message: SERVER_ERROR_MESSAGE });
      }
    } catch {
      setError('root.serverError', { message: SERVER_ERROR_MESSAGE });
    }
  };

  // The loading button is disabled while submitting, which drops focus to <body>.
  // After a server error, move focus to the alert so keyboard users continue from there (WCAG 2.4.3).
  // An effect is needed because the alert only renders after setError, so the ref is null in the handler.
  useEffect(() => {
    if (serverError) {
      alertRef.current?.focus();
    }
  }, [serverError]);

  return (
    <FormPage
      alert={
        serverError && (
          <Alert ref={alertRef} severity='error' tabIndex={-1}>
            {serverError.message}
          </Alert>
        )
      }
      subtitle={
        <>
          Already have an account?{' '}
          <Link component={RouterLink} to={PATHS.signIn} underline='always'>
            Sign in
          </Link>
        </>
      }
      title='Create your account'
      titleId='create-account-title'
    >
      <Stack
        component='form'
        noValidate
        spacing={3}
        useFlexGap
        onSubmit={handleSubmit(handleCreateAccount)}
      >
        <Controller
          control={control}
          name={FIELDS.email}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextField
              {...field}
              autoComplete='email'
              error={!!error}
              fullWidth
              helperText={
                error?.type === 'server' ? (
                  <>
                    {error.message}{' '}
                    <Link
                      component={RouterLink}
                      to={PATHS.signIn}
                      underline='always'
                    >
                      Sign in instead?
                    </Link>
                  </>
                ) : (
                  error?.message
                )
              }
              inputRef={ref}
              label='Email'
              type='email'
            />
          )}
        />
        <Controller
          control={control}
          name={FIELDS.password}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <PasswordField
              {...field}
              autoComplete='new-password'
              error={!!error}
              fullWidth
              helperText={
                error?.message ?? `At least ${PASSWORD_MIN_LENGTH} characters`
              }
              inputRef={ref}
              label='Password'
            />
          )}
        />
        <Button
          fullWidth
          loading={isSubmitting}
          loadingPosition='start'
          size='large'
          type='submit'
          variant='contained'
        >
          Create account
        </Button>
        <Typography className={styles.agreement} component='p' variant='body2'>
          By creating an account you agree to the{' '}
          <Link component={RouterLink} to={PATHS.terms} underline='always'>
            Terms
          </Link>{' '}
          and the{' '}
          <Link component={RouterLink} to={PATHS.privacy} underline='always'>
            Privacy Policy
          </Link>
          .
        </Typography>
      </Stack>
    </FormPage>
  );
};
