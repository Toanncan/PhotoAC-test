import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DOWNLOADER_AUTH_STATE_PATH, CREATOR_AUTH_STATE_PATH, DOWNLOADER_AUTH_STATE_FIREFOX_PATH, CREATOR_AUTH_STATE_FIREFOX_PATH } from './src/fixtures/auth.fixture';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const BASE_URL = process.env.BASE_URL;
const HTTP_USER = process.env.HTTP_USER;
const HTTP_PASS = process.env.HTTP_PASS;

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
  workers: process.env.CI ? 2 : 2,

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
      ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
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
    // Setup project for Downloader session
    {
      name: 'setup-downloader',
      testMatch: '**/downloader.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Chromium-only flag — must NOT be in global use (breaks Firefox/WebKit)
        launchOptions: { args: ['--disable-blink-features=AutomationControlled'] },
        // Must explicitly include httpCredentials — setup projects need this for staging HTTP Basic Auth
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
    },

    // Setup project for Creator session
    {
      name: 'setup-creator',
      testMatch: '**/creator.setup.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Chromium-only flag — must NOT be in global use (breaks Firefox/WebKit)
        launchOptions: { args: ['--disable-blink-features=AutomationControlled'] },
        // Must explicitly include httpCredentials — setup projects need this for staging HTTP Basic Auth
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
    },

    // Setup project for Downloader session (Firefox — separate storageState)
    {
      name: 'setup-downloader-firefox',
      testMatch: '**/downloader-firefox.setup.ts',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        // Must explicitly include httpCredentials for staging HTTP Basic Auth
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
      dependencies: ['chromium-downloader'],
    },

    // Setup project for Creator session (Firefox — separate storageState)
    {
      name: 'setup-creator-firefox',
      testMatch: '**/creator-firefox.setup.ts',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        // Must explicitly include httpCredentials for staging HTTP Basic Auth
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
    },

    // Chromium Downloader — Tests running under Downloader session
    {
      name: 'chromium-downloader',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: DOWNLOADER_AUTH_STATE_PATH,
        // Chromium-only flag — must NOT be in global use (breaks Firefox/WebKit)
        launchOptions: { args: ['--disable-blink-features=AutomationControlled'] },
        // Required for staging HTTP Basic Auth — without this, site returns 401 before checking cookies
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
      dependencies: ['setup-downloader'],
      testIgnore: '**/creator/**/*.spec.ts',
    },

    // Chromium Creator — Tests running under Creator session
    {
      name: 'chromium-creator',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: CREATOR_AUTH_STATE_PATH,
        // Chromium-only flag — must NOT be in global use (breaks Firefox/WebKit)
        launchOptions: { args: ['--disable-blink-features=AutomationControlled'] },
      },
      dependencies: ['setup-creator'],
      testMatch: '**/creator/**/*.spec.ts',
    },

    // ── Firefox Downloader ────────────────────────────────────────────────────
    // Reuses the same storageState from setup-downloader (session is browser-agnostic)
    {
      name: 'firefox-downloader',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        // Use Firefox-specific storageState — Chromium cookies are not compatible with Firefox
        storageState: DOWNLOADER_AUTH_STATE_FIREFOX_PATH,
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
      // Also wait for chromium-downloader to finish first to avoid session conflict
      // (same account cannot be logged in on 2 browsers simultaneously)
      dependencies: ['setup-downloader-firefox'],
      testIgnore: '**/creator/**/*.spec.ts',
    },

    // ── Firefox Creator ───────────────────────────────────────────────────────
    {
      name: 'firefox-creator',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        // Use Firefox-specific storageState — Chromium cookies are not compatible with Firefox
        storageState: CREATOR_AUTH_STATE_FIREFOX_PATH,
        ...(HTTP_USER && HTTP_PASS
          ? { httpCredentials: { username: HTTP_USER, password: HTTP_PASS } }
          : {}),
      },
      dependencies: ['setup-creator-firefox'],
      testMatch: '**/creator/**/*.spec.ts',
    },

    // ── WebKit (Safari) Downloader ────────────────────────────────────────────
    // {
    //   name: 'webkit-downloader',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //     storageState: DOWNLOADER_AUTH_STATE_PATH,
    //   },
    //   dependencies: ['setup-downloader'],
    //   testIgnore: '**/creator/**/*.spec.ts',
    // },

    // ── WebKit Creator ────────────────────────────────────────────────────────
    // {
    //   name: 'webkit-creator',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //     storageState: CREATOR_AUTH_STATE_PATH,
    //   },
    //   dependencies: ['setup-creator'],
    //   testMatch: '**/creator/**/*.spec.ts',
    // },
  ],

  // Output folder for test artifacts
  outputDir: 'test-results/',
});
