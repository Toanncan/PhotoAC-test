---
description: Thuc thi UI flow truc tiep tren browser, thu thap locators tu DOM thuc te, va sinh automation scripts Playwright TypeScript.
---

# Workflow: Sinh Automation từ UI Flow (Playwright TypeScript)

> **BẮT BUỘC (MANDATORY SKILL):** Bạn PHẢI nạp và đọc kỹ nội dung của skill **`ui_debug_agent`** (tại `.agent/skills/ui_debug_agent/SKILL.md`) trước khi bắt đầu. Ngoài ra tham khảo thêm skill **`smart_locator_agent`** để sinh locator ổn định và **`qa_automation_engineer`** cho quy tắc automation chung.

Workflow này giúp agent **thực thi trực tiếp** một chuỗi thao tác UI trên browser thực, thu thập locators từ DOM thực tế, và sinh automation scripts hoàn chỉnh — tất cả trong một luồng tự động, không cần manual test case có sẵn.

## Nguyên Tắc Thực Thi

- **Tất cả output bằng Tiếng Việt**
- **TUYỆT ĐỐI KHÔNG ĐOÁN locator** — phải lấy từ DOM thực tế bằng MCP browser tools
- **Phải chạy từng bước UI trên browser thực** trước khi sinh code
- **Desktop viewport 1920x1080** cho tất cả UI debugging
- **Rule E3:** Khi test FAIL — tự đọc log — phân tích — sửa — chạy lại. KHÔNG hỏi user

## Sự Khác Biệt với `generate_automation_from_testcases`

| | `from_testcases` | `from_ui_flow` (workflow này) |
|---|---|---|
| **Input** | File manual test cases có sẵn | Mô tả UI steps bằng lời hoặc URL + hành động |
| **Cách tiếp cận** | Đọc test case — inspect UI — sinh code | **Chạy thực trên browser** — thu thập locator — sinh code |
| **Khi nào dùng** | Đã có test case document | Chưa có test case, chỉ biết "vào trang này, click cái kia" |

## Input Cần Thu Thập

Agent cần ít nhất **1 trong các input** sau từ user:

| Input | Ví dụ | Độ ưu tiên |
|---|---|---|
| **URL + UI steps mô tả** | "Vào https://example.com, login, tạo user mới" | Phổ biến nhất |
| **URL + screenshots** | User cung cấp ảnh chụp từng bước | Tùy chọn |
| **Chỉ URL** | "Automate login flow của trang này" | Agent tự khám phá |

Nếu user chưa cung cấp đủ — hỏi:
- URL ứng dụng?
- Mô tả flow cần automate (từng bước)?
- Credentials nếu cần đăng nhập?

## Các Bước Thực Hiện

### Bước 1: Tiếp Nhận và Chuẩn Bị

1. **Parse UI steps** từ user input — chuyển mô tả bằng lời thành danh sách steps có cấu trúc:
   ```
   Step 1: Navigate to https://example.com/login
   Step 2: Enter username "admin@test.com"
   Step 3: Enter password "***"
   Step 4: Click Login button
   Step 5: Verify dashboard is displayed
   ```

2. **Tạo artifact `task.md`** để theo dõi tiến độ:
   ```markdown
   # UI Flow Automation Progress
   - [ ] Buoc 1: Chuan bi — parse UI steps
   - [ ] Buoc 2: Chay UI flow tren browser — thu thap locators
   - [ ] Buoc 3: Sinh Page Objects + Test scripts
   - [ ] Buoc 4: Chay test + Tu sua loi
   ```

### Bước 2: Chạy UI Flow trên Browser và Thu Thập Locators (Live Recon)

> Đây là bước **quan trọng nhất** — phân biệt workflow này với các workflow khác.

1. **Mở browser bằng MCP** và navigate đến URL:
   ```
   browser_navigate → URL
   browser_resize → 1920 x 1080
   browser_wait_for → page load hoan tat
   browser_snapshot → thu thap DOM ban dau
   ```

2. **Thực thi từng step** theo danh sách, với mỗi step:
   ```
   a. browser_snapshot → doc DOM, xac dinh element can tuong tac
   b. Xac dinh locator tot nhat (theo thu tu uu tien)
   c. Thuc thi action (click / type / select / hover)
   d. browser_snapshot → xac nhan ket qua action
   e. Ghi nhan vao bang locator collection
   ```

3. **Bảng Locator Collection** (ghi nhận sau mỗi step):

   | Step | Action | Element | Primary Locator | Fallback Locator | Verified |
   |---|---|---|---|---|---|
   | 1 | Navigate | — | — | — | Dung |
   | 2 | Type | Username input | `getByLabel('Email')` | `#email` | Dung |
   | 3 | Type | Password input | `getByLabel('Password')` | `#password` | Dung |
   | 4 | Click | Login button | `getByRole('button', {name: 'Login'})` | `button[type=submit]` | Dung |
   | 5 | Assert | Dashboard title | `getByRole('heading', {name: 'Dashboard'})` | `.dashboard-title` | Dung |

4. **Thứ Tự Ưu Tiên Locator Playwright:**
   `getByRole()` — `getByLabel()` — `getByPlaceholder()` — `getByText()` — `getByTestId()` — CSS — XPath

5. **Xử lý tình huống khi chạy UI:**

   | Tình huống | Cách xử lý |
   |---|---|
   | Element không tìm thấy | `browser_snapshot` lại — kiểm tra DOM — thử locator khác |
   | Page chưa load xong | `browser_wait_for` text/element — retry |
   | Modal/popup xuất hiện | Xử lý popup trước — tiếp tục flow |
   | Redirect/navigation | `browser_snapshot` lại ở page mới |
   | Cần scroll | `browser_evaluate` — scrollIntoView |
   | Cần đăng nhập | Hỏi user credentials hoặc dùng fixture sẵn có |
   | CAPTCHA / 2FA | Thông báo user — không thể automate |

6. **Screenshot evidence** — chụp lại ở các milestone quan trọng:
   - Sau khi login thành công
   - Sau khi hoàn thành flow chính
   - Khi gặp lỗi/unexpected state

### Bước 3: Sinh Automation Scripts (Code Generation)

1. **Sinh Page Object classes** từ locator collection:

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

2. **Sinh Test class:**
   - Import Page Objects
   - Structure: **Arrange — Act — Assert**
   - Assertions rõ ràng với message mô tả
   - Test data unique + traceable (dùng timestamp/random)
   - Import `test` từ `src/fixtures/base.fixture.ts`

3. **Nguyên tắc sinh code:**
   - Locator PHẢI lấy từ Bước 2 (đã xác minh trên DOM) — KHÔNG ĐOÁN
   - Không hardcode test data (credentials đọc từ env/config)
   - Không dùng `waitForTimeout()` — chỉ smart waits
   - Method names mô tả hành vi user, không mô tả thao tác DOM
   - Mỗi page — 1 file, mỗi test — 1 file

### Bước 4: Chạy Test và Tự Sửa Lỗi (Execution and Auto-Heal)

1. **Chạy test** bằng `run_command`:
   ```bash
   npx playwright test <test_file> --headed
   ```

2. **Theo dõi kết quả:**
   - Nếu **PASS** — chuyển sang xác minh stability
   - Nếu **FAIL** — vào vòng tự sửa lỗi:

   ```
   LAP LAI khi test FAIL (toi da 3 vong):
     1. Doc error log → xac dinh step fail
     2. Phan loai loi:
        - Locator sai → Mo browser MCP, inspect lai DOM, thay locator
        - Timing issue → Them smart wait hoac dieu chinh assertion timeout
        - Page state sai → Kiem tra flow, them wait cho navigation
        - Test data conflict → Sinh data moi (unique)
     3. Sua code bang replace_file_content / multi_replace_file_content
     4. Chay lai test
   ```

3. **Xác minh stability** — chạy test **2 lần liên tiếp** PASS:
   ```bash
   npx playwright test <test_file> --repeat-each=2
   ```

4. **Rule E3:** KHÔNG hỏi user trong quá trình fix lỗi. Chỉ hỏi khi:
   - URL bị chặn / cần captcha
   - Business logic mâu thuẫn
   - Đã hết 3 vòng tự sửa mà vẫn fail

### Bước 5: Cleanup và Bàn Giao

1. **Code cleanup** (bắt buộc trước khi bàn giao):
   - Xóa `console.log()` / debug log
   - Xóa locator không dùng
   - Xóa commented-out code
   - Không còn `waitForTimeout()`
   - Import không thừa

2. **Cập nhật artifact `task.md`** với kết quả:
   ```markdown
   ## Ket qua
   - Pages created: LoginPage, DashboardPage
   - Tests created: login.spec.ts
   - Test status: 2/2 PASS (stable)
   - Locators collected: 8 elements, all verified
   ```

3. **Báo cáo** cho user:
   - Danh sách files đã tạo
   - Số test PASS/FAIL
   - Bảng locator collection (để user tham khảo)
   - Known limitations (nếu có)

## Output

- **Artifact `task.md`** — checklist tiến độ + kết quả
- **Page Object classes** — 1 file per page/screen, locators xác minh từ DOM
- **Test classes** — script automation hoàn chỉnh, đã test PASS
- **Bảng Locator Collection** — tất cả elements đã thu thập + primary/fallback locators
- **Evidence screenshots** — chụp tại các milestone quan trọng