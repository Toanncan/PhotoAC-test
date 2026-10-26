# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/creator.setup.ts >> authenticate as creator
- Location: photo-ac/src/tests/auth/creator.setup.ts:6:6

# Error details

```
Error: locator.waitFor: Error: strict mode violation: getByRole('button', { name: /ログイン/ }) resolved to 4 elements:
    1) <button id="switch-sso" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" class="ac-btn ac-btn-photo">…</button> aka getByRole('button', { name: 'ログイン', exact: true })
    2) <button type="button" onclick="location.href='/creator/sns/callback?provider=Google'" class="position-relative ac-btn-sm btn-google text-white w-100 d-flex align-items-center ac-mb-1 justify-content-center">…</button> aka getByRole('button', { name: ' Googleでログイン' })
    3) <button type="button" onclick="location.href='/creator/sns/callback?provider=Twitter'" class="position-relative ac-btn-sm btn-twitter text-white w-100 d-flex align-items-center ac-mb-1 justify-content-center">…</button> aka getByRole('button', { name: 'Xでログイン' })
    4) <button type="button" onclick="location.href='/creator/sns/callback?provider=Facebook'" class="position-relative ac-btn-sm btn-facebook text-white w-100 d-flex align-items-center justify-content-center">…</button> aka getByRole('button', { name: ' Facebookでログイン' })

Call log:
  - waiting for getByRole('button', { name: /ログイン/ }) to be visible

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
    - 'link "【3DAYゲリラセール！2026年8月28日まで】 終了まで 2 日 0 7 : 4 7 : 4 2 プレミアム会員が 35 %OFF 【3DAYゲリラセール！2026年8月28日まで】" [ref=e7] [cursor=pointer]':
      - /url: https://test-lien.photo-ac.com/premium/campaign?utm_source=photoac&utm_medium=internal&utm_campaign=coupon4451&utm_content=banner_header
      - generic [ref=e8]:
        - img "【3DAYゲリラセール！2026年8月28日まで】" [ref=e9]
        - generic [ref=e10]:
          - generic [ref=e11]: 終了まで
          - generic [ref=e12]: "2"
          - generic [ref=e13]: 日
          - generic [ref=e14]: "0"
          - generic [ref=e15]: "7"
          - generic [ref=e16]: ":"
          - generic [ref=e17]: "4"
          - generic [ref=e18]: "7"
          - generic [ref=e19]: ":"
          - generic [ref=e20]: "4"
          - generic [ref=e21]: "2"
          - generic [ref=e22]: プレミアム会員が
          - generic [ref=e23]: "35"
          - generic [ref=e24]: "%OFF"
        - img "【3DAYゲリラセール！2026年8月28日まで】" [ref=e25]
    - generic [ref=e28]:
      - generic [ref=e30]:
        - link "写真AC 写真ACは写真素材が無料！ 商用利用もOK！" [ref=e31] [cursor=pointer]:
          - /url: /
          - img "写真AC" [ref=e32]
          - generic [ref=e33]:
            - paragraph [ref=e34]: 写真ACは写真素材が無料！
            - paragraph [ref=e35]: 商用利用もOK！
        - text: 
      - generic [ref=e37]:
        - generic [ref=e38]:
          - button "会員登録（無料）" [ref=e39] [cursor=pointer]
          - text: 
        - button "ログイン" [ref=e41] [cursor=pointer]:
          - generic [ref=e42]: 
          - text: ログイン
        - button "クリックしてACアプリケーションのリストを表示" [ref=e44] [cursor=pointer]:
          - img [ref=e45]
    - text: 
  - generic [ref=e47]:
    - button "閉じると開く" [ref=e48] [cursor=pointer]:
      - generic [ref=e49]: 
    - iframe [ref=e54]:
      - generic [ref=f27e6]:
        - generic [ref=f27e9] [cursor=pointer]:
          - iframe [ref=f27e10]:
            - link [ref=f36e5] [cursor=pointer]:
              - /url: https://trc.taboola.com/photoac-channel/log/3/click?pi=%2Fsafeframe%2F1-0-45%2Fhtml%2Fcontainer.html&ri=3056529a9c6ef851c996a3fc1e78cb59&sd=v2_b3067ca477a81b9221973fbe2327becf_CAESEFzhKUHNyY8U5W3BgRAloRE_1793031136_1793031136_CIi3jgYQ7Kh6GMP16Ky69rmXswEgASgMMOEBOJGkDkDb7Q9IgtbZA1DxBlgAYABoxIbm7PuHsLpscAGAAQCIAQCQAQCYAQA&ui=CAESEFzhKUHNyY8U5W3BgRAloRE&ii=~~V1~~-6647932713170921156~~OIzEDItffGbyA6DaNHU05fcUzreQwXeKJTl0ASAJJMEe79Ni-eBnd8iQ4KmvvX-QJ_U_WPEdwTm13-AZb0Ha4gsYfkiL1Zt0EoaY6-oPKse0pffI6hR9ugbeYCzsAzSeP1f1WQ57IxHOdObOKjSrPxkUYOwjBUecrbAVOzO2St4rj-m4g8xRewfYccA3MEtwozoJWVDpwDC_ozZVDXZy_ZWESpQgkUSg-g1gC5WP2EUKVEiEBtdE53S0N-XoFzAOqWiV_2T_GHAEPkDX-wTRgz42azCon-BPuJKmg7OkefUhPi4i6GJFKFeaQU6NXLMgo3v-WtoYKR7A6Xa9lkB4Cv1zgv7Giwi2fuhwQxDtGUe_gr0EFQ1t12URQJgaeiwMw7IDALkEQ4hkcR18lTwGTtCc8R2wv0cq-JP2H-VweFO9O3-M8Wb-qVc_ps6Q3cxy&it=text&pt=home&li=rbox-h2m&sig=014514bb97f3480cc4a976408b4ae974aa6e19b2b723&st=h&rap=utm_source%3Dtaboola%26utm_medium%3Ddisplay%26utm_campaign%3Dwpd2026%26tblci%3Dtbl1EKs8gAGcCiDyPzoJ6cnQbHDqAKcc1LRUoqGlqVWabd3N4KWSoEX5TRDsqHoYppj5773yoJRPIJPH78eXNCjy62Mwu42VGDi8sv7lto3z3qMBQA0%23tblcitbl1EKs8gAGcCiDyPzoJ6cnQbHDqAKcc1LRUoqGlqVWabd3N4KWSoEX5TRDsqHoYppj5773yoJRPIJPH78eXNCjy62Mwu42VGDi8sv7lto3z3qMBQA0&vi=1793031137688&p=nationalpsoriasisfoundation-sc&lti=scod&r=163&tvi48=28907&tvi50=32901&ppb=CJAHGImFBSCT6AYqP3Rlc3QtbGllbi5waG90by1hYy5jb21fUDQxMDg2NjQ3NDY0OTY5OTNfVHBvczNfdmI2MF9XNzI4X0g5MF9OMQ&cpb=GAEgnP__________ASoZbGEudGFib29sYXN5bmRpY2F0aW9uLmNvbTIIdHJjMjAyNjQ4gOzJhQxAkaQOSNvtD1CC1tkDWPEGYwj4FRDZHhgiZGMIyJwBEJfyARhDZGMI1xYQuu8BGCNkYwiBqgEQwdgBGEVkYwjjywEQ8ocCGAdkYwjSAxDgBhgIZGMIoLgBEIyGAhhKZGMIoaUBEKTRARgLZGMI77ABEOvhARgwZGMIwMcBEOKAAhhRZGMI3scBEIWBAhgyZGMI7f__________ARDt__________8BGBNkYwjs__________8BEOz__________wEYFGRjCJYUEJocGBhkYwiohQEQ7qgBGDpkYwj0FBCeHRgfZGoWTGdSRmk2TGhDeDJjX1cwRm9DaTg4d3gBgAECiAGdkhuQARyYAZPH78eXNKIBBFNDT0SqAQNTU1CyAQZHb29nbGW6AQRob21lwAHWwwTKAQJsYdABANsBEAHcAQ&cv=20261026-4-RELEASE&route=LA%3ALA%3AV&redir=https%3A%2F%2Fwww.psoriasis.org%2Fworld-psoriasis-day%3Futm_source%3Dtaboola%26utm_medium%3Ddisplay%26utm_campaign%3Dwpd2026%26utm_content%3D728x90
              - img [ref=f36e6]
          - generic [ref=f27e11]:
            - 'link "Sponsored: learn about this recommendation (opens dialog)" [ref=f27e12]':
              - /url: "https://popup.taboola.com/ko/?template=colorbox&utm_source=photoac-channel&utm_medium=referral&utm_content=HB_728x90_1x1_stream_white:test-lien.photo-ac.com_P4108664746496993_Tpos3_vb60_W728_H90_N1:"
            - 'link "Sponsored: learn about this recommendation (opens dialog)" [ref=f27e13]':
              - /url: "https://popup.taboola.com/ko/?template=colorbox&utm_source=photoac-channel&utm_medium=referral&utm_content=HB_728x90_1x1_stream_white:test-lien.photo-ac.com_P4108664746496993_Tpos3_vb60_W728_H90_N1:"
        - link "AdChoices information (opens dialog)" [ref=f27e15] [cursor=pointer]:
          - /url: "https://popup.taboola.com/ko/?template=colorbox&utm_source=photoac-channel&utm_medium=referral&utm_content=HB_728x90_1x1_stream_white:test-lien.photo-ac.com_P4108664746496993_Tpos3_vb60_W728_H90_N1:"
  - text:      
  - generic:      
  - generic [ref=e55]:
    - generic [ref=e57]:
      - button "画像で検索する" [ref=e58] [cursor=pointer]:
        - img [ref=e59]
      - generic [ref=e61]: 画像で検索する
    - separator [ref=e62]
    - generic [ref=e63]:
      - paragraph [ref=e64]: 画像から似ている画像を検索できます。
      - paragraph [ref=e65]: ※5MBまでのJPGまたはPNGファイルのみ
      - generic [ref=e66]:
        - listitem [ref=e67]:
          - img [ref=e68]
        - listitem [ref=e75]:
          - generic [ref=e76]: ファイルを選択
  - generic [ref=e77]:
    - button [ref=e79] [cursor=pointer]:
      - img [ref=e80]
    - generic [ref=e83]:
      - generic [ref=e84]:
        - button [ref=e85] [cursor=pointer]:
          - img [ref=e86]
        - textbox "キーワード（例：女性）" [ref=e89]
      - generic [ref=e90]:
        - link "文章で検索 文章で検索 文章で検索" [ref=e92] [cursor=pointer]:
          - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
          - img "文章で検索" [ref=e93]
          - text: 文章で検索
          - img "文章で検索" [ref=e94]
        - button "画像で検索" [ref=e96] [cursor=pointer]:
          - generic [ref=e97]: 
          - text: 画像で検索
    - separator [ref=e98]
    - generic [ref=e99]:
      - generic [ref=e100]: 並び順
      - generic [ref=e101]:
        - generic [ref=e102]:
          - radio "関連性の高い順" [checked] [ref=e103] [cursor=pointer]
          - generic [ref=e104] [cursor=pointer]: 関連性の高い順
        - generic [ref=e105]:
          - radio "新着順" [ref=e106] [cursor=pointer]
          - generic [ref=e107] [cursor=pointer]: 新着順
        - generic [ref=e108]:
          - radio "人気順" [disabled] [ref=e109] [cursor=pointer]
          - generic [ref=e110] [cursor=pointer]: 人気順
    - generic [ref=e112]:
      - generic [ref=e113]: カテゴリー
      - listbox [ref=e114]:
        - option "人物" [ref=e115]
        - option "ビジネス" [ref=e116]
        - option "動物・生き物" [ref=e117]
        - option "花・植物" [ref=e118]
        - option "食べ物・飲み物" [ref=e119]
        - option "町並み・建物" [ref=e120]
        - option "医療・福祉" [ref=e121]
        - option "交通・乗り物" [ref=e122]
        - option "季節・行事" [ref=e123]
        - option "自然・風景" [ref=e124]
        - option "スポーツ" [ref=e125]
        - option "エコ・環境" [ref=e126]
        - option "美容・健康" [ref=e127]
        - option "住宅・インテリア" [ref=e128]
        - option "年賀状" [ref=e129]
        - option "テクスチャ・背景" [ref=e130]
        - option "小物・雑貨" [ref=e131]
        - option "クレイアート" [ref=e132]
        - option "外国" [ref=e133]
        - option "ロマンティック" [ref=e134]
        - option "スプラッター" [ref=e135]
    - generic [ref=e137]:
      - generic [ref=e138]: 除外カテゴリー
      - listbox [ref=e139]:
        - option "人物" [ref=e140]
        - option "ビジネス" [ref=e141]
        - option "動物・生き物" [ref=e142]
        - option "花・植物" [ref=e143]
        - option "食べ物・飲み物" [ref=e144]
        - option "町並み・建物" [ref=e145]
        - option "医療・福祉" [ref=e146]
        - option "交通・乗り物" [ref=e147]
        - option "季節・行事" [ref=e148]
        - option "自然・風景" [ref=e149]
        - option "スポーツ" [ref=e150]
        - option "エコ・環境" [ref=e151]
        - option "美容・健康" [ref=e152]
        - option "住宅・インテリア" [ref=e153]
        - option "年賀状" [ref=e154]
        - option "テクスチャ・背景" [ref=e155]
        - option "小物・雑貨" [ref=e156]
        - option "クレイアート" [ref=e157]
        - option "外国" [ref=e158]
        - option "ロマンティック" [ref=e159]
        - option "スプラッター" [ref=e160]
    - generic [ref=e161]:
      - generic [ref=e162]: 除外キーワード
      - textbox "除外キーワードを入力" [ref=e163]
    - generic [ref=e165]:
      - checkbox "AI生成ツール使用素材を除く" [checked] [ref=e166] [cursor=pointer]
      - generic [ref=e167] [cursor=pointer]: AI生成ツール使用素材を除く
    - separator [ref=e168]
    - generic [ref=e169]:
      - generic [ref=e170]: 縦長・横長の選択
      - generic [ref=e171]:
        - generic [ref=e172]:
          - radio "全て" [checked] [ref=e173] [cursor=pointer]
          - generic [ref=e174] [cursor=pointer]: 全て
        - generic [ref=e175]:
          - radio "縦長" [ref=e176] [cursor=pointer]
          - generic [ref=e177] [cursor=pointer]: 縦長
        - generic [ref=e178]:
          - radio "横長" [ref=e179] [cursor=pointer]
          - generic [ref=e180] [cursor=pointer]: 横長
    - generic [ref=e181]:
      - generic [ref=e182]: 画像種別
      - combobox [ref=e183]:
        - option "全ての画像" [selected]
        - option "Mediumサイズ以上がある"
        - option "Largeサイズがある"
        - option "PSDがある"
    - generic [ref=e184]:
      - generic [ref=e185]: クリエイター名
      - textbox "クリエイター名を入力" [ref=e186]
    - generic [ref=e187]:
      - generic [ref=e188]: 除外クリエイター名
      - textbox "除外クリエイター名を入力" [ref=e189]
    - generic [ref=e190]:
      - generic [ref=e191]: 素材ID
      - textbox "素材のIDを入力" [ref=e192]
    - generic [ref=e193]:
      - generic [ref=e194]: 色
      - generic [ref=e195]:
        - generic [ref=e196]:
          - radio "全て" [checked] [ref=e197] [cursor=pointer]
          - generic [ref=e198] [cursor=pointer]: 全て
        - generic [ref=e199]:
          - generic [ref=e200]:
            - button [ref=e202] [cursor=pointer]
            - button [ref=e204] [cursor=pointer]
            - button [ref=e206] [cursor=pointer]
            - button [ref=e208] [cursor=pointer]
            - button [ref=e210] [cursor=pointer]
          - generic [ref=e211]:
            - button [ref=e213] [cursor=pointer]
            - button [ref=e215] [cursor=pointer]
            - button [ref=e217] [cursor=pointer]
            - button [ref=e219] [cursor=pointer]
            - button [ref=e221] [cursor=pointer]
          - generic [ref=e222]:
            - button [ref=e224] [cursor=pointer]
            - button [ref=e226] [cursor=pointer]
            - button [ref=e228] [cursor=pointer]
            - button [ref=e230] [cursor=pointer]
    - generic [ref=e235]:
      - generic [ref=e236]: モデル人数
      - generic [ref=e237]:
        - generic [ref=e238]:
          - radio "全て" [checked] [ref=e239] [cursor=pointer]
          - generic [ref=e240] [cursor=pointer]: 全て
        - generic [ref=e241]:
          - radio "無人" [ref=e242] [cursor=pointer]
          - generic [ref=e243] [cursor=pointer]: 無人
        - generic [ref=e244]:
          - radio "1人" [ref=e245] [cursor=pointer]
          - generic [ref=e246] [cursor=pointer]: 1人
        - generic [ref=e247]:
          - radio "2人" [ref=e248] [cursor=pointer]
          - generic [ref=e249] [cursor=pointer]: 2人
        - generic [ref=e250]:
          - radio "3人以上" [ref=e251] [cursor=pointer]
          - generic [ref=e252] [cursor=pointer]: 3人以上
    - generic [ref=e253]:
      - generic [ref=e254]: モデル年代
      - combobox [ref=e255]:
        - option "全ての年代" [selected]
        - option "赤ちゃん"
        - option "子供"
        - option "若者"
        - option "大人"
        - option "中高年"
        - option "高齢者"
    - generic [ref=e256]:
      - generic [ref=e257]: モデルリリース
      - generic [ref=e258]:
        - generic [ref=e259]:
          - radio "全て" [checked] [ref=e260] [cursor=pointer]
          - generic [ref=e261] [cursor=pointer]: 全て
        - generic [ref=e262]:
          - radio "取得済のみ" [ref=e263] [cursor=pointer]
          - generic [ref=e264] [cursor=pointer]: 取得済のみ
    - generic [ref=e265]:
      - generic [ref=e266]: プロパティリリース
      - generic [ref=e267]:
        - generic [ref=e268]:
          - radio "全て" [checked] [ref=e269] [cursor=pointer]
          - generic [ref=e270] [cursor=pointer]: 全て
        - generic [ref=e271]:
          - radio "取得済のみ" [ref=e272] [cursor=pointer]
          - generic [ref=e273] [cursor=pointer]: 取得済のみ
    - generic [ref=e274]:
      - generic [ref=e276] [cursor=pointer]: 完全一致
      - checkbox "完全一致" [ref=e278] [cursor=pointer]
    - button "検 索" [ref=e280] [cursor=pointer]
  - dialog [active] [ref=e281]:
    - document:
      - generic [ref=e282]:
        - generic [ref=e283]:
          - heading "クリエイターログイン" [level=5] [ref=e284]
          - button "Close" [ref=e285] [cursor=pointer]:
            - generic [ref=e286]: ×
        - generic [ref=e288]:
          - textbox "メールアドレス" [ref=e290]: acworks.toannguyen1@gmail.com
          - textbox "パスワード" [ref=e292]: manhtoan123
          - generic [ref=e294]:
            - generic [ref=e296]:
              - checkbox "自動ログイン" [checked] [ref=e297] [cursor=pointer]
              - generic [ref=e298] [cursor=pointer]: 自動ログイン
            - link "パスワードをお忘れの方" [ref=e300] [cursor=pointer]:
              - /url: /auth/forgotpassword
              - text: パスワードをお忘れの方
              - generic [ref=e301]: 
          - link "新規クリエイター登録はこちら" [ref=e303] [cursor=pointer]:
            - /url: /creator/auth/register
            - text: 新規クリエイター登録はこちら
            - generic [ref=e304]: 
          - button "口グイン" [ref=e305] [cursor=pointer]
          - heading "SNS でログイン" [level=6] [ref=e306]
          - generic [ref=e307]:
            - button " Googleでログイン" [ref=e308] [cursor=pointer]:
              - generic [ref=e309]: 
              - text: Googleでログイン
            - button "Xでログイン" [ref=e310] [cursor=pointer]:
              - img [ref=e311]
              - text: Xでログイン
            - button " Facebookでログイン" [ref=e313] [cursor=pointer]:
              - generic [ref=e314]: 
              - text: Facebookでログイン
  - text: 
  - generic [ref=e316]:
    - generic [ref=e317]:
      - list [ref=e319]:
        - listitem [ref=e321]:
          - img "写真AC" [ref=e322]
      - generic [ref=e323]:
        - link "designAC" [ref=e325] [cursor=pointer]:
          - /url: https://test-an.editor-ac.com/templates/search?keyword=忘年会&utm_source=photoac&utm_medium=internal&utm_campaign=seasonpopup&utm_content=topicon&utm_id=2610
          - img "designAC" [ref=e326]
        - generic [ref=e327]:
          - heading "高品質な写真が無料でダウンロードできます" [level=1] [ref=e328]
          - generic [ref=e330]:
            - heading "加工や商用利用もOK" [level=6] [ref=e332]
            - heading "モデル許可済み人物写真" [level=6] [ref=e334]
            - heading "総会員数1600万人突破" [level=6] [ref=e336]
          - generic [ref=e337]:
            - generic [ref=e338]: AI検索(β版)
            - generic [ref=e340]:
              - button "search_btn" [ref=e341] [cursor=pointer]:
                - generic [ref=e342]: 
              - button "AI Search is off" [disabled] [ref=e343]:
                - img "AI Search is off" [ref=e344]
              - searchbox "キーワード（例：女性）" [ref=e345]
              - generic [ref=e347] [cursor=pointer]:
                - text: 詳細検索
                - generic: ▼
              - link "画像検索" [ref=e349] [cursor=pointer]:
                - /url: "#"
                - generic [ref=e350]:
                  - generic [ref=e351]: 
                  - generic [ref=e352]: 画像検索
          - generic [ref=e353]:
            - link "ビジネス" [ref=e354] [cursor=pointer]:
              - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
              - img [ref=e355]
              - text: ビジネス
            - link "女性" [ref=e357] [cursor=pointer]:
              - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
              - img [ref=e358]
              - text: 女性
            - link "紅葉" [ref=e360] [cursor=pointer]:
              - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
              - img [ref=e361]
              - text: 紅葉
            - link "cat" [ref=e363] [cursor=pointer]:
              - /url: /main/search?q=cat&utm_source=top_keyword
              - img [ref=e364]
              - text: cat
            - link "背景" [ref=e366] [cursor=pointer]:
              - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - img [ref=e367]
              - text: 背景
    - generic [ref=e370]:
      - link "写真AC 人気日本人モデル" [ref=e372] [cursor=pointer]:
        - /url: https://www.photo-ac.com/models/
        - img "写真AC" [ref=e373]
        - generic [ref=e374]: 人気日本人モデル
      - link "写真AC 紅葉" [ref=e376] [cursor=pointer]:
        - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E7%B4%85%E8%91%89&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
        - img "写真AC" [ref=e377]
        - generic [ref=e378]: 紅葉
      - link "写真AC 運動会" [ref=e380] [cursor=pointer]:
        - /url: https://www.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E9%81%8B%E5%8B%95%E4%BC%9A&pp=70&srt=dlrank&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
        - img "写真AC" [ref=e381]
        - generic [ref=e382]: 運動会
      - link "写真AC ハロウィン" [ref=e384] [cursor=pointer]:
        - /url: https://www.photo-ac.com/main/search?by_ai=&q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all
        - img "写真AC" [ref=e385]
        - generic [ref=e386]: ハロウィン
    - generic [ref=e390]:
      - generic [ref=e391]:
        - generic [ref=e393]:
          - button "広告を非表示にする 広告を非表示にする" [ref=e395] [cursor=pointer]:
            - img "広告を非表示にする" [ref=e396]
            - generic [ref=e397]: 広告を非表示にする
          - iframe [ref=e400]:
            - generic [ref=f21e6]:
              - generic [ref=f21e7]:
                - link "AdChoices information (opens dialog)" [ref=f21e9] [cursor=pointer]:
                  - /url: "https://popup.taboola.com/ko/?template=colorbox&utm_source=photoac-channel&utm_medium=referral&utm_content=Viper_300x250_1x1_White_Large_Fonts:test-lien.photo-ac.com_P5938113127382447_Tpos1_vb80_W300_H250_N1:"
                - heading [level=3]
              - generic [ref=f21e14] [cursor=pointer]:
                - link "Image for Taboola Advertising Unit" [ref=f21e15]:
                  - /url: https://www.homes.com/homes-for-sale/under-500k
                  - img "Image for Taboola Advertising Unit" [ref=f21e17]
                - link "View Homes for Sale under $500k Homes.com in Taboola advertising section" [ref=f21e19]:
                  - /url: https://www.homes.com/homes-for-sale/under-500k
                  - generic [ref=f21e20]:
                    - link "View Homes for Sale under $500k" [ref=f21e21]
                    - link "Homes.com in Taboola advertising section" [ref=f21e22]: Homes.com
        - generic [ref=e401]:
          - heading "無料写真ダウンロード" [level=4] [ref=e402]
          - generic [ref=e403]:
            - paragraph [ref=e404]:
              - link "無料会員登録" [ref=e405] [cursor=pointer]:
                - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
            - paragraph [ref=e406]:
              - link "ログイン" [ref=e407] [cursor=pointer]:
                - /url: https://test-accounts.ac-illust.com/login?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
          - paragraph [ref=e408]:
            - text: 写真をダウンロードするには写真ACに
            - link "ログイン" [ref=e409] [cursor=pointer]:
              - /url: https://test-accounts.ac-illust.com/login?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
            - text: してください。会員登録がまだの方は
            - link "無料登録" [ref=e410] [cursor=pointer]:
              - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
            - text: を!会員登録後、ログインすることで、約12,391,147点以上のフリー写真素材の中から、無料画像をダウンロードしていただけるようになります。商用利用も可能です。
        - generic [ref=e411]:
          - heading "写真素材メニュー" [level=4] [ref=e412]
          - button "写真カテゴリー" [ref=e414] [cursor=pointer]:
            - text: 写真カテゴリー
            - generic [ref=e415]: 
          - link "人気写真ランキング" [ref=e417] [cursor=pointer]:
            - /url: /ranking
          - link "モデルから写真を検索" [ref=e419] [cursor=pointer]:
            - /url: /models/
          - link "おすすめ特集一覧" [ref=e421] [cursor=pointer]:
            - /url: /pickup/1
          - link "新着写真一覧" [ref=e423] [cursor=pointer]:
            - /url: /main/latest
          - link "公開中のコレクション" [ref=e425] [cursor=pointer]:
            - /url: /main/collections
        - generic [ref=e426]:
          - heading "画像生成AI" [level=4] [ref=e427]
          - link "AC写真AIラボ NEW" [ref=e429] [cursor=pointer]:
            - /url: /image-generator/
            - text: AC写真AIラボ
            - generic [ref=e430]: NEW
          - link "AI人物素材" [ref=e432] [cursor=pointer]:
            - /url: /main/genface
        - generic [ref=e433]:
          - heading "クリエイターメニュー" [level=4] [ref=e434]
          - link "クリエイター投稿（新規登録）" [ref=e436] [cursor=pointer]:
            - /url: /creator/auth/register
          - link "クリエイターログイン" [ref=e438] [cursor=pointer]:
            - /url: "#"
          - link "ポイント換金ランキング" [ref=e440] [cursor=pointer]:
            - /url: /ranking/prize
          - link "クリエイター一覧" [ref=e442] [cursor=pointer]:
            - /url: /creators/
        - generic [ref=e443]:
          - heading "プレミアム会員サービス" [level=4] [ref=e444]
          - link "プレミアム会員登録" [ref=e446] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
          - link "法人・複数名向けプラン" [ref=e448] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/premium/business
          - link "商品化ライセンス" [ref=e450] [cursor=pointer]:
            - /url: /main/extra_license_terms
          - link "あんしんサポート" [ref=e452] [cursor=pointer]:
            - /url: /indemnity/
        - generic [ref=e453]:
          - heading "ヘルプ＆ガイド" [level=4] [ref=e454]
          - link "写真ACとは" [ref=e456] [cursor=pointer]:
            - /url: /main/guide/#group-site
          - link "写真の権利" [ref=e458] [cursor=pointer]:
            - /url: /main/rights
          - link "ヘルプ" [ref=e460] [cursor=pointer]:
            - /url: https://help.freebie-ac.jp
          - link "利用規約" [ref=e462] [cursor=pointer]:
            - /url: /main/terms
        - link "Interview" [ref=e466] [cursor=pointer]:
          - /url: /interview
          - img "Interview" [ref=e467]
        - generic [ref=e468]:
          - heading "おすすめ無料サービス" [level=4] [ref=e469]
          - link "デザインテンプレート" [ref=e471] [cursor=pointer]:
            - /url: https://www.design-ac.net/
            - text: デザインテンプレート
            - generic [ref=e472]: 
          - link "ファイル転送・共有" [ref=e474] [cursor=pointer]:
            - /url: https://ac-data.info/
            - text: ファイル転送・共有
            - generic [ref=e475]: 
          - link "今日の運勢" [ref=e477] [cursor=pointer]:
            - /url: https://uranai-ac.com/
            - text: 今日の運勢
            - generic [ref=e478]: 
          - link "プレゼン資料作成AI" [ref=e480] [cursor=pointer]:
            - /url: https://www.design-ac.net/design/new-presentation?src=homepage-btn
            - text: プレゼン資料作成AI
            - generic [ref=e481]: 
        - iframe [ref=e482]:
          
        - generic [ref=e483]:
          - heading "人気キーワード（タグ）" [level=4] [ref=e484]:
            - button "人気キーワード（タグ）" [ref=e485] [cursor=pointer]:
              - text: 人気キーワード（タグ）
              - generic [ref=e486]: 
          - generic [ref=e487]:
            - generic [ref=e488]:
              - link "ビジネス" [ref=e489] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&utm_source=top_keyword
              - link "女性" [ref=e490] [cursor=pointer]:
                - /url: /main/search?q=%E5%A5%B3%E6%80%A7&utm_source=top_keyword
              - link "紅葉" [ref=e491] [cursor=pointer]:
                - /url: /main/search?q=%E7%B4%85%E8%91%89&utm_source=top_keyword
              - link "cat" [ref=e492] [cursor=pointer]:
                - /url: /main/search?q=cat&utm_source=top_keyword
              - link "背景" [ref=e493] [cursor=pointer]:
                - /url: /main/search?q=%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "学生" [ref=e494] [cursor=pointer]:
                - /url: /main/search?q=%E5%AD%A6%E7%94%9F&utm_source=top_keyword
              - link "flower" [ref=e495] [cursor=pointer]:
                - /url: /main/search?q=flower&utm_source=top_keyword
              - link "和紙" [ref=e496] [cursor=pointer]:
                - /url: /main/search?q=%E5%92%8C%E7%B4%99&utm_source=top_keyword
              - link "空" [ref=e497] [cursor=pointer]:
                - /url: /main/search?q=%E7%A9%BA&utm_source=top_keyword
              - link "cats" [ref=e498] [cursor=pointer]:
                - /url: /main/search?q=cats&utm_source=top_keyword
              - link "秋" [ref=e499] [cursor=pointer]:
                - /url: /main/search?q=%E7%A7%8B&utm_source=top_keyword
              - link "クリスマス" [ref=e500] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9&utm_source=top_keyword
              - link "ハロウィン" [ref=e501] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%8F%E3%83%AD%E3%82%A6%E3%82%A3%E3%83%B3&utm_source=top_keyword
              - link "モノクロ" [ref=e502] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%A2%E3%83%8E%E3%82%AF%E3%83%AD&utm_source=top_keyword
              - link "11月" [ref=e503] [cursor=pointer]:
                - /url: /main/search?q=11%E6%9C%88&utm_source=top_keyword
              - link "青空" [ref=e504] [cursor=pointer]:
                - /url: /main/search?q=%E9%9D%92%E7%A9%BA&utm_source=top_keyword
              - link "お正月" [ref=e505] [cursor=pointer]:
                - /url: /main/search?q=%E3%81%8A%E6%AD%A3%E6%9C%88&utm_source=top_keyword
              - link "家族" [ref=e506] [cursor=pointer]:
                - /url: /main/search?q=%E5%AE%B6%E6%97%8F&utm_source=top_keyword
              - link "パソコン" [ref=e507] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3&utm_source=top_keyword
              - link "オフィス" [ref=e508] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AA%E3%83%95%E3%82%A3%E3%82%B9&utm_source=top_keyword
              - link "クリスマス 背景" [ref=e509] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9+%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "猫" [ref=e510] [cursor=pointer]:
                - /url: /main/search?q=%E7%8C%AB&utm_source=top_keyword
              - link "リビング" [ref=e511] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%AA%E3%83%93%E3%83%B3%E3%82%B0&utm_source=top_keyword
              - link "赤ちゃん" [ref=e512] [cursor=pointer]:
                - /url: /main/search?q=%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&utm_source=top_keyword
              - link "子供" [ref=e513] [cursor=pointer]:
                - /url: /main/search?q=%E5%AD%90%E4%BE%9B&utm_source=top_keyword
              - link "虹色 背景" [ref=e514] [cursor=pointer]:
                - /url: /main/search?q=%E8%99%B9%E8%89%B2+%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "犬" [ref=e515] [cursor=pointer]:
                - /url: /main/search?q=%E7%8A%AC&utm_source=top_keyword
              - link "sky" [ref=e516] [cursor=pointer]:
                - /url: /main/search?q=sky&utm_source=top_keyword
              - link "子ども" [ref=e517] [cursor=pointer]:
                - /url: /main/search?q=%E5%AD%90%E3%81%A9%E3%82%82&utm_source=top_keyword
              - link "建物" [ref=e518] [cursor=pointer]:
                - /url: /main/search?q=%E5%BB%BA%E7%89%A9&utm_source=top_keyword
              - link "花" [ref=e519] [cursor=pointer]:
                - /url: /main/search?q=%E8%8A%B1&utm_source=top_keyword
              - link "カフェ テーブル" [ref=e520] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7%E3%80%80%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB&utm_source=top_keyword
              - link "観葉植物 インテリア" [ref=e521] [cursor=pointer]:
                - /url: /main/search?q=%E8%A6%B3%E8%91%89%E6%A4%8D%E7%89%A9+%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&utm_source=top_keyword
              - link "無料" [ref=e522] [cursor=pointer]:
                - /url: /main/search?q=%E7%84%A1%E6%96%99&utm_source=top_keyword
              - link "クリスマス 背景" [ref=e523] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%9E%E3%82%B9%E3%80%80%E8%83%8C%E6%99%AF&utm_source=top_keyword
              - link "木目" [ref=e524] [cursor=pointer]:
                - /url: /main/search?q=%E6%9C%A8%E7%9B%AE&utm_source=top_keyword
              - link "スマホ" [ref=e525] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%B9%E3%83%9E%E3%83%9B&utm_source=top_keyword
              - link "桜" [ref=e526] [cursor=pointer]:
                - /url: /main/search?q=%E6%A1%9C&utm_source=top_keyword
              - link "風景" [ref=e527] [cursor=pointer]:
                - /url: /main/search?q=%E9%A2%A8%E6%99%AF&utm_source=top_keyword
              - link "office" [ref=e528] [cursor=pointer]:
                - /url: /main/search?q=office&utm_source=top_keyword
              - link "テクスチャ" [ref=e529] [cursor=pointer]:
                - /url: /main/search?q=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3&utm_source=top_keyword
              - link "工場" [ref=e530] [cursor=pointer]:
                - /url: /main/search?q=%E5%B7%A5%E5%A0%B4&utm_source=top_keyword
              - link "部屋" [ref=e531] [cursor=pointer]:
                - /url: /main/search?q=%E9%83%A8%E5%B1%8B&utm_source=top_keyword
              - link "沖縄" [ref=e532] [cursor=pointer]:
                - /url: /main/search?q=%E6%B2%96%E7%B8%84&utm_source=top_keyword
              - link "さつまいも" [ref=e533] [cursor=pointer]:
                - /url: /main/search?q=%E3%81%95%E3%81%A4%E3%81%BE%E3%81%84%E3%82%82&utm_source=top_keyword
              - link "カフェ" [ref=e534] [cursor=pointer]:
                - /url: /main/search?q=%E3%82%AB%E3%83%95%E3%82%A7&utm_source=top_keyword
              - link "自然" [ref=e535] [cursor=pointer]:
                - /url: /main/search?q=%E8%87%AA%E7%84%B6&utm_source=top_keyword
              - link "雲" [ref=e536] [cursor=pointer]:
                - /url: /main/search?q=%E9%9B%B2&utm_source=top_keyword
              - link "新生活" [ref=e537] [cursor=pointer]:
                - /url: /main/search?q=%E6%96%B0%E7%94%9F%E6%B4%BB&utm_source=top_keyword
              - link "海" [ref=e538] [cursor=pointer]:
                - /url: /main/search?q=%E6%B5%B7&utm_source=top_keyword
            - paragraph [ref=e539]:
              - button "もっと見る" [ref=e540] [cursor=pointer]:
                - text: もっと見る
                - generic [ref=e541]: 
              - text: 
        - generic [ref=e542]:
          - heading "メディア" [level=4] [ref=e543]
          - heading "テレビでご紹介いただきました！" [level=4] [ref=e544]
          - iframe [ref=e545]:
            - img [ref=f2e2]
          - paragraph [ref=e546]: かんさい情報ネット ten. | 読売テレビ
        - heading "ブログ" [level=4] [ref=e548]
        - generic [ref=e549]:
          - heading "SNS" [level=4] [ref=e550]
          - link "ACワークス公式 X" [ref=e552] [cursor=pointer]:
            - /url: https://x.com/ACworks2011
          - link "Mr.ビー X" [ref=e554] [cursor=pointer]:
            - /url: https://x.com/mrb_ac
        - generic [ref=e556]:
          - button "広告を非表示にする 広告を非表示にする" [ref=e558] [cursor=pointer]:
            - img "広告を非表示にする" [ref=e559]
            - generic [ref=e560]: 広告を非表示にする
          - iframe [ref=e563]:
            
      - generic [ref=e564]:
        - generic [ref=e566]:
          - generic [ref=e567]:
            - paragraph [ref=e568]:
              - link "Ads by ACworks" [ref=e569] [cursor=pointer]:
                - /url: "#"
            - generic [ref=e570]:
              - link "3DAYゲリラセール" [ref=e572] [cursor=pointer]:
                - /url: https://test-lien.photo-ac.com/premium/campaign?utm_source=photoac&utm_medium=internal&utm_campaign=coupon4451&utm_content=banner_250x250
                - img "3DAYゲリラセール" [ref=e574]
              - link "デザインAC「応援うちわデザイン作成方法」ご紹介" [ref=e576] [cursor=pointer]:
                - /url: https://test-an.editor-ac.com/articles/2024/04/02/how-to-make-idolfan/
                - img "デザインAC「応援うちわデザイン作成方法」ご紹介" [ref=e578]
              - link "デザインAC「ふりがな」機能ご紹介" [ref=e580] [cursor=pointer]:
                - /url: https://test-an.editor-ac.com/articles/2023/11/08/design-ac-introducing-the-furigana-function-not-found-in-other-design-tools/
                - img "デザインAC「ふりがな」機能ご紹介" [ref=e582]
            - paragraph [ref=e583]:
              - link "広告をもっと見る" [ref=e584] [cursor=pointer]:
                - /url: /main/advertisements
                - text: 広告をもっと見る
                - generic [ref=e585]: 
          - generic [ref=e587]:
            - button "広告を非表示にする 広告を非表示にする" [ref=e589] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e590]
              - generic [ref=e591]: 広告を非表示にする
            - iframe [ref=e594]:
              - iframe [ref=f23e1]:
                - generic [ref=f29e9] [cursor=pointer]:
                  - link "Image for Taboola Advertising Unit":
                    - /url: https://www.homes.com/homes-for-sale/2-bedroom
                    - img "Image for Taboola Advertising Unit" [ref=f29e11]
                  - link "View 2-Bedroom Homes for Sale Homes.com in Taboola advertising section" [ref=f29e13]:
                    - /url: https://www.homes.com/homes-for-sale/2-bedroom
                    - generic [ref=f29e14]:
                      - link "View 2-Bedroom Homes for Sale" [ref=f29e15]
                      - link "Homes.com in Taboola advertising section" [ref=f29e16]: Homes.com
        - generic [ref=e595]:
          - paragraph [ref=e597]: 人気写真
          - generic [ref=e599]:
            - figure [ref=e600]:
              - generic [ref=e601]: 
              - img "スマートフォンを持つ笑顔の若い女性 スマホ,女性,スマートフォンの写真素材" [ref=e602]
              - text: 
            - figure [ref=e603]:
              - generic [ref=e604]: 
              - img "お昼寝する赤ちゃん 赤ちゃん,寝ている,寝るの写真素材" [ref=e605]
              - text: 
            - figure [ref=e606]:
              - generic [ref=e607]: 
              - img "運動会 リレーをする子ども 運動会,リレー,バトンの写真素材" [ref=e608]
              - text: 
            - figure [ref=e609]:
              - generic [ref=e610]: 
              - img "笑顔で寝転がる子ども brothers 子ども,笑顔,スマイルの写真素材" [ref=e611]
              - text: 
            - figure [ref=e612]:
              - generic [ref=e613]: 
              - img "フェイシャルエステイメージ スキンケア,エステ,美容の写真素材" [ref=e614]
              - text: 
            - figure [ref=e615]:
              - generic [ref=e616]: 
              - img "カメラ目線で微笑む女性 女性,女,レディの写真素材" [ref=e617]
              - text: 
            - figure [ref=e618]:
              - generic [ref=e619]: 
              - img "寝起きの女性 東洋人,上半身,会社員の写真素材" [ref=e620]
              - text: 
            - figure [ref=e621]:
              - generic [ref=e622]: 
              - img "建築現場で打ち合わせをする設計士 建設,建築,作業員の写真素材" [ref=e623]
              - text: 
          - link "人気の投稿写真を詳しく見る" [ref=e625] [cursor=pointer]:
            - /url: /main/trends
            - text: 人気の投稿写真を詳しく見る
            - generic [ref=e626]: 
        - generic [ref=e627]:
          - paragraph [ref=e629]: デザインに統一感を持たせましょう
          - paragraph [ref=e630]:
            - text: チラシやウェブサイト、資料など、どのようなデザインにも統一感が大切です。
            - text: クリエイターのマイカテゴリーからテーマごとに写真を見つけることができます。同じスタイルの素材をダウンロードしてみましょう。
          - generic [ref=e631]: ※週間ダウンロードランキングからランダムに表示（クリエイター広告出稿者優遇）
          - img [ref=e634]
          - link "詳しく見る" [ref=e636] [cursor=pointer]:
            - /url: main/creator_categories
            - text: 詳しく見る
            - generic [ref=e637]: 
        - generic [ref=e639]:
          - button "広告を非表示にする 広告を非表示にする" [ref=e641] [cursor=pointer]:
            - img "広告を非表示にする" [ref=e642]
            - generic [ref=e643]: 広告を非表示にする
          - iframe [ref=e646]:
            
        - generic [ref=e647]:
          - paragraph [ref=e649]: 写真カテゴリー
          - generic [ref=e650]:
            - generic [ref=e652]:
              - link "カテゴリ。- 人物 人物" [ref=e655] [cursor=pointer]:
                - /url: /main/search?c_id=1&c_name=%E4%BA%BA%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 人物" [ref=e656]
                - generic [ref=e657]: 人物
              - link "カテゴリ。- ビジネス ビジネス" [ref=e660] [cursor=pointer]:
                - /url: /main/search?c_id=2&c_name=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&referer=c_search&utm_source=categories
                - img "カテゴリ。- ビジネス" [ref=e661]
                - generic [ref=e662]: ビジネス
              - link "カテゴリ。- 動物・生き物 動物・生き物" [ref=e665] [cursor=pointer]:
                - /url: /main/search?c_id=3&c_name=%E5%8B%95%E7%89%A9%E3%83%BB%E7%94%9F%E3%81%8D%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 動物・生き物" [ref=e666]
                - generic [ref=e667]: 動物・生き物
              - link "カテゴリ。- 花・植物 花・植物" [ref=e670] [cursor=pointer]:
                - /url: /main/search?c_id=4&c_name=%E8%8A%B1%E3%83%BB%E6%A4%8D%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 花・植物" [ref=e671]
                - generic [ref=e672]: 花・植物
              - link "カテゴリ。- 食べ物・飲み物 食べ物・飲み物" [ref=e675] [cursor=pointer]:
                - /url: /main/search?c_id=5&c_name=%E9%A3%9F%E3%81%B9%E7%89%A9%E3%83%BB%E9%A3%B2%E3%81%BF%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 食べ物・飲み物" [ref=e676]
                - generic [ref=e677]: 食べ物・飲み物
              - link "カテゴリ。- 町並み・建物 町並み・建物" [ref=e680] [cursor=pointer]:
                - /url: /main/search?c_id=6&c_name=%E7%94%BA%E4%B8%A6%E3%81%BF%E3%83%BB%E5%BB%BA%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 町並み・建物" [ref=e681]
                - generic [ref=e682]: 町並み・建物
              - link "カテゴリ。- 医療・福祉 医療・福祉" [ref=e685] [cursor=pointer]:
                - /url: /main/search?c_id=7&c_name=%E5%8C%BB%E7%99%82%E3%83%BB%E7%A6%8F%E7%A5%89&referer=c_search&utm_source=categories
                - img "カテゴリ。- 医療・福祉" [ref=e686]
                - generic [ref=e687]: 医療・福祉
              - link "カテゴリ。- 交通・乗り物 交通・乗り物" [ref=e690] [cursor=pointer]:
                - /url: /main/search?c_id=8&c_name=%E4%BA%A4%E9%80%9A%E3%83%BB%E4%B9%97%E3%82%8A%E7%89%A9&referer=c_search&utm_source=categories
                - img "カテゴリ。- 交通・乗り物" [ref=e691]
                - generic [ref=e692]: 交通・乗り物
              - link "カテゴリ。- 季節・行事 季節・行事" [ref=e695] [cursor=pointer]:
                - /url: /main/search?c_id=9&c_name=%E5%AD%A3%E7%AF%80%E3%83%BB%E8%A1%8C%E4%BA%8B&referer=c_search&utm_source=categories
                - img "カテゴリ。- 季節・行事" [ref=e696]
                - generic [ref=e697]: 季節・行事
              - link "カテゴリ。- 自然・風景 自然・風景" [ref=e700] [cursor=pointer]:
                - /url: /main/search?c_id=10&c_name=%E8%87%AA%E7%84%B6%E3%83%BB%E9%A2%A8%E6%99%AF&referer=c_search&utm_source=categories
                - img "カテゴリ。- 自然・風景" [ref=e701]
                - generic [ref=e702]: 自然・風景
              - link "カテゴリ。- スポーツ スポーツ" [ref=e705] [cursor=pointer]:
                - /url: /main/search?c_id=11&c_name=%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84&referer=c_search&utm_source=categories
                - img "カテゴリ。- スポーツ" [ref=e706]
                - generic [ref=e707]: スポーツ
              - link "カテゴリ。- エコ・環境 エコ・環境" [ref=e710] [cursor=pointer]:
                - /url: /main/search?c_id=12&c_name=%E3%82%A8%E3%82%B3%E3%83%BB%E7%92%B0%E5%A2%83&referer=c_search&utm_source=categories
                - img "カテゴリ。- エコ・環境" [ref=e711]
                - generic [ref=e712]: エコ・環境
              - link "カテゴリ。- 美容・健康 美容・健康" [ref=e715] [cursor=pointer]:
                - /url: /main/search?c_id=13&c_name=%E7%BE%8E%E5%AE%B9%E3%83%BB%E5%81%A5%E5%BA%B7&referer=c_search&utm_source=categories
                - img "カテゴリ。- 美容・健康" [ref=e716]
                - generic [ref=e717]: 美容・健康
              - link "カテゴリ。- 住宅・インテリア 住宅・インテリア" [ref=e720] [cursor=pointer]:
                - /url: /main/search?c_id=14&c_name=%E4%BD%8F%E5%AE%85%E3%83%BB%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2&referer=c_search&utm_source=categories
                - img "カテゴリ。- 住宅・インテリア" [ref=e721]
                - generic [ref=e722]: 住宅・インテリア
              - link "カテゴリ。- 年賀状 年賀状" [ref=e725] [cursor=pointer]:
                - /url: /main/search?c_id=15&c_name=%E5%B9%B4%E8%B3%80%E7%8A%B6&referer=c_search&utm_source=categories
                - img "カテゴリ。- 年賀状" [ref=e726]
                - generic [ref=e727]: 年賀状
              - link "カテゴリ。- テクスチャ・背景 テクスチャ・背景" [ref=e730] [cursor=pointer]:
                - /url: /main/search?c_id=16&c_name=%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%83%BB%E8%83%8C%E6%99%AF&referer=c_search&utm_source=categories
                - img "カテゴリ。- テクスチャ・背景" [ref=e731]
                - generic [ref=e732]: テクスチャ・背景
              - link "カテゴリ。- 小物・雑貨 小物・雑貨" [ref=e735] [cursor=pointer]:
                - /url: /main/search?c_id=18&c_name=%E5%B0%8F%E7%89%A9%E3%83%BB%E9%9B%91%E8%B2%A8&referer=c_search&utm_source=categories
                - img "カテゴリ。- 小物・雑貨" [ref=e736]
                - generic [ref=e737]: 小物・雑貨
              - link "カテゴリ。- クレイアート クレイアート" [ref=e740] [cursor=pointer]:
                - /url: /main/search?c_id=19&c_name=%E3%82%AF%E3%83%AC%E3%82%A4%E3%82%A2%E3%83%BC%E3%83%88&referer=c_search&utm_source=categories
                - img "カテゴリ。- クレイアート" [ref=e741]
                - generic [ref=e742]: クレイアート
              - link "カテゴリ。- 外国 外国" [ref=e745] [cursor=pointer]:
                - /url: /main/search?c_id=20&c_name=%E5%A4%96%E5%9B%BD&referer=c_search&utm_source=categories
                - img "カテゴリ。- 外国" [ref=e746]
                - generic [ref=e747]: 外国
              - link "カテゴリ。- PSD素材 PSD素材" [ref=e750] [cursor=pointer]:
                - /url: /main/search?referer=category_psd&sizesec=psd&utm_source=categories
                - img "カテゴリ。- PSD素材" [ref=e751]
                - generic [ref=e752]: PSD素材
            - button [ref=e753] [cursor=pointer]:
              - img [ref=e755]
        - generic [ref=e757]:
          - paragraph [ref=e759]: 写真ACだけのオリジナルおすすめ写真特集！
          - paragraph [ref=e760]:
            - text: プロのカメラマンが撮影した写真ACのおすすめ特集を一挙公開！
            - text: 無料で使える高品質な写真を豊富なテーマごとに厳選してご用意しています。
          - generic [ref=e761]:
            - generic [ref=e762]:
              - figure "マカロン・ドーナツ" [ref=e763]:
                - link "マカロン・ドーナツ" [ref=e764] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=macarons_donutsac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                  - img "マカロン・ドーナツ" [ref=e765]
              - figure "様々なビジネスシーン 失敗・パワハラ" [ref=e766]:
                - link "様々なビジネスシーン 失敗・パワハラ" [ref=e767] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=buddyjpac&by_ai=&sizesec=all&orientation=all&color=all&model_count=-1&age=all&nq=&creator=acworks&ngcreator=&qid=&exclude_ai=on&personalized=1&layout=vertical&mdlrlrsec=all&prprlrsec=all&srt=dlrank&pp=70&utm_source=pickup
                  - img "様々なビジネスシーン 失敗・パワハラ" [ref=e768]
              - figure "子供の食事" [ref=e769]:
                - link "子供の食事" [ref=e770] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=childreneatingac&personalized=1&srt=dlrank&nq=&exclude_ai=on&orientation=all&sizesec=all&creator=acworks&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&utm_source=pickup
                  - img "子供の食事" [ref=e771]
              - figure "日本人女性のライフスタイル" [ref=e772]:
                - link "日本人女性のライフスタイル" [ref=e773] [cursor=pointer]:
                  - /url: https://www.photo-ac.com/main/search?q=womanjplifestyle3ac&by_ai=&sizesec=all&orientation=all&color=&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all&creator=&ngcreator=&nq=&qid=&exclude_ai=on&srt=dlrank&pp=70&utm_source=pickup
                  - img "日本人女性のライフスタイル" [ref=e774]
            - link "おすすめ写真特集をもっと見る" [ref=e776] [cursor=pointer]:
              - /url: /pickup/1
              - text: おすすめ写真特集をもっと見る
              - generic [ref=e777]: 
        - generic [ref=e778]:
          - generic [ref=e779]:
            - paragraph [ref=e780]: グループサイトの無料サービスはご存知ですか？
            - text: イラストや動画、デザインツールなど、一つのアカウントで全て使えます。
          - generic [ref=e781]:
            - link "シルエット・ピクトグラム テンプレート・デザインツール" [ref=e784] [cursor=pointer]:
              - /url: https://test-an.editor-ac.com
              - img "シルエット・ピクトグラム" [ref=e785]
              - generic [ref=e786]: テンプレート・デザインツール
            - link "イラスト・ベクター画像 イラスト・ベクター画像" [ref=e789] [cursor=pointer]:
              - /url: https://www.ac-illust.com
              - img "イラスト・ベクター画像" [ref=e790]
              - generic [ref=e791]: イラスト・ベクター画像
            - link "シルエット・ピクトグラム シルエット・ピクトグラム" [ref=e794] [cursor=pointer]:
              - /url: https://www.silhouette-ac.com
              - img "シルエット・ピクトグラム" [ref=e795]
              - generic [ref=e796]: シルエット・ピクトグラム
            - generic [ref=e797]:
              - generic [ref=e798]:
                - generic:
                  - img
              - link "シルエット・ピクトグラム 動画・エフェクト" [ref=e799] [cursor=pointer]:
                - /url: https://video-ac.com/
                - img "シルエット・ピクトグラム" [ref=e800]
                - generic [ref=e801]: 動画・エフェクト
        - generic [ref=e802]:
          - paragraph [ref=e804]: もう画像選びで悩まないでください
          - generic [ref=e806]:
            - generic [ref=e807]:
              - generic [ref=e808]:
                - img "Notification" [ref=e809]
                - generic [ref=e810]:
                  - paragraph [ref=e811]: 無料でダウンロード
                  - paragraph [ref=e812]: 1239万枚以上の写真素材から無料でダウンロード可能！毎日数千枚の写真素材が追加されます。
              - generic [ref=e813]:
                - img "Notification" [ref=e814]
                - generic [ref=e815]:
                  - paragraph [ref=e816]: クレジット表記不要
                  - paragraph [ref=e817]: 無料だとクレジット表記が必要なサイトが多い中、写真ACは無料でもクレジット表記不要です。
              - generic [ref=e818]:
                - img "Notification" [ref=e819]
                - generic [ref=e820]:
                  - paragraph [ref=e821]: 商用利用可能
                  - paragraph [ref=e822]: 加工も自由で商用利用も可能だから、チラシやポスター、パンフレットなど、さまざまなビジネスにご利用いただけます。
            - button "広告を非表示にする 広告を非表示にする" [ref=e827] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e828]
              - generic [ref=e829]: 広告を非表示にする
        - generic [ref=e830]:
          - paragraph [ref=e832]: こんな方におすすめです
          - generic [ref=e834]:
            - generic [ref=e835]:
              - generic [ref=e836]:
                - img "top human 1" [ref=e837]
                - generic [ref=e838]:
                  - paragraph [ref=e839]: WEB担当者
                  - paragraph [ref=e840]:
                    - text: ウェブサイトやブログの
                    - text: アイキャッチ画像がほしい
              - generic [ref=e841]:
                - img "top human 2" [ref=e842]
                - generic [ref=e843]:
                  - paragraph [ref=e844]: 会社員
                  - paragraph [ref=e845]:
                    - text: プレゼンテーションのスライドに
                    - text: 画像を使って分かりやすくしたい
              - generic [ref=e846]:
                - img "top human 3" [ref=e847]
                - generic [ref=e848]:
                  - paragraph [ref=e849]: インフルエンサー
                  - paragraph [ref=e850]:
                    - text: SNSへの投稿が
                    - text: テキストだけで物足りない
              - generic [ref=e851]:
                - img "top human 4" [ref=e852]
                - generic [ref=e853]:
                  - paragraph [ref=e854]: 作 家
                  - paragraph [ref=e855]:
                    - text: 電子書籍や印刷物の挿絵に
                    - text: 商用利用できる画像がほしい
              - generic [ref=e856]:
                - img "top human 5" [ref=e857]
                - generic [ref=e858]:
                  - paragraph [ref=e859]: プログラマー
                  - paragraph [ref=e860]:
                    - text: アプリケーションのUIデザインに
                    - text: 使う画像やアイコンがほしい
            - generic [ref=e861]:
              - generic [ref=e862]:
                - img "top human 6" [ref=e863]
                - generic [ref=e864]:
                  - paragraph [ref=e865]: 教育関係者
                  - paragraph [ref=e866]:
                    - text: 学習教材や教育資料に入れる
                    - text: 挿絵やイメージがほしい
              - generic [ref=e867]:
                - img "top human 7" [ref=e868]
                - generic [ref=e869]:
                  - paragraph [ref=e870]: 記 者
                  - paragraph [ref=e871]:
                    - text: メディア記事やニュース記事に
                    - text: 使う画像がほしい
              - generic [ref=e872]:
                - img "top human 8" [ref=e873]
                - generic [ref=e874]:
                  - paragraph [ref=e875]: ショップ運営
                  - paragraph [ref=e876]:
                    - text: 広告キャンペーンに使える
                    - text: インパクトのある画像がほしい
              - generic [ref=e877]:
                - img "top human 9" [ref=e878]
                - generic [ref=e879]:
                  - paragraph [ref=e880]: ハンドメイド販売
                  - paragraph [ref=e881]:
                    - link "商品化ライセンス" [ref=e882] [cursor=pointer]:
                      - /url: /main/extra_license_introduction
                    - text: を購入して
                    - text: ハンドメイド作品の販売したい
        - generic [ref=e885] [cursor=pointer]:
          - generic [ref=e887]:
            - img "logo45 designAC" [ref=e888]
            - paragraph [ref=e889]: デザインをもっと簡単に
            - paragraph [ref=e891]:
              - text: デザインACならいつでもどこでも、手軽にデザインできます。
              - text: 豊富なテンプレートからオリジナルのデザインを作成。
              - text: PC、スマートフォンにも対応の無料デザインツールです。
            - link "今すぐデザインを作成" [ref=e892]:
              - /url: https://www.design-ac.net/templates/new
          - img "banner designAC" [ref=e894]
        - generic [ref=e895]:
          - generic [ref=e896]:
            - paragraph [ref=e897]: まだ時間をムダにしますか？
            - paragraph [ref=e898]: 効率よく画像を探して、インプットの時間を確保し、納期のプレッシャーから逃れましょう。
          - generic [ref=e899]:
            - button "プレミアム個人プラン picture premium personal picture check 検索無制限 picture check ダウンロード無制限 picture check 待たずにダウンロード picture check まとめてダウンロード picture check 商品化ライセンス利用可能 picture check あんしんサポート 個人プランを詳しくみる" [ref=e900] [cursor=pointer]:
              - paragraph [ref=e902]: プレミアム個人プラン
              - generic [ref=e903]:
                - img "picture premium personal" [ref=e904]
                - generic [ref=e905]:
                  - generic [ref=e906]:
                    - img "picture check" [ref=e908]
                    - paragraph [ref=e910]: 検索無制限
                  - generic [ref=e911]:
                    - img "picture check" [ref=e913]
                    - paragraph [ref=e915]: ダウンロード無制限
                  - generic [ref=e916]:
                    - img "picture check" [ref=e918]
                    - paragraph [ref=e920]: 待たずにダウンロード
                  - generic [ref=e921]:
                    - img "picture check" [ref=e923]
                    - paragraph [ref=e925]: まとめてダウンロード
                  - generic [ref=e926]:
                    - img "picture check" [ref=e928]
                    - paragraph [ref=e930]: 商品化ライセンス利用可能
                  - generic [ref=e931]:
                    - img "picture check" [ref=e933]
                    - paragraph [ref=e935]: あんしんサポート
                - link "個人プランを詳しくみる" [ref=e937]:
                  - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
            - button "チームでお得な法人プラン picture premium business ＼ 大企業から行政まで利用中 ／ 個人プランの全ての機能に加え、 picture check 法人名義でのご利用 picture check メンバー招待機能 picture check 広告非表示オプション無料 picture check コレクションの共有 法人プランを詳しくみる" [ref=e938] [cursor=pointer]:
              - paragraph [ref=e940]: チームでお得な法人プラン
              - generic [ref=e941]:
                - img "picture premium business" [ref=e942]
                - generic [ref=e943]:
                  - paragraph [ref=e944]: ＼ 大企業から行政まで利用中 ／
                  - generic [ref=e945]:
                    - paragraph [ref=e946]: 個人プランの全ての機能に加え、
                    - generic [ref=e947]:
                      - img "picture check" [ref=e949]
                      - paragraph [ref=e951]: 法人名義でのご利用
                    - generic [ref=e952]:
                      - img "picture check" [ref=e954]
                      - paragraph [ref=e956]: メンバー招待機能
                    - generic [ref=e957]:
                      - img "picture check" [ref=e959]
                      - paragraph [ref=e961]: 広告非表示オプション無料
                    - generic [ref=e962]:
                      - img "picture check" [ref=e964]
                      - paragraph [ref=e966]: コレクションの共有
                - link "法人プランを詳しくみる" [ref=e968]:
                  - /url: https://test-lien.photo-ac.com/premium/business
        - generic [ref=e969]:
          - paragraph [ref=e971]: 日本最大級のフリー素材サイト
          - generic [ref=e972]:
            - generic [ref=e973]:
              - generic [ref=e975]:
                - img "Total users" [ref=e976]
                - generic [ref=e977]:
                  - paragraph [ref=e978]: 登録ユーザー
                  - paragraph [ref=e979]: 0人以上
              - generic [ref=e981]:
                - img "Downloads" [ref=e982]
                - generic [ref=e983]:
                  - paragraph [ref=e984]: 総ダウンロード
                  - paragraph [ref=e985]: 208,000,000回以上
              - generic [ref=e987]:
                - img "Total creators" [ref=e988]
                - generic [ref=e989]:
                  - paragraph [ref=e990]: 登録クリエイター
                  - paragraph [ref=e991]: 370,000人以上
              - generic [ref=e993]:
                - img "Donations" [ref=e994]
                - generic [ref=e995]:
                  - paragraph [ref=e996]: 寄付金総額
                  - paragraph [ref=e997]: 71,400,000円以上
            - generic [ref=e998]: ※グループサイト合計
        - generic [ref=e1001]:
          - generic [ref=e1004]:
            - button "広告を非表示にする 広告を非表示にする" [ref=e1006] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e1007]
              - generic [ref=e1008]: 広告を非表示にする
            - iframe [ref=e1011]:
              
          - generic [ref=e1014]:
            - button "広告を非表示にする 広告を非表示にする" [ref=e1016] [cursor=pointer]:
              - img "広告を非表示にする" [ref=e1017]
              - generic [ref=e1018]: 広告を非表示にする
            - iframe [ref=e1021]:
              
        - generic [ref=e1022]:
          - paragraph [ref=e1024]: ACワークスからのお知らせ
          - iframe [ref=e1025]:
            - img [ref=f3e2]
        - link "acworks banner" [ref=e1027] [cursor=pointer]:
          - /url: https://acworks.co.jp/
          - img "acworks banner" [ref=e1028]
        - generic [ref=e1029]:
          - paragraph [ref=e1030]: あなたのダウンロードが社会に貢献します
          - paragraph [ref=e1031]: あなたが写真素材を1ダウンロードするたびに0.1円を
          - paragraph [ref=e1032]: ACワークス株式会社より、ユーザーの皆さまが希望する団体へ寄付いたします。
          - generic [ref=e1033]:
            - generic [ref=e1035]:
              - img [ref=e1036]
              - generic [ref=e1037]:
                - paragraph [ref=e1038]:
                  - text: 2024年の寄付金総額
                  - generic [ref=e1039]: 800万円超
                - paragraph [ref=e1040]:
                  - text: これまでの累計寄付金総額
                  - generic [ref=e1041]: 6100万円超
            - paragraph [ref=e1042]: "[2025年3月時点]"
          - link "これまでの寄付金総額をみる" [ref=e1044] [cursor=pointer]:
            - /url: https://acworks.co.jp/csr/
    - contentinfo [ref=e1046]:
      - generic [ref=e1049]:
        - generic [ref=e1050]: 昨日のダウンロード数：24,029
        - generic [ref=e1051]: 先月のダウンロード数：1,124,624
        - generic [ref=e1052]: 総会員数：1600万人を突破しました
      - generic [ref=e1054]:
        - generic [ref=e1055]:
          - generic [ref=e1056]:
            - generic [ref=e1057]: 写真ACについて 
            - list [ref=e1058]:
              - listitem [ref=e1059]:
                - link "写真ACとは" [ref=e1060] [cursor=pointer]:
                  - /url: /main/guide/
              - listitem [ref=e1061]:
                - link "運営会社" [ref=e1062] [cursor=pointer]:
                  - /url: /main/about/
              - listitem [ref=e1063]:
                - link "個人情報保護方針" [ref=e1064] [cursor=pointer]:
                  - /url: /main/privacy/
              - listitem [ref=e1065]:
                - link "特定個人情報基本方針" [ref=e1066] [cursor=pointer]:
                  - /url: /main/policy_personal_info/
              - listitem [ref=e1067]:
                - link "特定商取引法に基づく表記" [ref=e1068] [cursor=pointer]:
                  - /url: /main/commercial_transactions/
              - listitem [ref=e1069]:
                - link "サイトマップ" [ref=e1070] [cursor=pointer]:
                  - /url: /main/sitemap
              - listitem [ref=e1071]:
                - link "セキュリティポリシー" [ref=e1072] [cursor=pointer]:
                  - /url: https://acworks.co.jp/security-policy/
          - generic [ref=e1073]:
            - generic [ref=e1074]: 会員登録 
            - list [ref=e1075]:
              - listitem [ref=e1076]:
                - link "無料会員登録" [ref=e1077] [cursor=pointer]:
                  - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp
              - listitem [ref=e1078]:
                - link "プレミアム会員登録" [ref=e1079] [cursor=pointer]:
                  - /url: https://test-accounts.ac-illust.com/signup?serviceURL=https%3A%2F%2Ftest-lien.photo-ac.com%2Fauth%2Fsso_login%3Fredirect_to%3Dhttps%253A%252F%252Ftest-lien.photo-ac.com%252F&lang=jp&fromButton=premium_action
              - listitem [ref=e1080]:
                - link "無料クリエイター会員登録" [ref=e1081] [cursor=pointer]:
                  - /url: /creator/auth/register
          - generic [ref=e1082]:
            - generic [ref=e1083]: プレミアム会員サービス 
            - list [ref=e1084]:
              - listitem [ref=e1085]:
                - link "プレミアム会員登録" [ref=e1086] [cursor=pointer]:
                  - /url: https://test-lien.photo-ac.com/premium/campaign?target=premium_sozai
              - listitem [ref=e1087]:
                - link "法人・複数名向けプラン" [ref=e1088] [cursor=pointer]:
                  - /url: https://test-lien.photo-ac.com/premium/business
              - listitem [ref=e1089]:
                - link "商品化ライセンス" [ref=e1090] [cursor=pointer]:
                  - /url: /main/extra_license_terms/
              - listitem [ref=e1091]:
                - link "あんしんサポート" [ref=e1092] [cursor=pointer]:
                  - /url: /indemnity/
          - generic [ref=e1093]:
            - generic [ref=e1094]: ヘルプ＆ガイド 
            - list [ref=e1095]:
              - listitem [ref=e1096]:
                - link "ヘルプ" [ref=e1097] [cursor=pointer]:
                  - /url: https://help.freebie-ac.jp/
              - listitem [ref=e1098]:
                - link "利用規約" [ref=e1099] [cursor=pointer]:
                  - /url: /main/terms/
              - listitem [ref=e1100]:
                - link "プレミアム会員利用規約" [ref=e1101] [cursor=pointer]:
                  - /url: /main/terms_premium/
              - listitem [ref=e1102]:
                - link "AC写真AIラボ利用規約" [ref=e1103] [cursor=pointer]:
                  - /url: /image-generator/terms
          - generic [ref=e1104]:
            - generic [ref=e1105]: グループサイト 
            - list [ref=e1106]:
              - listitem [ref=e1107]:
                - link "イラストAC" [ref=e1108] [cursor=pointer]:
                  - /url: https://www.ac-illust.com/
              - listitem [ref=e1109]:
                - link "シルエットAC" [ref=e1110] [cursor=pointer]:
                  - /url: https://www.silhouette-ac.com/
              - listitem [ref=e1111]:
                - link "フリービーAC" [ref=e1112] [cursor=pointer]:
                  - /url: https://www.freebie-ac.jp/
              - listitem [ref=e1113]:
                - link "年賀状AC" [ref=e1114] [cursor=pointer]:
                  - /url: https://www.new-year.bz/
              - listitem [ref=e1115]:
                - link "動画AC" [ref=e1116] [cursor=pointer]:
                  - /url: https://video-ac.com
              - listitem [ref=e1117]:
                - link "デザインAC" [ref=e1118] [cursor=pointer]:
                  - /url: https://www.design-ac.net/
              - listitem [ref=e1119]:
                - link "ACデータ" [ref=e1120] [cursor=pointer]:
                  - /url: https://ac-data.info/
              - listitem [ref=e1121]:
                - link "明細AC" [ref=e1122] [cursor=pointer]:
                  - /url: https://meisai-ac.com/
        - generic [ref=e1123]:
          - link "twitter_btn" [ref=e1124] [cursor=pointer]:
            - /url: https://x.com/ACworks2011
            - button "twitter_btn" [ref=e1125]:
              - img [ref=e1126]
          - link "facebook_btn" [ref=e1128] [cursor=pointer]:
            - /url: https://www.facebook.com/ACworks2011/
            - button "facebook_btn" [ref=e1129]:
              - generic [ref=e1130]: 
          - link "pinterest_btn" [ref=e1131] [cursor=pointer]:
            - /url: https://www.pinterest.jp/acworks/
            - button "pinterest_btn" [ref=e1132]:
              - generic [ref=e1133]: 
          - link "blog_btn" [ref=e1134] [cursor=pointer]:
            - /url: http://blog.acworks.co.jp/
            - button "blog_btn" [ref=e1135]:
              - generic [ref=e1136]: 
          - link "feedback_modal_btn" [ref=e1137] [cursor=pointer]:
            - /url: "#feedbackModal"
            - button "feedback_modal_btn" [ref=e1138]:
              - generic [ref=e1139]: 
              - text: ご意見・ご要望
        - generic [ref=e1141]:
          - text: © 2011-2026
          - link "写真AC" [ref=e1142] [cursor=pointer]:
            - /url: https://test-lien.photo-ac.com/
  - generic [ref=e1143] [cursor=pointer]:
    - generic:
      - paragraph: ご質問は
      - paragraph: こちらから！
    - img "chat-icon" [ref=e1145]
    - generic [ref=e1146]: ×
```

# Test source

```ts
  1   | import { type Page, type Locator, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * BasePage — Abstract base class for all Page Object classes.
  5   |  * Contains common reusable methods.
  6   |  */
  7   | export abstract class BasePage {
  8   |   protected readonly page: Page;
  9   | 
  10  |   protected readonly photoAiModelContent: Locator;
  11  | 
  12  |   protected readonly closeButton: Locator;
  13  | 
  14  |   protected readonly pageLoadingIcon: Locator;
  15  | 
  16  |   constructor(page: Page) {
  17  |     this.page = page;
  18  |     this.photoAiModelContent = this.page.locator('.photo-ai-lab-modal__content');
  19  |     this.closeButton = this.page.getByRole('button', { name: '閉じる' }).nth(1);
  20  |     this.pageLoadingIcon = page.locator('#full_page_loading').first();
  21  |   }
  22  | 
  23  | 
  24  |   // Navigation
  25  |   /**
  26  |    * Navigate to a URL path relative to baseURL with resilient retry on transient network timeouts.
  27  |    * @param path - Relative path (e.g., '/login') or absolute URL
  28  |    * @param options - Optional navigation configuration
  29  |    */
  30  |   async navigate(path: string = '/', options?: { timeout?: number }): Promise<void> {
  31  |     const timeout = options?.timeout ?? 25_000;
  32  |     try {
  33  |       await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
  34  |     } catch {
  35  |       // Retry once if navigation timed out due to staging network latency
  36  |       await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout });
  37  |     }
  38  |   }
  39  | 
  40  |   /**
  41  |    * Wait for the page to reach a stable network state.
  42  |    */
  43  |   async waitForPageLoad(): Promise<void> {
  44  |     await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  45  |   }
  46  | 
  47  |   // Element Action
  48  | 
  49  |   /**
  50  |    * Click an element after ensuring it is visible and enabled.
  51  |    * @param locator - Playwright Locator object
  52  |    */
  53  |   async clickElement(locator: Locator, options?: { force?: boolean; noWaitAfter?: boolean }): Promise<void> {
> 54  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
      |                   ^ Error: locator.waitFor: Error: strict mode violation: getByRole('button', { name: /ログイン/ }) resolved to 4 elements:
  55  |     const startUrl = this.page.url();
  56  |     const clickOpts = {
  57  |       ...(options?.force ? { force: true } : {}),
  58  |       ...(options?.noWaitAfter ? { noWaitAfter: true } : {}),
  59  |     };
  60  |     if (options?.force || options?.noWaitAfter) {
  61  |       await locator.click(clickOpts);
  62  |     } else {
  63  |       try {
  64  |         await locator.click(clickOpts);
  65  |       } catch (err: any) {
  66  |         // If URL has changed (navigation already triggered), do not retry on detached element from previous page
  67  |         if (this.page.url() !== startUrl) return;
  68  |         const errMessage = String(err?.message || '');
  69  |         if (errMessage.includes('Execution context was destroyed') || errMessage.includes('frame was detached')) {
  70  |           return;
  71  |         }
  72  |         await locator.click({ force: true, ...(options?.noWaitAfter ? { noWaitAfter: true } : {}) });
  73  |       }
  74  |     }
  75  |   }
  76  | 
  77  |   /**
  78  |    * Fill an input field — clears existing value first.
  79  |    * @param locator - Playwright Locator for the input
  80  |    * @param value - Text to type into the field
  81  |    */
  82  |   async fillInput(locator: Locator, value: string): Promise<void> {
  83  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  84  |     await locator.fill('');
  85  |     await locator.fill(value);
  86  |   }
  87  | 
  88  |   /**
  89  |    * Get trimmed text content of an element.
  90  |    * @param locator - Playwright Locator
  91  |    * @returns Text content string
  92  |    */
  93  |   async getText(locator: Locator): Promise<string> {
  94  |     await locator.waitFor({ state: 'visible', timeout: 20_000 });
  95  |     return (await locator.textContent())?.trim() ?? '';
  96  |   }
  97  | 
  98  |   /**
  99  |    * Get the value of an input element.
  100 |    * @param locator - Playwright Locator for the input
  101 |    */
  102 |   async getInputValue(locator: Locator): Promise<string> {
  103 |     return locator.inputValue();
  104 |   }
  105 | 
  106 |   /**
  107 |    * Check if an element is visible on the page.
  108 |    * @param locator - Playwright Locator
  109 |    * @returns true if visible, false otherwise
  110 |    */
  111 |   async isVisible(locator: Locator): Promise<boolean> {
  112 |     return locator.isVisible();
  113 |   }
  114 | 
  115 |   /**
  116 |    * Wait for an element to become visible within timeout.
  117 |    * @param locator - Playwright Locator
  118 |    * @param timeout - Optional custom timeout in ms
  119 |    */
  120 |   async waitForElement(locator: Locator, timeout?: number): Promise<void> {
  121 |     await expect(locator).toBeVisible({ timeout });
  122 |   }
  123 | 
  124 |   /**
  125 |    * Wait for page loading overlay icon to disappear (hidden or detached).
  126 |    * @param timeout - Optional custom timeout in ms (default: 25_000)
  127 |    */
  128 |   async waitForPageLoadingIconHidden(timeout: number = 25_000): Promise<void> {
  129 |     await this.pageLoadingIcon.waitFor({ state: 'hidden', timeout }).catch(() => { });
  130 |   }
  131 | 
  132 |   /**
  133 |    * Select an option in a <select> dropdown by visible text.
  134 |    * @param locator - Playwright Locator for the select element
  135 |    * @param label - Visible text of the option to select
  136 |    */
  137 |   async selectOption(locator: Locator, label: string): Promise<void> {
  138 |     await expect(locator).toBeVisible();
  139 |     await locator.selectOption({ label });
  140 |   }
  141 | 
  142 |   /**
  143 |    * Check a checkbox if it is not already checked.
  144 |    * @param locator - Playwright Locator for the checkbox
  145 |    */
  146 |   async checkCheckbox(locator: Locator): Promise<void> {
  147 |     if (!(await locator.isChecked())) {
  148 |       await locator.check();
  149 |     }
  150 |   }
  151 | 
  152 |   /**
  153 |    * Uncheck a checkbox if it is currently checked.
  154 |    * @param locator - Playwright Locator for the checkbox
```