/* eslint-disable no-fallthrough */
// NOTE This file allows you to run code that will be run before and after every ajax call

import { ReactElement } from 'react';
import axios from 'axios';

// ** Main component type */
interface Props {
  clearError?: () => void;
  setError?: (error?: string) => void;
  testResponse?: (response: unknown) => void; // this is only used to test SetAxios
  testMode?: boolean; // only used in testing
}

// *** Main component ***
const SetAxios = ({
  clearError = () => {},
  setError = () => {},
  testResponse = () => {},
  testMode = false,
}: Props): ReactElement => {
  SetAxios.setAxiosHeaders();

  axios.interceptors.request.use(
    (config) => {
      // Add code to be run before an ajax call

      clearError();
      return config;
    },
    (error) => (!testMode ? Promise.reject(error) : null),
  );

  axios.interceptors.response.use(
    (response) => {
      // Add code to be run after a successful ajax
      testResponse(response);
      return response;
    },
    (error) => {
      // Add code to be run after a failed ajax call
      if (error.response?.status) {
        switch (error.response?.status) {
          case 401:
          // break;
          case 403:
          // break;
          case 404:
          // break;
          case 500:
          // break;
          default:
            setError(SetAxios.UNKNOWN_ERROR);
        }
      } else {
        setError(SetAxios.UNKNOWN_ERROR);
      }
      return !testMode ? Promise.reject(error) : null;
    },
  );

  return <div />;
};

SetAxios.setAxiosHeaders = (/* token */) => {
  // Set common headers like authorization HERE
  // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

SetAxios.UNKNOWN_ERROR = 'An unknown error has occurred. Please try again.';

export default SetAxios;
