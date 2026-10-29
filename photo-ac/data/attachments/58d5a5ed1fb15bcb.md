# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/free-user/cls-details.spec.ts >> CLs Details >> TC-Details-001: Open detail page for searchResultPage
- Location: photo-ac/src/tests/downloader/free-user/cls-details.spec.ts:4:9

# Error details

```
Error: page.waitForURL: Test ended.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Test source

```ts
  1  | import { test, expect } from '../../../fixtures/base.fixture';
  2  | 
  3  | test.describe('CLs Details', () => {
  4  |     test('TC-Details-001: Open detail page for searchResultPage', async ({
  5  |         page,
  6  |         searchResultPage,
  7  |         photoDetailPage,
  8  |     }) => {
  9  |         for (let i = 0; i <= 10; i++) {
  10 |             await test.step(`Lần lặp ${i}: Mở và kiểm tra trang chi tiết ảnh thứ ${i + 1}`, async () => {
  11 |                 await searchResultPage.navigate('/main/search?q=%E7%A7%8B&creator=acworks&layout=vertical');
  12 |                 await searchResultPage.waitForResultDisplay();
  13 | 
  14 |                 // Mở ảnh thứ i (đã tự động lọc bỏ quảng cáo)
  15 |                 await searchResultPage.openDetailPageForItem(i);
  16 | 
  17 |                 // Chờ chuyển hướng vào trang detail
> 18 |                 await page.waitForURL(/\/main\/detail\/\d+/, { timeout: 25_000 });
     |                            ^ Error: page.waitForURL: Test ended.
  19 |                 await expect(page).toHaveURL(/\/main\/detail\/\d+/);
  20 | 
  21 |                 // Cuộn xuống footer
  22 |                 const footerElement = page.locator('footer#newFooter');
  23 |                 await footerElement.scrollIntoViewIfNeeded().catch(() => { });
  24 | 
  25 |                 // Kiểm tra và click vào tác giả ACworks (dùng locator semantic từ photoDetailPage)
  26 |                 const creatorLink = page.locator('#main-thumb a:has-text("ACworks")');
  27 |                 await creatorLink.scrollIntoViewIfNeeded();
  28 |                 await expect(creatorLink).toBeVisible();
  29 |                 await creatorLink.click();
  30 |             });
  31 |         }
  32 |     });
  33 | });
  34 | 
```