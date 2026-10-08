import { type Page, type Locator, test, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SearchResultPage — Page Object for the search results page.
 * Follows Playwright best practices with semantic locators and smart auto-waiting.
 */
export class SearchResultPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Image thumbnails displayed in search results (standard search uses .thumbnail-image, AI/Image search uses .thumbnail) */
  readonly resultItems: Locator = this.page.locator('img.thumbnail-image, img.thumbnail');

  /** Quickview link overlays on thumbnails */
  readonly quickViewOverlays: Locator = this.page.locator('.link-to-detail.quickview');

  /** Message displayed when no images match the search criteria (keyword search or image upload search) */
  readonly noResultMessage: Locator = this.page.getByText(/該当する写真がありませんでした|写真は見つかりませんでした/);

  /** Combined locator matching either image results or no-results message (Playwright native .or) */
  readonly resultsOrNoResultLocator: Locator = this.resultItems.first().or(this.noResultMessage.first());

  /** Search results main heading (e.g. 「cat」の写真素材) */
  readonly resultHeading: Locator = this.page.getByRole('heading', { level: 1 });

  /** Result count / total text */
  readonly resultCount: Locator = this.page.locator('[class*="result-count"], [class*="total"], .count, h1[class*="result"]').first();

  /** Search keyword input box on results page */
  readonly searchInput: Locator = this.page.locator('form#search_frm input#sw, form#search_frm input[name="q"]').first();

  /** Reset keyword button inside search box */
  readonly resetKeywordButton: Locator = this.page.getByRole('button', { name: 'リセット' });

  /** Submit search button */
  readonly searchSubmitButton: Locator = this.page.locator('form#search_frm button.execloginbtn:visible, form#search_frm button[type="submit"]:visible').first();

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

  // ─── Display Count Locators (表示件数) ──────────────────────────────────────

  /** Display count option: 70 items per page (Default for Guest / Free) */
  readonly displayCount70Radio: Locator = this.page.locator('#pp-70');
  readonly displayCount70Label: Locator = this.page.locator('label[for="pp-70"]');

  /** Display count option: 140 items per page */
  readonly displayCount140Radio: Locator = this.page.locator('#pp-140');
  readonly displayCount140Label: Locator = this.page.locator('label[for="pp-140"]');

  /** Display count option: 210 items per page (Standard for Premium User) */
  readonly displayCount210Radio: Locator = this.page.locator('#pp-210');
  readonly displayCount210Label: Locator = this.page.locator('label[for="pp-210"]');

  // ─── Trends Page Locators (人気写真一覧 - /main/trends) ──────────────────────

  /** Sort select dropdown on Trends page (select#sort) */
  readonly trendsSortSelect: Locator = this.page.locator('select#sort');

  /** Display count select dropdown on Trends page (select#pagesize) */
  readonly trendsPageSizeSelect: Locator = this.page.locator('select#pagesize');

  // ─── Search Limit Modal Locators ──────────────────────────────────────────

  /** Modal displayed when user reaches the daily search limit (1日4回) */
  readonly searchLimitModal: Locator = this.page.locator('#searchLimitModal');

  /** Heading text inside search limit modal (無料のキーワード検索は「1日4回」までです。) */
  readonly searchLimitTitle: Locator = this.page.locator('#searchLimitModal b').first();

  /** Link to upgrade to Premium inside search limit modal */
  readonly searchLimitPremiumLink: Locator = this.page.locator('#searchLimitModal a:has-text("検索し放題のプレミアム会員になる")');

  /** Tooltip displayed when clicking Premium link inside search limit modal as guest (先にログインしてください。初めての方は無料会員登録) */
  readonly searchLimitTooltip: Locator = this.page
    .locator('.popover.show, .tooltip.show, [role="tooltip"]:visible')
    .filter({ hasText: '先にログインしてください' })
    .or(this.page.locator('.popover.show .popover-body, .tooltip.show .tooltip-inner').filter({ hasText: '先にログインしてください' }))
    .or(this.page.getByText('先にログインしてください。初めての方は無料会員登録').locator(':visible'));

  /** Guest CTA to register inside search limit modal */
  readonly searchLimitRegisterCta: Locator = this.page.locator('#searchLimitModal .cta-pill');

  /** Free user coupon button inside search limit modal */
  readonly searchLimitCouponButton: Locator = this.page.locator('#btn-open-search-coupon');

  /** Close button for search limit modal */
  readonly searchLimitCloseButton: Locator = this.page.locator('#searchLimitModal button.close');

  /** Coupon dialog displayed inside search limit modal when clicking "一日検索し放題券を使う" */
  readonly searchLimitCouponDialog: Locator = this.page.locator('#search-limit-coupon-dialog');

  /** Title inside coupon dialog (一日検索し放題券がありません。 / 一日検索し放題チケットが...枚あります。) */
  readonly searchLimitCouponTitle: Locator = this.page.locator('#search-limit-coupon-dialog .modal-title');

  /** Back button ("戻る") inside coupon dialog to return to main search limit dialog */
  readonly searchLimitCouponBackButton: Locator = this.page.locator('#search-limit-coupon-dialog .btn-back');

  /** Action button ("獲得方法" or "使用する") inside coupon dialog */
  readonly searchLimitCouponActionLink: Locator = this.page.locator('#search-limit-coupon-dialog .action a.ac-btn-photo');

  // ─── Filter Toolbar Locators ───────────────────────────────────────────────

  /** Filter button: Category (カテゴリー) */
  readonly categoryFilterButton: Locator = this.page.locator('#filter-dropdown-categories > button, button:has-text("カテゴリー")').first();

  /** Filter button: File & Orientation (ファイル・向き) */
  readonly fileOrientationButton: Locator = this.page.locator('#filter-dropdown-sizesec > button, button:has-text("ファイル・向き")').first();

  /** Filter button: Color (色) */
  readonly colorFilterButton: Locator = this.page.locator('#filter-dropdown-color > button, button:has-text("色")').first();

  /** Filter button: Person / Model Specification (人物指定) */
  readonly personFilterButton: Locator = this.page.locator('#filter-dropdown-other > button, button:has-text("人物指定")').first();

  /** Filter button: Exclude Keyword (除外キーワード) */
  readonly excludeKeywordFilterButton: Locator = this.page.locator('#filter-dropdown-exclude-kw > button, button:has-text("除外キーワード")').first();

  /** Filter button: Detailed Search (詳細検索) */
  readonly detailedFilterButton: Locator = this.page.locator('#filter-dropdown-detail > button, button:has-text("詳細検索")').first();

  /** Filter button: Display Conditions (表示条件) */
  readonly displayConditionFilterButton: Locator = this.page.locator('#filter-dropdown-display > button, button:has-text("表示条件")').first();

  /** Filter clear all link ("すべてクリア") displayed when any filter is active */
  readonly clearAllFiltersButton: Locator = this.page.getByRole('link', { name: 'すべてクリア' })
    .or(this.page.locator('a:has-text("すべてクリア")'));

  /** Active filter badges/chips displayed directly under the filter toolbar */
  readonly activeFilterBadges: Locator = this.page.locator('button:has(a[aria-label="削除"])');

  // ─── Filter Option Locators: 1. Category (カテゴリー) ──────────────────────
  readonly categoryPeopleLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i0"], #ddcl-c_names1-ddw label:has-text("人物")').first();
  readonly categoryBusinessLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i1"], #ddcl-c_names1-ddw label:has-text("ビジネス")').first();
  readonly categoryAnimalLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i2"], #ddcl-c_names1-ddw label:has-text("動物・生き物")').first();
  readonly categoryFloraLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i3"], #ddcl-c_names1-ddw label:has-text("花・植物")').first();
  readonly categoryFoodLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i4"], #ddcl-c_names1-ddw label:has-text("食べ物・飲み物")').first();
  readonly categoryTownLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i5"], #ddcl-c_names1-ddw label:has-text("町並み・建物")').first();
  readonly categoryNatureLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names1-i9"], #ddcl-c_names1-ddw label:has-text("自然・風景")').first();

  // ─── Filter Option Locators: 2. File & Orientation (ファイル・向き) ───────────
  readonly orientationAllLabel: Locator = this.page.locator('#filter-dropdown-sizesec label[for="orientation-all"], label[for="orientation-all"]').first();
  readonly orientationVerticalLabel: Locator = this.page.locator('#filter-dropdown-sizesec label[for="orientation-0"], label[for="orientation-0"]').first();
  readonly orientationHorizontalLabel: Locator = this.page.locator('#filter-dropdown-sizesec label[for="orientation-1"], label[for="orientation-1"]').first();
  readonly sizesecPsdLabel: Locator = this.page.locator('#filter-dropdown-sizesec label[for="sizesec-psd"], label[for="sizesec-psd"]').first();
  readonly sizesecMLabel: Locator = this.page.locator('#filter-dropdown-sizesec label[for="sizesec-m"], label[for="sizesec-m"]').first();
  readonly sizesecLLabel: Locator = this.page.locator('#filter-dropdown-sizesec label[for="sizesec-l"], label[for="sizesec-l"]').first();

  // ─── Filter Option Locators: 3. Color (色) ──────────────────────────────────
  readonly colorAllOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-all"], #filter-dropdown-color .bg-all, label[for="color-all"]').first();
  readonly colorRedOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-ed1d25"], #filter-dropdown-color .bg-ed1d25').first();
  readonly colorPinkOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-ffc7f0"], #filter-dropdown-color .bg-ffc7f0').first();
  readonly colorOrangeOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-f7931e"], #filter-dropdown-color .bg-f7931e').first();
  readonly colorYellowOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-fcee20"], #filter-dropdown-color .bg-fcee20').first();
  readonly colorGreenOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-039145"], #filter-dropdown-color .bg-039145').first();
  readonly colorLightGreenOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-8cdc2e"], #filter-dropdown-color .bg-8cdc2e').first();
  readonly colorCyanOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-48dbeb"], #filter-dropdown-color .bg-48dbeb').first();
  readonly colorBlueOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-0000d6"], #filter-dropdown-color .bg-0000d6').first();
  readonly colorWhiteOption: Locator = this.page.locator('#filter-dropdown-color label[for="color-ffffff"], #filter-dropdown-color .bg-ffffff').first();

  // ─── Filter Option Locators: 4. Person Specification (人物指定) ─────────────
  readonly modelCountAllLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-all"], #filter-dropdown-other label[for="model_count--1"]').first();
  readonly modelCountZeroLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-0"]').first(); // 無人 (0 people)
  readonly modelCountOneLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-1"]').first();   // 1人 (1 person)
  readonly modelCountTwoLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-2"]').first();   // 2人 (2 people)
  readonly modelCountThreePlusLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-3"]').first(); // 3人以上
  readonly ageBabyLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-A"]').first();   // 赤ちゃん
  readonly ageChildLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-K"]').first();  // 子供
  readonly ageYoungLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-W"]').first();  // 若者
  readonly ageAdultLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-O"]').first();  // 大人

  // ─── Filter Option Locators: 5. Exclude Keyword (除外キーワード) ────────────
  readonly excludeKeywordInput: Locator = this.page.locator('#filter-dropdown-exclude-kw #form_nq, #form_nq');

  // ─── Filter Option Locators: 6. Detailed Search (詳細検索) ──────────────────
  readonly detailedCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_creator, #form_creator');
  readonly detailedNgCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_ngcreator, #form_ngcreator');
  readonly detailedPhotoIdInput: Locator = this.page.locator('#filter-dropdown-detail #form_qid, #form_qid');

  // ─── Filter Option Locators: 7. Display Conditions (表示条件) ───────────────
  readonly exactMatchCheckbox: Locator = this.page.locator('#filter-dropdown-display #type_search, #type_search');
  readonly exactMatchLabel: Locator = this.page.locator('#filter-dropdown-display label[for="type_search"]').first();
  readonly excludeAiCheckbox: Locator = this.page.locator('#filter-dropdown-display #exclude_ai, #exclude_ai');
  readonly excludeAiLabel: Locator = this.page.locator('#filter-dropdown-display label[for="exclude_ai"]').first();
  readonly modelReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-on"]').first();
  readonly modelReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-all"]').first();
  readonly propertyReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-on"]').first();
  readonly propertyReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-all"]').first();

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

  // ─── Photo Detail AI Face Locators ─────────────────────────────────────────

  /** AI Face thumbnail links displayed on the photo detail page (.face-list a.face-item) */
  readonly faceItemLinks: Locator = this.page.locator('.face-list a.face-item');

  /** Introductory / promotional dialog popup (e.g. Premium feature tips dialog) */
  readonly introDialog: Locator = this.page.locator('dialog:has(a[href*="function_introduction"]), dialog[open], [role="dialog"]:has(.icon-close)');
  readonly introDialogCloseButton: Locator = this.page.locator('dialog .icon-close, dialog [aria-label="Close"], [role="region"][aria-label="Close"], dialog button.close');

  // ─── QuickView & Detail Modal Locators ─────────────────────────────────────
  readonly resultFigures: Locator = this.page.locator('figure.ac-ig-item');
  readonly quickViewModal: Locator = this.page.locator('#quickViewBox');
  readonly quickViewCloseButton: Locator = this.page.locator('.modal-quickview button.close, .modal-quickview [aria-label="Close"]').first();
  readonly guestRegisterPromptTitle: Locator = this.page.locator('#quickViewBox h6:has-text("会員登録で今すぐダウンロード！")');
  readonly guestRegisterCtaButton: Locator = this.page.locator('#quickViewBox a:has-text("無料ダウンロード")');
  readonly guestLoginLink: Locator = this.page.locator('#quickViewBox a:has-text("ログイン")');
  readonly premiumDownloadButtons: Locator = this.page.locator('#quickViewBox a.disable-on-click:has-text("JPEG")');

  // ─── Group Sites Locators (写真ACグループサイト) ─────────────────────────────────
  readonly designListContainer: Locator = this.page.locator('#design_list');
  readonly illustListContainer: Locator = this.page.locator('#illust_list');
  readonly silhouetteListContainer: Locator = this.page.locator('#slh_list');
  readonly videoListContainer: Locator = this.page.locator('#video_list');
  readonly designItems: Locator = this.page.locator('#design_list a.show-related-modal');
  readonly illustItems: Locator = this.page.locator('#illust_list a.show-related-modal');
  readonly silhouetteItems: Locator = this.page.locator('#slh_list a.show-related-modal');
  readonly videoItems: Locator = this.page.locator('#video_list a.show-related-modal');
  readonly relatedSearchModal: Locator = this.page.locator('#relatedSearchModal');
  readonly relatedModalNotice: Locator = this.page.locator('#relatedSearchModal .modal-body p');
  readonly relatedModalDownloadButton: Locator = this.page.locator('#relatedSearchModal a.ac-btn:has-text("ダウンロードページ")');
  readonly relatedModalCloseButton: Locator = this.page.locator('#relatedSearchModal button.close');

  // ─── Constructor ──────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  /**
   * Dismiss introductory/promotional dialog if visible on the page (e.g. Premium feature tips dialog).
   * Checks immediately without stalling test execution when no dialog is present.
   */
  async dismissIntroDialogIfPresent(): Promise<void> {
    try {
      if (await this.introDialog.first().isVisible().catch(() => false)) {
        if (await this.introDialogCloseButton.first().isVisible().catch(() => false)) {
          await this.introDialogCloseButton.first().click({ force: true }).catch(() => { });
        } else {
          await this.page.keyboard.press('Escape').catch(() => { });
        }
        await this.introDialog.first().waitFor({ state: 'hidden', timeout: 2_000 }).catch(() => { });
      }
    } catch {
      // Ignore if no dialog is present
    }
  }

  /**
   * Wait for either search result items to appear or the "no results" message to be displayed.
   * Uses Playwright native .or() locator to resolve immediately on whichever appears first,
   * without running unhandled 20s background promises or causing runner lag.
   * @param timeout - Maximum timeout in ms (default 15_000)
   */
  async waitForResultDisplay(timeout: number = 15_000): Promise<void> {
    await test.step('Wait for search result display', async () => {
      await this.waitForPageLoadingIconHidden();
      await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout });
      await this.dismissIntroDialogIfPresent();
    });
  }

  /**
   * Get the number of visible thumbnail results on the current page.
   * Uses Web-First auto-wait with unified locator to avoid counting during DOM transition gaps.
   * @param options - Optional timeout configuration
   */
  async getResultCount(options?: { timeout?: number }): Promise<number> {
    const timeout = options?.timeout ?? 10_000;
    await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout }).catch(() => { });
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
      await this.dismissIntroDialogIfPresent();
      await this.openToolbarDropdown(this.sortDropdownButton, this.sortRelevanceLabel);
    });
  }

  /**
   * Click the "新着順" (Newest) sort option.
   */
  async selectNewestSort(): Promise<void> {
    await test.step('Select "新着順" (Newest) sort', async () => {
      await this.openToolbarDropdown(this.sortDropdownButton, this.sortNewestLabel);
      await this.clickElement(this.sortNewestLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click the "人気順" (Popularity) sort option which is blocked for free/guest users.
   */
  async clickPopularSort(): Promise<void> {
    await test.step('Click "人気順" (Popularity) sort option', async () => {
      await this.openToolbarDropdown(this.sortDropdownButton, this.sortPopularLabel);
      await this.clickElement(this.sortPopularLabel, { force: true });
    });
  }

  /**
   * Select "人気順" (Popularity) sort option for Premium users and wait for results.
   */
  async selectPopularSort(): Promise<void> {
    await test.step('Select "人気順" (Popularity) sort for Premium user', async () => {
      await this.openToolbarDropdown(this.sortDropdownButton, this.sortPopularLabel);
      await this.clickElement(this.sortPopularLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select "関連性の高い順" (Relevance) sort option and wait for results.
   */
  async selectRelevanceSort(): Promise<void> {
    await test.step('Select "関連性の高い順" (Relevance) sort', async () => {
      await this.openToolbarDropdown(this.sortDropdownButton, this.sortRelevanceLabel);
      await this.clickElement(this.sortRelevanceLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select display count per page (70, 140, 210 items).
   */
  async selectDisplayCount(count: '70' | '140' | '210'): Promise<void> {
    await test.step(`Select display count: ${count} items per page`, async () => {
      const targetLabel = count === '210'
        ? this.displayCount210Label
        : (count === '140' ? this.displayCount140Label : this.displayCount70Label);
      await this.openToolbarDropdown(this.sortDropdownButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
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

  /**
   * Click premium upgrade link inside search limit modal.
   */
  async clickSearchLimitPremiumLink(): Promise<void> {
    await test.step('Click premium link in Search Limit modal', async () => {
      await this.searchLimitPremiumLink.scrollIntoViewIfNeeded().catch(() => { });
      await this.clickElement(this.searchLimitPremiumLink);
    });
  }

  /**
   * Click coupon button inside search limit modal to open coupon dialog.
   */
  async openSearchLimitCouponDialog(): Promise<void> {
    await test.step('Click coupon button in Search Limit modal', async () => {
      await this.clickElement(this.searchLimitCouponButton);
      await expect(this.searchLimitCouponDialog).toBeVisible({ timeout: 5_000 });
    });
  }

  /**
   * Click "戻る" (Back) button inside coupon dialog to return to main search limit view.
   */
  async backFromCouponDialog(): Promise<void> {
    await test.step('Click "戻る" (Back) button in coupon dialog', async () => {
      await this.clickElement(this.searchLimitCouponBackButton);
      await expect(this.searchLimitCouponDialog).toBeHidden({ timeout: 5_000 });
    });
  }

  // ─── Pagination Actions ───────────────────────────────────────────────────

  /**
   * Click the Next page button in pagination with ArrowRight keyboard fallback.
   */
  async goToNextPage(): Promise<void> {
    await test.step('Navigate to next page in pagination', async () => {
      const currentPage = await this.getActivePageNumber().catch(() => '1');
      const targetPage = String(Number(currentPage) + 1);

      // Scroll element into center of viewport to avoid bottom fixed banners (Cookie, Signup CTA)
      await this.paginationNextButton.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => { });

      const checkNavigated = async (timeoutMs: number): Promise<boolean> => {
        return this.page.waitForFunction(
          (target) => {
            const activeEl = document.querySelector('ul.ac-pagination li.active a');
            const url = window.location.href;
            return (activeEl && activeEl.textContent?.trim() === target) || url.includes(`p=${target}`);
          },
          targetPage,
          { timeout: timeoutMs }
        ).then(() => true).catch(() => false);
      };

      let clicked = false;
      try {
        // Ưu tiên tương tác người dùng thật: Click nút Next trực tiếp trên giao diện
        await this.paginationNextButton.click({ timeout: 5_000 });
        clicked = true;
      } catch {
        // Nếu không click được (nút bị che, bị overlay hoặc lỗi tương tác) -> Fallback bấm phím ArrowRight
        await this.page.keyboard.press('ArrowRight');
      }

      // Chờ trang chuyển sang targetPage
      let navigated = await checkNavigated(6_000);

      // Nếu đã click được nhưng sau 6s trang vẫn chưa chuyển (click bị nuốt) -> Thử bấm phím ArrowRight
      if (!navigated && clicked) {
        await this.page.keyboard.press('ArrowRight');
        navigated = await checkNavigated(6_000);
      }

      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate to next page using the ArrowRight keyboard shortcut.
   */
  async goToNextPageByKeyboard(): Promise<void> {
    await test.step('Navigate to next page via ArrowRight keyboard shortcut', async () => {
      const currentPage = await this.getActivePageNumber().catch(() => '1');
      const targetPage = String(Number(currentPage) + 1);
      await this.page.keyboard.press('ArrowRight');
      await this.page.waitForFunction(
        (target) => {
          const activeEl = document.querySelector('ul.ac-pagination li.active a');
          const url = window.location.href;
          return (activeEl && activeEl.textContent?.trim() === target) || url.includes(`p=${target}`);
        },
        targetPage,
        { timeout: 15_000 }
      ).catch(() => { });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click the Previous page button in pagination with ArrowLeft keyboard fallback.
   */
  async goToPrevPage(): Promise<void> {
    await test.step('Navigate to previous page in pagination', async () => {
      const currentPage = await this.getActivePageNumber().catch(() => '2');
      const targetPage = String(Math.max(1, Number(currentPage) - 1));

      // Scroll element into center of viewport to avoid bottom fixed banners
      await this.paginationPrevButton.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => { });

      const checkNavigated = async (timeoutMs: number): Promise<boolean> => {
        return this.page.waitForFunction(
          (target) => {
            const activeEl = document.querySelector('ul.ac-pagination li.active a');
            const url = window.location.href;
            return (activeEl && activeEl.textContent?.trim() === target) || (target === '1' && !url.includes('p=2'));
          },
          targetPage,
          { timeout: timeoutMs }
        ).then(() => true).catch(() => false);
      };

      let clicked = false;
      try {
        // Ưu tiên tương tác người dùng thật: Click nút Prev trực tiếp trên giao diện
        await this.paginationPrevButton.click({ timeout: 5_000 });
        clicked = true;
      } catch {
        // Nếu không click được -> Fallback bấm phím ArrowLeft
        await this.page.keyboard.press('ArrowLeft');
      }

      let navigated = await checkNavigated(6_000);

      if (!navigated && clicked) {
        await this.page.keyboard.press('ArrowLeft');
        navigated = await checkNavigated(6_000);
      }

      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate to previous page using the ArrowLeft keyboard shortcut.
   */
  async goToPrevPageByKeyboard(): Promise<void> {
    await test.step('Navigate to previous page via ArrowLeft keyboard shortcut', async () => {
      const currentPage = await this.getActivePageNumber().catch(() => '2');
      const targetPage = String(Math.max(1, Number(currentPage) - 1));
      await this.page.keyboard.press('ArrowLeft');
      await this.page.waitForFunction(
        (target) => {
          const activeEl = document.querySelector('ul.ac-pagination li.active a');
          const url = window.location.href;
          return (activeEl && activeEl.textContent?.trim() === target) || (target === '1' && !url.includes('p=2'));
        },
        targetPage,
        { timeout: 15_000 }
      ).catch(() => { });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click a specific page number link in pagination.
   */
  async goToPageNumber(pageNumber: number): Promise<void> {
    await test.step(`Navigate to page ${pageNumber} in pagination`, async () => {
      const pageLink = this.paginationContainer.locator(`a:text-is("${pageNumber}")`);
      await pageLink.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => { });
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
   * Select a category directly from the Filter Toolbar dropdown menu (UI interaction).
   * @param categoryName - Display name (e.g. '人物', 'ビジネス', '動物・生き物', '自然・風景')
   */
  async selectCategoryFromToolbar(categoryName: string): Promise<void> {
    await test.step(`Select category "${categoryName}" from Toolbar`, async () => {
      await this.clickElement(this.categoryFilterButton);
      const ddclSelector = this.page.locator('#filter-dropdown-categories #ddcl-c_names1, #ddcl-c_names1').first();
      await this.clickElement(ddclSelector);
      const categoryOption = this.page.locator(`#filter-dropdown-categories label:has-text("${categoryName}")`).first();
      await this.clickElement(categoryOption, { force: true });
      await this.page.keyboard.press('Enter');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate directly to a specific category search URL (legacy shortcut).
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
   * Safely opens a toolbar dropdown menu and ensures the target option is visible AND settled.
   * Handles hydration delays, layout shifts, and CSS animations across all browsers.
   *
   * The whole "open → verify" sequence runs inside a single retry block, so if the menu auto-collapses
   * (pjax re-render of the toolbar, CSS transition) between the check and the caller's click,
   * the next attempt re-opens it instead of leaving the caller waiting on a hidden option.
   * "Settled" = still visible after two render frames. A trial click is intentionally NOT used:
   * Bootstrap custom-control labels are overlaid by their hidden <input>, which intercepts pointer events.
   * @param dropdownButton - The dropdown toggle button
   * @param expectedOption - The option locator inside the dropdown menu that should become visible
   * @param timeout - Maximum timeout in ms (default 15_000)
   */
  async openToolbarDropdown(dropdownButton: Locator, expectedOption: Locator, timeout: number = 15_000): Promise<void> {
    await this.waitForPageLoadingIconHidden(10_000);
    await expect(async () => {
      const isVisible = await expectedOption.isVisible().catch(() => false);
      if (!isVisible) {
        await dropdownButton.scrollIntoViewIfNeeded().catch(() => { });
        await dropdownButton.click({ timeout: 3_000, noWaitAfter: true });
      }
      await expect(expectedOption).toBeVisible({ timeout: 2_000 });
      await this.page.evaluate(() => new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }));
      await expect(expectedOption).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout, intervals: [500, 1_000, 1_500] });
  }

  /**
   * Clear all active filters on the search results page if any filter is currently applied.
   * Clicks "すべてクリア" link when visible and waits for search results to refresh.
   */
  async clearAllFilters(): Promise<void> {
    await test.step('Clear all active filters "すべてクリア"', async () => {
      const isClearVisible = await this.clearAllFiltersButton.first().isVisible({ timeout: 1_500 }).catch(() => false);
      if (isClearVisible) {
        await this.clickElement(this.clearAllFiltersButton.first());
        await this.waitForResultDisplay();
      }
    });
  }

  /**
   * Check whether any active filters are currently applied on the search results page.
   */
  async hasActiveFilters(): Promise<boolean> {
    return this.clearAllFiltersButton.first().isVisible().catch(() => false);
  }

  /**
   * Get a specific active filter badge by its label text.
   * @param label - Label text displayed in the badge (e.g. '縦長', '横長', '人物', '無人', '1人', '2人', '3人以上', '若者', '取得済のみ', '完全一致')
   */
  getActiveFilterBadge(label: string): Locator {
    return this.activeFilterBadges.filter({ hasText: label }).first();
  }

  /**
   * Get an active color filter badge by its hex color value.
   * @param hexColor - Hex color string without '#' (e.g. '0000d6' for blue)
   */
  getActiveColorBadge(hexColor: string): Locator {
    return this.activeFilterBadges.locator(`span[style*="${hexColor}"]`).first();
  }

  /**
   * Filter by photo orientation (縦長, 横長, 全て) via the toolbar.
   * @param orientation - 'vertical' (0), 'horizontal' (1), or 'all'
   */
  async selectOrientation(orientation: 'vertical' | 'horizontal' | 'all'): Promise<void> {
    await test.step(`Filter by orientation: "${orientation}"`, async () => {
      const targetLabel = orientation === 'vertical'
        ? this.orientationVerticalLabel
        : (orientation === 'horizontal' ? this.orientationHorizontalLabel : this.orientationAllLabel);

      await this.openToolbarDropdown(this.fileOrientationButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by PSD format via the "ファイル・向き" toolbar dropdown.
   */
  async selectPsdFormat(): Promise<void> {
    await test.step('Filter by PSD format via toolbar', async () => {
      await this.openToolbarDropdown(this.fileOrientationButton, this.sizesecPsdLabel);
      await this.clickElement(this.sizesecPsdLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by image size (Mサイズ以上 or Lサイズ) via "ファイル・向き" toolbar dropdown.
   * @param size - 'm' (Mサイズ以上) or 'l' (Lサイズ)
   */
  async selectSize(size: 'm' | 'l'): Promise<void> {
    await test.step(`Filter by image size "${size}" via toolbar`, async () => {
      const targetLabel = size === 'm' ? this.sizesecMLabel : this.sizesecLLabel;
      await this.openToolbarDropdown(this.fileOrientationButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Exclude Keyword (除外キーワード - nq) via the toolbar.
   * @param excludeKeyword - Keyword to exclude
   */
  async applyExcludeKeyword(excludeKeyword: string): Promise<void> {
    await test.step(`Apply exclude keyword: "${excludeKeyword}"`, async () => {
      await this.openToolbarDropdown(this.excludeKeywordFilterButton, this.excludeKeywordInput);
      await this.fillInput(this.excludeKeywordInput, excludeKeyword);
      await this.page.keyboard.press('Enter');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Model Count (人物指定 - model_count) via the toolbar.
   * Supports '0' (無人), '1' (1人), '2' (2人), '3' (3人以上), or '-1' (全て).
   * @param count - '0' | '1' | '2' | '3' | '-1'
   */
  async selectModelCount(count: '0' | '1' | '2' | '3' | '-1'): Promise<void> {
    await test.step(`Filter by model count: "${count}"`, async () => {
      let targetLabel = this.modelCountAllLabel;
      if (count === '0') {
        targetLabel = this.modelCountZeroLabel;
      } else if (count === '1') {
        targetLabel = this.modelCountOneLabel;
      } else if (count === '2') {
        targetLabel = this.modelCountTwoLabel;
      } else if (count === '3') {
        targetLabel = this.modelCountThreePlusLabel;
      }

      await this.openToolbarDropdown(this.personFilterButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Model Age (年代: 赤ちゃん, 子供, 若者, 大人) via the toolbar.
   * @param age - 'baby' (A) | 'child' (K) | 'young' (W) | 'adult' (O)
   */
  async selectAge(age: 'baby' | 'child' | 'young' | 'adult'): Promise<void> {
    await test.step(`Filter by age: "${age}" via toolbar`, async () => {
      let targetLabel = this.ageYoungLabel;
      switch (age) {
        case 'baby':
          targetLabel = this.ageBabyLabel;
          break;
        case 'child':
          targetLabel = this.ageChildLabel;
          break;
        case 'young':
          targetLabel = this.ageYoungLabel;
          break;
        case 'adult':
          targetLabel = this.ageAdultLabel;
          break;
      }

      await this.openToolbarDropdown(this.personFilterButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Color (色) via the toolbar.
   * @param color - 'red' | 'pink' | 'orange' | 'yellow' | 'green' | 'blue' | 'white' | 'all'
   */
  async selectColor(color: 'red' | 'pink' | 'orange' | 'yellow' | 'green' | 'blue' | 'white' | 'all'): Promise<void> {
    await test.step(`Filter by color: "${color}"`, async () => {
      let targetOption = this.colorAllOption;
      switch (color) {
        case 'red':
          targetOption = this.colorRedOption;
          break;
        case 'pink':
          targetOption = this.colorPinkOption;
          break;
        case 'orange':
          targetOption = this.colorOrangeOption;
          break;
        case 'yellow':
          targetOption = this.colorYellowOption;
          break;
        case 'green':
          targetOption = this.colorGreenOption;
          break;
        case 'blue':
          targetOption = this.colorBlueOption;
          break;
        case 'white':
          targetOption = this.colorWhiteOption;
          break;
        case 'all':
        default:
          targetOption = this.colorAllOption;
          break;
      }
      await this.openToolbarDropdown(this.colorFilterButton, targetOption);
      await this.clickElement(targetOption, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Model Release (モデルリリース取得済のみ - mdlrlrsec) via Display Conditions menu.
   * @param enable - true to enable (mdlrlrsec=on), false for all
   */
  async selectModelRelease(enable: boolean = true): Promise<void> {
    await test.step(`Filter by Model Release: ${enable ? 'Obtained Only' : 'All'}`, async () => {
      const targetLabel = enable ? this.modelReleaseOnLabel : this.modelReleaseAllLabel;

      await this.openToolbarDropdown(this.displayConditionFilterButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Property Release (プロパティリリース取得済のみ - prprlrsec) via Display Conditions menu.
   * @param enable - true to enable (prprlrsec=on)
   */
  async selectPropertyRelease(enable: boolean = true): Promise<void> {
    await test.step(`Filter by Property Release: ${enable ? 'Obtained Only' : 'All'}`, async () => {
      const targetLabel = enable ? this.propertyReleaseOnLabel : this.propertyReleaseAllLabel;

      await this.openToolbarDropdown(this.displayConditionFilterButton, targetLabel);
      await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Toggle Exclude AI (AI生成ツール使用素材を除く - exclude_ai) via Display Conditions menu.
   * @param enable - true to exclude AI, false to allow AI
   */
  async toggleExcludeAi(enable: boolean = true): Promise<void> {
    await test.step(`Toggle Exclude AI filter: ${enable}`, async () => {
      await this.openToolbarDropdown(this.displayConditionFilterButton, this.excludeAiLabel);
      const isCurrentlyChecked = await this.excludeAiCheckbox.isChecked().catch(() => false);
      if (isCurrentlyChecked !== enable) {
        await this.clickElement(this.excludeAiLabel, { force: true, noWaitAfter: true });
        await this.waitForResultDisplay();
      }
    });
  }

  /**
   * Toggle Exact Match (完全一致 - type_search=phrase) via Display Conditions menu.
   * @param enable - true to enable exact match, false otherwise
   */
  async toggleExactMatch(enable: boolean = true): Promise<void> {
    await test.step(`Toggle Exact Match filter: ${enable}`, async () => {
      await this.openToolbarDropdown(this.displayConditionFilterButton, this.exactMatchLabel);
      const isCurrentlyChecked = await this.exactMatchCheckbox.isChecked().catch(() => false);
      if (isCurrentlyChecked !== enable) {
        await this.clickElement(this.exactMatchLabel, { force: true, noWaitAfter: true });
        await this.waitForResultDisplay();
      }
    });
  }

  /**
   * Search by exact Photo ID (素材ID) using the Detailed Search menu.
   * @param photoId - Numeric photo ID (e.g. '1597634')
   */
  async filterByDetailedPhotoId(photoId: string): Promise<void> {
    await test.step(`Filter by Photo ID "${photoId}" via Detailed Search`, async () => {
      await this.openToolbarDropdown(this.detailedFilterButton, this.detailedPhotoIdInput);
      await expect(this.detailedPhotoIdInput).toBeVisible({ timeout: 5_000 });
      await this.detailedPhotoIdInput.fill(photoId);
      await this.page.keyboard.press('Enter');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Search by Creator Name using the Detailed Search menu (UI interaction).
   * @param creatorName - Creator display name (defaults to 'Acworks')
   */
  async searchByDetailedCreator(creatorName: string = 'Acworks'): Promise<void> {
    await test.step(`Search by Creator "${creatorName}" via Detailed Search`, async () => {
      const creatorPlaceholder = this.page.locator('#filter-dropdown-detail span:has-text("クリエイター名を入力")').first();
      await this.openToolbarDropdown(this.detailedFilterButton, creatorPlaceholder);
      await this.clickElement(creatorPlaceholder, { force: true });
      await this.page.keyboard.type(creatorName);
      await this.page.keyboard.press('Enter');
      await this.page.keyboard.press('Enter');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Search excluding Creator Name using the Detailed Search menu (UI interaction).
   * @param ngCreatorName - Creator name to exclude (defaults to 'Acworks')
   */
  async searchByDetailedNgCreator(ngCreatorName: string = 'Acworks'): Promise<void> {
    await test.step(`Search excluding Creator "${ngCreatorName}" via Detailed Search`, async () => {
      const ngPlaceholder = this.page.locator('#filter-dropdown-detail .placeholder:has-text("除外クリエイター名を入力"), #filter-dropdown-detail .tag-editor').first();
      await this.openToolbarDropdown(this.detailedFilterButton, ngPlaceholder);
      await this.clickElement(ngPlaceholder, { force: true });
      await this.page.keyboard.type(ngCreatorName);
      await this.page.keyboard.press('Enter');
      await this.page.keyboard.press('Enter');
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

  /**
   * Navigate to Trends Page (人気写真一覧 - /main/trends).
   */
  async goToTrendsPage(): Promise<void> {
    await test.step('Navigate to Trends Page (/main/trends)', async () => {
      await this.navigate('/main/trends');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select sort option on Trends page using native select#sort.
   * @param sort - 'dlrank' (ダウンロード数順 - default) or '-releasedate' (新着順)
   */
  async selectTrendsSort(sort: 'dlrank' | '-releasedate'): Promise<void> {
    await test.step(`Select sort option on Trends page: "${sort}"`, async () => {
      await this.trendsSortSelect.selectOption(sort);
      await this.page.waitForLoadState('domcontentloaded');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select display count on Trends page using native select#pagesize.
   * @param count - '70' | '140' | '210'
   */
  async selectTrendsDisplayCount(count: '70' | '140' | '210'): Promise<void> {
    await test.step(`Select display count on Trends page: ${count} items`, async () => {
      await this.trendsPageSizeSelect.selectOption(count);
      await this.page.waitForLoadState('domcontentloaded');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate directly to a specific photo detail page.
   * @param photoId - Numeric photo ID (e.g. '35133353')
   */
  async goToPhotoDetail(photoId: string): Promise<void> {
    await test.step(`Navigate to photo detail page: ${photoId}`, async () => {
      await this.navigate(`/main/detail/${photoId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Click an AI Face thumbnail from the photo detail page to perform vector face search.
   * Modifies link target to remain in the same tab.
   * @param index - Index of the face thumbnail (defaults to 0)
   */
  async clickAiFaceThumbnail(index: number = 0): Promise<void> {
    await test.step(`Click AI Face thumbnail index ${index}`, async () => {
      const faceLink = this.faceItemLinks.nth(index);
      await expect(faceLink).toBeVisible({ timeout: 15_000 });
      await faceLink.evaluate((el: HTMLAnchorElement) => {
        el.removeAttribute('target');
        el.removeAttribute('rel');
      });
      await this.clickElement(faceLink);
      await this.page.waitForLoadState('domcontentloaded').catch(() => { });
      await this.waitForResultDisplay();
    });
  }

  /**
   * Open detail page for a specific search result thumbnail (Free user behavior).
   * Hovers over figure, strips target="_blank" to ensure same-tab navigation, and clicks the detail link.
   * @param index - Index of figure item (default 0)
   */
  async openDetailPageForItem(index: number = 0): Promise<void> {
    await test.step(`Open detail page for item index ${index}`, async () => {
      const figure = this.resultFigures.nth(index);
      await figure.hover();
      const detailLink = figure.locator('a.link-to-detail');
      await expect(detailLink).toBeAttached({ timeout: 10_000 });
      await detailLink.evaluate((el: HTMLAnchorElement) => {
        el.removeAttribute('target');
        el.removeAttribute('rel');
      });
      await this.clickElement(detailLink, { force: true });
    });
  }

  /**
   * Open QuickView modal for a specific search result figure by hovering then clicking.
   * @param index - Index of figure item (default 0)
   */
  async openQuickViewForItem(index: number = 0): Promise<void> {
    await test.step(`Open QuickView modal for item index ${index}`, async () => {
      const figure = this.resultFigures.nth(index);
      await figure.hover();
      const qvOverlay = figure.locator('.link-to-detail.quickview');
      await this.clickElement(qvOverlay, { force: true });
      await expect(this.quickViewModal).toBeVisible({ timeout: 10_000 });
    });
  }

  /**
   * Get direct download button in QuickView modal by size ('S' | 'M' | 'L').
   * Matches exact size prefix (e.g. "S JPEG", "M JPEG", "L JPEG") to prevent strict-mode substring conflicts with file sizes like '0.19M', '1.33M'.
   */
  getQuickViewDownloadButton(size: 'S' | 'M' | 'L'): Locator {
    return this.quickViewModal.locator('a.disable-on-click').filter({ hasText: new RegExp(`^\\s*${size}\\s+JPEG`, 'i') });
  }

  /**
   * Close QuickView modal via close button or Escape key.
   */
  async closeQuickViewModal(): Promise<void> {
    await test.step('Close QuickView modal', async () => {
      const isCloseBtnVisible = await this.quickViewCloseButton.isVisible().catch(() => false);
      if (isCloseBtnVisible) {
        await this.clickElement(this.quickViewCloseButton);
      } else {
        await this.page.keyboard.press('Escape');
      }
      await expect(this.quickViewModal).toBeHidden({ timeout: 5_000 });
    });
  }

  /**
   * Click an item in a specific group site list (Design AC, Illust AC, Silhouette AC, Video AC).
   * Automatically scrolls to container to trigger lazy loading.
   * @param service - 'design' | 'illust' | 'silhouette' | 'video'
   * @param index - Index of item to click (default 0)
   */
  async clickGroupSiteItem(service: 'design' | 'illust' | 'silhouette' | 'video', index: number = 0): Promise<void> {
    await test.step(`Click ${service} group site item index ${index}`, async () => {
      let container: Locator;
      let items: Locator;
      switch (service) {
        case 'design':
          container = this.designListContainer;
          items = this.designItems;
          break;
        case 'illust':
          container = this.illustListContainer;
          items = this.illustItems;
          break;
        case 'silhouette':
          container = this.silhouetteListContainer;
          items = this.silhouetteItems;
          break;
        case 'video':
          container = this.videoListContainer;
          items = this.videoItems;
          break;
      }

      await container.scrollIntoViewIfNeeded();
      const targetItem = items.nth(index);
      await expect(targetItem).toBeVisible({ timeout: 15_000 });
      await this.clickElement(targetItem);
      await expect(this.relatedSearchModal).toBeVisible({ timeout: 10_000 });
    });
  }

  /**
   * Close the related search modal (#relatedSearchModal).
   */
  async closeRelatedSearchModal(): Promise<void> {
    await test.step('Close related search modal', async () => {
      await this.clickElement(this.relatedModalCloseButton);
      await expect(this.relatedSearchModal).toBeHidden({ timeout: 5_000 });
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
      await expect(this.noResultMessage).toHaveCount(2);
    });
  }
}
