import { test, expect, request } from "@playwright/test";
test.use({ storageState: "Authjson/auth.json" });
test("ui+api validation", async ({ page, context }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.fill("#email", "trends.06208@gmail.com");
  await page.locator("#password").fill("Trensa@06208");
  await page.click("#login-btn");
  //   await page.context().storageState();
  //   await page.waitForLoadState();
  await page.waitForURL("https://eventhub.rahulshettyacademy.com/");
  await context.storageState({ path: "Authjson/auth.json" });

  const token = await page.localStorage.getItem("eventhub_token");
  console.log(token);

  const apirequest = await request.newContext({
    baseURL: "https://api.eventhub.rahulshettyacademy.com",
    extraHTTPHeaders: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await apirequest.get(
    "/api/events?category=Conference&city=Bangalore&search=summit&page=1&limit=10",
  );
  const body = await response.json();
  console.log(body);
});

test("Mock Restful Booker GET booking", async ({ page, request }) => {
  // Intercept the GET request
  await page.route("**/booking/25", async (route) => {
    // Provide a fake mocked response
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        firstname: "Mohana",
        lastname: "Tester",
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-09-21",
          checkout: "2026-09-25",
        },
        additionalneeds: "Breakfast",
      }),
    });
  });

  // Navigate to a page that triggers the API call
  await page.goto("https://restful-booker.herokuapp.com/apidoc/index.html");
  await page.waitForTimeout(4000);
  // You can now validate UI or client logic that depends on this mocked data
  const response = await request.get("/booking/25");
  console.log(response);
  console.log(await response.json());
  console.log("Mocked booking data loaded successfully!");
});

test("Mock API response", async ({ page }) => {
  await page.route("**/booking/25", async (route) => {
    const mockedData = {
      firstname: "Mohana",
      lastname: "Tester",
      totalprice: 1500,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-09-21",
        checkout: "2026-09-25",
      },
      additionalneeds: "Breakfast",
    };

    console.log("Mocking API response:");

    console.log(mockedData);

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedData),
    });
  });

  const response = await page.evaluate(async () => {
    const response = await fetch(
      "https://restful-booker.herokuapp.com/booking/25",
    );

    return await response.json();
  });
  await page.waitForTimeout(3000);
  console.log("Response received by browser:");
  console.log(response);

  expect(response.firstname).toBe("Mohana");
  expect(response.lastname).toBe("Tester");
  expect(response.totalprice).toBe(1500);
});



