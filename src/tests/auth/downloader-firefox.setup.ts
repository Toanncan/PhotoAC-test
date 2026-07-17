import { test as setup } from '@playwright/test';
import { envConfig } from '../../utils/env.config';
import { DOWNLOADER_AUTH_STATE_FIREFOX_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';
import { LoginPage } from '@pages/common/login.page';

// Firefox-specific setup: saves its own storageState to avoid cross-browser cookie issues
setup('Authenticate as downloader (Firefox)', async ({ page }) => {
  ensureAuthDirExists();
  const loginPage = new LoginPage(page);
  await loginPage.loginAsDownloader(
    envConfig.testUser.email,
    envConfig.testUser.password);

  await page.context().storageState({ path: DOWNLOADER_AUTH_STATE_FIREFOX_PATH });
});
