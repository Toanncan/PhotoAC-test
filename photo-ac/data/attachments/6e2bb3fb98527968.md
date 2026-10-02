# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile/search-mobile.spec.ts >> Search Feature — Mobile (Guest User) >> TC-SEARCH-MOBILE-003: Sắp xếp theo ngày phát hành (新着順) qua Drawer trên Mobile @regression @mobile @guest
- Location: photo-ac/src/tests/mobile/search-mobile.spec.ts:91:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('a.d-1024-none:has-text("詳細検索"), a.d-1024-none[role="button"]').first() to be visible
    42 × locator resolved to hidden <a role="button" href="javascript:void(0);" onclick="showMobileFixedFilter();" class="border-left border-right-0 border-a2a5a8 on-hover-e6e6e6 shadow-none min-width-90 max-width-90 text-center font-size-12 btn d-flex justify-content-center align-items-center position-static ac-px-2 d-1024-none">…</a>

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/search?by_ai=0&q=flower&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all"
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
                - text: 
                - button "AI Search is off" [disabled] [ref=e21]:
                  - img "AI Search is off" [ref=e22]
                - text: 
                - generic [ref=e23]:
                  - searchbox "キーワード（例：女性）" [ref=e24]: flower
                  - button "リセット" [ref=e25] [cursor=pointer]:
                    - img [ref=e27]
                  - generic [ref=e29]: flower
                - link "upload file" [ref=e31] [cursor=pointer]:
                  - /url: "#"
                  - generic [ref=e32]: 
                - button "search_btn" [ref=e33] [cursor=pointer]:
                  - generic [ref=e34]: 
              - button "カテゴリー " [ref=e36] [cursor=pointer]:
                - text: カテゴリー
                - generic [ref=e37]: 
        - generic [ref=e39]:
          - generic [ref=e40]:
            - button "会員登録（無料）" [ref=e41] [cursor=pointer]
            - text: 
          - button "ログイン" [ref=e43] [cursor=pointer]:
            - generic [ref=e44]: 
            - text: ログイン
          - button "クリックしてACアプリケーションのリストを表示" [ref=e46] [cursor=pointer]:
            - img [ref=e47]
    - text: 
  - text:      
  - generic:      
  - text:     
  - generic [ref=e49]:
    - generic [ref=e52]:
      - generic "ボタンホーム" [ref=e53]:
        - link "ホーム" [ref=e54] [cursor=pointer]:
          - /url: /
          - img [ref=e55]
      - generic "ボタンフォロー" [ref=e57]:
        - link "ファン登録" [ref=e58] [cursor=pointer]:
          - /url: /user/following/
          - generic [ref=e59]: 
      - generic "ボタンブックマーク" [ref=e60]:
        - link "コレクション" [ref=e61] [cursor=pointer]:
          - /url: /user/bookmarks/
          - generic [ref=e62]: 
      - img [ref=e67] [cursor=pointer]
    - generic [ref=e72]:
      - generic [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - navigation "breadcrumb" [ref=e79]:
              - list [ref=e80]:
                - listitem [ref=e81]:
                  - link "写真AC" [ref=e82] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e83]:
                  - text: /
                  - link "flower" [ref=e84] [cursor=pointer]:
                    - /url: /main/search?q=flower
            - generic [ref=e87]:
              - button "広告を非表示にする 広告を非表示にする" [ref=e89] [cursor=pointer]:
                - img "広告を非表示にする" [ref=e90]
                - generic [ref=e91]: 広告を非表示にする
              - iframe [ref=e94]:
                
            - generic [ref=e95]:
              - heading "「flower」の写真素材" [level=1] [ref=e96]
              - text: 1,801,813点
          - generic [ref=e99]:
            - button "検索" [ref=e100] [cursor=pointer]
            - generic [ref=e101]:
              - generic [ref=e103]:
                - generic [ref=e104]: 検索フィルター
                - generic [ref=e105]:
                  - button "カテゴリー " [ref=e106] [cursor=pointer]:
                    - text: カテゴリー
                    - generic [ref=e107]: 
                  - text:  
                - button "ファイル・向き " [ref=e109] [cursor=pointer]:
                  - text: ファイル・向き
                  - generic [ref=e110]: 
                - button "色 " [ref=e112] [cursor=pointer]:
                  - generic [ref=e114]: 色
                  - generic [ref=e115]: 
                - generic [ref=e116]:
                  - button "人物指定 " [ref=e117] [cursor=pointer]:
                    - text: 人物指定
                    - generic [ref=e118]: 
                  - generic [ref=e119]:
                    - generic [ref=e120]: モデル人数
                    - generic [ref=e121]:
                      - generic [ref=e123]:
                        - radio "全て" [checked] [ref=e124] [cursor=pointer]
                        - generic [ref=e125] [cursor=pointer]: 全て
                      - generic [ref=e127]:
                        - radio "無人" [ref=e128] [cursor=pointer]
                        - generic [ref=e129] [cursor=pointer]: 無人
                    - generic [ref=e130]:
                      - generic [ref=e132]:
                        - radio "1人" [ref=e133] [cursor=pointer]
                        - generic [ref=e134] [cursor=pointer]: 1人
                      - generic [ref=e136]:
                        - radio "2人" [ref=e137] [cursor=pointer]
                        - generic [ref=e138] [cursor=pointer]: 2人
                      - generic [ref=e140]:
                        - radio "3人以上" [ref=e141] [cursor=pointer]
                        - generic [ref=e142] [cursor=pointer]: 3人以上
                    - separator [ref=e143]
                    - generic [ref=e144]: モデル年代
                    - generic [ref=e145]:
                      - generic [ref=e147]:
                        - radio "全ての年代" [checked] [ref=e148] [cursor=pointer]
                        - generic [ref=e149] [cursor=pointer]: 全ての年代
                      - generic [ref=e151]:
                        - radio "赤ちゃん" [ref=e152] [cursor=pointer]
                        - generic [ref=e153] [cursor=pointer]: 赤ちゃん
                      - generic [ref=e155]:
                        - radio "子供" [ref=e156] [cursor=pointer]
                        - generic [ref=e157] [cursor=pointer]: 子供
                      - generic [ref=e159]:
                        - radio "若者" [ref=e160] [cursor=pointer]
                        - generic [ref=e161] [cursor=pointer]: 若者
                      - generic [ref=e163]:
                        - radio "大人" [ref=e164] [cursor=pointer]
                        - generic [ref=e165] [cursor=pointer]: 大人
                      - generic [ref=e167]:
                        - radio "中高年" [ref=e168] [cursor=pointer]
                        - generic [ref=e169] [cursor=pointer]: 中高年
                      - generic [ref=e171]:
                        - radio "高齢者" [ref=e172] [cursor=pointer]
                        - generic [ref=e173] [cursor=pointer]: 高齢者
                - button "除外キーワード " [ref=e175] [cursor=pointer]:
                  - text: 除外キーワード
                  - generic [ref=e176]: 
                - button "詳細検索 " [ref=e178] [cursor=pointer]:
                  - text: 詳細検索
                  - generic [ref=e179]: 
                - button "表示条件 " [ref=e181] [cursor=pointer]:
                  - text: 表示条件
                  - generic [ref=e182]: 
              - button "関連性の高い順／70件表示 " [ref=e187] [cursor=pointer]:
                - text: 関連性の高い順／70件表示
                - generic [ref=e188]: 
          - generic [ref=e189]:
            - generic [ref=e190]:
              - figure [ref=e191]:
                - generic [ref=e192]: 
                - img "花 花壇 花,花壇,白い花の写真素材" [ref=e193]
                - text:  
              - figure [ref=e194]:
                - generic [ref=e195]:
                  - button "広告を非表示にする 広告を非表示にする" [ref=e197] [cursor=pointer]:
                    - img "広告を非表示にする" [ref=e198]
                    - generic [ref=e199]: 広告を非表示にする
                  - iframe [ref=e202]:
                    
              - figure [ref=e203]:
                - generic [ref=e204]: 
                - img "ネモフィラが 自然,景色,お花の写真素材" [ref=e205]
                - text:  
              - figure [ref=e206]:
                - generic [ref=e207]: 
                - img "ネモフィラ 自然,景色,お花の写真素材" [ref=e208]
                - text:  
              - figure [ref=e209]:
                - generic [ref=e210]: 
                - img "水元公園の蓮 蓮,ハス,花の写真素材" [ref=e211]
                - text:  
              - figure [ref=e212]:
                - generic [ref=e213]: 
                - img "リビングストンデージー リビングストンデージー,花,花畑の写真素材" [ref=e214]
                - text:  
              - figure [ref=e215]:
                - generic [ref=e216]: 
                - img "美しい花 ルドベキア,花,flowerの写真素材" [ref=e217]
                - text:  
              - figure [ref=e218]:
                - generic [ref=e219]: 
                - img "白とピンクのユリの花 自然,花,ユリの写真素材" [ref=e220]
                - text:  
              - figure [ref=e221]:
                - generic [ref=e222]: 
                - img "北海道⑨～四季彩の丘～ 北海道,花畑,花の写真素材" [ref=e223]
                - generic [ref=e225]: New
                - text:  
              - figure [ref=e226]:
                - generic [ref=e227]:
                  - button "広告を非表示にする 広告を非表示にする" [ref=e229] [cursor=pointer]:
                    - img "広告を非表示にする" [ref=e230]
                    - generic [ref=e231]: 広告を非表示にする
                  - iframe [ref=e234]:
                    
              - figure [ref=e235]:
                - generic [ref=e236]: 
                - img "セルリアの花（生花） セルリア,花,切り花の写真素材" [ref=e237]
                - text:  
              - figure [ref=e238]:
                - generic [ref=e239]: 
                - img "リビングストンデージー リビングストンデージー,花,花畑の写真素材" [ref=e240]
                - text:  
              - figure [ref=e241]:
                - generic [ref=e242]: 
                - img "ピンクの花手水 花手水,フラワー,flowerの写真素材" [ref=e243]
                - text:  
              - figure [ref=e244]:
                - generic [ref=e245]: 
                - img "花★スプレーマム（風車菊） スプレーマム,風車菊,フラワーの写真素材" [ref=e246]
                - text:  
              - figure [ref=e247]:
                - generic [ref=e248]: 
                - img "満開の黄色い菊 菊,黄色い花,花の写真素材" [ref=e249]
                - text:  
              - figure [ref=e250]:
                - generic [ref=e251]: 
                - img "水元公園の蓮 蓮,ハス,花の写真素材" [ref=e252]
                - text:  
              - figure [ref=e253]:
                - generic [ref=e254]: 
                - img "ひまわり 向日葵,花,植物の写真素材" [ref=e255]
                - text:  
              - figure [ref=e257]:
                - generic [ref=e258]: 
                - img "チューリップ畑 チューリップ,春,背景の写真素材" [ref=e259]
                - text:  
              - figure [ref=e260]:
                - generic [ref=e261]: 
                - img "黄色い菊の花 菊,黄色い花,花の写真素材" [ref=e262]
                - text:  
              - figure [ref=e263]:
                - generic [ref=e264]: 
                - img "満開に咲く白いヤマボウシの花 ヤマボウシ,花,白の写真素材" [ref=e265]
                - text:  
              - figure [ref=e266]:
                - generic [ref=e267]: 
                - img "北海道⑫～四季彩の丘～ 北海道,花畑,花の写真素材" [ref=e268]
                - generic [ref=e270]: New
                - text:  
              - figure [ref=e271]:
                - generic [ref=e272]: 
                - img "ネモフィラ 自然,景色,お花の写真素材" [ref=e273]
                - text:  
              - figure [ref=e274]:
                - generic [ref=e275]: 
                - img "北海道⑰ ～四季彩の丘～ 北海道,花畑,花の写真素材" [ref=e276]
                - generic [ref=e278]: New
                - text:  
              - figure [ref=e279]:
                - generic [ref=e280]: 
                - img "彼岸花 彼岸花,赤い花,お花の写真素材" [ref=e281]
                - text:  
              - figure [ref=e282]:
                - generic [ref=e283]: 
                - img "花★ガーデンマム（洋菊） ガーデンマム,洋菊,フラワーの写真素材" [ref=e284]
                - text:  
              - figure [ref=e286]:
                - generic [ref=e287]: 
                - img "花畑とうさぎ 花,flower,春の写真素材" [ref=e288]
                - text:  
              - figure [ref=e289]:
                - generic [ref=e290]: 
                - img "小花 小花,花,フラワーの写真素材" [ref=e291]
                - text:  
              - figure [ref=e292]:
                - generic [ref=e293]: 
                - img "花手水 いろいろな花 花手水,いろいろな花,花アートの写真素材" [ref=e294]
                - text:  
              - figure [ref=e295]:
                - generic [ref=e296]: 
                - img "デイジー デイジー,クリサンセマム,ノースポールの写真素材" [ref=e297]
                - text:  
              - figure [ref=e298]:
                - generic [ref=e299]: 
                - img "椿の花 椿,花,赤い花の写真素材" [ref=e300]
                - text:  
              - figure [ref=e301]:
                - generic [ref=e302]: 
                - img "ペチュニアの花 ペチュニア,花,植物の写真素材" [ref=e303]
                - text:  
              - figure [ref=e304]:
                - generic [ref=e305]: 
                - img "ガーベラ ガーベラ,花,フラワーの写真素材" [ref=e306]
                - text:  
              - figure [ref=e307]:
                - generic [ref=e308]: 
                - img "結婚記念日 花,flower,結婚記念日の写真素材" [ref=e309]
                - generic [ref=e311]: New
                - text:  
              - figure [ref=e313]:
                - generic [ref=e314]: 
                - img "花手水 HANA・BIYORI 菊,花手水,アジサイの写真素材" [ref=e315]
                - text:  
              - figure [ref=e316]:
                - generic [ref=e317]: 
                - img "花★トレニア（ナツスミレ） トレニア,ナツスミレ,フラワーの写真素材" [ref=e318]
                - text:  
              - figure [ref=e319]:
                - generic [ref=e320]: 
                - img "植物★アロエ グリーン アロエ,グリーン,フラワーの写真素材" [ref=e321]
                - text:  
              - figure [ref=e322]:
                - generic [ref=e323]: 
                - img "北海道⑩ ～四季彩の丘～ 北海道,花畑,花の写真素材" [ref=e324]
                - generic [ref=e326]: New
                - text:  
              - figure [ref=e327]:
                - generic [ref=e328]: 
                - img "花★アゲラタム（カッコウアザミ） アゲラタム,カッコウアザミ,フラワーの写真素材" [ref=e329]
                - text:  
              - figure [ref=e330]:
                - generic [ref=e331]: 
                - img "夏水仙 ピンク,花,夏水仙の写真素材" [ref=e332]
                - text:  
              - figure [ref=e333]:
                - generic [ref=e334]: 
                - img "アネモネの花 アネモネ,花,赤い花の写真素材" [ref=e335]
                - text:  
              - figure [ref=e336]:
                - generic [ref=e337]: 
                - img "智光山公園花菖蒲まつり 花菖蒲まつり,智光山公園,花菖蒲園の写真素材" [ref=e338]
                - text:  
              - figure [ref=e340]:
                - generic [ref=e341]: 
                - img "造花 造花,花,はなの写真素材" [ref=e342]
                - text:  
              - figure [ref=e343]:
                - generic [ref=e344]: 
                - img "ひまわり 向日葵,植物,花の写真素材" [ref=e345]
                - text:  
              - figure [ref=e346]:
                - generic [ref=e347]: 
                - img "花クローズアップ 花,クローズアップ,植物の写真素材" [ref=e348]
                - text:  
              - figure [ref=e349]:
                - generic [ref=e350]: 
                - img "花★ニチニチソウ（日々草） ニチニチソウ,日々草,フラワーの写真素材" [ref=e351]
                - text:  
              - figure [ref=e352]:
                - generic [ref=e353]: 
                - img "ピンクのユリの花 自然,花,ユリの写真素材" [ref=e354]
                - text:  
              - figure [ref=e355]:
                - generic [ref=e356]: 
                - img "水面に浮かぶ花 花,水面,水の写真素材" [ref=e357]
                - text:  
              - figure [ref=e358]:
                - generic [ref=e359]: 
                - img "ルドベキアソレリアグリーンです ルドベキア,花,flowerの写真素材" [ref=e360]
                - text:  
              - figure [ref=e361]:
                - generic [ref=e362]: 
                - img "濃いピンクのバラ flower,rose,花の写真素材" [ref=e363]
                - text:  
              - figure [ref=e365]:
                - generic [ref=e366]: 
                - img "朱色(オレンジ)の珍しいユリの花 自然,花,ユリの写真素材" [ref=e367]
                - text:  
              - figure [ref=e368]:
                - generic [ref=e369]: 
                - img "夾竹桃38 夾竹桃,花,自然の写真素材" [ref=e370]
                - text:  
              - figure [ref=e371]:
                - generic [ref=e372]: 
                - img "マーガレット マーガレット,花,草の写真素材" [ref=e373]
                - text:  
              - figure [ref=e374]:
                - generic [ref=e375]: 
                - img "カンボジアのお供えのハスの白い花 ハス,蓮,花の写真素材" [ref=e376]
                - text:  
              - figure [ref=e377]:
                - generic [ref=e378]: 
                - img "造花 造花,花,はなの写真素材" [ref=e379]
                - text:  
              - figure [ref=e380]:
                - generic [ref=e381]: 
                - img "花★ニチニチソウ（日々草） ニチニチソウ,日々草,フラワーの写真素材" [ref=e382]
                - text:  
              - figure [ref=e383]:
                - generic [ref=e384]: 
                - img "ユリの花が咲き乱れる花畑 自然,花,ユリの写真素材" [ref=e385]
                - text:  
              - figure [ref=e386]:
                - generic [ref=e387]: 
                - img "紫の額紫陽花 額紫陽花,紫陽花,梅雨の写真素材" [ref=e388]
                - generic [ref=e390]: New
                - text:  
              - figure [ref=e392]:
                - generic [ref=e393]: 
                - img "造花のひまわりとすいか 造花,ひまわり,フェイクフラワーの写真素材" [ref=e394]
                - text:  
              - figure [ref=e395]:
                - generic [ref=e396]: 
                - img "黄色のユリの花 自然,花,ユリの写真素材" [ref=e397]
                - text:  
              - figure [ref=e398]:
                - generic [ref=e399]: 
                - img "ピンクの花 フラワー,自然,flowerの写真素材" [ref=e400]
                - text:  
              - figure [ref=e401]:
                - generic [ref=e402]: 
                - img "チューリップ畑 チューリップ,春,背景の写真素材" [ref=e403]
                - text:  
              - figure [ref=e404]:
                - generic [ref=e405]: 
                - img "かわいいヒマワリたち ビーグル,ジャックラッセルテリア,中型犬の写真素材" [ref=e406]
                - text:  
              - figure [ref=e407]:
                - generic [ref=e408]: 
                - img "バスケットに入っている赤い花 花,flower,赤い花の写真素材" [ref=e409]
                - text:  
              - figure [ref=e410]:
                - generic [ref=e411]: 
                - img "木陰で咲く可憐な朝倉山茶花 朝倉山茶花,庭花,木花の写真素材" [ref=e412]
                - text:  
              - figure [ref=e413]:
                - generic [ref=e414]: 
                - img "北海道⑯ ～四季彩の丘～ 北海道,花畑,花の写真素材" [ref=e415]
                - generic [ref=e417]: New
                - text:  
              - figure [ref=e419]:
                - generic [ref=e420]: 
                - img "お部屋を彩る美しい花 フラワーアレンジメント,ばら,薔薇の写真素材" [ref=e421]
                - text:  
              - figure [ref=e422]:
                - generic [ref=e423]: 
                - img "赤いシクラメンのような花 花,自然,植物の写真素材" [ref=e424]
                - text:  
              - figure [ref=e425]:
                - generic [ref=e426]: 
                - img "能護寺のアジサイ アジサイ,紫陽花,花の写真素材" [ref=e427]
                - text:  
              - figure [ref=e428]:
                - generic [ref=e429]: 
                - img "ピンクの実がなっている東南アジアの花 花,自然,植物の写真素材" [ref=e430]
                - text:  
              - figure [ref=e431]:
                - generic [ref=e432]: 
                - img "花クローズアップ 花,クローズアップ,植物の写真素材" [ref=e433]
                - text:  
              - figure [ref=e434]:
                - generic [ref=e435]: 
                - img "北海道⑮～四季彩の丘～ 北海道,花畑,花の写真素材" [ref=e436]
                - generic [ref=e438]: New
                - text:  
              - figure [ref=e439]:
                - generic [ref=e440]: 
                - img "北熊井城址入り口の花桃 北熊井城址,花桃,花の写真素材" [ref=e441]
                - text:  
            - text:  
            - list [ref=e442]:
              - listitem [ref=e443]:
                - link "1" [ref=e444] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e445]:
                - link "2" [ref=e446] [cursor=pointer]:
                  - /url: /main/search?q=flower&p=2
              - listitem [ref=e447]:
                - link "3" [ref=e448] [cursor=pointer]:
                  - /url: /main/search?q=flower&p=3
              - listitem [ref=e449]:
                - link "4" [ref=e450] [cursor=pointer]:
                  - /url: /main/search?q=flower&p=4
              - listitem [ref=e451]:
                - link "5" [ref=e452] [cursor=pointer]:
                  - /url: /main/search?q=flower&p=5
              - listitem [ref=e453]:
                - link "6" [ref=e454] [cursor=pointer]:
                  - /url: /main/search?q=flower&p=6
              - listitem [ref=e455]: ...
              - listitem [ref=e456]:
                - link "次に" [ref=e457] [cursor=pointer]:
                  - /url: /main/search?q=flower&p=2
                  - generic [ref=e458]: 
            - generic [ref=e459]: 全1,801,813件中1 - 70件
            - paragraph [ref=e460]:
              - text: 「
              - strong [ref=e461]: flower
              - text: 」のキーワードで新規投稿されたフリー写真素材・画像を掲載しております。JPEG形式の高解像度画像が無料でダウンロードできます。気に入った
              - strong [ref=e462]: flower
              - text: の写真素材・画像が見つかったら、写真をクリックして、無料ダウンロードページへお進み下さい。高品質なロイヤリティーフリー写真素材を無料でダウンロードしていただけます。商用利用もOKなので、ビジネス写真をチラシやポスター、WEBサイトなどの広告、ポストカードや年賀状などにもご利用いただけます。クレジット表記や許可も必要ありません。
            - generic [ref=e463]:
              - generic [ref=e465]: 写真ACグループサイトの「flower」の検索結果（同じアカウントで無料ダウンロードできます）
              - img "loading" [ref=e468]
              - separator [ref=e469]
              - generic [ref=e472]:
                - button "広告を非表示にする 広告を非表示にする" [ref=e474] [cursor=pointer]:
                  - img "広告を非表示にする" [ref=e475]
                  - generic [ref=e476]: 広告を非表示にする
                - iframe [ref=e479]:
                  
              - separator [ref=e480]
              - img "loading" [ref=e483]
              - separator [ref=e484]
              - img "loading" [ref=e487]
              - separator [ref=e488]
              - img "loading" [ref=e491]
              - separator [ref=e492]
            - generic [ref=e495]:
              - strong [ref=e496]: 写真素材リクエスト受け付け中
              - text: ※100%対応はできませんが最大限努力をいたします。
              - generic [ref=e497]:
                - textbox "リクエストしたいキーワードを入力（例：掃除をする人） リクエストを送信" [ref=e499]
                - button "素材をリクエスト" [ref=e500] [cursor=pointer]
        - text: 
      - contentinfo [ref=e502]:
        - generic [ref=e505]:
          - generic [ref=e506]: 昨日のダウンロード数：43,960
          - generic [ref=e507]: 先月のダウンロード数：1,124,624
          - generic [ref=e508]: 総会員数：1600万人を突破しました
        - generic [ref=e510]:
          - generic [ref=e511]:
            - generic [ref=e512]:
              - generic [ref=e513]: 写真ACについて 
              - list [ref=e514]:
                - listitem [ref=e515]:
                  - link "写真ACとは" [ref=e516] [cursor=pointer]:
                    - /url: /main/guide/
                - listitem [ref=e517]:
                  - link "運営会社" [ref=e518] [cursor=pointer]:
                    - /url: /main/about/
                - listitem [ref=e519]:
                  - link "個人情報保護方針" [ref=e520] [cursor=pointer]:
                    - /url: /main/privacy/
                - listitem [ref=e521]:
                  - link "特定個人情報基本方針" [ref=e522] [cursor=pointer]:
                    - /url: /main/policy_personal_info/
                - listitem [ref=e523]:
                  - link "特定商取引法に基づく表記" [ref=e524] [cursor=pointer]:
                    - /url: /main/commercial_transactions/
                - listitem [ref=e525]:
                  - link "サイトマップ" [ref=e526] [cursor=pointer]:
                    - /url: /main/sitemap
                - listitem [ref=e527]:
                  - link "セキュリティポリシー" [ref=e528] [cursor=pointer]:
                    - /url: https://acworks.co.jp/security-policy/
            - generic [ref=e529]:
              - generic [ref=e530]: 会員登録 
              - list [ref=e531]:
                - listitem [ref=e532]:
                  - link "無料会員登録" [ref=e533] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fby_ai%253D0%2526q%253Dflower%2526srt%253Ddlrank%2526nq%253D%2526exclude_ai%253Don%2526orientation%253Dall%2526sizesec%253Dall%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526color%253Dall%2526model_count%253D-1%2526age%253Dall%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall&lang=jp
                - listitem [ref=e534]:
                  - link "プレミアム会員登録" [ref=e535] [cursor=pointer]:
                    - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fby_ai%253D0%2526q%253Dflower%2526srt%253Ddlrank%2526nq%253D%2526exclude_ai%253Don%2526orientation%253Dall%2526sizesec%253Dall%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526color%253Dall%2526model_count%253D-1%2526age%253Dall%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall&lang=jp&fromButton=premium_action
                - listitem [ref=e536]:
                  - link "無料クリエイター会員登録" [ref=e537] [cursor=pointer]:
                    - /url: /creator/auth/register
            - generic [ref=e538]:
              - generic [ref=e539]: プレミアム会員サービス 
              - list [ref=e540]:
                - listitem [ref=e541]:
                  - link "プレミアム会員登録" [ref=e542] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
                - listitem [ref=e543]:
                  - link "法人・複数名向けプラン" [ref=e544] [cursor=pointer]:
                    - /url: https://test-lien.photo-ac.com/premium/business
                - listitem [ref=e545]:
                  - link "商品化ライセンス" [ref=e546] [cursor=pointer]:
                    - /url: /main/extra_license_terms/
                - listitem [ref=e547]:
                  - link "あんしんサポート" [ref=e548] [cursor=pointer]:
                    - /url: /indemnity/
            - generic [ref=e549]:
              - generic [ref=e550]: ヘルプ＆ガイド 
              - list [ref=e551]:
                - listitem [ref=e552]:
                  - link "ヘルプ" [ref=e553] [cursor=pointer]:
                    - /url: https://help.freebie-ac.jp/
                - listitem [ref=e554]:
                  - link "利用規約" [ref=e555] [cursor=pointer]:
                    - /url: /main/terms/
                - listitem [ref=e556]:
                  - link "プレミアム会員利用規約" [ref=e557] [cursor=pointer]:
                    - /url: /main/terms_premium/
                - listitem [ref=e558]:
                  - link "AC写真AIラボ利用規約" [ref=e559] [cursor=pointer]:
                    - /url: /image-generator/terms
            - generic [ref=e560]:
              - generic [ref=e561]: グループサイト 
              - list [ref=e562]:
                - listitem [ref=e563]:
                  - link "イラストAC" [ref=e564] [cursor=pointer]:
                    - /url: https://www.ac-illust.com/
                - listitem [ref=e565]:
                  - link "シルエットAC" [ref=e566] [cursor=pointer]:
                    - /url: https://www.silhouette-ac.com/
                - listitem [ref=e567]:
                  - link "フリービーAC" [ref=e568] [cursor=pointer]:
                    - /url: https://www.freebie-ac.jp/
                - listitem [ref=e569]:
                  - link "年賀状AC" [ref=e570] [cursor=pointer]:
                    - /url: https://www.new-year.bz/
                - listitem [ref=e571]:
                  - link "動画AC" [ref=e572] [cursor=pointer]:
                    - /url: https://video-ac.com
                - listitem [ref=e573]:
                  - link "デザインAC" [ref=e574] [cursor=pointer]:
                    - /url: https://www.design-ac.net/
                - listitem [ref=e575]:
                  - link "ACデータ" [ref=e576] [cursor=pointer]:
                    - /url: https://ac-data.info/
                - listitem [ref=e577]:
                  - link "明細AC" [ref=e578] [cursor=pointer]:
                    - /url: https://meisai-ac.com/
          - generic [ref=e579]:
            - link "twitter_btn" [ref=e580] [cursor=pointer]:
              - /url: https://x.com/ACworks2011
              - button "twitter_btn" [ref=e581]:
                - img [ref=e582]
            - link "facebook_btn" [ref=e584] [cursor=pointer]:
              - /url: https://www.facebook.com/ACworks2011/
              - button "facebook_btn" [ref=e585]:
                - generic [ref=e586]: 
            - link "pinterest_btn" [ref=e587] [cursor=pointer]:
              - /url: https://www.pinterest.jp/acworks/
              - button "pinterest_btn" [ref=e588]:
                - generic [ref=e589]: 
            - link "blog_btn" [ref=e590] [cursor=pointer]:
              - /url: http://blog.acworks.co.jp/
              - button "blog_btn" [ref=e591]:
                - generic [ref=e592]: 
            - link "feedback_modal_btn" [ref=e593] [cursor=pointer]:
              - /url: "#feedbackModal"
              - button "feedback_modal_btn" [ref=e594]:
                - generic [ref=e595]: 
                - text: ご意見・ご要望
          - generic [ref=e597]:
            - text: © 2011-2026
            - link "写真AC" [ref=e598] [cursor=pointer]:
              - /url: https://test-lien.photo-ac.com/
      - generic [ref=e600]:
        - generic [ref=e601]: 無料で高品質な写真をダウンロードできます！加工や商用利用もOK！
        - link "無料ダウンロード会員登録はこちら" [ref=e602] [cursor=pointer]:
          - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252Fmain%252Fsearch%253Fby_ai%253D0%2526q%253Dflower%2526srt%253Ddlrank%2526nq%253D%2526exclude_ai%253Don%2526orientation%253Dall%2526sizesec%253Dall%2526creator%253D%2526ngcreator%253D%2526qid%253D%2526color%253Dall%2526model_count%253D-1%2526age%253Dall%2526mdlrlrsec%253Dall%2526prprlrsec%253Dall&lang=jp
  - text:  
  - generic [ref=e603] [cursor=pointer]:
    - generic:
      - paragraph: ご質問は
      - paragraph: こちらから！
    - img "chat-icon" [ref=e605]
    - generic [ref=e606]: ×
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
> 55  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
      |                   ^ TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
  56  |     if (options?.force) {
  57  |       await locator.click({ force: true });
  58  |     } else {
  59  |       await locator.click().catch(async () => {
  60  |         await locator.click({ force: true });
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
```