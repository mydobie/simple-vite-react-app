import { render, act, checkAccessibility } from '~/tests/testUtils';
import { MemoryRouter } from 'react-router';
import RedirectPage from './RedirectPage';

// NOTE: The accessibility checks seem to be negatively impacted by
// jest.useFakeTimers();
describe('Redirect Page tests', () => {
  test('Is accessible', async () => {
    const { container } = render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>,
    );
    await act(async () => {
      await checkAccessibility(container);
    });
  });
});
