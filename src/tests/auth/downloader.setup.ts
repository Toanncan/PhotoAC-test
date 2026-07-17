import { test as setup } from '@playwright/test';
import { envConfig } from '../../utils/env.config';
import { DOWNLOADER_AUTH_STATE_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';
import { LoginPage } from '@pages/common/login.page';

setup('Authenticate as downloader', async ({ page }) => {
  ensureAuthDirExists();
  const loginPage = new LoginPage(page);
  await loginPage.loginAsDownloader(
    envConfig.testUser.email,
    envConfig.testUser.password);
  await page.context().storageState({ path: DOWNLOADER_AUTH_STATE_PATH });
})