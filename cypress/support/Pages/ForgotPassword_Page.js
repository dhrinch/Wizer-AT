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

    clickClearEmail(){
        this.clearEmailButton()
            .click();
    }

    clickSendButton() {
        this.sendButton()
        .click();
    }
}
export default ForgotPasswordPage
