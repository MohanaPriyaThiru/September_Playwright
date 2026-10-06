import { test } from "@playwright/test";

test.beforeAll(async () => {
  console.log("RUNNING BEFORE ALL THE TEST");
});
test.beforeEach(async () => {
  console.log("RUNNING BEFORE Each TEST");
});
test.afterEach(async ({ page }, testInfo) => {
  console.log("RUNNING After Each TEST");
  console.log(testInfo.status);
});

test.afterAll(async () => {
  console.log("RUNNING After ALL THE TEST");
});

test("Test1", async ({ page }) => {
  console.log("Test1");
});

test("Test2", async ({ page }) => {
  console.log("Test2");
});

test.fail("Test3", async ({ page }) => {
  console.log("Test3");
});

test("Test4", async ({ page }) => {
  console.log("Test3");
});
