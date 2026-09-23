import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH & FILTERS FEATURE — PREMIUM USER (プレミアム会員 - TRẢ PHÍ)
 * ============================================================================
 * Đặc tả chuẩn hóa đối chiếu 100% theo Google Spreadsheet QA (Search Function Page):
 * - Kế thừa tự động session Premium User từ project (chromium-downloader / firefox-downloader) qua .auth/premium-user.json.
 * - 100% Mô phỏng người dùng thật (True User Simulation - E2E Testing): Thao tác trực tiếp trên giao diện UI Toolbar.
 * - Kiểm thử toàn diện các đặc quyền riêng biệt của Premium User:
 *   + Không giới hạn tìm kiếm (Unlimited Search Quota) — Hoàn toàn không bị giới hạn 4 lần/ngày.
 *   + Cho phép sắp xếp "人気順" (Popularity sort - srt=recent_popular) thành công, không bị chặn bởi popover nâng cấp.
 *   + Giữ nguyên thứ tự Sắp xếp (Sort persistence) khi phân trang (Sheet Case 13, 15).
 *   + Hiển thị 210 ảnh/trang (đặc quyền Premium, khác biệt so với Free/Guest 70 ảnh/trang) và giữ nguyên khi chuyển trang (Sheet Case 14, 16, 21).
 *   + Tìm kiếm bằng hình ảnh (Image Search Upload - Sheet Case 8).
 *   + Bao phủ đầy đủ các bộ lọc khả dụng thực tế trên Illust-AC.
 */
test.describe('Search & Filters Feature — Premium User (Paid Downloader Account)', () => {
  // Session Premium User được tự động inject bởi project cấu hình (chromium-downloader / firefox-downloader)

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ homePage }) => {
    await homePage.goToHomePage();
    await homePage.isHomePageLoaded();
  });

  // ============================================================================
  // NHÓM 1: CƠ BẢN & ĐIỂM VÀO TÌM KIẾM (BASIC SEARCH & ENTRYPOINTS)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-001: Tìm kiếm với từ khóa đơn hợp lệ (Sheet Case 9)
   * @tags @smoke @regression @premium
   */
  test('TC-SEARCH-PREM-001: Premium User tìm kiếm từ khóa đơn hợp lệ hiển thị kết quả @smoke @premium', async ({
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
  test('TC-SEARCH-PREM-002: Premium User tìm kiếm nhiều từ khóa kết hợp (AND Search) @regression @premium', async ({
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
  test('TC-SEARCH-PREM-003: Premium User nhận thông báo khi không tìm thấy ảnh nào khớp từ khóa @regression @premium', async ({
    homePage,
    searchResultPage,
  }) => {
    const nonexistentKeyword = 'xyz_nonexistent_photo_99999';

    await homePage.search(nonexistentKeyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify thông báo không có kết quả hiển thị chuẩn xác', async () => {
      await expect(searchResultPage.noResultMessage.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh hiển thị phải bằng 0').toBe(0);
    });
  });

  /**
   * TC-SEARCH-PREM-004: Tìm kiếm tiếp từ thanh tìm kiếm trên trang kết quả (Search Again)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-004: Premium User tìm kiếm từ khóa mới trực tiếp từ trang kết quả @regression @premium', async ({
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
      await expect(page).toHaveURL(new RegExp(`search_word=${newKeyword}|q=${newKeyword}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${newKeyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-005: Xóa từ khóa bằng nút Reset trên ô tìm kiếm
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-005: Premium User xóa nhanh từ khóa trong ô tìm kiếm bằng nút Reset @regression @premium', async ({
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
   * TC-SEARCH-PREM-006: Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-006: Premium User click Top Keyword chuyển hướng đến trang kết quả tìm kiếm @regression @premium', async ({
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

    await test.step('Verify URL và heading kết quả từ Top Keyword cho Premium User', async () => {
      await expect(page).toHaveURL(new RegExp(`search_word=${encodeURIComponent(targetKeyword)}|q=${encodeURIComponent(targetKeyword)}`));
      await expect(page).toHaveURL(/utm_source=top_keyword/);
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-007: Tìm kiếm bằng Popular Tag Cloud dưới chân trang
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-007: Premium User click Popular Tag từ tag cloud thành công @regression @premium', async ({
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
   * TC-SEARCH-PREM-008: [FILTER - ORIENTATION] Lọc ảnh theo Chiều dọc (縦長) qua toolbar
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-008: Premium User lọc kết quả theo Chiều dọc (縦長) qua Toolbar @regression @premium', async ({
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
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều dọc phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-009: [FILTER - ORIENTATION] Lọc ảnh theo Chiều ngang (横長) qua toolbar
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-009: Premium User lọc kết quả theo Chiều ngang (横長) qua Toolbar @regression @premium', async ({
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
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-010: [FILTER - FORMAT VECTOR] Lọc định dạng ảnh Vector (EPS・AI) qua Toolbar "ファイル・向き"
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-010: Premium User lọc định dạng ảnh Vector (EPS・AI) qua Toolbar "ファイル・向き" @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectFormat('vector');

    await test.step('Verify URL chứa tham số format=vector và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/format=vector/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-011: [FILTER - FORMAT PNG] Lọc định dạng ảnh PNG qua Toolbar "ファイル・向き"
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-011: Premium User lọc định dạng ảnh PNG qua Toolbar "ファイル・向き" @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.selectFormat('png');

    await test.step('Verify URL chứa tham số format=png và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/format=png/);
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-013: [FILTER - CATEGORY] Lọc ảnh theo Danh mục qua Toolbar dropdown (人物 / c_id=1)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-013: Premium User lọc ảnh theo Danh mục (人物) qua Toolbar dropdown @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

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
   * TC-SEARCH-PREM-014: [FILTER - COLOR] Lọc ảnh theo Màu sắc (Xanh dương / Blue) qua toolbar
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-014: Premium User lọc ảnh theo Màu sắc (青 / Blue) qua Toolbar @regression @premium', async ({
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
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-021: [FILTER - EXCLUDE AI] Lọc Loại trừ ảnh AI (AI生成ツール使用素材を除く)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-021: Premium User bật bộ lọc Loại trừ ảnh do AI tạo @regression @premium', async ({
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
   * TC-SEARCH-PREM-022: [FILTER - EXACT MATCH] Lọc Khớp chính xác cụm từ (完全一致)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-022: Premium User bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @regression @premium', async ({
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
   * TC-SEARCH-PREM-023: [FILTER - EXCLUDE KEYWORD] Lọc theo Từ khóa loại trừ (除外キーワード)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-023: Premium User lọc kết quả với Từ khóa loại trừ (除外キーワード) @regression @premium', async ({
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
   * TC-SEARCH-PREM-024: [FILTER - CREATOR] Tìm kiếm theo Tác giả (Acworks) qua menu Tìm kiếm chi tiết (詳細検索)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập tên tác giả Acworks
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-024: Premium User tìm kiếm ảnh theo Tác giả (Acworks) qua Detailed Search Toolbar @regression @premium', async ({
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
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo tác giả phải trả về danh sách ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-PREM-025: [FILTER - EXCLUDE CREATOR] Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập tác giả loại trừ Acworks
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-025: Premium User loại trừ ảnh của Tác giả (Acworks) qua menu Detailed Search Toolbar @regression @premium', async ({
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
  // NHÓM 3: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT (SPECIALIZED SEARCHES)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-028: [IMAGE SEARCH UPLOAD] Tải ảnh lên tìm kiếm hình ảnh tương đồng (Sheet Case 8)
   * Sử dụng file mẫu thực tế sample-search.jpg trong thư mục test-data/.
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-028: Premium User upload ảnh để tìm kiếm hình ảnh tương đồng @regression @premium', async ({
    homePage,
    searchResultPage,
  }) => {
    await homePage.uploadImageForSearch(sampleImagePath);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify điều hướng tới trang kết quả tìm kiếm bằng hình ảnh', async () => {
      await expect(searchResultPage.resultHeading).toContainText('アップロードされた画像に似ているイラスト素材');
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
   * TC-SEARCH-PREM-029: [PHOTO ID SEARCH] Tìm kiếm theo Mã素材ID chính xác (Sheet Case 7: qid=1597634)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập mã ID
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-029: Premium User tìm kiếm chính xác ảnh theo Mã素材ID qua menu Detailed Search @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const photoId = '1597634';
    await homePage.search('flower');
    await searchResultPage.waitForResultDisplay();
    await searchResultPage.clearAllFilters();

    await searchResultPage.searchByDetailedPhotoId(photoId);

    await test.step('Verify URL, badge và kết quả trả về đúng ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
      await expect(searchResultPage.getActiveFilterBadge(photoId)).toBeVisible();
      await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo ID chính xác phải trả về ít nhất 1 ảnh').toBeGreaterThanOrEqual(1);
      await expect(searchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-PREM-030: [RECOMMENDED SEARCH] Tìm kiếm đề xuất và phân trang (Sheet Case 24: rcm=1)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-030: Premium User truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @regression @premium', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.goToRecommendedSearch();

    await test.step('Verify trang Recommended Search hiển thị tiêu đề chuẩn', async () => {
      await expect(searchResultPage.resultHeading).toContainText('「おすすめ」のイラスト素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Trang phải có ít nhất 1 ảnh hiển thị').toBeGreaterThan(0);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số rcm=1 và referer khi sang trang 2', async () => {
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/referer=more_recommended/);
      await expect(page).toHaveURL(/p=2/);
    });
  });

  // ============================================================================
  // NHÓM 4: ĐẶC QUYỀN SẮP XẾP & PHÂN TRANG CỦA PREMIUM USER (SORT & PAGINATION)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-033: [SORT POPULAR - PREMIUM PRIVILEGE] Sắp xếp theo "人気順" (Phổ biến) thành công (Sheet Case 13)
   * Đặc quyền Premium: Cho phép sắp xếp theo độ phổ biến, URL cập nhật srt=recent_popular,
   * KHÔNG bị popover chặn như Free/Guest User.
   * @tags @smoke @regression @premium
   */
  test('TC-SEARCH-PREM-033: Premium User sắp xếp "人気順" (Phổ biến) thành công không bị chặn @smoke @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
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
    });
  });

  /**
   * TC-SEARCH-PREM-034: [SORT NEWEST] Sắp xếp kết quả theo "新着順" (Mới nhất)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-034: Premium User sắp xếp kết quả theo "新着順" (Mới nhất) thành công @regression @premium', async ({
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
   * TC-SEARCH-PREM-035: [PAGINATION] Phân trang - Chuyển trang tiếp theo (Next) và trang trước (Prev)
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-035: Premium User chuyển trang phân trang (Next / Prev) thành công @regression @premium', async ({
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

    await test.step('Click nút Prev và verify quay lại trang 1 linh hoạt', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/search_word=cat|q=cat/);
      expect(page.url()).not.toContain('p=2');
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
    });
  });

  /**
   * TC-SEARCH-PREM-036: [PAGINATION - KEEP SORT] Giữ nguyên tùy chọn Sắp xếp khi chuyển sang Trang 2 (Sheet Case 13, 15)
   * Đặc tả: Khi Premium User chọn sắp xếp "関連性の高い順" hoặc "新着順", khi chuyển sang Trang 2
   * URL và trạng thái sort vẫn giữ nguyên, không tự động chuyển đổi sang sort khác.
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-036: Giữ nguyên tùy chọn Sắp xếp "新着順" khi chuyển sang Trang 2 @regression @premium', async ({
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
   * TC-SEARCH-PREM-037: [PAGINATION - DISPLAY COUNT 210] Kiểm tra số lượng ảnh hiển thị của Premium User (210 ảnh/trang) (Sheet Case 14, 16, 21)
   * Đặc quyền Premium: Cho phép hiển thị tối đa 210 record mỗi trang (khác biệt so với Free/Guest chỉ 70 record)
   * và giữ nguyên số lượng 210 record khi chuyển trang.
   * @tags @regression @premium
   */
  test('TC-SEARCH-PREM-037: Verify Premium User hiển thị 210 ảnh trên mỗi trang và giữ nguyên khi phân trang @regression @premium', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await test.step('Kiểm tra radio hiển thị mặc định của Premium User và chọn 210件', async () => {
      await searchResultPage.openSortDropdown();
      const is210Default = await searchResultPage.displayCount210Radio.isChecked();
      if (!is210Default) {
        // Nếu môi trường staging chưa set default 210, Premium User chủ động chọn 210件ずつ表示
        await searchResultPage.selectDisplayCount('210');
      }
      await expect(page).toHaveURL(/pp=210/);
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Số lượng ảnh hiển thị phải là 210').toBe(210);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify trang 2 tiếp tục giữ nguyên cấu hình pp=210 và hiển thị đủ 210 ảnh', async () => {
      await expect(page).toHaveURL(/pp=210/);
      await expect(page).toHaveURL(/p=2/);
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Số lượng ảnh trên trang 2 của Premium phải tiếp tục là 210').toBe(210);
    });
  });

  // ============================================================================
  // NHÓM 5: PHÂN QUYỀN KHÔNG GIỚI HẠN (UNLIMITED SEARCH)
  // ============================================================================

  /**
   * TC-SEARCH-PREM-038: [UNLIMITED SEARCH QUOTA] Premium User tìm kiếm không giới hạn số lần
   * Đặc quyền Premium: Không bị giới hạn 4 lần/ngày như Free/Guest, không xuất hiện modal #searchLimitModal.
   * @tags @smoke @regression @premium
   */
  test('TC-SEARCH-PREM-038: Premium User thực hiện tìm kiếm nhiều lần không bị giới hạn hạn mức @smoke @regression @premium', async ({
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
});
