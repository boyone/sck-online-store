import { APIRequestContext, expect } from '@playwright/test'

export interface NewProduct {
  'product-name': string
  'product-brand': string
  'product-price': number
  'product-stock': number
}

/**
 * Log in and return the JWT access token used as a Bearer credential.
 * Mirrors POST /api/v1/login in store-service (auth.go).
 */
export async function login(
  request: APIRequestContext,
  username = 'user_1',
  password = 'P@ssw0rd',
): Promise<string> {
  const response = await request.post('login', {
    data: { username, password },
  })
  expect(response.status(), 'login should succeed').toBe(200)
  const body = await response.json()
  expect(body.access_token, 'login response should carry an access_token').toBeTruthy()
  return body.access_token
}

export function authHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

/**
 * Give each run a unique product name so the store-service unique
 * product-name constraint does not trip on repeated executions.
 */
export function uniqueName(baseName: string): string {
  const suffix = `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4)}`
  return `${baseName} ${suffix}`
}
