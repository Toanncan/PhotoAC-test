# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-premium.spec.ts >> Search — Premium User >> TC-SEARCH-PREM-023: Kết hợp đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @premium @filter
- Location: photo-ac/src/tests/downloader/search-premium.spec.ts:644:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('img.thumbnail-image, img.thumbnail').first().or(getByText(/該当する写真がありませんでした|写真は見つかりませんでした/).first()) to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - button "検索フィルター" [ref=e4] [cursor=pointer]:
        - generic [ref=e5]:
          - img [ref=e6]
          - generic [ref=e9]: 
      - generic [ref=e12]:
        - generic [ref=e13]:
          - link "写真AC" [ref=e14] [cursor=pointer]:
            - /url: /
            - img "写真AC" [ref=e15]
          - text:     
        - search [ref=e17]:
          - generic [ref=e19]:
            - generic [ref=e20]:
              - text: 
              - button "AI Search is off" [ref=e21] [cursor=pointer]:
                - img "AI Search is off" [ref=e22]
              - text: 
              - generic [ref=e23]:
                - searchbox "キーワード（例：女性）" [ref=e24]: オフィス
                - button "リセット" [ref=e25] [cursor=pointer]:
                  - img [ref=e27]
                - generic [ref=e29]: オフィス
              - link "upload file" [ref=e31] [cursor=pointer]:
                - /url: "#"
                - generic [ref=e32]: 
              - button "search_btn" [ref=e33] [cursor=pointer]:
                - generic [ref=e34]: 
            - button "カテゴリー " [ref=e36] [cursor=pointer]:
              - text: カテゴリー
              - generic [ref=e37]: 
      - generic [ref=e38]:
        - link " 写真投稿する" [ref=e39] [cursor=pointer]:
          - /url: /creator/auth/register
          - generic [ref=e40]: 
          - text: 写真投稿する
        - generic [ref=e42]:
          - button "クリックしてACアプリケーションのリストを表示" [ref=e45] [cursor=pointer]:
            - img [ref=e46]
          - text:    
        - generic [ref=e48]:
          - link "ホーム" [ref=e50] [cursor=pointer]:
            - /url: /
            - img [ref=e51]
            - generic [ref=e53]: ホーム
          - link "コレクション" [ref=e55] [cursor=pointer]:
            - /url: /user/bookmarks/
            - generic [ref=e56]: 
            - generic [ref=e57]: コレクション
          - generic [ref=e58]:
            - button "お気に入り" [ref=e59] [cursor=pointer]:
              - generic [ref=e60]: 
              - paragraph [ref=e61]:
                - text: お気に入り
                - generic [ref=e62]: 
            - text:  
          - generic [ref=e65]:
            - button "Avatar プレミアムサービス 法人プレミアム (オーナー) a***************************mさん " [ref=e66] [cursor=pointer]:
              - img "Avatar" [ref=e68]
              - generic [ref=e69]:
                - generic [ref=e70]:
                  - img "プレミアムサービス" [ref=e71]
                  - generic [ref=e72]: 法人プレミアム (オーナー)
                - generic [ref=e73]: a***************************mさん
              - text: 
            - text:   
          - generic [ref=e77] [cursor=pointer]:
            - img [ref=e78]
            - generic [ref=e82]: ヘルプ
    - text: 
  - text:                   
  - generic:      
  - text:      
  - generic [ref=e83]:
    - generic [ref=e85]:
      - text:  
      - generic [ref=e86]:
        - link "ダウンロード 履歴" [ref=e88] [cursor=pointer]:
          - /url: /user/downloads
          - img [ref=e90]
          - generic [ref=e93]:
            - text: ダウンロード
            - text: 履歴
        - link "ライセンス まとめて購入" [ref=e95] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e97]
          - generic [ref=e101]:
            - text: ライセンス
            - text: まとめて購入
        - link "0 まとめて ダウンロード" [ref=e104] [cursor=pointer]:
          - /url: javascript:void(0);
          - generic [ref=e105]:
            - img [ref=e106]
            - generic [ref=e111]: "0"
          - generic [ref=e112]:
            - text: まとめて
            - text: ダウンロード
    - generic [ref=e114]:
      - generic [ref=e117]:
        - generic [ref=e118]:
          - generic [ref=e119]:
            - navigation "breadcrumb" [ref=e121]:
              - list [ref=e122]:
                - listitem [ref=e123]:
                  - link "写真AC" [ref=e124] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e125]:
                  - text: /
                  - link "オフィス" [ref=e126] [cursor=pointer]:
                    - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9
            - generic [ref=e127]:
              - heading "「オフィス」の写真素材" [level=1] [ref=e128]
              - text: 16,954点
          - generic [ref=e131]:
            - button "検索" [ref=e132] [cursor=pointer]
            - generic [ref=e133]:
              - generic [ref=e135]:
                - generic [ref=e136]: 検索フィルター
                - generic [ref=e137]:
                  - button "カテゴリー " [ref=e138] [cursor=pointer]:
                    - text: カテゴリー
                    - generic [ref=e139]: 
                  - text:  
                - button "ファイル・向き " [ref=e141] [cursor=pointer]:
                  - text: ファイル・向き
                  - generic [ref=e142]: 
                - button "色 " [ref=e144] [cursor=pointer]:
                  - generic [ref=e146]: 色
                  - generic [ref=e147]: 
                - button "人物指定 " [ref=e149] [cursor=pointer]:
                  - text: 人物指定
                  - generic [ref=e150]: 
                - button "除外キーワード " [ref=e152] [cursor=pointer]:
                  - text: 除外キーワード
                  - generic [ref=e153]: 
                - button "詳細検索 " [ref=e155] [cursor=pointer]:
                  - text: 詳細検索
                  - generic [ref=e156]: 
                - button "表示条件 " [ref=e158] [cursor=pointer]:
                  - text: 表示条件
                  - generic [ref=e159]: 
              - button "関連性の高い順／70件表示 " [ref=e164] [cursor=pointer]:
                - text: 関連性の高い順／70件表示
                - generic [ref=e165]: 
            - generic [ref=e167]:
              - button "横長 削除" [ref=e168] [cursor=pointer]:
                - text: 横長
                - link "削除" [ref=e169]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&model_count=0&personalized=1&layout=vertical
                  - img [ref=e170]
              - button "無人 削除" [ref=e172] [cursor=pointer]:
                - text: 無人
                - link "削除" [ref=e173]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&personalized=1&layout=vertical
                  - img [ref=e174]
              - link "すべてクリア" [ref=e176] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9
          - generic [ref=e177]:
            - generic [ref=e178]:
              - figure [ref=e179]:
                - img "オフィス(エントランス・受付カウンター) オフィス,企業,会社の写真素材" [ref=e181]
                - text:  
              - figure [ref=e182]:
                - img "オフィスインテリア(執務室17) オフィス,インテリア,社内の写真素材" [ref=e184]
                - text:  
              - figure [ref=e185]:
                - img "オフィスのミーティングスペース オフィス,会議室,おしゃれの写真素材" [ref=e187]
                - text: 
              - figure [ref=e188]:
                - img "明るいオープンオフィス オフィス,オープンオフィス,明るいの写真素材" [ref=e190]
                - text: 
              - figure [ref=e191]:
                - img "デスクの並んだオフィスインテリア オフィス,インテリア,社内の写真素材" [ref=e193]
                - text:  
              - figure [ref=e194]:
                - img "ビル イメージ オフィスビル,ビル,ビルディングの写真素材" [ref=e196]
                - text:  
              - figure [ref=e197]:
                - img "レンガ壁のオフィス オフィス,チェア,テーブルの写真素材" [ref=e199]
                - text:  
              - figure [ref=e200]:
                - img "ブログやホームページ用オフィス パソコン,デスク,オフィスの写真素材" [ref=e202]
                - text:  
              - figure [ref=e203]:
                - img "オフィスインテリア(エントランスホール18) オフィス,企業,会社の写真素材" [ref=e205]
                - text:  
              - figure [ref=e206]:
                - img "東京駅 丸の内 南口 オフィス街 東京駅丸の内南口オフィスビル,オフィスビル,道路の写真素材" [ref=e208]
                - text:  
              - figure [ref=e209]:
                - img "オフィスインテリア(執務室35) オフィス,インテリア,社内の写真素材" [ref=e211]
                - text:  
              - figure [ref=e212]:
                - img "オフィスビルと青空 ビル,高層ビル,都会の写真素材" [ref=e214]
                - text:  
              - figure [ref=e215]:
                - img "ブログやホームページ用オフィス パソコン,デスク,オフィスの写真素材" [ref=e217]
                - text:  
              - figure [ref=e218]:
                - img "自然光の差し込むおしゃれな無人の部屋 インテリア,オフィス,カフェの写真素材" [ref=e220]
                - text:  
              - figure [ref=e221]:
                - img "オフィス内装(デスク配置・打合せエリア) オフィス,インテリア,オフィスビルの写真素材" [ref=e223]
                - text:  
              - figure [ref=e224]:
                - img "ブログやホームページ用インテリアイメージ オフィス,デスク,パソコンの写真素材" [ref=e226]
                - text:  
              - figure [ref=e227]:
                - img "オフィスインテリア(内観パース・青) オフィス,インテリア,職場の写真素材" [ref=e229]
                - text:  
              - figure [ref=e230]:
                - img "オフィスインテリア(フリーアドレス) オフィス,インテリア,職場の写真素材" [ref=e232]
                - text:  
              - figure [ref=e233]:
                - img "オフィスビル ビジネスビル,オフィスビル,高層ビルの写真素材" [ref=e235]
                - text:  
              - figure [ref=e236]:
                - img "オフィスにある一人掛けソファ オフィス,オープンオフィス,1人掛けソファの写真素材" [ref=e238]
                - text: 
              - figure [ref=e239]:
                - img "おしゃれなオープンオフィス オフィス,おしゃれ,オープンオフィスの写真素材" [ref=e241]
                - text: 
              - figure [ref=e242]:
                - img "ビルを見上げるビジネスイメージ 高層ビル,ビル群,オフィス街の写真素材" [ref=e244]
                - text:  
              - figure [ref=e245]:
                - img "オフィスインテリア(執務室36) オフィス,インテリア,社内の写真素材" [ref=e247]
                - text:  
              - figure [ref=e248]:
                - img "六本木周辺の景色 六本木,オフィス,ビルの写真素材" [ref=e250]
                - text:  
              - figure [ref=e251]:
                - img "高層ビルのある都市風景 ビル,ビル群,ビル街の写真素材" [ref=e253]
                - text:  
              - figure [ref=e254]:
                - img "オフィスインテリア(執務室03) オフィス,インテリア,社内の写真素材" [ref=e256]
                - text:  
              - figure [ref=e257]:
                - img "会議室のイメージ 会議室,オフィス,通信教育の写真素材" [ref=e259]
                - text:  
              - figure [ref=e260]:
                - img "オフィスインテリア(フリーアドレス) オフィス,インテリア,職場の写真素材" [ref=e262]
                - text:  
              - figure [ref=e263]:
                - img "オフィスインテリア(執務室10) オフィス,インテリア,社内の写真素材" [ref=e265]
                - text:  
              - figure [ref=e266]:
                - img "オフィス・職場のデスクレイアウト オフィス,オフィスビル,社内の写真素材" [ref=e268]
                - text:  
              - figure [ref=e269]:
                - img "ビジネス街 高層ビルと樹木 ビジネス街,ビジネス,オフィス街の写真素材" [ref=e271]
                - text:  
              - figure [ref=e272]:
                - img "オフィスインテリア(執務室14) オフィス,インテリア,社内の写真素材" [ref=e274]
                - text:  
              - figure [ref=e275]:
                - img "街風景 自然 ビル,青空,空の写真素材" [ref=e277]
                - text:  
              - figure [ref=e278]:
                - img "ブログやホームページ用オフィスイメージ デスク,パソコン,会社の写真素材" [ref=e280]
                - text:  
              - figure [ref=e281]:
                - img "オフィスのデスクとチェア オフィス,デスク,チェアの写真素材" [ref=e283]
                - text:  
              - figure [ref=e284]:
                - img "オフィス(受付・エントランスホール) オフィス,企業,会社の写真素材" [ref=e286]
                - text:  
              - figure [ref=e287]:
                - img "爽やかな朝の社長室のイメージ オフィス,ビジネス,投資の写真素材" [ref=e289]
                - text:  
              - figure [ref=e290]:
                - img "コンクリートジャングルを見上げて ビル,ビル街,オフィスの写真素材" [ref=e292]
                - text:  
              - figure [ref=e293]:
                - img "オフィスインテリア(内観パース・緑) オフィス,インテリア,職場の写真素材" [ref=e295]
                - text:  
              - figure [ref=e296]:
                - img "ブログやホームページ用インテリアイメージ オフィス,職場,オフィススペースの写真素材" [ref=e298]
                - text:  
              - figure [ref=e299]:
                - img "オフィスインテリア(フリーアドレス) オフィス,インテリア,職場の写真素材" [ref=e301]
                - text:  
              - figure [ref=e302]:
                - img "オフィスビル(受付・エントランスホール) オフィスビル,エントランス,受付の写真素材" [ref=e304]
                - text:  
              - figure [ref=e305]:
                - img "オフィスインテリア(エントランスホール) オフィス,企業,会社の写真素材" [ref=e307]
                - text:  
              - figure [ref=e308]:
                - img "オフィスビルの外観 オフィスビル,オフィス,外観の写真素材" [ref=e310]
                - text:  
              - figure [ref=e311]:
                - img "渡り廊下 オフィス街 渡り廊下,オフィスビル,背景の写真素材" [ref=e313]
                - text:  
              - figure [ref=e314]:
                - img "オフィスインテリア(整列したデスク) オフィス,デスク,パソコンの写真素材" [ref=e316]
                - text:  
              - figure [ref=e317]:
                - img "オフィスインテリア(内観・内装) オフィス,インテリア,オフィスビルの写真素材" [ref=e319]
                - text:  
              - figure [ref=e320]:
                - img "高層ビル オフィス街 ビル,ビジネス,オフィスビルの写真素材" [ref=e322]
                - text:  
              - figure [ref=e323]:
                - img "オフィス・職場のデスクレイアウト オフィス,インテリア,会社の写真素材" [ref=e325]
                - text:  
              - figure [ref=e326]:
                - img "自然光の差し込むおしゃれな無人の部屋 インテリア,オフィス,カフェの写真素材" [ref=e328]
                - text:  
              - figure [ref=e329]:
                - img "開放的なガラス張りのオフィスインテリア オフィス,インテリア,オフィスビルの写真素材" [ref=e331]
                - text:  
              - figure [ref=e332]:
                - img "オフィスビル ビル,オフィスビル,商業ビルの写真素材" [ref=e334]
                - text:  
              - figure [ref=e335]:
                - img "ビル イメージ ビル,ビルディング,オフィスの写真素材" [ref=e337]
                - text:  
              - figure [ref=e338]:
                - img "オフィスインテリア(吹き抜け) オフィス,インテリア,オフィスビルの写真素材" [ref=e340]
                - text:  
              - figure [ref=e341]:
                - img "オフィスインテリア(執務室28) オフィス,インテリア,社内の写真素材" [ref=e343]
                - text:  
              - figure [ref=e344]:
                - img "オフィスビル ビジネスビル,オフィスビル,高層ビルの写真素材" [ref=e346]
                - text:  
              - figure [ref=e347]:
                - img "オフィスビルのイメージ オフィスビル,オフィス街,オフィスの写真素材" [ref=e349]
                - text:  
              - figure [ref=e350]:
                - img "オフィスビルのイメージ オフィスビル,不動産投資,オフィスの写真素材" [ref=e352]
                - text:  
              - figure [ref=e353]:
                - img "オフィスインテリア(執務室08) オフィス,インテリア,社内の写真素材" [ref=e355]
                - text:  
              - figure [ref=e356]:
                - img "オフィスインテリア(執務室04) オフィス,インテリア,社内の写真素材" [ref=e358]
                - text:  
              - figure [ref=e359]:
                - img "432パーク・アベニューとマンハッタンの夜景４ アメリカ,アメリカ合衆国,オフィスの写真素材" [ref=e361]
                - text:  
              - figure [ref=e362]:
                - img "オフィス(受付・エントランス34) オフィス,企業,会社の写真素材" [ref=e364]
                - text:  
              - figure [ref=e365]:
                - img "デスクの並んだオフィスインテリア オフィス,インテリア,デスクの写真素材" [ref=e367]
                - text:  
              - figure [ref=e368]:
                - img "オフィスインテリア(デスク・パソコン70 オフィス,インテリア,デスクの写真素材" [ref=e370]
                - text:  
              - figure [ref=e371]:
                - img "観葉植物 観葉植物,植物,オフィスの写真素材" [ref=e373]
                - text:  
              - figure [ref=e374]:
                - img "オフィスビルの外観 ビジネスビル,オフィスビル,ビルの写真素材" [ref=e376]
                - text:  
              - figure [ref=e377]:
                - img "高級インテリアのイメージ インテリア雑貨,ソファー,オフィスの写真素材" [ref=e379]
                - text:  
              - figure [ref=e380]:
                - img "青空に反射するビル オフィスビル,高層ビル,ビジネスの写真素材" [ref=e382]
                - text:  
              - figure [ref=e383]:
                - img "銀杏とビジネス街 高層ビル_04 銀杏,ビジネス街,オフィスの写真素材" [ref=e385]
                - text:  
              - figure [ref=e386]:
                - img "東京丸の内の高層ビルと青空 ビル,ビル街,ビル群の写真素材" [ref=e388]
                - text:  
            - generic [ref=e389]:
              - generic [ref=e390]: 関連キーワード
              - link " オフィスビル" [ref=e391] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9%E3%83%93%E3%83%AB&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e392]: 
                - text: オフィスビル
              - link " オフィス 女性" [ref=e393] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E5%A5%B3%E6%80%A7&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e394]: 
                - text: オフィス 女性
              - link " オフィス おしゃれ" [ref=e395] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E3%81%8A%E3%81%97%E3%82%83%E3%82%8C&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e396]: 
                - text: オフィス おしゃれ
              - link " オフィスワーク" [ref=e397] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9%E3%83%AF%E3%83%BC%E3%82%AF&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e398]: 
                - text: オフィスワーク
              - link " オフィス 背景" [ref=e399] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E8%83%8C%E6%99%AF&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e400]: 
                - text: オフィス 背景
              - link " 会社案内" [ref=e401] [cursor=pointer]:
                - /url: /main/search?q=%E4%BC%9A%E7%A4%BE%E6%A1%88%E5%86%85&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e402]: 
                - text: 会社案内
              - link " オフィス デスク" [ref=e403] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E3%83%87%E3%82%B9%E3%82%AF&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e404]: 
                - text: オフィス デスク
              - link " 会社" [ref=e405] [cursor=pointer]:
                - /url: /main/search?q=%E4%BC%9A%E7%A4%BE&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e406]: 
                - text: 会社
              - link " オフィスカジュアル" [ref=e407] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9%E3%82%AB%E3%82%B8%E3%83%A5%E3%82%A2%E3%83%AB&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e408]: 
                - text: オフィスカジュアル
              - link " 会社概要" [ref=e409] [cursor=pointer]:
                - /url: /main/search?q=%E4%BC%9A%E7%A4%BE%E6%A6%82%E8%A6%81&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e410]: 
                - text: 会社概要
              - link " オフィス パソコン" [ref=e411] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e412]: 
                - text: オフィス パソコン
              - link " シェアオフィス" [ref=e413] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%B7%E3%82%A7%E3%82%A2%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e414]: 
                - text: シェアオフィス
              - link " 不動産会社" [ref=e415] [cursor=pointer]:
                - /url: /main/search?q=%E4%B8%8D%E5%8B%95%E7%94%A3%E4%BC%9A%E7%A4%BE&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e416]: 
                - text: 不動産会社
              - link " オフィス 会議" [ref=e417] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E4%BC%9A%E8%AD%B0&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e418]: 
                - text: オフィス 会議
              - link " オフィス 電話" [ref=e419] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E9%9B%BB%E8%A9%B1&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e420]: 
                - text: オフィス 電話
              - link " オフィス 室内" [ref=e421] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9+%E5%AE%A4%E5%86%85&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e422]: 
                - text: オフィス 室内
              - link " 会社 外観" [ref=e423] [cursor=pointer]:
                - /url: /main/search?q=%E4%BC%9A%E7%A4%BE+%E5%A4%96%E8%A6%B3&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e424]: 
                - text: 会社 外観
              - link " 運送会社" [ref=e425] [cursor=pointer]:
                - /url: /main/search?q=%E9%81%8B%E9%80%81%E4%BC%9A%E7%A4%BE&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e426]: 
                - text: 運送会社
              - link " 会社設立" [ref=e427] [cursor=pointer]:
                - /url: /main/search?q=%E4%BC%9A%E7%A4%BE%E8%A8%AD%E7%AB%8B&orientation=1&model_count=0&personalized=1&layout=vertical
                - generic [ref=e428]: 
                - text: 会社設立
            - list [ref=e429]:
              - listitem [ref=e430]:
                - link "1" [ref=e431] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e432]:
                - link "2" [ref=e433] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&p=2&personalized=1&layout=vertical
              - listitem [ref=e434]:
                - link "3" [ref=e435] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&p=3&personalized=1&layout=vertical
              - listitem [ref=e436]:
                - link "4" [ref=e437] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&p=4&personalized=1&layout=vertical
              - listitem [ref=e438]:
                - link "5" [ref=e439] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&p=5&personalized=1&layout=vertical
              - listitem [ref=e440]:
                - link "6" [ref=e441] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&p=6&personalized=1&layout=vertical
              - listitem [ref=e442]: ...
              - listitem [ref=e443]:
                - link "次に" [ref=e444] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&orientation=1&model_count=0&p=2&personalized=1&layout=vertical
                  - generic [ref=e445]: 
            - generic [ref=e446]: 全16,954件中1 - 70件
            - generic [ref=e447]:
              - generic [ref=e449]: 写真ACグループサイトの「オフィス」の検索結果（同じアカウントで無料ダウンロードできます）
              - img "loading" [ref=e452]
              - separator [ref=e453]
              - img "loading" [ref=e456]
              - separator [ref=e457]
              - img "loading" [ref=e460]
              - separator [ref=e461]
              - img "loading" [ref=e464]
              - separator [ref=e465]
            - generic [ref=e468]:
              - strong [ref=e469]: 写真素材リクエスト受け付け中
              - text: ※100%対応はできませんが最大限努力をいたします。
              - generic [ref=e470]:
                - textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信" [ref=e472]
                - button "素材をリクエスト" [ref=e473] [cursor=pointer]
        - text: 
      - contentinfo [ref=e475]:
        - generic [ref=e478]:
          - generic [ref=e479]: 昨日のダウンロード数：21,917
          - generic [ref=e480]: 先月のダウンロード数：1,124,624
          - generic [ref=e481]: 総会員数：1600万人を突破しました
        - generic [ref=e483]:
          - generic [ref=e484]:
            - generic [ref=e485]:
              - generic [ref=e486]: 写真ACについて 
              - list [ref=e487]:
                - listitem [ref=e488]:
                  - link "写真ACとは" [ref=e489] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e490]:
                  - link "運営会社" [ref=e491] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e492]:
                  - link "個人情報保護方針" [ref=e493] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e494]:
                  - link "特定個人情報基本方針" [ref=e495] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e496]:
                  - link "特定商取引法に基づく表記" [ref=e497] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e498]:
                  - link "サイトマップ" [ref=e499] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e500]:
                  - link "セキュリティポリシー" [ref=e501] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e502]:
              - generic [ref=e503]: 会員登録 
              - list [ref=e504]:
                - listitem [ref=e505]:
                  - link "無料会員登録" [ref=e506] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E3%252582%2525AA%2525E3%252583%252595%2525E3%252582%2525A3%2525E3%252582%2525B9%2526by_ai%253D%2526sizesec%253Dall%2526orientation%253D1%2526color%253Dall%2526model_count%253D0%2526age%253Dall%2526nq%253D%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526exclude_ai%253Don%2526personalized%253D1%2526layout%253Dvertical%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall%2526srt%253Ddlrank%2526pp%253D70&lang=jp
                - listitem [ref=e507]:
                  - link "プレミアム会員登録" [ref=e508] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e509]:
                  - link "無料クリエイター会員登録" [ref=e510] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e511]:
              - generic [ref=e512]: プレミアム会員サービス 
              - list [ref=e513]:
                - listitem [ref=e514]:
                  - link "プレミアム会員登録" [ref=e515] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e516]:
                  - link "法人・複数名向けプラン" [ref=e517] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e518]:
                  - link "商品化ライセンス" [ref=e519] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e520]:
                  - link "あんしんサポート" [ref=e521] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e522]:
              - generic [ref=e523]: ヘルプ＆ガイド 
              - list [ref=e524]:
                - listitem [ref=e525]:
                  - link "ヘルプ" [ref=e526] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e527]:
                  - link "利用規約" [ref=e528] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e529]:
                  - link "プレミアム会員利用規約" [ref=e530] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e531]:
                  - link "AC写真AIラボ利用規約" [ref=e532] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e533]:
              - generic [ref=e534]: グループサイト 
              - list [ref=e535]:
                - listitem [ref=e536]:
                  - link "イラストAC" [ref=e537] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e538]:
                  - link "シルエットAC" [ref=e539] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e540]:
                  - link "フリービーAC" [ref=e541] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e542]:
                  - link "年賀状AC" [ref=e543] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e544]:
                  - link "動画AC" [ref=e545] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e546]:
                  - link "デザインAC" [ref=e547] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e548]:
                  - link "ACデータ" [ref=e549] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e550]:
                  - link "明細AC" [ref=e551] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e552]:
            - link "twitter_btn" [ref=e553] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e554]:
                - img [ref=e555]
            - link "facebook_btn" [ref=e557] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e558]:
                - generic [ref=e559]: 
            - link "pinterest_btn" [ref=e560] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e561]:
                - generic [ref=e562]: 
            - link "blog_btn" [ref=e563] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e564]:
                - generic [ref=e565]: 
            - link "feedback_modal_btn" [ref=e566] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e567]:
                - generic [ref=e568]: 
                - text: ご意見・ご要望
          - generic [ref=e570]:
            - text: © 2011-2026
            - link "写真AC" [ref=e571] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
  - text:                   
  - img [ref=e573]
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
      |                                           ^ Error: locator.waitFor: Test timeout of 60000ms exceeded.
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