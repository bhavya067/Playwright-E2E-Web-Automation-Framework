import { test, expect } from '@playwright/test';
import { loginPageLocators } from './locators/loginPageLocators';


test("Verify that user is able to login to demoblaze demo website.", async ({ page }) => {

    //Navigating to the url
    await page.goto("https://www.demoblaze.com/index.html");

    //Verifying page title 
    const pageTitle = await page.title();
    expect(pageTitle).toBe("STORE");
    console.log("page title 1 is: " + pageTitle);

    //Another way to verify page title
    await expect(page).toHaveTitle('STORE');

    //Logging in to the platform
    const username = "bhavya_06_";
    const password = "bhavyabhavya";
    await page.click(loginPageLocators.loginLinkOnPageTop);
    await expect(page.locator(loginPageLocators.userNameField)).toBeVisible();
    await page.fill(loginPageLocators.userNameField, username);
    await page.fill(loginPageLocators.passwordField, password);
    await page.click(loginPageLocators.loginBtn);

    //After logging in, verifying logout button, name of user
    await expect(page.locator(loginPageLocators.logoutLinkOnPageTop)).toBeVisible();
    await expect(page.locator(loginPageLocators.nameOfUser)).toBeVisible();

    const nameOfUser = await page.textContent(loginPageLocators.nameOfUser);
    expect(nameOfUser).toContain(username);
    console.log("Name of user is: " + nameOfUser);

    //Closing the page tab
    await page.close();

});