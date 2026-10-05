# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/search-guest.spec.ts >> Search Feature — Guest (No-Login User) >> TC-SEARCH-GUEST-005: Tìm kiếm bằng top keyword @guest
- Location: photo-ac/src/tests/downloader/search-guest.spec.ts:156:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('a.top-search').filter({ hasText: '秋' }).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/search?q=%E7%A7%8B&utm_source=top_keyword"
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
                  - searchbox "キーワード（例：女性）" [ref=e28]: 秋
                  - button "リセット" [ref=e29] [cursor=pointer]:
                    - img [ref=e31]
                  - generic [ref=e33]: 秋
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
                  - link "秋" [ref=e88] [cursor=pointer]:
                    - /url: /main/search?q=%E7%A7%8B
            - button "広告を非表示にする 広告を非表示にする" [ref=e93] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e94]
              - generic [ref=e95]: 広告を非表示にする
            - generic [ref=e96]:
              - heading "「秋」の写真素材" [level=1] [ref=e97]
              - text: 938,177点
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
                - img "すすき 秋の風景 すすき,ススキ,秋の写真素材" [ref=e139]
                - text:  
              - figure [ref=e140]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e143] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e144]
                  - generic [ref=e145]: 広告を非表示にする
              - figure [ref=e146]:
                - link "pinterest-btn-share" [ref=e150] [cursor=pointer]:
                  - /url: "https://pinterest.com/pin/create/bookmarklet/?media=https://thumb.photo-ac.com/29/2944f711660326ceae4223a44aa86c02_w.jpg&url=https://test-lien.photo-ac.com/main/detail/35144161&title=コスモス　秋の花の写真&description=%E3%82%B3%E3%82%B9%E3%83%A2%E3%82%B9%E3%80%80%E7%A7%8B%E3%81%AE%E8%8A%B1の写真写真AC - No: 35144161／写真素材なら「写真AC」"
                  - generic [ref=e151]: 
                - img "コスモス 秋の花 コスモス,秋,コスモス畑の写真素材" [ref=e152]
                - generic [ref=e155]:
                  - generic [ref=e156]: コスモス 秋の花
                  - paragraph [ref=e157]:
                    - link "Sousuke48" [ref=e158] [cursor=pointer]:
                      - /url: /profile/3534621
                      - generic [ref=e159]: 
                      - text: Sousuke48
                    - link "関連写真" [ref=e160] [cursor=pointer]:
                      - /url: /main/related?id=35144161
                      - text: 関連写真
                      - generic [ref=e161]: 
              - figure [ref=e162]:
                - generic [ref=e163]: 
                - img "十五夜 秋の満月 十五夜,月,中秋の名月の写真素材" [ref=e164]
                - text:  
              - figure [ref=e165]:
                - generic [ref=e166]: 
                - img "能古島コスモス畑 秋,コスモス畑,のこのしまの写真素材" [ref=e167]
                - text:  
              - figure [ref=e168]:
                - generic [ref=e169]: 
                - img "秋の新米 お米,新米,米の写真素材" [ref=e170]
                - text:  
              - figure [ref=e171]:
                - generic [ref=e172]: 
                - img "香り良いキンモクセイ キンモクセイ,秋,金木犀の写真素材" [ref=e173]
                - text:  
              - figure [ref=e174]:
                - generic [ref=e175]: 
                - img "秋のフレーム 紅葉,秋,秋フレームの写真素材" [ref=e176]
                - text:  
              - figure [ref=e177]:
                - generic [ref=e178]: 
                - img "コスモス畑 秋のイメージ コスモス,秋,コスモス畑の写真素材" [ref=e179]
                - text:  
              - figure [ref=e180]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e183] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e184]
                  - generic [ref=e185]: 広告を非表示にする
              - figure [ref=e186]:
                - generic [ref=e187]: 
                - img "秋晴れのノリタケの森と噴水広場2 秋,紅葉,青空の写真素材" [ref=e188]
                - text:  
              - figure [ref=e189]:
                - generic [ref=e190]: 
                - img "金木犀 甘い香りの花 キンモクセイ,秋,金木犀の写真素材" [ref=e191]
                - text:  
              - figure [ref=e192]:
                - generic [ref=e193]: 
                - img "秋の公園の紅葉 秋,紅葉,公園の写真素材" [ref=e194]
                - text:  
              - figure [ref=e195]:
                - generic [ref=e196]: 
                - img "落ち葉と秋の実のフレーム 落ち葉,秋,紅葉の写真素材" [ref=e197]
                - text:  
              - figure [ref=e198]:
                - generic [ref=e199]: 
                - img "秋風に揺れるコスモス14 コスモス,秋桜,ピンク色の写真素材" [ref=e200]
                - text:  
              - figure [ref=e201]:
                - generic [ref=e202]: 
                - img "お出掛けをする女性3人組 女性,友達,3人の写真素材" [ref=e203]
                - text:  
              - figure [ref=e204]:
                - generic [ref=e205]: 
                - img "コスモス 秋の風景秋の コスモス,コスモス畑,秋の写真素材" [ref=e206]
                - text:  
              - figure [ref=e208]:
                - generic [ref=e209]: 
                - img "コスモス 秋の景色 コスモス,コスモス畑,秋の写真素材" [ref=e210]
                - text:  
              - figure [ref=e211]:
                - generic [ref=e212]: 
                - img "すすき 秋の風物詩 すすき,ススキ,秋の写真素材" [ref=e213]
                - text:  
              - figure [ref=e214]:
                - generic [ref=e215]: 
                - img "海が見える丘に咲くコスモス 花,丘,花畑の写真素材" [ref=e216]
                - text:  
              - figure [ref=e217]:
                - generic [ref=e218]: 
                - img "コスモスの花 秋の風景 コスモス,コスモス畑,秋の写真素材" [ref=e219]
                - text:  
              - figure [ref=e220]:
                - generic [ref=e221]: 
                - img "上高地 A 上高地,長野県,日本の写真素材" [ref=e222]
                - text:  
              - figure [ref=e223]:
                - generic [ref=e224]: 
                - img "キンモクセイ 秋の風景 キンモクセイ,秋,花の写真素材" [ref=e225]
                - text:  
              - figure [ref=e226]:
                - generic [ref=e227]: 
                - img "夏の空と秋の田んぼ 季節の変わり目 秋,眺め,絶景の写真素材" [ref=e228]
                - text:  
              - figure [ref=e229]:
                - generic [ref=e230]: 
                - img "水元公園の紅葉・広場＆池（東京都葛飾区） 秋,水元公園,紅葉の写真素材" [ref=e231]
                - generic [ref=e233]: New
                - text:  
              - figure [ref=e235]:
                - generic [ref=e236]: 
                - img "天人峡（北海道） 秋の天人峡,天人峡,七福岩の写真素材" [ref=e237]
                - generic [ref=e239]: New
                - text:  
              - figure [ref=e240]:
                - generic [ref=e241]: 
                - img "初秋の白馬三山 初秋,白馬三山,白馬村の写真素材" [ref=e242]
                - text:  
              - figure [ref=e243]:
                - generic [ref=e244]: 
                - img "快晴の青空と紅葉と黄葉の木々と実る柿の木 柿,柿の木,実りの秋の写真素材" [ref=e245]
                - generic [ref=e247]: New
                - text:  
              - figure [ref=e248]:
                - generic [ref=e249]: 
                - img "水元公園の紅葉・広場＆池（東京都葛飾区） 秋,水元公園,紅葉の写真素材" [ref=e250]
                - generic [ref=e252]: New
                - text:  
              - figure [ref=e253]:
                - generic [ref=e254]: 
                - img "水元公園の紅葉・煉瓦色の木立＆池・葛飾区 秋,水元公園,紅葉の写真素材" [ref=e255]
                - generic [ref=e257]: New
                - text:  
              - figure [ref=e258]:
                - generic [ref=e259]: 
                - img "晩秋の白馬の街並み 秋,風景,景色の写真素材" [ref=e260]
                - text:  
              - figure [ref=e261]:
                - generic [ref=e262]: 
                - img "紅葉と吊り橋（紅の吊橋） 紅葉,秋,もみじの写真素材" [ref=e263]
                - generic [ref=e265]: New
                - text:  
              - figure [ref=e266]:
                - generic [ref=e267]: 
                - img "秋深まる湖 秋,湖,湖畔の写真素材" [ref=e268]
                - text:  
              - figure [ref=e270]:
                - generic [ref=e271]: 
                - img "秋風に揺れるコスモス17 コスモス,秋桜,秋の写真素材" [ref=e272]
                - text:  
              - figure [ref=e273]:
                - generic [ref=e274]: 
                - img "木島平村 初秋の田園風景 木島平村,初秋,穀倉地帯の写真素材" [ref=e275]
                - generic [ref=e277]: New
                - text:  
              - figure [ref=e278]:
                - generic [ref=e279]: 
                - img "秋の厚木市飯山・カラフルな菊（神奈川県） 秋,菊,厚木市の写真素材" [ref=e280]
                - generic [ref=e282]: New
                - text:  
              - figure [ref=e283]:
                - generic [ref=e284]: 
                - img "かすむ五竜岳と河川 霞,川霧,五竜岳の写真素材" [ref=e285]
                - text:  
              - figure [ref=e286]:
                - generic [ref=e287]: 
                - img "紅葉リフレクション 紅葉,秋,秋晴れの写真素材" [ref=e288]
                - text:  
              - figure [ref=e289]:
                - generic [ref=e290]: 
                - img "秋の宮ケ瀬湖畔園地風景３ 秋,晩秋,宮ケ瀬湖の写真素材" [ref=e291]
                - text:  
              - figure [ref=e292]:
                - generic [ref=e293]: 
                - img "冠雪の山並みとリフレクション 秋,晩秋,山並みの写真素材" [ref=e294]
                - generic [ref=e296]: New
                - text:  
              - figure [ref=e297]:
                - generic [ref=e298]: 
                - img "紅葉と冠雪の山 紅葉,冠雪,雪の写真素材" [ref=e299]
                - text:  
              - figure [ref=e301]:
                - generic [ref=e302]: 
                - img "滋賀県 永源寺の秋景色 永源寺,紅葉,秋の写真素材" [ref=e303]
                - text:  
              - figure [ref=e304]:
                - generic [ref=e305]: 
                - img "紅葉の並木道 秋,木々,紅葉の写真素材" [ref=e306]
                - text:  
              - figure [ref=e307]:
                - generic [ref=e308]: 
                - img "青森県 恐山の秋景色 恐山,秋,紅葉の写真素材" [ref=e309]
                - text:  
              - figure [ref=e310]:
                - generic [ref=e311]: 
                - img "晩秋と冠雪 晩秋,秋,初冬の写真素材" [ref=e312]
                - generic [ref=e314]: New
                - text:  
              - figure [ref=e315]:
                - generic [ref=e316]: 
                - img "秋の水元公園・水辺の紅葉（東京都葛飾区） 秋,水元公園,紅葉の写真素材" [ref=e317]
                - generic [ref=e319]: New
                - text:  
              - figure [ref=e320]:
                - generic [ref=e321]: 
                - img "大分県耶馬溪 紅葉に染まる渓谷 耶馬溪,紅葉,山の写真素材" [ref=e322]
                - generic [ref=e324]: New
                - text:  
              - figure [ref=e325]:
                - generic [ref=e326]: 
                - img "大分県耶馬溪 紅葉に染まる渓谷 耶馬溪,紅葉,山の写真素材" [ref=e327]
                - generic [ref=e329]: New
                - text:  
              - figure [ref=e330]:
                - generic [ref=e331]: 
                - img "秋の水元公園・ポプラ並木道の紅葉・葛飾区 秋,水元公園,紅葉の写真素材" [ref=e332]
                - generic [ref=e334]: New
                - text:  
              - figure [ref=e336]:
                - generic [ref=e337]: 
                - img "秋の公園 秋,紅葉,公園の写真素材" [ref=e338]
                - text:  
              - figure [ref=e339]:
                - generic [ref=e340]: 
                - img "秋の木崎湖 秋,空,秋空の写真素材" [ref=e341]
                - text:  
              - figure [ref=e342]:
                - generic [ref=e343]: 
                - img "秋イメージ〜紅葉に染まる山 秋イメージ,秋,山の写真素材" [ref=e344]
                - text:  
              - figure [ref=e345]:
                - generic [ref=e346]: 
                - img "滋賀県 永源寺の秋景色 永源寺,紅葉,秋の写真素材" [ref=e347]
                - text:  
              - figure [ref=e348]:
                - generic [ref=e349]: 
                - img "大分県耶馬溪 紅葉に染まる渓谷 耶馬溪,紅葉,山の写真素材" [ref=e350]
                - generic [ref=e352]: New
                - text:  
              - figure [ref=e353]:
                - generic [ref=e354]: 
                - img "秋の亀山湖・楓の木の紅葉（千葉県君津市） 秋,亀山湖,紅葉の写真素材" [ref=e355]
                - text:  
              - figure [ref=e356]:
                - generic [ref=e357]: 
                - img "栃木県 日光の紅葉風景 秋,紅葉,風景の写真素材" [ref=e358]
                - text:  
              - figure [ref=e359]:
                - generic [ref=e360]: 
                - img "色づく白馬三山 紅葉,色づく,秋の写真素材" [ref=e361]
                - text:  
              - figure [ref=e363]:
                - generic [ref=e364]: 
                - img "庭に自生するムカゴ かご盛り ムカゴ,山芋の赤ちゃん,秋の写真素材" [ref=e365]
                - text:  
              - figure [ref=e366]:
                - generic [ref=e367]: 
                - img "ケヤキとハロウィン飾り/とっとり花回廊 ハロウィン飾り,ケヤキ,秋の写真素材" [ref=e368]
                - generic [ref=e370]: New
                - text:  
              - figure [ref=e371]:
                - generic [ref=e372]: 
                - img "晩秋の白馬三山 白馬三山,晩秋,秋の写真素材" [ref=e373]
                - text:  
              - figure [ref=e374]:
                - generic [ref=e375]: 
                - img "秋の宮ケ瀬湖畔園地風景２ 秋,晩秋,宮ケ瀬湖の写真素材" [ref=e376]
                - text:  
              - figure [ref=e377]:
                - generic [ref=e378]: 
                - img "秋の笹川湖＆湖畔の紅葉（千葉県・君津市） 秋,笹川湖,紅葉の写真素材" [ref=e379]
                - generic [ref=e381]: New
                - text:  
              - figure [ref=e382]:
                - generic [ref=e383]: 
                - img "秋の亀山湖・色づく湖岸の木々（君津市） 秋,亀山湖,色づくの写真素材" [ref=e384]
                - text:  
              - figure [ref=e385]:
                - generic [ref=e386]: 
                - img "青森県 蔦沼の鮮やかな秋景色 蔦沼,紅葉,秋の写真素材" [ref=e387]
                - text:  
              - figure [ref=e388]:
                - generic [ref=e389]: 
                - img "秋の亀山湖・色づく山＆橋（千葉県君津市） 秋,亀山湖,紅葉の写真素材" [ref=e390]
                - text:  
              - figure [ref=e392]:
                - generic [ref=e393]: 
                - img "秋イメージ〜紅葉に染まる山 秋イメージ,秋,山の写真素材" [ref=e394]
                - text:  
              - figure [ref=e395]:
                - generic [ref=e396]: 
                - img "秋の紅葉リフレクション 秋,太陽,光の写真素材" [ref=e397]
                - text:  
              - figure [ref=e398]:
                - generic [ref=e399]: 
                - img "青空と紅葉 秋,空,木の写真素材" [ref=e400]
                - text:  
              - figure [ref=e401]:
                - generic [ref=e402]: 
                - img "テングタケ 秋,きのこ,茶褐色の写真素材" [ref=e403]
                - generic [ref=e405]: New
                - text:  
              - figure [ref=e406]:
                - generic [ref=e407]: 
                - img "色づく白馬三山 紅葉,色づく,秋の写真素材" [ref=e408]
                - text:  
              - figure [ref=e409]:
                - generic [ref=e410]: 
                - img "滝畑の紅葉と山里を映す川の風景 滝畑,ダム,紅葉の写真素材" [ref=e411]
                - text:  
              - figure [ref=e412]:
                - generic [ref=e413]: 
                - img "秋の亀山湖・色づく湖岸の木々（君津市） 秋,亀山湖,色づくの写真素材" [ref=e414]
                - text:  
            - generic [ref=e415]:
              - generic [ref=e416]: 関連キーワード
              - link " 秋 背景" [ref=e417] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E8%83%8C%E6%99%AF&utm_source=top_keyword
                - generic [ref=e418]: 
                - text: 秋 背景
              - link " 秋 イメージ" [ref=e419] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8&utm_source=top_keyword
                - generic [ref=e420]: 
                - text: 秋 イメージ
              - link " 秋の花" [ref=e421] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B%E3%81%AE%E8%8A%B1&utm_source=top_keyword
                - generic [ref=e422]: 
                - text: 秋の花
              - link " 秋 風景" [ref=e423] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E9%A2%A8%E6%99%AF&utm_source=top_keyword
                - generic [ref=e424]: 
                - text: 秋 風景
              - link " 秋 空" [ref=e425] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E7%A9%BA&utm_source=top_keyword
                - generic [ref=e426]: 
                - text: 秋 空
              - link " 秋 フレーム" [ref=e427] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0&utm_source=top_keyword
                - generic [ref=e428]: 
                - text: 秋 フレーム
              - link " 秋の味覚" [ref=e429] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B%E3%81%AE%E5%91%B3%E8%A6%9A&utm_source=top_keyword
                - generic [ref=e430]: 
                - text: 秋の味覚
              - link " 秋 紅葉" [ref=e431] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E7%B4%85%E8%91%89&utm_source=top_keyword
                - generic [ref=e432]: 
                - text: 秋 紅葉
              - link " 秋 野菜" [ref=e433] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E9%87%8E%E8%8F%9C&utm_source=top_keyword
                - generic [ref=e434]: 
                - text: 秋 野菜
              - link " 京都 秋" [ref=e435] [cursor=pointer]:
                - /url: /main/search?q=%E4%BA%AC%E9%83%BD+%E7%A7%8B&utm_source=top_keyword
                - generic [ref=e436]: 
                - text: 京都 秋
              - link " 秋 テクスチャ" [ref=e437] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3&utm_source=top_keyword
                - generic [ref=e438]: 
                - text: 秋 テクスチャ
              - link " 秋 こども" [ref=e439] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E3%81%93%E3%81%A9%E3%82%82&utm_source=top_keyword
                - generic [ref=e440]: 
                - text: 秋 こども
              - link " 北海道 秋" [ref=e441] [cursor=pointer]:
                - /url: /main/search?q=%E5%8C%97%E6%B5%B7%E9%81%93+%E7%A7%8B&utm_source=top_keyword
                - generic [ref=e442]: 
                - text: 北海道 秋
              - link " 秋 キャンプ" [ref=e443] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%97&utm_source=top_keyword
                - generic [ref=e444]: 
                - text: 秋 キャンプ
              - link " 秋 和紙" [ref=e445] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E5%92%8C%E7%B4%99&utm_source=top_keyword
                - generic [ref=e446]: 
                - text: 秋 和紙
              - link " 秋 家族" [ref=e447] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E5%AE%B6%E6%97%8F&utm_source=top_keyword
                - generic [ref=e448]: 
                - text: 秋 家族
              - link " 秋 食材" [ref=e449] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E9%A3%9F%E6%9D%90&utm_source=top_keyword
                - generic [ref=e450]: 
                - text: 秋 食材
              - link " 秋 葉" [ref=e451] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B+%E8%91%89&utm_source=top_keyword
                - generic [ref=e452]: 
                - text: 秋 葉
              - link " 食欲の秋" [ref=e453] [cursor=pointer]:
                - /url: /main/search?q=%E9%A3%9F%E6%AC%B2%E3%81%AE%E7%A7%8B&utm_source=top_keyword
                - generic [ref=e454]: 
                - text: 食欲の秋
            - list [ref=e455]:
              - listitem [ref=e456]:
                - link "1" [ref=e457] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e458]:
                - link "2" [ref=e459] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&p=2&utm_source=top_keyword
              - listitem [ref=e460]:
                - link "3" [ref=e461] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&p=3&utm_source=top_keyword
              - listitem [ref=e462]:
                - link "4" [ref=e463] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&p=4&utm_source=top_keyword
              - listitem [ref=e464]:
                - link "5" [ref=e465] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&p=5&utm_source=top_keyword
              - listitem [ref=e466]:
                - link "6" [ref=e467] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&p=6&utm_source=top_keyword
              - listitem [ref=e468]: ...
              - listitem [ref=e469]:
                - link "次に" [ref=e470] [cursor=pointer]:
                  - /url: /main/search?q=%E7%A7%8B&p=2&utm_source=top_keyword
                  - generic [ref=e471]: 
            - generic [ref=e472]: 全938,177件中1 - 70件
            - paragraph [ref=e473]:
              - text: 「
              - strong [ref=e474]: 秋
              - text: 」のキーワードで新規投稿されたフリー写真素材・画像を掲載しております。JPEG形式の高解像度画像が無料でダウンロードできます。気に入った
              - strong [ref=e475]: 秋
              - text: の写真素材・画像が見つかったら、写真をクリックして、無料ダウンロードページへお進み下さい。高品質なロイヤリティーフリー写真素材を無料でダウンロードしていただけます。商用利用もOKなので、ビジネス写真をチラシやポスター、WEBサイトなどの広告、ポストカードや年賀状などにもご利用いただけます。クレジット表記や許可も必要ありません。
            - generic [ref=e476]:
              - generic [ref=e478]: 写真ACグループサイトの「秋」の検索結果（同じアカウントで無料ダウンロードできます）
              - img "loading" [ref=e481]
              - separator [ref=e482]
              - button "広告を非表示にする 広告を非表示にする" [ref=e487] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e488]
                - generic [ref=e489]: 広告を非表示にする
              - separator [ref=e490]
              - img "loading" [ref=e493]
              - separator [ref=e494]
              - img "loading" [ref=e497]
              - separator [ref=e498]
              - img "loading" [ref=e501]
              - separator [ref=e502]
            - generic [ref=e505]:
              - strong [ref=e506]: 写真素材リクエスト受け付け中
              - text: ※100%対応はできませんが最大限努力をいたします。
              - generic [ref=e507]:
                - textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信" [ref=e509]
                - button "素材をリクエスト" [ref=e510] [cursor=pointer]
        - text: 
      - contentinfo [ref=e512]:
        - generic [ref=e515]:
          - generic [ref=e516]: 昨日のダウンロード数：21,292
          - generic [ref=e517]: 先月のダウンロード数：1,124,624
          - generic [ref=e518]: 総会員数：1600万人を突破しました
        - generic [ref=e520]:
          - generic [ref=e521]:
            - generic [ref=e522]:
              - generic [ref=e523]: 写真ACについて 
              - list [ref=e524]:
                - listitem [ref=e525]:
                  - link "写真ACとは" [ref=e526] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e527]:
                  - link "運営会社" [ref=e528] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e529]:
                  - link "個人情報保護方針" [ref=e530] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e531]:
                  - link "特定個人情報基本方針" [ref=e532] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e533]:
                  - link "特定商取引法に基づく表記" [ref=e534] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e535]:
                  - link "サイトマップ" [ref=e536] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e537]:
                  - link "セキュリティポリシー" [ref=e538] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e539]:
              - generic [ref=e540]: 会員登録 
              - list [ref=e541]:
                - listitem [ref=e542]:
                  - link "無料会員登録" [ref=e543] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E7%2525A7%25258B%2526utm_source%253Dtop_keyword&lang=jp
                - listitem [ref=e544]:
                  - link "プレミアム会員登録" [ref=e545] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E7%2525A7%25258B%2526utm_source%253Dtop_keyword&lang=jp&fromButton=premium_action
                - listitem [ref=e546]:
                  - link "無料クリエイター会員登録" [ref=e547] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e548]:
              - generic [ref=e549]: プレミアム会員サービス 
              - list [ref=e550]:
                - listitem [ref=e551]:
                  - link "プレミアム会員登録" [ref=e552] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e553]:
                  - link "法人・複数名向けプラン" [ref=e554] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e555]:
                  - link "商品化ライセンス" [ref=e556] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e557]:
                  - link "あんしんサポート" [ref=e558] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e559]:
              - generic [ref=e560]: ヘルプ＆ガイド 
              - list [ref=e561]:
                - listitem [ref=e562]:
                  - link "ヘルプ" [ref=e563] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e564]:
                  - link "利用規約" [ref=e565] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e566]:
                  - link "プレミアム会員利用規約" [ref=e567] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e568]:
                  - link "AC写真AIラボ利用規約" [ref=e569] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e570]:
              - generic [ref=e571]: グループサイト 
              - list [ref=e572]:
                - listitem [ref=e573]:
                  - link "イラストAC" [ref=e574] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e575]:
                  - link "シルエットAC" [ref=e576] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e577]:
                  - link "フリービーAC" [ref=e578] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e579]:
                  - link "年賀状AC" [ref=e580] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e581]:
                  - link "動画AC" [ref=e582] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e583]:
                  - link "デザインAC" [ref=e584] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e585]:
                  - link "ACデータ" [ref=e586] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e587]:
                  - link "明細AC" [ref=e588] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e589]:
            - link "twitter_btn" [ref=e590] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e591]:
                - img [ref=e592]
            - link "facebook_btn" [ref=e594] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e595]:
                - generic [ref=e596]: 
            - link "pinterest_btn" [ref=e597] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e598]:
                - generic [ref=e599]: 
            - link "blog_btn" [ref=e600] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e601]:
                - generic [ref=e602]: 
            - link "feedback_modal_btn" [ref=e603] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e604]:
                - generic [ref=e605]: 
                - text: ご意見・ご要望
          - generic [ref=e607]:
            - text: © 2011-2026
            - link "写真AC" [ref=e608] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
      - generic [ref=e610]:
        - generic [ref=e611]: 無料で高品質な写真をダウンロードできます！加工や商用利用もOK！
        - link "無料ダウンロード会員登録はこちら" [ref=e612] [cursor=pointer]:
          - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fq%253D%2525E7%2525A7%25258B%2526utm_source%253Dtop_keyword&lang=jp
  - text:                   
  - generic [ref=e613] [cursor=pointer]:
    - generic:
      - paragraph: ご質問は
      - paragraph: こちらから！
    - img "chat-icon" [ref=e615]
    - generic [ref=e616]: ×
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
  54  |   async clickElement(locator: Locator, options?: { force?: boolean; noWaitAfter?: boolean }): Promise<void> {
  55  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  56  |     const clickOpts = {
  57  |       ...(options?.force ? { force: true } : {}),
  58  |       ...(options?.noWaitAfter ? { noWaitAfter: true } : {}),
  59  |     };
  60  |     if (options?.force || options?.noWaitAfter) {
  61  |       await locator.click(clickOpts);
  62  |     } else {
  63  |       await locator.click(clickOpts).catch(async () => {
> 64  |         await locator.click({ force: true, ...(options?.noWaitAfter ? { noWaitAfter: true } : {}) });
      |                       ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  65  |       });
  66  |     }
  67  |   }
  68  | 
  69  |   /**
  70  |    * Fill an input field — clears existing value first.
  71  |    * @param locator - Playwright Locator for the input
  72  |    * @param value - Text to type into the field
  73  |    */
  74  |   async fillInput(locator: Locator, value: string): Promise<void> {
  75  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  76  |     await locator.fill('');
  77  |     await locator.fill(value);
  78  |   }
  79  | 
  80  |   /**
  81  |    * Get trimmed text content of an element.
  82  |    * @param locator - Playwright Locator
  83  |    * @returns Text content string
  84  |    */
  85  |   async getText(locator: Locator): Promise<string> {
  86  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  87  |     return (await locator.textContent())?.trim() ?? '';
  88  |   }
  89  | 
  90  |   /**
  91  |    * Get the value of an input element.
  92  |    * @param locator - Playwright Locator for the input
  93  |    */
  94  |   async getInputValue(locator: Locator): Promise<string> {
  95  |     return locator.inputValue();
  96  |   }
  97  | 
  98  |   /**
  99  |    * Check if an element is visible on the page.
  100 |    * @param locator - Playwright Locator
  101 |    * @returns true if visible, false otherwise
  102 |    */
  103 |   async isVisible(locator: Locator): Promise<boolean> {
  104 |     return locator.isVisible();
  105 |   }
  106 | 
  107 |   /**
  108 |    * Wait for an element to become visible within timeout.
  109 |    * @param locator - Playwright Locator
  110 |    * @param timeout - Optional custom timeout in ms
  111 |    */
  112 |   async waitForElement(locator: Locator, timeout?: number): Promise<void> {
  113 |     await expect(locator).toBeVisible({ timeout });
  114 |   }
  115 | 
  116 |   /**
  117 |    * Wait for page loading overlay icon to disappear (hidden or detached).
  118 |    * @param timeout - Optional custom timeout in ms (default: 25_000)
  119 |    */
  120 |   async waitForPageLoadingIconHidden(timeout: number = 25_000): Promise<void> {
  121 |     await this.pageLoadingIcon.waitFor({ state: 'hidden', timeout }).catch(() => {});
  122 |   }
  123 | 
  124 |   /**
  125 |    * Select an option in a <select> dropdown by visible text.
  126 |    * @param locator - Playwright Locator for the select element
  127 |    * @param label - Visible text of the option to select
  128 |    */
  129 |   async selectOption(locator: Locator, label: string): Promise<void> {
  130 |     await expect(locator).toBeVisible();
  131 |     await locator.selectOption({ label });
  132 |   }
  133 | 
  134 |   /**
  135 |    * Check a checkbox if it is not already checked.
  136 |    * @param locator - Playwright Locator for the checkbox
  137 |    */
  138 |   async checkCheckbox(locator: Locator): Promise<void> {
  139 |     if (!(await locator.isChecked())) {
  140 |       await locator.check();
  141 |     }
  142 |   }
  143 | 
  144 |   /**
  145 |    * Uncheck a checkbox if it is currently checked.
  146 |    * @param locator - Playwright Locator for the checkbox
  147 |    */
  148 |   async uncheckCheckbox(locator: Locator): Promise<void> {
  149 |     if (await locator.isChecked()) {
  150 |       await locator.uncheck();
  151 |     }
  152 |   }
  153 | 
  154 |   // ─── URL and Title ───────────────────────────────────────────────────────
  155 | 
  156 |   /**
  157 |    * Get current page URL.
  158 |    */
  159 |   getCurrentUrl(): string {
  160 |     return this.page.url();
  161 |   }
  162 | 
  163 |   /**
  164 |    * Get current page title.
```