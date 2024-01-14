import { Method } from 'axios';
import constants from '~/constants';

export const universitiesAPI = {
  method: (): Method => 'get',
  url: (): string =>
    constants.USE_MOCK === 'true'
      ? `/__fixtures__/universities.json`
      : `http://universities.hipolabs.com/search?name=minnesota&country=united+states`,
};
