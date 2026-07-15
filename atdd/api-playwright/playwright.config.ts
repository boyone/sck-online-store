import { defineConfig } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 * API-only suite — no browsers, drives the store-service REST API through nginx.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  use: {
    /* nginx reverse proxy fronts store-service at /api. Override with API_BASE_URL.
     * Trailing slash is required so relative paths resolve under /api/v1/. */
    baseURL: process.env.API_BASE_URL || 'http://localhost/api/v1/',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
  },
})
