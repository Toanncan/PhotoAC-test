import { test as setup } from '@playwright/test';
import { CreatorLoginPage } from '../../pages/creator-login.page';
import { envConfig } from '../../utils/env.config';
import { CREATOR_AUTH_STATE_PATH, ensureAuthDirExists } from '../../fixtures/auth.fixture';

setup('authenticate as creator', async ({ page }) => {
    // Log all 403/5xx responses to help debug CI blocking issues
    page.on('response', response => {
        if (response.status() === 403 || response.status() >= 500) {
            console.error(`[CREATOR-SETUP] HTTP ${response.status()} at: ${response.url()}`);
        }
    });

    ensureAuthDirExists();
    const creatorLoginPage = new CreatorLoginPage(page);
    await creatorLoginPage.loginAsCreator(
        envConfig.creatorUser.email,
        envConfig.creatorUser.password);
    await page.context().storageState({ path: CREATOR_AUTH_STATE_PATH });
});
