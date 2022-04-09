import { Utility } from "../utility"
const url = new Utility().getURL();

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
}
export default ForgotPasswordPage
