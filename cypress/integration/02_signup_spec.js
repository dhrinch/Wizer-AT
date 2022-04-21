import SignupPage from '../support/Pages/Signup_page';

describe('Test signup page', () => {
  const signup = new SignupPage();
  
  beforeEach(() => {
    cy.fixture('Errors.json').as('errors');
    cy.fixture('Strings.json').as('strings');
    signup.navigate();
  });

  it('Verify all controls are active and valid on role selection page', () => {
    cy.get('a').each(page => {
      cy.request(page.prop('href'))
    });
    signup.roleSelectTeacherButton().should('not.be.disabled');
    signup.roleSelectStudentButton().should('not.be.disabled');
  });

  it('Verify all controls are valid and in default state on teacher signup page', function() {
    signup.selectTeacherRole();
    cy.get('a').each(page => {
      cy.request(page.prop('href'))
    });
    signup.roleSwitchSubtitle().should('contain', this.strings.notATeacher);
    signup.signupButton().should('be.disabled');
  });

  it('Verify SSO login buttons are visible on teacher signup page', function() {
    signup.selectTeacherRole();
    signup.ssoLoginButtons()
      .should('be.visible')
      .should('contain', this.strings.googleSSO)
      .should('contain', this.strings.edmodoSSO)
      .should('contain', this.strings.microsoftSSO);
  });

  it('Verify switching role from teacher', () => {
    signup.selectTeacherRole();
    signup.switchRole();
    signup.roleSelectTeacherButton()
      .should('be.visible')
      .should('not.be.disabled');
    signup.roleSelectStudentButton()
      .should('be.visible')
      .should('not.be.disabled');
  });

  it('Verify error is displayed if email is in wrong format on teacher signup page', function() {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').invalidEmailFormat);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', this.errors.invalidEmailFormat);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if email is deleted on teacher page', function() {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').invalidEmailFormat);
    signup.passwordInput().focus();
    signup.deleteEmail();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Email button is working on teacher page', function() {
    signup.selectTeacherRole();  
    signup.enterEmail(Cypress.env('credentials').invalidEmailFormat);
    signup.passwordInput().focus();
    signup.clickClearEmail();
    signup.emailInput().should('be.empty');
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password is deleted on teacher page', function() {
    signup.selectTeacherRole();
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.deletePassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Password button is working on teacher page', function() {
    signup.selectTeacherRole();  
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearPassword();
    signup.emailInput().focus();
    signup.passwordInput().should('be.empty');
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if repeated password is deleted on teacher page', function() {
    signup.selectTeacherRole();
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonExistingPassword);
    signup.deleteRepeatPassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Repeated Password button is working on teacher page', function() {
    signup.selectTeacherRole();  
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearRepeatPassword();
    signup.repeatPasswordInput().should('be.empty');
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password and repeat password strings do not match on teacher page', function() {
    signup.selectTeacherRole();  
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonMatchingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
    signup.enterPassword(Cypress.env('credentials').nonMatchingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonExistingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed on teacher page if signup email is already in use', function() {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').emailAlreadyUsed);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', this.errors.emailAlreadyUsed);
  });

  it("Verify teacher account cannot be created if signup password is too short", function() {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooShortPasswordTeacher);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', this.errors.wrongPasswordLengthTeacher);
    signup.enterRepeatPassword(Cypress.env('credentials').tooShortPasswordTeacher);
    signup.signupButton().should('be.disabled');
  });

  it("Verify teacher account cannot be created if signup password is too long", function() {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooLongPassword);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', this.errors.wrongPasswordLengthTeacher);
    signup.enterRepeatPassword(Cypress.env('credentials').tooLongPassword);
    signup.signupButton().should('be.disabled');
  });

  it("Verify Sign Up button on teacher page does not become active after switching focus between input fields if the password is too long", () => {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooLongPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').tooLongPassword);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
  });

  it("Verify Sign Up button on teacher page does not become active after switching focus between input fields if the password is too short", () => {
    signup.selectTeacherRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooShortPasswordTeacher);
    signup.enterRepeatPassword(Cypress.env('credentials').tooShortPasswordTeacher);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
  });

  it('Verify all controls are valid and in default state on student signup page', function() {
    signup.selectStudentRole();
    cy.get('a').each(page => {
      cy.request(page.prop('href'))
    });
    signup.roleSwitchSubtitle().should('contain', this.strings.notAStudent);
    signup.signupButton().should('be.disabled');
  });

  it('Verify SSO login buttons are visible on student signup page', function() {
    signup.selectStudentRole();
    signup.ssoLoginButtons()
      .should('be.visible')
      .should('contain', this.strings.googleSSO)
      .should('contain', this.strings.edmodoSSO)
      .should('contain', this.strings.microsoftSSO);
  });

  it('Verify switching role from student', () => {
    signup.selectStudentRole();
    signup.switchRole();
    signup.roleSelectTeacherButton()
      .should('be.visible')
      .should('not.be.disabled');
    signup.roleSelectStudentButton()
      .should('be.visible')
      .should('not.be.disabled');
  });

  it('Verify error is displayed if email is in wrong format on student signup page', function() {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').invalidEmailFormat);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', this.errors.invalidEmailFormat);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if email is deleted on student page', function() {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').invalidEmailFormat);
    signup.passwordInput().focus();
    signup.deleteEmail();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Email button is working on student page', function() {
    signup.selectStudentRole();  
    signup.enterEmail(Cypress.env('credentials').invalidEmailFormat);
    signup.passwordInput().focus();
    signup.clickClearEmail();
    signup.emailInput().should('be.empty');
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password is deleted on student page', function() {
    signup.selectStudentRole();
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.deletePassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Password button is working on student page', function() {
    signup.selectStudentRole();  
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearPassword();
    signup.emailInput().focus();
    signup.passwordInput().should('be.empty');
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if repeated password is deleted on student page', function() {
    signup.selectStudentRole();
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonExistingPassword);
    signup.deleteRepeatPassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Repeated Password button is working on student page', function() {
    signup.selectStudentRole();  
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearRepeatPassword();
    signup.repeatPasswordInput().should('be.empty');
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password and repeat password strings do not match on student page', function() {
    signup.selectStudentRole();  
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').nonExistingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonMatchingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
    signup.enterPassword(Cypress.env('credentials').nonMatchingPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').nonExistingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', this.errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed on student page if signup email is already in use', function() {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').emailAlreadyUsed);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', this.errors.emailAlreadyUsed);
  });

  it("Verify student account cannot be created if signup password is too short", function() {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooShortPasswordStudent);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', this.errors.wrongPasswordLengthStudent);
    signup.enterRepeatPassword(Cypress.env('credentials').tooShortPasswordStudent);
    signup.signupButton().should('be.disabled');
  });

  it("Verify student account cannot be created if signup password is too long", function() {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooLongPassword);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', this.errors.wrongPasswordLengthStudent);
    signup.enterRepeatPassword(Cypress.env('credentials').tooLongPassword);
    signup.signupButton().should('be.disabled');
  });

  it("Verify Sign Up button on student page does not become active after switching focus between input fields if the password is too long", () => {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooLongPassword);
    signup.enterRepeatPassword(Cypress.env('credentials').tooLongPassword);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
  });

  it("Verify Sign Up button on student page does not become active after switching focus between input fields if the password is too short", () => {
    signup.selectStudentRole();
    signup.enterEmail(Cypress.env('credentials').nonExistingEmail);
    signup.enterPassword(Cypress.env('credentials').tooShortPasswordStudent);
    signup.enterRepeatPassword(Cypress.env('credentials').tooShortPasswordStudent);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
  });
});
