import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import data from "../testData/tData.json";

type MyFixture = { loggedInPage: Page };

export const myTest = base.extend<MyFixture>({
  loggedInPage: async ({ page }, use) => {
    const logObj = new LoginPage(page);
    await logObj.navigate(data.url);
    await logObj.loginMethod(data.username, data.password);
    await use(page);
  },
});
 