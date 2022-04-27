const url = Cypress.config('baseUrl');

class LandingPage {

    classCodeInput(){
        return cy.get('.navigation > .buttons > .class-code');
    }

    classCodeError(){
        return cy.get('.error');
    }

    classCodeGoButton(){
        return cy.get('button.mat-focus-indicator.wizer-btn.mat-button.mat-button-base');
    }
    
    navigate() {
        cy.visit(url);
    }

    enterClassCode(classCode) {
        this.classCodeInput()
            .type(classCode);
    }

    clickGoButton(){
        this.classCodeGoButton()
            .click();
    }

}
export default LandingPage
