import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { ProtoCommerce } from "../pages/protoCommerce";
import data from "../testData/tData.json";

import { myTest } from "../Fixtures/loginFixture";

test("Page Object Model", async ({ page }) => {
  const logObj = new LoginPage(page);
  await logObj.navigate(data.url);
  await logObj.loginMethod(data.username, data.password);
  await logObj.assertLogin("ProtoCommerce");
});

myTest("Homepage", async ({ loggedInPage }) => {
  // const logObj = new LoginPage(page);
  // await logObj.navigate(data.url);
  // await logObj.loginMethod(data.username, data.password);
  const prodObj = new ProtoCommerce(loggedInPage);
  await prodObj.selectProduct();
});
