import { test, expect } from "@playwright/test";

test("Api testing", async ({ request }) => {
  const getResponse = await request.get("/booking");
  console.log(getResponse);
  const responseBody = await getResponse.json();
  console.log(responseBody);

  expect(getResponse.status()).toBe(200);
  expect(getResponse.statusText()).toBe("OK");
  expect(getResponse.ok()).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);
  expect(Array.isArray(responseBody)).toBeTruthy();
  //   let item;
  responseBody.forEach((item: object) => {
    expect(item).toEqual({ bookingid: expect.any(Number) });
  });
});

test("post method @post", async ({ request }) => {
  const starttime = Date.now();
  const response = await request.post("/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      firstname: "Mohanapriya",
      lastname: "T",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-10-01",
        checkout: "2026-10-02",
      },
      additionalneeds: "Breakfast",
    },
  });
  const endTime = Date.now();
  const respTime = endTime - starttime;
  const statusCode = response.status();
  console.log(statusCode);
  const statusTextMessage = response.statusText();
  console.log(statusTextMessage);
  //   status code validation

  expect(statusCode).toBe(200);
  expect(statusCode).not.toBe(201);

  // response time valoidation
  expect.soft(respTime).toBeLessThan(2000);
  //   responseBody validation
  const responsePayload = await response.json();
  console.log(responsePayload);
  const bookingId = responsePayload.bookingid;
  console.log(bookingId);
  expect(responsePayload.bookingid).toBeDefined();
  expect(responsePayload.booking.firstname).toBe("Mohanapriya");
  expect(responsePayload.booking.bookingdates.checkin).toBe("2026-10-01");

  expect(typeof responsePayload.booking.firstname).toBe("string");
  expect(typeof responsePayload.booking.totalprice).toBe("number");
  expect(typeof responsePayload.booking.bookingdates).toBe("object");
});

test("AuthMethod", async ({ request }) => {
  const authresponse = await request.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
    headers: { "Content-Type": "application/json" },
  });
  const authresponsePayload = await authresponse.json();
  const token = authresponsePayload.token;
  console.log(token);
});

test("putmethod", async ({ request }) => {
  const postresponse = await request.post("/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      firstname: "Mohanapriya",
      lastname: "T",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-10-01",
        checkout: "2026-10-02",
      },
      additionalneeds: "Breakfast",
    },
  });

  const responsePayload = await postresponse.json();
  console.log(responsePayload);
  const bookingId = responsePayload.bookingid;
  console.log(bookingId);

  // Auth method
  const authresponse = await request.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
    headers: { "Content-Type": "application/json" },
  });
  const authresponsePayload = await authresponse.json();
  const token = authresponsePayload.token;
  console.log(token);

  //   put method

  const response = await request.put(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    },
    data: {
      firstname: "Mohanapriya-Updated",
      lastname: "T",
      totalprice: 1000,
      depositpaid: false,
      bookingdates: {
        checkin: "2026-10-01",
        checkout: "2026-10-02",
      },
      additionalneeds: "Breakfast-updated",
    },
  });
  console.log(response);

  const putPayload = await response.json();
  console.log(putPayload);
});
//  DESCRIBE

test.describe("Put group", async () => {
  test.describe.configure({ mode: "serial" });
  let bookingId: number;
  test("post method @post", async ({ request }) => {
    const starttime = Date.now();
    const response = await request.post("/booking", {
      headers: { "Content-Type": "application/json" },
      data: {
        firstname: "Mohanapriya",
        lastname: "T",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-10-01",
          checkout: "2026-10-02",
        },
        additionalneeds: "Breakfast",
      },
    });
    const endTime = Date.now();
    const respTime = endTime - starttime;
    const statusCode = response.status();
    console.log(statusCode);
    const statusTextMessage = response.statusText();
    console.log(statusTextMessage);
    //   status code validation

    expect(statusCode).toBe(200);
    expect(statusCode).not.toBe(201);

    // response time valoidation
    expect.soft(respTime).toBeLessThan(2000);
    //   responseBody validation
    const responsePayload = await response.json();
    console.log(responsePayload);
    bookingId = responsePayload.bookingid;
    console.log(bookingId);
    expect(responsePayload.bookingid).toBeDefined();
    expect(responsePayload.booking.firstname).toBe("Mohanapriya");
    expect(responsePayload.booking.bookingdates.checkin).toBe("2026-10-01");

    expect(typeof responsePayload.booking.firstname).toBe("string");
    expect(typeof responsePayload.booking.totalprice).toBe("number");
    expect(typeof responsePayload.booking.bookingdates).toBe("object");
  });

  let token: string;
  test("AuthMethod describe", async ({ request }) => {
    const authresponse = await request.post("/auth", {
      data: {
        username: "admin",
        password: "password123",
      },
      headers: { "Content-Type": "application/json" },
    });
    const authresponsePayload = await authresponse.json();
    token = authresponsePayload.token;
    console.log(token);
  });

  test("put", async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      data: {
        firstname: "Mohanapriya-Updated",
        lastname: "T",
        totalprice: 1000,
        depositpaid: false,
        bookingdates: {
          checkin: "2026-10-01",
          checkout: "2026-10-02",
        },
        additionalneeds: "Breakfast-updated",
      },
    });
    console.log(response);

    const putPayload = await response.json();
    console.log(putPayload);
  });
});


