import { test, expect } from '../../../fixtures/base.fixture';
import { IllustDetailPage } from '../../../pages/downloader/illust-detail.page';

/**
 * Test Suite: Download & Material Interactions — Free User on AC-Illust
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 640040).
 */
test.describe('Download & Detail Interactions — Free User @free-user @download', () => {
  // Session Free User được inject tự động từ project cấu hình (chromium-free-user / firefox-free-user)

  test.beforeEach(async ({ illustDetailPage }) => {
    await illustDetailPage.goToDetailPage(IllustDetailPage.ACWORKS_DEFAULT_ILLUST_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(illustDetailPage.creatorName).toBeVisible();
      await expect(illustDetailPage.creatorLink).toHaveAttribute('href', /profile\.php\?id=acworks/);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-001: Free User kiểm tra định dạng JPEG và nút tải ảnh
   */
  test('TC-DOWNLOAD-FREE-001: Free User kiểm tra định dạng JPEG và nút tải @free-user @download', async ({
    illustDetailPage,
  }) => {
    await test.step('Xác minh định dạng JPEG hiển thị', async () => {
      await expect(illustDetailPage.formatRadioJpeg).toBeVisible();
    });

    await test.step('Xác minh nút tải「ダウンロード」hiển thị sẵn sàng tương tác', async () => {
      await expect(illustDetailPage.downloadButton).toBeVisible();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-002: Free User kiểm tra định dạng PNG hiển thị giá mua lẻ cho tài khoản Free
   */
  test('TC-DOWNLOAD-FREE-002: Free User kiểm tra định dạng PNG @free-user @download', async ({
    illustDetailPage,
    page,
  }) => {
    await test.step('Xác minh định dạng PNG hiển thị kèm thông tin mua lẻ (495円)', async () => {
      await expect(illustDetailPage.formatRadioPng).toBeVisible();
      await expect(page.locator('text=495円').first()).toBeVisible();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-003: Free User kiểm tra định dạng Vector AI hiển thị giá mua lẻ cho tài khoản Free
   */
  test('TC-DOWNLOAD-FREE-003: Free User kiểm tra định dạng Vector AI @free-user @download', async ({
    illustDetailPage,
    page,
  }) => {
    await test.step('Xác minh định dạng AI hiển thị kèm thông tin mua lẻ (990円)', async () => {
      await expect(illustDetailPage.formatRadioAi).toBeVisible();
      await expect(page.locator('text=990円').first()).toBeVisible();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-004: Free User kiểm tra thông báo giới hạn Premium Material
   */
  test('TC-DOWNLOAD-FREE-004: Free User kiểm tra thông báo giới hạn Premium Material @free-user @download', async ({
    illustDetailPage,
  }) => {
    await test.step('Xác minh thông báo「こちらはプレミアム会員限定のプレミアム素材です」hiển thị', async () => {
      await expect(illustDetailPage.premiumMaterialNotice).toBeVisible();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-005: Free User click nút Bookmark trên trang chi tiết tranh
   */
  test('TC-DOWNLOAD-FREE-005: Free User click nút Bookmark lưu tranh @free-user @bookmark', async ({
    illustDetailPage,
  }) => {
    await test.step('Click nút Bookmark trên trang chi tiết', async () => {
      await expect(illustDetailPage.bookmarkButton).toBeVisible();
      await illustDetailPage.clickBookmark();
    });

    await test.step('Xác minh nút Bookmark vẫn hiển thị sẵn sàng trên UI', async () => {
      await expect(illustDetailPage.bookmarkButton).toBeVisible();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-006: Free User click Like tranh
   */
  test('TC-DOWNLOAD-FREE-006: Free User click Like tranh và verify bộ đếm like @free-user @like', async ({
    illustDetailPage,
  }) => {
    await test.step('Click nút Like tranh', async () => {
      await expect(illustDetailPage.likeButton).toBeVisible();
      await illustDetailPage.clickLike();
    });

    await test.step('Xác minh bộ đếm like hiển thị giá trị', async () => {
      await expect(illustDetailPage.likeCount).toBeVisible();
      const countText = await illustDetailPage.likeCount.textContent();
      expect(Number(countText?.replace(/,/g, ''))).toBeGreaterThan(0);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-007: Free User hiển thị các nút chia sẻ mạng xã hội (Twitter, Facebook, Pinterest)
   */
  test('TC-DOWNLOAD-FREE-007: Free User hiển thị các liên kết mạng xã hội @free-user @social', async ({
    page,
  }) => {
    await test.step('Xác minh các liên kết mạng xã hội (Twitter/X, Facebook, Pinterest) hiển thị trên trang', async () => {
      const twitterLink = page.locator('a[href*="twitter.com"], a[href*="x.com"]').first();
      const fbLink = page.locator('a[href*="facebook.com"]').first();
      const pinterestLink = page.locator('a[href*="pinterest.com"]').first();

      await expect(twitterLink).toBeAttached();
      await expect(fbLink).toBeAttached();
      await expect(pinterestLink).toBeAttached();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-008: Free User kiểm tra các tính năng thanh tác vụ nổi (Floating Toolbar)
   */
  test('TC-DOWNLOAD-FREE-008: Free User kiểm tra các tính năng thanh tác vụ nổi @free-user @toolbar', async ({
    page,
  }) => {
    await test.step('Xác minh các liên kết thao tác nổi (Tải hàng loạt, Lịch sử tải) hiển thị', async () => {
      const bulkDownloadLink = page.locator('a:has-text("まとめて ダウンロード"), a:has-text("まとめてダウンロード")').first();
      const historyLink = page.locator('a:has-text("ダウンロード 履歴"), a:has-text("ダウンロード履歴")').first();

      await expect(bulkDownloadLink).toBeAttached();
      await expect(historyLink).toBeAttached();
    });
  });
});
