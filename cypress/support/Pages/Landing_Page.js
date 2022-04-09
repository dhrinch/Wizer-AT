import { Utility } from "../utility"
const url = new Utility().getURL();
class LandingPage {

    classCodeInput(){
        return cy.get('.navigation > .buttons > .class-code');
    }

    classCodeGoButton(){
        return cy.get('.navigation > .buttons > .class-code');
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
