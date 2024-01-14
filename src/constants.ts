export default {
  APP_NAME,
  APP_VERSION,
  GIT_SHA,
  USE_DEMO: USE_DEMO || import.meta.env.VITE_USE_DEMO,
  USE_MOCK: USE_MOCK || import.meta.env.VITE_USE_MOCK,
  USE_HASH: USE_HASH || import.meta.env.VITE_USE_HASH,
};
