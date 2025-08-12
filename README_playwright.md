# Playwright JavaScript Test Execution Guide

## 1. Prerequisites

### Install Node.js & npm
Playwright requires **Node.js** (v18 or above recommended) and **npm**.

#### Windows
1. Download the installer from: [https://nodejs.org]
2. Run the installer, ensure **"Add to PATH"** is checked.
3. Verify installation:
   ```bash
   node -v
   npm -v
   ```

#### macOS (using Homebrew)
```bash
brew install node
node -v
npm -v
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y nodejs npm
node -v
npm -v
```

---

## 2. Install Project Dependencies

Inside your project folder:
```bash
npm install
```

If Playwright is not yet installed:
```bash
npm init playwright@latest
```
Choose **JavaScript** during setup if prompted.

---

## 3. Playwright Commands for Test Execution

### Run All Tests
```bash
npx playwright test
```

### Run a Specific Test File
```bash
npx playwright test tests/example.spec.js
```

### Run Tests by Title
```bash
npx playwright test -g "should display login page"
```

### Run with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run in a Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

### Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in Parallel
(Playwright runs in parallel by default, but you can specify workers)
```bash
npx playwright test --workers=4
```

---


## 4. Common Playwright Methods (JavaScript) — Dual Usage Examples

### Navigation
```javascript
await page.goto('https://example.com'); 
// No locator alternative — only page method
```

### Click an Element
```javascript
await page.click('button#submit'); 
await page.locator('text=Submit').click(); // locator.click()
await click(page.locator('text=Submit'));  // click(locator)
```

### Fill Input Field
```javascript
await page.fill('input#username', 'myUser');
await page.locator('input[name="email"]').fill('test@example.com'); // locator.fill()
await fill(page.locator('input[name="email"]'), 'test@example.com'); // fill(locator, value)
```

### Type with Delay
```javascript
await page.type('input#search', 'Playwright', { delay: 100 });
await page.locator('input#search').type('Playwright', { delay: 100 });
await type(page.locator('input#search'), 'Playwright', { delay: 100 });
```

### Press a Key
```javascript
await page.press('input#search', 'Enter');
await page.locator('input#search').press('Enter');
await press(page.locator('input#search'), 'Enter');
```

### Select from Dropdown
```javascript
await page.selectOption('#country', 'India');
await page.locator('#country').selectOption('India');
await selectOption(page.locator('#country'), 'India');
```

### Check / Uncheck Checkbox
```javascript
await page.check('#acceptTerms');
await page.locator('#acceptTerms').check();
await check(page.locator('#acceptTerms'));

await page.uncheck('#acceptTerms');
await page.locator('#acceptTerms').uncheck();
await uncheck(page.locator('#acceptTerms'));
```

### Hover Over Element
```javascript
await page.hover('.menu-item');
await page.locator('.menu-item').hover();
await hover(page.locator('.menu-item'));
```

### Upload a File
```javascript
await page.setInputFiles('input[type=file]', 'path/to/file.txt');
await page.locator('input[type=file]').setInputFiles('path/to/file.txt');
await setInputFiles(page.locator('input[type=file]'), 'path/to/file.txt');
```

### Wait for Element
```javascript
await page.waitForSelector('#loadedContent');
await waitForSelector(page, '#loadedContent');
```

### Wait for Timeout
```javascript
await page.waitForTimeout(3000); // 3 seconds
await waitForTimeout(page, 3000);
```

### Get Text Content
```javascript
const text = await page.textContent('.message');
const text2 = await page.locator('.message').textContent();
const text3 = await textContent(page.locator('.message'));
```

### Get Attribute Value
```javascript
const value = await page.getAttribute('#username', 'value');
const value2 = await page.locator('#username').getAttribute('value');
const value3 = await getAttribute(page.locator('#username'), 'value');
```

### Screenshot
```javascript
await page.screenshot({ path: 'screenshot.png' });
await screenshot(page, { path: 'screenshot.png' });
```


## 5. Playwright Assertions

Playwright uses the built-in **expect** library for assertions.

### Visibility & Presence
```javascript
await expect(page.locator('#logo')).toBeVisible();
await expect(page.locator('#loading')).toBeHidden();
await expect(page.locator('#welcome')).toHaveCount(1);
```

### Text Assertions
```javascript
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('.title')).toContainText('Playwright');
await expect(page.locator('.msg')).not.toContainText('Error');
```

### Value & Attribute Assertions
```javascript
await expect(page.locator('#username')).toHaveValue('admin');
await expect(page.locator('#username')).toHaveAttribute('placeholder', 'Enter username');
```

### Checkbox / Radio
```javascript
await expect(page.locator('#acceptTerms')).toBeChecked();
await expect(page.locator('#newsletter')).not.toBeChecked();
```

### State Assertions
```javascript
await expect(page.locator('#submit')).toBeEnabled();
await expect(page.locator('#submit')).toBeDisabled();
```

### Page Assertions
```javascript
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveTitle('Dashboard');
```

### Basic Matchers
```javascript
expect(5).toBe(5);
expect(value).not.toBeNull();
expect(items.length).toBeGreaterThan(0);
expect(score).toBeLessThanOrEqual(100);
```

---

## 6. Allure Report Integration with Playwright

### Install Allure Packages
```bash
npm install --save-dev @playwright/test allure-playwright
npm install -g allure-commandline --save-dev
```

### Update `playwright.config.js`
```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
});
```

### Run Tests with Allure Results
```bash
npx playwright test --reporter=allure-playwright
```

### Generate Allure Report
```bash
allure generate ./allure-results --clean -o ./allure-report
```

### Open Allure Report
```bash
allure open ./allure-report
```

---

## References
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Allure Playwright](https://github.com/allure-framework/allure-js)
- [Node.js Download](https://nodejs.org)
