---
trigger: model_decision
description: Hướng dẫn sử dụng các tiện ích dùng chung (Utilities Matrix) trong dự án Photo-AC và Illust-AC (Email verification, PDF testing, Fake Mail.tm, Test Data Generator, Helpers).
---

# Quản Trị Tiện Ích Dùng Chung (Utilities Matrix)

Tài liệu hướng dẫn sử dụng các tiện ích dùng chung cho dự án **Photo-AC & Illust-AC** Monorepo.  
**BẮT BUỘC tái sử dụng các utility có sẵn, TUYỆT ĐỐI KHÔNG tự viết lại logic.**

---

## 1. Ma Trận Tiện Ích (Utilities Matrix)

| Utility | File nguồn | Nghiệp vụ áp dụng & Lưu ý quan trọng |
|---|---|---|
| **`EmailVerificationHelper`** | `src/utils/email-verification.helper.ts` | Verify email Gmail (thanh toán, OTP, đăng ký). Gọi Gmail API trực tiếp (cần `credentials.json` + `gmail-token.json`). Set `test.setTimeout(90_000)`. Dùng: `verifyAmountInEmail()`, `verifyTextInEmail()`, `verifyEmailExists()`. Skip nếu tài khoản Free. |
| **`PdfUtils`** | `src/utils/pdf.utils.ts` | Verify PDF hóa đơn (`/user/receipts`). Dùng: `saveAndAttach(download, testInfo, prefix)`, `validatePdfStructure(filePath, minBytes)`, `getMetadata(filePath)` để kiểm tra text và số trang. |
| **`test-data.ts`** | `src/utils/test-data.ts` | Sinh dữ liệu traceable: `generateEmail()`, `generateUsername()`, `generatePassword()`, `generatePhone()`, `generateDisplayName()`. |
| **`helpers.ts`** | `src/utils/helpers.ts` | Tiện ích chung: `retry(fn, maxRetries, delayMs)`, `formatDate(date)`, `normalizeWhitespace(str)`, `randomString(len)`, `enableAdBlocker(page)`, `captureEvidenceWithUrl(page, testInfo, name)`. |
| **`MailTmHelper`** | `src/utils/mail-tm.helper.ts` | Quản lý fake email ngẫu nhiên qua REST API mail.tm để test luồng đăng ký tài khoản / Premium (vượt qua bộ lọc chặn '+' alias của Photo-AC). Dùng: `createAccount()`, `waitForEmail()`, `extractActivationLink()`, `deleteAccount()`. |
| **`envConfig`** | `src/utils/env.config.ts` | Cấu hình môi trường (`baseUrl`, `timeout`, credentials). Đọc qua `envConfig`. |

---

## 2. Hướng Dẫn Chi Tiết Từng Utility

### 2.1 Sinh Dữ Liệu Traceable (`src/utils/test-data.ts`)
Mọi dữ liệu định danh như Email, Username... **bắt buộc sinh động** với timestamp để dễ dàng trace log và tránh trùng lặp:

```typescript
import { generateEmail, generateUsername, generatePassword } from '../../../utils/test-data';

const uniqueEmail = generateEmail('register');      // auto_register_1712049200_a1b2@test.com
const uniqueUser = generateUsername('creator');     // auto_creator_1712049200
const securePassword = generatePassword();          // Test@123456
```

---

### 2.2 Đăng Ký Tài Khoản Ảo Với Mail.tm (`src/utils/mail-tm.helper.ts`)
Dùng khi test luồng Đăng ký Free User hoặc nâng cấp Premium cần nhận email kích hoạt mà không làm rác hòm thư thật:

```typescript
import { MailTmHelper } from '../../../utils/mail-tm.helper';

// 1. Tạo tài khoản ảo ngẫu nhiên
const mailHelper = await MailTmHelper.createAccount('ac_test_user');

try {
  const email = mailHelper.email;
  const password = mailHelper.password;
  
  // Thực hiện điền form đăng ký trên UI...
  
  // 2. Chờ email kích hoạt gửi về
  const message = await mailHelper.waitForEmail(/登録|認証|Verification/, 60_000);
  
  // 3. Trích xuất activation link từ nội dung email
  const activationLink = mailHelper.extractActivationLink(message.text || message.html);
  await page.goto(activationLink);
} finally {
  // 4. Luôn dọn dẹp tài khoản sau khi test
  await mailHelper.deleteAccount().catch(() => {});
  await mailHelper.dispose().catch(() => {});
}
```

---

### 2.3 Kiểm Tra Hóa Đơn PDF (`src/utils/pdf.utils.ts`)
Dùng cho màn hình Xuất hóa đơn (`/user/receipts`):

```typescript
import { PdfUtils } from '../../../utils/pdf.utils';

// Khi người dùng click nút download hóa đơn PDF:
const [download] = await Promise.all([
  page.waitForEvent('download'),
  receiptsPage.clickDownloadPdfButton(),
]);

// 1. Lưu file và đính kèm vào Allure Report
const savedPdfPath = await PdfUtils.saveAndAttach(download, test.info(), 'receipt');

// 2. Kiểm tra cấu trúc file PDF (tối thiểu dung lượng)
PdfUtils.validatePdfStructure(savedPdfPath, 5000);

// 3. Kiểm tra nội dung text xuất hiện trong file PDF
await PdfUtils.verifyContent(savedPdfPath, [
  '領収書',
  'ACワークス株式会社',
  testCompanyName,
  testPersonName,
]);
```

---

### 2.4 Xác Minh Email Gmail Qua API (`src/utils/email-verification.helper.ts`)
Dùng cho các giao dịch thật (đăng ký gói cước Premium, thông báo gia hạn):

```typescript
import { EmailVerificationHelper } from '../../../utils/email-verification.helper';

// Tăng timeout vì Gmail API cần thời gian đồng bộ
test.setTimeout(90_000);

await EmailVerificationHelper.verifyAmountInEmail({
  subject: 'プレミアム会員サービス登録完了のご連絡',
  expectedAmounts: ['1800', '1980'],
  contextLabel: '会員種別-Amount',
});
```

---

### 2.5 Tiện Ích Chung (`src/utils/helpers.ts`)
- **Chặn quảng cáo (Google Vignette Ads)**: `await enableAdBlocker(page);` (khuyên dùng trong `beforeEach` cho Guest & Free User).
- **Chụp ảnh bằng chứng kèm URL**: `await captureEvidenceWithUrl(page, test.info(), 'search-result');`
- **Thử lại khi network chập chờn**: `await retry(async () => { ... }, 3, 2000);`
