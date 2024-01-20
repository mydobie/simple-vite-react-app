import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import * as child from 'child_process';
import { stringify } from 'querystring';

const commitHash = child.execSync('git rev-parse --short HEAD').toString();

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    APP_NAME: JSON.stringify(process.env.npm_package_name),
    GIT_SHA: JSON.stringify(commitHash),
    USE_DEMO: JSON.stringify(process.env.USE_DEMO),
    USE_MOCK: JSON.stringify(process.env.USE_MOCK),
    USE_HASH: JSON.stringify(process.env.USE_HASH),
  },
});
