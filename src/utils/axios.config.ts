import { Method } from 'axios';
import constants from '~/constants';

/* ************ API CALLS ************* */
export const sampleAPI = {
  method: (): Method => 'get',
  url: (): string =>
    constants.USE_MOCK === 'true'
      ? `/__fixtures__/SAMPLE_FIXTURE.json` // NOTE: `__fixtures__` is the  `/public/__fixtures__` directory.
      : `http://the_real_url_for_the_api.com`,
};
