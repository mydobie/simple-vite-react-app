describe('Redirect page tests', () => {
  const baseURL = `${Cypress.config('baseUrl')}/`;
  beforeEach(() => {
    cy.visit('/redirect');
  });
  it('Loads correctly', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it(
    'Automatically redirects to homepage',
    {
      defaultCommandTimeout: 10000,
    },
    () => {
      cy.url().should('eq', baseURL);
    },
  );

  it('Clicking button changes app to homepage', () => {
    cy.findByRole('button', { name: 'Go to home page' }).click();
    cy.url().should('eq', baseURL);
  });

  it('Clicking link changes app to homepage', () => {
    cy.findByRole('link', { name: 'Go to home page' }).click();
    cy.url().should('eq', baseURL);
  });
});
