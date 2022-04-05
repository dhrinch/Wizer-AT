import SignupPage from '../support/Pages/Signup/Signup_Page';

describe('Test signup page', () => {
  const signup = new SignupPage();
  let credentials;
  let errors;
  let strings;
  before(() => {
    cy.fixture('Credentials').then(creds => credentials = creds);
    cy.fixture('Errors').then(err => errors = err);
    cy.fixture('Strings').then(str => strings = str);
  });
  beforeEach(() => {
    signup.navigate();
  });

  it('Verify all controls are active and valid on role selection page', () => {
    cy.get('a').each(page => {
      cy.request(page.prop('href'))
    });
    signup.roleSelectTeacherButton().should('not.be.disabled');
    signup.roleSelectStudentButton().should('not.be.disabled');
  });

  it('Verify all controls are valid and in default state on teacher signup page', () => {
    signup.selectTeacherRole();
    cy.get('a').each(page => {
      cy.request(page.prop('href'))
    });
    signup.roleSwitchSubtitle().should('contain', strings.notATeacher);
    signup.signupButton().should('be.disabled');
  });

  it('Verify SSO login buttons are visible on teacher signup page', () => {
    signup.selectTeacherRole();
    signup.ssoLoginButtons()
      .should('be.visible')
      .should('contain', strings.googleSSO)
      .should('contain', strings.edmodoSSO)
      .should('contain', strings.microsoftSSO);
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

  it('Verify error is displayed if email is in wrong format on teacher signup page', () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.invalidEmailFormat);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', errors.invalidEmailFormat);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if email is deleted on teacher page', () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.invalidEmailFormat);
    signup.passwordInput().focus();
    signup.deleteEmail();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Email button is working on teacher page', () => {
    signup.selectTeacherRole();  
    signup.enterEmail(credentials.invalidEmailFormat);
    signup.passwordInput().focus();
    signup.clickClearEmail();
    signup.emailInput().should('be.empty');
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password is deleted on teacher page', () => {
    signup.selectTeacherRole();
    signup.enterPassword(credentials.nonExistingPassword);
    signup.deletePassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Password button is working on teacher page', () => {
    signup.selectTeacherRole();  
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearPassword();
    signup.emailInput().focus();
    signup.passwordInput().should('be.empty');
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if repeated password is deleted on teacher page', () => {
    signup.selectTeacherRole();
    signup.enterPassword(credentials.nonExistingPassword);
    signup.enterRepeatPassword(credentials.nonExistingPassword);
    signup.deleteRepeatPassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Repeated Password button is working on teacher page', () => {
    signup.selectTeacherRole();  
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.nonExistingPassword);
    signup.enterRepeatPassword(credentials.nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearRepeatPassword();
    signup.repeatPasswordInput().should('be.empty');
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password and repeat password strings do not match on teacher page', () => {
    signup.selectTeacherRole();  
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.nonExistingPassword);
    signup.enterRepeatPassword(credentials.nonMatchingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
    signup.enterPassword(credentials.nonMatchingPassword);
    signup.enterRepeatPassword(credentials.nonExistingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed on teacher page if signup email is already in use', () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.emailAlreadyUsed);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', errors.emailAlreadyUsed);
  });

  it("Verify teacher account cannot be created if signup password is too short", () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooShortPasswordTeacher);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', errors.wrongPasswordLengthTeacher);
    signup.enterRepeatPassword(credentials.tooShortPasswordTeacher);
    signup.signupButton().should('be.disabled');
  });

  it("Verify teacher account cannot be created if signup password is too long", () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooLongPassword);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', errors.wrongPasswordLengthTeacher);
    signup.enterRepeatPassword(credentials.tooLongPassword);
    signup.signupButton().should('be.disabled');
  });

  it("Verify Sign Up button on teacher page does not become active after switching focus between input fields if the password is too long", () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooLongPassword);
    signup.enterRepeatPassword(credentials.tooLongPassword);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
    signup.errorMessage().should('contain', errors.wrongPasswordLengthTeacher);
  });

  it("Verify Sign Up button on teacher page does not become active after switching focus between input fields if the password is too short", () => {
    signup.selectTeacherRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooShortPasswordTeacher);
    signup.enterRepeatPassword(credentials.tooShortPasswordTeacher);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
    signup.errorMessage().should('contain', errors.wrongPasswordLengthTeacher);
  });

  it('Verify all controls are valid and in default state on student signup page', () => {
    signup.selectStudentRole();
    cy.get('a').each(page => {
      cy.request(page.prop('href'))
    });
    signup.roleSwitchSubtitle().should('contain', strings.notAStudent);
    signup.signupButton().should('be.disabled');
  });

  it('Verify SSO login buttons are visible on student signup page', () => {
    signup.selectStudentRole();
    signup.ssoLoginButtons()
      .should('be.visible')
      .should('contain', strings.googleSSO)
      .should('contain', strings.edmodoSSO)
      .should('contain', strings.microsoftSSO);
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

  it('Verify error is displayed if email is in wrong format on student signup page', () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.invalidEmailFormat);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', errors.invalidEmailFormat);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if email is deleted on student page', () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.invalidEmailFormat);
    signup.passwordInput().focus();
    signup.deleteEmail();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Email button is working on student page', () => {
    signup.selectStudentRole();  
    signup.enterEmail(credentials.invalidEmailFormat);
    signup.passwordInput().focus();
    signup.clickClearEmail();
    signup.emailInput().should('be.empty');
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password is deleted on student page', () => {
    signup.selectStudentRole();
    signup.enterPassword(credentials.nonExistingPassword);
    signup.deletePassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Password button is working on student page', () => {
    signup.selectStudentRole();  
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearPassword();
    signup.emailInput().focus();
    signup.passwordInput().should('be.empty');
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if repeated password is deleted on student page', () => {
    signup.selectStudentRole();
    signup.enterPassword(credentials.nonExistingPassword);
    signup.enterRepeatPassword(credentials.nonExistingPassword);
    signup.deleteRepeatPassword()
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify Clear Repeated Password button is working on student page', () => {
    signup.selectStudentRole();  
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.nonExistingPassword);
    signup.enterRepeatPassword(credentials.nonExistingPassword);
    signup.emailInput().focus();
    signup.clickClearRepeatPassword();
    signup.repeatPasswordInput().should('be.empty');
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.fieldIsRequired);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed if password and repeat password strings do not match on student page', () => {
    signup.selectStudentRole();  
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.nonExistingPassword);
    signup.enterRepeatPassword(credentials.nonMatchingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
    signup.enterPassword(credentials.nonMatchingPassword);
    signup.enterRepeatPassword(credentials.nonExistingPassword);
    signup.emailInput().focus();
    signup.errorMessage().should('contain', errors.nonMatchingPasswords);
    signup.signupButton().should('be.disabled');
  });

  it('Verify error is displayed on student page if signup email is already in use', () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.emailAlreadyUsed);
    signup.passwordInput().focus();
    signup.errorMessage().should('contain', errors.emailAlreadyUsed);
  });

  it("Verify student account cannot be created if signup password is too short", () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooShortPasswordStudent);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', errors.wrongPasswordLengthStudent);
    signup.enterRepeatPassword(credentials.tooShortPasswordStudent);
    signup.signupButton().should('be.disabled');
  });

  it("Verify student account cannot be created if signup password is too long", () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooLongPassword);
    signup.repeatPasswordInput().focus();
    signup.errorMessage().should('contain', errors.wrongPasswordLengthStudent);
    signup.enterRepeatPassword(credentials.tooLongPassword);
    signup.signupButton().should('be.disabled');
  });

  it("Verify Sign Up button on student page does not become active after switching focus between input fields if the password is too long", () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooLongPassword);
    signup.enterRepeatPassword(credentials.tooLongPassword);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
    signup.errorMessage().should('contain', errors.wrongPasswordLengthTeacher);
  });

  it("Verify Sign Up button on student page does not become active after switching focus between input fields if the password is too short", () => {
    signup.selectStudentRole();
    signup.enterEmail(credentials.nonExistingEmail);
    signup.enterPassword(credentials.tooShortPasswordStudent);
    signup.enterRepeatPassword(credentials.tooShortPasswordStudent);
    signup.passwordInput().focus();
    signup.signupButton().should('be.disabled');
    signup.errorMessage().should('contain', errors.wrongPasswordLengthStudent);
  });
});
