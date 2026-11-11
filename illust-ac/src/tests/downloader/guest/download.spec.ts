import { test, expect } from '../../../fixtures/base.fixture';
import { captureEvidenceWithUrl, enableAdBlocker } from '../../../utils/helpers';
import { IllustDetailPage } from '../../../pages/downloader/illust-detail.page';

/**
 * Test Suite: Download — Guest User (No login) on AC-Illust
 * 100% tương tác UI thật, kiểm thử trên tác phẩm creator Acworks (ID: 640040).
 */
test.describe('Download — Guest User (No login)', () => {
  // Session rỗng cho Guest User
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, illustDetailPage }) => {
    await enableAdBlocker(page);
    await illustDetailPage.goToDetailPage(IllustDetailPage.ACWORKS_DEFAULT_ILLUST_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(illustDetailPage.creatorName).toBeVisible();
      await expect(illustDetailPage.creatorLink).toHaveAttribute('href', /profile\.php\?id=acworks/);
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-001: Guest click button Download -> Yêu cầu đăng nhập / đăng ký
   */
  test('TC-DOWNLOAD-GUEST-001: Click Download yêu cầu đăng ký tài khoản', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Chọn định dạng JPEG', async () => {
      await illustDetailPage.selectFormat('JPEG');
      await expect(illustDetailPage.formatRadioJpeg).toBeVisible();
    });

    await test.step('Click button Download và xác minh yêu cầu đăng ký/đăng nhập', async () => {
      await expect(illustDetailPage.downloadButton).toBeVisible();
      const href = await illustDetailPage.downloadButton.getAttribute('href');
      expect(href).toMatch(/login|signup/);

      await illustDetailPage.clickDownload();
      await expect(page).toHaveURL(/login|signup/);
      await captureEvidenceWithUrl(page, testInfo, 'Guest-Download-Login-Required');
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-002: Guest click 今すぐ購入 (Extra license) -> Hiển thị thông tin mua license
   */
  test('TC-DOWNLOAD-GUEST-002: Click Buy Extra License hiển thị thông tin mua bản quyền', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Xác minh nút「今すぐ購入」và thông tin bản quyền thương mại hiển thị', async () => {
      await expect(illustDetailPage.buyExtraLicenseButton).toBeVisible();
      await expect(page.locator('text=テンプレートなどの商品販売ができるライセンスです').first()).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Guest-Buy-Extra-License-Modal');
    });
  });

  /**
   * TC-DOWNLOAD-GUEST-003: Guest click nút Fan -> Hiển thị tooltip hoặc popover
   */
  test('TC-DOWNLOAD-GUEST-003: Click Fan hiển thị tooltip hoặc popover', async ({
    page,
    illustDetailPage,
  }, testInfo) => {
    await test.step('Click nút Fan trên trang chi tiết tranh', async () => {
      await expect(illustDetailPage.fanButton).toBeVisible();
      await illustDetailPage.clickFan();
    });

    await test.step('Xác minh tooltip hoặc popover hiển thị', async () => {
      await expect(illustDetailPage.guestNoticePopover).toBeVisible();
      await expect(illustDetailPage.guestNoticePopover).toContainText(/ファン登録|ログイン/);
      await captureEvidenceWithUrl(page, testInfo, 'Guest-Fan-Tooltip-Popover');
    });
  });
});
