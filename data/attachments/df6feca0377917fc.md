# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/creator.setup.ts >> authenticate as creator
- Location: photo-ac/src/tests/auth/creator.setup.ts:6:6

# Error details

```
TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
=========================== logs ===========================
waiting for navigation until "domcontentloaded"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - navigation [ref=e8]:
      - strong [ref=e9]:
        - text: 総会員数
        - generic [ref=e10]: 1600万人
        - text: 突破！
      - list [ref=e12]:
        - link "ACワークス株式会社は大阪市港区・東京都港区・埼玉県久喜市と連携協定を締結しました" [ref=e14] [cursor=pointer]:
          - /url: https://acworks.co.jp/three_cities_agreements/
        - listitem [ref=e15]:
          - link "SNS" [ref=e16] [cursor=pointer]:
            - /url: "#"
            - strong [ref=e17]: SNS
        - listitem [ref=e18]:
          - link "ヘルプ" [ref=e19] [cursor=pointer]:
            - /url: https://help.freebie-ac.jp/
            - strong [ref=e20]: ヘルプ
    - alert [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]: 
        - paragraph [ref=e27]: ログインに失敗しました。正しいメールアドレス・パスワードをご入力ください。
      - button "Close" [ref=e28] [cursor=pointer]:
        - img [ref=e29]
    - generic [ref=e32]:
      - link "写真ACで無料ダウンロード！" [ref=e33] [cursor=pointer]:
        - /url: /
        - img "写真ACで無料ダウンロード！" [ref=e34]
      - heading "ログイン" [level=1] [ref=e35]:
        - strong [ref=e36]: ログイン
      - generic [ref=e38]:
        - generic [ref=e39]: クリエイターでログイン
        - textbox "メールアドレス" [ref=e40]
        - textbox "パスワード" [ref=e41]
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "自動ログイン" [checked] [ref=e44] [cursor=pointer]
            - generic [ref=e45] [cursor=pointer]: 自動ログイン
          - link "パスワードをお忘れですか？" [ref=e47] [cursor=pointer]:
            - /url: /auth/forgotpassword
        - button "ログイン" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - generic [ref=e50]:
          - separator [ref=e51]
          - generic [ref=e52]: または
          - separator [ref=e53]
        - paragraph [ref=e54]: SNSでログイン
        - generic [ref=e55]:
          - img [ref=e57] [cursor=pointer]
          - img "google" [ref=e60] [cursor=pointer]
          - generic [ref=e62] [cursor=pointer]: 
      - paragraph [ref=e63]:
        - link "新規クリエイター登録" [ref=e64] [cursor=pointer]:
          - /url: /creator/auth/register
  - paragraph [ref=e66]: Copyright ACworks Co.,Ltd. All rights reserved.
  - text: 
```

# Test source

```ts
  6   |  *
  7   |  * NOTE: Locators below are based on common photo-ac UI patterns.
  8   |  * If any locator fails, use Playwright MCP to inspect the actual DOM
  9   |  * and update accordingly.
  10  |  */
  11  | export class LoginPage extends BasePage {
  12  |   // ─── Locators ─────────────────────────────────────────────────────────────
  13  | 
  14  |   /** Login link/button in the header navigation */
  15  |   private readonly loginButton = this.page.getByRole('button', { name: /ログイン/ }).first();
  16  | 
  17  |   private readonly downloaderLoginButton = this.page.locator('text=ダウンロードユーザー').nth(1);
  18  | 
  19  |   private readonly creatorLoginButton = this.page.getByRole('button', { name: /クリエイター/ });
  20  | 
  21  |   /** Email / username input field on the login form */
  22  |   private readonly emailInput = this.page.getByPlaceholder('メールアドレス');
  23  | 
  24  |   /** Password input field */
  25  |   private readonly passwordInput = this.page.getByPlaceholder('パスワード');
  26  | 
  27  | 
  28  |   /** Submit / Login button */
  29  |   private readonly submitDowloaderButton = this.page.getByRole('button', { name: /ログイン/ });
  30  | 
  31  |   private readonly submitCreatorButton = this.page.getByRole('button', { name: /口グイン/ });
  32  | 
  33  |   /** Error message container shown after failed login */
  34  |   private readonly errorMessage = this.page.locator('[class*="error"], [class*="alert"], [class*="message"]')
  35  |     .filter({ hasText: /invalid|incorrect|failed|error/i });
  36  | 
  37  | 
  38  |   constructor(page: Page) {
  39  |     super(page);
  40  |   }
  41  | 
  42  |   /**
  43  |    * Navigate to the home page and click the Login link.
  44  |    */
  45  |   async goToDownloaderLoginPage(): Promise<void> {
  46  |     await test.step('Navigate to login with downloader', async () => {
  47  |       await this.navigate('/');
  48  |       await this.waitForPageLoad();
  49  |       await this.clickElement(this.loginButton);
  50  |       await this.clickElement(this.downloaderLoginButton);
  51  |     })
  52  |   }
  53  | 
  54  |   async goToCreatorLoginPage(): Promise<void> {
  55  |     await test.step('Navigate to login with creator', async () => {
  56  |       await this.navigate('/');
  57  |       await this.waitForPageLoad();
  58  |       await this.clickElement(this.loginButton);
  59  |       await this.clickElement(this.creatorLoginButton);
  60  |     });
  61  |   }
  62  | 
  63  |   /**
  64  |    * Perform a full login flow: navigate to login page, fill credentials, submit.
  65  |    * @param email - User email address
  66  |    * @param password - User password
  67  |    */
  68  |   async loginAsDownloader(email: string, password: string): Promise<void> {
  69  |     await test.step(`Login with downloader, account : ${email}`, async () => {
  70  |       await this.goToDownloaderLoginPage();
  71  | 
  72  |       await test.step('Fill login credentials', async () => {
  73  |         await this.fillInput(this.emailInput, email);
  74  |         await this.fillInput(this.passwordInput, password);
  75  |         await this.clickElement(this.submitDowloaderButton);
  76  |       })
  77  | 
  78  |       // Wait for redirect to complete after login — ensures session cookies are fully established
  79  |       await this.page.waitForURL(/\/(user|$)/, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  80  |       await this.closePhotoAiModelContent();
  81  |       // Wait for user avatar to be visible, ensuring session cookies are fully established in the context
  82  |       // await this.page.locator('#user-info-dropdown img').nth(1).waitFor({ state: 'visible', timeout: 15_000 });
  83  |       await this.page.waitForTimeout(3000);
  84  |     })
  85  |   }
  86  | 
  87  |   /**
  88  |    * Perform full creator login flow.
  89  |    * @param email - Creator email address
  90  |    * @param password - Creator password
  91  |    */
  92  |   async loginAsCreator(email: string, password: string): Promise<void> {
  93  |     await test.step(`Login as Creator with account: ${email}`, async () => {
  94  |       await this.goToCreatorLoginPage();
  95  | 
  96  |       await test.step('Fill login credentials', async () => {
  97  |         await this.fillInput(this.emailInput, email);
  98  |         await this.fillInput(this.passwordInput, password);
  99  |       });
  100 | 
  101 |       await test.step('Submit login form', async () => {
  102 |         await this.clickElement(this.submitCreatorButton);
  103 |       });
  104 | 
  105 |       await test.step('Wait for redirect to Creator Dashboard', async () => {
> 106 |         await this.page.waitForURL(/\/creator\/dashboard/, { waitUntil: 'domcontentloaded', timeout: 20_000 });
      |                         ^ TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
  107 |       });
  108 |     });
  109 |   }
  110 | 
  111 |   /**
  112 |    * Get the text of the error message displayed after a failed login attempt.
  113 |    * @returns Error message text, or empty string if not found
  114 |    */
  115 |   async getErrorMessage(): Promise<string> {
  116 |     return this.getText(this.errorMessage);
  117 |   }
  118 | 
  119 | }
  120 | 
```