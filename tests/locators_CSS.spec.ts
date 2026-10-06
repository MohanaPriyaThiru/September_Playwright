import { test, Locator, expect } from "@playwright/test";

test("CSS Selectors practise", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  // USing ID -->#Id attribute's Value
  await page.locator("#user-name").fill("standard_user");
  await page.waitForTimeout(2000);

  //   class -->.class value
  await page.locator(".input_error").nth(1).fill("secret_sauce");
  await page.waitForTimeout(2000);

  //  attri name and value
  await page.locator('[type="submit"]').click();

  await page.waitForTimeout(2000);
});

test("test automation Xpath", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  console.log(
    await page
      .locator('//h1[normalize-space(text())="Automation Testing Practice"]')
      .isVisible(),
  );

  console.log(await page.locator("h1.title").isVisible());
  console.log(await page.locator("h1.title").isHidden());

  await expect(page.locator("h1.title")).toBeVisible();

  // basic xpath
  await page.locator('//input[@id="name"]').fill("priya");
  // xpath using text()
  const heading: Locator = page.locator(
    '//span[text()="For Selenium, Cypress & Playwright"]',
  );
  const headingVisible = await heading.isVisible();

  const headingText = await heading.textContent(); //Hidden Text+visible Text
  console.log(headingVisible, headingText);

  const courseText = page.locator('//a[text()="Udemy Courses"]');
  console.log(await courseText.innerText()); //visible Text

  // await courseText.click();

  // Xpath using Contains()

  console.log(
    await page.locator('//a[contains(text(),"Data Ent")]').innerText(),
  );
  await page.locator('(//input[@class="form-control"])[2]').type("priya@");
  await page.waitForTimeout(2000);
  await page.locator('(//input[@class="form-control"])[2]').clear();
  await page
    .locator('(//input[@class="form-control"])[2]')
    .pressSequentially("gmail.com", { delay: 300 });

  await page
    .locator('(//input[@class="form-control"])[2]')
    .fill("aishu@ymail.com");
  await page.waitForTimeout(3000);
});

test("demo", async ({ page }) => {
  await page
    .locator('//input[@name="email"]')
    .fill("priya@gmail.com", { force: true });
});
