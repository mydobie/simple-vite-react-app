describe('Animal page', () => {
  const baseURL = `${Cypress.config('baseUrl')}/`;

  before(() => {
    cy.visit('/animal');
    cy.injectAxe();
  });

  beforeEach(() => {});

  it('Add animal and name', () => {
    cy.findByLabelText('Animal Type:').should('exist');
    cy.findByLabelText('Animal Name:').should('not.exist');

    // Choose an animal type
    cy.findByLabelText('Animal Type:').select('Dog');
    cy.findByLabelText('Animal Name:').should('exist');
    cy.findByText('Type: Dog').should('be.visible');
    cy.url().should('eq', `${baseURL}animal/Dog`);

    //  Add a name
    cy.findByLabelText('Animal Name:').type('Fido');
    cy.findByRole('button', { name: 'Save name' }).click();

    cy.findByText('Type: Dog').should('be.visible');
    cy.findByText('Name: Fido').should('be.visible');

    cy.findByLabelText('Animal Type:').should('not.exist');
    cy.findByLabelText('Animal Name:').should('not.exist');

    cy.url().should('eq', `${baseURL}animal/Dog/name/Fido`);
  });

  it('Shows correct content when going to /animal/Fish route', () => {
    cy.visit('/animal/Fish');

    cy.findByLabelText('Animal Type:').should('not.exist');
    cy.findByText('Type: Fish').should('be.visible');

    cy.findByLabelText('Animal Name:').should('exist');
  });

  it('Shows correct content when going to /animal/bird/name/tweety', () => {
    cy.visit('/animal/bird/name/tweety');

    cy.findByLabelText('Animal Type:').should('not.exist');
    cy.findByLabelText('Animal Name:').should('not.exist');
    cy.findByText('Type: bird').should('be.visible');
    cy.findByText('Name: tweety').should('be.visible');
  });
});
