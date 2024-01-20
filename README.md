# simple-vite-react-app

This file contains boilerplate text for the start of a README.

---

## Description:

CHANGE ME => Brief description of what this application does.

CHANGE ME => [See app in action]()

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm i`
1.  Verify you can check for lint errors => `npm run lint`
1.  Verify you can run the tests => `npm run test`
1.  Verify you can check for security advisories => `npm run npmAudit`
1.  Start dev server using mocked data => `npm run dev:mock`
1.  Verify you can build production files => `npm run build`
1.  Verify you can make tar for deployment => `npm run createTar`

## Versioning

The version of the application is done automatically when merging a pull request into the main branch. Do not increment the version on the package.json file manually. See [Contributing.md](CONTRUBUTING.md) for more information.

## Node

The only requirement is that development system has Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools require a node version listed in the `engines` section of the `package.json` file.

If have an different version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

## Install dependencies

After checking out the project, run `npm i` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`.

This project uses [Husky](https://github.com/typicode/husky) to automatically install Git Hooks that will check for security advisories at commit time. Commits will fail if any dependency has a high or critical security advisory. See the `.husky/pre-commit` file. This means that you cannot commit code until high or critical security advisories are resolved. This was done intentionally because resolving high or critical security advisories is always the highest priority.

## Start the development server

To start the development server with mocked data, run `npm run dev:mock` in a terminal at the root of the project. If you want to run the application making real API calls, run `npm run dev`.

This will start the application in development mode and open the application in a browser.

### Run unit tests

To run the tests, run `npm run test` in a terminal the root of the project.

Test are run in [Jest](https://jestjs.io/docs/en/expect), use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to inspect components, and [jest-axe](https://github.com/nickcolley/jest-axe) to check for accessibility.

### Run end to end tests

The end to end tests are written in Cypress and test a complete user process from start to finish across components. Note all API calls will need to be mocked inside the Cypress tests instead of relaying on the "USE_MOCK" variable.

First start the development server by running `npm run cypress:demo:dev`. In another terminal window, start the Cypress test. Use the `npm run cypress:open` command to open the Cypress UI or use the `npm run cypress:run` command to run Cypress in the terminal window.

#### Snapshot tests

Generally snapshots are not recommended, and should not be used in this application.

### Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/), [Prettier](https://prettier.io/docs/en/install.html), [styleLint](https://stylelint.io/)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

### Build

Normally a tar file with the build (production-ready) files needs to be created so it can be loaded to an artifact repository like Artifactory. To build and create a tar file of the built files run `npm run createTar`

If you want to create the build (production-ready) without creating a tar file, run `npm run build` in a terminal at the root of the project. This will create production-ready files in a `dist` directory.

---

## GitHub actions

This repository uses numerous GitHub actions to run tests, create artifacts, and create tags. Many of these actions will happen automatically, but some of them can be run manually.

The status of any actions can be viewed on the actions page. The action files are located in the `.github/workflows` directory.

### Run tests

All pull requests will have the following tests run:

- Linting
- Check for high or critical security advisories
- Unit tests
- End to end tests
- Check for adequate test coverage (see `utils/testCoverage.js`)
- Verify that the code can be built

If you want to run these tests against another branch, you can do the following at any time:

1. Go to the the actions and select "Test Code".
1. Click "Run workflow" drop down.
1. Choose the branch you want to run the tests against.

If you get a "Workflow does not exist or does not have a workflow_dispatch trigger in this branch" warning, be sure that the `.github/workflows/test_and_build.yml` file exists on the branch.

### Update version, publish artifact, update demo site

When a pull request is merged into the `main` branch, the following is automatically run.

- Linting
- Check for high or critical security advisories
- Unit tests
- Check for adequate test coverage (see `utils/testCoverage.js`)
- Updates version on package.json (see [CONTRIBUTING for more information](CONTRIBUTING.md))
- Creates a release
- Publishes artifact to GitHub
- Updates the demo site on the `gh-pages` branch.

**Note** that these series of actions can take a while. Check the actions page to see if there are any actions still running.

**Note** that you will need to manually update the release text. See [CONTRIBUTING](CONTRIBUTING.md) on what is required for the release text.

---

### Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

---
