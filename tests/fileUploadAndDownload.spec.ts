import { test, expect } from "@playwright/test";

test("fileUpload", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByRole("button", { name: "Point Me" }).scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Point Me" }).hover();
  await page.waitForTimeout(2000);
  await page.getByRole("link", { name: "Laptops" }).click();

  //   File Upload

  // setInputFiles() -->Single file upload
  const isHidden = await page.locator("#singleFileInput").isHidden();
  console.log(isHidden);
  await page
    .locator("#singleFileInput")
    .setInputFiles("testData/API TESTING QUESTIONS.pdf");
  await page.getByRole("button", { name: "Upload Single File" }).click();
  await expect(page.locator("#singleFileStatus")).toContainText(
    "Single file selected: API TESTING QUESTIONS.pdf",
  );

  // setInputFiles() -->Multiple file upload
  //   await page.pause();

  await page
    .locator("#multipleFilesInput")
    .setInputFiles([
      "testData/API TESTING QUESTIONS.pdf",
      "testData/RestAssured.docx",
    ]);

  await page.getByRole("button", { name: "Upload Multiple Files" }).click();
  await expect(page.locator("#multipleFilesStatus")).toContainText(
    "Multiple files selected:",
  );

  //   Drag and Drop

  await page.dragAndDrop("#draggable", "#droppable");
  await expect(page.locator('//div[@id="droppable"]/p')).toHaveText("Dropped!");
});

test("All files", async ({ page }) => {
  //   await page.pause();
  await page.goto("https://qaplayground.com/practice/file-upload");
  await page
    .getByTestId("fu-single-input")
    .setInputFiles("D:/TESTING NOTES/API TESTING QUESTIONS.pdf");
 
  await expect(page.locator("#result-s01")).toHaveText(
    '"API TESTING QUESTIONS.pdf" selected (6.1 MB)',
  );

  //   File Chooser

  /*   const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.getByTestId("fu-custom-btn").click(),
  ]); */

  // await fileChooser.setFiles("testData/API TESTING QUESTIONS.pdf");
});

// Download
test("file download", async ({ page }) => {
  await page.goto("https://practice-automation.com/file-download/");
  // await page.pause();
  const promiseDownload = page.waitForEvent("download");
  await page.locator('a[href="#"]').click();
  const download = await promiseDownload;

  // const [download] = await Promise.all([
  //   page.waitForEvent("download"),
  //   page.locator('a[href="#"]').click(),
  // ]);

  console.log(download.suggestedFilename());
  download.saveAs("Downloads/autodownload.pdf");
});
