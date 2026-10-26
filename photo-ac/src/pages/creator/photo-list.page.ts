import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * CreatorPhotoListPage — Page Object for Creator Photo Management and List page (投稿写真一覧 - /creator/list).
 * Handles search, edit navigation, and deletion of uploaded photos.
 *
 * Applicable Role: Creator
 */
export class CreatorPhotoListPage extends BasePage {
  // Page URL
  readonly PAGE_URL = '/creator/list';

  // Headings
  /** Creator photo list page heading: 投稿写真一覧 */
  readonly pageHeading: Locator = this.page.getByRole('heading', {
    name: '投稿写真一覧',
    level: 1,
  });
  /** Alias for pageHeading for consistency */
  readonly photoListHeading: Locator = this.pageHeading;

  // Photo List Elements (/creator/list)
  /** Photo search input (タイトル、またはタグ、IDで検索) */
  readonly photoSearchInput: Locator = this.page.locator('input#search');

  /** Photo search submit button */
  readonly photoSearchButton: Locator = this.page.locator('button#searchlistbtn');

  /** All photo items in the list */
  readonly photoListRows: Locator = this.page.locator('[id^="data-list-"]');

  /** Edit link for the first photo */
  readonly firstPhotoEditLink: Locator = this.page.locator('a[href*="/creator/dataedit/"]').first();

  /** Delete link for the first photo */
  readonly firstPhotoDeleteLink: Locator = this.page.locator('a.del-item').first();

  /** Confirm delete dialog modal (#confirm-dialog) */
  readonly deleteModal: Locator = this.page.locator('#confirm-dialog');

  /** Confirm delete dialog text (strong#confirm-text-change) */
  readonly deleteModalConfirmText: Locator = this.page.locator(
    '#confirm-dialog strong#confirm-text-change'
  );

  /** Confirm delete dialog OK button */
  readonly deleteModalConfirmButton: Locator = this.page.locator('#confirm-dialog button#verify');

  /** Confirm delete dialog Cancel button */
  readonly deleteModalCancelButton: Locator = this.page.locator('#confirm-dialog button#cancel');

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
  /**
   * Navigate directly to Creator Photo List page.
   */
  async goToPhotoListPage(): Promise<void> {
    await test.step('Navigate to Creator Photo List page (/creator/list)', async () => {
      await this.navigate(this.PAGE_URL);
      await this.waitForPageLoad();
    });
  }

  // Action Methods
  /**
   * Search for photos by title, tag, or ID.
   * @param keyword - Search keyword
   */
  async searchPhoto(keyword: string): Promise<void> {
    await test.step(`Search photos with keyword: ${keyword}`, async () => {
      await this.fillInput(this.photoSearchInput, keyword);
      await this.clickElement(this.photoSearchButton);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Click edit link for the first photo in the list.
   */
  async clickFirstPhotoEdit(): Promise<void> {
    await test.step('Click 編集 link for first photo', async () => {
      await this.clickElement(this.firstPhotoEditLink);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Click delete link for the first photo to open confirm modal.
   */
  async clickFirstPhotoDelete(): Promise<void> {
    await test.step('Click 削除 link to open confirmation modal', async () => {
      await this.clickElement(this.firstPhotoDeleteLink);
    });
  }

  /**
   * Confirm deletion inside confirm dialog (OK button).
   */
  async confirmDeletePhoto(): Promise<void> {
    await test.step('Confirm deletion by clicking OK button', async () => {
      await this.clickElement(this.deleteModalConfirmButton);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Cancel deletion inside confirm dialog (キャンセル button).
   */
  async cancelDeletePhoto(): Promise<void> {
    await test.step('Cancel deletion by clicking キャンセル button', async () => {
      await this.clickElement(this.deleteModalCancelButton);
    });
  }

  /**
   * Get title text of the first photo in list.
   */
  async getFirstPhotoTitle(): Promise<string> {
    return await test.step('Get title of first photo', async () => {
      const titleCell = this.page
        .locator('//tr[td[contains(text(), "タイトル")]]/td[2]')
        .first();
      return (await titleCell.innerText()).trim();
    });
  }

  /**
   * Get ID of the first photo from its delete button data-id attribute.
   */
  async getFirstPhotoId(): Promise<string | null> {
    return await test.step('Get ID of first photo', async () => {
      return await this.firstPhotoDeleteLink.getAttribute('data-id');
    });
  }
}
