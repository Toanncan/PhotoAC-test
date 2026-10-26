import { test, expect } from '../../../fixtures/base.fixture';
import { enableAdBlocker } from '../../../utils/helpers';
import { PhotoDetailPage } from '../../../pages/downloader/photo-detail.page';

/**
 * Test Suite: Download — Guest User (No login)
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 1651238).
 */
test.describe('Download — Guest User (No login)', () => {
  // Session rỗng cho Guest User
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, photoDetailPage }) => {
    await enableAdBlocker(page);
    await photoDetailPage.goToAcworksPhotoDetail(PhotoDetailPage.ACWORKS_DEFAULT_PHOTO_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(photoDetailPage.creatorName).toBeVisible();
      await expect(photoDetailPage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-001: Guest click button Download -> Yêu cầu đăng nhập
   */
  test('TC-DOWNLOAD-GUEST-001: Guest click Download yêu cầu đăng nhập @guest @download', async ({
    page,
    photoDetailPage,
  }) => {
    await test.step('Chọn kích thước ảnh Size S', async () => {
      await photoDetailPage.selectSize('S');
    });

    await test.step('Click button Download và xác minh yêu cầu đăng nhập', async () => {
      await expect(photoDetailPage.guestDownloadButton).toBeVisible();
      const href = await photoDetailPage.guestDownloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await photoDetailPage.clickGuestDownload();
      await expect(page).toHaveURL(/login|signup/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-002: Guest click button まとめてダウンロード (Bulk download) -> Yêu cầu đăng nhập
   */
  test('TC-DOWNLOAD-GUEST-002: Guest click Bulk Download yêu cầu đăng nhập @guest @download', async ({
    page,
    photoDetailPage,
  }) => {
    await test.step('Click button まとめてダウンロード và xác minh yêu cầu đăng nhập', async () => {
      await expect(photoDetailPage.guestBulkDownloadButton).toBeVisible();
      const href = await photoDetailPage.guestBulkDownloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await photoDetailPage.clickGuestBulkDownload();
      await expect(page).toHaveURL(/login|signup/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-003: Guest click button 今すぐ購入 (Extra license) -> Hiển thị popover yêu cầu đăng nhập
   */
  test('TC-DOWNLOAD-GUEST-003: Guest click Buy Extra License hiển thị popover yêu cầu login @guest @download', async ({
    photoDetailPage,
  }) => {
    await test.step('Click button 今すぐ購入 (Extra license)', async () => {
      await expect(photoDetailPage.guestBuyExtraLicenseButton).toBeVisible();
      await photoDetailPage.clickGuestBuyExtraLicense();
    });

    await test.step('Xác minh popover yêu cầu đăng nhập hiển thị chính xác', async () => {
      await expect(photoDetailPage.guestPopover).toBeVisible();
      await expect(photoDetailPage.guestPopover).toContainText('先にログインをお願いします');
      await expect(photoDetailPage.guestPopover).toContainText('無料会員登録');
    });
  });
});
