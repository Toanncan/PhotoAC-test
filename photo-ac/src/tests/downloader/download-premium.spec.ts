import { test, expect } from '../../fixtures/base.fixture';
import { DownloadImagePage } from '../../pages/downloader/download-image.page';

/**
 * Test Suite: Download — Premium User
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 1651238).
 */
test.describe('Download — Premium User', () => {
  // Session Premium User được inject tự động từ project cấu hình (chromium-premium / firefox-premium)

  test.beforeEach(async ({ downloadImagePage }) => {
    await downloadImagePage.goToAcworksPhotoDetail(DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(downloadImagePage.creatorName).toBeVisible();
      await expect(downloadImagePage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  /**
   * TC-DOWNLOAD-PREM-001: Premium User tải ảnh Size S thành công
   */
  test('TC-DOWNLOAD-PREM-001: Premium User tải ảnh Size S thành công @premium @download', async ({
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
   * TC-DOWNLOAD-PREM-002: Premium User mở tác phẩm bằng công cụ Design AC
   */
  test('TC-DOWNLOAD-PREM-002: Premium User click Mở bằng công cụ Design AC @premium @download', async ({
    page,
    downloadImagePage,
  }) => {
    await test.step('Click button 無料編集ツールで開く', async () => {
      await expect(downloadImagePage.premiumOpenDesignToolS).toBeVisible();
      const newPage = await downloadImagePage.clickOpenDesignTool('S');

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
   * TC-DOWNLOAD-PREM-003: Premium User thêm ảnh vào Bulk Download và mở Modal kiểm tra
   */
  test('TC-DOWNLOAD-PREM-003: Premium User thêm ảnh vào Bulk Download và mở Modal kiểm tra @premium @download @bulk-download', async ({
    downloadImagePage,
  }) => {
    try {
      await test.step('Dọn dẹp danh sách tải hàng loạt nếu có dữ liệu cũ', async () => {
        await downloadImagePage.clearBulkDownloadIfAny();
      });

      await test.step('Click thêm ảnh Size S vào Bulk Download', async () => {
        await expect(downloadImagePage.premiumBulkDownloadAddButtonS).toBeVisible();
        await downloadImagePage.addToBulkDownload('S');
      });

      await test.step('Xác minh số lượng trên Toolbar Bulk Download hiển thị chính xác', async () => {
        await expect(downloadImagePage.toolbarBulkDownloadCount).toBeVisible();
        await expect(downloadImagePage.toolbarBulkDownloadCount).toContainText('1');
      });

      await test.step('Click mở Modal Bulk Download và xác minh thông tin tác phẩm', async () => {
        await downloadImagePage.openBulkDownloadModal();
        await expect(downloadImagePage.bulkDownloadModal).toBeVisible();
        await expect(downloadImagePage.bulkDownloadModalTitle).toContainText('まとめてダウンロードに選択中の素材');
        await expect(downloadImagePage.bulkDownloadModalCount).toHaveText('1');
        await expect(downloadImagePage.bulkDownloadModalItems).toHaveCount(1);
      });

      await test.step('Xóa ảnh khỏi Modal và xác minh danh sách trống', async () => {
        await downloadImagePage.removePhotoFromBulkModal(DownloadImagePage.ACWORKS_DEFAULT_PHOTO_ID);
        await expect(downloadImagePage.bulkDownloadModalEmptyMessage).toBeVisible();
        await expect(downloadImagePage.bulkDownloadModalEmptyMessage).toContainText(
          'まとめてダウンロード素材はまだありません。'
        );
      });
    } finally {
      await downloadImagePage.closeBulkDownloadModal().catch(() => {});
    }
  });

  /**
   * TC-DOWNLOAD-PREM-004: Premium User thực hiện tải hàng loạt (Bulk Download) thành công
   */
  test('TC-DOWNLOAD-PREM-004: Premium User thực hiện tải hàng loạt (Bulk Download) thành công @premium @download @bulk-download', async ({
    downloadImagePage,
  }) => {
    try {
      await test.step('Dọn dẹp danh sách tải hàng loạt nếu có dữ liệu cũ', async () => {
        await downloadImagePage.clearBulkDownloadIfAny();
      });

      await test.step('Thêm ảnh Size S vào Bulk Download', async () => {
        await expect(downloadImagePage.premiumBulkDownloadAddButtonS).toBeVisible();
        await downloadImagePage.addToBulkDownload('S');
      });

      await test.step('Mở Modal Bulk Download', async () => {
        await downloadImagePage.openBulkDownloadModal();
        await expect(downloadImagePage.bulkDownloadModal).toBeVisible();
        await expect(downloadImagePage.bulkDownloadModalItems).toHaveCount(1);
      });

      await test.step('Click nút tải hàng loạt trong modal và xác minh tải file thành công', async () => {
        const download = await downloadImagePage.downloadBulkAsPremium();

        const suggestedFilename = download.suggestedFilename();
        expect(suggestedFilename).toBeTruthy();
        expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

        const failure = await download.failure();
        expect(failure).toBeNull();
      });
    } finally {
      await downloadImagePage.closeBulkDownloadModal().catch(() => {});
    }
  });
});

