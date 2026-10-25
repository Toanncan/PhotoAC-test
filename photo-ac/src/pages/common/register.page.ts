import { type Page, type Locator, test, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { MailTmHelper } from '../../utils/mail-tm.helper';

/**
 * Result object returned by the common register flow.
 * Provides the activated credentials and MailTmHelper instance for further email verifications.
 */
export interface RegisteredAccount {
  email: string;
  password: string;
  mailTm: MailTmHelper;
}

export interface RegisterNewUserOptions {
  /** Desired account password (default: 'Manhtoan@2026!') */
  password?: string;
  /** Custom prefix for the random email username (default: 'ac_free') */
  usernamePrefix?: string;
  /** Whether to click 'トップページ' link to navigate back to Photo-AC authenticated (default: true) */
  navigateToTopPage?: boolean;
}

/**
 * RegisterPage — Page Object for Free User Registration flow on Photo-AC.
 *
 * All locators are inspected and verified directly from test-lien.photo-ac.com DOM.
 * True E2E simulation without guessing selectors or injecting URL params.
 */
export class RegisterPage extends BasePage {
  // Header Navigation Locators
  /** Visible '会員登録（無料）' button in the global header */
  readonly registerHeaderButton: Locator = this.page.locator(
    '#registration-menu-header:visible'
  );

  /** Visible 'ダウンロード会員登録（無料）' dropdown link for download users */
  readonly downloadUserRegisterLink: Locator = this.page.locator(
    'a:has-text("ダウンロード会員登録（無料）"):visible'
  );

  /** Visible '写真投稿する（無料）' dropdown link for creator users */
  readonly creatorRegisterLink: Locator = this.page.locator(
    'a:has-text("写真投稿する（無料）"):visible'
  );

  // Signup Form Locators (test-accounts.ac-illust.com/signup)
  /** Email input field on the registration form */
  readonly emailInput: Locator = this.page.getByRole('textbox', {
    name: 'メールアドレスを入力してください',
  });

  /** '次へ' (Next / Submit) button on the registration form */
  readonly nextButton: Locator = this.page.getByRole('button', { name: '次へ' });

  // Provisional Registration Result Locators (仮登録)
  /** '仮登録が完了しました！' heading shown after submitting email */
  readonly provisionalSuccessHeading: Locator = this.page.getByRole('heading', {
    level: 1,
    name: /仮登録が完了しました/,
  });

  /** Confirmation message regarding verification email */
  readonly provisionalSuccessMessage: Locator = this.page.locator(
    'p:has-text("認証メールを送信しました")'
  );

  // Password Setting Locators (test-accounts.ac-illust.com/password-setting)
  /** 'パスワードを設定' heading on password setting screen */
  readonly passwordSettingHeading: Locator = this.page.getByRole('heading', {
    level: 1,
    name: 'パスワードを設定',
  });

  /** Password input field (name="password") */
  readonly passwordInput: Locator = this.page.locator('input[name="password"]');

  /** Confirm password input field (name="confirm_password") */
  readonly passwordConfirmInput: Locator = this.page.locator(
    'input[name="confirm_password"]'
  );

  /** '次 へ' button on password setting screen */
  readonly submitPasswordButton: Locator = this.page.getByRole('button', {
    name: /次\s*へ/,
  });

  // Final Registration Result Locators (本登録完了)
  /** '本登録が完了しました！' heading */
  readonly finalSuccessHeading: Locator = this.page.getByRole('heading', {
    level: 1,
    name: '本登録が完了しました！',
  });

  /** 'トップページ' link to navigate back to Photo-AC home with active session */
  readonly topPageLink: Locator = this.page.getByRole('link', {
    name: 'トップページ',
  });

  /** 'プロフィール編集' link */
  readonly profileEditLink: Locator = this.page.getByRole('link', {
    name: 'プロフィール編集',
  });

  constructor(page: Page) {
    super(page);
  }

  // Individual Interaction Methods
  /**
   * Navigate to the home page and click Download User Registration from header.
   */
  async goToFreeUserRegisterPage(): Promise<void> {
    await test.step('Điều hướng đến trang đăng ký Download Free User từ Header', async () => {
      await this.navigate('/');
      await this.waitForPageLoad();
      await this.clickElement(this.registerHeaderButton);
      await this.clickElement(this.downloadUserRegisterLink);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Submit email to complete provisional registration (仮登録).
   * @param email - Valid email address to register
   */
  async submitProvisionalRegistration(email: string): Promise<void> {
    await test.step(`Nhập email (${email}) và gửi yêu cầu đăng ký tạm`, async () => {
      await this.fillInput(this.emailInput, email);
      await this.clickElement(this.nextButton);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Complete full provisional registration flow from home page.
   * @param email - Valid email address to register
   */
  async registerFreeUserProvisional(email: string): Promise<void> {
    await test.step(`Đăng ký tài khoản Free User mới với email: ${email}`, async () => {
      await this.goToFreeUserRegisterPage();
      await this.submitProvisionalRegistration(email);
    });
  }

  /**
   * Check if provisional registration success screen is displayed.
   */
  async isProvisionalRegistrationSuccessful(): Promise<boolean> {
    return this.provisionalSuccessHeading.isVisible();
  }

  /**
   * Navigate to the email activation link, fill password & confirm password, and submit.
   *
   * @param activationUrl - URL extracted from the verification email
   * @param password - Desired password for the new account
   */
  async setPasswordAndCompleteRegistration(
    activationUrl: string,
    password: string
  ): Promise<void> {
    await test.step('Truy cập link kích hoạt và thiết lập mật khẩu hoàn tất tài khoản', async () => {
      await this.page.goto(activationUrl, { waitUntil: 'domcontentloaded' });

      // Wait for password setting form to appear
      await expect(this.passwordInput).toBeVisible({ timeout: 15_000 });
      await this.fillInput(this.passwordInput, password);

      await expect(this.passwordConfirmInput).toBeVisible({ timeout: 10_000 });
      await this.fillInput(this.passwordConfirmInput, password);

      await this.clickElement(this.submitPasswordButton);
      await this.page.waitForLoadState('domcontentloaded');

      // Verify that final registration is completed
      await expect(this.finalSuccessHeading).toBeVisible({ timeout: 15_000 });
    });
  }

  /**
   * Click 'トップページ' link to navigate back to Photo-AC with newly registered session.
   */
  async navigateToTopPageAfterRegistration(): Promise<void> {
    await test.step('Click link トップページ để trở về Photo-AC với phiên đăng nhập mới', async () => {
      await this.clickElement(this.topPageLink);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Common Reusable Flow: Complete End-to-End Registration
  /**
   * COMMON REUSABLE WORKFLOW:
   * Perform complete end-to-end Free User registration from scratch.
   *
   * Flow:
   * 1. Creates a fresh disposable email via mail.tm (no '+' alias).
   * 2. Navigates to Photo-AC and submits provisional registration.
   * 3. Waits for activation email via mail.tm.
   * 4. Extracts the activation URL ('本登録する').
   * 5. Navigates to activation URL, sets password & confirm password.
   * 6. Verifies '本登録が完了しました！' success screen.
   * 7. Optionally clicks 'トップページ' to return to Photo-AC with active session.
   *
   * @param options - Configuration options for password and username prefix.
   * @returns RegisteredAccount object with email, password, and active mailTm instance.
   */
  async registerNewFreeUserAccount(
    options?: RegisterNewUserOptions
  ): Promise<RegisteredAccount> {
    const defaultPassword = options?.password || '12345678';
    const usernamePrefix = options?.usernamePrefix || 'acfree';
    const shouldGoToTop = options?.navigateToTopPage ?? true;

    return await test.step('COMMON FLOW: Đăng ký tài khoản Free User mới hoàn chỉnh', async () => {
      const mailTm = new MailTmHelper();

      // Step 1: Create disposable email
      const account = await mailTm.createAccount({ usernamePrefix });
      const email = account.address;

      // Step 2: Submit email on Photo-AC
      await this.registerFreeUserProvisional(email);
      await expect(this.provisionalSuccessHeading).toBeVisible({ timeout: 10_000 });

      // Step 3: Wait for verification email from Photo-AC
      const activationEmail = await mailTm.waitForEmail({
        subjectContains: '仮登録完了',
        timeoutMs: 60_000,
      });

      // Step 4: Extract activation URL
      const activationUrl = mailTm.extractActivationLink(activationEmail);
      if (!activationUrl) {
        throw new Error(
          `[RegisterPage] Failed to extract activation link from email: "${activationEmail.subject}"`
        );
      }

      // Step 5: Fill password and confirm password on password-setting page
      await this.setPasswordAndCompleteRegistration(activationUrl, defaultPassword);

      // Step 6: Navigate back to Top Page if requested
      if (shouldGoToTop) {
        await this.navigateToTopPageAfterRegistration();
      }

      return {
        email,
        password: defaultPassword,
        mailTm,
      };
    });
  }
}

