describe('Sample Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Is accessible', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Check version', () => {
    cy.contains('Version').click();
    cy.get('[data-cy="app-name"]').should('not.be.empty');
    cy.get('[data-cy="app-version"]').should('not.be.empty');
  });
});
