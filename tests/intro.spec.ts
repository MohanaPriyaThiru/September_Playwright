import {
  test,
  chromium,
  firefox,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";

//  fixture --> browser,context,page,request--API
test("Creating first test", async ({ browser, context }) => {
  // const browser: Browser = await firefox.launch(); // browser;
  //   const context: BrowserContext = await browser.newContext(); //context
  const page: Page = await context.newPage(); //page
  //   await page.waitForTimeout(3000);
  await page.goto("https://www.instagram.com/");
  
  // Annootations
});
