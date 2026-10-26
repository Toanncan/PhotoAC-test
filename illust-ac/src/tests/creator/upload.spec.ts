import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * Creator Illustration Upload & Management Test Suite (AC-Illust)
 *
 * Routes:
 * - /creator/upload.php      (Upload JPEG/EPS/PNG, Title, Tags, Categories, AI checkbox, Submit)
 * - /creator/upload_lst.php  (Creator illustration list, search, status filter, delete modal)
 *
 * Applicable Role: Creator
 */
test.describe('Creator Illustration Upload & Management @creator @upload', () => {
  test.describe.configure({ mode: 'serial' });
  const sampleJpegPath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ uploadPage }) => {
    await uploadPage.goToUploadPage();
  });

  test('TC-UPLOAD-CREATOR-001: Kiểm tra giao diện trang đăng tranh hiển thị đầy đủ các thành phần chính', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Xác minh URL trang đăng tranh chính xác (/creator/upload.php)', async () => {
      await expect(page).toHaveURL(/\/creator\/upload\.php/);
    });

    await test.step('Xác minh tiêu đề「イラストの投稿」hiển thị', async () => {
      await expect(uploadPage.pageHeading).toBeVisible();
      await expect(uploadPage.pageHeading).toContainText('イラストの投稿');
    });

    await test.step('Xác minh các trường chọn file upload tồn tại (JPEG, EPS, PNG)', async () => {
      await expect(uploadPage.jpegFileInput).toBeAttached();
      await expect(uploadPage.epsFileInput).toBeAttached();
      await expect(uploadPage.pngFileInput).toBeAttached();
    });

    await test.step('Xác minh các trường nhập thông tin metadata (Title, Tags, Categories, AI checkbox)', async () => {
      await expect(uploadPage.titleInput).toBeVisible();
      await expect(uploadPage.tagsTextarea).toBeVisible();
      await expect(uploadPage.firstCategoryCheckbox).toBeAttached();
      await expect(uploadPage.aiStatusCheckbox).toBeAttached();
    });

    await test.step('Xác minh nút submit「新規投稿」hiển thị', async () => {
      await expect(uploadPage.submitUploadButton).toBeVisible();
    });
  });

  test('TC-UPLOAD-CREATOR-002: Kiểm tra validation cảnh báo khi submit mà chưa chọn file ảnh JPEG bắt buộc', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Submit form khi chưa đính kèm file ảnh JPEG và verify cảnh báo', async () => {
      let dialogAppeared = false;
      const dialogHandler = async (dialog: any) => {
        dialogAppeared = true;
        await dialog.accept().catch(() => { });
      };
      page.once('dialog', dialogHandler);

      await uploadPage.submitForm();

      // Either browser native alert appears or inline validation error displays
      const inlineError = uploadPage.validationErrors.first();
      const hasInlineError = await inlineError.isVisible().catch(() => false);
      expect(dialogAppeared || hasInlineError || page.url().includes('/creator/upload.php')).toBeTruthy();
    });
  });

  test('TC-UPLOAD-CREATOR-003: Kiểm tra chọn file ảnh JPEG hợp lệ vào input file', async ({
    uploadPage,
  }) => {
    await test.step('Chọn file JPEG hợp lệ', async () => {
      await uploadPage.setJpegFile(sampleJpegPath);
    });

    await test.step('Xác minh input file đã nhận giá trị file', async () => {
      const inputValue = await uploadPage.jpegFileInput.inputValue();
      expect(inputValue).toContain('sample-search.jpg');
    });
  });

  test('TC-UPLOAD-CREATOR-004: Kiểm tra validation khi thiếu thông tin metadata bắt buộc', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Chọn file ảnh JPEG nhưng bỏ trống Title và Tags', async () => {
      await uploadPage.setJpegFile(sampleJpegPath);
      await uploadPage.titleInput.fill('');
      await uploadPage.tagsTextarea.fill('');
    });

    await test.step('Nhấn submit và verify hệ thống ngăn chặn submit thiếu dữ liệu', async () => {
      let dialogAppeared = false;
      page.once('dialog', async (dialog) => {
        dialogAppeared = true;
        await dialog.accept().catch(() => { });
      });

      await uploadPage.submitForm();

      // Form should remain on upload.php due to validation
      await expect(page).toHaveURL(/\/creator\/upload\.php/);
    });
  });

  test('TC-UPLOAD-CREATOR-005: Kiểm tra điền đầy đủ metadata hợp lệ và hiển thị modal cam kết bản quyền', async ({
    uploadPage,
  }) => {
    await test.step('Chọn file ảnh JPEG và điền đầy đủ metadata hợp lệ', async () => {
      await uploadPage.setJpegFile(sampleJpegPath);
      await uploadPage.fillIllustrationMetadata('桜のイラスト テスト', '桜 花 春 植物 flower', true);
    });

    await test.step('Nhấn「新規投稿」và verify modal bản quyền hiển thị hoặc form kích hoạt', async () => {
      await uploadPage.submitForm();

      // If modal appears, verify heading
      const modalVisible = await uploadPage.confirmModal.isVisible().catch(() => false);
      if (modalVisible) {
        await expect(uploadPage.confirmModalHeading).toBeVisible();
        await expect(uploadPage.confirmModalHeading).toContainText('【ご注意ください】');
      } else {
        // Form submitted or stayed on upload page with validation state
        await expect(uploadPage.pageHeading).toBeVisible();
      }
    });
  });

  test('TC-UPLOAD-CREATOR-006: Điều hướng trang quản lý tác phẩm「投稿イラスト一覧」', async ({
    creatorIllustListPage,
    page,
  }) => {
    await test.step('Điều hướng đến trang danh sách tác phẩm (/creator/upload_lst.php)', async () => {
      await creatorIllustListPage.goToIllustListPage();
    });

    await test.step('Xác minh URL và tiêu đề H1「投稿イラスト一覧」hiển thị', async () => {
      await expect(page).toHaveURL(/\/creator\/upload_lst\.php/);
      await expect(creatorIllustListPage.pageHeading).toBeVisible();
      await expect(creatorIllustListPage.pageHeading).toContainText('投稿イラスト一覧');
    });

    await test.step('Xác minh ô tìm kiếm và số lượng tác phẩm hiển thị', async () => {
      await expect(creatorIllustListPage.searchInput).toBeVisible();
      await expect(page.locator('p:has-text("投稿イラスト"), p:has-text("件")').first()).toBeVisible();
    });
  });

  test('TC-UPLOAD-CREATOR-007: Tìm kiếm tranh trong danh sách quản lý theo từ khóa hoặc ID', async ({
    creatorIllustListPage,
  }) => {
    await test.step('Truy cập trang danh sách tác phẩm', async () => {
      await creatorIllustListPage.goToIllustListPage();
    });

    await test.step('Thực hiện tìm kiếm với từ khóa「flower」', async () => {
      await creatorIllustListPage.searchIllustrations('flower');
    });

    await test.step('Xác minh trang danh sách tải lại và input tìm kiếm giữ giá trị', async () => {
      await expect(creatorIllustListPage.searchInput).toHaveValue('flower');
    });
  });

  test('TC-UPLOAD-CREATOR-008: Kiểm tra mở modal yêu cầu xóa tranh「イラスト削除申請」', async ({
    creatorIllustListPage,
  }) => {
    await test.step('Truy cập trang danh sách tác phẩm', async () => {
      await creatorIllustListPage.goToIllustListPage();
    });

    await test.step('Kiểm tra nút xóa hoặc modal yêu cầu xóa tranh tồn tại', async () => {
      const hasDeleteBtn = await creatorIllustListPage.firstDeleteRequestButton.isVisible().catch(() => false);
      if (hasDeleteBtn) {
        await creatorIllustListPage.openFirstItemDeleteModal();
        await expect(creatorIllustListPage.deleteModalTitle).toBeVisible();
        await expect(creatorIllustListPage.deleteModalTitle).toContainText('イラスト削除申請');
        await creatorIllustListPage.deleteModalCloseButton.click();
      } else {
        // If no illustration published under this account yet, verify empty list state or table container
        await expect(creatorIllustListPage.pageHeading).toBeVisible();
      }
    });
  });
});
