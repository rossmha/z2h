/// <reference types="cypress" />

describe('Testing Logging In Programmatically',()=>{
    
before('',()=>{
    cy.loginToApplication();
})
    it('verify the app can be logged into programmactically', () => {
        cy.log("Test"); 
        
    });
});