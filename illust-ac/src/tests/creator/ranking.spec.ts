// import { test, expect } from '../../fixtures/base.fixture';

// /**
//  * Ranking Page Tests — Creator Portal
//  *
//  * Test URL: https://test-lien.ac-illust.com/creator/ranking
//  * Account: Creator
//  *
//  * Test objectives:
//  * 1. Verify ranking page loads and displays all 4 ranking sections
//  * 2. Verify data is present and not empty in table structure
//  * 3. Verify no font rendering errors (tofu/garbled characters)
//  */
// test.describe('Creator Ranking Page', () => {
//   // TC-RANKING-CREATOR-001: Page Navigation & Heading
//   test('TC-RANKING-CREATOR-001: Trang ranking hiển thị đúng heading và URL', async ({ rankingPage, page }) => {
//     // Act
//     await rankingPage.goToRankingPage();

//     // Assert
//     await test.step('Verify URL contains /creator/ranking', async () => {
//       await expect(page).toHaveURL(/\/creator\/ranking$/);
//     });

//     await test.step('Verify H1 heading displays "ランキング"', async () => {
//       await expect(rankingPage.pageHeading).toBeVisible();
//       await expect(rankingPage.pageHeading).toHaveText('ランキング');
//     });
//   });

//   // TC-RANKING-CREATOR-002: All 4 Ranking Sections Present
//   // test('TC-RANKING-CREATOR-002: Bốn section ranking đều hiển thị đầy đủ', async ({ rankingPage }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();

//   //   // Assert — All 4 section labels present
//   //   await expect(rankingPage.downloadRankingSection).toBeVisible();
//   //   await expect(rankingPage.licenseRankingSection).toBeVisible();
//   //   await expect(rankingPage.pageViewRankingSection).toBeVisible();
//   //   await expect(rankingPage.uploadNiceFanRankingSection).toBeVisible();
//   // });

//   // TC-RANKING-CREATOR-003: Table Count Correct
//   // test('TC-RANKING-CREATOR-003: Trang có đúng 4 bảng ranking', async ({ rankingPage }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();
//   //   const tableCount = await rankingPage.getTableCount();

//   //   // Assert — Exactly 4 ranking tables
//   //   expect(tableCount).toBe(4);
//   // });

//   // TC-RANKING-CREATOR-004: Column Headers Not Empty
//   // test('TC-RANKING-CREATOR-004: Column headers của tất cả bảng không trống và không bị lỗi font', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();
//   //   const headerTexts = await rankingPage.getAllColumnHeaderTexts();

//   //   // Assert — Headers present and non-empty
//   //   expect(headerTexts.length).toBeGreaterThan(0);
//   //   for (const header of headerTexts) {
//   //     expect(header.length).toBeGreaterThan(0);
//   //   }
//   // });

//   // TC-RANKING-CREATOR-005: Table 4 Columns Correct
//   // test('TC-RANKING-CREATOR-005: Bảng 4 (写真掲載数・NICE!数・ファン数) có đúng các cột', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();

//   //   // Assert — Table 4 headers visible
//   //   await expect(rankingPage.uploadCountHeader).toBeVisible();
//   //   await expect(rankingPage.niceCountHeader).toBeVisible();
//   //   await expect(rankingPage.fanCountHeader).toBeVisible();
//   // });

//   // TC-RANKING-CREATOR-006: Download Ranking Rows
//   // test('TC-RANKING-CREATOR-006: Bảng Download Ranking có đầy đủ row ダウンロード数 và ランキング', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();

//   //   // Assert — Rows visible in first table
//   //   await expect(rankingPage.downloadCountRow).toBeVisible();
//   //   await expect(rankingPage.downloadRankingRow).toBeVisible();
//   // });

//   // TC-RANKING-CREATOR-007: Font Rendering (No Tofu / Replacement Chars)
//   // test('TC-RANKING-CREATOR-007: Không có lỗi font (không có ký tự tofu/garbled trên trang)', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();
//   //   const garbled = await rankingPage.getGarbledTextElements();

//   //   // Assert — No garbled characters found
//   //   expect(
//   //     garbled,
//   //     `Found ${garbled.length} garbled/tofu text elements: ${JSON.stringify(garbled)}`,
//   //   ).toHaveLength(0);
//   // });

//   // TC-RANKING-CREATOR-008: Font Family Applied Correctly
//   // test('TC-RANKING-CREATOR-008: Font family được áp dụng đúng (Meiryo/Japanese fonts)', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();
//   //   const fonts = await rankingPage.getFontFamiliesOnPage();

//   //   // Assert — At least one font matches Japanese system fonts
//   //   const hasJapaneseFont = fonts.some((font) =>
//   //     /メイリオ|Meiryo|ヒラギノ|Hiragino|Noto/i.test(font),
//   //   );
//   //   expect(hasJapaneseFont, `Fonts found: ${fonts.join(', ')}`).toBe(true);
//   // });

//   // TC-RANKING-CREATOR-009: Row Labels Render Correctly (Not Empty)
//   // test('TC-RANKING-CREATOR-009: Row labels của tất cả bảng render đúng (không trống)', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();

//   //   // Verify Table 1 (Download Ranking) row labels
//   //   const table1Labels = await rankingPage.getTableRowLabels(0);
//   //   expect(table1Labels.length).toBeGreaterThanOrEqual(2);
//   //   expect(table1Labels).toContain('ダウンロード数');
//   //   expect(table1Labels).toContain('ランキング');

//   //   // Verify Table 2 (License Sales) row labels
//   //   const table2Labels = await rankingPage.getTableRowLabels(1);
//   //   expect(table2Labels.length).toBeGreaterThanOrEqual(2);
//   //   expect(table2Labels).toContain('ダウンロード数');
//   //   expect(table2Labels).toContain('獲得ポイント数');

//   //   // Verify Table 3 (Page Views) row labels
//   //   const table3Labels = await rankingPage.getTableRowLabels(2);
//   //   expect(table3Labels.length).toBeGreaterThanOrEqual(2);
//   //   expect(table3Labels).toContain('PV数');
//   //   expect(table3Labels).toContain('ランキング');
//   // });

//   // TC-RANKING-CREATOR-010: Daily Report Checkboxes
//   // test('TC-RANKING-CREATOR-010: Section "毎日レポート" hiển thị và các checkbox hoạt động', async ({
//   //   rankingPage,
//   // }) => {
//   //   // Act
//   //   await rankingPage.goToRankingPage();

//   //   // Assert — Checkboxes visible
//   //   await expect(rankingPage.dailyReportHeading).toBeVisible();
//   //   await expect(rankingPage.dailyReportCheckbox).toBeVisible();
//   //   await expect(rankingPage.monthlyReportCheckbox).toBeVisible();
//   // });

//   // TC-RANKING-CREATOR-011: No '口グイン' Bug on Login Page
//   // test('TC-RANKING-CREATOR-011: Trang login không có lỗi font "口グイン" (ロ bị render thành 口)', async ({
//   //   page,
//   // }) => {
//   //   // Navigate directly to the login page
//   //   await page.goto('/login');

//   //   // Get all text content on the page
//   //   const pageContent = await page.content();

//   //   // Assert — Should NOT contain 口グイン (Kanji 口 instead of Katakana ロ)
//   //   // Correct Katakana: ログイン (U+30ED U+30B0 U+30A4 U+30F3)
//   //   // Buggy Kanji:      口グイン (U+53E3 U+30B0 U+30A4 U+30F3)
//   //   const hasKanjiBug = pageContent.includes('\u53E3\u30B0\u30A4\u30F3');
//   //   expect(hasKanjiBug, 'Found "口グイン" (Kanji 口 used instead of Katakana ロ)').toBe(false);
//   // });
// });
