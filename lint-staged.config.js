export default {
  'src/**/*.{ts,tsx,js,jsx}': [
    'npx eslint',
    'npx prettier --ignore-path ./.eslintignore --write',
    'npx stylelint --ignore-path ./.eslintignore --config .stylelintrcJS --fix ',
  ],
  'src/**/*.{scss,css}': [
    'npx stylelint --ignore-path ./.eslintignore --fix',
    'npx prettier --ignore-path ./.eslintignore --write',
  ],
  'src/**/*.{md,json,html}': [
    'npx prettier --ignore-path ./.eslintignore --write',
  ],
};
