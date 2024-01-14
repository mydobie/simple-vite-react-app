import { render, screen, act, waitFor } from '~/tests/testUtils';
import { MemoryRouter } from 'react-router';
import RedirectPage from './RedirectPage';
import ROUTES from '../AppRouteNames';

jest.useFakeTimers();

const advanceTimersByNTimes = (n = 1, time = 1000) => {
  for (let i = 0; i < n; i++) {
    act(() => {
      jest.advanceTimersByTime(time * 1);
    });
  }
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Redirect Page tests', () => {
  test('User is forwarded to homepage after button click', async () => {
    const { user } = render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>,
    );

    user.click(screen.getByRole('button', { name: 'Go to home page' }));
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.HOME.route);
    });
  });

  test('User is forwarded to homepage after 5 seconds', async () => {
    render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>,
    );

    advanceTimersByNTimes(5);
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.HOME.route);
    });
  });
});
