import { test as setup } from '@playwright/test';
import { envConfig } from '../../utils/env.config';
import { CREATOR_AUTH_STATE_FIREFOX_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';
import { LoginPage } from '@pages/common/login.page';

// Firefox-specific setup: saves its own storageState to avoid cross-browser cookie issues
setup('authenticate as creator (Firefox)', async ({ page }) => {
  ensureAuthDirExists();
  const loginPage = new LoginPage(page);
  await loginPage.loginAsCreator(
    envConfig.creatorUser.email,
    envConfig.creatorUser.password);

  await page.context().storageState({ path: CREATOR_AUTH_STATE_FIREFOX_PATH });
});
