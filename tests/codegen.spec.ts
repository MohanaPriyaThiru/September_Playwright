import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://selectorshub.com/xpath-practice-page/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('priya');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('priya@asdfgn');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Enter your company' }).click();
  await expect(page.locator('#content')).toContainText('Dummy Form');
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('priya');
  await expect(page.locator('#content')).toMatchAriaSnapshot(`
    - text: User Email
    - textbox "Email":
      - /placeholder: Enter email
      - text: priya
    - text: Password
    - textbox "Password":
      - /placeholder: Enter Password
      - text: priya@asdfgn
    - text: Company
    - textbox "Enter your company"
    - text: Mobile Number
    - spinbutton "Enter your mobile number"
    - text: Country
    - textbox "Country"
    - button "Submit"
    - textbox "Enter your first crush name":
      - /placeholder: First Crush
    - text: A tool to generate manual test cases automatically TestCase Studio -
    - link "DownLoad Link":
      - /url: https://selectorshub.com/
    - link "SelectorsHub Youtube Channel":
      - /url: https://www.youtube.com/c/SelectorsHub?sub_confirmation=1
    - link "A course with complex scenarios like Shadow DOM, iframe inside shadow root, nested shadow dom inside iframe and a lot more":
      - /url: https://www.udemy.com/course/xpath-css-selector-webdom-selectorshub-testcase-studio/
    - link:
      - /url: https://selectorshub.com/
    - link:
      - /url: https://selectorshub.com/
    `);
  await page.locator('#ohrmList_chkSelectRecord_16').check();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'John.Smith' }).click();
  const page2 = await page2Promise;
  await page.getByRole('cell', { name: 'Admin' }).click();
});