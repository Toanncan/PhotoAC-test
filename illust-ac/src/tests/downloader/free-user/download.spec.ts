import { test, expect } from '../../../fixtures/base.fixture';
import { captureEvidenceWithUrl, enableAdBlocker } from '../../../utils/helpers';
import { IllustDetailPage } from '../../../pages/downloader/illust-detail.page';

/**
 * Test Suite: Download & Material Interactions — Free User on AC-Illust
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 640040).
 */
test.describe('Download & Detail Interactions — Free User', () => {
  // Session Free User được inject tự động từ project cấu hình (chromium-free-user / firefox-free-user)

  test.beforeEach(async ({ page, illustDetailPage }) => {
    await enableAdBlocker(page);
    await illustDetailPage.goToDetailPage(IllustDetailPage.ACWORKS_DEFAULT_ILLUST_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(illustDetailPage.creatorName).toBeVisible();
      await expect(illustDetailPage.creatorLink).toHaveAttribute('href', /profile\.php\?id=acworks/);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-001: Kiểm tra định dạng JPEG và nút tải ảnh
   */
  test('TC-DOWNLOAD-FREE-001: Kiểm tra định dạng JPEG và nút tải', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Xác minh định dạng JPEG hiển thị', async () => {
      await expect(illustDetailPage.formatRadioJpeg).toBeVisible();
    });

    await test.step('Xác minh nút tải「ダウンロード」hiển thị sẵn sàng tương tác', async () => {
      await expect(illustDetailPage.downloadButton).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Download-JPEG-Available');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-002: Kiểm tra định dạng PNG hiển thị giá mua lẻ cho tài khoản Free
   */
  test('TC-DOWNLOAD-FREE-002: Kiểm tra định dạng PNG', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Xác minh định dạng PNG hiển thị kèm thông tin mua lẻ (495円)', async () => {
      await expect(illustDetailPage.formatRadioPng).toBeVisible();
      await expect(page.locator('text=495円').first()).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Download-PNG-Price');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-003: Kiểm tra định dạng Vector AI hiển thị giá mua lẻ cho tài khoản Free
   */
  test('TC-DOWNLOAD-FREE-003: Kiểm tra định dạng Vector AI', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Xác minh định dạng AI hiển thị kèm thông tin mua lẻ (990円)', async () => {
      await expect(illustDetailPage.formatRadioAi).toBeVisible();
      await expect(page.locator('text=990円').first()).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Download-AI-Price');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-004: Kiểm tra thông báo giới hạn Premium Material
   */
  test('TC-DOWNLOAD-FREE-004: Kiểm tra thông báo giới hạn Premium Material', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Xác minh thông báo「こちらはプレミアム会員限定のプレミアム素材です」hiển thị', async () => {
      await expect(illustDetailPage.premiumMaterialNotice).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Premium-Material-Notice');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-005: Click nút Bookmark trên trang chi tiết tranh
   */
  test('TC-DOWNLOAD-FREE-005: Click nút Bookmark lưu tranh', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Click nút Bookmark trên trang chi tiết', async () => {
      await expect(illustDetailPage.bookmarkButton).toBeVisible();
      await illustDetailPage.clickBookmark();
    });

    await test.step('Xác minh nút Bookmark vẫn hiển thị sẵn sàng trên UI', async () => {
      await expect(illustDetailPage.bookmarkButton).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Bookmark-Clicked');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-006: Click Like tranh và verify bộ đếm like
   */
  test('TC-DOWNLOAD-FREE-006: Click Like tranh và verify bộ đếm like', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Click nút Like tranh', async () => {
      await expect(illustDetailPage.likeButton).toBeVisible();
      await illustDetailPage.clickLike();
    });

    await test.step('Xác minh bộ đếm like hiển thị giá trị', async () => {
      await expect(illustDetailPage.likeCount).toBeVisible();
      const countText = await illustDetailPage.likeCount.textContent();
      expect(Number(countText?.replace(/,/g, ''))).toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Free-Like-Counter-Updated');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-007: Hiển thị các nút chia sẻ mạng xã hội (Twitter, Facebook, Pinterest)
   */
  test('TC-DOWNLOAD-FREE-007: Hiển thị các liên kết mạng xã hội', async ({
    page,
  }, testInfo) => {
    await test.step('Xác minh các liên kết mạng xã hội (Twitter/X, Facebook, Pinterest) hiển thị trên trang', async () => {
      const twitterLink = page.locator('a[href*="twitter.com"], a[href*="x.com"]').first();
      const fbLink = page.locator('a[href*="facebook.com"]').first();
      const pinterestLink = page.locator('a[href*="pinterest.com"]').first();

      await expect(twitterLink).toBeAttached();
      await expect(fbLink).toBeAttached();
      await expect(pinterestLink).toBeAttached();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Social-Share-Links');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-008: Kiểm tra các tính năng thanh tác vụ nổi (Floating Toolbar)
   */
  test('TC-DOWNLOAD-FREE-008: Kiểm tra các tính năng thanh tác vụ nổi', async ({
    page,
  }, testInfo) => {
    await test.step('Xác minh các liên kết thao tác nổi (Tải hàng loạt, Lịch sử tải) hiển thị', async () => {
      const bulkDownloadLink = page.locator('a:has-text("まとめて ダウンロード"), a:has-text("まとめてダウンロード")').first();
      const historyLink = page.locator('a:has-text("ダウンロード 履歴"), a:has-text("ダウンロード履歴")').first();

      await expect(bulkDownloadLink).toBeAttached();
      await expect(historyLink).toBeAttached();
      await captureEvidenceWithUrl(page, testInfo, 'Free-Floating-Toolbar-Visible');
    });
  });

  /**
   * TC-DOWNLOAD-FREE-009: Tải tranh định dạng JPEG thành công
   */
  test('TC-DOWNLOAD-FREE-009: Tải tranh định dạng JPEG thành công', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    test.setTimeout(90_000);

    await test.step('Chọn định dạng JPEG và thực hiện tải tranh', async () => {
      await expect(illustDetailPage.formatRadioJpeg).toBeVisible();
      await expect(illustDetailPage.downloadButton).toBeVisible();
      const download = await illustDetailPage.downloadAsFreeUser('JPEG');

      // Xác minh tên file tải về và định dạng tranh hợp lệ
      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
      expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

      // Xác minh tải về thành công, không gặp lỗi hệ thống
      const failure = await download.failure();
      expect(failure).toBeNull();

      await captureEvidenceWithUrl(page, testInfo, 'Free-Download-JPEG-Success');
    });
  });
});
