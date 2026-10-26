import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * UploadPage — Page Object for Creator Photo Upload and Data Edit flow.
 *
 * Routes:
 * - /creator/upload  (Photo upload, terms agreement, copyright modal)
 * - /creator/dataedit (Photo metadata: title, tags, category, save)
 * - /creator/list     (Uploaded photos list confirmation)
 *
 * Applicable Role: Creator
 */
export class UploadPage extends BasePage {
  // Page URLs
  readonly PAGE_URL = '/creator/upload';
  readonly DATA_EDIT_URL = '/creator/dataedit';

  // Headings
  /** Primary page heading: 写真を投稿する */
  readonly pageHeading: Locator = this.page.getByRole('heading', {
    name: '写真を投稿する',
    level: 1,
  });

  /** Data edit page heading: 写真データ編集 */
  readonly dataEditHeading: Locator = this.page.getByRole('heading', {
    name: '写真データ編集',
    level: 1,
  });

  // File Upload Elements (/creator/upload)
  /** Hidden file input element that receives selected files */
  readonly fileInput: Locator = this.page.locator('input#selector');

  /** Notice banner indicating number of selected files (e.g. 1個のファイルを選択中) */
  readonly selectedFilesNotice: Locator = this.page.locator('p:has-text("ファイルを選択中")');

  /** Link/button to remove an uploaded file from the selection queue */
  readonly removeFileButton: Locator = this.page.getByRole('link', { name: /削除/ });

  // Confirmation Checkboxes (5 mandatory items)
  /** Checkbox 1: 自身で撮影・作成した作品であり、他者の著作権を侵害していません。 */
  readonly checkboxCopyright: Locator = this.page.locator('#customCheck1');
  readonly labelCopyright: Locator = this.page.locator('label[for="customCheck1"]');

  /** Checkbox 2: 人物や動物の写真は撮影・投稿の許可を得て撮影しています。 */
  readonly checkboxPermission: Locator = this.page.locator('#customCheck2');
  readonly labelPermission: Locator = this.page.locator('label[for="customCheck2"]');

  /** Checkbox 3: 撮影禁止や商用利用禁止の施設を写した作品ではありません。 */
  readonly checkboxFacility: Locator = this.page.locator('#customCheck3');
  readonly labelFacility: Locator = this.page.locator('label[for="customCheck3"]');

  /** Checkbox 4: わいせつな画像・公序良俗に反する作品ではありません。 */
  readonly checkboxMorality: Locator = this.page.locator('#customCheck4');
  readonly labelMorality: Locator = this.page.locator('label[for="customCheck4"]');

  /** Checkbox 5: 利用規約に同意します。 */
  readonly checkboxTerms: Locator = this.page.locator('#customCheck5');
  readonly labelTerms: Locator = this.page.locator('label[for="customCheck5"]');

  // Submit Button
  /** Primary upload button (投稿する) */
  readonly submitUploadButton: Locator = this.page.locator('button#upload');

  // Confirm Copyright Modal (#confirmCopyrightModal)
  /** Confirm copyright modal dialog */
  readonly confirmModal: Locator = this.page.locator('#confirmCopyrightModal');

  /** Heading inside confirm copyright modal (【ご注意ください】) */
  readonly confirmModalHeading: Locator = this.page.locator('#confirmCopyrightModal h5');

  /** Cancel button inside confirm copyright modal (キャンセル) */
  readonly confirmModalCancelButton: Locator = this.page
    .locator('#confirmCopyrightModal button')
    .filter({ hasText: 'キャンセル' });

  /** Confirm upload button inside modal (アップロード) */
  readonly confirmModalUploadButton: Locator = this.page.locator(
    '#confirmCopyrightModal button.ac-btn-photo'
  );

  // Data Edit Elements (/creator/dataedit)
  /** Title input field (タイトルを入力) */
  readonly photoTitleInput: Locator = this.page.locator('input#phototitle');

  /** Interactive tag editor wrapper */
  readonly tagEditor: Locator = this.page.locator('.tag-editor');

  /** Text input rendered inside tag editor when clicked */
  readonly tagEditorInput: Locator = this.page.locator('.tag-editor input[type="text"]');

  /** Added tag items list */
  readonly tagItems: Locator = this.page.locator('.tag-editor .tag-editor-tag');

  /** Category Nature (自然・風景) checkbox and label */
  readonly categoryNatureCheckbox: Locator = this.page.locator('#category_10');
  readonly categoryNatureLabel: Locator = this.page.locator('label[for="category_10"]');

  /** Save button on Data Edit page (保存) */
  readonly saveEditButton: Locator = this.page
    .locator('button#upload')
    .filter({ hasText: '保存' });


  constructor(page: Page) {
    super(page);
  }

  // Actions — Step 1: Upload Page

  /**
   * Navigate directly to Creator Photo Upload page.
   */
  async goToUploadPage(): Promise<void> {
    await test.step('Navigate to Creator Upload page', async () => {
      await this.navigate(this.PAGE_URL);
      await this.waitForPageLoad();
    });
  }

  /**
   * Select a file for uploading and dispatch the change event.
   * @param filePath - Absolute path to the photo file
   */
  async setUploadFile(filePath: string): Promise<void> {
    await test.step(`Upload photo file: ${filePath}`, async () => {
      await this.fileInput.setInputFiles(filePath);
      await this.fileInput.dispatchEvent('change').catch(() => {});
    });
  }

  /**
   * Check all 5 mandatory confirmation checklist items.
   */
  async checkAllChecklists(): Promise<void> {
    await test.step('Check all 5 mandatory confirmation checklists', async () => {
      const labels = [
        this.labelCopyright,
        this.labelPermission,
        this.labelFacility,
        this.labelMorality,
        this.labelTerms,
      ];

      for (const label of labels) {
        await this.clickElement(label);
      }
    });
  }

  /**
   * Click the primary submit upload button (投稿する).
   */
  async clickSubmitUpload(): Promise<void> {
    await test.step('Click 投稿する button', async () => {
      await this.clickElement(this.submitUploadButton);
    });
  }

  /**
   * Click confirm upload inside the warning modal (アップロード).
   */
  async confirmUploadInModal(): Promise<void> {
    await test.step('Confirm upload in modal (アップロード)', async () => {
      await this.clickElement(this.confirmModalUploadButton);
    });
  }

  /**
   * Click cancel inside the warning modal (キャンセル).
   */
  async cancelUploadInModal(): Promise<void> {
    await test.step('Cancel upload in modal (キャンセル)', async () => {
      await this.clickElement(this.confirmModalCancelButton);
    });
  }

  /**
   * Remove the uploaded file from the selection queue.
   */
  async removeUploadedFile(): Promise<void> {
    await test.step('Remove uploaded file from queue', async () => {
      await this.clickElement(this.removeFileButton);
    });
  }

  // Actions — Step 2: Data Edit Page

  /**
   * Fill title into phototitle input.
   * @param title - Photo title string (max 20 chars)
   */
  async fillTitle(title: string): Promise<void> {
    await test.step(`Fill photo title: ${title}`, async () => {
      await this.fillInput(this.photoTitleInput, title);
    });
  }

  /**
   * Add a single tag into tag editor.
   * @param tag - Tag text
   */
  async addTag(tag: string): Promise<void> {
    await test.step(`Add tag: ${tag}`, async () => {
      await this.clickElement(this.tagEditor);
      await this.tagEditorInput.fill(tag);
      await this.tagEditorInput.press('Enter');
    });
  }

  /**
   * Add multiple tags into tag editor.
   * @param tags - Array of tag strings (at least 5 tags required)
   */
  async addTags(tags: string[]): Promise<void> {
    await test.step(`Add ${tags.length} tags to photo`, async () => {
      for (const tag of tags) {
        await this.addTag(tag);
      }
    });
  }

  /**
   * Select a category by clicking its label. Defaults to 自然・風景.
   * @param categoryLabel - Optional Locator for category label
   */
  async selectCategory(categoryLabel?: Locator): Promise<void> {
    await test.step('Select photo category', async () => {
      const target = categoryLabel || this.categoryNatureLabel;
      await this.clickElement(target);
    });
  }

  /**
   * Submit and save photo metadata, auto-accepting completion alert.
   */
  async savePhotoData(): Promise<void> {
    await test.step('Click 保存 button and accept confirmation alert', async () => {
      const dialogPromise = this.page.waitForEvent('dialog', { timeout: 30_000 });
      await this.clickElement(this.saveEditButton);
      const dialog = await dialogPromise;
      await dialog.accept().catch(() => {});
    });
  }


}
