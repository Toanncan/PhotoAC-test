# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: creator/ranking.spec.ts >> Creator Ranking Page >> TC01 - Trang ranking hiển thị đúng heading và URL
- Location: src/tests/creator/ranking.spec.ts:28:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
=========================== logs ===========================
waiting for navigation until "domcontentloaded"
  navigated to "https://test-lien.photo-ac.com/creator/dashboard/"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e5]:
      - link "photoAC" [ref=e7]:
        - /url: /
        - img "photoAC" [ref=e8]
      - generic [ref=e9]:
        - link [ref=e10]:
          - /url: /creator/advertising
          - img [ref=e11]
        - button "Avatar クリエイター ToanCanさん " [ref=e14]:
          - img "Avatar" [ref=e16]
          - generic [ref=e17]:
            - generic [ref=e18]: クリエイター
            - generic [ref=e19]: ToanCanさん
          - text: 
  - text:     
```

# Test source

```ts
  1   | import { type Page, test } from '@playwright/test';
  2   | import { BasePage } from './base.page';
  3   | 
  4   | /**
  5   |  * CreatorLoginPage — Page Object for the Creator login screen.
  6   |  *
  7   |  * Login flow (verified from DOM 2026-07-09):
  8   |  *   1. Navigate to: /auth/login?creator=1  (SSO page with "クリエイターでログイン" mode)
  9   |  *   2. Fill: textbox "メールアドレス" (getByRole/getByPlaceholder)
  10  |  *   3. Fill: textbox "パスワード"
  11  |  *   4. Click: button "ログイン"
  12  |  *   5. Wait for redirect to /creator/dashboard/
  13  |  *
  14  |  * The /creator/auth/login page is a middleware that redirects to /auth/login (SSO).
  15  |  * We skip the middleware and go directly to SSO with creator context.
  16  |  */
  17  | export class CreatorLoginPage extends BasePage {
  18  |   // ─── Locators (verified from live DOM inspection) ─────────────────────────
  19  | 
  20  |   /** Email input on SSO login page — textbox with placeholder "メールアドレス" */
  21  |   private readonly emailInput = this.page.getByPlaceholder('メールアドレス');
  22  | 
  23  |   /** Password input on SSO login page — textbox with placeholder "パスワード" */
  24  |   private readonly passwordInput = this.page.getByPlaceholder('パスワード');
  25  | 
  26  |   /** Login button on SSO page — "ログイン" */
  27  |   private readonly HomeLoginButton = this.page.getByRole('button', { name: 'ログイン' }).first();
  28  | 
  29  |   /**
  30  |    * Login page heading — "ログイン" [h1].
  31  |    * Confirms we are on the SSO login page.
  32  |    */
  33  |   readonly pageHeading = this.page.getByRole('heading', { name: 'ログイン', level: 1 });
  34  | 
  35  |   /**
  36  |    * Creator avatar button in header — confirms logged in as creator.
  37  |    * Visible format: "Avatar クリエイター ToanCanさん"
  38  |    */
  39  |   readonly creatorAvatarButton = this.page.getByRole('button', {
  40  |     name: /Avatar クリエイター/,
  41  |   });
  42  | 
  43  |   readonly creatorLoginButton = this.page.getByRole('button', { name: /クリエイター/ });
  44  |   readonly loginButtonOnForm = this.page.getByRole('button', { name: /口グイン/ });
  45  | 
  46  |   // ─── Methods ──────────────────────────────────────────────────────────────
  47  | 
  48  |   constructor(page: Page) {
  49  |     super(page);
  50  |   }
  51  | 
  52  |   /**
  53  |    * Navigate to the SSO login page with creator redirect context.
  54  |    * Uses /auth/login which shows "クリエイターでログイン" section.
  55  |    */
  56  |   async goToCreatorLoginPage(): Promise<void> {
  57  |     await test.step('Navigate to Homepage', async () => {
  58  |       await this.navigate('/');
  59  |       await this.waitForPageLoad();
  60  |     });
  61  |   }
  62  | 
  63  |   /**
  64  |    * Perform full creator login flow.
  65  |    * @param email - Creator email address
  66  |    * @param password - Creator password
  67  |    */
  68  |   async loginAsCreator(email: string, password: string): Promise<void> {
  69  |     await test.step(`Login as Creator with account: ${email}`, async () => {
  70  |       await this.goToCreatorLoginPage();
  71  | 
  72  |       await test.step('Click Login button on Homepage header', async () => {
  73  |         await this.clickElement(this.HomeLoginButton);
  74  |       });
  75  | 
  76  |       await test.step('Select Creator login option', async () => {
  77  |         await this.clickElement(this.creatorLoginButton);
  78  |       });
  79  | 
  80  |       await test.step('Fill login credentials', async () => {
  81  |         await this.fillInput(this.emailInput, email);
  82  |         await this.fillInput(this.passwordInput, password);
  83  |       });
  84  | 
  85  |       await test.step('Submit login form', async () => {
  86  |         await this.clickElement(this.loginButtonOnForm);
  87  |       });
  88  | 
  89  |       await test.step('Wait for redirect to Creator Dashboard', async () => {
> 90  |         await this.page.waitForURL(/\/creator\/dashboard/, { waitUntil: 'domcontentloaded', timeout: 20_000 });
      |                         ^ TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
  91  |       });
  92  |     });
  93  |   }
  94  | 
  95  |   /**
  96  |    * Check whether the creator is logged in by verifying avatar button presence.
  97  |    * @returns true if creator avatar is visible in header
  98  |    */
  99  |   async isLoggedIn(): Promise<boolean> {
  100 |     return this.isVisible(this.creatorAvatarButton);
  101 |   }
  102 | }
  103 | 
```