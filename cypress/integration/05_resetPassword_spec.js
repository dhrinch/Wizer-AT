import ResetPasswordPage from '../support/Pages/ResetPassword_Page';

describe('Test password reset page', () => {
    const reset = new ResetPasswordPage();
    
    let token = Cypress.env('passwordResetToken');
    
    before(() => {
        cy.log('NOTE: Tests executed on this page tend to be very flaky - possibly due to the old codebase - and are very likely to fail if run in a spec in headed mode. Try running them in a headless mode or one by one in UI')
        // Block newrelic js outright due to issues with Cypress networking code.
        cy.log("Blocking NewRelic scripts");
        //Will block 
        //  https://js-agent.newrelic.com/nr-spa-1208.js
        cy.intercept(/\.*newrelic.*$/, (req) => {
            console.log("NEW RELIC INTERCEPTED");
            req.reply("console.log('Fake New Relic script loaded');");
        });
    });
    
    beforeEach(() => {
        cy.fixture('Errors.json').as('errors');
        cy.fixture('Strings.json').as('strings');
        reset.navigate(token);
    });

    it('Verify all links on page', () => {
        reset.navigate(token);
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
        reset.saveNewPasswordButton().should('be.disabled');
    });

    it('Verify error message is displayed if new password is too short', function() {
        reset.navigate(token);
        reset.enterNewPassword(Cypress.env('credentials').tooShortPasswordTeacher);
        cy.contains(this.errors.passwordResetWrongLength).should('be.visible');
        reset.saveNewPasswordButton().should('be.disabled');
    });

    it('Verify error message is displayed if new password is deleted', function() {
        reset.navigate(token);
        reset.enterNewPassword(Cypress.env('credentials').tooShortPasswordTeacher);
        reset.newPasswordInput().clear();
        cy.contains(this.errors.passwordIsRequired).should('be.visible');
        reset.saveNewPasswordButton().should('be.disabled');
    });

    it('Verify error message is displayed if passwords do not match', function() {
        reset.navigate(token);
        reset.enterNewPassword(Cypress.env('credentials').tooShortPasswordTeacher);
        reset.enterRepeatedPassword(Cypress.env('credentials').tooShortPasswordStudent);
        cy.contains(this.errors.passwordsDoNotMatch).should('be.visible');
        reset.saveNewPasswordButton().should('be.disabled');
    });
});