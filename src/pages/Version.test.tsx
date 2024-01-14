import {
  render,
  checkAccessibility,
  constantsMock,
  mockedConstants,
  screen,
} from '../tests/testUtils';

import Version from './Version';

constantsMock;

describe('<Version> Page', () => {
  test('is is accessible', async () => {
    const { container } = render(<Version />);
    await checkAccessibility(container);

    expect(screen.getByText(mockedConstants.APP_NAME)).toBeInTheDocument();
    expect(screen.getByText(mockedConstants.APP_VERSION)).toBeInTheDocument();
    expect(screen.getByText(mockedConstants.GIT_SHA)).toBeInTheDocument();
  });
});
