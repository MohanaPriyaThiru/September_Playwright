import { test, expect } from "@playwright/test";

test("Mock GreenKart products API", async ({ page }) => {
  await page.route("**/seleniumPractise/data/products.json", async (route) => {
    console.log("✅ Products API intercepted");

    const mockedProducts = [
      {
        id: 999,
        name: "MOHANA MOCK APPLE",
        price: 999,
        image: "./images/apple.jpg",
        category: "fruits",
      },
    ];

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedProducts),
    });
  });

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

  // Wait until mocked product appears
  await expect(page.getByText("MOHANA MOCK APPLE")).toBeVisible();
});
