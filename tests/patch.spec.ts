import { test, expect } from "@playwright/test";

test.describe("Patch group", async () => {
  test.describe.configure({ mode: "serial" });
  let bookingId: number;
  test("Patch method @patch", async ({ request }) => {
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

  test("patch", async ({ request }) => {
    const response = await request.patch(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      data: {
        lastname: "Thiruvengadam",
        bookingdates: {
          checkin: "2026-10-06",
          checkout: "2026-10-07",
        },
      },
    });
    console.log(response);

    const putPayload = await response.json();
    console.log(putPayload);
  });
});
