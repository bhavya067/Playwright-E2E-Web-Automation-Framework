
import { test, expect } from "@playwright/test";
import { monitorLocators, getProductLocator, getProductLocatorInCart } from "./locators/monitorPageLocators";

test('Verify that user is able to verify the monitor products list.', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(monitorLocators.monitorsTab);

  //Code to wait until monitor products are loaded onto the page
  const monitorModel = "Apple monitor 24"
  const MacBookProProduct = getProductLocator(monitorModel);
  await expect(page.locator(MacBookProProduct)).toBeVisible();

  //Verify the number of products located
  const items = page.locator(monitorLocators.monitorModels);
  await expect(items).toHaveCount(2); // waits until count is 2

  //await page.waitForSelector('#tbodyid .card-title a', { timeout: 10000 }); 

  // Locate all product links
  const products = await page.$$(monitorLocators.monitorModels);
  for (const product of products) {
    var productText = await product.textContent();
    console.log(productText);
  }
  const products2 = await page.locator(monitorLocators.monitorModels).allTextContents();
  console.log(products2);

  expect(products2).toContain(monitorModel)

  //Closing the page tab
  await page.close();
});


test('Verify that user is able to add the monitor product into cart.', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(monitorLocators.monitorsTab);

  const items = page.locator(monitorLocators.monitorModels);
  await expect(items).toHaveCount(2); // waits until count is 3

  const products2 = await page.locator(monitorLocators.monitorModels).allTextContents();
  console.log(products2);

  const monitorModel = "Apple monitor 24"
  expect(products2).toContain(monitorModel)

  const productLocator = getProductLocator(monitorModel);
  await page.click(productLocator);

  await expect(page.locator(monitorLocators.addToCartBtn)).toBeVisible();
  await page.click(monitorLocators.addToCartBtn);

  //Code to click ok in dilog box
  page.once('dialog', dialog => {
    console.log('Alert appeared:', dialog.message());
    dialog.accept();
  });

  await expect(page.locator(monitorLocators.cartLinkOnPageTop)).toBeVisible();
  await page.click(monitorLocators.cartLinkOnPageTop);

  const productLocatorinCart = getProductLocatorInCart(monitorModel);
  await expect(page.locator(productLocatorinCart)).toBeVisible();

  //Closing the page tab
  await page.close();
});