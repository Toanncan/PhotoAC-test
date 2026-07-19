import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';


export class ProfileEditPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Page heading — プロフィール編集 or similar */
  readonly pageHeading = this.page.getByRole('heading', { name: /プロフィール/ });

  /** 会員種別 (Membership type) section — contains plan name + amount */
  readonly membershipTypeSection = this.page.locator('text=会員種別').first();

  // ─── Constructor ──────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  // ─── Methods ──────────────────────────────────────────────────────────────

  /**
   * Navigate directly to the profile edit page.
   */
  async goToProfileEditPage(): Promise<void> {
    await test.step('Navigate to Profile Edit page (/user/profile/edit)', async () => {
      await this.navigate('/user/profile/edit');
      await this.page.waitForURL(/\/user\/profile\/edit/, {
        waitUntil: 'domcontentloaded',
        timeout: 30_000,
      });
    });
  }

  /**
   * Get the full text of the 会員種別 (membership type) row/section.
   * This typically contains the plan name and billing amount.
   * @returns Full text content of the membership type area
   */
  async getMembershipTypeText(): Promise<string> {
    return test.step('Get 会員種別 text', async () => {
      // Strategy 1: Find the row/cell containing 会員種別 and get its sibling/parent text
      // Try common table/form layout patterns

      // Pattern A: <tr> or <dl> row where 会員種別 is the label
      const membershipRow = this.page.locator('tr:has-text("会員種別")').first();
      if (await membershipRow.isVisible({ timeout: 3_000 }).catch(() => false)) {
        return (await membershipRow.innerText()).trim();
      }

      // Pattern B: <dl> / <div> structure
      const membershipDl = this.page.locator('dl:has-text("会員種別"), div:has-text("会員種別")').first();
      if (await membershipDl.isVisible({ timeout: 3_000 }).catch(() => false)) {
        return (await membershipDl.innerText()).trim();
      }

      // Pattern C: Any parent element containing 会員種別
      const membershipParent = this.page.locator(':has-text("会員種別")').last();
      return (await membershipParent.innerText()).trim();
    });
  }

  /**
   * Extract the monetary amount from the 会員種別 section.
   * Parses formats like: ¥1,980 / ￥1,980 / 1,980円 / 1980円
   * @returns Numeric amount string without commas (e.g., '1980'), or empty string
   */
  async getMembershipAmount(): Promise<string> {
    return test.step('Extract amount from 会員種別', async () => {
      const membershipText = await this.getMembershipTypeText();

      // Match Japanese Yen patterns — no year filter needed (regex requires ¥/円)
      const amountRegex = /[¥￥]\s*([\d,]+)|([\d,]+)\s*円/g;
      let match;
      while ((match = amountRegex.exec(membershipText)) !== null) {
        const amount = (match[1] || match[2]).replace(/,/g, '');
        return amount;
      }

      return '';
    });
  }

  /**
   * Get all visible amounts on the profile edit page.
   * @returns Array of amount strings (numeric, no commas)
   */
  async getAllAmountsOnPage(): Promise<string[]> {
    return test.step('Get all amounts on profile page', async () => {
      const pageText = await this.page.locator('body').innerText();
      const amountRegex = /[¥￥]\s*([\d,]+)|([\d,]+)\s*円/g;
      const amounts: string[] = [];
      let match;
      while ((match = amountRegex.exec(pageText)) !== null) {
        const amount = (match[1] || match[2]).replace(/,/g, '');
        amounts.push(amount);
      }
      return amounts;
    });
  }

  /**
   * Get all amounts from the 会員種別 section specifically.
   * Returns both tax-excluded and tax-included amounts.
   * e.g., "税別1,800円（税込1,980円）" → ['1800', '1980']
   * @returns Array of amount strings
   */
  async getMembershipAllAmounts(): Promise<string[]> {
    return test.step('Get all amounts from 会員種別 section', async () => {
      const membershipText = await this.getMembershipTypeText();
      const amountRegex = /[¥￥]\s*([\d,]+)|([\d,]+)\s*円/g;
      const amounts: string[] = [];
      let match;
      while ((match = amountRegex.exec(membershipText)) !== null) {
        const amount = (match[1] || match[2]).replace(/,/g, '');
        amounts.push(amount);
      }
      return amounts;
    });
  }
}
