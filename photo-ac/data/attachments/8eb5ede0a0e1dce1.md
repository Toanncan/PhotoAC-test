# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-012: Filter và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) qua Toolbar @guest @filter
- Location: photo-ac/src/tests/downloader/search-guest.spec.ts:364:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('img.thumbnail-image, img.thumbnail').first().or(getByText(/該当する写真がありませんでした|写真は見つかりませんでした/).first()) to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&by_ai=&sizesec=all&orientation=all&color=all&model_count=1&age=all&nq=&creator=&ngcreator=&qid=&exclude_ai=on&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70"
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
  - generic [ref=e103]:
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
    - generic [ref=e126]:
      - generic [ref=e129]:
        - generic [ref=e130]:
          - generic [ref=e131]:
            - navigation "breadcrumb" [ref=e133]:
              - list [ref=e134]:
                - listitem [ref=e135]:
                  - link "写真AC" [ref=e136] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e137]:
                  - text: /
                  - link "ビジネス" [ref=e138] [cursor=pointer]:
                    - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
            - generic [ref=e139]:
              - button "広告を非表示にする 広告を非表示にする" [ref=e143] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e144]
                - generic [ref=e145]: 広告を非表示にする
              - button "広告を非表示にする 広告を非表示にする" [ref=e149] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e150]
                - generic [ref=e151]: 広告を非表示にする
            - generic [ref=e152]:
              - heading "「ビジネス」の写真素材" [level=1] [ref=e153]
              - text: 102,228点
          - generic [ref=e156]:
            - button "検索" [ref=e157] [cursor=pointer]
            - generic [ref=e158]: 検索フィルター
            - generic [ref=e159]:
              - generic [ref=e161]:
                - generic [ref=e162]:
                  - button "カテゴリー " [ref=e163] [cursor=pointer]:
                    - text: カテゴリー
                    - generic [ref=e164]: 
                  - text:  
                - button "ファイル・向き " [ref=e166] [cursor=pointer]:
                  - text: ファイル・向き
                  - generic [ref=e167]: 
                - button "色 " [ref=e169] [cursor=pointer]:
                  - generic [ref=e171]: 色
                  - generic [ref=e172]: 
                - button "人物指定 " [ref=e174] [cursor=pointer]:
                  - text: 人物指定
                  - generic [ref=e175]: 
                - button "除外キーワード " [ref=e177] [cursor=pointer]:
                  - text: 除外キーワード
                  - generic [ref=e178]: 
                - button "詳細検索 " [ref=e180] [cursor=pointer]:
                  - text: 詳細検索
                  - generic [ref=e181]: 
                - button "表示条件 " [ref=e183] [cursor=pointer]:
                  - text: 表示条件
                  - generic [ref=e184]: 
              - button "関連性の高い順／70件表示 " [ref=e189] [cursor=pointer]:
                - text: 関連性の高い順／70件表示
                - generic [ref=e190]: 
            - generic [ref=e192]:
              - button "1人 削除" [ref=e193] [cursor=pointer]:
                - text: 1人
                - link "削除" [ref=e194]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&layout=vertical
                  - img [ref=e195]
              - link "すべてクリア" [ref=e197] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9
          - generic [ref=e198]:
            - generic [ref=e199]:
              - figure [ref=e200]:
                - generic [ref=e201]:
                  - img "プレミアム素材" [ref=e203]
                  - text: 
                - img "AIと人間の握手 ビジネス,握手,協力の写真素材" [ref=e204]
                - text: 
              - figure [ref=e205]
              - figure [ref=e206]:
                - generic [ref=e207]: 
                - img "オフィスのビジネスフォン 電話イメージ 電話,ビジネスフォン,電話機の写真素材" [ref=e208]
                - text:  
              - figure [ref=e209]:
                - generic [ref=e210]: 
                - img "ビジネスマン ビジネス,ビジネスマン,男性の写真素材" [ref=e211]
                - text:  
              - figure [ref=e212]:
                - generic [ref=e213]:
                  - img "プレミアム素材" [ref=e215]
                  - text: 
                - img "ノートパソコンを前にスマホで電話する男性 男性,ビジネス,ビジネスマンの写真素材" [ref=e216]
                - text: 
              - figure [ref=e217]:
                - generic [ref=e218]: 
                - img "運転するドライバー 男性,運送,トラックの写真素材" [ref=e219]
                - text:  
              - figure [ref=e220]:
                - generic [ref=e221]: 
                - img "パソコン作業をする作業着を着た男性 男性,ビジネス,ビジネスマンの写真素材" [ref=e222]
                - text:  
              - figure [ref=e223]:
                - generic [ref=e224]: 
                - img "テレワークシーン パソコン,ビジネス,オンラインの写真素材" [ref=e225]
                - text:  
              - figure [ref=e226]:
                - generic [ref=e227]: 
                - img "ノートパソコンを持つビジネスウーマン ビジネス,女性,人物の写真素材" [ref=e228]
                - text:  
              - figure [ref=e229]
              - figure [ref=e230]:
                - generic [ref=e231]: 
                - img "スマホとパソコンを持って考える女性 女性,ビジネス,スマホの写真素材" [ref=e232]
                - text:  
              - figure [ref=e233]:
                - generic [ref=e234]: 
                - img "バツ印をつくるビジネスマン ばつ,ビジネスマン,注意の写真素材" [ref=e235]
                - text:  
              - figure [ref=e236]:
                - generic [ref=e237]: 
                - img "屋外に立つビジネスウーマン 女性,ビジネス,ビジネスウーマンの写真素材" [ref=e238]
                - text:  
              - figure [ref=e239]:
                - generic [ref=e240]: 
                - img "ノートパソコンを使うビジネスマン 男性,ビジネス,パソコンの写真素材" [ref=e241]
                - text:  
              - figure [ref=e242]:
                - generic [ref=e243]: 
                - img "握手 横浜 握手,ビジネス,横浜の写真素材" [ref=e244]
                - text:  
              - figure [ref=e245]:
                - generic [ref=e246]: 
                - img "オフィスでパソコンを使うビジネスウーマン ビジネスウーマン,オフィス,パソコンの写真素材" [ref=e247]
                - text:  
              - figure [ref=e248]:
                - generic [ref=e249]: 
                - img "苦悩するビジネスマン(その５７) ビジネス,ビジネスマン,男性の写真素材" [ref=e250]
                - text:  
              - figure [ref=e252]:
                - generic [ref=e253]:
                  - img "プレミアム素材" [ref=e255]
                  - text: 
                - img "ノートパソコンを使う女性の手元 ノートパソコン,仕事,手元の写真素材" [ref=e256]
                - text: 
              - figure [ref=e257]:
                - generic [ref=e258]: 
                - img "男性とビジネスアイコン コミュニケーション 仕事,人物,ビジネスの写真素材" [ref=e259]
                - text:  
              - figure [ref=e260]:
                - generic [ref=e261]:
                  - img "プレミアム素材" [ref=e263]
                  - text: 
                - img "ダイニングテーブルでノートパソコンを見ながらスマホで電話する男性 ビジネス,男性,外国人の写真素材" [ref=e264]
                - text: 
              - figure [ref=e265]:
                - generic [ref=e266]: 
                - img "ノートパソコンを持つビジネスウーマン ビジネス,女性,人物の写真素材" [ref=e267]
                - text:  
              - figure [ref=e268]:
                - generic [ref=e269]:
                  - img "プレミアム素材" [ref=e271]
                  - text: 
                - img "お菓子作りを配信する女性 女性,お菓子作り,動画の写真素材" [ref=e272]
                - text: 
              - figure [ref=e273]:
                - generic [ref=e274]:
                  - img "プレミアム素材" [ref=e276]
                  - text: 
                - img "外でパソコンを見ている男性 仕事,男性,外国人の写真素材" [ref=e277]
                - text: 
              - figure [ref=e278]:
                - generic [ref=e279]:
                  - img "プレミアム素材" [ref=e281]
                  - text: 
                - img "猫を抱えた獣医の上半身 猫,動物病院,抱っこの写真素材" [ref=e282]
                - text: 
              - figure [ref=e283]:
                - generic [ref=e284]: 
                - img "バッグを持って振り返る女性ビジネスマン ビジネス,女性,人物の写真素材" [ref=e285]
                - text:  
              - figure [ref=e287]:
                - generic [ref=e288]: 
                - img "頭を押さえて悩むビジネスウーマン 女性,考える,悩むの写真素材" [ref=e289]
                - text:  
              - figure [ref=e290]:
                - generic [ref=e291]: 
                - img "ソファでスマホを使うビジネスウーマン 女性,ビジネス,スマホの写真素材" [ref=e292]
                - text:  
              - figure [ref=e293]:
                - generic [ref=e294]: 
                - img "疲れを訴える警備の日本人男性 警備員,ガードマン,男性の写真素材" [ref=e295]
                - text:  
              - figure [ref=e296]:
                - generic [ref=e297]: 
                - img "とても辛そうなビジネスマン(その２０) 心の闇,闇に染まる,ストレスの写真素材" [ref=e298]
                - text:  
              - figure [ref=e299]:
                - generic [ref=e300]: 
                - img "パソコン画面を見て眉をひそめる男性 仕事,眉をひそめる,しかめるの写真素材" [ref=e301]
                - text:  
              - figure [ref=e302]:
                - generic [ref=e303]: 
                - img "勉強する女性 勉強,学習,本の写真素材" [ref=e304]
                - text:  
              - figure [ref=e305]:
                - generic [ref=e306]: 
                - img "ガッツポーズをする男性ビジネスマン 男性,ビジネス,ビジネスマンの写真素材" [ref=e307]
                - text:  
              - figure [ref=e308]:
                - generic [ref=e309]: 
                - img "笑顔のビジネスウーマン 女性,ビジネスウーマン,仕事の写真素材" [ref=e310]
                - text:  
              - figure [ref=e312]:
                - generic [ref=e313]:
                  - img "プレミアム素材" [ref=e315]
                  - text: 
                - img "ソファーでノートパソコンを前にしてスマホで電話している女性 女性,ビジネスウーマン,キャリアウーマンの写真素材" [ref=e316]
                - text: 
              - figure [ref=e317]:
                - generic [ref=e318]: 
                - img "屋外で悩むアジア人のビジネスマンの男性 ビジネスマン,男性,ビジネスの写真素材" [ref=e319]
                - text:  
              - figure [ref=e320]:
                - generic [ref=e321]: 
                - img "疲れを訴える日本人 警備員,ガードマン,男性の写真素材" [ref=e322]
                - text:  
              - figure [ref=e323]:
                - generic [ref=e324]: 
                - img "スマホを持つ笑顔のビジネスウーマン 女性,スマホ,スマートフォンの写真素材" [ref=e325]
                - text:  
              - figure [ref=e326]:
                - generic [ref=e327]:
                  - img "プレミアム素材" [ref=e329]
                  - text: 
                - img "仕事に埋もれる人 多忙,過労,オーバーワークの写真素材" [ref=e330]
                - text: 
              - figure [ref=e331]:
                - generic [ref=e332]: 
                - img "手でバツを作るビジネスマン 禁止のイメージ バツ,ダメ,拒絶の写真素材" [ref=e333]
                - text:  
              - figure [ref=e334]:
                - generic [ref=e335]: 
                - img "デスクワークをするビジネスマン 男性,ビジネス,ビジネスマンの写真素材" [ref=e336]
                - text:  
              - figure [ref=e337]:
                - generic [ref=e338]: 
                - img "受付の仕事 女性 business 働く女性,デスクワーク,キャリアウーマンの写真素材" [ref=e339]
                - text:  
              - figure [ref=e341]:
                - generic [ref=e342]: 
                - img "苦悩するビジネスマン(その５４) ビジネス,ビジネスマン,男性の写真素材" [ref=e343]
                - text:  
              - figure [ref=e344]:
                - generic [ref=e345]: 
                - img "悩む男性 男性,仕事,ビジネスの写真素材" [ref=e346]
                - text:  
              - figure [ref=e347]:
                - generic [ref=e348]:
                  - img "プレミアム素材" [ref=e350]
                  - text: 
                - img "会議会議室で仕事をする女性 女性,ビジネスウーマン,キャリアウーマンの写真素材" [ref=e351]
                - text: 
              - figure [ref=e352]:
                - generic [ref=e353]: 
                - img "両手を掲げ喜ぶスーツの男性(その７９) ビジネス,男性,不動産の写真素材" [ref=e354]
                - text:  
              - figure [ref=e355]:
                - generic [ref=e356]: 
                - img "ノートパソコンを持つ女性ビジネスマン 女性,人物,ビジネスの写真素材" [ref=e357]
                - text:  
              - figure [ref=e358]:
                - generic [ref=e359]:
                  - img "プレミアム素材" [ref=e361]
                  - text: 
                - img "カメラ目線の女性 女性,車椅子,障害者の写真素材" [ref=e362]
                - text: 
              - figure [ref=e363]:
                - generic [ref=e364]: 
                - img "秋の空と笑顔のビジネスウーマン 女性,ビジネス,パソコンの写真素材" [ref=e365]
                - text:  
              - figure [ref=e366]:
                - generic [ref=e367]: 
                - img "契約書にサインする人の手元 契約,契約書,ビジネスの写真素材" [ref=e368]
                - text:  
              - figure [ref=e370]:
                - generic [ref=e371]: 
                - img "リボンをつけた女性 女性,コンシェルジュ,制服の写真素材" [ref=e372]
                - text:  
              - figure [ref=e373]:
                - generic [ref=e374]:
                  - img "プレミアム素材" [ref=e376]
                  - text: 
                - img "オフィスでオンライン会議をする会社員 オンライン会議,リモート会議,パソコンの写真素材" [ref=e377]
                - text: 
              - figure [ref=e378]:
                - generic [ref=e379]: 
                - img "パソコン作業をする女性 女性,ビジネス,ノートパソコンの写真素材" [ref=e380]
                - text:  
              - figure [ref=e381]:
                - generic [ref=e382]: 
                - img "タブレット・PCを持つビジネスウーマン ビジネスウーマン,女性,ビジネスの写真素材" [ref=e383]
                - text:  
              - figure [ref=e384]:
                - generic [ref=e385]: 
                - img "春のビジネスウーマン ビジネス,女性,スマホの写真素材" [ref=e386]
                - text:  
              - figure [ref=e387]:
                - generic [ref=e388]: 
                - img "笑顔で電話するビジネスマン(その４６ ビジネスマン,ビジネス,男性の写真素材" [ref=e389]
                - text:  
              - figure [ref=e390]:
                - generic [ref=e391]:
                  - img "プレミアム素材" [ref=e393]
                  - text: 
                - img "両指でポーズする女性 女性,ビジネスウーマン,日本人の写真素材" [ref=e394]
                - text: 
              - figure [ref=e395]:
                - generic [ref=e396]: 
                - img "PSD ノートPCとビジネスマン ビジネス,収入,副業の写真素材" [ref=e397]
                - text:  
              - figure [ref=e399]:
                - generic [ref=e400]: 
                - img "パソコンを操作する女性 ビジネス,女性,パソコンの写真素材" [ref=e401]
                - text:  
              - figure [ref=e402]:
                - generic [ref=e403]: 
                - img "PCとサンドイッチとスーツ男性(その７) ランチ,軽食,お手軽の写真素材" [ref=e404]
                - text:  
              - figure [ref=e405]:
                - generic [ref=e406]: 
                - img "案内するビジネスウーマン 女性,ビジネスウーマン,仕事の写真素材" [ref=e407]
                - text:  
              - figure [ref=e408]:
                - generic [ref=e409]: 
                - img "ビジネスウーマン ポートレート 女性,ビジネスウーマン,仕事の写真素材" [ref=e410]
                - text:  
              - figure [ref=e411]:
                - generic [ref=e412]: 
                - img "ノートパソコンを持つビジネスウーマン ビジネス,女性,人物の写真素材" [ref=e413]
                - text:  
              - figure [ref=e414]:
                - generic [ref=e415]: 
                - img "男性労働者 男性,仕事,ビジネスの写真素材" [ref=e416]
                - text:  
              - figure [ref=e417]:
                - generic [ref=e418]: 
                - img "リボンスカーフをつけたビジネスウーマン パソコン,女性,オフィスの写真素材" [ref=e419]
                - text:  
              - figure [ref=e420]:
                - generic [ref=e421]: 
                - img "動画編集作業のイメージ３ ビジネス,ビジネスマン,パソコンの写真素材" [ref=e422]
                - text:  
              - figure [ref=e424]:
                - generic [ref=e425]: 
                - img "青空と親子 親子,抱っこ,家族の写真素材" [ref=e426]
                - text:  
              - figure [ref=e427]:
                - generic [ref=e428]: 
                - img "ノートパソコンを持つ高齢の男性 注目,リモートワーク,中高年の写真素材" [ref=e429]
                - text:  
              - figure [ref=e430]:
                - generic [ref=e431]: 
                - img "パソコンを操作する女性の手 リモートワークイメージ パソコン,ビジネス,オンラインの写真素材" [ref=e432]
                - text:  
              - figure [ref=e433]:
                - generic [ref=e434]: 
                - img "カメラ目線で微笑むビジネスマン 男性,ビジネス,ビジネススーツの写真素材" [ref=e435]
                - text:  
              - figure [ref=e436]:
                - generic [ref=e437]:
                  - img "プレミアム素材" [ref=e439]
                  - text: 
                - img "スマホで電話するジャケットを着た女性1 女性,日本人,若者の写真素材" [ref=e440]
                - text: 
              - figure [ref=e441]:
                - generic [ref=e442]:
                  - img "プレミアム素材" [ref=e444]
                  - text: 
                - img "ノートパソコンを抱えて立つ男性 男性,日本人,ノートパソコンの写真素材" [ref=e445]
                - text: 
              - figure [ref=e446]:
                - generic [ref=e447]: 
                - img "外で仕事するビジネスウーマン ビジネス,女性,ビジネスウーマンの写真素材" [ref=e448]
                - text:  
            - generic [ref=e449]:
              - generic [ref=e450]: 関連キーワード
              - link " 仕事" [ref=e451] [cursor=pointer]:
                - /url: /main/search?q=%E4%BB%95%E4%BA%8B&model_count=1&layout=vertical
                - generic [ref=e452]: 
                - text: 仕事
              - link " 女性 ビジネス" [ref=e453] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e454]: 
                - text: 女性 ビジネス
              - link " 女性 仕事" [ref=e455] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7+%E4%BB%95%E4%BA%8B&model_count=1&layout=vertical
                - generic [ref=e456]: 
                - text: 女性 仕事
              - link " ビジネス 握手" [ref=e457] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E6%8F%A1%E6%89%8B&model_count=1&layout=vertical
                - generic [ref=e458]: 
                - text: ビジネス 握手
              - link " ビジネス 女性" [ref=e459] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E5%A5%B3%E6%80%A7&model_count=1&layout=vertical
                - generic [ref=e460]: 
                - text: ビジネス 女性
              - link " 男性 ビジネス" [ref=e461] [cursor=pointer]:
                - /url: /main/search?q=%E7%94%B7%E6%80%A7+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e462]: 
                - text: 男性 ビジネス
              - link " ビジネス 背景" [ref=e463] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E8%83%8C%E6%99%AF&model_count=1&layout=vertical
                - generic [ref=e464]: 
                - text: ビジネス 背景
              - link " ビジネスホテル" [ref=e465] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E3%83%9B%E3%83%86%E3%83%AB&model_count=1&layout=vertical
                - generic [ref=e466]: 
                - text: ビジネスホテル
              - link " CG ビジネス" [ref=e467] [cursor=pointer]:
                - /url: /main/search?q=CG+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e468]: 
                - text: CG ビジネス
              - link " ビジネスシーン" [ref=e469] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E3%82%B7%E3%83%BC%E3%83%B3&model_count=1&layout=vertical
                - generic [ref=e470]: 
                - text: ビジネスシーン
              - link " 不動産 ビジネス" [ref=e471] [cursor=pointer]:
                - /url: /main/search?q=%E4%B8%8D%E5%8B%95%E7%94%A3+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e472]: 
                - text: 不動産 ビジネス
              - link " パソコン ビジネス" [ref=e473] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e474]: 
                - text: パソコン ビジネス
              - link " ビジネス イメージ" [ref=e475] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8&model_count=1&layout=vertical
                - generic [ref=e476]: 
                - text: ビジネス イメージ
              - link " ビジネス 男性" [ref=e477] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E7%94%B7%E6%80%A7&model_count=1&layout=vertical
                - generic [ref=e478]: 
                - text: ビジネス 男性
              - link " 電話 ビジネス" [ref=e479] [cursor=pointer]:
                - /url: /main/search?q=%E9%9B%BB%E8%A9%B1+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e480]: 
                - text: 電話 ビジネス
              - link " 外国人 ビジネス" [ref=e481] [cursor=pointer]:
                - /url: /main/search?q=%E5%A4%96%E5%9B%BD%E4%BA%BA+%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e482]: 
                - text: 外国人 ビジネス
              - link " ネットビジネス" [ref=e483] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%8D%E3%83%83%E3%83%88%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&layout=vertical
                - generic [ref=e484]: 
                - text: ネットビジネス
              - link " ビジネス 笑顔" [ref=e485] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E7%AC%91%E9%A1%94&model_count=1&layout=vertical
                - generic [ref=e486]: 
                - text: ビジネス 笑顔
              - link " ビジネス 会議" [ref=e487] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9+%E4%BC%9A%E8%AD%B0&model_count=1&layout=vertical
                - generic [ref=e488]: 
                - text: ビジネス 会議
            - list [ref=e489]:
              - listitem [ref=e490]:
                - link "1" [ref=e491] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e492]:
                - link "2" [ref=e493] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&p=2&layout=vertical
              - listitem [ref=e494]:
                - link "3" [ref=e495] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&p=3&layout=vertical
              - listitem [ref=e496]:
                - link "4" [ref=e497] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&p=4&layout=vertical
              - listitem [ref=e498]:
                - link "5" [ref=e499] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&p=5&layout=vertical
              - listitem [ref=e500]:
                - link "6" [ref=e501] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&p=6&layout=vertical
              - listitem [ref=e502]: ...
              - listitem [ref=e503]:
                - link "次に" [ref=e504] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&model_count=1&p=2&layout=vertical
                  - generic [ref=e505]: 
            - generic [ref=e506]: 全102,228件中1 - 70件
            - paragraph [ref=e507]:
              - text: 「
              - strong [ref=e508]: ビジネス
              - text: 」のキーワードで新規投稿されたフリー写真素材・画像を掲載しております。JPEG形式の高解像度画像が無料でダウンロードできます。気に入った
              - strong [ref=e509]: ビジネス
              - text: の写真素材・画像が見つかったら、写真をクリックして、無料ダウンロードページへお進み下さい。高品質なロイヤリティーフリー写真素材を無料でダウンロードしていただけます。商用利用もOKなので、ビジネス写真をチラシやポスター、WEBサイトなどの広告、ポストカードや年賀状などにもご利用いただけます。クレジット表記や許可も必要ありません。
            - generic [ref=e510]:
              - generic [ref=e512]: 写真ACグループサイトの「ビジネス」の検索結果（同じアカウントで無料ダウンロードできます）
              - img "loading" [ref=e515]
              - separator [ref=e516]
              - generic [ref=e517]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e521] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e522]
                  - generic [ref=e523]: 広告を非表示にする
                - button "広告を非表示にする 広告を非表示にする" [ref=e527] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e528]
                  - generic [ref=e529]: 広告を非表示にする
              - separator [ref=e530]
              - img "loading" [ref=e533]
              - separator [ref=e534]
              - img "loading" [ref=e537]
              - separator [ref=e538]
              - img "loading" [ref=e541]
              - separator [ref=e542]
            - generic [ref=e545]:
              - strong [ref=e546]: 写真素材リクエスト受け付け中
              - text: ※100%対応はできませんが最大限努力をいたします。
              - generic [ref=e547]:
                - textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信" [ref=e549]
                - button "素材をリクエスト" [ref=e550] [cursor=pointer]
        - text: 
      - contentinfo [ref=e552]:
        - generic [ref=e555]:
          - generic [ref=e556]: 昨日のダウンロード数：21,917
          - generic [ref=e557]: 先月のダウンロード数：1,124,624
          - generic [ref=e558]: 総会員数：1600万人を突破しました
        - generic [ref=e560]:
          - generic [ref=e561]:
            - generic [ref=e562]:
              - generic [ref=e563]: 写真ACについて 
              - list [ref=e564]:
                - listitem [ref=e565]:
                  - link "写真ACとは" [ref=e566] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e567]:
                  - link "運営会社" [ref=e568] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e569]:
                  - link "個人情報保護方針" [ref=e570] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e571]:
                  - link "特定個人情報基本方針" [ref=e572] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e573]:
                  - link "特定商取引法に基づく表記" [ref=e574] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e575]:
                  - link "サイトマップ" [ref=e576] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e577]:
                  - link "セキュリティポリシー" [ref=e578] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e579]:
              - generic [ref=e580]: 会員登録 
              - list [ref=e581]:
                - listitem [ref=e582]:
                  - link "無料会員登録" [ref=e583] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252583%252593%2525E3%252582%2525B8%2525E3%252583%25258D%2525E3%252582%2525B9%2526by_ai%253D%2526sizesec%253Dall%2526orientation%253Dall%2526color%253Dall%2526model_count%253D1%2526age%253Dall%2526nq%253D%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526exclude_ai%253Don%2526layout%253Dvertical%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall%2526srt%253Ddlrank%2526pp%253D70&lang=jp
                - listitem [ref=e584]:
                  - link "プレミアム会員登録" [ref=e585] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252583%252593%2525E3%252582%2525B8%2525E3%252583%25258D%2525E3%252582%2525B9%2526by_ai%253D%2526sizesec%253Dall%2526orientation%253Dall%2526color%253Dall%2526model_count%253D1%2526age%253Dall%2526nq%253D%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526exclude_ai%253Don%2526layout%253Dvertical%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall%2526srt%253Ddlrank%2526pp%253D70&lang=jp&fromButton=premium_action
                - listitem [ref=e586]:
                  - link "無料クリエイター会員登録" [ref=e587] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e588]:
              - generic [ref=e589]: プレミアム会員サービス 
              - list [ref=e590]:
                - listitem [ref=e591]:
                  - link "プレミアム会員登録" [ref=e592] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e593]:
                  - link "法人・複数名向けプラン" [ref=e594] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e595]:
                  - link "商品化ライセンス" [ref=e596] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e597]:
                  - link "あんしんサポート" [ref=e598] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e599]:
              - generic [ref=e600]: ヘルプ＆ガイド 
              - list [ref=e601]:
                - listitem [ref=e602]:
                  - link "ヘルプ" [ref=e603] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e604]:
                  - link "利用規約" [ref=e605] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e606]:
                  - link "プレミアム会員利用規約" [ref=e607] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e608]:
                  - link "AC写真AIラボ利用規約" [ref=e609] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e610]:
              - generic [ref=e611]: グループサイト 
              - list [ref=e612]:
                - listitem [ref=e613]:
                  - link "イラストAC" [ref=e614] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e615]:
                  - link "シルエットAC" [ref=e616] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e617]:
                  - link "フリービーAC" [ref=e618] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e619]:
                  - link "年賀状AC" [ref=e620] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e621]:
                  - link "動画AC" [ref=e622] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e623]:
                  - link "デザインAC" [ref=e624] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e625]:
                  - link "ACデータ" [ref=e626] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e627]:
                  - link "明細AC" [ref=e628] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e629]:
            - link "twitter_btn" [ref=e630] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e631]:
                - img [ref=e632]
            - link "facebook_btn" [ref=e634] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e635]:
                - generic [ref=e636]: 
            - link "pinterest_btn" [ref=e637] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e638]:
                - generic [ref=e639]: 
            - link "blog_btn" [ref=e640] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e641]:
                - generic [ref=e642]: 
            - link "feedback_modal_btn" [ref=e643] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e644]:
                - generic [ref=e645]: 
                - text: ご意見・ご要望
          - generic [ref=e647]:
            - text: © 2011-2026
            - link "写真AC" [ref=e648] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
      - generic [ref=e650]:
        - generic [ref=e651]: 無料で高品質な写真をダウンロードできます！加工や商用利用もOK！
        - link "無料ダウンロード会員登録はこちら" [ref=e652] [cursor=pointer]:
          - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252583%252593%2525E3%252582%2525B8%2525E3%252583%25258D%2525E3%252582%2525B9%2526by_ai%253D%2526sizesec%253Dall%2526orientation%253Dall%2526color%253Dall%2526model_count%253D1%2526age%253Dall%2526nq%253D%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526exclude_ai%253Don%2526layout%253Dvertical%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall%2526srt%253Ddlrank%2526pp%253D70&lang=jp
  - text:                   
  - img [ref=e654]
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
      |                                           ^ Error: locator.waitFor: Test timeout of 90000ms exceeded.
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