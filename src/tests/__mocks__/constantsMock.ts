export const mockedConstants = {
  APP_NAME: 'myApp',
  APP_VERSION: '1.2.3',
  GIT_SHA: '1234567',
  USE_MOCK: 'false',
  USE_DEMO: 'false',
};

export const constantsMock = jest.mock(
  '../../constants',
  () => mockedConstants,
);
