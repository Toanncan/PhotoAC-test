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
  private readonly searchInput = this.page.getByRole('searchbox', { name: 'キーワード（例：女性）' });

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
  readonly imageSearchButton = this.page.locator('a.search-file[data-target="#uploadFile"]').first();

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
  readonly searchByAiButton = this.page.locator('.search-by-ai').first();

  /** Hidden input for by_ai value (0: OFF, 1: ON) */
  readonly byAiInput = this.page.locator('.search-by-ai input[name="by_ai"]').first();

  /** AI Search ON icon (green/active) */
  readonly aiSearchOnIcon = this.page.locator('.search-by-ai .search-ai-icon-on').first();

  /** AI Search OFF icon (gray/inactive) */
  readonly aiSearchOffIcon = this.page.locator('.search-by-ai .search-ai-icon-off').first();

  /** Clock overlay icon indicating daily search limit reached (3 times/day) */
  readonly aiLimitClockIcon = this.page.locator('.search-by-ai .overlay-icon-clock').first();

  /** Main search submit button */
  readonly searchSubmitButton = this.page.locator('button.search_btn, #search_btn').first();

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
      await this.searchInput.click();
      await this.fillInput(this.searchInput, keyword);
      await this.page.keyboard.press('Enter');
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
      await this.fileUploadInput.setInputFiles(filePath);
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
   * Perform a search with AI Search enabled (AI検索).
   * @param naturalQuery - Descriptive search query (e.g. 'オフィスでパソコンを開くビジネスマン')
   */
  async searchWithAi(naturalQuery: string): Promise<void> {
    await test.step(`Search with AI using query: "${naturalQuery}"`, async () => {
      const isAiOn = await this.aiSearchOnIcon.isVisible().catch(() => false);
      const isDisabled = await this.searchByAiButton.isDisabled().catch(() => false);

      if (!isAiOn && !isDisabled) {
        await this.toggleAiSearch();
      }

      await this.searchInput.click();
      await this.fillInput(this.searchInput, naturalQuery);
      await this.page.keyboard.press('Enter');
    });
  }
}


