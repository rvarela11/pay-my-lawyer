import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { act } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PATHS } from '../../routes/paths.ts';
import { CREATE_ACCOUNT_SETUP_ROUTE } from './createAccountSetupRoute.tsx';
// The About you screens load on demand. Importing them here loads their code before any test
// runs, so the first test to reach one doesn't wait on that load.
import './screens/providers/dwolla/DwollaAboutScreen/DwollaAboutScreen.tsx';
import './screens/providers/usio/UsioAboutScreen/UsioAboutScreen.tsx';

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

const paste = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  value: string,
) => {
  await user.click(screen.getByLabelText(label));
  await user.paste(value);
};

const choose = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  option: string,
) => {
  await user.click(screen.getByRole('combobox', { name: label }));
  await user.click(await screen.findByRole('option', { name: option }));
};

// Fills every required field on the provider's Business details screen.
const fillBusiness = async (user: ReturnType<typeof userEvent.setup>) => {
  await choose(user, 'Business type', 'PLLC');
  await paste(user, 'Legal business name', 'Demo Law PLLC');
  await paste(user, 'EIN', '123456789');
  await paste(user, 'Address', '1 Main St');
  await paste(user, 'City', 'Austin');
  await choose(user, 'State', 'Texas');
  await paste(user, 'ZIP code', '78701');
  await paste(user, 'Phone', '5551234567');
};

// Types a date as MMDDYYYY into the Date of birth field's sections.
const typeDate = async (
  user: ReturnType<typeof userEvent.setup>,
  value: string,
) => {
  const group = screen.getByRole('group', { name: 'Date of birth' });

  await user.click(within(group).getAllByRole('spinbutton')[0]);
  await user.keyboard(value);
};

// Fills every required field on the provider's About you screen.
const fillAbout = async (user: ReturnType<typeof userEvent.setup>) => {
  await heading('About you');
  await paste(user, 'Email', 'lawyer@example.com');
  await paste(user, 'First name', 'Ana');
  await paste(user, 'Last name', 'Ng');
  await paste(user, 'Job title', 'Owner');
  await paste(user, 'Bar Card number', '12345');
  await paste(user, 'Ownership (%)', '100');
  await typeDate(user, '04281985');
  await paste(user, 'SSN', '123456789');
  await paste(user, 'Home address', '2 Oak St');
  await paste(user, 'City', 'Austin');
  await choose(user, 'State', 'Texas');
  await paste(user, 'ZIP code', '78702');
};

// From Business details, fills both screens and moves past About you.
const passBusinessDetails = async (
  user: ReturnType<typeof userEvent.setup>,
) => {
  await fillBusiness(user);
  await clickNext(user);
  await fillAbout(user);
  await clickNext(user);
};

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

  it('keeps values after Next and Back', async () => {
    const { user } = renderWizard();

    await chooseProvider(user, 'Usio');
    await heading('Business details');
    await fillBusiness(user);
    await clickNext(user);
    await heading('About you');
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
    await fillBusiness(user);
    await clickNext(user);
    await heading('About you');
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
    await fillBusiness(user);
    await clickNext(user);
    await fillAbout(user);

    for (const name of [
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

  describe.each(['Usio', 'Dwolla'])('%s business details', (provider) => {
    const toBusiness = async () => {
      const wizard = renderWizard();

      await chooseProvider(wizard.user, provider);
      await heading('Business details');

      return wizard;
    };

    it('shows no errors before anything is touched', async () => {
      await toBusiness();

      expect(
        screen.queryAllByText(/is required$|^Enter |^Choose |^You must/),
      ).toHaveLength(0);
    });

    it("checks a field when it's left", async () => {
      const { user } = await toBusiness();

      await user.click(screen.getByLabelText('EIN'));
      await user.tab();

      expect(screen.getByLabelText('EIN')).toHaveAccessibleDescription(
        'EIN is required',
      );
    });

    it('clears an error from Next as soon as the field is fixed', async () => {
      const { user } = await toBusiness();

      await clickNext(user);

      expect(
        screen.getByText('Legal business name is required'),
      ).toBeInTheDocument();
      expect(screen.getByText('EIN is required')).toBeInTheDocument();

      await paste(user, 'Legal business name', 'Big Law');

      expect(
        screen.queryByText('Legal business name is required'),
      ).not.toBeInTheDocument();

      await paste(user, 'EIN', '123456789');

      expect(screen.queryByText('EIN is required')).not.toBeInTheDocument();
    });

    it('says a malformed EIN needs 9 digits', async () => {
      const { user } = await toBusiness();

      await paste(user, 'EIN', '12345');
      await user.tab();

      expect(screen.getByLabelText('EIN')).toHaveAccessibleDescription(
        'Enter a 9-digit EIN',
      );
    });

    it('formats the phone and EIN as you type', async () => {
      const { user } = await toBusiness();

      await paste(user, 'Phone', '5551234567');
      await paste(user, 'EIN', '123456789');

      expect(screen.getByLabelText('Phone')).toHaveValue('(555) 123-4567');
      expect(screen.getByLabelText('EIN')).toHaveValue('12-3456789');
    });

    it('keeps the website as typed', async () => {
      const { user } = await toBusiness();

      await paste(user, 'Website (optional)', 'yourfirm.com');
      await user.tab();

      expect(screen.getByLabelText('Website (optional)')).toHaveValue(
        'yourfirm.com',
      );
      expect(
        screen.queryByText('Enter a web address, like https://yourfirm.com'),
      ).not.toBeInTheDocument();
    });

    it('rejects a website that is not http or https', async () => {
      const { user } = await toBusiness();

      await paste(user, 'Website (optional)', 'ftp://files.example.com');
      await user.tab();

      expect(
        screen.getByText('Enter a web address, like https://yourfirm.com'),
      ).toBeInTheDocument();
    });

    it('accepts a ZIP code with spaces around it', async () => {
      const { user } = await toBusiness();

      await paste(user, 'ZIP code', ' 78701 ');
      await user.tab();

      expect(
        screen.queryByText('Enter a 5-digit ZIP code'),
      ).not.toBeInTheDocument();
    });

    it('rejects an invalid website', async () => {
      const { user } = await toBusiness();

      await paste(user, 'Website (optional)', 'not a site');
      await user.tab();

      expect(
        screen.getByLabelText('Website (optional)'),
      ).toHaveAccessibleDescription(
        'Enter a web address, like https://yourfirm.com',
      );
    });

    it('requires a state and starts empty', async () => {
      const { user } = await toBusiness();

      expect(
        screen.getByRole('combobox', { name: 'State' }),
      ).not.toHaveTextContent(/\w/);

      await clickNext(user);

      expect(screen.getByText('State is required')).toBeInTheDocument();
    });

    it('focuses the first invalid field on Next', async () => {
      const { user } = await toBusiness();

      await clickNext(user);

      expect(
        screen.getByRole('combobox', { name: 'Business type' }),
      ).toHaveFocus();
      expect(screen.getByText('Business type is required')).toBeInTheDocument();
    });

    it('labels optional fields and marks nothing with an asterisk', async () => {
      await toBusiness();

      expect(
        screen.getByLabelText('Doing business as (optional)'),
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Address 2 (optional)')).toBeInTheDocument();
      expect(screen.getByLabelText('Website (optional)')).toBeInTheDocument();
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('keeps every answer after Next and Back', async () => {
      const { user } = await toBusiness();

      await fillBusiness(user);
      await clickNext(user);
      await heading('About you');
      await clickBack(user);
      await heading('Business details');

      expect(
        screen.getByRole('combobox', { name: 'Business type' }),
      ).toHaveTextContent('PLLC');
      expect(screen.getByRole('combobox', { name: 'State' })).toHaveTextContent(
        'Texas',
      );
      expect(screen.getByLabelText('EIN')).toHaveValue('12-3456789');
      expect(screen.getByLabelText('ZIP code')).toHaveValue('78701');
    });
  });

  describe.each([
    ['Usio', 'Beneficial owners'],
    ['Dwolla', 'Beneficial owners'],
  ])('%s about you', (provider, nextHeading) => {
    const toAbout = async () => {
      const wizard = renderWizard();

      await chooseProvider(wizard.user, provider);
      await heading('Business details');
      await fillBusiness(wizard.user);
      await clickNext(wizard.user);
      await heading('About you');

      return wizard;
    };

    const dateText = (date: dayjs.Dayjs) => date.format('MMDDYYYY');

    it('requires a Bar Card number', async () => {
      const { user } = await toAbout();

      await user.click(screen.getByLabelText('Bar Card number'));
      await user.tab();

      expect(
        screen.getByLabelText('Bar Card number'),
      ).toHaveAccessibleDescription('Bar Card number is required');
    });

    it('treats a Bar Card number of only spaces as missing', async () => {
      const { user } = await toAbout();

      await paste(user, 'Bar Card number', '   ');
      await user.tab();

      expect(
        screen.getByLabelText('Bar Card number'),
      ).toHaveAccessibleDescription('Bar Card number is required');
    });

    it('explains why it asks', async () => {
      await toAbout();

      expect(
        screen.getByText('We use this to verify your identity.'),
      ).toBeInTheDocument();
    });

    it('starts with an empty date of birth', async () => {
      await toAbout();

      expect(
        screen.getByRole('group', { name: 'Date of birth' }),
      ).toHaveTextContent('MM/DD/YYYY');
    });

    it('shows no date error while the calendar is open', async () => {
      const { user } = await toAbout();

      await user.click(screen.getByRole('button', { name: /choose date/i }));
      await screen.findByRole('dialog');

      expect(
        screen.queryByText('Enter full date of birth'),
      ).not.toBeInTheDocument();
    });

    it('rejects someone under 18', async () => {
      const { user } = await toAbout();

      await typeDate(user, dateText(dayjs().subtract(17, 'year')));
      await user.tab();

      expect(
        await screen.findByText('Must be 18 or older'),
      ).toBeInTheDocument();
    });

    it('accepts someone who turns 18 today', async () => {
      const { user } = await toAbout();

      await typeDate(user, dateText(dayjs().subtract(18, 'year')));
      await user.tab();
      await clickNext(user);

      expect(screen.queryByText('Must be 18 or older')).not.toBeInTheDocument();

      await typeDate(
        user,
        dateText(dayjs().subtract(18, 'year').add(1, 'day')),
      );
      await user.tab();

      expect(
        await screen.findByText('Must be 18 or older'),
      ).toBeInTheDocument();
    });

    it('asks for the full date when only part is typed', async () => {
      const { user } = await toAbout();

      await typeDate(user, '0428');
      await user.tab();

      expect(
        await screen.findByText('Enter full date of birth'),
      ).toBeInTheDocument();
    });

    it('rejects an impossible date', async () => {
      const { user } = await toAbout();

      await typeDate(user, '02311985');
      await user.tab();

      expect(
        await screen.findByText('Enter a real date of birth'),
      ).toBeInTheDocument();
    });

    // A text input masked with CSS, not type='password', so password managers don't treat
    // About you as a login form and fill a saved password into it.
    it('masks the SSN without making it a password field', async () => {
      const { user } = await toAbout();
      const ssn = screen.getByLabelText('SSN');

      expect(ssn).toHaveAttribute('type', 'text');
      expect(ssn).toHaveAttribute('data-masked', 'true');

      await user.click(screen.getByRole('button', { name: 'Show SSN' }));

      expect(ssn).toHaveAttribute('data-masked', 'false');

      await user.click(screen.getByRole('button', { name: 'Hide SSN' }));

      expect(ssn).toHaveAttribute('data-masked', 'true');
    });

    it.each([
      ['123-45-6789', false],
      ['123 45 6789', false],
      ['12345678a', true],
      ['12345678', true],
    ])('checks the SSN %s', async (value, isInvalid) => {
      const { user } = await toAbout();

      await paste(user, 'SSN', value);
      await user.tab();

      expect(screen.queryByText('Enter a 9-digit SSN') !== null).toBe(
        isInvalid,
      );
    });

    it.each([
      ['0', true],
      ['101', true],
      ['1', false],
      ['100', false],
    ])('checks the ownership %s', async (value, isInvalid) => {
      const { user } = await toAbout();

      await paste(user, 'Ownership (%)', value);
      await user.tab();

      expect(
        screen.queryByText('Enter a percentage from 1 to 100') !== null,
      ).toBe(isInvalid);
    });

    it('keeps only digits in Ownership', async () => {
      const { user } = await toAbout();
      const ownership = screen.getByLabelText('Ownership (%)');

      await paste(user, 'Ownership (%)', '50.5%');

      expect(ownership).toHaveValue('505');

      await user.clear(ownership);
      await paste(user, 'Ownership (%)', 'abc40');

      expect(ownership).toHaveValue('40');
    });

    it('does not mention additional owners', async () => {
      await toAbout();

      expect(screen.queryByText(/additional owners/i)).not.toBeInTheDocument();
    });

    it('goes on after a complete screen', async () => {
      const { user } = await toAbout();

      await fillAbout(user);
      await clickNext(user);

      expect(await heading(nextHeading)).toBeInTheDocument();
    });

    it("keeps each provider's answers", async () => {
      const { router, user } = await toAbout();
      const other = provider === 'Usio' ? 'Dwolla' : 'Usio';

      await act(() => router.navigate(-1));
      await heading('Business details');
      await act(() => router.navigate(-1));
      await chooseProvider(user, other);
      await heading('Business details');

      expect(screen.getByLabelText('Legal business name')).toHaveValue('');

      await act(() => router.navigate(-1));
      await chooseProvider(user, provider);
      await heading('Business details');

      expect(screen.getByLabelText('Legal business name')).toHaveValue(
        'Demo Law PLLC',
      );
    });

    it('start over clears every new field', async () => {
      const { user } = await toAbout();

      await fillAbout(user);
      await clickBack(user);
      await heading('Business details');
      await clickBack(user);
      await user.click(
        await screen.findByRole('button', { name: 'Start over' }),
      );
      await chooseProvider(user, provider);
      await heading('Business details');

      expect(screen.getByLabelText('Legal business name')).toHaveValue('');

      await fillBusiness(user);
      await clickNext(user);
      await heading('About you');

      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('SSN')).toHaveValue('');
      expect(
        screen.getByRole('group', { name: 'Date of birth' }),
      ).toHaveTextContent('MM/DD/YYYY');
    });
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

      const title = () => screen.getByRole('heading', { level: 1 });

      while (title().textContent !== target) {
        const current = title().textContent;

        if (current === 'Business details') {
          await fillBusiness(user);
        } else if (current === 'About you') {
          await fillAbout(user);
        }

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
      ['Usio', 'Business details', 'Step 1 of 5: Business details'],
      ['Usio', 'About you', 'Step 1 of 5: Business details'],
      ['Usio', 'Beneficial owners', 'Step 2 of 5: Beneficial owners'],
      ['Usio', 'Review & submit', 'Step 3 of 5: Review & submit'],
      ['Dwolla', 'About you', 'Step 1 of 5: Business details'],
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
    it.each([PATHS.setupUsioBusiness, PATHS.setupReview])(
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

    it("redirects the other provider's screens", async () => {
      const { router, user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await act(() => router.navigate(PATHS.setupDwollaBusiness));

      expect(await heading('Business details')).toBeInTheDocument();
      expect(
        screen.getByText('Step 1 of 5: Business details'),
      ).toBeInTheDocument();
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
      await passBusinessDetails(user);
      await heading('Beneficial owners');
      await user.dblClick(screen.getByRole('button', { name: 'Next' }));

      expect(await heading('Review & submit')).toBeInTheDocument();
      await vi.advanceTimersByTimeAsync(100);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Review & submit',
      );
    });

    it('restarts progress when the provider changes', async () => {
      const { router, user } = renderWizard();

      await chooseProvider(user, 'Usio');
      await heading('Business details');
      await passBusinessDetails(user);
      await heading('Beneficial owners');
      await act(() => router.navigate(-1));
      await heading('About you');
      await act(() => router.navigate(-1));
      await heading('Business details');
      await act(() => router.navigate(-1));
      await chooseProvider(user, 'Dwolla');
      await heading('Business details');
      await act(() => router.navigate(PATHS.setupDwollaOwners));

      expect(await heading('Business details')).toBeInTheDocument();
    });
  });

  describe('start over', () => {
    const toBusinessWithAnswer = async () => {
      const wizard = renderWizard();

      await chooseProvider(wizard.user, 'Usio');
      await heading('Business details');
      await fillBusiness(wizard.user);
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

    it.each(['Usio', 'Dwolla'])(
      'goes straight back from %s when nothing was typed',
      async (provider) => {
        const { user } = renderWizard();

        await chooseProvider(user, provider);
        await heading('Business details');
        await clickBack(user);

        expect(await heading(PROVIDER_HEADING)).toBeInTheDocument();
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
      },
    );
  });
});
