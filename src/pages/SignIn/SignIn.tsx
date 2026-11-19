import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router';
import { FormPage } from '@/components/FormPage/FormPage.tsx';
import { PasswordField } from '@/components/PasswordField/PasswordField.tsx';
import { PATHS } from '@/routes/paths.ts';
import { FIELDS } from './fields.ts';
import styles from './SignIn.module.css';
import { submitSignIn } from './submitSignIn.ts';
import { type SignInValues, signInSchema } from './validation.ts';

const SERVER_ERROR_MESSAGE = 'We could not sign you in. Try again later.';
const WRONG_CREDENTIALS_MESSAGE = 'Wrong email or password.';

export const SignIn = () => {
  const alertRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<SignInValues>({
    defaultValues: signInSchema.getDefault(),
    mode: 'onTouched',
    resolver: yupResolver(signInSchema),
    reValidateMode: 'onChange',
  });

  const serverError = errors.root?.serverError;

  const handleSignIn = async (values: SignInValues) => {
    try {
      const { status, subdomain } = await submitSignIn(values);

      if (status === 200) {
        await navigate(PATHS.signInVerify, {
          state: { email: values.email, subdomain },
        });
      } else if (status === 401) {
        setError('root.serverError', { message: WRONG_CREDENTIALS_MESSAGE });
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
          New to Pay My Lawyer?{' '}
          <Link
            component={RouterLink}
            to={PATHS.createAccount}
            underline='always'
          >
            Create an account
          </Link>
        </>
      }
      title='Sign in'
      titleId='sign-in-title'
    >
      <Stack
        component='form'
        noValidate
        spacing={3}
        useFlexGap
        onSubmit={handleSubmit(handleSignIn)}
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
              helperText={error?.message}
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
              autoComplete='current-password'
              error={!!error}
              fullWidth
              helperText={error?.message}
              inputRef={ref}
              label='Password'
            />
          )}
        />
        <Link
          className={styles.forgotPassword}
          component={RouterLink}
          to={PATHS.forgotPassword}
          underline='always'
          variant='body2'
        >
          Forgot password?
        </Link>
        <Button
          fullWidth
          loading={isSubmitting}
          loadingPosition='start'
          size='large'
          type='submit'
          variant='contained'
        >
          Sign in
        </Button>
      </Stack>
    </FormPage>
  );
};
