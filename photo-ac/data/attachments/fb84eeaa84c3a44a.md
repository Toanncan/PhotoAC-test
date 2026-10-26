# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/creator.setup.ts >> authenticate as creator
- Location: photo-ac/src/tests/auth/creator.setup.ts:6:6

# Error details

```
Error: locator.waitFor: Error: strict mode violation: getByRole('button', { name: /ログイン/ }) resolved to 4 elements:
    1) <button id="switch-sso" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" class="ac-btn ac-btn-photo">…</button> aka getByRole('button', { name: 'ログイン', exact: true })
    2) <button type="button" onclick="location.href='/creator/sns/callback?provider=Google'" class="position-relative ac-btn-sm btn-google text-white w-100 d-flex align-items-center ac-mb-1 justify-content-center">…</button> aka getByRole('button', { name: ' Googleでログイン' })
    3) <button type="button" onclick="location.href='/creator/sns/callback?provider=Twitter'" class="position-relative ac-btn-sm btn-twitter text-white w-100 d-flex align-items-center ac-mb-1 justify-content-center">…</button> aka getByRole('button', { name: 'Xでログイン' })
    4) <button type="button" onclick="location.href='/creator/sns/callback?provider=Facebook'" class="position-relative ac-btn-sm btn-facebook text-white w-100 d-flex align-items-center justify-content-center">…</button> aka getByRole('button', { name: ' Facebookでログイン' })

Call log:
  - waiting for getByRole('button', { name: /ログイン/ }) to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - paragraph [ref=e3]:
    - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
    - link "詳細" [ref=e4] [cursor=pointer]:
      - /url: /main/privacy
    - link "同意" [ref=e5] [cursor=pointer]:
      - /url: ""
  - banner [ref=e6]:
    - 'link "【3DAYゲリラセール！2026年8月28日まで】 終了まで 2 日 0 7 : 4 8 : 0 8 プレミアム会員が 35 %OFF 【3DAYゲリラセール！2026年8月28日まで】" [ref=e7] [cursor=pointer]':
      - /url: https://test-lien.photo-ac.com/premium/campaign?utm_source=photoac&utm_medium=internal&utm_campaign=coupon4451&utm_content=banner_header
      - generic [ref=e8]:
        - img "【3DAYゲリラセール！2026年8月28日まで】" [ref=e9]
        - generic [ref=e10]:
          - generic [ref=e11]: 終了まで
          - generic [ref=e12]: "2"
          - generic [ref=e13]: 日
          - generic [ref=e14]: "0"
          - generic [ref=e15]: "7"
          - generic [ref=e16]: ":"
          - generic [ref=e17]: "4"
          - generic [ref=e18]: "8"
          - generic [ref=e19]: ":"
          - generic [ref=e20]: "0"
          - generic [ref=e21]: "8"
          - generic [ref=e22]: プレミアム会員が
          - generic [ref=e23]: "35"
          - generic [ref=e24]: "%OFF"
        - img "【3DAYゲリラセール！2026年8月28日まで】" [ref=e25]
    - generic [ref=e28]:
      - generic [ref=e30]:
        - link "写真AC 写真ACは写真素材が無料！ 商用利用もOK！" [ref=e31] [cursor=pointer]:
          - /url: /
          - img "写真AC" [ref=e32]
          - generic [ref=e33]:
            - paragraph [ref=e34]: 写真ACは写真素材が無料！
            - paragraph [ref=e35]: 商用利用もOK！
        - text: 
      - generic [ref=e37]:
        - generic [ref=e38]:
          - button "会員登録（無料）" [ref=e39] [cursor=pointer]
          - text: 
        - button "ログイン" [ref=e41] [cursor=pointer]:
          - generic [ref=e42]: 
          - text: ログイン
        - button "クリックしてACアプリケーションのリストを表示" [ref=e44] [cursor=pointer]:
          - img [ref=e45]
    - text: 
  - button "閉じると開く" [ref=e48] [cursor=pointer]:
    - generic [ref=e49]: 
  - text:      
  - generic:      
  - generic [ref=e51]:
    - generic [ref=e53]:
      - button "画像で検索する" [ref=e54] [cursor=pointer]:
        - img [ref=e55]
      - generic [ref=e57]: 画像で検索する
    - separator [ref=e58]
    - generic [ref=e59]:
      - paragraph [ref=e60]: 画像から似ている画像を検索できます。
      - paragraph [ref=e61]: ※5MBまでのJPGまたはPNGファイルのみ
      - generic [ref=e62]:
        - listitem [ref=e63]:
          - img [ref=e64]
        - listitem [ref=e71]:
          - generic [ref=e72]: ファイルを選択
  - generic [ref=e73]:
    - button [ref=e75] [cursor=pointer]:
      - img [ref=e76]
    - generic [ref=e79]:
      - generic [ref=e80]:
        - button [ref=e81] [cursor=pointer]:
          - img [ref=e82]
        - textbox "キーワード（例：女性）" [ref=e85]
      - generic [ref=e86]:
        - link "文章で検索 文章で検索 文章で検索" [ref=e88] [cursor=pointer]:
          - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
          - img "文章で検索" [ref=e89]
          - text: 文章で検索
          - img "文章で検索" [ref=e90]
        - button "画像で検索" [ref=e92] [cursor=pointer]:
          - generic [ref=e93]: 
          - text: 画像で検索
    - separator [ref=e94]
    - generic [ref=e95]:
      - generic [ref=e96]: 並び順
      - generic [ref=e97]:
        - generic [ref=e98]:
          - radio "関連性の高い順" [checked] [ref=e99] [cursor=pointer]
          - generic [ref=e100] [cursor=pointer]: 関連性の高い順
        - generic [ref=e101]:
          - radio "新着順" [ref=e102] [cursor=pointer]
          - generic [ref=e103] [cursor=pointer]: 新着順
        - generic [ref=e104]:
          - radio "人気順" [disabled] [ref=e105] [cursor=pointer]
          - generic [ref=e106] [cursor=pointer]: 人気順
    - generic [ref=e108]:
      - generic [ref=e109]: カテゴリー
      - listbox [ref=e110]:
        - option "人物" [ref=e111]
        - option "ビジネス" [ref=e112]
        - option "動物・生き物" [ref=e113]
        - option "花・植物" [ref=e114]
        - option "食べ物・飲み物" [ref=e115]
        - option "町並み・建物" [ref=e116]
        - option "医療・福祉" [ref=e117]
        - option "交通・乗り物" [ref=e118]
        - option "季節・行事" [ref=e119]
        - option "自然・風景" [ref=e120]
        - option "スポーツ" [ref=e121]
        - option "エコ・環境" [ref=e122]
        - option "美容・健康" [ref=e123]
        - option "住宅・インテリア" [ref=e124]
        - option "年賀状" [ref=e125]
        - option "テクスチャ・背景" [ref=e126]
        - option "小物・雑貨" [ref=e127]
        - option "クレイアート" [ref=e128]
        - option "外国" [ref=e129]
        - option "ロマンティック" [ref=e130]
        - option "スプラッター" [ref=e131]
    - generic [ref=e133]:
      - generic [ref=e134]: 除外カテゴリー
      - listbox [ref=e135]:
        - option "人物" [ref=e136]
        - option "ビジネス" [ref=e137]
        - option "動物・生き物" [ref=e138]
        - option "花・植物" [ref=e139]
        - option "食べ物・飲み物" [ref=e140]
        - option "町並み・建物" [ref=e141]
        - option "医療・福祉" [ref=e142]
        - option "交通・乗り物" [ref=e143]
        - option "季節・行事" [ref=e144]
        - option "自然・風景" [ref=e145]
        - option "スポーツ" [ref=e146]
        - option "エコ・環境" [ref=e147]
        - option "美容・健康" [ref=e148]
        - option "住宅・インテリア" [ref=e149]
        - option "年賀状" [ref=e150]
        - option "テクスチャ・背景" [ref=e151]
        - option "小物・雑貨" [ref=e152]
        - option "クレイアート" [ref=e153]
        - option "外国" [ref=e154]
        - option "ロマンティック" [ref=e155]
        - option "スプラッター" [ref=e156]
    - generic [ref=e157]:
      - generic [ref=e158]: 除外キーワード
      - textbox "除外キーワードを入力" [ref=e159]
    - generic [ref=e161]:
      - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e162] [cursor=pointer]
      - generic [ref=e163] [cursor=pointer]: AI生成ツール使用素材を除く
    - separator [ref=e164]
    - generic [ref=e165]:
      - generic [ref=e166]: 縦長・横長の選択
      - generic [ref=e167]:
        - generic [ref=e168]:
          - radio "全て" [checked] [ref=e169] [cursor=pointer]
          - generic [ref=e170] [cursor=pointer]: 全て
        - generic [ref=e171]:
          - radio "縦長" [ref=e172] [cursor=pointer]
          - generic [ref=e173] [cursor=pointer]: 縦長
        - generic [ref=e174]:
          - radio "横長" [ref=e175] [cursor=pointer]
          - generic [ref=e176] [cursor=pointer]: 横長
    - generic [ref=e177]:
      - generic [ref=e178]: 画像種別
      - combobox [ref=e179]:
        - option "全ての画像" [selected]
        - option "Mediumサイズ以上がある"
        - option "Largeサイズがある"
        - option "PSDがある"
    - generic [ref=e180]:
      - generic [ref=e181]: クリエイター名
      - textbox "クリエイター名を入力" [ref=e182]
    - generic [ref=e183]:
      - generic [ref=e184]: 除外クリエイター名
      - textbox "除外クリエイター名を入力" [ref=e185]
    - generic [ref=e186]:
      - generic [ref=e187]: 素材ID
      - textbox "素材のIDを入力" [ref=e188]
    - generic [ref=e189]:
      - generic [ref=e190]: 色
      - generic [ref=e191]:
        - generic [ref=e192]:
          - radio "全て" [checked] [ref=e193] [cursor=pointer]
          - generic [ref=e194] [cursor=pointer]: 全て
        - generic [ref=e195]:
          - generic [ref=e196]:
            - button [ref=e198] [cursor=pointer]
            - button [ref=e200] [cursor=pointer]
            - button [ref=e202] [cursor=pointer]
            - button [ref=e204] [cursor=pointer]
            - button [ref=e206] [cursor=pointer]
          - generic [ref=e207]:
            - button [ref=e209] [cursor=pointer]
            - button [ref=e211] [cursor=pointer]
            - button [ref=e213] [cursor=pointer]
            - button [ref=e215] [cursor=pointer]
            - button [ref=e217] [cursor=pointer]
          - generic [ref=e218]:
            - button [ref=e220] [cursor=pointer]
            - button [ref=e222] [cursor=pointer]
            - button [ref=e224] [cursor=pointer]
            - button [ref=e226] [cursor=pointer]
    - generic [ref=e231]:
      - generic [ref=e232]: モデル人数
      - generic [ref=e233]:
        - generic [ref=e234]:
          - radio "全て" [checked] [ref=e235] [cursor=pointer]
          - generic [ref=e236] [cursor=pointer]: 全て
        - generic [ref=e237]:
          - radio "無人" [ref=e238] [cursor=pointer]
          - generic [ref=e239] [cursor=pointer]: 無人
        - generic [ref=e240]:
          - radio "1人" [ref=e241] [cursor=pointer]
          - generic [ref=e242] [cursor=pointer]: 1人
        - generic [ref=e243]:
          - radio "2人" [ref=e244] [cursor=pointer]
          - generic [ref=e245] [cursor=pointer]: 2人
        - generic [ref=e246]:
          - radio "3人以上" [ref=e247] [cursor=pointer]
          - generic [ref=e248] [cursor=pointer]: 3人以上
    - generic [ref=e249]:
      - generic [ref=e250]: モデル年代
      - combobox [ref=e251]:
        - option "全ての年代" [selected]
        - option "赤ちゃん"
        - option "子供"
        - option "若者"
        - option "大人"
        - option "中高年"
        - option "高齢者"
    - generic [ref=e252]:
      - generic [ref=e253]: モデルリリース
      - generic [ref=e254]:
        - generic [ref=e255]:
          - radio "全て" [checked] [ref=e256] [cursor=pointer]
          - generic [ref=e257] [cursor=pointer]: 全て
        - generic [ref=e258]:
          - radio "取得済のみ" [ref=e259] [cursor=pointer]
          - generic [ref=e260] [cursor=pointer]: 取得済のみ
    - generic [ref=e261]:
      - generic [ref=e262]: プロパティリリース
      - generic [ref=e263]:
        - generic [ref=e264]:
          - radio "全て" [checked] [ref=e265] [cursor=pointer]
          - generic [ref=e266] [cursor=pointer]: 全て
        - generic [ref=e267]:
          - radio "取得済のみ" [ref=e268] [cursor=pointer]
          - generic [ref=e269] [cursor=pointer]: 取得済のみ
    - generic [ref=e270]:
      - generic [ref=e272] [cursor=pointer]: 完全一致
      - checkbox "完全一致" [ref=e274] [cursor=pointer]
    - button "検 索" [ref=e276] [cursor=pointer]
  - dialog [active] [ref=e277]:
    - document:
      - generic [ref=e278]:
        - generic [ref=e279]:
          - heading "クリエイターログイン" [level=5] [ref=e280]
          - button "Close" [ref=e281] [cursor=pointer]:
            - generic [ref=e282]: ×
        - generic [ref=e284]:
          - textbox "メールアドレス" [ref=e286]: acworks.toannguyen1@gmail.com
          - textbox "パスワード" [ref=e288]: manhtoan123
          - generic [ref=e290]:
            - generic [ref=e292]:
              - checkbox "自動ログイン" [checked] [ref=e293] [cursor=pointer]
              - generic [ref=e294] [cursor=pointer]: 自動ログイン
            - link "パスワードをお忘れの方" [ref=e296] [cursor=pointer]:
              - /url: /auth/forgotpassword
              - text: パスワードをお忘れの方
              - generic [ref=e297]: 
          - link "新規クリエイター登録はこちら" [ref=e299] [cursor=pointer]:
            - /url: /creator/auth/register
            - text: 新規クリエイター登録はこちら
            - generic [ref=e300]: 
          - button "口グイン" [ref=e301] [cursor=pointer]
          - heading "SNS でログイン" [level=6] [ref=e302]
          - generic [ref=e303]:
            - button " Googleでログイン" [ref=e304] [cursor=pointer]:
              - generic [ref=e305]: 
              - text: Googleでログイン
            - button "Xでログイン" [ref=e306] [cursor=pointer]:
              - img [ref=e307]
              - text: Xでログイン
            - button " Facebookでログイン" [ref=e309] [cursor=pointer]:
              - generic [ref=e310]: 
              - text: Facebookでログイン
  - text: 
  - generic [ref=e312]:
    - generic [ref=e313]:
      - list [ref=e315]:
        - listitem [ref=e317]:
          - img "写真AC" [ref=e318]
      - generic [ref=e319]:
        - link "designAC" [ref=e321] [cursor=pointer]:
          - /url: https://test-an.editor-ac.com/templates/search?keyword=忘年会&utm_source=photoac&utm_medium=internal&utm_campaign=seasonpopup&utm_content=topicon&utm_id=2610
          - img "designAC" [ref=e322]
        - generic [ref=e323]:
          - heading "高品質な写真が無料でダウンロードできます" [level=1] [ref=e324]
          - generic [ref=e326]:
            - heading "加工や商用利用もOK" [level=6] [ref=e328]
            - heading "モデル許可済み人物写真" [level=6] [ref=e330]
            - heading "総会員数1600万人突破" [level=6] [ref=e332]
          - generic [ref=e333]:
            - generic [ref=e334]: AI検索(β版)
            - generic [ref=e336]:
              - button "search_btn" [ref=e337] [cursor=pointer]:
                - generic [ref=e338]: 
              - button "AI Search is off" [disabled] [ref=e339]:
                - img "AI Search is off" [ref=e340]
              - searchbox "キーワード（例：女性）" [ref=e341]
              - generic [ref=e343] [cursor=pointer]:
                - text: 詳細検索
                - generic: ▼
              - link "画像検索" [ref=e345] [cursor=pointer]:
                - /url: "#"
                - generic [ref=e346]:
                  - generic [ref=e347]: 
                  - generic [ref=e348]: 画像検索
          - generic [ref=e349]:
            - link "ビジネス" [ref=e350] [cursor=pointer]:
              - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
              - img [ref=e351]
              - text: ビジネス
            - link "女性" [ref=e353] [cursor=pointer]:
              - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
              - img [ref=e354]
              - text: 女性
            - link "紅葉" [ref=e356] [cursor=pointer]:
              - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
              - img [ref=e357]
              - text: 紅葉
            - link "cat" [ref=e359] [cursor=pointer]:
              - /url: /main/search?q=cat&utm_source=top_keyword
              - img [ref=e360]
              - text: cat
            - link "背景" [ref=e362] [cursor=pointer]:
              - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - img [ref=e363]
              - text: 背景
    - generic [ref=e366]:
      - link "写真AC 人気日本人モデル" [ref=e368] [cursor=pointer]:
        - /url: https://www.photo-ac.com/models/
        - img "写真AC" [ref=e369]
        - generic [ref=e370]: 人気日本人モデル
      - link "写真AC 紅葉" [ref=e372] [cursor=pointer]:
        - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E7%B4%85%E8%91%89&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
        - img "写真AC" [ref=e373]
        - generic [ref=e374]: 紅葉
      - link "写真AC 運動会" [ref=e376] [cursor=pointer]:
        - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E9%81%8B%E5%8B%95%E4%BC%9A&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
        - img "写真AC" [ref=e377]
        - generic [ref=e378]: 運動会
      - link "写真AC ハロウィン" [ref=e380] [cursor=pointer]:
        - /url: https://www.photo-ac.com/main/search?by_ai=&q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
        - img "写真AC" [ref=e381]
        - generic [ref=e382]: ハロウィン
    - generic [ref=e386]:
      - generic [ref=e387]:
        - link "AC写真AIラボ" [ref=e389] [cursor=pointer]:
          - /url: /image-generator?utm_source=photo_ac&utm_medium=referral&utm_campaign=photo_ai_lab&utm_id=20250326_banner_sidebar
          - img "AC写真AIラボ" [ref=e390]
        - generic [ref=e391]:
          - heading "無料写真ダウンロード" [level=4] [ref=e392]
          - generic [ref=e393]:
            - paragraph [ref=e394]:
              - link "無料会員登録" [ref=e395] [cursor=pointer]:
                - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
            - paragraph [ref=e396]:
              - link "ログイン" [ref=e397] [cursor=pointer]:
                - /url: https://test-accounts.ac-illust.com/login?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
          - paragraph [ref=e398]:
            - text: 写真をダウンロードするには写真ACに
            - link "ログイン" [ref=e399] [cursor=pointer]:
              - /url: https://test-accounts.ac-illust.com/login?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
            - text: してください。会員登録がまだの方は
            - link "無料登録" [ref=e400] [cursor=pointer]:
              - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
            - text: を!会員登録後、ログインすることで、約12,391,147点以上のフリー写真素材の中から、無料画像をダウンロードしていただけるようになります。商用利用も可能です。
        - generic [ref=e401]:
          - heading "写真素材メニュー" [level=4] [ref=e402]
          - button "写真カテゴリー" [ref=e404] [cursor=pointer]:
            - text: 写真カテゴリー
            - generic [ref=e405]: 
          - link "人気写真ランキング" [ref=e407] [cursor=pointer]:
            - /url: /ranking
          - link "モデルから写真を検索" [ref=e409] [cursor=pointer]:
            - /url: /models/
          - link "おすすめ特集一覧" [ref=e411] [cursor=pointer]:
            - /url: /pickup/1
          - link "新着写真一覧" [ref=e413] [cursor=pointer]:
            - /url: /main/latest
          - link "公開中のコレクション" [ref=e415] [cursor=pointer]:
            - /url: /main/collections
        - generic [ref=e416]:
          - heading "画像生成AI" [level=4] [ref=e417]
          - link "AC写真AIラボ NEW" [ref=e419] [cursor=pointer]:
            - /url: /image-generator/
            - text: AC写真AIラボ
            - generic [ref=e420]: NEW
          - link "AI人物素材" [ref=e422] [cursor=pointer]:
            - /url: /main/genface
        - generic [ref=e423]:
          - heading "クリエイターメニュー" [level=4] [ref=e424]
          - link "クリエイター投稿（新規登録）" [ref=e426] [cursor=pointer]:
            - /url: /creator/auth/register
          - link "クリエイターログイン" [ref=e428] [cursor=pointer]:
            - /url: "#"
          - link "ポイント換金ランキング" [ref=e430] [cursor=pointer]:
            - /url: /ranking/prize
          - link "クリエイター一覧" [ref=e432] [cursor=pointer]:
            - /url: /creators/
        - generic [ref=e433]:
          - heading "プレミアム会員サービス" [level=4] [ref=e434]
          - link "プレミアム会員登録" [ref=e436] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
          - link "法人・複数名向けプラン" [ref=e438] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/premium/business
          - link "商品化ライセンス" [ref=e440] [cursor=pointer]:
            - /url: /main/extra_license_terms
          - link "あんしんサポート" [ref=e442] [cursor=pointer]:
            - /url: /indemnity/
        - generic [ref=e443]:
          - heading "ヘルプ＆ガイド" [level=4] [ref=e444]
          - link "写真ACとは" [ref=e446] [cursor=pointer]:
            - /url: /main/guide/#group-site
          - link "写真の権利" [ref=e448] [cursor=pointer]:
            - /url: /main/rights
          - link "ヘルプ" [ref=e450] [cursor=pointer]:
            - /url: https://help.freebie-ac.jp
          - link "利用規約" [ref=e452] [cursor=pointer]:
            - /url: /main/terms
        - link "Interview" [ref=e456] [cursor=pointer]:
          - /url: /interview
          - img "Interview" [ref=e457]
        - generic [ref=e458]:
          - heading "おすすめ無料サービス" [level=4] [ref=e459]
          - link "デザインテンプレート" [ref=e461] [cursor=pointer]:
            - /url: https://www.design-ac.net/
            - text: デザインテンプレート
            - generic [ref=e462]: 
          - link "ファイル転送・共有" [ref=e464] [cursor=pointer]:
            - /url: https://ac-data.info/
            - text: ファイル転送・共有
            - generic [ref=e465]: 
          - link "今日の運勢" [ref=e467] [cursor=pointer]:
            - /url: https://uranai-ac.com/
            - text: 今日の運勢
            - generic [ref=e468]: 
          - link "プレゼン資料作成AI" [ref=e470] [cursor=pointer]:
            - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
            - text: プレゼン資料作成AI
            - generic [ref=e471]: 
        - iframe [ref=e472]:
          
        - generic [ref=e473]:
          - heading "人気キーワード（タグ）" [level=4] [ref=e474]:
            - button "人気キーワード（タグ）" [ref=e475] [cursor=pointer]:
              - text: 人気キーワード（タグ）
              - generic [ref=e476]: 
          - generic [ref=e477]:
            - generic [ref=e478]:
              - link "ビジネス" [ref=e479] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
              - link "女性" [ref=e480] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
              - link "紅葉" [ref=e481] [cursor=pointer]:
                - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
              - link "cat" [ref=e482] [cursor=pointer]:
                - /url: /main/search?q=cat&utm_source=top_keyword
              - link "背景" [ref=e483] [cursor=pointer]:
                - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "学生" [ref=e484] [cursor=pointer]:
                - /url: /main/search?q=%E5%AD%A6%E7%94%9F&utm_source=top_keyword
              - link "flower" [ref=e485] [cursor=pointer]:
                - /url: /main/search?q=flower&utm_source=top_keyword
              - link "和紙" [ref=e486] [cursor=pointer]:
                - /url: /main/search?q=%E5%92%8C%E7%B4%99&utm_source=top_keyword
              - link "空" [ref=e487] [cursor=pointer]:
                - /url: /main/search?q=%E7%A9%BA&utm_source=top_keyword
              - link "cats" [ref=e488] [cursor=pointer]:
                - /url: /main/search?q=cats&utm_source=top_keyword
              - link "秋" [ref=e489] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B&utm_source=top_keyword
              - link "クリスマス" [ref=e490] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9&utm_source=top_keyword
              - link "ハロウィン" [ref=e491] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&utm_source=top_keyword
              - link "モノクロ" [ref=e492] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%A2%E3%83%8E%E3%82%AF%E3%83%AD&utm_source=top_keyword
              - link "11月" [ref=e493] [cursor=pointer]:
                - /url: /main/search?q=11%E6%9C%88&utm_source=top_keyword
              - link "青空" [ref=e494] [cursor=pointer]:
                - /url: /main/search?q=%E9%9D%92%E7%A9%BA&utm_source=top_keyword
              - link "お正月" [ref=e495] [cursor=pointer]:
                - /url: /main/search?q=%E3%81%8A%E6%AD%A3%E6%9C%88&utm_source=top_keyword
              - link "家族" [ref=e496] [cursor=pointer]:
                - /url: /main/search?q=%E5%AE%B6%E6%97%8F&utm_source=top_keyword
              - link "パソコン" [ref=e497] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&utm_source=top_keyword
              - link "オフィス" [ref=e498] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&utm_source=top_keyword
              - link "クリスマス 背景" [ref=e499] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9+%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "猫" [ref=e500] [cursor=pointer]:
                - /url: /main/search?q=%E7%8C%AB&utm_source=top_keyword
              - link "リビング" [ref=e501] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%AA%E3%83%93%E3%83%B3%E3%82%B0&utm_source=top_keyword
              - link "赤ちゃん" [ref=e502] [cursor=pointer]:
                - /url: /main/search?q=%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&utm_source=top_keyword
              - link "子供" [ref=e503] [cursor=pointer]:
                - /url: /main/search?q=%E5%AD%90%E4%BE%9B&utm_source=top_keyword
              - link "虹色 背景" [ref=e504] [cursor=pointer]:
                - /url: /main/search?q=%E8%99%B9%E8%89%B2+%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "犬" [ref=e505] [cursor=pointer]:
                - /url: /main/search?q=%E7%8A%AC&utm_source=top_keyword
              - link "sky" [ref=e506] [cursor=pointer]:
                - /url: /main/search?q=sky&utm_source=top_keyword
              - link "子ども" [ref=e507] [cursor=pointer]:
                - /url: /main/search?q=%E5%AD%90%E3%81%A9%E3%82%82&utm_source=top_keyword
              - link "建物" [ref=e508] [cursor=pointer]:
                - /url: /main/search?q=%E5%BB%BA%E7%89%A9&utm_source=top_keyword
              - link "花" [ref=e509] [cursor=pointer]:
                - /url: /main/search?q=%E8%8A%B1&utm_source=top_keyword
              - link "カフェ テーブル" [ref=e510] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7%E3%80%80%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB&utm_source=top_keyword
              - link "観葉植物 インテリア" [ref=e511] [cursor=pointer]:
                - /url: /main/search?q=%E8%A6%B3%E8%91%89%E6%A4%8D%E7%89%A9+%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&utm_source=top_keyword
              - link "無料" [ref=e512] [cursor=pointer]:
                - /url: /main/search?q=%E7%84%A1%E6%96%99&utm_source=top_keyword
              - link "クリスマス 背景" [ref=e513] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "木目" [ref=e514] [cursor=pointer]:
                - /url: /main/search?q=%E6%9C%A8%E7%9B%AE&utm_source=top_keyword
              - link "スマホ" [ref=e515] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%B9%E3%83%9E%E3%83%9B&utm_source=top_keyword
              - link "桜" [ref=e516] [cursor=pointer]:
                - /url: /main/search?q=%E6%A1%9C&utm_source=top_keyword
              - link "風景" [ref=e517] [cursor=pointer]:
                - /url: /main/search?q=%E9%A2%A8%E6%99%AF&utm_source=top_keyword
              - link "office" [ref=e518] [cursor=pointer]:
                - /url: /main/search?q=office&utm_source=top_keyword
              - link "テクスチャ" [ref=e519] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3&utm_source=top_keyword
              - link "工場" [ref=e520] [cursor=pointer]:
                - /url: /main/search?q=%E5%B7%A5%E5%A0%B4&utm_source=top_keyword
              - link "部屋" [ref=e521] [cursor=pointer]:
                - /url: /main/search?q=%E9%83%A8%E5%B1%8B&utm_source=top_keyword
              - link "沖縄" [ref=e522] [cursor=pointer]:
                - /url: /main/search?q=%E6%B2%96%E7%B8%84&utm_source=top_keyword
              - link "さつまいも" [ref=e523] [cursor=pointer]:
                - /url: /main/search?q=%E3%81%95%E3%81%A4%E3%81%BE%E3%81%84%E3%82%82&utm_source=top_keyword
              - link "カフェ" [ref=e524] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7&utm_source=top_keyword
              - link "自然" [ref=e525] [cursor=pointer]:
                - /url: /main/search?q=%E8%87%AA%E7%84%B6&utm_source=top_keyword
              - link "雲" [ref=e526] [cursor=pointer]:
                - /url: /main/search?q=%E9%9B%B2&utm_source=top_keyword
              - link "新生活" [ref=e527] [cursor=pointer]:
                - /url: /main/search?q=%E6%96%B0%E7%94%9F%E6%B4%BB&utm_source=top_keyword
              - link "海" [ref=e528] [cursor=pointer]:
                - /url: /main/search?q=%E6%B5%B7&utm_source=top_keyword
            - paragraph [ref=e529]:
              - button "もっと見る" [ref=e530] [cursor=pointer]:
                - text: もっと見る
                - generic [ref=e531]: 
              - text: 
        - generic [ref=e532]:
          - heading "メディア" [level=4] [ref=e533]
          - heading "テレビでご紹介いただきました！" [level=4] [ref=e534]
          - iframe [ref=e535]:
            - img [ref=f2e2]
          - paragraph [ref=e536]: かんさい情報ネット ten. | 読売テレビ
        - heading "ブログ" [level=4] [ref=e538]
        - generic [ref=e539]:
          - heading "SNS" [level=4] [ref=e540]
          - link "ACワークス公式 X" [ref=e542] [cursor=pointer]:
            - /url: https://x.com/ACworks2011
          - link "Mr.ビー X" [ref=e544] [cursor=pointer]:
            - /url: https://x.com/mrb_ac
        - generic [ref=e546]:
          - button "広告を非表示にする 広告を非表示にする" [ref=e548] [cursor=pointer]:
            - img "広告を非表示にする" [ref=e549]
            - generic [ref=e550]: 広告を非表示にする
          - iframe [ref=e553]:
            
      - generic [ref=e554]:
        - generic [ref=e556]:
          - generic [ref=e557]:
            - paragraph [ref=e558]:
              - link "Ads by ACworks" [ref=e559] [cursor=pointer]:
                - /url: "#"
            - generic [ref=e560]:
              - link "3DAYゲリラセール" [ref=e562] [cursor=pointer]:
                - /url: https://test-lien.photo-ac.com/premium/campaign?utm_source=photoac&utm_medium=internal&utm_campaign=coupon4451&utm_content=banner_250x250
                - img "3DAYゲリラセール" [ref=e564]
              - link "商品化ライセンスご紹介" [ref=e566] [cursor=pointer]:
                - /url: https://blog.acworks.co.jp/2019/06/25/ex/
                - img "商品化ライセンスご紹介" [ref=e568]
              - link "プレゼンテーションAI" [ref=e570] [cursor=pointer]:
                - /url: https://test-an.editor-ac.com/wp/posts/1593/%e3%83%97%e3%83%ac%e3%82%bc%e3%83%b3%e8%b3%87%e6%96%99ai
                - img "プレゼンテーションAI" [ref=e572]
            - paragraph [ref=e573]:
              - link "広告をもっと見る" [ref=e574] [cursor=pointer]:
                - /url: /main/advertisements
                - text: 広告をもっと見る
                - generic [ref=e575]: 
          - generic [ref=e577]:
            - button "広告を非表示にする 広告を非表示にする" [ref=e579] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e580]
              - generic [ref=e581]: 広告を非表示にする
            - iframe [ref=e584]:
              - iframe [ref=f23e1]:
                - generic [ref=f27e9] [cursor=pointer]:
                  - link "Image for Taboola Advertising Unit":
                    - /url: https://finance.yahoo.com/news/how-active-etfs-may-help-advisors-build-better-outcomes-165717854.html
                    - img "Image for Taboola Advertising Unit" [ref=f27e11]
                  - link "Why Fixed Income Potentially Rewards Active Management Manulife John Hancock Investments in Taboola advertising section" [ref=f27e13]:
                    - /url: https://finance.yahoo.com/news/how-active-etfs-may-help-advisors-build-better-outcomes-165717854.html
                    - generic [ref=f27e14]:
                      - link "Why Fixed Income Potentially Rewards Active Management" [ref=f27e15]
                      - link "Manulife John Hancock Investments in Taboola advertising section" [ref=f27e16]: Manulife John Hancock Investments
        - generic [ref=e585]:
          - paragraph [ref=e587]: 人気写真
          - generic [ref=e589]:
            - figure [ref=e590]:
              - generic [ref=e591]: 
              - img "住宅展示場/ハウス展示場 見学 モデルハウス,見学,女性の写真素材" [ref=e592]
              - text: 
            - figure [ref=e593]:
              - generic [ref=e594]: 
              - img "フェイシャルエステイメージ スキンケア,エステ,美容の写真素材" [ref=e595]
              - text: 
            - figure [ref=e596]:
              - generic [ref=e597]: 
              - img "ビジネスマン男女3人で仕事をする姿 ビジネス,男女ビジネス,ミーティングの写真素材" [ref=e598]
              - text: 
            - figure [ref=e599]:
              - generic [ref=e600]: 
              - img "顧客と話し合いをするスーツ姿の女性 コンサルタント,ファイナンシャルプランナー,ライフプランナーの写真素材" [ref=e601]
              - text: 
            - figure [ref=e602]:
              - generic [ref=e603]:
                - img "プレミアム素材" [ref=e605]
                - text: 
              - img "高齢者と話すヘルパー 女性,介護士,ヘルパーの写真素材" [ref=e606]
            - figure [ref=e607]:
              - generic [ref=e608]: 
              - img "オフィスで打合せをするビジネスマン ビジネスマン,ビジネス,打合せの写真素材" [ref=e609]
              - text: 
            - figure [ref=e610]:
              - generic [ref=e611]: 
              - img "住宅を点検する作業員 男性,作業員,業者の写真素材" [ref=e612]
              - text: 
            - figure [ref=e613]:
              - generic [ref=e614]: 
              - img "病院で働く白衣・ナース服を着た女性 病院,看護師,白衣の写真素材" [ref=e615]
              - text: 
          - link "人気の投稿写真を詳しく見る" [ref=e617] [cursor=pointer]:
            - /url: /main/trends
            - text: 人気の投稿写真を詳しく見る
            - generic [ref=e618]: 
        - generic [ref=e619]:
          - paragraph [ref=e621]: デザインに統一感を持たせましょう
          - paragraph [ref=e622]:
            - text: チラシやウェブサイト、資料など、どのようなデザインにも統一感が大切です。
            - text: クリエイターのマイカテゴリーからテーマごとに写真を見つけることができます。同じスタイルの素材をダウンロードしてみましょう。
          - generic [ref=e623]: ※週間ダウンロードランキングからランダムに表示（クリエイター広告出稿者優遇）
          - img [ref=e626]
          - link "詳しく見る" [ref=e628] [cursor=pointer]:
            - /url: main/creator_categories
            - text: 詳しく見る
            - generic [ref=e629]: 
        - generic [ref=e631]:
          - button "広告を非表示にする 広告を非表示にする" [ref=e633] [cursor=pointer]:
            - img "広告を非表示にする" [ref=e634]
            - generic [ref=e635]: 広告を非表示にする
          - iframe [ref=e638]:
            
        - generic [ref=e639]:
          - paragraph [ref=e641]: 写真カテゴリー
          - generic [ref=e642]:
            - generic [ref=e644]:
              - link "カテゴリ。- 人物 人物" [ref=e647] [cursor=pointer]:
                - /url: /main/search?c_id=1&c_name=%E4%BA%BA%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 人物" [ref=e648]
                - generic [ref=e649]: 人物
              - link "カテゴリ。- ビジネス ビジネス" [ref=e652] [cursor=pointer]:
                - /url: /main/search?c_id=2&c_name=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&referer=c_search&utm_source=categories
                - img "カテゴリ。- ビジネス" [ref=e653]
                - generic [ref=e654]: ビジネス
              - link "カテゴリ。- 動物・生き物 動物・生き物" [ref=e657] [cursor=pointer]:
                - /url: /main/search?c_id=3&c_name=%E5%8B%95%E7%89%A9%E3%83%BB%E7%94%9F%E3%81%8D%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 動物・生き物" [ref=e658]
                - generic [ref=e659]: 動物・生き物
              - link "カテゴリ。- 花・植物 花・植物" [ref=e662] [cursor=pointer]:
                - /url: /main/search?c_id=4&c_name=%E8%8A%B1%E3%83%BB%E6%A4%8D%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 花・植物" [ref=e663]
                - generic [ref=e664]: 花・植物
              - link "カテゴリ。- 食べ物・飲み物 食べ物・飲み物" [ref=e667] [cursor=pointer]:
                - /url: /main/search?c_id=5&c_name=%E9%A3%9F%E3%81%B9%E7%89%A9%E3%83%BB%E9%A3%B2%E3%81%BF%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 食べ物・飲み物" [ref=e668]
                - generic [ref=e669]: 食べ物・飲み物
              - link "カテゴリ。- 町並み・建物 町並み・建物" [ref=e672] [cursor=pointer]:
                - /url: /main/search?c_id=6&c_name=%E7%94%BA%E4%B8%A6%E3%81%BF%E3%83%BB%E5%BB%BA%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 町並み・建物" [ref=e673]
                - generic [ref=e674]: 町並み・建物
              - link "カテゴリ。- 医療・福祉 医療・福祉" [ref=e677] [cursor=pointer]:
                - /url: /main/search?c_id=7&c_name=%E5%8C%BB%E7%99%82%E3%83%BB%E7%A6%8F%E7%A5%89&referer=c_search&utm_source=categories
                - img "カテゴリ。- 医療・福祉" [ref=e678]
                - generic [ref=e679]: 医療・福祉
              - link "カテゴリ。- 交通・乗り物 交通・乗り物" [ref=e682] [cursor=pointer]:
                - /url: /main/search?c_id=8&c_name=%E4%BA%A4%E9%80%9A%E3%83%BB%E4%B9%97%E3%82%8A%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 交通・乗り物" [ref=e683]
                - generic [ref=e684]: 交通・乗り物
              - link "カテゴリ。- 季節・行事 季節・行事" [ref=e687] [cursor=pointer]:
                - /url: /main/search?c_id=9&c_name=%E5%AD%A3%E7%AF%80%E3%83%BB%E8%A1%8C%E4%BA%8B&referer=c_search&utm_source=categories
                - img "カテゴリ。- 季節・行事" [ref=e688]
                - generic [ref=e689]: 季節・行事
              - link "カテゴリ。- 自然・風景 自然・風景" [ref=e692] [cursor=pointer]:
                - /url: /main/search?c_id=10&c_name=%E8%87%AA%E7%84%B6%E3%83%BB%E9%A2%A8%E6%99%AF&referer=c_search&utm_source=categories
                - img "カテゴリ。- 自然・風景" [ref=e693]
                - generic [ref=e694]: 自然・風景
              - link "カテゴリ。- スポーツ スポーツ" [ref=e697] [cursor=pointer]:
                - /url: /main/search?c_id=11&c_name=%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84&referer=c_search&utm_source=categories
                - img "カテゴリ。- スポーツ" [ref=e698]
                - generic [ref=e699]: スポーツ
              - link "カテゴリ。- エコ・環境 エコ・環境" [ref=e702] [cursor=pointer]:
                - /url: /main/search?c_id=12&c_name=%E3%82%A8%E3%82%B3%E3%83%BB%E7%92%B0%E5%A2%83&referer=c_search&utm_source=categories
                - img "カテゴリ。- エコ・環境" [ref=e703]
                - generic [ref=e704]: エコ・環境
              - link "カテゴリ。- 美容・健康 美容・健康" [ref=e707] [cursor=pointer]:
                - /url: /main/search?c_id=13&c_name=%E7%BE%8E%E5%AE%B9%E3%83%BB%E5%81%A5%E5%BA%B7&referer=c_search&utm_source=categories
                - img "カテゴリ。- 美容・健康" [ref=e708]
                - generic [ref=e709]: 美容・健康
              - link "カテゴリ。- 住宅・インテリア 住宅・インテリア" [ref=e712] [cursor=pointer]:
                - /url: /main/search?c_id=14&c_name=%E4%BD%8F%E5%AE%85%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&referer=c_search&utm_source=categories
                - img "カテゴリ。- 住宅・インテリア" [ref=e713]
                - generic [ref=e714]: 住宅・インテリア
              - link "カテゴリ。- 年賀状 年賀状" [ref=e717] [cursor=pointer]:
                - /url: /main/search?c_id=15&c_name=%E5%B9%B4%E8%B3%80%E7%8A%B6&referer=c_search&utm_source=categories
                - img "カテゴリ。- 年賀状" [ref=e718]
                - generic [ref=e719]: 年賀状
              - link "カテゴリ。- テクスチャ・背景 テクスチャ・背景" [ref=e722] [cursor=pointer]:
                - /url: /main/search?c_id=16&c_name=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%83%BB%E8%83%8C%E6%99%AF&referer=c_search&utm_source=categories
                - img "カテゴリ。- テクスチャ・背景" [ref=e723]
                - generic [ref=e724]: テクスチャ・背景
              - link "カテゴリ。- 小物・雑貨 小物・雑貨" [ref=e727] [cursor=pointer]:
                - /url: /main/search?c_id=18&c_name=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&referer=c_search&utm_source=categories
                - img "カテゴリ。- 小物・雑貨" [ref=e728]
                - generic [ref=e729]: 小物・雑貨
              - link "カテゴリ。- クレイアート クレイアート" [ref=e732] [cursor=pointer]:
                - /url: /main/search?c_id=19&c_name=%E3%82%AF%E3%83%AC%E3%82%A4%E3%82%A2%E3%83%BC%E3%83%88&referer=c_search&utm_source=categories
                - img "カテゴリ。- クレイアート" [ref=e733]
                - generic [ref=e734]: クレイアート
              - link "カテゴリ。- 外国 外国" [ref=e737] [cursor=pointer]:
                - /url: /main/search?c_id=20&c_name=%E5%A4%96%E5%9B%BD&referer=c_search&utm_source=categories
                - img "カテゴリ。- 外国" [ref=e738]
                - generic [ref=e739]: 外国
              - link "カテゴリ。- PSD素材 PSD素材" [ref=e742] [cursor=pointer]:
                - /url: /main/search?referer=category_psd&sizesec=psd&utm_source=categories
                - img "カテゴリ。- PSD素材" [ref=e743]
                - generic [ref=e744]: PSD素材
            - button [ref=e745] [cursor=pointer]:
              - img [ref=e747]
        - generic [ref=e749]:
          - paragraph [ref=e751]: 写真ACだけのオリジナルおすすめ写真特集！
          - paragraph [ref=e752]:
            - text: プロのカメラマンが撮影した写真ACのおすすめ特集を一挙公開！
            - text: 無料で使える高品質な写真を豊富なテーマごとに厳選してご用意しています。
          - generic [ref=e753]:
            - generic [ref=e754]:
              - figure "マカロン・ドーナツ" [ref=e755]:
                - link "マカロン・ドーナツ" [ref=e756] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=macarons_donutsac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                  - img "マカロン・ドーナツ" [ref=e757]
              - figure "様々なビジネスシーン 失敗・パワハラ" [ref=e758]:
                - link "様々なビジネスシーン 失敗・パワハラ" [ref=e759] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=buddyjpac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&personalized=1&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                  - img "様々なビジネスシーン 失敗・パワハラ" [ref=e760]
              - figure "子供の食事" [ref=e761]:
                - link "子供の食事" [ref=e762] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=childreneatingac&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=acworks&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&utm_source=pickup
                  - img "子供の食事" [ref=e763]
              - figure "日本人女性のライフスタイル" [ref=e764]:
                - link "日本人女性のライフスタイル" [ref=e765] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=womanjplifestyle3ac&by_ai=&sizesec=all&orientation=all&color=&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=&ngcreator=&nq=&qid=&exclude_ai=on&srt=dlrank&pp=70&utm_source=pickup
                  - img "日本人女性のライフスタイル" [ref=e766]
            - link "おすすめ写真特集をもっと見る" [ref=e768] [cursor=pointer]:
              - /url: /pickup/1
              - text: おすすめ写真特集をもっと見る
              - generic [ref=e769]: 
        - generic [ref=e770]:
          - generic [ref=e771]:
            - paragraph [ref=e772]: グループサイトの無料サービスはご存知ですか？
            - text: イラストや動画、デザインツールなど、一つのアカウントで全て使えます。
          - generic [ref=e773]:
            - link "シルエット・ピクトグラム テンプレート・デザインツール" [ref=e776] [cursor=pointer]:
              - /url: https://test-an.editor-ac.com
              - img "シルエット・ピクトグラム" [ref=e777]
              - generic [ref=e778]: テンプレート・デザインツール
            - link "イラスト・ベクター画像 イラスト・ベクター画像" [ref=e781] [cursor=pointer]:
              - /url: https://www.ac-illust.com
              - img "イラスト・ベクター画像" [ref=e782]
              - generic [ref=e783]: イラスト・ベクター画像
            - link "シルエット・ピクトグラム シルエット・ピクトグラム" [ref=e786] [cursor=pointer]:
              - /url: https://www.silhouette-ac.com
              - img "シルエット・ピクトグラム" [ref=e787]
              - generic [ref=e788]: シルエット・ピクトグラム
            - generic [ref=e789]:
              - generic [ref=e790]:
                - generic:
                  - img
              - link "シルエット・ピクトグラム 動画・エフェクト" [ref=e791] [cursor=pointer]:
                - /url: https://video-ac.com/
                - img "シルエット・ピクトグラム" [ref=e792]
                - generic [ref=e793]: 動画・エフェクト
        - generic [ref=e794]:
          - paragraph [ref=e796]: もう画像選びで悩まないでください
          - generic [ref=e798]:
            - generic [ref=e799]:
              - generic [ref=e800]:
                - img "Notification" [ref=e801]
                - generic [ref=e802]:
                  - paragraph [ref=e803]: 無料でダウンロード
                  - paragraph [ref=e804]: 1239万枚以上の写真素材から無料でダウンロード可能！毎日数千枚の写真素材が追加されます。
              - generic [ref=e805]:
                - img "Notification" [ref=e806]
                - generic [ref=e807]:
                  - paragraph [ref=e808]: クレジット表記不要
                  - paragraph [ref=e809]: 無料だとクレジット表記が必要なサイトが多い中、写真ACは無料でもクレジット表記不要です。
              - generic [ref=e810]:
                - img "Notification" [ref=e811]
                - generic [ref=e812]:
                  - paragraph [ref=e813]: 商用利用可能
                  - paragraph [ref=e814]: 加工も自由で商用利用も可能だから、チラシやポスター、パンフレットなど、さまざまなビジネスにご利用いただけます。
            - button "広告を非表示にする 広告を非表示にする" [ref=e819] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e820]
              - generic [ref=e821]: 広告を非表示にする
        - generic [ref=e822]:
          - paragraph [ref=e824]: こんな方におすすめです
          - generic [ref=e826]:
            - generic [ref=e827]:
              - generic [ref=e828]:
                - img "top human 1" [ref=e829]
                - generic [ref=e830]:
                  - paragraph [ref=e831]: WEB担当者
                  - paragraph [ref=e832]:
                    - text: ウェブサイトやブログの
                    - text: アイキャッチ画像がほしい
              - generic [ref=e833]:
                - img "top human 2" [ref=e834]
                - generic [ref=e835]:
                  - paragraph [ref=e836]: 会社員
                  - paragraph [ref=e837]:
                    - text: プレゼンテーションのスライドに
                    - text: 画像を使って分かりやすくしたい
              - generic [ref=e838]:
                - img "top human 3" [ref=e839]
                - generic [ref=e840]:
                  - paragraph [ref=e841]: インフルエンサー
                  - paragraph [ref=e842]:
                    - text: SNSへの投稿が
                    - text: テキストだけで物足りない
              - generic [ref=e843]:
                - img "top human 4" [ref=e844]
                - generic [ref=e845]:
                  - paragraph [ref=e846]: 作 家
                  - paragraph [ref=e847]:
                    - text: 電子書籍や印刷物の挿絵に
                    - text: 商用利用できる画像がほしい
              - generic [ref=e848]:
                - img "top human 5" [ref=e849]
                - generic [ref=e850]:
                  - paragraph [ref=e851]: プログラマー
                  - paragraph [ref=e852]:
                    - text: アプリケーションのUIデザインに
                    - text: 使う画像やアイコンがほしい
            - generic [ref=e853]:
              - generic [ref=e854]:
                - img "top human 6" [ref=e855]
                - generic [ref=e856]:
                  - paragraph [ref=e857]: 教育関係者
                  - paragraph [ref=e858]:
                    - text: 学習教材や教育資料に入れる
                    - text: 挿絵やイメージがほしい
              - generic [ref=e859]:
                - img "top human 7" [ref=e860]
                - generic [ref=e861]:
                  - paragraph [ref=e862]: 記 者
                  - paragraph [ref=e863]:
                    - text: メディア記事やニュース記事に
                    - text: 使う画像がほしい
              - generic [ref=e864]:
                - img "top human 8" [ref=e865]
                - generic [ref=e866]:
                  - paragraph [ref=e867]: ショップ運営
                  - paragraph [ref=e868]:
                    - text: 広告キャンペーンに使える
                    - text: インパクトのある画像がほしい
              - generic [ref=e869]:
                - img "top human 9" [ref=e870]
                - generic [ref=e871]:
                  - paragraph [ref=e872]: ハンドメイド販売
                  - paragraph [ref=e873]:
                    - link "商品化ライセンス" [ref=e874] [cursor=pointer]:
                      - /url: /main/extra_license_introduction
                    - text: を購入して
                    - text: ハンドメイド作品の販売したい
        - generic [ref=e877] [cursor=pointer]:
          - generic [ref=e879]:
            - img "logo45 designAC" [ref=e880]
            - paragraph [ref=e881]: デザインをもっと簡単に
            - paragraph [ref=e883]:
              - text: デザインACならいつでもどこでも、手軽にデザインできます。
              - text: 豊富なテンプレートからオリジナルのデザインを作成。
              - text: PC、スマートフォンにも対応の無料デザインツールです。
            - link "今すぐデザインを作成" [ref=e884]:
              - /url: https://www.design-ac.net/templates/new
          - img "banner designAC" [ref=e886]
        - generic [ref=e887]:
          - generic [ref=e888]:
            - paragraph [ref=e889]: まだ時間をムダにしますか？
            - paragraph [ref=e890]: 効率よく画像を探して、インプットの時間を確保し、納期のプレッシャーから逃れましょう。
          - generic [ref=e891]:
            - button "プレミアム個人プラン picture premium personal picture check 検索無制限 picture check ダウンロード無制限 picture check 待たずにダウンロード picture check まとめてダウンロード picture check 商品化ライセンス利用可能 picture check あんしんサポート 個人プランを詳しくみる" [ref=e892] [cursor=pointer]:
              - paragraph [ref=e894]: プレミアム個人プラン
              - generic [ref=e895]:
                - img "picture premium personal" [ref=e896]
                - generic [ref=e897]:
                  - generic [ref=e898]:
                    - img "picture check" [ref=e900]
                    - paragraph [ref=e902]: 検索無制限
                  - generic [ref=e903]:
                    - img "picture check" [ref=e905]
                    - paragraph [ref=e907]: ダウンロード無制限
                  - generic [ref=e908]:
                    - img "picture check" [ref=e910]
                    - paragraph [ref=e912]: 待たずにダウンロード
                  - generic [ref=e913]:
                    - img "picture check" [ref=e915]
                    - paragraph [ref=e917]: まとめてダウンロード
                  - generic [ref=e918]:
                    - img "picture check" [ref=e920]
                    - paragraph [ref=e922]: 商品化ライセンス利用可能
                  - generic [ref=e923]:
                    - img "picture check" [ref=e925]
                    - paragraph [ref=e927]: あんしんサポート
                - link "個人プランを詳しくみる" [ref=e929]:
                  - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
            - button "チームでお得な法人プラン picture premium business ＼ 大企業から行政まで利用中 ／ 個人プランの全ての機能に加え、 picture check 法人名義でのご利用 picture check メンバー招待機能 picture check 広告非表示オプション無料 picture check コレクションの共有 法人プランを詳しくみる" [ref=e930] [cursor=pointer]:
              - paragraph [ref=e932]: チームでお得な法人プラン
              - generic [ref=e933]:
                - img "picture premium business" [ref=e934]
                - generic [ref=e935]:
                  - paragraph [ref=e936]: ＼ 大企業から行政まで利用中 ／
                  - generic [ref=e937]:
                    - paragraph [ref=e938]: 個人プランの全ての機能に加え、
                    - generic [ref=e939]:
                      - img "picture check" [ref=e941]
                      - paragraph [ref=e943]: 法人名義でのご利用
                    - generic [ref=e944]:
                      - img "picture check" [ref=e946]
                      - paragraph [ref=e948]: メンバー招待機能
                    - generic [ref=e949]:
                      - img "picture check" [ref=e951]
                      - paragraph [ref=e953]: 広告非表示オプション無料
                    - generic [ref=e954]:
                      - img "picture check" [ref=e956]
                      - paragraph [ref=e958]: コレクションの共有
                - link "法人プランを詳しくみる" [ref=e960]:
                  - /url: https://test-lien.photo-ac.com/premium/business
        - generic [ref=e961]:
          - paragraph [ref=e963]: 日本最大級のフリー素材サイト
          - generic [ref=e964]:
            - generic [ref=e965]:
              - generic [ref=e967]:
                - img "Total users" [ref=e968]
                - generic [ref=e969]:
                  - paragraph [ref=e970]: 登録ユーザー
                  - paragraph [ref=e971]: 0人以上
              - generic [ref=e973]:
                - img "Downloads" [ref=e974]
                - generic [ref=e975]:
                  - paragraph [ref=e976]: 総ダウンロード
                  - paragraph [ref=e977]: 208,000,000回以上
              - generic [ref=e979]:
                - img "Total creators" [ref=e980]
                - generic [ref=e981]:
                  - paragraph [ref=e982]: 登録クリエイター
                  - paragraph [ref=e983]: 370,000人以上
              - generic [ref=e985]:
                - img "Donations" [ref=e986]
                - generic [ref=e987]:
                  - paragraph [ref=e988]: 寄付金総額
                  - paragraph [ref=e989]: 71,400,000円以上
            - generic [ref=e990]: ※グループサイト合計
        - generic [ref=e993]:
          - generic [ref=e996]:
            - button "広告を非表示にする 広告を非表示にする" [ref=e998] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e999]
              - generic [ref=e1000]: 広告を非表示にする
            - iframe [ref=e1003]:
              
          - generic [ref=e1006]:
            - button "広告を非表示にする 広告を非表示にする" [ref=e1008] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e1009]
              - generic [ref=e1010]: 広告を非表示にする
            - iframe [ref=e1013]:
              
        - generic [ref=e1014]:
          - paragraph [ref=e1016]: ACワークスからのお知らせ
          - iframe [ref=e1017]:
            - img [ref=f3e2]
        - link "acworks banner" [ref=e1019] [cursor=pointer]:
          - /url: https://acworks.co.jp/
          - img "acworks banner" [ref=e1020]
        - generic [ref=e1021]:
          - paragraph [ref=e1022]: あなたのダウンロードが社会に貢献します
          - paragraph [ref=e1023]: あなたが写真素材を1ダウンロードするたびに0.1円を
          - paragraph [ref=e1024]: ACワークス株式会社より、ユーザーの皆さまが希望する団体へ寄付いたします。
          - generic [ref=e1025]:
            - generic [ref=e1027]:
              - img [ref=e1028]
              - generic [ref=e1029]:
                - paragraph [ref=e1030]:
                  - text: 2024年の寄付金総額
                  - generic [ref=e1031]: 800万円超
                - paragraph [ref=e1032]:
                  - text: これまでの累計寄付金総額
                  - generic [ref=e1033]: 6100万円超
            - paragraph [ref=e1034]: "[2025年3月時点]"
          - link "これまでの寄付金総額をみる" [ref=e1036] [cursor=pointer]:
            - /url: https://acworks.co.jp/csr/
    - contentinfo [ref=e1038]:
      - generic [ref=e1041]:
        - generic [ref=e1042]: 昨日のダウンロード数：24,029
        - generic [ref=e1043]: 先月のダウンロード数：1,124,624
        - generic [ref=e1044]: 総会員数：1600万人を突破しました
      - generic [ref=e1046]:
        - generic [ref=e1047]:
          - generic [ref=e1048]:
            - generic [ref=e1049]: 写真ACについて 
            - list [ref=e1050]:
              - listitem [ref=e1051]:
                - link "写真ACとは" [ref=e1052] [cursor=pointer]:
                  - /url: /main/guide/
              - listitem [ref=e1053]:
                - link "運営会社" [ref=e1054] [cursor=pointer]:
                  - /url: /main/about/
              - listitem [ref=e1055]:
                - link "個人情報保護方針" [ref=e1056] [cursor=pointer]:
                  - /url: /main/privacy/
              - listitem [ref=e1057]:
                - link "特定個人情報基本方針" [ref=e1058] [cursor=pointer]:
                  - /url: /main/policy_personal_info/
              - listitem [ref=e1059]:
                - link "特定商取引法に基づく表記" [ref=e1060] [cursor=pointer]:
                  - /url: /main/commercial_transactions/
              - listitem [ref=e1061]:
                - link "サイトマップ" [ref=e1062] [cursor=pointer]:
                  - /url: /main/sitemap
              - listitem [ref=e1063]:
                - link "セキュリティポリシー" [ref=e1064] [cursor=pointer]:
                  - /url: https://acworks.co.jp/security-policy/
          - generic [ref=e1065]:
            - generic [ref=e1066]: 会員登録 
            - list [ref=e1067]:
              - listitem [ref=e1068]:
                - link "無料会員登録" [ref=e1069] [cursor=pointer]:
                  - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
              - listitem [ref=e1070]:
                - link "プレミアム会員登録" [ref=e1071] [cursor=pointer]:
                  - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp&fromButton=premium_action
              - listitem [ref=e1072]:
                - link "無料クリエイター会員登録" [ref=e1073] [cursor=pointer]:
                  - /url: /creator/auth/register
          - generic [ref=e1074]:
            - generic [ref=e1075]: プレミアム会員サービス 
            - list [ref=e1076]:
              - listitem [ref=e1077]:
                - link "プレミアム会員登録" [ref=e1078] [cursor=pointer]:
                  - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
              - listitem [ref=e1079]:
                - link "法人・複数名向けプラン" [ref=e1080] [cursor=pointer]:
                  - /url: https://test-lien.photo-ac.com/premium/business
              - listitem [ref=e1081]:
                - link "商品化ライセンス" [ref=e1082] [cursor=pointer]:
                  - /url: /main/extra_license_terms/
              - listitem [ref=e1083]:
                - link "あんしんサポート" [ref=e1084] [cursor=pointer]:
                  - /url: /indemnity/
          - generic [ref=e1085]:
            - generic [ref=e1086]: ヘルプ＆ガイド 
            - list [ref=e1087]:
              - listitem [ref=e1088]:
                - link "ヘルプ" [ref=e1089] [cursor=pointer]:
                  - /url: https://help.freebie-ac.jp/
              - listitem [ref=e1090]:
                - link "利用規約" [ref=e1091] [cursor=pointer]:
                  - /url: /main/terms/
              - listitem [ref=e1092]:
                - link "プレミアム会員利用規約" [ref=e1093] [cursor=pointer]:
                  - /url: /main/terms_premium/
              - listitem [ref=e1094]:
                - link "AC写真AIラボ利用規約" [ref=e1095] [cursor=pointer]:
                  - /url: /image-generator/terms
          - generic [ref=e1096]:
            - generic [ref=e1097]: グループサイト 
            - list [ref=e1098]:
              - listitem [ref=e1099]:
                - link "イラストAC" [ref=e1100] [cursor=pointer]:
                  - /url: https://www.ac-illust.com/
              - listitem [ref=e1101]:
                - link "シルエットAC" [ref=e1102] [cursor=pointer]:
                  - /url: https://www.silhouette-ac.com/
              - listitem [ref=e1103]:
                - link "フリービーAC" [ref=e1104] [cursor=pointer]:
                  - /url: https://www.freebie-ac.jp/
              - listitem [ref=e1105]:
                - link "年賀状AC" [ref=e1106] [cursor=pointer]:
                  - /url: https://www.new-year.bz/
              - listitem [ref=e1107]:
                - link "動画AC" [ref=e1108] [cursor=pointer]:
                  - /url: https://video-ac.com
              - listitem [ref=e1109]:
                - link "デザインAC" [ref=e1110] [cursor=pointer]:
                  - /url: https://www.design-ac.net/
              - listitem [ref=e1111]:
                - link "ACデータ" [ref=e1112] [cursor=pointer]:
                  - /url: https://ac-data.info/
              - listitem [ref=e1113]:
                - link "明細AC" [ref=e1114] [cursor=pointer]:
                  - /url: https://meisai-ac.com/
        - generic [ref=e1115]:
          - link "twitter_btn" [ref=e1116] [cursor=pointer]:
            - /url: https://x.com/ACworks2011
            - button "twitter_btn" [ref=e1117]:
              - img [ref=e1118]
          - link "facebook_btn" [ref=e1120] [cursor=pointer]:
            - /url: https://www.facebook.com/ACworks2011/
            - button "facebook_btn" [ref=e1121]:
              - generic [ref=e1122]: 
          - link "pinterest_btn" [ref=e1123] [cursor=pointer]:
            - /url: https://www.pinterest.jp/acworks/
            - button "pinterest_btn" [ref=e1124]:
              - generic [ref=e1125]: 
          - link "blog_btn" [ref=e1126] [cursor=pointer]:
            - /url: http://blog.acworks.co.jp/
            - button "blog_btn" [ref=e1127]:
              - generic [ref=e1128]: 
          - link "feedback_modal_btn" [ref=e1129] [cursor=pointer]:
            - /url: "#feedbackModal"
            - button "feedback_modal_btn" [ref=e1130]:
              - generic [ref=e1131]: 
              - text: ご意見・ご要望
        - generic [ref=e1133]:
          - text: © 2011-2026
          - link "写真AC" [ref=e1134] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/
  - generic [ref=e1135] [cursor=pointer]:
    - generic:
      - paragraph: ご質問は
      - paragraph: こちらから！
    - img "chat-icon" [ref=e1137]
    - generic [ref=e1138]: ×
```

# Test source

```ts
  1   | import { type Page, type Locator, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * BasePage — Abstract base class for all Page Object classes.
  5   |  * Contains common reusable methods.
  6   |  */
  7   | export abstract class BasePage {
  8   |   protected readonly page: Page;
  9   | 
  10  |   protected readonly photoAiModelContent: Locator;
  11  | 
  12  |   protected readonly closeButton: Locator;
  13  | 
  14  |   protected readonly pageLoadingIcon: Locator;
  15  | 
  16  |   constructor(page: Page) {
  17  |     this.page = page;
  18  |     this.photoAiModelContent = this.page.locator('.photo-ai-lab-modal__content');
  19  |     this.closeButton = this.page.getByRole('button', { name: '閉じる' }).nth(1);
  20  |     this.pageLoadingIcon = page.locator('#full_page_loading').first();
  21  |   }
  22  | 
  23  | 
  24  |   // Navigation
  25  |   /**
  26  |    * Navigate to a URL path relative to baseURL with resilient retry on transient network timeouts.
  27  |    * @param path - Relative path (e.g., '/login') or absolute URL
  28  |    * @param options - Optional navigation configuration
  29  |    */
  30  |   async navigate(path: string = '/', options?: { timeout?: number }): Promise<void> {
  31  |     const timeout = options?.timeout ?? 25_000;
  32  |     try {
  33  |       await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
  34  |     } catch {
  35  |       // Retry once if navigation timed out due to staging network latency
  36  |       await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
  37  |     }
  38  |   }
  39  | 
  40  |   /**
  41  |    * Wait for the page to reach a stable network state.
  42  |    */
  43  |   async waitForPageLoad(): Promise<void> {
  44  |     await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  45  |   }
  46  | 
  47  |   // Element Action
  48  | 
  49  |   /**
  50  |    * Click an element after ensuring it is visible and enabled.
  51  |    * @param locator - Playwright Locator object
  52  |    */
  53  |   async clickElement(locator: Locator, options?: { force?: boolean; noWaitAfter?: boolean }): Promise<void> {
> 54  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
      |                   ^ Error: locator.waitFor: Error: strict mode violation: getByRole('button', { name: /ログイン/ }) resolved to 4 elements:
  55  |     const startUrl = this.page.url();
  56  |     const clickOpts = {
  57  |       ...(options?.force ? { force: true } : {}),
  58  |       ...(options?.noWaitAfter ? { noWaitAfter: true } : {}),
  59  |     };
  60  |     if (options?.force || options?.noWaitAfter) {
  61  |       await locator.click(clickOpts);
  62  |     } else {
  63  |       try {
  64  |         await locator.click(clickOpts);
  65  |       } catch (err: any) {
  66  |         // If URL has changed (navigation already triggered), do not retry on detached element from previous page
  67  |         if (this.page.url() !== startUrl) return;
  68  |         const errMessage = String(err?.message || '');
  69  |         if (errMessage.includes('Execution context was destroyed') || errMessage.includes('frame was detached')) {
  70  |           return;
  71  |         }
  72  |         await locator.click({ force: true, ...(options?.noWaitAfter ? { noWaitAfter: true } : {}) });
  73  |       }
  74  |     }
  75  |   }
  76  | 
  77  |   /**
  78  |    * Fill an input field — clears existing value first.
  79  |    * @param locator - Playwright Locator for the input
  80  |    * @param value - Text to type into the field
  81  |    */
  82  |   async fillInput(locator: Locator, value: string): Promise<void> {
  83  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  84  |     await locator.fill('');
  85  |     await locator.fill(value);
  86  |   }
  87  | 
  88  |   /**
  89  |    * Get trimmed text content of an element.
  90  |    * @param locator - Playwright Locator
  91  |    * @returns Text content string
  92  |    */
  93  |   async getText(locator: Locator): Promise<string> {
  94  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  95  |     return (await locator.textContent())?.trim() ?? '';
  96  |   }
  97  | 
  98  |   /**
  99  |    * Get the value of an input element.
  100 |    * @param locator - Playwright Locator for the input
  101 |    */
  102 |   async getInputValue(locator: Locator): Promise<string> {
  103 |     return locator.inputValue();
  104 |   }
  105 | 
  106 |   /**
  107 |    * Check if an element is visible on the page.
  108 |    * @param locator - Playwright Locator
  109 |    * @returns true if visible, false otherwise
  110 |    */
  111 |   async isVisible(locator: Locator): Promise<boolean> {
  112 |     return locator.isVisible();
  113 |   }
  114 | 
  115 |   /**
  116 |    * Wait for an element to become visible within timeout.
  117 |    * @param locator - Playwright Locator
  118 |    * @param timeout - Optional custom timeout in ms
  119 |    */
  120 |   async waitForElement(locator: Locator, timeout?: number): Promise<void> {
  121 |     await expect(locator).toBeVisible({ timeout });
  122 |   }
  123 | 
  124 |   /**
  125 |    * Wait for page loading overlay icon to disappear (hidden or detached).
  126 |    * @param timeout - Optional custom timeout in ms (default: 25_000)
  127 |    */
  128 |   async waitForPageLoadingIconHidden(timeout: number = 25_000): Promise<void> {
  129 |     await this.pageLoadingIcon.waitFor({ state: 'hidden', timeout }).catch(() => { });
  130 |   }
  131 | 
  132 |   /**
  133 |    * Select an option in a <select> dropdown by visible text.
  134 |    * @param locator - Playwright Locator for the select element
  135 |    * @param label - Visible text of the option to select
  136 |    */
  137 |   async selectOption(locator: Locator, label: string): Promise<void> {
  138 |     await expect(locator).toBeVisible();
  139 |     await locator.selectOption({ label });
  140 |   }
  141 | 
  142 |   /**
  143 |    * Check a checkbox if it is not already checked.
  144 |    * @param locator - Playwright Locator for the checkbox
  145 |    */
  146 |   async checkCheckbox(locator: Locator): Promise<void> {
  147 |     if (!(await locator.isChecked())) {
  148 |       await locator.check();
  149 |     }
  150 |   }
  151 | 
  152 |   /**
  153 |    * Uncheck a checkbox if it is currently checked.
  154 |    * @param locator - Playwright Locator for the checkbox
```