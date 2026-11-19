import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PATHS } from '@/routes/paths.ts';
import { CREATE_ACCOUNT_SETUP_ROUTE } from '../CreateAccountSetup/createAccountSetupRoute.tsx';
import { CreateAccount } from './CreateAccount.tsx';
import { DELAY_MS } from './submitCreateAccount.ts';

const renderPage = () => {
  const router = createMemoryRouter(
    [
      { element: <CreateAccount />, path: PATHS.createAccount },
      CREATE_ACCOUNT_SETUP_ROUTE,
    ],
    { initialEntries: [PATHS.createAccount] },
  );
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  render(<RouterProvider router={router} />);

  return {
    email: screen.getByLabelText('Email'),
    password: screen.getByLabelText('Password'),
    submit: screen.getByRole('button', { name: 'Create account' }),
    user,
  };
};

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  fields: ReturnType<typeof renderPage>,
  email: string,
) => {
  await user.type(fields.email, email);
  await user.type(fields.password, 'password1');
};

describe('CreateAccount', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a field error on blur and clears it once the value is valid', async () => {
    const { email, password, user } = renderPage();

    await user.click(email);
    await user.click(password);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(email).toHaveAccessibleDescription('Email is required');

    await user.type(email, 'lawyer@example.com');

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('rejects an invalid email', async () => {
    const { email, password, user } = renderPage();

    await user.type(email, 'me');
    await user.click(password);

    expect(email).toHaveAccessibleDescription('Enter a valid email');
  });

  it('shows every error and focuses Email when an empty form is submitted', async () => {
    const { email, submit, user } = renderPage();

    await user.click(submit);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(email).toHaveFocus();
  });

  it('replaces the password hint with the length error', async () => {
    const { email, password, user } = renderPage();

    expect(password).toHaveAccessibleDescription('At least 8 characters');

    await user.type(password, 'short');
    await user.click(email);

    expect(password).toHaveAccessibleDescription('Use at least 8 characters');
  });

  it('shows and hides the password', async () => {
    const { password, user } = renderPage();

    expect(password).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(password).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' }),
    ).toBeInTheDocument();
  });

  it('flags an email that is already registered', async () => {
    const fields = renderPage();

    await fillForm(fields.user, fields, 'duplicate@example.com');
    await fields.user.click(fields.submit);
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    expect(
      await screen.findByText('An account with this email already exists.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Sign in instead?' }),
    ).toHaveAttribute('href', PATHS.signIn);
    expect(fields.email).toHaveFocus();
  });

  it('matches a registered email regardless of spaces and capitals', async () => {
    const fields = renderPage();

    await fillForm(fields.user, fields, ' Duplicate@Example.com ');
    await fields.user.click(fields.submit);
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    expect(
      await screen.findByText('An account with this email already exists.'),
    ).toBeInTheDocument();
  });

  it('shows a focused alert on a server error and keeps the values', async () => {
    const fields = renderPage();

    await fillForm(fields.user, fields, 'error@example.com');
    await fields.user.click(fields.submit);
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    const alert = await screen.findByRole('alert');

    expect(alert).toHaveTextContent('We could not create your account.');
    expect(alert).toHaveFocus();
    expect(fields.email).toHaveValue('error@example.com');
    expect(fields.password).toHaveValue('password1');
  });

  it('disables the button while submitting', async () => {
    const fields = renderPage();

    await fillForm(fields.user, fields, 'lawyer@example.com');
    await fields.user.click(fields.submit);

    expect(fields.submit).toBeDisabled();
  });

  it('goes to account setup after a successful sign-up', async () => {
    const fields = renderPage();

    await fillForm(fields.user, fields, 'lawyer@example.com');
    await fields.user.click(fields.submit);
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    expect(
      await screen.findByRole('heading', {
        name: 'How would you like to get paid?',
      }),
    ).toBeInTheDocument();
  });
});
