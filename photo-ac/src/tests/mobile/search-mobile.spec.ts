import { test, expect } from '../../fixtures/mobile.fixture';

/**
 * ============================================================================
 * TEST SUITE: SEARCH FEATURE — MOBILE (GUEST USER)
 * Device Emulation: iPhone 13 / Mobile Viewport (< 1024px)
 * ============================================================================
 */
test.describe('Search Feature — Mobile (Guest User)', () => {
  // Ensure unauthenticated guest state on mobile
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, homePage, mobileSearchResultPage }) => {
    // Mock search limit endpoint to prevent daily limit modal from intercepting normal tests
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
    await mobileSearchResultPage.dismissCookieBannerIfPresent();
  });

  /**
   * TC-SEARCH-MOBILE-001: Tìm kiếm từ khóa hợp lệ trên Mobile
   * @tags @smoke @mobile @guest
   */
  test('TC-SEARCH-MOBILE-001: Guest tìm kiếm từ khóa hợp lệ trên Mobile: hiển thị kết quả @smoke @mobile @guest', async ({
    page,
    homePage,
    mobileSearchResultPage,
  }) => {
    const keyword = 'cat';

    await test.step(`Nhập từ khóa "${keyword}" và thực hiện tìm kiếm trên Mobile`, async () => {
      await homePage.search(keyword);
      await mobileSearchResultPage.waitForResultDisplay();
    });

    await test.step('Verify URL và heading kết quả hiển thị chính xác', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(keyword)}`));
      await expect(mobileSearchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
    });

    await test.step('Verify danh sách ảnh hiển thị trên Mobile', async () => {
      const count = await mobileSearchResultPage.getResultCount();
      expect(count, 'Kết quả tìm kiếm phải trả về ít nhất 1 ảnh').toBeGreaterThan(0);
      await expect(mobileSearchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-MOBILE-002: Lọc theo hướng ảnh dọc (縦長) qua Drawer 詳細検索
   * @tags @regression @mobile @guest
   */
  test('TC-SEARCH-MOBILE-002: Lọc theo hướng ảnh (縦長 - Vertical) qua Drawer 詳細検索 trên Mobile @regression @mobile @guest', async ({
    page,
    homePage,
    mobileSearchResultPage,
  }) => {
    const keyword = 'dog';

    await test.step(`Tìm kiếm ban đầu với từ khóa "${keyword}"`, async () => {
      await homePage.search(keyword);
      await mobileSearchResultPage.waitForResultDisplay();
    });

    await test.step('Mở Drawer "詳細検索 ▼" và chọn lọc ảnh dọc (縦長)', async () => {
      await mobileSearchResultPage.selectOrientationMobile('vertical');
    });

    await test.step('Verify URL chứa tham số orientation=0 và kết quả hiển thị', async () => {
      await expect(page).toHaveURL(/orientation=0/);
      const count = await mobileSearchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
      await expect(mobileSearchResultPage.resultItems.first()).toBeVisible();
    });
  });

  /**
   * TC-SEARCH-MOBILE-003: Sắp xếp theo ngày phát hành mới nhất (新着順) qua Drawer trên Mobile
   * @tags @regression @mobile @guest
   */
  test('TC-SEARCH-MOBILE-003: Sắp xếp theo ngày phát hành (新着順) qua Drawer trên Mobile @regression @mobile @guest', async ({
    page,
    homePage,
    mobileSearchResultPage,
  }) => {
    const keyword = 'flower';

    await test.step(`Tìm kiếm ban đầu với từ khóa "${keyword}"`, async () => {
      await homePage.search(keyword);
      await mobileSearchResultPage.waitForResultDisplay();
    });

    await test.step('Mở Drawer "詳細検索 ▼" và chọn sắp xếp "新着順"', async () => {
      await mobileSearchResultPage.selectSortMobile('newest');
    });

    await test.step('Verify URL chứa tham số srt=-releasedate và kết quả cập nhật', async () => {
      await expect(page).toHaveURL(/srt=-releasedate/);
      const count = await mobileSearchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });

  /**
   * TC-SEARCH-MOBILE-004: Tìm kiếm từ khóa không có kết quả trên Mobile
   * @tags @negative @mobile @guest
   */
  test('TC-SEARCH-MOBILE-004: Tìm kiếm từ khóa không tồn tại hiển thị thông báo không có kết quả trên Mobile @negative @mobile @guest', async ({
    page,
    homePage,
    mobileSearchResultPage,
  }) => {
    const noResultKeyword = 'asdfghjklqwertyuiopzxcvbnm12345';

    await test.step(`Tìm kiếm với từ khóa vô nghĩa "${noResultKeyword}"`, async () => {
      await homePage.search(noResultKeyword);
      await mobileSearchResultPage.waitForResultDisplay();
    });

    await test.step('Verify thông báo không có kết quả hiển thị', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(noResultKeyword)}`));
      await expect(mobileSearchResultPage.noResultMessage.first()).toBeVisible();
      const count = await mobileSearchResultPage.getResultCount();
      expect(count, 'Số lượng ảnh phải bằng 0 khi không có kết quả').toBe(0);
    });
  });

  /**
   * TC-SEARCH-MOBILE-005: Tìm kiếm lại với từ khóa mới từ ô input search trên Mobile
   * @tags @regression @mobile @guest
   */
  test('TC-SEARCH-MOBILE-005: Tìm kiếm lại với từ khóa mới từ ô input search trên Mobile @regression @mobile @guest', async ({
    page,
    homePage,
    mobileSearchResultPage,
  }) => {
    const firstKeyword = 'apple';
    const secondKeyword = 'orange';

    await test.step(`Tìm kiếm từ khóa ban đầu "${firstKeyword}"`, async () => {
      await homePage.search(firstKeyword);
      await mobileSearchResultPage.waitForResultDisplay();
    });

    await test.step(`Tìm kiếm lại với từ khóa mới "${secondKeyword}"`, async () => {
      await mobileSearchResultPage.searchAgain(secondKeyword);
    });

    await test.step('Verify kết quả cập nhật theo từ khóa mới', async () => {
      await expect(page).toHaveURL(new RegExp(`/main/search\\?.*q=${encodeURIComponent(secondKeyword)}`));
      await expect(mobileSearchResultPage.resultHeading).toContainText(`「${secondKeyword}」の写真素材`);
      const count = await mobileSearchResultPage.getResultCount();
      expect(count).toBeGreaterThan(0);
    });
  });
});
