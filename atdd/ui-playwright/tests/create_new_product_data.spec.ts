import { test, expect } from '@playwright/test'
import newProducts from '../test-data/new-products.json'

for (const product of newProducts) {

  test(`create new product ${product["product-name"]}`, async ({ page }) => {
    await test.step('login with user_1', async () => {
      await page.goto('/auth/login')
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
      await page.fill('#product-name-input', product["product-name"])
      await page.fill('#product-brand-input', product["product-brand"])
      await page.fill('#product-price-input', product["product-price"].toString())
      await page.fill('#product-stock-input', product["product-stock"].toString())
    })

    await test.step('click create product button', async () => {
      await page.click('#new-product-btn')
    })

    await test.step('Close modal', async () => {
      await expect(page.getByRole('paragraph')).toContainText(`add ${product["product-name"]} success`);
      await page.getByRole('button', { name: 'OK' }).click();
    })

    await test.step('verify new product', async () => {
      await page.getByRole('link', { name: 'Home' }).click();
      await page.fill('#search-product-input', product["product-name"])
      await page.locator('#search-product-btn').click()
      await expect(page.getByRole('link', { name: product["product-name"] })).toContainText(product["product-name"])
    })

  })
};


