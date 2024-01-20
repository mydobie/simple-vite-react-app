import { axe } from 'jest-axe';
import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
export * from '@testing-library/react';
export * from './__mocks__/constantsMock';

/* *************** CUSTOM HELPERS ******************/
export const checkAccessibility = async (container: HTMLElement) => {
  const results = await axe(container);
  return expect(results).toHaveNoViolations();
};

/* ************* CUSTOM RENDER ******************/

// See https://testing-library.com/docs/react-testing-library/setup/

const user = userEvent.setup();

const CustomWrapper = ({ children }: { children: ReactElement }) => children;

const customRender = (ui: ReactElement, options: RenderOptions = {}) => ({
  ...render(ui, { wrapper: CustomWrapper, ...options }),
  user,
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
