import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PATHS } from '../../routes/paths.ts';
import { CREATE_ACCOUNT_SETUP_ROUTE } from './createAccountSetupRoute.tsx';

const PROVIDER_HEADING = 'How would you like to get paid?';

const renderWizard = (initialPath: string = PATHS.createAccountSetup) => {
  const router = createMemoryRouter([CREATE_ACCOUNT_SETUP_ROUTE], {
    initialEntries: [initialPath],
  });
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  render(<RouterProvider router={router} />);

  return { router, user };
};

const heading = (name: string) => screen.findByRole('heading', { name });

const clickNext = (user: ReturnType<typeof userEvent.setup>) =>
  user.click(screen.getByRole('button', { name: 'Next' }));

const clickBack = (user: ReturnType<typeof userEvent.setup>) =>
  user.click(screen.getByRole('button', { name: 'Back' }));

const chooseProvider = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string,
) => {
  await heading(PROVIDER_HEADING);
  await user.click(screen.getByRole('radio', { name: label }));
  await clickNext(user);
};

describe('CreateAccountSetup', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens on the provider choice without moving focus', async () => {
    renderWizard();

    expect(await heading(PROVIDER_HEADING)).not.toHaveFocus();
  });

  it('describes what each payment option involves', async () => {
    renderWizard();
    await heading(PROVIDER_HEADING);

    expect(
      screen.getByRole('radio', { name: 'Usio' }),
    ).toHaveAccessibleDescription(
      'Cards and ACH Short application. No ID documents needed.',
    );
    expect(
      screen.getByRole('radio', { name: 'Dwolla' }),
    ).toHaveAccessibleDescription(
      'Bank transfers Needs ownership details, an ID for each owner and a linked bank account.',
    );
    expect(
      screen.getByRole('radio', { name: 'Set up payments later' }),
    ).toHaveAccessibleDescription(
      'Create your portal now and add payments later.',
    );
  });

  it('requires a provider choice', async () => {
    const { user } = renderWizard();

    await heading(PROVIDER_HEADING);
    await clickNext(user);

    expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription(
      'Choose how you want to get paid',
    );

    const usio = screen.getByRole('radio', { name: 'Usio' });
    const error = screen.getByText('Choose how you want to get paid');

    expect(usio).toHaveFocus();
    // Shown under the question, before the options.
    expect(
      error.compareDocumentPosition(usio) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('goes to Business details with focus on its heading', async () => {
    const { user } = renderWizard();

    await chooseProvider(user, 'Usio');

    const title = await heading('Business details');

    await waitFor(() => expect(title).toHaveFocus());
  });

  it('blocks Next on an empty required field and focuses it', async () => {
    const { user } = renderWizard();

    await chooseProvider(user, 'Usio');
    await heading('Business details');
    await clickNext(user);

    const field = screen.getByLabelText('Legal business name');

    expect(field).toHaveAccessibleDescription(
      'Legal business name is required',
    );
    expect(field).toHaveFocus();
  });

  it('keeps values after Next and Back', async () => {
    const { user } = renderWizard();

    await chooseProvider(user, 'Usio');
    await heading('Business details');
    await user.type(
      screen.getByLabelText('Legal business name'),
      'Demo Law PLLC',
    );
    await clickNext(user);
    await heading('Review & submit');
    await clickBack(user);
    await heading('Business details');

    expect(screen.getByLabelText('Legal business name')).toHaveValue(
      'Demo Law PLLC',
    );
  });

  it('keeps values after the browser Back button', async () => {
    const { router, user } = renderWizard();

    await chooseProvider(user, 'Usio');
    await heading('Business details');
    await user.type(
      screen.getByLabelText('Legal business name'),
      'Demo Law PLLC',
    );
    await clickNext(user);
    await heading('Review & submit');
    await act(() => router.navigate(-1));

    await heading('Business details');
    expect(screen.getByLabelText('Legal business name')).toHaveValue(
      'Demo Law PLLC',
    );
  });

  it('walks every Dwolla screen in order', async () => {
    const { user } = renderWizard();

    await chooseProvider(user, 'Dwolla');
    await heading('Business details');
    await user.type(
      screen.getByLabelText('Legal business name'),
      'Demo Law PLLC',
    );

    for (const name of [
      'Business controller',
      'Beneficial owners',
      'ID documents',
      'Review & submit',
      'Bank account',
      'Portal',
    ]) {
      await clickNext(user);
      expect(await heading(name)).toBeInTheDocument();
    }

    expect(
      screen.queryByRole('button', { name: 'Next' }),
    ).not.toBeInTheDocument();
  });

  it('sends Configure later straight to Portal and back', async () => {
    const { user } = renderWizard();

    await chooseProvider(user, 'Set up payments later');
    await heading('Portal');
    await clickBack(user);

    expect(await heading(PROVIDER_HEADING)).toBeInTheDocument();
  });

  describe('step indicator', () => {
    const STEP_TEXT = /^Step \d of \d/;

    const walkTo = async (
      user: ReturnType<typeof userEvent.setup>,
      provider: string,
      target: string,
    ) => {
      await chooseProvider(user, provider);
      await heading('Business details');
      await user.type(
        screen.getByLabelText('Legal business name'),
        'Demo Law PLLC',
      );

      const title = () => screen.getByRole('heading', { level: 1 });

      while (title().textContent !== target) {
        const current = title().textContent;

        await clickNext(user);
        await waitFor(() =>
          expect(title()).not.toHaveTextContent(current ?? ''),
        );
      }
    };

    it('is hidden on the provider choice and on Configure later', async () => {
      const { user } = renderWizard();

      await heading(PROVIDER_HEADING);
      expect(screen.queryByText(STEP_TEXT)).not.toBeInTheDocument();

      await chooseProvider(user, 'Set up payments later');
      await heading('Portal');
      expect(screen.queryByText(STEP_TEXT)).not.toBeInTheDocument();
    });

    it.each([
      ['Usio', 'Business details', 'Step 1 of 4: Business details'],
      ['Usio', 'Review & submit', 'Step 2 of 4: Review & submit'],
      ['Dwolla', 'Business controller', 'Step 1 of 5: Business details'],
      ['Dwolla', 'ID documents', 'Step 2 of 5: Ownership & ID'],
      ['Dwolla', 'Portal', 'Step 5 of 5: Portal'],
    ])('%s on %s shows "%s"', async (provider, target, text) => {
      const { user } = renderWizard();

      await walkTo(user, provider, target);

      const step = screen.getByText(text);

      // Read right after the heading that receives focus.
      expect(
        screen
          .getByRole('heading', { level: 1 })
          .compareDocumentPosition(step) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    });
  });

  describe('navigation guard', () => {
    it.each([PATHS.setupBusiness, PATHS.setupReview])(
      'opens %s on the provider choice',
      async (path) => {
        renderWizard(path);

        expect(await heading(PROVIDER_HEADING)).toBeInTheDocument();
      },
    );

    it('starts at the provider choice again on a later visit', async () => {
      const { user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      cleanup();
      renderWizard();

      expect(await heading(PROVIDER_HEADING)).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'Usio' })).not.toBeChecked();
    });

    it('redirects a screen past the furthest one reached', async () => {
      const { router, user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await act(() => router.navigate(PATHS.setupReview));

      expect(await heading('Business details')).toBeInTheDocument();
    });

    it('redirects a screen that is not on the chosen path', async () => {
      const { router, user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await act(() => router.navigate(PATHS.setupBankAccount));

      expect(await heading('Business details')).toBeInTheDocument();
    });

    it('moves one screen per double-click on Next', async () => {
      const { user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await user.type(
        screen.getByLabelText('Legal business name'),
        'Demo Law PLLC',
      );
      await clickNext(user);
      await heading('Review & submit');
      await user.dblClick(screen.getByRole('button', { name: 'Next' }));

      expect(await heading('Agreement')).toBeInTheDocument();
      await vi.advanceTimersByTimeAsync(100);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Agreement',
      );
    });

    it('restarts progress when the provider changes', async () => {
      const { router, user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await user.type(
        screen.getByLabelText('Legal business name'),
        'Demo Law PLLC',
      );
      await clickNext(user);
      await heading('Review & submit');
      await act(() => router.navigate(-1));
      await heading('Business details');
      await act(() => router.navigate(-1));
      await chooseProvider(user, 'Dwolla');
      await heading('Business details');
      await act(() => router.navigate(PATHS.setupOwners));

      expect(await heading('Business details')).toBeInTheDocument();
    });
  });

  describe('start over', () => {
    const toBusinessWithAnswer = async () => {
      const wizard = renderWizard();

      await chooseProvider(wizard.user, 'Usio');
      await heading('Business details');
      await wizard.user.type(
        screen.getByLabelText('Legal business name'),
        'Demo Law PLLC',
      );
      await clickBack(wizard.user);

      return wizard;
    };

    it('asks before clearing answers and can keep them', async () => {
      const { user } = await toBusinessWithAnswer();

      const dialog = await screen.findByRole('alertdialog', {
        name: 'Change payment method?',
      });

      expect(dialog).toHaveAccessibleDescription(
        "Your answers will be cleared and you'll start over.",
      );
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: 'Keep my answers' }),
        ).toHaveFocus(),
      );

      await user.click(screen.getByRole('button', { name: 'Keep my answers' }));

      await waitFor(() =>
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument(),
      );
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Business details',
      );
      expect(screen.getByLabelText('Legal business name')).toHaveValue(
        'Demo Law PLLC',
      );
    });

    it('clears everything on Start over', async () => {
      const { user } = await toBusinessWithAnswer();

      await user.click(
        await screen.findByRole('button', { name: 'Start over' }),
      );

      expect(await heading(PROVIDER_HEADING)).toBeInTheDocument();
      for (const radio of screen.getAllByRole('radio')) {
        expect(radio).not.toBeChecked();
      }

      await clickNext(user);

      expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription(
        'Choose how you want to get paid',
      );
    });

    it('goes straight back when nothing was typed', async () => {
      const { user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await clickBack(user);

      expect(await heading(PROVIDER_HEADING)).toBeInTheDocument();
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });
});
