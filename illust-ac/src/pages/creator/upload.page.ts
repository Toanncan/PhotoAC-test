import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * UploadPage — Page Object for Creator Illustration Upload flow on AC-Illust.
 *
 * Route: /creator/upload.php (Heading: イラストの投稿)
 *
 * Applicable Role: Creator
 */
export class UploadPage extends BasePage {
  // Page URL
  readonly PAGE_URL = '/creator/upload.php';

  // Headings
  /** Primary page heading: イラストの投稿 */
  readonly pageHeading: Locator = this.page
    .getByRole('heading', { level: 1 })
    .or(this.page.locator('h1, h2, .ac-section-title').filter({ hasText: 'イラストの投稿' }))
    .first();

  // File Upload Inputs
  /** JPEG illustration file input (required) */
  readonly jpegFileInput: Locator = this.page.locator('input#jpg_path');

  /** EPS vector file input (optional) */
  readonly epsFileInput: Locator = this.page.locator('input#eps_path');

  /** PNG transparent file input (optional) */
  readonly pngFileInput: Locator = this.page.locator('input#png_path');

  // Metadata Inputs
  /** Illustration title input field */
  readonly titleInput: Locator = this.page.locator('input#ttl');

  /** Tags textarea input (comma/space separated) */
  readonly tagsTextarea: Locator = this.page.locator('textarea#ntags');

  /** Category checkboxes (cb_cate[]) */
  readonly categoryCheckboxes: Locator = this.page.locator('input[type="checkbox"][name="cb_cate[]"]');

  /** Specific first category checkbox (e.g. ビジネス) */
  readonly firstCategoryCheckbox: Locator = this.categoryCheckboxes.first();

  /** AI tool usage declaration checkbox */
  readonly aiStatusCheckbox: Locator = this.page.locator('input#illust_ai_status');

  /** Illustration description textarea */
  readonly descriptionTextarea: Locator = this.page.locator('textarea#illust_comment');

  // Submit Button
  /** Primary upload submit button (新規投稿) */
  readonly submitUploadButton: Locator = this.page.locator('input#submit_btn, button#submit_btn');

  // Confirm Copyright Modal (#confirmCopyrightModal)
  /** Confirm copyright modal container */
  readonly confirmModal: Locator = this.page.locator('#confirmCopyrightModal');

  /** Heading inside confirm copyright modal (【ご注意ください】) */
  readonly confirmModalHeading: Locator = this.confirmModal.locator('h5, .modal-title');

  /** Cancel button inside modal */
  readonly confirmModalCancelButton: Locator = this.confirmModal
    .locator('button, a')
    .filter({ hasText: 'キャンセル' });

  /** Confirm/Proceed button inside modal */
  readonly confirmModalProceedButton: Locator = this.confirmModal
    .locator('button, input[type="submit"]')
    .filter({ hasText: /アップロード|確認|同意|投稿/ });

  // Validation Error Locators
  /** Generic form validation errors or alert messages */
  readonly validationErrors: Locator = this.page.locator('.alert-danger, .error-message, .text-danger, label.error');

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
  /**
   * Navigate directly to Creator Upload page.
   */
  async goToUploadPage(): Promise<void> {
    await test.step('Navigate to Creator Upload page (/creator/upload.php)', async () => {
      await this.navigate(this.PAGE_URL);
      await this.waitForPageLoad();
    });
  }

  // Action Methods
  /**
   * Set JPEG file for upload.
   * Dispatches change event to support Safari/WebKit compatibility.
   * @param filePath - Absolute or relative path to JPEG file
   */
  async setJpegFile(filePath: string): Promise<void> {
    await test.step(`Upload JPEG file: ${filePath}`, async () => {
      await this.jpegFileInput.setInputFiles(filePath);
      await this.jpegFileInput.dispatchEvent('change').catch(() => {});
    });
  }

  /**
   * Fill illustration metadata (title, tags, category).
   * @param title - Illustration title
   * @param tags - Tags string
   * @param selectFirstCategory - Whether to check the first category checkbox
   */
  async fillIllustrationMetadata(title: string, tags: string, selectFirstCategory: boolean = true): Promise<void> {
    await test.step(`Fill illustration metadata - Title: "${title}", Tags: "${tags}"`, async () => {
      if (title) {
        await this.fillInput(this.titleInput, title);
      }
      if (tags) {
        await this.fillInput(this.tagsTextarea, tags);
      }
      if (selectFirstCategory) {
        const isChecked = await this.firstCategoryCheckbox.isChecked();
        if (!isChecked) {
          const checkboxId = await this.firstCategoryCheckbox.getAttribute('id');
          if (checkboxId) {
            const label = this.page.locator(`label[for="${checkboxId}"]`);
            if (await label.isVisible().catch(() => false)) {
              await label.click();
            } else {
              await this.firstCategoryCheckbox.evaluate((el: HTMLInputElement) => {
                el.checked = true;
                el.dispatchEvent(new Event('change', { bubbles: true }));
              });
            }
          } else {
            await this.firstCategoryCheckbox.check({ force: true }).catch(async () => {
              await this.firstCategoryCheckbox.evaluate((el: HTMLInputElement) => {
                el.checked = true;
                el.dispatchEvent(new Event('change', { bubbles: true }));
              });
            });
          }
        }
      }
    });
  }

  /**
   * Submit the upload form.
   */
  async submitForm(): Promise<void> {
    await test.step('Submit illustration upload form (新規投稿)', async () => {
      await this.clickElement(this.submitUploadButton);
    });
  }
}
