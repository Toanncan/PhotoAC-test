# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/premium/search.spec.ts >> Search — Premium User >> TC-SEARCH-PREM-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang @premium
- Location: photo-ac/src/tests/downloader/premium/search.spec.ts:778:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/main\/search/
Received string:  ""
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    - waiting for navigation to finish...

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/search?exclude_ai=on&layout=vertical&personalized=&by_ai=&q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9&personalized=1&pp=70&srt=-releasedate&nq=&orientation=all&sizesec=all&creator=&ngcreator=&qid=&color=all&model_count=-1&age=all&mdlrlrsec=all&prprlrsec=all"
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
                - searchbox "キーワード（例：女性）" [ref=e24]: ビジネス
                - button "リセット" [ref=e25] [cursor=pointer]:
                  - img [ref=e27]
                - generic [ref=e29]: ビジネス
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
      - link "まとめて ダウンロード" [ref=e104] [cursor=pointer]:
        - /url: javascript:void(0);
        - img [ref=e106]
        - generic [ref=e111]:
          - text: まとめて
          - text: ダウンロード
```

# Test source

```ts
  719 |     test.setTimeout(90_000);
  720 |     await searchResultPage.goToPsdSearch();
  721 |     await searchResultPage.waitForResultDisplay();
  722 | 
  723 |     await test.step('Verify URL ban đầu chứa tham số sizesec=psd', async () => {
  724 |       await expect(page).toHaveURL(/sizesec=psd/);
  725 |       await expect(searchResultPage.resultHeading).toContainText('PSD素材');
  726 |       const count = await searchResultPage.getResultCount();
  727 |       expect(count, 'PSD Format Search phải hiển thị danh sách ảnh').toBeGreaterThan(0);
  728 |     });
  729 | 
  730 |     await test.step('Chuyển sang trang 2 và verify bảo toàn tham số sizesec=psd', async () => {
  731 |       await expect(searchResultPage.paginationContainer).toBeVisible();
  732 |       await searchResultPage.goToNextPage();
  733 |       await expect(page).toHaveURL(/sizesec=psd/);
  734 |       await expect(page).toHaveURL(/p=2/);
  735 |       expect(await searchResultPage.getActivePageNumber()).toBe('2');
  736 |     });
  737 |   });
  738 | 
  739 |   /**
  740 |    * TC-SEARCH-PREM-027: Tìm kiếm bằng AI Face từ trang Detail
  741 |    * @tags @premium
  742 |    */
  743 |   test('TC-SEARCH-PREM-027: Tìm kiếm bằng AI Face từ trang Detail @premium', async ({
  744 |     page,
  745 |     searchResultPage,
  746 |     photoDetailPage,
  747 |   }) => {
  748 |     test.setTimeout(90_000);
  749 | 
  750 |     const photoId = '35133353';
  751 |     await photoDetailPage.goToPhotoDetail(photoId);
  752 | 
  753 |     await test.step('Click vào thumbnail khuôn mặt AI tại mục "AIで同じモデルの写真を探す"', async () => {
  754 |       await photoDetailPage.clickAiFaceThumbnail(0);
  755 |     });
  756 | 
  757 |     await test.step('Verify URL chứa tham số vector_face và danh sách ảnh kết quả hiển thị', async () => {
  758 |       await expect(page).toHaveURL(/vector_face=/);
  759 |       const count = await searchResultPage.getResultCount();
  760 |       expect(count, 'Kết quả tìm kiếm theo khuôn mặt AI phải trả về ảnh').toBeGreaterThan(0);
  761 |       await expect(searchResultPage.resultItems.first()).toBeVisible();
  762 |     });
  763 | 
  764 |     await test.step('Chuyển sang trang 2 và verify dữ liệu AI Face vẫn được giữ nguyên', async () => {
  765 |       if (await searchResultPage.paginationContainer.isVisible().catch(() => false)) {
  766 |         await searchResultPage.goToNextPage();
  767 |         await expect(page).toHaveURL(/vector_face=/);
  768 |         await expect(page).toHaveURL(/p=2/);
  769 |         expect(await searchResultPage.getActivePageNumber()).toBe('2');
  770 |       }
  771 |     });
  772 |   });
  773 | 
  774 |   /**
  775 |    * TC-SEARCH-PREM-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang
  776 |    * @tags @premium
  777 |    */
  778 |   test('TC-SEARCH-PREM-028: Kiểm tra trang Trends hiển thị danh sách ảnh, sắp xếp và bảo toàn tham số khi phân trang @premium', async ({
  779 |     page,
  780 |     searchResultPage,
  781 |     trendsPage,
  782 |   }) => {
  783 |     test.setTimeout(90_000);
  784 |     await trendsPage.goToTrendsPage();
  785 | 
  786 |     await test.step('1. Verify tiêu đề H1 và danh sách ảnh mặc định của trang Trends', async () => {
  787 |       await expect(trendsPage.resultHeading).toBeVisible();
  788 |       await expect(trendsPage.resultHeading).toHaveText('人気の写真素材');
  789 | 
  790 |       await expect(trendsPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
  791 |       const count = await trendsPage.getResultCount();
  792 |       expect(count, 'Trang Trends mặc định phải có ảnh hiển thị').toBeGreaterThan(0);
  793 |       expect(count, 'Trang Trends không vượt quá 70 ảnh').toBeLessThanOrEqual(70);
  794 |     });
  795 | 
  796 |     await test.step('2. Thay đổi sắp xếp sang "新着順" (Newest) và verify URL cập nhật', async () => {
  797 |       await trendsPage.selectSort('-releasedate');
  798 |       await expect(page).toHaveURL(/srt=-releasedate/);
  799 |       await expect(trendsPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
  800 |     });
  801 | 
  802 |     await test.step('3. Chuyển sang Trang 2 và verify bảo toàn tham số srt, referer, p=2', async () => {
  803 |       await expect(trendsPage.paginationContainer).toBeVisible();
  804 |       await trendsPage.goToNextPage();
  805 | 
  806 |       await expect(page).toHaveURL(/p=2/);
  807 |       await expect(page).toHaveURL(/srt=-releasedate/);
  808 |       await expect(page).toHaveURL(/referer=more_ranking/);
  809 |       expect(await trendsPage.getActivePageNumber()).toBe('2');
  810 | 
  811 |       const countPage2 = await trendsPage.getResultCount();
  812 |       expect(countPage2, 'Trang 2 của Trends phải tiếp tục có ảnh hiển thị').toBeGreaterThan(0);
  813 |     });
  814 | 
  815 |     await test.step('4. Verify search tại trendsPage hoạt động bình thường', async () => {
  816 |       const searchKeyword = 'ビジネス';
  817 |       await trendsPage.searchAgain(searchKeyword);
  818 | 
> 819 |       await expect(page).toHaveURL(/\/main\/search/);
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  820 |       await expect(page).toHaveURL(new RegExp(`q=${encodeURIComponent(searchKeyword)}`));
  821 |       await expect(searchResultPage.resultHeading).toContainText(`「${searchKeyword}」の写真素材`);
  822 |       await expect(searchResultPage.resultItems.first()).toBeVisible({ timeout: 10_000 });
  823 |       const count = await searchResultPage.getResultCount();
  824 |       expect(count).toBeGreaterThan(0);
  825 |     });
  826 |   });
  827 | 
  828 |   // NHÓM 5: SẮP XẾP & PHÂN TRANG (SORT & PAGINATION)
  829 |   /**
  830 |    * TC-SEARCH-PREM-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2
  831 |    * @tags @premium
  832 |    */
  833 |   test('TC-SEARCH-PREM-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và giữ nguyên sắp xếp khi sang Trang 2 @premium', async ({
  834 |     page,
  835 |     homePage,
  836 |     searchResultPage,
  837 |   }) => {
  838 |     test.setTimeout(90_000);
  839 |     await homePage.search('cat');
  840 |     await searchResultPage.waitForResultDisplay();
  841 | 
  842 |     await searchResultPage.selectNewestSort();
  843 | 
  844 |     await test.step('Verify URL cập nhật tham số srt=-releasedate trên Trang 1', async () => {
  845 |       await expect(page).toHaveURL(/srt=-releasedate/);
  846 |       const count = await searchResultPage.getResultCount();
  847 |       expect(count).toBeGreaterThan(0);
  848 |     });
  849 | 
  850 |     await test.step('Chuyển sang Trang 2 và verify trạng thái sort vẫn giữ nguyên srt=-releasedate', async () => {
  851 |       await searchResultPage.goToNextPage();
  852 |       await expect(page).toHaveURL(/srt=-releasedate/);
  853 |       await expect(page).toHaveURL(/p=2/);
  854 |       expect(await searchResultPage.getActivePageNumber()).toBe('2');
  855 |     });
  856 |   });
  857 | 
  858 |   /**
  859 |    * TC-SEARCH-PREM-030: Sắp xếp theo "人気順" (Phổ biến) thành công không bị chặn bởi popover nâng cấp
  860 |    * Đặc quyền Premium: Cho phép sắp xếp theo độ phổ biến, URL cập nhật srt=recent_popular, KHÔNG bị popover chặn như Free/Guest.
  861 |    * @tags @premium
  862 |    */
  863 |   test('TC-SEARCH-PREM-030: Sắp xếp theo "人気順" (Phổ biến) thành công không bị chặn bởi popover nâng cấp @premium', async ({
  864 |     page,
  865 |     homePage,
  866 |     searchResultPage,
  867 |   }) => {
  868 |     test.setTimeout(90_000);
  869 |     await homePage.search('cat');
  870 |     await searchResultPage.waitForResultDisplay();
  871 | 
  872 |     await searchResultPage.selectPopularSort();
  873 | 
  874 |     await test.step('Verify URL cập nhật tham số srt=recent_popular', async () => {
  875 |       await expect(page).toHaveURL(/srt=recent_popular/);
  876 |     });
  877 | 
  878 |     await test.step('Verify popover chặn nâng cấp Premium KHÔNG xuất hiện đối với tài khoản Premium', async () => {
  879 |       await expect(searchResultPage.popularSortPopover).toBeHidden();
  880 |     });
  881 | 
  882 |     await test.step('Verify kết quả ảnh được hiển thị theo độ phổ biến', async () => {
  883 |       const count = await searchResultPage.getResultCount();
  884 |       expect(count, 'Kết quả sắp xếp phổ biến phải có ảnh hiển thị').toBeGreaterThan(0);
  885 |       await expect(searchResultPage.resultItems.first()).toBeVisible();
  886 |     });
  887 |   });
  888 | 
  889 |   /**
  890 |    * TC-SEARCH-PREM-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang
  891 |    * @tags @premium
  892 |    */
  893 |   test('TC-SEARCH-PREM-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang @premium', async ({
  894 |     page,
  895 |     homePage,
  896 |     searchResultPage,
  897 |   }) => {
  898 |     test.setTimeout(90_000);
  899 |     await homePage.search('dog');
  900 |     await searchResultPage.waitForResultDisplay();
  901 | 
  902 |     await test.step('Verify menu "表示件数" có radio 70件ずつ表示 được check default', async () => {
  903 |       await searchResultPage.openSortDropdown();
  904 |       await expect(searchResultPage.displayCount70Radio).toBeChecked();
  905 |       await expect(searchResultPage.sortDropdownButton).toContainText('70件表示');
  906 |       await searchResultPage.clickElement(searchResultPage.sortDropdownButton);
  907 |     });
  908 | 
  909 |     await test.step('Verify trang 1 hiển thị trong giới hạn tối đa 70 ảnh', async () => {
  910 |       const countPage1 = await searchResultPage.getResultCount();
  911 |       expect(countPage1, 'Trang 1 phải có ảnh hiển thị').toBeGreaterThan(0);
  912 |       expect(countPage1, 'Trang 1 không được vượt quá giới hạn 70 ảnh').toBeLessThanOrEqual(70);
  913 |     });
  914 | 
  915 |     await test.step('Click nút Next và verify sang trang 2 tiếp tục hiển thị trong giới hạn tối đa 70 ảnh', async () => {
  916 |       await searchResultPage.goToNextPage();
  917 |       await expect(page).toHaveURL(/p=2/);
  918 |       expect(await searchResultPage.getActivePageNumber()).toBe('2');
  919 |       const countPage2 = await searchResultPage.getResultCount();
```