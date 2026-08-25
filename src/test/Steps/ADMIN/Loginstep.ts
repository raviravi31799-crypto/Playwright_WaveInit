import { CustomWorld } from './../../world/world';
import{Given,Then,When} from "@cucumber/cucumber";
import { ENV } from "../../utils/envReader";




Given('the user launched the application and chooses admin Login', async function (this:CustomWorld) {
  await this.loginPage.openLoginPage();
  await this.loginPage.selectAdmin();
});

When('the user  enters the valid email and password', async function (this:CustomWorld) {
    await this.loginPage.enterEmail(ENV.VALID_EMAIL);
    await this.loginPage.enterPassword(ENV.VALID_PASSWORD);
});

When('clicks on signin as admin', async function (this:CustomWorld) {
  await this.loginPage.clickSignIn();
});

Then('the user is directed to the dashboard page showing welcome message', async function (this:CustomWorld) {
  await this.loginPage.Welcomemessage();
});

// When('the user enters {string} and {string}', async function (string, string2) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the user receives an {string}', async function (string) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// When('the user fills {string} and {string}', async function (string, string2) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the user should receive an {string}', async function (string) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });