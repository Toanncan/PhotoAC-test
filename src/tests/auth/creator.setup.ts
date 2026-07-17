import { test as setup } from '@playwright/test';
import { envConfig } from '../../utils/env.config';
import { CREATOR_AUTH_STATE_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';
import { LoginPage } from '@pages/common/login.page';

setup('authenticate as creator', async ({ page }) => {
    ensureAuthDirExists();
    const loginPage = new LoginPage(page);
    await loginPage.loginAsCreator(
        envConfig.creatorUser.email,
        envConfig.creatorUser.password);
    await page.context().storageState({ path: CREATOR_AUTH_STATE_PATH });
});
