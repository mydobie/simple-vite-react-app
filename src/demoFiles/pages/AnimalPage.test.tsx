import {
  render,
  screen,
  fireEvent,
  waitFor,
  checkAccessibility,
} from '~/tests/testUtils';
import { MemoryRouter } from 'react-router';

import ROUTES from '../AppRouteNames';
import AppRoutes from '../AppRoutes';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Animal page tests', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });
  test('Correct content is shown for /animal route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL.route}`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await checkAccessibility(container);

    expect(screen.getByLabelText('Animal Type:')).toBeInTheDocument();
    expect(screen.queryByTestId('displayAnimalType')).not.toBeInTheDocument();
  });

  test('Route /animal/animaltype route is called after selecting a type', async () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL.route}`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Dog' },
    });

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('Dog'));
  });

  test('Correct content is shown for /animal/animaltype route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL.route}/Dog`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await checkAccessibility(container);

    expect(screen.queryByLabelText('Animal Type:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Animal Name:')).toBeInTheDocument();
    expect(screen.getByTestId('displayAnimalType')).toBeInTheDocument();
    expect(screen.getByText('Type: Dog')).toBeInTheDocument();
  });

  test('Route /animal/dog/animalname route is called after typing a name', async () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL.route}/Dog`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Fido' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `Dog/${ROUTES.ANIMAL.params?.ANIMAL_NAME}/Fido`,
      ),
    );
  });

  test('Route is not changed after typing an empty name', async () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL.route}/Dog`]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(0));
  });

  test('Correct content is shown for /animal/dog/animalname route', async () => {
    const { container } = render(
      <MemoryRouter
        initialEntries={[
          `/${ROUTES.ANIMAL.route}/Dog/${ROUTES.ANIMAL.params?.ANIMAL_NAME}/Fido`,
        ]}
      >
        <AppRoutes />
      </MemoryRouter>,
    );

    await checkAccessibility(container);
    expect(screen.queryByLabelText('Animal Type:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Animal Name:')).not.toBeInTheDocument();
    expect(screen.getByText('Type: Dog')).toBeInTheDocument();
    expect(screen.getByText('Name: Fido')).toBeInTheDocument();
  });
});
