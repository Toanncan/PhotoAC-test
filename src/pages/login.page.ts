import { type Page, test } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage — Page Object for the login screen.
 *
 * NOTE: Locators below are based on common photo-ac UI patterns.
 * If any locator fails, use Playwright MCP to inspect the actual DOM
 * and update accordingly.
 */
export class LoginPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Login link/button in the header navigation */
  private readonly loginButton = this.page.getByRole('button', { name: /ログイン/ }).first();

  private readonly downloaderLoginButton = this.page.locator('text=ダウンロードユーザー').nth(1);

  /** Email / username input field on the login form */
  private readonly emailInput = this.page.locator('#email');

  /** Password input field */
  private readonly passwordInput = this.page.locator('#password');

  /** Submit / Login button */
  private readonly submitButton = this.page.getByRole('button', { name: /ログイン/ });

  /** Error message container shown after failed login */
  private readonly errorMessage = this.page.locator('[class*="error"], [class*="alert"], [class*="message"]')
    .filter({ hasText: /invalid|incorrect|failed|error/i });

  /** Success indicator — user menu or avatar shown after login */
  private readonly userMenuIndicator = this.page.locator('[class*="user-menu"], [class*="avatar"], [class*="profile"]');

  // ─── Methods ──────────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page and click the Login link.
   */
  async goToDownloaderLoginPage(): Promise<void> {
    await test.step('Navigate Homepage and click login button', async () => {
      await this.navigate('/');
      await this.waitForPageLoad();
      await this.clickElement(this.loginButton);
      await this.clickElement(this.downloaderLoginButton);
    })
  }

  /**
   * Perform a full login flow: navigate to login page, fill credentials, submit.
   * @param email - User email address
   * @param password - User password
   */
  async loginWithDownloader(email: string, password: string): Promise<void> {
    await test.step(`Login with downloader, account : ${email}`, async () => {
      await this.goToDownloaderLoginPage();
      await this.fillInput(this.emailInput, email);
      await this.fillInput(this.passwordInput, password);
      await this.clickElement(this.submitButton);
    })
  }

  /**
   * Get the text of the error message displayed after a failed login attempt.
   * @returns Error message text, or empty string if not found
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  /**
   * Check whether the user is logged in (user menu / avatar is visible).
   * @returns true if logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return this.isVisible(this.userMenuIndicator);
  }
}
