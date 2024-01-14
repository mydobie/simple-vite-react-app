import constants from '~/constants';

/* ***************** AJAX Finally Helper ***************/
// When set in "mock mode" the application will pause simulating a real ajax call

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

/* ***************** AJAX Finally Helper ***************/
// When set in "mock mode" the application will pause simulating a real ajax call

export const ajaxFinally = async (
  func = () => {},
  timeout = 3000,
): Promise<void> => {
  if (constants.USE_MOCK === 'true') {
    // eslint-disable-next-line no-console
    console.info(
      'Artificially waiting to implement the results of an ajax call. Note: This may cause a "Warning: Can\'t perform a React state update on an unmounted component." error if you navigate too quickly. ',
    );
    await sleep(timeout);
  }

  func();
  return;
};
