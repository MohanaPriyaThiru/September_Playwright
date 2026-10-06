import { test, expect } from "@playwright/test";

test("Shadow root Eleents", async ({ page }) => {
  await page.goto("https://selectorshub.com/xpath-practice-page/");
  await page
    .getByPlaceholder("enter name", { exact: true })
    .scrollIntoViewIfNeeded();
  await page.getByPlaceholder("enter name", { exact: true }).fill("priya");
  await page.locator("#pizza").fill("pizza");
  // commebt incl
  //   await page
  //     .getByPlaceholder(
  //       "Does DevTools ctl+f gives always the right count of xpath match?",
  //     )
  // .fill("may be");
  //   await page.locator("#pwd").fill("12346sddsdcsd");
});

test("Frames", async ({ page }) => {
  await page.goto("https://letcode.in/frame");
  await page.frameLocator("#firstFr").locator('[name="fname"]').fill("priya");
  await page.frameLocator("#firstFr").locator('[name="lname"]').fill("Thiru");
  await page
    .frameLocator("#firstFr")
    .frameLocator('[title="Inner Frame"]')
    .locator('[name="email"]')
    .fill("priya@gmail.com");
  await page.waitForTimeout(3000);
});

test("Frames usinf index", async ({ page }) => {
  await page.goto("https://letcode.in/frame");
  const framesRxed = page.frames();
  const count = framesRxed.length;
  console.log(count);
  framesRxed.forEach((f, i) => {
    console.log(`${i} , ${f.url()}`);
  });

  await framesRxed[1].locator('[name="fname"]').fill("priya");
  await framesRxed[1].locator('[name="lname"]').fill("Thiru");
  await framesRxed[5].locator('[name="email"]').fill("priya@gmail.com");
  await page.waitForTimeout(3000);
});
