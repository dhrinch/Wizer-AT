import SignupPage from '../Pages/Signup/Signup_Page';

describe('Test signup page', () => {
    const signup = new SignupPage();
    let credentials;
    let errors;
    before(() => {
      cy.fixture('Credentials').then(creds => credentials = creds);
      cy.fixture('Errors').then(err => errors = err);
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
      signup.roleSwitchSubtitle().should('contain', 'Not a teacher?');
      signup.signupButton().should('be.disabled');
    });

    it('Verify SSO login buttons are visible on teacher signup page', () => {
      signup.selectTeacherRole();
      signup.ssoLoginButtons()
        .should('be.visible')
        .should('contain', 'Connect with Google')
        .should('contain', 'Connect with Edmodo')
        .should('contain', 'Connect with Microsoft');
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

    it('Verify all controls are valid and in default state on student signup page', () => {
      signup.selectStudentRole();
      cy.get('a').each(page => {
        cy.request(page.prop('href'))
      });
      signup.roleSwitchSubtitle().should('contain', 'Not a student?');
      signup.signupButton().should('be.disabled');
    });

    it('Verify SSO login buttons are visible on student signup page', () => {
      signup.selectStudentRole();
      signup.ssoLoginButtons()
        .should('be.visible')
        .should('contain', 'Connect with Google')
        .should('contain', 'Connect with Edmodo')
        .should('contain', 'Connect with Microsoft');
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
});