import ForgotPasswordPage from '../support/Pages/ForgotPassword_Page';

describe('Test password recovery page', () => {
    const forgot = new ForgotPasswordPage();
    let credentials;
    let strings;
    let token;
    before(() => {
        cy.fixture('Credentials').then(creds => credentials = creds);
        cy.fixture('Strings').then(str => strings = str);
    });
    beforeEach(() => {
        forgot.navigate();
    });

    it('Verify all links on page', () => {
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });

    it('Verify all links on "Check Your Email" page', () => {
        forgot.enterEmail(credentials.nonExistingEmail);
        forgot.sendButton().click();
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });

    it('Verify "Send" button is disabled when no credentials are entered', () => {
        forgot.sendButton().should('be.disabled');
    });

    it('Verify "Send" button remains disabled if email is in wrong format', () => {
        forgot.enterEmail(credentials.invalidEmailFormat);
        forgot.sendButton().should('be.disabled');
    });

    it('Verify "Clear Email" button is working', () => {
        forgot.enterEmail(credentials.nonExistingEmail);
        forgot.clickClearEmail();
        forgot.emailInput().should('be.empty');
        forgot.sendButton().should('be.disabled');
    });

    it('Verify "Forgot Password" token is being sent when Send button is clicked', () => {
        forgot.enterEmail(credentials.correctEmail_nonSSO);
        cy.intercept('POST', '/forgot').as('forgot');
        forgot.sendButton().click();

        cy.wait('@forgot').then((xhr) => {
            const response = xhr.response.body;
            token = response.token;
            cy.log(response)
                            .its('request.body').should('deep.equal', {
                                email: credentials.correctEmail_nonSSO})
        });
    });
    
    it('Verify "Reset your password" page can be accessed with "Forgot Password" token', () => {
        cy.visit('https://app.wizer.me/reset/'+token);
        forgot.resetPasswordPageTitle().should('contain', strings.resetPasswordPageTitle);
    });
            //token.should('match', ?!([\w-=]{33})[/\w-]{32})
            //cy.log(token);
        
            //.and('match',((?!([\w-=]{33})[/\w-]{32})*/
});