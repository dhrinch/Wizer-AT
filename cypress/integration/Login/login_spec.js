import LoginPage from '../Pages/Login/Login_Page';

describe('Test login page', () => {
    const login = new LoginPage();
    let credentials;
    let errors;
    let strings;
    before(() => {
      cy.fixture('Credentials').then(creds => credentials = creds);
      cy.fixture('Errors').then(err => errors = err);
      cy.fixture('Strings').then(str => strings = str);
    });
    beforeEach(() => {
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
    
    it('Verify error is displayed if email is in wrong format', () => {
        login.enterEmail(credentials.invalidEmailFormat);
        login.toggleRememberMe();
        login.errorMessage().should('contain', errors.invalidEmailFormat);
        login.loginButton().should('be.disabled');
    });
    
    it('Verify error is displayed if non-existing email is entered', () => {
        cy.enterCredentials(credentials.nonExistingEmail, 
                            credentials.correctPassword_nonSSO);
        login.clickLoginButton();
        login.errorMessage().should('contain', errors.noSuchUser);
    });

    it('Verify error is displayed if wrong password is entered', () => {
        cy.logIn(credentials.correctEmail_nonSSO, 
                credentials.nonExistingPassword)
        login.errorMessage().should('contain', errors.invalidPassword);
    });
    
    it('Verify error is displayed if email is deleted', () => {
        login.enterEmail(credentials.correctEmail_nonSSO);
        login.toggleRememberMe();
        login.deleteEmail();
        login.toggleRememberMe();
        login.errorMessage().should('contain', errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });

    it('Verify Clear Email button is working', () => {
        login.enterEmail(credentials.correctEmail_nonSSO);
        login.toggleRememberMe();
        login.clickClearEmail();
        login.emailInput().should('be.empty');
        login.toggleRememberMe();
        login.errorMessage().should('contain', errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });

    it('Verify error is displayed if password is deleted', () => {
        cy.enterCredentials(credentials.correctEmail_nonSSO, 
                            credentials.correctPassword_nonSSO);
        login.toggleRememberMe();
        login.deletePassword();
        login.toggleRememberMe();
        login.errorMessage().should('contain', errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });
    
    it('Verify Clear Password button is working', () => {
        cy.enterCredentials(credentials.correctEmail_nonSSO, 
                            credentials.correctPassword_nonSSO);
        login.toggleRememberMe();
        login.clickClearPassword();
        login.passwordInput().should('be.empty');
        login.toggleRememberMe();
        login.errorMessage().should('contain', errors.fieldIsRequired);
        login.loginButton().should('be.disabled');
    });

    it('Verify SSO login buttons are visible', () => {
        login.ssoLoginButtons()
            .should('be.visible')
            .should('contain', strings.googleSSO)
            .should('contain', strings.edmodoSSO)
            .should('contain', strings.microsoftSSO);
    });

   it('Verify login with correct credentials', () => {
        cy.logIn(credentials.correctEmail_nonSSO, 
                 credentials.correctPassword_nonSSO);
        cy.url().should('eq',login.getBaseUrl()+'/dashboard/community');
    });
});
