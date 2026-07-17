import { type Page, test } from '@playwright/test';
import { BasePage } from './common/base.page';

/**
 * CreatorLoginPage — Page Object for the Creator login screen.
 *
 * Login flow (verified from DOM 2026-07-09):
 *   1. Navigate to: /auth/login?creator=1  (SSO page with "クリエイターでログイン" mode)
 *   2. Fill: textbox "メールアドレス" (getByRole/getByPlaceholder)
 *   3. Fill: textbox "パスワード"
 *   4. Click: button "ログイン"
 *   5. Wait for redirect to /creator/dashboard/
 *
 * The /creator/auth/login page is a middleware that redirects to /auth/login (SSO).
 * We skip the middleware and go directly to SSO with creator context.
 */
export class CreatorLoginPage extends BasePage {
  // ─── Locators (verified from live DOM inspection) ─────────────────────────

  /** Email input on SSO login page — textbox with placeholder "メールアドレス" */
  private readonly emailInput = this.page.getByPlaceholder('メールアドレス');

  /** Password input on SSO login page — textbox with placeholder "パスワード" */
  private readonly passwordInput = this.page.getByPlaceholder('パスワード');

  /** Login button on SSO page — "ログイン" */
  private readonly HomeLoginButton = this.page.getByRole('button', { name: 'ログイン' }).first();

  /**
   * Login page heading — "ログイン" [h1].
   * Confirms we are on the SSO login page.
   */
  readonly pageHeading = this.page.getByRole('heading', { name: 'ログイン', level: 1 });

  /**
   * Creator avatar button in header — confirms logged in as creator.
   * Visible format: "Avatar クリエイター ToanCanさん"
   */
  readonly creatorAvatarButton = this.page.getByRole('button', {
    name: /Avatar クリエイター/,
  });

  readonly creatorLoginButton = this.page.getByRole('button', { name: /クリエイター/ });
  readonly loginButtonOnForm = this.page.getByRole('button', { name: /口グイン/ });

  // ─── Methods ──────────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the SSO login page with creator redirect context.
   * Uses /auth/login which shows "クリエイターでログイン" section.
   */
  async goToCreatorLoginPage(): Promise<void> {
    await test.step('Navigate to Homepage', async () => {
      await this.navigate('/');
      // await this.waitForPageLoad();
    });
  }

  /**
   * Perform full creator login flow.
   * @param email - Creator email address
   * @param password - Creator password
   */
  async loginAsCreator(email: string, password: string): Promise<void> {
    await test.step(`Login as Creator with account: ${email}`, async () => {
      await this.goToCreatorLoginPage();

      await test.step('Click Login button on Homepage header', async () => {
        await this.clickElement(this.HomeLoginButton);
      });

      await test.step('Select Creator login option', async () => {
        await this.clickElement(this.creatorLoginButton);
      });

      await test.step('Fill login credentials', async () => {
        await this.fillInput(this.emailInput, email);
        await this.fillInput(this.passwordInput, password);
      });

      await test.step('Submit login form', async () => {
        await this.clickElement(this.loginButtonOnForm);
      });

      await test.step('Wait for redirect to Creator Dashboard', async () => {
        await this.page.waitForURL(/\/creator\/dashboard/, { waitUntil: 'domcontentloaded', timeout: 20_000 });
      });
    });
  }

  /**
   * Check whether the creator is logged in by verifying avatar button presence.
   * @returns true if creator avatar is visible in header
   */
  async isLoggedIn(): Promise<boolean> {
    return this.isVisible(this.creatorAvatarButton);
  }
}
