const url = Cypress.config('baseUrl');

class ResetPasswordPage{
    pageTitle() {
        return cy.get('.title');
    }

    newPasswordInput() { 
        return cy.get('input[placeholder = "New password"]');
    }

    repeatPasswordInput() { 
        return cy.get('input[placeholder = "Repeat password"]');
    }

    newPasswordError() {
        return cy.get('input[placeholder = "New password"]>.error');
    }

    repeatPasswordError() {
        return cy.get('input[placeholder = "Repeat password"]>.error');
    }

    saveNewPasswordButton() {
        return cy.get('.button-container')
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
