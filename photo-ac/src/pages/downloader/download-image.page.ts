import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * DownloadImagePage — Page Object for the photo download / material detail page.
 * Specifically interacts with Acworks materials to ensure strict compliance
 * with the requirement of downloading ONLY Acworks images.
 */
export class DownloadImagePage extends BasePage {
  // ─── Constants ─────────────────────────────────────────────────────────────

  /** Standard Acworks sample photo ID */
  static readonly ACWORKS_DEFAULT_PHOTO_ID = '1651238';

  /** Acworks creator profile ID */
  static readonly ACWORKS_CREATOR_ID = '43626';

  /** Acworks creator name */
  static readonly ACWORKS_CREATOR_NAME = 'ACworks';

  // ─── Header & Metadata Locators ───────────────────────────────────────────

  /** H1 page title of the photo detail */
  readonly photoTitle: Locator = this.page.getByRole('heading', { level: 1 });

  /** Author/Creator link on detail page */
  readonly creatorLink: Locator = this.page.locator('a[href*="/profile/43626"]').first();

  /** Author name element */
  readonly creatorName: Locator = this.page
    .locator('a[href*="/profile/43626"]')
    .filter({ hasText: DownloadImagePage.ACWORKS_CREATOR_NAME })
    .first();

  /** Safety confirmation badge confirming creator identity */
  readonly safetyBadge: Locator = this.page.locator('text=SAFETY');

  // ─── Guest (No Login) Locators ────────────────────────────────────────────

  /** Download button for Guest user (redirects to signup/login) */
  readonly guestDownloadButton: Locator = this.page
    .getByRole('button', { name: 'ダウンロード', exact: true })
    .or(this.page.locator('a.historyDowloads:has-text("ダウンロード")'));

  /** Bulk download button for Guest user */
  readonly guestBulkDownloadButton: Locator = this.page
    .locator('a[aria-label="まとめてダウンロード"]')
    .or(this.page.getByRole('button', { name: 'まとめてダウンロード' }));

  /** Buy extra license button for Guest user (triggers login popover) */
  readonly guestBuyExtraLicenseButton: Locator = this.page.locator(
    'a[data-popover-content="#license-nologin-popover"]'
  );

  /** Active popover container shown after guest clicks actions */
  readonly guestPopover: Locator = this.page.locator(
    'div.popover.show, #license-nologin-popover-clone, div.popover:has(#license-nologin-popover)'
  );

  // ─── Free User Locators ───────────────────────────────────────────────────

  /** Bulk download folder button on the floating sidebar for Free User */
  readonly freeBulkDownloadButton: Locator = this.page.locator('a.btn-bulkdownload');

  /** Buy extra license button for Free User */
  readonly freeBuyExtraLicenseButton: Locator = this.page.locator(
    'a[data-popover-content="#ex-ticket-tooltip-msg"], a:has-text("今すぐ購入")'
  );

  /** Popover shown when Free User clicks Buy extra license */
  readonly freeExtraLicensePopover: Locator = this.page.locator(
    'div.popover.show:has-text("商品化ライセンスの購入は")'
  );

  /** Cart icon button (Bulk extra license) on floating sidebar */
  readonly freeCartButton: Locator = this.page.locator('a.btn-ex-cart');

  /** Active Bootstrap tooltip element */
  readonly activeTooltip: Locator = this.page.locator('div.tooltip.show');

  // ─── Premium User Locators ────────────────────────────────────────────────

  /** Size S Download button for Premium User */
  readonly premiumDownloadButtonS: Locator = this.page.locator(
    'a.button-download[href*="sz=s"]'
  );

  /** Size M Download button for Premium User */
  readonly premiumDownloadButtonM: Locator = this.page.locator(
    'a.button-download[href*="sz=m"]'
  );

  /** Size L Download button for Premium User */
  readonly premiumDownloadButtonL: Locator = this.page.locator(
    'a.button-download[href*="sz=l"]'
  );

  /** "無料編集ツールで開く" (Open Design AC tool) button for Size S */
  readonly premiumOpenDesignToolS: Locator = this.page.locator(
    'a[title="無料編集ツールで開く"][href*="sz=s"], a[data-original-title="無料編集ツールで開く"][href*="sz=s"]'
  );

  /** "無料編集ツールで開く" (Open Design AC tool) button for Size M */
  readonly premiumOpenDesignToolM: Locator = this.page.locator(
    'a[title="無料編集ツールで開く"][href*="sz=m"], a[data-original-title="無料編集ツールで開く"][href*="sz=m"]'
  );

  /** "無料編集ツールで開く" (Open Design AC tool) button for Size L */
  readonly premiumOpenDesignToolL: Locator = this.page.locator(
    'a[title="無料編集ツールで開く"][href*="sz=l"], a[data-original-title="無料編集ツールで開く"][href*="sz=l"]'
  );

  // ─── Size Selectors (Generic) ─────────────────────────────────────────────

  readonly radioSizeS: Locator = this.page.getByRole('radio', { name: 's' });
  readonly radioSizeM: Locator = this.page.getByRole('radio', { name: 'm' });
  readonly radioSizeL: Locator = this.page.getByRole('radio', { name: 'l' });

  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation Methods ───────────────────────────────────────────────────

  /**
   * Navigate directly to the detail page of an Acworks photo.
   * Default points to Acworks verified image ID 1651238.
   * @param photoId - Material ID of Acworks (defaults to 1651238)
   */
  async goToAcworksPhotoDetail(photoId: string = DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID): Promise<void> {
    await test.step(`Navigate to Acworks photo detail page (ID: ${photoId})`, async () => {
      await this.navigate(`/main/detail/${photoId}`);
      await this.waitForPageLoad();
    });
  }

  // ─── Action Methods ───────────────────────────────────────────────────────

  /**
   * Select a download size radio option.
   */
  async selectSize(size: 'S' | 'M' | 'L'): Promise<void> {
    await test.step(`Select download size: ${size}`, async () => {
      const radio = size === 'S' ? this.radioSizeS : size === 'M' ? this.radioSizeM : this.radioSizeL;
      await this.clickElement(radio);
    });
  }

  /**
   * Click guest download button.
   */
  async clickGuestDownload(): Promise<void> {
    await test.step('Click Guest Download button', async () => {
      await this.clickElement(this.guestDownloadButton);
    });
  }

  /**
   * Click guest bulk download button.
   */
  async clickGuestBulkDownload(): Promise<void> {
    await test.step('Click Guest Bulk Download button', async () => {
      await this.clickElement(this.guestBulkDownloadButton);
    });
  }

  /**
   * Click guest "今すぐ購入" (Buy Extra License) button.
   */
  async clickGuestBuyExtraLicense(): Promise<void> {
    await test.step('Click Guest Buy Extra License button', async () => {
      await this.clickElement(this.guestBuyExtraLicenseButton);
    });
  }

  /**
   * Click Free User "まとめてダウンロード" (Bulk download) icon button.
   */
  async clickFreeBulkDownload(): Promise<void> {
    await test.step('Click Free User Bulk Download icon button', async () => {
      await this.clickElement(this.freeBulkDownloadButton);
    });
  }

  /**
   * Click Free User "今すぐ購入" (Buy Extra License) button.
   */
  async clickFreeBuyExtraLicense(): Promise<void> {
    await test.step('Click Free User Buy Extra License button', async () => {
      await this.clickElement(this.freeBuyExtraLicenseButton);
    });
  }

  /**
   * Click Free User "ライセンスまとめて購入" (Cart) icon button.
   */
  async clickFreeCart(): Promise<void> {
    await test.step('Click Free User Cart (Bulk license) icon button', async () => {
      await this.clickElement(this.freeCartButton);
    });
  }

  /**
   * Click Premium User download button for a specific size and wait for the download event.
   * @param size - 'S' | 'M' | 'L'
   * @returns Playwright Download object
   */
  async downloadAsPremium(size: 'S' | 'M' | 'L'): Promise<import('@playwright/test').Download> {
    return await test.step(`Download photo as Premium User (Size: ${size})`, async () => {
      const downloadBtn =
        size === 'S'
          ? this.premiumDownloadButtonS
          : size === 'M'
          ? this.premiumDownloadButtonM
          : this.premiumDownloadButtonL;

      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 30_000 }),
        this.clickElement(downloadBtn),
      ]);

      return download;
    });
  }

  /**
   * Click "無料編集ツールで開く" (Open Design AC) for a specific size.
   * @param size - 'S' | 'M' | 'L' (defaults to 'S')
   * @returns Newly opened tab/page in Design AC if opened in new tab, or null if on current page
   */
  async clickOpenDesignTool(size: 'S' | 'M' | 'L' = 'S'): Promise<Page | null> {
    return await test.step(`Click Open Design Tool button for Size ${size}`, async () => {
      const btn =
        size === 'S'
          ? this.premiumOpenDesignToolS
          : size === 'M'
          ? this.premiumOpenDesignToolM
          : this.premiumOpenDesignToolL;

      // May open in new tab or navigate current page
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page', { timeout: 15_000 }).catch(() => null),
        this.clickElement(btn),
      ]);

      return newPage;
    });
  }
}
