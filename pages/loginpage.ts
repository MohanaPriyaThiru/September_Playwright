import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  userNameField: Locator;
  userName: Locator;
  password: Locator;
  admin: Locator;
  termsCheckBox: Locator;
  signInButton: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.userNameField = page.getByLabel("Username:");
    this.userName = page.locator("#username");
    this.password = page.locator('[type="password"]');
    this.admin = page.locator('[value="admin"]');
    this.termsCheckBox = page.locator("#terms");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  // resusable Methods
  async navigate(url: string) {
    await this.page.goto(url);
  }

  async userNameMethod(username: string) {
    const visi = await this.userNameField.isVisible();
    console.log(visi);
    await this.userName.fill(username);
  }

  async loginMethod(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.admin.check();
    await this.termsCheckBox.check();
    await this.signInButton.click();
  }

  async assertLogin(title: string) {
    await expect(this.page).toHaveTitle(title);
  }
}
