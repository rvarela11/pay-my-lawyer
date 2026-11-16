import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router';
import { Container } from '../../components/Container/Container.tsx';
import { Section } from '../../components/Section/Section.tsx';
import { PATHS } from '../../routes/paths.ts';
import styles from './CreateAccount.module.css';
import { FIELDS } from './fields.ts';
import { submitCreateAccount } from './submitCreateAccount.ts';
import {
  type CreateAccountValues,
  createAccountSchema,
  PASSWORD_MIN_LENGTH,
} from './validation.ts';

const SERVER_ERROR_MESSAGE =
  'We could not create your account. Try again in a moment.';

export const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleTogglePassword = () => {
    setShowPassword((shown) => !shown);
  };

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
    <Section aria-labelledby='create-account-title'>
      <Container>
        <div className={styles.column}>
          <Typography component='h1' id='create-account-title' variant='h4'>
            Create your account
          </Typography>
          <Typography className={styles.subtitle} component='p'>
            Already have an account?{' '}
            <Link component={RouterLink} to={PATHS.signIn} underline='always'>
              Sign in
            </Link>
          </Typography>

          {serverError && (
            <Alert
              className={styles.alert}
              ref={alertRef}
              severity='error'
              tabIndex={-1}
            >
              {serverError.message}
            </Alert>
          )}

          <form
            className={styles.form}
            noValidate
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
                <TextField
                  {...field}
                  autoComplete='new-password'
                  error={!!error}
                  fullWidth
                  helperText={
                    error?.message ??
                    `At least ${PASSWORD_MIN_LENGTH} characters`
                  }
                  inputRef={ref}
                  label='Password'
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
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
              )}
            />
            <Controller
              control={control}
              name={FIELDS.barNumber}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoComplete='off'
                  error={!!error}
                  fullWidth
                  helperText={error?.message}
                  inputRef={ref}
                  label='Bar Card number'
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
            <Typography
              className={styles.agreement}
              component='p'
              variant='body2'
            >
              By creating an account you agree to the{' '}
              <Link component={RouterLink} to={PATHS.terms} underline='always'>
                Terms
              </Link>{' '}
              and the{' '}
              <Link
                component={RouterLink}
                to={PATHS.privacy}
                underline='always'
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </form>
        </div>
      </Container>
    </Section>
  );
};
