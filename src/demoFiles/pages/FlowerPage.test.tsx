import { render, screen, checkAccessibility } from '~/tests/testUtils';
import { MemoryRouter } from 'react-router';

import ROUTES from '../AppRouteNames';
import AppRoutes from '../AppRoutes';

describe('Flower Page tests', () => {
  test('On page load - the tulips tab is active', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.FLOWERS.route}`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Tulips')).toBeInTheDocument();
    expect(screen.queryByAltText('Daisies')).not.toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(screen.getByRole('tab', { name: 'Tulips' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'Daisies' })).not.toHaveAttribute(
      'aria-selected',
      'true',
    );

    await checkAccessibility(container);
  });

  test('On /tulips route - the tulips tab is active', () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.FLOWERS.route}/tulips`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Tulips')).toBeInTheDocument();
    expect(screen.queryByAltText('Daisies')).not.toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).not.toHaveAttribute('aria-selected', 'true');
  });

  test('On /daisies route - the daisies tab is active', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.FLOWERS.route}/daisies`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.queryByAltText('Tulips')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Daisies')).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).not.toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

    await checkAccessibility(container);
  });
});
