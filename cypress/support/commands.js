// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', mandatoryFields => {
    cy.get('[id="firstName"]').as('firstName').should('be.enabled');
    cy.get('@firstName').type(mandatoryFields.name, { delay: 0});
    cy.get('[id="lastName"]').as('lastName').should('be.enabled');
    cy.get('@lastName').type(mandatoryFields.lastName, { delay: 0});
    cy.get('[id="email"]').as('email').should('be.enabled');
    cy.get('@email').type(mandatoryFields.email, { delay: 0});
    cy.get('[id=phone]').as('phone').should('be.enabled');
    cy.get('[id=phone]').as('phone').type('987654321', {delay: 0});
    cy.get('[id="open-text-area"]').as('howCanWeHelpYou').should('be.enabled');
    cy.get('@howCanWeHelpYou').type(mandatoryFields.howCanIHelpYou, { delay: 0});
    cy.contains('button', 'Enviar').as('send').should('be.enabled');
    cy.get('@send').click();
})