import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * BookmarksPage — Page Object for User Bookmarks and Collections management on AC-Illust.
 * Routes:
 * - /user/bookmarks/               (Bookmarks main folder list)
 * - /user/bookmarks/collection/:id (Individual collection folder with saved illustrations)
 *
 * Applicable Roles: Free User, Premium User
 */
export class BookmarksPage extends BasePage {
  // Page URLs
  readonly BOOKMARKS_URL = '/user/bookmarks/';

  // Locators — Collection Folder List (/user/bookmarks/)
  /** Page heading */
  readonly pageHeading: Locator = this.page.getByRole('heading', { level: 1 }).or(this.page.locator('h1')).first();

  /** All collection folder links */
  readonly collectionLinks: Locator = this.page.locator('a[href*="/user/bookmarks/collection/"]');

  // Locators — Inside Collection Folder (/user/bookmarks/collection/:id)
  /** Illustration items displayed inside collection */
  readonly collectionItems: Locator = this.page.locator('.item, .figure-item, figure');

  /** Trash/Delete button inside a collection item */
  readonly bookmarkTrashButton: Locator = this.page.locator('.ac-mycollection-btn-trash, button.btn-trash');

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
  /**
   * Navigate directly to the user's bookmarks list page (/user/bookmarks/).
   */
  async goToBookmarksPage(): Promise<void> {
    await test.step('Navigate to Bookmarks page (/user/bookmarks/)', async () => {
      await this.navigate(this.BOOKMARKS_URL);
      await this.waitForPageLoad();
    });
  }

  /**
   * Navigate directly to the first collection folder in bookmarks.
   */
  async goToFirstCollectionFolder(): Promise<void> {
    await test.step('Navigate to first collection folder in bookmarks', async () => {
      await this.goToBookmarksPage();
      const firstLink = this.collectionLinks.first();
      await firstLink.waitFor({ state: 'attached', timeout: 15_000 });
      const href = await firstLink.getAttribute('href');
      if (href) {
        await this.navigate(href);
        await this.waitForPageLoad();
      }
    });
  }
}
