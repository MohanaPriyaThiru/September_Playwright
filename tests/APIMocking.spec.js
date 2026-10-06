import { test, expect } from "@playwright/test";

test("Block Images Only", async ({ page, context }) => {
  await page.route("**/*.{png,jpg,jpeg}", async (route) => {
    route.abort();
  });

  await page.goto("https://www.amazon.in/");

  await page.waitForTimeout(3000);
});

test("gets the json from api and adds a new fruit", async ({ page }) => {
  await page.route("*/**/api/v1/fruits", async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    json.push({ name: "Purushothaman", id: 100 });
    json.push({ name: "prakash", id: 500 });

    json.push({
      name: "Dry Fruits",
      id: 1000,
    });

    await route.fulfill({ response, json });
  });

  // Go to the page
  await page.goto("https://demo.playwright.dev/api-mocking");

  await page.waitForTimeout(3000);

  await expect(page.getByText("Dry Fruits", { exact: true })).toBeVisible();
  await expect(page.getByText("prakash", { exact: true })).toBeVisible();
});

test("Block CSS", async ({ page }) => {
  await page.route(/.css$/, (route) => {
    route.abort();
  });

  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.waitForTimeout(3000);
});

test("Events ", async ({ page }) => {
  // Subscribe to 'request' and 'response' events.
  page.on("request", (request) =>
    console.log(">>", request.method(), request.url()),
  );
  page.on("response", (response) =>
    console.log("<<", response.status(), response.url()),
  );

  await page.goto("https://testautomationpractice.blogspot.com/");
});

test.only("API test", async ({ page }) => {
  await page.route("*/**", async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    json.data.push({
      id: 7,
      email: "spraks199@gmail.com",
      first_name: "Prakash",
      last_name: "S",
    });
    console.log(json);
    await route.fulfill({ response, json });
  });
  await page.goto("https://reqres.in/api/users/");
  await page.waitForTimeout(3000);
});
