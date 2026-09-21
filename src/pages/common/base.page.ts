import { type Page, type Locator, expect } from '@playwright/test';

/**
 * BasePage — Abstract base class for all Page Object classes.
 * Contains common reusable methods with smart waits.
 * NEVER place assertions here — assertions belong in test files.
 */
export abstract class BasePage {
  protected readonly page: Page;

  protected readonly photoAiModelContent: Locator;

  protected readonly closeButton: Locator;

  protected readonly pageLoadingIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.photoAiModelContent = this.page.locator('.photo-ai-lab-modal__content');
    this.closeButton = this.page.getByRole('button', { name: '閉じる' }).nth(1);
    this.pageLoadingIcon = page.locator('#full_page_loading').first();
  }

  // ─── Navigation ──────────────────────────────────────────────────────────

  /**
   * Navigate to a URL path relative to baseURL with resilient retry on transient network timeouts.
   * @param path - Relative path (e.g., '/login') or absolute URL
   * @param options - Optional navigation configuration
   */
  async navigate(path: string = '/', options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout ?? 25_000;
    try {
      await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
    } catch {
      // Retry once if navigation timed out due to staging network latency
      await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
    }
  }

  /**
   * Wait for the page to reach a stable network state.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  }

  // ─── Element Interaction ─────────────────────────────────────────────────

  /**
   * Click an element after ensuring it is visible and enabled.
   * @param locator - Playwright Locator object
   */
  async clickElement(locator: Locator, options?: { force?: boolean }): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 20_000 });
    if (options?.force) {
      await locator.click({ force: true });
    } else {
      await locator.click().catch(async () => {
        await locator.click({ force: true });
      });
    }
  }

  /**
   * Fill an input field — clears existing value first.
   * @param locator - Playwright Locator for the input
   * @param value - Text to type into the field
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 20_000 });
    await locator.fill('');
    await locator.fill(value);
  }

  /**
   * Get trimmed text content of an element.
   * @param locator - Playwright Locator
   * @returns Text content string
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: 20_000 });
    return (await locator.textContent())?.trim() ?? '';
  }

  /**
   * Get the value of an input element.
   * @param locator - Playwright Locator for the input
   */
  async getInputValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  /**
   * Check if an element is visible on the page.
   * @param locator - Playwright Locator
   * @returns true if visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  /**
   * Wait for an element to become visible within timeout.
   * @param locator - Playwright Locator
   * @param timeout - Optional custom timeout in ms
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * Wait for an element to disappear (hidden or detached).
   * @param locator - Playwright Locator
   * @param timeout - Optional custom timeout in ms
   */
  async waitForPageLoadingIconHidden(): Promise<void> {
    await this.pageLoadingIcon.waitFor({ state: 'hidden', timeout: 10_000 });
  }

  /**
   * Select an option in a <select> dropdown by visible text.
   * @param locator - Playwright Locator for the select element
   * @param label - Visible text of the option to select
   */
  async selectOption(locator: Locator, label: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.selectOption({ label });
  }

  /**
   * Check a checkbox if it is not already checked.
   * @param locator - Playwright Locator for the checkbox
   */
  async checkCheckbox(locator: Locator): Promise<void> {
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  /**
   * Uncheck a checkbox if it is currently checked.
   * @param locator - Playwright Locator for the checkbox
   */
  async uncheckCheckbox(locator: Locator): Promise<void> {
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  // ─── URL and Title ───────────────────────────────────────────────────────

  /**
   * Get current page URL.
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get current page title.
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  // ─── Screenshot ──────────────────────────────────────────────────────────

  /**
   * Take a screenshot and return the Buffer.
   * @param name - Optional file name (without extension)
   */
  async takeScreenshot(name?: string): Promise<Buffer> {
    return this.page.screenshot({
      path: name ? `test-results/${name}.png` : undefined,
      fullPage: true,
    });
  }

  async closePhotoAiModelContent() {
    if (await this.photoAiModelContent.isVisible()) {
      await this.closeButton.click();
    }
  }
}
