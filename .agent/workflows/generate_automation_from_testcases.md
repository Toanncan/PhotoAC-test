---
description: Convert manual test cases thanh automation scripts Playwright TypeScript theo quy trinh 6 buoc su dung Antigravity Capabilities.
---

# Workflow: Sinh Automation Scripts từ Manual Test Cases (Playwright TypeScript)

> **BẮT BUỘC (MANDATORY SKILLS):** Bạn PHẢI nạp và đọc kỹ nội dung các skills sau trước khi bắt đầu:
> - **`qa_automation_engineer`** (`.agent/skills/qa_automation_engineer/SKILL.md`) — Quy tắc automation chung + định tuyến workflow
> - **`ui_debug_agent`** (`.agent/skills/ui_debug_agent/SKILL.md`) — Inspect DOM, thu thập locators
> - **`smart_locator_agent`** (`.agent/skills/smart_locator_agent/SKILL.md`) — Sinh locator ổn định
> - **`test_data_generator`** (`.agent/skills/test_data_generator/SKILL.md`) — Sinh test data unique, traceable

Workflow này giúp agent đọc file manual test cases do user cung cấp, tự mở browser inspect UI, thu thập locators thực tế, sinh automation scripts Playwright TypeScript hoàn chỉnh (POM + Test), chạy test và tự sửa lỗi cho đến khi PASS.

## Nguyên Tắc Thực Thi

- **Vai trò:** Agent đóng vai Senior Automation Engineer — tuân thủ Clean Code + POM
- **Tất cả output bằng Tiếng Việt**
- **TUYỆT ĐỐI KHÔNG ĐOÁN locator** — phải inspect DOM thực tế bằng MCP browser tools
- **Desktop viewport 1920x1080** cho tất cả UI debugging
- **Rule E3 (CRITICAL):** Khi test FAIL — tự đọc log — phân tích — sửa code — chạy lại. CẤM hỏi user trong quá trình fix lỗi. Chỉ hỏi khi gặp business rule mâu thuẫn hoặc hết 3 vòng tự sửa
- **Artifact `task.md`** — PHẢI tạo để theo dõi tiến độ 6 bước

## Input Cần Thu Thập

| Input | Cách lấy | Độ ưu tiên |
|---|---|---|
| **File test cases** (MD/Excel/JSON/URL) | User cung cấp path hoặc URL | Bắt buộc |
| **URL ứng dụng** | User cung cấp hoặc trong test case | Bắt buộc |
| **Credentials** (nếu cần login) | User cung cấp hoặc dùng fixture sẵn | Tùy chọn |
| **Tech stack** | Mặc định: Playwright + TypeScript | Tùy chọn |

Nếu user chưa cung cấp đủ — hỏi trước khi bắt đầu.

## Các Bước Thực Hiện

### Bước 1: Khởi Tạo, Phân Tích và Lên Kế Hoạch

1. **Đọc file test cases** do user cung cấp:
   - File local — `view_file`
   - URL (Google Sheets, Confluence, etc.) — `read_url_content`
   - Xác định format: Markdown table, Excel, JSON, hoặc free-form text

2. **Parse test cases** và trích xuất:
   - Danh sách test case (ID, Title, Steps, Expected Results, Test Data, Priority)
   - Các pages/screens mà test case đi qua
   - Pre-conditions (login, setup data, navigate...)
   - Dependencies giữa các test case (nếu có)

3. **Tạo artifact `task.md`** để theo dõi tiến độ:
   ```markdown
   # Automation Generation Progress
   - [x] Buoc 1: Phan tich test cases
   - [ ] Buoc 2: Khao sat UI (MCP Recon)
   - [ ] Buoc 3: Thiet ke POM
   - [ ] Buoc 4: Chuan bi test data
   - [ ] Buoc 5: Sinh automation scripts
   - [ ] Buoc 6: Chay test + Tu sua loi

   ## Test Cases can Automate
   | Test case ID | Title | Pages | Priority | Status |
   |---|---|---|---|---|
   | TC01 | Dang nhap thanh cong | LoginPage, DashboardPage | P1 | ... |
   ```

### Bước 2: Khảo Sát UI tự Động bằng MCP (Autonomous UI Recon)

1. **Mở browser** bằng MCP và navigate theo test case steps:
   ```
   browser_navigate → URL ung dung
   browser_resize → 1920 x 1080
   browser_wait_for → page load hoan tat
   browser_snapshot → thu thap DOM
   ```

2. **Với mỗi page trong test cases**, thực hiện:
   - `browser_snapshot` — đọc accessibility tree
   - Xác định tất cả elements cần tương tác (inputs, buttons, links, dropdowns...)
   - Thu thập locator tốt nhất cho mỗi element (theo thứ tự ưu tiên trong skill `smart_locator_agent`)
   - Xác minh locator bằng cách thử tương tác (`browser_click`, `browser_type`)

3. **Ghi nhận vào bảng Locator Collection:**

   | Page | Element | Action | Primary Locator | Fallback Locator | Verified |
   |---|---|---|---|---|---|
   | LoginPage | Email input | Type | `getByLabel('Email')` | `#email` | Dung |
   | LoginPage | Password input | Type | `getByLabel('Password')` | `#password` | Dung |
   | LoginPage | Login button | Click | `getByRole('button', {name: 'Login'})` | `button[type=submit]` | Dung |

4. **Xử lý tình huống:**

   | Tình huống | Cách xử lý |
   |---|---|
   | URL bị chặn / cần VPN | Thông báo user |
   | Cần đăng nhập | Dùng fixture sẵn có hoặc hỏi user credentials |
   | Element không tìm thấy | Snapshot lại — thử locator khác — báo user nếu DOM thay đổi |
   | CAPTCHA / 2FA | Thông báo user — không thể automate |
   | Dynamic content / SPA | `browser_wait_for` text cụ thể trước khi snapshot |

5. **TUYỆT ĐỐI KHÔNG SUY ĐOÁN selector** — mọi locator phải xác minh trên DOM thực tế.

### Bước 3: Thiết Kế POM (Page Object Model Architecture)

1. **Xác định danh sách Page classes** cần tạo:
   - Mỗi page/screen trong test flow — 1 Page class
   - Xem xét tạo `BasePage` nếu chưa có trong project

2. **Sinh Page Object classes** bằng `write_to_file`:

   **Cấu trúc mỗi Page class:**
   ```typescript
   // src/pages/login.page.ts
   import { Page, Locator } from '@playwright/test';

   export class LoginPage {
     readonly page: Page;
     readonly emailInput: Locator;
     readonly passwordInput: Locator;
     readonly loginButton: Locator;

     constructor(page: Page) {
       this.page = page;
       this.emailInput = page.getByLabel('Email');
       this.passwordInput = page.getByLabel('Password');
       this.loginButton = page.getByRole('button', { name: 'Login' });
     }

     async login(email: string, password: string) {
       await this.emailInput.fill(email);
       await this.passwordInput.fill(password);
       await this.loginButton.click();
     }
   }
   ```

   **Nguyên tắc:**
   - Method name mô tả hành vi: `login()`, `fillRegistrationForm()`, không phải `clickButton()`
   - Không hardcode waits — chỉ smart waits
   - Locator lấy từ Bước 2 (đã xác minh) — KHÔNG ĐOÁN
   - Return `this` hoặc next page object cho method chaining (nếu phù hợp)

3. **Kiểm tra project structure hiện tại:**
   - Nếu project đã có `src/pages/` — sinh file vào đúng thư mục
   - Nếu project mới — tạo structure theo skill `framework_architect`
   - Không tạo duplicate — kiểm tra page đã tồn tại chưa trước khi tạo mới

### Bước 4: Chuẩn Bị Dữ Liệu (Test Data Strategy)

1. **Phân tích test data** từ test cases:
   - Data nào cần **unique mỗi lần chạy** (email, username, ID) — sinh random + traceable
   - Data nào **cố định** (URL, config values) — đọc từ env/config
   - Data nào cần **nhiều bộ** (data-driven) — tạo file external (JSON)

2. **Sinh test data utilities** (dùng skill `test_data_generator`):
   ```
   Format: <prefix>_<testName>_<timestamp>
   Vi du:
   - Email:    auto_login_1712049200@test.com
   - Username: auto_user_1712049200
   ```

3. **Sensitive data** (credentials):
   - Đọc từ env variables hoặc config file
   - KHÔNG hardcode trong test code
   - KHÔNG đọc `.env` trực tiếp (quy tắc bảo mật)

### Bước 5: Sinh Automation Scripts (Test Classes)

1. **Tạo test classes** — mỗi test case hoặc nhóm test case liên quan — 1 test file:

   **Cấu trúc mỗi test:**
   ```typescript
   // src/tests/auth/login.spec.ts
   import { test, expect } from '../../fixtures/base.fixture';
   import { LoginPage } from '../../pages/login.page';
   import { generateEmail } from '../../utils/test-data';

   test.describe('Dang Nhap', () => {
     test('dang nhap thanh cong voi tai khoan hop le', async ({ page }) => {
       // Arrange
       const loginPage = new LoginPage(page);
       await page.goto('/login');

       // Act
       await loginPage.login('user@example.com', 'Test@12345');

       // Assert
       await expect(page).toHaveURL(/dashboard/);
       await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
     });
   });
   ```

2. **Assertions bắt buộc:**
   - Mỗi test case PHẢI có ít nhất 1 assertion
   - Assert message mô tả rõ: `"Expected dashboard to show after login"`
   - Dùng soft assertions khi cần check nhiều điểm

3. **Nguyên tắc code:**
   - Không `waitForTimeout()` — chỉ smart waits
   - Không inline locator trong test — locator trong Page class
   - Import gọn gàng — không unused imports
   - Test độc lập — không phụ thuộc thứ tự chạy
   - Cleanup/teardown nếu test tạo data

### Bước 6: Chạy Thử và Tự Sửa Lỗi (Execution and Auto-Heal — Rule E3)

1. **Chạy test** bằng `run_command`:
   ```bash
   npx playwright test <test_file> --headed
   ```

2. **Theo dõi kết quả:**

   **Nếu PASS:**
   - Chạy lại **1 lần nữa** để xác nhận stability
   - Cập nhật `task.md`: test case status — PASS
   - Cleanup debug logs, commented code

   **Nếu FAIL — Vào vòng tự sửa lỗi:**

   ```
   LAP LAI khi test FAIL (toi da 3 vong):
     1. Doc error log / stack trace → xac dinh step fail
     2. Phan loai loi:
        - Element not found → Mo MCP → snapshot → thay locator
        - Click intercepted → Cho overlay bien mat → retry click
        - Timeout → Tang timeout hoac them wait condition
        - Assertion fail → Kiem tra expected vs actual → cap nhat assertion
        - Test data conflict → Sinh data unique moi
     3. Sua code bang replace_file_content / multi_replace_file_content
     4. Chay lai test
   ```

3. **Rule E3 — CAM HOI USER khi fix loi.** Chỉ được hỏi khi:
   - Business logic mâu thuẫn (test case nói A nhưng app hiển thị B)
   - Server/app không accessible
   - Đã hết 3 vòng tự sửa mà vẫn fail

4. **Xác minh stability** — test phải PASS **2 lần liên tiếp**:
   ```bash
   npx playwright test <test_file> --repeat-each=2 --retries=0
   ```

### Bước 7: Cleanup và Bàn Giao

1. **Code cleanup** (bắt buộc):
   - Xóa `console.log()` / debug log tạm
   - Xóa locator không còn sử dụng
   - Xóa commented-out code
   - Không còn `waitForTimeout()`
   - Không còn hardcoded test data
   - Import gọn gàng — không unused imports

2. **Cập nhật artifact `task.md`** với kết quả cuối:
   ```markdown
   ## Ket Qua
   | Test case ID | Title | Status | Stability | Ghi chu |
   |---|---|---|---|---|
   | TC01 | Dang nhap thanh cong | PASS | 2/2 stable | — |
   | TC02 | Dang nhap sai password | PASS | 2/2 stable | — |

   ## Files Da Tao
   - src/pages/login.page.ts
   - src/pages/dashboard.page.ts
   - src/tests/auth/login.spec.ts
   ```

3. **Báo cáo** cho user:
   - Tổng: X test case PASS / Y test case FAIL / Z test case SKIP
   - Danh sách files đã tạo/sửa
   - Known issues / limitations
   - Bảng Locator Collection (tham khảo)

## Output

- **Artifact `task.md`** — checklist tiến độ + kết quả chạy test
- **Page Object classes** — 1 file per page, locators xác minh từ DOM
- **Test classes** — automation scripts hoàn chỉnh, đã PASS stable
- **Test data utilities** — generators cho data unique + traceable
- **Bảng Locator Collection** — tất cả elements + primary/fallback locators
- **Báo cáo kết quả** — PASS/FAIL/SKIP summary