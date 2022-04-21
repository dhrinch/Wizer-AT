import ForgotPasswordPage from '../support/Pages/ForgotPassword_Page';

describe('Test password recovery page', () => {
    const forgot = new ForgotPasswordPage();
    
    let token;
    
    beforeEach(() => {
        cy.fixture('Errors.json').as('errors');
        cy.fixture('Strings.json').as('strings');
        forgot.navigate();
    });

    it('Verify all links on page', () => {
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });

    it('Verify all links on "Check Your Email" page', () => {
        forgot.enterEmail(Cypress.env('credentials').nonExistingEmail);
        forgot.sendButton().click();
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });

    it('Verify "Send" button is disabled when no credentials are entered', () => {
        forgot.sendButton().should('be.disabled');
    });

    it('Verify "Send" button remains disabled if email is in wrong format', () => {
        forgot.enterEmail(Cypress.env('credentials').invalidEmailFormat);
        forgot.sendButton().should('be.disabled');
    });

    it('Verify "Clear Email" button is working', () => {
        forgot.enterEmail(Cypress.env('credentials').nonExistingEmail);
        forgot.clickClearEmail();
        forgot.emailInput().should('be.empty');
        forgot.sendButton().should('be.disabled');
    });

    it('Verify "Forgot Password" token is being sent when Send button is clicked', () => {
        forgot.enterEmail(Cypress.env('credentials').correctEmail_nonSSO);
        cy.intercept('POST', '/forgot').as('forgot');
        forgot.sendButton().click();

        cy.wait('@forgot').then((xhr) => {
            const response = xhr.response.body;
            token = response.token;
            cy.get('@forgot')
                            .its('request.body').should('deep.equal', {
                                email: Cypress.env('credentials').correctEmail_nonSSO
                            })
            cy.get('@forgot')
                            .its('response.body').should('contain', {
                                reset: 'success',
                            })
        });
    });
    
    it('Verify "Reset your password" page can be accessed with "Forgot Password" token', function() {
        cy.visit('https://app.wizer.me/reset/'+token);
        forgot.resetPasswordPageTitle().should('contain', this.strings.resetPasswordPageTitle);
    });

    it('Verify all links on "Reset you password" page', () => {
        cy.visit('https://app.wizer.me/reset/'+token);
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
        forgot.saveNewPasswordButton().should('.be.disabled');
    });

    it('Verify error message is displayed on "Reset your password" page if password is too short', function() {
        cy.visit('https://app.wizer.me/reset/'+token);
        forgot.enterNewPassword(Cypress.env('credentials').tooShortPasswordTeacher);
        forgot.saveNewPasswordButton().should('.be.disabled');
        forgot.newPasswordError().should('contain', this.errors.passwordResetWrongLength);
    });
});