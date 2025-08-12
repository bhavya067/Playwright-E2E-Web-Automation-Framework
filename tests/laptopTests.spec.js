
import { test, expect } from "@playwright/test";
import { laptopLocators, getProductLocator, getProductLocatorInCart } from "./locators/laptopPageLocators";

test('Verify that user is able to verify the laptop products list.', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(laptopLocators.laptopsTab);

  //Code to wait until laptop products are loaded onto the page
  const laptopModel = "MacBook Pro"
  const MacBookProProduct = getProductLocator(laptopModel);
  await expect(page.locator(MacBookProProduct)).toBeVisible();

  //Verify the number of products located
  const items = page.locator(laptopLocators.laptopModels);
  await expect(items).toHaveCount(6); // waits until count is 6

  //await page.waitForSelector('#tbodyid .card-title a', { timeout: 10000 }); 

  // Locate all product links
  const products = await page.$$(laptopLocators.laptopModels);
  for (const product of products) {
    var productText = await product.textContent();
    console.log(productText);
  }
  const products2 = await page.locator(laptopLocators.laptopModels).allTextContents();
  console.log(products2);

  expect(products2).toContain(laptopModel)

  //Closing the page tab
  await page.close();
});


test('Verify that user is able to add the laptop product into cart.', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(laptopLocators.laptopsTab);

  const items = page.locator(laptopLocators.laptopModels);
  await expect(items).toHaveCount(6); // waits until count is 6

  const products2 = await page.locator(laptopLocators.laptopModels).allTextContents();
  console.log(products2);

  const laptopModel = "MacBook Pro"
  expect(products2).toContain(laptopModel)

  const productLocator = getProductLocator(laptopModel);
  await page.click(productLocator);

  await expect(page.locator(laptopLocators.addToCartBtn)).toBeVisible();
  await page.click(laptopLocators.addToCartBtn);

  //Code to click ok in dilog box
  page.once('dialog', dialog => {
    console.log('Alert appeared:', dialog.message());
    dialog.accept();
  });

  await expect(page.locator(laptopLocators.cartLinkOnPageTop)).toBeVisible();
  await page.click(laptopLocators.cartLinkOnPageTop);

  const productLocatorinCart = getProductLocatorInCart(laptopModel);
  await expect(page.locator(productLocatorinCart)).toBeVisible();

  //Closing the page tab
  await page.close();
});