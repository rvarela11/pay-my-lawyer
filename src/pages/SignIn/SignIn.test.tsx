import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, useLocation } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PATHS } from '../../routes/paths.ts';
import { SignInVerify } from '../SignInVerify/SignInVerify.tsx';
import { SignIn } from './SignIn.tsx';
import { DELAY_MS } from './submitSignIn.ts';

const RouterState = () => (
  <output aria-label='Router state'>
    {JSON.stringify(useLocation().state)}
  </output>
);

const renderPage = () => {
  const router = createMemoryRouter(
    [
      { element: <SignIn />, path: PATHS.signIn },
      {
        element: (
          <>
            <SignInVerify />
            <RouterState />
          </>
        ),
        path: PATHS.signInVerify,
      },
    ],
    { initialEntries: [PATHS.signIn] },
  );
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  render(<RouterProvider router={router} />);

  return {
    email: screen.getByLabelText('Email'),
    password: screen.getByLabelText('Password'),
    submit: screen.getByRole('button', { name: 'Sign in' }),
    user,
  };
};

const signIn = async (
  fields: ReturnType<typeof renderPage>,
  email: string,
  password = 'password1',
) => {
  await fields.user.type(fields.email, email);
  await fields.user.type(fields.password, password);
  await fields.user.click(fields.submit);
  await vi.advanceTimersByTimeAsync(DELAY_MS);
};

describe('SignIn', () => {
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
    const { email, password, submit, user } = renderPage();

    await user.click(submit);

    expect(email).toHaveAccessibleDescription('Email is required');
    expect(password).toHaveAccessibleDescription('Password is required');
    expect(email).toHaveFocus();
  });

  it('accepts a short password', async () => {
    const fields = renderPage();

    await signIn(fields, 'lawyer@example.com', 'abc');

    expect(
      await screen.findByRole('heading', { name: 'Verify your sign-in' }),
    ).toBeInTheDocument();
  });

  it.each([
    ['wrong@example.com', 'Wrong email or password.'],
    ['error@example.com', 'We could not sign you in. Try again later.'],
  ])(
    'shows a focused alert for %s and keeps the values',
    async (address, message) => {
      const fields = renderPage();

      await signIn(fields, address);

      const alert = await screen.findByRole('alert');

      expect(alert).toHaveTextContent(message);
      expect(alert).toHaveFocus();
      expect(fields.email).toHaveValue(address);
      expect(fields.password).toHaveValue('password1');
    },
  );

  it('matches a test email regardless of spaces and capitals', async () => {
    const fields = renderPage();

    await signIn(fields, ' Wrong@Example.com ');

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Wrong email or password.',
    );
  });

  it('refocuses the alert with the new message after a second failure', async () => {
    const fields = renderPage();

    await signIn(fields, 'wrong@example.com');
    await screen.findByRole('alert');
    await fields.user.clear(fields.email);
    await fields.user.type(fields.email, 'error@example.com');
    await fields.user.click(fields.submit);
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    const alert = await screen.findByText(
      'We could not sign you in. Try again later.',
    );

    expect(screen.getByRole('alert')).toContainElement(alert);
    expect(screen.getByRole('alert')).toHaveFocus();
  });

  it('goes to verification with only the email and subdomain', async () => {
    const fields = renderPage();

    await signIn(fields, 'lawyer@example.com');

    expect(
      await screen.findByRole('heading', { name: 'Verify your sign-in' }),
    ).toBeInTheDocument();
    expect(
      JSON.parse(screen.getByLabelText('Router state').textContent ?? ''),
    ).toEqual({ email: 'lawyer@example.com', subdomain: 'demo-law' });
  });

  it('links to Create account and Forgot password', () => {
    renderPage();

    expect(
      screen.getByRole('link', { name: 'Create an account' }),
    ).toHaveAttribute('href', PATHS.createAccount);
    expect(
      screen.getByRole('link', { name: 'Forgot password?' }),
    ).toHaveAttribute('href', PATHS.forgotPassword);
  });

  it('disables the button while signing in', async () => {
    const fields = renderPage();

    await fields.user.type(fields.email, 'lawyer@example.com');
    await fields.user.type(fields.password, 'password1');
    await fields.user.click(fields.submit);

    expect(fields.submit).toBeDisabled();

    await vi.advanceTimersByTimeAsync(DELAY_MS);
  });
});
