import { type Page, test } from '@playwright/test';
import { BasePage } from './common/base.page';

/**
 * DashboardPage — Page Object for the main dashboard / home page after login.
 *
 * NOTE: Update locators after inspecting the actual DOM.
 */
export class HomePage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Page heading / main title of the dashboard */
  private readonly pageHeading = this.page.getByRole('heading', { level: 1 });

  /** Search input on the dashboard */
  private readonly searchInput = this.page.getByRole('searchbox')
    .or(this.page.getByPlaceholder(/search|検索/i));

  /** User menu / account dropdown */
  private readonly userMenu = this.page.locator('[class*="user-menu"], [class*="user-nav"]').first();

  /** Logout button or link */
  private readonly logoutButton = this.page.getByRole('button', { name: /logout|sign out|ログアウト/i })
    .or(this.page.getByRole('link', { name: /logout|sign out|ログアウト/i }));

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
}
