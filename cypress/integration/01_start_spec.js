import LandingPage from '../support/Pages/Landing_Page';

describe('Test landing page', () => {
    const start = new LandingPage();
    let credentials;
    let errors;
    let strings;
    before(() => {
        cy.fixture('Credentials').then(creds => credentials = creds);
        cy.fixture('Errors').then(err => errors = err);
        cy.fixture('Strings').then(str => strings = str);
    });
    beforeEach(() => {
        start.navigate();
    });

    it('Verify all links on page', () => {
        cy.get('a').each(page => {
            cy.request(page.prop('href'))
        });
    });

    it.only('Verify entering class code redirects to student login page',() => {
        start.enterClassCode(credentials.classCode);
        start.clickGoButton();
    })
})