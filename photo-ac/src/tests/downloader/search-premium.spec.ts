import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';
import { captureEvidenceWithUrl } from '../../utils/helpers';

/**
 * ============================================================================
 * TEST SUITE: SEARCH — PREMIUM USER
 * ============================================================================
 */
test.describe('Search — Premium User', () => {
  // Session Premium User được tự động inject bởi project cấu hình (chromium-premium / firefox-premium)

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ homePage }) => {
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

  // ============================================================================
  // NHÓM 1: TÌM KIẾM CƠ BẢN
  // ============================================================================

  /**
   * TC-SEARCH-PREM-001: Tìm kiếm với từ khóa hợp lệ
   * @tags @premium
   */
  test('TC-SEARCH-PREM-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả tìm kiếm cho Premium User', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(keyword)}`));
      await expect(searchResultPage.resultHeading).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
    });

    await test.step('Verify có ít nhất 1 ảnh hiển thị trong kết quả', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm phải có ít nhất 1 ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-PREM-002: Tìm kiếm với nhiều từ khóa kết hợp (Multi-keyword AND search)
   * @tags @premium
   */
  test('TC-SEARCH-PREM-002: Tìm kiếm nhiều từ khóa kết hợp (AND Search) @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const multiKeyword = 'ビジネス 女性';

    await homePage.search(multiKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading phản ánh cụm từ khóa tìm kiếm', async () => {
      await expect(page).toHaveURL(/\/main\/search\?/);
      await expect(searchResultPage.resultHeading).toContainText(`「${multiKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm kiếm kết hợp phải trả về kết quả').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-003: Tìm kiếm từ khóa không có kết quả
   * @tags @premium
   */
  test('TC-SEARCH-PREM-003: Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const nonExistentKeyword = `xyzqwer123456nonexistent_${Date.now()}`;

    await homePage.search(nonExistentKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL chứa từ khóa tìm kiếm', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(nonExistentKeyword)}`));
    });

    await test.step('Verify thông báo không tìm thấy kết quả hiển thị', async () => {
      await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Không được có ảnh nào hiển thị khi từ khóa không tồn tại').toBe(0);
    });
  });

  /**
   * TC-SEARCH-PREM-004: Xóa nhanh từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp từ trang kết quả
   * @tags @premium
   */
  test('TC-SEARCH-PREM-004: Xóa nhanh từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp từ trang kết quả @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const initialKeyword = 'cat';
    const newKeyword = 'dog';

    await homePage.search(initialKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify ô tìm kiếm hiển thị từ khóa ban đầu và nút Reset xuất hiện', async () => {
      await expect(searchResultPage.searchInput).toHaveValue(initialKeyword);
    });

    await test.step('Click nút Reset và verify ô tìm kiếm bị xóa rỗng', async () => {
      await searchResultPage.clickResetKeyword();
      await expect(searchResultPage.searchInput).toHaveValue('');
    });

    await test.step(`Thực hiện tìm kiếm từ khóa mới "${newKeyword}" từ trang kết quả`, async () => {
      await searchResultPage.searchAgain(newKeyword);
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(newKeyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${newKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-005: Tìm kiếm bằng Top Keyword
   * @tags @premium
   */
  test('TC-SEARCH-PREM-005: Tìm kiếm bằng Top Keyword @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const topKeywords = await homePage.getTopKeywords();
    expect(topKeywords.length, 'Phải có ít nhất 1 Top Keyword trên HomePage').toBeGreaterThan(0);

    const targetKeyword = topKeywords[0].trim();

    await homePage.clickTopKeyword(targetKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step(`Verify URL và heading phản ánh đúng Top Keyword "${targetKeyword}"`, async () => {
      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(targetKeyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-006: Tìm kiếm bằng Popular Tag keyword
   * @tags @premium
   */
  test('TC-SEARCH-PREM-006: Tìm kiếm bằng Popular Tag keyword @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await expect(homePage.popularTags.first()).toBeVisible({ timeout: 10_000 });
    const firstTagText = (await homePage.popularTags.first().innerText()).trim();

    await homePage.clickPopularTag(firstTagText);
    await searchResultPage.waitForResultDisplay();

    await test.step(`Verify URL và heading chứa Popular Tag "${firstTagText}"`, async () => {
      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(firstTagText)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${firstTagText}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 2: FILTER TOOLBAR - SINGLE FILTERS
  // ============================================================================

  /**
   * TC-SEARCH-PREM-007: Lọc ảnh theo Chiều dọc (縦長) và chuyển đổi sang Chiều ngang (横長) qua Toolbar
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-007: Filter và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長) qua Toolbar @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

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
   * TC-SEARCH-PREM-008: Filter định dạng ảnh PSD qua Toolbar "写真・イラスト・シルエット"
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-008: Filter định dạng ảnh PSD @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPsdFormat();

    await test.step('Verify URL cập nhật tham số sizesec=psd và badge hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(searchResultPage.getActiveFilterBadge('PSD形式ファイル')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-009: Filter và chuyển đổi Kích thước ảnh (M / L)
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-009: Filter và chuyển đổi Kích thước ảnh (M / L) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();

    await test.step('Lọc theo kích thước Mサイズ以上 và verify URL, badge hiển thị', async () => {
      await searchResultPage.selectSize('m');
      await expect(page).toHaveURL(/sizesec=m/);
      await expect(searchResultPage.getActiveFilterBadge('Mサイズ以上がある')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-Mサイズ以上がある');
    });

    await test.step('Chuyển đổi sang kích thước Lサイズ và verify URL, badge cập nhật tương ứng', async () => {
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
   * TC-SEARCH-PREM-010: Filter ảnh theo Danh mục (人物) qua Toolbar dropdown
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-010: Filter ảnh theo Danh mục (人物) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectCategoryFromToolbar('人物');

    await test.step('Verify URL cập nhật tham số danh mục c_names[]=1 hoặc c_id=1 và badge hiển thị', async () => {
      await expect(page).toHaveURL(/c_names.*=1|c_id=1/);
      await expect(searchResultPage.getActiveFilterBadge('人物')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-011: Filter ảnh theo Màu sắc (青 / Blue) qua Toolbar
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-011: Filter ảnh theo Màu sắc (青 / Blue) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectColor('blue');

    await test.step('Verify URL cập nhật tham số color=0000d6 và badge màu hiển thị', async () => {
      await expect(page).toHaveURL(/color=0000d6/);
      await expect(searchResultPage.getActiveColorBadge('0000d6')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-012: Filter và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người)
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-012: Filter và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    const keyword = 'ビジネス';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('1. Lọc ảnh Không có người (無人 / model_count=0) và verify kết quả', async () => {
      await searchResultPage.selectModelCount('0');
      await expect(page).toHaveURL(/model_count=0/);
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc không người phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-無人');
    });

    await test.step('2. Chuyển đổi sang ảnh có 1 người mẫu (1人 / model_count=1) và verify kết quả', async () => {
      await searchResultPage.selectModelCount('1');
      await expect(page).toHaveURL(/model_count=1/);
      await expect(searchResultPage.getActiveFilterBadge('1人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc 1 người phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-1人');
    });

    await test.step('3. Chuyển đổi sang ảnh có từ 3 người mẫu trở lên (3人以上 / model_count=3) và verify kết quả', async () => {
      await searchResultPage.selectModelCount('3');
      await expect(page).toHaveURL(/model_count=3/);
      await expect(searchResultPage.getActiveFilterBadge('3人以上')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc 3+ người phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-3人以上');
    });
  });

  /**
   * TC-SEARCH-PREM-013: Filter người mẫu theo Độ tuổi (若者 / age=W) qua Toolbar "モデル年代"
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-013: Filter người mẫu theo Độ tuổi (若者) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectAge('young');

    await test.step('Verify URL cập nhật tham số age=W và badge hiển thị', async () => {
      await expect(page).toHaveURL(/age=W/);
      await expect(searchResultPage.getActiveFilterBadge('若者')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-014: Filter ảnh có Giấy phép người mẫu (取得済のみ / mdlrlrsec=on) qua menu Display Conditions
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-014: Filter ảnh có Giấy phép người mẫu (取得済のみ) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('女性');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectModelRelease(true);

    await test.step('Verify URL cập nhật tham số mdlrlrsec=on và badge hiển thị', async () => {
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-015: Filter ảnh có Giấy phép tài sản (取得済のみ / prprlrsec=on) qua menu Display Conditions
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-015: Filter ảnh có Giấy phép tài sản (取得済のみ) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('建物');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPropertyRelease(true);

    await test.step('Verify URL cập nhật tham số prprlrsec=on và badge hiển thị', async () => {
      await expect(page).toHaveURL(/prprlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-016: Filter Loại trừ ảnh do AI tạo (exclude_ai=on)
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-016: Filter Loại trừ ảnh do AI tạo @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('猫');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.toggleExcludeAi(true);

    await test.step('Verify URL cập nhật tham số exclude_ai=on', async () => {
      await expect(page).toHaveURL(/exclude_ai=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-017: Filter bật bộ lọc Tìm kiếm khớp chính xác (完全一致)
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-017: Filter bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('ビジネス スーツ');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.toggleExactMatch(true);

    await test.step('Verify URL cập nhật tham số type_search=phrase và badge hiển thị', async () => {
      await expect(page).toHaveURL(/type_search=phrase/);
      await expect(searchResultPage.getActiveFilterBadge('完全一致')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-018: Filter theo Từ khóa loại trừ (除外キーワード)
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-018: Filter theo Từ khóa loại trừ (除外キーワード) @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const baseKeyword = '猫';
    const excludeKeyword = '子猫';

    await homePage.search(baseKeyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.applyExcludeKeyword(excludeKeyword);

    await test.step(`Verify URL cập nhật nq=${encodeURIComponent(excludeKeyword)} và badge hiển thị`, async () => {
      await expect(page).toHaveURL(new RegExp(`nq=${encodeURIComponent(excludeKeyword)}`));
      await expect(searchResultPage.getActiveFilterBadge(excludeKeyword)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-019: Filter ảnh theo Tác giả (Acworks) qua menu (詳細検索) Toolbar
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-019: Filter ảnh theo Tác giả (Acworks) qua menu (詳細検索) Toolbar @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const creatorName = 'Acworks';

    await homePage.search('空');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.searchByDetailedCreator(creatorName);

    await test.step(`Verify URL chứa creator=${creatorName} và badge hiển thị`, async () => {
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`));
      await expect(searchResultPage.getActiveFilterBadge(creatorName)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-020: Filter ảnh loại trừ Tác giả (Acworks) qua menu (詳細検索) Toolbar
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-020: Filter ảnh loại trừ Tác giả (Acworks) qua menu (詳細検索) Toolbar @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const excludeCreatorName = 'Acworks';

    await homePage.search('空');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.searchByDetailedNgCreator(excludeCreatorName);

    await test.step(`Verify URL chứa ngcreator=${excludeCreatorName} và badge hiển thị`, async () => {
      await expect(page).toHaveURL(new RegExp(`ngcreator=${excludeCreatorName}`));
      await expect(searchResultPage.activeFilterBadges.filter({ hasText: excludeCreatorName })).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-021: Filter ảnh theo mã ID qua menu (詳細検索)
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-021: Filter ảnh theo mã ID @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const targetPhotoId = '24330999';

    await homePage.search('桜');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.filterByDetailedPhotoId(targetPhotoId);

    await test.step(`Verify URL cập nhật qid=${targetPhotoId} và badge hiển thị`, async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${targetPhotoId}`));
      await expect(searchResultPage.getActiveFilterBadge(targetPhotoId)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI
  // ============================================================================

  /**
   * TC-SEARCH-PREM-022: Kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-022: Kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'ビジネス';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectModelCount('2');
    await expect(page).toHaveURL(/model_count=2/);

    await searchResultPage.selectModelRelease(true);
    await expect(page).toHaveURL(/mdlrlrsec=on/);

    await test.step('Verify đồng thời cả 2 filter badges hiển thị trên UI', async () => {
      await expect(searchResultPage.getActiveFilterBadge('2人')).toBeVisible();
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết hợp 2 điều kiện phải trả về kết quả ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-023: Kết hợp đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar
   * @tags @premium @filter
   */
  test('TC-SEARCH-PREM-023: Kết hợp đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'オフィス';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectOrientation('horizontal');
    await expect(page).toHaveURL(/orientation=1/);

    await searchResultPage.selectModelCount('0');
    await expect(page).toHaveURL(/model_count=0/);

    await searchResultPage.toggleExcludeAi(true);
    await expect(page).toHaveURL(/exclude_ai=on/);

    await test.step('Verify các filter badges hiển thị trên UI và danh sách ảnh trả về', async () => {
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết hợp 3 bộ lọc phải trả về danh sách ảnh').toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT
  // ============================================================================

  /**
   * TC-SEARCH-PREM-024: Tải ảnh lên tìm kiếm tương đồng (Image Search Upload)
   * @tags @premium
   */
  test('TC-SEARCH-PREM-024: Tải ảnh lên tìm kiếm tương đồng @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);

    await homePage.uploadImageForSearch(sampleImagePath);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL chuyển hướng đến trang kết quả tìm kiếm bằng hình ảnh (/search/ris)', async () => {
      await expect(page).toHaveURL(/\/search\/ris/i);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm kiếm bằng hình ảnh phải hiển thị kết quả tương đồng').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-025: Recommended Search và phân trang
   * @tags @premium
   */
  test('TC-SEARCH-PREM-025: Recommended Search và phân trang @premium', async ({
    page,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await searchResultPage.goToRecommendedSearch();
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL ban đầu chứa tham số rcm=1', async () => {
      await expect(page).toHaveURL(/rcm=1/);
      await expect(searchResultPage.resultHeading).toContainText('「おすすめ」の写真素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Recommended Search phải hiển thị danh sách ảnh').toBeGreaterThan(0);
    });

    await test.step('Chuyển sang trang 2 và verify bảo toàn tham số rcm=1', async () => {
      await expect(searchResultPage.paginationContainer).toBeVisible();
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
    });
  });

  /**
   * TC-SEARCH-PREM-026: PSD Format Search và phân trang
   * @tags @premium
   */
  test('TC-SEARCH-PREM-026: PSD Format Search và phân trang @premium', async ({
    page,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await searchResultPage.goToPsdSearch();
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL ban đầu chứa tham số sizesec=psd', async () => {
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(searchResultPage.resultHeading).toContainText('PSD素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'PSD Format Search phải hiển thị danh sách ảnh').toBeGreaterThan(0);
    });

    await test.step('Chuyển sang trang 2 và verify bảo toàn tham số sizesec=psd', async () => {
      await expect(searchResultPage.paginationContainer).toBeVisible();
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
    });
  });

  /**
   * TC-SEARCH-PREM-027: Tìm kiếm bằng AI Face từ trang Detail
   * @tags @premium
   */
  test('TC-SEARCH-PREM-027: Tìm kiếm bằng AI Face từ trang Detail @premium', async ({
    page,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);

    const photoId = '35133353';
    await searchResultPage.goToPhotoDetail(photoId);

    await test.step('Click vào thumbnail khuôn mặt AI tại mục "AIで同じモデルの写真を探す"', async () => {
      await searchResultPage.clickAiFaceThumbnail(0);
    });

    await test.step('Verify URL chứa tham số vector_face và danh sách ảnh kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/vector_face=/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm theo khuôn mặt AI phải trả về ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });

    await test.step('Chuyển sang trang 2 và verify dữ liệu AI Face vẫn được giữ nguyên', async () => {
      if (await searchResultPage.paginationContainer.isVisible().catch(() => false)) {
        await searchResultPage.goToNextPage();
        await expect(page).toHaveURL(/vector_face=/);
        await expect(page).toHaveURL(/p=2/);
        expect(await searchResultPage.getActivePageNumber()).toBe('2');
      }
    });
  });

  /**
   * TC-SEARCH-PREM-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang
   * @tags @premium
   */
  test('TC-SEARCH-PREM-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang @premium', async ({
    page,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await searchResultPage.goToTrendsPage();

    await test.step('1. Verify tiêu đề H1 và danh sách ảnh mặc định của trang Trends', async () => {
      await expect(searchResultPage.resultHeading).toBeVisible();
      await expect(searchResultPage.resultHeading).toHaveText('人気の写真素材');

      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang Trends mặc định phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(count, 'Trang Trends không vượt quá 70 ảnh').toBeLessThanOrEqual(70);
    });

    await test.step('2. Thay đổi sắp xếp sang "新着順" (Newest) và verify URL cập nhật', async () => {
      await searchResultPage.selectTrendsSort('-releasedate');
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
    });

    await test.step('3. Chuyển sang Trang 2 và verify bảo toàn tham số srt, referer, p=2', async () => {
      await expect(searchResultPage.paginationContainer).toBeVisible();
      await searchResultPage.goToNextPage();

      await expect(page).toHaveURL(/p=2/);
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/referer=more_ranking/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');

      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 của Trends phải tiếp tục có ảnh hiển thị').toBeGreaterThan(0);
    });

    await test.step('4. Verify search tại trendsPage hoạt động bình thường', async () => {
      const searchKeyword = 'ビジネス';
      await searchResultPage.searchAgain(searchKeyword);

      await expect(page).toHaveURL(/\/main\/search/);
      await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(searchKeyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${searchKeyword}」の写真素材`);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 5: SẮP XẾP & PHÂN TRANG (SORT & PAGINATION)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2
   * @tags @premium
   */
  test('TC-SEARCH-PREM-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2 @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectNewestSort();

    await test.step('Verify URL cập nhật tham số srt=-releasedate trên Trang 1', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });

    await test.step('Chuyển sang Trang 2 và verify trạng thái sort vẫn giữ nguyên srt=-releasedate', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
    });
  });

  /**
   * TC-SEARCH-PREM-030: Sắp xếp theo "人気順" (Phổ biến) thành công không bị chặn bởi popover nâng cấp
   * Đặc quyền Premium: Cho phép sắp xếp theo độ phổ biến, URL cập nhật srt=recent_popular, KHÔNG bị popover chặn như Free/Guest.
   * @tags @premium
   */
  test('TC-SEARCH-PREM-030: Sắp xếp theo "人気順" (Phổ biến) thành công không bị chặn bởi popover nâng cấp @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPopularSort();

    await test.step('Verify URL cập nhật tham số srt=recent_popular', async () => {
      await expect(page).toHaveURL(/srt=recent_popular/);
    });

    await test.step('Verify popover chặn nâng cấp Premium KHÔNG xuất hiện đối với tài khoản Premium', async () => {
      await expect(searchResultPage.popularSortPopover).toBeHidden();
    });

    await test.step('Verify kết quả ảnh được hiển thị theo độ phổ biến', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sắp xếp phổ biến phải có ảnh hiển thị').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-PREM-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang
   * @tags @premium
   */
  test('TC-SEARCH-PREM-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await homePage.search('dog');
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify menu "表示件数" có radio 70件ずつ表示 được check default', async () => {
      await searchResultPage.openSortDropdown();
      await expect(searchResultPage.displayCount70Radio).toBeChecked();
      await expect(searchResultPage.sortDropdownButton).toContainText('70件表示');
      await searchResultPage.clickElement(searchResultPage.sortDropdownButton);
    });

    await test.step('Verify trang 1 hiển thị trong giới hạn tối đa 70 ảnh', async () => {
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage1, 'Trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });

    await test.step('Click nút Next và verify sang trang 2 tiếp tục hiển thị trong giới hạn tối đa 70 ảnh', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage2, 'Trang 2 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });

    await test.step('Click nút Prev và verify quay lại trang 1 linh hoạt', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/\/main\/search\?.*q=dog/);
      expect(page.url()).not.toContain('p=2');
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
    });
  });

  /**
   * TC-SEARCH-PREM-032: Kiểm tra tùy chọn hiển thị 210 ảnh/trang và giữ nguyên khi phân trang
   * Cả Guest, Free và Premium đều có thể lựa chọn 70, 140 hoặc 210 ảnh/trang không bị chặn.
   * @tags @premium
   */
  test('TC-SEARCH-PREM-032: Kiểm tra tùy chọn hiển thị 210 ảnh/trang và giữ nguyên khi phân trang @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(120_000);
    await homePage.search('dog');
    await searchResultPage.waitForResultDisplay();

    await test.step('Chủ động chọn hiển thị 210件ずつ表示 từ menu', async () => {
      await searchResultPage.selectDisplayCount('210');
      await expect(page).toHaveURL(/pp=210/);
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Số lượng ảnh hiển thị phải đạt 210 ảnh').toBe(210);
    });

    await test.step('Verify trang 2 tiếp tục giữ nguyên cấu hình pp=210 và hiển thị đủ 210 ảnh', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/pp=210/);
      await expect(page).toHaveURL(/p=2/);
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Số lượng ảnh trên trang 2 phải tiếp tục là 210 ảnh').toBe(210);
    });
  });

  // ============================================================================
  // NHÓM 6: PHÂN QUYỀN KHÔNG GIỚI HẠN & TÌM KIẾM BẰNG AI
  // ============================================================================

  /**
   * TC-SEARCH-PREM-033: Thực hiện tìm kiếm nhiều lần không bị giới hạn hạn mức tìm kiếm
   * Đặc quyền Premium: Không bị giới hạn 4 lần/ngày như Free/Guest, không xuất hiện modal #searchLimitModal.
   * @tags @premium
   */
  test('TC-SEARCH-PREM-033: Thực hiện tìm kiếm nhiều lần không bị giới hạn hạn mức tìm kiếm @premium', async ({
    homePage,
    searchResultPage,
  }) => {
    test.setTimeout(120_000);
    const keywords = ['桜', '学生', '景色', '山', '海'];

    for (const kw of keywords) {
      await test.step(`Tìm kiếm từ khóa liên tiếp: "${kw}"`, async () => {
        await homePage.search(kw);
        await searchResultPage.waitForResultDisplay();
        await expect(searchResultPage.searchLimitModal).toBeHidden();
        const count = await searchResultPage.getResultCount();
        expect(count, `Tìm kiếm "${kw}" phải trả về danh sách ảnh`).toBeGreaterThan(0);
      });
    }
  });

  /**
   * TC-SEARCH-PREM-034: Chủ động bật tính năng AI Search trên TopPage và tìm kiếm thành công
   * Đặc quyền Premium: Có quyền chủ động bật/tắt Toggle AI Search trên thanh tìm kiếm TopPage và tìm kiếm bằng câu tự nhiên.
   * @tags @premium
   */
  test('TC-SEARCH-PREM-034: Chủ động bật tính năng AI Search trên TopPage và tìm kiếm thành công @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const naturalQuery = 'オフィスでパソコンを開くビジネスマン';

    await test.step('Verify nút AI Search (.search-by-ai) hiển thị trên TopPage', async () => {
      await expect(homePage.searchByAiButton).toBeVisible();
    });

    await test.step('Bật tính năng tìm kiếm bằng AI trên TopPage', async () => {
      const isAiOn = await homePage.aiSearchOnIcon.isVisible().catch(() => false);
      if (!isAiOn) {
        await homePage.toggleAiSearch();
        await expect(homePage.aiSearchOnIcon).toBeVisible({ timeout: 5_000 });
      }
      await expect(homePage.byAiInput).toHaveValue('1');
    });

    await test.step('Nhập câu tìm kiếm tự nhiên và submit', async () => {
      await homePage.searchInput.fill(naturalQuery);
      await homePage.searchInput.press('Enter');
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify URL chứa tham số by_ai=1 và kết quả tìm kiếm AI hiển thị', async () => {
      await expect(page).toHaveURL(/by_ai=1/);
      await expect(searchResultPage.resultHeading).toContainText(`「${naturalQuery}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        await expect(searchResultPage.resultItems.first()).toBeVisible();
      } else {
        await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      }
    });

    await test.step('Chuyển sang trang 2 và verify kết quả AI Search vẫn được duy trì', async () => {
      if (await searchResultPage.paginationContainer.isVisible().catch(() => false)) {
        await searchResultPage.goToNextPage();
        await expect(page).toHaveURL(/by_ai=1/);
        await expect(page).toHaveURL(/p=2/);
      }
    });
  });

  // ============================================================================
  // NHÓM 7: THANH TÌM KIẾM CỐ ĐỊNH TRÊN HEADER (STICKY HEADER SEARCH BAR)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-035: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang
   * @tags @premium
   */
  test('TC-SEARCH-PREM-035: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang @premium', async ({
    page,
    homePage,
  }, testInfo) => {
    await test.step('Verify thanh Sticky Search Bar ban đầu ở đầu trang bị ẩn', async () => {
      await expect(homePage.stickySearchArea).toBeHidden();
    });

    await captureEvidenceWithUrl(page, testInfo, 'Sticky-Search-Hidden');

    await test.step('Cuộn trang xuống dưới và verify Sticky Search Bar hiển thị', async () => {
      await homePage.scrollToActivateStickySearch(800);
      await expect(homePage.stickySearchArea).toBeVisible();
      await expect(homePage.stickySearchInput).toBeVisible();
    });

    await captureEvidenceWithUrl(page, testInfo, 'Sticky-Search-Shown');

    await test.step('Cuộn trang ngược lên đỉnh và verify Sticky Search Bar tự động ẩn đi', async () => {
      await homePage.scrollToTop();
      await expect(homePage.stickySearchArea).toBeHidden();
    });
  });

  /**
   * TC-SEARCH-PREM-036: Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar
   * @tags @premium
   */
  test('TC-SEARCH-PREM-036: Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar @premium', async ({
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

      // Web-first auto-wait trước khi đếm theo Cross-browser rule
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });
});
