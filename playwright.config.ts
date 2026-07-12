import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const BASE_URL = process.env.BASE_URL || 'https://test-lien.photo-ac.com';
const HTTP_USER = process.env.HTTP_USER || '';
const HTTP_PASS = process.env.HTTP_PASS || '';

export default defineConfig({
  // Global setup: runs once before all tests (generates environment.properties for Allure)
  globalSetup: './src/utils/global-setup.ts',
  // Directory containing test files
  testDir: './src/tests',

  // Match all TypeScript test files in tests folder
  testMatch: '**/*.spec.ts',

  // Maximum time one test can run (ms)
  timeout: 60_000,

  // Maximum time one expect() call can take (ms)
  expect: {
    timeout: 10_000,
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 3 : 0,

  // Number of workers
  workers: process.env.CI ? 2 : 1,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
    ['list'],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: BASE_URL,

    // HTTP Basic Auth for staging server (if required)
    ...(HTTP_USER && HTTP_PASS
      ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS, origin: BASE_URL } }
      : {}),

    // Viewport size — Desktop standard
    viewport: { width: 1920, height: 1080 },

    // Record traces on first retry for debugging
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'on-first-retry',

    // Ignore HTTPS errors (for test environments)
    ignoreHTTPSErrors: true,

    // Timeout for actions (click, fill, etc.)
    actionTimeout: 15_000,

    // Timeout for navigations
    navigationTimeout: 30_000,
    headless: process.env.CI ? true : false,
  },

  // Configure projects for major browsers
  projects: [
    // Setup project for authentication state
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },

    // Chromium — Primary browser
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: '.auth/user.json',
      },
      // dependencies: ['setup'],
    },

    // Firefox — Cross-browser validation
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1920, height: 1080 },
    //     storageState: '.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // // WebKit / Safari
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //     storageState: '.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // Creator Portal — Independent project (no shared auth state)
    // Uses real Chrome browser channel with HTTP Basic Auth credentials from .env
    // {
    //   name: 'creator',
    //   testMatch: '**/creator/**/*.spec.ts',
    //   use: {
    //     channel: 'chrome',
    //     viewport: { width: 1920, height: 1080 },
    //     // HTTP Basic Auth for staging server — fill HTTP_USER/HTTP_PASS in .env
    //     ...(HTTP_USER && HTTP_PASS
    //       ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS, origin: BASE_URL } }
    //       : {}),
    //   },
    // },
  ],

  // Output folder for test artifacts
  outputDir: 'test-results/',
});
