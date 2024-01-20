import { render, checkAccessibility } from '../tests/testUtils';

import Home from './Home';

describe('<Home> Page', () => {
  test(' is accessible', async () => {
    const { container } = render(<Home />);
    await checkAccessibility(container);

    expect(true).toBeTruthy();
  });
});
