# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/premium/search.spec.ts >> Search — Premium User >> TC-SEARCH-PREM-024: Tải ảnh lên tìm kiếm tương đồng @premium
- Location: photo-ac/src/tests/downloader/premium/search.spec.ts:666:7

# Error details

```
Error: ENOENT: no such file or directory, stat '/home/runner/work/PhotoAC-test/PhotoAC-test/photo-ac/src/test-data/sample-search.jpg'
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/"
  - paragraph [ref=e3]:
    - text: 当Webサイトはよりよいユーザー体験を実現するためにCookieを使用しています。これ以降ページを遷移した場合、Cookieの設定および使用に同意したことになります。詳細についてはプライバシーポリシーをご覧ください。
    - link "詳細" [ref=e4] [cursor=pointer]:
      - /url: /main/privacy
    - link "同意" [ref=e5] [cursor=pointer]:
      - /url: ""
  - banner [ref=e6]:
    - generic [ref=e12]:
      - paragraph [ref=e13]: おかげさまで総会員数
      - paragraph [ref=e14]:
        - generic [ref=e15]: 1,600 万人
        - text: 突破！
    - generic [ref=e17]:
      - generic [ref=e21]:
        - link "写真AC 写真ACは写真素材が無料！ 商用利用もOK！" [ref=e22] [cursor=pointer]:
          - /url: /
          - img "写真AC" [ref=e23]
          - generic [ref=e24]:
            - paragraph [ref=e25]: 写真ACは写真素材が無料！
            - paragraph [ref=e26]: 商用利用もOK！
        - text:     
      - generic [ref=e27]:
        - link " 写真投稿する" [ref=e28] [cursor=pointer]:
          - /url: /creator/auth/register
          - generic [ref=e29]: 
          - text: 写真投稿する
        - generic [ref=e31]:
          - button "クリックしてACアプリケーションのリストを表示" [ref=e34] [cursor=pointer]:
            - img [ref=e35]
          - text:    
        - generic [ref=e37]:
          - link "ホーム" [ref=e39] [cursor=pointer]:
            - /url: /
            - img [ref=e40]
            - generic [ref=e42]: ホーム
          - link "コレクション" [ref=e44] [cursor=pointer]:
            - /url: /user/bookmarks/
            - generic [ref=e45]: 
            - generic [ref=e46]: コレクション
          - generic [ref=e47]:
            - button "お気に入り" [ref=e48] [cursor=pointer]:
              - generic [ref=e49]: 
              - paragraph [ref=e50]:
                - text: お気に入り
                - generic [ref=e51]: 
            - text:  
          - generic [ref=e54]:
            - button "Avatar プレミアムサービス 法人プレミアム (オーナー) a***************************mさん " [ref=e55] [cursor=pointer]:
              - img "Avatar" [ref=e57]
              - generic [ref=e58]:
                - generic [ref=e59]:
                  - img "プレミアムサービス" [ref=e60]
                  - generic [ref=e61]: 法人プレミアム (オーナー)
                - generic [ref=e62]: a***************************mさん
              - text: 
            - text:   
          - generic [ref=e66] [cursor=pointer]:
            - img [ref=e67]
            - generic [ref=e71]: ヘルプ
    - text: 
  - text:                  
  - generic:      
  - dialog [ref=e72]:
    - document:
      - generic [ref=e73]:
        - generic [ref=e74]:
          - heading "画像で検索する" [level=5] [ref=e75]
          - button "Close" [ref=e76] [cursor=pointer]:
            - generic [ref=e77]: ×
        - list [ref=e79]:
          - listitem [ref=e80]: ここに JPGまたはPNGデータをドラッグ&ドロップ
          - listitem [ref=e81]:
            - img [ref=e82]
          - listitem [ref=e89]: または
          - listitem [ref=e90]:
            - generic [ref=e91] [cursor=pointer]: ファイルを選択
          - listitem [ref=e92]: 5MBまでのJPG形式またはPNG形式のファイルのみアップロードできます。
  - generic [ref=e93]:
    - generic [ref=e95]:
      - button "画像で検索する" [ref=e96] [cursor=pointer]:
        - img [ref=e97]
      - generic [ref=e99]: 画像で検索する
    - separator [ref=e100]
    - generic [ref=e101]:
      - paragraph [ref=e102]: 画像から似ている画像を検索できます。
      - paragraph [ref=e103]: ※5MBまでのJPGまたはPNGファイルのみ
      - generic [ref=e104]:
        - listitem [ref=e105]:
          - img [ref=e106]
        - listitem [ref=e113]:
          - generic [ref=e114]: ファイルを選択
  - generic [ref=e115]:
    - button [ref=e117] [cursor=pointer]:
      - img [ref=e118]
    - generic [ref=e121]:
      - generic [ref=e122]:
        - button [ref=e123] [cursor=pointer]:
          - img [ref=e124]
        - textbox "キーワード（例：女性）" [ref=e127]
      - generic [ref=e128]:
        - button "文章で検索 文章で検索 文章で検索" [ref=e130] [cursor=pointer]:
          - img "文章で検索" [ref=e131]
          - text: 文章で検索
          - img "文章で検索" [ref=e133]
        - button "画像で検索" [ref=e135] [cursor=pointer]:
          - generic [ref=e136]: 
          - text: 画像で検索
    - separator [ref=e137]
    - generic [ref=e138]:
      - generic [ref=e139]: 並び順
      - generic [ref=e140]:
        - generic [ref=e141]:
          - radio "関連性の高い順" [checked] [ref=e142] [cursor=pointer]
          - generic [ref=e143] [cursor=pointer]: 関連性の高い順
        - generic [ref=e144]:
          - radio "新着順" [ref=e145] [cursor=pointer]
          - generic [ref=e146] [cursor=pointer]: 新着順
        - generic [ref=e147]:
          - radio "人気順" [ref=e148] [cursor=pointer]
          - generic [ref=e149] [cursor=pointer]: 人気順
    - generic [ref=e151]:
      - generic [ref=e152]: カテゴリー
      - listbox [ref=e153]:
        - option "人物" [ref=e154]
        - option "ビジネス" [ref=e155]
        - option "動物・生き物" [ref=e156]
        - option "花・植物" [ref=e157]
        - option "食べ物・飲み物" [ref=e158]
        - option "町並み・建物" [ref=e159]
        - option "医療・福祉" [ref=e160]
        - option "交通・乗り物" [ref=e161]
        - option "季節・行事" [ref=e162]
        - option "自然・風景" [ref=e163]
        - option "スポーツ" [ref=e164]
        - option "エコ・環境" [ref=e165]
        - option "美容・健康" [ref=e166]
        - option "住宅・インテリア" [ref=e167]
        - option "年賀状" [ref=e168]
        - option "テクスチャ・背景" [ref=e169]
        - option "小物・雑貨" [ref=e170]
        - option "クレイアート" [ref=e171]
        - option "外国" [ref=e172]
        - option "ロマンティック" [ref=e173]
        - option "スプラッター" [ref=e174]
    - generic [ref=e176]:
      - generic [ref=e177]: 除外カテゴリー
      - listbox [ref=e178]:
        - option "人物" [ref=e179]
        - option "ビジネス" [ref=e180]
        - option "動物・生き物" [ref=e181]
        - option "花・植物" [ref=e182]
        - option "食べ物・飲み物" [ref=e183]
        - option "町並み・建物" [ref=e184]
        - option "医療・福祉" [ref=e185]
        - option "交通・乗り物" [ref=e186]
        - option "季節・行事" [ref=e187]
        - option "自然・風景" [ref=e188]
        - option "スポーツ" [ref=e189]
        - option "エコ・環境" [ref=e190]
        - option "美容・健康" [ref=e191]
        - option "住宅・インテリア" [ref=e192]
        - option "年賀状" [ref=e193]
        - option "テクスチャ・背景" [ref=e194]
        - option "小物・雑貨" [ref=e195]
        - option "クレイアート" [ref=e196]
        - option "外国" [ref=e197]
        - option "ロマンティック" [ref=e198]
        - option "スプラッター" [ref=e199]
    - generic [ref=e200]:
      - generic [ref=e201]: 除外キーワード
      - textbox "除外キーワードを入力" [ref=e202]
    - generic [ref=e204]:
      - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e205] [cursor=pointer]
      - generic [ref=e206] [cursor=pointer]: AI生成ツール使用素材を除く
    - separator [ref=e207]
    - generic [ref=e208]:
      - generic [ref=e209]: 縦長・横長の選択
      - generic [ref=e210]:
        - generic [ref=e211]:
          - radio "全て" [checked] [ref=e212] [cursor=pointer]
          - generic [ref=e213] [cursor=pointer]: 全て
        - generic [ref=e214]:
          - radio "縦長" [ref=e215] [cursor=pointer]
          - generic [ref=e216] [cursor=pointer]: 縦長
        - generic [ref=e217]:
          - radio "横長" [ref=e218] [cursor=pointer]
          - generic [ref=e219] [cursor=pointer]: 横長
    - generic [ref=e220]:
      - generic [ref=e221]: 画像種別
      - combobox [ref=e222]:
        - option "全ての画像" [selected]
        - option "Mediumサイズ以上がある"
        - option "Largeサイズがある"
        - option "PSDがある"
    - generic [ref=e223]:
      - generic [ref=e224]: クリエイター名
      - textbox "クリエイター名を入力" [ref=e225]
    - generic [ref=e226]:
      - generic [ref=e227]: 除外クリエイター名
      - textbox "除外クリエイター名を入力" [ref=e228]
    - generic [ref=e229]:
      - generic [ref=e230]: 素材ID
      - textbox "素材のIDを入力" [ref=e231]
    - generic [ref=e232]:
      - generic [ref=e233]: 色
      - generic [ref=e234]:
        - generic [ref=e235]:
          - radio "全て" [checked] [ref=e236] [cursor=pointer]
          - generic [ref=e237] [cursor=pointer]: 全て
        - generic [ref=e238]:
          - generic [ref=e239]:
            - button [ref=e241] [cursor=pointer]
            - button [ref=e243] [cursor=pointer]
            - button [ref=e245] [cursor=pointer]
            - button [ref=e247] [cursor=pointer]
            - button [ref=e249] [cursor=pointer]
          - generic [ref=e250]:
            - button [ref=e252] [cursor=pointer]
            - button [ref=e254] [cursor=pointer]
            - button [ref=e256] [cursor=pointer]
            - button [ref=e258] [cursor=pointer]
            - button [ref=e260] [cursor=pointer]
          - generic [ref=e261]:
            - button [ref=e263] [cursor=pointer]
            - button [ref=e265] [cursor=pointer]
            - button [ref=e267] [cursor=pointer]
            - button [ref=e269] [cursor=pointer]
    - generic [ref=e274]:
      - generic [ref=e275]: モデル人数
      - generic [ref=e276]:
        - generic [ref=e277]:
          - radio "全て" [checked] [ref=e278] [cursor=pointer]
          - generic [ref=e279] [cursor=pointer]: 全て
        - generic [ref=e280]:
          - radio "無人" [ref=e281] [cursor=pointer]
          - generic [ref=e282] [cursor=pointer]: 無人
        - generic [ref=e283]:
          - radio "1人" [ref=e284] [cursor=pointer]
          - generic [ref=e285] [cursor=pointer]: 1人
        - generic [ref=e286]:
          - radio "2人" [ref=e287] [cursor=pointer]
          - generic [ref=e288] [cursor=pointer]: 2人
        - generic [ref=e289]:
          - radio "3人以上" [ref=e290] [cursor=pointer]
          - generic [ref=e291] [cursor=pointer]: 3人以上
    - generic [ref=e292]:
      - generic [ref=e293]: モデル年代
      - combobox [ref=e294]:
        - option "全ての年代" [selected]
        - option "赤ちゃん"
        - option "子供"
        - option "若者"
        - option "大人"
        - option "中高年"
        - option "高齢者"
    - generic [ref=e295]:
      - generic [ref=e296]: モデルリリース
      - generic [ref=e297]:
        - generic [ref=e298]:
          - radio "全て" [checked] [ref=e299] [cursor=pointer]
          - generic [ref=e300] [cursor=pointer]: 全て
        - generic [ref=e301]:
          - radio "取得済のみ" [ref=e302] [cursor=pointer]
          - generic [ref=e303] [cursor=pointer]: 取得済のみ
    - generic [ref=e304]:
      - generic [ref=e305]: プロパティリリース
      - generic [ref=e306]:
        - generic [ref=e307]:
          - radio "全て" [checked] [ref=e308] [cursor=pointer]
          - generic [ref=e309] [cursor=pointer]: 全て
        - generic [ref=e310]:
          - radio "取得済のみ" [ref=e311] [cursor=pointer]
          - generic [ref=e312] [cursor=pointer]: 取得済のみ
    - generic [ref=e313]:
      - generic [ref=e315] [cursor=pointer]: 完全一致
      - checkbox "完全一致" [ref=e317] [cursor=pointer]
    - button "検 索" [ref=e319] [cursor=pointer]
  - text:      
  - generic [ref=e320]:
    - generic [ref=e322]:
      - text:  
      - generic [ref=e323]:
        - link "ダウンロード 履歴" [ref=e325] [cursor=pointer]:
          - /url: /user/downloads
          - img [ref=e327]
          - generic [ref=e330]:
            - text: ダウンロード
            - text: 履歴
        - link "ライセンス まとめて購入" [ref=e332] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e334]
          - generic [ref=e338]:
            - text: ライセンス
            - text: まとめて購入
        - link "まとめて ダウンロード" [ref=e341] [cursor=pointer]:
          - /url: javascript:void(0);
          - img [ref=e343]
          - generic [ref=e347]:
            - text: まとめて
            - text: ダウンロード
    - generic [ref=e348]:
      - generic [ref=e349]:
        - list [ref=e351]:
          - listitem [ref=e353]:
            - img "写真AC" [ref=e354]
        - generic [ref=e355]:
          - link "designAC" [ref=e357] [cursor=pointer]:
            - /url: https://test-an.editor-ac.com/templates/search?keyword=忘年会&utm_source=photoac&utm_medium=internal&utm_campaign=seasonpopup&utm_content=topicon&utm_id=2610
            - img "designAC" [ref=e358]
          - generic [ref=e359]:
            - generic [ref=e360]:
              - generic [ref=e361]: AI検索(β版)
              - generic [ref=e363]:
                - button "search_btn" [ref=e364] [cursor=pointer]:
                  - generic [ref=e365]: 
                - button "AI Search is off" [ref=e366] [cursor=pointer]:
                  - img "AI Search is off" [ref=e367]
                - searchbox "キーワード（例：女性）" [ref=e368]
                - generic [ref=e370] [cursor=pointer]:
                  - text: 詳細検索
                  - generic: ▼
                - link "画像検索" [ref=e372] [cursor=pointer]:
                  - /url: "#"
                  - generic [ref=e373]:
                    - generic [ref=e374]: 
                    - generic [ref=e375]: 画像検索
            - generic [ref=e376]:
              - link "ビジネス" [ref=e377] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
                - img [ref=e378]
                - text: ビジネス
              - link "女性" [ref=e380] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
                - img [ref=e381]
                - text: 女性
              - link "紅葉" [ref=e383] [cursor=pointer]:
                - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
                - img [ref=e384]
                - text: 紅葉
              - link "cat" [ref=e386] [cursor=pointer]:
                - /url: /main/search?q=cat&utm_source=top_keyword
                - img [ref=e387]
                - text: cat
              - link "背景" [ref=e389] [cursor=pointer]:
                - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - img [ref=e390]
                - text: 背景
      - generic [ref=e393]:
        - link "写真AC 人気日本人モデル" [ref=e395] [cursor=pointer]:
          - /url: https://www.photo-ac.com/models/
          - img "写真AC" [ref=e396]
          - generic [ref=e397]: 人気日本人モデル
        - link "写真AC 紅葉" [ref=e399] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E7%B4%85%E8%91%89&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e400]
          - generic [ref=e401]: 紅葉
        - link "写真AC 運動会" [ref=e403] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E9%81%8B%E5%8B%95%E4%BC%9A&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e404]
          - generic [ref=e405]: 運動会
        - link "写真AC ハロウィン" [ref=e407] [cursor=pointer]:
          - /url: https://www.photo-ac.com/main/search?by_ai=&q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
          - img "写真AC" [ref=e408]
          - generic [ref=e409]: ハロウィン
      - generic [ref=e413]:
        - generic [ref=e414]:
          - link "プレゼンテーションAI" [ref=e416] [cursor=pointer]:
            - /url: https://test-an.editor-ac.com/wp/posts/1593/%e3%83%97%e3%83%ac%e3%82%bc%e3%83%b3%e8%b3%87%e6%96%99ai
            - img "プレゼンテーションAI" [ref=e417]
          - generic [ref=e418]:
            - heading "写真素材メニュー" [level=4] [ref=e419]
            - button "写真カテゴリー" [ref=e421] [cursor=pointer]:
              - text: 写真カテゴリー
              - generic [ref=e422]: 
            - link "人気写真ランキング" [ref=e424] [cursor=pointer]:
              - /url: /ranking
            - link "モデルから写真を検索" [ref=e426] [cursor=pointer]:
              - /url: /models/
            - link "おすすめ特集一覧" [ref=e428] [cursor=pointer]:
              - /url: /pickup/1
            - link "新着写真一覧" [ref=e430] [cursor=pointer]:
              - /url: /main/latest
            - link "公開中のコレクション" [ref=e432] [cursor=pointer]:
              - /url: /main/collections
          - generic [ref=e433]:
            - heading "画像生成AI" [level=4] [ref=e434]
            - link "AC写真AIラボ NEW" [ref=e436] [cursor=pointer]:
              - /url: /image-generator/
              - text: AC写真AIラボ
              - generic [ref=e437]: NEW
            - link "AI人物素材" [ref=e439] [cursor=pointer]:
              - /url: /main/genface
          - generic [ref=e440]:
            - heading "クリエイターメニュー" [level=4] [ref=e441]
            - link "クリエイター投稿（新規登録）" [ref=e443] [cursor=pointer]:
              - /url: /creator/auth/register
            - link "クリエイターログイン" [ref=e445] [cursor=pointer]:
              - /url: "#"
            - link "ポイント換金ランキング" [ref=e447] [cursor=pointer]:
              - /url: /ranking/prize
            - link "クリエイター一覧" [ref=e449] [cursor=pointer]:
              - /url: /creators/
          - generic [ref=e450]:
            - heading "プレミアム会員サービス" [level=4] [ref=e451]
            - link "商品化ライセンス" [ref=e453] [cursor=pointer]:
              - /url: /main/extra_license_terms
            - link "あんしんサポート" [ref=e455] [cursor=pointer]:
              - /url: /indemnity/
          - generic [ref=e456]:
            - heading "ヘルプ＆ガイド" [level=4] [ref=e457]
            - link "写真ACとは" [ref=e459] [cursor=pointer]:
              - /url: /main/guide/#group-site
            - link "写真の権利" [ref=e461] [cursor=pointer]:
              - /url: /main/rights
            - link "ヘルプ" [ref=e463] [cursor=pointer]:
              - /url: https://help.freebie-ac.jp
            - link "利用規約" [ref=e465] [cursor=pointer]:
              - /url: /main/terms
          - link "Interview" [ref=e469] [cursor=pointer]:
            - /url: /interview
            - img "Interview" [ref=e470]
          - generic [ref=e471]:
            - heading "おすすめ無料サービス" [level=4] [ref=e472]
            - link "デザインテンプレート" [ref=e474] [cursor=pointer]:
              - /url: https://www.design-ac.net/
              - text: デザインテンプレート
              - generic [ref=e475]: 
            - link "ファイル転送・共有" [ref=e477] [cursor=pointer]:
              - /url: https://ac-data.info/
              - text: ファイル転送・共有
              - generic [ref=e478]: 
            - link "今日の運勢" [ref=e480] [cursor=pointer]:
              - /url: https://uranai-ac.com/
              - text: 今日の運勢
              - generic [ref=e481]: 
            - link "プレゼン資料作成AI" [ref=e483] [cursor=pointer]:
              - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
              - text: プレゼン資料作成AI
              - generic [ref=e484]: 
          - iframe [ref=e485]:
            
          - generic [ref=e486]:
            - heading "人気キーワード（タグ）" [level=4] [ref=e487]:
              - button "人気キーワード（タグ）" [ref=e488] [cursor=pointer]:
                - text: 人気キーワード（タグ）
                - generic [ref=e489]: 
            - generic [ref=e490]:
              - generic [ref=e491]:
                - link "ビジネス" [ref=e492] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
                - link "女性" [ref=e493] [cursor=pointer]:
                  - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
                - link "紅葉" [ref=e494] [cursor=pointer]:
                  - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
                - link "cat" [ref=e495] [cursor=pointer]:
                  - /url: /main/search?q=cat&utm_source=top_keyword
                - link "背景" [ref=e496] [cursor=pointer]:
                  - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "学生" [ref=e497] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%A6%E7%94%9F&utm_source=top_keyword
                - link "flower" [ref=e498] [cursor=pointer]:
                  - /url: /main/search?q=flower&utm_source=top_keyword
                - link "和紙" [ref=e499] [cursor=pointer]:
                  - /url: /main/search?q=%E5%92%8C%E7%B4%99&utm_source=top_keyword
                - link "空" [ref=e500] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A9%BA&utm_source=top_keyword
                - link "cats" [ref=e501] [cursor=pointer]:
                  - /url: /main/search?q=cats&utm_source=top_keyword
                - link "秋" [ref=e502] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&utm_source=top_keyword
                - link "クリスマス" [ref=e503] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9&utm_source=top_keyword
                - link "ハロウィン" [ref=e504] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&utm_source=top_keyword
                - link "モノクロ" [ref=e505] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%A2%E3%83%8E%E3%82%AF%E3%83%AD&utm_source=top_keyword
                - link "11月" [ref=e506] [cursor=pointer]:
                  - /url: /main/search?q=11%E6%9C%88&utm_source=top_keyword
                - link "青空" [ref=e507] [cursor=pointer]:
                  - /url: /main/search?q=%E9%9D%92%E7%A9%BA&utm_source=top_keyword
                - link "お正月" [ref=e508] [cursor=pointer]:
                  - /url: /main/search?q=%E3%81%8A%E6%AD%A3%E6%9C%88&utm_source=top_keyword
                - link "家族" [ref=e509] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AE%B6%E6%97%8F&utm_source=top_keyword
                - link "パソコン" [ref=e510] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&utm_source=top_keyword
                - link "オフィス" [ref=e511] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&utm_source=top_keyword
                - link "クリスマス 背景" [ref=e512] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "猫" [ref=e513] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8C%AB&utm_source=top_keyword
                - link "リビング" [ref=e514] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%AA%E3%83%93%E3%83%B3%E3%82%B0&utm_source=top_keyword
                - link "赤ちゃん" [ref=e515] [cursor=pointer]:
                  - /url: /main/search?q=%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&utm_source=top_keyword
                - link "子供" [ref=e516] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%90%E4%BE%9B&utm_source=top_keyword
                - link "虹色 背景" [ref=e517] [cursor=pointer]:
                  - /url: /main/search?q=%E8%99%B9%E8%89%B2+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "犬" [ref=e518] [cursor=pointer]:
                  - /url: /main/search?q=%E7%8A%AC&utm_source=top_keyword
                - link "sky" [ref=e519] [cursor=pointer]:
                  - /url: /main/search?q=sky&utm_source=top_keyword
                - link "子ども" [ref=e520] [cursor=pointer]:
                  - /url: /main/search?q=%E5%AD%90%E3%81%A9%E3%82%82&utm_source=top_keyword
                - link "建物" [ref=e521] [cursor=pointer]:
                  - /url: /main/search?q=%E5%BB%BA%E7%89%A9&utm_source=top_keyword
                - link "花" [ref=e522] [cursor=pointer]:
                  - /url: /main/search?q=%E8%8A%B1&utm_source=top_keyword
                - link "カフェ テーブル" [ref=e523] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7%E3%80%80%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB&utm_source=top_keyword
                - link "観葉植物 インテリア" [ref=e524] [cursor=pointer]:
                  - /url: /main/search?q=%E8%A6%B3%E8%91%89%E6%A4%8D%E7%89%A9+%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&utm_source=top_keyword
                - link "無料" [ref=e525] [cursor=pointer]:
                  - /url: /main/search?q=%E7%84%A1%E6%96%99&utm_source=top_keyword
                - link "クリスマス 背景" [ref=e526] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - link "木目" [ref=e527] [cursor=pointer]:
                  - /url: /main/search?q=%E6%9C%A8%E7%9B%AE&utm_source=top_keyword
                - link "スマホ" [ref=e528] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%B9%E3%83%9E%E3%83%9B&utm_source=top_keyword
                - link "桜" [ref=e529] [cursor=pointer]:
                  - /url: /main/search?q=%E6%A1%9C&utm_source=top_keyword
                - link "風景" [ref=e530] [cursor=pointer]:
                  - /url: /main/search?q=%E9%A2%A8%E6%99%AF&utm_source=top_keyword
                - link "office" [ref=e531] [cursor=pointer]:
                  - /url: /main/search?q=office&utm_source=top_keyword
                - link "テクスチャ" [ref=e532] [cursor=pointer]:
                  - /url: /main/search?q=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3&utm_source=top_keyword
                - link "工場" [ref=e533] [cursor=pointer]:
                  - /url: /main/search?q=%E5%B7%A5%E5%A0%B4&utm_source=top_keyword
                - link "部屋" [ref=e534] [cursor=pointer]:
                  - /url: /main/search?q=%E9%83%A8%E5%B1%8B&utm_source=top_keyword
                - link "沖縄" [ref=e535] [cursor=pointer]:
                  - /url: /main/search?q=%E6%B2%96%E7%B8%84&utm_source=top_keyword
                - link "さつまいも" [ref=e536] [cursor=pointer]:
                  - /url: /main/search?q=%E3%81%95%E3%81%A4%E3%81%BE%E3%81%84%E3%82%82&utm_source=top_keyword
                - link "カフェ" [ref=e537] [cursor=pointer]:
                  - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7&utm_source=top_keyword
                - link "自然" [ref=e538] [cursor=pointer]:
                  - /url: /main/search?q=%E8%87%AA%E7%84%B6&utm_source=top_keyword
                - link "雲" [ref=e539] [cursor=pointer]:
                  - /url: /main/search?q=%E9%9B%B2&utm_source=top_keyword
                - link "新生活" [ref=e540] [cursor=pointer]:
                  - /url: /main/search?q=%E6%96%B0%E7%94%9F%E6%B4%BB&utm_source=top_keyword
                - link "海" [ref=e541] [cursor=pointer]:
                  - /url: /main/search?q=%E6%B5%B7&utm_source=top_keyword
              - paragraph [ref=e542]:
                - button "もっと見る" [ref=e543] [cursor=pointer]:
                  - text: もっと見る
                  - generic [ref=e544]: 
                - text: 
          - generic [ref=e545]:
            - heading "メディア" [level=4] [ref=e546]
            - heading "テレビでご紹介いただきました！" [level=4] [ref=e547]
            - iframe [ref=e548]:
              - img [ref=f5e2]
            - paragraph [ref=e549]: かんさい情報ネット ten. | 読売テレビ
          - heading "ブログ" [level=4] [ref=e551]
          - generic [ref=e552]:
            - heading "SNS" [level=4] [ref=e553]
            - link "ACワークス公式 X" [ref=e555] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
            - link "Mr.ビー X" [ref=e557] [cursor=pointer]:
              - /url: https://x.com/mrb_ac
        - generic [ref=e558]:
          - generic [ref=e559]:
            - paragraph [ref=e561]: 人気写真
            - generic [ref=e563]:
              - figure [ref=e564]:
                - img "高齢者と話すヘルパー 女性,介護士,ヘルパーの写真素材" [ref=e566]
              - figure [ref=e567]:
                - img "オフィスで打合せをするビジネスマン ビジネスマン,ビジネス,打合せの写真素材" [ref=e569]
                - text: 
              - figure [ref=e570]:
                - img "パソコンを操作するお母さん 親子,母親,子供の写真素材" [ref=e572]
              - figure [ref=e573]:
                - img "スマートフォンを持つ笑顔の若い女性 スマホ,女性,スマートフォンの写真素材" [ref=e575]
                - text: 
              - figure [ref=e576]:
                - img "建築現場で打ち合わせをする設計士 建設,建築,作業員の写真素材" [ref=e578]
                - text: 
              - figure [ref=e579]:
                - img "スマホとタブレットの画面を見比べる男女 恋人,夫婦,カップルの写真素材" [ref=e581]
                - text: 
              - figure [ref=e582]:
                - img "タブレットで工事現場確認する作業員3人 工事現場,点検,確認の写真素材" [ref=e584]
                - text: 
              - figure [ref=e585]:
                - img "お昼寝する赤ちゃん 赤ちゃん,寝ている,寝るの写真素材" [ref=e587]
                - text: 
            - link "人気の投稿写真を詳しく見る" [ref=e589] [cursor=pointer]:
              - /url: /main/trends
              - text: 人気の投稿写真を詳しく見る
              - generic [ref=e590]: 
          - img "preloader-personalized-list" [ref=e593]
          - generic [ref=e594]:
            - paragraph [ref=e596]: デザインに統一感を持たせましょう
            - paragraph [ref=e597]:
              - text: チラシやウェブサイト、資料など、どのようなデザインにも統一感が大切です。
              - text: クリエイターのマイカテゴリーからテーマごとに写真を見つけることができます。同じスタイルの素材をダウンロードしてみましょう。
            - generic [ref=e598]: ※週間ダウンロードランキングからランダムに表示（クリエイター広告出稿者優遇）
            - img [ref=e601]
            - link "詳しく見る" [ref=e603] [cursor=pointer]:
              - /url: main/creator_categories
              - text: 詳しく見る
              - generic [ref=e604]: 
          - generic [ref=e605]:
            - paragraph [ref=e607]: 写真カテゴリー
            - generic [ref=e608]:
              - generic [ref=e610]:
                - link "カテゴリ。- 人物 人物" [ref=e613] [cursor=pointer]:
                  - /url: /main/search?c_id=1&c_name=%E4%BA%BA%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 人物" [ref=e614]
                  - generic [ref=e615]: 人物
                - link "カテゴリ。- ビジネス ビジネス" [ref=e618] [cursor=pointer]:
                  - /url: /main/search?c_id=2&c_name=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- ビジネス" [ref=e619]
                  - generic [ref=e620]: ビジネス
                - link "カテゴリ。- 動物・生き物 動物・生き物" [ref=e623] [cursor=pointer]:
                  - /url: /main/search?c_id=3&c_name=%E5%8B%95%E7%89%A9%E3%83%BB%E7%94%9F%E3%81%8D%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 動物・生き物" [ref=e624]
                  - generic [ref=e625]: 動物・生き物
                - link "カテゴリ。- 花・植物 花・植物" [ref=e628] [cursor=pointer]:
                  - /url: /main/search?c_id=4&c_name=%E8%8A%B1%E3%83%BB%E6%A4%8D%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 花・植物" [ref=e629]
                  - generic [ref=e630]: 花・植物
                - link "カテゴリ。- 食べ物・飲み物 食べ物・飲み物" [ref=e633] [cursor=pointer]:
                  - /url: /main/search?c_id=5&c_name=%E9%A3%9F%E3%81%B9%E7%89%A9%E3%83%BB%E9%A3%B2%E3%81%BF%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 食べ物・飲み物" [ref=e634]
                  - generic [ref=e635]: 食べ物・飲み物
                - link "カテゴリ。- 町並み・建物 町並み・建物" [ref=e638] [cursor=pointer]:
                  - /url: /main/search?c_id=6&c_name=%E7%94%BA%E4%B8%A6%E3%81%BF%E3%83%BB%E5%BB%BA%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 町並み・建物" [ref=e639]
                  - generic [ref=e640]: 町並み・建物
                - link "カテゴリ。- 医療・福祉 医療・福祉" [ref=e643] [cursor=pointer]:
                  - /url: /main/search?c_id=7&c_name=%E5%8C%BB%E7%99%82%E3%83%BB%E7%A6%8F%E7%A5%89&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 医療・福祉" [ref=e644]
                  - generic [ref=e645]: 医療・福祉
                - link "カテゴリ。- 交通・乗り物 交通・乗り物" [ref=e648] [cursor=pointer]:
                  - /url: /main/search?c_id=8&c_name=%E4%BA%A4%E9%80%9A%E3%83%BB%E4%B9%97%E3%82%8A%E7%89%A9&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 交通・乗り物" [ref=e649]
                  - generic [ref=e650]: 交通・乗り物
                - link "カテゴリ。- 季節・行事 季節・行事" [ref=e653] [cursor=pointer]:
                  - /url: /main/search?c_id=9&c_name=%E5%AD%A3%E7%AF%80%E3%83%BB%E8%A1%8C%E4%BA%8B&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 季節・行事" [ref=e654]
                  - generic [ref=e655]: 季節・行事
                - link "カテゴリ。- 自然・風景 自然・風景" [ref=e658] [cursor=pointer]:
                  - /url: /main/search?c_id=10&c_name=%E8%87%AA%E7%84%B6%E3%83%BB%E9%A2%A8%E6%99%AF&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 自然・風景" [ref=e659]
                  - generic [ref=e660]: 自然・風景
                - link "カテゴリ。- スポーツ スポーツ" [ref=e663] [cursor=pointer]:
                  - /url: /main/search?c_id=11&c_name=%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84&referer=c_search&utm_source=categories
                  - img "カテゴリ。- スポーツ" [ref=e664]
                  - generic [ref=e665]: スポーツ
                - link "カテゴリ。- エコ・環境 エコ・環境" [ref=e668] [cursor=pointer]:
                  - /url: /main/search?c_id=12&c_name=%E3%82%A8%E3%82%B3%E3%83%BB%E7%92%B0%E5%A2%83&referer=c_search&utm_source=categories
                  - img "カテゴリ。- エコ・環境" [ref=e669]
                  - generic [ref=e670]: エコ・環境
                - link "カテゴリ。- 美容・健康 美容・健康" [ref=e673] [cursor=pointer]:
                  - /url: /main/search?c_id=13&c_name=%E7%BE%8E%E5%AE%B9%E3%83%BB%E5%81%A5%E5%BA%B7&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 美容・健康" [ref=e674]
                  - generic [ref=e675]: 美容・健康
                - link "カテゴリ。- 住宅・インテリア 住宅・インテリア" [ref=e678] [cursor=pointer]:
                  - /url: /main/search?c_id=14&c_name=%E4%BD%8F%E5%AE%85%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 住宅・インテリア" [ref=e679]
                  - generic [ref=e680]: 住宅・インテリア
                - link "カテゴリ。- 年賀状 年賀状" [ref=e683] [cursor=pointer]:
                  - /url: /main/search?c_id=15&c_name=%E5%B9%B4%E8%B3%80%E7%8A%B6&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 年賀状" [ref=e684]
                  - generic [ref=e685]: 年賀状
                - link "カテゴリ。- テクスチャ・背景 テクスチャ・背景" [ref=e688] [cursor=pointer]:
                  - /url: /main/search?c_id=16&c_name=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%83%BB%E8%83%8C%E6%99%AF&referer=c_search&utm_source=categories
                  - img "カテゴリ。- テクスチャ・背景" [ref=e689]
                  - generic [ref=e690]: テクスチャ・背景
                - link "カテゴリ。- 小物・雑貨 小物・雑貨" [ref=e693] [cursor=pointer]:
                  - /url: /main/search?c_id=18&c_name=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 小物・雑貨" [ref=e694]
                  - generic [ref=e695]: 小物・雑貨
                - link "カテゴリ。- クレイアート クレイアート" [ref=e698] [cursor=pointer]:
                  - /url: /main/search?c_id=19&c_name=%E3%82%AF%E3%83%AC%E3%82%A4%E3%82%A2%E3%83%BC%E3%83%88&referer=c_search&utm_source=categories
                  - img "カテゴリ。- クレイアート" [ref=e699]
                  - generic [ref=e700]: クレイアート
                - link "カテゴリ。- 外国 外国" [ref=e703] [cursor=pointer]:
                  - /url: /main/search?c_id=20&c_name=%E5%A4%96%E5%9B%BD&referer=c_search&utm_source=categories
                  - img "カテゴリ。- 外国" [ref=e704]
                  - generic [ref=e705]: 外国
                - link "カテゴリ。- PSD素材 PSD素材" [ref=e708] [cursor=pointer]:
                  - /url: /main/search?referer=category_psd&sizesec=psd&utm_source=categories
                  - img "カテゴリ。- PSD素材" [ref=e709]
                  - generic [ref=e710]: PSD素材
              - button [ref=e711] [cursor=pointer]:
                - img [ref=e713]
          - generic [ref=e715]:
            - paragraph [ref=e717]: 写真ACだけのオリジナルおすすめ写真特集！
            - paragraph [ref=e718]:
              - text: プロのカメラマンが撮影した写真ACのおすすめ特集を一挙公開！
              - text: 無料で使える高品質な写真を豊富なテーマごとに厳選してご用意しています。
            - generic [ref=e719]:
              - generic [ref=e720]:
                - figure "マカロン・ドーナツ" [ref=e721]:
                  - link "マカロン・ドーナツ" [ref=e722] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=macarons_donutsac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                    - img "マカロン・ドーナツ" [ref=e723]
                - figure "様々なビジネスシーン 失敗・パワハラ" [ref=e724]:
                  - link "様々なビジネスシーン 失敗・パワハラ" [ref=e725] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=buddyjpac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&personalized=1&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                    - img "様々なビジネスシーン 失敗・パワハラ" [ref=e726]
                - figure "子供の食事" [ref=e727]:
                  - link "子供の食事" [ref=e728] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=childreneatingac&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=acworks&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&utm_source=pickup
                    - img "子供の食事" [ref=e729]
                - figure "日本人女性のライフスタイル" [ref=e730]:
                  - link "日本人女性のライフスタイル" [ref=e731] [cursor=pointer]:
                    - /url: https://www.photo-ac.com/main/search?q=womanjplifestyle3ac&by_ai=&sizesec=all&orientation=all&color=&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=&ngcreator=&nq=&qid=&exclude_ai=on&srt=dlrank&pp=70&utm_source=pickup
                    - img "日本人女性のライフスタイル" [ref=e732]
              - link "おすすめ写真特集をもっと見る" [ref=e734] [cursor=pointer]:
                - /url: /pickup/1
                - text: おすすめ写真特集をもっと見る
                - generic [ref=e735]: 
          - generic [ref=e736]:
            - generic [ref=e737]:
              - paragraph [ref=e738]: グループサイトの無料サービスはご存知ですか？
              - text: イラストや動画、デザインツールなど、一つのアカウントで全て使えます。
            - generic [ref=e739]:
              - link "シルエット・ピクトグラム テンプレート・デザインツール" [ref=e742] [cursor=pointer]:
                - /url: https://test-an.editor-ac.com
                - img "シルエット・ピクトグラム" [ref=e743]
                - generic [ref=e744]: テンプレート・デザインツール
              - link "イラスト・ベクター画像 イラスト・ベクター画像" [ref=e747] [cursor=pointer]:
                - /url: https://www.ac-illust.com
                - img "イラスト・ベクター画像" [ref=e748]
                - generic [ref=e749]: イラスト・ベクター画像
              - link "シルエット・ピクトグラム シルエット・ピクトグラム" [ref=e752] [cursor=pointer]:
                - /url: https://www.silhouette-ac.com
                - img "シルエット・ピクトグラム" [ref=e753]
                - generic [ref=e754]: シルエット・ピクトグラム
              - generic [ref=e755]:
                - generic [ref=e756]:
                  - generic:
                    - img
                - link "シルエット・ピクトグラム 動画・エフェクト" [ref=e757] [cursor=pointer]:
                  - /url: https://video-ac.com/
                  - img "シルエット・ピクトグラム" [ref=e758]
                  - generic [ref=e759]: 動画・エフェクト
          - generic [ref=e760]:
            - paragraph [ref=e762]: もう画像選びで悩まないでください
            - generic [ref=e765]:
              - generic [ref=e766]:
                - img "Notification" [ref=e767]
                - generic [ref=e768]:
                  - paragraph [ref=e769]: 無料でダウンロード
                  - paragraph [ref=e770]: 1239万枚以上の写真素材から無料でダウンロード可能！毎日数千枚の写真素材が追加されます。
              - generic [ref=e771]:
                - img "Notification" [ref=e772]
                - generic [ref=e773]:
                  - paragraph [ref=e774]: クレジット表記不要
                  - paragraph [ref=e775]: 無料だとクレジット表記が必要なサイトが多い中、写真ACは無料でもクレジット表記不要です。
              - generic [ref=e776]:
                - img "Notification" [ref=e777]
                - generic [ref=e778]:
                  - paragraph [ref=e779]: 商用利用可能
                  - paragraph [ref=e780]: 加工も自由で商用利用も可能だから、チラシやポスター、パンフレットなど、さまざまなビジネスにご利用いただけます。
          - generic [ref=e781]:
            - paragraph [ref=e783]: こんな方におすすめです
            - generic [ref=e785]:
              - generic [ref=e786]:
                - generic [ref=e787]:
                  - img "top human 1" [ref=e788]
                  - generic [ref=e789]:
                    - paragraph [ref=e790]: WEB担当者
                    - paragraph [ref=e791]:
                      - text: ウェブサイトやブログの
                      - text: アイキャッチ画像がほしい
                - generic [ref=e792]:
                  - img "top human 2" [ref=e793]
                  - generic [ref=e794]:
                    - paragraph [ref=e795]: 会社員
                    - paragraph [ref=e796]:
                      - text: プレゼンテーションのスライドに
                      - text: 画像を使って分かりやすくしたい
                - generic [ref=e797]:
                  - img "top human 3" [ref=e798]
                  - generic [ref=e799]:
                    - paragraph [ref=e800]: インフルエンサー
                    - paragraph [ref=e801]:
                      - text: SNSへの投稿が
                      - text: テキストだけで物足りない
                - generic [ref=e802]:
                  - img "top human 4" [ref=e803]
                  - generic [ref=e804]:
                    - paragraph [ref=e805]: 作 家
                    - paragraph [ref=e806]:
                      - text: 電子書籍や印刷物の挿絵に
                      - text: 商用利用できる画像がほしい
                - generic [ref=e807]:
                  - img "top human 5" [ref=e808]
                  - generic [ref=e809]:
                    - paragraph [ref=e810]: プログラマー
                    - paragraph [ref=e811]:
                      - text: アプリケーションのUIデザインに
                      - text: 使う画像やアイコンがほしい
              - generic [ref=e812]:
                - generic [ref=e813]:
                  - img "top human 6" [ref=e814]
                  - generic [ref=e815]:
                    - paragraph [ref=e816]: 教育関係者
                    - paragraph [ref=e817]:
                      - text: 学習教材や教育資料に入れる
                      - text: 挿絵やイメージがほしい
                - generic [ref=e818]:
                  - img "top human 7" [ref=e819]
                  - generic [ref=e820]:
                    - paragraph [ref=e821]: 記 者
                    - paragraph [ref=e822]:
                      - text: メディア記事やニュース記事に
                      - text: 使う画像がほしい
                - generic [ref=e823]:
                  - img "top human 8" [ref=e824]
                  - generic [ref=e825]:
                    - paragraph [ref=e826]: ショップ運営
                    - paragraph [ref=e827]:
                      - text: 広告キャンペーンに使える
                      - text: インパクトのある画像がほしい
                - generic [ref=e828]:
                  - img "top human 9" [ref=e829]
                  - generic [ref=e830]:
                    - paragraph [ref=e831]: ハンドメイド販売
                    - paragraph [ref=e832]:
                      - link "商品化ライセンス" [ref=e833] [cursor=pointer]:
                        - /url: /main/extra_license_introduction
                      - text: を購入して
                      - text: ハンドメイド作品の販売したい
          - generic [ref=e836] [cursor=pointer]:
            - generic [ref=e838]:
              - img "logo45 designAC" [ref=e839]
              - paragraph [ref=e840]: デザインをもっと簡単に
              - paragraph [ref=e842]:
                - text: デザインACならいつでもどこでも、手軽にデザインできます。
                - text: 豊富なテンプレートからオリジナルのデザインを作成。
                - text: PC、スマートフォンにも対応の無料デザインツールです。
              - link "今すぐデザインを作成" [ref=e843]:
                - /url: https://www.design-ac.net/templates/new
            - img "banner designAC" [ref=e845]
          - generic [ref=e846]:
            - generic [ref=e847]:
              - paragraph [ref=e848]: まだ時間をムダにしますか？
              - paragraph [ref=e849]: 効率よく画像を探して、インプットの時間を確保し、納期のプレッシャーから逃れましょう。
            - generic [ref=e850]:
              - button "プレミアム個人プラン picture premium personal picture check 検索無制限 picture check ダウンロード無制限 picture check 待たずにダウンロード picture check まとめてダウンロード picture check 商品化ライセンス利用可能 picture check あんしんサポート 個人プランを詳しくみる" [ref=e851] [cursor=pointer]:
                - paragraph [ref=e853]: プレミアム個人プラン
                - generic [ref=e854]:
                  - img "picture premium personal" [ref=e855]
                  - generic [ref=e856]:
                    - generic [ref=e857]:
                      - img "picture check" [ref=e859]
                      - paragraph [ref=e861]: 検索無制限
                    - generic [ref=e862]:
                      - img "picture check" [ref=e864]
                      - paragraph [ref=e866]: ダウンロード無制限
                    - generic [ref=e867]:
                      - img "picture check" [ref=e869]
                      - paragraph [ref=e871]: 待たずにダウンロード
                    - generic [ref=e872]:
                      - img "picture check" [ref=e874]
                      - paragraph [ref=e876]: まとめてダウンロード
                    - generic [ref=e877]:
                      - img "picture check" [ref=e879]
                      - paragraph [ref=e881]: 商品化ライセンス利用可能
                    - generic [ref=e882]:
                      - img "picture check" [ref=e884]
                      - paragraph [ref=e886]: あんしんサポート
                  - link "個人プランを詳しくみる" [ref=e888]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
              - button "チームでお得な法人プラン picture premium business ＼ 大企業から行政まで利用中 ／ 個人プランの全ての機能に加え、 picture check 法人名義でのご利用 picture check メンバー招待機能 picture check 広告非表示オプション無料 picture check コレクションの共有 法人プランを詳しくみる" [ref=e889] [cursor=pointer]:
                - paragraph [ref=e891]: チームでお得な法人プラン
                - generic [ref=e892]:
                  - img "picture premium business" [ref=e893]
                  - generic [ref=e894]:
                    - paragraph [ref=e895]: ＼ 大企業から行政まで利用中 ／
                    - generic [ref=e896]:
                      - paragraph [ref=e897]: 個人プランの全ての機能に加え、
                      - generic [ref=e898]:
                        - img "picture check" [ref=e900]
                        - paragraph [ref=e902]: 法人名義でのご利用
                      - generic [ref=e903]:
                        - img "picture check" [ref=e905]
                        - paragraph [ref=e907]: メンバー招待機能
                      - generic [ref=e908]:
                        - img "picture check" [ref=e910]
                        - paragraph [ref=e912]: 広告非表示オプション無料
                      - generic [ref=e913]:
                        - img "picture check" [ref=e915]
                        - paragraph [ref=e917]: コレクションの共有
                  - link "法人プランを詳しくみる" [ref=e919]:
                    - /url: https://test-lien.photo-ac.com/premium/business
          - generic [ref=e920]:
            - paragraph [ref=e922]: 日本最大級のフリー素材サイト
            - generic [ref=e923]:
              - generic [ref=e924]:
                - generic [ref=e926]:
                  - img "Total users" [ref=e927]
                  - generic [ref=e928]:
                    - paragraph [ref=e929]: 登録ユーザー
                    - paragraph [ref=e930]: 0人以上
                - generic [ref=e932]:
                  - img "Downloads" [ref=e933]
                  - generic [ref=e934]:
                    - paragraph [ref=e935]: 総ダウンロード
                    - paragraph [ref=e936]: 208,000,000回以上
                - generic [ref=e938]:
                  - img "Total creators" [ref=e939]
                  - generic [ref=e940]:
                    - paragraph [ref=e941]: 登録クリエイター
                    - paragraph [ref=e942]: 370,000人以上
                - generic [ref=e944]:
                  - img "Donations" [ref=e945]
                  - generic [ref=e946]:
                    - paragraph [ref=e947]: 寄付金総額
                    - paragraph [ref=e948]: 71,400,000円以上
              - generic [ref=e949]: ※グループサイト合計
          - generic [ref=e950]:
            - paragraph [ref=e952]: ACワークスからのお知らせ
            - iframe [ref=e953]:
              - img [ref=f6e2]
          - link "acworks banner" [ref=e955] [cursor=pointer]:
            - /url: https://acworks.co.jp/
            - img "acworks banner" [ref=e956]
          - generic [ref=e957]:
            - paragraph [ref=e958]: あなたのダウンロードが社会に貢献します
            - paragraph [ref=e959]: あなたが写真素材を1ダウンロードするたびに0.1円を
            - paragraph [ref=e960]: ACワークス株式会社より、ユーザーの皆さまが希望する団体へ寄付いたします。
            - generic [ref=e961]:
              - generic [ref=e963]:
                - img [ref=e964]
                - generic [ref=e965]:
                  - paragraph [ref=e966]:
                    - text: 2024年の寄付金総額
                    - generic [ref=e967]: 800万円超
                  - paragraph [ref=e968]:
                    - text: これまでの累計寄付金総額
                    - generic [ref=e969]: 6100万円超
              - paragraph [ref=e970]: "[2025年3月時点]"
            - link "これまでの寄付金総額をみる" [ref=e972] [cursor=pointer]:
              - /url: https://acworks.co.jp/csr/
      - contentinfo [ref=e974]:
        - generic [ref=e977]:
          - generic [ref=e978]: 昨日のダウンロード数：24,029
          - generic [ref=e979]: 先月のダウンロード数：1,124,624
          - generic [ref=e980]: 総会員数：1600万人を突破しました
        - generic [ref=e982]:
          - generic [ref=e983]:
            - generic [ref=e984]:
              - generic [ref=e985]: 写真ACについて 
              - list [ref=e986]:
                - listitem [ref=e987]:
                  - link "写真ACとは" [ref=e988] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e989]:
                  - link "運営会社" [ref=e990] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e991]:
                  - link "個人情報保護方針" [ref=e992] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e993]:
                  - link "特定個人情報基本方針" [ref=e994] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e995]:
                  - link "特定商取引法に基づく表記" [ref=e996] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e997]:
                  - link "サイトマップ" [ref=e998] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e999]:
                  - link "セキュリティポリシー" [ref=e1000] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e1001]:
              - generic [ref=e1002]: 会員登録 
              - list [ref=e1003]:
                - listitem [ref=e1004]:
                  - link "無料会員登録" [ref=e1005] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
                - listitem [ref=e1006]:
                  - link "プレミアム会員登録" [ref=e1007] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e1008]:
                  - link "無料クリエイター会員登録" [ref=e1009] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e1010]:
              - generic [ref=e1011]: プレミアム会員サービス 
              - list [ref=e1012]:
                - listitem [ref=e1013]:
                  - link "プレミアム会員登録" [ref=e1014] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e1015]:
                  - link "法人・複数名向けプラン" [ref=e1016] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e1017]:
                  - link "商品化ライセンス" [ref=e1018] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e1019]:
                  - link "あんしんサポート" [ref=e1020] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e1021]:
              - generic [ref=e1022]: ヘルプ＆ガイド 
              - list [ref=e1023]:
                - listitem [ref=e1024]:
                  - link "ヘルプ" [ref=e1025] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e1026]:
                  - link "利用規約" [ref=e1027] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e1028]:
                  - link "プレミアム会員利用規約" [ref=e1029] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e1030]:
                  - link "AC写真AIラボ利用規約" [ref=e1031] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e1032]:
              - generic [ref=e1033]: グループサイト 
              - list [ref=e1034]:
                - listitem [ref=e1035]:
                  - link "イラストAC" [ref=e1036] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e1037]:
                  - link "シルエットAC" [ref=e1038] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e1039]:
                  - link "フリービーAC" [ref=e1040] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e1041]:
                  - link "年賀状AC" [ref=e1042] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e1043]:
                  - link "動画AC" [ref=e1044] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e1045]:
                  - link "デザインAC" [ref=e1046] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e1047]:
                  - link "ACデータ" [ref=e1048] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e1049]:
                  - link "明細AC" [ref=e1050] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e1051]:
            - link "twitter_btn" [ref=e1052] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e1053]:
                - img [ref=e1054]
            - link "facebook_btn" [ref=e1056] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e1057]:
                - generic [ref=e1058]: 
            - link "pinterest_btn" [ref=e1059] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e1060]:
                - generic [ref=e1061]: 
            - link "blog_btn" [ref=e1062] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e1063]:
                - generic [ref=e1064]: 
            - link "feedback_modal_btn" [ref=e1065] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e1066]:
                - generic [ref=e1067]: 
                - text: ご意見・ご要望
          - generic [ref=e1069]:
            - text: © 2011-2026
            - link "写真AC" [ref=e1070] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
  - link:
    - /url: ""
  - link:
    - /url: ""
  - text:   
  - dialog "Close AC写真AIラボ 次回からこのメッセージを表示しない 閉じる" [active] [ref=e1071]:
    - document:
      - generic [ref=e1073]:
        - region "Close" [ref=e1074] [cursor=pointer]:
          - generic "icon-close" [ref=e1075]:
            - img [ref=e1076]
        - generic [ref=e1078] [cursor=pointer]:
          - img "AC写真AIラボ" [ref=e1079]
          - generic [ref=e1081]:
            - generic [ref=e1082]:
              - checkbox "次回からこのメッセージを表示しない" [ref=e1083]
              - generic [ref=e1084]: 次回からこのメッセージを表示しない
            - button "閉じる" [ref=e1085]
```

# Test source

```ts
  118 |         });
  119 |       } else {
  120 |         await this.searchInput.press('Enter', { noWaitAfter: true });
  121 |       }
  122 |     });
  123 |   }
  124 | 
  125 |   /**
  126 |    * Open the user menu dropdown.
  127 |    */
  128 |   async openUserMenu(): Promise<void> {
  129 |     await test.step('Open user menu dropdown', async () => {
  130 |       await this.clickElement(this.userMenu);
  131 |     });
  132 |   }
  133 | 
  134 |   /**
  135 |    * Log out by clicking the logout button/link.
  136 |    */
  137 |   async logout(): Promise<void> {
  138 |     await test.step('Logout from HomePage', async () => {
  139 |       await this.openUserMenu();
  140 |       await this.clickElement(this.logoutButton);
  141 |     });
  142 |   }
  143 | 
  144 |   /**
  145 |    * Check if the HomePage is loaded (heading is visible).
  146 |    */
  147 |   async isHomePageLoaded(): Promise<boolean> {
  148 |     return this.isVisible(this.pageHeading);
  149 |   }
  150 | 
  151 |   /**
  152 |    * Click a specific Top Keyword chip under the search bar.
  153 |    * @param keyword - The keyword text to click (e.g. '女性', 'ビジネス', '犬')
  154 |    */
  155 |   async clickTopKeyword(keyword: string): Promise<void> {
  156 |     await test.step(`Click Top Keyword: "${keyword}"`, async () => {
  157 |       const keywordChip = this.topKeywords.filter({ hasText: keyword }).first();
  158 |       await this.clickElement(keywordChip, { noWaitAfter: true });
  159 |     });
  160 |   }
  161 | 
  162 |   /**
  163 |    * Get all visible top keyword texts under the search bar.
  164 |    */
  165 |   async getTopKeywords(): Promise<string[]> {
  166 |     return this.topKeywords.allInnerTexts();
  167 |   }
  168 | 
  169 |   /**
  170 |    * Click a popular tag from the popular tags cloud.
  171 |    * @param tag - Tag name to click (e.g. 'オフィス', '炎', 'コスモス')
  172 |    */
  173 |   async clickPopularTag(tag: string): Promise<void> {
  174 |     await test.step(`Click Popular Tag: "${tag}"`, async () => {
  175 |       const tagElement = this.popularTags.filter({ hasText: tag }).first();
  176 |       await tagElement.scrollIntoViewIfNeeded().catch(() => { });
  177 |       await this.clickElement(tagElement, { noWaitAfter: true });
  178 |     });
  179 |   }
  180 | 
  181 |   /**
  182 |    * Open the Image Search upload modal (画像検索).
  183 |    */
  184 |   async openImageSearchModal(): Promise<void> {
  185 |     await test.step('Open Image Search upload modal', async () => {
  186 |       await this.clickElement(this.imageSearchButton);
  187 |       await this.uploadFileModal.waitFor({ state: 'visible', timeout: 5_000 });
  188 |     });
  189 |   }
  190 | 
  191 |   /**
  192 |    * Close the Image Search upload modal.
  193 |    */
  194 |   async closeImageSearchModal(): Promise<void> {
  195 |     await test.step('Close Image Search upload modal', async () => {
  196 |       await this.clickElement(this.uploadModalCloseButton);
  197 |       await this.uploadFileModal.waitFor({ state: 'hidden', timeout: 5_000 });
  198 |     });
  199 |   }
  200 | 
  201 |   /**
  202 |    * Upload an image to perform visual similarity search (画像で検索する).
  203 |    * @param filePath - Absolute path to the sample image file (.jpg or .png)
  204 |    */
  205 |   async uploadImageForSearch(filePath: string): Promise<void> {
  206 |     await test.step(`Upload image for search: "${filePath}"`, async () => {
  207 |       await this.openImageSearchModal();
  208 | 
  209 |       // Photo-AC requires isFileInputClicked = true to trigger uploadImageAjax on change
  210 |       await this.page.evaluate(() => {
  211 |         (window as any).isFileInputClicked = true;
  212 |       });
  213 | 
  214 |       // Wait for navigation triggered by window.location.href to /search/ris
  215 |       await Promise.all([
  216 |         this.page.waitForURL(/\/search\/ris/i, { timeout: 30_000, waitUntil: 'domcontentloaded' }),
  217 |         (async () => {
> 218 |           await this.fileUploadInput.setInputFiles(filePath);
      |           ^ Error: ENOENT: no such file or directory, stat '/home/runner/work/PhotoAC-test/PhotoAC-test/photo-ac/src/test-data/sample-search.jpg'
  219 |           await this.fileUploadInput.dispatchEvent('change').catch(() => { });
  220 |         })(),
  221 |       ]);
  222 |     });
  223 |   }
  224 | 
  225 |   /**
  226 |    * Click a Category link directly on the HomePage.
  227 |    * @param categoryName - Name of the category (e.g. '人物', 'ビジネス', '自然・風景')
  228 |    */
  229 |   async clickCategory(categoryName: string): Promise<void> {
  230 |     await test.step(`Click Category: "${categoryName}" from HomePage`, async () => {
  231 |       const categoryLink = this.categoryLinks.filter({ hasText: categoryName }).first();
  232 |       await this.clickElement(categoryLink, { noWaitAfter: true });
  233 |     });
  234 |   }
  235 | 
  236 |   /**
  237 |    * Toggle AI Search (AI検索) ON or OFF.
  238 |    */
  239 |   async toggleAiSearch(): Promise<void> {
  240 |     await test.step('Toggle AI Search state', async () => {
  241 |       await this.clickElement(this.searchByAiButton);
  242 |     });
  243 |   }
  244 | 
  245 |   /**
  246 |    * Dismiss the semantic/AI search introduction modal if visible.
  247 |    */
  248 |   async dismissSemanticSearchModal(): Promise<void> {
  249 |     const isVisible = await this.semanticSearchModal.waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false);
  250 |     if (isVisible) {
  251 |       await test.step('Dismiss Semantic Search Modal', async () => {
  252 |         if (await this.semanticSearchModalCloseButton.isVisible().catch(() => false)) {
  253 |           await this.semanticSearchModalCloseButton.click().catch(() => { });
  254 |         }
  255 |         await this.page.keyboard.press('Escape').catch(() => { });
  256 |         await this.semanticSearchModal.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
  257 |         await this.page.locator('.modal-backdrop').waitFor({ state: 'detached', timeout: 5000 }).catch(() => { });
  258 |       });
  259 |     }
  260 |   }
  261 | 
  262 |   /**
  263 |    * Perform a search with AI Search enabled (AI検索).
  264 |    * Automatically detects if AI toggle is already ON (e.g. after limit reached),
  265 |    * dismisses introduction modal if present, and executes genuine user search flow.
  266 |    * @param naturalQuery - Descriptive search query (e.g. 'オフィスでパソコンを開くビジネスマン')
  267 |    */
  268 |   async searchWithAi(naturalQuery: string): Promise<void> {
  269 |     await test.step(`Search with AI using query: "${naturalQuery}"`, async () => {
  270 |       await this.dismissSemanticSearchModal();
  271 | 
  272 |       const isAiOn = await this.aiSearchOnIcon.isVisible().catch(() => false);
  273 |       const isDisabled = await this.searchByAiButton.isDisabled().catch(() => false);
  274 | 
  275 |       // Only toggle if not already ON and not disabled
  276 |       if (!isAiOn && !isDisabled) {
  277 |         await this.toggleAiSearch();
  278 |       }
  279 | 
  280 |       await this.fillInput(this.searchInput, naturalQuery);
  281 |       await this.searchInput.press('Enter');
  282 |     });
  283 |   }
  284 | 
  285 |   /**
  286 |    * Scroll down the page to trigger the Sticky Header Search Bar (.search-box-top-fixed-area).
  287 |    * @param scrollDistance - Scroll distance in pixels (default 800)
  288 |    */
  289 |   async scrollToActivateStickySearch(scrollDistance = 800): Promise<void> {
  290 |     await test.step('Scroll down to activate Sticky Header Search Bar', async () => {
  291 |       await this.page.evaluate((y) => {
  292 |         window.scrollTo(0, y);
  293 |         document.documentElement.scrollTop = y;
  294 |         if ((window as any).jQuery) {
  295 |           (window as any).jQuery(window).trigger('scroll');
  296 |         }
  297 |         window.dispatchEvent(new Event('scroll'));
  298 |       }, scrollDistance);
  299 |       await this.stickySearchArea.waitFor({ state: 'visible', timeout: 10_000 });
  300 |     });
  301 |   }
  302 | 
  303 |   /**
  304 |    * Scroll back to the top of the page (scrollTop = 0) to deactivate/hide the Sticky Header Search Bar.
  305 |    */
  306 |   async scrollToTop(): Promise<void> {
  307 |     await test.step('Scroll back to top of page', async () => {
  308 |       await this.page.evaluate(() => {
  309 |         window.scrollTo(0, 0);
  310 |         document.documentElement.scrollTop = 0;
  311 |         if ((window as any).jQuery) {
  312 |           (window as any).jQuery(window).trigger('scroll');
  313 |         }
  314 |         window.dispatchEvent(new Event('scroll'));
  315 |       });
  316 |       await this.stickySearchArea.waitFor({ state: 'hidden', timeout: 10_000 });
  317 |     });
  318 |   }
```