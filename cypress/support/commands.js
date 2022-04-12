/// <reference types="cypress">

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

Cypress.Commands.add('loginToApplication', () => {
  
        const userCredentials = {
            "user": {
                "email": "ted@test.com",
                "password": "ted"
            }
        }
     
        const userToken = {
            "username": "ted",
            "email": "ted@test.com",
            "token": "",
            "bio": null,
            "image": null,
            "effectiveImage": "https://static.productionready.io/images/smiley-cyrus.jpg"
        }
     
        cy.request('POST', 'http://localhost:3000/api/users/login', userCredentials)
            .its('body').then(body => {
                const token = body.user.token
                userToken.token = token
                cy.wrap(userToken.token).as('tokenOnly')
     
                cy.visit('/', {
                    onBeforeLoad(win){
                     win.localStorage.setItem('user', JSON.stringify(userToken))  
                    }
                })
                
                //cy.get('nav').contains('Home').click()
            })    
    });