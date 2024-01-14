import {
  render,
  screen,
  waitFor,
  checkAccessibility,
  constantsMock,
} from './tests/testUtils';
import { MemoryRouter } from 'react-router';

import AppRoutes from './AppRoutes';
import App from './App';

constantsMock;

describe('App (router) tests', () => {
  test('Is accessible', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    await checkAccessibility(container);
  });

  test('404 is shown for /cannotFindPage', () => {
    render(
      <MemoryRouter initialEntries={['/cannotFindPage']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});

describe('App renders correctly', () => {
  test('App is accessible', async () => {
    const { container } = render(<App />);

    await waitFor(() => expect(screen.getByRole('banner')).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(),
    );

    await checkAccessibility(container);
  });
});
