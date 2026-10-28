# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/free-user/search.spec.ts >> Search — Free User >> TC-SEARCH-FREE-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả @free-user
- Location: photo-ac/src/tests/downloader/free-user/search.spec.ts:53:7

# Error details

```
Error: locator.waitFor: Test ended.
Call log:
  - waiting for locator('img.thumbnail-image, img.thumbnail').first().or(getByText(/該当する写真がありませんでした|写真は見つかりませんでした/).first()) to be visible

```

# Test source

```ts
  182 |   readonly detailedNgCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_ngcreator, #form_ngcreator');
  183 |   readonly detailedPhotoIdInput: Locator = this.page.locator('#filter-dropdown-detail #form_qid, #form_qid');
  184 | 
  185 |   // Filter Option Locators: 7. Display Conditions (表示条件)
  186 |   readonly exactMatchCheckbox: Locator = this.page.locator('#filter-dropdown-display #type_search, #type_search');
  187 |   readonly exactMatchLabel: Locator = this.page.locator('#filter-dropdown-display label[for="type_search"]').first();
  188 |   readonly excludeAiCheckbox: Locator = this.page.locator('#filter-dropdown-display #exclude_ai, #exclude_ai');
  189 |   readonly excludeAiLabel: Locator = this.page.locator('#filter-dropdown-display label[for="exclude_ai"]').first();
  190 |   readonly modelReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-on"]').first();
  191 |   readonly modelReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-all"]').first();
  192 |   readonly propertyReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-on"]').first();
  193 |   readonly propertyReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-all"]').first();
  194 | 
  195 |   // AI Search (AI検索) Locators
  196 |   /** AI Search toggle button on results page */
  197 |   readonly searchByAiButton: Locator = this.page.locator('.search-by-ai').first();
  198 | 
  199 |   /** Clock overlay icon indicating AI daily search limit reached */
  200 |   readonly aiLimitClockIcon: Locator = this.page.locator('.search-by-ai .overlay-icon-clock').first();
  201 | 
  202 |   /** AI Search ON icon */
  203 |   readonly aiSearchOnIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-on').first();
  204 | 
  205 |   /** AI Search OFF icon */
  206 |   readonly aiSearchOffIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-off').first();
  207 | 
  208 |   // Pagination Locators
  209 |   /** Pagination container (ul.ac-pagination) */
  210 |   readonly paginationContainer: Locator = this.page.locator('ul.ac-pagination');
  211 | 
  212 |   /** Active / Current page number link */
  213 |   readonly paginationActivePage: Locator = this.page.locator('ul.ac-pagination li.active a');
  214 | 
  215 |   /** Next page button */
  216 |   readonly paginationNextButton: Locator = this.page.locator('ul.ac-pagination a.next, ul.ac-pagination a[rel="next"]');
  217 | 
  218 |   /** Previous page button */
  219 |   readonly paginationPrevButton: Locator = this.page.locator('ul.ac-pagination a.prev, ul.ac-pagination a[rel="prev"]');
  220 | 
  221 |   /** Introductory / promotional dialog popup (e.g. Premium feature tips dialog) */
  222 |   readonly introDialog: Locator = this.page.locator('dialog:has(a[href*="function_introduction"]), dialog[open], [role="dialog"]:has(.icon-close)');
  223 |   readonly introDialogCloseButton: Locator = this.page.locator('dialog .icon-close, dialog [aria-label="Close"], [role="region"][aria-label="Close"], dialog button.close');
  224 | 
  225 |   // QuickView & Detail Modal Locators
  226 |   readonly resultFigures: Locator = this.page.locator('figure.ac-ig-item').filter({ has: this.page.locator('.link-to-detail') });
  227 |   readonly quickViewModal: Locator = this.page.locator('#quickViewBox');
  228 |   readonly quickViewCloseButton: Locator = this.page.locator('.modal-quickview button.close, .modal-quickview [aria-label="Close"]').first();
  229 |   readonly guestRegisterPromptTitle: Locator = this.page.locator('#quickViewBox h6:has-text("会員登録で今すぐダウンロード！")');
  230 |   readonly guestRegisterCtaButton: Locator = this.page.locator('#quickViewBox a:has-text("無料ダウンロード")');
  231 |   readonly guestLoginLink: Locator = this.page.locator('#quickViewBox a:has-text("ログイン")');
  232 |   readonly premiumDownloadButtons: Locator = this.page.locator('#quickViewBox a.disable-on-click:has-text("JPEG")');
  233 | 
  234 |   // Group Sites Locators (写真ACグループサイト)
  235 |   readonly designListContainer: Locator = this.page.locator('#design_list');
  236 |   readonly illustListContainer: Locator = this.page.locator('#illust_list');
  237 |   readonly silhouetteListContainer: Locator = this.page.locator('#slh_list');
  238 |   readonly videoListContainer: Locator = this.page.locator('#video_list');
  239 |   readonly designItems: Locator = this.page.locator('#design_list a.show-related-modal');
  240 |   readonly illustItems: Locator = this.page.locator('#illust_list a.show-related-modal');
  241 |   readonly silhouetteItems: Locator = this.page.locator('#slh_list a.show-related-modal');
  242 |   readonly videoItems: Locator = this.page.locator('#video_list a.show-related-modal');
  243 |   readonly relatedSearchModal: Locator = this.page.locator('#relatedSearchModal');
  244 |   readonly relatedModalNotice: Locator = this.page.locator('#relatedSearchModal .modal-body p');
  245 |   readonly relatedModalDownloadButton: Locator = this.page.locator('#relatedSearchModal a.ac-btn:has-text("ダウンロードページ")');
  246 |   readonly relatedModalCloseButton: Locator = this.page.locator('#relatedSearchModal button.close');
  247 | 
  248 |   // Constructor
  249 |   constructor(page: Page) {
  250 |     super(page);
  251 |   }
  252 | 
  253 |   // Actions
  254 |   /**
  255 |    * Dismiss introductory/promotional dialog if visible on the page (e.g. Premium feature tips dialog).
  256 |    * Checks immediately without stalling test execution when no dialog is present.
  257 |    */
  258 |   async dismissIntroDialogIfPresent(): Promise<void> {
  259 |     try {
  260 |       if (await this.introDialog.first().isVisible().catch(() => false)) {
  261 |         if (await this.introDialogCloseButton.first().isVisible().catch(() => false)) {
  262 |           await this.introDialogCloseButton.first().click({ force: true }).catch(() => { });
  263 |         } else {
  264 |           await this.page.keyboard.press('Escape').catch(() => { });
  265 |         }
  266 |         await this.introDialog.first().waitFor({ state: 'hidden', timeout: 2_000 }).catch(() => { });
  267 |       }
  268 |     } catch {
  269 |       // Ignore if no dialog is present
  270 |     }
  271 |   }
  272 | 
  273 |   /**
  274 |    * Wait for either search result items to appear or the "no results" message to be displayed.
  275 |    * Uses Playwright native .or() locator to resolve immediately on whichever appears first,
  276 |    * without running unhandled 20s background promises or causing runner lag.
  277 |    * @param timeout - Maximum timeout in ms (default 15_000)
  278 |    */
  279 |   async waitForResultDisplay(timeout: number = 15_000): Promise<void> {
  280 |     await test.step('Wait for search result display', async () => {
  281 |       await this.waitForPageLoadingIconHidden();
> 282 |       await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout });
      |                                           ^ Error: locator.waitFor: Test ended.
  283 |       await this.dismissIntroDialogIfPresent();
  284 |     });
  285 |   }
  286 | 
  287 |   /**
  288 |    * Get the number of visible thumbnail results on the current page.
  289 |    * Uses Web-First auto-wait with unified locator to avoid counting during DOM transition gaps.
  290 |    * @param options - Optional timeout configuration
  291 |    */
  292 |   async getResultCount(options?: { timeout?: number }): Promise<number> {
  293 |     const timeout = options?.timeout ?? 10_000;
  294 |     await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout }).catch(() => { });
  295 |     return this.resultItems.count();
  296 |   }
  297 | 
  298 |   /**
  299 |    * Perform a new search from the results page header.
  300 |    */
  301 |   async searchAgain(keyword: string): Promise<void> {
  302 |     await test.step(`Search again with keyword: "${keyword}"`, async () => {
  303 |       await this.fillInput(this.searchInput, keyword);
  304 |       await this.page.keyboard.press('Enter');
  305 |       await this.waitForResultDisplay();
  306 |     });
  307 |   }
  308 | 
  309 |   /**
  310 |    * Click the reset button inside the search input.
  311 |    */
  312 |   async clickResetKeyword(): Promise<void> {
  313 |     await test.step('Click Reset keyword button', async () => {
  314 |       await this.clickElement(this.resetKeywordButton);
  315 |     });
  316 |   }
  317 | 
  318 |   /**
  319 |    * Open the sort dropdown menu.
  320 |    */
  321 |   async openSortDropdown(): Promise<void> {
  322 |     await test.step('Open sort dropdown menu', async () => {
  323 |       await this.dismissIntroDialogIfPresent();
  324 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortRelevanceLabel);
  325 |     });
  326 |   }
  327 | 
  328 |   /**
  329 |    * Click the "新着順" (Newest) sort option.
  330 |    */
  331 |   async selectNewestSort(): Promise<void> {
  332 |     await test.step('Select "新着順" (Newest) sort', async () => {
  333 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortNewestLabel);
  334 |       await this.clickElement(this.sortNewestLabel, { force: true, noWaitAfter: true });
  335 |       await this.waitForResultDisplay();
  336 |     });
  337 |   }
  338 | 
  339 |   /**
  340 |    * Click the "人気順" (Popularity) sort option which is blocked for free/guest users.
  341 |    */
  342 |   async clickPopularSort(): Promise<void> {
  343 |     await test.step('Click "人気順" (Popularity) sort option', async () => {
  344 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortPopularLabel);
  345 |       await this.clickElement(this.sortPopularLabel, { force: true });
  346 |     });
  347 |   }
  348 | 
  349 |   /**
  350 |    * Select "人気順" (Popularity) sort option for Premium users and wait for results.
  351 |    */
  352 |   async selectPopularSort(): Promise<void> {
  353 |     await test.step('Select "人気順" (Popularity) sort for Premium user', async () => {
  354 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortPopularLabel);
  355 |       await this.clickElement(this.sortPopularLabel, { force: true, noWaitAfter: true });
  356 |       await this.waitForResultDisplay();
  357 |     });
  358 |   }
  359 | 
  360 |   /**
  361 |    * Select "関連性の高い順" (Relevance) sort option and wait for results.
  362 |    */
  363 |   async selectRelevanceSort(): Promise<void> {
  364 |     await test.step('Select "関連性の高い順" (Relevance) sort', async () => {
  365 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortRelevanceLabel);
  366 |       await this.clickElement(this.sortRelevanceLabel, { force: true, noWaitAfter: true });
  367 |       await this.waitForResultDisplay();
  368 |     });
  369 |   }
  370 | 
  371 |   /**
  372 |    * Select display count per page (70, 140, 210 items).
  373 |    */
  374 |   async selectDisplayCount(count: '70' | '140' | '210'): Promise<void> {
  375 |     await test.step(`Select display count: ${count} items per page`, async () => {
  376 |       const targetLabel = count === '210'
  377 |         ? this.displayCount210Label
  378 |         : (count === '140' ? this.displayCount140Label : this.displayCount70Label);
  379 |       await this.openToolbarDropdown(this.sortDropdownButton, targetLabel);
  380 |       await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
  381 |       await this.waitForResultDisplay();
  382 |     });
```