import ResetPasswordPage from '../support/Pages/ResetPassword_Page';

describe('Test password reset page', () => {
    const reset = new ResetPasswordPage();
    
    let token = Cypress.env('passwordResetToken');
    
    beforeEach(() => {
        cy.fixture('Errors.json').as('errors');
        cy.fixture('Strings.json').as('strings');
        reset.navigate(token);
    });

    it('Verify all links on "Reset you password" page', () => {
        reset.navigate(token);
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
        reset.saveNewPasswordButton().should('.be.disabled');
    });

    it('Verify error message is displayed on "Reset your password" page if password is too short', function() {
        reset.navigate(token);
        reset.enterNewPassword(Cypress.env('credentials').tooShortPasswordTeacher);
        //reset.saveNewPasswordButton().should('.be.disabled');
        //cy.contains(this.errors.passwordResetWrongLength).should('be.visible');
    });
});