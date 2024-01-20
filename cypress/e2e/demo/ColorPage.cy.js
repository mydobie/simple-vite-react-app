describe('Color page', () => {
  const baseURL = `${Cypress.config('baseUrl')}/`;
  beforeEach(() => {
    cy.visit('/color');

    // EXAMPLE: Cypress - Reload page
    // cy.reload(); // reloads the page

    // EXAMPLE: Cypress - Save variables
    cy.findByRole('textbox', {
      name: 'Primary or secondary color',
    }).as('colorInput');
    cy.findByRole('button', { name: 'Go to homepage' }).as('homeButton');
    cy.contains('Please enter a primary or secondary color').as('errorMessage');
    cy.contains('Looks good!').as('successMessage');

    //Clear text input
    cy.get('@colorInput').clear();
  });

  it('Empty value', () => {
    cy.get('@homeButton').should('be.disabled');
    cy.get('@colorInput').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');

    cy.injectAxe();
    cy.checkA11y();
  });

  it('Enter a bad color', () => {
    ['maroon', 'asd'].forEach((color) => {
      cy.get('@colorInput').clear();
      // EXAMPLE: Cypress - type into an input
      cy.get('@colorInput').type(color);
      cy.get('@colorInput').should('have.value', color);
      cy.get('@colorInput').should('have.attr', 'aria-invalid', 'true');
      cy.get('@errorMessage').should('be.visible');
      cy.get('@successMessage').should('not.be.visible');
      cy.get('@homeButton').should('be.disabled');
    });

    cy.injectAxe();
    cy.checkA11y();
  });

  it('Enter a bad color and empty value', () => {
    cy.get('@colorInput').clear();
    cy.get('@colorInput').type('maroon');
    cy.get('@colorInput').should('have.value', 'maroon');
    cy.get('@colorInput').clear();
    cy.get('@colorInput').should('have.value', '');
    cy.get('@homeButton').should('be.disabled');
    cy.get('@colorInput').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');
  });

  it('Enter a good color', () => {
    [
      'red',
      'Red',
      'RED',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
    ].forEach((color) => {
      cy.get('@colorInput').clear();
      cy.get('@colorInput').type(color);

      cy.get('@colorInput').should('have.value', color);
      cy.get('@colorInput').should('have.attr', 'aria-invalid', 'false');
      cy.get('@errorMessage').should('not.be.visible');
      cy.get('@successMessage').should('be.visible');
      cy.get('@homeButton').should('not.be.disabled');
    });
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Entering color in URL is set in the input box', () => {
    cy.visit('/color/red');
    cy.get('@colorInput').should('have.value', 'red');
    cy.get('@colorInput').clear();
    cy.get('@colorInput').should('have.value', '');
    cy.get('@homeButton').should('be.disabled');
    cy.get('@colorInput').should('not.have.attr', 'aria-invalid');
    cy.get('@errorMessage').should('not.be.visible');
    cy.get('@successMessage').should('not.be.visible');
  });

  it('Go to homepage goes to homepage', () => {
    cy.get('@colorInput').type('red');
    cy.get('@homeButton').click();
    cy.url().should('eq', baseURL);
  });
});
