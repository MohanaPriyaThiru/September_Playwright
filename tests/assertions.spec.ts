import { test, expect } from "@playwright/test";

test("Assertions  or Validation", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //   Assertion => actual = expect
  //  hard Assetion or assert--> same line execution stop,test failed
  // soft assertion or verify --> same line will not stop execution but test fail
  // test default timeout 30ms
  // assertion deafault timeout 5s

  // expect()

  await expect(page).not.toHaveTitle("Automation Testing");
  await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");

  await expect(
    page.getByRole("heading", { name: /Automation Testing Practice/ }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /Automation Testing Practice/ }),
  ).not.toBeHidden();

  //   DropDown
  // Select tagname ----> selectOption()
  // Non select tag or auto suggesstion

  //   Select Drop
  // 3 ways --> value attribite, vissible text(label), index value

  const countryDropdown = page.getByLabel("Country:");
  await countryDropdown.scrollIntoViewIfNeeded();
  await countryDropdown.selectOption("germany");
  await page.waitForTimeout(1000);
  const value = "        Australia      ".trim();
  await countryDropdown.selectOption({ value: `australia` });
  await page.waitForTimeout(1000);
  await countryDropdown.selectOption({ label: "Japan" });
  await page.waitForTimeout(1000);
  await countryDropdown.selectOption({ label: `${value}` });
  await page.waitForTimeout(2000);
  await countryDropdown.selectOption({ index: 2 });
});

test("single select dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const comboDropDown = page.getByRole("combobox", { name: "Country:" });

  await expect(comboDropDown).toBeVisible();
  const countryOptionsCount = await comboDropDown.locator("option").count();
  console.log(countryOptionsCount);
  await expect(comboDropDown.locator("option")).not.toHaveCount(15); //locator Assertion
  expect(countryOptionsCount).toBe(10); //value based assertions
  const countryNames = await comboDropDown.locator("option").allInnerTexts();
  console.log(countryNames);
  await comboDropDown.selectOption("france");
  const countryName = await comboDropDown
    .locator("option:checked")
    .textContent();
  console.log(countryName);
  const countryNotSelected = await comboDropDown
    .locator("option:not(:checked)")
    .allTextContents();
  console.log(countryNotSelected);
});

test("Multi select dd", async ({ page }) => {
  await page.goto("https://letcode.in/dropdowns");
  const multidd = page.locator("#superheros");
  const allCount = await multidd.locator("option").count();
  await multidd.locator("option").first().waitFor();
  const allOptions = await multidd.locator("option").allTextContents();
  console.log(allCount, allOptions);

  await multidd.selectOption([
    { value: "bt" },
    { label: "Captain Marvel" },
    { index: 8 },
  ]);
  await page.getByText(/You have selected/);

  const val = await page.getByText(/You have selected/).innerText();
  expect(val).toContain("You have selected ");

  await multidd.selectOption([]); //--- unselect;
  await page.waitForTimeout(3000);

  await multidd.selectOption([{ index: 5 }, { index: 10 }, { index: 8 }]);
  await page.waitForTimeout(2000);
  await expect(multidd).toHaveAttribute("multiple");
});

test("Suggestions", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const inputField = page.getByPlaceholder("Type to Select Countries");
  await inputField.pressSequentially("Ind", { delay: 600 });
  await inputField.press("ArrowDown");
  await inputField.press("ArrowDown");
  await page.keyboard.press("Enter");
  // await page.getByRole('status').getByText("India", { exact: true }).click();
  await page
    .locator(".ui-menu-item-wrapper")
    .filter({ hasText: "India" })
    .last()
    .press("Enter");
});

test("Google", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.fill('[name="q"]', "Playwright");
  await page
    .locator('ul[role="listbox"] li[role="presentation"]')
    .first()
    .waitFor();
  const allSuggestions = await page
    .locator('ul[role="listbox"] li[role="presentation"]')
    .allInnerTexts();
  console.log(allSuggestions);
  await page.getByLabel("playwright mcp", { exact: true }).click();
  // await page
  //   .locator('ul[role="listbox"] li[role="presentation"]')
  //   .nth(5)
  //   .click();
});
