---
trigger: model_decision
---

# Feature Catalog: Download, Receipts & Profile — Photo-AC & Illust-AC

> Load rule này khi làm việc với bất kỳ task nào liên quan đến:
> - Tải ảnh (Download Page / Material Detail `/main/detail/:id`)
> - Hóa đơn PDF (Receipts `/user/receipts`)
> - Chỉnh sửa hồ sơ (Profile edit `/user/profile`)

---

## 1. Feature Parity Matrix — Download & Material Actions

| Tính năng | Photo-AC | Illust-AC | Ghi chú kỹ thuật |
|---|:---:|:---:|---|
| **Tải ảnh trực tiếp (Single Download)** | ✅ | ✅ | Premium: download ngay (S/M/L). Free: qua review/quảng cáo. Guest: redirect login/signup. |
| **Tải hàng loạt (Bulk Download)** | ✅ | ✅ | Chỉ dành cho Premium User. Free/Guest hiển thị tooltip chặn. |
| **Mở công cụ Design AC** | ✅ | ✅ | Nút "無料編集ツールで開く" mở sang tab `design-ac.net`. |
| **Mua bản quyền thương mại (Extra License)** | ✅ | ✅ | Nút "今すぐ購入". Chỉ Premium User được phép mua. |
| **Giỏ hàng bản quyền (Bulk Extra License)** | ✅ | ✅ | Nút Cart "ライセンスまとめて購入". Chỉ dành cho Premium User. |
| **Lưu vào Data AC** | ✅ | ✅ | Button logo chữ "A" lưu ảnh vào Data AC. |
| **Hóa đơn PDF (`/user/receipts`)** | ✅ | ✅ | Chỉ Premium User có hóa đơn. Verify qua `PdfUtils`. |
| **Verify email hóa đơn (Gmail API)** | ✅ | ✅ | Dùng `EmailVerificationHelper` (Gmail API). |
| **Chỉnh sửa Profile (`/user/profile`)** | ✅ | ✅ | Đổi tên hiển thị, avatar. Cùng cơ chế cả 2 site. |
| **Lịch sử tải về (`/user/downloads`)** | ✅ | ✅ | Hiển thị danh sách ảnh đã tải. |

---

## 2. Behavior Matrix — Theo Role Trên Download Page

| Hành vi trên trang Detail (`/main/detail/:id`) | Guest (Chưa đăng nhập) | Free User | Premium User | Creator |
|---|:---:|:---:|:---:|:---:|
| **Click button Download (S/M/L)** | Redirect trang login/signup | Tải theo hạn mức (8S + 1M/L) | ✅ Tải ngay không giới hạn | ✅ Theo quyền downloader |
| **Click "まとめてダウンロード" (Bulk download)** | Redirect trang login/signup | ❌ Tooltip `プレミアム専用です` | ✅ Thêm vào folder bulk download | N/A |
| **Click "無料編集ツールで開く" (Design AC)** | Redirect trang login/signup | Tab Design AC + popup Premium | ✅ Mở trực tiếp sang Design AC | N/A |
| **Click "今すぐ購入" (Extra license)** | Popover yêu cầu login/signup | ❌ Popover giới hạn Premium | ✅ Modal nhập thông tin mua EX | N/A |
| **Click icon Cart (Bulk Extra license)** | Popover yêu cầu login/signup | ❌ Tooltip `プレミアム専用です` | ✅ Thêm EX vào giỏ hàng | N/A |
| **Lưu vào Data AC** | Redirect login/signup | Lưu thành công (Size S) | ✅ Lưu thành công mọi size | N/A |

---

## 3. Quy Tắc Cô Lập Creator Acworks (BẮT BUỘC)

> **CRITICAL RULE**: Khi viết automation test cho Download trên Photo-AC, **BẮT BUỘC** chỉ được download tác phẩm của chính **Acworks**, tuyệt đối **CẤM** download tác phẩm của các Creator cá nhân khác nhằm tránh ảnh hưởng số liệu thống kê điểm thưởng/ranking của creator.

- **Sample Material ID chính thức**: `1651238` (Tiêu đề: `ソファーでVRゴーグルをつけている男性5`)
- **Creator Profile chính thức**: `/profile/43626` (Tên hiển thị: `ACworks`)
- **Safety Badge**: Đảm bảo huy hiệu `SAFETY - 本人確認済` hiển thị trên trang chi tiết.

```typescript
// Bắt buộc verify creator trước khi thực hiện hành động download:
await expect(downloadImagePage.creatorName).toBeVisible();
await expect(downloadImagePage.creatorLink).toHaveAttribute('href', /profile\/43626/);
```

---

## 4. Bảng Tra Cứu Locators Đã Xác Minh Trên UI Thực Tế

| Role | Thành phần UI | Semantic Locator / CSS Selector đã verify | Hành vi phản hồi mong đợi |
|---|---|---|---|
| **Guest** | Nút Download | `getByRole('button', { name: 'ダウンロード', exact: true })`<br>hoặc `a.historyDowloads:has-text("ダウンロード")` | Chuyển hướng tới URL chứa `/login` hoặc `/signup` |
| **Guest** | Nút Bulk Download | `locator('a[aria-label="まとめてダウンロード"]')`<br>hoặc `getByRole('button', { name: 'まとめてダウンロード' })` | Chuyển hướng tới URL chứa `/login` hoặc `/signup` |
| **Guest** | Nút 今すぐ購入 | `locator('a[data-popover-content="#license-nologin-popover"]')` | Hiển thị popover `先にログインをお願いします。初めての方は無料会員登録` |
| **Free** | Nút Bulk Download | `locator('a.btn-bulkdownload')` | Hiển thị tooltip `div.tooltip.show` chứa text `プレミアム専用です` |
| **Free** | Nút 今すぐ購入 | `locator('a[data-popover-content="#ex-ticket-tooltip-msg"]')` | Hiển thị popover `div.popover.show` chứa text `商品化ライセンスの購入は、プレミアム会員様限定です` |
| **Free** | Nút Cart | `locator('a.btn-ex-cart')` | Hiển thị tooltip `div.tooltip.show` chứa text `プレミアム専用です` |
| **Premium** | Nút Download Size S | `locator('a.button-download[href*="sz=s"]')` | Phát sinh sự kiện tải file `page.waitForEvent('download')` |
| **Premium** | Nút Download Size M | `locator('a.button-download[href*="sz=m"]')` | Phát sinh sự kiện tải file `page.waitForEvent('download')` |
| **Premium** | Nút Download Size L | `locator('a.button-download[href*="sz=l"]')` | Phát sinh sự kiện tải file `page.waitForEvent('download')` |
| **Premium** | Nút Mở Design AC | `locator('a[title="無料編集ツールで開く"]')` | Mở URL hoặc tab mới chứa domain `design-ac.net` |

---

## 5. URL Patterns

| Thao tác | Photo-AC URL | Illust-AC URL |
|---|---|---|
| **Chi tiết ảnh Acworks** | `/main/detail/1651238` | `/main/detail/:id` |
| **Profile Creator Acworks** | `/profile/43626` | `/profile/:id` |
| **Lịch sử tải ảnh** | `/user/downloads` | `/user/downloads` |
| **Hóa đơn thanh toán** | `/user/receipts` | `/user/receipts` |
| **Chỉnh sửa hồ sơ** | `/user/profile` | `/user/profile` |

---

## 6. Receipts — Quy Tắc Kiểm Thử PDF Hóa Đơn

```typescript
// BẮT BUỘC dùng PdfUtils từ src/utils/pdf.utils.ts:
import { PdfUtils } from '../../utils/pdf.utils';

const download = await page.waitForEvent('download');
const filePath = await PdfUtils.saveAndAttach(download, testInfo, 'receipt');
await PdfUtils.validatePdfStructure(filePath, 5000); // minBytes
const metadata = await PdfUtils.getMetadata(filePath);
```

**Skip với Free User:**
```typescript
test('TC-RECEIPT-001: ...', async ({ page }) => {
  test.skip(process.env.USER_ROLE === 'free', 'Free User không có receipt');
  // ...
});
```

---

## 7. Email Verification — Quy Tắc Kiểm Thử Email

```typescript
// BẮT BUỘC set timeout tối thiểu 90s cho Gmail API:
test.setTimeout(90_000);

import { EmailVerificationHelper } from '../../utils/email-verification.helper';
const emailHelper = new EmailVerificationHelper();

// Verify số tiền trong email hóa đơn:
await emailHelper.verifyAmountInEmail(recipientEmail, expectedAmount);

// Verify text tùy chỉnh:
await emailHelper.verifyTextInEmail(recipientEmail, 'ご購入ありがとう');
```

---

## 8. Quy Trình Bắt Buộc Khi Viết Test Cho Download Feature

```
BƯỚC 1: XÁC MINH SITE & CREATOR
   - Chỉ test trên material thuộc creator Acworks (ID: 1651238, creator ID: 43626).
   - Tuyệt đối KHÔNG tương tác vào ảnh của creator bên thứ ba.

BƯỚC 2: AD BLOCKER & MODAL DEFENSE
   - Gọi `await enableAdBlocker(page);` trong beforeEach cho Guest và Free User để chặn Google Vignette Ads.

BƯỚC 3: SỬ DỤNG PAGE OBJECT DÙNG CHUNG
   - Sử dụng `DownloadImagePage` (`src/pages/downloader/download-image.page.ts`).
   - Import `{ test, expect }` từ `src/fixtures/base.fixture`.

BƯỚC 4: SESSION ISOLATION THEO ROLE MATRIX
   - Guest: `test.use({ storageState: { cookies: [], origins: [] } })` trong spec `download-guest.spec.ts`.
   - Free User: đặt tên spec `download-freeUser.spec.ts` để project `chromium-free-user` tự inject auth state.
   - Premium User: đặt tên spec `download-premium.spec.ts` để project `chromium-premium` tự inject auth state.
```

---

## 9. Danh Mục Cấm Tuyệt Đối (Anti-Patterns) Cho Feature Download

| Anti-Pattern | Lý do cấm | Giải pháp chuẩn |
|---|---|---|
| **Tải ảnh của creator khác** | Làm sai lệch ranking/thu nhập của creator thật trên hệ thống production/staging | **Bắt buộc** chỉ dùng ảnh của creator `ACworks` (`ID: 1651238`, Profile: `/profile/43626`) |
| **Chạy test "Check limit download" (TC 17) trên tài khoản chung** | Đốt hết 10 lượt tải/ngày của tài khoản Free User dùng chung, làm gãy các spec khác | Phải dùng tài khoản test độc lập hoặc test ở môi trường mock |
| **Thực hiện thanh toán tiền thật ở các test Mua EX** | Gây phát sinh chi phí và trừ tiền thật | Chỉ kiểm tra đến bước hiển thị modal/popover, tuyệt đối không gửi form thanh toán thẻ tín dụng |
| **Dùng `page.waitForTimeout` chờ tải file** | Gây flaky test do mạng dao động | Bắt buộc dùng `page.waitForEvent('download', { timeout: 30_000 })` |
| **Bỏ qua `enableAdBlocker` ở Guest/Free User** | Google Vignette overlay che mất nút download gây `TimeoutError` | Luôn gọi `await enableAdBlocker(page)` trong `beforeEach` |

