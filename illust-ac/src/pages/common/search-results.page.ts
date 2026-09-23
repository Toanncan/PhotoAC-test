import { type Page, type Locator, test, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SearchResultPage — Page Object for the search results page.
 * Follows Playwright best practices with semantic locators and smart auto-waiting.
 */
export class SearchResultPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Image thumbnails displayed in search results (AC-Illust uses img.w-100.h-100 inside .inner container) */
  readonly resultItems: Locator = this.page.locator('.inner img.w-100.h-100');

  /** Quickview link overlays on thumbnails */
  readonly quickViewOverlays: Locator = this.page.locator('.link-to-detail.quickview');

  /** Message displayed when no images match the search criteria (keyword search or image upload search) */
  readonly noResultMessage: Locator = this.page.getByText(/該当するイラストがありませんでした|イラストは見つかりませんでした/);

  /** Combined locator matching either image results or no-results message (Playwright native .or) */
  readonly resultsOrNoResultLocator: Locator = this.resultItems.first().or(this.noResultMessage.first());

  /**
   * Search results main heading (e.g. 「cat」のイラスト素材 212,012点)
   * NOTE: AC-Illust does NOT use <h1>. Heading is a <span class="d-inline-block"> element.
   */
  readonly resultHeading: Locator = this.page.locator('span.d-inline-block').filter({ hasText: 'のイラスト素材' }).first();

  /** Result count / total text */
  readonly resultCount: Locator = this.page.locator('span.d-inline-block').filter({ hasText: 'のイラスト素材' }).first();

  /**
   * Search keyword input box on results page.
   * AC-Illust uses name="search_word" (NOT name="q" or id="sw" like photo-ac).
   */
  readonly searchInput: Locator = this.page.locator('input[name="search_word"].input-search-word').first();

  /** Reset keyword button inside search box */
  readonly resetKeywordButton: Locator = this.page.getByRole('button', { name: 'リセット' });

  /** Submit search button */
  readonly searchSubmitButton: Locator = this.page.getByRole('button', { name: 'search_btn' });

  // ─── Sort Dropdown Locators ────────────────────────────────────────────────

  /**
   * Sort & Display Count combined dropdown toggle button.
   * AC-Illust shows combined text e.g. "関連性の高い順／70件表示".
   * Wrapped in #filter-dropdown-srt (separate from photo-ac).
   */
  readonly sortDropdownButton: Locator = this.page.locator('#filter-dropdown-srt > button').first();

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
  readonly categoryFilterButton: Locator = this.page.locator('#filter-dropdown-categories > button, button:has-text("カテゴリー")').first();

  /**
   * Filter button: File & Format (ファイル・向き)
   * AC-Illust uses #filter-dropdown-format (NOT #filter-dropdown-sizesec like photo-ac).
   */
  readonly fileOrientationButton: Locator = this.page.locator('#filter-dropdown-format > button, button:has-text("ファイル・向き")').first();

  /** Filter button: Color (色) */
  readonly colorFilterButton: Locator = this.page.locator('#filter-dropdown-color > button, button:has-text("色")').first();
  // NOTE: 人物指定 filter (personFilterButton) does NOT exist on AC-Illust — removed.

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
  // NOTE: AC-Illust uses ddcl-c_names_mf-i* (NOT ddcl-c_names1-i* like photo-ac)
  // Category order: 花・植物(0), ビジネス(1), チラシ(2), 名刺(3), 医療・福祉(4), 人物(5), 動物・生き物(6)
  readonly categoryFloraLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names_mf-i0"], #filter-dropdown-categories label:has-text("花・植物")').first();
  readonly categoryBusinessLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names_mf-i1"], #filter-dropdown-categories label:has-text("ビジネス")').first();
  readonly categoryPeopleLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names_mf-i5"], #filter-dropdown-categories label:has-text("人物")').first();
  readonly categoryAnimalLabel: Locator = this.page.locator('#filter-dropdown-categories label[for="ddcl-c_names_mf-i6"], #filter-dropdown-categories label:has-text("動物・生き物")').first();

  // ─── Filter Option Locators: 2. File & Format (ファイル・向き) ───────────────
  // NOTE: AC-Illust uses #filter-dropdown-format (NOT sizesec like photo-ac).
  // Format options: All, Vector (EPS/AI), PNG — NO PSD/M/L size filters.
  readonly orientationAllLabel: Locator = this.page.locator('#filter-dropdown-format label[for="orientation-all"]').first();
  readonly orientationVerticalLabel: Locator = this.page.locator('#filter-dropdown-format label[for="orientation-0"]').first();
  readonly orientationHorizontalLabel: Locator = this.page.locator('#filter-dropdown-format label[for="orientation-1"]').first();
  /** Format filter: All formats (全て) */
  readonly formatAllLabel: Locator = this.page.locator('#filter-dropdown-format label[for="format-all"]').first();
  /** Format filter: Vector (EPS/AI) */
  readonly formatVectorLabel: Locator = this.page.locator('#filter-dropdown-format label[for="format-vector"]').first();
  /** Format filter: PNG */
  readonly formatPngLabel: Locator = this.page.locator('#filter-dropdown-format label[for="format-png"]').first();

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

  // ─── Filter Option Locators: 4. Exclude Keyword (除外キーワード) ──────────────
  // NOTE: AC-Illust does NOT have 人物指定 (person spec) or Model/Property Release filters.
  // NOTE: AC-Illust uses name="nq" with no fixed ID for the exclude keyword input.

  readonly excludeKeywordInput: Locator = this.page.locator('#filter-dropdown-exclude-kw input[name="nq"]');

  // ─── Filter Option Locators: 5. Detailed Search (詳細検索) ──────────────────
  // NOTE: AC-Illust uses id="creator_mf" (NOT #form_creator like photo-ac)
  // NOTE: NG creator & Photo ID have no id — use name attribute
  readonly detailedCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #creator_mf, #filter-dropdown-detail input[name="creator"]').first();
  readonly detailedNgCreatorInput: Locator = this.page.locator('#filter-dropdown-detail input[name="ngcreator"]');
  readonly detailedPhotoIdInput: Locator = this.page.locator('#filter-dropdown-detail input[name="qid"]');

  // ─── Filter Option Locators: 6. Display Conditions (表示条件) ───────────────
  readonly exactMatchCheckbox: Locator = this.page.locator('#filter-dropdown-display #type_search, #type_search');
  readonly exactMatchLabel: Locator = this.page.locator('#filter-dropdown-display label[for="type_search"]').first();
  readonly excludeAiCheckbox: Locator = this.page.locator('#filter-dropdown-display #exclude_ai, #exclude_ai');
  readonly excludeAiLabel: Locator = this.page.locator('#filter-dropdown-display label[for="exclude_ai"]').first();
  // NOTE: Model Release (mdlrlrsec) & Property Release (prprlrsec) do NOT exist on AC-Illust.

  // ─── Pagination Locators ───────────────────────────────────────────────────
  // NOTE: AC-Illust uses div.pagination_bottom with .paginator_p links (NOT ul.ac-pagination like photo-ac)

  /** Pagination container */
  readonly paginationContainer: Locator = this.page.locator('div.pagination_bottom');

  /** Active / Current page number link */
  readonly paginationActivePage: Locator = this.page.locator('div.pagination_bottom a.paginator_p.selected, div.pagination_bottom .paginator_p_current');

  /** Next page button */
  readonly paginationNextButton: Locator = this.page.locator('div.pagination_bottom a.paginator_next, div.pagination_bottom a[class*="next"]').first();

  /** Previous page button */
  readonly paginationPrevButton: Locator = this.page.locator('div.pagination_bottom a.paginator_prev, div.pagination_bottom a[class*="prev"]').first();
  // NOTE: AI Search (.search-by-ai) and AI Face (.face-list .face-item) do NOT exist on AC-Illust.

  /** Introductory / promotional dialog popup (e.g. Premium feature tips dialog) */
  readonly introDialog: Locator = this.page.locator('dialog:has(a[href*="function_introduction"]), dialog[open], [role="dialog"]:has(.icon-close)');
  readonly introDialogCloseButton: Locator = this.page.locator('dialog .icon-close, dialog [aria-label="Close"], [role="region"][aria-label="Close"], dialog button.close');

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
          await this.introDialogCloseButton.first().click({ force: true }).catch(() => {});
        } else {
          await this.page.keyboard.press('Escape').catch(() => {});
        }
        await this.introDialog.first().waitFor({ state: 'hidden', timeout: 2_000 }).catch(() => {});
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
    await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout }).catch(() => {});
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
      await expect(async () => {
        if (!await this.sortRelevanceLabel.isVisible()) {
          await this.clickElement(this.sortDropdownButton);
        }
        await expect(this.sortRelevanceLabel).toBeVisible({ timeout: 1_000 });
      }).toPass({ intervals: [500, 1_000], timeout: 10_000 });
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
   * Select "人気順" (Popularity) sort option for Premium users and wait for results.
   */
  async selectPopularSort(): Promise<void> {
    await test.step('Select "人気順" (Popularity) sort for Premium user', async () => {
      await this.openSortDropdown();
      await this.clickElement(this.sortPopularLabel);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select "関連性の高い順" (Relevance) sort option and wait for results.
   */
  async selectRelevanceSort(): Promise<void> {
    await test.step('Select "関連性の高い順" (Relevance) sort', async () => {
      await this.openSortDropdown();
      await this.clickElement(this.sortRelevanceLabel);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select display count per page (70, 140, 210 items).
   */
  async selectDisplayCount(count: '70' | '140' | '210'): Promise<void> {
    await test.step(`Select display count: ${count} items per page`, async () => {
      await this.openSortDropdown();
      const targetLabel = count === '210'
        ? this.displayCount210Label
        : (count === '140' ? this.displayCount140Label : this.displayCount70Label);
      await this.clickElement(targetLabel);
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

  // ─── Pagination Actions ───────────────────────────────────────────────────

  /**
   * Click the Next page button in pagination with progressive 3-tier fallback to ensure reliable navigation cross-browser.
   */
  async goToNextPage(): Promise<void> {
    await test.step('Navigate to next page in pagination', async () => {
      const currentPage = await this.getActivePageNumber().catch(() => '1');
      const targetPage = String(Number(currentPage) + 1);

      // Tier 1: Scroll element into center of viewport to avoid bottom fixed banners (Cookie, Signup CTA)
      await this.paginationNextButton.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => {});
      await this.clickElement(this.paginationNextButton);

      // Check if navigation occurred within 2.5s
      const navigated = await this.page.waitForFunction(
        (target) => {
          const activeEl = document.querySelector('ul.ac-pagination li.active a');
          const url = window.location.href;
          return (activeEl && activeEl.textContent?.trim() === target) || url.includes(`p=${target}`);
        },
        targetPage,
        { timeout: 2_500 }
      ).then(() => true).catch(() => false);

      if (!navigated) {
        // Tier 2: Trigger native keyboard shortcut ArrowRight
        await this.page.keyboard.press('ArrowRight');
        const keyboardNavigated = await this.page.waitForFunction(
          (target) => {
            const activeEl = document.querySelector('ul.ac-pagination li.active a');
            const url = window.location.href;
            return (activeEl && activeEl.textContent?.trim() === target) || url.includes(`p=${target}`);
          },
          targetPage,
          { timeout: 2_500 }
        ).then(() => true).catch(() => false);

        if (!keyboardNavigated) {
          // Tier 3: Native DOM anchor click dispatch
          await this.paginationNextButton.evaluate((el: HTMLAnchorElement) => el.click()).catch(() => {});
          await this.page.waitForFunction(
            (target) => {
              const activeEl = document.querySelector('ul.ac-pagination li.active a');
              const url = window.location.href;
              return (activeEl && activeEl.textContent?.trim() === target) || url.includes(`p=${target}`);
            },
            targetPage,
            { timeout: 10_000 }
          ).catch(() => {});
        }
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
      ).catch(() => {});
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click the Previous page button in pagination with progressive 3-tier fallback to ensure reliable navigation cross-browser.
   */
  async goToPrevPage(): Promise<void> {
    await test.step('Navigate to previous page in pagination', async () => {
      const currentPage = await this.getActivePageNumber().catch(() => '2');
      const targetPage = String(Math.max(1, Number(currentPage) - 1));

      // Tier 1: Scroll element into center of viewport to avoid bottom fixed banners
      await this.paginationPrevButton.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => {});
      await this.clickElement(this.paginationPrevButton);

      // Check if navigation occurred within 2.5s
      const navigated = await this.page.waitForFunction(
        (target) => {
          const activeEl = document.querySelector('ul.ac-pagination li.active a');
          const url = window.location.href;
          return (activeEl && activeEl.textContent?.trim() === target) || (target === '1' && !url.includes('p=2'));
        },
        targetPage,
        { timeout: 2_500 }
      ).then(() => true).catch(() => false);

      if (!navigated) {
        // Tier 2: Trigger native keyboard shortcut ArrowLeft
        await this.page.keyboard.press('ArrowLeft');
        const keyboardNavigated = await this.page.waitForFunction(
          (target) => {
            const activeEl = document.querySelector('ul.ac-pagination li.active a');
            const url = window.location.href;
            return (activeEl && activeEl.textContent?.trim() === target) || (target === '1' && !url.includes('p=2'));
          },
          targetPage,
          { timeout: 2_500 }
        ).then(() => true).catch(() => false);

        if (!keyboardNavigated) {
          // Tier 3: Native DOM anchor click dispatch
          await this.paginationPrevButton.evaluate((el: HTMLAnchorElement) => el.click()).catch(() => {});
          await this.page.waitForFunction(
            (target) => {
              const activeEl = document.querySelector('ul.ac-pagination li.active a');
              const url = window.location.href;
              return (activeEl && activeEl.textContent?.trim() === target) || (target === '1' && !url.includes('p=2'));
            },
            targetPage,
            { timeout: 10_000 }
          ).catch(() => {});
        }
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
      ).catch(() => {});
      await this.waitForResultDisplay();
    });
  }

  /**
   * Click a specific page number link in pagination.
   */
  async goToPageNumber(pageNumber: number): Promise<void> {
    await test.step(`Navigate to page ${pageNumber} in pagination`, async () => {
      const pageLink = this.paginationContainer.locator(`a:text-is("${pageNumber}")`);
      await pageLink.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => {});
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
      const ddclSelector = this.page.locator('#filter-dropdown-categories #ddcl-c_names_mf, #filter-dropdown-categories #ddcl-c_names1, #ddcl-c_names_mf').first();
      await this.clickElement(ddclSelector);
      const categoryOption = this.page.locator(`#filter-dropdown-categories label:has-text("${categoryName}")`).first();
      await this.clickElement(categoryOption, { force: true });
      const submitBtn = this.page.locator('#filter-horizontal button[type="submit"].position-absolute, #search_frm_menu button.position-absolute, #filter-dropdown-categories button[type="submit"]').first();
      await this.clickElement(submitBtn, { force: true });
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
   * Safely opens a toolbar dropdown menu and ensures the target option is visible.
   * Handles hydration delays, layout shifts, and CSS animations across all browsers.
   * @param dropdownButton - The dropdown toggle button
   * @param expectedOption - The option locator inside the dropdown menu that should become visible
   * @param timeout - Maximum timeout in ms (default 10_000)
   */
  async openToolbarDropdown(dropdownButton: Locator, expectedOption: Locator, timeout: number = 10_000): Promise<void> {
    await expect(async () => {
      const isVisible = await expectedOption.isVisible().catch(() => false);
      if (!isVisible) {
        await dropdownButton.scrollIntoViewIfNeeded().catch(() => {});
        await dropdownButton.click().catch(async () => {
          await dropdownButton.click({ force: true });
        });
      }
      await expect(expectedOption).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout, intervals: [400, 800, 1_200] });
  }

  /**
   * Clear all active filters on the search results page if any filter is currently applied.
   * Clicks "すべてクリア" link when visible and waits for search results to refresh.
   */
  async clearAllFilters(): Promise<void> {
    await test.step('Clear all active filters via "すべてクリア"', async () => {
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
      const radioId = orientation === 'vertical'
        ? 'orientation-0'
        : (orientation === 'horizontal' ? 'orientation-1' : 'orientation-all');
      const targetRadio = this.page.locator(`#filter-dropdown-format #${radioId}, #${radioId}`).first();

      await this.openToolbarDropdown(this.fileOrientationButton, targetLabel);
      await this.clickElement(targetLabel, { force: true });

      // Cross-browser: Ensure underlying radio is checked and change event dispatches in Gecko/WebKit
      const isChecked = await targetRadio.isChecked().catch(() => false);
      if (!isChecked) {
        await targetRadio.check({ force: true }).catch(() => {});
      }
      await this.waitForResultDisplay();
    });
  }

  /**
   * Filter by Format (フォーマット) via "ファイル・向き" toolbar dropdown.
   * AC-Illust supports Vector (EPS/AI) and PNG — NOT PSD/M/L size like photo-ac.
   * @param format - 'all' | 'vector' | 'png'
   */
  async selectFormat(format: 'all' | 'vector' | 'png'): Promise<void> {
    await test.step(`Filter by format "${format}" via toolbar`, async () => {
      const labelMap = { all: this.formatAllLabel, vector: this.formatVectorLabel, png: this.formatPngLabel };
      const targetLabel = labelMap[format];
      const targetRadio = this.page.locator(`#filter-dropdown-format #format-${format}`).first();
      await this.openToolbarDropdown(this.fileOrientationButton, targetLabel);
      await this.clickElement(targetLabel, { force: true });
      const isChecked = await targetRadio.isChecked().catch(() => false);
      if (!isChecked) {
        await targetRadio.check({ force: true }).catch(() => {});
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
      if (!await this.excludeKeywordInput.isVisible()) {
        await this.clickElement(this.excludeKeywordFilterButton);
      }
      await this.fillInput(this.excludeKeywordInput, excludeKeyword);
      await this.page.keyboard.press('Enter');
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
      await this.clickElement(targetOption, { force: true });
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
        await this.clickElement(this.excludeAiLabel, { force: true });
        const isStillWrong = (await this.excludeAiCheckbox.isChecked().catch(() => false)) !== enable;
        if (isStillWrong) {
          await this.excludeAiCheckbox.setChecked(enable, { force: true }).catch(() => {});
        }
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
        await this.clickElement(this.exactMatchLabel, { force: true });
        const isStillWrong = (await this.exactMatchCheckbox.isChecked().catch(() => false)) !== enable;
        if (isStillWrong) {
          await this.exactMatchCheckbox.setChecked(enable, { force: true }).catch(() => {});
        }
        await this.waitForResultDisplay();
      }
    });
  }

  /**
   * Search by exact Photo ID (素材ID) using the Detailed Search menu.
   * @param photoId - Numeric photo ID (e.g. '1597634')
   */
  async searchByDetailedPhotoId(photoId: string): Promise<void> {
    await test.step(`Search by Photo ID "${photoId}" via Detailed Search`, async () => {
      await this.openToolbarDropdown(this.detailedFilterButton, this.detailedPhotoIdInput);
      await expect(this.detailedPhotoIdInput).toBeVisible({ timeout: 5_000 });
      await this.detailedPhotoIdInput.fill(photoId);
      const submitBtn = this.page.locator('#search_frm_menu button.position-absolute, #filter-dropdown-detail button[type="submit"]').first();
      await this.clickElement(submitBtn, { force: true });
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
      const submitBtn = this.page.locator('#search_frm_menu button.position-absolute, #filter-dropdown-detail button[type="submit"]').first();
      await this.clickElement(submitBtn, { force: true });
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
      const submitBtn = this.page.locator('#search_frm_menu button.position-absolute, #filter-dropdown-detail button[type="submit"]').first();
      await this.clickElement(submitBtn, { force: true });
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
   * Navigate directly to a specific photo detail page.
   * @param photoId - Numeric photo ID (e.g. '35133353')
   */
  async goToPhotoDetail(photoId: string): Promise<void> {
    await test.step(`Navigate to photo detail page: ${photoId}`, async () => {
      await this.navigate(`/main/detail/${photoId}`);
      await this.waitForPageLoad();
    });
  }

  // ─── Backward-compatible Assertions (@deprecated — move assertions to test specs) ────────

  /** @deprecated Move business assertions to test spec files. */
  async assertHasResults(minCount: number = 1): Promise<void> {
    const count = await this.getResultCount();
    await test.step(`assert Has Results : ${count} records`, async () => {
      expect(count, `Expect result count >= ${minCount}`).toBeGreaterThanOrEqual(minCount);
    });
  }

  /** @deprecated Move business assertions to test spec files. */
  async assertNoResults(): Promise<void> {
    await test.step('assert No Results', async () => {
      // AC-Illust shows a single no-result message instance; use first() to avoid count mismatch
      await expect(this.noResultMessage.first()).toBeVisible({ timeout: 5_000 });
    });
  }
}
