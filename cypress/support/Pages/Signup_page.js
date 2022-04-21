const url = Cypress.config('baseUrl');

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

    navigate() {
        cy.visit(url+'/signup');
    }

    selectTeacherRole() {
        this.roleSelectTeacherButton()
            .click();
    }

    selectStudentRole() {
        this.roleSelectStudentButton()
            .click();    
    }

    switchRole() {
        this.roleSwitchLink()
            .click();
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

    deletePassword() {
        this.passwordInput()
            .clear();
    }

    deleteRepeatPassword() {
        this.repeatPasswordInput()
            .clear();
    }

    enterPassword(password) {
        this.passwordInput()
            .clear()
            .type(password);
    }

    enterRepeatPassword(password) {
        this.repeatPasswordInput()
            .clear()
            .type(password);
    }

    switchToLogin(){
        this.logInLink()
            .click();
    }

    clickClearEmail(){
        this.clearEmailButton()
            .click();
    }

    clickClearPassword(){
        this.clearPasswordButton()
            .click();
    }

    clickClearRepeatPassword(){
        this.clearRepeatPasswordButton()
            .click();
    }
}
export default SignupPage
