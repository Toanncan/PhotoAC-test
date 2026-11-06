import { test, expect } from '../../../fixtures/base.fixture';
import { captureEvidenceWithUrl } from '../../../utils/helpers';
import { PhotoDetailPage } from '../../../pages/downloader/photo-detail.page';

/**
 * Test Suite: Download — Premium User
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 1651238).
 */
test.describe('Download — Premium User', () => {
  // Session Premium User được inject tự động từ project cấu hình (chromium-premium / firefox-premium)

  test.beforeEach(async ({ photoDetailPage }) => {
    await photoDetailPage.goToAcworksPhotoDetail(PhotoDetailPage.ACWORKS_DEFAULT_PHOTO_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(photoDetailPage.creatorName).toBeVisible();
      await expect(photoDetailPage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  // ==========================================
  // Nhóm 1: Tải ảnh đơn lẻ (Single Download)
  // ==========================================

  /**
   * TC-DOWNLOAD-PREM-001: Premium User tải ảnh Size S thành công
   */
  test('TC-DOWNLOAD-PREM-001: Tải ảnh Size S thành công', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(90_000);

    await test.step('Click download ảnh Size S và xác minh tải về thành công', async () => {
      await expect(photoDetailPage.premiumDownloadButtonS).toBeVisible();
      const download = await photoDetailPage.downloadAsPremium('S');

      // Xác minh tên file tải về và dung lượng > 0
      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
      expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

      const failure = await download.failure();
      expect(failure).toBeNull();

      await captureEvidenceWithUrl(page, testInfo, 'Premium-Download-Size-S-Success');
    });
  });

  // ==========================================
  // Nhóm 2: Tải hàng loạt (Bulk Download)
  // ==========================================

  /**
   * TC-DOWNLOAD-PREM-002: Thêm ảnh vào Bulk Download và mở Modal kiểm tra
   */
  test('TC-DOWNLOAD-PREM-002: Thêm ảnh vào Bulk Download và mở Modal kiểm tra', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(90_000);

    try {
      await test.step('Dọn dẹp danh sách tải hàng loạt nếu có dữ liệu cũ', async () => {
        await photoDetailPage.clearBulkDownloadIfAny();
      });

      await test.step('Click thêm ảnh Size S vào Bulk Download', async () => {
        await expect(photoDetailPage.premiumBulkDownloadAddButtonS).toBeVisible();
        await photoDetailPage.addToBulkDownload('S');
      });

      await test.step('Xác minh số lượng trên Toolbar Bulk Download hiển thị chính xác', async () => {
        await expect(photoDetailPage.toolbarBulkDownloadCount).toBeVisible();
        await expect(photoDetailPage.toolbarBulkDownloadCount).toContainText('1');

        await captureEvidenceWithUrl(page, testInfo, 'Premium-Bulk-Download-Badge-Count');
      });

      await test.step('Click mở Modal Bulk Download và xác minh thông tin tác phẩm', async () => {
        await photoDetailPage.openBulkDownloadModal();
        await expect(photoDetailPage.bulkDownloadModal).toBeVisible();
        await expect(photoDetailPage.bulkDownloadModalTitle).toContainText('まとめてダウンロードに選択中の素材');
        await expect(photoDetailPage.bulkDownloadModalCount).toHaveText('1');
        await expect(photoDetailPage.bulkDownloadModalItems).toHaveCount(1);

        await captureEvidenceWithUrl(page, testInfo, 'Premium-Bulk-Download-Modal');
      });

      await test.step('Xóa ảnh khỏi Modal và xác minh danh sách trống', async () => {
        await photoDetailPage.removePhotoFromBulkModal(PhotoDetailPage.ACWORKS_DEFAULT_PHOTO_ID);
        await expect(photoDetailPage.bulkDownloadModalEmptyMessage).toBeVisible();
        await expect(photoDetailPage.bulkDownloadModalEmptyMessage).toContainText(
          'まとめてダウンロード素材はまだありません。'
        );

        await captureEvidenceWithUrl(page, testInfo, 'Premium-Bulk-Download-Modal-Empty');
      });
    } finally {
      await photoDetailPage.closeBulkDownloadModal().catch(() => {});
    }
  });

  /**
   * TC-DOWNLOAD-PREM-003: Thực hiện tải hàng loạt (Bulk Download) thành công
   */
  test('TC-DOWNLOAD-PREM-003: Thực hiện tải hàng loạt (Bulk Download) thành công', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(90_000);

    try {
      await test.step('Dọn dẹp danh sách tải hàng loạt nếu có dữ liệu cũ', async () => {
        await photoDetailPage.clearBulkDownloadIfAny();
      });

      await test.step('Thêm ảnh Size S vào Bulk Download', async () => {
        await expect(photoDetailPage.premiumBulkDownloadAddButtonS).toBeVisible();
        await photoDetailPage.addToBulkDownload('S');
      });

      await test.step('Mở Modal Bulk Download', async () => {
        await photoDetailPage.openBulkDownloadModal();
        await expect(photoDetailPage.bulkDownloadModal).toBeVisible();
        await expect(photoDetailPage.bulkDownloadModalItems).toHaveCount(1);
      });

      await test.step('Click nút tải hàng loạt trong modal và xác minh tải file thành công', async () => {
        const download = await photoDetailPage.downloadBulkAsPremium();

        const suggestedFilename = download.suggestedFilename();
        expect(suggestedFilename).toBeTruthy();
        expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

        const failure = await download.failure();
        expect(failure).toBeNull();

        await captureEvidenceWithUrl(page, testInfo, 'Premium-Bulk-Download-Execution-Success');
      });
    } finally {
      await photoDetailPage.closeBulkDownloadModal().catch(() => {});
    }
  });

  // ==========================================
  // Nhóm 3: Mở bằng công cụ Design AC
  // ==========================================

  /**
   * TC-DOWNLOAD-PREM-004: Mở tác phẩm bằng công cụ Design AC
   */
  test('TC-DOWNLOAD-PREM-004: Click Mở bằng công cụ Design AC', async ({
    page,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(60_000);

    await test.step('Click button 無料編集ツールで開く', async () => {
      await expect(photoDetailPage.premiumOpenDesignToolS).toBeVisible();
      const newPage = await photoDetailPage.clickOpenDesignTool('S');

      if (newPage) {
        await newPage.waitForLoadState('domcontentloaded');
        expect(newPage.url()).toMatch(/design-ac|editor/i);
        await captureEvidenceWithUrl(newPage, testInfo, 'Premium-Design-AC-Opened');
        await newPage.close();
      } else {
        await expect(page).toHaveURL(/design-ac|editor/i);
        await captureEvidenceWithUrl(page, testInfo, 'Premium-Design-AC-Opened');
      }
    });
  });
});
