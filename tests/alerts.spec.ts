// Alerts ---> popup, browser native based alerts --->cant inspect
//  modern Alerts
// Simple, Confirm, Prompt

// event listener

import { test, expect } from "@playwright/test";

test.setTimeout(120000);
test.use({ actionTimeout: 20000, navigationTimeout: 20000 });

test("Alerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  page.on("dialog", async (a) => {
    console.log(a.type());
    console.log(a.message());
    console.log(a.defaultValue());
    await page.waitForTimeout(2000);
    await a.accept("Spider man");
    // await a.dismiss();
  });
  await page.getByRole("button", { name: "Simple Alert" }).click();
  await page.getByRole("button", { name: "Confirmation Alert" }).click();
  await page.getByRole("button", { name: "Prompt Alert" }).click();
  await page.waitForTimeout(3000);
  await expect(page.locator("#demo")).toContainText(/Spider man/, {
    timeout: 10000,
  });
});

test("modern alert", async ({ page }, testInfo) => {
  // await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("https://sweetalert2.github.io/", { timeout: 40000 });
  await page
    .getByLabel("Show SweetAlert2 success message")
    .click({ force: true });
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "OK" }).click();
  console.log(testInfo.title, testInfo.status);
});

test("     ", async ({ page }) => {
  page.goto("");

  page.on("dialog", async (a) => {
    console.log(a.type());
    console.log(a.message());
    await a.accept();
  });

  page.click("");
});
