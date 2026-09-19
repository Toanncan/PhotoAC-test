import { type Page, type Locator, test, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SearchResultPage — Page Object for the search results page.
 * Follows Playwright best practices with semantic locators and smart auto-waiting.
 */
export class SearchResultPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Image thumbnails displayed in search results */
  readonly resultItems: Locator = this.page.locator('img.thumbnail-image');

  /** Quickview link overlays on thumbnails */
  readonly quickViewOverlays: Locator = this.page.locator('.link-to-detail.quickview');

  /** Message displayed when no images match the search criteria */
  readonly noResultMessage: Locator = this.page.getByText('該当する写真がありませんでした。ページ下部よりリクエストも受け付けております。');

  /** Search results main heading (e.g. 「cat」の写真素材) */
  readonly resultHeading: Locator = this.page.getByRole('heading', { level: 1 });

  /** Result count / total text */
  readonly resultCount: Locator = this.page.locator('[class*="result-count"], [class*="total"], .count, h1[class*="result"]').first();

  /** Search keyword input box on results page */
  readonly searchInput: Locator = this.page.getByRole('searchbox', { name: 'キーワード（例：女性）' });

  /** Reset keyword button inside search box */
  readonly resetKeywordButton: Locator = this.page.getByRole('button', { name: 'リセット' });

  /** Submit search button */
  readonly searchSubmitButton: Locator = this.page.getByRole('button', { name: 'search_btn' });

  // ─── Sort Dropdown Locators ────────────────────────────────────────────────

  /** Dropdown toggle button for sorting & per-page count */
  readonly sortDropdownButton: Locator = this.page.locator('button:has-text("関連性の高い順"), button:has-text("新着順"), button:has-text("人気順")').first();

  /** Sort option: 関連性の高い順 (Relevance - default) */
  readonly sortRelevanceRadio: Locator = this.page.locator('#filter-srt-dlrank');
  readonly sortRelevanceLabel: Locator = this.page.locator('label[for="filter-srt-dlrank"]');

  /** Sort option: 新着順 (Newest) */
  readonly sortNewestRadio: Locator = this.page.locator('#filter-srt-releasedate');
  readonly sortNewestLabel: Locator = this.page.locator('label[for="filter-srt-releasedate"]');

  /** Sort option: 人気順 (Popularity - Premium only) */
  readonly sortPopularRadio: Locator = this.page.locator('#filter-srt-recent_popular');
  readonly sortPopularLabel: Locator = this.page.locator('label[for="filter-srt-recent_popular"]');

  /** Popover displayed when attempting to use Premium-only Popularity sort */
  readonly popularSortPopover: Locator = this.page.locator('.popover.show');
  readonly popularSortPopoverBody: Locator = this.page.locator('.popover.show .popover-body');

  // ─── Search Limit Modal Locators ──────────────────────────────────────────

  /** Modal displayed when user reaches the daily search limit (1日4回) */
  readonly searchLimitModal: Locator = this.page.locator('#searchLimitModal');

  /** Heading text inside search limit modal (無料のキーワード検索は「1日4回」までです。) */
  readonly searchLimitTitle: Locator = this.page.locator('#searchLimitModal b').first();

  /** Link to upgrade to Premium inside search limit modal */
  readonly searchLimitPremiumLink: Locator = this.page.locator('#searchLimitModal a:has-text("検索し放題のプレミアム会員になる")');

  /** Guest CTA to register inside search limit modal */
  readonly searchLimitRegisterCta: Locator = this.page.locator('#searchLimitModal .cta-pill');

  /** Free user coupon button inside search limit modal */
  readonly searchLimitCouponButton: Locator = this.page.locator('#btn-open-search-coupon');

  /** Close button for search limit modal */
  readonly searchLimitCloseButton: Locator = this.page.locator('#searchLimitModal button.close');

  // ─── Filter Toolbar Locators ───────────────────────────────────────────────

  /** Filter button: Category (カテゴリー) */
  readonly categoryFilterButton: Locator = this.page.locator('button:has-text("カテゴリー")').first();

  /** Filter button: File & Orientation (ファイル・向き) */
  readonly fileOrientationButton: Locator = this.page.locator('button:has-text("ファイル・向き")').first();

  /** Filter button: Color (色) */
  readonly colorFilterButton: Locator = this.page.locator('button:has-text("色")').first();

  /** Filter button: Person / Model Specification (人物指定) */
  readonly personFilterButton: Locator = this.page.locator('button:has-text("人物指定")').first();

  /** Filter button: Exclude Keyword (除外キーワード) */
  readonly excludeKeywordFilterButton: Locator = this.page.locator('button:has-text("除外キーワード")').first();

  /** Filter button: Detailed Search (詳細検索) */
  readonly detailedFilterButton: Locator = this.page.locator('button:has-text("詳細検索")').first();

  /** Filter button: Display Conditions (表示条件) */
  readonly displayConditionFilterButton: Locator = this.page.locator('button:has-text("表示条件")').first();

  // ─── Filter Option Locators ────────────────────────────────────────────────

  /** Orientation options inside "ファイル・向き" menu */
  readonly orientationAllLabel: Locator = this.page.locator('label[for="orientation-all"]');
  readonly orientationVerticalLabel: Locator = this.page.locator('label[for="orientation-0"]');
  readonly orientationHorizontalLabel: Locator = this.page.locator('label[for="orientation-1"]');

  /** PSD format option */
  readonly sizesecPsdLabel: Locator = this.page.locator('label[for="sizesec-psd"]');

  /** Exclude keyword input inside "除外キーワード" dropdown */
  readonly excludeKeywordInput: Locator = this.page.locator('#form_nq');

  /** Model count options inside "人物指定" menu */
  readonly modelCountZeroLabel: Locator = this.page.locator('label[for="model_count-0"]'); // 無人 (0 people)
  readonly modelCountOneLabel: Locator = this.page.locator('label[for="model_count-1"]');  // 1人 (1 person)
  readonly modelCountTwoLabel: Locator = this.page.locator('label[for="model_count-2"]');  // 2人 (2 people)

  /** Color options inside "色" dropdown */
  readonly colorRedOption: Locator = this.page.locator('label[for="color-ed1d25"]');
  readonly colorPinkOption: Locator = this.page.locator('label[for="color-ffc7f0"]');
  readonly colorBlueOption: Locator = this.page.locator('label[for="color-0000d6"]');

  /** Exact match checkbox (完全一致) inside "表示条件" */
  readonly exactMatchCheckbox: Locator = this.page.locator('#type_search');

  /** Exclude AI checkbox (AI生成ツール使用素材を除く) inside "表示条件" */
  readonly excludeAiCheckbox: Locator = this.page.locator('#exclude_ai');

  // ─── AI Search (AI検索) Locators ─────────────────────────────────────────

  /** AI Search toggle button on results page */
  readonly searchByAiButton: Locator = this.page.locator('.search-by-ai').first();

  /** Clock overlay icon indicating AI daily search limit reached */
  readonly aiLimitClockIcon: Locator = this.page.locator('.search-by-ai .overlay-icon-clock').first();

  /** AI Search ON icon */
  readonly aiSearchOnIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-on').first();

  /** AI Search OFF icon */
  readonly aiSearchOffIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-off').first();

  // ─── Pagination Locators ───────────────────────────────────────────────────

  /** Pagination container (ul.ac-pagination) */
  readonly paginationContainer: Locator = this.page.locator('ul.ac-pagination');

  /** Active / Current page number link */
  readonly paginationActivePage: Locator = this.page.locator('ul.ac-pagination li.active a');

  /** Next page button */
  readonly paginationNextButton: Locator = this.page.locator('ul.ac-pagination a.next, ul.ac-pagination a[rel="next"]');

  /** Previous page button */
  readonly paginationPrevButton: Locator = this.page.locator('ul.ac-pagination a.prev, ul.ac-pagination a[rel="prev"]');

  // ─── Constructor ──────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  /**
   * Wait for either search result items to appear or the "no results" message to be displayed.
   */
  async waitForResultDisplay(): Promise<void> {
    await test.step('Wait for search result display', async () => {
      await this.waitForPageLoadingIconHidden();

      try {
        await Promise.any([
          this.resultItems.first().waitFor({ state: 'visible', timeout: 20_000 }),
          this.noResultMessage.waitFor({ state: 'visible', timeout: 20_000 }),
        ]);
      } catch {
        throw new Error('Results page did not show result items or a no-results message within 20s.');
      }
    });
  }

  /**
   * Get the number of visible thumbnail results on the current page.
   */
  async getResultCount(): Promise<number> {
    return this.resultItems.count();
  }

  /**
   * Perform a new search from the results page header.
   */
  async searchAgain(keyword: string): Promise<void> {
    await test.step(`Search again with keyword: "${keyword}"`, async () => {
      await this.fillInput(this.searchInput, keyword);
      await this.page.keyboard.press('Enter');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click the reset button inside the search input.
   */
  async clickResetKeyword(): Promise<void> {
    await test.step('Click Reset keyword button', async () => {
      await this.clickElement(this.resetKeywordButton);
    });
  }

  /**
   * Open the sort dropdown menu.
   */
  async openSortDropdown(): Promise<void> {
    await test.step('Open sort dropdown menu', async () => {
      await this.clickElement(this.sortDropdownButton);
      await expect(this.sortRelevanceLabel).toBeVisible({ timeout: 5_000 });
    });
  }

  /**
   * Click the "新着順" (Newest) sort option.
   */
  async selectNewestSort(): Promise<void> {
    await test.step('Select "新着順" (Newest) sort', async () => {
      await this.openSortDropdown();
      await this.clickElement(this.sortNewestLabel);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click the "人気順" (Popularity) sort option which is blocked for free/guest users.
   */
  async clickPopularSort(): Promise<void> {
    await test.step('Click "人気順" (Popularity) sort option', async () => {
      await this.openSortDropdown();
      await this.clickElement(this.sortPopularLabel);
    });
  }

  /**
   * Get the text from the Premium upsell popover on popular sort.
   */
  async getPopularSortPopoverText(): Promise<string> {
    await expect(this.popularSortPopoverBody).toBeVisible({ timeout: 5_000 });
    return this.getText(this.popularSortPopoverBody);
  }

  /**
   * Open QuickView modal for a specific thumbnail index.
   */
  async openQuickView(index: number = 0): Promise<void> {
    await test.step(`Open QuickView for item index ${index}`, async () => {
      await this.quickViewOverlays.nth(index).click();
      await this.page.getByRole('dialog').waitFor({ state: 'visible', timeout: 10_000 });
    });
  }

  /**
   * Wait for search limit modal to be displayed.
   */
  async waitForSearchLimitModal(): Promise<void> {
    await test.step('Wait for Search Limit modal to be displayed', async () => {
      await expect(this.searchLimitModal).toBeVisible({ timeout: 10_000 });
    });
  }

  /**
   * Close the search limit modal.
   */
  async closeSearchLimitModal(): Promise<void> {
    await test.step('Close Search Limit modal', async () => {
      await this.clickElement(this.searchLimitCloseButton);
      await expect(this.searchLimitModal).toBeHidden({ timeout: 5_000 });
    });
  }

  // ─── Pagination Actions ───────────────────────────────────────────────────

  /**
   * Click the Next page button in pagination.
   */
  async goToNextPage(): Promise<void> {
    await test.step('Navigate to next page in pagination', async () => {
      await this.clickElement(this.paginationNextButton);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click the Previous page button in pagination.
   */
  async goToPrevPage(): Promise<void> {
    await test.step('Navigate to previous page in pagination', async () => {
      await this.clickElement(this.paginationPrevButton);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click a specific page number link in pagination.
   */
  async goToPageNumber(pageNumber: number): Promise<void> {
    await test.step(`Navigate to page ${pageNumber} in pagination`, async () => {
      const pageLink = this.paginationContainer.locator(`a:text-is("${pageNumber}")`);
      await this.clickElement(pageLink);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Get the active page number string from pagination.
   */
  async getActivePageNumber(): Promise<string> {
    return this.getText(this.paginationActivePage);
  }

  // ─── Category Search Actions ──────────────────────────────────────────────

  /**
   * Navigate directly to a specific category search URL.
   * @param categoryId - Category numeric ID (e.g. 1 for 人物, 3 for 動物・生き物)
   * @param categoryName - Category display name
   */
  async searchByCategory(categoryId: number, categoryName: string): Promise<void> {
    await test.step(`Search by category ID ${categoryId}: "${categoryName}"`, async () => {
      await this.navigate(`/main/search?c_id=${categoryId}&c_name=${encodeURIComponent(categoryName)}`);
      await this.waitForResultDisplay();
    });
  }

  // ─── Filter Toolbar Actions ───────────────────────────────────────────────

  /**
   * Filter by photo orientation (縦長, 横長, 全て) via the toolbar.
   * @param orientation - 'vertical' (0), 'horizontal' (1), or 'all'
   */
  async selectOrientation(orientation: 'vertical' | 'horizontal' | 'all'): Promise<void> {
    await test.step(`Filter by orientation: "${orientation}"`, async () => {
      await this.clickElement(this.fileOrientationButton);
      if (orientation === 'vertical') {
        await this.clickElement(this.orientationVerticalLabel);
      } else if (orientation === 'horizontal') {
        await this.clickElement(this.orientationHorizontalLabel);
      } else {
        await this.clickElement(this.orientationAllLabel);
      }
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Exclude Keyword (除外キーワード - nq) via the toolbar.
   * @param excludeKeyword - Keyword to exclude
   */
  async applyExcludeKeyword(excludeKeyword: string): Promise<void> {
    await test.step(`Apply exclude keyword: "${excludeKeyword}"`, async () => {
      await this.clickElement(this.excludeKeywordFilterButton);
      await this.fillInput(this.excludeKeywordInput, excludeKeyword);
      await this.page.keyboard.press('Enter');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Model Count (人物指定 - model_count) via the toolbar.
   * @param count - '0' (無人), '1' (1人), or '2' (2人)
   */
  async selectModelCount(count: '0' | '1' | '2'): Promise<void> {
    await test.step(`Filter by model count: "${count}"`, async () => {
      await this.clickElement(this.personFilterButton);
      if (count === '0') {
        await this.clickElement(this.modelCountZeroLabel);
      } else if (count === '1') {
        await this.clickElement(this.modelCountOneLabel);
      } else {
        await this.clickElement(this.modelCountTwoLabel);
      }
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Color (色) via the toolbar.
   * @param color - 'red' | 'pink' | 'blue'
   */
  async selectColor(color: 'red' | 'pink' | 'blue'): Promise<void> {
    await test.step(`Filter by color: "${color}"`, async () => {
      await this.clickElement(this.colorFilterButton);
      if (color === 'red') {
        await this.clickElement(this.colorRedOption);
      } else if (color === 'pink') {
        await this.clickElement(this.colorPinkOption);
      } else {
        await this.clickElement(this.colorBlueOption);
      }
      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate with combined query parameters (Multi-filter URL search).
   * @param params - Object containing search parameters (e.g. { q: 'cat', orientation: 0, srt: '-releasedate' })
   */
  async searchWithCombinedParams(params: Record<string, string | number>): Promise<void> {
    await test.step(`Search with combined params: ${JSON.stringify(params)}`, async () => {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        searchParams.set(key, String(value));
      }
      await this.navigate(`/main/search?${searchParams.toString()}`);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate to Recommended Search (おすすめ検索 - rcm=1&referer=more_recommended).
   */
  async goToRecommendedSearch(): Promise<void> {
    await test.step('Navigate to Recommended Search page', async () => {
      await this.navigate('/main/search?rcm=1&referer=more_recommended');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate to PSD Format Search (PSD素材検索 - sizesec=psd&referer=category_psd).
   */
  async goToPsdSearch(): Promise<void> {
    await test.step('Navigate to PSD Format Search page', async () => {
      await this.navigate('/main/search?sizesec=psd&referer=category_psd');
      await this.waitForResultDisplay();
    });
  }

  // ─── Backward-compatible Assertions (Prefer asserting in test specs) ────────

  async assertHasResults(minCount: number = 1): Promise<void> {
    const count = await this.getResultCount();
    await test.step(`assert Has Results : ${count} records`, async () => {
      expect(count, `Expect result count >= ${minCount}`).toBeGreaterThanOrEqual(minCount);
    });
  }

  async assertNoResults(): Promise<void> {
    await test.step('assert No Results', async () => {
      await expect(this.noResultMessage).toBeVisible();
    });
  }
}