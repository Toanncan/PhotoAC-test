# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-011: Guest lọc và chuyển đổi Kích thước ảnh (M / L) qua Toolbar "ファイル・向き" @guest @filter
- Location: photo-ac/src/tests/downloader/search-guest.spec.ts:269:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'すべてクリア' }).or(locator('a:has-text("すべてクリア")')).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'すべてクリア' }).or(locator('a:has-text("すべてクリア")')).first()
    - waiting for" https://test-lien.photo-ac.com/main/search?q=sky" navigation to finish...
    - navigated to "https://test-lien.photo-ac.com/main/search?q=sky"

```

```yaml
- paragraph:
  - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
  - link "詳細":
    - /url: /main/privacy
  - link "同意":
    - /url: ""
- banner:
  - button "検索フィルター"
  - link "写真AC":
    - /url: /
    - img "写真AC"
  - search:
    - button "AI Search is off" [disabled]:
      - img "AI Search is off"
    - searchbox "キーワード（例：女性）": sky
    - button "リセット"
    - text: sky
    - link "upload file":
      - /url: "#"
    - button "search_btn"
    - button "カテゴリー "
  - button "会員登録（無料）"
  - button "ログイン"
  - button "クリックしてACアプリケーションのリストを表示":
    - img
- link "ホーム":
  - /url: /
- link "ファン登録":
  - /url: /user/following/
- link "コレクション":
  - /url: /user/bookmarks/
- navigation "breadcrumb":
  - list:
    - listitem:
      - link "写真AC":
        - /url: /
    - listitem:
      - text: /
      - link "sky":
        - /url: /main/search?q=sky
- button "広告を非表示にする 広告を非表示にする":
  - img "広告を非表示にする"
  - text: 広告を非表示にする
- iframe
- heading "「sky」の写真素材" [level=1]
- text: 2,243,480点
- button "検索"
- text: 検索フィルター
- button "カテゴリー "
- text: カテゴリー  カテゴリーを選択
- checkbox "人物" [disabled]
- text: 人物
- checkbox "ビジネス" [disabled]
- text: ビジネス
- checkbox "動物・生き物" [disabled]
- text: 動物・生き物
- checkbox "花・植物" [disabled]
- text: 花・植物
- checkbox "食べ物・飲み物" [disabled]
- text: 食べ物・飲み物
- checkbox "町並み・建物" [disabled]
- text: 町並み・建物
- checkbox "医療・福祉" [disabled]
- text: 医療・福祉
- checkbox "交通・乗り物" [disabled]
- text: 交通・乗り物
- checkbox "季節・行事" [disabled]
- text: 季節・行事
- checkbox "自然・風景" [disabled]
- text: 自然・風景
- checkbox "スポーツ" [disabled]
- text: スポーツ
- checkbox "エコ・環境" [disabled]
- text: エコ・環境
- checkbox "美容・健康" [disabled]
- text: 美容・健康
- checkbox "住宅・インテリア" [disabled]
- text: 住宅・インテリア
- checkbox "年賀状" [disabled]
- text: 年賀状
- checkbox "テクスチャ・背景" [disabled]
- text: テクスチャ・背景
- checkbox "小物・雑貨" [disabled]
- text: 小物・雑貨
- checkbox "クレイアート" [disabled]
- text: クレイアート
- checkbox "外国" [disabled]
- text: 外国
- checkbox "ロマンティック" [disabled]
- text: ロマンティック
- checkbox "スプラッター" [disabled]
- text: スプラッター 除外カテゴリー  除外カテゴリーを選択
- checkbox "人物" [disabled]
- text: 人物
- checkbox "ビジネス" [disabled]
- text: ビジネス
- checkbox "動物・生き物" [disabled]
- text: 動物・生き物
- checkbox "花・植物" [disabled]
- text: 花・植物
- checkbox "食べ物・飲み物" [disabled]
- text: 食べ物・飲み物
- checkbox "町並み・建物" [disabled]
- text: 町並み・建物
- checkbox "医療・福祉" [disabled]
- text: 医療・福祉
- checkbox "交通・乗り物" [disabled]
- text: 交通・乗り物
- checkbox "季節・行事" [disabled]
- text: 季節・行事
- checkbox "自然・風景" [disabled]
- text: 自然・風景
- checkbox "スポーツ" [disabled]
- text: スポーツ
- checkbox "エコ・環境" [disabled]
- text: エコ・環境
- checkbox "美容・健康" [disabled]
- text: 美容・健康
- checkbox "住宅・インテリア" [disabled]
- text: 住宅・インテリア
- checkbox "年賀状" [disabled]
- text: 年賀状
- checkbox "テクスチャ・背景" [disabled]
- text: テクスチャ・背景
- checkbox "小物・雑貨" [disabled]
- text: 小物・雑貨
- checkbox "クレイアート" [disabled]
- text: クレイアート
- checkbox "外国" [disabled]
- text: 外国
- checkbox "ロマンティック" [disabled]
- text: ロマンティック
- checkbox "スプラッター" [disabled]
- text: スプラッター
- button "ファイル・向き "
- button "色 "
- button "人物指定 "
- button "除外キーワード "
- button "詳細検索 "
- button "表示条件 "
- button "関連性の高い順／70件表示 "
- figure:
  - img "青空と木々の風景 余白 青空,空,木々の写真素材"
- figure:
  - button "広告を非表示にする 広告を非表示にする":
    - img "広告を非表示にする"
    - text: 広告を非表示にする
  - iframe
- figure:
  - img "青空と木々の余白風景 青空,空,木々の写真素材"
- figure:
  - img "水平線と砂浜 海,水平線,砂浜の写真素材"
- figure:
  - img "木と青い空 青い空,青空,空の写真素材"
- figure:
  - img "青空と森の上部余白多め 青空,空,雲の写真素材"
- figure:
  - img "木と青い空 青い空,青空,空の写真素材"
- figure:
  - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材"
  - text: New
- figure:
  - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材"
  - text: New
- figure:
  - button "広告を非表示にする 広告を非表示にする":
    - img "広告を非表示にする"
    - text: 広告を非表示にする
  - iframe
- figure:
  - img "木と青い空 青い空,青空,空の写真素材"
- figure:
  - img "芝生 木 青い空 青い空,青空,空の写真素材"
- figure:
  - img "ビルと青い空 白い曇 ビル,建物,青い空の写真素材"
- figure:
  - img "木と青い空 木,樹木,木々の写真素材"
- figure:
  - img "青い空 白い曇 青い空,白い曇,青空の写真素材"
- figure:
  - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材"
  - text: New
- figure:
  - img "屋根の上のソーラ－パネル １ ソーラーパネル,太陽光発電,パネルの写真素材"
- figure:
  - img "建物と青い空 住宅,住宅街,建物の写真素材"
- figure:
  - img "山小屋のある風景（スイス、マイエンフェルト） アウトドア,アウトドアライフ,ハイキングの写真素材"
- figure:
  - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材"
  - text: New
- figure:
  - img "飛行船 飛行船,空,そらの写真素材"
- figure:
  - img "木と青い空 青い空,青空,空の写真素材"
- figure:
  - img "建物と青い空 建物,青い空,白い曇の写真素材"
- figure:
  - img "平和の森公園 自然,風景,skyの写真素材"
- figure:
  - img "芝生 木 青い空 青い空,青空,空の写真素材"
- figure:
  - img "夏の田んぼと積乱雲 入道雲,sky,空の写真素材"
- figure:
  - img "建物と青い空 白い曇 ビル,建物,青い空の写真素材"
- figure:
  - img "アニメのワンシーンみたいな坂道 青空,そら,ソラの写真素材"
- figure:
  - img "松本城 松本城,長野,国宝の写真素材"
- figure:
  - img "青空に泳ぐ鯉のぼり 鯉のぼり,こいのぼり,コイノボリの写真素材"
- figure:
  - img "古民家の茅葺屋根と夏の空 茅葺き屋根,古民家,ルーフの写真素材"
- figure:
  - img "3羽のカモメと青空 青空,かもめ,空の写真素材"
- figure:
  - img "阿蘇くじゅう国立公園 空,風景,シルエットの写真素材"
- figure:
  - img "芝生 木 建物 青い空,青空,空の写真素材"
- figure:
  - img "建物と青い空 植物,屋外,青い空の写真素材"
- figure:
  - img "芝生 木 青い空 青い空,青空,空の写真素材"
- figure:
  - img "ビルと青い空 白い曇 ビル,建物,青い空の写真素材"
- figure:
  - img "道と建物 住宅,住宅街,建物の写真素材"
- figure:
  - img "建物と青い空 住宅,住宅街,建物の写真素材"
- figure:
  - img "青空に泳ぐ鯉のぼり 鯉のぼり,こいのぼり,青空の写真素材"
- figure:
  - img "ビルと青い空 白い曇 ビル,建物,青い空の写真素材"
- figure:
  - img "青い空 白い曇 木,樹木,木々の写真素材"
- figure:
  - img "中野の路地 中野,東京,都内の写真素材"
- figure:
  - img "住宅街 青い空 住宅街,住宅,青い空の写真素材"
- figure:
  - img "道と建物 住宅,住宅街,建物の写真素材"
- figure:
  - img "見上げた秋空と木の葉 背景,水色,白の写真素材"
  - text: New
- figure:
  - img "中野の町並み 中野,東京,都内の写真素材"
- figure:
  - img "青い空と白い雲 入道雲,積乱雲,空の写真素材"
- figure:
  - img "空と太陽 空,青い空,青空の写真素材"
- figure:
  - img "街風景 自然 ビル,青空,空の写真素材"
- figure:
  - img "真夏の雲 雲,真夏,入道雲の写真素材"
- figure:
  - img "山の上に広がる夏空 夏空,青空,空の写真素材"
- figure:
  - img "三崎公園から望む小名浜港 空,青空,風景の写真素材"
- figure:
  - img "真夏の雲 雲,真夏,入道雲の写真素材"
- figure:
  - img "南国の海 ビーチ,エメラルドグリーンの海,きれいな海の写真素材"
- figure:
  - img "お中道のコケモモの実 富士山,お中道,山頂の写真素材"
- figure:
  - img "建物と積乱雲 積乱雲,晴れ,青い空の写真素材"
- figure:
  - img "青空と緑に映える熊本城 熊本城,熊本,日本の城の写真素材"
- figure:
  - img "川と市街地の街並みと山並みと青空の風景 川,市街地,街並みの写真素材"
  - text: New
- figure:
  - img "木と青い空 木,樹木,自然の写真素材"
- figure:
  - img "山の新緑と青空 新緑,空,青空の写真素材"
- figure:
  - img "線路は続くよ 福島県,夏井駅,ホームの写真素材"
- figure:
  - img "上り道 空,青空,そらの写真素材"
- figure:
  - img "海 海,浜辺,砂浜の写真素材"
- figure:
  - img "青空の宮ケ瀬湖と山々（神奈川県清川村） 宮ヶ瀬湖,清川村,湖の写真素材"
- figure:
  - img "初秋の三瓶山と青空と白い雲 三瓶山,山,大田市の写真素材"
- figure:
  - img "青空と大文字山 大文字山,大文字,五山の写真素材"
- figure:
  - img "５月の田んぼ 青空,青,空の写真素材"
- figure:
  - img "カプリ そら,風景,眺めの写真素材"
- figure:
  - img "芝生と青い空 芝生,植物,草の写真素材"
- figure:
  - img "大きな木と青空 青空,木,葉の写真素材"
- figure:
  - img "森と空 木,空,skyの写真素材"
- list:
  - listitem:
    - link "1":
      - /url: "#"
  - listitem:
    - link "2":
      - /url: /main/search?q=sky&p=2
  - listitem:
    - link "3":
      - /url: /main/search?q=sky&p=3
  - listitem:
    - link "4":
      - /url: /main/search?q=sky&p=4
  - listitem:
    - link "5":
      - /url: /main/search?q=sky&p=5
  - listitem:
    - link "6":
      - /url: /main/search?q=sky&p=6
  - listitem: ...
  - listitem:
    - link "次に":
      - /url: /main/search?q=sky&p=2
- text: 全2,243,480件中1 - 70件
- paragraph:
  - text: 「
  - strong: sky
  - text: 」のキーワードで新規投稿されたフリー写真素材・画像を掲載しております。JPEG形式の高解像度画像が無料でダウンロードできます。気に入った
  - strong: sky
  - text: の写真素材・画像が見つかったら、写真をクリックして、無料ダウンロードページへお進み下さい。高品質なロイヤリティーフリー写真素材を無料でダウンロードしていただけます。商用利用もOKなので、ビジネス写真をチラシやポスター、WEBサイトなどの広告、ポストカードや年賀状などにもご利用いただけます。クレジット表記や許可も必要ありません。
- text: 写真ACグループサイトの「sky」の検索結果（同じアカウントで無料ダウンロードできます）
- img "loading"
- separator
- button "広告を非表示にする 広告を非表示にする":
  - img "広告を非表示にする"
  - text: 広告を非表示にする
- iframe
- separator
- img "loading"
- separator
- img "loading"
- separator
- img "loading"
- separator
- strong: 写真素材リクエスト受け付け中
- text: ※100%対応はできませんが最大限努力をいたします。
- textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信"
- button "素材をリクエスト"
- contentinfo:
  - text: 昨日のダウンロード数：43,960 先月のダウンロード数：1,124,624 総会員数：1600万人を突破しました 写真ACについて
  - list:
    - listitem:
      - link "写真ACとは":
        - /url: /main/guide/
    - listitem:
      - link "運営会社":
        - /url: /main/about/
    - listitem:
      - link "個人情報保護方針":
        - /url: /main/privacy/
    - listitem:
      - link "特定個人情報基本方針":
        - /url: /main/policy_personal_info/
    - listitem:
      - link "特定商取引法に基づく表記":
        - /url: /main/commercial_transactions/
    - listitem:
      - link "サイトマップ":
        - /url: /main/sitemap
    - listitem:
      - link "セキュリティポリシー":
        - /url: https://acworks.co.jp/security-policy/
  - text: 会員登録
  - list:
    - listitem:
      - link "無料会員登録":
        - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253Dsky&lang=jp
    - listitem:
      - link "プレミアム会員登録":
        - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253Dsky&lang=jp&fromButton=premium_action
    - listitem:
      - link "無料クリエイター会員登録":
        - /url: /creator/auth/register
  - text: プレミアム会員サービス
  - list:
    - listitem:
      - link "プレミアム会員登録":
        - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
    - listitem:
      - link "法人・複数名向けプラン":
        - /url: https://test-lien.photo-ac.com/premium/business
    - listitem:
      - link "商品化ライセンス":
        - /url: /main/extra_license_terms/
    - listitem:
      - link "あんしんサポート":
        - /url: /indemnity/
  - text: ヘルプ＆ガイド
  - list:
    - listitem:
      - link "ヘルプ":
        - /url: https://help.freebie-ac.jp/
    - listitem:
      - link "利用規約":
        - /url: /main/terms/
    - listitem:
      - link "プレミアム会員利用規約":
        - /url: /main/terms_premium/
    - listitem:
      - link "AC写真AIラボ利用規約":
        - /url: /image-generator/terms
  - text: グループサイト
  - list:
    - listitem:
      - link "イラストAC":
        - /url: https://www.ac-illust.com/
    - listitem:
      - link "シルエットAC":
        - /url: https://www.silhouette-ac.com/
    - listitem:
      - link "フリービーAC":
        - /url: https://www.freebie-ac.jp/
    - listitem:
      - link "年賀状AC":
        - /url: https://www.new-year.bz/
    - listitem:
      - link "動画AC":
        - /url: https://video-ac.com
    - listitem:
      - link "デザインAC":
        - /url: https://www.design-ac.net/
    - listitem:
      - link "ACデータ":
        - /url: https://ac-data.info/
    - listitem:
      - link "明細AC":
        - /url: https://meisai-ac.com/
  - link "twitter_btn":
    - /url: https://x.com/ACworks2011
    - button "twitter_btn":
      - img
  - link "facebook_btn":
    - /url: https://www.facebook.com/ACworks2011/
    - button "facebook_btn"
  - link "pinterest_btn":
    - /url: https://www.pinterest.jp/acworks/
    - button "pinterest_btn"
  - link "blog_btn":
    - /url: http://blog.acworks.co.jp/
    - button "blog_btn"
  - link "feedback_modal_btn":
    - /url: "#feedbackModal"
    - button "feedback_modal_btn": ご意見・ご要望
  - text: © 2011-2026
  - link "写真AC":
    - /url: https://test-lien.photo-ac.com/
- text: 無料で高品質な写真をダウンロードできます！加工や商用利用もOK！
- link "無料ダウンロード会員登録はこちら":
  - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253Dsky&lang=jp
- paragraph: ご質問は
- paragraph: こちらから！
- img "chat-icon"
- text: ×
```

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'すべてクリア' }).or(locator('a:has-text("すべてクリア")')).first()

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
> 60  |         await locator.click({ force: true });
      |                       ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
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
  71  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
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
  113 |    * Wait for page loading overlay icon to disappear (hidden or detached).
  114 |    * @param timeout - Optional custom timeout in ms (default: 25_000)
  115 |    */
  116 |   async waitForPageLoadingIconHidden(timeout: number = 25_000): Promise<void> {
  117 |     await this.pageLoadingIcon.waitFor({ state: 'hidden', timeout }).catch(() => {});
  118 |   }
  119 | 
  120 |   /**
  121 |    * Select an option in a <select> dropdown by visible text.
  122 |    * @param locator - Playwright Locator for the select element
  123 |    * @param label - Visible text of the option to select
  124 |    */
  125 |   async selectOption(locator: Locator, label: string): Promise<void> {
  126 |     await expect(locator).toBeVisible();
  127 |     await locator.selectOption({ label });
  128 |   }
  129 | 
  130 |   /**
  131 |    * Check a checkbox if it is not already checked.
  132 |    * @param locator - Playwright Locator for the checkbox
  133 |    */
  134 |   async checkCheckbox(locator: Locator): Promise<void> {
  135 |     if (!(await locator.isChecked())) {
  136 |       await locator.check();
  137 |     }
  138 |   }
  139 | 
  140 |   /**
  141 |    * Uncheck a checkbox if it is currently checked.
  142 |    * @param locator - Playwright Locator for the checkbox
  143 |    */
  144 |   async uncheckCheckbox(locator: Locator): Promise<void> {
  145 |     if (await locator.isChecked()) {
  146 |       await locator.uncheck();
  147 |     }
  148 |   }
  149 | 
  150 |   // ─── URL and Title ───────────────────────────────────────────────────────
  151 | 
  152 |   /**
  153 |    * Get current page URL.
  154 |    */
  155 |   getCurrentUrl(): string {
  156 |     return this.page.url();
  157 |   }
  158 | 
  159 |   /**
  160 |    * Get current page title.
```