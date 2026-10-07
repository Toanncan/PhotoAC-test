import { test, expect } from '../../fixtures/base.fixture';
import { enableAdBlocker } from '../../utils/helpers';
import { DownloadImagePage } from '../../pages/downloader/download-image.page';

/**
 * ============================================================================
 * TEST SUITE: DOWNLOAD — GUEST USER (NO LOGIN)
 * ============================================================================
 * Quy tắc:
 * 1. 100% tương tác UI thật (True User Simulation).
 * 2. Bắt buộc kiểm thử trên hình ảnh của creator Acworks (ID: 1651238).
 * 3. Không dùng hard sleep, chỉ dùng Web-First Assertions.
 */
test.describe('Download — Guest User (No login)', () => {
  // Session rỗng cho Guest User
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, downloadImagePage }) => {
    // Kích hoạt Ad Blocker chống overlay che khuất
    await enableAdBlocker(page);

    // Mở trang chi tiết ảnh Acworks (ID: 1651238)
    await downloadImagePage.goToAcworksPhotoDetail(DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID);

    // Xác minh đây là ảnh chính thức của creator Acworks
    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(downloadImagePage.creatorName).toBeVisible();
      await expect(downloadImagePage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-047: Guest user click button Download
   * Expect: Chuyển hướng hoặc yêu cầu đăng nhập
   * @tags @guest @download
   */
  test('TC-DOWNLOAD-GUEST-047: Guest click Download yêu cầu đăng nhập @guest @download', async ({
    page,
    downloadImagePage,
  }) => {
    await test.step('Chọn kích thước ảnh Size S', async () => {
      await downloadImagePage.selectSize('S');
    });

    await test.step('Click button Download và xác minh yêu cầu đăng nhập', async () => {
      // Button Download của Guest có link tới trang đăng ký / đăng nhập SSO
      await expect(downloadImagePage.guestDownloadButton).toBeVisible();
      const href = await downloadImagePage.guestDownloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await downloadImagePage.clickGuestDownload();
      // Xác nhận chuyển hướng tới trang SSO Auth hoặc hiển thị modal login
      await expect(page).toHaveURL(/login|signup/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-048: Guest user click button まとめてダウンロード (Bulk download)
   * Expect: Yêu cầu đăng nhập
   * @tags @guest @download
   */
  test('TC-DOWNLOAD-GUEST-048: Guest click Bulk Download yêu cầu đăng nhập @guest @download', async ({
    page,
    downloadImagePage,
  }) => {
    await test.step('Click button まとめてダウンロード và xác minh yêu cầu đăng nhập', async () => {
      await expect(downloadImagePage.guestBulkDownloadButton).toBeVisible();
      const href = await downloadImagePage.guestBulkDownloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await downloadImagePage.clickGuestBulkDownload();
      await expect(page).toHaveURL(/login|signup/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-004: Guest user click button 今すぐ購入 (Extra license)
   * Expect: Hiển thị popover "先にログインをお願いします。初めての方は無料会員登録"
   * @tags @guest @download
   */
  test('TC-DOWNLOAD-GUEST-004: Guest click Buy Extra License hiển thị popover yêu cầu login @guest @download', async ({
    downloadImagePage,
  }) => {
    await test.step('Click button 今すぐ購入 (Extra license)', async () => {
      await expect(downloadImagePage.guestBuyExtraLicenseButton).toBeVisible();
      await downloadImagePage.clickGuestBuyExtraLicense();
    });

    await test.step('Xác minh popover yêu cầu đăng nhập hiển thị chính xác', async () => {
      await expect(downloadImagePage.guestPopover).toBeVisible();
      await expect(downloadImagePage.guestPopover).toContainText('先にログインをお願いします');
      await expect(downloadImagePage.guestPopover).toContainText('無料会員登録');
    });
  });
});
