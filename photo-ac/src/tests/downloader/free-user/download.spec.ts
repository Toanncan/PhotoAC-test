import { test, expect } from '../../../fixtures/base.fixture';
import { captureEvidenceWithUrl, enableAdBlocker } from '../../../utils/helpers';
import { PhotoDetailPage } from '../../../pages/downloader/photo-detail.page';

/**
 * Test Suite: Download — Free User
 */
test.describe('Download — Free User', () => {
  // Session Free User được inject tự động từ project cấu hình (chromium-free-user / firefox-free-user)

  test.beforeEach(async ({ page, photoDetailPage }) => {
    await enableAdBlocker(page);
    await photoDetailPage.goToAcworksPhotoDetail(PhotoDetailPage.ACWORKS_DEFAULT_PHOTO_ID);

    await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
      await expect(photoDetailPage.creatorName).toBeVisible();
      await expect(photoDetailPage.creatorLink).toHaveAttribute('href', /profile\/43626/);
    });
  });

  // Nhóm 1: Giới hạn Download đối với Free User

  /**
   * TC-DOWNLOAD-FREE-001: Free User click icon folder (Bulk download) -> Hiển thị tooltip hạn chế Premium
   */
  test('TC-DOWNLOAD-FREE-001: Free User click Bulk Download hiển thị tooltip hạn chế Premium @free-user', async ({
    photoDetailPage,
  }) => {
    await test.step('Click icon folder まとめてダウンロード', async () => {
      await expect(photoDetailPage.freeBulkDownloadButton).toBeVisible();
      await photoDetailPage.clickFreeBulkDownload();
    });

    await test.step('Xác minh tooltip hiển thị thông báo giới hạn Premium', async () => {
      await expect(photoDetailPage.activeTooltip).toBeVisible();
      await expect(photoDetailPage.activeTooltip).toContainText(/プレミアム/);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-002: Free User click button 今すぐ購入 (Extra license) -> Hiển thị popover giới hạn Premium
   */
  test('TC-DOWNLOAD-FREE-002: Free User click Buy Extra License hiển thị thông báo giới hạn Premium @free-user', async ({
    photoDetailPage,
  }) => {
    await test.step('Click button 今すぐ購入', async () => {
      await expect(photoDetailPage.freeBuyExtraLicenseButton).toBeVisible();
      await photoDetailPage.clickFreeBuyExtraLicense();
    });

    await test.step('Xác minh popover thông báo mua bản quyền thương mại chỉ dành cho Premium', async () => {
      await expect(photoDetailPage.freeExtraLicensePopover).toBeVisible();
      await expect(photoDetailPage.freeExtraLicensePopover).toContainText(
        '商品化ライセンスの購入は、プレミアム会員様限定です。商品化ライセンス権を使用しますか。'
      );
    });
  });

  /**
   * TC-DOWNLOAD-FREE-003: Free User click icon Cart (Bulk Extra license) -> Hiển thị tooltip giới hạn Premium
   */
  test('TC-DOWNLOAD-FREE-003: Free User click Cart icon hiển thị tooltip giới hạn Premium @free-user', async ({
    photoDetailPage,
  }) => {
    await test.step('Click icon Cart (ライセンスまとめて購入)', async () => {
      await expect(photoDetailPage.freeCartButton).toBeVisible();
      await photoDetailPage.clickFreeCart();
    });

    await test.step('Xác minh tooltip hiển thị thông báo giới hạn Premium', async () => {
      await expect(photoDetailPage.activeTooltip).toBeVisible();
      await expect(photoDetailPage.activeTooltip).toContainText('商品化ライセンスの購入は、プレミアム会員様限定です。');
    });
  });

  // Nhóm 2: Tương tác Trang Chi Tiết Ảnh (Detail & Bookmark, Like, Fan, Share)

  /**
   * TC-DOWNLOAD-FREE-004: Free User thêm ảnh vào Bookmark, kiểm tra trong Collection và xóa ảnh khỏi Bookmark
   */
  test('TC-DOWNLOAD-FREE-004: Free User thêm ảnh vào Bookmarks, kiểm tra trong Collection và xóa ảnh @free-user @bookmark', async ({
    page,
    photoDetailPage,
    bookmarksPage,
  }, testInfo) => {
    const photoId = PhotoDetailPage.ACWORKS_DEFAULT_PHOTO_ID;

    try {
      await test.step('Click nút Bookmark trên trang chi tiết ảnh', async () => {
        await expect(photoDetailPage.bookmarkButton).toBeVisible();
        await photoDetailPage.clickBookmark();
      });

      await test.step('Xác minh modal thông báo thêm vào collection hiển thị', async () => {
        await expect(photoDetailPage.collectionAddedModalTitle).toBeVisible({ timeout: 10_000 });
        await expect(photoDetailPage.collectionAddedModalTitle).toContainText('コレクションに追加');
        await expect(photoDetailPage.collectionAddModalContent).toContainText('コレクションに追加しました。保存先：お気に入り');
        await captureEvidenceWithUrl(page, testInfo, 'collectionAddModal');

      });

      await test.step('Click nút Bookmark lần 2 : Hiển thị thông báo đã add collection', async () => {

      });

      await test.step('Đi tới thư mục Collection và kiểm tra ảnh có ID tương ứng', async () => {
        await bookmarksPage.goToFirstCollectionFolder();
        const bookmarkedItem = page.locator(`.item:has(a[href*="${photoId}"])`).first();
        await expect(bookmarkedItem).toBeVisible({ timeout: 15_000 });
      });
    } finally {
      await test.step('Xóa ảnh khỏi Bookmarks và xác minh ảnh đã bị xóa sạch', async () => {
        if (!page.url().includes('/user/bookmarks/collection/')) {
          await bookmarksPage.goToFirstCollectionFolder().catch(() => { });
        }
        const bookmarkedItem = page.locator(`.item:has(a[href*="${photoId}"])`).first();
        if (await bookmarkedItem.isVisible().catch(() => false)) {
          await bookmarksPage.deletePhotoFromCollection(photoId);
        }
        const remainingItem = page.locator(`.item:has(a[href*="${photoId}"])`);
        await expect(remainingItem).toHaveCount(0);
      });
    }
  });

  /**
   * TC-DOWNLOAD-FREE-005: Free User click Like ảnh Acworks
   */
  test('TC-DOWNLOAD-FREE-005: Free User tương tác click Like ảnh Acworks @free-user @like', async ({
    page,
    photoDetailPage,
  }) => {
    await test.step('Click nút Like và xác minh tương tác thành công', async () => {
      await expect(photoDetailPage.likeButton).toBeVisible();

      // Đăng ký dialog listener phòng trường hợp đã đánh giá trước đó
      page.once('dialog', async dialog => {
        await dialog.accept();
      });

      await photoDetailPage.clickLike();
      await expect(photoDetailPage.likeCount).toBeVisible();
      const count = await photoDetailPage.likeCount.innerText();
      expect(Number(count.replace(/,/g, ''))).toBeGreaterThan(0);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-006: Free User tương tác thả tim Fan đăng ký tác giả Acworks
   */
  test('TC-DOWNLOAD-FREE-006: Free User tương tác thả tim Fan đăng ký tác giả Acworks @free-user @heart', async ({
    page,
    photoDetailPage,
  }) => {
    await test.step('Click nút Fan (Thả tim) và xác minh alert cùng số lượng fan', async () => {
      await expect(photoDetailPage.heartFanButton).toBeVisible();

      page.once('dialog', async dialog => {
        await dialog.accept();
      });

      await photoDetailPage.clickHeartFan();
      await expect(photoDetailPage.fanCount).toBeVisible();
      const fanText = await photoDetailPage.fanCount.innerText();
      expect(Number(fanText.replace(/,/g, ''))).toBeGreaterThan(0);
    });
  });

  /**
   * TC-DOWNLOAD-FREE-007: Free User click option Facebook và xác minh mở cửa sổ chia sẻ Facebook
   */
  test('TC-DOWNLOAD-FREE-007: Free User click option Facebook và xác minh mở cửa sổ chia sẻ Facebook @free-user @share', async ({
    photoDetailPage,
  }) => {
    await test.step('Mở popover chia sẻ và xác minh link Facebook có sẵn', async () => {
      await photoDetailPage.ensureSharePopoverVisible();
      await expect(photoDetailPage.shareFacebookLink.first()).toHaveAttribute('href', /facebook\.com/);
    });

    await test.step('Click option Facebook và xác minh mở popup Facebook Share thành công', async () => {
      const popup = await photoDetailPage.clickShareFacebook();
      expect(popup.url()).toContain('facebook.com');
      await popup.close();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-008: Free User click option X (Twitter) và xác minh mở cửa sổ chia sẻ X
   */
  test('TC-DOWNLOAD-FREE-008: Free User click option X (Twitter) và xác minh mở cửa sổ chia sẻ X @free-user @share', async ({
    photoDetailPage,
  }) => {
    await test.step('Mở popover chia sẻ và xác minh link X (Twitter) có sẵn', async () => {
      await photoDetailPage.ensureSharePopoverVisible();
      await expect(photoDetailPage.shareXLink.first()).toHaveAttribute('href', /(x\.com|twitter\.com)/);
    });

    await test.step('Click option X và xác minh mở popup Tweet thành công', async () => {
      const popup = await photoDetailPage.clickShareX();
      expect(popup.url()).toMatch(/(x\.com|twitter\.com)/);
      await popup.close();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-009: Free User click option Pinterest và xác minh mở cửa sổ chia sẻ Pinterest
   */
  test('TC-DOWNLOAD-FREE-009: Free User click option Pinterest và xác minh mở cửa sổ chia sẻ Pinterest @free-user @share', async ({
    photoDetailPage,
  }) => {
    await test.step('Mở popover chia sẻ và xác minh link Pinterest có sẵn', async () => {
      await photoDetailPage.ensureSharePopoverVisible();
      await expect(photoDetailPage.sharePinterestLink.first()).toHaveAttribute('href', /pinterest\.com/);
    });

    await test.step('Click option Pinterest và xác minh mở popup Pinterest Pin thành công', async () => {
      const popup = await photoDetailPage.clickSharePinterest();
      expect(popup.url()).toContain('pinterest.com');
      await popup.close();
    });
  });

  /**
   * TC-DOWNLOAD-FREE-010: Free User click Copy URL và xác minh thông báo sao chép hiển thị
   */
  test('TC-DOWNLOAD-FREE-010: Free User click Copy URL và xác minh thông báo sao chép hiển thị @free-user @share', async ({
    photoDetailPage,
  }) => {
    await test.step('Mở popover chia sẻ và click nút Copy URL', async () => {
      await photoDetailPage.ensureSharePopoverVisible();
      await expect(photoDetailPage.shareCopyUrlButton.first()).toBeVisible();
      await photoDetailPage.clickShareCopyUrl();
    });

    await test.step('Xác minh tooltip thông báo コピーしました hiển thị', async () => {
      await expect(photoDetailPage.copiedTooltip).toBeVisible();
      await expect(photoDetailPage.copiedTooltip).toContainText('コピーしました');
    });
  });

  // Nhóm 3: Tải ảnh (Download Image) cho Free User

  /**
   * TC-DOWNLOAD-FREE-011: Free User tải ảnh Size S thành công qua Timer Modal quảng cáo
   */
  test('TC-DOWNLOAD-FREE-011: Free User tải ảnh Size S thành công qua Timer Modal quảng cáo @free-user', async ({
    photoDetailPage,
  }) => {
    test.setTimeout(90_000);

    await test.step('Click download ảnh Size S và đợi hoàn thành đếm ngược quảng cáo', async () => {
      await expect(photoDetailPage.freeDownloadButton).toBeVisible();
      const download = await photoDetailPage.downloadAsFreeUser('S');

      // Xác minh tên file tải về và định dạng ảnh hợp lệ
      const suggestedFilename = download.suggestedFilename();
      expect(suggestedFilename).toBeTruthy();
      expect(suggestedFilename.toLowerCase()).toMatch(/\.(jpe?g|png|zip)$/);

      // Xác minh tải về thành công, không gặp lỗi hệ thống
      const failure = await download.failure();
      expect(failure).toBeNull();
    });
  });
});

