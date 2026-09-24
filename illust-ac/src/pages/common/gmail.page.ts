import { type Page, type Locator, test } from '@playwright/test';

/**
 * GmailPage — Page Object for Gmail web UI.
 *
 * Used to verify receipt/payment emails by:
 * 1. Logging into Gmail
 * 2. Searching for specific emails
 * 3. Extracting amount information from email body
 *
 * NOTE: Gmail UI can change frequently. Locators are based on current Gmail UI
 * and use semantic/role-based strategies where possible.
 */
export class GmailPage {
  readonly page: Page;

  // ─── Locators: Login Flow ─────────────────────────────────────────────────

  /** Email input on Google Sign-in page */
  readonly emailInput: Locator;

  /** Password input on Google Sign-in page */
  readonly passwordInput: Locator;

  /** "Next" button on Google Sign-in (after email) */
  readonly nextButton: Locator;

  // ─── Locators: Gmail Inbox ────────────────────────────────────────────────

  /** Gmail search input box */
  readonly searchInput: Locator;

  /** Search button (magnifying glass) */
  readonly searchButton: Locator;

  // ─── Constructor ──────────────────────────────────────────────────────────

  constructor(page: Page) {
    this.page = page;

    // Login flow locators
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.nextButton = page.getByRole('button', { name: /Next|次へ/i });

    // Gmail inbox locators
    this.searchInput = page.getByRole('search').locator('input').first();
    this.searchButton = page.getByRole('button', { name: /search mail|メールを検索/i });
  }

  // ─── Methods: Navigation ──────────────────────────────────────────────────

  /**
   * Navigate to Gmail inbox.
   * Gmail is a heavy SPA — 'domcontentloaded' often times out.
   * Uses 'commit' (server response received) + manual wait for UI stability.
   */
  async goToGmail(): Promise<void> {
    await test.step('Navigate to Gmail', async () => {
      // Use 'commit' — fires when server responds (before full SPA load)
      await this.page.goto('https://mail.google.com/', {
        waitUntil: 'commit',
        timeout: 60_000,
      });
      // Wait for the page to settle — either login form or inbox will appear
      await this.page.waitForLoadState('domcontentloaded', { timeout: 30_000 }).catch(() => {});
    });
  }

  // ─── Methods: Login ───────────────────────────────────────────────────────

  /**
   * Login to Gmail with email and password.
   * Handles Google's multi-step login flow.
   * @param email - Gmail address
   * @param password - Gmail password or App Password
   */
  async login(email: string, password: string): Promise<void> {
    await test.step(`Login to Gmail with account: ${email}`, async () => {
      // Step 1: Enter email
      await test.step('Enter email address', async () => {
        await this.emailInput.waitFor({ state: 'visible', timeout: 15_000 });
        await this.emailInput.fill(email);
        await this.nextButton.click();
      });

      // Step 2: Enter password
      await test.step('Enter password', async () => {
        await this.passwordInput.waitFor({ state: 'visible', timeout: 15_000 });
        await this.passwordInput.fill(password);
        await this.nextButton.click();
      });

      // Step 3: Wait for inbox to load
      await test.step('Wait for Gmail inbox to load', async () => {
        await this.page.waitForURL(/mail\.google\.com/, { timeout: 30_000 });
        // Wait for Gmail UI to stabilize — search box indicates inbox loaded
        await this.searchInput.waitFor({ state: 'visible', timeout: 30_000 });
      });
    });
  }

  // ─── Methods: Search & Read Email ─────────────────────────────────────────

  /**
   * Search for emails matching a query string.
   * @param query - Gmail search query (e.g., "subject:領収書 from:photo-ac")
   */
  async searchEmail(query: string): Promise<void> {
    await test.step(`Search Gmail for: "${query}"`, async () => {
      await this.searchInput.waitFor({ state: 'visible', timeout: 15_000 });
      await this.searchInput.click();
      await this.searchInput.fill(query);
      await this.page.keyboard.press('Enter');

      // Wait for search results to load
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
      // Small delay for Gmail to render search results
      await this.page.waitForTimeout(2000);
    });
  }

  /**
   * Open the first (latest) email in search results.
   */
  async openLatestEmail(): Promise<void> {
    await test.step('Open the latest email from search results', async () => {
      // Gmail email rows in inbox/search results — use table row pattern
      const emailRow = this.page.locator('tr.zA').first();
      await emailRow.waitFor({ state: 'visible', timeout: 15_000 });
      await emailRow.click();

      // Wait for email to open — the email body container should appear
      await this.page.locator('div.a3s').first().waitFor({
        state: 'visible',
        timeout: 15_000,
      });
    });
  }

  /**
   * Get the full text content of the currently opened email body.
   * @returns Full email body text
   */
  async getEmailBodyText(): Promise<string> {
    return test.step('Extract email body text', async () => {
      const emailBody = this.page.locator('div.a3s').first();
      await emailBody.waitFor({ state: 'visible', timeout: 10_000 });
      const text = await emailBody.innerText();
      return text.trim();
    });
  }

  /**
   * Extract monetary amount(s) from the email body text.
   * Supports formats: ¥1,980 / 1,980円 / ￥1980 / 1980 円
   * @returns Array of matched amount strings (e.g., ['1,980', '980'])
   */
  async extractAmountsFromEmail(): Promise<string[]> {
    return test.step('Extract monetary amounts from email', async () => {
      const bodyText = await this.getEmailBodyText();

      // Match Japanese Yen patterns:
      // ¥1,980 / ￥1,980 / 1,980円 / 1980円 / ¥1980
      const amountRegex = /[¥￥][\s]*([\d,]+)|(\d[\d,]*)\s*円/g;
      const amounts: string[] = [];
      let match;

      while ((match = amountRegex.exec(bodyText)) !== null) {
        // Capture group 1 (after ¥) or group 2 (before 円)
        const amount = (match[1] || match[2]).replace(/,/g, '');
        amounts.push(amount);
      }

      return amounts;
    });
  }

  /**
   * Check if the Gmail inbox is loaded (search box is visible).
   */
  async isInboxLoaded(): Promise<boolean> {
    return this.searchInput.isVisible();
  }

  /**
   * Get the subject line of the currently opened email.
   * @returns Email subject text
   */
  async getEmailSubject(): Promise<string> {
    return test.step('Get email subject', async () => {
      // Gmail displays subject in h2 within the email view
      const subjectElement = this.page.locator('h2.hP').first();
      await subjectElement.waitFor({ state: 'visible', timeout: 10_000 });
      return (await subjectElement.innerText()).trim();
    });
  }
}
