import * as path from 'path';
import * as fs from 'fs';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * Creator Photo Upload Full End-to-End Test Suite
 *
 * Flow:
 * 1. Upload photo on /creator/upload
 * 2. Agree to 5 copyright terms & submit
 * 3. Confirm copyright warning modal & trigger upload processing
 * 4. Navigate to /creator/dataedit
 * 5. Input Title, input at least 5 Tags, select Category
 * 6. Click 保存 and confirm redirect to /creator/list
 *
 * Applicable Role: Creator
 */
test.describe('Creator Photo Upload @creator @upload', () => {
  test.describe.configure({ mode: 'serial' });

  const samplePhotoPath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  const createUniqueTestPhoto = (): string => {
    const uniquePath = path.resolve(__dirname, `../../../test-data/temp_upload_${Date.now()}.jpg`);
    const src = fs.readFileSync(samplePhotoPath);
    fs.writeFileSync(uniquePath, Buffer.concat([src, Buffer.from(`_test_${Date.now()}`)]));
    return uniquePath;
  };

  test.beforeEach(async ({ uploadPage }) => {
    await uploadPage.goToUploadPage();
    if (await uploadPage.removeFileButton.isVisible()) {
      await uploadPage.removeUploadedFile().catch(() => {});
    }
  });

  test('TC-UPLOAD-CREATOR-001: Kiểm tra giao diện trang upload ảnh hiển thị đầy đủ các thành phần chính', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Verify URL trang upload ảnh chính xác', async () => {
      await expect(page).toHaveURL(/\/creator\/upload/);
    });

    await test.step('Verify tiêu đề H1「写真を投稿する」hiển thị', async () => {
      await expect(uploadPage.pageHeading).toBeVisible();
      await expect(uploadPage.pageHeading).toHaveText('写真を投稿する');
    });

    await test.step('Verify khu vực chọn file upload tồn tại', async () => {
      await expect(uploadPage.fileInput).toBeAttached();
    });

    await test.step('Verify 5 mục xác nhận bản quyền (checklist) hiển thị đầy đủ', async () => {
      await expect(uploadPage.labelCopyright).toBeVisible();
      await expect(uploadPage.labelPermission).toBeVisible();
      await expect(uploadPage.labelFacility).toBeVisible();
      await expect(uploadPage.labelMorality).toBeVisible();
      await expect(uploadPage.labelTerms).toBeVisible();
    });

    await test.step('Verify nút「投稿する」hiển thị và sẵn sàng tương tác', async () => {
      await expect(uploadPage.submitUploadButton).toBeVisible();
      await expect(uploadPage.submitUploadButton).toBeEnabled();
    });
  });

  test('TC-UPLOAD-CREATOR-002: Kiểm tra chọn file ảnh JPG hợp lệ hiển thị thông tin hàng đợi tải lên', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Chọn file ảnh JPG tải lên', async () => {
      await uploadPage.setUploadFile(samplePhotoPath);
    });

    await test.step('Verify thông báo số lượng file đang chọn tải lên「1個のファイルを選択中」', async () => {
      await expect(uploadPage.selectedFilesNotice).toBeVisible();
      await expect(uploadPage.selectedFilesNotice).toContainText('1個のファイルを選択中');
    });

    await test.step('Verify tên file và nút「削除」hiển thị trong danh sách', async () => {
      const fileNameLocator = page.locator('text=sample-search.jpg');
      await expect(fileNameLocator).toBeVisible();
      await expect(uploadPage.removeFileButton).toBeVisible();
    });
  });

  test('TC-UPLOAD-CREATOR-003: Kiểm tra xóa file khỏi hàng đợi tải lên', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Chọn file ảnh để đưa vào hàng đợi', async () => {
      await uploadPage.setUploadFile(samplePhotoPath);
      await expect(uploadPage.selectedFilesNotice).toBeVisible();
    });

    await test.step('Click nút「削除」để bỏ file khỏi hàng đợi', async () => {
      await uploadPage.removeUploadedFile();
    });

    await test.step('Verify file đã được xóa khỏi danh sách tải lên', async () => {
      const fileNameLocator = page.locator('text=sample-search.jpg');
      await expect(fileNameLocator).not.toBeVisible();
      await expect(uploadPage.selectedFilesNotice).not.toBeVisible();
    });
  });

  test('TC-UPLOAD-CREATOR-004: Kiểm tra cảnh báo alert khi bấm「投稿する」mà chưa check đủ 5 mục xác nhận', async ({
    uploadPage,
    page,
  }) => {
    await test.step('Chọn file ảnh vào hàng đợi', async () => {
      await uploadPage.setUploadFile(samplePhotoPath);
      await expect(uploadPage.selectedFilesNotice).toBeVisible();
    });

    await test.step('Bấm「投稿する」khi chưa check các điều khoản và verify dialog alert', async () => {
      let alertMessage = '';
      page.once('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.accept();
      });

      await uploadPage.clickSubmitUpload();
      expect(alertMessage).toContain('すべての確認事項をチェックしてください。');
    });
  });

  test('TC-UPLOAD-CREATOR-005: Kiểm tra hiển thị modal cảnh báo bản quyền「【ご注意ください】」sau khi hoàn thành checklist', async ({
    uploadPage,
  }) => {
    await test.step('Chọn file ảnh vào hàng đợi', async () => {
      await uploadPage.setUploadFile(samplePhotoPath);
      await expect(uploadPage.selectedFilesNotice).toBeVisible();
    });

    await test.step('Tích chọn đầy đủ 5 mục xác nhận bản quyền', async () => {
      await uploadPage.checkAllChecklists();
      await expect(uploadPage.checkboxCopyright).toBeChecked();
      await expect(uploadPage.checkboxPermission).toBeChecked();
      await expect(uploadPage.checkboxFacility).toBeChecked();
      await expect(uploadPage.checkboxMorality).toBeChecked();
      await expect(uploadPage.checkboxTerms).toBeChecked();
    });

    await test.step('Bấm nút「投稿する」', async () => {
      await uploadPage.clickSubmitUpload();
    });

    await test.step('Verify modal cảnh báo bản quyền「【ご注意ください】」hiển thị', async () => {
      await expect(uploadPage.confirmModal).toBeVisible();
      await expect(uploadPage.confirmModalHeading).toContainText('【ご注意ください】');
      await expect(uploadPage.confirmModalCancelButton).toBeVisible();
      await expect(uploadPage.confirmModalUploadButton).toBeVisible();
    });

    await test.step('Click nút「キャンセル」trên modal và verify modal đóng', async () => {
      await uploadPage.cancelUploadInModal();
      await expect(uploadPage.confirmModal).not.toBeVisible();
    });

    await test.step('Dọn dẹp hàng đợi bằng cách xóa file', async () => {
      await uploadPage.removeUploadedFile();
      await expect(uploadPage.selectedFilesNotice).not.toBeVisible();
    });
  });

  test('TC-UPLOAD-CREATOR-006: Kiểm tra trọn vẹn quy trình Upload ảnh và nhập Title, Tags, Category, Lưu thành công', async ({
    uploadPage,
    page,
  }) => {
    test.setTimeout(180_000);
    const uniquePhotoPath = createUniqueTestPhoto();

    try {
      // Step 1: Upload photo on /creator/upload
      await test.step('Chọn file ảnh hợp lệ để tải lên', async () => {
        await uploadPage.setUploadFile(uniquePhotoPath);
        await expect(uploadPage.selectedFilesNotice).toBeVisible();
      });

      await test.step('Tích chọn đầy đủ 5 mục xác nhận bản quyền bắt buộc', async () => {
        await uploadPage.checkAllChecklists();
      });

      await test.step('Bấm nút「投稿する」để mở modal cảnh báo bản quyền', async () => {
        await uploadPage.clickSubmitUpload();
        await expect(uploadPage.confirmModal).toBeVisible();
      });

      await test.step('Xác nhận「アップロード」trên modal, tự động chấp nhận alert hoàn thành và chuyển sang trang chỉnh sửa', async () => {
        page.on('dialog', async (dialog) => {
          await dialog.accept().catch(() => {});
        });

        await uploadPage.confirmUploadInModal();
        await page.waitForURL(/\/creator\/dataedit/, { waitUntil: 'domcontentloaded', timeout: 90_000 });
      });

      // Step 2: Fill Metadata on /creator/dataedit
      await test.step('Verify đã điều hướng đến trang「写真データ編集」', async () => {
        await expect(page).toHaveURL(/\/creator\/dataedit/);
        await expect(uploadPage.dataEditHeading).toBeVisible();
      });

      await test.step('Nhập tiêu đề ảnh「タイトルを入力」', async () => {
        await uploadPage.fillTitle('テスト写真素材 2026');
        await expect(uploadPage.photoTitleInput).toHaveValue('テスト写真素材 2026');
      });

      await test.step('Nhập ít nhất 5 thẻ từ khóa (Tags) hợp lệ', async () => {
        const testTags = ['テスト写真', '自然風景', '青空', '屋外', '晴天'];
        await uploadPage.addTags(testTags);
        const tagCount = await uploadPage.tagItems.count();
        expect(tagCount).toBeGreaterThanOrEqual(5);
      });

      await test.step('Chọn thể loại (Category) cho ảnh', async () => {
        await uploadPage.selectCategory();
        await expect(uploadPage.categoryNatureCheckbox).toBeChecked();
      });

      // Step 3: Save and verify redirect to /creator/list
      await test.step('Bấm nút「保存」, chấp nhận alert thông báo thành công và chuyển sang danh sách ảnh「投稿写真一覧」', async () => {
        await Promise.all([
          page.waitForURL(/\/creator\/list/, { waitUntil: 'domcontentloaded', timeout: 60_000 }),
          uploadPage.savePhotoData(),
        ]);
      });

      await test.step('Verify đã điều hướng thành công đến trang danh sách tác phẩm「投稿写真一覧」', async () => {
        await expect(page).toHaveURL(/\/creator\/list/);
        await expect(uploadPage.photoListHeading).toBeVisible();
      });
    } finally {
      try {
        if (fs.existsSync(uniquePhotoPath)) {
          fs.unlinkSync(uniquePhotoPath);
        }
      } catch {
        // Ignore file lock on Windows while browser process holds file handle
      }
    }
  });

  test('TC-UPLOAD-CREATOR-007: Tìm kiếm ảnh đã tải lên trên danh sách「投稿写真一覧」theo từ khóa hoặc ID @regression @creator', async ({
    uploadPage,
    page,
  }) => {
    test.setTimeout(90_000);

    await test.step('Điều hướng đến trang danh sách ảnh của Creator「投稿写真一覧」', async () => {
      await uploadPage.goToPhotoListPage();
      await expect(uploadPage.photoListHeading).toBeVisible();
    });

    let photoId: string | null = null;
    await test.step('Lấy ID hoặc tiêu đề của bức ảnh đầu tiên trong danh sách', async () => {
      await expect(uploadPage.photoListRows.first()).toBeVisible({ timeout: 15_000 });
      photoId = await uploadPage.getFirstPhotoId();
      expect(photoId).not.toBeNull();
    });

    await test.step(`Thực hiện tìm kiếm theo ID ảnh: ${photoId}`, async () => {
      await uploadPage.searchPhoto(photoId!);
      await expect(page).toHaveURL(new RegExp(`pl_q=${photoId}`));
    });

    await test.step('Verify kết quả tìm kiếm hiển thị chính xác bức ảnh vừa tìm', async () => {
      await expect(uploadPage.photoListRows.first()).toBeVisible();
      const targetRow = page.locator(`#data-list-${photoId}`);
      await expect(targetRow).toBeVisible();
    });
  });

  test('TC-UPLOAD-CREATOR-008: Chỉnh sửa thông tin ảnh (Edit) và xác nhận cập nhật thành công @regression @creator', async ({
    uploadPage,
    page,
  }) => {
    test.setTimeout(120_000);

    await test.step('Điều hướng đến trang danh sách ảnh của Creator「投稿写真一覧」', async () => {
      await uploadPage.goToPhotoListPage();
      await expect(uploadPage.photoListHeading).toBeVisible();
    });

    await test.step('Lấy thông tin ảnh đầu tiên và bấm「編集」để mở form chỉnh sửa', async () => {
      await expect(uploadPage.photoListRows.first()).toBeVisible({ timeout: 15_000 });
      await uploadPage.clickFirstPhotoEdit();
      await expect(page).toHaveURL(/\/creator\/dataedit/);
      await expect(uploadPage.dataEditHeading).toBeVisible();
    });

    const updatedTitle = `更新テスト_${Date.now().toString().slice(-6)}`;

    await test.step(`Cập nhật tiêu đề ảnh mới: ${updatedTitle}`, async () => {
      await uploadPage.fillTitle(updatedTitle);
      await expect(uploadPage.photoTitleInput).toHaveValue(updatedTitle);
    });

    await test.step('Bấm「保存」để lưu thông tin đã chỉnh sửa và quay lại trang danh sách', async () => {
      await Promise.all([
        page.waitForURL(/\/creator\/list/, { waitUntil: 'domcontentloaded', timeout: 60_000 }),
        uploadPage.savePhotoData(),
      ]);
    });

    await test.step('Verify tiêu đề mới đã được cập nhật thành công trên trang danh sách', async () => {
      await expect(page).toHaveURL(/\/creator\/list/);
      await expect(uploadPage.photoListHeading).toBeVisible();
      const firstTitle = await uploadPage.getFirstPhotoTitle();
      expect(firstTitle).toBe(updatedTitle);
    });
  });

  test('TC-UPLOAD-CREATOR-009: Xóa ảnh đã tải lên (Delete) qua modal xác nhận và kiểm tra ảnh bị xóa khỏi danh sách @regression @creator', async ({
    uploadPage,
    page,
  }) => {
    test.setTimeout(180_000);
    const uniquePhotoPath = createUniqueTestPhoto();

    try {
      // Step 1: Upload a dedicated test photo to ensure clean test state without affecting existing user photos
      await test.step('Tải lên một ảnh mới để thực hiện kịch bản xóa độc lập', async () => {
        await uploadPage.goToUploadPage();
        await uploadPage.setUploadFile(uniquePhotoPath);
        await expect(uploadPage.selectedFilesNotice).toBeVisible();
        await uploadPage.checkAllChecklists();
        await uploadPage.clickSubmitUpload();
        await expect(uploadPage.confirmModal).toBeVisible();

        page.on('dialog', async (dialog) => {
          await dialog.accept().catch(() => {});
        });

        await uploadPage.confirmUploadInModal();
        await page.waitForURL(/\/creator\/dataedit/, { waitUntil: 'domcontentloaded', timeout: 90_000 });
      });

      const deletePhotoTitle = `削除対象_${Date.now().toString().slice(-6)}`;
      await test.step('Nhập tiêu đề và lưu ảnh để xuất hiện trên danh sách', async () => {
        await uploadPage.fillTitle(deletePhotoTitle);
        await uploadPage.addTags(['削除テスト', 'テスト用', '自然風景', '青空', '屋外']);
        await uploadPage.selectCategory();
        await Promise.all([
          page.waitForURL(/\/creator\/list/, { waitUntil: 'domcontentloaded', timeout: 60_000 }),
          uploadPage.savePhotoData(),
        ]);
        await expect(page).toHaveURL(/\/creator\/list/);
      });

      let targetPhotoId: string | null = null;
      await test.step('Lấy ID của ảnh vừa tạo và bấm nút「削除」', async () => {
        await expect(uploadPage.photoListRows.first()).toBeVisible({ timeout: 15_000 });
        targetPhotoId = await uploadPage.getFirstPhotoId();
        expect(targetPhotoId).not.toBeNull();
        await uploadPage.clickFirstPhotoDelete();
      });

      await test.step('Verify modal cảnh báo xóa「#confirm-dialog」hiển thị đúng nội dung', async () => {
        await expect(uploadPage.deleteModal).toBeVisible();
        await expect(uploadPage.deleteModalConfirmText).toHaveText(
          'この操作は元に戻せません。本当に削除しますか。'
        );
        await expect(uploadPage.deleteModalConfirmButton).toBeVisible();
        await expect(uploadPage.deleteModalCancelButton).toBeVisible();
      });

      await test.step('Bấm nút「OK」trên modal xác nhận xóa và đợi trang tải lại', async () => {
        await uploadPage.confirmDeletePhoto();
        await expect(uploadPage.deleteModal).toBeHidden();
      });

      await test.step('Verify ảnh đã bị xóa hoàn toàn khỏi danh sách「投稿写真一覧」', async () => {
        const deletedRow = page.locator(`#data-list-${targetPhotoId}`);
        await expect(deletedRow).toBeHidden();
      });
    } finally {
      try {
        if (fs.existsSync(uniquePhotoPath)) {
          fs.unlinkSync(uniquePhotoPath);
        }
      } catch {
        // Ignore file lock on Windows while browser process holds file handle
      }
    }
  });
});
