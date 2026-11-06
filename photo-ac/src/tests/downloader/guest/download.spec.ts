import { test, expect } from '../../../fixtures/base.fixture';
import { captureEvidenceWithUrl, enableAdBlocker } from '../../../utils/helpers';
import { PhotoDetailPage } from '../../../pages/downloader/photo-detail.page';

/**
 * Test Suite: Download — Guest User (No login)
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
  test('TC-DOWNLOAD-GUEST-001: Click Download hiển thị yêu cầu đăng nhập', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(60_000);

    await test.step('Chọn kích thước ảnh Size S', async () => {
      await photoDetailPage.selectSize('S');
    });

    await test.step('Click button Download và xác minh yêu cầu đăng nhập', async () => {
      await expect(photoDetailPage.guestDownloadButton).toBeVisible();
      const href = await photoDetailPage.guestDownloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await photoDetailPage.clickGuestDownload();
      await expect(page).toHaveURL(/login|signup/);

      await captureEvidenceWithUrl(page, testInfo, 'Guest-Download-Login-Redirect');
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-002: Guest click button まとめてダウンロード (Bulk download) -> Yêu cầu đăng nhập
   */
  test('TC-DOWNLOAD-GUEST-002: Click button まとめてダウンロード hiển thị yêu cầu đăng nhập', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(60_000);

    await test.step('Click button まとめてダウンロード và xác minh yêu cầu đăng nhập', async () => {
      await expect(photoDetailPage.guestBulkDownloadButton).toBeVisible();
      const href = await photoDetailPage.guestBulkDownloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await photoDetailPage.clickGuestBulkDownload();
      await expect(page).toHaveURL(/login|signup/);

      await captureEvidenceWithUrl(page, testInfo, 'Guest-Bulk-Download-Login-Redirect');
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-003: Guest click button 今すぐ購入 (Extra license) -> Hiển thị popover yêu cầu đăng nhập
   */
  test('TC-DOWNLOAD-GUEST-003: Click button 今すぐ購入 hiển thị popover yêu cầu đăng nhập', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(60_000);

    await test.step('Click button 今すぐ購入 (Extra license)', async () => {
      await expect(photoDetailPage.guestBuyExtraLicenseButton).toBeVisible();
      await photoDetailPage.clickGuestBuyExtraLicense();
    });

    await test.step('Xác minh popover yêu cầu đăng nhập hiển thị chính xác', async () => {
      await expect(photoDetailPage.guestPopover).toBeVisible();
      await expect(photoDetailPage.guestPopover).toContainText('先にログインをお願いします');
      await expect(photoDetailPage.guestPopover).toContainText('無料会員登録');

      await captureEvidenceWithUrl(page, testInfo, 'Guest-Extra-License-Login-Popover');
    });
  });
});
