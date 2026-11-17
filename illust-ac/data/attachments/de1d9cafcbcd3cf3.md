# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/free-user/download.spec.ts >> Download & Detail Interactions — Free User >> TC-DOWNLOAD-FREE-009: Tải tranh định dạng JPEG thành công
- Location: illust-ac/src/tests/downloader/free-user/download.spec.ts:155:7

# Error details

```
TimeoutError: page.waitForEvent: Timeout 45000ms exceeded while waiting for event "download"
=========================== logs ===========================
waiting for event "download"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic: "📍 URL: https://test-lien.ac-illust.com/main/detail.php?id=640040"
  - paragraph [ref=e3]:
    - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
    - link "詳細" [ref=e4] [cursor=pointer]:
      - /url: /main/privacy.php
    - link "同意" [ref=e5] [cursor=pointer]:
      - /url: ""
  - banner [ref=e6]:
    - generic:    
    - generic [ref=e7]:
      - generic [ref=e10]:
        - generic [ref=e11]:
          - link "イラストがすべて無料 「イラストAC」" [ref=e12] [cursor=pointer]:
            - /url: /
            - img "イラストがすべて無料 「イラストAC」" [ref=e13]
          - text:  
        - generic [ref=e19]:
          - text:  
          - searchbox "キーワード（例：桜）" [ref=e21]
          - generic [ref=e22]:
            - link "upload file" [ref=e23] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e24]: 
            - generic [ref=e25] [cursor=pointer]:
              - text: 詳細 検索
              - generic: ▼
          - button "buttonlogin" [ref=e26] [cursor=pointer]:
            - generic [ref=e27]: 
      - generic [ref=e28]:
        - generic [ref=e30]:
          - link " イラスト投稿する" [ref=e31] [cursor=pointer]:
            - /url: /creator/registration.php
            - generic [ref=e32]: 
            - text: イラスト投稿する
          - link "プレミアム会員登録プレミアム会員登録" [ref=e33] [cursor=pointer]:
            - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
            - img "プレミアム会員登録" [ref=e34]
            - text: プレミアム会員登録
          - button "クリックしてACアプリケーションのリストを表示" [ref=e37] [cursor=pointer]:
            - img [ref=e38]
          - text:    
        - generic [ref=e40]:
          - link "ホーム" [ref=e42] [cursor=pointer]:
            - /url: /
            - img [ref=e43]
            - generic [ref=e45]: ホーム
          - link "マイページ" [ref=e47] [cursor=pointer]:
            - /url: /user/
            - img [ref=e48]
            - generic [ref=e51]: マイページ
          - generic [ref=e52]:
            - button "お気に入り" [ref=e53] [cursor=pointer]:
              - generic [ref=e54]: 
              - paragraph [ref=e55]:
                - text: お気に入り
                - generic [ref=e56]: 
            - text:  
          - generic [ref=e59]:
            - button "Avatar 無料会員 a*******************...さん " [ref=e60] [cursor=pointer]:
              - img "Avatar" [ref=e62]
              - generic [ref=e63]:
                - generic [ref=e64]: 無料会員
                - generic [ref=e65]: a*******************...さん
              - text: 
            - text:   
          - generic [ref=e69] [cursor=pointer]:
            - img [ref=e70]
            - generic [ref=e74]: ヘルプ
    - generic [ref=e75]:
      - generic [ref=e77]:
        - button "画像で検索する" [ref=e78] [cursor=pointer]:
          - img [ref=e79]
        - generic [ref=e81]: 画像で検索する
      - separator [ref=e82]
      - generic [ref=e83]:
        - paragraph [ref=e84]: 画像から似ている画像を検索できます。
        - paragraph [ref=e85]: ※5MBまでのJPGまたはPNGファイルのみ
        - generic [ref=e86]:
          - listitem [ref=e87]:
            - img [ref=e88]
          - listitem [ref=e95]:
            - generic [ref=e96]: ファイルを選択
    - generic [ref=e97]:
      - button [ref=e99] [cursor=pointer]:
        - img [ref=e100]
      - generic [ref=e103]:
        - generic [ref=e104]:
          - button [ref=e105] [cursor=pointer]:
            - img [ref=e106]
          - textbox "犬と歩いている人" [ref=e109]
        - button "画像で検索" [ref=e111] [cursor=pointer]:
          - generic [ref=e112]: 
          - text: 画像で検索
      - separator [ref=e113]
      - generic [ref=e114]:
        - generic [ref=e115]: 並び順
        - generic [ref=e116]:
          - generic [ref=e117]:
            - radio "関連性の高い順" [checked] [ref=e118] [cursor=pointer]
            - generic [ref=e119] [cursor=pointer]: 関連性の高い順
          - generic [ref=e120]:
            - radio "新着順" [ref=e121] [cursor=pointer]
            - generic [ref=e122] [cursor=pointer]: 新着順
          - generic [ref=e123]:
            - radio "人気順" [disabled] [ref=e124] [cursor=pointer]
            - generic [ref=e125] [cursor=pointer]: 人気順
      - generic [ref=e127]:
        - generic [ref=e128]: カテゴリー
        - listbox [ref=e129]:
          - option "花・植物" [ref=e130]
          - option "ビジネス" [ref=e131]
          - option "チラシ" [ref=e132]
          - option "名刺" [ref=e133]
          - option "医療・福祉" [ref=e134]
          - option "人物" [ref=e135]
          - option "動物・生き物" [ref=e136]
          - option "乗り物" [ref=e137]
          - option "フレーム" [ref=e138]
          - option "生活" [ref=e139]
          - option "食べ物" [ref=e140]
          - option "文具" [ref=e141]
          - option "春" [ref=e142]
          - option "夏" [ref=e143]
          - option "秋" [ref=e144]
          - option "冬" [ref=e145]
          - option "背景・壁紙" [ref=e146]
          - option "バナー" [ref=e147]
          - option "スポーツ" [ref=e148]
          - option "ポストカード" [ref=e149]
          - option "学校プリント用" [ref=e150]
          - option "アイコン" [ref=e151]
          - option "セット" [ref=e152]
          - option "文字" [ref=e153]
          - option "筆文字" [ref=e154]
          - option "萌え系" [ref=e155]
          - option "年賀状" [ref=e156]
          - option "ファッション" [ref=e157]
          - option "クリスマス" [ref=e158]
          - option "その他" [ref=e159]
      - generic [ref=e161]:
        - generic [ref=e162]: 除外カテゴリー
        - listbox [ref=e163]:
          - option "花・植物" [ref=e164]
          - option "ビジネス" [ref=e165]
          - option "チラシ" [ref=e166]
          - option "名刺" [ref=e167]
          - option "医療・福祉" [ref=e168]
          - option "人物" [ref=e169]
          - option "動物・生き物" [ref=e170]
          - option "乗り物" [ref=e171]
          - option "フレーム" [ref=e172]
          - option "生活" [ref=e173]
          - option "食べ物" [ref=e174]
          - option "文具" [ref=e175]
          - option "春" [ref=e176]
          - option "夏" [ref=e177]
          - option "秋" [ref=e178]
          - option "冬" [ref=e179]
          - option "背景・壁紙" [ref=e180]
          - option "バナー" [ref=e181]
          - option "スポーツ" [ref=e182]
          - option "ポストカード" [ref=e183]
          - option "学校プリント用" [ref=e184]
          - option "アイコン" [ref=e185]
          - option "セット" [ref=e186]
          - option "文字" [ref=e187]
          - option "筆文字" [ref=e188]
          - option "萌え系" [ref=e189]
          - option "年賀状" [ref=e190]
          - option "ファッション" [ref=e191]
          - option "クリスマス" [ref=e192]
          - option "その他" [ref=e193]
      - generic [ref=e194]:
        - generic [ref=e195]: 除外キーワード
        - textbox "除外キーワードを入力" [ref=e196]
      - generic [ref=e198]:
        - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e199] [cursor=pointer]
        - generic [ref=e200] [cursor=pointer]: AI生成ツール使用素材を除く
      - generic [ref=e201]:
        - generic [ref=e202]: 縦長・横長の選択
        - generic [ref=e203]:
          - generic [ref=e204]:
            - radio "全て" [checked] [ref=e205] [cursor=pointer]
            - generic [ref=e206] [cursor=pointer]: 全て
          - generic [ref=e207]:
            - radio "縦長" [ref=e208] [cursor=pointer]
            - generic [ref=e209] [cursor=pointer]: 縦長
          - generic [ref=e210]:
            - radio "横長" [ref=e211] [cursor=pointer]
            - generic [ref=e212] [cursor=pointer]: 横長
      - generic [ref=e213]:
        - generic [ref=e214]: 保存形式
        - generic [ref=e215]:
          - generic [ref=e216]:
            - radio "全て" [checked] [ref=e217] [cursor=pointer]
            - generic [ref=e218] [cursor=pointer]: 全て
          - generic [ref=e219]:
            - radio "eps・ai" [ref=e220] [cursor=pointer]
            - generic [ref=e221] [cursor=pointer]: eps・ai
          - generic [ref=e222]:
            - radio "png" [ref=e223] [cursor=pointer]
            - generic [ref=e224] [cursor=pointer]: png
      - generic [ref=e225]:
        - generic [ref=e226]: イラストレーター名
        - textbox "イラストレーター名を入力" [ref=e227]
      - generic [ref=e228]:
        - generic [ref=e229]: 除外イラストレーター名
        - textbox "除外イラストレーター名を入力" [ref=e230]
      - generic [ref=e231]:
        - generic [ref=e232]: 素材ID
        - textbox "素材のIDを入力" [ref=e233]
      - generic [ref=e234]:
        - generic [ref=e235]: 色
        - generic [ref=e236]:
          - generic [ref=e237]:
            - radio "全て" [checked] [ref=e238] [cursor=pointer]
            - generic [ref=e239] [cursor=pointer]: 全て
          - generic [ref=e240]:
            - generic [ref=e241]:
              - button [ref=e243] [cursor=pointer]
              - button [ref=e245] [cursor=pointer]
              - button [ref=e247] [cursor=pointer]
              - button [ref=e249] [cursor=pointer]
              - button [ref=e251] [cursor=pointer]
            - generic [ref=e252]:
              - button [ref=e254] [cursor=pointer]
              - button [ref=e256] [cursor=pointer]
              - button [ref=e258] [cursor=pointer]
              - button [ref=e260] [cursor=pointer]
              - button [ref=e262] [cursor=pointer]
            - generic [ref=e263]:
              - button [ref=e265] [cursor=pointer]
              - button [ref=e267] [cursor=pointer]
              - button [ref=e269] [cursor=pointer]
              - button [ref=e271] [cursor=pointer]
      - generic [ref=e277]:
        - generic [ref=e278] [cursor=pointer]: チュートリアルあり
        - checkbox "チュートリアルあり" [ref=e279] [cursor=pointer]
      - generic [ref=e281]:
        - generic [ref=e282] [cursor=pointer]: 完全一致
        - checkbox "完全一致" [ref=e283] [cursor=pointer]
      - button "検 索" [ref=e285] [cursor=pointer]
  - text:                      
  - generic [ref=e286]:
    - generic [ref=e287]:
      - generic [ref=e288]:
        - generic [ref=e291]:
          - generic [ref=e292]:
            - link [ref=e294] [cursor=pointer]:
              - /url: "#"
            - list [ref=e295]:
              - heading "イラストメニュー" [level=4] [ref=e296]
              - listitem [ref=e297]:
                - link "イラストカテゴリー" [ref=e298] [cursor=pointer]:
                  - /url: javascript:void(0)
                  - generic [ref=e299]: イラストカテゴリー
                  - generic [ref=e300]: 
              - listitem [ref=e301]:
                - link "人気イラストランキング" [ref=e302] [cursor=pointer]:
                  - /url: /main/ranking.php
              - listitem [ref=e303]:
                - link "人気イラストレーター" [ref=e304] [cursor=pointer]:
                  - /url: /main/illustrator_ranking.php
              - listitem [ref=e305]:
                - link "新着イラスト" [ref=e306] [cursor=pointer]:
                  - /url: /main/latest.php
              - listitem [ref=e307]:
                - link "公開中のコレクション" [ref=e308] [cursor=pointer]:
                  - /url: /main/collections
            - list [ref=e309]:
              - heading "プレミアム会員サービス" [level=4] [ref=e310]
              - listitem [ref=e311]:
                - link "プレミアム会員登録" [ref=e312] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
              - listitem [ref=e313]:
                - link "法人・複数名向けプラン" [ref=e314] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/premium/business.php
              - listitem [ref=e315]:
                - link "商品化ライセンス" [ref=e316] [cursor=pointer]:
                  - /url: /main/extra_license_introduction.php
              - listitem [ref=e317]:
                - link "あんしんサポート" [ref=e318] [cursor=pointer]:
                  - /url: /main/indemnity.php
            - list [ref=e319]:
              - heading "イラストレーターメニュー" [level=4] [ref=e320]
              - listitem [ref=e321]:
                - link "イラスト投稿（新規登録）" [ref=e322] [cursor=pointer]:
                  - /url: /creator/registration.php
              - listitem [ref=e323]:
                - link "イラストレーターログイン" [ref=e324] [cursor=pointer]:
                  - /url: javascript:void(0);
              - listitem [ref=e325]:
                - link "ポイント換金ランキング" [ref=e326] [cursor=pointer]:
                  - /url: /main/ranking_prize.php
              - listitem [ref=e327]:
                - link "イラストレーター一覧" [ref=e328] [cursor=pointer]:
                  - /url: /main/illustrator.php
              - listitem [ref=e329]:
                - link "イラストリクエスト" [ref=e330] [cursor=pointer]:
                  - /url: /user/illust_requests.php
              - listitem [ref=e331]:
                - link "お仕事依頼履歴" [ref=e332] [cursor=pointer]:
                  - /url: /main/works.php
            - list [ref=e333]:
              - heading "ヘルプ＆ガイド" [level=4] [ref=e334]
              - listitem [ref=e335]:
                - link "イラストACとは" [ref=e336] [cursor=pointer]:
                  - /url: /main/about.php#group-site
              - listitem [ref=e337]:
                - link "ヘルプ" [ref=e338] [cursor=pointer]:
                  - /url: https://help.freebie-ac.jp/
              - listitem [ref=e339]:
                - link "利用規約" [ref=e340] [cursor=pointer]:
                  - /url: /main/terms.php
            - link "Interview" [ref=e342] [cursor=pointer]:
              - /url: /main/interview
              - img "Interview" [ref=e343]
            - list [ref=e344]:
              - heading "おすすめ無料サービス" [level=4] [ref=e345]
              - listitem [ref=e346]:
                - link "デザインテンプレート" [ref=e347] [cursor=pointer]:
                  - /url: https://www.design-ac.net/
                  - text: デザインテンプレート
                  - generic [ref=e348]: 
              - listitem [ref=e349]:
                - link "ファイル転送・ファイル共有" [ref=e350] [cursor=pointer]:
                  - /url: https://ac-data.info/
                  - text: ファイル転送・ファイル共有
                  - generic [ref=e351]: 
              - listitem [ref=e352]:
                - link "今日の運勢" [ref=e353] [cursor=pointer]:
                  - /url: https://uranai-ac.com/
                  - text: 今日の運勢
                  - generic [ref=e354]: 
              - listitem [ref=e355]:
                - link "プレゼン資料作成AI" [ref=e356] [cursor=pointer]:
                  - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
                  - text: プレゼン資料作成AI
                  - generic [ref=e357]: 
            - iframe [ref=e358]:
              
            - button "広告を非表示にする 広告を非表示にする" [ref=e362] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e363]
              - generic [ref=e364]: 広告を非表示にする
            - generic [ref=e365]:
              - heading "人気キーワード（タグ）" [level=4] [ref=e366]:
                - link "人気キーワード（タグ）" [ref=e367] [cursor=pointer]:
                  - /url: javascript:void(0)
                  - text: 人気キーワード（タグ）
                  - generic [ref=e368]: 
              - generic [ref=e369]:
                - link "クリスマス" [ref=e370] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9&utm_source=top_keyword
                - link "背景" [ref=e371] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "吹き出し" [ref=e372] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%90%B9%E3%81%8D%E5%87%BA%E3%81%97&utm_source=top_keyword
                - link "リボン" [ref=e373] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%AA%E3%83%9C%E3%83%B3&utm_source=top_keyword
                - link "フレーム" [ref=e374] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0&utm_source=top_keyword
                - link "秋" [ref=e375] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%A7%8B&utm_source=top_keyword
                - link "矢印" [ref=e376] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%9F%A2%E5%8D%B0&utm_source=top_keyword
                - link "羊" [ref=e377] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%BE%8A&utm_source=top_keyword
                - link "正月" [ref=e378] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%AD%A3%E6%9C%88&utm_source=top_keyword
                - link "年賀状" [ref=e379] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%B9%B4%E8%B3%80%E7%8A%B6&utm_source=top_keyword
                - link "冬" [ref=e380] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%86%AC&utm_source=top_keyword
                - link "和柄" [ref=e381] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%92%8C%E6%9F%84&utm_source=top_keyword
                - link "キラキラ" [ref=e382] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9&utm_source=top_keyword
                - link "クリスマス 背景" [ref=e383] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "あしらい" [ref=e384] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%82%E3%81%97%E3%82%89%E3%81%84&utm_source=top_keyword
                - link "お正月" [ref=e385] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%8A%E6%AD%A3%E6%9C%88&utm_source=top_keyword
                - link "ブラックフライデー" [ref=e386] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF%E3%83%95%E3%83%A9%E3%82%A4%E3%83%87%E3%83%BC&utm_source=top_keyword
                - link "11月" [ref=e387] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=11%E6%9C%88&utm_source=top_keyword
                - link "紅葉" [ref=e388] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%B4%85%E8%91%89&utm_source=top_keyword
                - link "桜" [ref=e389] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%A1%9C&utm_source=top_keyword
                - link "和風" [ref=e390] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%92%8C%E9%A2%A8&utm_source=top_keyword
                - link "クリスマス 背景" [ref=e391] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "アイコン" [ref=e392] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3&utm_source=top_keyword
                - link "スマホ" [ref=e393] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%B9%E3%83%9E%E3%83%9B&utm_source=top_keyword
                - link "ハート" [ref=e394] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%8F%E3%83%BC%E3%83%88&utm_source=top_keyword
                - link "ふきだし" [ref=e395] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%B5%E3%81%8D%E3%81%A0%E3%81%97&utm_source=top_keyword
                - link "見出し" [ref=e396] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%A6%8B%E5%87%BA%E3%81%97&utm_source=top_keyword
                - link "枠" [ref=e397] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%9E%A0&utm_source=top_keyword
                - link "秋 背景" [ref=e398] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%A7%8B+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "和紙" [ref=e399] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%92%8C%E7%B4%99&utm_source=top_keyword
                - link "家族" [ref=e400] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%AE%B6%E6%97%8F&utm_source=top_keyword
                - link "飾り枠" [ref=e401] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%A3%BE%E3%82%8A%E6%9E%A0&utm_source=top_keyword
                - link "花" [ref=e402] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%8A%B1&utm_source=top_keyword
                - link "クリスマス フレーム" [ref=e403] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9+%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0&utm_source=top_keyword
                - link "未年" [ref=e404] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%9C%AA%E5%B9%B4&utm_source=top_keyword
                - link "ひつじ" [ref=e405] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%B2%E3%81%A4%E3%81%98&utm_source=top_keyword
                - link "秋 背景" [ref=e406] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%A7%8B%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "未 年賀状" [ref=e407] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%9C%AA%E3%80%80%E5%B9%B4%E8%B3%80%E7%8A%B6&utm_source=top_keyword
                - link "日本地図" [ref=e408] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%97%A5%E6%9C%AC%E5%9C%B0%E5%9B%B3&utm_source=top_keyword
                - link "筆" [ref=e409] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E7%AD%86&utm_source=top_keyword
                - link "雪" [ref=e410] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%9B%AA&utm_source=top_keyword
                - link "雲" [ref=e411] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%9B%B2&utm_source=top_keyword
                - link "冬 背景" [ref=e412] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%86%AC%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "カレンダー" [ref=e413] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC&utm_source=top_keyword
                - link "雪の結晶" [ref=e414] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%9B%AA%E3%81%AE%E7%B5%90%E6%99%B6&utm_source=top_keyword
                - link "チェック" [ref=e415] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF&utm_source=top_keyword
                - link "ポイント" [ref=e416] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88&utm_source=top_keyword
                - link "水彩" [ref=e417] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%B0%B4%E5%BD%A9&utm_source=top_keyword
                - link "プレゼント" [ref=e418] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%97%E3%83%AC%E3%82%BC%E3%83%B3%E3%83%88&utm_source=top_keyword
                - link "flower" [ref=e419] [cursor=pointer]:
                  - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=flower&utm_source=top_keyword
              - paragraph [ref=e420]:
                - link "もっと見る" [ref=e421] [cursor=pointer]:
                  - /url: javascript:void(0)
                  - text: もっと見る
                  - generic [ref=e422]: 
                - text: 
            - generic [ref=e423]:
              - heading "メディア" [level=4] [ref=e424]
              - heading "テレビでご紹介いただきました！" [level=4] [ref=e425]
              - iframe [ref=e426]:
                
              - paragraph [ref=e427]: かんさい情報ネット ten. | 読売テレビ
            - heading "ブログ" [level=4] [ref=e429]
            - list [ref=e430]:
              - heading "SNS" [level=4] [ref=e431]
              - listitem [ref=e432]:
                - link "ACワークス公式 X" [ref=e433] [cursor=pointer]:
                  - /url: https://x.com/ACworks2011
              - listitem [ref=e434]:
                - link "Mr.ビー X" [ref=e435] [cursor=pointer]:
                  - /url: https://x.com/mrb_ac
              - listitem [ref=e436]
            - link "プレミアム会員登録" [ref=e441] [cursor=pointer]:
              - /url: https://test-lien.ac-illust.com/main/premium/campaign.php
              - img "プレミアム会員登録" [ref=e442]
          - generic [ref=e443]:
            - navigation "breadcrumb" [ref=e444]:
              - list [ref=e445]:
                - listitem [ref=e446]:
                  - link "イラストAC" [ref=e447] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e448]:
                  - text: /
                  - link "花・植物" [ref=e449] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?mode=cate&cid=4&cword=%E8%8A%B1%E3%83%BB%E6%A4%8D%E7%89%A9
                - listitem [ref=e450]: / 桜のイラスト
            - navigation "breadcrumb" [ref=e451]:
              - list [ref=e452]:
                - listitem [ref=e453]:
                  - link "イラストAC" [ref=e454] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e455]:
                  - text: /
                  - link "春" [ref=e456] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?mode=cate&cid=5&cword=%E6%98%A5
                - listitem [ref=e457]: / 桜のイラスト
            - navigation "breadcrumb" [ref=e458]:
              - list [ref=e459]:
                - listitem [ref=e460]:
                  - link "イラストAC" [ref=e461] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e462]:
                  - text: /
                  - link "食べ物" [ref=e463] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?mode=cate&cid=95&cword=%E9%A3%9F%E3%81%B9%E7%89%A9
                - listitem [ref=e464]: / 桜のイラスト
            - navigation "breadcrumb" [ref=e465]:
              - list [ref=e466]:
                - listitem [ref=e467]:
                  - link "イラストAC" [ref=e468] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e469]:
                  - text: /
                  - link "セット" [ref=e470] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?mode=cate&cid=107&cword=%E3%82%BB%E3%83%83%E3%83%88
                - listitem [ref=e471]: / 桜のイラスト
            - heading "イラスト素材：桜のイラスト" [level=1] [ref=e473]
            - generic [ref=e474]:
              - generic [ref=e476]:
                - generic [ref=e477]:
                  - img "桜のイラスト 桜,お花見,木のイラスト素材" [ref=e479]
                  - generic [ref=e481]:
                    - generic [ref=e483]:
                      - link "ボタンブックマーク" [ref=e485] [cursor=pointer]:
                        - /url: javascript:void(0);
                        - generic [ref=e486]: 
                      - generic [ref=e487]:
                        - link "ボタンのような" [ref=e488] [cursor=pointer]:
                          - /url: javascript:void(0);
                          - generic [ref=e489]: 
                        - paragraph [ref=e490]: "149"
                      - link "ボタンシェア" [ref=e492] [cursor=pointer]:
                        - /url: javascript:void(0);
                        - generic [ref=e493]: 
                      - generic [ref=e494]:
                        - link "ボタンファン" [ref=e495] [cursor=pointer]:
                          - /url: javascript:void(0);
                          - generic [ref=e496]: 
                        - paragraph [ref=e497]: 27,461
                    - generic [ref=e499]:
                      - text: "作者:"
                      - link "ACworks" [ref=e500] [cursor=pointer]:
                        - /url: profile.php?id=acworks&area=1
                - generic [ref=e502]:
                  - paragraph [ref=e503]: おすすめテンプレートでデザイン作成しませんか？
                  - generic [ref=e504]:
                    - generic:
                      - text: 
                      - button [ref=e539] [cursor=pointer]:
                        - generic [ref=e540]: 
              - generic [ref=e541]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e547] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e548]
                  - generic [ref=e549]: 広告を非表示にする
                - generic [ref=e550]:
                  - link "プレミアム会員なら制限なしで 使い放題！ 3年更新プランなら 月額換算1,299円" [ref=e552] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai&utm_source=illustac&utm_medium=internal&utm_campaign=freeuser_download_page&utm_content=text_link&utm_id=260325
                    - text: プレミアム会員なら制限なしで 使い放題！
                    - text: 3年更新プランなら 月額換算1,299円
                  - generic [ref=e555]:
                    - generic [ref=e556]:
                      - paragraph [ref=e559]: JPEG
                      - generic [ref=e561]:
                        - paragraph [ref=e562]: PNG
                        - generic [ref=e563]: 495円
                      - generic [ref=e565]:
                        - paragraph [ref=e566]: AI
                        - generic [ref=e567]: 990円
                    - generic [ref=e568]:
                      - img "こちらはプレミアム会員限定のプレミアム素材です。PNG/AIは単品購入のみ可能です。無制限でダウンロードしたい場合は" [ref=e569]
                      - generic [ref=e570]:
                        - text: こちらはプレミアム会員限定のプレミアム素材です。PNG/AIは単品購入のみ可能です。無制限でダウンロードしたい場合は
                        - link "こちら" [ref=e571] [cursor=pointer]:
                          - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
                    - paragraph [ref=e572]:
                      - button "ダウンロード" [ref=e573] [cursor=pointer]:
                        - img [ref=e574]
                        - text: ダウンロード
                    - paragraph [ref=e578]: 視聴後、広告を閉じると素材ページに移動します。
                    - paragraph [ref=e579]:
                      - generic [ref=e580]: 
                      - text: 音声入りの動画広告が再生される場合があります。
                    - link "すぐダウンロードする方法は？" [ref=e582] [cursor=pointer]:
                      - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
                  - link:
                    - /url: ""
                  - generic [ref=e583]:
                    - separator [ref=e584]
                    - link "利用禁止事項" [ref=e585] [cursor=pointer]:
                      - /url: javascript:void(0)
                    - text: ｜
                    - link "素材の利用方法" [ref=e586] [cursor=pointer]:
                      - /url: https://help.freebie-ac.jp/detail/36
                    - text: ｜
                    - link "被写体の権利について" [ref=e587] [cursor=pointer]:
                      - /url: https://help.freebie-ac.jp/detail/466
                  - generic [ref=e588]:
                    - separator [ref=e589]
                    - generic [ref=e590]:
                      - generic [ref=e591]:
                        - generic [ref=e592]: L
                        - generic [ref=e593]: 商品化ライセンス
                      - link "商品化ライセンスとは？" [ref=e594] [cursor=pointer]:
                        - /url: /main/extra_license_introduction.php
                    - generic [ref=e595]:
                      - link "今すぐ購入" [ref=e596] [cursor=pointer]:
                        - /url: javascript:void(0)
                        - img [ref=e597]
                        - text: 今すぐ購入
                      - link [ref=e602] [cursor=pointer]:
                        - /url: javascript:void(0)
                        - img [ref=e603]
                    - paragraph [ref=e607]:
                      - text: テンプレートなどの商品販売ができるライセンスです。
                      - text: あなたのビジネスにご活用ください。
                  - link " あなたの描いたイラストがお金になる イラストACイラストレーター登録はこちら>" [ref=e609] [cursor=pointer]:
                    - /url: /creator/registration.php
                    - generic [ref=e610]: 
                    - generic [ref=e611]:
                      - text: あなたの描いたイラストがお金になる
                      - paragraph [ref=e612]: イラストACイラストレーター登録はこちら>
            - text:  
            - button "広告を非表示にする 広告を非表示にする" [ref=e619] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e620]
              - generic [ref=e621]: 広告を非表示にする
            - generic [ref=e622]:
              - heading "関連イラスト" [level=2] [ref=e624]
              - img [ref=e628]
            - generic [ref=e630]:
              - generic [ref=e632]:
                - heading "このイラストについて" [level=3] [ref=e633]
                - generic [ref=e634]:
                  - generic [ref=e636]: "タイトル: 桜のイラスト"
                  - generic [ref=e638]:
                    - text: "作者:"
                    - link "ACworks" [ref=e639] [cursor=pointer]:
                      - /url: profile.php?id=acworks&area=1
                    - text: さん
                - generic [ref=e640]:
                  - generic [ref=e642]: "イラストのID: 640040"
                  - generic [ref=e644]: "ダウンロード: 9874回"
                - generic [ref=e645]:
                  - generic [ref=e646]:
                    - generic [ref=e650]: 
                    - generic [ref=e652]: SAFETY
                  - paragraph [ref=e653]:
                    - text: このイラスト素材は
                    - link "ACworksさん" [ref=e654] [cursor=pointer]:
                      - /url: profile.php?id=acworks&area=1
                    - text: 本人が制作したことを承認し、安全にご利用いただけることを確認しています。
                - generic [ref=e657]:
                  - text: "本人確認: 本人確認済"
                  - img "button-card" [ref=e658]
                  - paragraph [ref=e659]:
                    - text: このイラストの作者
                    - link "ACworks" [ref=e660] [cursor=pointer]:
                      - /url: profile.php?id=acworks&area=1
                    - text: さんは、本人確認が済んでいるイラストレーターです。
                - generic [ref=e664]:
                  - text: "タグ:"
                  - link "桜" [ref=e665] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%A1%9C&utm_source=tag
                    - generic [ref=e666]: 桜
                  - link "お花見" [ref=e667] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%8A%E8%8A%B1%E8%A6%8B&utm_source=tag
                    - generic [ref=e668]: お花見
                  - link "木" [ref=e669] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%9C%A8&utm_source=tag
                    - generic [ref=e670]: 木
                  - link "満開" [ref=e671] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%BA%80%E9%96%8B&utm_source=tag
                    - generic [ref=e672]: 満開
                  - link "イラスト集" [ref=e673] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E9%9B%86&utm_source=tag
                    - generic [ref=e674]: イラスト集
                  - link "お弁当" [ref=e675] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%8A%E5%BC%81%E5%BD%93&utm_source=tag
                    - generic [ref=e676]: お弁当
                  - link "お酒" [ref=e677] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%8A%E9%85%92&utm_source=tag
                    - generic [ref=e678]: お酒
                  - link "春" [ref=e679] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%98%A5&utm_source=tag
                    - generic [ref=e680]: 春
                  - link "flower" [ref=e681] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=flower&utm_source=tag
                    - generic [ref=e682]: flower
                  - link "フラワー" [ref=e683] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%83%95%E3%83%A9%E3%83%AF%E3%83%BC&utm_source=tag
                    - generic [ref=e684]: フラワー
                  - link "花" [ref=e685] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%8A%B1&utm_source=tag
                    - generic [ref=e686]: 花
                  - link "花びら" [ref=e687] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%8A%B1%E3%81%B3%E3%82%89&utm_source=tag
                    - generic [ref=e688]: 花びら
                  - link "さくら" [ref=e689] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%95%E3%81%8F%E3%82%89&utm_source=tag
                    - generic [ref=e690]: さくら
                  - link "サクラ" [ref=e691] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%B5%E3%82%AF%E3%83%A9&utm_source=tag
                    - generic [ref=e692]: サクラ
                  - link "花見" [ref=e693] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%8A%B1%E8%A6%8B&utm_source=tag
                    - generic [ref=e694]: 花見
                  - link "鴬" [ref=e695] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%B4%AC&utm_source=tag
                    - generic [ref=e696]: 鴬
                  - link "spring" [ref=e697] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=spring&utm_source=tag
                    - generic [ref=e698]: spring
                  - link "ウグイス" [ref=e699] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%A6%E3%82%B0%E3%82%A4%E3%82%B9&utm_source=tag
                    - generic [ref=e700]: ウグイス
                  - link "三色団子" [ref=e701] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E4%B8%89%E8%89%B2%E5%9B%A3%E5%AD%90&utm_source=tag
                    - generic [ref=e702]: 三色団子
                  - link "団子" [ref=e703] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%9B%A3%E5%AD%90&utm_source=tag
                    - generic [ref=e704]: 団子
                  - link "3月" [ref=e705] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=3%E6%9C%88&utm_source=tag
                    - generic [ref=e706]: 3月
                  - link "イベント" [ref=e707] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88&utm_source=tag
                    - generic [ref=e708]: イベント
                  - link "4月" [ref=e709] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=4%E6%9C%88&utm_source=tag
                    - generic [ref=e710]: 4月
                  - link "風景" [ref=e711] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%A2%A8%E6%99%AF&utm_source=tag
                    - generic [ref=e712]: 風景
                  - link "景色" [ref=e713] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%99%AF%E8%89%B2&utm_source=tag
                    - generic [ref=e714]: 景色
                  - link "弁当" [ref=e715] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%BC%81%E5%BD%93&utm_source=tag
                    - generic [ref=e716]: 弁当
                  - link "スプリング" [ref=e717] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%82%B9%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0&utm_source=tag
                    - generic [ref=e718]: スプリング
                  - link "花弁" [ref=e719] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%8A%B1%E5%BC%81&utm_source=tag
                    - generic [ref=e720]: 花弁
                  - link "おにぎり" [ref=e721] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%8A%E3%81%AB%E3%81%8E%E3%82%8A&utm_source=tag
                    - generic [ref=e722]: おにぎり
                  - link "酒" [ref=e723] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%85%92&utm_source=tag
                    - generic [ref=e724]: 酒
                  - link "つぼみ" [ref=e725] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E3%81%A4%E3%81%BC%E3%81%BF&utm_source=tag
                    - generic [ref=e726]: つぼみ
                  - link "蕾" [ref=e727] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E8%95%BE&utm_source=tag
                    - generic [ref=e728]: 蕾
                  - link "夜桜" [ref=e729] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%A4%9C%E6%A1%9C&utm_source=tag
                    - generic [ref=e730]: 夜桜
                  - link "鳥居" [ref=e731] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E9%B3%A5%E5%B1%85&utm_source=tag
                    - generic [ref=e732]: 鳥居
                  - link "升" [ref=e733] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E5%8D%87&utm_source=tag
                    - generic [ref=e734]: 升
                  - link "桜の木" [ref=e735] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%A1%9C%E3%81%AE%E6%9C%A8&utm_source=tag
                    - generic [ref=e736]: 桜の木
                  - link "満開の桜" [ref=e737] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/search_result.php?search_word=%E6%BA%80%E9%96%8B%E3%81%AE%E6%A1%9C&utm_source=tag
                    - generic [ref=e738]: 満開の桜
                  - link "全て表示 ≫" [ref=e739] [cursor=pointer]:
                    - /url: javascript:void(0);
                - generic [ref=e742]: "コメント: この無料イラストは、「JPEG」「EPS（Illustrator10.0）」「PNG（背景透明）」の3種類のデータをフリーでダウンロードすることができます。"
                - generic [ref=e744]:
                  - button "素材の不具合報告" [ref=e745] [cursor=pointer]:
                    - img [ref=e746]
                    - generic [ref=e747]: 素材の不具合報告
                  - button "button-violation 違反報告" [ref=e749] [cursor=pointer]:
                    - img "button-violation" [ref=e750]
                    - generic [ref=e751]: 違反報告
                - generic [ref=e753]:
                  - generic [ref=e754]:
                    - generic [ref=e756]:
                      - paragraph [ref=e757]:
                        - strong [ref=e758]: ACworksさんをビットコインで応援しよう!
                      - generic [ref=e759]:
                        - img "img-avatar" [ref=e761]
                        - img "img-bitcoin" [ref=e763]
                        - img "img-profile-avatar" [ref=e765]
                    - link "bitcoin-icon ビットコインアドレス を確認" [ref=e767] [cursor=pointer]:
                      - /url: javascript:void(0);
                      - generic [ref=e768]:
                        - img "bitcoin-icon" [ref=e769]
                        - paragraph [ref=e770]:
                          - strong [ref=e771]:
                            - text: ビットコインアドレス
                            - text: を確認
                  - link "ビットコインとは？" [ref=e773] [cursor=pointer]:
                    - /url: /main/bitcoin_address/bitcoin_description_downloader.php
                    - text: ビットコインとは？
                    - generic [ref=e774]: 
              - button "広告を非表示にする 広告を非表示にする" [ref=e779] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e780]
                - generic [ref=e781]: 広告を非表示にする
            - generic [ref=e783]:
              - generic [ref=e785]: イラストACグループサイトの「桜のイラスト」の関連検索結果（同じアカウントで無料ダウンロードできます）
              - img "lazy-design" [ref=e787]
              - separator [ref=e788]
              - img "lazy-photo" [ref=e790]
              - separator [ref=e791]
              - img "lazy-sil" [ref=e793]
              - separator [ref=e794]
              - img "lazy-video" [ref=e796]
        - dialog [ref=e797]:
          - document
      - text:    
      - contentinfo [ref=e798]:
        - generic [ref=e801]:
          - generic [ref=e802]: 昨日のダウンロード数：121,640
          - generic [ref=e803]: 先月のダウンロード数：2,966,495
          - generic [ref=e804]: 総会員数：1600万人を突破しました
        - generic [ref=e806]:
          - generic [ref=e807]:
            - generic [ref=e808]:
              - generic [ref=e809]: イラストACについて 
              - list [ref=e810]:
                - listitem [ref=e811]:
                  - link "イラストACとは" [ref=e812] [cursor=pointer]:
                    - /url: /main/about.php
                - listitem [ref=e813]:
                  - link "運営会社" [ref=e814] [cursor=pointer]:
                    - /url: /main/company.php
                - listitem [ref=e815]:
                  - link "個人情報保護方針" [ref=e816] [cursor=pointer]:
                    - /url: /main/privacy.php
                - listitem [ref=e817]:
                  - link "特定個人情報基本方針" [ref=e818] [cursor=pointer]:
                    - /url: /main/policy_personal_info.php
                - listitem [ref=e819]:
                  - link "特定商取引法に基づく表記" [ref=e820] [cursor=pointer]:
                    - /url: /main/commercial_transactions.php
                - listitem [ref=e821]:
                  - link "サイトマップ" [ref=e822] [cursor=pointer]:
                    - /url: /main/sitemap.php
                - listitem [ref=e823]:
                  - link "セキュリティポリシー" [ref=e824] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e825]:
              - generic [ref=e826]: 会員登録 
              - list [ref=e827]:
                - listitem [ref=e828]:
                  - link "無料会員登録" [ref=e829] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.ac-illust.com%2Fmain%2Fdetail.php%3Fid%3D640040&lang=jp
                - listitem [ref=e830]:
                  - link "プレミアム会員登録" [ref=e831] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
                - listitem [ref=e832]:
                  - link "イラストレーター登録" [ref=e833] [cursor=pointer]:
                    - /url: /creator/registration.php
            - generic [ref=e834]:
              - generic [ref=e835]: プレミアム会員サービス 
              - list [ref=e836]:
                - listitem [ref=e837]:
                  - link "プレミアム会員登録" [ref=e838] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
                - listitem [ref=e839]:
                  - link "法人・複数名向けプラン" [ref=e840] [cursor=pointer]:
                    - /url: https://test-lien.ac-illust.com/main/premium/business.php
                - listitem [ref=e841]:
                  - link "商品化ライセンス" [ref=e842] [cursor=pointer]:
                    - /url: /main/extra_license_terms.php
                - listitem [ref=e843]:
                  - link "あんしんサポート" [ref=e844] [cursor=pointer]:
                    - /url: /main/indemnity.php
            - generic [ref=e845]:
              - generic [ref=e846]: ヘルプ＆ガイド 
              - list [ref=e847]:
                - listitem [ref=e848]:
                  - link "ヘルプ" [ref=e849] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e850]:
                  - link "利用規約" [ref=e851] [cursor=pointer]:
                    - /url: /main/terms.php
                - listitem [ref=e852]:
                  - link "プレミアム会員利用規約" [ref=e853] [cursor=pointer]:
                    - /url: /main/terms_premium.php
            - generic [ref=e854]:
              - generic [ref=e855]: グループサイト 
              - list [ref=e856]:
                - listitem [ref=e857]:
                  - link "写真AC" [ref=e858] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/
                - listitem [ref=e859]:
                  - link "シルエットAC" [ref=e860] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e861]:
                  - link "フリービーAC" [ref=e862] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e863]:
                  - link "年賀状AC" [ref=e864] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e865]:
                  - link "動画AC" [ref=e866] [cursor=pointer]:
                    - /url: https://video-ac.com/
                - listitem [ref=e867]:
                  - link "デザインAC" [ref=e868] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e869]:
                  - link "ACデータ" [ref=e870] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e871]:
                  - link "明細AC" [ref=e872] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e873]:
            - link "twitter" [ref=e874] [cursor=pointer]:
              - /url: https://twitter.com/ACworks2011
              - button "button-twitter" [ref=e875]:
                - img [ref=e876]
            - link [ref=e878] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "button-facebook" [ref=e879]:
                - generic [ref=e880]: 
            - link [ref=e881] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "button-pinterest" [ref=e882]:
                - generic [ref=e883]: 
            - link [ref=e884] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "button-blog" [ref=e885]:
                - generic [ref=e886]: 
            - link "ご意見・ご要望" [ref=e887] [cursor=pointer]:
              - /url: "#"
              - button "ご意見・ご要望" [ref=e888]:
                - generic [ref=e889]: 
                - text: ご意見・ご要望
          - generic [ref=e891]:
            - text: © 2006-2026
            - link "イラストAC" [ref=e892] [cursor=pointer]:
              - /url: https://test-lien.ac-illust.com
      - text:  
      - text:   
    - generic [ref=e894]:
      - text:  
      - generic [ref=e895]:
        - generic "プレミアム会員登録" [ref=e896]:
          - link "ユーザープレミアムメンバーシップ" [ref=e897] [cursor=pointer]:
            - /url: https://test-lien.ac-illust.com/main/premium/campaign.php?target=premium_sozai
            - img "ユーザープレミアムメンバーシップ" [ref=e898]
        - link "ダウンロード 履歴" [ref=e900] [cursor=pointer]:
          - /url: /user/downloads.php
          - img [ref=e902]
          - generic [ref=e905]:
            - text: ダウンロード
            - text: 履歴
        - link "ライセンス まとめて購入" [ref=e907] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e909]
          - generic [ref=e913]:
            - text: ライセンス
            - text: まとめて購入
        - link "まとめて ダウンロード" [ref=e916] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e918]
          - generic [ref=e922]:
            - text: まとめて
            - text: ダウンロード
  - alert:  
```

# Test source

```ts
  126 |   readonly shareTwitterButton: Locator = this.page
  127 |     .locator('a[href*="twitter.com"], a[href*="x.com"]')
  128 |     .or(this.page.locator('.btn-share').filter({ hasText: 'X' }))
  129 |     .first();
  130 |   readonly sharePinterestButton: Locator = this.page
  131 |     .locator('a[href*="pinterest.com"]')
  132 |     .or(this.page.locator('.btn-share').filter({ hasText: 'Pinterest' }))
  133 |     .first();
  134 | 
  135 |   /** Floating toolbar elements */
  136 |   readonly floatingBulkDownload: Locator = this.page
  137 |     .locator('a:has-text("まとめて ダウンロード"), a:has-text("まとめてダウンロード")')
  138 |     .first();
  139 |   readonly floatingDownloadHistory: Locator = this.page
  140 |     .locator('a:has-text("ダウンロード 履歴"), a:has-text("ダウンロード履歴")')
  141 |     .first();
  142 | 
  143 |   /** Popover or tooltip shown to Guest when clicking protected actions */
  144 |   readonly guestNoticePopover: Locator = this.page.locator(
  145 |     'div.popover.show, div.popover:visible, div[role="tooltip"]:visible'
  146 |   ).first();
  147 | 
  148 |   constructor(page: Page) {
  149 |     super(page);
  150 |   }
  151 | 
  152 |   // Navigation Methods
  153 |   /**
  154 |    * Navigate directly to illustration detail page by ID.
  155 |    * @param id - Illustration ID (defaults to ACWORKS_DEFAULT_ILLUST_ID)
  156 |    */
  157 |   async goToDetailPage(id: string = IllustDetailPage.ACWORKS_DEFAULT_ILLUST_ID): Promise<void> {
  158 |     await this.navigate(`/main/detail.php?id=${id}`);
  159 |     await this.waitForPageLoad();
  160 |   }
  161 | 
  162 |   // Action Methods
  163 |   /**
  164 |    * Select a download format: 'JPEG' | 'PNG' | 'AI'
  165 |    * @param format - Desired format
  166 |    */
  167 |   async selectFormat(format: 'JPEG' | 'PNG' | 'AI'): Promise<void> {
  168 |     let target: Locator;
  169 |     if (format === 'JPEG') target = this.formatRadioJpeg;
  170 |     else if (format === 'PNG') target = this.formatRadioPng;
  171 |     else target = this.formatRadioAi;
  172 | 
  173 |     await target.waitFor({ state: 'attached' });
  174 |     const isInput = await target.evaluate(el => el.tagName.toLowerCase() === 'input').catch(() => false);
  175 |     if (isInput) {
  176 |       await target.check({ force: true }).catch(async () => {
  177 |         await target.click({ force: true });
  178 |       });
  179 |     }
  180 |   }
  181 | 
  182 |   /**
  183 |    * Click main download button.
  184 |    */
  185 |   async clickDownload(): Promise<void> {
  186 |     await this.clickElement(this.downloadButton);
  187 |   }
  188 | 
  189 |   /**
  190 |    * Click Premium direct download link for a specific format and wait for download event.
  191 |    * @param format - 'JPEG' | 'PNG' | 'AI' (defaults to 'JPEG')
  192 |    * @returns Playwright Download object
  193 |    */
  194 |   async downloadAsPremium(format: 'JPEG' | 'PNG' | 'AI' = 'JPEG'): Promise<import('@playwright/test').Download> {
  195 |     let downloadLink: Locator;
  196 |     if (format === 'JPEG') {
  197 |       downloadLink = this.premiumDownloadLinkJpeg;
  198 |     } else if (format === 'PNG') {
  199 |       downloadLink = this.premiumDownloadLinkPng;
  200 |     } else {
  201 |       downloadLink = this.premiumDownloadLinkAi;
  202 |     }
  203 | 
  204 |     await downloadLink.waitFor({ state: 'visible', timeout: 15_000 });
  205 |     const [download] = await Promise.all([
  206 |       this.page.waitForEvent('download', { timeout: 35_000 }),
  207 |       downloadLink.click({ force: true }),
  208 |     ]);
  209 | 
  210 |     return download;
  211 |   }
  212 | 
  213 |   /**
  214 |    * Execute full download flow for Free User on AC-Illust:
  215 |    * 1. Select format (defaults to JPEG)
  216 |    * 2. Click main download button
  217 |    * 3. Capture download event and return Download object
  218 |    * @param format - 'JPEG' (defaults to 'JPEG')
  219 |    * @returns Playwright Download object
  220 |    */
  221 |   async downloadAsFreeUser(format: 'JPEG' = 'JPEG'): Promise<import('@playwright/test').Download> {
  222 |     await this.selectFormat(format);
  223 |     await this.downloadButton.scrollIntoViewIfNeeded().catch(() => {});
  224 | 
  225 |     const [download] = await Promise.all([
> 226 |       this.page.waitForEvent('download', { timeout: 45_000 }),
      |                 ^ TimeoutError: page.waitForEvent: Timeout 45000ms exceeded while waiting for event "download"
  227 |       this.downloadButton.click({ force: true }),
  228 |     ]);
  229 | 
  230 |     return download;
  231 |   }
  232 | 
  233 |   /**
  234 |    * Click Open with Design AC online editor link.
  235 |    * @returns Newly opened Page if opened in new tab, or null if navigated in current tab
  236 |    */
  237 |   async clickOpenDesignTool(): Promise<Page | null> {
  238 |     await this.openDesignToolLink.waitFor({ state: 'visible', timeout: 15_000 });
  239 | 
  240 |     const [newPage] = await Promise.all([
  241 |       this.page.context().waitForEvent('page', { timeout: 15_000 }).catch(() => null),
  242 |       this.clickElement(this.openDesignToolLink),
  243 |     ]);
  244 | 
  245 |     return newPage;
  246 |   }
  247 | 
  248 |   /**
  249 |    * Click bookmark button.
  250 |    */
  251 |   async clickBookmark(): Promise<void> {
  252 |     await this.clickElement(this.bookmarkButton);
  253 |   }
  254 | 
  255 |   /**
  256 |    * Click Like button.
  257 |    */
  258 |   async clickLike(): Promise<void> {
  259 |     await this.clickElement(this.likeButton);
  260 |   }
  261 | 
  262 |   /**
  263 |    * Click Fan registration button.
  264 |    */
  265 |   async clickFan(): Promise<void> {
  266 |     await this.clickElement(this.fanButton);
  267 |   }
  268 | }
  269 | 
```