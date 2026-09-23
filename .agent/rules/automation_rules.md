---
trigger: always_on
---

# Quy Tắc Chung Cho QA Automation (Playwright TypeScript)

Áp dụng cho mọi tác vụ automation testing với Playwright + TypeScript trên **Monorepo Photo-AC & Illust-AC** (`d:\Js\photo-ac-test\`).

---

## 1. Kiến Trúc & Thiết Kế (Page Object Model)

- **Mô hình POM phân tầng:**
  - **Page classes (`src/pages/`):** Khai báo locators + methods tương tác UI. TUYỆT ĐỐI KHÔNG đặt business assertions trong Page classes.
  - **Test specs (`src/tests/`):** Chứa kịch bản test, luồng thao tác và assertions.
  - **Fixtures (`src/fixtures/`):** Khởi tạo Page Objects, quản lý auth session và Allure metadata.
- **Import bắt buộc:** Mọi spec file **BẮT BUỘC** import `{ test, expect }` từ `src/fixtures/base.fixture`, CẤM import trực tiếp từ `@playwright/test`.
- **Reporting:** Mọi action và assertion quan trọng phải bọc trong `test.step('mô tả')` phục vụ Allure Report.
- **Tính độc lập:** Mỗi test case phải độc lập (`beforeEach`/`afterEach`), không chia sẻ state giữa các test methods.
- **100% Mô phỏng người dùng thật (True User Simulation - BẮT BUỘC):**
  - Mọi kịch bản kiểm thử E2E (đặc biệt là Tìm kiếm & Bộ lọc - Search & Filters) **BẮT BUỘC thao tác trực tiếp trên giao diện UI** (click mở menu toolbar/dropdown, fill vào input, chọn radio/checkbox, nhấn Enter).
  - **TUYỆT ĐỐI CẤM** việc lạm dụng sửa URL / tiêm query params (`page.goto('...?param=val')`, `searchWithCombinedParams()`) để đi tắt hoặc giả lập filter, trừ trường hợp test case đó có mục đích cụ thể là kiểm tra Deep-link URL routing hoặc URL persistence khi phân trang.
  - Khi element nằm trong dropdown/modal, luôn dùng `:visible` scope để tránh tương tác nhầm vào các element ẩn của responsive template.

---

## 2. Tiêu Chuẩn Viết Code & Đặt Tên

- **Quy ước đặt tên:**
  - Page Class: `PascalCase` + hậu tố `Page` (vd: `LoginPage.ts`, `SearchResultPage.ts`).
  - Spec File: `kebab-case.spec.ts` (vd: `search-freeUser.spec.ts`).
  - Test Block: `test('TC_ID: mô tả hành vi @tag', async ({...}) => {})`.
  - Locator biến: `private readonly lowerCamelCase` (vd: `private readonly loginButton`).
  - Fixture / Utils: `kebab-case.fixture.ts` / `kebab-case.ts` hoặc `PascalCase.ts`.
- **Semantic Locators:** Ưu tiên theo thứ tự: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTestId` > `css`. CẤM dùng positional xpath hoặc dynamic class.
- **Sinh Test Data (`src/utils/test-data.ts`):**
  - Dữ liệu unique (Email, Username...) **bắt buộc sinh động** theo format: `auto_[tenTest]_[timestamp]_[random]` (vd: `generateEmail('register')`).
- **Assertions:** Mỗi test case bắt buộc có ít nhất 1 assertion Web-First (`toBeVisible()`, `toHaveURL()`, `toHaveText()`). CẤM dùng hard sleep (`waitForTimeout`, `setTimeout`).

---

## 3. Quản Trị Tiện Ích Dùng Chung (Utilities Matrix)

Dự án đã có sẵn các utility chuyên biệt. **BẮT BUỘC tái sử dụng, KHÔNG tự viết lại logic**:

| Utility | File nguồn | Nghiệp vụ áp dụng & Lưu ý quan trọng |
|---|---|---|
| **`EmailVerificationHelper`** | `src/utils/email-verification.helper.ts` | Verify email Gmail (thanh toán, OTP, đăng ký). Gọi Gmail API trực tiếp (cần `credentials.json` + `gmail-token.json`). Set `test.setTimeout(90_000)`. Dùng: `verifyAmountInEmail()`, `verifyTextInEmail()`, `verifyEmailExists()`. Skip nếu tài khoản Free. |
| **`PdfUtils`** | `src/utils/pdf.utils.ts` | Verify PDF hóa đơn (`/user/receipts`). Dùng: `saveAndAttach(download, testInfo, prefix)`, `validatePdfStructure(filePath, minBytes)`, `getMetadata(filePath)` để kiểm tra text và số trang. |
| **`test-data.ts`** | `src/utils/test-data.ts` | Sinh dữ liệu traceable: `generateEmail()`, `generateUsername()`, `generatePassword()`, `generatePhone()`, `generateDisplayName()`. |
| **`helpers.ts`** | `src/utils/helpers.ts` | Tiện ích chung: `retry(fn, maxRetries, delayMs)`, `formatDate(date)`, `normalizeWhitespace(str)`, `randomString(len)`. |
| **`envConfig`** | `src/utils/env.config.ts` | Cấu hình môi trường (`baseUrl`, `timeout`, credentials). Đọc qua `envConfig`. |

---

## 4. Kiến Trúc Multi-Role & Quản Lý Phiên Đăng Nhập

Dự án phân tách 4 vai trò (Roles) với session riêng biệt trên Chromium và Firefox.
**TUYỆT ĐỐI KHÔNG dùng chung session giữa Chromium và Firefox.**

> Chi tiết Role Matrix, StorageState, và Setup files → đọc [`.agent/rules/features/auth.md`](file:///d:/Js/photo-ac-test/.agent/rules/features/auth.md)

### Quy Tắc Session Isolation Tóm Tắt

- **Guest User:** `test.use({ storageState: { cookies: [], origins: [] } })` trong spec.
- **Free / Premium / Creator:** để project config (`playwright.config.ts`) tự inject — **KHÔNG** khai báo trong spec.
- **CẤM** sửa/xóa trực tiếp file `.auth/*.json`.

---

## 5. Kiểm Soát Chất Lượng, Shared Files & Chống Hồi Quy (Zero Regression)

Mọi thay đổi mã nguồn trước khi merge/commit **bắt buộc tuân thủ `code_review_rules.md`** (trong Global Config):

1. **Bảo vệ File Dùng Chung (Shared Files Gate):**
   - Hạn chế tối đa sửa đổi Tier 1 (`base.fixture.ts`, `base.page.ts`, `playwright.config.ts`, `auth.fixture.ts`) và Tier 2 (`src/pages/common/**`, `src/utils/**`).
   - Tuân thủ **Open-Closed Principle (OCP)**: Ưu tiên mở rộng method mới hoặc dùng `optional parameters` (`param?: type`). CẤM thay đổi signature làm break caller cũ.
2. **Kiểm soát Vùng Ảnh Hưởng (Blast Radius Audit):**
   - Trước khi sửa method dùng chung, bắt buộc dùng `grep_search` quét toàn bộ callers trong `src/tests/**`.
   - Lên kế hoạch chạy regression test cho mọi module liên quan.
3. **Danh mục cấm tuyệt đối (Zero-Tolerance Anti-Patterns):**
   - ⛔ Cấm `test.only`, `describe.only` (làm bỏ qua toàn bộ test suites khác).
   - ⛔ Cấm `page.waitForTimeout` hoặc hard sleep (gây flaky).
   - ⛔ Cấm `console.log` và code comment rác sót lại.
   - ⛔ Cấm hardcode credentials vào source code.

---

## 6. Feature Catalog System (BẮT BUỘC ĐỌC TRƯỚC KHI VIẾT CODE)

> **CRITICAL:** Mọi tính năng đặc thù của từng site được catalog hóa riêng trong `.agent/rules/features/`.
> AI BẮT BUỘC đọc file tương ứng TRƯỚC khi viết code cho feature đó.

### Index Feature Catalog

| Feature | File | Load khi nào |
|---|---|---|
| **Search & Filters** | [`.agent/rules/features/search.md`](file:///d:/Js/photo-ac-test/.agent/rules/features/search.md) | Tìm kiếm, filter toolbar, sort, pagination, search limit |
| **Download & Receipts** | [`.agent/rules/features/download.md`](file:///d:/Js/photo-ac-test/.agent/rules/features/download.md) | Tải ảnh, hóa đơn PDF, profile edit |
| **Creator** | [`.agent/rules/features/creator.md`](file:///d:/Js/photo-ac-test/.agent/rules/features/creator.md) | Ranking, upload tác phẩm, portfolio |
| **Auth & Session** | [`.agent/rules/features/auth.md`](file:///d:/Js/photo-ac-test/.agent/rules/features/auth.md) | Login, session, `.auth/*.json`, role setup |
| **[Feature mới]** | `.agent/rules/features/<ten-feature>.md` | Copy từ `_TEMPLATE.md` |

### Quy Trình Bắt Buộc 3 Bước

```
BƯỚC 1: XÁC ĐỊNH SITE
   Đọc đường dẫn file hiện tại:
   - photo-ac/ → Photo-AC (photo-ac.com)
   - illust-ac/ → Illust-AC (ac-illust.com)

BƯỚC 2: ĐỌC FEATURE CATALOG
   Mở file .agent/rules/features/<feature>.md → xác nhận feature ✅/❌ trên site

BƯỚC 3: VERIFY TRÊN BROWSER (NẾu không chắc)
   Mở browser → inspect DOM thực tế → không đoán mò
```

### Khi Có Feature Mới (Quy Trình Chuẩn)

```
1. Copy _TEMPLATE.md → features/<ten-feature>.md
2. Inspect DOM thực tế trên browser
3. Điền Feature Parity Matrix (✅/❌ rõ ràng)
4. Điền Behavior Matrix theo Role
5. Commit file này cùng với code automation
```

