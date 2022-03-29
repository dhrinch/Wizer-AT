# AT Framework for Wizer

## Cypress installation

Clone project locally: ```git clone<path to git repository>```. In Terminal (Command Prompt on Windows OS) switch to project folder by typing ```cd </your/project/path>```, then install Cypress via ```npm```: ```npm install cypress --save-dev```.

Open Cypress UI from command line with command ```npx cypress open``` or ```npm run cy:open```.

Run tests from Cypress UI by clicking on the name of the spec file (e.g. ```login_spec.js```)

Cypress will open a browser window and will run all tests from the spec file sequentially. Successful tests will be marked by a green checkmark, failed ones will be highlighted in red and will provide details on the error.

Tests can also be run headlessly, without opening the browser window, by running command ```npm run cy:run``` in the Command Line interface. Tests'progress and summary will be shown in terminal window. 

