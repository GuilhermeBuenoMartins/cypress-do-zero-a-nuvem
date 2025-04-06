// 12md: Extra exercise 1
Cypress._.times(3, () => {
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('src/privacy.html');
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
        cy.get('h1').should('have.text', 'CAC TAT - Política de Privacidade');
        cy.get('p').should('be.visible').and('not.be.empty');
    });
})