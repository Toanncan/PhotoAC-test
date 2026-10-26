import { test, expect } from '../../../fixtures/base.fixture';
import { IllustDetailPage } from '../../../pages/downloader/illust-detail.page';

/**
 * Test Suite: Download & Detail Interactions — Premium User on AC-Illust
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 640040).
 */
test.describe('Download & Detail Interactions — Premium User @premium @download', () => {
  // Session Premium User được inject tự động từ project cấu hình (chromium-premium / firefox-premium)

  test.beforeEach(async ({ illustDetailPage }) => {
    await illustDetailPage.goToDetailPage(IllustDetailPage.ACWORKS_DEFAULT_ILLUST_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(illustDetailPage.creatorName).toBeVisible();
      await expect(illustDetailPage.creatorLink).toHaveAttribute('href', /profile\.php\?id=acworks/);
    });
  });

  /**
   * TC-DOWNLOAD-PREM-001: Premium User chọn định dạng JPEG và tải ảnh thành công
   */
  test('TC-DOWNLOAD-PREM-001: Premium User tải tranh định dạng JPEG thành công @premium @download', async ({
    illustDetailPage,
  }) => {
    await test.step('Chọn định dạng JPEG và xác minh nút tải trực tiếp sẵn sàng', async () => {
      await illustDetailPage.selectFormat('JPEG');
      await expect(illustDetailPage.premiumDownloadLinkJpeg).toBeVisible();
      await expect(illustDetailPage.premiumDownloadLinkJpeg).toHaveAttribute('href', /main\/dl\.php\?.*qu_t=jpg/);
    });

    await test.step('Click tải tranh JPEG và xác minh file tải về thành công', async () => {
      const download = await illustDetailPage.downloadAsPremium('JPEG');

      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
      expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

      const failure = await download.failure();
      expect(failure).toBeNull();
    });
  });

  /**
   * TC-DOWNLOAD-PREM-002: Premium User chọn định dạng Vector AI và tải file thành công
   */
  test('TC-DOWNLOAD-PREM-002: Premium User tải định dạng Vector AI thành công @premium @download', async ({
    illustDetailPage,
  }) => {
    await test.step('Chọn định dạng Vector AI và xác minh nút tải trực tiếp sẵn sàng', async () => {
      await illustDetailPage.selectFormat('AI');
      await expect(illustDetailPage.premiumDownloadLinkAi).toBeVisible();
      await expect(illustDetailPage.premiumDownloadLinkAi).toHaveAttribute('href', /main\/dl\.php\?.*qu_t=ai/);
    });

    await test.step('Click tải file Vector AI và xác minh file tải về thành công', async () => {
      const download = await illustDetailPage.downloadAsPremium('AI');

      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
      expect(suggestedFilename.toLowerCase()).toMatch(/\.(ai|eps|zip)$/);

      const failure = await download.failure();
      expect(failure).toBeNull();
    });
  });

  /**
   * TC-DOWNLOAD-PREM-003: Premium User mở tác phẩm bằng công cụ Design AC Editor
   */
  test('TC-DOWNLOAD-PREM-003: Premium User mở công cụ chỉnh sửa trực tuyến Design AC @premium @editor', async ({
    page,
    illustDetailPage,
  }) => {
    await test.step('Click mở công cụ chỉnh sửa Design AC và xác minh chuyển hướng/mở tab thành công', async () => {
      await expect(illustDetailPage.openDesignToolLink).toBeVisible();
      await expect(illustDetailPage.openDesignToolLink).toHaveAttribute('href', /editor=true/);

      const newPage = await illustDetailPage.clickOpenDesignTool();
      if (newPage) {
        await newPage.waitForLoadState('domcontentloaded');
        expect(newPage.url()).toMatch(/design-ac|editor/i);
        await newPage.close();
      } else {
        await expect(page).toHaveURL(/design-ac|editor/i);
      }
    });
  });

  /**
   * TC-DOWNLOAD-PREM-004: Premium User kiểm tra các tính năng thanh tác vụ nổi và chia sẻ SNS
   */
  test('TC-DOWNLOAD-PREM-004: Premium User kiểm tra thanh tác vụ nổi và liên kết chia sẻ SNS @premium @social', async ({
    illustDetailPage,
  }) => {
    await test.step('Xác minh các liên kết trên thanh tác vụ nổi (まとめて ダウンロード & ダウンロード 履歴)', async () => {
      await expect(illustDetailPage.floatingBulkDownload).toBeAttached();
      await expect(illustDetailPage.floatingDownloadHistory).toBeAttached();
    });

    await test.step('Xác minh các liên kết mạng xã hội (Facebook, Twitter/X, Pinterest) hiển thị trên trang', async () => {
      await expect(illustDetailPage.shareFacebookButton).toBeAttached();
      await expect(illustDetailPage.shareTwitterButton).toBeAttached();
      await expect(illustDetailPage.sharePinterestButton).toBeAttached();
    });
  });
});
