const url = Cypress.config('baseUrl');

class ForgotPasswordPage{
    emailInput(){
        return cy.get('input[placeholder="Email"]');
    }

    clearEmailButton() {
        return cy.get('wizer-input[placeholder="Email"]>.mat-focus-indicator');
    }

    sendButton() {
        return cy.get('.wz-btn');
    }

    resetPasswordPageTitle() {
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
        return  cy.get('.button-container')
    }

    navigate() {
        cy.visit(url+'/forgot');
    }
    
    enterEmail(email) {
        this.emailInput()
            .clear()
            .type(email);
    }

    deleteEmail() {
        this.emailInput()
            .clear();
    }

    clickLoginButton() {
        this.loginButton()
            .click();
    }

    clickClearEmail(){
        this.clearEmailButton()
            .click();
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
export default ForgotPasswordPage
