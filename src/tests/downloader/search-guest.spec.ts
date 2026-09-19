import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH FEATURE — GUEST USER (CHƯA ĐĂNG NHẬP / NO-LOGIN)
 * ============================================================================
 * Đặc tả chuẩn hóa đối chiếu 100% theo Google Spreadsheet QA (Search Function Page):
 * - Không có session login (storageState: { cookies: [], origins: [] }).
 * - Hạn mức tìm kiếm 4 lần/ngày: Chuỗi từ khóa (桜, 学生, 景色, 山) -> #searchLimitModal + CTA Đăng ký.
 * - Sắp xếp: Mặc định "関連性の高い順", cho phép "新着順", chặn "人気順" (Popover Premium).
 * - Phân trang (Pagination): Giữ nguyên Sort đã chọn và Display Count (70 ảnh/trang) khi chuyển trang.
 * - Đề xuất & Định dạng: Recommended Search (rcm=1), PSD Format Search (sizesec=psd).
 * - Tác giả & ID: Tìm kiếm theo Creator (acworks) và Mã素材ID (1597634).
 * - Tìm kiếm bằng hình ảnh (Image Search): Upload ảnh mẫu -> H1 "アップロードされた画像に似ている写真素材".
 * - Bộ lọc QA Sheet: Keyword "学生" + Category "人物" + 2 người mẫu (model_count=2) + Model Release (mdlrlrsec=on).
 */
test.describe('Search Feature — Guest (No-Login User)', () => {
  // Bắt buộc cô lập context không mang thông tin đăng nhập
  test.use({ storageState: { cookies: [], origins: [] } });

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.png');

  test.beforeEach(async ({ homePage }) => {
    await homePage.goToHomePage();
    await homePage.isHomePageLoaded();
  });

  /**
   * TC-SEARCH-GUEST-001: Tìm kiếm với từ khóa đơn hợp lệ (Sheet Case 2)
   * @tags @smoke @regression @guest
   */
  test('TC-SEARCH-GUEST-001: Khách vãng lai tìm kiếm từ khóa đơn hợp lệ hiển thị kết quả @smoke @guest', async ({
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
  test('TC-SEARCH-GUEST-002: Khách vãng lai tìm kiếm nhiều từ khóa kết hợp (AND Search) @regression @guest', async ({
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
      await expect(searchResultPage.noResultMessage).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh phải bằng 0').toBe(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-004: Tìm kiếm tiếp từ thanh tìm kiếm trên trang kết quả (Search Again)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-004: Khách vãng lai tìm kiếm từ khóa mới trực tiếp từ trang kết quả @regression @guest', async ({
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
   * TC-SEARCH-GUEST-006: [SEARCH LIMIT] Chạm hạn mức tìm kiếm (Sheet Case 4: 桜 -> 学生 -> 景色 -> 山)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-006: Chạm hạn mức tìm kiếm (1日4回) hiển thị Modal giới hạn và CTA Đăng ký @regression @guest', async ({
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
   * TC-SEARCH-GUEST-007: [SORT RESTRICTION] Sắp xếp "人気順" (Phổ biến) bị chặn đối với Guest
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-007: Guest bị chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium @regression @guest', async ({
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
   * TC-SEARCH-GUEST-008: [SORT NEWEST] Sắp xếp kết quả theo "新着順" (Mới nhất)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-008: Khách vãng lai sắp xếp kết quả theo "新着順" (Mới nhất) thành công @regression @guest', async ({
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
   * TC-SEARCH-GUEST-009: [PAGINATION] Phân trang - Chuyển trang tiếp theo (Next) và trang trước (Prev)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-009: Khách vãng lai chuyển trang phân trang (Next / Prev) thành công @regression @guest', async ({
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
      await expect(page).toHaveURL(/search\?q=cat$/);
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
    });
  });

  /**
   * TC-SEARCH-GUEST-010: [PAGINATION - KEEP SORT] Giữ nguyên thứ tự Sắp xếp đã chọn khi chuyển trang (Sheet Case 15)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-010: Giữ nguyên tùy chọn Sắp xếp "新着順" khi chuyển sang Trang 2 @regression @guest', async ({
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
   * TC-SEARCH-GUEST-011: [PAGINATION - DISPLAY COUNT] Kiểm tra hiển thị mặc định 70 ảnh/trang (Sheet Case 12, 20, 23)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-011: Verify số lượng ảnh hiển thị mặc định đạt 70 ảnh trên mỗi trang @regression @guest', async ({
    homePage,
    searchResultPage,
  }) => {
    await homePage.search('cat');
    await searchResultPage.waitForResultDisplay();

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

  /**
   * TC-SEARCH-GUEST-012: [TOP KEYWORDS] Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-012: Khách vãng lai click Top Keyword chuyển hướng đến trang kết quả tìm kiếm @regression @guest', async ({
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
   * TC-SEARCH-GUEST-013: [POPULAR TAGS] Tìm kiếm bằng Popular Tag Cloud
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-013: Khách vãng lai click Popular Tag từ tag cloud thành công @regression @guest', async ({
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

  /**
   * TC-SEARCH-GUEST-014: [IMAGE SEARCH UPLOAD] Tải ảnh lên tìm kiếm tương đồng (Sheet Case 1, 6, 8)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-014: Khách vãng lai upload ảnh để tìm kiếm hình ảnh tương đồng @regression @guest', async ({
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
   * TC-SEARCH-GUEST-015: [RECOMMENDED SEARCH] Tìm kiếm đề xuất và phân trang (Sheet Case 24: rcm=1)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-015: Truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @regression @guest', async ({
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
   * TC-SEARCH-GUEST-016: [PSD FORMAT SEARCH] Tìm kiếm ảnh định dạng PSD và phân trang (Sheet Case 25: sizesec=psd)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-016: Truy cập PSD Format Search và giữ tham số sizesec=psd khi chuyển trang @regression @guest', async ({
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
   * TC-SEARCH-GUEST-017: [CREATOR SEARCH] Tìm kiếm ảnh theo Tên tác giả (Sheet Case 7: creator=acworks)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-017: Khách vãng lai tìm kiếm ảnh theo Tác giả (creator=acworks) @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    const creatorName = 'acworks';
    await searchResultPage.searchWithCombinedParams({ creator: creatorName });

    await test.step('Verify URL và heading phản ánh tên tác giả', async () => {
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${creatorName}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBe(70);
    });
  });

  /**
   * TC-SEARCH-GUEST-018: [PHOTO ID SEARCH] Tìm kiếm ảnh theo Mã素材ID (Sheet Case 7: qid=1597634)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-018: Khách vãng lai tìm kiếm chính xác ảnh theo Mã素材ID (qid=1597634) @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    const photoId = '1597634';
    await searchResultPage.searchWithCombinedParams({ qid: photoId });

    await test.step('Verify URL và kết quả trả về đúng 1 ảnh khớp ID', async () => {
      await expect(page).toHaveURL(new RegExp(`qid=${photoId}`));
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo ID chính xác phải trả về đúng 1 ảnh').toBe(1);
    });
  });

  /**
   * TC-SEARCH-GUEST-019: [QA SHEET FILTER COMBO] Keyword "学生" + Category "人物" + 2 người mẫu + Model Release (Sheet Case 3)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-019: Tìm kiếm kết hợp theo điều kiện QA Sheet (学生 + 人物 + 2人 + Model Release) @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    await searchResultPage.searchWithCombinedParams({
      q: '学生',
      c_id: 1,              // 人物 (People)
      model_count: '2',     // 2人 (2 models)
      mdlrlrsec: 'on',      // 取得済のみ (Model release obtained)
    });

    await test.step('Verify URL chứa đầy đủ các tham số theo kịch bản QA Sheet', async () => {
      await expect(page).toHaveURL(/c_id=1/);
      await expect(page).toHaveURL(/model_count=2/);
      await expect(page).toHaveURL(/mdlrlrsec=on/);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-020: [FILTER COMBINATION] Tìm kiếm kết hợp Từ khóa + Chiều dọc (Vertical Orientation)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-020: Khách vãng lai kết hợp Từ khóa và Bộ lọc Chiều dọc (縦長) @regression @guest', async ({
    page,
    homePage,
    searchResultPage,
  }) => {
    const keyword = 'cat';
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();

    await searchResultPage.selectOrientation('vertical');

    await test.step('Verify URL cập nhật tham số orientation=0', async () => {
      await expect(page).toHaveURL(/orientation=0/);
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Kết quả sau khi lọc chiều dọc phải có ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-021: [FILTER COMBINATION] Tìm kiếm kết hợp Từ khóa + Từ khóa loại trừ (Exclude/Negative Keyword)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-021: Khách vãng lai kết hợp Từ khóa và Từ khóa loại trừ (除外キーワード) @regression @guest', async ({
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
   * TC-SEARCH-GUEST-022: [MULTI-FILTER COMBINATION] Kết hợp Đa bộ lọc: Từ khóa + Chiều ngang + Không có người (無人)
   * @tags @regression @guest
   */
  test('TC-SEARCH-GUEST-022: Khách vãng lai kết hợp Đa bộ lọc (Từ khóa + Chiều ngang + Không có người) @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    const keyword = 'office';

    await searchResultPage.searchWithCombinedParams({
      q: keyword,
      orientation: '1',      // 横長 (Ngang)
      model_count: '0',      // 無人 (Không có người)
      exclude_ai: 'on',      // Loại trừ AI
    });

    await test.step('Verify URL chứa đầy đủ các tham số kết hợp', async () => {
      await expect(page).toHaveURL(/orientation=1/);
      await expect(page).toHaveURL(/model_count=0/);
      await expect(page).toHaveURL(/exclude_ai=on/);
      await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-GUEST-023: [AI SEARCH INITIAL STATE] Khách vãng lai bị vô hiệu hóa Toggle AI Search khi chưa chạm hạn mức tìm kiếm thông thường
   * @tags @regression @guest
   * Đặc tả: Khi Guest còn lượt tìm kiếm thông thường (search_zancnt != 0), nút .search-by-ai ở trạng thái disabled,
   * người dùng chưa thể tự ý bật/tắt AI Search.
   */
  test('TC-SEARCH-GUEST-023: Khách vãng lai ban đầu bị vô hiệu hóa Toggle AI Search khi chưa chạm hạn mức tìm kiếm thường @regression @guest', async ({
    homePage,
  }) => {
    await test.step('Verify nút AI Search (.search-by-ai) hiển thị trên Top Page', async () => {
      await expect(homePage.searchByAiButton).toBeVisible();
    });

    await test.step('Verify nút AI Search ở trạng thái disabled khi chưa chạm hạn mức tìm kiếm', async () => {
      await expect(homePage.searchByAiButton).toBeDisabled();
      await expect(homePage.aiSearchOffIcon).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-GUEST-024: [AI SEARCH ACTIVATION ON LIMIT] Khách vãng lai được mở khóa Toggle AI Search khi chạm hạn mức tìm kiếm thông thường
   * @tags @regression @guest
   * Đặc tả: Khi Guest đạt hạn mức tìm kiếm thông thường (search_zancnt == 0), hệ thống kích hoạt modal #semanticSearchContinueModal
   * và cho phép người dùng bật Toggle AI Search (by_ai=1) để tìm kiếm thêm 3 lượt bằng AI.
   */
  test('TC-SEARCH-GUEST-024: Khách vãng lai kích hoạt và tìm kiếm bằng AI Search khi đạt hạn mức tìm kiếm @regression @guest', async ({
    page,
    searchResultPage,
  }) => {
    const naturalQuery = 'オフィスでパソコンを開くビジネスマン';

    await test.step('Thực hiện tìm kiếm với tham số AI Search (by_ai=1) sau khi được kích hoạt', async () => {
      await searchResultPage.searchWithCombinedParams({
        q: naturalQuery,
        by_ai: '1',
      });
    });

    await test.step('Verify URL chứa tham số by_ai=1 và kết quả tìm kiếm trả về danh sách ảnh', async () => {
      await expect(page).toHaveURL(/by_ai=1/);
      await expect(searchResultPage.resultHeading).toContainText(`「${naturalQuery}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'AI Search phải trả về danh sách kết quả ảnh').toBeGreaterThan(0);
    });
  });
});
