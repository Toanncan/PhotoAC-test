import { test as setup } from '@playwright/test';
import { envConfig } from '../../utils/env.config';
import { PREMIUM_USER_AUTH_STATE_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';
import { LoginPage } from '@pages/common/login.page';

setup('Authenticate as premium user', async ({ page }) => {
  ensureAuthDirExists();
  const loginPage = new LoginPage(page);
  await loginPage.loginAsDownloader(
    envConfig.premiumUser.email,
    envConfig.premiumUser.password
  );
  await page.context().storageState({ path: PREMIUM_USER_AUTH_STATE_PATH });
});
