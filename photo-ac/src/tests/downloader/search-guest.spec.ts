import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH FEATURE — GUEST USER
 * ============================================================================
 */
test.describe('Search Feature — Guest (No-Login User)', () => {
  // Bắt buộc cô lập context không mang thông tin đăng nhập
  test.use({ storageState: { cookies: [], origins: [] } });

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

    await homePage.goToHomePage();
    await homePage.isHomePageLoaded();
  });

  // ============================================================================
  // NHÓM 1: CƠ BẢN & ĐIỂM VÀO TÌM KIẾM
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-001: Tìm kiếm với từ khóa hợp lệ
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả tìm kiếm', async () => {
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
   * TC-SEARCH-GUEST-002: Tìm kiếm với nhiều từ khóa kết hợp (Multi-keyword AND search)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-002: Tìm kiếm nhiều từ khóa kết hợp hiển thị kết quả @guest', async ({
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
   * TC-SEARCH-GUEST-003: Tìm kiếm với từ khóa không tồn tại (Zero Results)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-003: Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa @guest', async ({
    homePage,
    searchResultPage,
  }) => {
    const nonexistentKeyword = 'xyz_nonexistent_photo_99999';

    await homePage.search(nonexistentKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify thông báo không có kết quả chuẩn của Photo-AC', async () => {
      await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh phải bằng 0').toBe(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-004: Tìm kiếm tiếp từ thanh tìm kiếm trên trang kết quả (Search Again)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-004: Tìm kiếm từ khóa mới trực tiếp từ trang kết quả @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    const newKeyword = 'dog';
    await searchResultPage.searchAgain(newKeyword);

    await test.step('Verify URL và heading cập nhật sang từ khóa mới', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${newKeyword}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${newKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-005: Xóa từ khóa bằng nút Reset trên ô tìm kiếm
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-005: Xóa nhanh từ khóa trong ô tìm kiếm bằng nút Reset @guest', async ({
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await expect(searchResultPage.searchInput).toHaveValue(keyword);
    await searchResultPage.clickResetKeyword();

    await test.step('Verify giá trị trong ô searchbox bị xóa về rỗng', async () => {
      await expect(searchResultPage.searchInput).toHaveValue('');
    });
  });

  /**
   * TC-SEARCH-GUEST-006: Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-006: Tìm kiếm bằng top keyword @regression @guest', async ({
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

    await test.step('Verify URL chứa từ khóa và tham số utm_source=top_keyword', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(targetKeyword)}`));
      await expect(page).toHaveURL(/utm_source=top_keyword/);
    });

    await test.step('Verify heading và danh sách ảnh hiển thị đúng', async () => {
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-007: Tìm kiếm bằng Popular Tag
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-007: Tìm kiếm bằng popular tag keyword @regression @guest', async ({
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
   * TC-SEARCH-GUEST-008: Filter ảnh theo Chiều dọc (縦長)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-008: Filter ảnh theo Chiều dọc (縦長) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectOrientation('vertical');

    await test.step('Verify URL cập nhật tham số orientation=0, badge hiển thị và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/orientation=0/);
      await expect(searchResultPage.getActiveFilterBadge('縦長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều dọc phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-009: Lọc ảnh theo Chiều ngang (横長) qua toolbar
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-009: Filter ảnh theo Chiều ngang (横長) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectOrientation('horizontal');

    await test.step('Verify URL cập nhật tham số orientation=1 và badge hiển thị', async () => {
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-010: Filter định dạng ảnh PSD qua Toolbar "ファイル・向き"
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-010: Filter định dạng ảnh PSD @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-011: Lọc kích thước ảnh Mサイズ以上 qua Toolbar "ファイル・向き"
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-011: Filter kích thước ảnh Mサイズ以上 @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectSize('m');

    await test.step('Verify URL cập nhật tham số sizesec=m, badge hiển thị và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=m/);
      await expect(searchResultPage.getActiveFilterBadge('Mサイズ以上がある')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-012: Lọc kích thước ảnh Lサイズ qua Toolbar "ファイル・向き"
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-012: Filter kích thước ảnh Lサイズ @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectSize('l');

    await test.step('Verify URL cập nhật tham số sizesec=l, badge hiển thị và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=l/);
      await expect(searchResultPage.getActiveFilterBadge('Lサイズがある')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-013: Filter ảnh theo Danh mục qua Toolbar dropdown (人物 / c_id=1)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-013: Filter ảnh theo Danh mục (人物) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-014: Filter ảnh theo Màu sắc (青 / Blue) qua Toolbar
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-014: Filter ảnh theo Màu sắc (青 / Blue) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-015: Filter ảnh Không có người (無人 / model_count=0) qua Toolbar
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-015: Filter ảnh Không có người (無人) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'office';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectModelCount('0');

    await test.step('Verify URL cập nhật tham số model_count=0 và badge hiển thị', async () => {
      await expect(page).toHaveURL(/model_count=0/);
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-016: Filter ảnh có 1 người mẫu (1人 / model_count=1) qua Toolbar
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-016: Filter ảnh có 1 người mẫu (1人) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'ビジネス';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectModelCount('1');

    await test.step('Verify URL cập nhật tham số model_count=1 và badge hiển thị', async () => {
      await expect(page).toHaveURL(/model_count=1/);
      await expect(searchResultPage.getActiveFilterBadge('1人')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-017: Filter ảnh có từ 3 người mẫu trở lên (3人以上 / model_count=3) qua Toolbar
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-017: Filter ảnh có từ 3 người mẫu trở lên (3人以上) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '家族';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectModelCount('3');

    await test.step('Verify URL cập nhật tham số model_count=3 và badge hiển thị', async () => {
      await expect(page).toHaveURL(/model_count=3/);
      await expect(searchResultPage.getActiveFilterBadge('3人以上')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-018: Filter người mẫu theo Độ tuổi (若者 / age=W) qua Toolbar "人物指定"
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-018: Filter người mẫu theo Độ tuổi (若者) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-019: Filter ảnh có Giấy phép người mẫu (取得済のみ / mdlrlrsec=on)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-019: Filter ảnh có Giấy phép người mẫu (取得済のみ) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '女性';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-020: Filter ảnh có Giấy phép tài sản (プロパティリリース取得済のみ / prprlrsec=on)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-020: Filter ảnh có Giấy phép tài sản (取得済のみ) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '建物';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-021: Filter ảnh do AI tạo
   * @regression @guest @filter
   */
  test('TC-SEARCH-GUEST-021: Filter ảnh do AI tạo @regression @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('landscape');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.toggleExcludeAi(true);

    await test.step('Verify URL cập nhật tham số exclude_ai=on', async () => {
      await expect(page).toHaveURL(/exclude_ai=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-022: Filter bật bộ lọc Tìm kiếm khớp chính xác (完全一致)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-022: Filter bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('東京 タワー');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-023: Lọc theo Từ khóa loại trừ (除外キーワード)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-023: Filter theo Từ khóa loại trừ (除外キーワード) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';
    const excludeKeyword = 'dog';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-024: Lọc theo Tên tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-024: Filter theo Tên tác giả (Acworks) qua menu (詳細検索) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    const creatorName = 'Acworks';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-GUEST-025: Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-025: Filter Loại trừ Tác giả (Acworks) qua menu (詳細検索) @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'flower';
    const ngCreatorName = 'Acworks';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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

  // ============================================================================
  // NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-026: Kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-026: Kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await test.step('Chọn số lượng người mẫu: 2人 trên toolbar', async () => {
      await searchResultPage.selectModelCount('2');
      await expect(page).toHaveURL(/model_count=2/);
      await expect(searchResultPage.getActiveFilterBadge('2人')).toBeVisible();
    });

    await test.step('Tích chọn Model Release: 取得済のみ trên toolbar', async () => {
      await searchResultPage.selectModelRelease(true);
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      await expect(searchResultPage.getActiveFilterBadge('取得済のみ')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-027: Kết hợp Từ khóa + Chiều ngang + Không có người (無人) + Loại trừ AI
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-027: Kết hợp Đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'office';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await test.step('Chọn chiều ảnh: 横長 (Horizontal) trên toolbar', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
    });

    await test.step('Chọn không có người: 無人 (0 models) trên toolbar', async () => {
      await searchResultPage.selectModelCount('0');
      await expect(page).toHaveURL(/model_count=0/);
      await expect(searchResultPage.getActiveFilterBadge('無人')).toBeVisible();
    });

    await test.step('Tích chọn loại trừ AI: exclude_ai=on trên toolbar', async () => {
      await searchResultPage.toggleExcludeAi(true);
      await expect(page).toHaveURL(/exclude_ai=on/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-028: Tải ảnh lên tìm kiếm tương đồng
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-028: Tải ảnh lên tìm kiếm hình ảnh tương đồng @guest', async ({
    page,
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
   * TC-SEARCH-GUEST-029: Filter theo Mã素材ID chính xác
   * @tags @guest @filter
   */
  test('TC-SEARCH-GUEST-029: Filter theo Mã素材ID @guest @filter', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const photoId = '1597634';
    await homePage.search('flower');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.searchByDetailedPhotoId(photoId);

    await test.step('Verify URL, badge và kết quả trả về đúng 1 ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
      await expect(searchResultPage.getActiveFilterBadge(photoId)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo ID chính xác phải trả về ít nhất 1 ảnh').toBeGreaterThanOrEqual(1);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-GUEST-030: Tìm kiếm đề xuất và phân trang (Sheet Case 24: rcm=1)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-030: Truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @guest', async ({
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
   * TC-SEARCH-GUEST-031: Tìm kiếm ảnh định dạng PSD và phân trang (Sheet Case 25: sizesec=psd)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-031: Truy cập PSD Format Search và giữ tham số sizesec=psd khi chuyển trang @guest', async ({
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
   * TC-SEARCH-GUEST-032: Tìm kiếm bằng AI Face từ trang Detail (Sheet Case 17, 27)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-032: Guest click AI Face thumbnail từ trang Detail tìm kiếm ảnh cùng khuôn mặt và giữ nguyên khi phân trang @guest', async ({
    page,
    searchResultPage,
  }) => {
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

  // ============================================================================
  // NHÓM 5: SẮP XẾP & PHÂN TRANG
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-033: Sắp xếp kết quả theo "新着順" (Mới nhất)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-033: Sắp xếp kết quả theo "新着順" (Mới nhất) thành công @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectNewestSort();

    await test.step('Verify URL cập nhật tham số srt=-releasedate', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-034: Chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-034: Chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.clickPopularSort();

    await test.step('Verify popover nâng cấp Premium hiển thị', async () => {
      await expect(searchResultPage.popularSortPopover).toBeVisible();
      const popoverText = await searchResultPage.getPopularSortPopoverText();
      expect(popoverText).toContain('プレミアム会員になると、人気順での並び替えができます。');
    });

    await test.step('Verify URL không bị đổi sang srt=recent_popular', async () => {
      expect(page.url()).not.toContain('srt=recent_popular');
    });
  });

  /**
   * TC-SEARCH-GUEST-035: Phân trang - Chuyển trang tiếp theo (Next) và trang trước (Prev)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-035: Chuyển trang phân trang (Next / Prev) thành công @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify container phân trang hiển thị và đang ở trang 1', async () => {
      await expect(searchResultPage.paginationContainer).toBeVisible();
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
    });

    await test.step('Click nút Next và verify URL cập nhật p=2', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
    });

    await test.step('Click nút Prev và verify quay lại trang 1', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/\/main\/search\?.*q=cat/);
      expect(page.url()).not.toContain('p=2');
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
    });
  });

  /**
   * TC-SEARCH-GUEST-036: Giữ nguyên thứ tự Sắp xếp đã chọn khi chuyển trang (Sheet Case 15)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-036: Giữ nguyên tùy chọn Sắp xếp "新着順" khi chuyển sang Trang 2 @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectNewestSort();
    await expect(page).toHaveURL(/srt=-releasedate/);

    await searchResultPage.goToNextPage();

    await test.step('Verify URL và trạng thái sort vẫn giữ nguyên trên Trang 2', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/p=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
    });
  });

  /**
   * TC-SEARCH-GUEST-037: Kiểm tra hiển thị mặc định 70 ảnh/trang (Sheet Case 12, 20, 23)
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-037: Số lượng ảnh hiển thị mặc định đạt 70 ảnh trên mỗi trang và radio 70 được check default @guest', async ({
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify menu "表示件数" có radio 70件ずつ表示 được check default', async () => {
      await searchResultPage.openSortDropdown();
      await expect(searchResultPage.displayCount70Radio).toBeChecked();
      await expect(searchResultPage.sortDropdownButton).toContainText('70件表示');
    });

    await test.step('Verify trang 1 hiển thị trong giới hạn tối đa 70 ảnh', async () => {
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage1, 'Trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify trang 2 tiếp tục hiển thị trong giới hạn tối đa 70 ảnh', async () => {
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage2, 'Trang 2 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });
  });

  // ============================================================================
  // NHÓM 6: PHÂN QUYỀN & HẠN MỨC GUEST USER (PERMISSIONS & LIMITS & AI SEARCH)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-038: Chạm hạn mức tìm kiếm 
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-038: Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {

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

    await test.step('Verify Modal giới hạn tìm kiếm hiển thị', async () => {
      await searchResultPage.waitForSearchLimitModal();
      await expect(searchResultPage.searchLimitTitle).toContainText('無料のキーワード検索は「1日4回」までです。');
    });

    await test.step('Verify hiển thị mục đăng ký tài khoản nhận 15pt và link Premium', async () => {
      await expect(searchResultPage.searchLimitRegisterCta).toBeVisible();
      await expect(searchResultPage.searchLimitRegisterCta).toContainText('無料会員登録してACポイント');
      await expect(searchResultPage.searchLimitPremiumLink).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-GUEST-039: AI Toggle tắt khi chưa chạm hạn mức tìm kiếm
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-039: AI Toggle ở trạng thái OFF khi chưa chạm hạn mức tìm kiếm @guest', async ({
    homePage,
  }) => {
    await test.step('Verify nút AI Search hiển thị trên Top Page', async () => {
      await expect(homePage.searchByAiButton).toBeVisible();
    });

    await test.step('Verify AI Toggle ở trạng thái OFF', async () => {
      await expect(homePage.aiSearchOffIcon).toBeVisible();
      await expect(homePage.aiSearchOnIcon).toBeHidden();
      await expect(homePage.byAiInput).toHaveValue('0');
      await expect(homePage.searchByAiButton).toBeDisabled();
    });
  });

  /**
   * TC-SEARCH-GUEST-040: AI Toggle bật màu vàng và cho phép nhập tìm kiếm bằng AI khi limit search
   * @tags @guest
   */
  test('TC-SEARCH-GUEST-040: AI Toggle bật màu vàng và cho phép nhập tìm kiếm bằng AI khi limit search @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const naturalQuery = 'オフィスでパソコンを開くビジネスマン';

    await test.step('Giả lập khách vãng lai đạt hạn mức tìm kiếm thông thường (search_zancnt = 0)', async () => {
      // Override route giả lập hết hạn mức tìm kiếm đồng bộ với cookie
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
    });

    await test.step('Verify Popup "AI検索" xuất hiện khi đạt hạn mức', async () => {
      await expect(homePage.semanticSearchModal).toBeVisible();
    });

    await test.step('Verify AI Toggle tự động bật (hiển thị icon ON màu vàng, tooltip ON) khi popup xuất hiện', async () => {
      await expect(homePage.searchByAiButton).toBeVisible();
      await expect(homePage.aiSearchOnIcon).toBeVisible();
      await expect(homePage.aiSearchOffIcon).toBeHidden();
      await expect(homePage.byAiInput).toHaveValue('1');
      await expect(homePage.searchByAiButton).toHaveAttribute('data-original-title', /AI検索はオンの状態です/);
    });

    await test.step('Đóng popup Semantic Search', async () => {
      await homePage.dismissSemanticSearchModal();
    });

    await test.step('Nhập từ khóa tìm kiếm và submit tìm kiếm bằng AI', async () => {
      // Mở lại route cho phép submit tìm kiếm bằng AI lên server Photo-AC
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

      await homePage.searchWithAi(naturalQuery);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify URL chứa tham số by_ai=1 và tiêu đề chứa từ khóa tìm kiếm', async () => {
      await expect(page).toHaveURL(/by_ai=1/);
      await expect(searchResultPage.resultHeading).toContainText(`「${naturalQuery}」の写真素材`);

      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        await expect(searchResultPage.resultItems.first()).toBeVisible();
      } else {
        await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      }
    });
  });

  // ============================================================================
  // NHÓM 9: THANH TÌM KIẾM CỐ ĐỊNH TRÊN HEADER (STICKY HEADER SEARCH BAR)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-041: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-041: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang @regression @guest', async ({
    page,
    homePage,
  }) => {
    await test.step('Verify thanh Sticky Search Bar ban đầu ở đầu trang bị ẩn', async () => {
      await expect(homePage.stickySearchArea).toBeHidden();
    });

    await test.step('Cuộn trang xuống dưới và verify Sticky Search Bar hiển thị', async () => {
      await homePage.scrollToActivateStickySearch(800);
      await expect(homePage.stickySearchArea).toBeVisible();
      await expect(homePage.stickySearchInput).toBeVisible();
    });

    await test.step('Cuộn trang ngược lên đỉnh và verify Sticky Search Bar tự động ẩn đi', async () => {
      await homePage.scrollToTop();
      await expect(homePage.stickySearchArea).toBeHidden();
    });
  });

  /**
   * TC-SEARCH-GUEST-042: Guest thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar
   * @tags @smoke @regression @guest
   */
  test('TC-SEARCH-GUEST-042: Guest thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar @smoke @regression @guest', async ({
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

