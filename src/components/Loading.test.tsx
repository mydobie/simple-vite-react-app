import { render, checkAccessibility } from '~/tests/testUtils';

import Loading from './Loading';

describe('Loading icon tests', () => {
  test('Is accessible', async () => {
    const { container } = render(<Loading />);
    await checkAccessibility(container);
  });

  test('Adds default screen reader only text', () => {
    const { container } = render(<Loading />);

    expect(container.querySelector('.sr-only')).toBeInTheDocument();
    expect(container.querySelector('.sr-only')).toHaveTextContent('Loading');
  });

  test('Props change spinner', () => {
    const { container } = render(
      <Loading color='danger' size='10px'>
        We are loading data
      </Loading>,
    );

    expect(container.querySelector('.sr-only')).toBeInTheDocument();
    expect(container.querySelector('.sr-only')).toHaveTextContent(
      'We are loading data',
    );
  });
});
