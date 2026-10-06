import { test, chromium, expect } from "@playwright/test";

test("Amazon tab handling", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const mainPage = await context.newPage();
  await mainPage.goto("https://www.amazon.in/");
  await mainPage.getByRole("searchbox").fill("mobiles");
  await mainPage.getByRole("searchbox").press("Enter");

  //   when a new  tab emits from the particular page  ie (page level handling)
  /* const [newPage] = await Promise.all([
    mainPage.waitForEvent("popup"),
    mainPage
      .getByLabel(/iPhone 17 256 GB/)
      .first()
      .click(),
  ]); */
  //   when a new  tab emits from the particular context  ie (context level handling)
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    mainPage
      .getByLabel(/iPhone 17 256 GB/)
      .first()
      .click(),
  ]);
  await newPage.waitForLoadState();
  const price = await newPage
    .locator(".apex-core-price-identifier .a-price-whole")
    .last()
    .innerText();
  await newPage.waitForTimeout(2000);
  expect(price).toBe("99,900");
  await mainPage.bringToFront();
  await mainPage
    .getByRole("link", { name: /filter Free Shipping/ })
    .click();
  await mainPage.waitForTimeout(2000);
  await newPage.bringToFront();
  await newPage.waitForTimeout(2000);
});
