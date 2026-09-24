import { test as setup } from '@playwright/test';
import { envConfig } from '../../utils/env.config';
import { FREE_USER_AUTH_STATE_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';
import { LoginPage } from '@pages/common/login.page';

setup('Authenticate as free user', async ({ page }) => {
  ensureAuthDirExists();
  const loginPage = new LoginPage(page);
  await loginPage.loginAsDownloader(
    envConfig.freeUser.email,
    envConfig.freeUser.password
  );
  await page.context().storageState({ path: FREE_USER_AUTH_STATE_PATH });
});
