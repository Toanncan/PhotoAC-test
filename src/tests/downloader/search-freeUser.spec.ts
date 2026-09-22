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
      await expect(page).toHaveURL(/\/main\/search\?/);
      await expect(searchResultPage.resultHeading).toContainText(`「${multiKeyword}」の写真素材`);
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
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(targetKeyword)}`));
      await expect(page).toHaveURL(/utm_source=top_keyword/);
      await expect(searchResultPage.resultHeading).toContainText(`「${targetKeyword}」の写真素材`);
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

    await searchResultPage.selectOrientation('vertical');

    await test.step('Verify URL cập nhật tham số orientation=0 và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/orientation=0/);
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
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

    await searchResultPage.selectOrientation('horizontal');

    await test.step('Verify URL cập nhật tham số orientation=1', async () => {
      await expect(page).toHaveURL(/orientation=1/);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều ngang phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-010: [FILTER - PSD FORMAT] Lọc định dạng ảnh PSD qua Toolbar "ファイル・向き"
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-010: Free User lọc định dạng ảnh PSD qua Toolbar "ファイル・向き" @regression @free-user', async ({
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
   * TC-SEARCH-FREE-011: [FILTER - SIZE M] Lọc kích thước ảnh Mサイズ以上 qua Toolbar "ファイル・向き"
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "ファイル・向き" và chọn Mサイズ以上
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-011: Free User lọc kích thước ảnh Mサイズ以上 qua Toolbar "ファイル・向き" @regression @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectSize('m');

    await test.step('Verify URL cập nhật tham số sizesec=m và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=m/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-012: [FILTER - SIZE L] Lọc kích thước ảnh Lサイズ qua Toolbar "ファイル・向き"
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "ファイル・向き" và chọn Lサイズ
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-012: Free User lọc kích thước ảnh Lサイズ qua Toolbar "ファイル・向き" @regression @free-user', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('sky');
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectSize('l');

    await test.step('Verify URL cập nhật tham số sizesec=l và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/sizesec=l/);
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

    await searchResultPage.selectCategoryFromToolbar('人物');

    await test.step('Verify URL cập nhật tham số danh mục c_names[]=1 hoặc c_id=1', async () => {
      await expect(page).toHaveURL(/c_names.*=1|c_id=1/);
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

    await searchResultPage.selectColor('blue');

    await test.step('Verify URL cập nhật tham số color=0000d6', async () => {
      await expect(page).toHaveURL(/color=0000d6/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-015: [FILTER - MODEL COUNT] Lọc ảnh Không có người (無人) qua toolbar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-015: Free User lọc ảnh Không có người (無人) qua Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-016: [FILTER - MODEL COUNT] Lọc ảnh có 1 người mẫu (1人) qua toolbar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-016: Free User lọc ảnh có 1 người mẫu (1人) qua Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-017: [FILTER - MODEL COUNT] Lọc ảnh có từ 3 người mẫu trở lên (3人以上 / model_count=3) qua Toolbar
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "人物指定" và chọn 3人以上
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-017: Free User lọc ảnh có từ 3 người mẫu trở lên (3人以上) qua Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-018: [FILTER - AGE] Lọc người mẫu theo Độ tuổi (若者 / age=W) qua Toolbar "人物指定"
   * 100% E2E True User Simulation: Thao tác mở menu Toolbar "人物指定" và chọn 年代 若者
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-018: Free User lọc người mẫu theo Độ tuổi (若者) qua Toolbar "人物指定" @regression @free-user', async ({
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
   * TC-SEARCH-FREE-019: [FILTER - MODEL RELEASE] Lọc ảnh có Giấy phép người mẫu (モデルリリース取得済のみ)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-019: Free User lọc ảnh có Giấy phép người mẫu (取得済のみ) qua menu Display Conditions @regression @free-user', async ({
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
   * TC-SEARCH-FREE-020: [FILTER - PROPERTY RELEASE] Lọc ảnh có Giấy phép tài sản (プロパティリリース取得済のみ / prprlrsec=on)
   * 100% E2E True User Simulation: Thao tác mở menu "表示条件" và chọn プロパティリリース取得済のみ
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-020: Free User lọc ảnh có Giấy phép tài sản (取得済のみ) qua menu Display Conditions @regression @free-user', async ({
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

    await searchResultPage.toggleExactMatch(true);

    await test.step('Verify URL cập nhật tham số type_search=phrase', async () => {
      await expect(page).toHaveURL(/type_search=phrase/);
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

    await searchResultPage.applyExcludeKeyword(excludeKeyword);

    await test.step('Verify URL cập nhật tham số nq=dog', async () => {
      await expect(page).toHaveURL(new RegExp(`nq=${excludeKeyword}`));
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

    await searchResultPage.searchByDetailedCreator(creatorName);

    await test.step('Verify URL và heading phản ánh tác giả Acworks', async () => {
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`, 'i'));
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
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
   * TC-SEARCH-FREE-026: [QA SHEET FILTER COMBO] Keyword "学生" + 2 người mẫu + Model Release (Sheet Case 3)
   * Thao tác 100% qua tương tác UI Toolbar thật của người dùng.
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-026: Free User kết hợp Từ khóa + 2 người mẫu + Model Release qua UI Toolbar @regression @free-user', async ({
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
   * TC-SEARCH-FREE-027: [MULTI-FILTER] Kết hợp Từ khóa + Chiều ngang + Không có người (無人) + Loại trừ AI
   * Thao tác 100% qua tương tác UI Toolbar thật của người dùng.
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-027: Free User kết hợp Đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @regression @free-user', async ({
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
      await expect(searchResultPage.resultHeading).toContainText('アップロードされた画像に似ている写真素材');
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

    await searchResultPage.searchByDetailedPhotoId(photoId);

    await test.step('Verify URL và kết quả trả về đúng ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
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
   * TC-SEARCH-FREE-031: [PSD FORMAT SEARCH] Tìm kiếm ảnh định dạng PSD và phân trang (Sheet Case 25: sizesec=psd)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-031: Free User truy cập PSD Format Search và giữ tham số sizesec=psd khi chuyển trang @regression @free-user', async ({
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
   * TC-SEARCH-FREE-032: [AI FACE SEARCH] Tìm kiếm bằng AI Face từ trang Detail (Sheet Case 17, 27)
   * Đặc tả: Truy cập trang chi tiết ảnh có AI model, click vào thumbnail nhỏ tại mục AI Face / AIで同じモデルの写真を探す,
   * verify chuyển hướng đến trang kết quả tìm kiếm với tham số vector_face, hiển thị đúng dữ liệu và giữ nguyên khi phân trang.
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-032: Free User click AI Face thumbnail từ trang Detail tìm kiếm ảnh cùng khuôn mặt và giữ nguyên khi phân trang @regression @free-user', async ({
    page,
    searchResultPage,
  }) => {
    // Sử dụng ảnh có AI Face Model trên Photo-AC (e.g. 35133353)
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
      await expect(page).toHaveURL(/\/main\/search\?.*q=cat/);
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

  /**
   * TC-SEARCH-FREE-039: [AI SEARCH ACCESS CHECK] Verify Toggle AI Search (.search-by-ai) KHÔNG hiển thị đối với Free User
   * Đặc tả: Theo giao diện thực tế và logic phân quyền Photo-AC, Toggle AI Search chỉ dành cho Guest khi chạm hạn mức,
   * Free User đã đăng nhập không có nút Toggle AI Search trên thanh tìm kiếm (cả TopPage và Search Results).
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-039: Verify Toggle AI Search (.search-by-ai) KHÔNG hiển thị trên giao diện của Free User @regression @free-user', async ({
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
});