/// <reference types="cypress" />

describe('Testing an API',()=>{
    beforeEach('login to the app',()=>{
        cy.loginToApplication();
    });//before each

    it('verify correct request and response',()=>{

        //intercept the below request when an article is created and save it as 'postArticle'
        cy.intercept('POST','**/articles').as('postArticle');

        //create an article
        cy.contains('New Article').click();    
        cy.get('[placeholder="Article Title"]').type('Article header');
        cy.get('[placeholder="What\'s this article about?"]').type('Summary of article');
        cy.get('[placeholder="Write your article (in markdown)"]').type('article info goes here');
        cy.get('[placeholder="Enter tags"]').type('ted, test');
        cy.get('button').click();

        //wait for the 'postArticle' request to complete
        cy.wait('@postArticle');

        //get the 'postArticle' request then print the request and response
        cy.get('@postArticle').then(xhr =>{
            cy.log(xhr);
            expect(xhr.response.statusCode).to.equal(200);
            expect(xhr.request.body.article.description).to.equal('Summary of article');
            expect(xhr.request.body.article.body).to.equal('article info goes here');
        });
    });
    
});//describe