---
trigger: always_on
---

# Quy Tắc Chung cho QA Automation (Playwright TypeScript)

Áp dụng cho mọi tác vụ automation testing với Playwright và TypeScript.

## 1. Kiến Trúc và Framework

- Bắt buộc sử dụng mô hình **Page Object Model (POM)**.
- Phân tách rõ ràng:
  - **Page classes:** Khai báo locators + methods tương tác UI
  - **Test classes:** Chứa logic kiểm thử + assertions
  - **Fixtures:** Quản lý setup/teardown và tái sử dụng state
  - **Test data:** Tách riêng khỏi code chức năng (JSON, utils)
- Assertions chỉ đặt trong Test classes, KHÔNG đặt trong Page classes.

## 2. Sinh Dữ Liệu Test

- Tất cả trường yêu cầu unique (Email, Username, Mã...) **phải sinh động**, không hardcode.
- Sử dụng Timestamp hoặc thư viện Faker.
- Dữ liệu phải **traceable** — nhìn vào hệ thống biết ngay test nào tạo ra:
  ```
  Format: [prefix]_[tenTest]_[timestamp]_[random]
  Vi du:  auto_taoKhachHang_20260402_A3F2@test.com
  ```
- Hỗ trợ chạy song song: mỗi test method có data riêng biệt, không conflict.

## 3. Chất Lượng Code

- Không logic trùng lặp — tạo helper methods cho các hành động lặp đi lặp lại.
- Code phải đơn giản, dễ đọc, dễ bảo trì.
- Trước khi bàn giao code:
  - Xóa toàn bộ `console.log` sinh ra khi debug
  - Xóa code bị comment
  - Xóa locator / biến không sử dụng

## 4. Quản Lý File và Thư Mục

- KHÔNG tự động xóa file source khi chưa xác nhận với user.
- Kiểm tra cấu trúc thư mục hiện có trước khi tạo file mới — tránh trùng lặp.
- Đặt file đúng thư mục theo kiến trúc project (xem `framework_architect`).

## 5. Quy Tắc Đặt Tên (TypeScript / Playwright)

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| Page class | PascalCase + hậu tố `Page` | `LoginPage.ts`, `CartPage.ts` |
| Test file | kebab-case + `.spec.ts` | `login.spec.ts`, `cart.spec.ts` |
| Test block | `test('mô tả hành vi')` | `test('dang nhap thanh cong')` |
| Locator biến | lowerCamelCase hoặc readonly | `readonly loginButton` |
| Fixture file | kebab-case + `.fixture.ts` | `auth.fixture.ts` |
| Utils | PascalCase hoặc kebab-case | `DataGenerator.ts`, `test-data.ts` |

## 6. Assertions (Kiểm Tra Kết Quả)

- Mỗi test case **BẮT BUỘC** có ít nhất 1 assertion ở cuối.
- Nên có assertion xen kẽ ở các bước quan trọng.
- Assert phải mô tả rõ expected behavior:
  ```typescript
  await expect(page.getByText('Dang nhap thanh cong')).toBeVisible();
  await expect(page).toHaveURL(/dashboard/);
  ```

## 7. Tính Độc Lập Của Test

- Mỗi test case phải **độc lập** — không phụ thuộc kết quả test khác.
- Setup/teardown rõ ràng qua `beforeEach` / `afterEach`.
- Không chia sẻ state giữa các test methods.
- Dùng fixture để tái sử dụng logic setup (đăng nhập, tạo data).

## 8. Project-Specific Utilities (BẮT BUỘC sử dụng)

Dự án có sẵn các utility đã được xây dựng. **KHÔNG tự viết lại logic đã có** — phải import và tái sử dụng đúng utility theo từng loại test case.

### 8.1 Verify Email (`EmailVerificationHelper`)

> **Dùng khi:** Test case yêu cầu kiểm tra email nhận được qua Gmail (số tiền thanh toán, nội dung thông báo, xác nhận đăng ký...)

**Import:**
```typescript
import { EmailVerificationHelper } from '../../utils/email-verification.helper';
```

**Các methods:**

| Method | Mô tả | Khi nào dùng |
|---|---|---|
| `verifyAmountInEmail()` | Tìm email chứa amount khớp (cross-compare multi-email) | Verify số tiền thanh toán |
| `verifyTextInEmail()` | Tìm email chứa text cụ thể (AND/OR logic) | Verify nội dung email |
| `verifyEmailExists()` | Kiểm tra email tồn tại + trả về body | Check email đã gửi |
| `getAllMatchingEmails()` | Lấy tất cả email khớp subject, không có assertion | Custom verification |

**Ví dụ:**
```typescript
// Verify số tiền thanh toán trong email
await EmailVerificationHelper.verifyAmountInEmail({
  subject: 'プレミアム会員サービス登録完了のご連絡',
  expectedAmounts: ['1800', '1980'], // tax-excluded + tax-included
  contextLabel: '会員種別-Amount',
});

// Verify nội dung text email
await EmailVerificationHelper.verifyTextInEmail({
  subject: '会員登録完了',
  expectedTexts: ['プレミアム会員', 'user@example.com'],
  contextLabel: 'Registration-Email',
});

// Skip test nếu account không phải premium (không có amount)
if (membershipAmounts.length === 0) {
  test.skip(true, `Account is not a premium member — no amounts found.`);
}
```

**Lưu ý quan trọng:**
- KHÔNG dùng browser để truy cập Gmail — `EmailVerificationHelper` gọi Gmail API trực tiếp.
- Gmail API cần `credentials.json` + `gmail-token.json` ở project root (local) hoặc GitHub Secrets `GMAIL_CREDENTIALS` + `GMAIL_TOKEN` (CI).
- Test case verify email phải `test.setTimeout(90_000)` vì API search có thể mất thời gian.
- Nếu account là free member → KHÔNG có amount → phải `test.skip()` thay vì fail.

---

### 8.2 Verify PDF (`PdfUtils`)

> **Dùng khi:** Test case tải file PDF và cần kiểm tra nội dung, cấu trúc, số trang.

**Import:**
```typescript
import { PdfUtils } from '../../utils/pdf.utils';
```

**Các methods:**

| Method | Mô tả |
|---|---|
| `PdfUtils.saveAndAttach(download, testInfo, prefix)` | Lưu PDF download + đính kèm vào report |
| `PdfUtils.validatePdfStructure(filePath, minBytes)` | Kiểm tra file tồn tại, đúng extension, magic bytes |
| `PdfUtils.getMetadata(filePath)` | Parse PDF → lấy text content + số trang |

**Ví dụ:**
```typescript
// Step 1: Capture download event
const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
await receiptsPage.downloadButton.click();
const download = await downloadPromise;

// Step 2: Save + attach to report
const downloadPath = await PdfUtils.saveAndAttach(download, test.info(), 'receipt');

// Step 3: Validate structure
PdfUtils.validatePdfStructure(downloadPath, 10_000); // min 10KB

// Step 4: Verify text content
const pdfData = await PdfUtils.getMetadata(downloadPath);
const pdfText = pdfData.text;
expect(pdfText.includes('領収書')).toBe(true);
expect(pdfData.numPages).toBe(1);
```

---

### 8.3 Test Data (`test-data.ts`)

> **Dùng khi:** Cần sinh dữ liệu unique cho test (email, username, password, phone, display name).

**Import:**
```typescript
import { generateEmail, generateUsername, generatePassword, generatePhone, generateDisplayName } from '../../utils/test-data.ts';
```

**Format sinh ra:** `auto_[testName]_[timestamp]_[random]`

**Ví dụ:**
```typescript
const email = generateEmail('register');     // auto_register_20260709213700_A3F2@test.com
const username = generateUsername('login');  // auto_login_20260709213700_A3F2
const password = generatePassword();        // random password with uppercase/lowercase/digit/special
```

---

### 8.4 General Helpers (`helpers.ts`)

> **Dùng khi:** Cần các tiện ích chung: retry, sleep, format date, random string.

**Import:**
```typescript
import { retry, sleep, randomString, formatDate } from '../../utils/helpers';
```

| Function | Mô tả |
|---|---|
| `retry(fn, maxRetries, delayMs)` | Retry async operation khi fail |
| `sleep(ms)` | Wait — **chỉ dùng khi không có cách nào khác** |
| `randomString(length)` | Random alphanumeric string |
| `formatDate(date, locale)` | Format date để logging |
| `normalizeWhitespace(str)` | Trim + collapse multiple spaces |

---

### Tóm tắt — Chọn Utility Theo Loại Test Case

| Loại test case | Utility phải dùng |
|---|---|
| Verify **email nhận được** (amount, text, tồn tại) | `EmailVerificationHelper` |
| Verify **nội dung PDF** tải về | `PdfUtils` |
| Sinh **test data** unique (email, username, password) | `test-data.ts` |
| **Retry / wait / format** | `helpers.ts` |
| **Cấu hình môi trường** (URL, credentials) | `env.config.ts` |
