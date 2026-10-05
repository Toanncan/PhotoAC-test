import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';
import { captureEvidenceWithUrl } from '../../utils/helpers';

/**
 * ============================================================================
 * TEST SUITE: SEARCH & FILTERS — PREMIUM USER
 * ============================================================================
 * Cấu trúc chuẩn hóa 7 Nhóm đồng bộ 100% với Photo-AC:
 * NHÓM 1: CƠ BẢN & ĐIỂM VÀO TÌM KIẾM (TC-001 ➔ TC-006)
 * NHÓM 2: BỘ LỌC ĐƠN LẺ TRÊN THANH CÔNG CỤ (TC-007 ➔ TC-015)
 * NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI (TC-016 ➔ TC-017)
 * NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT (TC-018 ➔ TC-021)
 * NHÓM 5: ĐẶC QUYỀN SẮP XẾP & PHÂN TRANG CỦA PREMIUM USER (TC-022 ➔ TC-024)
 * NHÓM 6: PHÂN QUYỀN TÌM KIẾM KHÔNG GIỚI HẠN (TC-025)
 * NHÓM 7: THANH TÌM KIẾM CỐ ĐỊNH TRÊN HEADER (TC-026 ➔ TC-027)
 */
test.describe('Search & Filters — Premium User (Full Privileges)', () => {
  // Session Premium User được tự động inject bởi project cấu hình (chromium-downloader / firefox-downloader)

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
   * TC-SEARCH-PREM-001: Tìm kiếm với từ khóa đơn hợp lệ
   * @tags @smoke @premium
   */
  test('TC-SEARCH-PREM-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả @smoke @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả tìm kiếm cho Premium User', async () => {
      await expect(page).toHaveURL(new RegExp(`search_word=${encodeURIComponent(keyword)}|q=${encodeURIComponent(keyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);
    });

    await test.step('Verify có ít nhất 1 thumbnail hiển thị', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm phải trả về ít nhất 1 ảnh').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-PREM-002: Tìm kiếm với nhiều từ khóa kết hợp (Multi-keyword AND search)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-002: Tìm kiếm nhiều từ khóa kết hợp (AND Search) @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const multiKeyword = 'ビジネス 女性';

    await homePage.search(multiKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading phản ánh cụm từ khóa tìm kiếm', async () => {
      await expect(page).toHaveURL(/\/main\/(search_result\.php|search)\?/);
      await expect(searchResultPage.resultHeading).toContainText(`「${multiKeyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm kiếm kết hợp phải trả về kết quả').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-003: Tìm kiếm với từ khóa không tồn tại (Zero Results)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-003: Nhận thông báo khi không tìm thấy ảnh nào khớp từ khóa @regression @premium', async ({
    homePage,
    searchResultPage,
  }) => {
    const nonexistentKeyword = 'xyz_nonexistent_photo_99999';

    await homePage.search(nonexistentKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify thông báo không có kết quả', async () => {
      await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh phải bằng 0').toBe(0);
    });
  });

  /**
   * TC-SEARCH-PREM-004: Xóa nhanh từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp trên trang kết quả
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-004: Xóa từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp từ trang kết quả @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
      await expect(page).toHaveURL(new RegExp(`search_word=${newKeyword}|q=${newKeyword}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${newKeyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm từ khóa mới phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-005: Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-005: Click Top Keyword chuyển hướng đến trang kết quả tìm kiếm @regression @premium', async ({
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
      await expect(page).toHaveURL(new RegExp(`search_word=${encodeURIComponent(targetKeyword)}|q=${encodeURIComponent(targetKeyword)}`));
      await expect(page).toHaveURL(/utm_source=top_keyword/);
    });

    await test.step('Verify heading và danh sách ảnh hiển thị đúng', async () => {
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-006: Tìm kiếm bằng Popular Tag Cloud
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-006: Click Popular Tag từ tag cloud thành công @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await expect(homePage.popularTags.first()).toBeVisible();
    const firstTagText = (await homePage.popularTags.first().innerText()).trim();

    await homePage.clickPopularTag(firstTagText);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading phản ánh tag được chọn', async () => {
      await expect(page).toHaveURL(new RegExp(`search_word=${encodeURIComponent(firstTagText)}|q=${encodeURIComponent(firstTagText)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${firstTagText}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 2: BỘ LỌC ĐƠN LẺ TRÊN THANH CÔNG CỤ (FILTER TOOLBAR)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-007: Lọc ảnh theo Chiều dọc (縦長) và chuyển đổi sang Chiều ngang (横長) qua toolbar
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-007: Lọc và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長) qua Toolbar @regression @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Lọc theo Chiều dọc (縦長) và verify URL, badge hiển thị', async () => {
      await searchResultPage.selectOrientation('vertical');
      await expect(page).toHaveURL(/orientation=0/);
      await expect(searchResultPage.getActiveFilterBadge('縦長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều dọc phải có ảnh').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Filter 縦長');
    });

    await test.step('Chuyển đổi sang Chiều ngang (横長) và verify URL, badge cập nhật tương ứng', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Filter 横長');
    });
  });

  /**
   * TC-SEARCH-PREM-008: Lọc định dạng ảnh Vector (EPS・AI) và chuyển đổi sang PNG qua Toolbar "ファイル・向き"
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-008: Lọc và chuyển đổi Định dạng tệp (Vector / PNG) qua Toolbar "ファイル・向き" @regression @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();

    await test.step('Lọc theo định dạng Vector (EPS・AI) và verify URL', async () => {
      await searchResultPage.selectFormat('vector');
      await expect(page).toHaveURL(/format=vector/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả lọc Vector phải có ảnh').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Filter Vector');
    });

    await test.step('Chuyển đổi sang định dạng PNG và verify URL cập nhật', async () => {
      await searchResultPage.selectFormat('png');
      await expect(page).toHaveURL(/format=png/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả lọc PNG phải có ảnh').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Filter PNG');
    });
  });

  /**
   * TC-SEARCH-PREM-009: Lọc ảnh theo Danh mục qua Toolbar dropdown (人物)
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-009: Lọc ảnh theo Danh mục (人物) qua Toolbar dropdown @regression @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectCategoryFromToolbar('人物');

    await test.step('Verify URL cập nhật tham số danh mục và badge hiển thị', async () => {
      await expect(page).toHaveURL(/c_names.*=(1|20)|c_id=(1|20)/);
      await expect(searchResultPage.getActiveFilterBadge('人物')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Filter Category 人物');
    });
  });

  /**
   * TC-SEARCH-PREM-010: Lọc ảnh theo Màu sắc (青 / Blue) qua Toolbar
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-010: Lọc ảnh theo Màu sắc (青 / Blue) qua Toolbar @regression @premium @filter', async ({
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
      await captureEvidenceWithUrl(page, testInfo, 'Filter Color 青');
    });
  });

  /**
   * TC-SEARCH-PREM-011: Lọc Loại trừ ảnh AI (AI生成ツール使用素材を除く)
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-011: Bật bộ lọc Loại trừ ảnh do AI tạo @regression @premium @filter', async ({
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
      await captureEvidenceWithUrl(page, testInfo, 'Filter Exclude AI');
    });
  });

  /**
   * TC-SEARCH-PREM-012: Lọc Khớp chính xác cụm từ (完全一致)
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-012: Bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @regression @premium @filter', async ({
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
      await captureEvidenceWithUrl(page, testInfo, 'Filter Exact Match');
    });
  });

  /**
   * TC-SEARCH-PREM-013: Lọc theo Từ khóa loại trừ (除外キーワード)
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-013: Lọc kết quả với Từ khóa loại trừ (除外キーワード) @regression @premium @filter', async ({
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
      await captureEvidenceWithUrl(page, testInfo, 'Filter Exclude Keyword');
    });
  });

  /**
   * TC-SEARCH-PREM-014: Lọc theo Tên tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-014: Tìm kiếm ảnh theo Tác giả (Acworks) qua Detailed Search Toolbar @regression @premium @filter', async ({
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
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo tác giả phải trả về danh sách ảnh').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Filter Creator Acworks');
    });
  });

  /**
   * TC-SEARCH-PREM-015: Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-015: Loại trừ ảnh của Tác giả (Acworks) qua menu Detailed Search Toolbar @regression @premium @filter', async ({
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
      await captureEvidenceWithUrl(page, testInfo, 'Filter NG Creator Acworks');
    });
  });

  // ============================================================================
  // NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI
  // ============================================================================

  /**
   * TC-SEARCH-PREM-016: Kết hợp Từ khóa + Chiều ngang + Định dạng Vector (EPS/AI) + Loại trừ AI qua UI Toolbar
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-016: Kết hợp Từ khóa + Chiều ngang + Định dạng Vector + Loại trừ AI qua UI Toolbar @regression @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'ビジネス';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Chọn Chiều ngang và định dạng Vector từ Toolbar "ファイル・向き"', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await searchResultPage.selectFormat('vector');
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-Horizontal-Vector');
    });

    await test.step('Bật bộ lọc Loại trừ AI từ Toolbar "表示条件"', async () => {
      await searchResultPage.toggleExcludeAi(true);
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-Horizontal-Vector-ExcludeAI');
    });

    await test.step('Verify URL chứa đầy đủ tham số và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/orientation=1/);
      await expect(page).toHaveURL(/format=vector/);
      await expect(page).toHaveURL(/exclude_ai=on/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả kết hợp đa bộ lọc phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-017: Kết hợp Từ khóa + Định dạng PNG + Màu sắc (青 / Blue) + Khớp chính xác (完全一致) qua UI Toolbar
   * @tags @regression @premium @filter
   */
  test('TC-SEARCH-PREM-017: Kết hợp Từ khóa + Định dạng PNG + Màu sắc (青 / Blue) + Khớp chính xác qua UI Toolbar @regression @premium @filter', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'flower';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Chọn định dạng PNG từ Toolbar "ファイル・向き"', async () => {
      await searchResultPage.selectFormat('png');
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-PNG');
    });

    await test.step('Chọn màu xanh dương từ Toolbar "色"', async () => {
      await searchResultPage.selectColor('blue');
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-PNG-Blue');
    });

    await test.step('Bật bộ lọc Tìm kiếm khớp chính xác từ Toolbar "表示条件"', async () => {
      await searchResultPage.toggleExactMatch(true);
      await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-PNG-Blue-ExactMatch');
    });

    await test.step('Verify URL chứa đầy đủ tham số và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/format=png/);
      await expect(page).toHaveURL(/color=0000d6/);
      await expect(page).toHaveURL(/type_search=phrase/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả kết hợp đa bộ lọc phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT
  // ============================================================================

  /**
   * TC-SEARCH-PREM-018: Tải ảnh lên tìm kiếm tương đồng
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-018: Tải ảnh lên để tìm kiếm hình ảnh tương đồng @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.uploadImageForSearch(sampleImagePath);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify điều hướng tới trang kết quả tìm kiếm bằng hình ảnh', async () => {
      await expect(searchResultPage.resultHeading).toContainText(/アップロード(した|された)画像に似ているイラスト/);
      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        expect(count, 'Phải có hình ảnh tương đồng được hiển thị').toBeGreaterThan(0);
      } else {
        await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      }
      await captureEvidenceWithUrl(page, testInfo, 'Image-Search-RIS-Results');
    });
  });

  /**
   * TC-SEARCH-PREM-019: Tìm kiếm theo Mã素材ID chính xác (qid)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-019: Tìm kiếm chính xác ảnh theo Mã素材ID qua menu Detailed Search @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const photoId = '1597634';
    await homePage.search('flower');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.searchByDetailedPhotoId(photoId);

    await test.step('Verify URL, badge và kết quả trả về đúng ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
      await expect(searchResultPage.getActiveFilterBadge(photoId)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo ID chính xác phải trả về ít nhất 1 ảnh').toBeGreaterThanOrEqual(1);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Search-PhotoID-Result');
    });
  });

  /**
   * TC-SEARCH-PREM-020: Tìm kiếm đề xuất và phân trang (rcm=1)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-020: Truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @regression @premium', async ({
    page,
    searchResultPage,
  }, testInfo) => {
    await searchResultPage.goToRecommendedSearch();

    await test.step('Verify trang Recommended Search hiển thị tiêu đề chuẩn', async () => {
      await expect(searchResultPage.resultHeading).toContainText('のイラスト素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang phải có ít nhất 1 ảnh hiển thị').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Recommended-Search-Page-1');
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số rcm=1 và referer khi sang trang 2', async () => {
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/referer=more_recommended/);
      await expect(page).toHaveURL(/(page|p)=2/);
      await captureEvidenceWithUrl(page, testInfo, 'Recommended-Search-Page-2');
    });
  });

  /**
   * TC-SEARCH-PREM-021: Lọc định dạng ảnh Vector chuyên biệt và bảo toàn tham số khi phân trang
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-021: Lọc định dạng Vector chuyên biệt và bảo toàn tham số format=vector khi phân trang @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();

    await test.step('Lọc theo định dạng Vector (EPS・AI)', async () => {
      await searchResultPage.selectFormat('vector');
      await expect(page).toHaveURL(/format=vector/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả lọc Vector phải có ảnh').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Format-Vector-Page-1');
    });

    await test.step('Chuyển sang trang 2 và verify bảo toàn tham số format=vector', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/format=vector/);
      await expect(page).toHaveURL(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Format-Vector-Page-2');
    });
  });

  // ============================================================================
  // NHÓM 5: ĐẶC QUYỀN SẮP XẾP & PHÂN TRANG CỦA PREMIUM USER
  // ============================================================================

  /**
   * TC-SEARCH-PREM-022: Sắp xếp theo "人気順" (Phổ biến) thành công không bị chặn
   * @tags @smoke @regression @premium
   */
  test('TC-SEARCH-PREM-022: Sắp xếp "人気順" (Phổ biến) thành công không bị chặn @smoke @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPopularSort();

    await test.step('Verify URL cập nhật tham số srt=recent_popular', async () => {
      await expect(page).toHaveURL(/srt=recent_popular/);
    });

    await test.step('Verify popover chặn nâng cấp Premium KHÔNG xuất hiện', async () => {
      await expect(searchResultPage.popularSortPopover).toBeHidden();
    });

    await test.step('Verify kết quả ảnh được hiển thị theo độ phổ biến', async () => {
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sắp xếp phổ biến phải có ảnh hiển thị').toBeGreaterThan(0);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
      await captureEvidenceWithUrl(page, testInfo, 'Sort-Popular-Success');
    });
  });

  /**
   * TC-SEARCH-PREM-023: Sắp xếp theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-023: Sắp xếp theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2 @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectNewestSort();

    await test.step('Verify URL cập nhật tham số srt=-releasedate và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sắp xếp mới nhất phải có ảnh hiển thị').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Sort-新着順');
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL và trạng thái sắp xếp "新着順" vẫn giữ nguyên trên Trang 2', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Sort-新着順-Trang-2');
    });
  });

  /**
   * TC-SEARCH-PREM-024: Premium User hiển thị mặc định 210 ảnh/trang và chuyển trang phân trang (Next / Prev) thành công
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-024: Hiển thị mặc định 210 ảnh/trang và chuyển trang phân trang (Next / Prev) thành công @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify tùy chọn số lượng hiển thị mặc định của Premium User là 210件 và đang ở trang 1', async () => {
      await searchResultPage.openSortDropdown();
      await expect(searchResultPage.displayCount210Radio).toBeChecked();
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Số lượng ảnh hiển thị phải là 210').toBe(210);
      await captureEvidenceWithUrl(page, testInfo, 'Premium-210-items-p1');
    });

    await test.step('Click nút Next và verify sang trang 2 tiếp tục hiển thị đủ 210 ảnh', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Số lượng ảnh trên trang 2 của Premium phải tiếp tục là 210').toBe(210);
      await captureEvidenceWithUrl(page, testInfo, 'Premium-210-items-p2');
    });

    await test.step('Click nút Prev và verify quay lại trang 1 linh hoạt', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/search_word=cat|q=cat/);
      expect(page.url()).not.toMatch(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countBackToPage1 = await searchResultPage.getResultCount();
      expect(countBackToPage1, 'Quay lại trang 1 phải có đủ 210 ảnh').toBe(210);
      await captureEvidenceWithUrl(page, testInfo, 'Premium-210-items-back-p1');
    });
  });

  // ============================================================================
  // NHÓM 6: PHÂN QUYỀN KHÔNG GIỚI HẠN (UNLIMITED SEARCH)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-025: Premium User tìm kiếm không giới hạn số lần
   * @tags @smoke @regression @premium
   */
  test('TC-SEARCH-PREM-025: Thực hiện tìm kiếm nhiều lần không bị giới hạn hạn mức @smoke @regression @premium', async ({
    homePage,
    searchResultPage,
  }) => {
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

  // ============================================================================
  // NHÓM 7: THANH TÌM KIẾM CỐ ĐỊNH TRÊN HEADER (STICKY HEADER SEARCH BAR)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-026: Thanh tìm kiếm cố định tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-026: Thanh tìm kiếm cố định (Sticky Header Search) tự động hiển thị khi cuộn trang xuống và ẩn đi khi cuộn lên đầu trang @premium', async ({
    page,
    homePage,
  }, testInfo) => {
    await test.step('Verify thanh Sticky Search Bar ban đầu ở đầu trang bị ẩn', async () => {
      await expect(homePage.stickySearchArea).toBeHidden();
    });

    await captureEvidenceWithUrl(page, testInfo, 'Premium-Sticky-Search-Hidden');

    await test.step('Cuộn trang xuống dưới và verify Sticky Search Bar hiển thị', async () => {
      await homePage.scrollToActivateStickySearch(1200);
      await expect(homePage.stickySearchArea).toBeVisible();
      await expect(homePage.stickySearchInput).toBeVisible();
    });

    await captureEvidenceWithUrl(page, testInfo, 'Premium-Sticky-Search-Shown');

    await test.step('Cuộn trang ngược lên đỉnh và verify Sticky Search Bar tự động ẩn đi', async () => {
      await homePage.scrollToTop();
      await expect(homePage.stickySearchArea).toBeHidden();
    });
  });

  /**
   * TC-SEARCH-PREM-027: Kiểm tra thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-027: Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar @premium', async ({
    page,
    homePage,
    searchResultPage,
  }, testInfo) => {
    const keyword = 'ビジネス';

    await test.step('Cuộn trang xuống để kích hoạt thanh Sticky Search Bar', async () => {
      await homePage.scrollToActivateStickySearch(1200);
      await expect(homePage.stickySearchArea).toBeVisible();
      await expect(homePage.stickySearchInput).toBeVisible();
    });

    await test.step(`Nhập từ khóa "${keyword}" vào Sticky Search Bar và submit tìm kiếm`, async () => {
      await homePage.searchViaStickyBar(keyword);
      await searchResultPage.waitForResultDisplay();
    });

    await test.step('Verify trang kết quả tìm kiếm hiển thị chính xác từ khóa và danh sách ảnh', async () => {
      await expect(page).toHaveURL(/\/main\/(search_result\.php|search)/);
      await expect(page).toHaveURL(new RegExp(`(search_word|q)=${encodeURIComponent(keyword)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);

      // Web-first auto-wait trước khi đếm theo Cross-browser rule
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
      await captureEvidenceWithUrl(page, testInfo, 'Premium-Sticky-Search-Results');
    });
  });
});
