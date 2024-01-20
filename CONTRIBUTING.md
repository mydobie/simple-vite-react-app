# Contributing to the project

## Submitting an issue

All issues should be submitted through the GitHub issue tracker.

## How to commit changes

This application uses a modified version of GitHub flow. All releases must be made from the main branch. The head of the main branch will contain the latest deployable code.

1. Create your own fork of the project.
1. Submit a pull request for any changes into this project's main branch using this naming pattern: `<Issue number>-<description>`
1. Once approved the approvers will squash merge the pull request.
1. After GitHub Actions has finished, approvers will verify that a GitHub release has been created.
1. Approvers will update the release description in GitHub based on the pull request description.

### Versioning

The version in the `package.json` file updates automatically when merged into the `main` branch.

The new version is determined by the pull request merge commit message:

- If the string "BREAKING CHANGE" or "major" is found anywhere in any of the commit messages or descriptions the major version will be incremented.
- If the string "feat" or "minor" is found anywhere in any of the commit messages or descriptions the minor version will be incremented.
- All else, the patch version will be incremented.

See [gh-action-bump-version](https://github.com/phips28/gh-action-bump-version) for more information.

### Releases

It is necessary to update the release description and notes in GitHub after GitHub actions have been run.

Release title should contain the version and a short summary description. For example: `Version 2.1.0 - Accessibility fixes`

The release body contains a description along with lists of items added, removed and modified. For example:

```
This release adds the ability for users to add and upload images.

Additions:
  - New image component (#103)
  - Display error when ajax to get fuzzy bunny information fails(#104)
  - Alternative text on all images (#102)

Removals:
  - Basic.css file as the file was not needed in the project (#103)
  - "How to" text on the select box (#105)

Changes:
  - Updated Readme
```

---

## Testing

There are two types of tests for this application: unit and integration tests. Unit tests are written in Jest and test each component of the application in isolation. Integration tests are written in Cypress and test functionality as a user would. Integration tests commonly test multiple components at the same time. If possible, it is advised to work with a product owner when writing integration tests.

### Unit tests

A test driven development (TDD) should be used when building react components. This means writing a unit test for a component before it is built. This will encourage wider code coverage and reduction on the dependance on snapshot tests.

Private methods or components that are only consumed by other components do not need test directly testing those items. Only testing exported components or methods are necessary.

Tests are written using Jest and React Testing Library and should be saved in the same directory as the file.

If at all possible snapshot tests (where results are compared to a previous run's html) should be avoided.

Because of the nature of the Node, Jest, React, and Redux (if used) environment, a very high level of test coverage (at least 85% lines covered) is expected.

### Integration tests

The focus of integration tests is to test the functionality of the application as a user would, so covering all use cases is important. Tests are written using Cypress and should be saved in the `/cypress/integration` directory.

---

---

---

# Code styling

## TypeScript

TypeScript will be used inside of the `src` folder.

### React functional components only

Class based components should not be used. All react components should be functions and use hooks to maintain state.

## Code formatting

While both Eslint and Prettier enforce strict coding practices, there are numerous code styles that aren't caught by the linters or formatters.

### Typescript

Except for build utility and Cypress testing files, all files should be Typescript.

### Single exported component per file

When writing components, it is important to have only one component exported per file. This avoids having long files.

### Save static variables or functions outside the component

Variables and methods that don't depend on props or state should be saved outside of the component.

### Naming

All files, class names, function/method, and variable names are camel case. Class names and component file names start with a capital letters.

#### Exceptions to naming rules

- GitHub recognized files like README.md, CONTRIBUTING.md, and LICENSE.md. These file names are all capitals.
- "Magic" folders that are used during testing are named starting and ending with "\_\_"
- Global static variables are all caps and snake case.

### If statements

For simple if/else statements use a ternary expression:

```
NOT:
if( myvar === 'foo'){
  myothervar = 'foo';
} else {
  myothervar = 'not foo';
}

YES:
myothervar = myvar === 'foo'? 'foo' : 'not foo';

```

Do not nest ternary expressions.

Always use `{}` after if statements:

```
NOT:
if (myvar === 'foo') myothervar = 'foo';

YES:
if( myvar === 'foo'){
  myothervar = 'foo';
}
```

When ever possible, use a `switch` statement instead of series of if statements.

### Returning early (escape condition)

In a method, call return as soon as possible instead of having an application run through the rest of the code.

```
YES:
if (myvar === null){
  return;
}
...
```

### Use of ternary expressions for react conditional display

```
NOT:
{loading === true && <Loading />}

YES:
{loading === true ? <Loading /> : null}
```

### SCSS

CSS for individual items should be saved inside the component itself using styled-components.

Only application-wide styles should be added to the `src/scss` files

### Do not override linting

Overriding linting rules should be kept to an absolute minimum. Under normal coding situations there isn't a need to make exceptions to the linting rules. If you find yourself doing this, please reconsider what you are doing. All linting overriding statements should be reviewed and approved by the team after careful review

### Use native Javascript array methods instead of loops

Javascript provides a great assortment of [array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). These methods should be used instead of brute force loops:

```
NOT:
const myNewArray = [];
const myOldArray = ['red', 'green', 'blue'];
for (let i = 0; i < myOldArray.length; i++) {
  myNewArray.push(`The color ${myOldArray[i]}`);
}

YES:
const myOldArray = ['red', 'green', 'blue'];
const myNewArray = myOldArray.map((color) => `The color ${color}`);

```

### When possible use async/await promises instead of callbacks

While some modules and coding situations require the use of call backs, when possible use async/await or promises when possible.

```
NO:
const myFunction = (callback) => {
  axios
    .get('myURL')
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      callback(error);
    });
};


YES:
const myFunction = async () => {
  try{
    return await axios.get('myURL')
  }
  catch(error){
    return error
  }
};

```
