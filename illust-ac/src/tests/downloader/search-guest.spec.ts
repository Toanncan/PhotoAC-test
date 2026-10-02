import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';
import { captureEvidenceWithUrl } from '../../utils/helpers';

/**
 * ============================================================================
 * TEST SUITE: SEARCH FEATURE — GUEST USER (CHƯA ĐĂNG NHẬP / NO-LOGIN)
 * ============================================================================
 */
test.describe('Search Feature — Guest (No-Login User)', () => {
  // Bắt buộc cô lập context không mang thông tin đăng nhập
  test.use({ storageState: { cookies: [], origins: [] } });

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ page, homePage }) => {
    // Targeted Network Mocking: Luôn duy trì hạn mức tìm kiếm (search_zancnt: 4)
    // nhằm bảo vệ các test case bộ lọc/tìm kiếm thông thường không bị modal #searchLimitModal chặn ngang khi chạy cả suite.
    await page.route('**/*is_enable_search*', async (route) => {
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

  test.afterEach(async ({ page, searchResultPage }, testInfo) => {
    // 1. Chụp ảnh lưu bằng chứng lúc bộ lọc đang hiển thị đầy đủ
    if (testInfo.status === 'passed' && (await searchResultPage.hasActiveFilters())) {
      await captureEvidenceWithUrl(page, testInfo, 'filter-applied-evidence');
    }
    // 2. Dọn dẹp sạch sẽ bộ lọc cho test case tiếp theo
    await searchResultPage.clearAllFilters();
  });

  // ============================================================================
  // NHÓM 1: CƠ BẢN & ĐIỂM VÀO TÌM KIẾM (BASIC SEARCH & ENTRYPOINTS)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-001: Tìm kiếm với từ khóa hợp lệ (Sheet Case 2)
   * @tags @smoke @regression @guest
   */
  test('TC-SEARCH-GUEST-001: Guest tìm kiếm từ khóa hợp lệ: hiển thị kết quả @smoke @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả tìm kiếm', async () => {
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
   * TC-SEARCH-GUEST-002: Tìm kiếm với nhiều từ khóa kết hợp (Multi-keyword AND search)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-002: Guest tìm kiếm nhiều từ khóa kết hợp: hiển thị kết quả @regression @guest', async ({
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
   * TC-SEARCH-GUEST-003: Tìm kiếm với từ khóa không tồn tại (Zero Results)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-003: Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa @regression @guest', async ({
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
   * TC-SEARCH-GUEST-004: Xóa nhanh từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp trên trang kết quả (Search Again)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-004: Guest xóa từ khóa bằng nút Reset và tìm kiếm từ khóa mới trực tiếp từ trang kết quả @regression @guest', async ({
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
   * TC-SEARCH-GUEST-006: Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-006: Guest click Top Keyword chuyển hướng đến trang kết quả tìm kiếm @regression @guest', async ({
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
   * TC-SEARCH-GUEST-007: Tìm kiếm bằng Popular Tag Cloud
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-007: Guest click Popular Tag từ tag cloud thành công @regression @guest', async ({
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
  // NHÓM 2: BỘ LỌC ĐƠN LẺ TRÊN THANH CÔNG CỤ (FILTER TOOLBAR - SINGLE FILTERS)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-008: [FILTER - ORIENTATION] Lọc ảnh theo Chiều dọc (縦長) và chuyển đổi sang Chiều ngang (横長) qua toolbar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-008: Guest lọc và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長) qua Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
    });

    await test.step('Chuyển đổi sang Chiều ngang (横長) và verify URL, badge cập nhật tương ứng', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-010: [FILTER - FORMAT] Lọc định dạng ảnh Vector (EPS・AI) và chuyển đổi sang PNG qua Toolbar "ファイル・向き"
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-010: Guest lọc và chuyển đổi Định dạng tệp (Vector / PNG) qua Toolbar "ファイル・向き" @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();

    await test.step('Lọc theo định dạng Vector (EPS・AI) và verify URL', async () => {
      await searchResultPage.selectFormat('vector');
      await expect(page).toHaveURL(/format=vector/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả lọc Vector phải có ảnh').toBeGreaterThan(0);
    });

    await test.step('Chuyển đổi sang định dạng PNG và verify URL cập nhật', async () => {
      await searchResultPage.selectFormat('png');
      await expect(page).toHaveURL(/format=png/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả lọc PNG phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-013: [FILTER - CATEGORY] Lọc ảnh theo Danh mục qua Toolbar dropdown (人物 / c_id=1)
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "カテゴリー" và chọn 人物
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-013: Guest lọc ảnh theo Danh mục (人物) qua Toolbar dropdown @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectCategoryFromToolbar('人物');

    await test.step('Verify URL cập nhật tham số danh mục c_names[]=1 hoặc c_id=1 và badge hiển thị', async () => {
      await expect(page).toHaveURL(/c_names.*=(1|20)|c_id=(1|20)/);
      await expect(searchResultPage.getActiveFilterBadge('人物')).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-014: [FILTER - COLOR] Lọc ảnh theo Màu sắc (青 / Blue) qua Toolbar
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "色" và chọn ô màu Xanh dương
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-014: Guest lọc ảnh theo Màu sắc (青 / Blue) qua Toolbar @regression @guest', async ({
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
   * TC-SEARCH-GUEST-021: [FILTER - EXCLUDE AI] Lọc Loại trừ ảnh AI (AI生成ツール使用素材を除く)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-021: Guest bật bộ lọc Loại trừ ảnh do AI tạo @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
   * TC-SEARCH-GUEST-022: [FILTER - EXACT MATCH] Lọc Khớp chính xác cụm từ (完全一致)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-022: Guest bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
   * TC-SEARCH-GUEST-023: [FILTER - EXCLUDE KEYWORD] Lọc theo Từ khóa loại trừ (除外キーワード)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-023: Guest lọc kết quả với Từ khóa loại trừ (除外キーワード) @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
   * TC-SEARCH-GUEST-024: [FILTER - CREATOR] Lọc theo Tên tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập tên tác giả Acworks
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-024: Guest tìm kiếm ảnh theo Tác giả (Acworks) qua menu Detailed Search Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
    });
  });

  /**
   * TC-SEARCH-GUEST-025: [FILTER - EXCLUDE CREATOR] Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập tác giả loại trừ Acworks
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-025: Guest loại trừ ảnh của Tác giả (Acworks) qua menu Detailed Search Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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



  // ============================================================================
  // NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT (SPECIALIZED SEARCHES)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-028: [IMAGE SEARCH UPLOAD] Tải ảnh lên tìm kiếm tương đồng (Sheet Case 1, 6, 8)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-028: Guest upload ảnh để tìm kiếm hình ảnh tương đồng @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.uploadImageForSearch(sampleImagePath);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify điều hướng tới trang kết quả tìm kiếm bằng hình ảnh', async () => {
      await expect(searchResultPage.resultHeading).toContainText(/アップロード(した|された)画像に似ているイラスト/);
      const count = await searchResultPage.getResultCount();
      if (count > 0) {
        expect(count, 'Phải có hình ảnh tương đồng được hiển thị').toBeGreaterThan(0);
      } else {
        // Trường hợp môi trường Staging có kho ảnh giới hạn, xác nhận thông báo rỗng chuẩn của Photo-AC
        await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      }
    });
  });

  /**
   * TC-SEARCH-GUEST-029: [PHOTO ID SEARCH] Tìm kiếm theo Mã素材ID chính xác (Sheet Case 7: qid=1597634)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập mã ID
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-029: Khách vãng lai tìm kiếm chính xác ảnh theo Mã素材ID qua menu Detailed Search @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const photoId = '1597634';
    await homePage.search('flower');
    await searchResultPage.waitForResultDisplay();

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
   * TC-SEARCH-GUEST-030: [RECOMMENDED SEARCH] Tìm kiếm đề xuất và phân trang (Sheet Case 24: rcm=1)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-030: Truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.goToRecommendedSearch();

    await test.step('Verify trang Recommended Search hiển thị tiêu đề chuẩn', async () => {
      await expect(searchResultPage.resultHeading).toContainText('のイラスト素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang phải có ít nhất 1 ảnh hiển thị').toBeGreaterThan(0);
      expect(count, 'Số lượng ảnh không được vượt quá 70 ảnh/trang').toBeLessThanOrEqual(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số rcm=1 và referer khi sang trang 2', async () => {
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/referer=more_recommended/);
      await expect(page).toHaveURL(/(page|p)=2/);
    });
  });



  // ============================================================================
  // NHÓM 5: SẮP XẾP & PHÂN TRANG (SORT & PAGINATION)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-033: [SORT NEWEST & KEEP SORT] Sắp xếp theo "新着順" (Mới nhất) và giữ nguyên khi sang Trang 2 (Sheet Case 15)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-033: Guest sắp xếp theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2 @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectNewestSort();

    await test.step('Verify URL cập nhật tham số srt=-releasedate và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sắp xếp mới nhất phải có ảnh hiển thị').toBeGreaterThan(0);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL và trạng thái sắp xếp "新着順" vẫn giữ nguyên trên Trang 2', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      await expect(page).toHaveURL(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-034: [SORT RESTRICTION] Sắp xếp "人気順" (Phổ biến) bị chặn đối với Guest
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-034: Guest bị chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium @regression @guest', async ({
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
   * TC-SEARCH-GUEST-035: [PAGINATION & DISPLAY COUNT 70] Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang (Sheet Case 12, 20, 23)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-035: Guest hiển thị mặc định 70 ảnh/trang và chuyển trang phân trang (Next / Prev) thành công @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify menu "表示件数" có radio 70件 được check mặc định và đếm số lượng trang 1', async () => {
      await searchResultPage.openSortDropdown();
      await expect(searchResultPage.displayCount70Radio).toBeChecked();
      await expect(searchResultPage.sortDropdownButton).toContainText('70件表示');
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage1, 'Trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });

    await test.step('Click nút Next và verify sang trang 2 tiếp tục hiển thị trong giới hạn tối đa 70 ảnh', async () => {
      await searchResultPage.goToNextPage();
      await expect(page).toHaveURL(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('2');
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Trang 2 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countPage2, 'Trang 2 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });

    await test.step('Click nút Prev và verify quay lại trang 1 linh hoạt', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/search_word=cat|q=cat/);
      expect(page.url()).not.toMatch(/(page|p)=2/);
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
      const countBackToPage1 = await searchResultPage.getResultCount();
      expect(countBackToPage1, 'Quay lại trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
      expect(countBackToPage1, 'Quay lại trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
    });
  });

  // ============================================================================
  // NHÓM 5: PHÂN QUYỀN & HẠN MỨC GUEST USER (PERMISSIONS & LIMITS)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-038: [SEARCH LIMIT] Chạm hạn mức tìm kiếm (4 lần/ngày)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-038: Guest chạm hạn mức tìm kiếm hiển thị Modal giới hạn và CTA Đăng ký @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    // Mô phỏng endpoint kiểm tra hạn mức tìm kiếm trả về hết lượt sau chuỗi tìm kiếm (桜, 学生, 景色, 山)
    await page.route('**/*is_enable_search*', async (route) => {
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

    await test.step('Verify Modal giới hạn tìm kiếm (#searchLimitModal) hiển thị', async () => {
      await searchResultPage.waitForSearchLimitModal();
      await expect(searchResultPage.searchLimitTitle).toContainText('無料のキーワード検索は「1日4回」までです。');
    });

    await test.step('Verify Guest nhìn thấy CTA Đăng ký tài khoản nhận 15pt và link Premium', async () => {
      await expect(searchResultPage.searchLimitRegisterCta).toBeVisible();
      await expect(searchResultPage.searchLimitRegisterCta).toContainText('無料会員登録してACポイント');
      await expect(searchResultPage.searchLimitPremiumLink).toBeVisible();
    });
  });
});

