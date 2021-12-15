describe('Add REP', () => {
  it('should create REP', () => {
    cy.visit('/rep/cadastro');

    cy.get('#typeOrigin').click();
    cy.get('ul:first-child>li:first-child').click();
    
    cy.get('#numberOrigin').type('123');
    
    cy.get('#foundation').click();
    cy.get('ul:first-child>li:first-child').click();

    cy.get('#authority').type('123');

    cy.get('#street').type('Rua Jacinto Favoreto');

    cy.get('#number').type('123');

    cy.get('#complement').type('Apto 123');

    cy.get('#district').type('Jardim Lutfalla');

    cy.get('#city').type('São Carlos');

    cy.get('#state').type('São Paulo');

    cy.get('#coordinates').type('lat: -22.0060797; long: -47.8949167');
    
    cy.get('[type="submit"]').click();

    cy.get('ul>li').should('not.to.be.empty');
  });
});
