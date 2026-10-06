import { test, expect } from "@playwright/test";

test("webtable handling", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-table/");
  const columnCount = await page
    .locator("table#courses_table thead tr th")
    .count();
  await expect(page.locator("table#courses_table thead tr th")).toHaveCount(6);
  expect(columnCount).toBe(6);
  console.log(columnCount);
  const columnLabel = await page
    .locator("table#courses_table thead tr th")
    .allInnerTexts();
  console.log(columnLabel);

  const columnLabels = await page
    .locator("table#courses_table thead tr")
    .innerText();
  console.log(columnLabels);

  await expect(page.locator("table#courses_table thead tr th")).toHaveText([
    "ID",
    "Course Name",
    "Language",
    "Level",
    "Enrollments",
    "Link",
  ]);

  // Rows

  const rows = page.locator("table#courses_table tbody tr");

  const rowsCount = await rows.count();

  expect(rowsCount).toBeGreaterThan(1);
  expect(rowsCount).toBe(9);

  // to retrive particular cell value
  const partCellValue = await page
    .locator("table#courses_table tbody tr:nth-child(4) td:nth-child(2)")
    .innerText();
  console.log(partCellValue);

  // to retrive particular row
  const rowValue = await page
    .locator("table#courses_table tbody tr:nth-child(4)")
    .innerText();
  console.log(rowValue);

  const rowValue2 = await page
    .locator("table#courses_table tbody tr:nth-child(4) td")
    .allInnerTexts();
  console.log(rowValue2);

  // Playwright inbuild methods
  // using filter hasText
  const targetRow = page
    .getByRole("row")
    .filter({ hasText: "Java for Testers" });
  const rowValueOfJFT = await targetRow.innerText();

  const cellValue = await targetRow
    .getByRole("cell", { name: "Beginner" })
    .innerText();

  console.log(`${cellValue} is present in rowvalues ${rowValueOfJFT}`);

  // using filter has

  const targetRowusinghas = await page
    .getByRole("row")
    .filter({ has: page.getByRole("cell", { name: "Python for Testers" }) });

  const data = await targetRowusinghas.locator("td").nth(4).innerText();
  console.log(data);
});

test("columnHeader", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-table/");
  const table = page.getByRole("table");
  await expect(table).toBeVisible();

  const column = table.getByRole("columnheader");
  const count = await column.count();
  console.log(count);

  await expect(column).toHaveText([
    "ID",
    "Course Name",
    "Language",
    "Level",
    "Enrollments",
    "Link",
  ]);

  const datas = await table.getByRole("cell").allInnerTexts();
  console.log(datas);
});

test("dynamic table ", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");
  const column = await page.getByRole("columnheader").allInnerTexts();
  console.log(column);
  const postionOfDisk = column.indexOf("Disk");

  const targetRow = page.getByRole("row").filter({ hasText: "Chrome" });
  await page.waitForTimeout(2000);
  const Diskvalue = await targetRow
    .getByRole("cell")
    .nth(postionOfDisk)
    .innerText();
  await page.waitForTimeout(2000);

  console.log(Diskvalue);
});


