const url = Cypress.config('baseUrl');

class ResetPasswordPage{
    pageTitle() {
        return cy.get('.title');
    }

    newPasswordInput() { 
        return cy.get('#input_0');
    }

    repeatPasswordInput() { 
        return cy.get('#input_1');
    }

    newPasswordLengthError() {
        return cy.get('div.error.md-input-message-animation.ng-scope.ng-enter-prepare');
    }

    passwordIsRequiredError(){
        return cy.get('div.error.md-input-message-animation.ng-scope');
    }

    passwordsNotMatchingError() {
        return cy.get('div.error.md-input-message-animation.ng-scope.ng-enter-prepare');
    }

    saveNewPasswordButton() {
        return cy.get('button.md-raised.md-button.md-ink-ripple');
    }

    navigate(token) {
        cy.visit(url+'/reset/'+token);
    }

    enterNewPassword(password) {
        this.newPasswordInput()
            .clear()
            .type(password)
    }

    enterRepeatedPassword(password) {
        this.repeatPasswordInput()
            .clear()
            .type(password)
    }

    clickSaveNewPassword() {
        this.saveNewPasswordButton().click();
    }
}
export default ResetPasswordPage
