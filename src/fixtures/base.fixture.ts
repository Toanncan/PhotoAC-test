import { test as base, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import * as path from 'path';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CreatorLoginPage } from '../pages/creator-login.page';
import { RankingPage } from '../pages/ranking.page';
import { envConfig } from '../utils/env.config';

/**
 * Custom fixture types for the project.
 * Add new Page Object fixtures here as the project grows.
 */
type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  creatorLoginPage: CreatorLoginPage;
  rankingPage: RankingPage;
  allureMetadata: void;
  screenshotOnPass: void;
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
    if (filePath.includes('downloader') || projectName.includes('downloader')) {
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
    await allure.parameter('Browser', testInfo.project.name);

    await use();
  }, { auto: true }],

  // Provides a LoginPage instance for tests that need it
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Provides a DashboardPage instance for tests that need it
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  // Provides a CreatorLoginPage instance for creator portal tests
  creatorLoginPage: async ({ page }, use) => {
    const creatorLoginPage = new CreatorLoginPage(page);
    await use(creatorLoginPage);
  },

  // Provides a RankingPage instance for ranking page tests
  rankingPage: async ({ page }, use) => {
    const rankingPage = new RankingPage(page);
    await use(rankingPage);
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
});

// Re-export expect so specs only need one import source
export { expect };
