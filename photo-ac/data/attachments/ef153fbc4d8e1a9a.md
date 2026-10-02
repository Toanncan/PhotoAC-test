# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-premium.spec.ts >> Search & Filters Feature — Premium User (Paid Downloader Account) >> TC-SEARCH-PREM-027: Premium User kết hợp Đa bộ lọc (Chiều ngang + Không có người + Loại trừ AI) qua UI Toolbar @regression @premium
- Location: photo-ac/src/tests/downloader/search-premium.spec.ts:689:7

# Error details

```
Error: Timeout 10000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/"
  - paragraph [ref=e3]:
    - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
    - link "詳細" [ref=e4] [cursor=pointer]:
      - /url: /main/privacy
    - link "同意" [ref=e5] [cursor=pointer]:
      - /url: ""
  - banner [ref=e6]:
    - link [ref=e9] [cursor=pointer]:
      - /url: https://acworks.co.jp/three_cities_agreements/
    - text:                    
  - generic [ref=e13]:
    - generic [ref=e20]:
      - button [ref=e22] [cursor=pointer]:
        - generic [ref=e23]: 
      - generic [ref=e24]:
        - button [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: 
        - button "AI Search is off" [ref=e27] [cursor=pointer]:
          - img "AI Search is off" [ref=e28]
        - searchbox "キーワード（例：女性）" [ref=e30]
        - generic [ref=e31]:
          - generic [ref=e33] [cursor=pointer]: 詳細 検索▼
          - link "画像検索" [ref=e35] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e36]:
              - generic [ref=e37]: 
              - generic [ref=e38]: 画像検索
    - generic [ref=e39]:
      - link " 写真投稿する 写真投稿する" [ref=e40] [cursor=pointer]:
        - /url: /creator/auth/register
        - generic [ref=e41]: 
        - text: 写真投稿する 写真投稿する
      - generic [ref=e43]:
        - button "クリックしてACアプリケーションのリストを表示" [ref=e46] [cursor=pointer]:
          - img [ref=e47]
        - text:    
      - generic [ref=e49]:
        - link "ホーム" [ref=e51] [cursor=pointer]:
          - /url: /
          - img [ref=e52]
          - generic [ref=e54]: ホーム
        - link "コレクション" [ref=e56] [cursor=pointer]:
          - /url: /user/bookmarks/
          - generic [ref=e57]: 
          - generic [ref=e58]: コレクション
        - generic [ref=e59]:
          - button "お気に入り" [ref=e60] [cursor=pointer]:
            - generic [ref=e61]: 
            - paragraph [ref=e62]:
              - text: お気に入り
              - generic [ref=e63]: 
          - text:  
        - generic [ref=e66]:
          - button "Avatar プレミアムサービス 法人プレミアム (オーナー) a***************************mさん " [ref=e67] [cursor=pointer]:
            - img "Avatar" [ref=e69]
            - generic [ref=e70]:
              - generic [ref=e71]:
                - img "プレミアムサービス" [ref=e72]
                - generic [ref=e73]: 法人プレミアム (オーナー)
              - generic [ref=e74]: a***************************mさん
            - text: 
          - text:   
        - generic [ref=e78] [cursor=pointer]:
          - img [ref=e79]
          - generic [ref=e83]: ヘルプ
  - text: 
  - generic [ref=e84]:
    - generic [ref=e85]:
      - link "PhotoAC" [ref=e86] [cursor=pointer]:
        - /url: /
        - img "PhotoAC" [ref=e87]
      - button "mobile-btn-close" [ref=e88] [cursor=pointer]:
        - img [ref=e89]
    - list [ref=e92]:
      - listitem [ref=e93]
      - listitem [ref=e94]:
        - link "デザインテンプレート" [ref=e95] [cursor=pointer]:
          - /url: https://www.design-ac.net/
          - text: デザインテンプレート
          - generic [ref=e96]: 
      - listitem [ref=e97]:
        - link "ファイル転送・共有" [ref=e98] [cursor=pointer]:
          - /url: https://ac-data.info/
          - text: ファイル転送・共有
          - generic [ref=e99]: 
      - listitem [ref=e100]:
        - button "写真カテゴリー" [ref=e101] [cursor=pointer]:
          - text: 写真カテゴリー
          - generic [ref=e102]: 
      - listitem [ref=e103]:
        - button "ランキング" [ref=e104] [cursor=pointer]:
          - text: ランキング
          - generic [ref=e105]: 
      - listitem [ref=e106]:
        - link "新着写真一覧" [ref=e107] [cursor=pointer]:
          - /url: /main/latest
      - listitem [ref=e108]:
        - button "画像生成AI" [ref=e109] [cursor=pointer]:
          - text: 画像生成AI
          - generic [ref=e110]: 
      - listitem [ref=e111]:
        - link "公開中のコレクション" [ref=e112] [cursor=pointer]:
          - /url: /main/collections
      - listitem [ref=e113]:
        - link "クリエイター一覧" [ref=e114] [cursor=pointer]:
          - /url: /creators/
      - listitem [ref=e115]:
        - link "おすすめ特集一覧" [ref=e116] [cursor=pointer]:
          - /url: /pickup/1
      - listitem [ref=e117]:
        - link "おすすめ人気モデル一覧" [ref=e118] [cursor=pointer]:
          - /url: /models/
      - listitem [ref=e119]:
        - link "商品化ライセンスとは?" [ref=e120] [cursor=pointer]:
          - /url: /main/extra_license_terms
      - listitem [ref=e121]:
        - link "写真の権利について" [ref=e122] [cursor=pointer]:
          - /url: /main/guide/rights-of-objects
      - listitem [ref=e123]:
        - link "FAQ・ヘルプ" [ref=e124] [cursor=pointer]:
          - /url: https://help.freebie-ac.jp
      - listitem [ref=e125]:
        - link "クリエイター投稿（新規登録）" [ref=e126] [cursor=pointer]:
          - /url: /creator/auth/register
      - listitem [ref=e127]:
        - link "クリエイターログイン" [ref=e128] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e129]:
        - link "今日の運勢" [ref=e130] [cursor=pointer]:
          - /url: https://uranai-ac.com/
          - text: 今日の運勢
          - generic [ref=e131]: 
  - generic [ref=e132]:
    - generic [ref=e134]:
      - button "画像で検索する" [ref=e135] [cursor=pointer]:
        - img [ref=e136]
      - generic [ref=e138]: 画像で検索する
    - separator [ref=e139]
    - generic [ref=e140]:
      - paragraph [ref=e141]: 画像から似ている画像を検索できます。
      - paragraph [ref=e142]: ※5MBまでのJPGまたはPNGファイルのみ
      - generic [ref=e143]:
        - listitem [ref=e144]:
          - img [ref=e145]
        - listitem [ref=e152]:
          - generic [ref=e153]: ファイルを選択
  - generic [ref=e154]:
    - button [ref=e156] [cursor=pointer]:
      - img [ref=e157]
    - generic [ref=e160]:
      - generic [ref=e161]:
        - button [ref=e162] [cursor=pointer]:
          - img [ref=e163]
        - textbox "キーワード（例：女性）" [ref=e166]
      - generic [ref=e167]:
        - button "文章で検索 文章で検索 文章で検索" [ref=e169] [cursor=pointer]:
          - img "文章で検索" [ref=e170]
          - text: 文章で検索
          - img "文章で検索" [ref=e172]
        - button "画像で検索" [ref=e174] [cursor=pointer]:
          - generic [ref=e175]: 
          - text: 画像で検索
    - separator [ref=e176]
    - generic [ref=e177]:
      - generic [ref=e178]: 並び順
      - generic [ref=e179]:
        - generic [ref=e180]:
          - radio "関連性の高い順" [checked] [ref=e181]
          - generic [ref=e182]: 関連性の高い順
        - generic [ref=e183]:
          - radio "新着順" [ref=e184]
          - generic [ref=e185]: 新着順
        - generic [ref=e186]:
          - radio "人気順" [ref=e187]
          - generic [ref=e188]: 人気順
    - generic [ref=e190]:
      - generic [ref=e191]: カテゴリー
      - listbox [ref=e192]:
        - option "人物" [ref=e193]
        - option "ビジネス" [ref=e194]
        - option "動物・生き物" [ref=e195]
        - option "花・植物" [ref=e196]
        - option "食べ物・飲み物" [ref=e197]
        - option "町並み・建物" [ref=e198]
        - option "医療・福祉" [ref=e199]
        - option "交通・乗り物" [ref=e200]
        - option "季節・行事" [ref=e201]
        - option "自然・風景" [ref=e202]
        - option "スポーツ" [ref=e203]
        - option "エコ・環境" [ref=e204]
        - option "美容・健康" [ref=e205]
        - option "住宅・インテリア" [ref=e206]
        - option "年賀状" [ref=e207]
        - option "テクスチャ・背景" [ref=e208]
        - option "小物・雑貨" [ref=e209]
        - option "クレイアート" [ref=e210]
        - option "外国" [ref=e211]
        - option "ロマンティック" [ref=e212]
        - option "スプラッター" [ref=e213]
    - generic [ref=e215]:
      - generic [ref=e216]: 除外カテゴリー
      - listbox [ref=e217]:
        - option "人物" [ref=e218]
        - option "ビジネス" [ref=e219]
        - option "動物・生き物" [ref=e220]
        - option "花・植物" [ref=e221]
        - option "食べ物・飲み物" [ref=e222]
        - option "町並み・建物" [ref=e223]
        - option "医療・福祉" [ref=e224]
        - option "交通・乗り物" [ref=e225]
        - option "季節・行事" [ref=e226]
        - option "自然・風景" [ref=e227]
        - option "スポーツ" [ref=e228]
        - option "エコ・環境" [ref=e229]
        - option "美容・健康" [ref=e230]
        - option "住宅・インテリア" [ref=e231]
        - option "年賀状" [ref=e232]
        - option "テクスチャ・背景" [ref=e233]
        - option "小物・雑貨" [ref=e234]
        - option "クレイアート" [ref=e235]
        - option "外国" [ref=e236]
        - option "ロマンティック" [ref=e237]
        - option "スプラッター" [ref=e238]
    - generic [ref=e239]:
      - generic [ref=e240]: 除外キーワード
      - textbox "除外キーワードを入力" [ref=e241]
    - generic [ref=e243]:
      - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e244]
      - generic [ref=e245]: AI生成ツール使用素材を除く
    - separator [ref=e246]
    - generic [ref=e247]:
      - generic [ref=e248]: 縦長・横長の選択
      - generic [ref=e249]:
        - generic [ref=e250]:
          - radio "全て" [checked] [ref=e251]
          - generic [ref=e252]: 全て
        - generic [ref=e253]:
          - radio "縦長" [ref=e254]
          - generic [ref=e255]: 縦長
        - generic [ref=e256]:
          - radio "横長" [ref=e257]
          - generic [ref=e258]: 横長
    - generic [ref=e259]:
      - generic [ref=e260]: 画像種別
      - combobox [ref=e261]:
        - option "全ての画像" [selected]
        - option "Mediumサイズ以上がある"
        - option "Largeサイズがある"
        - option "PSDがある"
    - generic [ref=e262]:
      - generic [ref=e263]: クリエイター名
      - textbox "クリエイター名を入力" [ref=e264]
    - generic [ref=e265]:
      - generic [ref=e266]: 除外クリエイター名
      - textbox "除外クリエイター名を入力" [ref=e267]
    - generic [ref=e268]:
      - generic [ref=e269]: 素材ID
      - textbox "素材のIDを入力" [ref=e270]
    - generic [ref=e271]:
      - generic [ref=e272]: 色
      - generic [ref=e273]:
        - generic [ref=e274]:
          - radio "全て" [checked] [ref=e275]
          - generic [ref=e276]: 全て
        - generic [ref=e277]:
          - generic [ref=e278]:
            - button [ref=e280] [cursor=pointer]
            - button [ref=e282] [cursor=pointer]
            - button [ref=e284] [cursor=pointer]
            - button [ref=e286] [cursor=pointer]
            - button [ref=e288] [cursor=pointer]
          - generic [ref=e289]:
            - button [ref=e291] [cursor=pointer]
            - button [ref=e293] [cursor=pointer]
            - button [ref=e295] [cursor=pointer]
            - button [ref=e297] [cursor=pointer]
            - button [ref=e299] [cursor=pointer]
          - generic [ref=e300]:
            - button [ref=e302] [cursor=pointer]
            - button [ref=e304] [cursor=pointer]
            - button [ref=e306] [cursor=pointer]
            - button [ref=e308] [cursor=pointer]
    - generic [ref=e313]:
      - generic [ref=e314]: モデル人数
      - generic [ref=e315]:
        - generic [ref=e316]:
          - radio "全て" [checked] [ref=e317]
          - generic [ref=e318]: 全て
        - generic [ref=e319]:
          - radio "無人" [ref=e320]
          - generic [ref=e321]: 無人
        - generic [ref=e322]:
          - radio "1人" [ref=e323]
          - generic [ref=e324]: 1人
        - generic [ref=e325]:
          - radio "2人" [ref=e326]
          - generic [ref=e327]: 2人
        - generic [ref=e328]:
          - radio "3人以上" [ref=e329]
          - generic [ref=e330]: 3人以上
    - generic [ref=e331]:
      - generic [ref=e332]: モデル年代
      - combobox [ref=e333]:
        - option "全ての年代" [selected]
        - option "赤ちゃん"
        - option "子供"
        - option "若者"
        - option "大人"
        - option "中高年"
        - option "高齢者"
    - generic [ref=e334]:
      - generic [ref=e335]: モデルリリース
      - generic [ref=e336]:
        - generic [ref=e337]:
          - radio "全て" [checked] [ref=e338]
          - generic [ref=e339]: 全て
        - generic [ref=e340]:
          - radio "取得済のみ" [ref=e341]
          - generic [ref=e342]: 取得済のみ
    - generic [ref=e343]:
      - generic [ref=e344]: プロパティリリース
      - generic [ref=e345]:
        - generic [ref=e346]:
          - radio "全て" [checked] [ref=e347]
          - generic [ref=e348]: 全て
        - generic [ref=e349]:
          - radio "取得済のみ" [ref=e350]
          - generic [ref=e351]: 取得済のみ
    - generic [ref=e352]:
      - generic [ref=e354] [cursor=pointer]: 完全一致
      - checkbox "完全一致" [ref=e356] [cursor=pointer]
    - button "検 索" [ref=e358] [cursor=pointer]
  - text:      
  - generic [ref=e359]:
    - generic [ref=e361]:
      - text:  
      - generic [ref=e362]:
        - link "ダウンロード 履歴" [ref=e364] [cursor=pointer]:
          - /url: /user/downloads
          - img [ref=e366]
          - generic [ref=e369]:
            - text: ダウンロード
            - text: 履歴
        - link "ライセンス まとめて購入" [ref=e371] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e373]
          - generic [ref=e377]:
            - text: ライセンス
            - text: まとめて購入
        - link "まとめて ダウンロード" [ref=e380] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e382]
          - generic [ref=e386]:
            - text: まとめて
            - text: ダウンロード
    - generic [ref=e387]:
      - generic [ref=e388]:
        - list [ref=e390]:
          - listitem [ref=e392]:
            - img "写真AC" [ref=e393]
        - generic [ref=e395]:
          - generic [ref=e396]:
            - generic [ref=e397]: AI検索(β版)
            - generic [ref=e399]:
              - button "search_btn" [ref=e400] [cursor=pointer]:
                - generic [ref=e401]: 
              - button "AI Search is off" [ref=e402] [cursor=pointer]:
                - img "AI Search is off" [ref=e403]
              - status [ref=e404]
              - searchbox "キーワード（例：女性）" [ref=e405]: office
              - link "リセット" [ref=e406] [cursor=pointer]:
                - /url: javascript:void(0);
                - img [ref=e408]
              - generic [ref=e411] [cursor=pointer]:
                - text: 詳細検索
                - generic: ▼
              - link "画像検索" [ref=e413] [cursor=pointer]:
                - /url: "#"
                - generic [ref=e414]:
                  - generic [ref=e415]: 
                  - generic [ref=e416]: 画像検索
          - generic [ref=e417]:
            - link "秋" [ref=e418] [cursor=pointer]:
              - /url: /main/search?q=%E7%A7%8B&utm_source=top_keyword
              - img [ref=e419]
              - text: 秋
            - link "女性" [ref=e421] [cursor=pointer]:
              - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
              - img [ref=e422]
              - text: 女性
            - link "ビジネス" [ref=e424] [cursor=pointer]:
              - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
              - img [ref=e425]
              - text: ビジネス
            - link "紅葉" [ref=e427] [cursor=pointer]:
              - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
              - img [ref=e428]
              - text: 紅葉
            - link "和紙" [ref=e430] [cursor=pointer]:
              - /url: /main/search?q=%E5%92%8C%E7%B4%99&utm_source=top_keyword
              - img [ref=e431]
              - text: 和紙
      - generic [ref=e434]:
        - link "写真AC 人気日本人モデル" [ref=e436] [cursor=pointer]:
          - /url: https://www.photo-ac.com/models/
          - img "写真AC" [ref=e437]
          - generic [ref=e438]: 人気日本人モデル
        - link "写真AC 紅葉" [ref=e440] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E7%B4%85%E8%91%89&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e441]
          - generic [ref=e442]: 紅葉
        - link "写真AC 運動会" [ref=e444] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E9%81%8B%E5%8B%95%E4%BC%9A&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e445]
          - generic [ref=e446]: 運動会
        - link "写真AC ハロウィン" [ref=e448] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?by_ai=&q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e449]
          - generic [ref=e450]: ハロウィン
      - generic [ref=e454]:
        - generic [ref=e455]:
          - link "creator-register" [ref=e457] [cursor=pointer]:
            - /url: /creator/auth/register
            - img "creator-register" [ref=e458]
          - generic [ref=e459]:
            - heading "写真素材メニュー" [level=4] [ref=e460]
            - button "写真カテゴリー" [ref=e462] [cursor=pointer]:
              - text: 写真カテゴリー
              - generic [ref=e463]: 
            - link "人気写真ランキング" [ref=e465] [cursor=pointer]:
              - /url: /ranking
            - link "モデルから写真を検索" [ref=e467] [cursor=pointer]:
              - /url: /models/
            - link "おすすめ特集一覧" [ref=e469] [cursor=pointer]:
              - /url: /pickup/1
            - link "新着写真一覧" [ref=e471] [cursor=pointer]:
              - /url: /main/latest
            - link "公開中のコレクション" [ref=e473] [cursor=pointer]:
              - /url: /main/collections
          - generic [ref=e474]:
            - heading "画像生成AI" [level=4] [ref=e475]
            - link "AC写真AIラボ NEW" [ref=e477] [cursor=pointer]:
              - /url: /image-generator/
              - text: AC写真AIラボ
              - generic [ref=e478]: NEW
            - link "AI人物素材" [ref=e480] [cursor=pointer]:
              - /url: /main/genface
          - generic [ref=e481]:
            - heading "クリエイターメニュー" [level=4] [ref=e482]
            - link "クリエイター投稿（新規登録）" [ref=e484] [cursor=pointer]:
              - /url: /creator/auth/register
            - link "クリエイターログイン" [ref=e486] [cursor=pointer]:
              - /url: "#"
            - link "ポイント換金ランキング" [ref=e488] [cursor=pointer]:
              - /url: /ranking/prize
            - link "クリエイター一覧" [ref=e490] [cursor=pointer]:
              - /url: /creators/
          - generic [ref=e491]:
            - heading "プレミアム会員サービス" [level=4] [ref=e492]
            - link "商品化ライセンス" [ref=e494] [cursor=pointer]:
              - /url: /main/extra_license_terms
            - link "あんしんサポート" [ref=e496] [cursor=pointer]:
              - /url: /indemnity/
          - generic [ref=e497]:
            - heading "ヘルプ＆ガイド" [level=4] [ref=e498]
            - link "写真ACとは" [ref=e500] [cursor=pointer]:
              - /url: /main/guide/#group-site
            - link "写真の権利" [ref=e502] [cursor=pointer]:
              - /url: /main/rights
            - link "ヘルプ" [ref=e504] [cursor=pointer]:
              - /url: https://help.freebie-ac.jp
            - link "利用規約" [ref=e506] [cursor=pointer]:
              - /url: /main/terms
          - link "Interview" [ref=e510] [cursor=pointer]:
            - /url: /interview
            - img "Interview" [ref=e511]
          - generic [ref=e512]:
            - heading "おすすめ無料サービス" [level=4] [ref=e513]
            - link "デザインテンプレート" [ref=e515] [cursor=pointer]:
              - /url: https://www.design-ac.net/
              - text: デザインテンプレート
              - generic [ref=e516]: 
            - link "ファイル転送・共有" [ref=e518] [cursor=pointer]:
              - /url: https://ac-data.info/
              - text: ファイル転送・共有
              - generic [ref=e519]: 
            - link "今日の運勢" [ref=e521] [cursor=pointer]:
              - /url: https://uranai-ac.com/
              - text: 今日の運勢
              - generic [ref=e522]: 
            - link "プレゼン資料作成AI" [ref=e524] [cursor=pointer]:
              - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
              - text: プレゼン資料作成AI
              - generic [ref=e525]: 
          - iframe [ref=e526]:
            
          - generic [ref=e527]:
            - heading "人気キーワード（タグ）" [level=4] [ref=e528]:
              - button "人気キーワード（タグ）" [ref=e529] [cursor=pointer]:
                - text: 人気キーワード（タグ）
                - generic [ref=e530]: 
            - generic [ref=e531]:
              - generic [ref=e532]:
                - link "秋" [ref=e533] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&utm_source=top_keyword
                - link "女性" [ref=e534] [cursor=pointer]:
                  - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
                - link "ビジネス" [ref=e535] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
                - link "紅葉" [ref=e536] [cursor=pointer]:
                  - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
                - link "和紙" [ref=e537] [cursor=pointer]:
                  - /url: /main/search?q=%E5%92%8C%E7%B4%99&utm_source=top_keyword
                - link "ハロウィン" [ref=e538] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&utm_source=top_keyword
                - link "パソコン" [ref=e539] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&utm_source=top_keyword
                - link "犬" [ref=e540] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8A%AC&utm_source=top_keyword
                - link "空" [ref=e541] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A9%BA&utm_source=top_keyword
                - link "猫" [ref=e542] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8C%AB&utm_source=top_keyword
                - link "学生" [ref=e543] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%A6%E7%94%9F&utm_source=top_keyword
                - link "背景" [ref=e544] [cursor=pointer]:
                  - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "青空" [ref=e545] [cursor=pointer]:
                  - /url: /main/search?q=%E9%9D%92%E7%A9%BA&utm_source=top_keyword
                - link "子供" [ref=e546] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%90%E4%BE%9B&utm_source=top_keyword
                - link "cat" [ref=e547] [cursor=pointer]:
                  - /url: /main/search?q=cat&utm_source=top_keyword
                - link "花" [ref=e548] [cursor=pointer]:
                  - /url: /main/search?q=%E8%8A%B1&utm_source=top_keyword
                - link "オフィス" [ref=e549] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&utm_source=top_keyword
                - link "桜" [ref=e550] [cursor=pointer]:
                  - /url: /main/search?q=%E6%A1%9C&utm_source=top_keyword
                - link "部屋" [ref=e551] [cursor=pointer]:
                  - /url: /main/search?q=%E9%83%A8%E5%B1%8B&utm_source=top_keyword
                - link "リビング" [ref=e552] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%AA%E3%83%93%E3%83%B3%E3%82%B0&utm_source=top_keyword
                - link "木目" [ref=e553] [cursor=pointer]:
                  - /url: /main/search?q=%E6%9C%A8%E7%9B%AE&utm_source=top_keyword
                - link "男性" [ref=e554] [cursor=pointer]:
                  - /url: /main/search?q=%E7%94%B7%E6%80%A7&utm_source=top_keyword
                - link "家族" [ref=e555] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AE%B6%E6%97%8F&utm_source=top_keyword
                - link "海辺の村" [ref=e556] [cursor=pointer]:
                  - /url: /main/search?q=%E6%B5%B7%E8%BE%BA%E3%81%AE%E6%9D%91&utm_source=top_keyword
                - link "スマホ" [ref=e557] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%B9%E3%83%9E%E3%83%9B&utm_source=top_keyword
                - link "電気工事" [ref=e558] [cursor=pointer]:
                  - /url: /main/search?q=%E9%9B%BB%E6%B0%97%E5%B7%A5%E4%BA%8B&utm_source=top_keyword
                - link "風景" [ref=e559] [cursor=pointer]:
                  - /url: /main/search?q=%E9%A2%A8%E6%99%AF&utm_source=top_keyword
                - link "10月" [ref=e560] [cursor=pointer]:
                  - /url: /main/search?q=10%E6%9C%88&utm_source=top_keyword
                - link "パソコン 女性" [ref=e561] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3+%E5%A5%B3%E6%80%A7&utm_source=top_keyword
                - link "海" [ref=e562] [cursor=pointer]:
                  - /url: /main/search?q=%E6%B5%B7&utm_source=top_keyword
                - link "介護" [ref=e563] [cursor=pointer]:
                  - /url: /main/search?q=%E4%BB%8B%E8%AD%B7&utm_source=top_keyword
                - link "野菜" [ref=e564] [cursor=pointer]:
                  - /url: /main/search?q=%E9%87%8E%E8%8F%9C&utm_source=top_keyword
                - link "トマト" [ref=e565] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%88%E3%83%9E%E3%83%88&utm_source=top_keyword
                - link "炎" [ref=e566] [cursor=pointer]:
                  - /url: /main/search?q=%E7%82%8E&utm_source=top_keyword
                - link "カフェ" [ref=e567] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7&utm_source=top_keyword
                - link "AI" [ref=e568] [cursor=pointer]:
                  - /url: /main/search?q=AI&utm_source=top_keyword
                - link "コーヒー" [ref=e569] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC&utm_source=top_keyword
                - link "茶道" [ref=e570] [cursor=pointer]:
                  - /url: /main/search?q=%E8%8C%B6%E9%81%93&utm_source=top_keyword
                - link "富士山" [ref=e571] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AF%8C%E5%A3%AB%E5%B1%B1&utm_source=top_keyword
                - link "病院" [ref=e572] [cursor=pointer]:
                  - /url: /main/search?q=%E7%97%85%E9%99%A2&utm_source=top_keyword
                - link "伐採" [ref=e573] [cursor=pointer]:
                  - /url: /main/search?q=%E4%BC%90%E6%8E%A1&utm_source=top_keyword
                - link "人物" [ref=e574] [cursor=pointer]:
                  - /url: /main/search?q=%E4%BA%BA%E7%89%A9&utm_source=top_keyword
                - link "コスモス" [ref=e575] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%B3%E3%82%B9%E3%83%A2%E3%82%B9&utm_source=top_keyword
                - link "月" [ref=e576] [cursor=pointer]:
                  - /url: /main/search?q=%E6%9C%88&utm_source=top_keyword
                - link "家" [ref=e577] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AE%B6&utm_source=top_keyword
                - link "貯金" [ref=e578] [cursor=pointer]:
                  - /url: /main/search?q=%E8%B2%AF%E9%87%91&utm_source=top_keyword
                - link "flower" [ref=e579] [cursor=pointer]:
                  - /url: /main/search?q=flower&utm_source=top_keyword
                - link "花束" [ref=e580] [cursor=pointer]:
                  - /url: /main/search?q=%E8%8A%B1%E6%9D%9F&utm_source=top_keyword
                - link "ホワイトニング" [ref=e581] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88%E3%83%8B%E3%83%B3%E3%82%B0&utm_source=top_keyword
                - link "星空" [ref=e582] [cursor=pointer]:
                  - /url: /main/search?q=%E6%98%9F%E7%A9%BA&utm_source=top_keyword
              - paragraph [ref=e583]:
                - button "もっと見る" [ref=e584] [cursor=pointer]:
                  - text: もっと見る
                  - generic [ref=e585]: 
                - text: 
          - generic [ref=e586]:
            - heading "メディア" [level=4] [ref=e587]
            - heading "テレビでご紹介いただきました！" [level=4] [ref=e588]
            - iframe [ref=e589]:
              - img [ref=f5e2]
            - paragraph [ref=e590]: かんさい情報ネット ten. | 読売テレビ
          - heading "ブログ" [level=4] [ref=e592]
          - generic [ref=e593]:
            - heading "SNS" [level=4] [ref=e594]
            - link "ACワークス公式 X" [ref=e596] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
            - link "Mr.ビー X" [ref=e598] [cursor=pointer]:
              - /url: https://x.com/mrb_ac
        - generic [ref=e599]:
          - generic [ref=e600]:
            - paragraph [ref=e602]: 人気写真
            - generic [ref=e604]:
              - figure [ref=e605]:
                - img "スーパーで食料品の買い物をする人 スーパー,スーパーマーケット,買い物の写真素材" [ref=e607]
                - text: 
              - figure [ref=e608]:
                - img "赤ちゃんとお母さん 赤ちゃん,母親,子育ての写真素材" [ref=e610]
                - text: 
              - figure [ref=e611]:
                - img "女性がエステで顔のマッサージを受ける エステ,美容,美容サロンの写真素材" [ref=e613]
                - text: 
              - figure [ref=e614]:
                - img "カメラ目線で微笑む女性 女性,女,レディの写真素材" [ref=e616]
                - text: 
              - figure [ref=e617]:
                - img "ベッドでマッサージ（整体）を受ける若い女性 マッサージ,女性,整体の写真素材" [ref=e619]
                - text: 
              - text:   
            - link "人気の投稿写真を詳しく見る" [ref=e621] [cursor=pointer]:
              - /url: /main/trends
              - text: 人気の投稿写真を詳しく見る
              - generic [ref=e622]: 
          - img "preloader-personalized-list" [ref=e625]
          - generic [ref=e626]:
            - paragraph [ref=e628]: デザインに統一感を持たせましょう
            - paragraph [ref=e629]:
              - text: チラシやウェブサイト、資料など、どのようなデザインにも統一感が大切です。
              - text: クリエイターのマイカテゴリーからテーマごとに写真を見つけることができます。同じスタイルの素材をダウンロードしてみましょう。
            - generic [ref=e630]: ※週間ダウンロードランキングからランダムに表示（クリエイター広告出稿者優遇）
            - generic [ref=e631]:
              - figure "外国人キッズ" [ref=e632]:
                - generic [ref=e634]:
                  - img "colorfulkidsac" [ref=e635]
                  - generic [ref=e636]:
                    - img "colorfulkidsac" [ref=e637]
                    - img "colorfulkidsac" [ref=e638]
                - link "外国人キッズ" [ref=e640] [cursor=pointer]:
                  - /url: /main/search?q=colorfulkidsac&creator=ACworks
              - figure "花" [ref=e641]:
                - generic [ref=e642]:
                  - generic [ref=e643]:
                    - img "花" [ref=e644]
                    - generic [ref=e645]:
                      - img "花" [ref=e646]
                      - img "花" [ref=e647]
                  - text: 
                - link "花" [ref=e649] [cursor=pointer]:
                  - /url: /main/search?q=%E8%8A%B1&creator=xia%E2%80%86xi
              - figure "空のある風景" [ref=e650]:
                - generic [ref=e651]:
                  - generic [ref=e652]:
                    - img "ブルー" [ref=e653]
                    - generic [ref=e654]:
                      - img "ブルー" [ref=e655]
                      - img "ブルー" [ref=e656]
                  - text: 
                - link "空のある風景" [ref=e658] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%96%E3%83%AB%E3%83%BC&creator=ink4
              - figure "猫" [ref=e659]:
                - generic [ref=e660]:
                  - generic [ref=e661]:
                    - img "猫" [ref=e662]
                    - generic [ref=e663]:
                      - img "猫" [ref=e664]
                      - img "猫" [ref=e665]
                  - text: 
                - link "猫" [ref=e667] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8C%AB&creator=%E7%99%BE%E5%92%8C
              - figure "コンクリート" [ref=e668]:
                - generic [ref=e669]:
                  - generic [ref=e670]:
                    - img "コンクリート" [ref=e671]
                    - generic [ref=e672]:
                      - img "コンクリート" [ref=e673]
                      - img "コンクリート" [ref=e674]
                  - text: 
                - link "コンクリート" [ref=e676] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%B3%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%88&creator=%E3%82%86%E3%81%8D%E3%81%AEsan
              - figure "桜" [ref=e677]:
                - generic [ref=e678]:
                  - generic [ref=e679]:
                    - img "桜" [ref=e680]
                    - generic [ref=e681]:
                      - img "桜" [ref=e682]
                      - img "桜" [ref=e683]
                  - text: 
                - link "桜" [ref=e685] [cursor=pointer]:
                  - /url: /main/search?q=%E6%A1%9C&creator=%E3%81%B4%E3%81%B4%E3%81%B5%E3%81%89%E3%81%A8
              - figure "パソコンなどビジネスイメージ" [ref=e686]:
                - generic [ref=e687]:
                  - generic [ref=e688]:
                    - img "パソコン" [ref=e689]
                    - generic [ref=e690]:
                      - img "パソコン" [ref=e691]
                      - img "パソコン" [ref=e692]
                  - text: 
                - link "パソコンなどビジネスイメージ" [ref=e694] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&creator=%E6%92%AE%E5%BD%B1%E3%81%97%E3%81%A6%E3%81%BE%E3%81%99__
              - figure "長野県" [ref=e695]:
                - generic [ref=e696]:
                  - generic [ref=e697]:
                    - img "長野県" [ref=e698]
                    - generic [ref=e699]:
                      - img "長野県" [ref=e700]
                      - img "長野県" [ref=e701]
                  - text: 
                - link "長野県" [ref=e703] [cursor=pointer]:
                  - /url: /main/search?q=%E9%95%B7%E9%87%8E%E7%9C%8C&creator=aoita
            - link "詳しく見る" [ref=e705] [cursor=pointer]:
              - /url: main/creator_categories
              - text: 詳しく見る
              - generic [ref=e706]: 
          - generic [ref=e707]:
            - paragraph [ref=e709]: 写真カテゴリー
            - generic [ref=e710]:
              - generic [ref=e712]:
                - link "カテゴリ。- 人物 人物" [ref=e715] [cursor=pointer]:
                  - /url: /main/search?c_id=1&c_name=%E4%BA%BA%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 人物" [ref=e716]
                  - generic [ref=e717]: 人物
                - link "カテゴリ。- ビジネス ビジネス" [ref=e720] [cursor=pointer]:
                  - /url: /main/search?c_id=2&c_name=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- ビジネス" [ref=e721]
                  - generic [ref=e722]: ビジネス
                - link "カテゴリ。- 動物・生き物 動物・生き物" [ref=e725] [cursor=pointer]:
                  - /url: /main/search?c_id=3&c_name=%E5%8B%95%E7%89%A9%E3%83%BB%E7%94%9F%E3%81%8D%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 動物・生き物" [ref=e726]
                  - generic [ref=e727]: 動物・生き物
                - link "カテゴリ。- 花・植物 花・植物" [ref=e730] [cursor=pointer]:
                  - /url: /main/search?c_id=4&c_name=%E8%8A%B1%E3%83%BB%E6%A4%8D%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 花・植物" [ref=e731]
                  - generic [ref=e732]: 花・植物
                - link "カテゴリ。- 食べ物・飲み物 食べ物・飲み物" [ref=e735] [cursor=pointer]:
                  - /url: /main/search?c_id=5&c_name=%E9%A3%9F%E3%81%B9%E7%89%A9%E3%83%BB%E9%A3%B2%E3%81%BF%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 食べ物・飲み物" [ref=e736]
                  - generic [ref=e737]: 食べ物・飲み物
                - link "カテゴリ。- 町並み・建物 町並み・建物" [ref=e740] [cursor=pointer]:
                  - /url: /main/search?c_id=6&c_name=%E7%94%BA%E4%B8%A6%E3%81%BF%E3%83%BB%E5%BB%BA%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 町並み・建物" [ref=e741]
                  - generic [ref=e742]: 町並み・建物
                - link "カテゴリ。- 医療・福祉 医療・福祉" [ref=e745] [cursor=pointer]:
                  - /url: /main/search?c_id=7&c_name=%E5%8C%BB%E7%99%82%E3%83%BB%E7%A6%8F%E7%A5%89&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 医療・福祉" [ref=e746]
                  - generic [ref=e747]: 医療・福祉
                - link "カテゴリ。- 交通・乗り物 交通・乗り物" [ref=e750] [cursor=pointer]:
                  - /url: /main/search?c_id=8&c_name=%E4%BA%A4%E9%80%9A%E3%83%BB%E4%B9%97%E3%82%8A%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 交通・乗り物" [ref=e751]
                  - generic [ref=e752]: 交通・乗り物
                - link "カテゴリ。- 季節・行事 季節・行事" [ref=e755] [cursor=pointer]:
                  - /url: /main/search?c_id=9&c_name=%E5%AD%A3%E7%AF%80%E3%83%BB%E8%A1%8C%E4%BA%8B&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 季節・行事" [ref=e756]
                  - generic [ref=e757]: 季節・行事
                - link "カテゴリ。- 自然・風景 自然・風景" [ref=e760] [cursor=pointer]:
                  - /url: /main/search?c_id=10&c_name=%E8%87%AA%E7%84%B6%E3%83%BB%E9%A2%A8%E6%99%AF&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 自然・風景" [ref=e761]
                  - generic [ref=e762]: 自然・風景
                - link "カテゴリ。- スポーツ スポーツ" [ref=e765] [cursor=pointer]:
                  - /url: /main/search?c_id=11&c_name=%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84&referer=c_search&utm_source=categories
                  - img "カテゴリ。- スポーツ" [ref=e766]
                  - generic [ref=e767]: スポーツ
                - link "カテゴリ。- エコ・環境 エコ・環境" [ref=e770] [cursor=pointer]:
                  - /url: /main/search?c_id=12&c_name=%E3%82%A8%E3%82%B3%E3%83%BB%E7%92%B0%E5%A2%83&referer=c_search&utm_source=categories
                  - img "カテゴリ。- エコ・環境" [ref=e771]
                  - generic [ref=e772]: エコ・環境
                - link "カテゴリ。- 美容・健康 美容・健康" [ref=e775] [cursor=pointer]:
                  - /url: /main/search?c_id=13&c_name=%E7%BE%8E%E5%AE%B9%E3%83%BB%E5%81%A5%E5%BA%B7&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 美容・健康" [ref=e776]
                  - generic [ref=e777]: 美容・健康
                - link "カテゴリ。- 住宅・インテリア 住宅・インテリア" [ref=e780] [cursor=pointer]:
                  - /url: /main/search?c_id=14&c_name=%E4%BD%8F%E5%AE%85%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 住宅・インテリア" [ref=e781]
                  - generic [ref=e782]: 住宅・インテリア
                - link "カテゴリ。- 年賀状 年賀状" [ref=e785] [cursor=pointer]:
                  - /url: /main/search?c_id=15&c_name=%E5%B9%B4%E8%B3%80%E7%8A%B6&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 年賀状" [ref=e786]
                  - generic [ref=e787]: 年賀状
                - link "カテゴリ。- テクスチャ・背景 テクスチャ・背景" [ref=e790] [cursor=pointer]:
                  - /url: /main/search?c_id=16&c_name=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%83%BB%E8%83%8C%E6%99%AF&referer=c_search&utm_source=categories
                  - img "カテゴリ。- テクスチャ・背景" [ref=e791]
                  - generic [ref=e792]: テクスチャ・背景
                - link "カテゴリ。- 小物・雑貨 小物・雑貨" [ref=e795] [cursor=pointer]:
                  - /url: /main/search?c_id=18&c_name=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 小物・雑貨" [ref=e796]
                  - generic [ref=e797]: 小物・雑貨
                - link "カテゴリ。- クレイアート クレイアート" [ref=e800] [cursor=pointer]:
                  - /url: /main/search?c_id=19&c_name=%E3%82%AF%E3%83%AC%E3%82%A4%E3%82%A2%E3%83%BC%E3%83%88&referer=c_search&utm_source=categories
                  - img "カテゴリ。- クレイアート" [ref=e801]
                  - generic [ref=e802]: クレイアート
                - link "カテゴリ。- 外国 外国" [ref=e805] [cursor=pointer]:
                  - /url: /main/search?c_id=20&c_name=%E5%A4%96%E5%9B%BD&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 外国" [ref=e806]
                  - generic [ref=e807]: 外国
                - link "カテゴリ。- PSD素材 PSD素材" [ref=e810] [cursor=pointer]:
                  - /url: /main/search?referer=category_psd&sizesec=psd&utm_source=categories
                  - img "カテゴリ。- PSD素材" [ref=e811]
                  - generic [ref=e812]: PSD素材
              - button [ref=e813] [cursor=pointer]:
                - img [ref=e815]
          - generic [ref=e817]:
            - paragraph [ref=e819]: 写真ACだけのオリジナルおすすめ写真特集！
            - paragraph [ref=e820]:
              - text: プロのカメラマンが撮影した写真ACのおすすめ特集を一挙公開！
              - text: 無料で使える高品質な写真を豊富なテーマごとに厳選してご用意しています。
            - generic [ref=e821]:
              - generic [ref=e822]:
                - figure "マカロン・ドーナツ" [ref=e823]:
                  - link "マカロン・ドーナツ" [ref=e824] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=macarons_donutsac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                    - img "マカロン・ドーナツ" [ref=e825]
                - figure "様々なビジネスシーン 失敗・パワハラ" [ref=e826]:
                  - link "様々なビジネスシーン 失敗・パワハラ" [ref=e827] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=buddyjpac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&personalized=1&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                    - img "様々なビジネスシーン 失敗・パワハラ" [ref=e828]
                - figure "子供の食事" [ref=e829]:
                  - link "子供の食事" [ref=e830] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=childreneatingac&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=acworks&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&utm_source=pickup
                    - img "子供の食事" [ref=e831]
                - figure "日本人女性のライフスタイル" [ref=e832]:
                  - link "日本人女性のライフスタイル" [ref=e833] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=womanjplifestyle3ac&by_ai=&sizesec=all&orientation=all&color=&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=&ngcreator=&nq=&qid=&exclude_ai=on&srt=dlrank&pp=70&utm_source=pickup
                    - img "日本人女性のライフスタイル" [ref=e834]
              - link "おすすめ写真特集をもっと見る" [ref=e836] [cursor=pointer]:
                - /url: /pickup/1
                - text: おすすめ写真特集をもっと見る
                - generic [ref=e837]: 
          - generic [ref=e838]:
            - generic [ref=e839]:
              - paragraph [ref=e840]: グループサイトの無料サービスはご存知ですか？
              - text: イラストや動画、デザインツールなど、一つのアカウントで全て使えます。
            - generic [ref=e841]:
              - link "シルエット・ピクトグラム テンプレート・デザインツール" [ref=e844] [cursor=pointer]:
                - /url: https://test-an.editor-ac.com
                - img "シルエット・ピクトグラム" [ref=e845]
                - generic [ref=e846]: テンプレート・デザインツール
              - link "イラスト・ベクター画像 イラスト・ベクター画像" [ref=e849] [cursor=pointer]:
                - /url: https://www.ac-illust.com
                - img "イラスト・ベクター画像" [ref=e850]
                - generic [ref=e851]: イラスト・ベクター画像
              - link "シルエット・ピクトグラム シルエット・ピクトグラム" [ref=e854] [cursor=pointer]:
                - /url: https://www.silhouette-ac.com
                - img "シルエット・ピクトグラム" [ref=e855]
                - generic [ref=e856]: シルエット・ピクトグラム
              - generic [ref=e857]:
                - generic [ref=e858]:
                  - generic:
                    - img
                - link "シルエット・ピクトグラム 動画・エフェクト" [ref=e859] [cursor=pointer]:
                  - /url: https://video-ac.com/
                  - img "シルエット・ピクトグラム" [ref=e860]
                  - generic [ref=e861]: 動画・エフェクト
          - generic [ref=e862]:
            - paragraph [ref=e864]: もう画像選びで悩まないでください
            - generic:
              - generic:
                - generic:
                  - generic [ref=e865]:
                    - img "Notification" [ref=e866]
                    - generic [ref=e867]:
                      - paragraph [ref=e868]: 無料でダウンロード
                      - paragraph [ref=e869]: 1234万枚以上の写真素材から無料でダウンロード可能！毎日数千枚の写真素材が追加されます。
                  - generic [ref=e870]:
                    - img "Notification" [ref=e871]
                    - generic [ref=e872]:
                      - paragraph [ref=e873]: クレジット表記不要
                      - paragraph [ref=e874]: 無料だとクレジット表記が必要なサイトが多い中、写真ACは無料でもクレジット表記不要です。
                  - generic [ref=e875]:
                    - img "Notification" [ref=e876]
                    - generic [ref=e877]:
                      - paragraph [ref=e878]: 商用利用可能
                      - paragraph [ref=e879]: 加工も自由で商用利用も可能だから、チラシやポスター、パンフレットなど、さまざまなビジネスにご利用いただけます。
          - generic [ref=e880]:
            - paragraph [ref=e882]: こんな方におすすめです
            - generic [ref=e884]:
              - generic [ref=e885]:
                - generic [ref=e886]:
                  - img "top human 1" [ref=e887]
                  - generic [ref=e888]:
                    - paragraph [ref=e889]: WEB担当者
                    - paragraph [ref=e890]:
                      - text: ウェブサイトやブログの
                      - text: アイキャッチ画像がほしい
                - generic [ref=e891]:
                  - img "top human 2" [ref=e892]
                  - generic [ref=e893]:
                    - paragraph [ref=e894]: 会社員
                    - paragraph [ref=e895]:
                      - text: プレゼンテーションのスライドに
                      - text: 画像を使って分かりやすくしたい
                - generic [ref=e896]:
                  - img "top human 3" [ref=e897]
                  - generic [ref=e898]:
                    - paragraph [ref=e899]: インフルエンサー
                    - paragraph [ref=e900]:
                      - text: SNSへの投稿が
                      - text: テキストだけで物足りない
                - generic [ref=e901]:
                  - img "top human 4" [ref=e902]
                  - generic [ref=e903]:
                    - paragraph [ref=e904]: 作 家
                    - paragraph [ref=e905]:
                      - text: 電子書籍や印刷物の挿絵に
                      - text: 商用利用できる画像がほしい
                - generic [ref=e906]:
                  - img "top human 5" [ref=e907]
                  - generic [ref=e908]:
                    - paragraph [ref=e909]: プログラマー
                    - paragraph [ref=e910]:
                      - text: アプリケーションのUIデザインに
                      - text: 使う画像やアイコンがほしい
              - generic:
                - generic [ref=e911]:
                  - img "top human 6" [ref=e912]
                  - generic [ref=e913]:
                    - paragraph [ref=e914]: 教育関係者
                    - paragraph [ref=e915]:
                      - text: 学習教材や教育資料に入れる
                      - text: 挿絵やイメージがほしい
                - generic [ref=e916]:
                  - img "top human 7" [ref=e917]
                  - generic [ref=e918]:
                    - paragraph [ref=e919]: 記 者
                    - paragraph [ref=e920]:
                      - text: メディア記事やニュース記事に
                      - text: 使う画像がほしい
                - generic [ref=e921]:
                  - img "top human 8" [ref=e922]
                  - generic [ref=e923]:
                    - paragraph [ref=e924]: ショップ運営
                    - paragraph [ref=e925]:
                      - text: 広告キャンペーンに使える
                      - text: インパクトのある画像がほしい
                - generic [ref=e926]:
                  - img "top human 9" [ref=e927]
                  - generic [ref=e928]:
                    - paragraph [ref=e929]: ハンドメイド販売
                    - paragraph [ref=e930]:
                      - link "商品化ライセンス" [ref=e931] [cursor=pointer]:
                        - /url: /main/extra_license_introduction
                      - text: を購入して
                      - text: ハンドメイド作品の販売したい
          - generic [ref=e934] [cursor=pointer]:
            - generic [ref=e936]:
              - img "logo45 designAC" [ref=e937]
              - paragraph [ref=e938]: デザインをもっと簡単に
              - paragraph [ref=e940]:
                - text: デザインACならいつでもどこでも、手軽にデザインできます。
                - text: 豊富なテンプレートからオリジナルのデザインを作成。
                - text: PC、スマートフォンにも対応の無料デザインツールです。
              - link "今すぐデザインを作成" [ref=e941]:
                - /url: https://www.design-ac.net/templates/new
            - img "banner designAC" [ref=e943]
          - generic [ref=e944]:
            - generic [ref=e945]:
              - paragraph [ref=e946]: まだ時間をムダにしますか？
              - paragraph [ref=e947]: 効率よく画像を探して、インプットの時間を確保し、納期のプレッシャーから逃れましょう。
            - generic [ref=e948]:
              - button "プレミアム個人プラン picture premium personal picture check 検索無制限 picture check ダウンロード無制限 picture check 待たずにダウンロード picture check まとめてダウンロード picture check 商品化ライセンス利用可能 picture check あんしんサポート 個人プランを詳しくみる" [ref=e949] [cursor=pointer]:
                - paragraph [ref=e951]: プレミアム個人プラン
                - generic [ref=e952]:
                  - img "picture premium personal" [ref=e953]
                  - generic [ref=e954]:
                    - generic [ref=e955]:
                      - img "picture check" [ref=e957]
                      - paragraph [ref=e959]: 検索無制限
                    - generic [ref=e960]:
                      - img "picture check" [ref=e962]
                      - paragraph [ref=e964]: ダウンロード無制限
                    - generic [ref=e965]:
                      - img "picture check" [ref=e967]
                      - paragraph [ref=e969]: 待たずにダウンロード
                    - generic [ref=e970]:
                      - img "picture check" [ref=e972]
                      - paragraph [ref=e974]: まとめてダウンロード
                    - generic [ref=e975]:
                      - img "picture check" [ref=e977]
                      - paragraph [ref=e979]: 商品化ライセンス利用可能
                    - generic [ref=e980]:
                      - img "picture check" [ref=e982]
                      - paragraph [ref=e984]: あんしんサポート
                  - link "個人プランを詳しくみる" [ref=e986]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
              - button "チームでお得な法人プラン picture premium business ＼ 大企業から行政まで利用中 ／ 個人プランの全ての機能に加え、 picture check 法人名義でのご利用 picture check メンバー招待機能 picture check 広告非表示オプション無料 picture check コレクションの共有 法人プランを詳しくみる" [ref=e987] [cursor=pointer]:
                - paragraph [ref=e989]: チームでお得な法人プラン
                - generic [ref=e990]:
                  - img "picture premium business" [ref=e991]
                  - generic [ref=e992]:
                    - paragraph [ref=e993]: ＼ 大企業から行政まで利用中 ／
                    - generic [ref=e994]:
                      - paragraph [ref=e995]: 個人プランの全ての機能に加え、
                      - generic [ref=e996]:
                        - img "picture check" [ref=e998]
                        - paragraph [ref=e1000]: 法人名義でのご利用
                      - generic [ref=e1001]:
                        - img "picture check" [ref=e1003]
                        - paragraph [ref=e1005]: メンバー招待機能
                      - generic [ref=e1006]:
                        - img "picture check" [ref=e1008]
                        - paragraph [ref=e1010]: 広告非表示オプション無料
                      - generic [ref=e1011]:
                        - img "picture check" [ref=e1013]
                        - paragraph [ref=e1015]: コレクションの共有
                  - link "法人プランを詳しくみる" [ref=e1017]:
                    - /url: https://test-lien.photo-ac.com/premium/business
          - generic [ref=e1018]:
            - paragraph [ref=e1020]: 日本最大級のフリー素材サイト
            - generic [ref=e1021]:
              - generic [ref=e1022]:
                - generic [ref=e1024]:
                  - img "Total users" [ref=e1025]
                  - generic [ref=e1026]:
                    - paragraph [ref=e1027]: 登録ユーザー
                    - paragraph [ref=e1028]: 0人以上
                - generic [ref=e1030]:
                  - img "Downloads" [ref=e1031]
                  - generic [ref=e1032]:
                    - paragraph [ref=e1033]: 総ダウンロード
                    - paragraph [ref=e1034]: 207,000,000回以上
                - generic [ref=e1036]:
                  - img "Total creators" [ref=e1037]
                  - generic [ref=e1038]:
                    - paragraph [ref=e1039]: 登録クリエイター
                    - paragraph [ref=e1040]: 370,000人以上
                - generic [ref=e1042]:
                  - img "Donations" [ref=e1043]
                  - generic [ref=e1044]:
                    - paragraph [ref=e1045]: 寄付金総額
                    - paragraph [ref=e1046]: 71,100,000円以上
              - generic [ref=e1047]: ※グループサイト合計
          - generic [ref=e1048]:
            - paragraph [ref=e1050]: ACワークスからのお知らせ
            - iframe [ref=e1051]:
              - img [ref=f6e2]
          - link "acworks banner" [ref=e1053] [cursor=pointer]:
            - /url: https://acworks.co.jp/
            - img "acworks banner" [ref=e1054]
          - generic [ref=e1055]:
            - paragraph [ref=e1056]: あなたのダウンロードが社会に貢献します
            - paragraph [ref=e1057]: あなたが写真素材を1ダウンロードするたびに0.1円を
            - paragraph [ref=e1058]: ACワークス株式会社より、ユーザーの皆さまが希望する団体へ寄付いたします。
            - generic [ref=e1059]:
              - generic [ref=e1061]:
                - img [ref=e1062]
                - generic [ref=e1063]:
                  - paragraph [ref=e1064]:
                    - text: 2024年の寄付金総額
                    - generic [ref=e1065]: 800万円超
                  - paragraph [ref=e1066]:
                    - text: これまでの累計寄付金総額
                    - generic [ref=e1067]: 6100万円超
              - paragraph [ref=e1068]: "[2025年3月時点]"
            - link "これまでの寄付金総額をみる" [ref=e1070] [cursor=pointer]:
              - /url: https://acworks.co.jp/csr/
      - contentinfo [ref=e1072]:
        - generic [ref=e1075]:
          - generic [ref=e1076]: 昨日のダウンロード数：43,960
          - generic [ref=e1077]: 先月のダウンロード数：1,124,624
          - generic [ref=e1078]: 総会員数：1600万人を突破しました
        - generic [ref=e1080]:
          - generic [ref=e1081]:
            - generic [ref=e1082]:
              - generic [ref=e1083]: 写真ACについて 
              - list [ref=e1084]:
                - listitem [ref=e1085]:
                  - link "写真ACとは" [ref=e1086] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e1087]:
                  - link "運営会社" [ref=e1088] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e1089]:
                  - link "個人情報保護方針" [ref=e1090] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e1091]:
                  - link "特定個人情報基本方針" [ref=e1092] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e1093]:
                  - link "特定商取引法に基づく表記" [ref=e1094] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e1095]:
                  - link "サイトマップ" [ref=e1096] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e1097]:
                  - link "セキュリティポリシー" [ref=e1098] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e1099]:
              - generic [ref=e1100]: 会員登録 
              - list [ref=e1101]:
                - listitem [ref=e1102]:
                  - link "無料会員登録" [ref=e1103] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
                - listitem [ref=e1104]:
                  - link "プレミアム会員登録" [ref=e1105] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e1106]:
                  - link "無料クリエイター会員登録" [ref=e1107] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e1108]:
              - generic [ref=e1109]: プレミアム会員サービス 
              - list [ref=e1110]:
                - listitem [ref=e1111]:
                  - link "プレミアム会員登録" [ref=e1112] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e1113]:
                  - link "法人・複数名向けプラン" [ref=e1114] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e1115]:
                  - link "商品化ライセンス" [ref=e1116] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e1117]:
                  - link "あんしんサポート" [ref=e1118] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e1119]:
              - generic [ref=e1120]: ヘルプ＆ガイド 
              - list [ref=e1121]:
                - listitem [ref=e1122]:
                  - link "ヘルプ" [ref=e1123] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e1124]:
                  - link "利用規約" [ref=e1125] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e1126]:
                  - link "プレミアム会員利用規約" [ref=e1127] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e1128]:
                  - link "AC写真AIラボ利用規約" [ref=e1129] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e1130]:
              - generic [ref=e1131]: グループサイト 
              - list [ref=e1132]:
                - listitem [ref=e1133]:
                  - link "イラストAC" [ref=e1134] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e1135]:
                  - link "シルエットAC" [ref=e1136] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e1137]:
                  - link "フリービーAC" [ref=e1138] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e1139]:
                  - link "年賀状AC" [ref=e1140] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e1141]:
                  - link "動画AC" [ref=e1142] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e1143]:
                  - link "デザインAC" [ref=e1144] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e1145]:
                  - link "ACデータ" [ref=e1146] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e1147]:
                  - link "明細AC" [ref=e1148] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e1149]:
            - link "twitter_btn" [ref=e1150] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e1151]:
                - img [ref=e1152]
            - link "facebook_btn" [ref=e1154] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e1155]:
                - generic [ref=e1156]: 
            - link "pinterest_btn" [ref=e1157] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e1158]:
                - generic [ref=e1159]: 
            - link "blog_btn" [ref=e1160] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e1161]:
                - generic [ref=e1162]: 
            - link "feedback_modal_btn" [ref=e1163] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e1164]:
                - generic [ref=e1165]: 
                - text: ご意見・ご要望
          - generic [ref=e1167]:
            - text: © 2011-2026
            - link "写真AC" [ref=e1168] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
  - link:
    - /url: ""
  - link:
    - /url: ""
  - text:   
```

# Test source

```ts
  529 |             targetPage,
  530 |             { timeout: 10_000 }
  531 |           ).catch(() => { });
  532 |         }
  533 |       }
  534 | 
  535 |       await this.waitForResultDisplay();
  536 |     });
  537 |   }
  538 | 
  539 |   /**
  540 |    * Navigate to previous page using the ArrowLeft keyboard shortcut.
  541 |    */
  542 |   async goToPrevPageByKeyboard(): Promise<void> {
  543 |     await test.step('Navigate to previous page via ArrowLeft keyboard shortcut', async () => {
  544 |       const currentPage = await this.getActivePageNumber().catch(() => '2');
  545 |       const targetPage = String(Math.max(1, Number(currentPage) - 1));
  546 |       await this.page.keyboard.press('ArrowLeft');
  547 |       await this.page.waitForFunction(
  548 |         (target) => {
  549 |           const activeEl = document.querySelector('ul.ac-pagination li.active a');
  550 |           const url = window.location.href;
  551 |           return (activeEl && activeEl.textContent?.trim() === target) || (target === '1' && !url.includes('p=2'));
  552 |         },
  553 |         targetPage,
  554 |         { timeout: 15_000 }
  555 |       ).catch(() => { });
  556 |       await this.waitForResultDisplay();
  557 |     });
  558 |   }
  559 | 
  560 |   /**
  561 |    * Click a specific page number link in pagination.
  562 |    */
  563 |   async goToPageNumber(pageNumber: number): Promise<void> {
  564 |     await test.step(`Navigate to page ${pageNumber} in pagination`, async () => {
  565 |       const pageLink = this.paginationContainer.locator(`a:text-is("${pageNumber}")`);
  566 |       await pageLink.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' })).catch(() => { });
  567 |       await this.clickElement(pageLink);
  568 |       await this.waitForResultDisplay();
  569 |     });
  570 |   }
  571 | 
  572 |   /**
  573 |    * Get the active page number string from pagination.
  574 |    */
  575 |   async getActivePageNumber(): Promise<string> {
  576 |     return this.getText(this.paginationActivePage);
  577 |   }
  578 | 
  579 |   // ─── Category Search Actions ──────────────────────────────────────────────
  580 | 
  581 |   /**
  582 |    * Select a category directly from the Filter Toolbar dropdown menu (UI interaction).
  583 |    * @param categoryName - Display name (e.g. '人物', 'ビジネス', '動物・生き物', '自然・風景')
  584 |    */
  585 |   async selectCategoryFromToolbar(categoryName: string): Promise<void> {
  586 |     await test.step(`Select category "${categoryName}" from Toolbar`, async () => {
  587 |       await this.clickElement(this.categoryFilterButton);
  588 |       const ddclSelector = this.page.locator('#filter-dropdown-categories #ddcl-c_names1, #ddcl-c_names1').first();
  589 |       await this.clickElement(ddclSelector);
  590 |       const categoryOption = this.page.locator(`#filter-dropdown-categories label:has-text("${categoryName}")`).first();
  591 |       await this.clickElement(categoryOption, { force: true });
  592 |       const submitBtn = this.page.locator('#search_frm_menu button.position-absolute, #filter-dropdown-categories button[type="submit"]').first();
  593 |       await this.clickElement(submitBtn, { force: true });
  594 |       await this.waitForResultDisplay();
  595 |     });
  596 |   }
  597 | 
  598 |   /**
  599 |    * Navigate directly to a specific category search URL (legacy shortcut).
  600 |    * @param categoryId - Category numeric ID (e.g. 1 for 人物, 3 for 動物・生き物)
  601 |    * @param categoryName - Category display name
  602 |    */
  603 |   async searchByCategory(categoryId: number, categoryName: string): Promise<void> {
  604 |     await test.step(`Search by category ID ${categoryId}: "${categoryName}"`, async () => {
  605 |       await this.navigate(`/main/search?c_id=${categoryId}&c_name=${encodeURIComponent(categoryName)}`);
  606 |       await this.waitForResultDisplay();
  607 |     });
  608 |   }
  609 | 
  610 |   // ─── Filter Toolbar Actions ───────────────────────────────────────────────
  611 | 
  612 |   /**
  613 |    * Safely opens a toolbar dropdown menu and ensures the target option is visible.
  614 |    * Handles hydration delays, layout shifts, and CSS animations across all browsers.
  615 |    * @param dropdownButton - The dropdown toggle button
  616 |    * @param expectedOption - The option locator inside the dropdown menu that should become visible
  617 |    * @param timeout - Maximum timeout in ms (default 10_000)
  618 |    */
  619 |   async openToolbarDropdown(dropdownButton: Locator, expectedOption: Locator, timeout: number = 10_000): Promise<void> {
  620 |     await expect(async () => {
  621 |       const isVisible = await expectedOption.isVisible().catch(() => false);
  622 |       if (!isVisible) {
  623 |         await dropdownButton.scrollIntoViewIfNeeded().catch(() => { });
  624 |         await dropdownButton.click().catch(async () => {
  625 |           await dropdownButton.click({ force: true });
  626 |         });
  627 |       }
  628 |       await expect(expectedOption).toBeVisible({ timeout: 2_000 });
> 629 |     }).toPass({ timeout, intervals: [400, 800, 1_200] });
      |        ^ Error: Timeout 10000ms exceeded while waiting on the predicate
  630 |   }
  631 | 
  632 |   /**
  633 |    * Clear all active filters on the search results page if any filter is currently applied.
  634 |    * Clicks "すべてクリア" link when visible and waits for search results to refresh.
  635 |    */
  636 |   async clearAllFilters(): Promise<void> {
  637 |     await test.step('Clear all active filters "すべてクリア"', async () => {
  638 |       const isClearVisible = await this.clearAllFiltersButton.first().isVisible({ timeout: 1_500 }).catch(() => false);
  639 |       if (isClearVisible) {
  640 |         await this.clickElement(this.clearAllFiltersButton.first());
  641 |         await this.waitForResultDisplay();
  642 |       }
  643 |     });
  644 |   }
  645 | 
  646 |   /**
  647 |    * Check whether any active filters are currently applied on the search results page.
  648 |    */
  649 |   async hasActiveFilters(): Promise<boolean> {
  650 |     return this.clearAllFiltersButton.first().isVisible().catch(() => false);
  651 |   }
  652 | 
  653 |   /**
  654 |    * Get a specific active filter badge by its label text.
  655 |    * @param label - Label text displayed in the badge (e.g. '縦長', '横長', '人物', '無人', '1人', '2人', '3人以上', '若者', '取得済のみ', '完全一致')
  656 |    */
  657 |   getActiveFilterBadge(label: string): Locator {
  658 |     return this.activeFilterBadges.filter({ hasText: label }).first();
  659 |   }
  660 | 
  661 |   /**
  662 |    * Get an active color filter badge by its hex color value.
  663 |    * @param hexColor - Hex color string without '#' (e.g. '0000d6' for blue)
  664 |    */
  665 |   getActiveColorBadge(hexColor: string): Locator {
  666 |     return this.activeFilterBadges.locator(`span[style*="${hexColor}"]`).first();
  667 |   }
  668 | 
  669 |   /**
  670 |    * Filter by photo orientation (縦長, 横長, 全て) via the toolbar.
  671 |    * @param orientation - 'vertical' (0), 'horizontal' (1), or 'all'
  672 |    */
  673 |   async selectOrientation(orientation: 'vertical' | 'horizontal' | 'all'): Promise<void> {
  674 |     await test.step(`Filter by orientation: "${orientation}"`, async () => {
  675 |       const targetLabel = orientation === 'vertical'
  676 |         ? this.orientationVerticalLabel
  677 |         : (orientation === 'horizontal' ? this.orientationHorizontalLabel : this.orientationAllLabel);
  678 |       const radioId = orientation === 'vertical'
  679 |         ? 'orientation-0'
  680 |         : (orientation === 'horizontal' ? 'orientation-1' : 'orientation-all');
  681 |       const targetRadio = this.page.locator(`#filter-dropdown-sizesec #${radioId}, #${radioId}`).first();
  682 | 
  683 |       await this.openToolbarDropdown(this.fileOrientationButton, targetLabel);
  684 |       await this.clickElement(targetLabel, { force: true });
  685 | 
  686 |       // Cross-browser: Ensure underlying radio is checked and change event dispatches in Gecko/WebKit
  687 |       const isChecked = await targetRadio.isChecked().catch(() => false);
  688 |       if (!isChecked) {
  689 |         await targetRadio.check({ force: true }).catch(() => { });
  690 |       }
  691 |       await this.waitForResultDisplay();
  692 |     });
  693 |   }
  694 | 
  695 |   /**
  696 |    * Filter by PSD format via the "ファイル・向き" toolbar dropdown.
  697 |    */
  698 |   async selectPsdFormat(): Promise<void> {
  699 |     await test.step('Filter by PSD format via toolbar', async () => {
  700 |       const targetRadio = this.page.locator('#filter-dropdown-sizesec #sizesec-psd, #sizesec-psd').first();
  701 |       await this.openToolbarDropdown(this.fileOrientationButton, this.sizesecPsdLabel);
  702 |       await this.clickElement(this.sizesecPsdLabel, { force: true });
  703 | 
  704 |       const isChecked = await targetRadio.isChecked().catch(() => false);
  705 |       if (!isChecked) {
  706 |         await targetRadio.check({ force: true }).catch(() => { });
  707 |       }
  708 |       await this.waitForResultDisplay();
  709 |     });
  710 |   }
  711 | 
  712 |   /**
  713 |    * Filter by image size (Mサイズ以上 or Lサイズ) via "ファイル・向き" toolbar dropdown.
  714 |    * @param size - 'm' (Mサイズ以上) or 'l' (Lサイズ)
  715 |    */
  716 |   async selectSize(size: 'm' | 'l'): Promise<void> {
  717 |     await test.step(`Filter by image size "${size}" via toolbar`, async () => {
  718 |       const targetLabel = size === 'm' ? this.sizesecMLabel : this.sizesecLLabel;
  719 |       const targetRadio = this.page.locator(`#filter-dropdown-sizesec #sizesec-${size}, #sizesec-${size}`).first();
  720 |       await this.openToolbarDropdown(this.fileOrientationButton, targetLabel);
  721 |       await this.clickElement(targetLabel, { force: true });
  722 | 
  723 |       const isChecked = await targetRadio.isChecked().catch(() => false);
  724 |       if (!isChecked) {
  725 |         await targetRadio.check({ force: true }).catch(() => { });
  726 |       }
  727 |       await this.waitForResultDisplay();
  728 |     });
  729 |   }
```