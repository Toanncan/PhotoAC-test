---
trigger: always_on
---

# Quy Chuẩn Code Review & Quản Trị Rủi Ro Hồi Quy (Playwright TypeScript)

Áp dụng cho mọi tác vụ phát triển mới, tái cấu trúc (refactor), sửa lỗi, và review mã nguồn kiểm thử tự động trong dự án **Photo-AC**.

Mục tiêu tối thượng:
1. **Đồng bộ hóa tuyệt đối (100% Consistency)** giữa code cũ và mới về mặt cấu trúc, tư duy thiết kế và phong cách triển khai.
2. **Không gây hồi quy (Zero Regression)**: Bất kỳ đoạn code mới nào thêm vào cũng KHÔNG được phép làm ảnh hưởng hoặc gãy (break) các test case, fixture, hay utility hiện có.
3. **Quản trị nghiêm ngặt File Dùng Chung (Shared Files Governance)**: Hạn chế tối đa việc chỉnh sửa các file dùng chung. Khi bắt buộc phải thay đổi, phải tuân thủ nghiêm ngặt nguyên tắc tương thích ngược và phân tích vùng ảnh hưởng (Blast Radius).

---

## 1. Phân Tầng Mã Nguồn & Ma Trận Vùng Ảnh Hưởng (Blast Radius Matrix)

Mọi file trong dự án được phân cấp thành 3 bậc (Tiers) với mức độ rủi ro và quy trình phê duyệt khác nhau:

| Phân tầng (Tier) | Danh sách thành phần | Mức độ rủi ro | Quy chế can thiệp |
|---|---|---|---|
| **Tier 1: Core Framework (Dùng chung toàn hệ thống)** | `playwright.config.ts`<br>`src/fixtures/base.fixture.ts`<br>`src/fixtures/auth.fixture.ts`<br>`src/pages/common/base.page.ts`<br>`src/utils/env.config.ts`<br>`src/utils/global-setup.ts`<br>`tsconfig.json`, `package.json` | 🔴 **CRITICAL (Rủi ro cực cao)** | - **HẠN CHẾ TỐI ĐA THAY ĐỔI**.<br>- Cấm thay đổi method signature đã có.<br>- Chỉ mở rộng (Extend) bằng tham số tùy chọn (`optional params`) hoặc method mới.<br>- Phải chạy lại **toàn bộ 6 test projects** (`chromium` & `firefox` cho mọi role). |
| **Tier 2: Shared Module (Dùng chung cho nhiều spec)** | `src/pages/common/login.page.ts`<br>`src/pages/common/home.page.ts`<br>`src/pages/common/search-results.page.ts`<br>`src/pages/common/gmail.page.ts`<br>`src/utils/helpers.ts`<br>`src/utils/test-data.ts`<br>`src/utils/pdf.utils.ts`<br>`src/utils/email-verification.helper.ts` | 🟠 **HIGH (Rủi ro cao)** | - Kiểm tra danh sách caller (`grep_search`) trước khi chỉnh sửa bất kỳ method/locator nào.<br>- Tuyệt đối không xóa/đổi tên locator đang dùng.<br>- Bắt buộc chạy regression tất cả các specs phụ thuộc vào module đó. |
| **Tier 3: Domain Pages & Test Specs (Độc lập theo vai trò)** | `src/pages/downloader/**`<br>`src/pages/creator/**`<br>`src/tests/downloader/**`<br>`src/tests/creator/**`<br>`src/tests/auth/**` | 🟢 **LOW / MEDIUM (Phạm vi cục bộ)** | - Phải tuân thủ chuẩn POM, naming, fixture import.<br>- Đảm bảo tính độc lập, không phụ thuộc vào trạng thái của test khác.<br>- Chạy pass 100% trên cả Chromium và Firefox theo cấu hình project. |

---

## 2. Nguyên Tắc Quản Trị File Dùng Chung (Shared Files Governance)

Bất kỳ lập trình viên hoặc AI agent nào khi can thiệp vào file thuộc **Tier 1** hoặc **Tier 2** bắt buộc phải tuân theo 4 nguyên tắc sau:

### 2.1 Nguyên tắc Đóng/Mở (Open-Closed Principle - OCP)
- **Ưu tiên mở rộng (Open for Extension), hạn chế sửa đổi (Closed for Modification)**.
- Khi cần bổ sung logic xử lý cho một case mới, hãy:
  - Viết thêm method mới chuyên biệt (ví dụ: thay vì sửa `fillInput()` trong `BasePage`, hãy tạo method mới nếu có logic đặc thù).
  - Hoặc thêm tham số tùy chọn với giá trị mặc định (`optional parameter with default value`).

### 2.2 Quy Chuẩn Tương Thích Ngược (Backward Compatibility Protocol)
- **CẤM** thay đổi thứ tự, kiểu dữ liệu (type), hoặc xóa bỏ tham số bắt buộc của method trong Page Object dùng chung.
- **CẤM** đổi tên method hoặc xóa method đang có ít nhất 1 file test khác gọi tới.
- **Ví dụ Đúng (Backward-compatible):**
  ```typescript
  // CŨ:
  async search(keyword: string): Promise<void>
  
  // MỚI (ĐÚNG - Thêm optional param có default):
  async search(keyword: string, options?: { pressEnter?: boolean; timeout?: number }): Promise<void>
  ```
- **Ví dụ Sai (Phá vỡ tương thích - BREAKING CHANGE):**
  ```typescript
  // SAI - Đổi signature khiến toàn bộ caller cũ bị lỗi TypeScript compile!
  async search(searchOptions: { keyword: string; pressEnter: boolean }): Promise<void>
  ```

### 2.3 Phân Tích Vùng Ảnh Hưởng (Blast Radius Audit)
Trước khi lưu thay đổi trên file dùng chung, bắt buộc thực hiện lệnh quét:
1. `grep_search` tên class, tên method hoặc tên locator trên toàn bộ thư mục `src/`.
2. Lập danh sách các file `.spec.ts` đang gọi tới method đó.
3. Xác nhận rằng logic mới không làm thay đổi hành vi mặc định đối với các callers hiện tại.

### 2.4 Cấm Can Thiệp Trực Tiếp Vào Quản Lý Session Storage
- `.auth/*.json` là các file chứa session cookies sinh ra tự động từ các file setup (`*.setup.ts`).
- **TUYỆT ĐỐI CẤM** các file test tự ý sửa, xóa, hoặc ghi đè trực tiếp các file trong `.auth/`.
- Guest test bắt buộc dùng session trắng thông qua:
  ```typescript
  test.use({ storageState: { cookies: [], origins: [] } });
  ```
- Free User, Downloader, Creator phải kế thừa tự động từ Playwright Project trong `playwright.config.ts`.

---

## 3. Tiêu Chuẩn Đồng Bộ Kiến Trúc Giữa Code Cũ và Code Mới (Consistency Enforcement)

Mọi dòng code mới phải hòa nhập hoàn toàn vào cấu trúc hiện có như thể được viết bởi cùng một kỹ sư.

### 3.1 Cấu Trúc Import Trong Test Spec (BẮT BUỘC)
- **CẤM** import `{ test, expect }` trực tiếp từ `@playwright/test`.
- **BẮT BUỘC** import từ `base.fixture`:
  ```typescript
  // ĐÚNG:
  import { test, expect } from '../../fixtures/base.fixture';
  
  // SAI:
  import { test, expect } from '@playwright/test'; // Mất allureMetadata, screenshotOnPass và Page Fixtures!
  ```

### 3.2 Tầng Page Object Model (POM)
- **Không đặt assertion trong Page Class**: Mọi `expect()` khẳng định kết quả nghiệp vụ phải nằm trong file `.spec.ts`. Page class chỉ phục vụ tương tác UI và lấy dữ liệu (getter).
  - *Ngoại lệ duy nhất*: Các assertions nội bộ phục vụ Web-First Auto-Wait (ví dụ: `await expect(locator).toBeVisible()` trước khi click) được phép nằm trong helper của Page.
- **Tính đóng gói (Encapsulation)**:
  - Locators nên được khai báo `private readonly` (hoặc `readonly` nếu cần chia sẻ) và khởi tạo ngay trong class body bằng semantic locator.
  - Tương tác với phần tử thông qua các phương thức của `BasePage` (`clickElement`, `fillInput`, `getText`...).

### 3.3 Chuẩn Trình Bày Test Spec (Allure & Reporting Integration)
- Mọi action và assertion quan trọng phải được bọc trong `test.step()` có mô tả rõ ràng:
  ```typescript
  await test.step('Tìm kiếm từ khóa và đợi kết quả hiển thị', async () => {
    await homePage.search(keyword);
    await searchResultPage.waitForResultDisplay();
  });
  
  await test.step('Verify kết quả tìm kiếm hiển thị chính xác', async () => {
    await expect(searchResultPage.resultHeading).toContainText(`「${keyword}」の写真素材`);
  });
  ```
- Luôn gắn tag phân loại rõ ràng trong tiêu đề test: `@smoke`, `@regression`, `@role` (ví dụ: `@free-user`, `@downloader`, `@creator`).

### 3.4 Quy Chuẩn Dữ Liệu Test (Test Data)
- Không hardcode dữ liệu định danh (email, username, mã, tên công ty).
- Sử dụng các hàm từ `src/utils/test-data.ts`:
  ```typescript
  import { generateEmail, generateUsername } from '../../utils/test-data';
  const uniqueEmail = generateEmail('checkout');
  ```

---

## 4. Danh Mục Cấm Tuyệt Đối (Zero-Tolerance Anti-Patterns)

Khi review mã nguồn, nếu phát hiện bất kỳ vi phạm nào sau đây, **BẮT BUỘC TỪ CHỐI (REJECT/BLOCK)** code ngay lập tức:

| Anti-Pattern | Lý do cấm | Giải pháp thay thế |
|---|---|---|
| `test.only(...)` | Làm CI/CD bỏ qua toàn bộ test suite khác, gây báo cáo sai lệch. | Xóa bỏ trước khi commit. |
| `page.waitForTimeout(...)` hoặc `setTimeout` | Hard sleep gây lãng phí tài nguyên và flaky test. | Dùng Web-First Assertions (`expect(locator).toBeVisible()`) hoặc smart wait states. |
| `console.log(...)` debug sót lại | Làm rác output logs trên runner và Allure report. | Xóa sạch trước khi review. |
| Code bị comment không có lý do | Gây nhiễu và suy giảm tính dễ đọc của codebase. | Xóa hẳn (Git đã lưu lịch sử). |
| Hardcode credentials (mật khẩu/token thật) | Lỗ hổng bảo mật nghiêm trọng. | Đọc qua `process.env` hoặc `envConfig`. |
| Dynamic/Positional CSS/XPath (`div:nth-child(3) > a`) | Cực kỳ dễ vỡ khi frontend cập nhật layout. | Dùng Playwright Semantic: `getByRole`, `getByLabel`, `getByPlaceholder`. |
| Tự viết lại logic đã có trong `src/utils/` | Tăng nợ kỹ thuật và code duplication. | Bắt buộc tái sử dụng `helpers.ts`, `pdf.utils.ts`, `email-verification.helper.ts`. |

---

## 5. Checklist Kiểm Định Trước Khi Phê Duyệt Code (Sign-off Checklist)

Trước khi coi một task hoàn thành hoặc phê duyệt code, người review (hoặc AI agent) phải kiểm tra theo bảng sau:

```markdown
[ ] 1. Type Check: Dự án biên dịch TypeScript không lỗi (npx tsc --noEmit).
[ ] 2. Import Check: Mọi spec đều import { test, expect } từ base.fixture.ts.
[ ] 3. Shared File Safety: Có can thiệp Tier 1/Tier 2 không? Nếu có, có đảm bảo Backward Compatibility không?
[ ] 4. Blast Radius: Đã phân tích và test lại tất cả spec chịu ảnh hưởng chưa?
[ ] 5. Anti-Pattern Scan: Đã sạch test.only, console.log, hard sleep, raw xpath chưa?
[ ] 6. Multi-Role & Browser Compatibility: Đã kiểm tra cả Chromium và Firefox theo ma trận role chưa?
[ ] 7. Naming & Formatting: Đã đặt tên đúng quy chuẩn kebab-case / camelCase và dùng test.step() chưa?
```
