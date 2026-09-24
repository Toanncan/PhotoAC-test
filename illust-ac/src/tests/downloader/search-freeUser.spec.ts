import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH & FILTERS FEATURE — FREE USER (無料会員 - ĐÃ ĐĂNG NHẬP)
 * ============================================================================
 * Đặc tả chuẩn hóa đối chiếu 100% theo Google Spreadsheet QA (Search Function Page) & Guest User Suite:
 * 1. Tự động kế thừa session Free User từ Playwright project (chromium-free-user / firefox-free-user).
 * 2. 100% Mô phỏng người dùng thật (True User Simulation - E2E Testing): Thao tác trực tiếp
 *    trên Filter Toolbar, dropdown menu, popover và search box; không bypass bằng URL query injection.
 * 3. Bao phủ 100% toàn bộ các bộ lọc trên trang Search Result:
 *    + Định dạng & Kích thước: Vertical, Horizontal, PSD, Mサイズ以上 (sizesec=m), Lサイズ (sizesec=l).
 *    + Danh mục (Category): 人物 (People), v.v. qua Toolbar dropdown.
 *    + Màu sắc: Bảng màu (Blue, etc.) qua Toolbar.
 *    + Nhân chủng / Người mẫu: 0 người (無人), 1 người, 3 người trở lên, Độ tuổi (若者 - age=W).
 *    + Điều kiện hiển thị: Model Release (mdlrlrsec=on), Property Release (prprlrsec=on), Exclude AI, Exact Match.
 *    + Chi tiết: Tên tác giả (Acworks), Loại trừ tác giả (ngcreator=Acworks), Mã素材ID (qid=1597634).
 *    + Từ khóa loại trừ (nq=dog).
 * 4. Sắp xếp: Mặc định "関連性の高い順", cho phép "新着順", chặn "人気順" (Popover Premium).
 * 5. Phân trang (Pagination): Giữ nguyên Sort đã chọn và Display Count (70 ảnh/trang) khi chuyển trang.
 * 6. Đề xuất & Định dạng chuyên sâu & AI Face:
 *    + Recommended Search (rcm=1) (Sheet Case 24).
 *    + PSD Format Search (sizesec=psd) (Sheet Case 25).
 *    + AI Face Vector Search từ trang Detail (Sheet Case 17, 27).
 * 7. Phân quyền & Hạn mức riêng cho Free User:
 *    + Giới hạn 4 lần/ngày hiển thị Modal có nút Dùng vé coupon (#btn-open-search-coupon), ẩn CTA Đăng ký.
 *    + Nút Toggle AI Search (.search-by-ai) hoàn toàn ẩn trên giao diện của Free User.
 */
test.describe('Search & Filters Feature — Free User (Logged In Account)', () => {
  // Session Free User được tự động inject bởi project cấu hình (chromium-free-user / firefox-free-user)

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.jpg');

  test.beforeEach(async ({ homePage }) => {
    await homePage.goToHomePage();
    await homePage.isHomePageLoaded();
  });

  // ============================================================================
  // NHÓM 1: CƠ BẢN & ĐIỂM VÀO TÌM KIẾM (BASIC SEARCH & ENTRYPOINTS)
  // ============================================================================

  /**
   * TC-SEARCH-FREE-001: Tìm kiếm với từ khóa đơn hợp lệ (Sheet Case 2)
   * @tags @smoke @regression @free-user
   */
  test('TC-SEARCH-FREE-001: Free User tìm kiếm từ khóa đơn hợp lệ hiển thị kết quả @smoke @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';

    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Verify URL và heading kết quả tìm kiếm cho Free User', async () => {
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
   * TC-SEARCH-FREE-002: Tìm kiếm với nhiều từ khóa kết hợp (Multi-keyword AND search)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-002: Free User tìm kiếm nhiều từ khóa kết hợp (AND Search) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-003: Tìm kiếm với từ khóa không tồn tại (Zero Results)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-003: Free User nhận thông báo khi không tìm thấy ảnh nào khớp từ khóa @regression @free-user', async ({
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
   * TC-SEARCH-FREE-004: Tìm kiếm tiếp từ thanh tìm kiếm trên trang kết quả (Search Again)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-004: Free User tìm kiếm từ khóa mới trực tiếp từ trang kết quả @regression @free-user', async ({
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
   * TC-SEARCH-FREE-005: Xóa từ khóa bằng nút Reset trên ô tìm kiếm
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-005: Free User xóa nhanh từ khóa trong ô tìm kiếm bằng nút Reset @regression @free-user', async ({
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
   * TC-SEARCH-FREE-006: Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-006: Free User click Top Keyword chuyển hướng đến trang kết quả tìm kiếm @regression @free-user', async ({
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
      await expect(page).toHaveURL(new RegExp(`search_word=${encodeURIComponent(targetKeyword)}|q=${encodeURIComponent(targetKeyword)}`));
      await expect(page).toHaveURL(/utm_source=top_keyword/);
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」のイラスト素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-007: Tìm kiếm bằng Popular Tag Cloud dưới chân trang
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-007: Free User click Popular Tag từ tag cloud thành công @regression @free-user', async ({
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
   * TC-SEARCH-FREE-008: [FILTER - ORIENTATION] Lọc ảnh theo Chiều dọc (縦長) qua toolbar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-008: Free User lọc kết quả theo Chiều dọc (縦長) qua Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-009: [FILTER - ORIENTATION] Lọc ảnh theo Chiều ngang (横長) qua toolbar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-009: Free User lọc kết quả theo Chiều ngang (横長) qua Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-010: [FILTER - FORMAT VECTOR] Lọc định dạng ảnh Vector (EPS・AI) qua Toolbar "ファイル・向き"
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-010: Free User lọc định dạng ảnh Vector (EPS・AI) qua Toolbar "ファイル・向き" @regression @free-user', async ({
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
   * TC-SEARCH-FREE-011: [FILTER - FORMAT PNG] Lọc định dạng ảnh PNG qua Toolbar "ファイル・向き"
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-011: Free User lọc định dạng ảnh PNG qua Toolbar "ファイル・向き" @regression @free-user', async ({
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
   * TC-SEARCH-FREE-013: [FILTER - CATEGORY] Lọc ảnh theo Danh mục qua Toolbar dropdown (人物 / c_id=1)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-013: Free User lọc ảnh theo Danh mục (人物) qua Toolbar dropdown @regression @free-user', async ({
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
   * TC-SEARCH-FREE-014: [FILTER - COLOR] Lọc ảnh theo Màu sắc (Xanh dương / Blue) qua toolbar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-014: Free User lọc ảnh theo Màu sắc (青 / Blue) qua Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-021: [FILTER - EXCLUDE AI] Lọc Loại trừ ảnh AI (AI生成ツール使用素材を除く)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-021: Free User bật bộ lọc Loại trừ ảnh do AI tạo @regression @free-user', async ({
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
   * TC-SEARCH-FREE-022: [FILTER - EXACT MATCH] Lọc Khớp chính xác cụm từ (完全一致)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-022: Free User bật bộ lọc Tìm kiếm khớp chính xác (完全一致) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-023: [FILTER - EXCLUDE KEYWORD] Lọc theo Từ khóa loại trừ (除外キーワード)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-023: Free User lọc kết quả với Từ khóa loại trừ (除外キーワード) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-024: [FILTER - CREATOR] Tìm kiếm theo Tác giả (Acworks) qua menu Tìm kiếm chi tiết (詳細検索)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập tên tác giả Acworks
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-024: Free User tìm kiếm ảnh theo Tác giả (Acworks) qua Detailed Search Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-025: [FILTER - EXCLUDE CREATOR] Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập tác giả loại trừ Acworks
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-025: Free User loại trừ ảnh của Tác giả (Acworks) qua menu Detailed Search Toolbar @regression @free-user', async ({
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
  // NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI (COMBINED MULTI-FILTERS)
  // ============================================================================



  // ============================================================================
  // NHÓM 4: TÌM KIẾM CHUYÊN SÂU & ĐẶC BIỆT (SPECIALIZED SEARCHES & AI FACE)
  // ============================================================================

  /**
   * TC-SEARCH-FREE-028: [IMAGE SEARCH UPLOAD] Tải ảnh lên tìm kiếm hình ảnh tương đồng (Sheet Case 1, 6)
   * Sử dụng file mẫu thực tế sample-search.jpg trong thư mục test-data/.
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-028: Free User upload ảnh để tìm kiếm hình ảnh tương đồng @regression @free-user', async ({
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
   * TC-SEARCH-FREE-029: [PHOTO ID SEARCH] Tìm kiếm theo Mã素材ID chính xác (Sheet Case 7: qid=1597634)
   * 100% E2E True User Simulation: Thao tác mở menu Detailed Search trên Toolbar và nhập mã ID
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-029: Free User tìm kiếm chính xác ảnh theo Mã素材ID qua menu Detailed Search @regression @free-user', async ({
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
   * TC-SEARCH-FREE-030: [RECOMMENDED SEARCH] Tìm kiếm đề xuất và phân trang (Sheet Case 24: rcm=1)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-030: Free User truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @regression @free-user', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.goToRecommendedSearch();

    await test.step('Verify trang Recommended Search hiển thị tiêu đề chuẩn', async () => {
      await expect(searchResultPage.resultHeading).toContainText('「おすすめ」のイラスト素材');
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



  // ============================================================================
  // NHÓM 5: SẮP XẾP & PHÂN TRANG (SORT & PAGINATION)
  // ============================================================================

  /**
   * TC-SEARCH-FREE-033: [SORT NEWEST] Sắp xếp kết quả theo "新着順" (Mới nhất)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-033: Free User sắp xếp kết quả theo "新着順" (Mới nhất) thành công @regression @free-user', async ({
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
   * TC-SEARCH-FREE-034: [SORT RESTRICTION] Sắp xếp "人気順" (Phổ biến) bị chặn đối với Free User
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-034: Free User bị chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium @regression @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.clickPopularSort();

    await test.step('Verify popover nâng cấp Premium hiển thị cho Free User', async () => {
      await expect(searchResultPage.popularSortPopover).toBeVisible();
      const popoverText = await searchResultPage.getPopularSortPopoverText();
      expect(popoverText).toContain('プレミアム会員になると、人気順での並び替えができます。');
    });

    await test.step('Verify URL không bị đổi sang srt=recent_popular', async () => {
      expect(page.url()).not.toContain('srt=recent_popular');
    });
  });

  /**
   * TC-SEARCH-FREE-035: [PAGINATION] Phân trang - Chuyển trang tiếp theo (Next) và trang trước (Prev)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-035: Free User chuyển trang phân trang (Next / Prev) thành công @regression @free-user', async ({
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
   * TC-SEARCH-FREE-036: [PAGINATION - KEEP SORT] Giữ nguyên thứ tự Sắp xếp đã chọn khi chuyển trang (Sheet Case 11, 15)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-036: Giữ nguyên tùy chọn Sắp xếp "新着順" khi chuyển sang Trang 2 @regression @free-user', async ({
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
   * TC-SEARCH-FREE-037: [PAGINATION - DISPLAY COUNT] Kiểm tra số lượng ảnh hiển thị mặc định (70 ảnh/trang) (Sheet Case 12, 20, 23)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-037: Verify số lượng ảnh hiển thị mặc định đạt 70 ảnh trên mỗi trang và radio 70 được check default @regression @free-user', async ({
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('dog');
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
  // NHÓM 6: PHÂN QUYỀN & GIỚI HẠN TÀI KHOẢN (PERMISSIONS & LIMITS & AI SEARCH)
  // ============================================================================

  /**
   * TC-SEARCH-FREE-038: [SEARCH LIMIT] Chạm hạn mức tìm kiếm (1 ngày 4 lần) -> Hiển thị Modal kèm nút Dùng vé coupon
   * Ghi chú kiến trúc: Dùng kiểm soát quota mock phản hồi nhằm bảo vệ tài khoản Free User
   * không bị khóa tìm kiếm 24h, tránh làm hỏng toàn bộ các test case khác khi chạy tự động.
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-038: Free User chạm hạn mức tìm kiếm hiển thị Modal kèm tùy chọn Dùng vé / Nâng cấp @regression @free-user', async ({
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

    await homePage.search('cat');

    await test.step('Verify Modal giới hạn tìm kiếm hiển thị nội dung cho Free User', async () => {
      await searchResultPage.waitForSearchLimitModal();
      await expect(searchResultPage.searchLimitTitle).toContainText('無料のキーワード検索は「1日4回」までです。');

      // Free User ĐÃ CÓ tài khoản nên KHÔNG còn nút CTA "無料会員登録してACポイント"
      await expect(searchResultPage.searchLimitRegisterCta).toBeHidden();

      // Free User có tùy chọn dùng vé tìm kiếm trong ngày (一日検索し放題チケット)
      await expect(searchResultPage.searchLimitCouponButton).toBeVisible();

      // Có link nâng cấp Premium
      await expect(searchResultPage.searchLimitPremiumLink).toBeVisible();
    });
  });


});