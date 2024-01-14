import { render, screen, checkAccessibility } from '~/tests/testUtils';

import { MemoryRouter as Router } from 'react-router';
import ReactRouter from 'react-router-dom';
import ColorPage from './ColorPage';

const isValidMessageShowing = (container: HTMLElement) =>
  container.querySelector("[data-testid='validMessage'][data-valid='true']");

const isNotValidMessageShowing = (container: HTMLElement) =>
  container.querySelector(
    "[data-testid='invalidMessage'][data-invalid='true']",
  );

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Sample Color Page component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Component is accessible onload', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});
    const { container } = render(
      <Router>
        <ColorPage />
      </Router>,
    );

    expect(screen.getByRole('textbox')).toBeValid();

    expect(isValidMessageShowing(container)).toBeFalsy();
    expect(isNotValidMessageShowing(container)).toBeFalsy();

    expect(
      screen.getByRole('button', { name: 'Go to homepage' }),
    ).toBeDisabled();

    await checkAccessibility(container);
  });

  test('Component is accessible after invalid color entry', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});

    const { container, user } = render(
      <Router>
        <ColorPage />
      </Router>,
    );

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'notAColor');

    expect(screen.getByRole('textbox')).not.toBeValid();

    expect(isValidMessageShowing(container)).toBeFalsy();
    expect(isNotValidMessageShowing(container)).toBeTruthy();

    expect(
      screen.getByRole('button', { name: 'Go to homepage' }),
    ).toBeDisabled();

    await checkAccessibility(container);
  });

  test('Component is accessible after valid color entry', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});

    const { container, user } = render(
      <Router>
        <ColorPage />
      </Router>,
    );

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'Red');

    expect(screen.getByRole('textbox')).toBeValid();

    expect(isValidMessageShowing(container)).toBeTruthy();
    expect(isNotValidMessageShowing(container)).toBeFalsy();

    expect(
      screen.getByRole('button', { name: 'Go to homepage' }),
    ).toBeEnabled();

    await checkAccessibility(container);
  });

  test('Invalid message is shown after invalid entry in url', () => {
    jest
      .spyOn(ReactRouter, 'useParams')
      .mockReturnValue({ colorName: 'notAColor' });

    const { container } = render(<ColorPage />);

    expect(screen.getByRole('textbox')).not.toBeValid();
    expect(screen.getByRole('textbox')).toHaveValue('notAColor');

    expect(isValidMessageShowing(container)).toBeFalsy();
    expect(isNotValidMessageShowing(container)).toBeTruthy();

    expect(
      screen.getByRole('button', { name: 'Go to homepage' }),
    ).toBeDisabled();
  });

  test('Valid message is shown after valid entry in url', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ colorName: 'RED' });

    const { container } = render(
      <Router>
        <ColorPage />
      </Router>,
    );

    expect(screen.getByRole('textbox')).toBeValid();
    expect(screen.getByRole('textbox')).toHaveValue('RED');

    expect(isValidMessageShowing(container)).toBeTruthy();
    expect(isNotValidMessageShowing(container)).toBeFalsy();

    expect(
      screen.getByRole('button', { name: 'Go to homepage' }),
    ).toBeEnabled();
  });

  // EXAMPLE: A todo/pending test
  test.todo('This is a sample to do test');
});
