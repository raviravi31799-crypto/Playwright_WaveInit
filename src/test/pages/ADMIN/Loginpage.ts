import{Page,expect} from "@playwright/test";
import { BasePage } from "../basepage";
import { HomePage } from "../home.page";
import { ENV } from "../../utils/envReader";


export class LoginPage extends BasePage{
    readonly homePage: HomePage;
        constructor(page:Page){
        super(page);
         this.homePage = new HomePage(page);
}
    // private admin=this.page.locator("//button[span='Admin']");
    // private email=this.page.locator("//input[@id='login-email']");
    // private password=this.page.locator("//input[@id='login-password']");
    // private signin=this.page.locator("//button[@class='auth-submit-btn']");
    private welcometext =this.page.locator("//h1[@class='adb-welcome-title']");
    private errorMessage = this.page.locator("//div[contains(text(),'Invalid email or password')]" );

   
    
    async openLoginPage(): Promise<void> {
    await this.navigateTo(ENV.BASE_URL);
    }


    async selectAdmin() {
        await this.homePage.adminRoleBtn.click();

    }

    async enterEmail(email: string) {
        await this.homePage.emailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.homePage.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.homePage.signInBtn.click();
    }
    async Welcomemessage(){
         const welcomeMessage = await this.welcometext.textContent();
         expect(welcomeMessage).toContain("Welcome");

    }
    async Adminlogin(){
    await this.openLoginPage();
    await this.selectAdmin();
    await this.enterEmail(ENV.VALID_EMAIL);
    await this.enterPassword(ENV.VALID_PASSWORD);
    await this.clickSignIn();
    await this.Welcomemessage();
    }
    async verifyInvalidLoginMessage(errormessage: string) {
        const error = await this.errorMessage.textContent();
          await expect(error).toContain(errormessage);
}
async verifyRequiredFieldMessage(alertmessage: string) {
    const invalidField = this.page.locator("input:invalid").first();

    const actualMessage = await invalidField.evaluate((element: HTMLInputElement) => element.validationMessage);

    expect(actualMessage).toBe(alertmessage);
}

}

