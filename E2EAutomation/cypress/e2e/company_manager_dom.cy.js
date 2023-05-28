const angular = Cypress.env('app') === 'angular';
const iterations = Cypress.env('iterations');
const domSize = Cypress.env('domSize');

describe('performance test for company manager (dom)', () => {
  Cypress._.times(iterations, () => {
    it(`add/edit/delete ${domSize} elements via buttons`, () => {
      cy.visit(angular ? Cypress.env('angular') : Cypress.env('react'));
      cy.get('input[id="dom_size"]').clear().type(String(domSize));
      cy.get('button[id="dom_add"]').click();
      cy.get('button[id="dom_edit"]').click();
      cy.get('button[id="dom_delete"]').click();
      cy.wait(250);
    });
  });
});