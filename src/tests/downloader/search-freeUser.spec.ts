import * as path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH FEATURE — FREE USER (ĐÃ ĐĂNG NHẬP GÓI MIỄN PHÍ - 無料会員)
 * ============================================================================
 * Đặc tả chuẩn hóa theo Test Sheet QA (Photo-AC):
 * - Tự động kế thừa session Free User từ project cấu hình (chromium-free-user hoặc firefox-free-user).
 * - Hạn mức tìm kiếm: 4 lần/ngày (1日4回). Khi chạm hạn mức, hiển thị #searchLimitModal + nút Dùng vé coupon (#btn-open-search-coupon).
 * - Sắp xếp: "関連性の高い順" (Mặc định), "新着順" (Cho phép), "人気順" (Bị chặn đối với Free User).
 * - Phân trang (Pagination): Giữ nguyên Sort và Display Count (70 items) khi chuyển trang.
 * - Đề xuất & Định dạng: Recommended Search (rcm=1), PSD Search (sizesec=psd).
 * - Tìm kiếm bằng hình ảnh (Image Search): Upload ảnh mẫu -> Trang kết quả tương đồng.
 * - Bộ lọc nâng cao: Chiều ảnh (縦長/横長), Từ khóa loại trừ (nq), Không có người (model_count=0), AI Excluded.
 */
test.describe('Search Feature — Free User (Logged In Account)', () => {
  // Session Free User được tự động inject bởi project cấu hình (chromium-free-user / firefox-free-user)

  const sampleImagePath = path.resolve(__dirname, '../../../test-data/sample-search.png');

  test.beforeEach(async ({ homePage }) => {
    await homePage.goToHomePage();
    await homePage.isHomePageLoaded();
  });

  /**
   * TC-SEARCH-FREE-001: Tìm kiếm với từ khóa đơn hợp lệ
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

    await test.step('Verify thông báo không có kết quả chuẩn của Photo-AC', async () => {
      await expect(searchResultPage.noResultMessage).toBeVisible();
      const count = await searchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh phải bằng 0').toBe(0);
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
   * TC-SEARCH-FREE-006: [SEARCH LIMIT] Chạm hạn mức tìm kiếm (1 ngày 4 lần) -> Hiển thị Modal kèm nút Dùng vé coupon
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-006: Free User chạm hạn mức tìm kiếm hiển thị Modal kèm tùy chọn Dùng vé / Nâng cấp @regression @free-user', async ({
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

      // Free User ĐÃ CÓ tài khoản nên KHÔNG còn nút "無料会員登録してACポイント"
      await expect(searchResultPage.searchLimitRegisterCta).toBeHidden();

      // Free User có tùy chọn dùng vé tìm kiếm trong ngày (一日検索し放題チケット)
      await expect(searchResultPage.searchLimitCouponButton).toBeVisible();

      // Có link nâng cấp Premium
      await expect(searchResultPage.searchLimitPremiumLink).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-FREE-007: [SORT RESTRICTION] Sắp xếp "人気順" (Phổ biến) bị chặn đối với Free User
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-007: Free User bị chặn sắp xếp "人気順" và hiển thị popover nâng cấp Premium @regression @free-user', async ({
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
   * TC-SEARCH-FREE-008: [SORT NEWEST] Sắp xếp kết quả theo "新着順" (Mới nhất)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-008: Free User sắp xếp kết quả theo "新着順" (Mới nhất) thành công @regression @free-user', async ({
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
   * TC-SEARCH-FREE-009: [PAGINATION] Phân trang - Chuyển trang tiếp theo (Next) và trang trước (Prev)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-009: Free User chuyển trang phân trang (Next / Prev) thành công @regression @free-user', async ({
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
      expect(count).toBeGreaterThan(0);
    });

    await test.step('Click nút Prev và verify quay lại trang 1', async () => {
      await searchResultPage.goToPrevPage();
      await expect(page).toHaveURL(/search\?q=cat$/);
      expect(await searchResultPage.getActivePageNumber()).toBe('1');
    });
  });

  /**
   * TC-SEARCH-FREE-010: [PAGINATION - KEEP SORT] Giữ nguyên thứ tự Sắp xếp đã chọn khi chuyển trang
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-010: Giữ nguyên tùy chọn Sắp xếp "新着順" khi chuyển sang Trang 2 @regression @free-user', async ({
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
   * TC-SEARCH-FREE-011: [PAGINATION - DISPLAY COUNT] Kiểm tra số lượng ảnh hiển thị mặc định (70 ảnh/trang)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-011: Verify số lượng ảnh hiển thị mặc định đạt 70 ảnh trên mỗi trang @regression @free-user', async ({
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
   * TC-SEARCH-FREE-012: [TOP KEYWORDS] Tìm kiếm nhanh bằng Top Keyword dưới Search Bar
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-012: Free User click Top Keyword chuyển hướng đến trang kết quả tìm kiếm @regression @free-user', async ({
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
   * TC-SEARCH-FREE-013: [POPULAR TAGS] Tìm kiếm bằng Popular Tag Cloud
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-013: Free User click Popular Tag từ tag cloud thành công @regression @free-user', async ({
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
   * TC-SEARCH-FREE-014: [IMAGE SEARCH UPLOAD] Tải ảnh lên tìm kiếm hình ảnh tương đồng
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-014: Free User upload ảnh để tìm kiếm hình ảnh tương đồng @regression @free-user', async ({
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
   * TC-SEARCH-FREE-015: [RECOMMENDED SEARCH] Tìm kiếm đề xuất và phân trang (rcm=1)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-015: Free User truy cập Recommended Search và giữ tham số rcm=1 khi chuyển trang @regression @free-user', async ({
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
   * TC-SEARCH-FREE-016: [PSD FORMAT SEARCH] Tìm kiếm ảnh định dạng PSD và phân trang (sizesec=psd)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-016: Free User truy cập PSD Format Search và giữ tham số sizesec=psd khi chuyển trang @regression @free-user', async ({
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
   * TC-SEARCH-FREE-017: [CREATOR SEARCH] Tìm kiếm theo Tác giả (クリエイター名: acworks) (Sheet Case 7)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-017: Free User tìm kiếm ảnh theo Tác giả (creator=acworks) @regression @free-user', async ({
    page,
    searchResultPage,
  }) => {
    const creatorName = 'acworks';
    await searchResultPage.searchWithCombinedParams({ creator: creatorName });

    await test.step('Verify URL và heading chứa tên tác giả', async () => {
      await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`));
      await expect(searchResultPage.resultHeading).toContainText(`「${creatorName}」の写真素材`);
      const count = await searchResultPage.getResultCount();
      expect(count, 'Tìm theo tác giả phải trả về danh sách ảnh').toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-FREE-018: [PHOTO ID SEARCH] Tìm kiếm theo Mã素材ID chính xác (素材ID: 1597634) (Sheet Case 7)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-018: Free User tìm kiếm chính xác ảnh theo Mã素材ID (qid=1597634) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-019: [QA SHEET FILTER COMBO] Keyword "学生" + Category "人物" + 2 người mẫu + Model Release (Sheet Case 3)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-019: Free User tìm kiếm kết hợp theo điều kiện QA Sheet (学生 + 人物 + 2人 + Model Release) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-020: [FILTER COMBINATION] Tìm kiếm kết hợp Từ khóa + Chiều dọc (Vertical Orientation)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-020: Free User kết hợp Từ khóa và Bộ lọc Chiều dọc (縦長) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-021: [FILTER COMBINATION] Tìm kiếm kết hợp Từ khóa + Từ khóa loại trừ (Exclude/Negative Keyword)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-021: Free User kết hợp Từ khóa và Từ khóa loại trừ (除外キーワード) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-022: [MULTI-FILTER COMBINATION] Kết hợp Đa bộ lọc: Từ khóa + Chiều ngang + Không có người (無人)
   * @tags @regression @free-user
   */
  test('TC-SEARCH-FREE-022: Free User kết hợp Đa bộ lọc (Từ khóa + Chiều ngang + Không có người) @regression @free-user', async ({
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
   * TC-SEARCH-FREE-023: [AI SEARCH ACCESS CHECK] Verify Toggle AI Search (.search-by-ai) KHÔNG hiển thị đối với Free User
   * @tags @regression @free-user
   * Đặc tả: Theo giao diện thực tế và logic phân quyền Photo-AC, Toggle AI Search chỉ dành cho Guest khi chạm hạn mức,
   * Free User đã đăng nhập không có nút Toggle AI Search trên thanh tìm kiếm.
   */
  test('TC-SEARCH-FREE-023: Verify Toggle AI Search (.search-by-ai) KHÔNG hiển thị trên giao diện của Free User @regression @free-user', async ({
    page,
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