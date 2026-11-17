import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PATHS } from '../../routes/paths.ts';
import responses from './data/responses.json';
import { CREATE_ACCOUNT_SETUP_ROUTE } from './createAccountSetupRoute.tsx';

vi.mock('./data/getSetupProgress.ts', () => ({
  DELAY_MS: 0,
  getSetupProgress: () => Promise.resolve(responses.draft),
}));

describe('CreateAccountSetup resuming a saved draft', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens at the draft screen with its answers filled in', async () => {
    const router = createMemoryRouter([CREATE_ACCOUNT_SETUP_ROUTE], {
      initialEntries: [PATHS.createAccountSetup],
    });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'Review & submit' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back' }));
    await screen.findByRole('heading', { name: 'Business details' });

    expect(screen.getByLabelText('Legal business name')).toHaveValue(
      'Demo Law PLLC',
    );

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(
      await screen.findByRole('alertdialog', {
        name: 'Change payment method?',
      }),
    ).toBeInTheDocument();
  });
});
