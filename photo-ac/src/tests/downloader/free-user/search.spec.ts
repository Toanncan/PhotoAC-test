import * as path from 'path';
import { test, expect } from '../../../fixtures/base.fixture';
import { captureEvidenceWithUrl, enableAdBlocker } from '../../../utils/helpers';
import { GROUP_SITES } from '../../../utils/test-data';

/**
 * TEST SUITE: SEARCH — FREE USER
 */
test.describe('Search — Free User', () => {
  // Session Free User được tự động inject bởi project cấu hình (chromium-free-user / firefox-free-user)

  const sampleImagePath = path.resolve(__dirname, '../../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ page, homePage }) => {
    // Targeted Network Mocking: Luôn duy trì hạn mức tìm kiếm
    await page.route('**/ajax/public/is_enable_search', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: 'Allowed',
          data: { search_zancnt: 4 },
        }),
      });
    });

    // Kích hoạt Ad Blocker 2 tầng (Network Abort + CSS Hidden) chống nghẽn mạng & Layout Shift
    await enableAdBlocker(page);

    await homePage.goToHomePage();
    await homePage.isHomePageLoaded();
  });

  test.afterEach(async ({ page, searchResultPage }, testInfo) => {
    // Chụp ảnh lưu bằng chứng lúc bộ lọc đang hiển thị đầy đủ (nếu trong case chưa chụp EVD riêng)
    if (testInfo.status === 'passed' && (await searchResultPage.hasActiveFilters())) {
      const hasCustomScreenshot = testInfo.attachments.some(
        (att) => att.contentType === 'image/png' && att.name !== 'final-screenshot-passed'
      );
      if (!hasCustomScreenshot) {
        await captureEvidenceWithUrl(page, testInfo, 'filter-applied-evidence');
      }
    }
  });
  // NHÓM 1: TÌM KIẾM CƠ BẢN
  /**
   * TC-SEARCH-FREE-001: Tìm kiếm với từ khóa hợp lệ
   */
  test('TC-SEARCH-FREE-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await test.step(`Tìm kiếm từ khóa "${keyword}" và đợi kết quả hiển thị`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify URL và heading kết quả tìm kiếm', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(keyword)}`));
      await expect(searchResultPage.resultHeading).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
    });

    await test.step('Verify có ít nhất 1 thumbnail hiển thị', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm phải trả về ít nhất 1 ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-FREE-002: Tìm kiếm kết hợp nhiều từ khóa (AND Search)
   */
  test('TC-SEARCH-FREE-002: Tìm kiếm nhiều từ khóa kết hợp (AND Search)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生 笑顔';

    await test.step(`Tìm kiếm nhiều từ khóa kết hợp "${keyword}" và đợi kết quả hiển thị`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify URL chứa cả 2 từ khóa kết hợp', async () => {
      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(/q=.*%E5%AD%A6%E7%94%9F/);
      await expect(searchResultPage.resultHeading).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
    });

    await test.step('Verify kết quả hiển thị danh sách ảnh thỏa mãn cả 2 từ khóa', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm kết hợp AND phải trả về ít nhất 1 ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-FREE-003: Tìm kiếm với từ khóa không tồn tại
   */
  test('TC-SEARCH-FREE-003: Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const nonExistentKeyword = `xyzqwer123456nonexistent_${Date.now()}`;

    await test.step(`Tìm kiếm từ khóa không tồn tại "${nonExistentKeyword}" và đợi kết quả hiển thị`, async () => {
      await homePage.search(nonExistentKeyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify URL chứa từ khóa tìm kiếm', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(nonExistentKeyword)}`));
    });

    await test.step('Verify thông báo không tìm thấy kết quả hiển thị', async () => {
      await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh hiển thị phải bằng 0').toBe(0);
    });
  });

  /**
   * TC-SEARCH-FREE-004: Xóa từ khóa bằng nút Reset và tìm kiếm mới
   */
  test('TC-SEARCH-FREE-004: Xóa từ khóa bằng nút Reset và tìm kiếm mới', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const initialKeyword = 'cat';
    const newKeyword = 'dog';

    await test.step(`Tìm kiếm từ khóa ban đầu "${initialKeyword}" và đợi kết quả hiển thị`, async () => {
      await homePage.search(initialKeyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify từ khóa hiển thị trong ô tìm kiếm và xóa bằng nút Reset', async () => {
      await expect(searchResultPage.searchInput).toHaveValue(initialKeyword);
      await searchResultPage.clickResetKeyword();
      await expect(searchResultPage.searchInput).toHaveValue('');
    });

    await test.step(`Thực hiện tìm kiếm từ khóa mới "${newKeyword}" từ trang kết quả`, async () => {
      await searchResultPage.searchAgain(newKeyword);
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(newKeyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${newKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm từ khóa mới phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-005: Tìm kiếm bằng Top Keyword
   */
  test('TC-SEARCH-FREE-005: Tìm kiếm bằng Top Keyword', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    let targetKeyword = '';
    await test.step('Lấy Top Keyword đầu tiên và chuyển đến trang kết quả', async () => {
      await expect(homePage.topKeywords.first()).toBeVisible();
      const topKeywords = await homePage.getTopKeywords();
      expect(topKeywords.length, 'Phải có ít nhất 1 Top Keyword dưới search bar').toBeGreaterThan(0);
      targetKeyword = topKeywords[0].trim();
      await homePage.clickTopKeyword(targetKeyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step(`Verify URL và heading phản ánh đúng Top Keyword "${targetKeyword}"`, async () => {
      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(targetKeyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm từ khóa Top keyword phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-006: Tìm kiếm bằng Popular Tag keyword
   */
  test('TC-SEARCH-FREE-006: Tìm kiếm bằng Popular Tag keyword', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    let firstTagText = '';
    await test.step('Lấy Popular Tag đầu tiên và chuyển đến trang kết quả', async () => {
      await expect(homePage.popularTags.first()).toBeVisible({ timeout: 10_000 });
      firstTagText = (await homePage.popularTags.first().innerText()).trim();
      await homePage.clickPopularTag(firstTagText);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step(`Verify URL và heading chứa Popular Tag "${firstTagText}"`, async () => {
      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(firstTagText)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${firstTagText}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  // NHÓM 2: BỘ LỌC ĐƠN LẺ TRÊN TOOLBAR
  /**
   * TC-SEARCH-FREE-007: Filter Chiều ảnh
   */
  test('TC-SEARCH-FREE-007: Lọc và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長)', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'cat';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc theo Chiều dọc (縦長) và verify URL, badge hiển thị', async () => {
      await searchResultPage.selectOrientation('vertical');
      await expect(page).toHaveURL(/orientation=0/);
      await expect(searchResultPage.getActiveFilterBadge('縦長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều dọc phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-縦長');
    });

    await test.step('Chuyển đổi sang Chiều ngang (横長) và verify URL, badge cập nhật tương ứng', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-横長');
    });
  });

  /**
   * TC-SEARCH-FREE-008: Filter Định dạng ảnh PSD
   */
  test('TC-SEARCH-FREE-008: Lọc định dạng ảnh PSD', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc theo định dạng ảnh PSD và verify kết quả hiển thị', async () => {
      await searchResultPage.selectPsdFormat();
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(searchResultPage.getActiveFilterBadge('PSD形式ファイル')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-009: Filter Kích thước ảnh
   */
  test('TC-SEARCH-FREE-009: Lọc và chuyển đổi Kích thước ảnh (M / L)', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'sky';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc theo kích thước M (Mサイズ以上) và verify kết quả', async () => {
      await searchResultPage.selectSize('m');
      await expect(page).toHaveURL(/sizesec=m/);
      await expect(searchResultPage.getActiveFilterBadge('Mサイズ以上がある')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-Mサイズ以上がある');
    });

    await test.step('Chuyển đổi sang kích thước L (Lサイズ) và verify kết quả', async () => {
      await searchResultPage.selectSize('l');
      await expect(page).toHaveURL(/sizesec=l/);
      await expect(searchResultPage.getActiveFilterBadge('Lサイズがある')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-Lサイズ以上がある');
    });
  });

  /**
   * TC-SEARCH-FREE-010: Filter Danh mục ảnh
   */
  test('TC-SEARCH-FREE-010: Lọc ảnh theo Danh mục (人物)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc ảnh theo Danh mục (人物) và verify kết quả hiển thị', async () => {
      await searchResultPage.selectCategoryFromToolbar('人物');
      await expect(page).toHaveURL(/c_names.*=1|c_id=1/);
      await expect(searchResultPage.getActiveFilterBadge('人物')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-011: Filter Màu sắc
   */
  test('TC-SEARCH-FREE-011: Lọc ảnh theo Màu sắc (青 / Blue)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc ảnh theo Màu sắc (青 / Blue) và verify kết quả hiển thị', async () => {
      await searchResultPage.selectColor('blue');
      await expect(page).toHaveURL(/color=0000d6/);
      await expect(searchResultPage.getActiveColorBadge('0000d6')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-012: Filter Số lượng người mẫu
   */
  test('TC-SEARCH-FREE-012: Lọc và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người)', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'ビジネス';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc ảnh Không có người (無人 / model_count=0) và verify kết quả', async () => {
      await searchResultPage.selectModelCount('0');
      await expect(page).toHaveURL(/model_count=0/);
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc không người phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-無人');
    });

    await test.step('Chuyển đổi sang ảnh có 1 người mẫu (1人 / model_count=1) và verify kết quả', async () => {
      await searchResultPage.selectModelCount('1');
      await expect(page).toHaveURL(/model_count=1/);
      await expect(searchResultPage.getActiveFilterBadge('1人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc 1 người phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-1人');
    });

    await test.step('Chuyển đổi sang ảnh có từ 3 người mẫu trở lên (3人以上 / model_count=3) và verify kết quả', async () => {
      await searchResultPage.selectModelCount('3');
      await expect(page).toHaveURL(/model_count=3/);
      await expect(searchResultPage.getActiveFilterBadge('3人以上')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc 3 người trở lên phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-3人以上');
    });
  });

  /**
   * TC-SEARCH-FREE-013: Filter người mẫu theo Độ tuổi (若者)
   */
  test('TC-SEARCH-FREE-013: Lọc người mẫu theo Độ tuổi (若者)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc người mẫu theo Độ tuổi (若者) và verify kết quả hiển thị', async () => {
      await searchResultPage.selectAge('young');
      await expect(page).toHaveURL(/age=W/);
      await expect(searchResultPage.getActiveFilterBadge('若者')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-014: Filter Giấy phép người mẫu (Model Release)
   */
  test('TC-SEARCH-FREE-014: Lọc ảnh có Giấy phép người mẫu (取得済のみ)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'ビジネス';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc ảnh có Giấy phép người mẫu (取得済のみ) và verify kết quả hiển thị', async () => {
      await searchResultPage.selectModelRelease(true);
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-015: Filter Giấy phép tài sản (Property Release)
   */
  test('TC-SEARCH-FREE-015: Lọc ảnh có Giấy phép tài sản (取得済のみ)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '東京';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc ảnh có Giấy phép tài sản (取得済のみ) và verify kết quả hiển thị', async () => {
      await searchResultPage.selectPropertyRelease(true);
      await expect(page).toHaveURL(/prprlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-016: Filter Loại trừ ảnh do AI tạo
   */
  test('TC-SEARCH-FREE-016: Lọc loại trừ ảnh do AI tạo', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '猫';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc loại trừ ảnh do AI tạo và verify kết quả hiển thị', async () => {
      await searchResultPage.toggleExcludeAi(true);
      await expect(page).toHaveURL(/exclude_ai=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-017: Filter Tìm kiếm khớp chính xác (完全一致)
   */
  test('TC-SEARCH-FREE-017: Lọc tìm kiếm khớp chính xác (完全一致)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'ビジネス スーツ';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc tìm kiếm khớp chính xác (完全一致) và verify kết quả hiển thị', async () => {
      await searchResultPage.toggleExactMatch(true);
      await expect(page).toHaveURL(/type_search=phrase/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // NHÓM 3: BỘ LỌC CHI TIẾT (詳細検索) & KẾT HỢP
  /**
   * TC-SEARCH-FREE-018: Filter Từ khóa loại trừ
   */
  test('TC-SEARCH-FREE-018: Lọc theo Từ khóa loại trừ (除外キーワード)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '猫';
    const excludeKeyword = '子猫';

    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step(`Lọc theo Từ khóa loại trừ "${excludeKeyword}" và verify kết quả hiển thị`, async () => {
      await searchResultPage.applyExcludeKeyword(excludeKeyword);
      await expect(page).toHaveURL(new RegExp(`nq=${encodeURIComponent(excludeKeyword)}`));
      await expect(searchResultPage.getActiveFilterBadge(excludeKeyword)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-019: Filter theo Tác giả
   */
  test('TC-SEARCH-FREE-019: Lọc ảnh theo Tác giả (Acworks)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '空';
    const creatorName = 'Acworks';

    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step(`Lọc ảnh theo Tác giả "${creatorName}" và verify kết quả hiển thị`, async () => {
      await searchResultPage.searchByDetailedCreator(creatorName);
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`, 'i'));
      await expect(searchResultPage.getActiveFilterBadge(creatorName)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo tác giả phải trả về danh sách ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-020: Filter loại trừ Tác giả
   */
  test('TC-SEARCH-FREE-020: Lọc ảnh loại trừ Tác giả (Acworks)', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '空';
    const excludeCreatorName = 'Acworks';

    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step(`Lọc ảnh loại trừ Tác giả "${excludeCreatorName}" và verify kết quả hiển thị`, async () => {
      await searchResultPage.searchByDetailedNgCreator(excludeCreatorName);
      await expect(page).toHaveURL(new RegExp(`ngcreator=${excludeCreatorName}`, 'i'));
      await expect(searchResultPage.activeFilterBadges.filter({ hasText: excludeCreatorName })).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        await expect(searchResultPage.resultItems.first()).toBeVisible();
      }
    });
  });

  /**
   * TC-SEARCH-FREE-021: Filter theo mã ID
   */
  test('TC-SEARCH-FREE-021: Lọc ảnh theo mã ID', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const photoId = '24330999';

    await test.step('Tìm kiếm từ khóa "桜" và chuyển đến trang kết quả', async () => {
      await homePage.search('桜');
      await searchResultPage.waitForResultDisplay();
    });

    await test.step(`Lọc ảnh theo mã ID "${photoId}" và verify kết quả hiển thị`, async () => {
      await searchResultPage.filterByDetailedPhotoId(photoId);
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
      await expect(searchResultPage.getActiveFilterBadge(photoId)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm kiếm theo photo ID phải có ít nhất 1 ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-022: Kết hợp Từ khóa + 2 người mẫu + Model Release
   */
  test('TC-SEARCH-FREE-022: Kết hợp từ khóa, 2 người mẫu và Model Release', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(120_000);
    const keyword = 'ビジネス';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Chọn số lượng người mẫu: 2人 trên toolbar', async () => {
      await searchResultPage.selectModelCount('2');
      await expect(page).toHaveURL(/model_count=2/);
      await expect(searchResultPage.getActiveFilterBadge('2人')).toBeVisible();

      await captureEvidenceWithUrl(page, testInfo, 'Filter-2人');
    });

    await test.step('Tích chọn Model Release: 取得済のみ trên toolbar', async () => {
      await searchResultPage.selectModelRelease(true);
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết hợp 2 điều kiện phải trả về kết quả ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-2人-ModelRelease');
    });
  });

  /**
   * TC-SEARCH-FREE-023: Kết hợp đa bộ lọc (Chiều ngang + Không người + Loại trừ AI)
   */
  test('TC-SEARCH-FREE-023: Kết hợp đa bộ lọc (Chiều ngang, Không người mẫu, Loại trừ AI)', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(120_000);
    const keyword = 'オフィス';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Lọc theo Chiều ngang (横長)', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
    });

    await test.step('Lọc theo Không có người (無人)', async () => {
      await searchResultPage.selectModelCount('0');
      await expect(page).toHaveURL(/model_count=0/);
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
    });

    await test.step('Bật bộ lọc Loại trừ AI (AI生成を除く)', async () => {
      await searchResultPage.toggleExcludeAi(true);
      await expect(page).toHaveURL(/exclude_ai=on/);
    });

    await test.step('Verify đồng thời cả 3 bộ lọc đang hoạt động và danh sách kết quả hiển thị', async () => {
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết hợp 3 bộ lọc phải trả về danh sách ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-横長-無人-ExcludeAI');
    });
  });

  // NHÓM 4: CÁC PHƯƠNG THỨC TÌM KIẾM NÂNG CAO
  /**
   * TC-SEARCH-FREE-024: Tải ảnh lên tìm kiếm tương đồng
   */
  test('TC-SEARCH-FREE-024: Tải ảnh lên tìm kiếm tương đồng', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await test.step('Tải ảnh lên tìm kiếm tương đồng và đợi kết quả hiển thị', async () => {
      await homePage.uploadImageForSearch(sampleImagePath);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify điều hướng đến trang kết quả tìm kiếm bằng hình ảnh', async () => {
      await expect(page).toHaveURL(/\/search\/ris/i);
      await expect(searchResultPage.resultHeading).toContainText('アップロードされた画像に似ている写真素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Phải có hình ảnh tương đồng được hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-025: Recommended Search và phân trang
   */
  test('TC-SEARCH-FREE-025: Recommended Search và phân trang', async ({
    page,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    await test.step('Truy cập trang Recommended Search và verify danh sách ảnh hiển thị', async () => {
      await searchResultPage.goToRecommendedSearch();
      await expect(page).toHaveURL(/rcm=1/);
      await expect(searchResultPage.resultHeading).toContainText('「おすすめ」の写真素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Recommended Search phải hiển thị danh sách ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Recommended-Page-1');
    });

    await test.step('Chuyển sang trang 2 và verify bảo toàn tham số rcm=1', async () => {
      await expect(searchResultPage.paginationContainer).toBeVisible();
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');

      await captureEvidenceWithUrl(page, testInfo, 'Recommended-Page-2');
    });
  });

  /**
   * TC-SEARCH-FREE-026: PSD Format Search và phân trang
   */
  test('TC-SEARCH-FREE-026: PSD Format Search và phân trang', async ({
    page,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    await test.step('Truy cập trang PSD Format Search và verify danh sách ảnh hiển thị', async () => {
      await searchResultPage.goToPsdSearch();
      await expect(searchResultPage.resultHeading).toContainText('PSD素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang phải có ít nhất 1 ảnh hiển thị').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'PSD-Search-Page-1');
    });

    await test.step('Chuyển sang trang 2 và verify bảo toàn tham số sizesec=psd', async () => {
      await expect(searchResultPage.paginationContainer).toBeVisible();
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');

      await captureEvidenceWithUrl(page, testInfo, 'PSD-Search-Page-2');
    });
  });

  /**
   * TC-SEARCH-FREE-027: Tìm kiếm bằng AI Face từ trang Detail
   */
  test('TC-SEARCH-FREE-027: Tìm kiếm bằng AI Face từ trang Detail', async ({
    page,
    searchResultPage,
    photoDetailPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const photoId = '35133353';

    await test.step(`Truy cập trang chi tiết ảnh photo ID: ${photoId}`, async () => {
      await photoDetailPage.goToPhotoDetail(photoId);
    });

    await test.step('Click vào thumbnail khuôn mặt AI tại mục "AIで同じモデルの写真を探す"', async () => {
      await photoDetailPage.clickAiFaceThumbnail(0);
    });

    await test.step('Verify URL chứa tham số vector_face và danh sách ảnh kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/vector_face=/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm theo khuôn mặt AI phải trả về ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();

      await captureEvidenceWithUrl(page, testInfo, 'AI-Search-Page-1');
    });

    await test.step('Chuyển sang trang 2 và verify dữ liệu AI Face vẫn được giữ nguyên', async () => {
      if (await searchResultPage.paginationContainer.isVisible().catch(() => false)) {
        await searchResultPage.goToNextPage();
        await expect(page).toHaveURL(/vector_face=/);
        await expect(page).toHaveURL(/p=2/);
        expect(await searchResultPage.getActivePageNumber()).toBe('2');

        await captureEvidenceWithUrl(page, testInfo, 'AI-Search-Page-2');
      }
    });
  });

  /**
   * TC-SEARCH-FREE-028: Kiểm tra trang Trends hiển thị danh sách ảnh
   */
  test('TC-SEARCH-FREE-028: Kiểm tra trang Trends hiển thị danh sách ảnh', async ({
    page,
    searchResultPage,
    trendsPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    await test.step('Truy cập trang Trends (人気の写真素材) và verify danh sách ảnh mặc định', async () => {
      await trendsPage.goToTrendsPage();
      await expect(trendsPage.resultHeading).toBeVisible();
      await expect(trendsPage.resultHeading).toHaveText('人気の写真素材');

      await expect(trendsPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await trendsPage.getResultCount();
      expect(count, 'Trang Trends mặc định phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(count, 'Trang Trends không vượt quá 70 ảnh').toBeLessThanOrEqual(70);

      await captureEvidenceWithUrl(page, testInfo, 'Trends-Default-Ranking');
    });

    await test.step('Thay đổi sắp xếp sang "新着順" (Newest) và verify URL cập nhật', async () => {
      await trendsPage.selectSort('-releasedate');
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(trendsPage.resultItems.first()).toBeVisible({ timeout: 10_000 });

      await captureEvidenceWithUrl(page, testInfo, 'Trends-Sort-新着順');
    });

    await test.step('Chuyển sang Trang 2 và verify bảo toàn tham số srt, referer, p=2', async () => {
      await expect(trendsPage.paginationContainer).toBeVisible();
      await trendsPage.goToNextPage();

      await expect(page).toHaveURL(/p=2/);
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/referer=more_ranking/);
      expect(await trendsPage.getActivePageNumber()).toBe('2');

      const countPage2 = await trendsPage.getResultCount();
      expect(countPage2, 'Trang 2 của Trends phải tiếp tục có ảnh hiển thị').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Trends-Page-2');
    });

    await test.step('Verify search tại trendsPage hoạt động bình thường', async () => {
      const searchKeyword = 'ビジネス';
      await trendsPage.searchAgain(searchKeyword);

      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(searchKeyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${searchKeyword}」の写真素材`);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Trends-Search-Result');
    });
  });

  // NHÓM 5: SẮP XẾP & PHÂN TRANG KẾT QUẢ
  /**
   * TC-SEARCH-FREE-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2
   */
  test('TC-SEARCH-FREE-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'cat';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Sắp xếp theo "新着順" (Mới nhất) và verify URL, kết quả hiển thị', async () => {
      await searchResultPage.selectNewestSort();
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sắp xếp mới nhất phải có ảnh hiển thị').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Sort-新着順');
    });

    await test.step('Chuyển sang Trang 2 và verify trạng thái sắp xếp "新着順" được giữ nguyên', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Sort-新着順-Page-2');
    });

    await test.step('Khôi phục lại sắp xếp mặc định "関連性の高い順"', async () => {
      await searchResultPage.selectRelevanceSort();
      await expect(page).not.toHaveURL(/srt=-releasedate/);
    });
  });

  // NHÓM 7: POPUP, PHÂN TRANG & TÍNH NĂNG NÂNG CAO THEO ROLE
  /**
   * TC-SEARCH-FREE-030: Chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium
   */
  test('TC-SEARCH-FREE-030: Chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await test.step('Tìm kiếm từ khóa "cat" và chuyển đến trang kết quả', async () => {
      await homePage.search('cat');
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Click vào sắp xếp "人気順" và verify popover nâng cấp Premium hiển thị', async () => {
      await searchResultPage.clickPopularSort();
      await expect(searchResultPage.popularSortPopover).toBeVisible();
      const popoverText = await searchResultPage.getPopularSortPopoverText();
      expect(popoverText).toContain('プレミアム会員になると、人気順での並び替えができます。');

      await captureEvidenceWithUrl(page, testInfo, 'Sort-Popular-Popover-Blocked');
    });

    await test.step('Verify URL không bị đổi sang srt=recent_popular', async () => {
      expect(page.url()).not.toContain('srt=recent_popular');
    });
  });

  /**
   * TC-SEARCH-FREE-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang
   */
  test('TC-SEARCH-FREE-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'cat';
    await test.step(`Tìm kiếm từ khóa "${keyword}" và chuyển đến trang kết quả`, async () => {
      await homePage.search(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify menu "表示件数" có radio 70件 được check mặc định và đếm số lượng trang 1', async () => {
      await searchResultPage.openSortDropdown();
      await expect(searchResultPage.displayCount70Radio).toBeChecked();
      await expect(searchResultPage.sortDropdownButton).toContainText('70件表示');
      await searchResultPage.clickElement(searchResultPage.sortDropdownButton);
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage1, 'Trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);

      await captureEvidenceWithUrl(page, testInfo, 'Default-70-items-p1');
    });

    await test.step('Click nút Next và verify sang trang 2 tiếp tục hiển thị tối đa 70 ảnh', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage2, 'Trang 2 không được vượt quá 70 ảnh').toBeLessThanOrEqual(70);

      await captureEvidenceWithUrl(page, testInfo, 'Default-70-items-p2');
    });

    await test.step('Click nút Prev và verify quay lại trang 1', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${keyword}`));
      expect(page.url()).not.toContain('p=2');
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countBackToPage1 = await searchResultPage.getResultCount();
      expect(countBackToPage1, 'Quay lại trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countBackToPage1, 'Quay lại trang 1 không được vượt quá 70 ảnh').toBeLessThanOrEqual(70);

      await captureEvidenceWithUrl(page, testInfo, 'Default-70-items-back-p1');
    });
  });

  /**
   * TC-SEARCH-FREE-032: Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm
   */
  test('TC-SEARCH-FREE-032: Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await test.step('Giả lập chạm giới hạn lượt tìm kiếm (search_zancnt = 0) và tìm kiếm từ khóa "山"', async () => {
      await page.route('**/ajax/public/is_enable_search', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            status: 'error',
            message: 'Daily search limit reached',
            data: { search_zancnt: 0 },
          }),
        });
      });
      await homePage.search('山');
    });

    await test.step('Verify Modal giới hạn tìm kiếm hiển thị cho Free User', async () => {
      await searchResultPage.waitForSearchLimitModal();
      await expect(searchResultPage.searchLimitTitle).toContainText('無料のキーワード検索は「1日4回」までです。');

      // Free user: KHÔNG có mục nhận 15pt
      await expect(searchResultPage.searchLimitRegisterCta).toBeHidden();

      // Có nút dùng vé coupon 1 ngày
      await expect(searchResultPage.searchLimitCouponButton).toBeVisible();

      // Có link nâng cấp Premium
      await expect(searchResultPage.searchLimitPremiumLink).toBeVisible();

      await captureEvidenceWithUrl(page, testInfo, 'FreeUser-Search-Limit-Modal');
    });

    await test.step('Verify click nút Premium mở tab mới điều hướng tới trang Premium', async () => {
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        searchResultPage.clickSearchLimitPremiumLink(),
      ]);

      await expect(newPage).toHaveURL(new RegExp('/premium'));
      await captureEvidenceWithUrl(newPage, testInfo, 'FreeUser-Search-Limit-Premium-Page');
      await newPage.close();
    });

    await test.step('Verify click nút "一日検索し放題券を使う" mở dialog coupon và có thể quay lại', async () => {
      await searchResultPage.openSearchLimitCouponDialog();
      await expect(searchResultPage.searchLimitCouponBackButton).toBeVisible();

      await captureEvidenceWithUrl(page, testInfo, 'FreeUser-Search-Limit-Coupon-Dialog');

      // Click nút "戻る" để hoàn tất luồng và khôi phục trạng thái modal ban đầu
      await searchResultPage.backFromCouponDialog();
      await expect(searchResultPage.searchLimitCouponButton).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-FREE-033: Verify Toggle AI Search KHÔNG hiển thị
   */
  test('TC-SEARCH-FREE-033: Verify Toggle AI Search KHÔNG hiển thị', async ({
    homePage,
  }) => {
    await test.step('Verify nút AI Search KHÔNG xuất hiện trên Top Page của Free User', async () => {
      await expect(homePage.searchByAiButton).toBeHidden();
    });

    await test.step('Verify input hidden by_ai không tồn tại hoặc có giá trị 0', async () => {
      const hasInput = await homePage.byAiInput.count();
      if (hasInput > 0) {
        await expect(homePage.byAiInput).toHaveValue('0');
      }
    });
  });

  /**
   * TC-SEARCH-FREE-034: Thanh tìm kiếm cố định (Sticky Header Search) hiển thị khi cuộn
   */
  test('TC-SEARCH-FREE-034: Hiển thị và ẩn thanh tìm kiếm cố định (Sticky Header) khi cuộn trang', async ({
    page,
    homePage,
  }, testInfo) => {
    await test.step('Verify thanh Sticky Search Bar ban đầu ở đầu trang bị ẩn', async () => {
      await expect(homePage.stickySearchArea).toBeHidden();
      await captureEvidenceWithUrl(page, testInfo, 'Sticky-Search-Hidden');
    });

    await test.step('Cuộn trang xuống dưới và verify Sticky Search Bar hiển thị', async () => {
      await homePage.scrollToActivateStickySearch(800);
      await expect(homePage.stickySearchArea).toBeVisible();
      await expect(homePage.stickySearchInput).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Sticky-Search-Shown');
    });

    await test.step('Cuộn trang ngược lên đỉnh và verify Sticky Search Bar tự động ẩn đi', async () => {
      await homePage.scrollToTop();
      await expect(homePage.stickySearchArea).toBeHidden();
    });
  });

  /**
   * TC-SEARCH-FREE-035: Tìm kiếm thành công từ Sticky Header Search Bar
   */
  test('TC-SEARCH-FREE-035: Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'ビジネス';

    await test.step('Cuộn trang xuống để kích hoạt thanh Sticky Search Bar', async () => {
      await homePage.scrollToActivateStickySearch(800);
      await expect(homePage.stickySearchArea).toBeVisible();
      await expect(homePage.stickySearchInput).toBeVisible();
    });

    await test.step(`Nhập từ khóa "${keyword}" vào Sticky Search Bar và submit tìm kiếm`, async () => {
      await homePage.searchViaStickyBar(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify trang kết quả tìm kiếm hiển thị chính xác từ khóa và danh sách ảnh', async () => {
      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(keyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);

      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-036: Chuyển hướng tới trang chi tiết khi click ảnh
   */
  test('TC-SEARCH-FREE-036: Chuyển hướng tới trang chi tiết khi click ảnh', async ({
    page,
    searchResultPage,
  }, testInfo) => {
    await test.step('Truy cập trang tìm kiếm với từ khóa "秋" và lọc creator=acworks, layout=vertical', async () => {
      await searchResultPage.navigate('/main/search?q=%E7%A7%8B&creator=acworks&layout=vertical');
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Click vào link chi tiết của ảnh đầu tiên trên trang search results', async () => {
      await searchResultPage.openDetailPageForItem(0);
    });

    await test.step('Verify chuyển hướng tới trang chi tiết (Details page) thành công', async () => {
      await page.waitForURL(new RegExp('/main/detail/\\d+'), { timeout: 15_000 });
      await expect(page).toHaveURL(new RegExp('/main/detail/\\d+'));
      await expect(page).toHaveTitle(new RegExp('- No: \\d+｜写真素材なら「写真AC」'));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10_000 });

      await captureEvidenceWithUrl(page, testInfo, 'FreeUser-Navigated-To-Details-Page');
    });
  });

  /**
   * TC-SEARCH-FREE-037: Click tác phẩm của các trang nhóm ở cuối trang
   */
  test('TC-SEARCH-FREE-037: Hiển thị popup tương ứng khi click tác phẩm của các trang nhóm', async ({
    page,
    searchResultPage,
  }, testInfo) => {
    await test.step('Truy cập trang tìm kiếm với từ khóa "秋" và lọc creator=acworks, layout=vertical', async () => {
      await searchResultPage.navigate('/main/search?q=%E7%A7%8B&creator=acworks&layout=vertical');
      await searchResultPage.waitForResultDisplay();
    });

    for (const site of GROUP_SITES) {
      await test.step(`Click vào tác phẩm ${site.name} -> Verify hiển thị popup thông báo và nút tải tương ứng`, async () => {
        await searchResultPage.clickGroupSiteItem(site.service, 0);

        await expect(searchResultPage.relatedSearchModal).toBeVisible({ timeout: 10_000 });
        await expect(searchResultPage.relatedModalNotice).toHaveText(site.expectedNotice);
        await expect(searchResultPage.relatedModalDownloadButton).toBeVisible();
        await expect(searchResultPage.relatedModalDownloadButton).toHaveAttribute('href', new RegExp(site.expectedDomain));

        await captureEvidenceWithUrl(page, testInfo, `FREE-GroupSite-${site.service}-Modal`);

        await searchResultPage.closeRelatedSearchModal();
      });
    }
  });

});
