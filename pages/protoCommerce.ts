import { expect, Page, Locator } from "@playwright/test";

export class ProtoCommerce {
  page: Page;
  protoText: Locator;
  product1: Locator;
  addButton: Locator;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.protoText = page
      .getByRole("link", { name: "ProtoCommerce Home" })
      .or(page.locator('//a[text()="ProtoCommerce Home"]'));
    this.product1 = page.getByText("iphone X");
    this.addButton = page
      .locator(
        '//a[text()="iphone X"]/ancestor::div[@class="card h-100"]/descendant::button',
      )
      .or(page.getByRole("button", { name: "Add " }).first());
    this.checkoutButton = page.getByText(/Checkout/);
  }
  //   resusable methods
  async selectProduct() {
    await expect(this.protoText).toBeVisible();
    const productName = await this.product1.innerText();
    console.log(productName);
    await this.addButton.click();
    await this.checkoutButton.click();
    await this.page.waitForTimeout(3000);
  }
}
