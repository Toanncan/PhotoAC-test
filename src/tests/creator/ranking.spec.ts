import { test, expect } from '../../fixtures/base.fixture';
import { envConfig } from '../../utils/env.config';

/**
 * Ranking Page Tests — Creator Portal
 *
 * Test URL: https://test-lien.photo-ac.com/creator/ranking
 * Account: Creator (toancan3695@gmail.com)
 *
 * Test objectives:
 * 1. Verify ranking page loads and displays all 4 ranking sections
 * 2. Verify data is present and not empty in table structure
 * 3. Verify no font rendering errors (tofu/garbled characters)
 */
test.describe('Creator Ranking Page', () => {
  // test.use({ storageState: { cookies: [], origins: [] } }); // Override to run unauthenticated

  // test.beforeEach(async ({ loginPage }) => {
  //   // Login as creator before each test
  //   await loginPage.loginAsCreator(
  //     envConfig.creatorUser.email,
  //     envConfig.creatorUser.password,
  //   );
  // });

  // ─── TC01: Page Navigation & Heading ─────────────────────────────────────

  test('TC01 - Trang ranking hiển thị đúng heading và URL', async ({ rankingPage, page }) => {
    // Act
    await rankingPage.goToRankingPage();

    // Assert
    await test.step('Verify URL contains /creator/ranking', async () => {
      await expect(page).toHaveURL(/\/creator\/ranking$/);
    });

    await test.step('Verify H1 heading displays "ランキング"', async () => {
      await expect(rankingPage.pageHeading).toBeVisible();
      await expect(rankingPage.pageHeading).toHaveText('ランキング');
    });
  });

  // ─── TC02: All 4 Ranking Sections Present ────────────────────────────────

  // test('TC02 - Bốn section ranking đều hiển thị đầy đủ', async ({ rankingPage }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();

  //   // Assert — All 4 section labels present
  //   await expect(rankingPage.downloadRankingSection).toBeVisible();
  //   await expect(rankingPage.licenseRankingSection).toBeVisible();
  //   await expect(rankingPage.pageViewRankingSection).toBeVisible();
  //   await expect(rankingPage.uploadNiceFanRankingSection).toBeVisible();
  // });

  // ─── TC03: Table Count Correct ────────────────────────────────────────────

  // test('TC03 - Trang có đúng 4 bảng ranking', async ({ rankingPage }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();
  //   const tableCount = await rankingPage.getTableCount();

  //   // Assert — Exactly 4 ranking tables
  //   expect(tableCount).toBe(4);
  // });

  // // ─── TC04: Column Headers Not Empty ──────────────────────────────────────

  // test('TC04 - Column headers của tất cả bảng không trống và không bị lỗi font', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();
  //   const headerTexts = await rankingPage.getAllColumnHeaderTexts();

  //   // Assert — Column headers exist
  //   expect(headerTexts.length).toBeGreaterThan(0);

  //   // Expected column headers across all 4 tables
  //   const expectedHeaders = ['期間', '【前日】', '【週間】', '【月間】', '【通算】'];
  //   for (const expected of expectedHeaders) {
  //     expect(
  //       headerTexts.some((h) => h === expected),
  //       `Column header "${expected}" should be present`,
  //     ).toBe(true);
  //   }
  // });

  // // ─── TC05: Table 4 Headers (写真総数/NICE!/ファン) ────────────────────────

  // test('TC05 - Bảng 4 (写真掲載数・NICE!数・ファン数) có đúng các cột', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();

  //   // Assert — Table 4 unique headers visible
  //   await expect(rankingPage.uploadCountHeader).toBeVisible();
  //   await expect(rankingPage.niceCountHeader).toBeVisible();
  //   await expect(rankingPage.fanCountHeader).toBeVisible();
  // });

  // // ─── TC06: Download Ranking Table Structure ───────────────────────────────

  // test('TC06 - Bảng Download Ranking có đầy đủ row ダウンロード数 và ランキング', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();

  //   // Assert — Download count row and ranking row exist
  //   await expect(rankingPage.downloadCountRow).toBeVisible();
  //   await expect(rankingPage.downloadRankingRow).toBeVisible();
  // });

  // // ─── TC07: Font Rendering — No Tofu Characters ───────────────────────────

  // test('TC07 - Không có lỗi font (không có ký tự tofu/garbled trên trang)', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();
  //   const garbledTexts = await rankingPage.getGarbledTextElements();

  //   // Assert — No garbled/tofu characters found
  //   expect(
  //     garbledTexts,
  //     `Found garbled text on ranking page: ${garbledTexts.join(', ')}`,
  //   ).toHaveLength(0);
  // });

  // // ─── TC08: Font Family Applied Correctly ─────────────────────────────────

  // test('TC08 - Font family được áp dụng đúng (Meiryo/Japanese fonts)', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();
  //   const fontFamilies = await rankingPage.getFontFamiliesOnPage();

  //   // Assert — At least one Japanese font family is used
  //   const hasJapaneseFont = fontFamilies.some(
  //     (font) =>
  //       /メイリオ|Meiryo|ヒラギノ|Hiragino|Noto/i.test(font),
  //   );
  //   expect(
  //     hasJapaneseFont,
  //     `Expected Japanese font family. Found: ${fontFamilies.join(' | ')}`,
  //   ).toBe(true);
  // });

  // // ─── TC09: Row Labels Rendered Correctly ─────────────────────────────────

  // test('TC09 - Row labels của tất cả bảng render đúng (không trống)', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();

  //   // Check row labels for all 4 tables
  //   const table1Labels = await rankingPage.getTableRowLabels(0);
  //   const table2Labels = await rankingPage.getTableRowLabels(1);
  //   const table3Labels = await rankingPage.getTableRowLabels(2);
  //   const table4Labels = await rankingPage.getTableRowLabels(3);

  //   // Assert — Each table has row labels
  //   expect(table1Labels.length).toBeGreaterThan(0);
  //   expect(table2Labels.length).toBeGreaterThan(0);
  //   expect(table3Labels.length).toBeGreaterThan(0);
  //   expect(table4Labels.length).toBeGreaterThan(0);

  //   // Assert — Known expected row labels are present
  //   expect(table1Labels).toContain('ダウンロード数');
  //   expect(table1Labels).toContain('ランキング');
  //   expect(table2Labels).toContain('獲得ポイント数');
  //   expect(table3Labels).toContain('PV数');
  //   expect(table4Labels).toContain('数');
  //   expect(table4Labels).toContain('ランキング');
  // });

  // // ─── TC10: Daily Report Section Present ──────────────────────────────────

  // test('TC10 - Section "毎日レポート" hiển thị và các checkbox hoạt động', async ({
  //   rankingPage,
  // }) => {
  //   // Act
  //   await rankingPage.goToRankingPage();

  //   // Assert — Report section heading visible
  //   await expect(rankingPage.dailyReportHeading).toBeVisible();

  //   // Assert — Checkboxes present
  //   await expect(rankingPage.dailyReportCheckbox).toBeVisible();
  //   await expect(rankingPage.monthlyReportCheckbox).toBeVisible();
  // });

  // // ─── TC11: Font Bug on Login Page — "口グイン" instead of "ログイン" ────────
  // // BUG DETECTED: On /auth/login, the "ログイン" button text is rendered as "口グイン"
  // // in the DOM (katakana ロ → kanji 口 font fallback). This test verifies the fix.

  // test('TC11 - Trang login không có lỗi font "口グイン" (ロ bị render thành 口)', async ({
  //   page,
  // }) => {
  //   // Act — Navigate to creator login page (without using loginAsCreator)
  //   await page.goto('/auth/login');
  //   await page.waitForLoadState('networkidle');

  //   // Assert — Page body text should NOT contain "口グイン" (garbled font)
  //   const bodyText = await page.locator('body').innerText();
  //   expect(
  //     bodyText,
  //     'Found garbled font: "口グイン" instead of "ログイン" — font rendering bug detected',
  //   ).not.toContain('口グイン');

  //   // Assert — "ログイン" button should render with correct text in DOM
  //   const loginButtonText = await page.locator('button[type="submit"]').first().textContent();
  //   expect(
  //     loginButtonText?.trim(),
  //     `Expected "ログイン" but found "${loginButtonText?.trim()}" — font rendering issue`,
  //   ).toBe('ログイン');
  // });
});

