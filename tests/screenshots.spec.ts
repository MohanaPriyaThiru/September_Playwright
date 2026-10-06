import { test, expect } from "@playwright/test";

test("screenshots", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  // visible page screenshot
  await page.screenshot({ path: "visible.png" });
  // full page screenshot
  await page.screenshot({ path: "snaps/fullpage.jpeg", fullPage: true });
  //   element screnshot
  await page
    .getByRole("button", { name: "START" })
    .screenshot({ path: "snaps/button.png" });
});
