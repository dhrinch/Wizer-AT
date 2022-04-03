import { Utility } from "../../../support/utility"
const url = new Utility().getURL();
class SignupPage {
    logInLink(){
        return cy.get('.auth-text>a');
    }

    roleSelectTeacherButton(){
        return cy.get('.account-types').contains('Teacher');
    }

    roleSelectStudentButton(){
        return cy.get('.account-types').contains('Student');
    }

    roleSwitchLink(){
        return cy.get('.pointer').contains('Change')
    }

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
        return cy.get('input[placeholder=Email]');
    }

    passwordInput() {
        return cy.get('input[placeholder=Password]');
    }

    repeatPasswordInput() {
        return cy.get('input[placeholder="Repeat password"]');
    }

    clearEmailButton() {
        return cy.get('wizer-input[placeholder=Email]>.mat-focus-indicator');
    }

    clearPasswordButton() {
        return cy.get('wizer-input[placeholder=Password]>.mat-focus-indicator');
    }

    clearRepeatPasswordButton() {
        return cy.get('wizer-input[placeholder="Repeat password"]>.mat-focus-indicator');
    }

    errorMessage() {
        return cy.get('.subtitle');
    }

    signupButton() {
        return cy.get('.wz-btn');
    }

    roleSwitchSubtitle() {
        return cy.get('.subtitle.not-sth')
    }

    navigate(env) {
        cy.visit(url+'/signup');
    }

    selectTeacherRole() {
        this.roleSelectTeacherButton()
            .click();
        return this;
    }

    selectStudentRole() {
        this.roleSelectStudentButton()
            .click();
        return this;
    }

    switchRole() {
        this.roleSwitchLink()
            .click();
        return this;
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

    deleteRepeatPassword() {
        this.repeatPasswordInput()
            .clear();
        return this
    }

    enterPassword(password) {
        this.passwordInput()
            .clear()
            .type(password);
        return this
    }

    enterRepeatPassword(password) {
        this.repeatPasswordInput()
            .clear()
            .type(password);
        return this
    }

    switchToLogin(){
        this.logInLink()
            .click();
        return this;
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

    clickClearRepeatPassword(){
        this.clearRepeatPasswordButton()
            .click();
        return this
    }
}
export default SignupPage
