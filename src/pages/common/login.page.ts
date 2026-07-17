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

  private readonly creatorLoginButton = this.page.getByRole('button', { name: /クリエイター/ });

  /** Email / username input field on the login form */
  private readonly emailInput = this.page.getByPlaceholder('メールアドレス');

  /** Password input field */
  private readonly passwordInput = this.page.getByPlaceholder('パスワード');


  /** Submit / Login button */
  private readonly submitDowloaderButton = this.page.getByRole('button', { name: /ログイン/ });

  private readonly submitCreatorButton = this.page.getByRole('button', { name: /口グイン/ });

  /** Error message container shown after failed login */
  private readonly errorMessage = this.page.locator('[class*="error"], [class*="alert"], [class*="message"]')
    .filter({ hasText: /invalid|incorrect|failed|error/i });


  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page and click the Login link.
   */
  async goToDownloaderLoginPage(): Promise<void> {
    await test.step('Navigate to login with downloader', async () => {
      await this.navigate('/');
      await this.waitForPageLoad();
      await this.clickElement(this.loginButton);
      await this.clickElement(this.downloaderLoginButton);
    })
  }

  async goToCreatorLoginPage(): Promise<void> {
    await test.step('Navigate to login with creator', async () => {
      await this.navigate('/');
      await this.waitForPageLoad();
      await this.clickElement(this.loginButton);
      await this.clickElement(this.creatorLoginButton);
    });
  }

  /**
   * Perform a full login flow: navigate to login page, fill credentials, submit.
   * @param email - User email address
   * @param password - User password
   */
  async loginAsDownloader(email: string, password: string): Promise<void> {
    await test.step(`Login with downloader, account : ${email}`, async () => {
      await this.goToDownloaderLoginPage();

      await test.step('Fill login credentials', async () => {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.submitDowloaderButton);
      })

      // Wait for redirect to complete after login — ensures session cookies are fully established
      await this.page.waitForURL(/\/(user|$)/, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await this.closePhotoAiModelContent();
      // Wait for user avatar to be visible, ensuring session cookies are fully established in the context
      await this.page.locator('#user-info-dropdown img').nth(1).waitFor({ state: 'visible', timeout: 15_000 });
    })
  }

  /**
   * Perform full creator login flow.
   * @param email - Creator email address
   * @param password - Creator password
   */
  async loginAsCreator(email: string, password: string): Promise<void> {
    await test.step(`Login as Creator with account: ${email}`, async () => {
      await this.goToCreatorLoginPage();

      await test.step('Fill login credentials', async () => {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
      });

      await test.step('Submit login form', async () => {
        await this.clickElement(this.submitCreatorButton);
      });

      await test.step('Wait for redirect to Creator Dashboard', async () => {
        await this.page.waitForURL(/\/creator\/dashboard/, { waitUntil: 'domcontentloaded', timeout: 20_000 });
      });
    });
  }

  /**
   * Get the text of the error message displayed after a failed login attempt.
   * @returns Error message text, or empty string if not found
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

}
