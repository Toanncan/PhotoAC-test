---
trigger: always_on
---

# Quy Tắc Chung Cho QA Automation (Playwright TypeScript)

Áp dụng cho mọi tác vụ automation testing với Playwright + TypeScript trên dự án Photo-AC.

---

## 1. Kiến Trúc & Thiết Kế (Page Object Model)

- **Mô hình POM phân tầng:**
  - **Page classes (`src/pages/`):** Khai báo locators + methods tương tác UI. TUYỆT ĐỐI KHÔNG đặt business assertions trong Page classes.
  - **Test specs (`src/tests/`):** Chứa kịch bản test, luồng thao tác và assertions.
  - **Fixtures (`src/fixtures/`):** Khởi tạo Page Objects, quản lý auth session và Allure metadata.
- **Import bắt buộc:** Mọi spec file **BẮT BUỘC** import `{ test, expect }` từ `src/fixtures/base.fixture`, CẤM import trực tiếp từ `@playwright/test`.
- **Reporting:** Mọi action và assertion quan trọng phải bọc trong `test.step('mô tả')` phục vụ Allure Report.
- **Tính độc lập:** Mỗi test case phải độc lập (`beforeEach`/`afterEach`), không chia sẻ state giữa các test methods.

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

## 4. Kiến Trúc Multi-Role & Quản Lý Phiên Đăng Nhập (Photo-AC)

Photo-AC phân tách 4 vai trò (Roles) với session riêng biệt trên Chromium và Firefox. **TUYỆT ĐỐI KHÔNG dùng chung session giữa Chromium và Firefox**.

### 4.1 Ma Trận 4 Vai Trò Người Dùng (User Roles Matrix)

| Vai trò (Role) | Biến `.env` | Setup Chromium | Setup Firefox | StorageState Chromium | StorageState Firefox | Project Chạy Test |
|---|---|---|---|---|---|---|
| **Guest User** (Chưa đăng nhập) | *Không cần* | *Không cần* | *Không cần* | `cookies: []` | `cookies: []` | Dùng `test.use({ storageState: { cookies: [], origins: [] } })` |
| **Free User** (無料会員) | `FREE_USER_EMAIL`<br>`FREE_USER_PASSWORD` | `free-user.setup.ts` | `free-user-firefox.setup.ts` | `.auth/free-user.json` | `.auth/free-user-firefox.json` | `chromium-free-user`<br>`firefox-free-user` |
| **Premium User** (プレミアム会員) | `PREMIUM_USER_EMAIL`<br>`PREMIUM_USER_PASSWORD` | `premium-user.setup.ts` | `premium-user-firefox.setup.ts` | `.auth/premium-user.json` | `.auth/premium-user-firefox.json` | `chromium-downloader`<br>`firefox-downloader` |
| **Creator** (クリエイター) | `CREATOR_EMAIL`<br>`CREATOR_PASSWORD` | `creator.setup.ts` | `creator-firefox.setup.ts` | `.auth/creator.json` | `.auth/creator-firefox.json` | `chromium-creator`<br>`firefox-creator` |

### 4.2 Ma Trận Phân Quyền & Hành Vi Cần Kiểm Thử

| Đặc tính / Hành vi | Guest User | Free User | Premium User | Creator |
|---|---|---|---|---|
| **Giới hạn tìm kiếm** | 4 lần/ngày (hiển thị popup giới hạn) | 4 lần/ngày (hiển thị modal coupon/limit) | **Không giới hạn** | Không áp dụng |
| **Sắp xếp "人気順" (Phổ biến)** | Bị chặn (hiển thị popover Premium) | Bị chặn (hiển thị popover Premium) | **Cho phép** sắp xếp bình thường | Không áp dụng |
| **AI Search Toggle** | Hiển thị nhưng disable; mở 3 lượt khi chạm limit | **Hoàn toàn ẩn** (`.search-by-ai` không có trên DOM) | Theo gói trả phí | Không áp dụng |
| **Tải ảnh / Hóa đơn** | Bị giới hạn tải / Không có hóa đơn | Bị giới hạn tải / Không có hóa đơn | **Tải không giới hạn**, có hóa đơn (`/user/receipts`) | Quản lý tác phẩm đã tải lên |

- **Session Isolation:** Cấu hình `storageState` ở cấp Project trong `playwright.config.ts`, TRÁNH hardcode trong test spec (ngoại trừ Guest User). CẤM sửa/xóa trực tiếp file `.auth/*.json`.

---

## 5. Kiểm Soát Chất Lượng, Shared Files & Chống Hồi Quy (Zero Regression)

Mọi thay đổi mã nguồn trước khi merge/commit **bắt buộc tuân thủ quy tắc tại [code_review_rules.md](file:///d:/Js/photo-ac-test/.agent/rules/code_review_rules.md)**:

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
