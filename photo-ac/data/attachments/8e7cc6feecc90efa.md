# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-012: Filter và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) qua Toolbar @guest @filter
- Location: photo-ac/src/tests/downloader/search-guest.spec.ts:364:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('img.thumbnail-image, img.thumbnail').first().or(getByText(/該当する写真がありませんでした|写真は見つかりませんでした/).first()) to be visible
    - waiting for" https://test-lien.photo-ac.com/main/search?by_ai=&q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age…" navigation to finish...

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - button "検索フィルター" [ref=e4] [cursor=pointer]:
        - generic [ref=e5]:
          - img [ref=e6]
          - generic [ref=e9]: 
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]:
            - link "写真AC" [ref=e14] [cursor=pointer]:
              - /url: /
              - img "写真AC" [ref=e15]
            - text: 
          - search [ref=e17]:
            - generic [ref=e19]:
              - generic [ref=e20]:
                - button "menu-bars" [ref=e21] [cursor=pointer]:
                  - generic [ref=e22]: 
                - button "AI Search is off" [ref=e23] [cursor=pointer]:
                  - img "AI Search is off" [ref=e24]
                - text: 
                - generic [ref=e25]:
                  - searchbox "キーワード（例：女性）" [ref=e26]: ビジネス
                  - button "リセット" [ref=e27] [cursor=pointer]:
                    - img [ref=e29]
                  - generic [ref=e31]: ビジネス
                - link "upload file" [ref=e33] [cursor=pointer]:
                  - /url: "#"
                  - generic [ref=e34]: 
                - button "search_btn" [ref=e35] [cursor=pointer]:
                  - generic [ref=e36]: 
              - button "カテゴリー " [ref=e38] [cursor=pointer]:
                - text: カテゴリー
                - generic [ref=e39]: 
        - generic [ref=e41]:
          - generic [ref=e42]:
            - button "会員登録（無料）" [ref=e43] [cursor=pointer]
            - text: 
          - button "ログイン" [ref=e45] [cursor=pointer]:
            - generic [ref=e46]: 
            - text: ログイン
          - button "クリックしてACアプリケーションのリストを表示" [ref=e48] [cursor=pointer]:
            - img [ref=e49]
    - text: 
  - text:      
  - generic [ref=e51]:
    - generic [ref=e52]:
      - link "PhotoAC" [ref=e53] [cursor=pointer]:
        - /url: /
        - img "PhotoAC" [ref=e54]
      - button "mobile-btn-close" [ref=e55] [cursor=pointer]:
        - img [ref=e56]
    - list [ref=e59]:
      - listitem [ref=e60]
      - listitem [ref=e61]:
        - link "プレミアム会員登録" [ref=e62] [cursor=pointer]:
          - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
      - listitem [ref=e63]:
        - link "法人・複数名向けプラン" [ref=e64] [cursor=pointer]:
          - /url: https://test-lien.photo-ac.com/premium/business
      - listitem [ref=e65]:
        - link "デザインテンプレート" [ref=e66] [cursor=pointer]:
          - /url: https://www.design-ac.net/
          - text: デザインテンプレート
          - generic [ref=e67]: 
      - listitem [ref=e68]:
        - link "ファイル転送・共有" [ref=e69] [cursor=pointer]:
          - /url: https://ac-data.info/
          - text: ファイル転送・共有
          - generic [ref=e70]: 
      - listitem [ref=e71]:
        - button "写真カテゴリー" [ref=e72] [cursor=pointer]:
          - text: 写真カテゴリー
          - generic [ref=e73]: 
      - listitem [ref=e74]:
        - button "ランキング" [ref=e75] [cursor=pointer]:
          - text: ランキング
          - generic [ref=e76]: 
      - listitem [ref=e77]:
        - link "新着写真一覧" [ref=e78] [cursor=pointer]:
          - /url: /main/latest
      - listitem [ref=e79]:
        - button "画像生成AI" [ref=e80] [cursor=pointer]:
          - text: 画像生成AI
          - generic [ref=e81]: 
      - listitem [ref=e82]:
        - link "公開中のコレクション" [ref=e83] [cursor=pointer]:
          - /url: /main/collections
      - listitem [ref=e84]:
        - link "クリエイター一覧" [ref=e85] [cursor=pointer]:
          - /url: /creators/
      - listitem [ref=e86]:
        - link "おすすめ特集一覧" [ref=e87] [cursor=pointer]:
          - /url: /pickup/1
      - listitem [ref=e88]:
        - link "おすすめ人気モデル一覧" [ref=e89] [cursor=pointer]:
          - /url: /models/
      - listitem [ref=e90]:
        - link "商品化ライセンスとは?" [ref=e91] [cursor=pointer]:
          - /url: /main/extra_license_terms
      - listitem [ref=e92]:
        - link "写真の権利について" [ref=e93] [cursor=pointer]:
          - /url: /main/guide/rights-of-objects
      - listitem [ref=e94]:
        - link "FAQ・ヘルプ" [ref=e95] [cursor=pointer]:
          - /url: https://help.freebie-ac.jp
      - listitem [ref=e96]:
        - link "クリエイター投稿（新規登録）" [ref=e97] [cursor=pointer]:
          - /url: /creator/auth/register
      - listitem [ref=e98]:
        - link "クリエイターログイン" [ref=e99] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e100]:
        - link "今日の運勢" [ref=e101] [cursor=pointer]:
          - /url: https://uranai-ac.com/
          - text: 今日の運勢
          - generic [ref=e102]: 
  - text:     
  - generic [ref=e106]:
    - generic "ボタンホーム" [ref=e107]:
      - link "ホーム" [ref=e108] [cursor=pointer]:
        - /url: /
        - img [ref=e109]
    - generic "ボタンフォロー" [ref=e111]:
      - link "ファン登録" [ref=e112] [cursor=pointer]:
        - /url: /user/following/
        - generic [ref=e113]: 
    - generic "ボタンブックマーク" [ref=e114]:
      - link "コレクション" [ref=e115] [cursor=pointer]:
        - /url: /user/bookmarks/
        - generic [ref=e116]: 
    - img [ref=e121] [cursor=pointer]
```

# Test source

```ts
  181 |   readonly modelCountZeroLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-0"]').first(); // 無人 (0 people)
  182 |   readonly modelCountOneLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-1"]').first();   // 1人 (1 person)
  183 |   readonly modelCountTwoLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-2"]').first();   // 2人 (2 people)
  184 |   readonly modelCountThreePlusLabel: Locator = this.page.locator('#filter-dropdown-other label[for="model_count-3"]').first(); // 3人以上
  185 |   readonly ageBabyLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-A"]').first();   // 赤ちゃん
  186 |   readonly ageChildLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-K"]').first();  // 子供
  187 |   readonly ageYoungLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-W"]').first();  // 若者
  188 |   readonly ageAdultLabel: Locator = this.page.locator('#filter-dropdown-other label[for="age-O"]').first();  // 大人
  189 | 
  190 |   // ─── Filter Option Locators: 5. Exclude Keyword (除外キーワード) ────────────
  191 |   readonly excludeKeywordInput: Locator = this.page.locator('#filter-dropdown-exclude-kw #form_nq, #form_nq');
  192 | 
  193 |   // ─── Filter Option Locators: 6. Detailed Search (詳細検索) ──────────────────
  194 |   readonly detailedCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_creator, #form_creator');
  195 |   readonly detailedNgCreatorInput: Locator = this.page.locator('#filter-dropdown-detail #form_ngcreator, #form_ngcreator');
  196 |   readonly detailedPhotoIdInput: Locator = this.page.locator('#filter-dropdown-detail #form_qid, #form_qid');
  197 | 
  198 |   // ─── Filter Option Locators: 7. Display Conditions (表示条件) ───────────────
  199 |   readonly exactMatchCheckbox: Locator = this.page.locator('#filter-dropdown-display #type_search, #type_search');
  200 |   readonly exactMatchLabel: Locator = this.page.locator('#filter-dropdown-display label[for="type_search"]').first();
  201 |   readonly excludeAiCheckbox: Locator = this.page.locator('#filter-dropdown-display #exclude_ai, #exclude_ai');
  202 |   readonly excludeAiLabel: Locator = this.page.locator('#filter-dropdown-display label[for="exclude_ai"]').first();
  203 |   readonly modelReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-on"]').first();
  204 |   readonly modelReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="mdlrlrsec-all"]').first();
  205 |   readonly propertyReleaseOnLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-on"]').first();
  206 |   readonly propertyReleaseAllLabel: Locator = this.page.locator('#filter-dropdown-display label[for="prprlrsec-all"]').first();
  207 | 
  208 |   // ─── AI Search (AI検索) Locators ─────────────────────────────────────────
  209 | 
  210 |   /** AI Search toggle button on results page */
  211 |   readonly searchByAiButton: Locator = this.page.locator('.search-by-ai').first();
  212 | 
  213 |   /** Clock overlay icon indicating AI daily search limit reached */
  214 |   readonly aiLimitClockIcon: Locator = this.page.locator('.search-by-ai .overlay-icon-clock').first();
  215 | 
  216 |   /** AI Search ON icon */
  217 |   readonly aiSearchOnIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-on').first();
  218 | 
  219 |   /** AI Search OFF icon */
  220 |   readonly aiSearchOffIcon: Locator = this.page.locator('.search-by-ai .search-ai-icon-off').first();
  221 | 
  222 |   // ─── Pagination Locators ───────────────────────────────────────────────────
  223 | 
  224 |   /** Pagination container (ul.ac-pagination) */
  225 |   readonly paginationContainer: Locator = this.page.locator('ul.ac-pagination');
  226 | 
  227 |   /** Active / Current page number link */
  228 |   readonly paginationActivePage: Locator = this.page.locator('ul.ac-pagination li.active a');
  229 | 
  230 |   /** Next page button */
  231 |   readonly paginationNextButton: Locator = this.page.locator('ul.ac-pagination a.next, ul.ac-pagination a[rel="next"]');
  232 | 
  233 |   /** Previous page button */
  234 |   readonly paginationPrevButton: Locator = this.page.locator('ul.ac-pagination a.prev, ul.ac-pagination a[rel="prev"]');
  235 | 
  236 |   // ─── Photo Detail AI Face Locators ─────────────────────────────────────────
  237 | 
  238 |   /** AI Face thumbnail links displayed on the photo detail page (.face-list a.face-item) */
  239 |   readonly faceItemLinks: Locator = this.page.locator('.face-list a.face-item');
  240 | 
  241 |   /** Introductory / promotional dialog popup (e.g. Premium feature tips dialog) */
  242 |   readonly introDialog: Locator = this.page.locator('dialog:has(a[href*="function_introduction"]), dialog[open], [role="dialog"]:has(.icon-close)');
  243 |   readonly introDialogCloseButton: Locator = this.page.locator('dialog .icon-close, dialog [aria-label="Close"], [role="region"][aria-label="Close"], dialog button.close');
  244 | 
  245 |   // ─── Constructor ──────────────────────────────────────────────────────────
  246 | 
  247 |   constructor(page: Page) {
  248 |     super(page);
  249 |   }
  250 | 
  251 |   // ─── Actions ──────────────────────────────────────────────────────────────
  252 | 
  253 |   /**
  254 |    * Dismiss introductory/promotional dialog if visible on the page (e.g. Premium feature tips dialog).
  255 |    * Checks immediately without stalling test execution when no dialog is present.
  256 |    */
  257 |   async dismissIntroDialogIfPresent(): Promise<void> {
  258 |     try {
  259 |       if (await this.introDialog.first().isVisible().catch(() => false)) {
  260 |         if (await this.introDialogCloseButton.first().isVisible().catch(() => false)) {
  261 |           await this.introDialogCloseButton.first().click({ force: true }).catch(() => { });
  262 |         } else {
  263 |           await this.page.keyboard.press('Escape').catch(() => { });
  264 |         }
  265 |         await this.introDialog.first().waitFor({ state: 'hidden', timeout: 2_000 }).catch(() => { });
  266 |       }
  267 |     } catch {
  268 |       // Ignore if no dialog is present
  269 |     }
  270 |   }
  271 | 
  272 |   /**
  273 |    * Wait for either search result items to appear or the "no results" message to be displayed.
  274 |    * Uses Playwright native .or() locator to resolve immediately on whichever appears first,
  275 |    * without running unhandled 20s background promises or causing runner lag.
  276 |    * @param timeout - Maximum timeout in ms (default 15_000)
  277 |    */
  278 |   async waitForResultDisplay(timeout: number = 15_000): Promise<void> {
  279 |     await test.step('Wait for search result display', async () => {
  280 |       await this.waitForPageLoadingIconHidden();
> 281 |       await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout });
      |                                           ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  282 |       await this.dismissIntroDialogIfPresent();
  283 |     });
  284 |   }
  285 | 
  286 |   /**
  287 |    * Get the number of visible thumbnail results on the current page.
  288 |    * Uses Web-First auto-wait with unified locator to avoid counting during DOM transition gaps.
  289 |    * @param options - Optional timeout configuration
  290 |    */
  291 |   async getResultCount(options?: { timeout?: number }): Promise<number> {
  292 |     const timeout = options?.timeout ?? 10_000;
  293 |     await this.resultsOrNoResultLocator.waitFor({ state: 'visible', timeout }).catch(() => { });
  294 |     return this.resultItems.count();
  295 |   }
  296 | 
  297 |   /**
  298 |    * Perform a new search from the results page header.
  299 |    */
  300 |   async searchAgain(keyword: string): Promise<void> {
  301 |     await test.step(`Search again with keyword: "${keyword}"`, async () => {
  302 |       await this.fillInput(this.searchInput, keyword);
  303 |       await this.page.keyboard.press('Enter');
  304 |       await this.waitForResultDisplay();
  305 |     });
  306 |   }
  307 | 
  308 |   /**
  309 |    * Click the reset button inside the search input.
  310 |    */
  311 |   async clickResetKeyword(): Promise<void> {
  312 |     await test.step('Click Reset keyword button', async () => {
  313 |       await this.clickElement(this.resetKeywordButton);
  314 |     });
  315 |   }
  316 | 
  317 |   /**
  318 |    * Open the sort dropdown menu.
  319 |    */
  320 |   async openSortDropdown(): Promise<void> {
  321 |     await test.step('Open sort dropdown menu', async () => {
  322 |       await this.dismissIntroDialogIfPresent();
  323 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortRelevanceLabel);
  324 |     });
  325 |   }
  326 | 
  327 |   /**
  328 |    * Click the "新着順" (Newest) sort option.
  329 |    */
  330 |   async selectNewestSort(): Promise<void> {
  331 |     await test.step('Select "新着順" (Newest) sort', async () => {
  332 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortNewestLabel);
  333 |       await this.clickElement(this.sortNewestLabel, { force: true, noWaitAfter: true });
  334 |       await this.waitForResultDisplay();
  335 |     });
  336 |   }
  337 | 
  338 |   /**
  339 |    * Click the "人気順" (Popularity) sort option which is blocked for free/guest users.
  340 |    */
  341 |   async clickPopularSort(): Promise<void> {
  342 |     await test.step('Click "人気順" (Popularity) sort option', async () => {
  343 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortPopularLabel);
  344 |       await this.clickElement(this.sortPopularLabel, { force: true });
  345 |     });
  346 |   }
  347 | 
  348 |   /**
  349 |    * Select "人気順" (Popularity) sort option for Premium users and wait for results.
  350 |    */
  351 |   async selectPopularSort(): Promise<void> {
  352 |     await test.step('Select "人気順" (Popularity) sort for Premium user', async () => {
  353 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortPopularLabel);
  354 |       await this.clickElement(this.sortPopularLabel, { force: true, noWaitAfter: true });
  355 |       await this.waitForResultDisplay();
  356 |     });
  357 |   }
  358 | 
  359 |   /**
  360 |    * Select "関連性の高い順" (Relevance) sort option and wait for results.
  361 |    */
  362 |   async selectRelevanceSort(): Promise<void> {
  363 |     await test.step('Select "関連性の高い順" (Relevance) sort', async () => {
  364 |       await this.openToolbarDropdown(this.sortDropdownButton, this.sortRelevanceLabel);
  365 |       await this.clickElement(this.sortRelevanceLabel, { force: true, noWaitAfter: true });
  366 |       await this.waitForResultDisplay();
  367 |     });
  368 |   }
  369 | 
  370 |   /**
  371 |    * Select display count per page (70, 140, 210 items).
  372 |    */
  373 |   async selectDisplayCount(count: '70' | '140' | '210'): Promise<void> {
  374 |     await test.step(`Select display count: ${count} items per page`, async () => {
  375 |       const targetLabel = count === '210'
  376 |         ? this.displayCount210Label
  377 |         : (count === '140' ? this.displayCount140Label : this.displayCount70Label);
  378 |       await this.openToolbarDropdown(this.sortDropdownButton, targetLabel);
  379 |       await this.clickElement(targetLabel, { force: true, noWaitAfter: true });
  380 |       await this.waitForResultDisplay();
  381 |     });
```