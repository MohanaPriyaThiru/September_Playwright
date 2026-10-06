import { test, expect, Page } from "@playwright/test";

test("User Facing Loactos", async ({ context }) => {
  const page: Page = await context.newPage();
  // Placeholder
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByPlaceholder("Enter Name").fill("PRIYA");
  console.log(await page.getByPlaceholder("Enter Name").inputValue());

  (await page
    .getByPlaceholder("Enter EMail", { exact: true })
    .fill("priya@gmail.com"),
    console.log(
      await page.getByPlaceholder("Enter EMail", { exact: true }).isEditable(),
    ));

  console.log(await page.locator("#alertBtn").isEditable());

  //   await page.getByPlaceholder("Enter Phone").fill("1234567890");

  //   Label
  await page.getByLabel("Address:").fill("Anna Nagar");
  //   await page.getByLabel("Phone:").fill("1234567890");
  //   await page.waitForTimeout(2000);
  //   //   await page.getByLabel(/Password:/)
  //   await page.getByLabel(/about entering birthday/);
  //   //   ALT TEXT
  //   await page.getByAltText("LetCode").isVisible();
  //   await page.getByAltText("logo image");

  //   await page.getByLabel("Confirm text is readonly").isEditable();

  // getByTitle() node title attribute
});

test("inbuilt loctor", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  );
  await page.getByTitle("Home page link").scrollIntoViewIfNeeded();
  await page.getByTitle("Home page link").click();
  console.log(await page.getByTitle("HyperText Markup Language").textContent());
  // getByText()

  console.log(await page.getByText("This text has a tooltip").innerText());
  await page.getByText("Save").click();

  // getByTestId()
  await page.getByTestId("edit-profile-btn").scrollIntoViewIfNeeded();
  await page.getByTestId("edit-profile-btn").click();
  await page.waitForTimeout(3000);
});

test("getByRole", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  );
  await page.getByRole("button", { name: "Primary Action" }).click();
  await page.getByRole("checkbox", { name: /Accept terms/ }).check();
  await page.getByRole("checkbox", { name: /Accept terms/ }).uncheck();
  await page
    .getByRole("textbox", { name: "Email Address:" })
    .fill("priya@gmail.com");
  // await page.getByRole("textbox", { name: /Field2:/ }).fill("FIELD");
  await page
    .locator("#PageList2")
    // .getByRole("heading", { name: "Pages" })
    .getByRole("link", { name: "Home" })
    .click();
  await page.waitForTimeout(3000);
});

