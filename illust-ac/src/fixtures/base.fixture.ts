import { test as base, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import * as path from 'path';
import { LoginPage } from '../pages/common/login.page';
import { HomePage } from '../pages/common/home.page';
import { RankingPage } from '../pages/creator/ranking.page';
import { ReceiptsPage } from '../pages/downloader/receipts.page';
import { ProfileEditPage } from '../pages/downloader/profile-edit.page';
import { SearchResultPage } from '@pages/common/search-results.page';
import { envConfig } from '../utils/env.config';

/**
 * Custom fixture types for the project.
 * Add new Page Object fixtures here as the project grows.
 */
type PageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  rankingPage: RankingPage;
  receiptsPage: ReceiptsPage;
  profileEditPage: ProfileEditPage;
  searchResultPage: SearchResultPage;
  allureMetadata: void;
  screenshotOnPass: void;
  urlOverlayAndAttachment: void;
};

/**
 * base.fixture.ts — Extends Playwright's built-in test with project fixtures.
 *
 * ALL spec files MUST import { test, expect } from this file,
 * NOT directly from @playwright/test.
 */
export const test = base.extend<PageFixtures>({

  allureMetadata: [async ({ }, use, testInfo) => {
    // ── Determine Role ───────────────────────────────────────────────────────
    const filePath = testInfo.file.toLowerCase();
    const projectName = testInfo.project.name.toLowerCase();

    let role = 'Common';
    if (filePath.includes('guest') || projectName.includes('guest')) {
      role = 'Guest';
    } else if (filePath.includes('freeuser') || projectName.includes('free-user')) {
      role = 'FreeUser';
    } else if (filePath.includes('downloader') || projectName.includes('downloader')) {
      role = 'Downloader';
    } else if (filePath.includes('creator') || projectName.includes('creator')) {
      role = 'Creator';
    } else if (filePath.includes('admin') || projectName.includes('admin')) {
      role = 'Admin';
    }

    // ── Determine Browser Name ───────────────────────────────────────────────
    let browserName = 'Other';
    if (projectName.includes('chromium')) {
      browserName = 'Chromium';
    } else if (projectName.includes('firefox')) {
      browserName = 'Firefox';
    } else if (projectName.includes('webkit')) {
      browserName = 'WebKit';
    } else {
      browserName = testInfo.project.name;
    }

    await allure.parentSuite(`Photo AC - ${role}`);
    await allure.suite(path.basename(testInfo.file, path.extname(testInfo.file)));
    await allure.subSuite(browserName);

    // ── Categorization ───────────────────────────────────────────────────────
    await allure.layer('e2e');
    await allure.tag('ui');

    // ── Environment parameters (visible in Allure report sidebar) ────────────
    await allure.parameter('Environment', envConfig.env);
    await allure.parameter('Base URL', envConfig.baseUrl);

    await use();
  }, { auto: true }],

  // Provides a LoginPage instance for tests that need it
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Provides a HomePage instance for tests that need it
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Provides a RankingPage instance for ranking page tests
  rankingPage: async ({ page }, use) => {
    const rankingPage = new RankingPage(page);
    await use(rankingPage);
  },

  // Provides a ReceiptsPage instance for receipt issuance tests
  receiptsPage: async ({ page }, use) => {
    const receiptsPage = new ReceiptsPage(page);
    await use(receiptsPage);
  },

  // Provides a ProfileEditPage instance for profile edit page tests
  profileEditPage: async ({ page }, use) => {
    const profileEditPage = new ProfileEditPage(page);
    await use(profileEditPage);
  },
  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage(page);
    await use(searchResultPage);
  },

  /**
   * screenshotOnPass — Auto fixture to capture final screenshot when test passes.
   * auto: true → runs automatically for every test without explicit declaration.
   */
  screenshotOnPass: [async ({ page }, use, testInfo) => {
    await use();
    if (testInfo.status === 'passed') {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('final-screenshot-passed', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  }, { auto: true }],

  /**
   * urlOverlayAndAttachment — Injects a clean URL watermark banner on the page top
   * and attaches current URL as text to Allure Report for fast copy and high visibility.
   * auto: true → Runs for every test. Fixtures teardown in LIFO order so this runs first on test completion.
   */
  urlOverlayAndAttachment: [async ({ page }, use, testInfo) => {
    await use();
    try {
      if (!page.isClosed()) {
        const currentUrl = page.url();

        // 1. Attach URL as clean text to Allure Report for 1-click copy
        await testInfo.attach('Current URL', {
          body: currentUrl,
          contentType: 'text/plain',
        });

        // 2. Inject URL watermark banner to DOM so all screenshots (Pass and Failure) capture the exact URL
        await page.evaluate((url) => {
          if (document.getElementById('qa-screenshot-url-banner')) return;
          const banner = document.createElement('div');
          banner.id = 'qa-screenshot-url-banner';
          banner.style.position = 'fixed';
          banner.style.top = '0';
          banner.style.left = '0';
          banner.style.width = '100%';
          banner.style.backgroundColor = 'rgba(15, 23, 42, 0.92)';
          banner.style.color = '#22c55e';
          banner.style.fontFamily = 'Consolas, Menlo, Monaco, monospace';
          banner.style.fontSize = '13px';
          banner.style.fontWeight = 'bold';
          banner.style.padding = '6px 14px';
          banner.style.zIndex = '2147483647';
          banner.style.borderBottom = '2px solid #22c55e';
          banner.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.5)';
          banner.style.pointerEvents = 'none';
          banner.textContent = '📍 URL: ' + url;
          document.body.prepend(banner);
        }, currentUrl).catch(() => {});
      }
    } catch {
      // Ignore if page is already closed or destroyed
    }
  }, { auto: true }],
});

// Re-export expect so specs only need one import source
export { expect };
