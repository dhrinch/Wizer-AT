export class Utility {
    getURL() {
        let env = Cypress.env('env');
        if(env === "prod")
            return "https://app.wizer.me";
        else if(env === "stg")
            return "https://stgapp.wizer.me";
        else if(env === "second")
            return "https://secondary.wizer.me";
        else if(env === "dev")
            return "https://devapp.wizer.me";
    }
}