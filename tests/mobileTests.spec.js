
import { test, expect } from "@playwright/test";
import { mobileLocators, getProductLocator, getProductLocatorInCart } from "./locators/mobilePageLocators";

test('Verify that user is able to verify the mobile products list.', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(mobileLocators.phonesTab);

  //Verify the number of products located
  const items = page.locator(mobileLocators.phoneModels);
  await expect(items).toHaveCount(7); // waits until count is 7

  //await page.waitForSelector('#tbodyid .card-title a', { timeout: 10000 }); 

  // Locate all product links
  const products = await page.$$(mobileLocators.phoneModels);
  for (const product of products) {
    var productText = await product.textContent();
    console.log(productText);
  }
  const products2 = await page.locator(mobileLocators.phoneModels).allTextContents();
  console.log(products2);

  const mobileModel = "Samsung galaxy s7"
  expect(products2).toContain(mobileModel)

  //Closing the page tab
  await page.close();
});


test('Verify that user is able to add the mobile product into cart.', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(mobileLocators.phonesTab);

  const items = page.locator(mobileLocators.phoneModels);
  await expect(items).toHaveCount(7); // waits until count is 7

  const products2 = await page.locator(mobileLocators.phoneModels).allTextContents();
  console.log(products2);

  const mobileModel = "Samsung galaxy s7"
  expect(products2).toContain(mobileModel)

  const productLocator = getProductLocator(mobileModel);
  await page.click(productLocator);

  await expect(page.locator(mobileLocators.addToCartBtn)).toBeVisible();
  await page.click(mobileLocators.addToCartBtn);

  //Code to click ok in dilog box
  page.once('dialog', dialog => {
    console.log('Alert appeared:', dialog.message());
    dialog.accept();
  });

  await expect(page.locator(mobileLocators.cartLinkOnPageTop)).toBeVisible();
  await page.click(mobileLocators.cartLinkOnPageTop);

  const productLocatorinCart = getProductLocatorInCart(mobileModel);
  await expect(page.locator(productLocatorinCart)).toBeVisible();

  //Closing the page tab
  await page.close();
});