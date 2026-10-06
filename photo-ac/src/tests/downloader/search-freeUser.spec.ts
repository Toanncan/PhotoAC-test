import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';
import { captureEvidenceWithUrl, enableAdBlocker } from '../../utils/helpers';

/**
 * ============================================================================
 * TEST SUITE: SEARCH — FREE USER
 * ============================================================================
 */
test.describe('Search — Free User', () => {
  // Session Free User được tự động inject bởi project cấu hình (chromium-free-user / firefox-free-user)

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ page, homePage }) => {
    // Targeted Network Mocking: Luôn duy trì hạn mức tìm kiếm (search_zancnt: 4)
    // nhằm bảo vệ các test case bộ lọc/tìm kiếm thông thường không bị modal #searchLimitModal chặn ngang khi chạy cả suite.
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

  // ============================================================================
  // NHÓM 1: TÌM KIẾM CƠ BẢN
  // ============================================================================

  /**
   * TC-SEARCH-FREE-001: Tìm kiếm với từ khóa hợp lệ
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả tìm kiếm cho Free User', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(keyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
    });

    await test.step('Verify có ít nhất 1 thumbnail hiển thị', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm phải trả về ít nhất 1 ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-FREE-002: Tìm kiếm với nhiều từ khóa kết hợp (Multi-keyword AND search)
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-002: Tìm kiếm nhiều từ khóa kết hợp (AND Search) @free-user', async ({
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
   * TC-SEARCH-FREE-003: Tìm kiếm với từ khóa không tồn tại (Zero Results)
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-003: Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa @free-user', async ({
    homePage,
    searchResultPage,
  }) => {
    const nonexistentKeyword = 'xyz_nonexistent_photo_99999';

    await homePage.search(nonexistentKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify thông báo không có kết quả hiển thị trên màn hình người dùng', async () => {
      await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh hiển thị phải bằng 0').toBe(0);
    });
  });

  /**
   * TC-SEARCH-FREE-004: Xóa nhanh từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp trên trang kết quả (Search Again)
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-004: Xóa nhanh từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp từ trang kết quả @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const initialKeyword = 'cat';
    const newKeyword = 'dog';

    await homePage.search(initialKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify từ khóa hiển thị trong ô tìm kiếm và xóa bằng nút Reset', async () => {
      await expect(searchResultPage.searchInput).toHaveValue(initialKeyword);
      await searchResultPage.clickResetKeyword();
      await expect(searchResultPage.searchInput).toHaveValue('');
    });

    await test.step('Nhập từ khóa mới và tìm kiếm lại trực tiếp trên trang kết quả', async () => {
      await searchResultPage.searchAgain(newKeyword);
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${newKeyword}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${newKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm từ khóa mới phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-005: Tìm kiếm bằng Top Keyword dưới Search Bar
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-005: Tìm kiếm bằng Top Keyword @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await expect(homePage.topKeywords.first()).toBeVisible();
    const keywordList = await homePage.getTopKeywords();
    expect(keywordList.length, 'Phải có ít nhất 1 Top Keyword dưới search bar').toBeGreaterThan(0);

    const targetKeyword = keywordList[0].trim();
    await homePage.clickTopKeyword(targetKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả từ Top Keyword cho Free User', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(targetKeyword)}`));
      await expect(page).toHaveURL(/utm_source=top_keyword/);
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-006: Tìm kiếm bằng Popular Tag
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-006: Tìm kiếm bằng Popular Tag keyword @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await expect(homePage.popularTags.first()).toBeVisible();
    const firstTagText = (await homePage.popularTags.first().innerText()).trim();

    await homePage.clickPopularTag(firstTagText);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading phản ánh tag được chọn', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(firstTagText)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${firstTagText}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 2: FILTER TOOLBAR - SINGLE FILTERS
  // ============================================================================

  /**
   * TC-SEARCH-FREE-007: Lọc ảnh theo Chiều dọc (縦長) và chuyển đổi sang Chiều ngang (横長) qua Toolbar
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-007: Filter và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長) qua Toolbar @free-user @filter', async ({
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

      // Chụp lưu bằng chứng trạng thái Filter Dọc
      await captureEvidenceWithUrl(page, testInfo, 'Filter 縦長');
    });

    await test.step('Chuyển đổi sang Chiều ngang (横長) và verify URL, badge cập nhật tương ứng', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);

      // Chụp lưu bằng chứng trạng thái Filter Ngang
      await captureEvidenceWithUrl(page, testInfo, 'Filter 横長');
    });
  });

  /**
   * TC-SEARCH-FREE-008: Filter định dạng ảnh PSD qua Toolbar "ファイル・向き"
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-008: Filter định dạng ảnh PSD @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPsdFormat();

    await test.step('Verify URL chứa tham số sizesec=psd, badge hiển thị và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(searchResultPage.getActiveFilterBadge('PSD形式ファイル')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-009: Filter và chuyển đổi Kích thước ảnh (M / L) qua Toolbar "ファイル・向き"
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-009: Filter và chuyển đổi Kích thước ảnh (M / L) @free-user @filter', async ({
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

      // Chụp lưu bằng chứng trạng thái Filter Kích thước M
      await captureEvidenceWithUrl(page, testInfo, 'Filter Mサイズ以上がある');
    });

    await test.step('Chuyển đổi sang kích thước Lサイズ và verify URL, badge cập nhật tương ứng', async () => {
      await searchResultPage.selectSize('l');
      await expect(page).toHaveURL(/sizesec=l/);
      await expect(searchResultPage.getActiveFilterBadge('Lサイズがある')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      // Chụp lưu bằng chứng trạng thái Filter Kích thước L
      await captureEvidenceWithUrl(page, testInfo, 'Filter Lサイズ以上がある');
    });
  });

  /**
   * TC-SEARCH-FREE-010: Lọc ảnh theo Danh mục qua Toolbar dropdown (人物 / c_id=1)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-010: Filter ảnh theo Danh mục (人物) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
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
   * TC-SEARCH-FREE-011: Filter ảnh theo Màu sắc (青 / Blue) qua Toolbar
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-011: Filter ảnh theo Màu sắc (青 / Blue) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
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
   * TC-SEARCH-FREE-012: Filter và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-012: Filter và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) @free-user @filter', async ({
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
      expect(count, 'Kết quả sau khi lọc 3 người trở lên phải có ảnh').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Filter-3人以上');
    });
  });

  /**
   * TC-SEARCH-FREE-013: Filter người mẫu theo Độ tuổi (若者 / age=W)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-013: Filter người mẫu theo Độ tuổi (若者) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = '学生';
    await homePage.search(keyword);
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
   * TC-SEARCH-FREE-014: Filter ảnh có Giấy phép người mẫu (取得済のみ / mdlrlrsec=on)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-014: Filter ảnh có Giấy phép người mẫu (取得済のみ) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = '女性';
    await homePage.search(keyword);
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
   * TC-SEARCH-FREE-015: Filter ảnh có Giấy phép tài sản (プロパティリリース取得済のみ / prprlrsec=on)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-015: Filter ảnh có Giấy phép tài sản (取得済のみ) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = '建物';
    await homePage.search(keyword);
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
   * TC-SEARCH-FREE-016: Filter Loại trừ ảnh AI (AI生成ツール使用素材を除く / exclude_ai=on)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-016: Filter Loại trừ ảnh do AI tạo @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('landscape');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.toggleExcludeAi(true);

    await test.step('Verify URL cập nhật tham số exclude_ai=on', async () => {
      await expect(page).toHaveURL(/exclude_ai=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

    });
  });

  /**
   * TC-SEARCH-FREE-017: Filter Bật bộ lọc Tìm kiếm khớp chính xác (完全一致 / type_search=phrase)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-017: Filter bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('東京 タワー');
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
   * TC-SEARCH-FREE-018: Lọc theo Từ khóa loại trừ (除外キーワード / nq=)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-018: Filter theo Từ khóa loại trừ (除外キーワード) @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'cat';
    const excludeKeyword = 'dog';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.applyExcludeKeyword(excludeKeyword);

    await test.step('Verify URL cập nhật tham số nq=dog và badge hiển thị', async () => {
      await expect(page).toHaveURL(new RegExp(`nq=${excludeKeyword}`));
      await expect(searchResultPage.getActiveFilterBadge(excludeKeyword)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

    });
  });

  /**
   * TC-SEARCH-FREE-019: Lọc theo Tên tác giả qua menu Tìm kiếm chi tiết (詳細検索 / creator=)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-019: Filter ảnh theo Tác giả (Acworks) qua menu (詳細検索) Toolbar @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'flower';
    const creatorName = 'Acworks';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.searchByDetailedCreator(creatorName);

    await test.step('Verify URL, badge và heading phản ánh tác giả Acworks', async () => {
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`, 'i'));
      await expect(searchResultPage.getActiveFilterBadge(creatorName)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo tác giả phải trả về danh sách ảnh').toBeGreaterThan(0);

    });
  });

  /**
   * TC-SEARCH-FREE-020: Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索 / ngcreator=)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-020: Filter ảnh loại trừ Tác giả (Acworks) qua menu (詳細検索) Toolbar @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'flower';
    const ngCreatorName = 'Acworks';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.searchByDetailedNgCreator(ngCreatorName);

    await test.step('Verify URL cập nhật tham số ngcreator=Acworks, badge và trạng thái kết quả hiển thị', async () => {
      await expect(page).toHaveURL(new RegExp(`ngcreator=${ngCreatorName}`, 'i'));
      await expect(searchResultPage.activeFilterBadges.filter({ hasText: ngCreatorName })).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        await expect(searchResultPage.resultItems.first()).toBeVisible();
      } else {
        await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      }

    });
  });

  /**
   * TC-SEARCH-FREE-021: Lọc theo Mã素材ID chính xác (qid=)
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-021: Filter ảnh theo mã 素材ID @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const photoId = '1597634';
    await homePage.search('flower');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.filterByDetailedPhotoId(photoId);

    await test.step('Verify URL, badge và kết quả trả về đúng 1 ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
      await expect(searchResultPage.getActiveFilterBadge(photoId)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      // Web-first auto-wait trước khi đếm số lượng để tránh bẫy Non-Auto-Waiting trên Firefox
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo ID chính xác phải trả về ít nhất 1 ảnh').toBeGreaterThanOrEqual(1);
    });
  });

  // ============================================================================
  // NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI
  // ============================================================================

  /**
   * TC-SEARCH-FREE-022: Kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-022: Kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(120_000);
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();

    await test.step('Chọn số lượng người mẫu: 2人 trên toolbar', async () => {
      await searchResultPage.selectModelCount('2');
      await expect(page).toHaveURL(/model_count=2/);
      await expect(searchResultPage.getActiveFilterBadge('2人')).toBeVisible();

      // Lưu bằng chứng trạng thái bước 1: Lọc 2 người
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-2人');
    });

    await test.step('Tích chọn Model Release: 取得済のみ trên toolbar', async () => {
      await searchResultPage.selectModelRelease(true);
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      // Lưu bằng chứng trạng thái bước 2: Kết hợp 2 người + Model Release
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-2人-ModelRelease');
    });
  });

  /**
   * TC-SEARCH-FREE-023: Kết hợp Từ khóa + Chiều ngang + Không có người (無人) + Loại trừ AI
   * @tags @free-user @filter
   */
  test('TC-SEARCH-FREE-023: Kết hợp Đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @free-user @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(120_000);
    const keyword = 'office';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Chọn chiều ảnh: 横長 (Horizontal) trên toolbar', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();

      // Lưu bằng chứng bước 1: Chiều ngang
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-横長');
    });

    await test.step('Chọn không có người: 無人 (0 models) trên toolbar', async () => {
      await searchResultPage.selectModelCount('0');
      await expect(page).toHaveURL(/model_count=0/);
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();

      // Lưu bằng chứng bước 2: Chiều ngang + Không có người
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-横長-無人');
    });

    await test.step('Tích chọn loại trừ AI: exclude_ai=on trên toolbar', async () => {
      await searchResultPage.toggleExcludeAi(true);
      await expect(page).toHaveURL(/exclude_ai=on/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);

      // Lưu bằng chứng bước 3: Chiều ngang + Không có người + Loại trừ AI
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-横長-無人-ExcludeAI');
    });
  });

  // ============================================================================
  // NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT 
  // ============================================================================

  /**
   * TC-SEARCH-FREE-024: Tải ảnh lên tìm kiếm tương đồng (Image Upload Search)
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-024: Tải ảnh lên tìm kiếm tương đồng @free-user', async ({
    homePage,
    searchResultPage,
  }) => {
    await homePage.uploadImageForSearch(sampleImagePath);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify điều hướng tới trang kết quả tìm kiếm bằng hình ảnh', async () => {
      await expect(searchResultPage.resultHeading).toContainText('アップロードされた画像に似ている写真素材');
      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        expect(count, 'Phải có hình ảnh tương đồng được hiển thị').toBeGreaterThan(0);
      } else {
        await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      }
    });
  });

  /**
   * TC-SEARCH-FREE-025: Tìm kiếm đề xuất và phân trang (Recommended Search)
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-025: Recommended Search và phân trang @free-user', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.goToRecommendedSearch();

    await test.step('Verify trang Recommended Search hiển thị tiêu đề chuẩn', async () => {
      await expect(searchResultPage.resultHeading).toContainText('「おすすめ」の写真素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang phải có ít nhất 1 ảnh hiển thị').toBeGreaterThan(0);
      expect(count, 'Số lượng ảnh không được vượt quá 70 ảnh/trang').toBeLessThanOrEqual(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số rcm=1 và referer khi sang trang 2', async () => {
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/referer=more_recommended/);
      await expect(page).toHaveURL(/p=2/);
    });
  });

  /**
   * TC-SEARCH-FREE-026: Tìm kiếm ảnh định dạng PSD và phân trang (PSD Format Search)
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-026: PSD Format Search và phân trang @free-user', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.goToPsdSearch();

    await test.step('Verify trang PSD Search hiển thị tiêu đề PSD素材', async () => {
      await expect(searchResultPage.resultHeading).toContainText('PSD素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang phải có ít nhất 1 ảnh hiển thị').toBeGreaterThan(0);
      expect(count, 'Số lượng ảnh không được vượt quá 70 ảnh/trang').toBeLessThanOrEqual(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số sizesec=psd khi sang trang 2', async () => {
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(page).toHaveURL(/referer=category_psd/);
      await expect(page).toHaveURL(/p=2/);
    });
  });

  /**
   * TC-SEARCH-FREE-027: Tìm kiếm bằng AI Face từ trang Detail
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-027: Tìm kiếm bằng AI Face từ trang Detail @free-user', async ({
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
      await expect(searchResultPage.paginationContainer).toBeVisible();
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/vector_face=/);
      await expect(page).toHaveURL(/p=2/);
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 kết quả AI Face phải tiếp tục có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang @free-user', async ({
    page,
    searchResultPage,
  }) => {
    test.setTimeout(90_000);
    await searchResultPage.goToTrendsPage();

    await test.step('1. Verify tiêu đề H1 và danh sách ảnh mặc định của trang Trends', async () => {
      await expect(searchResultPage.resultHeading).toBeVisible();
      await expect(searchResultPage.resultHeading).toHaveText('人気の写真素材');

      // Web-first auto-wait theo quy chuẩn Cross-browser
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
  // NHÓM 5: SẮP XẾP & PHÂN TRANG
  // ============================================================================

  /**
   * TC-SEARCH-FREE-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2 @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('1. Sắp xếp theo "新着順" (Mới nhất) và verify URL, kết quả hiển thị', async () => {
      await searchResultPage.selectNewestSort();
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sắp xếp mới nhất phải có ảnh hiển thị').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Sort-新着順');
    });

    await test.step('2. Chuyển sang Trang 2 và verify trạng thái sắp xếp "新着順" được giữ nguyên', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);

      await captureEvidenceWithUrl(page, testInfo, 'Sort-新着順-Trang-2');
    });
  });

  /**
   * TC-SEARCH-FREE-030: Chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-030: Chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.clickPopularSort();

    await test.step('Verify popover nâng cấp Premium hiển thị cho Free User', async () => {
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
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    test.setTimeout(90_000);
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('1. Verify menu "表示件数" có radio 70件 được check mặc định và đếm số lượng trang 1', async () => {
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

    await test.step('2. Click nút Next và verify sang trang 2 tiếp tục hiển thị trong giới hạn tối đa 70 ảnh', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage2, 'Trang 2 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);

      await captureEvidenceWithUrl(page, testInfo, 'Default-70-items-p2');
    });

    await test.step('3. Click nút Prev và verify quay lại trang 1', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/\/main\/search\?.*q=cat/);
      expect(page.url()).not.toContain('p=2');
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countBackToPage1 = await searchResultPage.getResultCount();
      expect(countBackToPage1, 'Quay lại trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countBackToPage1, 'Quay lại trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);

      await captureEvidenceWithUrl(page, testInfo, 'Default-70-items-back-p1');
    });
  });

  // ============================================================================
  // NHÓM 6: PHÂN QUYỀN & HẠN MỨC FREE USER
  // ============================================================================

  /**
   * TC-SEARCH-FREE-032: Chạm hạn mức tìm kiếm (1 ngày 4 lần) -> Hiển thị Modal kèm nút Dùng vé coupon và xác nhận hoạt động của 2 nút
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-032: Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
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

    const url = new URL(page.url());
    await page.context().addCookies([
      {
        name: 'search_zancnt',
        value: '0',
        domain: url.hostname,
        path: '/',
      },
    ]);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await homePage.isHomePageLoaded();

    await homePage.search('cat');

    await test.step('Verify Modal giới hạn tìm kiếm hiển thị nội dung phân quyền cho Free User', async () => {
      await searchResultPage.waitForSearchLimitModal();
      await expect(searchResultPage.searchLimitTitle).toContainText('無料のキーワード検索は「1日4回」までです。');

      // Free User ĐÃ CÓ tài khoản nên KHÔNG còn nút CTA "無料会員登録してACポイント" (Ẩn)
      await expect(searchResultPage.searchLimitRegisterCta).toBeHidden();

      // Free User có tùy chọn dùng vé tìm kiếm trong ngày (一日検索し放題チケット) (Hiện)
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

      await expect(newPage).toHaveURL(/\/premium/);
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
   * TC-SEARCH-FREE-033: Verify Toggle AI Search (.search-by-ai) KHÔNG hiển thị trên giao diện của Free User
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-033: Verify Toggle AI Search KHÔNG hiển thị trên giao diện của Free User @free-user', async ({
    homePage,
    searchResultPage,
  }) => {
    await test.step('Verify nút Toggle AI Search không hiển thị trên thanh tìm kiếm Top Page của Free User', async () => {
      await expect(homePage.searchByAiButton).toBeHidden();
    });

    await test.step('Tìm kiếm từ khóa và verify nút Toggle AI Search cũng không xuất hiện trên Search Result Page', async () => {
      await homePage.search('女性');
      await searchResultPage.waitForResultDisplay();
      await expect(searchResultPage.searchByAiButton).toBeHidden();
    });
  });

  // ============================================================================
  // NHÓM 7: THANH TÌM KIẾM CỐ ĐỊNH TRÊN HEADER
  // ============================================================================

  /**
   * TC-SEARCH-FREE-034: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-034: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang @free-user', async ({
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
   * TC-SEARCH-FREE-035: Kiểm tra thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar
   * @tags @free-user
   */
  test('TC-SEARCH-FREE-035: Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar @free-user', async ({
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