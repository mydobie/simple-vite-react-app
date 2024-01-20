import { render, checkAccessibility } from '../tests/testUtils';

import FourOhFour from './FourOhFour';

describe('<FourOhFour> Page', () => {
  test(' is accessible', async () => {
    const { container } = render(<FourOhFour />);
    await checkAccessibility(container);

    expect(true).toBeTruthy();
  });
});
