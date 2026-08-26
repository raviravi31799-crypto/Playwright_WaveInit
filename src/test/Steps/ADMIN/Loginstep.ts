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

When('the user enters {string} and {string}', async function (this:CustomWorld,email, password) {
  await this.loginPage.enterEmail(email);
  await this.loginPage.enterPassword(password);
  await this.loginPage.clickSignIn();
});

Then('the user receives an {string}', async function (this:CustomWorld,errormessage:string) {
  await this.loginPage.verifyInvalidLoginMessage(errormessage);
});

When('the user fills {string} and {string}', async function (this:CustomWorld,email, password) {
 await this.loginPage.enterEmail(email);
 await this.loginPage.enterPassword(password);
 await this.loginPage.clickSignIn();

});

Then('the user should receive an {string}', async function (this:CustomWorld,alertmessage:string) {
  await this.loginPage.verifyRequiredFieldMessage(alertmessage);
});