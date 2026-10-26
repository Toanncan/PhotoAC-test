import { type Page, type Locator, test, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * TrendsPage — Page Object for the Trends page (人気の写真素材 - /main/trends).
 * Displays popular photos with dedicated sorting and pagination.
 */
export class TrendsPage extends BasePage {
  // Page URL
  readonly PAGE_URL = '/main/trends';

  // Locators
  /** Main page heading (人気の写真素材) */
  readonly pageHeading: Locator = this.page.getByRole('heading', { level: 1 });
  /** Alias for pageHeading */
  readonly resultHeading: Locator = this.pageHeading;

  /** Sort select dropdown (select#sort) */
  readonly sortSelect: Locator = this.page.locator('select#sort');

  /** Per-page display count select dropdown (select#pagesize) */
  readonly pageSizeSelect: Locator = this.page.locator('select#pagesize');

  /** Image thumbnails displayed on Trends page (class: thumbnail-image) */
  readonly resultItems: Locator = this.page.locator('img.thumbnail-image');

  /** Search keyword input box in the header */
  readonly searchInput: Locator = this.page.locator('form#search_frm input#sw, form#search_frm input[name="q"]').first();

  /** Main search submit button */
  readonly searchSubmitButton: Locator = this.page.locator(
    'form#search_frm button.execloginbtn:visible, form#search_frm button#search_btn:visible, form#search_frm button[type="submit"]:visible'
  ).first();

  // Pagination Locators
  /** Pagination container (ul.ac-pagination) */
  readonly paginationContainer: Locator = this.page.locator('ul.ac-pagination');

  /** Active / Current page number link */
  readonly paginationActivePage: Locator = this.page.locator('ul.ac-pagination li.active a');

  /** Next page button */
  readonly paginationNextButton: Locator = this.page.locator('ul.ac-pagination a.next, ul.ac-pagination a[rel="next"]');

  /** Previous page button */
  readonly paginationPrevButton: Locator = this.page.locator('ul.ac-pagination a.prev, ul.ac-pagination a[rel="prev"]');

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
  /**
   * Navigate directly to the Trends page (/main/trends).
   */
  async goToTrendsPage(): Promise<void> {
    await test.step('Navigate to Trends Page (/main/trends)', async () => {
      await this.navigate(this.PAGE_URL);
      await this.waitForResultDisplay();
    });
  }

  // Wait & Result Methods
  /**
   * Wait for trend result thumbnails to appear using Web-First auto-wait.
   * @param timeout - Maximum timeout in ms (default 15_000)
   */
  async waitForResultDisplay(timeout: number = 15_000): Promise<void> {
    await test.step('Wait for Trends result display', async () => {
      await this.waitForPageLoadingIconHidden();
      await expect(this.resultItems.first()).toBeVisible({ timeout });
    });
  }

  /**
   * Get the number of visible thumbnail results on the current page.
   * @param options - Optional timeout configuration
   */
  async getResultCount(options?: { timeout?: number }): Promise<number> {
    const timeout = options?.timeout ?? 10_000;
    await expect(this.resultItems.first()).toBeVisible({ timeout }).catch(() => {});
    return this.resultItems.count();
  }

  // Sorting & Display Count Methods
  /**
   * Select sort option on Trends page using native select#sort.
   * @param sort - 'dlrank' (ダウンロード数順 - default) or '-releasedate' (新着順)
   */
  async selectSort(sort: 'dlrank' | '-releasedate'): Promise<void> {
    await test.step(`Select sort option on Trends page: "${sort}"`, async () => {
      await this.sortSelect.selectOption(sort);
      await this.page.waitForLoadState('domcontentloaded');
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select display count on Trends page using native select#pagesize.
   * @param count - '70' | '140' | '210'
   */
  async selectDisplayCount(count: '70' | '140' | '210'): Promise<void> {
    await test.step(`Select display count on Trends page: ${count} items`, async () => {
      await this.pageSizeSelect.selectOption(count);
      await this.page.waitForLoadState('domcontentloaded');
      await this.waitForResultDisplay();
    });
  }

  // Pagination Methods
  /**
   * Navigate to the next page in pagination.
   */
  async goToNextPage(): Promise<void> {
    await test.step('Navigate to next page in pagination', async () => {
      await this.paginationNextButton.scrollIntoViewIfNeeded().catch(() => {});
      await this.clickElement(this.paginationNextButton);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Navigate to the previous page in pagination.
   */
  async goToPrevPage(): Promise<void> {
    await test.step('Navigate to previous page in pagination', async () => {
      await this.paginationPrevButton.scrollIntoViewIfNeeded().catch(() => {});
      await this.clickElement(this.paginationPrevButton);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Get the active/current page number string from pagination.
   */
  async getActivePageNumber(): Promise<string> {
    return this.getText(this.paginationActivePage);
  }

  // Search Method
  /**
   * Search again from the search input on the Trends page.
   * @param keyword - Keyword string
   */
  async searchAgain(keyword: string): Promise<void> {
    await test.step(`Search from Trends page with keyword: "${keyword}"`, async () => {
      await this.fillInput(this.searchInput, keyword);
      if (await this.searchSubmitButton.isVisible().catch(() => false)) {
        await this.searchSubmitButton.click({ noWaitAfter: true }).catch(async () => {
          await this.searchInput.press('Enter', { noWaitAfter: true });
        });
      } else {
        await this.searchInput.press('Enter', { noWaitAfter: true });
      }
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
