import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * DownloadImagePage — Page Object for the photo download / material detail page.
 * Specifically interacts with Acworks materials to ensure strict compliance
 * with the requirement of downloading ONLY Acworks images.
 */
export class DownloadImagePage extends BasePage {
  // Constants
  /** Standard Acworks sample photo ID */
  static readonly ACWORKS_DEFAULT_PHOTO_ID = '1651238';

  /** Acworks creator profile ID */
  static readonly ACWORKS_CREATOR_ID = '43626';

  /** Acworks creator name */
  static readonly ACWORKS_CREATOR_NAME = 'ACworks';

  // Header & Metadata Locators
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

  // Guest (No Login) Locators
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

  // Free User Locators
  /** Main photo download button on detail page for Free User */
  readonly freeDownloadButton: Locator = this.page.locator('button.js-timerModal:has-text("ダウンロード")');

  /** Timer modal displayed with ad countdown and size selector */
  readonly timerModal: Locator = this.page.locator('#timerModal');

  /** Download button inside timer modal enabled after countdown */
  readonly timerModalDownloadButton: Locator = this.page.locator('#timerModal a.modal-ads-button-dl:has-text("ダウンロード")');

  /** First Download Completed promotional modal for Free User */
  readonly firstDownloadModal: Locator = this.page.locator('#firstDownloadedModal');

  /** Link/Form submit trigger inside first download promotional modal */
  readonly firstDownloadCouponLink: Locator = this.page.locator('#firstDownloadedModal form#coupon_form a');

  /** Promotional banner image inside first download modal */
  readonly firstDownloadCouponImage: Locator = this.page.locator('#firstDownloadedModal form#coupon_form img');

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

  // Premium User Locators
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

  // Bulk Download Locators (Premium User)
  /** "まとめてダウンロード" (Add to Bulk Download) button for Size S */
  readonly premiumBulkDownloadAddButtonS: Locator = this.page.locator(
    'a[data-action="download_select"][onclick*="small-img"]'
  );

  /** "まとめてダウンロード" (Add to Bulk Download) button for Size M */
  readonly premiumBulkDownloadAddButtonM: Locator = this.page.locator(
    'a[data-action="download_select"][onclick*="medium-img"]'
  );

  /** "まとめてダウンロード" (Add to Bulk Download) button for Size L */
  readonly premiumBulkDownloadAddButtonL: Locator = this.page.locator(
    'a[data-action="download_select"][onclick*="large-img"]'
  );

  /** Floating sidebar Bulk Download button (visible) */
  readonly toolbarBulkDownloadButton: Locator = this.page.locator('a.btn-bulkdownload:visible');

  /** Bulk Download counter badge on floating toolbar (visible) */
  readonly toolbarBulkDownloadCount: Locator = this.page.locator('a.btn-bulkdownload:visible');

  /** Bulk Download modal container */
  readonly bulkDownloadModal: Locator = this.page.locator('#bulkDownloadModal');

  /** Title element of Bulk Download modal */
  readonly bulkDownloadModalTitle: Locator = this.page.locator('#bulkDownloadModal .modal-title');

  /** Badge counter inside Bulk Download modal header */
  readonly bulkDownloadModalCount: Locator = this.page.locator('#bulkDownloadModal .img-count');

  /** List of photo items inside Bulk Download modal */
  readonly bulkDownloadModalItems: Locator = this.page.locator('#bulkDownloadModal #append_image .col-item');

  /** Remove item button (trash/close) inside Bulk Download modal */
  readonly bulkDownloadModalRemoveButton: Locator = this.page.locator('#bulkDownloadModal .img-remove');

  /** Execute bulk download button inside modal */
  readonly bulkDownloadModalSubmitButton: Locator = this.page.locator(
    '#bulkDownloadModal button.folder-down-link:has-text("まとめてダウンロード")'
  );

  /** Empty state message container in Bulk Download modal */
  readonly bulkDownloadModalEmptyMessage: Locator = this.page.locator(
    '#bulkDownloadModal .span-no-download-items'
  );

  /** Close button of Bulk Download modal */
  readonly bulkDownloadModalCloseButton: Locator = this.page.locator(
    '#bulkDownloadModal button.close'
  );

  // Size Selectors (Generic)
  readonly radioSizeS: Locator = this.page.getByRole('radio', { name: 's' });
  readonly radioSizeM: Locator = this.page.getByRole('radio', { name: 'm' });
  readonly radioSizeL: Locator = this.page.getByRole('radio', { name: 'l' });

  // Photo Detail Social & Interaction Locators
  /** Bookmark / Collection button on detail page */
  readonly bookmarkButton: Locator = this.page.locator('a.btn-add-to-bookmark, a[aria-label="ボタンブックマーク"]');

  /** Modal shown after adding photo to collection */
  readonly collectionAddedModal: Locator = this.page.locator('#modal-mycollection-added');

  /** Like button */
  readonly likeButton: Locator = this.page.locator('a[aria-label="ボタンのような"]');

  /** Like count display */
  readonly likeCount: Locator = this.page.locator('#nice_msg');

  /** Heart / Fan registration button */
  readonly heartFanButton: Locator = this.page.locator('a[aria-label="ボタンファン"]');

  /** Fan count display */
  readonly fanCount: Locator = this.page.locator('#detail-fan-count');

  /** Share button */
  readonly shareButton: Locator = this.page.locator('a[aria-label="ボタンシェア"]');

  /** Active Share Popover container */
  readonly sharePopover: Locator = this.page.locator('.popover.show:has(.box-sharing), .popover.show');

  /** Share link for Facebook inside popover */
  readonly shareFacebookLink: Locator = this.page.locator('.popover.show .box-sharing a[href*="facebook.com"]');

  /** Share link for X (Twitter) inside popover */
  readonly shareXLink: Locator = this.page.locator('.popover.show .box-sharing a[href*="x.com"], .popover.show .box-sharing a[href*="twitter.com"]');

  /** Share link for Pinterest inside popover */
  readonly sharePinterestLink: Locator = this.page.locator('.popover.show .box-sharing a[href*="pinterest.com"]');

  /** Copy URL button inside popover */
  readonly shareCopyUrlButton: Locator = this.page.locator('.popover.show .box-sharing .btn-copy-url');

  /** "コピーしました" tooltip indicator after copying link */
  readonly copiedTooltip: Locator = this.page.locator('.popover.show .copiedWrapper');

  /** Delete trash button inside Bookmarks collection item */
  readonly bookmarkTrashButton: Locator = this.page.locator('.ac-mycollection-btn-trash');

  constructor(page: Page) {
    super(page);
  }

  // Navigation Methods
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

  // Action Methods
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

  // First Download & Campaign Offer Methods
  /**
   * Dismiss any survey, advertisement or announcement modals that may block user clicks.
   */
  async dismissInterferingModals(): Promise<void> {
    // 1. Dismiss Photo AI Lab or generic promotion modals if visible
    const promoClose = this.page.locator(
      '#btn-close-photo-ai-lab, .photo-ai-lab-modal-close, #photo-ai-lab-modal button:has-text("閉じる"), #photo-ai-lab-modal .close, #photo-ai-lab-modal [aria-label="Close"], [role="region"][aria-label="Close"]'
    );
    if (await promoClose.first().isVisible().catch(() => false)) {
      await promoClose.first().click({ force: true }).catch(() => {});
    }

    // 2. Survey modal
    const surveyClose = this.page.locator(
      '#surveyGroup button.close, #surveyGroup .close, #surveyGroup button:has-text("Close"), #surveyGroup button:has-text("×")'
    );
    if (await surveyClose.first().isVisible().catch(() => false)) {
      await surveyClose.first().click({ force: true }).catch(() => {});
    }

    // 3. Any interfering modal currently shown (except timerModal and firstDownloadedModal)
    const activeModalClose = this.page.locator(
      'div.modal.show:not(#timerModal):not(#firstDownloadedModal) button:has-text("閉じる"), div.modal.show:not(#timerModal):not(#firstDownloadedModal) .close, dialog [aria-label*="Close"], [role="region"][aria-label="Close"], [aria-label*="Close"] img, .icon-close'
    );
    if (await activeModalClose.first().isVisible().catch(() => false)) {
      await activeModalClose.first().click({ force: true }).catch(() => {});
    }

    // 4. Fallback: Press Escape to close any open dialogs
    await this.page.keyboard.press('Escape').catch(() => {});
  }

  /**
   * Execute full download flow for Free User (first download scenario):
   * 1. Dismiss initial interference overlays if any.
   * 2. Click main download button to launch timer modal.
   * 3. Handle rewarded ad if triggered (including cross-origin safeframe close button).
   * 4. Select smallest size (Size S) in timer modal.
   * 5. Wait for countdown completion and trigger download.
   * @param size - 'S' | 'M' | 'L' (defaults to 'S')
   * @returns Playwright Download object
   */
  async downloadAsFreeUserFirstDownload(size: 'S' | 'M' | 'L' = 'S'): Promise<import('@playwright/test').Download> {
    return await test.step(`Download photo as Free User First Download (Size: ${size})`, async () => {
      await this.dismissInterferingModals();
      await this.freeDownloadButton.scrollIntoViewIfNeeded().catch(() => {});
      await this.dismissInterferingModals();

      // Click main download button to trigger timer / rewarded ad modal
      await this.clickElement(this.freeDownloadButton);

      // Handle Google Rewarded Ad / Interstitial overlay if present
      for (let attempt = 0; attempt < 5; attempt++) {
        const isTimerVisible = await this.timerModal.isVisible().catch(() => false);
        if (isTimerVisible) break;

        await this.dismissInterferingModals();

        // Try frame locator for close button
        const frameClose = this.page
          .frameLocator('iframe[id*="Rewarded_Ads"], iframe[id*="aswift"]')
          .locator('text=閉じる, [aria-label="閉じる"]')
          .first();

        if (await frameClose.isVisible({ timeout: 1500 }).catch(() => false)) {
          await frameClose.click().catch(() => {});
        } else {
          // Fallback: Click top-right coordinates (1535, 110) for Rewarded Ad and (1251, 308) for banner dialogs
          await this.page.mouse.click(1535, 110).catch(() => {});
          await this.page.mouse.click(1251, 308).catch(() => {});
        }

        // Also dismiss any survey/banner popup appearing concurrently
        await this.dismissInterferingModals();

        // If timer modal is still hidden and download button is interactive, click again
        const isNowVisible = await this.timerModal.isVisible().catch(() => false);
        if (!isNowVisible && (await this.freeDownloadButton.isVisible().catch(() => false))) {
          await this.clickElement(this.freeDownloadButton).catch(() => {});
        }
      }

      // Ensure timer modal is visible
      await this.timerModal.waitFor({ state: 'visible', timeout: 20_000 });

      // Select size if specified
      if (size === 'S') {
        const sRadio = this.page.locator('#timerModal input[value="s"], #timerModal input#s');
        if (await sRadio.isVisible().catch(() => false)) {
          await sRadio.check().catch(() => {});
        }
      }

      // Wait for countdown to finish and download button to become active
      const downloadBtn = this.timerModalDownloadButton;
      await downloadBtn.waitFor({ state: 'visible', timeout: 35_000 });

      // Wait for download event and click
      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 35_000 }),
        downloadBtn.click({ force: true }),
      ]);

      return download;
    });
  }

  /**
   * Wait for First Download Completed promotional offer modal and click it to navigate to Premium campaign page.
   */
  async clickFirstDownloadPremiumOffer(): Promise<void> {
    await test.step('Click First Download Premium half-price offer banner', async () => {
      // 1. Wait for First Download completed modal
      await this.page.waitForSelector('#firstDownloadedModal', { state: 'visible', timeout: 25_000 });

      // 2. Click the promotional coupon link/image and wait for navigation to premium campaign
      await Promise.all([
        this.page.waitForURL(/premium\/campaign/, { timeout: 30_000 }),
        this.firstDownloadCouponLink.click({ force: true }),
      ]);
      await this.waitForPageLoad();
    });
  }

  /**
   * Click Bookmark button to add photo to collection.
   */
  async clickBookmark(): Promise<void> {
    await test.step('Click Bookmark button', async () => {
      await this.dismissInterferingModals();
      await this.clickElement(this.bookmarkButton);
    });
  }

  /**
   * Click Like button.
   */
  async clickLike(): Promise<void> {
    await test.step('Click Like button', async () => {
      await this.dismissInterferingModals();
      await this.clickElement(this.likeButton);
    });
  }

  /**
   * Click Share button to toggle share popover.
   */
  async clickShare(): Promise<void> {
    await test.step('Click Share button to open popover', async () => {
      await this.dismissInterferingModals();
      await this.clickElement(this.shareButton);
    });
  }

  /**
   * Click Heart / Fan registration button.
   */
  async clickHeartFan(): Promise<void> {
    await test.step('Click Fan (Heart) registration button', async () => {
      await this.dismissInterferingModals();
      await this.clickElement(this.heartFanButton);
    });
  }

  /**
   * Ensure the share popover is visible, clicking the share button if needed.
   */
  async ensureSharePopoverVisible(): Promise<void> {
    const isVisible = await this.sharePopover.isVisible().catch(() => false);
    if (!isVisible) {
      await this.clickShare();
      await this.sharePopover.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  /**
   * Click Facebook share option and wait for the popup window to open.
   */
  async clickShareFacebook(): Promise<Page> {
    return await test.step('Click Facebook share option', async () => {
      await this.ensureSharePopoverVisible();
      const [popup] = await Promise.all([
        this.page.waitForEvent('popup', { timeout: 15_000 }),
        this.shareFacebookLink.first().click(),
      ]);
      return popup;
    });
  }

  /**
   * Click X (Twitter) share option and wait for the popup window to open.
   */
  async clickShareX(): Promise<Page> {
    return await test.step('Click X (Twitter) share option', async () => {
      await this.ensureSharePopoverVisible();
      const [popup] = await Promise.all([
        this.page.waitForEvent('popup', { timeout: 15_000 }),
        this.shareXLink.first().click(),
      ]);
      return popup;
    });
  }

  /**
   * Click Pinterest share option and wait for the popup window to open.
   */
  async clickSharePinterest(): Promise<Page> {
    return await test.step('Click Pinterest share option', async () => {
      await this.ensureSharePopoverVisible();
      const [popup] = await Promise.all([
        this.page.waitForEvent('popup', { timeout: 15_000 }),
        this.sharePinterestLink.first().click(),
      ]);
      return popup;
    });
  }

  /**
   * Click Copy Link option inside share popover.
   */
  async clickShareCopyUrl(): Promise<void> {
    await test.step('Click Copy URL option', async () => {
      await this.ensureSharePopoverVisible();
      await this.clickElement(this.shareCopyUrlButton.first());
    });
  }

  /**
   * Navigate directly to the user's bookmarks page.
   */
  async goToBookmarksPage(): Promise<void> {
    await test.step('Navigate to Bookmarks page', async () => {
      await this.navigate('/user/bookmarks/');
      await this.waitForPageLoad();
    });
  }

  /**
   * Navigate directly to the first collection folder in bookmarks.
   */
  async goToFirstCollectionFolder(): Promise<void> {
    await test.step('Navigate to first collection folder in bookmarks', async () => {
      await this.goToBookmarksPage();
      const collectionLink = this.page.locator('a[href*="/user/bookmarks/collection/"]').first();
      await collectionLink.waitFor({ state: 'attached', timeout: 15_000 });
      const href = await collectionLink.getAttribute('href');
      if (href) {
        await this.navigate(href);
        await this.waitForPageLoad();
      }
    });
  }

  /**
   * Delete photo from collection by clicking trash icon and accepting confirmation dialog.
   */
  async deletePhotoFromCollection(photoId: string): Promise<void> {
    await test.step(`Delete photo (ID: ${photoId}) from collection`, async () => {
      const item = this.page.locator(`.item:has(a[href*="${photoId}"])`).first();
      await item.scrollIntoViewIfNeeded();
      await item.hover();

      const trash = item.locator('.ac-mycollection-btn-trash');

      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });

      await trash.click();
      await item.waitFor({ state: 'detached', timeout: 15_000 }).catch(() => {});
      await this.waitForPageLoad();
    });
  }

  // Premium Bulk Download Methods
  /**
   * Click "まとめてダウンロード" button on photo detail to add photo of specified size to bulk download folder.
   * @param size - 'S' | 'M' | 'L' (defaults to 'S')
   */
  async addToBulkDownload(size: 'S' | 'M' | 'L' = 'S'): Promise<void> {
    await test.step(`Add photo to Bulk Download list (Size: ${size})`, async () => {
      const btn =
        size === 'S'
          ? this.premiumBulkDownloadAddButtonS
          : size === 'M'
          ? this.premiumBulkDownloadAddButtonM
          : this.premiumBulkDownloadAddButtonL;

      await this.dismissInterferingModals();
      await Promise.all([
        this.page
          .waitForResponse(
            res => res.url().includes('/image/download_select/') && res.status() === 200,
            { timeout: 15_000 }
          )
          .catch(() => null),
        this.clickElement(btn),
      ]);
    });
  }

  /**
   * Open the Bulk Download modal by clicking the folder icon on the floating sidebar.
   */
  async openBulkDownloadModal(): Promise<void> {
    await test.step('Open Bulk Download modal from floating sidebar', async () => {
      await this.dismissInterferingModals();
      await this.clickElement(this.toolbarBulkDownloadButton.first());
      await this.bulkDownloadModal.waitFor({ state: 'visible', timeout: 15_000 });
    });
  }

  /**
   * Close the Bulk Download modal.
   */
  async closeBulkDownloadModal(): Promise<void> {
    await test.step('Close Bulk Download modal', async () => {
      if (await this.bulkDownloadModal.isVisible().catch(() => false)) {
        await this.bulkDownloadModalCloseButton.click({ force: true }).catch(() => {});
        await this.page.keyboard.press('Escape').catch(() => {});
        await this.bulkDownloadModal.waitFor({ state: 'hidden', timeout: 10_000 }).catch(() => {});
      }
    });
  }

  /**
   * Remove the photo item from Bulk Download modal.
   * @param photoId - ID of photo to remove (defaults to Acworks default ID)
   */
  async removePhotoFromBulkModal(photoId: string = DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID): Promise<void> {
    await test.step(`Remove photo (ID: ${photoId}) from Bulk Download modal`, async () => {
      const removeBtn = this.page.locator(`#bulkDownloadModal .img-remove[attrid="${photoId}"]`).first();
      const targetBtn = (await removeBtn.count()) > 0
        ? removeBtn
        : this.bulkDownloadModalRemoveButton.first();

      await targetBtn.waitFor({ state: 'attached', timeout: 10_000 });
      await targetBtn.dispatchEvent('click');
      await targetBtn.waitFor({ state: 'detached', timeout: 10_000 }).catch(() => {});
    });
  }

  /**
   * Trigger bulk download from modal and wait for file download event.
   * @returns Playwright Download object
   */
  async downloadBulkAsPremium(): Promise<import('@playwright/test').Download> {
    return await test.step('Execute bulk download and wait for download event', async () => {
      await this.bulkDownloadModalSubmitButton.waitFor({ state: 'visible', timeout: 15_000 });
      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 60_000 }),
        this.clickElement(this.bulkDownloadModalSubmitButton),
      ]);
      return download;
    });
  }

  /**
   * Clean up all items from Bulk Download folder if any exist.
   */
  async clearBulkDownloadIfAny(): Promise<void> {
    await test.step('Clean up bulk download list if not empty', async () => {
      const isModalVisible = await this.bulkDownloadModal.isVisible().catch(() => false);
      if (!isModalVisible) {
        const hasToolbar = await this.toolbarBulkDownloadButton.first().isVisible().catch(() => false);
        if (hasToolbar) {
          await this.toolbarBulkDownloadButton.first().click().catch(() => {});
          await this.bulkDownloadModal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        }
      }

      while ((await this.bulkDownloadModalItems.count()) > 0) {
        const item = this.bulkDownloadModalItems.first();
        const removeBtn = item.locator('.img-remove');
        if (await removeBtn.count()) {
          await removeBtn.dispatchEvent('click').catch(() => {});
          await item.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        } else {
          break;
        }
      }

      await this.closeBulkDownloadModal().catch(() => {});
    });
  }
}


