import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { envConfig } from '../../utils/env.config';
import { DOWNLOADER_AUTH_STATE_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';

/**
 * Authentication Setup — Runs as a "setup" project before any test.
 * Logs in once and saves session state to .auth/user.json.
 * All browsers configured with `storageState: '.auth/user.json'` will reuse this session.
 */
test('authenticate and save session state', async ({ page }) => {
  // Ensure .auth directory exists
  ensureAuthDirExists();

  const loginPage = new LoginPage(page);

  // Perform login with configured credentials
  await loginPage.loginAsDownloader(
    envConfig.testUser.email,
    envConfig.testUser.password,
  );

  // Wait for successful login — URL changes to authenticated area
  await page.waitForURL(/\/(dashboard|home|top|my-page|en|ja)?/, { waitUntil: 'domcontentloaded', timeout: 15_000 });

  // Persist session state for reuse across all test browsers
  await page.context().storageState({ path: DOWNLOADER_AUTH_STATE_PATH });
});
