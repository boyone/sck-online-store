import { test, expect } from '@playwright/test'
import { login, authHeader, uniqueName, NewProduct } from './helpers/api'

/**
 * Alternative (TSA) scenarios for "add new product" — access control and
 * request validation on POST /api/v1/product in store-service.
 */

// --- TSA: access control ----------------------------------------------------

test('TSA create product without a token is rejected', async ({ request }) => {
  const response = await request.post('product', {
    data: {
      'product-name': uniqueName('Unauthorized Product'),
      'product-brand': 'No Auth Brand',
      'product-price': 100,
      'product-stock': 10,
    },
  })
  expect(response.status(), 'unauthenticated create should be 401').toBe(401)
})

// --- TSA: request validation ------------------------------------------------

const requiredFields: (keyof NewProduct)[] = [
  'product-name',
  'product-brand',
  'product-price',
  'product-stock',
]

for (const missing of requiredFields) {
  test(`TSA create product missing ${missing} returns 400`, async ({ request }) => {
    const token = await login(request)
    const payload: Record<string, unknown> = {
      'product-name': uniqueName('Invalid Product'),
      'product-brand': 'Some Brand',
      'product-price': 100,
      'product-stock': 10,
    }
    delete payload[missing]

    const response = await request.post('product', {
      headers: authHeader(token),
      data: payload,
    })
    expect(response.status(), `missing ${missing} should be rejected`).toBe(400)
    const body = await response.json()
    expect(body.error, 'error message should be present').toBeTruthy()
  })
}
