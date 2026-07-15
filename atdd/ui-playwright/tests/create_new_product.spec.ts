import { test, expect } from '@playwright/test'

test('create new product', async ({ page }) => {
  await test.step('login with user_1', async () => {
    await page.goto('/auth/login')
    // await page.getByRole('textbox', { name: 'Username' }).fill('user_1');
    await page.fill('#login-username-input', 'user_1')
    await page.fill('#login-password-input', 'P@ssw0rd')
    await page.click('#login-btn')
    await page.waitForURL('**/product/list')
  })

  await test.step('click at user menu', async () => {
    await page.click('#header-menu-user-btn')
  })

  await test.step('click at admin action list', async () => {
    await page.click('#admin-action-list')
  })

  await test.step('fill in product form', async () => {
    await page.fill('#product-name-input', 'Helloz')
    await page.fill('#product-brand-input', 'SCK')
    await page.fill('#product-price-input', '100')
    await page.fill('#product-stock-input', '100')
  })

  await test.step('click create product button', async () => {
    await page.click('#new-product-btn')
  })

  await test.step('Close modal', async () => {
    await page.getByRole('button', { name: 'OK' }).click();
  })

  await test.step('verify new product', async () => {
    await page.getByRole('link', { name: 'Home' }).click();
    page.fill('#search-product-input', 'Helloz')
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('link', { name: 'Helloz' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Helloz' })).toContainText('Helloz')
    // #product-card-name-10034
    // await page.goto('http://localhost/product/10032');

    // await expect(page.locator('#product-detail-product-name')).toContainText('Helloz');
    // await expect(page.locator('#product-detail-brand')).toContainText('World');
    // await expect(page.locator('#product-detail-stock')).toContainText('Stock 100 items');

  })

})
