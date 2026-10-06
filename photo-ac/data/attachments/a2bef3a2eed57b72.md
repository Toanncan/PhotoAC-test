# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-009: Filter và chuyển đổi Kích thước ảnh (M / L) @guest @filter
- Location: photo-ac/src/tests/downloader/search-guest.spec.ts:276:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('img.thumbnail-image, img.thumbnail').first().or(getByText(/該当する写真がありませんでした|写真は見つかりませんでした/).first()) to be visible
    - waiting for" https://test-lien.photo-ac.com/main/search?by_ai=&q=sky&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all" navigation to finish...

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
                - button "AI Search is off" [ref=e25] [cursor=pointer]:
                  - img "AI Search is off" [ref=e26]
                - text: 
                - generic [ref=e27]:
                  - searchbox "キーワード（例：女性）" [ref=e28]: sky
                  - button "リセット" [ref=e29] [cursor=pointer]:
                    - img [ref=e31]
                  - generic [ref=e33]: sky
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
                  - link "sky" [ref=e88] [cursor=pointer]:
                    - /url: /main/search?q=sky
            - button "広告を非表示にする 広告を非表示にする" [ref=e93] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e94]
              - generic [ref=e95]: 広告を非表示にする
            - generic [ref=e96]:
              - heading "「sky」の写真素材" [level=1] [ref=e97]
              - text: 2,244,681点
          - generic [ref=e100]:
            - button "検索" [ref=e101] [cursor=pointer]
            - generic [ref=e102]:
              - generic [ref=e104]:
                - generic [ref=e105]: 検索フィルター
                - generic [ref=e106]:
                  - button "カテゴリー " [ref=e107] [cursor=pointer]:
                    - text: カテゴリー
                    - generic [ref=e108]: 
                  - text:  
                - button "ファイル・向き " [ref=e110] [cursor=pointer]:
                  - text: ファイル・向き
                  - generic [ref=e111]: 
                - button "色 " [ref=e113] [cursor=pointer]:
                  - generic [ref=e115]: 色
                  - generic [ref=e116]: 
                - button "人物指定 " [ref=e118] [cursor=pointer]:
                  - text: 人物指定
                  - generic [ref=e119]: 
                - button "除外キーワード " [ref=e121] [cursor=pointer]:
                  - text: 除外キーワード
                  - generic [ref=e122]: 
                - button "詳細検索 " [ref=e124] [cursor=pointer]:
                  - text: 詳細検索
                  - generic [ref=e125]: 
                - button "表示条件 " [ref=e127] [cursor=pointer]:
                  - text: 表示条件
                  - generic [ref=e128]: 
              - button "関連性の高い順／70件表示 " [ref=e133] [cursor=pointer]:
                - text: 関連性の高い順／70件表示
                - generic [ref=e134]: 
          - generic [ref=e135]:
            - generic [ref=e136]:
              - figure [ref=e137]:
                - generic [ref=e138]: 
                - img "青空と木々の風景 余白 青空,空,木々の写真素材" [ref=e139]
                - text:  
              - figure [ref=e140]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e143] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e144]
                  - generic [ref=e145]: 広告を非表示にする
              - figure [ref=e146]:
                - generic [ref=e147]: 
                - img "青空と木々の余白風景 青空,空,木々の写真素材" [ref=e148]
                - text:  
              - figure [ref=e149]:
                - generic [ref=e150]: 
                - img "水平線と砂浜 海,水平線,砂浜の写真素材" [ref=e151]
                - text:  
              - figure [ref=e152]:
                - generic [ref=e153]: 
                - img "木と青い空 青い空,青空,空の写真素材" [ref=e154]
                - text:  
              - figure [ref=e155]:
                - generic [ref=e156]: 
                - img "青空と森の上部余白多め 青空,空,雲の写真素材" [ref=e157]
                - text:  
              - figure [ref=e158]:
                - generic [ref=e159]: 
                - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材" [ref=e160]
                - generic [ref=e162]: New
                - text:  
              - figure [ref=e163]:
                - generic [ref=e164]: 
                - img "木と青い空 青い空,青空,空の写真素材" [ref=e165]
                - text:  
              - figure [ref=e166]:
                - generic [ref=e167]: 
                - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材" [ref=e168]
                - generic [ref=e170]: New
                - text:  
              - figure [ref=e171]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e174] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e175]
                  - generic [ref=e176]: 広告を非表示にする
              - figure [ref=e177]:
                - generic [ref=e178]: 
                - img "木と青い空 青い空,青空,空の写真素材" [ref=e179]
                - text:  
              - figure [ref=e180]:
                - generic [ref=e181]: 
                - img "芝生 木 青い空 青い空,青空,空の写真素材" [ref=e182]
                - text:  
              - figure [ref=e183]:
                - generic [ref=e184]: 
                - img "木と青い空 木,樹木,木々の写真素材" [ref=e185]
                - text:  
              - figure [ref=e186]:
                - generic [ref=e187]: 
                - img "ビルと青い空 白い曇 ビル,建物,青い空の写真素材" [ref=e188]
                - text:  
              - figure [ref=e189]:
                - generic [ref=e190]: 
                - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材" [ref=e191]
                - generic [ref=e193]: New
                - text:  
              - figure [ref=e194]:
                - generic [ref=e195]: 
                - img "青い空 白い曇 青い空,白い曇,青空の写真素材" [ref=e196]
                - text:  
              - figure [ref=e197]:
                - generic [ref=e198]: 
                - img "屋根の上のソーラ－パネル １ ソーラーパネル,太陽光発電,パネルの写真素材" [ref=e199]
                - text:  
              - figure [ref=e201]:
                - generic [ref=e202]: 
                - img "山小屋のある風景（スイス、マイエンフェルト） アウトドア,アウトドアライフ,ハイキングの写真素材" [ref=e203]
                - text:  
              - figure [ref=e204]:
                - generic [ref=e205]: 
                - img "建物と青い空 住宅,住宅街,建物の写真素材" [ref=e206]
                - text:  
              - figure [ref=e207]:
                - generic [ref=e208]: 
                - img "飛行船 飛行船,空,そらの写真素材" [ref=e209]
                - text:  
              - figure [ref=e210]:
                - generic [ref=e211]: 
                - img "住宅街の青い空と白い曇 住宅街,住宅,建物の写真素材" [ref=e212]
                - generic [ref=e214]: New
                - text:  
              - figure [ref=e215]:
                - generic [ref=e216]: 
                - img "アニメのワンシーンみたいな坂道 青空,そら,ソラの写真素材" [ref=e217]
                - text:  
              - figure [ref=e218]:
                - generic [ref=e219]: 
                - img "木と青い空 青い空,青空,空の写真素材" [ref=e220]
                - text:  
              - figure [ref=e221]:
                - generic [ref=e222]: 
                - img "松本城 松本城,長野,国宝の写真素材" [ref=e223]
                - text:  
              - figure [ref=e224]:
                - generic [ref=e225]: 
                - img "建物と青い空 建物,青い空,白い曇の写真素材" [ref=e226]
                - text:  
              - figure [ref=e228]:
                - generic [ref=e229]: 
                - img "晩秋の筑波山 筑波山,晩秋,秋の写真素材" [ref=e230]
                - generic [ref=e232]: New
                - text:  
              - figure [ref=e233]:
                - generic [ref=e234]: 
                - img "青空に泳ぐ鯉のぼり 鯉のぼり,こいのぼり,コイノボリの写真素材" [ref=e235]
                - text:  
              - figure [ref=e236]:
                - generic [ref=e237]: 
                - img "古民家の茅葺屋根と夏の空 茅葺き屋根,古民家,ルーフの写真素材" [ref=e238]
                - text:  
              - figure [ref=e239]:
                - generic [ref=e240]: 
                - img "3羽のカモメと青空 青空,かもめ,空の写真素材" [ref=e241]
                - text:  
              - figure [ref=e242]:
                - generic [ref=e243]: 
                - img "芝生 木 青い空 青い空,青空,空の写真素材" [ref=e244]
                - text:  
              - figure [ref=e245]:
                - generic [ref=e246]: 
                - img "夏の田んぼと積乱雲 入道雲,sky,空の写真素材" [ref=e247]
                - text:  
              - figure [ref=e248]:
                - generic [ref=e249]: 
                - img "平和の森公園 自然,風景,skyの写真素材" [ref=e250]
                - text:  
              - figure [ref=e251]:
                - generic [ref=e252]: 
                - img "阿蘇くじゅう国立公園 空,風景,シルエットの写真素材" [ref=e253]
                - text:  
              - figure [ref=e255]:
                - generic [ref=e256]: 
                - img "建物と青い空 白い曇 ビル,建物,青い空の写真素材" [ref=e257]
                - text:  
              - figure [ref=e258]:
                - generic [ref=e259]: 
                - img "芝生 木 建物 青い空,青空,空の写真素材" [ref=e260]
                - text:  
              - figure [ref=e261]:
                - generic [ref=e262]: 
                - img "建物と青い空 植物,屋外,青い空の写真素材" [ref=e263]
                - text:  
              - figure [ref=e264]:
                - generic [ref=e265]: 
                - img "青空に泳ぐ鯉のぼり 鯉のぼり,こいのぼり,青空の写真素材" [ref=e266]
                - text:  
              - figure [ref=e267]:
                - generic [ref=e268]: 
                - img "芝生 木 青い空 青い空,青空,空の写真素材" [ref=e269]
                - text:  
              - figure [ref=e270]:
                - generic [ref=e271]: 
                - img "道と建物 住宅,住宅街,建物の写真素材" [ref=e272]
                - text:  
              - figure [ref=e273]:
                - generic [ref=e274]: 
                - img "建物と青い空 住宅,住宅街,建物の写真素材" [ref=e275]
                - text:  
              - figure [ref=e276]:
                - generic [ref=e277]: 
                - img "ビルと青い空 白い曇 ビル,建物,青い空の写真素材" [ref=e278]
                - text:  
              - figure [ref=e280]:
                - generic [ref=e281]: 
                - img "中野の路地 中野,東京,都内の写真素材" [ref=e282]
                - text:  
              - figure [ref=e283]:
                - generic [ref=e284]: 
                - img "ビルと青い空 白い曇 ビル,建物,青い空の写真素材" [ref=e285]
                - text:  
              - figure [ref=e286]:
                - generic [ref=e287]: 
                - img "見上げた秋空と木の葉 背景,水色,白の写真素材" [ref=e288]
                - text:  
              - figure [ref=e289]:
                - generic [ref=e290]: 
                - img "青い空 白い曇 木,樹木,木々の写真素材" [ref=e291]
                - text:  
              - figure [ref=e292]:
                - generic [ref=e293]: 
                - img "住宅街 青い空 住宅街,住宅,青い空の写真素材" [ref=e294]
                - text:  
              - figure [ref=e295]:
                - generic [ref=e296]: 
                - img "道と建物 住宅,住宅街,建物の写真素材" [ref=e297]
                - text:  
              - figure [ref=e298]:
                - generic [ref=e299]: 
                - img "街風景 自然 ビル,青空,空の写真素材" [ref=e300]
                - text:  
              - figure [ref=e301]:
                - generic [ref=e302]: 
                - img "三崎公園から望む小名浜港 空,青空,風景の写真素材" [ref=e303]
                - text:  
              - figure [ref=e305]:
                - generic [ref=e306]: 
                - img "青い空と白い雲 入道雲,積乱雲,空の写真素材" [ref=e307]
                - text:  
              - figure [ref=e308]:
                - generic [ref=e309]: 
                - img "空と太陽 空,青い空,青空の写真素材" [ref=e310]
                - text:  
              - figure [ref=e311]:
                - generic [ref=e312]: 
                - img "真夏の雲 雲,真夏,入道雲の写真素材" [ref=e313]
                - text:  
              - figure [ref=e314]:
                - generic [ref=e315]: 
                - img "南国の海 ビーチ,エメラルドグリーンの海,きれいな海の写真素材" [ref=e316]
                - text:  
              - figure [ref=e317]:
                - generic [ref=e318]: 
                - img "中野の町並み 中野,東京,都内の写真素材" [ref=e319]
                - text:  
              - figure [ref=e320]:
                - generic [ref=e321]: 
                - img "真夏の雲 雲,真夏,入道雲の写真素材" [ref=e322]
                - text:  
              - figure [ref=e323]:
                - generic [ref=e324]: 
                - img "山の上に広がる夏空 夏空,青空,空の写真素材" [ref=e325]
                - text:  
              - figure [ref=e326]:
                - generic [ref=e327]: 
                - img "お中道のコケモモの実 富士山,お中道,山頂の写真素材" [ref=e328]
                - text:  
              - figure [ref=e330]:
                - generic [ref=e331]: 
                - img "建物と積乱雲 積乱雲,晴れ,青い空の写真素材" [ref=e332]
                - text:  
              - figure [ref=e333]:
                - generic [ref=e334]: 
                - img "川と市街地の街並みと山並みと青空の風景 川,市街地,街並みの写真素材" [ref=e335]
                - generic [ref=e337]: New
                - text:  
              - figure [ref=e338]:
                - generic [ref=e339]: 
                - img "山の新緑と青空 新緑,空,青空の写真素材" [ref=e340]
                - text:  
              - figure [ref=e341]:
                - generic [ref=e342]: 
                - img "上り道 空,青空,そらの写真素材" [ref=e343]
                - text:  
              - figure [ref=e344]:
                - generic [ref=e345]: 
                - img "海 海,浜辺,砂浜の写真素材" [ref=e346]
                - text:  
              - figure [ref=e347]:
                - generic [ref=e348]: 
                - img "青空の宮ケ瀬湖と山々（神奈川県清川村） 宮ヶ瀬湖,清川村,湖の写真素材" [ref=e349]
                - text:  
              - figure [ref=e350]:
                - generic [ref=e351]: 
                - img "初秋の三瓶山と青空と白い雲 三瓶山,山,大田市の写真素材" [ref=e352]
                - text:  
              - figure [ref=e353]:
                - generic [ref=e354]: 
                - img "青空と緑に映える熊本城 熊本城,熊本,日本の城の写真素材" [ref=e355]
                - text:  
              - figure [ref=e357]:
                - generic [ref=e358]: 
                - img "青空と大文字山 大文字山,大文字,五山の写真素材" [ref=e359]
                - text:  
              - figure [ref=e360]:
                - generic [ref=e361]: 
                - img "カプリ そら,風景,眺めの写真素材" [ref=e362]
                - text:  
              - figure [ref=e363]:
                - generic [ref=e364]: 
                - img "木と青い空 木,樹木,自然の写真素材" [ref=e365]
                - text:  
              - figure [ref=e366]:
                - generic [ref=e367]: 
                - img "大きな木と青空 青空,木,葉の写真素材" [ref=e368]
                - text:  
              - figure [ref=e369]:
                - generic [ref=e370]: 
                - img "線路は続くよ 福島県,夏井駅,ホームの写真素材" [ref=e371]
                - text:  
              - figure [ref=e372]:
                - generic [ref=e373]: 
                - img "大淵笹場の富士が見える茶畑 お茶,新茶,大淵笹場の写真素材" [ref=e374]
                - text:  
              - figure [ref=e375]:
                - generic [ref=e376]: 
                - img "真っ白な教会 教会,大聖堂,広場の写真素材" [ref=e377]
                - text:  
            - list [ref=e378]:
              - listitem [ref=e379]:
                - link "1" [ref=e380] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e381]:
                - link "2" [ref=e382] [cursor=pointer]:
                  - /url: /main/search?q=sky&p=2
              - listitem [ref=e383]:
                - link "3" [ref=e384] [cursor=pointer]:
                  - /url: /main/search?q=sky&p=3
              - listitem [ref=e385]:
                - link "4" [ref=e386] [cursor=pointer]:
                  - /url: /main/search?q=sky&p=4
              - listitem [ref=e387]:
                - link "5" [ref=e388] [cursor=pointer]:
                  - /url: /main/search?q=sky&p=5
              - listitem [ref=e389]:
                - link "6" [ref=e390] [cursor=pointer]:
                  - /url: /main/search?q=sky&p=6
              - listitem [ref=e391]: ...
              - listitem [ref=e392]:
                - link "次に" [ref=e393] [cursor=pointer]:
                  - /url: /main/search?q=sky&p=2
                  - generic [ref=e394]: 
            - generic [ref=e395]: 全2,244,681件中1 - 70件
            - paragraph [ref=e396]:
              - text: 「
              - strong [ref=e397]: sky
              - text: 」のキーワードで新規投稿されたフリー写真素材・画像を掲載しております。JPEG形式の高解像度画像が無料でダウンロードできます。気に入った
              - strong [ref=e398]: sky
              - text: の写真素材・画像が見つかったら、写真をクリックして、無料ダウンロードページへお進み下さい。高品質なロイヤリティーフリー写真素材を無料でダウンロードしていただけます。商用利用もOKなので、ビジネス写真をチラシやポスター、WEBサイトなどの広告、ポストカードや年賀状などにもご利用いただけます。クレジット表記や許可も必要ありません。
            - generic [ref=e399]:
              - generic [ref=e401]: 写真ACグループサイトの「sky」の検索結果（同じアカウントで無料ダウンロードできます）
              - img "loading" [ref=e404]
              - separator [ref=e405]
              - button "広告を非表示にする 広告を非表示にする" [ref=e410] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e411]
                - generic [ref=e412]: 広告を非表示にする
              - separator [ref=e413]
              - img "loading" [ref=e416]
              - separator [ref=e417]
              - img "loading" [ref=e420]
              - separator [ref=e421]
              - img "loading" [ref=e424]
              - separator [ref=e425]
            - generic [ref=e428]:
              - strong [ref=e429]: 写真素材リクエスト受け付け中
              - text: ※100%対応はできませんが最大限努力をいたします。
              - generic [ref=e430]:
                - textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信" [ref=e432]
                - button "素材をリクエスト" [ref=e433] [cursor=pointer]
        - text: 
      - contentinfo [ref=e435]:
        - generic [ref=e438]:
          - generic [ref=e439]: 昨日のダウンロード数：21,917
          - generic [ref=e440]: 先月のダウンロード数：1,124,624
          - generic [ref=e441]: 総会員数：1600万人を突破しました
        - generic [ref=e443]:
          - generic [ref=e444]:
            - generic [ref=e445]:
              - generic [ref=e446]: 写真ACについて 
              - list [ref=e447]:
                - listitem [ref=e448]:
                  - link "写真ACとは" [ref=e449] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e450]:
                  - link "運営会社" [ref=e451] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e452]:
                  - link "個人情報保護方針" [ref=e453] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e454]:
                  - link "特定個人情報基本方針" [ref=e455] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e456]:
                  - link "特定商取引法に基づく表記" [ref=e457] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e458]:
                  - link "サイトマップ" [ref=e459] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e460]:
                  - link "セキュリティポリシー" [ref=e461] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e462]:
              - generic [ref=e463]: 会員登録 
              - list [ref=e464]:
                - listitem [ref=e465]:
                  - link "無料会員登録" [ref=e466] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fby_ai%253D%2526q%253Dsky%2526srt%253Ddlrank%2526nq%253D%2526exclude_ai%253Don%2526orientation%253Dall%2526sizesec%253Dall%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526color%253Dall%2526model_count%253D-1%2526age%253Dall%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall&lang=jp
                - listitem [ref=e467]:
                  - link "プレミアム会員登録" [ref=e468] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fby_ai%253D%2526q%253Dsky%2526srt%253Ddlrank%2526nq%253D%2526exclude_ai%253Don%2526orientation%253Dall%2526sizesec%253Dall%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526color%253Dall%2526model_count%253D-1%2526age%253Dall%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall&lang=jp&fromButton=premium_action
                - listitem [ref=e469]:
                  - link "無料クリエイター会員登録" [ref=e470] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e471]:
              - generic [ref=e472]: プレミアム会員サービス 
              - list [ref=e473]:
                - listitem [ref=e474]:
                  - link "プレミアム会員登録" [ref=e475] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e476]:
                  - link "法人・複数名向けプラン" [ref=e477] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e478]:
                  - link "商品化ライセンス" [ref=e479] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e480]:
                  - link "あんしんサポート" [ref=e481] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e482]:
              - generic [ref=e483]: ヘルプ＆ガイド 
              - list [ref=e484]:
                - listitem [ref=e485]:
                  - link "ヘルプ" [ref=e486] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e487]:
                  - link "利用規約" [ref=e488] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e489]:
                  - link "プレミアム会員利用規約" [ref=e490] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e491]:
                  - link "AC写真AIラボ利用規約" [ref=e492] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e493]:
              - generic [ref=e494]: グループサイト 
              - list [ref=e495]:
                - listitem [ref=e496]:
                  - link "イラストAC" [ref=e497] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e498]:
                  - link "シルエットAC" [ref=e499] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e500]:
                  - link "フリービーAC" [ref=e501] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e502]:
                  - link "年賀状AC" [ref=e503] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e504]:
                  - link "動画AC" [ref=e505] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e506]:
                  - link "デザインAC" [ref=e507] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e508]:
                  - link "ACデータ" [ref=e509] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e510]:
                  - link "明細AC" [ref=e511] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e512]:
            - link "twitter_btn" [ref=e513] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e514]:
                - img [ref=e515]
            - link "facebook_btn" [ref=e517] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e518]:
                - generic [ref=e519]: 
            - link "pinterest_btn" [ref=e520] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e521]:
                - generic [ref=e522]: 
            - link "blog_btn" [ref=e523] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e524]:
                - generic [ref=e525]: 
            - link "feedback_modal_btn" [ref=e526] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e527]:
                - generic [ref=e528]: 
                - text: ご意見・ご要望
          - generic [ref=e530]:
            - text: © 2011-2026
            - link "写真AC" [ref=e531] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
      - generic [ref=e533]:
        - generic [ref=e534]: 無料で高品質な写真をダウンロードできます！加工や商用利用もOK！
        - link "無料ダウンロード会員登録はこちら" [ref=e535] [cursor=pointer]:
          - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fby_ai%253D%2526q%253Dsky%2526srt%253Ddlrank%2526nq%253D%2526exclude_ai%253Don%2526orientation%253Dall%2526sizesec%253Dall%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526color%253Dall%2526model_count%253D-1%2526age%253Dall%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall&lang=jp
  - generic [ref=e536] [cursor=pointer]:
    - generic:
      - paragraph: ご質問は
      - paragraph: こちらから！
    - img "chat-icon" [ref=e538]
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