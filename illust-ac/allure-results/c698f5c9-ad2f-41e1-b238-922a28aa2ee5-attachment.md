# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader\search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-002: Guest tìm kiếm nhiều từ khóa kết hợp: hiển thị kết quả @regression @guest
- Location: src\tests\downloader\search-guest.spec.ts:68:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('form:not(#search_frm_fixed):has(.search-by-ai) input[type="text"], form:not(#search_frm_fixed):has(.search-by-ai) input[type="search"], form:not(#search_frm_fixed):has(.search-by-ai) input#sw, input#sw:visible').first() to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.ac-illust.com/"
  - generic [ref=e3]:
    - generic [ref=e4]:
      - heading "Let's confirm you are human" [level=1] [ref=e6]
      - generic [ref=e7]:
        - paragraph [ref=e9]: Complete the security check before continuing. This step verifies that you are not a bot, which helps to protect your account and prevent spam.
        - button "Begin begin" [ref=e12] [cursor=pointer]:
          - text: Begin
          - img "begin" [ref=e13]
    - combobox "Select language" [ref=e14]:
      - option "العربية"
      - option "Čeština"
      - option "Dansk"
      - option "Deutsch"
      - option "English" [selected]
      - option "Español"
      - option "Français"
      - option "Bahasa Indonesia"
      - option "Italiano"
      - option "日本語"
      - option "한국어"
      - option "Nederlands"
      - option "Polski"
      - option "Português"
      - option "Svenska"
      - option "ไทย"
      - option "Türkçe"
      - option "中文"
```

# Test source

```ts
  1   | import { type Page, type Locator, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * BasePage — Abstract base class for all Page Object classes.
  5   |  * Contains common reusable methods with smart waits.
  6   |  * NEVER place assertions here — assertions belong in test files.
  7   |  */
  8   | export abstract class BasePage {
  9   |   protected readonly page: Page;
  10  | 
  11  |   protected readonly photoAiModelContent: Locator;
  12  | 
  13  |   protected readonly closeButton: Locator;
  14  | 
  15  |   protected readonly pageLoadingIcon: Locator;
  16  | 
  17  |   constructor(page: Page) {
  18  |     this.page = page;
  19  |     this.photoAiModelContent = this.page.locator('.photo-ai-lab-modal__content');
  20  |     this.closeButton = this.page.getByRole('button', { name: '閉じる' }).nth(1);
  21  |     this.pageLoadingIcon = page.locator('#full_page_loading').first();
  22  |   }
  23  | 
  24  |   // ─── Navigation ──────────────────────────────────────────────────────────
  25  | 
  26  |   /**
  27  |    * Navigate to a URL path relative to baseURL with resilient retry on transient network timeouts.
  28  |    * @param path - Relative path (e.g., '/login') or absolute URL
  29  |    * @param options - Optional navigation configuration
  30  |    */
  31  |   async navigate(path: string = '/', options?: { timeout?: number }): Promise<void> {
  32  |     const timeout = options?.timeout ?? 25_000;
  33  |     try {
  34  |       await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
  35  |     } catch {
  36  |       // Retry once if navigation timed out due to staging network latency
  37  |       await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
  38  |     }
  39  |   }
  40  | 
  41  |   /**
  42  |    * Wait for the page to reach a stable network state.
  43  |    */
  44  |   async waitForPageLoad(): Promise<void> {
  45  |     await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  46  |   }
  47  | 
  48  |   // ─── Element Interaction ─────────────────────────────────────────────────
  49  | 
  50  |   /**
  51  |    * Click an element after ensuring it is visible and enabled.
  52  |    * @param locator - Playwright Locator object
  53  |    */
  54  |   async clickElement(locator: Locator, options?: { force?: boolean }): Promise<void> {
  55  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  56  |     if (options?.force) {
  57  |       await locator.click({ force: true });
  58  |     } else {
  59  |       await locator.click().catch(async () => {
  60  |         await locator.click({ force: true });
  61  |       });
  62  |     }
  63  |   }
  64  | 
  65  |   /**
  66  |    * Fill an input field — clears existing value first.
  67  |    * @param locator - Playwright Locator for the input
  68  |    * @param value - Text to type into the field
  69  |    */
  70  |   async fillInput(locator: Locator, value: string): Promise<void> {
> 71  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
      |                   ^ TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
  72  |     await locator.fill('');
  73  |     await locator.fill(value);
  74  |   }
  75  | 
  76  |   /**
  77  |    * Get trimmed text content of an element.
  78  |    * @param locator - Playwright Locator
  79  |    * @returns Text content string
  80  |    */
  81  |   async getText(locator: Locator): Promise<string> {
  82  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  83  |     return (await locator.textContent())?.trim() ?? '';
  84  |   }
  85  | 
  86  |   /**
  87  |    * Get the value of an input element.
  88  |    * @param locator - Playwright Locator for the input
  89  |    */
  90  |   async getInputValue(locator: Locator): Promise<string> {
  91  |     return locator.inputValue();
  92  |   }
  93  | 
  94  |   /**
  95  |    * Check if an element is visible on the page.
  96  |    * @param locator - Playwright Locator
  97  |    * @returns true if visible, false otherwise
  98  |    */
  99  |   async isVisible(locator: Locator): Promise<boolean> {
  100 |     return locator.isVisible();
  101 |   }
  102 | 
  103 |   /**
  104 |    * Wait for an element to become visible within timeout.
  105 |    * @param locator - Playwright Locator
  106 |    * @param timeout - Optional custom timeout in ms
  107 |    */
  108 |   async waitForElement(locator: Locator, timeout?: number): Promise<void> {
  109 |     await expect(locator).toBeVisible({ timeout });
  110 |   }
  111 | 
  112 |   /**
  113 |    * Wait for an element to disappear (hidden or detached).
  114 |    * @param locator - Playwright Locator
  115 |    * @param timeout - Optional custom timeout in ms
  116 |    */
  117 |   async waitForPageLoadingIconHidden(): Promise<void> {
  118 |     await this.pageLoadingIcon.waitFor({ state: 'hidden', timeout: 10_000 });
  119 |   }
  120 | 
  121 |   /**
  122 |    * Select an option in a <select> dropdown by visible text.
  123 |    * @param locator - Playwright Locator for the select element
  124 |    * @param label - Visible text of the option to select
  125 |    */
  126 |   async selectOption(locator: Locator, label: string): Promise<void> {
  127 |     await expect(locator).toBeVisible();
  128 |     await locator.selectOption({ label });
  129 |   }
  130 | 
  131 |   /**
  132 |    * Check a checkbox if it is not already checked.
  133 |    * @param locator - Playwright Locator for the checkbox
  134 |    */
  135 |   async checkCheckbox(locator: Locator): Promise<void> {
  136 |     if (!(await locator.isChecked())) {
  137 |       await locator.check();
  138 |     }
  139 |   }
  140 | 
  141 |   /**
  142 |    * Uncheck a checkbox if it is currently checked.
  143 |    * @param locator - Playwright Locator for the checkbox
  144 |    */
  145 |   async uncheckCheckbox(locator: Locator): Promise<void> {
  146 |     if (await locator.isChecked()) {
  147 |       await locator.uncheck();
  148 |     }
  149 |   }
  150 | 
  151 |   // ─── URL and Title ───────────────────────────────────────────────────────
  152 | 
  153 |   /**
  154 |    * Get current page URL.
  155 |    */
  156 |   getCurrentUrl(): string {
  157 |     return this.page.url();
  158 |   }
  159 | 
  160 |   /**
  161 |    * Get current page title.
  162 |    */
  163 |   async getPageTitle(): Promise<string> {
  164 |     return this.page.title();
  165 |   }
  166 | 
  167 |   // ─── Screenshot ──────────────────────────────────────────────────────────
  168 | 
  169 |   /**
  170 |    * Take a screenshot and return the Buffer.
  171 |    * @param name - Optional file name (without extension)
```