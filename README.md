# AT Framework for Wizer

## Cypress installation

Make sure NodeJS runtime is installed on your computer. If not, latest installer can be downloaded [here](https://nodejs.org/en/download/). Clone project from Git repository: ```git clone<path to git repository>```. In Terminal (Command Prompt on Windows OS) switch to project folder by typing ```cd </your/project/path>```, then install Cypress via ```npm```: ```npm install cypress --save-dev```.

## Running tests in graphical Cypress UI

Cypress UI can be launched from the comand line interface via ```npm run cy:open:<env>``` command, where ```<env>``` is an appropriate server environment. Aliases for the environment are as follows: ```stg``` for Staging server, ```second``` for Secondary environment, ```prod``` for Production environment and ```dev``` for Dev environment, i.e., for example, to launch Cypress UI for Secondary environment the command would be ```npm run cy:open:second```.

In Cypress UI, tests can be run by clicking on the name of the spec file (e.g. ```login_spec.js```). After this, Cypress will open a browser window and  run all tests from sleected spec file sequentially. Successful tests will be marked by a green checkmark, failed ones will be highlighted in red and will provide details on the error.

## Running tests headlessly

Tests can also be run headlessly, without opening the browser window, by executing command ```npm run cy:run:<env>``` in the command line interface, where ```<env>``` is an appropriate server environment (```stg``` for Staging, ```second``` for Secondary, ```prod``` for Production and ```dev``` for Dev environment). Tests' progress, execution time and summary will be shown in terminal window. For failed tests, Cypress will capture screenshots, which will be located in ```Cypress\screenshots``` in the project folder.
