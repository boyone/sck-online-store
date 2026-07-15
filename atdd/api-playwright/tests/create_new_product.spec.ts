import { test, expect } from '@playwright/test'
import newProducts from '../test-data/new-products.json'
import { login, authHeader, uniqueName, NewProduct } from './helpers/api'

/**
 * API e2e for "add new product" — exercises POST /api/v1/product end to end
 * against store-service (through nginx), mirroring the UI flow in
 * atdd/ui-playwright/tests/create_new_product_data.spec.ts.
 */

// --- TSS: success scenarios (data-driven) -----------------------------------

for (const sample of newProducts as NewProduct[]) {
  test(`TSS create new product ${sample['product-name']}`, async ({ request }) => {
    const token = await login(request)
    const product: NewProduct = { ...sample, 'product-name': uniqueName(sample['product-name']) }
    let createdId = 0

    await test.step('create the product', async () => {
      const response = await request.post('product', {
        headers: authHeader(token),
        data: product,
      })
      expect(response.status(), 'create should return 201 Created').toBe(201)
      const body = await response.json()
      expect(body.id, 'response should carry the new product id').toBeGreaterThan(0)
      createdId = body.id
    })

    await test.step('find the product via search', async () => {
      const response = await request.get('product', {
        headers: authHeader(token),
        params: { q: product['product-name'] },
      })
      expect(response.status()).toBe(200)
      const body = await response.json()
      const found = body.products.find((p: any) => p.id === createdId)
      expect(found, 'created product should appear in search results').toBeTruthy()
      expect(found.product_name).toBe(product['product-name'])
      expect(found.product_price).toBe(product['product-price'])
    })
  })
}
