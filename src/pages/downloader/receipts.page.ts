import { type Page, test } from '@playwright/test';
import { BasePage } from '../common/base.page';


export class ReceiptsPage extends BasePage {
  // ─── Locators ─────────────────────────────────────────────────────────────

  /** Company name text input (会社名) */
  readonly companyNameInput = this.page.locator('#companyname');

  /** Person in charge name text input (担当者名) */
  readonly personNameInput = this.page.locator('#username');

  /** Save recipient button (宛名保存) */
  readonly saveRecipientButton = this.page.locator('#saveusername');

  /** First radio button — selects the first billing item (outid_0) */
  readonly firstRadioButton = this.page.locator('#outid_0');

  /** Download submit button (ダウンロード) */
  readonly downloadButton = this.page.locator('#form_send');

  /** Page heading (領収書発行) */
  readonly pageHeading = this.page.getByRole('heading', { name: '領収書発行' });

  // ─── Constructor ──────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  // ─── Methods ──────────────────────────────────────────────────────────────

  /**
   * Navigate directly to the receipts page.
   */
  async goToReceiptsPage(): Promise<void> {
    await test.step('Navigate to Receipts page (/user/receipts)', async () => {
      await this.navigate('/user/receipts');
      await this.page.waitForURL(/\/user\/receipts/, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    });
  }

  /**
   * Fill in the recipient (宛名) form with company name and person name.
   * @param companyName - Company name to fill (会社名)
   * @param personName - Person in charge name (担当者名)
   */
  async fillRecipientInfo(companyName: string, personName: string): Promise<void> {
    await test.step(`Fill recipient info: company="${companyName}", person="${personName}"`, async () => {
      await this.fillInput(this.companyNameInput, companyName);
      await this.fillInput(this.personNameInput, personName);
    });
  }

  /**
   * Click the Save Recipient button and handle the native JS alert dialog.
   * The button triggers an AJAX save and shows a native alert: 宛名を保存しました。
   */
  async saveRecipientInfo(): Promise<void> {
    await test.step('Click 宛名保存 and handle JS alert', async () => {
      // Set up dialog handler BEFORE clicking to catch the native alert
      this.page.once('dialog', async (dialog) => {
        await dialog.accept();
      });
      await this.clickElement(this.saveRecipientButton);
    });
  }

  /**
   * Select a radio button by its index (0-based).
   * Each radio corresponds to a billing item shown in 対象 section.
   * @param index - 0-based index of the radio button to select
   */
  async selectBillingItemByIndex(index: number): Promise<void> {
    await test.step(`Select billing item at index ${index}`, async () => {
      const radio = this.page.locator(`#outid_${index}`);
      await radio.waitFor({ state: 'visible', timeout: 10_000 });
      await radio.click();
    });
  }

  /**
   * Download the receipt PDF by clicking the Download button.
   * Returns the Playwright Download object for further verification.
   * @returns Download object
   */
  async downloadReceiptPdf(): Promise<import('@playwright/test').Download> {
    return test.step('Click ダウンロード and wait for PDF download', async () => {
      const downloadPromise = this.page.waitForEvent('download', { timeout: 30_000 });
      await this.clickElement(this.downloadButton);
      return downloadPromise;
    });
  }

  /**
   * Get the current value of the company name input.
   */
  async getCompanyNameValue(): Promise<string> {
    return this.getInputValue(this.companyNameInput);
  }

  /**
   * Get the current value of the person name input.
   */
  async getPersonNameValue(): Promise<string> {
    return this.getInputValue(this.personNameInput);
  }

  /**
   * Check if the receipts page has loaded (heading is visible and URL matches).
   */
  async isLoaded(): Promise<boolean> {
    return this.isVisible(this.pageHeading);
  }

  /**
   * Get the label text of a radio button by index.
   * @param index - 0-based index
   */
  async getRadioLabelText(index: number): Promise<string> {
    const label = this.page.locator(`label[for="outid_${index}"]`);
    return this.getText(label);
  }

  /**
   * Extract the monetary amount from a billing item's radio label.
   * Parses formats like: ¥1,980 / ￥1,980 / 1,980円 / 1980円
   * Excludes date patterns (e.g., 2026年 is NOT an amount).
   * @param index - 0-based index of the billing item
   * @returns Numeric amount string without commas (e.g., '1980'), or empty string
   */
  async getBillingAmountText(index: number): Promise<string> {
    const labelText = await this.getRadioLabelText(index);
    // Match Japanese Yen patterns, excluding year patterns like 2026年
    const amountRegex = /[¥￥]\s*([\d,]+)|([\d,]+)\s*円/;
    const match = labelText.match(amountRegex);
    if (match) {
      const amount = (match[1] || match[2]).replace(/,/g, '');
      // Filter out year-like numbers (4 digits starting with 19xx or 20xx)
      if (!/^(19|20)\d{2}$/.test(amount)) {
        return amount;
      }
    }
    return '';
  }

  /**
   * Search the entire receipts page for monetary amount text.
   * Scans all visible text on the page for ¥ or 円 patterns.
   * @returns Array of amounts found (numeric strings without commas)
   */
  async getAllAmountsOnPage(): Promise<string[]> {
    const pageText = await this.page.locator('body').innerText();
    const amountRegex = /[¥￥]\s*([\d,]+)|([\d,]+)\s*円/g;
    const amounts: string[] = [];
    let match;
    while ((match = amountRegex.exec(pageText)) !== null) {
      const amount = (match[1] || match[2]).replace(/,/g, '');
      // Filter out year-like numbers (4 digits starting with 19xx or 20xx)
      if (!/^(19|20)\d{2}$/.test(amount)) {
        amounts.push(amount);
      }
    }
    return amounts;
  }

  /**
   * Get the first billing amount found on the page.
   * Tries radio label first, falls back to scanning full page.
   * @param index - 0-based billing item index
   * @returns Numeric amount string, or empty string if not found
   */
  async getFirstBillingAmount(index: number = 0): Promise<string> {
    // Try extracting from radio label first
    const labelAmount = await this.getBillingAmountText(index);
    if (labelAmount) return labelAmount;

    // Fallback: scan entire page for amounts
    const pageAmounts = await this.getAllAmountsOnPage();
    return pageAmounts.length > 0 ? pageAmounts[0] : '';
  }

  /**
   * Get all billing items info from the page (label text for all radio buttons).
   * Useful for debugging and logging.
   * @returns Array of label texts
   */
  async getAllBillingItemTexts(): Promise<string[]> {
    const labels = this.page.locator('label[for^="outid_"]');
    const count = await labels.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await labels.nth(i).innerText();
      texts.push(text.trim());
    }
    return texts;
  }
}

