# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/downloader.setup.ts >> Authenticate as downloader
- Location: src/tests/auth/downloader.setup.ts:6:6

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#user-info-dropdown img').nth(1) to be visible
    33 × locator resolved to hidden <img width="20" title="プレミアムサービス" class="d-block mw-100 mr-2" src="/assets/img/responsive/ico_premium.png"/>

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
    - link [ref=e9] [cursor=pointer]:
      - /url: https://acworks.co.jp/three_cities_agreements/
    - generic [ref=e11]:
      - generic [ref=e15]:
        - link "写真AC 写真ACは写真素材が無料！ 商用利用もOK！" [ref=e16] [cursor=pointer]:
          - /url: /
          - img "写真AC" [ref=e17]
          - generic [ref=e18]:
            - paragraph [ref=e19]: 写真ACは写真素材が無料！
            - paragraph [ref=e20]: 商用利用もOK！
        - text:     
      - generic [ref=e21]:
        - link " 写真投稿する" [ref=e22] [cursor=pointer]:
          - /url: /creator/auth/register
          - generic [ref=e23]: 
          - text: 写真投稿する
        - generic [ref=e25]:
          - button "クリックしてACアプリケーションのリストを表示" [ref=e28] [cursor=pointer]:
            - img [ref=e29]
          - text:    
        - generic [ref=e31]:
          - link "ホーム" [ref=e33] [cursor=pointer]:
            - /url: /
            - img [ref=e34]
            - generic [ref=e36]: ホーム
          - link "コレクション" [ref=e38] [cursor=pointer]:
            - /url: /user/bookmarks/
            - generic [ref=e39]: 
            - generic [ref=e40]: コレクション
          - generic [ref=e41]:
            - button "お気に入り" [ref=e42] [cursor=pointer]:
              - generic [ref=e43]: 
              - paragraph [ref=e44]:
                - text: お気に入り
                - generic [ref=e45]: 
            - text:  
          - generic [ref=e48]:
            - button "Avatar プレミアムサービス 法人プレミアム (オーナー) a***************************mさん " [ref=e49] [cursor=pointer]:
              - img "Avatar" [ref=e51]
              - generic [ref=e52]:
                - generic [ref=e53]:
                  - img "プレミアムサービス" [ref=e54]
                  - generic [ref=e55]: 法人プレミアム (オーナー)
                - generic [ref=e56]: a***************************mさん
              - text: 
            - text:   
          - generic [ref=e60] [cursor=pointer]:
            - img [ref=e61]
            - generic [ref=e65]: ヘルプ
    - text: 
  - text:                  
  - generic:      
  - generic [ref=e66]:
    - generic [ref=e68]:
      - button "画像で検索する" [ref=e69] [cursor=pointer]:
        - img [ref=e70]
      - generic [ref=e72]: 画像で検索する
    - separator [ref=e73]
    - generic [ref=e74]:
      - paragraph [ref=e75]: 画像から似ている画像を検索できます。
      - paragraph [ref=e76]: ※5MBまでのJPGまたはPNGファイルのみ
      - generic [ref=e77]:
        - listitem [ref=e78]:
          - img [ref=e79]
        - listitem [ref=e86]:
          - generic [ref=e87]: ファイルを選択
  - generic [ref=e88]:
    - button [ref=e90] [cursor=pointer]:
      - img [ref=e91]
    - generic [ref=e94]:
      - generic [ref=e95]:
        - button [ref=e96] [cursor=pointer]:
          - img [ref=e97]
        - textbox "キーワード（例：女性）" [ref=e100]
      - generic [ref=e101]:
        - button "文章で検索 文章で検索 文章で検索" [ref=e103] [cursor=pointer]:
          - img "文章で検索" [ref=e104]
          - text: 文章で検索
          - img "文章で検索" [ref=e106]
        - button "画像で検索" [ref=e108] [cursor=pointer]:
          - generic [ref=e109]: 
          - text: 画像で検索
    - separator [ref=e110]
    - generic [ref=e111]:
      - generic [ref=e112]: 並び順
      - generic [ref=e113]:
        - generic [ref=e114]:
          - radio "関連性の高い順" [checked] [ref=e115] [cursor=pointer]
          - generic [ref=e116] [cursor=pointer]: 関連性の高い順
        - generic [ref=e117]:
          - radio "新着順" [ref=e118] [cursor=pointer]
          - generic [ref=e119] [cursor=pointer]: 新着順
        - generic [ref=e120]:
          - radio "人気順" [ref=e121] [cursor=pointer]
          - generic [ref=e122] [cursor=pointer]: 人気順
    - generic [ref=e124]:
      - generic [ref=e125]: カテゴリー
      - listbox [ref=e126]:
        - option "人物" [ref=e127]
        - option "ビジネス" [ref=e128]
        - option "動物・生き物" [ref=e129]
        - option "花・植物" [ref=e130]
        - option "食べ物・飲み物" [ref=e131]
        - option "町並み・建物" [ref=e132]
        - option "医療・福祉" [ref=e133]
        - option "交通・乗り物" [ref=e134]
        - option "季節・行事" [ref=e135]
        - option "自然・風景" [ref=e136]
        - option "スポーツ" [ref=e137]
        - option "エコ・環境" [ref=e138]
        - option "美容・健康" [ref=e139]
        - option "住宅・インテリア" [ref=e140]
        - option "年賀状" [ref=e141]
        - option "テクスチャ・背景" [ref=e142]
        - option "小物・雑貨" [ref=e143]
        - option "クレイアート" [ref=e144]
        - option "外国" [ref=e145]
        - option "ロマンティック" [ref=e146]
        - option "スプラッター" [ref=e147]
    - generic [ref=e149]:
      - generic [ref=e150]: 除外カテゴリー
      - listbox [ref=e151]:
        - option "人物" [ref=e152]
        - option "ビジネス" [ref=e153]
        - option "動物・生き物" [ref=e154]
        - option "花・植物" [ref=e155]
        - option "食べ物・飲み物" [ref=e156]
        - option "町並み・建物" [ref=e157]
        - option "医療・福祉" [ref=e158]
        - option "交通・乗り物" [ref=e159]
        - option "季節・行事" [ref=e160]
        - option "自然・風景" [ref=e161]
        - option "スポーツ" [ref=e162]
        - option "エコ・環境" [ref=e163]
        - option "美容・健康" [ref=e164]
        - option "住宅・インテリア" [ref=e165]
        - option "年賀状" [ref=e166]
        - option "テクスチャ・背景" [ref=e167]
        - option "小物・雑貨" [ref=e168]
        - option "クレイアート" [ref=e169]
        - option "外国" [ref=e170]
        - option "ロマンティック" [ref=e171]
        - option "スプラッター" [ref=e172]
    - generic [ref=e173]:
      - generic [ref=e174]: 除外キーワード
      - textbox "除外キーワードを入力" [ref=e175]
    - generic [ref=e177]:
      - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e178] [cursor=pointer]
      - generic [ref=e179] [cursor=pointer]: AI生成ツール使用素材を除く
    - separator [ref=e180]
    - generic [ref=e181]:
      - generic [ref=e182]: 縦長・横長の選択
      - generic [ref=e183]:
        - generic [ref=e184]:
          - radio "全て" [checked] [ref=e185] [cursor=pointer]
          - generic [ref=e186] [cursor=pointer]: 全て
        - generic [ref=e187]:
          - radio "縦長" [ref=e188] [cursor=pointer]
          - generic [ref=e189] [cursor=pointer]: 縦長
        - generic [ref=e190]:
          - radio "横長" [ref=e191] [cursor=pointer]
          - generic [ref=e192] [cursor=pointer]: 横長
    - generic [ref=e193]:
      - generic [ref=e194]: 画像種別
      - combobox [ref=e195]:
        - option "全ての画像" [selected]
        - option "Mediumサイズ以上がある"
        - option "Largeサイズがある"
        - option "PSDがある"
    - generic [ref=e196]:
      - generic [ref=e197]: クリエイター名
      - textbox "クリエイター名を入力" [ref=e198]
    - generic [ref=e199]:
      - generic [ref=e200]: 除外クリエイター名
      - textbox "除外クリエイター名を入力" [ref=e201]
    - generic [ref=e202]:
      - generic [ref=e203]: 素材ID
      - textbox "素材のIDを入力" [ref=e204]
    - generic [ref=e205]:
      - generic [ref=e206]: 色
      - generic [ref=e207]:
        - generic [ref=e208]:
          - radio "全て" [checked] [ref=e209] [cursor=pointer]
          - generic [ref=e210] [cursor=pointer]: 全て
        - generic [ref=e211]:
          - generic [ref=e212]:
            - button [ref=e214] [cursor=pointer]
            - button [ref=e216] [cursor=pointer]
            - button [ref=e218] [cursor=pointer]
            - button [ref=e220] [cursor=pointer]
            - button [ref=e222] [cursor=pointer]
          - generic [ref=e223]:
            - button [ref=e225] [cursor=pointer]
            - button [ref=e227] [cursor=pointer]
            - button [ref=e229] [cursor=pointer]
            - button [ref=e231] [cursor=pointer]
            - button [ref=e233] [cursor=pointer]
          - generic [ref=e234]:
            - button [ref=e236] [cursor=pointer]
            - button [ref=e238] [cursor=pointer]
            - button [ref=e240] [cursor=pointer]
            - button [ref=e242] [cursor=pointer]
    - generic [ref=e247]:
      - generic [ref=e248]: モデル人数
      - generic [ref=e249]:
        - generic [ref=e250]:
          - radio "全て" [checked] [ref=e251] [cursor=pointer]
          - generic [ref=e252] [cursor=pointer]: 全て
        - generic [ref=e253]:
          - radio "無人" [ref=e254] [cursor=pointer]
          - generic [ref=e255] [cursor=pointer]: 無人
        - generic [ref=e256]:
          - radio "1人" [ref=e257] [cursor=pointer]
          - generic [ref=e258] [cursor=pointer]: 1人
        - generic [ref=e259]:
          - radio "2人" [ref=e260] [cursor=pointer]
          - generic [ref=e261] [cursor=pointer]: 2人
        - generic [ref=e262]:
          - radio "3人以上" [ref=e263] [cursor=pointer]
          - generic [ref=e264] [cursor=pointer]: 3人以上
    - generic [ref=e265]:
      - generic [ref=e266]: モデル年代
      - combobox [ref=e267]:
        - option "全ての年代" [selected]
        - option "赤ちゃん"
        - option "子供"
        - option "若者"
        - option "大人"
        - option "中高年"
        - option "高齢者"
    - generic [ref=e268]:
      - generic [ref=e269]: モデルリリース
      - generic [ref=e270]:
        - generic [ref=e271]:
          - radio "全て" [checked] [ref=e272] [cursor=pointer]
          - generic [ref=e273] [cursor=pointer]: 全て
        - generic [ref=e274]:
          - radio "取得済のみ" [ref=e275] [cursor=pointer]
          - generic [ref=e276] [cursor=pointer]: 取得済のみ
    - generic [ref=e277]:
      - generic [ref=e278]: プロパティリリース
      - generic [ref=e279]:
        - generic [ref=e280]:
          - radio "全て" [checked] [ref=e281] [cursor=pointer]
          - generic [ref=e282] [cursor=pointer]: 全て
        - generic [ref=e283]:
          - radio "取得済のみ" [ref=e284] [cursor=pointer]
          - generic [ref=e285] [cursor=pointer]: 取得済のみ
    - generic [ref=e286]:
      - generic [ref=e288] [cursor=pointer]: 完全一致
      - checkbox "完全一致" [ref=e290] [cursor=pointer]
    - button "検 索" [ref=e292] [cursor=pointer]
  - text:      
  - generic [ref=e293]:
    - generic [ref=e295]:
      - text:  
      - generic [ref=e296]:
        - link "ダウンロード 履歴" [ref=e298] [cursor=pointer]:
          - /url: /user/downloads
          - img [ref=e300]
          - generic [ref=e303]:
            - text: ダウンロード
            - text: 履歴
        - link "ライセンス まとめて購入" [ref=e305] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e307]
          - generic [ref=e311]:
            - text: ライセンス
            - text: まとめて購入
        - link "まとめて ダウンロード" [ref=e314] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e316]
          - generic [ref=e320]:
            - text: まとめて
            - text: ダウンロード
    - generic [ref=e321]:
      - generic [ref=e322]:
        - list [ref=e324]:
          - listitem [ref=e326]:
            - img "写真AC" [ref=e327]
        - generic [ref=e328]:
          - link "designAC" [ref=e330] [cursor=pointer]:
            - /url: https://test-an.editor-ac.com/free-template/greeting-card?keyword=残暑見舞い 8月&utm_source=photoac&utm_medium=display&utm_campaign=seasonpopup&utm_content=topicon&utm_id=2608
            - img "designAC" [ref=e331]
          - generic [ref=e332]:
            - generic [ref=e333]:
              - generic [ref=e334]: AI検索(β版)
              - generic [ref=e336]:
                - button "search_btn" [ref=e337] [cursor=pointer]:
                  - generic [ref=e338]: 
                - button "AI Search is off" [ref=e339] [cursor=pointer]:
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
                - /url: /main/search?q=ビジネス&utm_source=top_keyword
                - img [ref=e351]
                - text: ビジネス
              - link "夏" [ref=e353] [cursor=pointer]:
                - /url: /main/search?q=夏&utm_source=top_keyword
                - img [ref=e354]
                - text: 夏
              - link "女性" [ref=e356] [cursor=pointer]:
                - /url: /main/search?q=女性&utm_source=top_keyword
                - img [ref=e357]
                - text: 女性
              - link "和紙" [ref=e359] [cursor=pointer]:
                - /url: /main/search?q=和紙&utm_source=top_keyword
                - img [ref=e360]
                - text: 和紙
              - link "家族" [ref=e362] [cursor=pointer]:
                - /url: /main/search?q=家族&utm_source=top_keyword
                - img [ref=e363]
                - text: 家族
      - generic [ref=e366]:
        - link "写真AC 人気日本人モデル" [ref=e368] [cursor=pointer]:
          - /url: https://www.photo-ac.com/models/
          - img "写真AC" [ref=e369]
          - generic [ref=e370]: 人気日本人モデル
        - link "写真AC 夏休み" [ref=e372] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=1&by_ai=&q=%E5%A4%8F%E4%BC%91%E3%81%BF&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e373]
          - generic [ref=e374]: 夏休み
        - link "写真AC プール" [ref=e376] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=1&by_ai=&q=%E3%83%97%E3%83%BC%E3%83%AB&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e377]
          - generic [ref=e378]: プール
        - link "写真AC 夏野菜" [ref=e380] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=1&by_ai=&q=%E5%A4%8F%E9%87%8E%E8%8F%9C&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e381]
          - generic [ref=e382]: 夏野菜
      - generic [ref=e386]:
        - generic [ref=e387]:
          - link "creator-register" [ref=e389] [cursor=pointer]:
            - /url: /creator/auth/register
            - img "creator-register" [ref=e390]
          - generic [ref=e391]:
            - heading "写真素材メニュー" [level=4] [ref=e392]
            - button "写真カテゴリー" [ref=e394] [cursor=pointer]:
              - text: 写真カテゴリー
              - generic [ref=e395]: 
            - link "人気写真ランキング" [ref=e397] [cursor=pointer]:
              - /url: /ranking
            - link "モデルから写真を検索" [ref=e399] [cursor=pointer]:
              - /url: /models/
            - link "おすすめ特集一覧" [ref=e401] [cursor=pointer]:
              - /url: /pickup/1
            - link "新着写真一覧" [ref=e403] [cursor=pointer]:
              - /url: /main/latest
            - link "公開中のコレクション" [ref=e405] [cursor=pointer]:
              - /url: /main/collections
          - generic [ref=e406]:
            - heading "画像生成AI" [level=4] [ref=e407]
            - link "AC写真AIラボ NEW" [ref=e409] [cursor=pointer]:
              - /url: /image-generator/
              - text: AC写真AIラボ
              - generic [ref=e410]: NEW
            - link "AI人物素材" [ref=e412] [cursor=pointer]:
              - /url: /main/genface
          - generic [ref=e413]:
            - heading "クリエイターメニュー" [level=4] [ref=e414]
            - link "クリエイター投稿（新規登録）" [ref=e416] [cursor=pointer]:
              - /url: /creator/auth/register
            - link "クリエイターログイン" [ref=e418] [cursor=pointer]:
              - /url: "#"
            - link "ポイント換金ランキング" [ref=e420] [cursor=pointer]:
              - /url: /ranking/prize
            - link "クリエイター一覧" [ref=e422] [cursor=pointer]:
              - /url: /creators/
          - generic [ref=e423]:
            - heading "プレミアム会員サービス" [level=4] [ref=e424]
            - link "商品化ライセンス" [ref=e426] [cursor=pointer]:
              - /url: /main/extra_license_terms
            - link "あんしんサポート" [ref=e428] [cursor=pointer]:
              - /url: /indemnity/
          - generic [ref=e429]:
            - heading "ヘルプ＆ガイド" [level=4] [ref=e430]
            - link "写真ACとは" [ref=e432] [cursor=pointer]:
              - /url: /main/guide/#group-site
            - link "写真の権利" [ref=e434] [cursor=pointer]:
              - /url: /main/rights
            - link "ヘルプ" [ref=e436] [cursor=pointer]:
              - /url: https://help.freebie-ac.jp
            - link "利用規約" [ref=e438] [cursor=pointer]:
              - /url: /main/terms
          - link "Interview" [ref=e442] [cursor=pointer]:
            - /url: /interview
            - img "Interview" [ref=e443]
          - generic [ref=e444]:
            - heading "おすすめ無料サービス" [level=4] [ref=e445]
            - link "デザインテンプレート" [ref=e447] [cursor=pointer]:
              - /url: https://www.design-ac.net/
              - text: デザインテンプレート
              - generic [ref=e448]: 
            - link "ファイル転送・共有" [ref=e450] [cursor=pointer]:
              - /url: https://ac-data.info/
              - text: ファイル転送・共有
              - generic [ref=e451]: 
            - link "今日の運勢" [ref=e453] [cursor=pointer]:
              - /url: https://uranai-ac.com/
              - text: 今日の運勢
              - generic [ref=e454]: 
            - link "プレゼン資料作成AI" [ref=e456] [cursor=pointer]:
              - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
              - text: プレゼン資料作成AI
              - generic [ref=e457]: 
          - iframe [ref=e458]:
            
          - generic [ref=e459]:
            - heading "人気キーワード（タグ）" [level=4] [ref=e460]:
              - button "人気キーワード（タグ）" [ref=e461] [cursor=pointer]:
                - text: 人気キーワード（タグ）
                - generic [ref=e462]: 
            - generic [ref=e463]:
              - generic [ref=e464]:
                - link "ビジネス" [ref=e465] [cursor=pointer]:
                  - /url: /main/search?q=ビジネス&utm_source=top_keyword
                - link "夏" [ref=e466] [cursor=pointer]:
                  - /url: /main/search?q=夏&utm_source=top_keyword
                - link "女性" [ref=e467] [cursor=pointer]:
                  - /url: /main/search?q=女性&utm_source=top_keyword
                - link "和紙" [ref=e468] [cursor=pointer]:
                  - /url: /main/search?q=和紙&utm_source=top_keyword
                - link "家族" [ref=e469] [cursor=pointer]:
                  - /url: /main/search?q=家族&utm_source=top_keyword
                - link "8月" [ref=e470] [cursor=pointer]:
                  - /url: /main/search?q=8月&utm_source=top_keyword
                - link "炎" [ref=e471] [cursor=pointer]:
                  - /url: /main/search?q=炎&utm_source=top_keyword
                - link "ひまわり" [ref=e472] [cursor=pointer]:
                  - /url: /main/search?q=ひまわり&utm_source=top_keyword
                - link "バラ" [ref=e473] [cursor=pointer]:
                  - /url: /main/search?q=バラ&utm_source=top_keyword
                - link "花火" [ref=e474] [cursor=pointer]:
                  - /url: /main/search?q=花火&utm_source=top_keyword
                - link "オフィス" [ref=e475] [cursor=pointer]:
                  - /url: /main/search?q=オフィス&utm_source=top_keyword
                - link "リビング" [ref=e476] [cursor=pointer]:
                  - /url: /main/search?q=リビング&utm_source=top_keyword
                - link "お盆" [ref=e477] [cursor=pointer]:
                  - /url: /main/search?q=お盆&utm_source=top_keyword
                - link "コスモス" [ref=e478] [cursor=pointer]:
                  - /url: /main/search?q=コスモス&utm_source=top_keyword
                - link "子供" [ref=e479] [cursor=pointer]:
                  - /url: /main/search?q=子供&utm_source=top_keyword
                - link "秋" [ref=e480] [cursor=pointer]:
                  - /url: /main/search?q=秋&utm_source=top_keyword
                - link "夏祭り" [ref=e481] [cursor=pointer]:
                  - /url: /main/search?q=夏祭り&utm_source=top_keyword
                - link "花" [ref=e482] [cursor=pointer]:
                  - /url: /main/search?q=花&utm_source=top_keyword
                - link "スマホ" [ref=e483] [cursor=pointer]:
                  - /url: /main/search?q=スマホ&utm_source=top_keyword
                - link "夏休み" [ref=e484] [cursor=pointer]:
                  - /url: /main/search?q=夏休み&utm_source=top_keyword
                - link "猫" [ref=e485] [cursor=pointer]:
                  - /url: /main/search?q=猫&utm_source=top_keyword
                - link "パソコン" [ref=e486] [cursor=pointer]:
                  - /url: /main/search?q=パソコン&utm_source=top_keyword
                - link "紅葉" [ref=e487] [cursor=pointer]:
                  - /url: /main/search?q=紅葉&utm_source=top_keyword
                - link "海" [ref=e488] [cursor=pointer]:
                  - /url: /main/search?q=海&utm_source=top_keyword
                - link "スポーツ" [ref=e489] [cursor=pointer]:
                  - /url: /main/search?q=スポーツ&utm_source=top_keyword
                - link "犬" [ref=e490] [cursor=pointer]:
                  - /url: /main/search?q=犬&utm_source=top_keyword
                - link "うさぎ" [ref=e491] [cursor=pointer]:
                  - /url: /main/search?q=うさぎ&utm_source=top_keyword
                - link "満月" [ref=e492] [cursor=pointer]:
                  - /url: /main/search?q=満月&utm_source=top_keyword
                - link "ヨガ" [ref=e493] [cursor=pointer]:
                  - /url: /main/search?q=ヨガ&utm_source=top_keyword
                - link "木目 背景" [ref=e494] [cursor=pointer]:
                  - /url: /main/search?q=木目 背景&utm_source=top_keyword
                - link "料理" [ref=e495] [cursor=pointer]:
                  - /url: /main/search?q=料理&utm_source=top_keyword
                - link "コーヒー" [ref=e496] [cursor=pointer]:
                  - /url: /main/search?q=コーヒー&utm_source=top_keyword
                - link "勉強" [ref=e497] [cursor=pointer]:
                  - /url: /main/search?q=勉強&utm_source=top_keyword
                - link "木目" [ref=e498] [cursor=pointer]:
                  - /url: /main/search?q=木目&utm_source=top_keyword
                - link "カフェ" [ref=e499] [cursor=pointer]:
                  - /url: /main/search?q=カフェ&utm_source=top_keyword
                - link "赤ちゃん" [ref=e500] [cursor=pointer]:
                  - /url: /main/search?q=赤ちゃん&utm_source=top_keyword
                - link "冷蔵庫" [ref=e501] [cursor=pointer]:
                  - /url: /main/search?q=冷蔵庫&utm_source=top_keyword
                - link "桜" [ref=e502] [cursor=pointer]:
                  - /url: /main/search?q=桜&utm_source=top_keyword
                - link "夏空" [ref=e503] [cursor=pointer]:
                  - /url: /main/search?q=夏空&utm_source=top_keyword
                - link "お月見" [ref=e504] [cursor=pointer]:
                  - /url: /main/search?q=お月見&utm_source=top_keyword
                - link "ビジネスマン" [ref=e505] [cursor=pointer]:
                  - /url: /main/search?q=ビジネスマン&utm_source=top_keyword
                - link "水しぶき" [ref=e506] [cursor=pointer]:
                  - /url: /main/search?q=水しぶき&utm_source=top_keyword
                - link "テクスチャ" [ref=e507] [cursor=pointer]:
                  - /url: /main/search?q=テクスチャ&utm_source=top_keyword
                - link "いただきます" [ref=e508] [cursor=pointer]:
                  - /url: /main/search?q=いただきます&utm_source=top_keyword
                - link "パソコン 女性" [ref=e509] [cursor=pointer]:
                  - /url: /main/search?q=パソコン 女性&utm_source=top_keyword
                - link "ゴーヤ" [ref=e510] [cursor=pointer]:
                  - /url: /main/search?q=ゴーヤ&utm_source=top_keyword
                - link "介護" [ref=e511] [cursor=pointer]:
                  - /url: /main/search?q=介護&utm_source=top_keyword
                - link "女性 笑顔" [ref=e512] [cursor=pointer]:
                  - /url: /main/search?q=女性　笑顔&utm_source=top_keyword
                - link "たこ焼き" [ref=e513] [cursor=pointer]:
                  - /url: /main/search?q=たこ焼き&utm_source=top_keyword
                - link "9月" [ref=e514] [cursor=pointer]:
                  - /url: /main/search?q=9月&utm_source=top_keyword
              - paragraph [ref=e515]:
                - button "もっと見る" [ref=e516] [cursor=pointer]:
                  - text: もっと見る
                  - generic [ref=e517]: 
                - text: 
          - generic [ref=e518]:
            - heading "メディア" [level=4] [ref=e519]
            - heading "テレビでご紹介いただきました！" [level=4] [ref=e520]
            - iframe [ref=e521]:
              - img [ref=f22e2]
            - paragraph [ref=e522]: かんさい情報ネット ten. | 読売テレビ
          - heading "ブログ" [level=4] [ref=e524]
          - generic [ref=e525]:
            - heading "SNS" [level=4] [ref=e526]
            - link "ACワークス公式 X" [ref=e528] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
            - link "Mr.ビー X" [ref=e530] [cursor=pointer]:
              - /url: https://x.com/mrb_ac
        - generic [ref=e531]:
          - generic [ref=e532]:
            - paragraph [ref=e534]: 人気写真
            - generic [ref=e536]:
              - figure [ref=e537]:
                - img "子供を抱っこする女性 親子,お母さん,子供の写真素材" [ref=e539]
              - figure [ref=e540]:
                - img "お昼寝する赤ちゃん 赤ちゃん,寝ている,寝るの写真素材" [ref=e542]
                - text: 
              - figure [ref=e543]:
                - img "パソコンで入力作業をする若い日本人男性 パソコン,学校,勉強の写真素材" [ref=e545]
                - text: 
              - figure [ref=e546]:
                - img "作業服のスタッフ ビジネスマン,ゼネコン,日本人の写真素材" [ref=e548]
                - text: 
              - figure [ref=e549]:
                - img "スーパーで食料品の買い物をする人 スーパー,スーパーマーケット,買い物の写真素材" [ref=e551]
                - text: 
              - figure [ref=e552]:
                - img "体操教室で跳び箱を練習する男の子 子供,体操教室,体操の写真素材" [ref=e554]
                - text: 
              - figure [ref=e555]:
                - img "ビーチリゾートでバカンスを楽しむ若い女性 女性,水着,リゾートの写真素材" [ref=e557]
                - text: 
              - figure [ref=e558]:
                - img "赤ちゃんをハグするお母さん 親子,抱っこ,ママの写真素材" [ref=e560]
                - text: 
            - link "人気の投稿写真を詳しく見る" [ref=e562] [cursor=pointer]:
              - /url: /main/trends?page=1&pp=70&srt=dlrank&referer=more_ranking
              - text: 人気の投稿写真を詳しく見る
              - generic [ref=e563]: 
          - generic [ref=e564]:
            - generic [ref=e565]: a***************************mさんにおすすめの素材
            - generic [ref=e567]:
              - figure [ref=e568]:
                - img "ひまわり畑と夏空 ひまわり,夏,花の写真素材" [ref=e570]
                - text: 
              - figure [ref=e571]:
                - img "花や緑が美しい新緑の季節の住宅街 住宅,戸建て,マイホームの写真素材" [ref=e573]
                - text: 
              - figure [ref=e574]:
                - img "夏の風物詩(ひまわり)生花5 ひまわり,ヒマワリ,夏の写真素材" [ref=e576]
                - text: 
              - figure [ref=e577]:
                - img "ホワイト系西洋アジサイと青空 アジサイ,西洋アジサイ,花の写真素材" [ref=e579]
                - text: 
              - text:  
          - generic [ref=e580]:
            - paragraph [ref=e582]: デザインに統一感を持たせましょう
            - paragraph [ref=e583]:
              - text: チラシやウェブサイト、資料など、どのようなデザインにも統一感が大切です。
              - text: クリエイターのマイカテゴリーからテーマごとに写真を見つけることができます。同じスタイルの素材をダウンロードしてみましょう。
            - generic [ref=e584]: ※週間ダウンロードランキングからランダムに表示（クリエイター広告出稿者優遇）
            - generic [ref=e585]:
              - figure "日本人3世代ファミリー" [ref=e586]:
                - generic [ref=e588]:
                  - img "日本人 三世代 家族" [ref=e589]
                  - generic [ref=e590]:
                    - img "日本人 三世代 家族" [ref=e591]
                    - img "日本人 三世代 家族" [ref=e592]
                - link "日本人3世代ファミリー" [ref=e594] [cursor=pointer]:
                  - /url: /main/search?q=日本人 三世代 家族&qt=&qid=&creator=ACworks&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "ペーパーフラワー" [ref=e595]:
                - generic [ref=e596]:
                  - generic [ref=e597]:
                    - img "ペーパーフラワー" [ref=e598]
                    - generic [ref=e599]:
                      - img "ペーパーフラワー" [ref=e600]
                      - img "ペーパーフラワー" [ref=e601]
                  - text: 
                - link "ペーパーフラワー" [ref=e603] [cursor=pointer]:
                  - /url: /main/search?q=ペーパーフラワー&qt=&qid=&creator=%E3%83%87%E3%83%96%E7%8C%AB%E3%81%A8%E3%83%81%E3%83%93%E7%8C%AB&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "野菜" [ref=e604]:
                - generic [ref=e605]:
                  - generic [ref=e606]:
                    - img "野菜" [ref=e607]
                    - generic [ref=e608]:
                      - img "野菜" [ref=e609]
                      - img "野菜" [ref=e610]
                  - text: 
                - link "野菜" [ref=e612] [cursor=pointer]:
                  - /url: /main/search?q=野菜&qt=&qid=&creator=umaimon&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "桜" [ref=e613]:
                - generic [ref=e614]:
                  - generic [ref=e615]:
                    - img "桜" [ref=e616]
                    - generic [ref=e617]:
                      - img "桜" [ref=e618]
                      - img "桜" [ref=e619]
                  - text: 
                - link "桜" [ref=e621] [cursor=pointer]:
                  - /url: /main/search?q=桜&qt=&qid=&creator=cheetah&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "花・植物" [ref=e622]:
                - generic [ref=e623]:
                  - generic [ref=e624]:
                    - img "花" [ref=e625]
                    - generic [ref=e626]:
                      - img "花" [ref=e627]
                      - img "花" [ref=e628]
                  - text: 
                - link "花・植物" [ref=e630] [cursor=pointer]:
                  - /url: /main/search?q=花&qt=&qid=&creator=%E3%81%8F%E3%81%AE%E3%81%97%E3%81%BE&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "ティータイム" [ref=e631]:
                - generic [ref=e632]:
                  - generic [ref=e633]:
                    - img "ティータイム" [ref=e634]
                    - generic [ref=e635]:
                      - img "ティータイム" [ref=e636]
                      - img "ティータイム" [ref=e637]
                  - text: 
                - link "ティータイム" [ref=e639] [cursor=pointer]:
                  - /url: /main/search?q=ティータイム&qt=&qid=&creator=%E3%83%81%E3%83%A7%E3%82%B3%E3%83%A9%E3%83%86&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "新生活" [ref=e640]:
                - generic [ref=e641]:
                  - generic [ref=e642]:
                    - img "新生活" [ref=e643]
                    - generic [ref=e644]:
                      - img "新生活" [ref=e645]
                      - img "新生活" [ref=e646]
                  - text: 
                - link "新生活" [ref=e648] [cursor=pointer]:
                  - /url: /main/search?q=新生活&qt=&qid=&creator=craftbeermania&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
              - figure "コーヒー" [ref=e649]:
                - generic [ref=e650]:
                  - generic [ref=e651]:
                    - img "コーヒー" [ref=e652]
                    - generic [ref=e653]:
                      - img "コーヒー" [ref=e654]
                      - img "コーヒー" [ref=e655]
                  - text: 
                - link "コーヒー" [ref=e657] [cursor=pointer]:
                  - /url: /main/search?q=コーヒー&qt=&qid=&creator=%E7%A6%8F%E3%80%85&ngcreator=&nq=&srt=dlrank&orientation=all&sizesec=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&sl=ja
            - link "詳しく見る" [ref=e659] [cursor=pointer]:
              - /url: main/creator_categories
              - text: 詳しく見る
              - generic [ref=e660]: 
          - generic [ref=e661]:
            - paragraph [ref=e663]: 写真カテゴリー
            - generic [ref=e664]:
              - generic [ref=e666]:
                - link "カテゴリ。- 人物 人物" [ref=e669] [cursor=pointer]:
                  - /url: /main/search?c_id=1&c_name=%E4%BA%BA%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 人物" [ref=e670]
                  - generic [ref=e671]: 人物
                - link "カテゴリ。- ビジネス ビジネス" [ref=e674] [cursor=pointer]:
                  - /url: /main/search?c_id=2&c_name=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- ビジネス" [ref=e675]
                  - generic [ref=e676]: ビジネス
                - link "カテゴリ。- 動物・生き物 動物・生き物" [ref=e679] [cursor=pointer]:
                  - /url: /main/search?c_id=3&c_name=%E5%8B%95%E7%89%A9%E3%83%BB%E7%94%9F%E3%81%8D%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 動物・生き物" [ref=e680]
                  - generic [ref=e681]: 動物・生き物
                - link "カテゴリ。- 花・植物 花・植物" [ref=e684] [cursor=pointer]:
                  - /url: /main/search?c_id=4&c_name=%E8%8A%B1%E3%83%BB%E6%A4%8D%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 花・植物" [ref=e685]
                  - generic [ref=e686]: 花・植物
                - link "カテゴリ。- 食べ物・飲み物 食べ物・飲み物" [ref=e689] [cursor=pointer]:
                  - /url: /main/search?c_id=5&c_name=%E9%A3%9F%E3%81%B9%E7%89%A9%E3%83%BB%E9%A3%B2%E3%81%BF%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 食べ物・飲み物" [ref=e690]
                  - generic [ref=e691]: 食べ物・飲み物
                - link "カテゴリ。- 町並み・建物 町並み・建物" [ref=e694] [cursor=pointer]:
                  - /url: /main/search?c_id=6&c_name=%E7%94%BA%E4%B8%A6%E3%81%BF%E3%83%BB%E5%BB%BA%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 町並み・建物" [ref=e695]
                  - generic [ref=e696]: 町並み・建物
                - link "カテゴリ。- 医療・福祉 医療・福祉" [ref=e699] [cursor=pointer]:
                  - /url: /main/search?c_id=7&c_name=%E5%8C%BB%E7%99%82%E3%83%BB%E7%A6%8F%E7%A5%89&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 医療・福祉" [ref=e700]
                  - generic [ref=e701]: 医療・福祉
                - link "カテゴリ。- 交通・乗り物 交通・乗り物" [ref=e704] [cursor=pointer]:
                  - /url: /main/search?c_id=8&c_name=%E4%BA%A4%E9%80%9A%E3%83%BB%E4%B9%97%E3%82%8A%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 交通・乗り物" [ref=e705]
                  - generic [ref=e706]: 交通・乗り物
                - link "カテゴリ。- 季節・行事 季節・行事" [ref=e709] [cursor=pointer]:
                  - /url: /main/search?c_id=9&c_name=%E5%AD%A3%E7%AF%80%E3%83%BB%E8%A1%8C%E4%BA%8B&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 季節・行事" [ref=e710]
                  - generic [ref=e711]: 季節・行事
                - link "カテゴリ。- 自然・風景 自然・風景" [ref=e714] [cursor=pointer]:
                  - /url: /main/search?c_id=10&c_name=%E8%87%AA%E7%84%B6%E3%83%BB%E9%A2%A8%E6%99%AF&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 自然・風景" [ref=e715]
                  - generic [ref=e716]: 自然・風景
                - link "カテゴリ。- スポーツ スポーツ" [ref=e719] [cursor=pointer]:
                  - /url: /main/search?c_id=11&c_name=%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84&referer=c_search&utm_source=categories
                  - img "カテゴリ。- スポーツ" [ref=e720]
                  - generic [ref=e721]: スポーツ
                - link "カテゴリ。- エコ・環境 エコ・環境" [ref=e724] [cursor=pointer]:
                  - /url: /main/search?c_id=12&c_name=%E3%82%A8%E3%82%B3%E3%83%BB%E7%92%B0%E5%A2%83&referer=c_search&utm_source=categories
                  - img "カテゴリ。- エコ・環境" [ref=e725]
                  - generic [ref=e726]: エコ・環境
                - link "カテゴリ。- 美容・健康 美容・健康" [ref=e729] [cursor=pointer]:
                  - /url: /main/search?c_id=13&c_name=%E7%BE%8E%E5%AE%B9%E3%83%BB%E5%81%A5%E5%BA%B7&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 美容・健康" [ref=e730]
                  - generic [ref=e731]: 美容・健康
                - link "カテゴリ。- 住宅・インテリア 住宅・インテリア" [ref=e734] [cursor=pointer]:
                  - /url: /main/search?c_id=14&c_name=%E4%BD%8F%E5%AE%85%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 住宅・インテリア" [ref=e735]
                  - generic [ref=e736]: 住宅・インテリア
                - link "カテゴリ。- 年賀状 年賀状" [ref=e739] [cursor=pointer]:
                  - /url: /main/search?c_id=15&c_name=%E5%B9%B4%E8%B3%80%E7%8A%B6&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 年賀状" [ref=e740]
                  - generic [ref=e741]: 年賀状
                - link "カテゴリ。- テクスチャ・背景 テクスチャ・背景" [ref=e744] [cursor=pointer]:
                  - /url: /main/search?c_id=16&c_name=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%83%BB%E8%83%8C%E6%99%AF&referer=c_search&utm_source=categories
                  - img "カテゴリ。- テクスチャ・背景" [ref=e745]
                  - generic [ref=e746]: テクスチャ・背景
                - link "カテゴリ。- 小物・雑貨 小物・雑貨" [ref=e749] [cursor=pointer]:
                  - /url: /main/search?c_id=18&c_name=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 小物・雑貨" [ref=e750]
                  - generic [ref=e751]: 小物・雑貨
                - link "カテゴリ。- クレイアート クレイアート" [ref=e754] [cursor=pointer]:
                  - /url: /main/search?c_id=19&c_name=%E3%82%AF%E3%83%AC%E3%82%A4%E3%82%A2%E3%83%BC%E3%83%88&referer=c_search&utm_source=categories
                  - img "カテゴリ。- クレイアート" [ref=e755]
                  - generic [ref=e756]: クレイアート
                - link "カテゴリ。- 外国 外国" [ref=e759] [cursor=pointer]:
                  - /url: /main/search?c_id=20&c_name=%E5%A4%96%E5%9B%BD&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 外国" [ref=e760]
                  - generic [ref=e761]: 外国
                - link "カテゴリ。- PSD素材 PSD素材" [ref=e764] [cursor=pointer]:
                  - /url: /main/search?sizesec=psd&referer=category_psd&srt=dlrank&utm_source=categories
                  - img "カテゴリ。- PSD素材" [ref=e765]
                  - generic [ref=e766]: PSD素材
              - button [ref=e767] [cursor=pointer]:
                - img [ref=e769]
          - generic [ref=e771]:
            - paragraph [ref=e773]: 写真ACだけのオリジナルおすすめ写真特集！
            - paragraph [ref=e774]:
              - text: プロのカメラマンが撮影した写真ACのおすすめ特集を一挙公開！
              - text: 無料で使える高品質な写真を豊富なテーマごとに厳選してご用意しています。
            - generic [ref=e775]:
              - generic [ref=e776]:
                - figure "子供の食事" [ref=e777]:
                  - link "子供の食事" [ref=e778] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=childreneatingac&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=acworks&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&utm_source=pickup
                    - img "子供の食事" [ref=e779]
                - figure "日本人女性のライフスタイル" [ref=e780]:
                  - link "日本人女性のライフスタイル" [ref=e781] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=womanjplifestyle3ac&by_ai=&sizesec=all&orientation=all&color=&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=&ngcreator=&nq=&qid=&exclude_ai=on&srt=dlrank&pp=70&utm_source=pickup
                    - img "日本人女性のライフスタイル" [ref=e782]
                - figure "シニア女性の介護" [ref=e783]:
                  - link "シニア女性の介護" [ref=e784] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=carejpac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=acworks&ngcreator=&nq=&qid=&exclude_ai=on&srt=dlrank&pp=70&utm_source=pickup
                    - img "シニア女性の介護" [ref=e785]
                - figure "家族の問題" [ref=e786]:
                  - link "家族の問題" [ref=e787] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=problemsac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=acworks&ngcreator=&nq=&qid=&exclude_ai=on&layout=vertical&srt=dlrank&pp=70&utm_source=pickup
                    - img "家族の問題" [ref=e788]
              - link "おすすめ写真特集をもっと見る" [ref=e790] [cursor=pointer]:
                - /url: /pickup/1
                - text: おすすめ写真特集をもっと見る
                - generic [ref=e791]: 
          - generic [ref=e792]:
            - generic [ref=e793]:
              - paragraph [ref=e794]: グループサイトの無料サービスはご存知ですか？
              - text: イラストや動画、デザインツールなど、一つのアカウントで全て使えます。
            - generic [ref=e795]:
              - link "シルエット・ピクトグラム テンプレート・デザインツール" [ref=e798] [cursor=pointer]:
                - /url: https://test-an.editor-ac.com
                - img "シルエット・ピクトグラム" [ref=e799]
                - generic [ref=e800]: テンプレート・デザインツール
              - link "イラスト・ベクター画像 イラスト・ベクター画像" [ref=e803] [cursor=pointer]:
                - /url: https://www.ac-illust.com
                - img "イラスト・ベクター画像" [ref=e804]
                - generic [ref=e805]: イラスト・ベクター画像
              - link "シルエット・ピクトグラム シルエット・ピクトグラム" [ref=e808] [cursor=pointer]:
                - /url: https://www.silhouette-ac.com
                - img "シルエット・ピクトグラム" [ref=e809]
                - generic [ref=e810]: シルエット・ピクトグラム
              - generic [ref=e811]:
                - generic [ref=e812]:
                  - generic:
                    - img
                - link "シルエット・ピクトグラム 動画・エフェクト" [ref=e813] [cursor=pointer]:
                  - /url: https://video-ac.com/
                  - img "シルエット・ピクトグラム" [ref=e814]
                  - generic [ref=e815]: 動画・エフェクト
          - generic [ref=e816]:
            - paragraph [ref=e818]: もう画像選びで悩まないでください
            - generic [ref=e821]:
              - generic [ref=e822]:
                - img "Notification" [ref=e823]
                - generic [ref=e824]:
                  - paragraph [ref=e825]: 無料でダウンロード
                  - paragraph [ref=e826]: 1226万枚以上の写真素材から無料でダウンロード可能！毎日数千枚の写真素材が追加されます。
              - generic [ref=e827]:
                - img "Notification" [ref=e828]
                - generic [ref=e829]:
                  - paragraph [ref=e830]: クレジット表記不要
                  - paragraph [ref=e831]: 無料だとクレジット表記が必要なサイトが多い中、写真ACは無料でもクレジット表記不要です。
              - generic [ref=e832]:
                - img "Notification" [ref=e833]
                - generic [ref=e834]:
                  - paragraph [ref=e835]: 商用利用可能
                  - paragraph [ref=e836]: 加工も自由で商用利用も可能だから、チラシやポスター、パンフレットなど、さまざまなビジネスにご利用いただけます。
          - generic [ref=e837]:
            - paragraph [ref=e839]: こんな方におすすめです
            - generic [ref=e841]:
              - generic [ref=e842]:
                - generic [ref=e843]:
                  - img "top human 1" [ref=e844]
                  - generic [ref=e845]:
                    - paragraph [ref=e846]: WEB担当者
                    - paragraph [ref=e847]:
                      - text: ウェブサイトやブログの
                      - text: アイキャッチ画像がほしい
                - generic [ref=e848]:
                  - img "top human 2" [ref=e849]
                  - generic [ref=e850]:
                    - paragraph [ref=e851]: 会社員
                    - paragraph [ref=e852]:
                      - text: プレゼンテーションのスライドに
                      - text: 画像を使って分かりやすくしたい
                - generic [ref=e853]:
                  - img "top human 3" [ref=e854]
                  - generic [ref=e855]:
                    - paragraph [ref=e856]: インフルエンサー
                    - paragraph [ref=e857]:
                      - text: SNSへの投稿が
                      - text: テキストだけで物足りない
                - generic [ref=e858]:
                  - img "top human 4" [ref=e859]
                  - generic [ref=e860]:
                    - paragraph [ref=e861]: 作 家
                    - paragraph [ref=e862]:
                      - text: 電子書籍や印刷物の挿絵に
                      - text: 商用利用できる画像がほしい
                - generic [ref=e863]:
                  - img "top human 5" [ref=e864]
                  - generic [ref=e865]:
                    - paragraph [ref=e866]: プログラマー
                    - paragraph [ref=e867]:
                      - text: アプリケーションのUIデザインに
                      - text: 使う画像やアイコンがほしい
              - generic [ref=e868]:
                - generic [ref=e869]:
                  - img "top human 6" [ref=e870]
                  - generic [ref=e871]:
                    - paragraph [ref=e872]: 教育関係者
                    - paragraph [ref=e873]:
                      - text: 学習教材や教育資料に入れる
                      - text: 挿絵やイメージがほしい
                - generic [ref=e874]:
                  - img "top human 7" [ref=e875]
                  - generic [ref=e876]:
                    - paragraph [ref=e877]: 記 者
                    - paragraph [ref=e878]:
                      - text: メディア記事やニュース記事に
                      - text: 使う画像がほしい
                - generic [ref=e879]:
                  - img "top human 8" [ref=e880]
                  - generic [ref=e881]:
                    - paragraph [ref=e882]: ショップ運営
                    - paragraph [ref=e883]:
                      - text: 広告キャンペーンに使える
                      - text: インパクトのある画像がほしい
                - generic [ref=e884]:
                  - img "top human 9" [ref=e885]
                  - generic [ref=e886]:
                    - paragraph [ref=e887]: ハンドメイド販売
                    - paragraph [ref=e888]:
                      - link "商品化ライセンス" [ref=e889] [cursor=pointer]:
                        - /url: /main/extra_license_introduction
                      - text: を購入して
                      - text: ハンドメイド作品の販売したい
          - generic [ref=e892] [cursor=pointer]:
            - generic [ref=e894]:
              - img "logo45 designAC" [ref=e895]
              - paragraph [ref=e896]: デザインをもっと簡単に
              - paragraph [ref=e898]:
                - text: デザインACならいつでもどこでも、手軽にデザインできます。
                - text: 豊富なテンプレートからオリジナルのデザインを作成。
                - text: PC、スマートフォンにも対応の無料デザインツールです。
              - link "今すぐデザインを作成" [ref=e899]:
                - /url: https://www.design-ac.net/templates/new
            - img "banner designAC" [ref=e901]
          - generic [ref=e902]:
            - generic [ref=e903]:
              - paragraph [ref=e904]: まだ時間をムダにしますか？
              - paragraph [ref=e905]: 効率よく画像を探して、インプットの時間を確保し、納期のプレッシャーから逃れましょう。
            - generic [ref=e906]:
              - button "プレミアム個人プラン picture premium personal picture check 検索無制限 picture check ダウンロード無制限 picture check 待たずにダウンロード picture check まとめてダウンロード picture check 商品化ライセンス利用可能 picture check あんしんサポート 個人プランを詳しくみる" [ref=e907] [cursor=pointer]:
                - paragraph [ref=e909]: プレミアム個人プラン
                - generic [ref=e910]:
                  - img "picture premium personal" [ref=e911]
                  - generic [ref=e912]:
                    - generic [ref=e913]:
                      - img "picture check" [ref=e915]
                      - paragraph [ref=e917]: 検索無制限
                    - generic [ref=e918]:
                      - img "picture check" [ref=e920]
                      - paragraph [ref=e922]: ダウンロード無制限
                    - generic [ref=e923]:
                      - img "picture check" [ref=e925]
                      - paragraph [ref=e927]: 待たずにダウンロード
                    - generic [ref=e928]:
                      - img "picture check" [ref=e930]
                      - paragraph [ref=e932]: まとめてダウンロード
                    - generic [ref=e933]:
                      - img "picture check" [ref=e935]
                      - paragraph [ref=e937]: 商品化ライセンス利用可能
                    - generic [ref=e938]:
                      - img "picture check" [ref=e940]
                      - paragraph [ref=e942]: あんしんサポート
                  - link "個人プランを詳しくみる" [ref=e944]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
              - button "チームでお得な法人プラン picture premium business ＼ 大企業から行政まで利用中 ／ 個人プランの全ての機能に加え、 picture check 法人名義でのご利用 picture check メンバー招待機能 picture check 広告非表示オプション無料 picture check コレクションの共有 法人プランを詳しくみる" [ref=e945] [cursor=pointer]:
                - paragraph [ref=e947]: チームでお得な法人プラン
                - generic [ref=e948]:
                  - img "picture premium business" [ref=e949]
                  - generic [ref=e950]:
                    - paragraph [ref=e951]: ＼ 大企業から行政まで利用中 ／
                    - generic [ref=e952]:
                      - paragraph [ref=e953]: 個人プランの全ての機能に加え、
                      - generic [ref=e954]:
                        - img "picture check" [ref=e956]
                        - paragraph [ref=e958]: 法人名義でのご利用
                      - generic [ref=e959]:
                        - img "picture check" [ref=e961]
                        - paragraph [ref=e963]: メンバー招待機能
                      - generic [ref=e964]:
                        - img "picture check" [ref=e966]
                        - paragraph [ref=e968]: 広告非表示オプション無料
                      - generic [ref=e969]:
                        - img "picture check" [ref=e971]
                        - paragraph [ref=e973]: コレクションの共有
                  - link "法人プランを詳しくみる" [ref=e975]:
                    - /url: https://test-lien.photo-ac.com/premium/business
          - generic [ref=e976]:
            - paragraph [ref=e978]: 日本最大級のフリー素材サイト
            - generic [ref=e979]:
              - generic [ref=e980]:
                - generic [ref=e982]:
                  - img "Total users" [ref=e983]
                  - generic [ref=e984]:
                    - paragraph [ref=e985]: 登録ユーザー
                    - paragraph [ref=e986]: 0人以上
                - generic [ref=e988]:
                  - img "Downloads" [ref=e989]
                  - generic [ref=e990]:
                    - paragraph [ref=e991]: 総ダウンロード
                    - paragraph [ref=e992]: 206,000,000回以上
                - generic [ref=e994]:
                  - img "Total creators" [ref=e995]
                  - generic [ref=e996]:
                    - paragraph [ref=e997]: 登録クリエイター
                    - paragraph [ref=e998]: 370,000人以上
                - generic [ref=e1000]:
                  - img "Donations" [ref=e1001]
                  - generic [ref=e1002]:
                    - paragraph [ref=e1003]: 寄付金総額
                    - paragraph [ref=e1004]: 70,600,000円以上
              - generic [ref=e1005]: ※グループサイト合計
          - generic [ref=e1006]:
            - paragraph [ref=e1008]: ACワークスからのお知らせ
            - iframe [ref=e1009]:
              - img [ref=f23e2]
          - link "acworks banner" [ref=e1011] [cursor=pointer]:
            - /url: https://acworks.co.jp/
            - img "acworks banner" [ref=e1012]
          - generic [ref=e1013]:
            - paragraph [ref=e1014]: あなたのダウンロードが社会に貢献します
            - paragraph [ref=e1015]: あなたが写真素材を1ダウンロードするたびに0.1円を
            - paragraph [ref=e1016]: ACワークス株式会社より、ユーザーの皆さまが希望する団体へ寄付いたします。
            - generic [ref=e1017]:
              - generic [ref=e1019]:
                - img [ref=e1020]
                - generic [ref=e1021]:
                  - paragraph [ref=e1022]:
                    - text: 2024年の寄付金総額
                    - generic [ref=e1023]: 800万円超
                  - paragraph [ref=e1024]:
                    - text: これまでの累計寄付金総額
                    - generic [ref=e1025]: 6100万円超
              - paragraph [ref=e1026]: "[2025年3月時点]"
            - link "これまでの寄付金総額をみる" [ref=e1028] [cursor=pointer]:
              - /url: https://acworks.co.jp/csr/
      - contentinfo [ref=e1030]:
        - generic [ref=e1033]:
          - generic [ref=e1034]: 昨日のダウンロード数：46,942
          - generic [ref=e1035]: 先月のダウンロード数：1,346,552
          - generic [ref=e1036]: 総会員数：1600万人を突破しました
        - generic [ref=e1038]:
          - generic [ref=e1039]:
            - generic [ref=e1040]:
              - generic [ref=e1041]: 写真ACについて 
              - list [ref=e1042]:
                - listitem [ref=e1043]:
                  - link "写真ACとは" [ref=e1044] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e1045]:
                  - link "運営会社" [ref=e1046] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e1047]:
                  - link "個人情報保護方針" [ref=e1048] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e1049]:
                  - link "特定個人情報基本方針" [ref=e1050] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e1051]:
                  - link "特定商取引法に基づく表記" [ref=e1052] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e1053]:
                  - link "サイトマップ" [ref=e1054] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e1055]:
                  - link "セキュリティポリシー" [ref=e1056] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e1057]:
              - generic [ref=e1058]: 会員登録 
              - list [ref=e1059]:
                - listitem [ref=e1060]:
                  - link "無料会員登録" [ref=e1061] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
                - listitem [ref=e1062]:
                  - link "プレミアム会員登録" [ref=e1063] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e1064]:
                  - link "無料クリエイター会員登録" [ref=e1065] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e1066]:
              - generic [ref=e1067]: プレミアム会員サービス 
              - list [ref=e1068]:
                - listitem [ref=e1069]:
                  - link "プレミアム会員登録" [ref=e1070] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e1071]:
                  - link "法人・複数名向けプラン" [ref=e1072] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e1073]:
                  - link "商品化ライセンス" [ref=e1074] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e1075]:
                  - link "あんしんサポート" [ref=e1076] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e1077]:
              - generic [ref=e1078]: ヘルプ＆ガイド 
              - list [ref=e1079]:
                - listitem [ref=e1080]:
                  - link "ヘルプ" [ref=e1081] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e1082]:
                  - link "利用規約" [ref=e1083] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e1084]:
                  - link "プレミアム会員利用規約" [ref=e1085] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e1086]:
                  - link "AC写真AIラボ利用規約" [ref=e1087] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e1088]:
              - generic [ref=e1089]: グループサイト 
              - list [ref=e1090]:
                - listitem [ref=e1091]:
                  - link "イラストAC" [ref=e1092] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e1093]:
                  - link "シルエットAC" [ref=e1094] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e1095]:
                  - link "フリービーAC" [ref=e1096] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e1097]:
                  - link "年賀状AC" [ref=e1098] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e1099]:
                  - link "動画AC" [ref=e1100] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e1101]:
                  - link "デザインAC" [ref=e1102] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e1103]:
                  - link "ACデータ" [ref=e1104] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e1105]:
                  - link "明細AC" [ref=e1106] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e1107]:
            - link "twitter_btn" [ref=e1108] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e1109]:
                - img [ref=e1110]
            - link "facebook_btn" [ref=e1112] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e1113]:
                - generic [ref=e1114]: 
            - link "pinterest_btn" [ref=e1115] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e1116]:
                - generic [ref=e1117]: 
            - link "blog_btn" [ref=e1118] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e1119]:
                - generic [ref=e1120]: 
            - link "feedback_modal_btn" [ref=e1121] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e1122]:
                - generic [ref=e1123]: 
                - text: ご意見・ご要望
          - generic [ref=e1125]:
            - text: © 2011-2026
            - link "写真AC" [ref=e1126] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
  - link:
    - /url: ""
  - link:
    - /url: ""
  - text:   
  - dialog "Close AC写真AIラボ 次回からこのメッセージを表示しない 閉じる" [active] [ref=e1127]:
    - document:
      - generic [ref=e1129]:
        - region "Close" [ref=e1130] [cursor=pointer]:
          - generic "icon-close" [ref=e1131]:
            - img [ref=e1132]
        - generic [ref=e1134] [cursor=pointer]:
          - img "AC写真AIラボ" [ref=e1135]
          - generic [ref=e1137]:
            - generic [ref=e1138]:
              - checkbox "次回からこのメッセージを表示しない" [ref=e1139]
              - generic [ref=e1140]: 次回からこのメッセージを表示しない
            - button "閉じる" [ref=e1141]
```

# Test source

```ts
  1   | import { type Page, test } from '@playwright/test';
  2   | import { BasePage } from './base.page';
  3   | 
  4   | /**
  5   |  * LoginPage — Page Object for the login screen.
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
> 82  |       await this.page.locator('#user-info-dropdown img').nth(1).waitFor({ state: 'visible', timeout: 15_000 });
      |                                                                 ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  83  |     })
  84  |   }
  85  | 
  86  |   /**
  87  |    * Perform full creator login flow.
  88  |    * @param email - Creator email address
  89  |    * @param password - Creator password
  90  |    */
  91  |   async loginAsCreator(email: string, password: string): Promise<void> {
  92  |     await test.step(`Login as Creator with account: ${email}`, async () => {
  93  |       await this.goToCreatorLoginPage();
  94  | 
  95  |       await test.step('Fill login credentials', async () => {
  96  |         await this.fillInput(this.emailInput, email);
  97  |         await this.fillInput(this.passwordInput, password);
  98  |       });
  99  | 
  100 |       await test.step('Submit login form', async () => {
  101 |         await this.clickElement(this.submitCreatorButton);
  102 |       });
  103 | 
  104 |       await test.step('Wait for redirect to Creator Dashboard', async () => {
  105 |         await this.page.waitForURL(/\/creator\/dashboard/, { waitUntil: 'domcontentloaded', timeout: 20_000 });
  106 |       });
  107 |     });
  108 |   }
  109 | 
  110 |   /**
  111 |    * Get the text of the error message displayed after a failed login attempt.
  112 |    * @returns Error message text, or empty string if not found
  113 |    */
  114 |   async getErrorMessage(): Promise<string> {
  115 |     return this.getText(this.errorMessage);
  116 |   }
  117 | 
  118 | }
  119 | 
```