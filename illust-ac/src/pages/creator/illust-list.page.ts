import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * CreatorIllustListPage — Page Object for Creator Illustration Management and List page (投稿イラスト一覧 - /creator/upload_lst.php).
 * Handles search, filter by approval status, and deletion request of uploaded illustrations.
 *
 * Applicable Role: Creator
 */
export class CreatorIllustListPage extends BasePage {
  // Page URL
  readonly PAGE_URL = '/creator/upload_lst.php';

  // Headings
  /** Primary page heading: 投稿イラスト一覧 */
  readonly pageHeading: Locator = this.page
    .getByRole('heading', { level: 1 })
    .or(this.page.locator('h1, h2, .ac-section-title').filter({ hasText: '投稿イラスト一覧' }))
    .first();

  /** Alias for pageHeading for consistency */
  readonly illustListHeading: Locator = this.pageHeading;

  // Search Elements (/creator/upload_lst.php)
  /** Search input field (タイトル、またはタグ、IDで検索) */
  readonly searchInput: Locator = this.page.locator('input[placeholder*="タイトル、またはタグ、ID"]');

  /** Search submit button (FontAwesome search icon or submit) */
  readonly searchButton: Locator = this.page
    .locator('button:has-text(""), button[type="submit"]')
    .first();

  // Status Filter Tabs
  /** Status tab: All (全て) */
  readonly tabAll: Locator = this.page.locator('a, button').filter({ hasText: '全て' }).first();

  /** Status tab: Under Review (審査中) */
  readonly tabReviewing: Locator = this.page.locator('a, button').filter({ hasText: '審査中' }).first();

  /** Status tab: Published (公開中) */
  readonly tabPublished: Locator = this.page.locator('a, button').filter({ hasText: '公開中' }).first();

  // Illustration List Elements
  /** Illustration items rows or cards */
  readonly illustListRows: Locator = this.page.locator('table tbody tr, .card-item, tr[id*="illust"]');

  /** Delete request trigger button for the first item */
  readonly firstDeleteRequestButton: Locator = this.page
    .locator('a, button')
    .filter({ hasText: '削除' })
    .or(this.page.locator('[data-target="#delReqModal"]'))
    .first();

  // Delete Request Modal (#delReqModal)
  /** Delete request modal container */
  readonly deleteModal: Locator = this.page.locator('#delReqModal');

  /** Delete modal title (イラスト削除申請) */
  readonly deleteModalTitle: Locator = this.deleteModal.locator('.modal-title, h5').filter({ hasText: 'イラスト削除申請' });

  /** Delete modal Close / Cancel button */
  readonly deleteModalCloseButton: Locator = this.deleteModal
    .locator('button, a')
    .filter({ hasText: /閉じる|キャンセル/ })
    .first();

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
  /**
   * Navigate directly to Creator Illustration List page.
   */
  async goToIllustListPage(): Promise<void> {
    await test.step('Navigate to Creator Illustration List page (/creator/upload_lst.php)', async () => {
      await this.navigate(this.PAGE_URL);
      await this.waitForPageLoad();
    });
  }

  // Action Methods
  /**
   * Search illustrations by title, tag, or ID.
   * @param keyword - Search keyword
   */
  async searchIllustrations(keyword: string): Promise<void> {
    await test.step(`Search illustrations with keyword: ${keyword}`, async () => {
      await this.fillInput(this.searchInput, keyword);
      if (await this.searchButton.isVisible()) {
        await this.clickElement(this.searchButton);
      } else {
        await this.searchInput.press('Enter');
      }
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Open delete request modal for the first item in list.
   */
  async openFirstItemDeleteModal(): Promise<void> {
    await test.step('Open delete request modal for the first illustration item', async () => {
      await this.clickElement(this.firstDeleteRequestButton);
      await this.deleteModal.waitFor({ state: 'visible', timeout: 10_000 });
    });
  }
}
