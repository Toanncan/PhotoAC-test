# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/guest/search.spec.ts >> Search & Filters — Guest (No-Login User) >> TC-SEARCH-GUEST-014: Tìm kiếm ảnh theo Tác giả (Acworks) qua Detailed Search Toolbar
- Location: illust-ac/src/tests/downloader/guest/search.spec.ts:432:7

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('#filter-dropdown-detail input[type="text"][name="creator"], #filter-dropdown-detail #creator_mf:not([type="hidden"]), #filter-dropdown-detail .form-control.h-auto input, #filter-dropdown-detail div:has(> span:has-text("イラストレーター名を入力")) input, #filter-dropdown-detail input[placeholder="イラストレーター名を入力"]:visible, #filter-dropdown-detail input[name="creator"]:not([type="hidden"])').first()
Expected: "Acworks"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for locator('#filter-dropdown-detail input[type="text"][name="creator"], #filter-dropdown-detail #creator_mf:not([type="hidden"]), #filter-dropdown-detail .form-control.h-auto input, #filter-dropdown-detail div:has(> span:has-text("イラストレーター名を入力")) input, #filter-dropdown-detail input[placeholder="イラストレーター名を入力"]:visible, #filter-dropdown-detail input[name="creator"]:not([type="hidden"])').first()
    22 × locator resolved to <input type="text" data-skip="true" class="border-0 shadow-none outline-0 p-0"/>
       - unexpected value ""

```

```yaml
- textbox
```

# Test source

```ts
  347 |       const count = await searchResultPage.getResultCount();
  348 |       expect(count).toBeGreaterThan(0);
  349 |     });
  350 |   });
  351 | 
  352 |   /**
  353 |    * TC-SEARCH-GUEST-011: Lọc Loại trừ ảnh AI (AI生成ツール使用素材を除く)
  354 |    * @tags @regression @guest @filter
  355 |    */
  356 |   test('TC-SEARCH-GUEST-011: Bật bộ lọc Loại trừ ảnh do AI tạo', async ({
  357 |     page,
  358 |     homePage,
  359 |     searchResultPage,
  360 |   }) => {
  361 |     await test.step(`Tìm kiếm từ khóa "landscape" và đợi kết quả hiển thị`, async () => {
  362 |       await homePage.search('landscape');
  363 |       await searchResultPage.waitForResultDisplay();
  364 |     });
  365 | 
  366 |     await test.step('Verify URL cập nhật tham số exclude_ai=on', async () => {
  367 |       await searchResultPage.toggleExcludeAi(true);
  368 |       await expect(page).toHaveURL(/exclude_ai=on/);
  369 |       await expect(searchResultPage.excludeAiCheckbox).toBeChecked();
  370 |       const count = await searchResultPage.getResultCount();
  371 |       expect(count).toBeGreaterThan(0);
  372 |     });
  373 |   });
  374 | 
  375 |   /**
  376 |    * TC-SEARCH-GUEST-012: Lọc Khớp chính xác cụm từ (完全一致)
  377 |    * @tags @regression @guest @filter
  378 |    */
  379 |   test('TC-SEARCH-GUEST-012: Bật bộ lọc Tìm kiếm khớp chính xác (完全一致)', async ({
  380 |     page,
  381 |     homePage,
  382 |     searchResultPage,
  383 |   }) => {
  384 |     await test.step(`Tìm kiếm từ khóa "東京 タワー" và đợi kết quả hiển thị`, async () => {
  385 |       await homePage.search('東京 タワー');
  386 |       await searchResultPage.waitForResultDisplay();
  387 |     });
  388 | 
  389 |     await test.step('Verify URL cập nhật tham số type_search=phrase và badge hiển thị', async () => {
  390 |       await searchResultPage.toggleExactMatch(true);
  391 |       await expect(page).toHaveURL(/type_search=phrase/);
  392 |       await expect(searchResultPage.exactMatchCheckbox).toBeChecked();
  393 |       await expect(searchResultPage.getActiveFilterBadge('完全一致')).toBeVisible();
  394 |       await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
  395 |       const count = await searchResultPage.getResultCount();
  396 |       expect(count).toBeGreaterThan(0);
  397 |     });
  398 |   });
  399 | 
  400 |   /**
  401 |    * TC-SEARCH-GUEST-013: Lọc theo Từ khóa loại trừ (除外キーワード)
  402 |    * @tags @regression @guest @filter
  403 |    */
  404 |   test('TC-SEARCH-GUEST-013: Lọc kết quả với Từ khóa loại trừ (除外キーワード)', async ({
  405 |     page,
  406 |     homePage,
  407 |     searchResultPage,
  408 |   }) => {
  409 |     const keyword = '猫';
  410 |     const excludeKeyword = 'dog';
  411 | 
  412 |     await test.step(`Tìm kiếm từ khóa "${keyword}" và đợi kết quả hiển thị`, async () => {
  413 |       await homePage.search(keyword);
  414 |         await searchResultPage.waitForResultDisplay();
  415 |     });
  416 | 
  417 |     await test.step('Verify URL cập nhật tham số nq=dog và badge hiển thị', async () => {
  418 |       await searchResultPage.applyExcludeKeyword(excludeKeyword);
  419 |       await expect(page).toHaveURL(new RegExp(`nq=${excludeKeyword}`));
  420 |       await expect(searchResultPage.excludeKeywordInput).toHaveValue(excludeKeyword);
  421 |       await expect(searchResultPage.getActiveFilterBadge(excludeKeyword)).toBeVisible();
  422 |       await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
  423 |       const count = await searchResultPage.getResultCount();
  424 |       expect(count).toBeGreaterThan(0);
  425 |     });
  426 |   });
  427 | 
  428 |   /**
  429 |    * TC-SEARCH-GUEST-014: Lọc theo Tên tác giả qua menu Tìm kiếm chi tiết (詳細検索)
  430 |    * @tags @regression @guest @filter
  431 |    */
  432 |   test('TC-SEARCH-GUEST-014: Tìm kiếm ảnh theo Tác giả (Acworks) qua Detailed Search Toolbar', async ({
  433 |     page,
  434 |     homePage,
  435 |     searchResultPage,
  436 |   }) => {
  437 |     const keyword = 'flower';
  438 |     const creatorName = 'Acworks';
  439 |     await test.step(`Tìm kiếm từ khóa "${keyword}" và đợi kết quả hiển thị`, async () => {
  440 |       await homePage.search(keyword);
  441 |         await searchResultPage.waitForResultDisplay();
  442 |     });
  443 | 
  444 |     await test.step('Verify URL, badge và heading phản ánh tác giả Acworks', async () => {
  445 |       await searchResultPage.searchByDetailedCreator(creatorName);
  446 |       await expect(page).toHaveURL(new RegExp(`creator=${creatorName}`, 'i'));
> 447 |       await expect(searchResultPage.detailedCreatorInput).toHaveValue(creatorName);
      |                                                           ^ Error: expect(locator).toHaveValue(expected) failed
  448 |       await expect(searchResultPage.getActiveFilterBadge(creatorName)).toBeVisible();
  449 |       await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
  450 |       await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」のイラスト素材`);
  451 |       const count = await searchResultPage.getResultCount();
  452 |       expect(count, 'Tìm theo tác giả phải trả về danh sách ảnh').toBeGreaterThan(0);
  453 |     });
  454 |   });
  455 | 
  456 |   /**
  457 |    * TC-SEARCH-GUEST-015: Lọc Loại trừ Tác giả qua menu Tìm kiếm chi tiết (詳細検索)
  458 |    * @tags @regression @guest @filter
  459 |    */
  460 |   test('TC-SEARCH-GUEST-015: Loại trừ ảnh của Tác giả (Acworks) qua menu Detailed Search Toolbar', async ({
  461 |     page,
  462 |     homePage,
  463 |     searchResultPage,
  464 |   }) => {
  465 |     const keyword = 'flower';
  466 |     const ngCreatorName = 'Acworks';
  467 |     await test.step(`Tìm kiếm từ khóa "${keyword}" và đợi kết quả hiển thị`, async () => {
  468 |       await homePage.search(keyword);
  469 |         await searchResultPage.waitForResultDisplay();
  470 |     });
  471 | 
  472 |     await test.step(`Thiết lập loại trừ tác giả "${ngCreatorName}" trong menu Detailed Search`, async () => {
  473 |       await searchResultPage.searchByDetailedNgCreator(ngCreatorName);
  474 |     });
  475 | 
  476 |     await test.step('Verify URL cập nhật tham số ngcreator=Acworks, badge và trạng thái kết quả hiển thị', async () => {
  477 |       await expect(page).toHaveURL(new RegExp(`ngcreator=${ngCreatorName}`, 'i'));
  478 |       await expect(searchResultPage.detailedNgCreatorInput).toHaveValue(ngCreatorName);
  479 |       await expect(searchResultPage.activeFilterBadges.filter({ hasText: ngCreatorName })).toBeVisible();
  480 |       await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
  481 |       const count = await searchResultPage.getResultCount();
  482 |       if (count > 0) {
  483 |         await expect(searchResultPage.resultItems.first()).toBeVisible();
  484 |       } else {
  485 |         await expect(searchResultPage.noResultMessage.first()).toBeVisible();
  486 |       }
  487 |     });
  488 |   });
  489 | 
  490 |   // NHÓM 3: BỘ LỌC KẾT HỢP ĐA ĐIỀU KIỆN TRÊN UI
  491 | 
  492 |   /**
  493 |    * TC-SEARCH-GUEST-016: Kết hợp Từ khóa + Chiều ngang + Định dạng Vector (EPS/AI) + Loại trừ AI qua UI Toolbar
  494 |    * @tags @regression @guest @filter
  495 |    */
  496 |   test('TC-SEARCH-GUEST-016: Kết hợp Từ khóa + Chiều ngang + Định dạng Vector + Loại trừ AI qua UI Toolbar', async ({
  497 |     page,
  498 |     homePage,
  499 |     searchResultPage,
  500 |   }, testInfo) => {
  501 |     test.setTimeout(90_000);
  502 |     const keyword = 'ビジネス';
  503 | 
  504 |     await test.step(`Tìm kiếm từ khóa "${keyword}" và đợi kết quả hiển thị`, async () => {
  505 |       await homePage.search(keyword);
  506 |           await searchResultPage.waitForResultDisplay();
  507 |     });
  508 | 
  509 |     await test.step('Chọn Chiều ngang (横長) từ Toolbar "ファイル・向き"', async () => {
  510 |       await searchResultPage.selectOrientation('horizontal');
  511 |       await expect(page).toHaveURL(/orientation=1/);
  512 |       await expect(searchResultPage.orientationHorizontalRadio).toBeChecked();
  513 |       await expect(searchResultPage.getActiveFilterBadge('横長')).toBeVisible();
  514 |       await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-Horizontal');
  515 |     });
  516 | 
  517 |     await test.step('Chọn định dạng Vector (EPS・AI) từ Toolbar "ファイル・向き"', async () => {
  518 |       await searchResultPage.selectFormat('vector');
  519 |       await expect(page).toHaveURL(/format=vector/);
  520 |       await expect(page).toHaveURL(/orientation=1/);
  521 |       await expect(searchResultPage.orientationHorizontalRadio).toBeChecked();
  522 |       await expect(searchResultPage.formatVectorRadio).toBeChecked();
  523 |       await expect(searchResultPage.getActiveFilterBadge('EPS・AI')).toBeVisible();
  524 |       await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-Horizontal-Vector');
  525 |     });
  526 | 
  527 |     await test.step('Bật bộ lọc Loại trừ AI từ Toolbar "表示条件"', async () => {
  528 |       await searchResultPage.toggleExcludeAi(true);
  529 |       await expect(page).toHaveURL(/exclude_ai=on/);
  530 |       await expect(searchResultPage.excludeAiCheckbox).toBeChecked();
  531 |       await captureEvidenceWithUrl(page, testInfo, 'Combined-Filter-Horizontal-Vector-ExcludeAI');
  532 |     });
  533 | 
  534 |     await test.step('Verify URL chứa đầy đủ tham số và kết quả hiển thị', async () => {
  535 |       await expect(page).toHaveURL(/orientation=1/);
  536 |       await expect(page).toHaveURL(/format=vector/);
  537 |       await expect(page).toHaveURL(/exclude_ai=on/);
  538 |       await expect(searchResultPage.orientationHorizontalRadio).toBeChecked();
  539 |       await expect(searchResultPage.formatVectorRadio).toBeChecked();
  540 |       await expect(searchResultPage.excludeAiCheckbox).toBeChecked();
  541 |       await expect(searchResultPage.clearAllFiltersButton.first()).toBeVisible();
  542 |       const count = await searchResultPage.getResultCount();
  543 |       expect(count, 'Kết quả kết hợp đa bộ lọc phải có ảnh hiển thị').toBeGreaterThan(0);
  544 |     });
  545 |   });
  546 | 
  547 |   /**
```