# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/free-user/download.spec.ts >> Download — Free User >> TC-DOWNLOAD-FREE-011: Free User tải ảnh Size S thành công qua Timer Modal quảng cáo @free-user @download
- Location: photo-ac/src/tests/downloader/free-user/download.spec.ts:240:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 35000ms exceeded.
Call log:
  - waiting for locator('#timerModal a.modal-ads-button-dl:has-text("ダウンロード")') to be visible
    73 × locator resolved to hidden <a data-action="download" href="javascript:void(0);" class="modal-ads-button-dl text-decoration-none ac-btn-md ac-btn-photo w-100 justify-content-center custom-shadow ac-mb-2">…</a>

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/detail/1651238"
  - paragraph [ref=e3]:
    - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
    - link "詳細" [ref=e4] [cursor=pointer]:
      - /url: /main/privacy
    - link "同意" [ref=e5] [cursor=pointer]:
      - /url: ""
  - banner:                    
  - generic [ref=e8]:
    - generic [ref=e15]:
      - text: 
      - generic [ref=e16]:
        - text: 
        - searchbox "キーワード（例：女性）" [ref=e18]
        - generic [ref=e19]:
          - link [ref=e20] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e21]: 
          - generic [ref=e22] [cursor=pointer]:
            - text: 詳細 検索
            - generic: ▼
          - button [ref=e23] [cursor=pointer]:
            - generic [ref=e24]: 
    - generic [ref=e25]:
      - link " 写真投稿する" [ref=e26] [cursor=pointer]:
        - /url: /creator/auth/register
        - generic [ref=e27]: 
        - text: 写真投稿する
      - generic [ref=e29]:
        - link "ユーザープレミアムメンバーシッププレミアム会員登録" [ref=e30] [cursor=pointer]:
          - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
          - img "ユーザープレミアムメンバーシップ" [ref=e31]
          - text: プレミアム会員登録
        - button "クリックしてACアプリケーションのリストを表示" [ref=e34] [cursor=pointer]:
          - img [ref=e35]
        - text:    
      - generic [ref=e37]:
        - link "ホーム" [ref=e39] [cursor=pointer]:
          - /url: /
          - img [ref=e40]
          - generic [ref=e42]: ホーム
        - link "マイページ" [ref=e44] [cursor=pointer]:
          - /url: /user/dashboard/
          - img [ref=e45]
          - generic [ref=e48]: マイページ
        - generic [ref=e49]:
          - button "お気に入り" [ref=e50] [cursor=pointer]:
            - generic [ref=e51]: 
            - paragraph [ref=e52]:
              - text: お気に入り
              - generic [ref=e53]: 
          - text:  
        - generic [ref=e56]:
          - button "Avatar 無料会員 a*******************...さん " [ref=e57] [cursor=pointer]:
            - img "Avatar" [ref=e59]
            - generic [ref=e60]:
              - generic [ref=e61]: 無料会員
              - generic [ref=e62]: a*******************...さん
            - text: 
          - text:   
        - generic [ref=e66] [cursor=pointer]:
          - img [ref=e67]
          - generic [ref=e71]: ヘルプ
  - generic:      
  - generic [ref=e72]:
    - generic [ref=e74]:
      - button "画像で検索する" [ref=e75] [cursor=pointer]:
        - img [ref=e76]
      - generic [ref=e78]: 画像で検索する
    - separator [ref=e79]
    - generic [ref=e80]:
      - paragraph [ref=e81]: 画像から似ている画像を検索できます。
      - paragraph [ref=e82]: ※5MBまでのJPGまたはPNGファイルのみ
      - generic [ref=e83]:
        - listitem [ref=e84]:
          - img [ref=e85]
        - listitem [ref=e92]:
          - generic [ref=e93]: ファイルを選択
  - generic [ref=e94]:
    - button [ref=e96] [cursor=pointer]:
      - img [ref=e97]
    - generic [ref=e100]:
      - generic [ref=e101]:
        - button [ref=e102] [cursor=pointer]:
          - img [ref=e103]
        - textbox "キーワード（例：女性）" [ref=e106]
      - button "画像で検索" [ref=e109] [cursor=pointer]:
        - generic [ref=e110]: 
        - text: 画像で検索
    - separator [ref=e111]
    - generic [ref=e112]:
      - generic [ref=e113]: 並び順
      - generic [ref=e114]:
        - generic [ref=e115]:
          - radio "関連性の高い順" [checked] [ref=e116] [cursor=pointer]
          - generic [ref=e117] [cursor=pointer]: 関連性の高い順
        - generic [ref=e118]:
          - radio "新着順" [ref=e119] [cursor=pointer]
          - generic [ref=e120] [cursor=pointer]: 新着順
        - generic [ref=e121]:
          - radio "人気順" [disabled] [ref=e122] [cursor=pointer]
          - generic [ref=e123] [cursor=pointer]: 人気順
    - generic [ref=e125]:
      - generic [ref=e126]: カテゴリー
      - listbox [ref=e127]:
        - option "人物" [ref=e128]
        - option "ビジネス" [ref=e129]
        - option "動物・生き物" [ref=e130]
        - option "花・植物" [ref=e131]
        - option "食べ物・飲み物" [ref=e132]
        - option "町並み・建物" [ref=e133]
        - option "医療・福祉" [ref=e134]
        - option "交通・乗り物" [ref=e135]
        - option "季節・行事" [ref=e136]
        - option "自然・風景" [ref=e137]
        - option "スポーツ" [ref=e138]
        - option "エコ・環境" [ref=e139]
        - option "美容・健康" [ref=e140]
        - option "住宅・インテリア" [ref=e141]
        - option "年賀状" [ref=e142]
        - option "テクスチャ・背景" [ref=e143]
        - option "小物・雑貨" [ref=e144]
        - option "クレイアート" [ref=e145]
        - option "外国" [ref=e146]
        - option "ロマンティック" [ref=e147]
        - option "スプラッター" [ref=e148]
    - generic [ref=e150]:
      - generic [ref=e151]: 除外カテゴリー
      - listbox [ref=e152]:
        - option "人物" [ref=e153]
        - option "ビジネス" [ref=e154]
        - option "動物・生き物" [ref=e155]
        - option "花・植物" [ref=e156]
        - option "食べ物・飲み物" [ref=e157]
        - option "町並み・建物" [ref=e158]
        - option "医療・福祉" [ref=e159]
        - option "交通・乗り物" [ref=e160]
        - option "季節・行事" [ref=e161]
        - option "自然・風景" [ref=e162]
        - option "スポーツ" [ref=e163]
        - option "エコ・環境" [ref=e164]
        - option "美容・健康" [ref=e165]
        - option "住宅・インテリア" [ref=e166]
        - option "年賀状" [ref=e167]
        - option "テクスチャ・背景" [ref=e168]
        - option "小物・雑貨" [ref=e169]
        - option "クレイアート" [ref=e170]
        - option "外国" [ref=e171]
        - option "ロマンティック" [ref=e172]
        - option "スプラッター" [ref=e173]
    - generic [ref=e174]:
      - generic [ref=e175]: 除外キーワード
      - textbox "除外キーワードを入力" [ref=e176]
    - generic [ref=e178]:
      - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e179] [cursor=pointer]
      - generic [ref=e180] [cursor=pointer]: AI生成ツール使用素材を除く
    - separator [ref=e181]
    - generic [ref=e182]:
      - generic [ref=e183]: 縦長・横長の選択
      - generic [ref=e184]:
        - generic [ref=e185]:
          - radio "全て" [checked] [ref=e186] [cursor=pointer]
          - generic [ref=e187] [cursor=pointer]: 全て
        - generic [ref=e188]:
          - radio "縦長" [ref=e189] [cursor=pointer]
          - generic [ref=e190] [cursor=pointer]: 縦長
        - generic [ref=e191]:
          - radio "横長" [ref=e192] [cursor=pointer]
          - generic [ref=e193] [cursor=pointer]: 横長
    - generic [ref=e194]:
      - generic [ref=e195]: 画像種別
      - combobox [ref=e196]:
        - option "全ての画像" [selected]
        - option "Mediumサイズ以上がある"
        - option "Largeサイズがある"
        - option "PSDがある"
    - generic [ref=e197]:
      - generic [ref=e198]: クリエイター名
      - textbox "クリエイター名を入力" [ref=e199]
    - generic [ref=e200]:
      - generic [ref=e201]: 除外クリエイター名
      - textbox "除外クリエイター名を入力" [ref=e202]
    - generic [ref=e203]:
      - generic [ref=e204]: 素材ID
      - textbox "素材のIDを入力" [ref=e205]
    - generic [ref=e206]:
      - generic [ref=e207]: 色
      - generic [ref=e208]:
        - generic [ref=e209]:
          - radio "全て" [checked] [ref=e210] [cursor=pointer]
          - generic [ref=e211] [cursor=pointer]: 全て
        - generic [ref=e212]:
          - generic [ref=e213]:
            - button [ref=e215] [cursor=pointer]
            - button [ref=e217] [cursor=pointer]
            - button [ref=e219] [cursor=pointer]
            - button [ref=e221] [cursor=pointer]
            - button [ref=e223] [cursor=pointer]
          - generic [ref=e224]:
            - button [ref=e226] [cursor=pointer]
            - button [ref=e228] [cursor=pointer]
            - button [ref=e230] [cursor=pointer]
            - button [ref=e232] [cursor=pointer]
            - button [ref=e234] [cursor=pointer]
          - generic [ref=e235]:
            - button [ref=e237] [cursor=pointer]
            - button [ref=e239] [cursor=pointer]
            - button [ref=e241] [cursor=pointer]
            - button [ref=e243] [cursor=pointer]
    - generic [ref=e248]:
      - generic [ref=e249]: モデル人数
      - generic [ref=e250]:
        - generic [ref=e251]:
          - radio "全て" [checked] [ref=e252] [cursor=pointer]
          - generic [ref=e253] [cursor=pointer]: 全て
        - generic [ref=e254]:
          - radio "無人" [ref=e255] [cursor=pointer]
          - generic [ref=e256] [cursor=pointer]: 無人
        - generic [ref=e257]:
          - radio "1人" [ref=e258] [cursor=pointer]
          - generic [ref=e259] [cursor=pointer]: 1人
        - generic [ref=e260]:
          - radio "2人" [ref=e261] [cursor=pointer]
          - generic [ref=e262] [cursor=pointer]: 2人
        - generic [ref=e263]:
          - radio "3人以上" [ref=e264] [cursor=pointer]
          - generic [ref=e265] [cursor=pointer]: 3人以上
    - generic [ref=e266]:
      - generic [ref=e267]: モデル年代
      - combobox [ref=e268]:
        - option "全ての年代" [selected]
        - option "赤ちゃん"
        - option "子供"
        - option "若者"
        - option "大人"
        - option "中高年"
        - option "高齢者"
    - generic [ref=e269]:
      - generic [ref=e270]: モデルリリース
      - generic [ref=e271]:
        - generic [ref=e272]:
          - radio "全て" [checked] [ref=e273] [cursor=pointer]
          - generic [ref=e274] [cursor=pointer]: 全て
        - generic [ref=e275]:
          - radio "取得済のみ" [ref=e276] [cursor=pointer]
          - generic [ref=e277] [cursor=pointer]: 取得済のみ
    - generic [ref=e278]:
      - generic [ref=e279]: プロパティリリース
      - generic [ref=e280]:
        - generic [ref=e281]:
          - radio "全て" [checked] [ref=e282] [cursor=pointer]
          - generic [ref=e283] [cursor=pointer]: 全て
        - generic [ref=e284]:
          - radio "取得済のみ" [ref=e285] [cursor=pointer]
          - generic [ref=e286] [cursor=pointer]: 取得済のみ
    - generic [ref=e287]:
      - generic [ref=e289] [cursor=pointer]: 完全一致
      - checkbox "完全一致" [ref=e291] [cursor=pointer]
    - button "検 索" [ref=e293] [cursor=pointer]
  - text:     
  - generic [ref=e294]:
    - generic [ref=e296]:
      - text:  
      - generic [ref=e297]:
        - generic "プレミアム会員登録" [ref=e298]:
          - link "ユーザープレミアムメンバーシップ" [ref=e299] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
            - img "ユーザープレミアムメンバーシップ" [ref=e300]
        - link "ダウンロード 履歴" [ref=e302] [cursor=pointer]:
          - /url: /user/downloads
          - img [ref=e304]
          - generic [ref=e307]:
            - text: ダウンロード
            - text: 履歴
        - link "ライセンス まとめて購入" [ref=e309] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e311]
          - generic [ref=e315]:
            - text: ライセンス
            - text: まとめて購入
        - link "まとめて ダウンロード" [ref=e318] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e320]
          - generic [ref=e324]:
            - text: まとめて
            - text: ダウンロード
    - generic [ref=e325]:
      - generic [ref=e329]:
        - generic [ref=e330]:
          - link "3DAYゲリラセール" [ref=e332] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/premium/campaign?utm_source=photoac&utm_medium=internal&utm_campaign=coupon4451&utm_content=banner_300x250
            - img "3DAYゲリラセール" [ref=e333]
          - generic [ref=e334]:
            - heading "写真素材メニュー" [level=4] [ref=e335]
            - button "写真カテゴリー" [ref=e337] [cursor=pointer]:
              - text: 写真カテゴリー
              - generic [ref=e338]: 
            - link "人気写真ランキング" [ref=e340] [cursor=pointer]:
              - /url: /ranking
            - link "モデルから写真を検索" [ref=e342] [cursor=pointer]:
              - /url: /models/
            - link "おすすめ特集一覧" [ref=e344] [cursor=pointer]:
              - /url: /pickup/1
            - link "新着写真一覧" [ref=e346] [cursor=pointer]:
              - /url: /main/latest
            - link "公開中のコレクション" [ref=e348] [cursor=pointer]:
              - /url: /main/collections
          - generic [ref=e349]:
            - heading "画像生成AI" [level=4] [ref=e350]
            - link "AC写真AIラボ NEW" [ref=e352] [cursor=pointer]:
              - /url: /image-generator/
              - text: AC写真AIラボ
              - generic [ref=e353]: NEW
            - link "AI人物素材" [ref=e355] [cursor=pointer]:
              - /url: /main/genface
          - generic [ref=e356]:
            - heading "クリエイターメニュー" [level=4] [ref=e357]
            - link "クリエイター投稿（新規登録）" [ref=e359] [cursor=pointer]:
              - /url: /creator/auth/register
            - link "クリエイターログイン" [ref=e361] [cursor=pointer]:
              - /url: "#"
            - link "ポイント換金ランキング" [ref=e363] [cursor=pointer]:
              - /url: /ranking/prize
            - link "クリエイター一覧" [ref=e365] [cursor=pointer]:
              - /url: /creators/
          - generic [ref=e366]:
            - heading "プレミアム会員サービス" [level=4] [ref=e367]
            - link "プレミアム会員登録" [ref=e369] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
            - link "法人・複数名向けプラン" [ref=e371] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/premium/business
            - link "商品化ライセンス" [ref=e373] [cursor=pointer]:
              - /url: /main/extra_license_terms
            - link "あんしんサポート" [ref=e375] [cursor=pointer]:
              - /url: /indemnity/
          - generic [ref=e376]:
            - heading "ヘルプ＆ガイド" [level=4] [ref=e377]
            - link "写真ACとは" [ref=e379] [cursor=pointer]:
              - /url: /main/guide/#group-site
            - link "写真の権利" [ref=e381] [cursor=pointer]:
              - /url: /main/rights
            - link "ヘルプ" [ref=e383] [cursor=pointer]:
              - /url: https://help.freebie-ac.jp
            - link "利用規約" [ref=e385] [cursor=pointer]:
              - /url: /main/terms
          - link "Interview" [ref=e389] [cursor=pointer]:
            - /url: /interview
            - img "Interview" [ref=e390]
          - generic [ref=e391]:
            - heading "おすすめ無料サービス" [level=4] [ref=e392]
            - link "デザインテンプレート" [ref=e394] [cursor=pointer]:
              - /url: https://www.design-ac.net/
              - text: デザインテンプレート
              - generic [ref=e395]: 
            - link "ファイル転送・共有" [ref=e397] [cursor=pointer]:
              - /url: https://ac-data.info/
              - text: ファイル転送・共有
              - generic [ref=e398]: 
            - link "今日の運勢" [ref=e400] [cursor=pointer]:
              - /url: https://uranai-ac.com/
              - text: 今日の運勢
              - generic [ref=e401]: 
            - link "プレゼン資料作成AI" [ref=e403] [cursor=pointer]:
              - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
              - text: プレゼン資料作成AI
              - generic [ref=e404]: 
          - iframe [ref=e405]:
            - generic [active] [ref=f4e1]:
              - generic "YouTube Video Player" [ref=f4e3]:
                - alert [ref=f4e5]:
                  - generic [ref=f4e6]:
                    - generic [ref=f4e7]:
                      - img
                    - generic [ref=f4e9]: Sign in to confirm you’re not a bot
                  - link "Visit YouTube to search for more videos" [ref=f4e10] [cursor=pointer]:
                    - /url: https://www.youtube.com
                    - img
              - dialog "Sign in to confirm you’re not a bot" [ref=f4e12]:
                - generic [ref=f4e15]:
                  - img "YouTube Logo" [ref=f4e16]
                  - generic [ref=f4e17]: Sign in to confirm you’re not a bot
                  - generic [ref=f4e18]: This helps protect our community
                  - generic [ref=f4e19]:
                    - link "Sign in" [ref=f4e21] [cursor=pointer]:
                      - /url: https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26hl%3Den&hl=en
                      - generic [ref=f4e22]: Sign in
                    - link "Learn more" [ref=f4e27] [cursor=pointer]:
                      - /url: https://support.google.com/youtube/answer/3037019#zippy=%2Ccheck-that-youre-signed-into-youtube
                      - generic [ref=f4e28]: Learn more
          - generic [ref=e406]:
            - heading "人気キーワード（タグ）" [level=4] [ref=e407]:
              - button "人気キーワード（タグ）" [ref=e408] [cursor=pointer]:
                - text: 人気キーワード（タグ）
                - generic [ref=e409]: 
            - generic [ref=e410]:
              - generic [ref=e411]:
                - link "ビジネス" [ref=e412] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
                - link "女性" [ref=e413] [cursor=pointer]:
                  - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
                - link "紅葉" [ref=e414] [cursor=pointer]:
                  - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
                - link "cat" [ref=e415] [cursor=pointer]:
                  - /url: /main/search?q=cat&utm_source=top_keyword
                - link "背景" [ref=e416] [cursor=pointer]:
                  - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "学生" [ref=e417] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%A6%E7%94%9F&utm_source=top_keyword
                - link "flower" [ref=e418] [cursor=pointer]:
                  - /url: /main/search?q=flower&utm_source=top_keyword
                - link "和紙" [ref=e419] [cursor=pointer]:
                  - /url: /main/search?q=%E5%92%8C%E7%B4%99&utm_source=top_keyword
                - link "空" [ref=e420] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A9%BA&utm_source=top_keyword
                - link "cats" [ref=e421] [cursor=pointer]:
                  - /url: /main/search?q=cats&utm_source=top_keyword
                - link "秋" [ref=e422] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&utm_source=top_keyword
                - link "クリスマス" [ref=e423] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9&utm_source=top_keyword
                - link "ハロウィン" [ref=e424] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&utm_source=top_keyword
                - link "モノクロ" [ref=e425] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%A2%E3%83%8E%E3%82%AF%E3%83%AD&utm_source=top_keyword
                - link "11月" [ref=e426] [cursor=pointer]:
                  - /url: /main/search?q=11%E6%9C%88&utm_source=top_keyword
                - link "青空" [ref=e427] [cursor=pointer]:
                  - /url: /main/search?q=%E9%9D%92%E7%A9%BA&utm_source=top_keyword
                - link "お正月" [ref=e428] [cursor=pointer]:
                  - /url: /main/search?q=%E3%81%8A%E6%AD%A3%E6%9C%88&utm_source=top_keyword
                - link "家族" [ref=e429] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AE%B6%E6%97%8F&utm_source=top_keyword
                - link "パソコン" [ref=e430] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&utm_source=top_keyword
                - link "オフィス" [ref=e431] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&utm_source=top_keyword
                - link "クリスマス 背景" [ref=e432] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "猫" [ref=e433] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8C%AB&utm_source=top_keyword
                - link "リビング" [ref=e434] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%AA%E3%83%93%E3%83%B3%E3%82%B0&utm_source=top_keyword
                - link "赤ちゃん" [ref=e435] [cursor=pointer]:
                  - /url: /main/search?q=%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&utm_source=top_keyword
                - link "子供" [ref=e436] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%90%E4%BE%9B&utm_source=top_keyword
                - link "虹色 背景" [ref=e437] [cursor=pointer]:
                  - /url: /main/search?q=%E8%99%B9%E8%89%B2+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "犬" [ref=e438] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8A%AC&utm_source=top_keyword
                - link "sky" [ref=e439] [cursor=pointer]:
                  - /url: /main/search?q=sky&utm_source=top_keyword
                - link "子ども" [ref=e440] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%90%E3%81%A9%E3%82%82&utm_source=top_keyword
                - link "建物" [ref=e441] [cursor=pointer]:
                  - /url: /main/search?q=%E5%BB%BA%E7%89%A9&utm_source=top_keyword
                - link "花" [ref=e442] [cursor=pointer]:
                  - /url: /main/search?q=%E8%8A%B1&utm_source=top_keyword
                - link "カフェ テーブル" [ref=e443] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7%E3%80%80%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB&utm_source=top_keyword
                - link "観葉植物 インテリア" [ref=e444] [cursor=pointer]:
                  - /url: /main/search?q=%E8%A6%B3%E8%91%89%E6%A4%8D%E7%89%A9+%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&utm_source=top_keyword
                - link "無料" [ref=e445] [cursor=pointer]:
                  - /url: /main/search?q=%E7%84%A1%E6%96%99&utm_source=top_keyword
                - link "クリスマス 背景" [ref=e446] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "木目" [ref=e447] [cursor=pointer]:
                  - /url: /main/search?q=%E6%9C%A8%E7%9B%AE&utm_source=top_keyword
                - link "スマホ" [ref=e448] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%B9%E3%83%9E%E3%83%9B&utm_source=top_keyword
                - link "桜" [ref=e449] [cursor=pointer]:
                  - /url: /main/search?q=%E6%A1%9C&utm_source=top_keyword
                - link "風景" [ref=e450] [cursor=pointer]:
                  - /url: /main/search?q=%E9%A2%A8%E6%99%AF&utm_source=top_keyword
                - link "office" [ref=e451] [cursor=pointer]:
                  - /url: /main/search?q=office&utm_source=top_keyword
                - link "テクスチャ" [ref=e452] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3&utm_source=top_keyword
                - link "工場" [ref=e453] [cursor=pointer]:
                  - /url: /main/search?q=%E5%B7%A5%E5%A0%B4&utm_source=top_keyword
                - link "部屋" [ref=e454] [cursor=pointer]:
                  - /url: /main/search?q=%E9%83%A8%E5%B1%8B&utm_source=top_keyword
                - link "沖縄" [ref=e455] [cursor=pointer]:
                  - /url: /main/search?q=%E6%B2%96%E7%B8%84&utm_source=top_keyword
                - link "さつまいも" [ref=e456] [cursor=pointer]:
                  - /url: /main/search?q=%E3%81%95%E3%81%A4%E3%81%BE%E3%81%84%E3%82%82&utm_source=top_keyword
                - link "カフェ" [ref=e457] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7&utm_source=top_keyword
                - link "自然" [ref=e458] [cursor=pointer]:
                  - /url: /main/search?q=%E8%87%AA%E7%84%B6&utm_source=top_keyword
                - link "雲" [ref=e459] [cursor=pointer]:
                  - /url: /main/search?q=%E9%9B%B2&utm_source=top_keyword
                - link "新生活" [ref=e460] [cursor=pointer]:
                  - /url: /main/search?q=%E6%96%B0%E7%94%9F%E6%B4%BB&utm_source=top_keyword
                - link "海" [ref=e461] [cursor=pointer]:
                  - /url: /main/search?q=%E6%B5%B7&utm_source=top_keyword
              - paragraph [ref=e462]:
                - button "もっと見る" [ref=e463] [cursor=pointer]:
                  - text: もっと見る
                  - generic [ref=e464]: 
                - text: 
          - generic [ref=e465]:
            - heading "メディア" [level=4] [ref=e466]
            - heading "テレビでご紹介いただきました！" [level=4] [ref=e467]
            - paragraph [ref=e468]: かんさい情報ネット ten. | 読売テレビ
          - heading "ブログ" [level=4] [ref=e470]
          - generic [ref=e471]:
            - heading "SNS" [level=4] [ref=e472]
            - link "ACワークス公式 X" [ref=e474] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
            - link "Mr.ビー X" [ref=e476] [cursor=pointer]:
              - /url: https://x.com/mrb_ac
        - generic [ref=e477]:
          - generic [ref=e478]:
            - navigation "breadcrumb" [ref=e479]:
              - list [ref=e480]:
                - listitem [ref=e481]:
                  - link "写真AC" [ref=e482] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e483]:
                  - text: /
                  - link "人物" [ref=e484] [cursor=pointer]:
                    - /url: /main/search?c_id=1&c_name=%E4%BA%BA%E7%89%A9&referer=c_search
                - listitem [ref=e485]: / ソファーでVRゴーグルをつけている男性5
              - list [ref=e486]:
                - listitem [ref=e487]:
                  - link "写真AC" [ref=e488] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e489]:
                  - text: /
                  - link "小物・雑貨" [ref=e490] [cursor=pointer]:
                    - /url: /main/search?c_id=18&c_name=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&referer=c_search
                - listitem [ref=e491]: / ソファーでVRゴーグルをつけている男性5
            - separator [ref=e492]
          - heading "写真素材：ソファーでVRゴーグルをつけている男性5" [level=1] [ref=e494]
          - generic [ref=e495]:
            - generic [ref=e497]:
              - generic [ref=e498]:
                - img "ソファーでVRゴーグルをつけている男性5 男性,vr,外国人の写真素材" [ref=e502]
                - generic [ref=e504]:
                  - generic [ref=e505]:
                    - generic [ref=e506]:
                      - button "ボタンブックマーク" [ref=e508] [cursor=pointer]:
                        - generic [ref=e509]: 
                      - generic [ref=e510]:
                        - button "ボタンのような" [ref=e511] [cursor=pointer]:
                          - generic [ref=e512]: 
                        - paragraph [ref=e513]: "444"
                      - button "ボタンシェア" [ref=e515] [cursor=pointer]:
                        - generic [ref=e516]: 
                      - generic [ref=e517]:
                        - button "ボタンファン" [ref=e518] [cursor=pointer]:
                          - generic [ref=e519]: 
                        - paragraph [ref=e520]: 16,668
                    - text:   
                  - generic [ref=e522]:
                    - text: "作者:"
                    - link "ACworks" [ref=e523] [cursor=pointer]:
                      - /url: /profile/43626
              - generic [ref=e525]:
                - paragraph [ref=e526]: おすすめテンプレートでデザイン作成しませんか？
                - generic [ref=e527]:
                  - generic:
                    - text: 
                    - button "Next" [ref=e562] [cursor=pointer]:
                      - generic [ref=e563]: 
            - generic [ref=e564]:
              - button "広告を非表示にする 広告を非表示にする" [ref=e570] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e571]
                - generic [ref=e572]: 広告を非表示にする
              - generic [ref=e573]:
                - link "※プレミアムサービスなら制限なしで使い放題！今だけ35%OFF" [ref=e575] [cursor=pointer]:
                  - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai&utm_source=photoac&utm_medium=internal&utm_campaign=freeuser_download_page&utm_content=text_link&utm_id=260325
                - generic [ref=e578]:
                  - generic [ref=e579]:
                    - generic [ref=e581]:
                      - paragraph [ref=e583]: s
                      - paragraph [ref=e584]: JPEG 0.42M
                      - paragraph [ref=e585]: 640x640px
                    - generic [ref=e587]:
                      - generic [ref=e588]:
                        - paragraph [ref=e589]: m
                        - generic [ref=e590]: 660円
                      - paragraph [ref=e591]: JPEG 2.71M
                      - paragraph [ref=e592]: 1920x1920px
                    - generic [ref=e594]:
                      - generic [ref=e595]:
                        - paragraph [ref=e596]: l
                        - generic [ref=e597]: 1320円
                      - paragraph [ref=e598]: JPEG 0.55M
                      - paragraph [ref=e599]: 1024x1024px
                  - generic [ref=e600]:
                    - img "こちらはプレミアム会員限定のプレミアム素材です。M/Lは単品購入のみ可能です。無制限でダウンロードしたい場合は" [ref=e601]
                    - generic [ref=e602]:
                      - text: こちらはプレミアム会員限定のプレミアム素材です。M/Lは単品購入のみ可能です。無制限でダウンロードしたい場合は
                      - link "こちら" [ref=e603] [cursor=pointer]:
                        - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                  - paragraph [ref=e604]:
                    - button "ダウンロード" [ref=e605] [cursor=pointer]:
                      - img [ref=e606]
                      - text: ダウンロード
                  - paragraph [ref=e610]: 視聴後、広告を閉じると素材ページに移動します。
                  - paragraph [ref=e611]:
                    - generic [ref=e612]: 
                    - text: 音声入りの動画広告が再生される場合があります。
                  - paragraph [ref=e613]:
                    - link "すぐダウンロードする方法は？" [ref=e614] [cursor=pointer]:
                      - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - text:    
                - generic [ref=e615]:
                  - separator [ref=e616]
                  - link "利用禁止事項" [ref=e617] [cursor=pointer]:
                    - /url: "#"
                  - text: ｜
                  - link "素材の利用方法" [ref=e618] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/detail/36
                  - text: ｜
                  - link "被写体の権利について" [ref=e619] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/detail/466
                - generic [ref=e620]:
                  - separator [ref=e621]
                  - generic [ref=e622]:
                    - generic [ref=e623]:
                      - generic [ref=e624]: L
                      - generic [ref=e625]: 商品化ライセンス
                    - link "商品化ライセンスとは？" [ref=e626] [cursor=pointer]:
                      - /url: /main/extra_license_terms
                  - generic [ref=e627]:
                    - link "今すぐ購入" [ref=e628] [cursor=pointer]:
                      - /url: javascript:void(0)
                      - img [ref=e629]
                      - text: 今すぐ購入
                    - link [ref=e634] [cursor=pointer]:
                      - /url: javascript:void(0)
                      - img [ref=e635]
                  - paragraph [ref=e639]:
                    - text: テンプレートなどの商品販売ができるライセンスです。
                    - text: あなたのビジネスにご活用ください。
                - link " あなたの撮った写真がお金になる 写真ACクリエイター登録はこちら>" [ref=e641] [cursor=pointer]:
                  - /url: /creator/auth/register
                  - generic [ref=e642]: 
                  - generic [ref=e643]:
                    - text: あなたの撮った写真がお金になる
                    - paragraph [ref=e644]: 写真ACクリエイター登録はこちら>
          - text:  
          - button "広告を非表示にする 広告を非表示にする" [ref=e650] [cursor=pointer]:
            - img "広告を非表示にする" [ref=e651]
            - generic [ref=e652]: 広告を非表示にする
          - heading "関連写真" [level=2] [ref=e654]
          - generic [ref=e656]:
            - generic [ref=e658]:
              - link "ソファーでVRゴーグルをつけている男性4" [ref=e660] [cursor=pointer]:
                - /url: /main/detail/1651211
                - img "ソファーでVRゴーグルをつけている男性4" [ref=e661]
              - link "ソファーにもたれてVRゴーグルをつけてノートパソコンを使う男性11" [ref=e663] [cursor=pointer]:
                - /url: /main/detail/1651307
                - img "ソファーにもたれてVRゴーグルをつけてノートパソコンを使う男性11" [ref=e664]
              - link "ソファーでVRゴーグルをつけている男性6" [ref=e666] [cursor=pointer]:
                - /url: /main/detail/1651239
                - img "ソファーでVRゴーグルをつけている男性6" [ref=e667]
              - link "ソファに座って小さいスケッチブックを持つ若い女性" [ref=e669] [cursor=pointer]:
                - /url: /main/detail/4653673
                - img "ソファに座って小さいスケッチブックを持つ若い女性" [ref=e670]
              - link "ベッドでVRゴーグルをつけている男性18" [ref=e672] [cursor=pointer]:
                - /url: /main/detail/1651287
                - img "ベッドでVRゴーグルをつけている男性18" [ref=e673]
              - link "ソファーでVRゴーグルをつけてノートパソコンを使う男性" [ref=e675] [cursor=pointer]:
                - /url: /main/detail/1651183
                - img "ソファーでVRゴーグルをつけてノートパソコンを使う男性" [ref=e676]
              - link "床に座ってVRゴーグルをつけてノートパソコンを使う男性2" [ref=e678] [cursor=pointer]:
                - /url: /main/detail/1651230
                - img "床に座ってVRゴーグルをつけてノートパソコンを使う男性2" [ref=e679]
              - link "室内のソファーに座ってくつろぐ欧米の男性" [ref=e681] [cursor=pointer]:
                - /url: /main/detail/4765945
                - img "室内のソファーに座ってくつろぐ欧米の男性" [ref=e682]
              - link "ソファーに座っている若い女性" [ref=e684] [cursor=pointer]:
                - /url: /main/detail/4611809
                - img "ソファーに座っている若い女性" [ref=e685]
              - link "ソファーに座っている若い女性" [ref=e687] [cursor=pointer]:
                - /url: /main/detail/4611810
                - img "ソファーに座っている若い女性" [ref=e688]
            - generic:
              - text: 
              - button "次のデザイン" [ref=e689] [cursor=pointer]:
                - generic [ref=e690]: 
          - generic [ref=e691]:
            - generic [ref=e692]:
              - generic [ref=e694]:
                - generic [ref=e695]:
                  - heading "この写真について" [level=3] [ref=e696]
                  - generic [ref=e697]:
                    - generic [ref=e699]: タイトル：ソファーでVRゴーグルをつけている男性5
                    - generic [ref=e701]:
                      - text: 作者：
                      - link "ACworks" [ref=e702] [cursor=pointer]:
                        - /url: /profile/43626
                      - text: さん
                  - generic [ref=e703]:
                    - generic [ref=e705]: 写真のID：1651238
                    - generic [ref=e707]: ダウンロード：1,081回
                  - generic [ref=e708]:
                    - generic [ref=e709]:
                      - generic [ref=e712]: 
                      - generic [ref=e713]: SAFETY
                    - paragraph [ref=e714]:
                      - text: この写真素材は
                      - link "ACworksさん" [ref=e715] [cursor=pointer]:
                        - /url: /profile/43626
                      - text: 本人が制作したことを承認し、安全にご利用いただけることを確認しています。
                  - generic [ref=e718]:
                    - paragraph [ref=e719]: 本人確認： 本人確認済
                    - paragraph [ref=e720]:
                      - text: この写真素材の投稿者
                      - link "ACworks" [ref=e721] [cursor=pointer]:
                        - /url: /profile/43626
                      - text: さんは、本人確認が済んでいるクリエイターです。
                  - generic [ref=e725]:
                    - generic [ref=e726]: タグ：
                    - link "男性" [ref=e727] [cursor=pointer]:
                      - /url: /main/search?q=%E7%94%B7%E6%80%A7&utm_source=tag
                    - link "vr" [ref=e728] [cursor=pointer]:
                      - /url: /main/search?q=vr&utm_source=tag
                    - link "外国人" [ref=e729] [cursor=pointer]:
                      - /url: /main/search?q=%E5%A4%96%E5%9B%BD%E4%BA%BA&utm_source=tag
                    - link "vrゴーグル" [ref=e730] [cursor=pointer]:
                      - /url: /main/search?q=vr%E3%82%B4%E3%83%BC%E3%82%B0%E3%83%AB&utm_source=tag
                    - link "vrメガネ" [ref=e731] [cursor=pointer]:
                      - /url: /main/search?q=vr%E3%83%A1%E3%82%AC%E3%83%8D&utm_source=tag
                    - link "手を挙げる" [ref=e732] [cursor=pointer]:
                      - /url: /main/search?q=%E6%89%8B%E3%82%92%E6%8C%99%E3%81%92%E3%82%8B&utm_source=tag
                    - link "手をかざす" [ref=e733] [cursor=pointer]:
                      - /url: /main/search?q=%E6%89%8B%E3%82%92%E3%81%8B%E3%81%96%E3%81%99&utm_source=tag
                    - link "触る" [ref=e734] [cursor=pointer]:
                      - /url: /main/search?q=%E8%A7%A6%E3%82%8B&utm_source=tag
                    - link "室内" [ref=e735] [cursor=pointer]:
                      - /url: /main/search?q=%E5%AE%A4%E5%86%85&utm_source=tag
                    - link "部屋" [ref=e736] [cursor=pointer]:
                      - /url: /main/search?q=%E9%83%A8%E5%B1%8B&utm_source=tag
                    - link "ソファー" [ref=e737] [cursor=pointer]:
                      - /url: /main/search?q=%E3%82%BD%E3%83%95%E3%82%A1%E3%83%BC&utm_source=tag
                    - link "座る" [ref=e738] [cursor=pointer]:
                      - /url: /main/search?q=%E5%BA%A7%E3%82%8B&utm_source=tag
                    - link "バーチャルリアリティ" [ref=e739] [cursor=pointer]:
                      - /url: /main/search?q=%E3%83%90%E3%83%BC%E3%83%81%E3%83%A3%E3%83%AB%E3%83%AA%E3%82%A2%E3%83%AA%E3%83%86%E3%82%A3&utm_source=tag
                    - link "ゲーム" [ref=e740] [cursor=pointer]:
                      - /url: /main/search?q=%E3%82%B2%E3%83%BC%E3%83%A0&utm_source=tag
                    - link "欧米人" [ref=e741] [cursor=pointer]:
                      - /url: /main/search?q=%E6%AC%A7%E7%B1%B3%E4%BA%BA&utm_source=tag
                    - link "白人" [ref=e742] [cursor=pointer]:
                      - /url: /main/search?q=%E7%99%BD%E4%BA%BA&utm_source=tag
                    - link "vrめがね" [ref=e743] [cursor=pointer]:
                      - /url: /main/search?q=vr%E3%82%81%E3%81%8C%E3%81%AD&utm_source=tag
                    - link "vr眼鏡" [ref=e744] [cursor=pointer]:
                      - /url: /main/search?q=vr%E7%9C%BC%E9%8F%A1&utm_source=tag
                    - link "img_9203.jpg" [ref=e745] [cursor=pointer]:
                      - /url: /main/search?q=img_9203.jpg&utm_source=tag
                    - link "ba86ff99196b4d7" [ref=e746] [cursor=pointer]:
                      - /url: /main/search?q=ba86ff99196b4d7&utm_source=tag
                    - link "人物" [ref=e747] [cursor=pointer]:
                      - /url: /main/search?q=%E4%BA%BA%E7%89%A9&utm_source=tag
                    - link "小物・雑貨" [ref=e748] [cursor=pointer]:
                      - /url: /main/search?q=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&utm_source=tag
                    - link "1651238" [ref=e749] [cursor=pointer]:
                      - /url: /main/search?q=1651238&utm_source=tag
                    - link "acworks" [ref=e750] [cursor=pointer]:
                      - /url: /main/search?q=acworks&utm_source=tag
                    - link "43626" [ref=e751] [cursor=pointer]:
                      - /url: /main/search?q=43626&utm_source=tag
                    - link "ソファーでvrゴーグルをつけて" [ref=e752] [cursor=pointer]:
                      - /url: /main/search?q=%E3%82%BD%E3%83%95%E3%82%A1%E3%83%BC%E3%81%A7vr%E3%82%B4%E3%83%BC%E3%82%B0%E3%83%AB%E3%82%92%E3%81%A4%E3%81%91%E3%81%A6&utm_source=tag
                    - button "全て表示 ≫" [ref=e753] [cursor=pointer]
                  - generic [ref=e755]:
                    - link "素材の不具合報告" [ref=e756] [cursor=pointer]:
                      - /url: "#"
                      - generic [ref=e757]:
                        - img [ref=e758]
                        - text: 素材の不具合報告
                    - link "violation_icon 違反報告" [ref=e759] [cursor=pointer]:
                      - /url: "#"
                      - generic [ref=e760]:
                        - img "violation_icon" [ref=e761]
                        - text: 違反報告
                - generic [ref=e763]:
                  - generic [ref=e764]:
                    - generic [ref=e766]:
                      - paragraph [ref=e767]:
                        - strong [ref=e768]: ACworksさんをビットコインで応援しよう!
                      - generic [ref=e769]:
                        - img "creator_icon" [ref=e771]
                        - img "bitcoin_icon" [ref=e773]
                        - img "default_avatar" [ref=e775]
                    - link "bitcoin_icon ビットコインアドレス を確認" [ref=e777] [cursor=pointer]:
                      - /url: "#"
                      - generic [ref=e778]:
                        - img "bitcoin_icon" [ref=e779]
                        - paragraph [ref=e780]:
                          - strong [ref=e781]:
                            - text: ビットコインアドレス
                            - text: を確認
                  - link "ビットコインとは？" [ref=e783] [cursor=pointer]:
                    - /url: /main/bitcoin_description_downloader
                    - text: ビットコインとは？
                    - generic [ref=e784]: 
              - button "広告を非表示にする 広告を非表示にする" [ref=e791] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e792]
                - generic [ref=e793]: 広告を非表示にする
            - generic [ref=e795]: 写真ACグループサイトの「ソファーでVRゴーグルをつけている男性5」の関連検索結果（同じアカウントで無料ダウンロードできます）
            - generic [ref=e796]:
              - img "preloader_design" [ref=e799]
              - separator [ref=e800]
              - img "preloader_ill" [ref=e803]
              - separator [ref=e804]
              - img "preloader_slh" [ref=e807]
              - separator [ref=e808]
              - img "preloader_video" [ref=e811]
          - text:  
      - contentinfo [ref=e813]:
        - generic [ref=e816]:
          - generic [ref=e817]: 昨日のダウンロード数：24,029
          - generic [ref=e818]: 先月のダウンロード数：1,124,624
          - generic [ref=e819]: 総会員数：1600万人を突破しました
        - generic [ref=e821]:
          - generic [ref=e822]:
            - generic [ref=e823]:
              - generic [ref=e824]: 写真ACについて 
              - list [ref=e825]:
                - listitem [ref=e826]:
                  - link "写真ACとは" [ref=e827] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e828]:
                  - link "運営会社" [ref=e829] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e830]:
                  - link "個人情報保護方針" [ref=e831] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e832]:
                  - link "特定個人情報基本方針" [ref=e833] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e834]:
                  - link "特定商取引法に基づく表記" [ref=e835] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e836]:
                  - link "サイトマップ" [ref=e837] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e838]:
                  - link "セキュリティポリシー" [ref=e839] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e840]:
              - generic [ref=e841]: 会員登録 
              - list [ref=e842]:
                - listitem [ref=e843]:
                  - link "無料会員登録" [ref=e844] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fdetail%252F1651238&lang=jp
                - listitem [ref=e845]:
                  - link "プレミアム会員登録" [ref=e846] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e847]:
                  - link "無料クリエイター会員登録" [ref=e848] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e849]:
              - generic [ref=e850]: プレミアム会員サービス 
              - list [ref=e851]:
                - listitem [ref=e852]:
                  - link "プレミアム会員登録" [ref=e853] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e854]:
                  - link "法人・複数名向けプラン" [ref=e855] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e856]:
                  - link "商品化ライセンス" [ref=e857] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e858]:
                  - link "あんしんサポート" [ref=e859] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e860]:
              - generic [ref=e861]: ヘルプ＆ガイド 
              - list [ref=e862]:
                - listitem [ref=e863]:
                  - link "ヘルプ" [ref=e864] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e865]:
                  - link "利用規約" [ref=e866] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e867]:
                  - link "プレミアム会員利用規約" [ref=e868] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e869]:
                  - link "AC写真AIラボ利用規約" [ref=e870] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e871]:
              - generic [ref=e872]: グループサイト 
              - list [ref=e873]:
                - listitem [ref=e874]:
                  - link "イラストAC" [ref=e875] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e876]:
                  - link "シルエットAC" [ref=e877] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e878]:
                  - link "フリービーAC" [ref=e879] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e880]:
                  - link "年賀状AC" [ref=e881] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e882]:
                  - link "動画AC" [ref=e883] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e884]:
                  - link "デザインAC" [ref=e885] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e886]:
                  - link "ACデータ" [ref=e887] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e888]:
                  - link "明細AC" [ref=e889] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e890]:
            - link "twitter_btn" [ref=e891] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e892]:
                - img [ref=e893]
            - link "facebook_btn" [ref=e895] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e896]:
                - generic [ref=e897]: 
            - link "pinterest_btn" [ref=e898] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e899]:
                - generic [ref=e900]: 
            - link "blog_btn" [ref=e901] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e902]:
                - generic [ref=e903]: 
            - link "feedback_modal_btn" [ref=e904] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e905]:
                - generic [ref=e906]: 
                - text: ご意見・ご要望
          - generic [ref=e908]:
            - text: © 2011-2026
            - link "写真AC" [ref=e909] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
  - link:
    - /url: ""
  - link:
    - /url: ""
  - text:   
  - alert:  
  - tooltip "まとめて購入" [ref=e910]:
    - generic [ref=e912]: まとめて購入
```

# Test source

```ts
  359 |       ]);
  360 | 
  361 |       return newPage;
  362 |     });
  363 |   }
  364 | 
  365 |   // First Download & Campaign Offer Methods
  366 |   /**
  367 |    * Dismiss any survey, advertisement or announcement modals that may block user clicks.
  368 |    */
  369 |   async dismissInterferingModals(): Promise<void> {
  370 |     // 1. Dismiss Photo AI Lab or generic promotion modals if visible
  371 |     const promoClose = this.page.locator(
  372 |       '#btn-close-photo-ai-lab, .photo-ai-lab-modal-close, #photo-ai-lab-modal button:has-text("閉じる"), #photo-ai-lab-modal .close, #photo-ai-lab-modal [aria-label="Close"], [role="region"][aria-label="Close"]'
  373 |     );
  374 |     if (await promoClose.first().isVisible().catch(() => false)) {
  375 |       await promoClose.first().click({ force: true }).catch(() => {});
  376 |     }
  377 | 
  378 |     // 2. Survey modal
  379 |     const surveyClose = this.page.locator(
  380 |       '#surveyGroup button.close, #surveyGroup .close, #surveyGroup button:has-text("Close"), #surveyGroup button:has-text("×")'
  381 |     );
  382 |     if (await surveyClose.first().isVisible().catch(() => false)) {
  383 |       await surveyClose.first().click({ force: true }).catch(() => {});
  384 |     }
  385 | 
  386 |     // 3. Any interfering modal currently shown (except timerModal and firstDownloadedModal)
  387 |     const activeModalClose = this.page.locator(
  388 |       'div.modal.show:not(#timerModal):not(#firstDownloadedModal) button:has-text("閉じる"), div.modal.show:not(#timerModal):not(#firstDownloadedModal) .close, dialog [aria-label*="Close"], [role="region"][aria-label="Close"], [aria-label*="Close"] img, .icon-close'
  389 |     );
  390 |     if (await activeModalClose.first().isVisible().catch(() => false)) {
  391 |       await activeModalClose.first().click({ force: true }).catch(() => {});
  392 |     }
  393 | 
  394 |     // 4. Fallback: Press Escape to close any open dialogs
  395 |     await this.page.keyboard.press('Escape').catch(() => {});
  396 |   }
  397 | 
  398 |   /**
  399 |    * Execute full download flow for Free User:
  400 |    * 1. Dismiss initial interference overlays if any.
  401 |    * 2. Click main download button to launch timer modal.
  402 |    * 3. Handle Google Rewarded Ad / Interstitial overlay if present (including cross-origin safeframe close button).
  403 |    * 4. Select requested size (S, M, or L) in timer modal.
  404 |    * 5. Wait for countdown completion and trigger download.
  405 |    * @param size - 'S' | 'M' | 'L' (defaults to 'S')
  406 |    * @returns Playwright Download object
  407 |    */
  408 |   async downloadAsFreeUser(size: 'S' | 'M' | 'L' = 'S'): Promise<import('@playwright/test').Download> {
  409 |     return await test.step(`Download photo as Free User (Size: ${size})`, async () => {
  410 |       await this.dismissInterferingModals();
  411 |       await this.freeDownloadButton.scrollIntoViewIfNeeded().catch(() => {});
  412 |       await this.dismissInterferingModals();
  413 | 
  414 |       // Click main download button to trigger timer / rewarded ad modal
  415 |       await this.clickElement(this.freeDownloadButton);
  416 | 
  417 |       // Handle Google Rewarded Ad / Interstitial overlay if present
  418 |       for (let attempt = 0; attempt < 5; attempt++) {
  419 |         const isTimerVisible = await this.timerModal.isVisible().catch(() => false);
  420 |         if (isTimerVisible) break;
  421 | 
  422 |         await this.dismissInterferingModals();
  423 | 
  424 |         // Try frame locator for close button
  425 |         const frameClose = this.page
  426 |           .frameLocator('iframe[id*="Rewarded_Ads"], iframe[id*="aswift"]')
  427 |           .locator('text=閉じる, [aria-label="閉じる"]')
  428 |           .first();
  429 | 
  430 |         if (await frameClose.isVisible({ timeout: 1500 }).catch(() => false)) {
  431 |           await frameClose.click().catch(() => {});
  432 |         } else {
  433 |           // Fallback: Click top-right coordinates (1535, 110) for Rewarded Ad and (1251, 308) for banner dialogs
  434 |           await this.page.mouse.click(1535, 110).catch(() => {});
  435 |           await this.page.mouse.click(1251, 308).catch(() => {});
  436 |         }
  437 | 
  438 |         // Also dismiss any survey/banner popup appearing concurrently
  439 |         await this.dismissInterferingModals();
  440 | 
  441 |         // If timer modal is still hidden and download button is interactive, click again
  442 |         const isNowVisible = await this.timerModal.isVisible().catch(() => false);
  443 |         if (!isNowVisible && (await this.freeDownloadButton.isVisible().catch(() => false))) {
  444 |           await this.clickElement(this.freeDownloadButton).catch(() => {});
  445 |         }
  446 |       }
  447 | 
  448 |       // Ensure timer modal is visible
  449 |       await this.timerModal.waitFor({ state: 'visible', timeout: 20_000 });
  450 | 
  451 |       // Select size if specified
  452 |       const sizeRadio = this.page.locator(`#timerModal input[value="${size.toLowerCase()}"], #timerModal input#${size.toLowerCase()}`);
  453 |       if (await sizeRadio.isVisible().catch(() => false)) {
  454 |         await sizeRadio.check().catch(() => {});
  455 |       }
  456 | 
  457 |       // Wait for countdown to finish and download button to become active
  458 |       const downloadBtn = this.timerModalDownloadButton;
> 459 |       await downloadBtn.waitFor({ state: 'visible', timeout: 35_000 });
      |                         ^ TimeoutError: locator.waitFor: Timeout 35000ms exceeded.
  460 | 
  461 |       // Wait for download event and click
  462 |       const [download] = await Promise.all([
  463 |         this.page.waitForEvent('download', { timeout: 35_000 }),
  464 |         downloadBtn.click({ force: true }),
  465 |       ]);
  466 | 
  467 |       return download;
  468 |     });
  469 |   }
  470 | 
  471 |   /**
  472 |    * Execute full download flow for Free User (first download scenario):
  473 |    * Tái sử dụng downloadAsFreeUser để đảm bảo tương thích ngược.
  474 |    * @param size - 'S' | 'M' | 'L' (defaults to 'S')
  475 |    * @returns Playwright Download object
  476 |    */
  477 |   async downloadAsFreeUserFirstDownload(size: 'S' | 'M' | 'L' = 'S'): Promise<import('@playwright/test').Download> {
  478 |     return await this.downloadAsFreeUser(size);
  479 |   }
  480 | 
  481 |   /**
  482 |    * Wait for First Download Completed promotional offer modal and click it to navigate to Premium campaign page.
  483 |    */
  484 |   async clickFirstDownloadPremiumOffer(): Promise<void> {
  485 |     await test.step('Click First Download Premium half-price offer banner', async () => {
  486 |       // 1. Wait for First Download completed modal
  487 |       await this.page.waitForSelector('#firstDownloadedModal', { state: 'visible', timeout: 25_000 });
  488 | 
  489 |       // 2. Click the promotional coupon link/image and wait for navigation to premium campaign
  490 |       await Promise.all([
  491 |         this.page.waitForURL(/premium\/campaign/, { timeout: 30_000 }),
  492 |         this.firstDownloadCouponLink.click({ force: true }),
  493 |       ]);
  494 |       await this.waitForPageLoad();
  495 |     });
  496 |   }
  497 | 
  498 |   /**
  499 |    * Click Bookmark button to add photo to collection.
  500 |    */
  501 |   async clickBookmark(): Promise<void> {
  502 |     await test.step('Click Bookmark button', async () => {
  503 |       await this.dismissInterferingModals();
  504 |       await this.clickElement(this.bookmarkButton);
  505 |     });
  506 |   }
  507 | 
  508 |   /**
  509 |    * Click Like button.
  510 |    */
  511 |   async clickLike(): Promise<void> {
  512 |     await test.step('Click Like button', async () => {
  513 |       await this.dismissInterferingModals();
  514 |       await this.clickElement(this.likeButton);
  515 |     });
  516 |   }
  517 | 
  518 |   /**
  519 |    * Click Share button to toggle share popover.
  520 |    */
  521 |   async clickShare(): Promise<void> {
  522 |     await test.step('Click Share button to open popover', async () => {
  523 |       await this.dismissInterferingModals();
  524 |       await this.clickElement(this.shareButton);
  525 |     });
  526 |   }
  527 | 
  528 |   /**
  529 |    * Click Heart / Fan registration button.
  530 |    */
  531 |   async clickHeartFan(): Promise<void> {
  532 |     await test.step('Click Fan (Heart) registration button', async () => {
  533 |       await this.dismissInterferingModals();
  534 |       await this.clickElement(this.heartFanButton);
  535 |     });
  536 |   }
  537 | 
  538 |   /**
  539 |    * Ensure the share popover is visible, clicking the share button if needed.
  540 |    */
  541 |   async ensureSharePopoverVisible(): Promise<void> {
  542 |     const isVisible = await this.sharePopover.isVisible().catch(() => false);
  543 |     if (!isVisible) {
  544 |       await this.clickShare();
  545 |       await this.sharePopover.waitFor({ state: 'visible', timeout: 5000 });
  546 |     }
  547 |   }
  548 | 
  549 |   /**
  550 |    * Click Facebook share option and wait for the popup window to open.
  551 |    */
  552 |   async clickShareFacebook(): Promise<Page> {
  553 |     return await test.step('Click Facebook share option', async () => {
  554 |       await this.ensureSharePopoverVisible();
  555 |       const [popup] = await Promise.all([
  556 |         this.page.waitForEvent('popup', { timeout: 15_000 }),
  557 |         this.shareFacebookLink.first().click(),
  558 |       ]);
  559 |       return popup;
```