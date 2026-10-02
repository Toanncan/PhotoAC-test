# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-015: Guest lọc và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) qua Toolbar @guest @filter
- Location: photo-ac/src/tests/downloader/search-guest.spec.ts:356:7

# Error details

```
Error: Test timeout of 60000ms exceeded
```

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'すべてクリア' }).or(locator('a:has-text("すべてクリア")')).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9"
  - paragraph [ref=e3]:
    - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
    - link "詳細" [ref=e4] [cursor=pointer]:
      - /url: /main/privacy
    - link "同意" [ref=e5] [cursor=pointer]:
      - /url: ""
  - banner [ref=e6]:
    - generic [ref=e7]:
      - button "検索フィルター" [ref=e8] [cursor=pointer]:
        - generic [ref=e9]:
          - img [ref=e10]
          - generic [ref=e13]: 
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic [ref=e17]:
            - link "写真AC" [ref=e18] [cursor=pointer]:
              - /url: /
              - img "写真AC" [ref=e19]
            - text: 
          - search [ref=e21]:
            - generic [ref=e23]:
              - generic [ref=e24]:
                - text: 
                - button "AI Search is off" [disabled] [ref=e25]:
                  - img "AI Search is off" [ref=e26]
                - text: 
                - generic [ref=e27]:
                  - searchbox "キーワード（例：女性）" [ref=e28]: ビジネス
                  - button "リセット" [ref=e29] [cursor=pointer]:
                    - img [ref=e31]
                  - generic [ref=e33]: ビジネス
                - link "upload file" [ref=e35] [cursor=pointer]:
                  - /url: "#"
                  - generic [ref=e36]: 
                - button "search_btn" [ref=e37] [cursor=pointer]:
                  - generic [ref=e38]: 
              - button "カテゴリー " [ref=e40] [cursor=pointer]:
                - text: カテゴリー
                - generic [ref=e41]: 
        - generic [ref=e43]:
          - generic [ref=e44]:
            - button "会員登録（無料）" [ref=e45] [cursor=pointer]
            - text: 
          - button "ログイン" [ref=e47] [cursor=pointer]:
            - generic [ref=e48]: 
            - text: ログイン
          - button "クリックしてACアプリケーションのリストを表示" [ref=e50] [cursor=pointer]:
            - img [ref=e51]
    - text: 
  - text:      
  - generic:      
  - text:     
  - generic [ref=e53]:
    - generic [ref=e56]:
      - generic "ボタンホーム" [ref=e57]:
        - link "ホーム" [ref=e58] [cursor=pointer]:
          - /url: /
          - img [ref=e59]
      - generic "ボタンフォロー" [ref=e61]:
        - link "ファン登録" [ref=e62] [cursor=pointer]:
          - /url: /user/following/
          - generic [ref=e63]: 
      - generic "ボタンブックマーク" [ref=e64]:
        - link "コレクション" [ref=e65] [cursor=pointer]:
          - /url: /user/bookmarks/
          - generic [ref=e66]: 
      - img [ref=e71] [cursor=pointer]
    - generic [ref=e76]:
      - generic [ref=e79]:
        - generic [ref=e80]:
          - generic [ref=e81]:
            - navigation "breadcrumb" [ref=e83]:
              - list [ref=e84]:
                - listitem [ref=e85]:
                  - link "写真AC" [ref=e86] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e87]:
                  - text: /
                  - link "ビジネス" [ref=e88] [cursor=pointer]:
                    - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
            - generic [ref=e91]:
              - button "広告を非表示にする 広告を非表示にする" [ref=e93] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e94]
                - generic [ref=e95]: 広告を非表示にする
              - iframe [ref=e98]:
                
            - generic [ref=e99]:
              - heading "「ビジネス」の写真素材" [level=1] [ref=e100]
              - text: 304,810点
          - generic [ref=e103]:
            - button "検索" [ref=e104] [cursor=pointer]
            - generic [ref=e105]:
              - generic [ref=e107]:
                - generic [ref=e108]: 検索フィルター
                - generic [ref=e109]:
                  - button "カテゴリー " [ref=e110] [cursor=pointer]:
                    - text: カテゴリー
                    - generic [ref=e111]: 
                  - generic [ref=e112]:
                    - generic [ref=e113]:
                      - generic [ref=e114]: カテゴリー
                      - generic [ref=e116] [cursor=pointer]:
                        - text: 
                        - generic "カテゴリーを選択" [ref=e117]
                      - generic [ref=e118]:
                        - generic [ref=e119]:
                          - checkbox "人物" [disabled] [ref=e120] [cursor=pointer]
                          - generic [ref=e121] [cursor=pointer]: 人物
                        - generic [ref=e122]:
                          - checkbox "ビジネス" [disabled] [ref=e123] [cursor=pointer]
                          - generic [ref=e124] [cursor=pointer]: ビジネス
                        - generic [ref=e125]:
                          - checkbox "動物・生き物" [disabled] [ref=e126] [cursor=pointer]
                          - generic [ref=e127] [cursor=pointer]: 動物・生き物
                        - generic [ref=e128]:
                          - checkbox "花・植物" [disabled] [ref=e129] [cursor=pointer]
                          - generic [ref=e130] [cursor=pointer]: 花・植物
                        - generic [ref=e131]:
                          - checkbox "食べ物・飲み物" [disabled] [ref=e132] [cursor=pointer]
                          - generic [ref=e133] [cursor=pointer]: 食べ物・飲み物
                        - generic [ref=e134]:
                          - checkbox "町並み・建物" [disabled] [ref=e135] [cursor=pointer]
                          - generic [ref=e136] [cursor=pointer]: 町並み・建物
                        - generic [ref=e137]:
                          - checkbox "医療・福祉" [disabled] [ref=e138] [cursor=pointer]
                          - generic [ref=e139] [cursor=pointer]: 医療・福祉
                        - generic [ref=e140]:
                          - checkbox "交通・乗り物" [disabled] [ref=e141] [cursor=pointer]
                          - generic [ref=e142] [cursor=pointer]: 交通・乗り物
                        - generic [ref=e143]:
                          - checkbox "季節・行事" [disabled] [ref=e144] [cursor=pointer]
                          - generic [ref=e145] [cursor=pointer]: 季節・行事
                        - generic [ref=e146]:
                          - checkbox "自然・風景" [disabled] [ref=e147] [cursor=pointer]
                          - generic [ref=e148] [cursor=pointer]: 自然・風景
                        - generic [ref=e149]:
                          - checkbox "スポーツ" [disabled] [ref=e150] [cursor=pointer]
                          - generic [ref=e151] [cursor=pointer]: スポーツ
                        - generic [ref=e152]:
                          - checkbox "エコ・環境" [disabled] [ref=e153] [cursor=pointer]
                          - generic [ref=e154] [cursor=pointer]: エコ・環境
                        - generic [ref=e155]:
                          - checkbox "美容・健康" [disabled] [ref=e156] [cursor=pointer]
                          - generic [ref=e157] [cursor=pointer]: 美容・健康
                        - generic [ref=e158]:
                          - checkbox "住宅・インテリア" [disabled] [ref=e159] [cursor=pointer]
                          - generic [ref=e160] [cursor=pointer]: 住宅・インテリア
                        - generic [ref=e161]:
                          - checkbox "年賀状" [disabled] [ref=e162] [cursor=pointer]
                          - generic [ref=e163] [cursor=pointer]: 年賀状
                        - generic [ref=e164]:
                          - checkbox "テクスチャ・背景" [disabled] [ref=e165] [cursor=pointer]
                          - generic [ref=e166] [cursor=pointer]: テクスチャ・背景
                        - generic [ref=e167]:
                          - checkbox "小物・雑貨" [disabled] [ref=e168] [cursor=pointer]
                          - generic [ref=e169] [cursor=pointer]: 小物・雑貨
                        - generic [ref=e170]:
                          - checkbox "クレイアート" [disabled] [ref=e171] [cursor=pointer]
                          - generic [ref=e172] [cursor=pointer]: クレイアート
                        - generic [ref=e173]:
                          - checkbox "外国" [disabled] [ref=e174] [cursor=pointer]
                          - generic [ref=e175] [cursor=pointer]: 外国
                        - generic [ref=e176]:
                          - checkbox "ロマンティック" [disabled] [ref=e177] [cursor=pointer]
                          - generic [ref=e178] [cursor=pointer]: ロマンティック
                        - generic [ref=e179]:
                          - checkbox "スプラッター" [disabled] [ref=e180] [cursor=pointer]
                          - generic [ref=e181] [cursor=pointer]: スプラッター
                    - generic [ref=e182]:
                      - generic [ref=e183]: 除外カテゴリー
                      - generic [ref=e185] [cursor=pointer]:
                        - text: 
                        - generic "除外カテゴリーを選択" [ref=e186]
                      - generic [ref=e187]:
                        - generic [ref=e188]:
                          - checkbox "人物" [disabled] [ref=e189] [cursor=pointer]
                          - generic [ref=e190] [cursor=pointer]: 人物
                        - generic [ref=e191]:
                          - checkbox "ビジネス" [disabled] [ref=e192] [cursor=pointer]
                          - generic [ref=e193] [cursor=pointer]: ビジネス
                        - generic [ref=e194]:
                          - checkbox "動物・生き物" [disabled] [ref=e195] [cursor=pointer]
                          - generic [ref=e196] [cursor=pointer]: 動物・生き物
                        - generic [ref=e197]:
                          - checkbox "花・植物" [disabled] [ref=e198] [cursor=pointer]
                          - generic [ref=e199] [cursor=pointer]: 花・植物
                        - generic [ref=e200]:
                          - checkbox "食べ物・飲み物" [disabled] [ref=e201] [cursor=pointer]
                          - generic [ref=e202] [cursor=pointer]: 食べ物・飲み物
                        - generic [ref=e203]:
                          - checkbox "町並み・建物" [disabled] [ref=e204] [cursor=pointer]
                          - generic [ref=e205] [cursor=pointer]: 町並み・建物
                        - generic [ref=e206]:
                          - checkbox "医療・福祉" [disabled] [ref=e207] [cursor=pointer]
                          - generic [ref=e208] [cursor=pointer]: 医療・福祉
                        - generic [ref=e209]:
                          - checkbox "交通・乗り物" [disabled] [ref=e210] [cursor=pointer]
                          - generic [ref=e211] [cursor=pointer]: 交通・乗り物
                        - generic [ref=e212]:
                          - checkbox "季節・行事" [disabled] [ref=e213] [cursor=pointer]
                          - generic [ref=e214] [cursor=pointer]: 季節・行事
                        - generic [ref=e215]:
                          - checkbox "自然・風景" [disabled] [ref=e216] [cursor=pointer]
                          - generic [ref=e217] [cursor=pointer]: 自然・風景
                        - generic [ref=e218]:
                          - checkbox "スポーツ" [disabled] [ref=e219] [cursor=pointer]
                          - generic [ref=e220] [cursor=pointer]: スポーツ
                        - generic [ref=e221]:
                          - checkbox "エコ・環境" [disabled] [ref=e222] [cursor=pointer]
                          - generic [ref=e223] [cursor=pointer]: エコ・環境
                        - generic [ref=e224]:
                          - checkbox "美容・健康" [disabled] [ref=e225] [cursor=pointer]
                          - generic [ref=e226] [cursor=pointer]: 美容・健康
                        - generic [ref=e227]:
                          - checkbox "住宅・インテリア" [disabled] [ref=e228] [cursor=pointer]
                          - generic [ref=e229] [cursor=pointer]: 住宅・インテリア
                        - generic [ref=e230]:
                          - checkbox "年賀状" [disabled] [ref=e231] [cursor=pointer]
                          - generic [ref=e232] [cursor=pointer]: 年賀状
                        - generic [ref=e233]:
                          - checkbox "テクスチャ・背景" [disabled] [ref=e234] [cursor=pointer]
                          - generic [ref=e235] [cursor=pointer]: テクスチャ・背景
                        - generic [ref=e236]:
                          - checkbox "小物・雑貨" [disabled] [ref=e237] [cursor=pointer]
                          - generic [ref=e238] [cursor=pointer]: 小物・雑貨
                        - generic [ref=e239]:
                          - checkbox "クレイアート" [disabled] [ref=e240] [cursor=pointer]
                          - generic [ref=e241] [cursor=pointer]: クレイアート
                        - generic [ref=e242]:
                          - checkbox "外国" [disabled] [ref=e243] [cursor=pointer]
                          - generic [ref=e244] [cursor=pointer]: 外国
                        - generic [ref=e245]:
                          - checkbox "ロマンティック" [disabled] [ref=e246] [cursor=pointer]
                          - generic [ref=e247] [cursor=pointer]: ロマンティック
                        - generic [ref=e248]:
                          - checkbox "スプラッター" [disabled] [ref=e249] [cursor=pointer]
                          - generic [ref=e250] [cursor=pointer]: スプラッター
                - button "ファイル・向き " [ref=e252] [cursor=pointer]:
                  - text: ファイル・向き
                  - generic [ref=e253]: 
                - button "色 " [ref=e255] [cursor=pointer]:
                  - generic [ref=e257]: 色
                  - generic [ref=e258]: 
                - button "人物指定 " [ref=e260] [cursor=pointer]:
                  - text: 人物指定
                  - generic [ref=e261]: 
                - button "除外キーワード " [ref=e263] [cursor=pointer]:
                  - text: 除外キーワード
                  - generic [ref=e264]: 
                - button "詳細検索 " [ref=e266] [cursor=pointer]:
                  - text: 詳細検索
                  - generic [ref=e267]: 
                - button "表示条件 " [ref=e269] [cursor=pointer]:
                  - text: 表示条件
                  - generic [ref=e270]: 
              - button "関連性の高い順／70件表示 " [ref=e275] [cursor=pointer]:
                - text: 関連性の高い順／70件表示
                - generic [ref=e276]: 
          - generic [ref=e277]:
            - generic [ref=e278]:
              - figure [ref=e279]:
                - generic [ref=e280]:
                  - img "プレミアム素材" [ref=e282]
                  - text: 
                - img "会議中の男女 ビジネス,会議,テーブルの写真素材" [ref=e283]
                - text: 
              - figure [ref=e284]:
                - generic [ref=e285]:
                  - button "広告を非表示にする 広告を非表示にする" [ref=e287] [cursor=pointer]:
                    - img "広告を非表示にする" [ref=e288]
                    - generic [ref=e289]: 広告を非表示にする
                  - iframe [ref=e292]:
                    
              - figure [ref=e293]:
                - generic [ref=e294]: 
                - img "オフィスビルの廊下に並ぶビジネスマン ビジネス,就職,転職の写真素材" [ref=e295]
                - text:  
              - figure [ref=e296]:
                - generic [ref=e297]: 
                - img "ノートパソコンを持つおしゃれな女性 ビジネスウーマン,パソコン,クリエイターの写真素材" [ref=e298]
                - text:  
              - figure [ref=e299]:
                - generic [ref=e300]: 
                - img "悩む,考える,迷う若いビジネスウーマン 女性,悩み,考えるの写真素材" [ref=e301]
                - text:  
              - figure [ref=e302]:
                - generic [ref=e303]: 
                - img "作業着を着た製造業・建設業の男女スタッフ ビジネス,ビジネスマン,企業の写真素材" [ref=e304]
                - text:  
              - figure [ref=e305]:
                - generic [ref=e306]: 
                - img "会社でコーヒを飲む笑顔のビジネスウーマン ビジネス,休憩,コーヒーブレイクの写真素材" [ref=e307]
                - text:  
              - figure [ref=e308]:
                - generic [ref=e309]: 
                - img "青空の下で名古屋市栄の景観を俯瞰撮影2 都市景観,都市風景,ビジネスの写真素材" [ref=e310]
                - text:  
              - figure [ref=e311]:
                - generic [ref=e312]: 
                - img "青空の下で名古屋市栄の景観を俯瞰撮影1 ビジネス,オフィス,都市景観の写真素材" [ref=e313]
                - text:  
              - figure [ref=e314]:
                - generic [ref=e315]:
                  - button "広告を非表示にする 広告を非表示にする" [ref=e317] [cursor=pointer]:
                    - img "広告を非表示にする" [ref=e318]
                    - generic [ref=e319]: 広告を非表示にする
                  - iframe [ref=e322]:
                    - generic [ref=f858e2]:
                      - generic [ref=f858e3]:
                        - generic [ref=f858e5]:
                          - generic [ref=f858e7]: How familiar are you with Lodge Cast Iron? (Select one)
                          - generic [ref=f858e9]:
                            - generic [ref=f858e10] [cursor=pointer]:
                              - text: Very familiar
                              - radio "Very familiar" [ref=f858e11]
                            - generic [ref=f858e13] [cursor=pointer]:
                              - text: Somewhat familiar
                              - radio "Somewhat familiar" [ref=f858e14]
                            - generic [ref=f858e16] [cursor=pointer]:
                              - text: Slightly familiar
                              - radio "Slightly familiar" [ref=f858e17]
                            - generic [ref=f858e19] [cursor=pointer]:
                              - text: Not at all familiar
                              - radio "Not at all familiar" [ref=f858e20]
                          - generic [ref=f858e22]:
                            - img [ref=f858e23]
                            - generic [ref=f858e24]: 1 of 3
                            - generic [ref=f858e25] [cursor=pointer]: Next
                        - iframe [ref=f858e26] [cursor=pointer]:
                          - link "AdChoices" [ref=f864e2] [cursor=pointer]:
                            - /url: https://zetaglobal.com/ad-choices/
                            - img "AdChoices" [ref=f864e4]
                      - img [ref=f858e27]
              - figure [ref=e323]:
                - generic [ref=e324]: 
                - img "オフィスでパソコンを使うビジネスウーマン ビジネスウーマン,メモ,アイデア帳の写真素材" [ref=e325]
                - text:  
              - figure [ref=e326]:
                - generic [ref=e327]: 
                - img "会社でコーヒを飲みながら談笑する男女 ビジネス,ミーティング,チームワークの写真素材" [ref=e328]
                - text:  
              - figure [ref=e329]:
                - generic [ref=e330]: 
                - img "男女3人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e331]
                - text:  
              - figure [ref=e332]:
                - generic [ref=e333]: 
                - img "バックを持って歩くスーツ姿の若い女性 ビジネスウーマン,女性,ビジネスの写真素材" [ref=e334]
                - text:  
              - figure [ref=e335]:
                - generic [ref=e336]: 
                - img "オフィスにいるビジネスマンと秘書の女性 ビジネス,チームワーク,チームの写真素材" [ref=e337]
                - text:  
              - figure [ref=e338]:
                - generic [ref=e339]: 
                - img "晴れた朝の丸ビル 丸ビル,丸の内ビルディング,jpタワーの写真素材" [ref=e340]
                - text:  
              - figure [ref=e341]:
                - generic [ref=e342]: 
                - img "病院で診察・相談を受ける医師の男性と患者 医者,看護師,カウンセラーの写真素材" [ref=e343]
                - text:  
              - figure [ref=e345]:
                - generic [ref=e346]:
                  - img "プレミアム素材" [ref=e348]
                  - text: 
                - img "会議中の男女の手元 会議,ビジネス,テーブルの写真素材" [ref=e349]
                - text: 
              - figure [ref=e350]:
                - generic [ref=e351]: 
                - img "会議,打ち合わせ,ミーティングをする男女 ビジネス,パソコン,会議の写真素材" [ref=e352]
                - text:  
              - figure [ref=e353]:
                - generic [ref=e354]: 
                - img "青空の下で名古屋市栄の景観を俯瞰撮影3 都市景観,都市風景,ビジネスの写真素材" [ref=e355]
                - text:  
              - figure [ref=e356]:
                - generic [ref=e357]: 
                - img "青空に映えるビジネスビルを見上げて ビジネスビル,都市の風景,高層ビルの写真素材" [ref=e358]
                - text:  
              - figure [ref=e359]:
                - generic [ref=e360]: 
                - img "男女3人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e361]
                - text:  
              - figure [ref=e362]:
                - generic [ref=e363]: 
                - img "オフィスに座る作業着,作業服姿の男女 作業着,作業服,ビジネスマンの写真素材" [ref=e364]
                - text:  
              - figure [ref=e365]:
                - generic [ref=e366]: 
                - img "ノートパソコンを持つ若いアジア人女性 ビジネス,女性,キャンパスの写真素材" [ref=e367]
                - text:  
              - figure [ref=e368]:
                - generic [ref=e369]: 
                - img "ビジネスマン男女3人で仕事をする姿 ビジネス,男女ビジネス,ミーティングの写真素材" [ref=e370]
                - text:  
              - figure [ref=e372]:
                - generic [ref=e373]: 
                - img "男女3人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e374]
                - text:  
              - figure [ref=e375]:
                - generic [ref=e376]:
                  - img "プレミアム素材" [ref=e378]
                  - text: 
                - img "会議中の男女の手元 ビジネス,会議,テーブルの写真素材" [ref=e379]
                - text: 
              - figure [ref=e380]:
                - generic [ref=e381]: 
                - img "オフィスビル バナー素材 ビル,オフィス街,ビジネスの写真素材" [ref=e382]
                - text:  
              - figure [ref=e383]:
                - generic [ref=e384]: 
                - img "タブレットを見ながら驚く表情をする男女 ビジネス,トラブル,驚くの写真素材" [ref=e385]
                - text:  
              - figure [ref=e386]:
                - generic [ref=e387]: 
                - img "笑顔で働くスーツを着た3人のビジネスマン ビジネス,ビジネスマン,ビジネスウーマンの写真素材" [ref=e388]
                - text:  
              - figure [ref=e389]:
                - generic [ref=e390]: 
                - img "住宅模型を使ってミーティングをする男女 会議,ミーティング,ビジネスの写真素材" [ref=e391]
                - text:  
              - figure [ref=e392]:
                - generic [ref=e393]: 
                - img "男女のビジネスパーソン ビジネス,ビジネスマン,営業の写真素材" [ref=e394]
                - text:  
              - figure [ref=e395]:
                - generic [ref=e396]: 
                - img "入道雲が広がる中之島遊歩道と水辺の風景 大阪,入道雲,ビジネスの写真素材" [ref=e397]
                - text:  
              - figure [ref=e399]:
                - generic [ref=e400]: 
                - img "カフェで話すビジネスウーマン ビジネスウーマン,相談,テレワークの写真素材" [ref=e401]
                - text:  
              - figure [ref=e402]:
                - generic [ref=e403]: 
                - img "工場・工務店などの中小企業で働く従業員 建設業,作業員,技術者の写真素材" [ref=e404]
                - text:  
              - figure [ref=e405]:
                - generic [ref=e406]: 
                - img "会社のオフィスにいる男女のビジネスマン ビジネス,ビジネスウーマン,ベンチャーの写真素材" [ref=e407]
                - text:  
              - figure [ref=e408]:
                - generic [ref=e409]: 
                - img "青空に映えるビジネスビル ビジネスビル,都市の風景,高層ビルの写真素材" [ref=e410]
                - text:  
              - figure [ref=e411]:
                - generic [ref=e412]: 
                - img "オフィスで働くエンジニアのチーム オフィス,エンジニア,ビジネスマンの写真素材" [ref=e413]
                - generic [ref=e415]: New
                - text:  
              - figure [ref=e416]:
                - generic [ref=e417]: 
                - img "会議で出される仕出し弁当を食べる男女 社食,社員食堂,昼食の写真素材" [ref=e418]
                - text:  
              - figure [ref=e419]:
                - generic [ref=e420]: 
                - img "【神奈川】京急線汐入駅前の風景 汐入,駅,京急線の写真素材" [ref=e421]
                - text:  
              - figure [ref=e422]:
                - generic [ref=e423]: 
                - img "オフィスにいるビジネスマンと女性秘書 ビジネス,チーム,ビジネスマンの写真素材" [ref=e424]
                - text:  
              - figure [ref=e426]:
                - generic [ref=e427]: 
                - img "オフィスで打ち合わせをする作業着姿の男女 ビジネス,オフィス,打ち合わせの写真素材" [ref=e428]
                - text:  
              - figure [ref=e429]:
                - generic [ref=e430]: 
                - img "男女2人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e431]
                - text:  
              - figure [ref=e432]:
                - generic [ref=e433]: 
                - img "オフィスでパソコンを見るビジネスマン 会議,オフィス,ビジネスマンの写真素材" [ref=e434]
                - text:  
              - figure [ref=e435]:
                - generic [ref=e436]: 
                - img "オフィスで働くエンジニアのチーム オフィス,エンジニア,ビジネスマンの写真素材" [ref=e437]
                - generic [ref=e439]: New
                - text:  
              - figure [ref=e440]:
                - generic [ref=e441]: 
                - img "公園を歩く笑顔の男性社員二人 男性,ビジネス,仕事の写真素材" [ref=e442]
                - text:  
              - figure [ref=e443]:
                - generic [ref=e444]: 
                - img "オフィスで働くビジネスパーソン オフィス,笑顔,ビジネスマンの写真素材" [ref=e445]
                - text:  
              - figure [ref=e446]:
                - generic [ref=e447]: 
                - img "腕組みする3人のビジネスマン ビジネス,会社員,男性の写真素材" [ref=e448]
                - text:  
              - figure [ref=e449]:
                - generic [ref=e450]: 
                - img "オフィスにいる役員の男性と女性スタッフ ビジネス,ワークライフバランス,ガッツポーズの写真素材" [ref=e451]
                - text:  
              - figure [ref=e453]:
                - generic [ref=e454]: 
                - img "女性4人のチームワーク 背景透過PSD 女性,人物,ビジネスの写真素材" [ref=e455]
                - text:  
              - figure [ref=e456]:
                - generic [ref=e457]: 
                - img "頑張るビジネスチーム ビジネス,ガッツポーズ,オフィスの写真素材" [ref=e458]
                - generic [ref=e460]: New
                - text:  
              - figure [ref=e461]:
                - generic [ref=e462]: 
                - img "オフィスで会議をする若いビジネスマン 会議,プレゼン,ビジネスマンの写真素材" [ref=e463]
                - text:  
              - figure [ref=e464]:
                - generic [ref=e465]: 
                - img "男性2人のビジネスチームワークイメージ 男性,人物,ビジネスの写真素材" [ref=e466]
                - text:  
              - figure [ref=e467]:
                - generic [ref=e468]: 
                - img "仕事の成功と目標達成 仕事,仕事運,ビジネスの写真素材" [ref=e469]
                - text:  
              - figure [ref=e470]:
                - generic [ref=e471]: 
                - img "男女2人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e472]
                - text:  
              - figure [ref=e473]:
                - generic [ref=e474]: 
                - img "オフィスで働く男女のビジネスマン 会議,ビジネス,打ち合わせの写真素材" [ref=e475]
                - text:  
              - figure [ref=e476]:
                - generic [ref=e477]: 
                - img "私服でパソコンを持つビジネスウーマン ビジネスウーマン,プランナー,デザイナーの写真素材" [ref=e478]
                - text:  
              - figure [ref=e480]:
                - generic [ref=e481]:
                  - img "プレミアム素材" [ref=e483]
                  - text: 
                - img "AIと人間の握手 ビジネス,握手,協力の写真素材" [ref=e484]
                - text: 
              - figure [ref=e485]:
                - generic [ref=e486]: 
                - img "屋外で考える男性社員二人 男性,ビジネス,仕事の写真素材" [ref=e487]
                - text:  
              - figure [ref=e488]:
                - generic [ref=e489]: 
                - img "9月カレンダー / デスク 02 9月,９月,カレンダーの写真素材" [ref=e490]
                - text:  
              - figure [ref=e491]:
                - generic [ref=e492]: 
                - img "報告,打ち合わせするビジネスウーマン ビジネスウーマン,パソコン,相談の写真素材" [ref=e493]
                - text:  
              - figure [ref=e494]:
                - generic [ref=e495]: 
                - img "3人で仕事をするビジネスマン男女 ビジネス,ビジネス男女,ミーティングの写真素材" [ref=e496]
                - text:  
              - figure [ref=e497]:
                - generic [ref=e498]: 
                - img "男女3人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e499]
                - text:  
              - figure [ref=e500]:
                - generic [ref=e501]: 
                - img "2人の若い女性 背景透過PSD 女性,人物,2人の写真素材" [ref=e502]
                - text:  
              - figure [ref=e503]:
                - generic [ref=e504]: 
                - img "オフィスインテリア(執務室17) オフィス,インテリア,社内の写真素材" [ref=e505]
                - text:  
              - figure [ref=e507]:
                - generic [ref=e508]: 
                - img "男女2人のビジネスチームワークイメージ ビジネス,人物,男女の写真素材" [ref=e509]
                - text:  
              - figure [ref=e510]:
                - generic [ref=e511]: 
                - img "オフィスで働くエンジニアのチーム オフィス,エンジニア,ビジネスマンの写真素材" [ref=e512]
                - generic [ref=e514]: New
                - text:  
              - figure [ref=e515]:
                - generic [ref=e516]: 
                - img "手を差し伸べるビジネスパーソン 男性,女性,ビジネスの写真素材" [ref=e517]
                - text:  
              - figure [ref=e518]:
                - generic [ref=e519]: 
                - img "家のリビングでノートパソコンを使う男性 パソコン,男性,ビジネスマンの写真素材" [ref=e520]
                - text:  
              - figure [ref=e521]:
                - generic [ref=e522]: 
                - img "2人のビジネスマン ビジネス,相談,打ち合わせの写真素材" [ref=e523]
                - text:  
              - figure [ref=e524]:
                - generic [ref=e525]: 
                - img "男女2人のビジネスチームワークイメージ 男女,2人,男性の写真素材" [ref=e526]
                - text:  
              - figure [ref=e527]:
                - generic [ref=e528]: 
                - img "ガッツポーズをする2人の男性ビジネスマン 男性,人物,2人の写真素材" [ref=e529]
                - text:  
            - generic [ref=e530]:
              - generic [ref=e531]: 関連キーワード
              - link " 仕事" [ref=e532] [cursor=pointer]:
                - /url: /main/search?q=%E4%BB%95%E4%BA%8B
                - generic [ref=e533]: 
                - text: 仕事
              - link " 女性 ビジネス" [ref=e534] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e535]: 
                - text: 女性 ビジネス
              - link " 女性 仕事" [ref=e536] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7+%E4%BB%95%E4%BA%8B
                - generic [ref=e537]: 
                - text: 女性 仕事
              - link " ビジネス 握手" [ref=e538] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E6%8F%A1%E6%89%8B
                - generic [ref=e539]: 
                - text: ビジネス 握手
              - link " ビジネス 女性" [ref=e540] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E5%A5%B3%E6%80%A7
                - generic [ref=e541]: 
                - text: ビジネス 女性
              - link " 男性 ビジネス" [ref=e542] [cursor=pointer]:
                - /url: /main/search?q=%E7%94%B7%E6%80%A7+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e543]: 
                - text: 男性 ビジネス
              - link " ビジネス 背景" [ref=e544] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E8%83%8C%E6%99%AF
                - generic [ref=e545]: 
                - text: ビジネス 背景
              - link " ビジネスホテル" [ref=e546] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E3%83%9B%E3%83%86%E3%83%AB
                - generic [ref=e547]: 
                - text: ビジネスホテル
              - link " CG ビジネス" [ref=e548] [cursor=pointer]:
                - /url: /main/search?q=CG+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e549]: 
                - text: CG ビジネス
              - link " ビジネスシーン" [ref=e550] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E3%82%B7%E3%83%BC%E3%83%B3
                - generic [ref=e551]: 
                - text: ビジネスシーン
              - link " 不動産 ビジネス" [ref=e552] [cursor=pointer]:
                - /url: /main/search?q=%E4%B8%8D%E5%8B%95%E7%94%A3+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e553]: 
                - text: 不動産 ビジネス
              - link " パソコン ビジネス" [ref=e554] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e555]: 
                - text: パソコン ビジネス
              - link " ビジネス イメージ" [ref=e556] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8
                - generic [ref=e557]: 
                - text: ビジネス イメージ
              - link " ビジネス 男性" [ref=e558] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E7%94%B7%E6%80%A7
                - generic [ref=e559]: 
                - text: ビジネス 男性
              - link " 電話 ビジネス" [ref=e560] [cursor=pointer]:
                - /url: /main/search?q=%E9%9B%BB%E8%A9%B1+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e561]: 
                - text: 電話 ビジネス
              - link " 外国人 ビジネス" [ref=e562] [cursor=pointer]:
                - /url: /main/search?q=%E5%A4%96%E5%9B%BD%E4%BA%BA+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e563]: 
                - text: 外国人 ビジネス
              - link " ネットビジネス" [ref=e564] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%8D%E3%83%83%E3%83%88%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
                - generic [ref=e565]: 
                - text: ネットビジネス
              - link " ビジネス 笑顔" [ref=e566] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E7%AC%91%E9%A1%94
                - generic [ref=e567]: 
                - text: ビジネス 笑顔
              - link " ビジネス 会議" [ref=e568] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E4%BC%9A%E8%AD%B0
                - generic [ref=e569]: 
                - text: ビジネス 会議
            - list [ref=e570]:
              - listitem [ref=e571]:
                - link "1" [ref=e572] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e573]:
                - link "2" [ref=e574] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&p=2
              - listitem [ref=e575]:
                - link "3" [ref=e576] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&p=3
              - listitem [ref=e577]:
                - link "4" [ref=e578] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&p=4
              - listitem [ref=e579]:
                - link "5" [ref=e580] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&p=5
              - listitem [ref=e581]:
                - link "6" [ref=e582] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&p=6
              - listitem [ref=e583]: ...
              - listitem [ref=e584]:
                - link "次に" [ref=e585] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&p=2
                  - generic [ref=e586]: 
            - generic [ref=e587]: 全304,810件中1 - 70件
            - paragraph [ref=e588]:
              - text: 「
              - strong [ref=e589]: ビジネス
              - text: 」のキーワードで新規投稿されたフリー写真素材・画像を掲載しております。JPEG形式の高解像度画像が無料でダウンロードできます。気に入った
              - strong [ref=e590]: ビジネス
              - text: の写真素材・画像が見つかったら、写真をクリックして、無料ダウンロードページへお進み下さい。高品質なロイヤリティーフリー写真素材を無料でダウンロードしていただけます。商用利用もOKなので、ビジネス写真をチラシやポスター、WEBサイトなどの広告、ポストカードや年賀状などにもご利用いただけます。クレジット表記や許可も必要ありません。
            - generic [ref=e591]:
              - generic [ref=e593]: 写真ACグループサイトの「ビジネス」の検索結果（同じアカウントで無料ダウンロードできます）
              - img "loading" [ref=e596]
              - separator [ref=e597]
              - generic [ref=e600]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e602] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e603]
                  - generic [ref=e604]: 広告を非表示にする
                - iframe [ref=e607]:
                  
              - separator [ref=e608]
              - img "loading" [ref=e611]
              - separator [ref=e612]
              - img "loading" [ref=e615]
              - separator [ref=e616]
              - img "loading" [ref=e619]
              - separator [ref=e620]
            - generic [ref=e623]:
              - strong [ref=e624]: 写真素材リクエスト受け付け中
              - text: ※100%対応はできませんが最大限努力をいたします。
              - generic [ref=e625]:
                - textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信" [ref=e627]
                - button "素材をリクエスト" [ref=e628] [cursor=pointer]
        - text: 
      - contentinfo [ref=e630]:
        - generic [ref=e633]:
          - generic [ref=e634]: 昨日のダウンロード数：43,960
          - generic [ref=e635]: 先月のダウンロード数：1,124,624
          - generic [ref=e636]: 総会員数：1600万人を突破しました
        - generic [ref=e638]:
          - generic [ref=e639]:
            - generic [ref=e640]:
              - generic [ref=e641]: 写真ACについて 
              - list [ref=e642]:
                - listitem [ref=e643]:
                  - link "写真ACとは" [ref=e644] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e645]:
                  - link "運営会社" [ref=e646] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e647]:
                  - link "個人情報保護方針" [ref=e648] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e649]:
                  - link "特定個人情報基本方針" [ref=e650] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e651]:
                  - link "特定商取引法に基づく表記" [ref=e652] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e653]:
                  - link "サイトマップ" [ref=e654] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e655]:
                  - link "セキュリティポリシー" [ref=e656] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e657]:
              - generic [ref=e658]: 会員登録 
              - list [ref=e659]:
                - listitem [ref=e660]:
                  - link "無料会員登録" [ref=e661] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252583%252593%2525E3%252582%2525B8%2525E3%252583%25258D%2525E3%252582%2525B9&lang=jp
                - listitem [ref=e662]:
                  - link "プレミアム会員登録" [ref=e663] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252583%252593%2525E3%252582%2525B8%2525E3%252583%25258D%2525E3%252582%2525B9&lang=jp&fromButton=premium_action
                - listitem [ref=e664]:
                  - link "無料クリエイター会員登録" [ref=e665] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e666]:
              - generic [ref=e667]: プレミアム会員サービス 
              - list [ref=e668]:
                - listitem [ref=e669]:
                  - link "プレミアム会員登録" [ref=e670] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e671]:
                  - link "法人・複数名向けプラン" [ref=e672] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e673]:
                  - link "商品化ライセンス" [ref=e674] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e675]:
                  - link "あんしんサポート" [ref=e676] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e677]:
              - generic [ref=e678]: ヘルプ＆ガイド 
              - list [ref=e679]:
                - listitem [ref=e680]:
                  - link "ヘルプ" [ref=e681] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e682]:
                  - link "利用規約" [ref=e683] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e684]:
                  - link "プレミアム会員利用規約" [ref=e685] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e686]:
                  - link "AC写真AIラボ利用規約" [ref=e687] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e688]:
              - generic [ref=e689]: グループサイト 
              - list [ref=e690]:
                - listitem [ref=e691]:
                  - link "イラストAC" [ref=e692] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e693]:
                  - link "シルエットAC" [ref=e694] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e695]:
                  - link "フリービーAC" [ref=e696] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e697]:
                  - link "年賀状AC" [ref=e698] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e699]:
                  - link "動画AC" [ref=e700] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e701]:
                  - link "デザインAC" [ref=e702] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e703]:
                  - link "ACデータ" [ref=e704] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e705]:
                  - link "明細AC" [ref=e706] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e707]:
            - link "twitter_btn" [ref=e708] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e709]:
                - img [ref=e710]
            - link "facebook_btn" [ref=e712] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e713]:
                - generic [ref=e714]: 
            - link "pinterest_btn" [ref=e715] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e716]:
                - generic [ref=e717]: 
            - link "blog_btn" [ref=e718] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e719]:
                - generic [ref=e720]: 
            - link "feedback_modal_btn" [ref=e721] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e722]:
                - generic [ref=e723]: 
                - text: ご意見・ご要望
          - generic [ref=e725]:
            - text: © 2011-2026
            - link "写真AC" [ref=e726] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
      - generic [ref=e728]:
        - generic [ref=e729]: 無料で高品質な写真をダウンロードできます！加工や商用利用もOK！
        - link "無料ダウンロード会員登録はこちら" [ref=e730] [cursor=pointer]:
          - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252583%252593%2525E3%252582%2525B8%2525E3%252583%25258D%2525E3%252582%2525B9&lang=jp
  - text:                   
  - generic [ref=e731] [cursor=pointer]:
    - generic:
      - paragraph: ご質問は
      - paragraph: こちらから！
    - img "chat-icon" [ref=e733]
    - generic [ref=e734]: ×
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