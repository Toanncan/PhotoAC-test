import { type Page, test } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * HomePage — Page Object for the main home page after login.
 */
export class HomePage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Page heading / main title of the dashboard */
  private readonly pageHeading = this.page.getByRole('heading', { level: 1 });

  /** Search input on the dashboard */
  readonly searchInput = this.page.locator('form#search_frm input#sw, form#search_frm input[name="q"]').first();

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
  readonly imageSearchButton = this.page.locator('form#search_frm a.search-file[data-target="#uploadFile"]');

  /** Image search file upload modal (#uploadFile) */
  readonly uploadFileModal = this.page.locator('#uploadFile');

  /** Close button for the image search upload modal */
  readonly uploadModalCloseButton = this.page.locator('#uploadFile button.close');

  /** Hidden file input for uploading search image (#files) */
  readonly fileUploadInput = this.page.locator('#uploadFile input#files');

  /** Category links on the home page */
  readonly categoryLinks = this.page.locator('a[href*="c_id="][href*="utm_source=categories"]');

  // ─── AI Search (AI検索 β版) Locators ─────────────────────────────────────────

  /** AI Search toggle button (.search-by-ai) */
  readonly searchByAiButton = this.page.locator('form#search_frm .search-by-ai');

  /** Hidden input for by_ai value (0: OFF, 1: ON) */
  readonly byAiInput = this.searchByAiButton.locator('input[name="by_ai"]');

  /** AI Search ON icon (green/active) */
  readonly aiSearchOnIcon = this.searchByAiButton.locator('.search-ai-icon-on');

  /** AI Search OFF icon (gray/inactive) */
  readonly aiSearchOffIcon = this.searchByAiButton.locator('.search-ai-icon-off');

  /** Clock overlay icon indicating daily search limit reached (3 times/day) */
  readonly aiLimitClockIcon = this.searchByAiButton.locator('.overlay-icon-clock');

  /** Main search submit button */
  readonly searchSubmitButton = this.page.locator('form#search_frm button#search_btn, form#search_frm button[type="submit"]').first();

  /** Semantic search introduction modal displayed when AI search is activated upon reaching limit */
  readonly semanticSearchModal = this.page.locator('.modal:has-text("AI検索を3回使えます"), .modal.show:has-text("AI検索")').first();

  /** Close / dismiss button for semantic search continue modal */
  readonly semanticSearchModalCloseButton = this.semanticSearchModal.locator('button.close, [data-dismiss="modal"], .btn-close, [aria-label="Close"]').first();

  // ─── Sticky Header Search Bar Locators ──────────────────────────────────────

  /** Sticky search bar container (.search-box-top-fixed-area) displayed upon scrolling */
  readonly stickySearchArea = this.page.locator('.search-box-top-fixed-area');

  /** Sticky search input field (#search_frm_fixed #sw) */
  readonly stickySearchInput = this.page.locator('form#search_frm_fixed input#sw, form#search_frm_fixed input[name="q"]').first();

  /** Sticky search submit button (form#search_frm_fixed button[type="submit"]) */
  readonly stickySearchSubmitButton = this.page.locator('form#search_frm_fixed button[type="submit"], form#search_frm_fixed button.execloginbtn').first();

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
        await this.clickElement(this.searchSubmitButton);
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
      await Promise.all([
        this.page.waitForURL(/\/search\/ris/i, { timeout: 30_000, waitUntil: 'domcontentloaded' }),
        (async () => {
          await this.fileUploadInput.setInputFiles(filePath);
          await this.fileUploadInput.dispatchEvent('change').catch(() => {});
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
   * Toggle AI Search (AI検索) ON or OFF.
   */
  async toggleAiSearch(): Promise<void> {
    await test.step('Toggle AI Search state', async () => {
      await this.clickElement(this.searchByAiButton);
    });
  }

  /**
   * Dismiss the semantic/AI search introduction modal if visible.
   */
  async dismissSemanticSearchModal(): Promise<void> {
    const isVisible = await this.semanticSearchModal.waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false);
    if (isVisible) {
      await test.step('Dismiss Semantic Search Modal', async () => {
        if (await this.semanticSearchModalCloseButton.isVisible().catch(() => false)) {
          await this.semanticSearchModalCloseButton.click().catch(() => {});
        }
        await this.page.keyboard.press('Escape').catch(() => {});
        await this.semanticSearchModal.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
        await this.page.locator('.modal-backdrop').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
      });
    }
  }

  /**
   * Perform a search with AI Search enabled (AI検索).
   * Automatically detects if AI toggle is already ON (e.g. after limit reached),
   * dismisses introduction modal if present, and executes genuine user search flow.
   * @param naturalQuery - Descriptive search query (e.g. 'オフィスでパソコンを開くビジネスマン')
   */
  async searchWithAi(naturalQuery: string): Promise<void> {
    await test.step(`Search with AI using query: "${naturalQuery}"`, async () => {
      await this.dismissSemanticSearchModal();

      const isAiOn = await this.aiSearchOnIcon.isVisible().catch(() => false);
      const isDisabled = await this.searchByAiButton.isDisabled().catch(() => false);

      // Only toggle if not already ON and not disabled
      if (!isAiOn && !isDisabled) {
        await this.toggleAiSearch();
      }

      await this.fillInput(this.searchInput, naturalQuery);
      await this.searchInput.press('Enter');
    });
  }

  /**
   * Scroll down the page to trigger the Sticky Header Search Bar (.search-box-top-fixed-area).
   * @param scrollDistance - Scroll distance in pixels (default 800)
   */
  async scrollToActivateStickySearch(scrollDistance = 800): Promise<void> {
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
        await this.clickElement(this.stickySearchSubmitButton);
      } else {
        await this.stickySearchInput.press('Enter');
      }
    });
  }
}


