import { type Page, test } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * HomePage — Page Object for the main home page after login.
 */
export class HomePage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Page heading / main title of the dashboard */
  private readonly pageHeading = this.page.getByRole('heading', { level: 1 }).first();

  /** Search input on the dashboard */
  /** Search input on the dashboard (AC-Illust uses #search_frm input[name="search_word"]) */
  readonly searchInput = this.page.locator('#search_frm input[name="search_word"]').first();

  /** User menu / account dropdown */
  private readonly userMenu = this.page.locator('[class*="user-menu"], [class*="user-nav"]').first();

  /** Logout button or link */
  private readonly logoutButton = this.page.getByRole('button', { name: /logout|sign out|ログアウト/i })
    .or(this.page.getByRole('link', { name: /logout|sign out|ログアウト/i }));

  // ─── Search Entrypoint Locators ───────────────────────────────────────────

  /** Top keyword chips displayed directly under the main search bar (e.g. 女性, ビジネス, 秋, 和紙, 犬) */
  readonly topKeywords = this.page.locator('a.top-search');

  /** Popular tags cloud located towards the bottom/sidebar */
  readonly popularTags = this.page.locator('.pop-tags-limit a[href*="utm_source=top_keyword"]');

  /** Image search modal trigger button (画像検索) */
  readonly imageSearchButton = this.page.locator('form:not(#search_frm_fixed) a.search-file[data-target="#uploadFile"], a.search-file:visible, [data-target="#uploadFile"]:visible').first();

  /** Image search file upload modal (#uploadFile) */
  readonly uploadFileModal = this.page.locator('#uploadFile');

  /** Close button for the image search upload modal */
  readonly uploadModalCloseButton = this.page.locator('#uploadFile button.close');

  /** Hidden file input for uploading search image (#files) */
  readonly fileUploadInput = this.page.locator('#uploadFile input#files');

  /** Category links on the home page (AC-Illust uses cid parameter e.g. mode=cate&cid=4...&utm_source=categories) */
  readonly categoryLinks = this.page.locator('a[href*="cid="][href*="utm_source=categories"], a[href*="c_id="][href*="utm_source=categories"], a[href*="c_names"]');

  /** Main search submit button */
  readonly searchSubmitButton = this.page.locator('#search_frm button.execloginbtn:visible, #search_frm #search_btn:visible, #search_frm button[type="submit"]:visible, form:not(#search_frm_fixed) button.execloginbtn:visible').first();

  // ─── Sticky Header Search Bar Locators ──────────────────────────────────────

  /** Sticky search bar container (.search-box-top-fixed-area) displayed upon scrolling */
  readonly stickySearchArea = this.page.locator('.search-box-top-fixed-area');

  /** Sticky search input field (#search_frm_fixed input[name="search_word"]) */
  readonly stickySearchInput = this.page.locator('form#search_frm_fixed input[name="search_word"], form#search_frm_fixed input[name="q"], form#search_frm_fixed input#sw').first();

  /** Sticky search submit button (form#search_frm_fixed button[type="submit"]) */
  readonly stickySearchSubmitButton = this.page.locator('form#search_frm_fixed button.execloginbtn:visible, form#search_frm_fixed button[type="submit"]:visible, form#search_frm_fixed #search_btn:visible').first();

  // ─── Methods ──────────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate directly to the dashboard root.
   */
  async goToHomePage(): Promise<void> {
    await test.step('Navigate to HomePage', async () => {
      await this.navigate('/');
    });
  }

  /**
   * Get the main heading text of the dashboard.
   */
  async getHeadingText(): Promise<string> {
    return this.getText(this.pageHeading);
  }

  /**
   * Perform a search from the dashboard search bar.
   * @param keyword - Search keyword
   */
  async search(keyword: string): Promise<void> {
    await test.step(`Search with keyword: "${keyword}"`, async () => {
      await this.fillInput(this.searchInput, keyword);
      if (await this.searchSubmitButton.isVisible().catch(() => false)) {
        await this.searchSubmitButton.click().catch(async () => {
          await this.searchInput.press('Enter');
        });
      } else {
        await this.searchInput.press('Enter');
      }
    });
  }

  /**
   * Open the user menu dropdown.
   */
  async openUserMenu(): Promise<void> {
    await test.step('Open user menu dropdown', async () => {
      await this.clickElement(this.userMenu);
    });
  }

  /**
   * Log out by clicking the logout button/link.
   */
  async logout(): Promise<void> {
    await test.step('Logout from HomePage', async () => {
      await this.openUserMenu();
      await this.clickElement(this.logoutButton);
    });
  }

  /**
   * Check if the HomePage is loaded (heading is visible).
   */
  async isHomePageLoaded(): Promise<boolean> {
    return this.isVisible(this.pageHeading);
  }

  /**
   * Click a specific Top Keyword chip under the search bar.
   * @param keyword - The keyword text to click (e.g. '女性', 'ビジネス', '犬')
   */
  async clickTopKeyword(keyword: string): Promise<void> {
    await test.step(`Click Top Keyword: "${keyword}"`, async () => {
      const keywordChip = this.topKeywords.filter({ hasText: keyword }).first();
      await this.clickElement(keywordChip);
    });
  }

  /**
   * Get all visible top keyword texts under the search bar.
   */
  async getTopKeywords(): Promise<string[]> {
    return this.topKeywords.allInnerTexts();
  }

  /**
   * Click a popular tag from the popular tags cloud.
   * @param tag - Tag name to click (e.g. 'オフィス', '炎', 'コスモス')
   */
  async clickPopularTag(tag: string): Promise<void> {
    await test.step(`Click Popular Tag: "${tag}"`, async () => {
      const tagElement = this.popularTags.filter({ hasText: tag }).first();
      await this.clickElement(tagElement);
    });
  }

  /**
   * Open the Image Search upload modal (画像検索).
   */
  async openImageSearchModal(): Promise<void> {
    await test.step('Open Image Search upload modal', async () => {
      await this.clickElement(this.imageSearchButton);
      await this.uploadFileModal.waitFor({ state: 'visible', timeout: 5_000 });
    });
  }

  /**
   * Close the Image Search upload modal.
   */
  async closeImageSearchModal(): Promise<void> {
    await test.step('Close Image Search upload modal', async () => {
      await this.clickElement(this.uploadModalCloseButton);
      await this.uploadFileModal.waitFor({ state: 'hidden', timeout: 5_000 });
    });
  }

  /**
   * Upload an image to perform visual similarity search (画像で検索する).
   * @param filePath - Absolute path to the sample image file (.jpg or .png)
   */
  async uploadImageForSearch(filePath: string): Promise<void> {
    await test.step(`Upload image for search: "${filePath}"`, async () => {
      await this.openImageSearchModal();

      // Photo-AC requires isFileInputClicked = true to trigger uploadImageAjax on change
      await this.page.evaluate(() => {
        (window as any).isFileInputClicked = true;
      });

      // Wait for navigation triggered by window.location.href to /search/ris
      // AC-Illust jQuery listener specifically reads $("input[type='file']")[0]
      await Promise.all([
        this.page.waitForURL(/\/search\/ris/i, { timeout: 30_000, waitUntil: 'domcontentloaded' }),
        (async () => {
          const fileInputs = this.page.locator('input[type="file"]');
          const count = await fileInputs.count();
          for (let i = 0; i < count; i++) {
            await fileInputs.nth(i).setInputFiles(filePath).catch(() => {});
          }
        })(),
      ]);
    });
  }

  /**
   * Click a Category link directly on the HomePage.
   * @param categoryName - Name of the category (e.g. '人物', 'ビジネス', '自然・風景')
   */
  async clickCategory(categoryName: string): Promise<void> {
    await test.step(`Click Category: "${categoryName}" from HomePage`, async () => {
      const categoryLink = this.categoryLinks.filter({ hasText: categoryName }).first();
      await this.clickElement(categoryLink);
    });
  }

  /**
   * Scroll down the page to trigger the Sticky Header Search Bar (.search-box-top-fixed-area).
   * @param scrollDistance - Scroll distance in pixels (default 1200)
   */
  async scrollToActivateStickySearch(scrollDistance = 1200): Promise<void> {
    await test.step('Scroll down to activate Sticky Header Search Bar', async () => {
      await this.page.evaluate((y) => {
        window.scrollTo(0, y);
        document.documentElement.scrollTop = y;
        if ((window as any).jQuery) {
          (window as any).jQuery(window).trigger('scroll');
        }
        window.dispatchEvent(new Event('scroll'));
      }, scrollDistance);
      await this.stickySearchArea.waitFor({ state: 'visible', timeout: 10_000 });
    });
  }

  /**
   * Scroll back to the top of the page (scrollTop = 0) to deactivate/hide the Sticky Header Search Bar.
   */
  async scrollToTop(): Promise<void> {
    await test.step('Scroll back to top of page', async () => {
      await this.page.evaluate(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        if ((window as any).jQuery) {
          (window as any).jQuery(window).trigger('scroll');
        }
        window.dispatchEvent(new Event('scroll'));
      });
      await this.stickySearchArea.waitFor({ state: 'hidden', timeout: 10_000 });
    });
  }

  /**
   * Perform a search from the Sticky Header Search Bar.
   * @param keyword - Search keyword
   */
  async searchViaStickyBar(keyword: string): Promise<void> {
    await test.step(`Search via Sticky Search Bar with keyword: "${keyword}"`, async () => {
      await this.fillInput(this.stickySearchInput, keyword);
      if (await this.stickySearchSubmitButton.isVisible().catch(() => false)) {
        await this.stickySearchSubmitButton.click({ noWaitAfter: true }).catch(async () => {
          await this.stickySearchInput.press('Enter', { noWaitAfter: true });
        });
      } else {
        await this.stickySearchInput.press('Enter', { noWaitAfter: true });
      }
    });
  }
}


