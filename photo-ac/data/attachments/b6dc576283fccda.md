# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile/search-mobile.spec.ts >> Search Feature — Mobile (Guest User) >> TC-SEARCH-MOBILE-004: Tìm kiếm từ khóa không tồn tại hiển thị thông báo không có kết quả trên Mobile @negative @mobile @guest
- Location: photo-ac/src/tests/mobile/search-mobile.spec.ts:118:7

# Error details

```
Error: locator.waitFor: Test ended.
Call log:
  - waiting for locator('img.thumbnail-image, img.thumbnail').first().or(getByText(/該当する写真がありませんでした|写真は見つかりませんでした/).first()) to be visible

```

# Test source

```ts
  153 |   readonly modelCountAllLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-all"], #filter-dropdown-other label[for="model_count--1"]').first();
  154 |   readonly modelCountZeroLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-0"]').first(); // 無人 (0 people)
  155 |   readonly modelCountOneLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-1"]').first();   // 1人 (1 person)
  156 |   readonly modelCountTwoLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-2"]').first();   // 2人 (2 people)
  157 |   readonly modelCountThreePlusLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-3"]').first(); // 3人以上
  158 |   readonly ageBabyLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-A"]').first();   // 赤ちゃん
  159 |   readonly ageChildLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-K"]').first();  // 子供
  160 |   readonly ageYoungLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-W"]').first();  // 若者
  161 |   readonly ageAdultLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-O"]').first();  // 大人
  162 | 
  163 |   // ─── Filter Option Locators: 5. Exclude Keyword (除外キーワード) ────────────
  164 |   readonly excludeKeywordInput: Locator = this.page.locator('#filter-dropdown-exclude-kw #form_nq, #form_nq');
  165 | 
  166 |   // ─── Filter Option Locators: 6. Detailed Search (詳細検索) ──────────────────
  167 |   readonly detailedCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_creator, #form_creator');
  168 |   readonly detailedNgCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_ngcreator, #form_ngcreator');
  169 |   readonly detailedPhotoIdInput: Locator = this.page.locator('#filter-dropdown-detail #form_qid, #form_qid');
  170 | 
  171 |   // ─── Filter Option Locators: 7. Display Conditions (表示条件) ───────────────
  172 |   readonly exactMatchCheckbox: Locator = this.page.locator('#filter-dropdown-display #type_search, #type_search');
  173 |   readonly exactMatchLabel: Locator = this.page.locator('#filter-dropdown-display label[for="type_search"]').first();
  174 |   readonly excludeAiCheckbox: Locator = this.page.locator('#filter-dropdown-display #exclude_ai, #exclude_ai');
  175 |   readonly excludeAiLabel: Locator = this.page.locator('#filter-dropdown-display label[for="exclude_ai"]').first();
  176 |   readonly modelReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-on"]').first();
  177 |   readonly modelReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-all"]').first();
  178 |   readonly propertyReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-on"]').first();
  179 | 
  180 |   // ─── AI Search (AI検索) Locators ─────────────────────────────────────────
  181 | 
  182 |   /** AI Search toggle button on results page */
  183 |   readonly searchByAiButton: Locator = this.page.locator('.search-by-ai').first();
  184 | 
  185 |   /** Clock overlay icon indicating AI daily search limit reached */
  186 |   readonly aiLimitClockIcon: Locator = this.page.locator('.search-by-ai .overlay-icon-clock').first();
  187 | 
  188 |   /** AI Search ON icon */
  189 |   readonly aiSearchOnIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-on').first();
  190 | 
  191 |   /** AI Search OFF icon */
  192 |   readonly aiSearchOffIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-off').first();
  193 | 
  194 |   // ─── Pagination Locators ───────────────────────────────────────────────────
  195 | 
  196 |   /** Pagination container (ul.ac-pagination) */
  197 |   readonly paginationContainer: Locator = this.page.locator('ul.ac-pagination');
  198 | 
  199 |   /** Active / Current page number link */
  200 |   readonly paginationActivePage: Locator = this.page.locator('ul.ac-pagination li.active a');
  201 | 
  202 |   /** Next page button */
  203 |   readonly paginationNextButton: Locator = this.page.locator('ul.ac-pagination a.next, ul.ac-pagination a[rel="next"]');
  204 | 
  205 |   /** Previous page button */
  206 |   readonly paginationPrevButton: Locator = this.page.locator('ul.ac-pagination a.prev, ul.ac-pagination a[rel="prev"]');
  207 | 
  208 |   // ─── Photo Detail AI Face Locators ─────────────────────────────────────────
  209 | 
  210 |   /** AI Face thumbnail links displayed on the photo detail page (.face-list a.face-item) */
  211 |   readonly faceItemLinks: Locator = this.page.locator('.face-list a.face-item');
  212 | 
  213 |   /** Introductory / promotional dialog popup (e.g. Premium feature tips dialog) */
  214 |   readonly introDialog: Locator = this.page.locator('dialog:has(a[href*="function_introduction"]), dialog[open], [role="dialog"]:has(.icon-close)');
  215 |   readonly introDialogCloseButton: Locator = this.page.locator('dialog .icon-close, dialog [aria-label="Close"], [role="region"][aria-label="Close"], dialog button.close');
  216 | 
  217 |   // ─── Constructor ──────────────────────────────────────────────────────────
  218 | 
  219 |   constructor(page: Page) {
  220 |     super(page);
  221 |   }
  222 | 
  223 |   // ─── Actions ──────────────────────────────────────────────────────────────
  224 | 
  225 |   /**
  226 |    * Dismiss introductory/promotional dialog if visible on the page (e.g. Premium feature tips dialog).
  227 |    * Checks immediately without stalling test execution when no dialog is present.
  228 |    */
  229 |   async dismissIntroDialogIfPresent(): Promise<void> {
  230 |     try {
  231 |       if (await this.introDialog.first().isVisible().catch(() => false)) {
  232 |         if (await this.introDialogCloseButton.first().isVisible().catch(() => false)) {
  233 |           await this.introDialogCloseButton.first().click({ force: true }).catch(() => { });
  234 |         } else {
  235 |           await this.page.keyboard.press('Escape').catch(() => { });
  236 |         }
  237 |         await this.introDialog.first().waitFor({ state: 'hidden', timeout: 2_000 }).catch(() => { });
  238 |       }
  239 |     } catch {
  240 |       // Ignore if no dialog is present
  241 |     }
  242 |   }
  243 | 
  244 |   /**
  245 |    * Wait for either search result items to appear or the "no results" message to be displayed.
  246 |    * Uses Playwright native .or() locator to resolve immediately on whichever appears first,
  247 |    * without running unhandled 20s background promises or causing runner lag.
  248 |    * @param timeout - Maximum timeout in ms (default 15_000)
  249 |    */
  250 |   async waitForResultDisplay(timeout: number = 15_000): Promise<void> {
  251 |     await test.step('Wait for search result display', async () => {
  252 |       await this.waitForPageLoadingIconHidden();
> 253 |       await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout });
      |                                           ^ Error: locator.waitFor: Test ended.
  254 |       await this.dismissIntroDialogIfPresent();
  255 |     });
  256 |   }
  257 | 
  258 |   /**
  259 |    * Get the number of visible thumbnail results on the current page.
  260 |    * Uses Web-First auto-wait with unified locator to avoid counting during DOM transition gaps.
  261 |    * @param options - Optional timeout configuration
  262 |    */
  263 |   async getResultCount(options?: { timeout?: number }): Promise<number> {
  264 |     const timeout = options?.timeout ?? 10_000;
  265 |     await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout }).catch(() => { });
  266 |     return this.resultItems.count();
  267 |   }
  268 | 
  269 |   /**
  270 |    * Perform a new search from the results page header.
  271 |    */
  272 |   async searchAgain(keyword: string): Promise<void> {
  273 |     await test.step(`Search again with keyword: "${keyword}"`, async () => {
  274 |       await this.fillInput(this.searchInput, keyword);
  275 |       await this.page.keyboard.press('Enter');
  276 |       await this.waitForResultDisplay();
  277 |     });
  278 |   }
  279 | 
  280 |   /**
  281 |    * Click the reset button inside the search input.
  282 |    */
  283 |   async clickResetKeyword(): Promise<void> {
  284 |     await test.step('Click Reset keyword button', async () => {
  285 |       await this.clickElement(this.resetKeywordButton);
  286 |     });
  287 |   }
  288 | 
  289 |   /**
  290 |    * Open the sort dropdown menu.
  291 |    */
  292 |   async openSortDropdown(): Promise<void> {
  293 |     await test.step('Open sort dropdown menu', async () => {
  294 |       await this.dismissIntroDialogIfPresent();
  295 |       await expect(async () => {
  296 |         if (!await this.sortRelevanceLabel.isVisible()) {
  297 |           await this.clickElement(this.sortDropdownButton);
  298 |         }
  299 |         await expect(this.sortRelevanceLabel).toBeVisible({ timeout: 1_000 });
  300 |       }).toPass({ intervals: [500, 1_000], timeout: 10_000 });
  301 |     });
  302 |   }
  303 | 
  304 |   /**
  305 |    * Click the "新着順" (Newest) sort option.
  306 |    */
  307 |   async selectNewestSort(): Promise<void> {
  308 |     await test.step('Select "新着順" (Newest) sort', async () => {
  309 |       await this.openSortDropdown();
  310 |       await this.clickElement(this.sortNewestLabel);
  311 |       await this.waitForResultDisplay();
  312 |     });
  313 |   }
  314 | 
  315 |   /**
  316 |    * Click the "人気順" (Popularity) sort option which is blocked for free/guest users.
  317 |    */
  318 |   async clickPopularSort(): Promise<void> {
  319 |     await test.step('Click "人気順" (Popularity) sort option', async () => {
  320 |       await this.openSortDropdown();
  321 |       await this.clickElement(this.sortPopularLabel);
  322 |     });
  323 |   }
  324 | 
  325 |   /**
  326 |    * Select "人気順" (Popularity) sort option for Premium users and wait for results.
  327 |    */
  328 |   async selectPopularSort(): Promise<void> {
  329 |     await test.step('Select "人気順" (Popularity) sort for Premium user', async () => {
  330 |       await this.openSortDropdown();
  331 |       await this.clickElement(this.sortPopularLabel);
  332 |       await this.waitForResultDisplay();
  333 |     });
  334 |   }
  335 | 
  336 |   /**
  337 |    * Select "関連性の高い順" (Relevance) sort option and wait for results.
  338 |    */
  339 |   async selectRelevanceSort(): Promise<void> {
  340 |     await test.step('Select "関連性の高い順" (Relevance) sort', async () => {
  341 |       await this.openSortDropdown();
  342 |       await this.clickElement(this.sortRelevanceLabel);
  343 |       await this.waitForResultDisplay();
  344 |     });
  345 |   }
  346 | 
  347 |   /**
  348 |    * Select display count per page (70, 140, 210 items).
  349 |    */
  350 |   async selectDisplayCount(count: '70' | '140' | '210'): Promise<void> {
  351 |     await test.step(`Select display count: ${count} items per page`, async () => {
  352 |       await this.openSortDropdown();
  353 |       const targetLabel = count === '210'
```