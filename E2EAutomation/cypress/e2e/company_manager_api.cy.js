const angular = Cypress.env('app') === 'angular';
const iterations = Cypress.env('iterations');
const apiSize = Cypress.env('apiSize');

describe('performance test for company manager (api)', () => {
  Cypress._.times(iterations, () => {
    it(`send bulk request for ${apiSize} elements`, () => {
      cy.visit(angular ? Cypress.env('angular') : Cypress.env('react'));
      cy.get('input[id="dom_size"]').clear().type(String(apiSize));
      cy.get('button[id="api_bulk"]').click();
      cy.wait(500);
    })
  });

  Cypress._.times(iterations, () => {
    it(`send single requests for ${apiSize} elements`, () => {
      cy.visit(angular ? Cypress.env('angular') : Cypress.env('react'));
      cy.get('input[id="dom_size"]').clear().type(String(apiSize));
      cy.get('button[id="api_single"]').click();
      cy.wait(2_500);
    })
  });
});