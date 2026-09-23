---
trigger: model_decision
---

# Feature Catalog: Download, Receipts & Profile — Photo-AC & Illust-AC

> Load rule này khi làm việc với bất kỳ task nào liên quan đến:
> Tải ảnh (download), Hóa đơn PDF (receipts `/user/receipts`), Chỉnh sửa hồ sơ (profile edit).

---

## Feature Parity Matrix — Download & Account

| Tính năng | Photo-AC | Illust-AC | Ghi chú |
|---|:---:|:---:|---|
| **Tải ảnh miễn phí (Free download)** | ✅ | ✅ | Cả 2 site có giới hạn lượt/ngày với Free User |
| **Tải ảnh Premium (Unlimited)** | ✅ | ✅ | Premium User — không giới hạn |
| **Hóa đơn PDF (`/user/receipts`)** | ✅ | ✅ | Chỉ Premium User có hóa đơn |
| **Verify PDF hóa đơn** | ✅ | ✅ | Dùng `PdfUtils` từ `src/utils/pdf.utils.ts` |
| **Verify email hóa đơn (Gmail API)** | ✅ | ✅ | Dùng `EmailVerificationHelper` |
| **Chỉnh sửa Profile (`/user/profile`)** | ✅ | ✅ | Cùng cơ chế |
| **Hiển thị lịch sử tải** | ✅ | ✅ | `/user/downloads` |

---

## Receipts — Quy Tắc Kiểm Thử PDF

```typescript
// BẮT BUỘC dùng PdfUtils, KHÔNG tự viết lại logic:
import { PdfUtils } from '../../utils/pdf.utils';

const download = await page.waitForEvent('download');
const filePath = await PdfUtils.saveAndAttach(download, testInfo, 'receipt');
await PdfUtils.validatePdfStructure(filePath, 5000); // minBytes
const metadata = await PdfUtils.getMetadata(filePath);
```

**Skip với Free User:**
```typescript
test('TC-RECEIPT-001: ...', async ({ page }) => {
  // Free User không có hóa đơn → skip
  test.skip(process.env.USER_ROLE === 'free', 'Free User không có receipt');
  // ...
});
```

---

## Email Verification — Quy Tắc

```typescript
// BẮT BUỘC set timeout cao cho Gmail API:
test.setTimeout(90_000);

import { EmailVerificationHelper } from '../../utils/email-verification.helper';
const emailHelper = new EmailVerificationHelper();

// Verify số tiền trong email hóa đơn:
await emailHelper.verifyAmountInEmail(recipientEmail, expectedAmount);

// Verify text tùy chỉnh:
await emailHelper.verifyTextInEmail(recipientEmail, 'ご購入ありがとう');
```

---

## Profile Edit — Behavior Matrix

| Hành vi | Guest | Free | Premium | Creator |
|---|:---:|:---:|:---:|:---:|
| Truy cập `/user/profile` | ❌ Redirect login | ✅ | ✅ | ✅ |
| Đổi Display Name | N/A | ✅ | ✅ | ✅ |
| Đổi Avatar | N/A | ✅ | ✅ | ✅ |
| Xem Receipt `/user/receipts` | ❌ | ❌ | ✅ | N/A |
