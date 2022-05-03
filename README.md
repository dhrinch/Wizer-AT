# Test Automation Framework for Wizer

## Cypress installation

Make sure NodeJS runtime is installed on your computer. If not, latest installer can be downloaded [here](https://nodejs.org/en/download/). Clone project from Git repository:
```bash
git clone https://github.com/Wizer-me/Wizerapp-TA.git
```
  In Terminal (Command Prompt on Windows OS) switch to project folder by typing ```cd </your/project/path>```, then install Cypress via npm:
```bash
npm install cypress --save-dev
 ```

In order to run tests on different environments, each having a separate set of credentials or other environment variables, framework makes use of several configuration files (e.g. ```env_dev.json```, ```env_stg.json```). These files only contain baseURL value of the appropriate environment and its environment variable values, listed under ```"env"```, they are extending ```cypress.json``` config file which contains other, more general configurations (such as number of test re-runs, setting to save video recording of the test runs, etc.). 
### PLEASE NOTE:
Cypress [does not support](https://www.cypress.io/blog/2020/06/18/extending-the-cypress-config-file/) ```extends``` syntax for configuration file out of the box, so additional installation is required to enable it. Run the following command in Terminal (Command Prompt on Windows OS) in project folder to install the NPM package enabling recursive config load:
```bash
npm i -D @bahmutov/cypress-extends
```
   
### Additional dependencies for Linux:

Debian / Ubuntu:
```bash
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```
CentOS:
```bash
yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
```
## Running tests in graphical Cypress UI

Cypress UI can be launched from the comand line interface via ```npm run cy:open:<env>``` command, where ```<env>``` is an appropriate server environment. Aliases for the environment are as follows: ```local``` for locally installed environment, ```stg``` for Staging server, ```second``` for Secondary environment, ```prod``` for Production environment and ```dev``` for Dev environment, i.e., for example, to launch Cypress UI for Secondary environment the command would be ```npm run cy:open:second```.

In Cypress UI, tests can be run by clicking on the name of the spec file (e.g. ```login_spec.js```). After this, Cypress will open a browser window and  run all tests from sleected spec file sequentially. Successful tests will be marked by a green checkmark, failed ones will be highlighted in red and will provide details on the error.

It is also possible to run all tests from all specs in headed mode by clicking the ```Run <number of available spec files> inegration specs``` button at the top right.

## Running tests headlessly

Tests can also be run headlessly, without opening the browser window, by executing command ```npm run cy:run:<env>``` in the command line interface, where ```<env>``` is an appropriate server environment (```local``` for locally installed environment, ```stg``` for Staging, ```second``` for Secondary, ```prod``` for Production and ```dev``` for Dev environment). Tests' progress, execution time and summary will be shown in terminal window. For failed tests, Cypress will capture screenshots, which will be located in ```Cypress\screenshots``` in the project folder.

To reduce test flakiness, failing tests will be retried 2 times both in UI and headless modes.
