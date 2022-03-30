import { Utility } from "../../../support/utility"
const url = new Utility().getURL();
class LoginPage {
    ssoLoginButtons(){
        return cy.get('.external-login');
    }

    GoogleLoginButton(){
        return cy.get('.mat-focus-indicator')
                .find('h4')
                .contains('Connect with Google');
    }

    EdmodoLoginButton(){
        return cy.get('.mat-focus-indicator')
                .find('h4')
                .contains('Connect with Edmodo');
    }

    MicrosoftLoginButton(){
        return cy.get('.mat-focus-indicator')
                .find('h4')
                .contains('Connect with Microsoft');
    }

    emailInput(){
        return cy.get('input[type=email]');
    }

    passwordInput() {
        return cy.get('input[type=password]');
    }

    clearEmailButton() {
        return cy.get('wizer-input[name=username]>.mat-focus-indicator');
    }

    clearPasswordButton() {
        return cy.get('wizer-input[name=password]>.mat-focus-indicator');
    }

    loginButton() {
        return cy.get('.wz-btn');
    }

    rememberMeCheckbox() {
        return cy.get('.remember-me');
    }

    errorMessage() {
        return cy.get('.subtitle');
    }
    
    navigate() {
        cy.visit(url+'/login');
    }

    enterEmail(email) {
        this.emailInput()
            .clear()
            .type(email);
        return this
    }

    deleteEmail() {
        this.emailInput()
            .clear();
        return this
    }

    deletePassword() {
        this.passwordInput()
            .clear();
        return this
    }

    enterPassword(password) {
        this.passwordInput()
            .clear()
            .type(password);
        return this
    }

    toggleRememberMe() {
        this.rememberMeCheckbox()
            .click();
        return this
    }

    clickLoginButton() {
        this.loginButton()
            .click();
        return this
    }

    clickClearEmail(){
        this.clearEmailButton()
            .click();
        return this
    }

    clickClearPassword(){
        this.clearPasswordButton()
            .click();
        return this
    }

    getBaseUrl(){ 
        return url;
    }
}
export default LoginPage
