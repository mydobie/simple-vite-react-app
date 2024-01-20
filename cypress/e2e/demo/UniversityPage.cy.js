describe('University page', () => {
  before(() => {
    // EXAMPLE: Cypress - mock API call
    cy.intercept('GET', 'http://universities.hipolabs.com/*', {
      fixture: 'universities.json',
    }).as('getUniversities');

    cy.visit('/Universities');

    cy.wait('@getUniversities').its('response.statusCode').should('eq', 200);
  });

  beforeEach(() => {});

  it('Loads correctly', () => {
    cy.findAllByRole('listitem').should('have.length', 4);
    // EXAMPLE: Cypress - check accessibility
    cy.injectAxe();
    cy.checkA11y();
  });
});
