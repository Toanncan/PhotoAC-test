import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH FEATURE — GUEST USER (CHƯA ĐĂNG NHẬP / NO-LOGIN)
 * ============================================================================
 * Đặc tả chuẩn hóa đối chiếu 100% theo Google Spreadsheet QA (Search Function Page):
 * - Không có session login (storageState: { cookies: [], origins: [] }).
 * - 100% Mô phỏng người dùng thật (True User Simulation - E2E Testing): Thao tác trực tiếp
 *   trên Filter Toolbar, dropdown menu, popover và search box; không bypass bằng URL query injection.
 * - Bao phủ 100% toàn bộ các bộ lọc trên trang Search Result:
 *   + Định dạng & Kích thước: Vertical, Horizontal, PSD, Mサイズ以上 (sizesec=m), Lサイズ (sizesec=l).
 *   + Danh mục (Category): 人物 (People), v.v. qua Toolbar dropdown.
 *   + Màu sắc: Bảng 10 màu sắc (Blue, etc.) qua Toolbar.
 *   + Nhân chủng / Người mẫu: 0 người (無人), 1 người, 3 người trở lên, Độ tuổi (若者 - age=W).
 *   + Điều kiện hiển thị: Model Release (mdlrlrsec=on), Property Release (prprlrsec=on), Exclude AI, Exact Match.
 *   + Chi tiết: Tên tác giả (Acworks), Loại trừ tác giả (ngcreator=Acworks), Mã素材ID (qid=1597634).
 *   + Từ khóa loại trừ (nq=dog).
 * - Sắp xếp: Mặc định "関連性の高い順", cho phép "新着順", chặn "人気順" (Popover Premium).
 * - Phân trang (Pagination): Giữ nguyên Sort đã chọn và Display Count (70 ảnh/trang) khi chuyển trang.
 * - Đề xuất & Định dạng chuyên sâu: Recommended Search (rcm=1), PSD Format Search (sizesec=psd).
 * - Phân quyền & Hạn mức: Giới hạn 4 lần/ngày (#searchLimitModal) & Trạng thái AI Search Toggle.
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
      await expect(page).toHaveURL(/\/main\/search\?/);
      await expect(searchResultPage.resultHeading).toContainText(`「${multiKeyword}」の写真素材`);
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
   * TC-SEARCH-GUEST-004: Tìm kiếm tiếp từ thanh tìm kiếm trên trang kết quả (Search Again)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-004: Guest tìm kiếm từ khóa mới trực tiếp từ trang kết quả @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

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
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-005: Xóa nhanh từ khóa trong ô tìm kiếm bằng nút Reset @regression @guest', async ({
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
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(firstTagText)}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${firstTagText}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // NHÓM 2: BỘ LỌC ĐƠN LẺ TRÊN THANH CÔNG CỤ (FILTER TOOLBAR - SINGLE FILTERS)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-008: [FILTER - ORIENTATION] Lọc ảnh theo Chiều dọc (縦長) qua toolbar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-008: Guest lọc kết quả theo Chiều dọc (縦長) qua Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectOrientation('vertical');

    await test.step('Verify URL cập nhật tham số orientation=0 và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/orientation=0/);
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều dọc phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-009: [FILTER - ORIENTATION] Lọc ảnh theo Chiều ngang (横長) qua toolbar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-009: Guest lọc kết quả theo Chiều ngang (横長) qua Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectOrientation('horizontal');

    await test.step('Verify URL cập nhật tham số orientation=1', async () => {
      await expect(page).toHaveURL(/orientation=1/);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-010: [FILTER - PSD FORMAT] Lọc định dạng ảnh PSD qua Toolbar "ファイル・向き"
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-010: Guest lọc định dạng ảnh PSD qua Toolbar "ファイル・向き" @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('frame');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPsdFormat();

    await test.step('Verify URL chứa tham số sizesec=psd và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=psd/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-011: [FILTER - SIZE M] Lọc kích thước ảnh Mサイズ以上 qua Toolbar "ファイル・向き"
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "ファイル・向き" và chọn Mサイズ以上
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-011: Guest lọc kích thước ảnh Mサイズ以上 qua Toolbar "ファイル・向き" @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectSize('m');

    await test.step('Verify URL cập nhật tham số sizesec=m và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=m/);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-012: [FILTER - SIZE L] Lọc kích thước ảnh Lサイズ qua Toolbar "ファイル・向き"
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "ファイル・向き" và chọn Lサイズ
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-012: Guest lọc kích thước ảnh Lサイズ qua Toolbar "ファイル・向き" @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectSize('l');

    await test.step('Verify URL cập nhật tham số sizesec=l và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=l/);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
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

    await test.step('Verify URL cập nhật tham số danh mục c_names[]=1 hoặc c_id=1', async () => {
      await expect(page).toHaveURL(/c_names.*=1|c_id=1/);
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

    await test.step('Verify URL cập nhật tham số color=0000d6', async () => {
      await expect(page).toHaveURL(/color=0000d6/);
      await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-015: [FILTER - MODEL COUNT] Lọc ảnh Không có người (無人 / model_count=0) qua Toolbar
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "人物指定" và chọn 無人
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-015: Guest lọc ảnh Không có người (無人) qua Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'office';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectModelCount('0');

    await test.step('Verify URL cập nhật tham số model_count=0', async () => {
      await expect(page).toHaveURL(/model_count=0/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-016: [FILTER - MODEL COUNT] Lọc ảnh có 1 người mẫu (1人 / model_count=1) qua Toolbar
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "人物指定" và chọn 1人
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-016: Guest lọc ảnh có 1 người mẫu (1人) qua Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'ビジネス';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectModelCount('1');

    await test.step('Verify URL cập nhật tham số model_count=1', async () => {
      await expect(page).toHaveURL(/model_count=1/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-017: [FILTER - MODEL COUNT] Lọc ảnh có từ 3 người mẫu trở lên (3人以上 / model_count=3) qua Toolbar
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "人物指定" và chọn 3人以上
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-017: Guest lọc ảnh có từ 3 người mẫu trở lên (3人以上) qua Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '家族';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectModelCount('3');

    await test.step('Verify URL cập nhật tham số model_count=3', async () => {
      await expect(page).toHaveURL(/model_count=3/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-018: [FILTER - AGE] Lọc người mẫu theo Độ tuổi (若者 / age=W) qua Toolbar "人物指定"
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "人物指定" và chọn 年代 若者
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-018: Guest lọc người mẫu theo Độ tuổi (若者) qua Toolbar "人物指定" @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '学生';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectAge('young');

    await test.step('Verify URL cập nhật tham số age=W', async () => {
      await expect(page).toHaveURL(/age=W/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-019: [FILTER - MODEL RELEASE] Lọc ảnh có Giấy phép người mẫu (取得済のみ / mdlrlrsec=on)
   * 100% E2E True User Simulation: Thao tác mở menu "表示条件" và chọn モデルリリース取得済のみ
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-019: Guest lọc ảnh có Giấy phép người mẫu (取得済のみ) qua menu Display Conditions @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '女性';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectModelRelease(true);

    await test.step('Verify URL cập nhật tham số mdlrlrsec=on', async () => {
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-020: [FILTER - PROPERTY RELEASE] Lọc ảnh có Giấy phép tài sản (プロパティリリース取得済のみ / prprlrsec=on)
   * 100% E2E True User Simulation: Thao tác mở menu "表示条件" và chọn プロパティリリース取得済のみ
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-020: Guest lọc ảnh có Giấy phép tài sản (取得済のみ) qua menu Display Conditions @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = '建物';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectPropertyRelease(true);

    await test.step('Verify URL cập nhật tham số prprlrsec=on', async () => {
      await expect(page).toHaveURL(/prprlrsec=on/);
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

    await test.step('Verify URL cập nhật tham số type_search=phrase', async () => {
      await expect(page).toHaveURL(/type_search=phrase/);
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

    await test.step('Verify URL cập nhật tham số nq=dog', async () => {
      await expect(page).toHaveURL(new RegExp(`nq=${excludeKeyword}`));
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

    await test.step('Verify URL và heading phản ánh tác giả Acworks', async () => {
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`, 'i'));
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
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

    await test.step('Verify URL cập nhật tham số ngcreator=Acworks và trạng thái kết quả hiển thị', async () => {
      await expect(page).toHaveURL(new RegExp(`ngcreator=${ngCreatorName}`, 'i'));
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

  /**
   * TC-SEARCH-GUEST-026: [QA SHEET FILTER COMBO] Keyword "学生" + 2 người mẫu + Model Release (Sheet Case 3)
   * 100% E2E True User Simulation: Thao tác click chọn trực tiếp trên Filter Toolbar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-026: Guest kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('学生');
    await searchResultPage.waitForResultDisplay();

    await test.step('Chọn số lượng người mẫu: 2人 trên toolbar', async () => {
      await searchResultPage.selectModelCount('2');
      await expect(page).toHaveURL(/model_count=2/);
    });

    await test.step('Tích chọn Model Release: 取得済のみ trên toolbar', async () => {
      await searchResultPage.selectModelRelease(true);
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-027: [MULTI-FILTER] Kết hợp Từ khóa + Chiều ngang + Không có người (無人) + Loại trừ AI
   * 100% E2E True User Simulation: Thao tác click chọn tuần tự trên Filter Toolbar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-027: Guest kết hợp Đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'office';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await test.step('Chọn chiều ảnh: 横長 (Horizontal) trên toolbar', async () => {
      await searchResultPage.selectOrientation('horizontal');
      await expect(page).toHaveURL(/orientation=1/);
    });

    await test.step('Chọn không có người: 無人 (0 models) trên toolbar', async () => {
      await searchResultPage.selectModelCount('0');
      await expect(page).toHaveURL(/model_count=0/);
    });

    await test.step('Tích chọn loại trừ AI: exclude_ai=on trên toolbar', async () => {
      await searchResultPage.toggleExcludeAi(true);
      await expect(page).toHaveURL(/exclude_ai=on/);
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
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
      await expect(searchResultPage.resultHeading).toContainText('アップロードされた画像に似ている写真素材');
      const count = await searchResultPage.getResultCount();
      expect(count, 'Phải có hình ảnh tương đồng được hiển thị').toBeGreaterThan(0);
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

    await test.step('Verify URL và kết quả trả về đúng 1 ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
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
      await expect(searchResultPage.resultHeading).toContainText('「おすすめ」の写真素材');
      const count = await searchResultPage.getResultCount();
      expect(count).toBe(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số rcm=1 và referer khi sang trang 2', async () => {
      await expect(page).toHaveURL(/rcm=1/);
      await expect(page).toHaveURL(/referer=more_recommended/);
      await expect(page).toHaveURL(/p=2/);
    });
  });

  /**
   * TC-SEARCH-GUEST-031: [PSD FORMAT SEARCH] Tìm kiếm ảnh định dạng PSD và phân trang (Sheet Case 25: sizesec=psd)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-031: Truy cập PSD Format Search và giữ tham số sizesec=psd khi chuyển trang @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.goToPsdSearch();

    await test.step('Verify trang PSD Search hiển thị tiêu đề PSD素材', async () => {
      await expect(searchResultPage.resultHeading).toContainText('PSD素材');
      const count = await searchResultPage.getResultCount();
      expect(count).toBe(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify URL giữ nguyên tham số sizesec=psd khi sang trang 2', async () => {
      await expect(page).toHaveURL(/sizesec=psd/);
      await expect(page).toHaveURL(/referer=category_psd/);
      await expect(page).toHaveURL(/p=2/);
    });
  });

  /**
   * TC-SEARCH-GUEST-032: [AI FACE SEARCH] Tìm kiếm bằng AI Face từ trang Detail (Sheet Case 17, 27)
   * Đặc tả: Truy cập trang chi tiết ảnh có AI model, click vào thumbnail nhỏ tại mục AI Face / AIで同じモデルの写真を探す,
   * verify chuyển hướng đến trang kết quả tìm kiếm với tham số vector_face, hiển thị đúng dữ liệu và giữ nguyên khi phân trang.
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-032: Guest click AI Face thumbnail từ trang Detail tìm kiếm ảnh cùng khuôn mặt và giữ nguyên khi phân trang @regression @guest', async ({
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
  // NHÓM 5: SẮP XẾP & PHÂN TRANG (SORT & PAGINATION)
  // ============================================================================

  /**
   * TC-SEARCH-GUEST-033: [SORT NEWEST] Sắp xếp kết quả theo "新着順" (Mới nhất)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-033: Guest sắp xếp kết quả theo "新着順" (Mới nhất) thành công @regression @guest', async ({
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
   * TC-SEARCH-GUEST-035: [PAGINATION] Phân trang - Chuyển trang tiếp theo (Next) và trang trước (Prev)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-035: Guest chuyển trang phân trang (Next / Prev) thành công @regression @guest', async ({
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
   * TC-SEARCH-GUEST-036: [PAGINATION - KEEP SORT] Giữ nguyên thứ tự Sắp xếp đã chọn khi chuyển trang (Sheet Case 15)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-036: Giữ nguyên tùy chọn Sắp xếp "新着順" khi chuyển sang Trang 2 @regression @guest', async ({
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
   * TC-SEARCH-GUEST-037: [PAGINATION - DISPLAY COUNT] Kiểm tra hiển thị mặc định 70 ảnh/trang (Sheet Case 12, 20, 23)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-037: Verify số lượng ảnh hiển thị mặc định đạt 70 ảnh trên mỗi trang và radio 70 được check default @regression @guest', async ({
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

    await test.step('Verify trang 1 hiển thị 70 ảnh mặc định', async () => {
      const countPage1 = await searchResultPage.getResultCount();
      expect(countPage1, 'Số lượng ảnh mặc định phải là 70').toBe(70);
    });

    await searchResultPage.goToNextPage();

    await test.step('Verify trang 2 tiếp tục hiển thị đủ 70 ảnh', async () => {
      const countPage2 = await searchResultPage.getResultCount();
      expect(countPage2, 'Số lượng ảnh trên trang 2 phải là 70').toBe(70);
    });
  });

  // ============================================================================
  // NHÓM 6: PHÂN QUYỀN & HẠN MỨC GUEST USER (PERMISSIONS & LIMITS & AI SEARCH)
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

  /**
   * TC-SEARCH-GUEST-039: [AI SEARCH INITIAL STATE] Khách vãng lai khi chưa chạm hạn mức tìm kiếm thì AI Toggle tự động tắt
   * @tags @regression @guest
   * Đặc tả: Khi Guest chưa chạm hạn mức tìm kiếm thông thường (search_zancnt != 0), AI Toggle tự động tắt,
   * nút .search-by-ai ở trạng thái disabled và không có màu vàng kích hoạt.
   */
  test('TC-SEARCH-GUEST-039: Khách vãng lai khi chưa chạm hạn mức tìm kiếm thì AI Toggle tự động tắt @regression @guest', async ({
    homePage,
  }) => {
    await test.step('Verify nút AI Search (.search-by-ai) hiển thị trên Top Page', async () => {
      await expect(homePage.searchByAiButton).toBeVisible();
    });

    await test.step('Verify AI Toggle ở trạng thái tự động tắt khi chưa chạm hạn mức tìm kiếm', async () => {
      await expect(homePage.aiSearchOffIcon).toBeVisible();
      await expect(homePage.aiSearchOnIcon).toBeHidden();
      await expect(homePage.byAiInput).toHaveValue('0');
      await expect(homePage.searchByAiButton).toBeDisabled();
    });
  });

  /**
   * TC-SEARCH-GUEST-040: [AI SEARCH AUTO-ACTIVATION ON LIMIT] Khách vãng lai khi đạt hạn mức tìm kiếm thì AI Toggle tự động bật màu vàng và cho phép nhập tìm kiếm bằng AI
   * @tags @regression @guest
   * Đặc tả: Khi Guest đạt hạn mức tìm kiếm thông thường (search_zancnt == 0), hệ thống tự động kích hoạt
   * AI Toggle (nền màu vàng bg-FFF8D5, icon ON hiển thị, by_ai=1), người dùng nhập câu tìm kiếm tự nhiên
   * vào ô search và submit kết quả bằng AI theo đúng hành vi người dùng thật.
   */
  test('TC-SEARCH-GUEST-040: Khách vãng lai khi đạt hạn mức tìm kiếm thì AI Toggle tự động bật màu vàng và cho phép nhập tìm kiếm bằng AI @regression @guest', async ({
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

    await test.step('Thực hiện hành vi người dùng: nhập câu tìm kiếm tự nhiên và submit tìm kiếm bằng AI', async () => {
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

    await test.step('Verify URL chứa tham số by_ai=1 và tiêu đề phản ánh đúng câu truy vấn', async () => {
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
});
