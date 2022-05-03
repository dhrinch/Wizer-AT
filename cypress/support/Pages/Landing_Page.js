const url = Cypress.config('baseUrl');

class LandingPage {

    classCodeInput(){
        return cy.get('.navigation [placeholder="Class code"]');
    }

    classCodeError(){
        return cy.get('.error');
    }

    classCodeGoButton(){
        return cy.get(".navigation button").contains("Go");
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
