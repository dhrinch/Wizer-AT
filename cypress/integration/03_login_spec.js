import LoginPage from '../support/Pages/Login_Page';

describe('Test login page', () => {
    const login = new LoginPage();
    
    beforeEach(() => {
        cy.fixture('Errors.json').as('errors');
        cy.fixture('Strings.json').as('strings');
        login.navigate();
    });

    it('Verify all links on page', () => {
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });
    
    it('Verify login button is disabled when no credentials are entered', () => {
        login.loginButton().should('be.disabled');
    });
    
    it('Verify error is displayed if email is in wrong format', function() {
        login.enterEmail(Cypress.env('credentials').invalidEmailFormat);
        login.toggleRememberMe();
        login.errorMessage().should('contain', this.errors.invalidEmailFormat);
        login.loginButton().should('be.disabled');
    });
    
    it('Verify error is displayed if non-existing email is entered', function() {
        cy.enterCredentials(Cypress.env('credentials').nonExistingEmail, 
                            Cypress.env('credentials').correctPassword_nonSSO);
        login.clickLoginButton();
        login.errorMessage().should('contain', this.errors.noSuchUser);
    });

    it('Verify error is displayed if wrong password is entered', function() {
        cy.logIn(Cypress.env('credentials').correctEmail_nonSSO, 
                 Cypress.env('credentials').nonExistingPassword)
        login.errorMessage().should('contain', this.errors.invalidPassword);
    });
    
    it('Verify error is displayed if email is deleted', function() {
        login.enterEmail(Cypress.env('credentials').nonExistingEmail);
        login.toggleRememberMe();
        login.deleteEmail();
        login.toggleRememberMe();
        login.errorMessage().should('contain', this.errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });

    it('Verify Clear Email button is working', function() {
        login.enterEmail(Cypress.env('credentials').nonExistingEmail);
        login.toggleRememberMe();
        login.clickClearEmail();
        login.emailInput().should('be.empty');
        login.toggleRememberMe();
        login.errorMessage().should('contain', this.errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });

    it('Verify error is displayed if password is deleted', function() {
        cy.enterCredentials(Cypress.env('credentials').nonExistingEmail, 
                            Cypress.env('credentials').nonExistingPassword);
        login.toggleRememberMe();
        login.deletePassword();
        login.toggleRememberMe();
        login.errorMessage().should('contain', this.errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });
    
    it('Verify Clear Password button is working', function() {
        cy.enterCredentials(Cypress.env('credentials').nonExistingEmail, 
                            Cypress.env('credentials').nonExistingPassword);
        login.toggleRememberMe();
        login.clickClearPassword();
        login.passwordInput().should('be.empty');
        login.toggleRememberMe();
        login.errorMessage().should('contain', this.errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });

    it('Verify SSO login buttons are visible', function(){
        login.ssoLoginButtons()
            .should('be.visible')
            .should('contain', this.strings.googleSSO)
            .should('contain', this.strings.edmodoSSO)
            .should('contain', this.strings.microsoftSSO);
    });

   it('Verify login with correct credentials', function() {
        cy.logIn(Cypress.env('credentials').correctEmail_nonSSO, 
                 Cypress.env('credentials').correctPassword_nonSSO);
        cy.url().should('eq',Cypress.config('baseUrl')+'/dashboard/community');
    });
});
