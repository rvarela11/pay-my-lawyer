import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PATHS } from '@/routes/paths.ts';
import { Home } from '../Home/Home.tsx';
import { Products } from './Products.tsx';

const renderPage = (initialEntry: string) => {
  const router = createMemoryRouter(
    [
      { element: <Home />, path: PATHS.home },
      { element: <Products />, path: PATHS.products },
    ],
    { initialEntries: [initialEntry] },
  );

  render(<RouterProvider router={router} />);

  return { user: userEvent.setup() };
};

describe('Products', () => {
  // jsdom doesn't scroll, so record which element the page scrolls to.
  const scrollIntoView = vi.fn();

  beforeEach(() => {
    Element.prototype.scrollIntoView = scrollIntoView;
  });

  afterEach(() => {
    scrollIntoView.mockReset();
  });

  it('lists each product under its group', () => {
    renderPage(PATHS.products);

    const groups = {
      'Get paid': ['Payment processing', 'Billing and invoicing'],
      'Grow your practice': ['Referral network'],
      'Run your practice': ['Client records', 'Appointment calendar'],
    };

    Object.entries(groups).forEach(([group, products]) => {
      const region = screen.getByRole('region', { name: group });

      expect(
        within(region)
          .getAllByRole('heading', { level: 3 })
          .map(({ textContent }) => textContent),
      ).toEqual(products);
    });
  });

  it('scrolls to the product in the link on load', async () => {
    renderPage(`${PATHS.products}#client-records`);

    await waitFor(() =>
      expect(scrollIntoView.mock.contexts).toEqual([
        screen.getByRole('article', { name: 'Client records' }),
      ]),
    );
  });

  it('opens the product a Home row links to', async () => {
    const { user } = renderPage(PATHS.home);

    await user.click(screen.getByRole('link', { name: /Referral network/ }));

    await waitFor(() =>
      expect(scrollIntoView.mock.contexts).toEqual([
        screen.getByRole('article', { name: 'Referral network' }),
      ]),
    );
  });
});
