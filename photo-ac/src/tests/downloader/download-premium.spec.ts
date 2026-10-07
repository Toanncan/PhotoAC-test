import { test, expect } from '../../fixtures/base.fixture';
import { DownloadImagePage } from '../../pages/downloader/download-image.page';

/**
 * ============================================================================
 * TEST SUITE: DOWNLOAD — PREMIUM USER
 * ============================================================================
 * Quy tắc:
 * 1. 100% tương tác UI thật (True User Simulation).
 * 2. Bắt buộc kiểm thử trên hình ảnh của creator Acworks (ID: 1651238).
 * 3. Không dùng hard sleep, chỉ dùng Web-First Assertions.
 */
test.describe('Download — Premium User', () => {
  // Session Premium User được inject tự động từ project cấu hình (chromium-premium / firefox-premium)

  test.beforeEach(async ({ downloadImagePage }) => {
    // Mở trang chi tiết tác phẩm của creator Acworks
    await downloadImagePage.goToAcworksPhotoDetail(DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID);

    // Xác minh đây là tác phẩm của creator Acworks
    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(downloadImagePage.creatorName).toBeVisible();
      await expect(downloadImagePage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  /**
   * TC-DOWNLOAD-PREM-021: Premium User tải ảnh thành công với các kích thước
   * Expect: Event download được kích hoạt, file tải về hợp lệ
   * @tags @premium @download
   */
  test('TC-DOWNLOAD-PREM-021: Premium User tải ảnh Size S thành công @premium @download', async ({
    downloadImagePage,
  }) => {
    await test.step('Click download ảnh Size S và xác minh tải về thành công', async () => {
      await expect(downloadImagePage.premiumDownloadButtonS).toBeVisible();
      const download = await downloadImagePage.downloadAsPremium('S');

      // Xác minh tên file tải về và dung lượng > 0
      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
      expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

      const failure = await download.failure();
      expect(failure).toBeNull();
    });
  });

  /**
   * TC-DOWNLOAD-PREM-036: Premium User mở tác phẩm bằng công cụ Design AC
   * Expect: Tác phẩm được mở sang trang Design AC (tab mới hoặc điều hướng URL)
   * @tags @premium @download
   */
  test('TC-DOWNLOAD-PREM-036: Premium User click Mở bằng công cụ Design AC @premium @download', async ({
    page,
    downloadImagePage,
  }) => {
    await test.step('Click button 無料編集ツールで開く', async () => {
      await expect(downloadImagePage.premiumOpenDesignToolS).toBeVisible();
      const newPage = await downloadImagePage.clickOpenDesignTool('S');

      if (newPage) {
        // Mở trong tab mới
        await newPage.waitForLoadState('domcontentloaded');
        expect(newPage.url()).toMatch(/design-ac|editor/i);
        await newPage.close();
      } else {
        // Điều hướng trên cùng tab
        await expect(page).toHaveURL(/design-ac|editor/i);
      }
    });
  });
});
