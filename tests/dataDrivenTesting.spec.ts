import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import data from "../testData/tData.json";
import dd from "../testData/dd.json";
import { excelReader } from "../utility/excelReader";

const xldata = excelReader();

// for (let d of dd) {
//   test(`Data driven testing ${d.username} and ${d.password}`, async ({
//     page,
//   }) => {
//     const loginobj = new LoginPage(page);
//     await loginobj.navigate(data.url);
//     await loginobj.loginMethod(d.username, d.password);
//     await loginobj.assertLogin("ProtoCommerce");
//   });
// }
// Data driven testing using excel
for (let m of xldata) {
  test(`Data driven  ${m.RSA} and ${m.Password} ${m.Result}`, async ({
    page,
  }) => {
    const loginobj = new LoginPage(page);
    await loginobj.navigate(data.url);
    await loginobj.loginMethod(m.RSA, m.Password);
    await loginobj.assertLogin("ProtoCommerce");
  });
}
