import LandingPage from '../support/Pages/Landing_Page';

describe('Test landing page', () => {
    const start = new LandingPage();
    
    beforeEach(() => {
        cy.fixture('Errors.json').as('errors');
        cy.fixture('Strings.json').as('strings');
        start.navigate();
    });

    it('Verify all links on page', () => {
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });

    it('Verify error is displayed when non-exisitng class code is entered', function() {
        start.enterClassCode(Cypress.env('credentials').tooShortPasswordTeacher);
        start.classCodeError().should('contain', this.errors.classTokenNotFound);
    });

    it("Verify entering class code redirects to student login page", () => {
        cy.intercept("https://app.wizer.me/learn/searchToken").as("token");
        cy.visit("https://wizer.me");
        start.classCodeInput()        
          .should("be.visible");        
        start.enterClassCode(Cypress.env('classCode'));
        cy.wait("@token");
        start.clickGoButton();
        cy.url().should('eq','https://app.wizer.me/studentSignin?redir=%2FjoinClass%2F' + Cypress.env('classCode') + '&name=Join%20Class:%20test');
      });
})