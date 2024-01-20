import { render, checkAccessibility } from '~/tests/testUtils';

import Home from './Home';

describe('Home component tests', () => {
  test('Home component is accessible', async () => {
    const { container } = render(<Home />);
    await checkAccessibility(container);
  });
});
