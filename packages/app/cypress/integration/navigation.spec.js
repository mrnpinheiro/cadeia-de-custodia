describe('Navigation', () => {
  it('should navigate to the register rep page', () => {
    cy.visit('/');
    
    cy.get('[aria-label="menu"]').click();
    cy.get('[href="/rep/cadastro"]').click();

    cy.url().should('include', '/rep/cadastro');
  });
});
