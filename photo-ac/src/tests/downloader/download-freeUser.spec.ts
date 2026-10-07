import { test, expect } from '../../fixtures/base.fixture';
import { enableAdBlocker } from '../../utils/helpers';
import { DownloadImagePage } from '../../pages/downloader/download-image.page';

/**
 * ============================================================================
 * TEST SUITE: DOWNLOAD — FREE USER
 * ============================================================================
 * Quy tắc:
 * 1. 100% tương tác UI thật (True User Simulation).
 * 2. Bắt buộc kiểm thử trên hình ảnh của creator Acworks (ID: 1651238).
 * 3. Không dùng hard sleep, chỉ dùng Web-First Assertions.
 */
test.describe('Download — Free User', () => {
  // Session Free User được inject tự động từ project cấu hình (chromium-free-user / firefox-free-user)

  test.beforeEach(async ({ page, downloadImagePage }) => {
    // Kích hoạt Ad Blocker chống overlay che khuất
    await enableAdBlocker(page);

    // Mở trang chi tiết tác phẩm của creator Acworks
    await downloadImagePage.goToAcworksPhotoDetail(DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID);

    // Xác minh đây là tác phẩm của creator Acworks
    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(downloadImagePage.creatorName).toBeVisible();
      await expect(downloadImagePage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-002: Free User click icon folder (Bulk download)
   * Expect: Hiển thị tooltip thông báo tính năng chỉ dành cho Premium
   * @tags @free-user @download
   */
  test('TC-DOWNLOAD-FREE-002: Free User click Bulk Download hiển thị tooltip hạn chế Premium @free-user @download', async ({
    downloadImagePage,
  }) => {
    await test.step('Click icon folder まとめてダウンロード', async () => {
      await expect(downloadImagePage.freeBulkDownloadButton).toBeVisible();
      await downloadImagePage.clickFreeBulkDownload();
    });

    await test.step('Xác minh tooltip hiển thị thông báo giới hạn Premium', async () => {
      await expect(downloadImagePage.activeTooltip).toBeVisible();
      await expect(downloadImagePage.activeTooltip).toContainText(/プレミアム/);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-004: Free User click button 今すぐ購入 (Extra license)
   * Expect: Hiển thị popover thông báo mua bản quyền thương mại chỉ dành cho Premium
   * @tags @free-user @download
   */
  test('TC-DOWNLOAD-FREE-004: Free User click Buy Extra License hiển thị thông báo giới hạn Premium @free-user @download', async ({
    downloadImagePage,
  }) => {
    await test.step('Click button 今すぐ購入', async () => {
      await expect(downloadImagePage.freeBuyExtraLicenseButton).toBeVisible();
      await downloadImagePage.clickFreeBuyExtraLicense();
    });

    await test.step('Xác minh popover thông báo mua bản quyền thương mại chỉ dành cho Premium', async () => {
      await expect(downloadImagePage.freeExtraLicensePopover).toBeVisible();
      await expect(downloadImagePage.freeExtraLicensePopover).toContainText(
        '商品化ライセンスの購入は、プレミアム会員様限定です'
      );
    });
  });

  /**
   * TC-DOWNLOAD-FREE-005: Free User click icon Cart (Bulk Extra license)
   * Expect: Hiển thị tooltip thông báo tính năng chỉ dành cho Premium
   * @tags @free-user @download
   */
  test('TC-DOWNLOAD-FREE-005: Free User click Cart icon hiển thị tooltip giới hạn Premium @free-user @download', async ({
    downloadImagePage,
  }) => {
    await test.step('Click icon Cart (ライセンスまとめて購入)', async () => {
      await expect(downloadImagePage.freeCartButton).toBeVisible();
      await downloadImagePage.clickFreeCart();
    });

    await test.step('Xác minh tooltip hiển thị thông báo giới hạn Premium', async () => {
      await expect(downloadImagePage.activeTooltip).toBeVisible();
      await expect(downloadImagePage.activeTooltip).toContainText(/プレミアム/);
    });
  });
});
