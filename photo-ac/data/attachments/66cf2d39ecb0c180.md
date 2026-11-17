# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: downloader/guest/download.spec.ts >> Download — Guest User (No login) >> TC-DOWNLOAD-GUEST-001: Click Download hiển thị yêu cầu đăng nhập
- Location: photo-ac/src/tests/downloader/guest/download.spec.ts:25:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href*="/profile/43626"]').filter({ hasText: 'ACworks' }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('a[href*="/profile/43626"]').filter({ hasText: 'ACworks' }).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: "📍 URL: https://test-lien.photo-ac.com/main/detail/1651238"
```

# Test source

```ts
  1  | import { test, expect } from '../../../fixtures/base.fixture';
  2  | import { captureEvidenceWithUrl, enableAdBlocker } from '../../../utils/helpers';
  3  | import { PhotoDetailPage } from '../../../pages/downloader/photo-detail.page';
  4  | 
  5  | /**
  6  |  * Test Suite: Download — Guest User (No login)
  7  |  */
  8  | test.describe('Download — Guest User (No login)', () => {
  9  |   // Session rỗng cho Guest User
  10 |   test.use({ storageState: { cookies: [], origins: [] } });
  11 | 
  12 |   test.beforeEach(async ({ page, photoDetailPage }) => {
  13 |     await enableAdBlocker(page);
  14 |     await photoDetailPage.goToAcworksPhotoDetail(PhotoDetailPage.ACWORKS_DEFAULT_PHOTO_ID);
  15 | 
  16 |     await test.step('Xác minh tác phẩm thuộc creator Acworks', async () => {
> 17 |       await expect(photoDetailPage.creatorName).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  18 |       await expect(photoDetailPage.creatorLink).toHaveAttribute('href', /profile\/43626/);
  19 |     });
  20 |   });
  21 | 
  22 |   /**
  23 |    * TC-DOWNLOAD-GUEST-001: Guest click button Download -> Yêu cầu đăng nhập
  24 |    */
  25 |   test('TC-DOWNLOAD-GUEST-001: Click Download hiển thị yêu cầu đăng nhập', async ({
  26 |     page,
  27 |     photoDetailPage,
  28 |   }, testInfo) => {
  29 |     test.setTimeout(60_000);
  30 | 
  31 |     await test.step('Chọn kích thước ảnh Size S', async () => {
  32 |       await photoDetailPage.selectSize('S');
  33 |     });
  34 | 
  35 |     await test.step('Click button Download và xác minh yêu cầu đăng nhập', async () => {
  36 |       await expect(photoDetailPage.guestDownloadButton).toBeVisible();
  37 |       const href = await photoDetailPage.guestDownloadButton.getAttribute('href');
  38 |       expect(href).toMatch(/login|signup/);
  39 | 
  40 |       await photoDetailPage.clickGuestDownload();
  41 |       await expect(page).toHaveURL(/login|signup/);
  42 | 
  43 |       await captureEvidenceWithUrl(page, testInfo, 'Guest-Download-Login-Redirect');
  44 |     });
  45 |   });
  46 | 
  47 |   /**
  48 |    * TC-DOWNLOAD-GUEST-002: Guest click button まとめてダウンロード (Bulk download) -> Yêu cầu đăng nhập
  49 |    */
  50 |   test('TC-DOWNLOAD-GUEST-002: Click button まとめてダウンロード hiển thị yêu cầu đăng nhập', async ({
  51 |     page,
  52 |     photoDetailPage,
  53 |   }, testInfo) => {
  54 |     test.setTimeout(60_000);
  55 | 
  56 |     await test.step('Click button まとめてダウンロード và xác minh yêu cầu đăng nhập', async () => {
  57 |       await expect(photoDetailPage.guestBulkDownloadButton).toBeVisible();
  58 |       const href = await photoDetailPage.guestBulkDownloadButton.getAttribute('href');
  59 |       expect(href).toMatch(/login|signup/);
  60 | 
  61 |       await photoDetailPage.clickGuestBulkDownload();
  62 |       await expect(page).toHaveURL(/login|signup/);
  63 | 
  64 |       await captureEvidenceWithUrl(page, testInfo, 'Guest-Bulk-Download-Login-Redirect');
  65 |     });
  66 |   });
  67 | 
  68 |   /**
  69 |    * TC-DOWNLOAD-GUEST-003: Guest click button 今すぐ購入 (Extra license) -> Hiển thị popover yêu cầu đăng nhập
  70 |    */
  71 |   test('TC-DOWNLOAD-GUEST-003: Click button 今すぐ購入 hiển thị popover yêu cầu đăng nhập', async ({
  72 |     page,
  73 |     photoDetailPage,
  74 |   }, testInfo) => {
  75 |     test.setTimeout(60_000);
  76 | 
  77 |     await test.step('Click button 今すぐ購入 (Extra license)', async () => {
  78 |       await expect(photoDetailPage.guestBuyExtraLicenseButton).toBeVisible();
  79 |       await photoDetailPage.clickGuestBuyExtraLicense();
  80 |     });
  81 | 
  82 |     await test.step('Xác minh popover yêu cầu đăng nhập hiển thị chính xác', async () => {
  83 |       await expect(photoDetailPage.guestPopover).toBeVisible();
  84 |       await expect(photoDetailPage.guestPopover).toContainText('先にログインをお願いします');
  85 |       await expect(photoDetailPage.guestPopover).toContainText('無料会員登録');
  86 | 
  87 |       await captureEvidenceWithUrl(page, testInfo, 'Guest-Extra-License-Login-Popover');
  88 |     });
  89 |   });
  90 | });
  91 | 
```