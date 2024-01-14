const checkActiveTulip = () => {
  cy.findByText('Cupcake ipsum dolor sit amet lollipop pie cake.', {
    exact: false,
  }).should('be.visible');
  cy.findByAltText('Tulips').should('be.visible');
  cy.findByAltText('Daisies').should('not.exist');

  cy.findByRole('tab', { name: 'Tulips' }).should(
    'have.attr',
    'aria-selected',
    'true',
  );
  cy.findByRole('tab', { name: 'Daisies' }).should(
    'have.attr',
    'aria-selected',
    'false',
  );
};

const checkActiveDaisies = () => {
  cy.findByText('Cupcake ipsum dolor sit amet lollipop pie cake.', {
    exact: false,
  }).should('be.visible');
  cy.findByAltText('Tulips').should('not.exist');
  cy.findByAltText('Daisies').should('be.visible');

  cy.findByRole('tab', { name: 'Tulips' }).should(
    'have.attr',
    'aria-selected',
    'false',
  );
  cy.findByRole('tab', { name: 'Daisies' }).should(
    'have.attr',
    'aria-selected',
    'true',
  );
};

describe('Flowers page', () => {
  const baseURL = `${Cypress.config('baseUrl')}`;

  beforeEach(() => {
    cy.visit('/flowers');
  });

  it('Correct content on /flowers route', () => {
    checkActiveTulip();
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Correct content when click on tabs', () => {
    // Click on Daises tab
    // cy.get('.nav-link').contains('Daisies').click();
    cy.findByRole('tab', { name: 'Daisies' }).click();
    cy.url().should('eq', `${baseURL}/flowers/daisies`);
    checkActiveDaisies();

    // Click on Tulip tab
    cy.findByRole('tab', { name: 'Tulips' }).click();
    cy.url().should('eq', `${baseURL}/flowers/tulips`);
  });

  it('Correct content on /flowers/tulip route', () => {
    cy.visit('/flowers/tulips');
    checkActiveTulip();
  });

  it('Correct content on /flowers/daisy route', () => {
    cy.visit('/flowers/daisies');
    checkActiveDaisies();
  });
});
