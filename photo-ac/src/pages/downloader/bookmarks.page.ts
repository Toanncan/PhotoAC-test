import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * BookmarksPage — Page Object for User Bookmarks and Collections management.
 * Routes:
 * - /user/bookmarks/               (Bookmarks main folder list)
 * - /user/bookmarks/collection/:id (Individual collection folder with saved photos)
 *
 * Applicable Role: Free User, Premium User
 */
export class BookmarksPage extends BasePage {
  // Page URLs
  readonly BOOKMARKS_URL = '/user/bookmarks/';

  // Locators — Collection Folder List (/user/bookmarks/)
  /** Page heading */
  readonly pageHeading: Locator = this.page.getByRole('heading', { level: 1 });

  /** All collection folder links */
  readonly collectionLinks: Locator = this.page.locator('a[href*="/user/bookmarks/collection/"]');

  // Locators — Inside Collection Folder (/user/bookmarks/collection/:id)
  /** Photo items displayed inside collection */
  readonly collectionItems: Locator = this.page.locator('.item');

  /** Trash/Delete button inside a collection item */
  readonly bookmarkTrashButton: Locator = this.page.locator('.ac-mycollection-btn-trash');

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

  /**
   * Navigate directly to a specific collection folder by its ID.
   * @param collectionId - Numeric ID of the collection folder
   */
  async goToCollectionFolder(collectionId: string): Promise<void> {
    await test.step(`Navigate to collection folder ID: ${collectionId}`, async () => {
      await this.navigate(`/user/bookmarks/collection/${collectionId}`);
      await this.waitForPageLoad();
    });
  }

  // Action Methods
  /**
   * Locate a specific photo item element inside the current collection folder.
   * @param photoId - Numeric photo ID
   */
  getPhotoItemInCollection(photoId: string): Locator {
    return this.page.locator(`.item:has(a[href*="${photoId}"])`).first();
  }

  /**
   * Check if a specific photo is currently present in the collection.
   * @param photoId - Numeric photo ID
   */
  async isPhotoInCollection(photoId: string): Promise<boolean> {
    const item = this.getPhotoItemInCollection(photoId);
    return await item.isVisible().catch(() => false);
  }

  /**
   * Delete a photo from collection by clicking trash icon and accepting the browser confirmation dialog.
   * @param photoId - Numeric photo ID to delete
   */
  async deletePhotoFromCollection(photoId: string): Promise<void> {
    await test.step(`Delete photo (ID: ${photoId}) from collection`, async () => {
      const item = this.getPhotoItemInCollection(photoId);
      await item.scrollIntoViewIfNeeded();
      await item.hover();

      const trash = item.locator('.ac-mycollection-btn-trash');

      this.page.once('dialog', async (dialog) => {
        await dialog.accept();
      });

      await trash.click();
      await item.waitFor({ state: 'detached', timeout: 15_000 }).catch(() => {});
      await this.waitForPageLoad();
    });
  }

  /**
   * Get the total count of photo items inside the current collection.
   */
  async getCollectionItemCount(): Promise<number> {
    return this.collectionItems.count();
  }
}
