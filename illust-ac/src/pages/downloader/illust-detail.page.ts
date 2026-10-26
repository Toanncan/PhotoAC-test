import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * IllustDetailPage — Page Object for illustration detail and download page (/main/detail.php?id=:id).
 * Handles material details, author information, social interactions (like, fan, bookmark, share),
 * and format-specific downloads (JPEG, PNG, AI/EPS).
 *
 * Applicable Roles: Guest, Free User, Premium User
 */
export class IllustDetailPage extends BasePage {
  // Constants
  /** Standard Acworks sample illustration ID */
  static readonly ACWORKS_DEFAULT_ILLUST_ID = '640040';

  /** Acworks creator name */
  static readonly ACWORKS_CREATOR_NAME = 'ACworks';

  // Header & Metadata Locators
  /** H1 page title of the illustration detail */
  readonly illustTitle: Locator = this.page.getByRole('heading', { level: 1 }).or(this.page.locator('h1')).first();

  /** Author/Creator link on detail page */
  readonly creatorLink: Locator = this.page.locator('a[href*="profile.php"]').first();

  /** Author name element */
  readonly creatorName: Locator = this.page
    .locator('a[href*="profile.php"]')
    .filter({ hasText: new RegExp(IllustDetailPage.ACWORKS_CREATOR_NAME, 'i') })
    .first();

  // Format Elements
  /** Premium Direct Download Link: JPEG */
  readonly premiumDownloadLinkJpeg: Locator = this.page
    .locator('a[href*="qu_t=jpg"]')
    .first();

  /** Premium Direct Download Link: PNG */
  readonly premiumDownloadLinkPng: Locator = this.page
    .locator('a[href*="qu_t=png"]')
    .first();

  /** Premium Direct Download Link: AI */
  readonly premiumDownloadLinkAi: Locator = this.page
    .locator('a[href*="qu_t=ai"]')
    .first();

  /** Format: JPEG (Input for Guest, Direct Link for Premium, or Text for Free) */
  readonly formatRadioJpeg: Locator = this.page
    .locator('input#detail_type_j')
    .or(this.premiumDownloadLinkJpeg)
    .or(this.page.getByText('JPEG', { exact: true }))
    .first();

  /** Format: PNG (Input for Guest, Direct Link for Premium, or Text for Free) */
  readonly formatRadioPng: Locator = this.page
    .locator('input#detail_type_p')
    .or(this.premiumDownloadLinkPng)
    .or(this.page.getByText('PNG', { exact: true }))
    .first();

  /** Format: AI (Vector) (Input for Guest, Direct Link for Premium, or Text for Free) */
  readonly formatRadioAi: Locator = this.page
    .locator('input#detail_type_e')
    .or(this.premiumDownloadLinkAi)
    .or(this.page.getByText('AI', { exact: true }))
    .first();

  /** Open with Design AC online editor link */
  readonly openDesignToolLink: Locator = this.page
    .locator('a[href*="editor=true"]')
    .first();

  /** Format price notice for Free User (e.g. 495円, 990円) */
  readonly premiumMaterialNotice: Locator = this.page.locator(
    'text=こちらはプレミアム会員限定のプレミアム素材です'
  );

  // Download Buttons
  /** Primary download button (Guest redirects to signup/login; Free/Premium triggers download) */
  readonly downloadButton: Locator = this.page
    .locator('button#btn-download:visible, button:has-text("ダウンロード"):visible, a.historyDowloads:visible, a[href*="qu_t=jpg"]:visible, a[href*="qu_t="]:visible')
    .first();

  /** Buy extra license button */
  readonly buyExtraLicenseButton: Locator = this.page
    .locator('a')
    .filter({ hasText: '今すぐ購入' })
    .first();

  /** Extra license terms / description link */
  readonly extraLicenseTermsLink: Locator = this.page
    .locator('a.ac-text-blue')
    .filter({ hasText: '商品化ライセンス購入' })
    .first();

  /** Save file to My Folder button */
  readonly saveToFolderButton: Locator = this.page.locator('button#acm-btn-save-file');

  // Social Interaction Buttons
  /** Bookmark button */
  readonly bookmarkButton: Locator = this.page
    .locator('a.btn-add-to-bookmark, [aria-label="ボタンブックマーク"]')
    .first();

  /** Like button */
  readonly likeButton: Locator = this.page.locator('[aria-label="ボタンのような"]').first();

  /** Like count display */
  readonly likeCount: Locator = this.page.locator('#nice_msg');

  /** Fan registration button */
  readonly fanButton: Locator = this.page.locator('[aria-label="ボタンファン"]').first();

  /** Fan count display */
  readonly fanCount: Locator = this.page.locator('#detail-fan-count');

  /** Share button toggle */
  readonly shareButton: Locator = this.page.locator('[aria-label="ボタンシェア"]').first();

  /** Share SNS buttons */
  readonly shareFacebookButton: Locator = this.page
    .locator('a[href*="facebook.com"]')
    .or(this.page.locator('.btn-share').filter({ hasText: 'Facebook' }))
    .first();
  readonly shareTwitterButton: Locator = this.page
    .locator('a[href*="twitter.com"], a[href*="x.com"]')
    .or(this.page.locator('.btn-share').filter({ hasText: 'X' }))
    .first();
  readonly sharePinterestButton: Locator = this.page
    .locator('a[href*="pinterest.com"]')
    .or(this.page.locator('.btn-share').filter({ hasText: 'Pinterest' }))
    .first();

  /** Floating toolbar elements */
  readonly floatingBulkDownload: Locator = this.page
    .locator('a:has-text("まとめて ダウンロード"), a:has-text("まとめてダウンロード")')
    .first();
  readonly floatingDownloadHistory: Locator = this.page
    .locator('a:has-text("ダウンロード 履歴"), a:has-text("ダウンロード履歴")')
    .first();

  /** Popover or tooltip shown to Guest when clicking protected actions */
  readonly guestNoticePopover: Locator = this.page.locator(
    'div.popover.show, div.popover:visible, div[role="tooltip"]:visible'
  ).first();

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
  /**
   * Navigate directly to illustration detail page by ID.
   * @param id - Illustration ID (defaults to ACWORKS_DEFAULT_ILLUST_ID)
   */
  async goToDetailPage(id: string = IllustDetailPage.ACWORKS_DEFAULT_ILLUST_ID): Promise<void> {
    await test.step(`Navigate to illustration detail page with ID: ${id}`, async () => {
      await this.navigate(`/main/detail.php?id=${id}`);
      await this.waitForPageLoad();
    });
  }

  // Action Methods
  /**
   * Select a download format: 'JPEG' | 'PNG' | 'AI'
   * @param format - Desired format
   */
  async selectFormat(format: 'JPEG' | 'PNG' | 'AI'): Promise<void> {
    await test.step(`Select download format: ${format}`, async () => {
      let target: Locator;
      if (format === 'JPEG') target = this.formatRadioJpeg;
      else if (format === 'PNG') target = this.formatRadioPng;
      else target = this.formatRadioAi;

      await target.waitFor({ state: 'attached' });
      const isInput = await target.evaluate(el => el.tagName.toLowerCase() === 'input').catch(() => false);
      if (isInput) {
        await target.check({ force: true }).catch(async () => {
          await target.click({ force: true });
        });
      }
    });
  }

  /**
   * Click main download button.
   */
  async clickDownload(): Promise<void> {
    await test.step('Click main download button', async () => {
      await this.clickElement(this.downloadButton);
    });
  }

  /**
   * Click bookmark button.
   */
  async clickBookmark(): Promise<void> {
    await test.step('Click Bookmark button', async () => {
      await this.clickElement(this.bookmarkButton);
    });
  }

  /**
   * Click Like button.
   */
  async clickLike(): Promise<void> {
    await test.step('Click Like button', async () => {
      await this.clickElement(this.likeButton);
    });
  }

  /**
   * Click Fan registration button.
   */
  async clickFan(): Promise<void> {
    await test.step('Click Fan button', async () => {
      await this.clickElement(this.fanButton);
    });
  }
}
