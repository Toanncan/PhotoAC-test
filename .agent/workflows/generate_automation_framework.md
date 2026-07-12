---
description: Thiet ke va scaffold automation framework hoan chinh cho Playwright TypeScript — bao gom project structure, fixtures, Allure report, va CI/CD.
---

# Workflow: Thiết Kế Automation Framework (Playwright TypeScript)

> **BẮT BUỘC (MANDATORY SKILL):** Bạn PHẢI nạp và đọc kỹ nội dung của skill **`framework_architect`** (tại `.agent/skills/framework_architect/SKILL.md`) trước khi bắt đầu. Ngoài ra, tham khảo thêm skill **`qa_automation_engineer`** để nắm các quy tắc automation chung.

Workflow này giúp agent thiết kế, scaffold và triển khai automation framework Playwright TypeScript hoàn chỉnh từ đầu.

## Nguyên Tắc Thực Thi

- **Tất cả output bằng Tiếng Việt**
- **KHÔNG đoán** thông tin — phải hỏi user xác nhận trước khi scaffold
- **PHẢI tạo artifact `task.md`** để theo dõi tiến độ
- Mỗi file sinh ra phải **biên dịch được ngay** — không để placeholder `// TODO` trong code
- Framework phải tuân thủ design principles trong skill `framework_architect`

## Tech Stack

Workflow này chỉ hỗ trợ:

| Platform | Framework | Ngôn ngữ | Test runner | Report |
|---|---|---|---|---|
| Web | Playwright | TypeScript | Playwright Test | HTML Report + Allure |

## Các Bước Thực Hiện

### Bước 1: Thu Thập Yêu Cầu (CHECKPOINT — Chờ User)

1. **Hỏi user** các thông tin cần thiết:

   | Câu hỏi | Mặc định nếu không trả lời |
   |---|---|
   | Tên project? | `playwright-automation` |
   | URL ứng dụng cần test? | Để trống — cấu hình sau |
   | Có cần CI/CD pipeline không? | Có (GitHub Actions) |
   | Có cần Allure Report không? | Có |
   | Chạy trên browser nào? | Chromium (mặc định) |

2. **Xác nhận lại** với user trước khi scaffold:
   ```
   Tóm tắt framework sẽ tạo:
   - Platform: Web
   - Framework: Playwright
   - Ngôn ngữ: TypeScript
   - Test runner: Playwright Test
   - Report: HTML Report + Allure
   - CI/CD: GitHub Actions
   - Tên project: <ten-du-an>

   Ban xac nhan de toi bat dau scaffold khong?
   ```

3. **Chờ user xác nhận** trước khi sang Bước 2

### Bước 2: Scaffold Project Structure (Foundation)

1. **Tạo artifact `task.md`** để theo dõi checklist:
   ```markdown
   # Framework Setup Progress
   - [x] Buoc 1: Thu thap yeu cau
   - [ ] Buoc 2: Scaffold project structure
   - [ ] Buoc 3: Sinh base classes
   - [ ] Buoc 4: Sinh fixture pattern
   - [ ] Buoc 5: Sinh example tests
   - [ ] Buoc 6: Cau hinh reporting + CI/CD
   - [ ] Buoc 7: Verify + Deliver
   ```

2. **Tạo cấu trúc thư mục** theo template trong skill `framework_architect` — xem mục **Cấu Trúc Thư Mục Dự Án**:

   ```
   <ten-du-an>/
   ├── playwright.config.ts
   ├── package.json
   ├── tsconfig.json
   ├── .env.example
   ├── .gitignore
   ├── README.md
   ├── src/
   │   ├── pages/
   │   │   ├── base.page.ts
   │   │   └── login.page.ts
   │   ├── fixtures/
   │   │   ├── base.fixture.ts
   │   │   └── auth.fixture.ts
   │   ├── utils/
   │   │   ├── test-data.ts
   │   │   ├── env.config.ts
   │   │   └── helpers.ts
   │   └── tests/
   │       └── auth/
   │           └── login.spec.ts
   ├── test-data/
   │   └── users.json
   ├── allure-results/
   ├── allure-report/
   └── .github/
       └── workflows/
           └── playwright.yml
   ```

3. **Sinh file cấu hình:**
   - `package.json` — dependencies: `@playwright/test`, `allure-playwright`, devDependencies phù hợp, scripts chạy test
   - `playwright.config.ts` — baseURL, viewport (1920x1080), timeout, retries, reporter (html + allure)
   - `tsconfig.json` — paths, strict mode
   - `.env.example` — template biến môi trường
   - `.gitignore` — loại trừ node_modules, .env, allure-results, allure-report, playwright-report

4. **Tạo file README.md** với hướng dẫn:
   - Prerequisites (Node.js version, npm)
   - Các bước cài đặt (npm install, npx playwright install)
   - Cách chạy test (headed, headless, với Allure)
   - Cách xem Allure report
   - Project structure overview

### Bước 3: Sinh Base Classes (Base Layer)

1. **`src/pages/base.page.ts`** — Base Page với các method chung:
   - `navigate(path)` — di chuyển đến URL
   - `clickElement(locator)` — click với smart wait
   - `fillInput(locator, value)` — điền vào input
   - `getText(locator)` — lấy text content
   - `isVisible(locator)` — kiểm tra element có hiển thị
   - Chỉ dùng smart waits — KHÔNG có hard sleep

2. **`src/utils/env.config.ts`** — Environment config reader:
   - Đọc biến từ `.env`
   - Export typed config object (BASE_URL, USERNAME, PASSWORD...)

3. **`src/utils/test-data.ts`** — Test data generators:
   - `generateEmail(testName)` — sinh email unique + traceable
   - `generateUsername(testName)` — sinh username unique
   - `generatePhone()` — sinh số điện thoại hợp lệ

4. **`src/utils/helpers.ts`** — Common helper functions:
   - Format date, random string, wait conditions

### Bước 4: Sinh Fixture Pattern (Authentication Layer)

1. **`src/fixtures/auth.fixture.ts`** — Authentication fixture:
   - Thực hiện đăng nhập lần đầu
   - Lưu trạng thái đăng nhập vào `storageState`
   - Các test sau tải lại state — không cần đăng nhập lại

2. **`src/fixtures/base.fixture.ts`** — Base fixture:
   - Mở rộng Playwright `test` với tất cả fixtures của project
   - Re-export `test` và `expect` từ đây
   - Tất cả spec files LUÔN import `test` từ `base.fixture.ts`

### Bước 5: Sinh Example Tests (Validation Layer)

1. **`src/pages/login.page.ts`** — Example Page Object:
   - Khai báo locators với comment chỉ dẫn thay thế sau khi inspect DOM
   - Các methods: `login()`, `getErrorMessage()`

2. **`src/tests/auth/login.spec.ts`** — Example Test:
   - Demo happy path (login thành công)
   - Có đầy đủ: Arrange — Act — Assert
   - Assertion có message rõ ràng
   - Import `test` từ `base.fixture.ts`

### Bước 6: Cấu Hình Reporting và CI/CD

1. **Allure Report setup:**
   - Cài đặt `allure-playwright` dependency
   - Cấu hình `reporter` trong `playwright.config.ts`: `['html', ['allure-playwright']]`
   - Script trong `package.json` để generate và mở Allure report:
     ```
     "report:allure": "allure generate allure-results --clean -o allure-report && allure open allure-report"
     ```
   - Screenshot tự động đính kèm khi test fail

2. **GitHub Actions CI/CD:**
   - Sinh file `.github/workflows/playwright.yml`
   - Nội dung: cài đặt Node.js, npm install, playwright install, chạy test headless
   - Upload allure-results và playwright-report là artifact
   - Biến môi trường từ GitHub Secrets

### Bước 7: Xác Minh và Bàn Giao (Quality Gate)

1. **Kiểm tra framework build được:**
   ```bash
   npm install && npx playwright install && npx playwright test --list
   ```

2. **Chạy example test** để xác minh framework hoạt động:
   - Nếu PASS — framework sẵn sàng
   - Nếu FAIL do thiếu app/URL — chấp nhận được (ghi note trong README)
   - Nếu FAIL do lỗi code framework — sửa ngay

3. **Review checklist** trước khi bàn giao:
   - Project structure đúng template
   - Tất cả dependencies đã khai báo
   - Config management hoạt động (đọc .env)
   - Base Page có đầy đủ common methods
   - POM pattern được tuân thủ
   - Smart waits — không có hard sleep
   - Fixture pattern hoạt động
   - Example test chạy được
   - README.md hướng dẫn đầy đủ
   - .gitignore bao phủ đúng
   - Allure Report tích hợp
   - Không có debug log, commented code

4. **Cập nhật `task.md`** với trạng thái hoàn thành

## Xử Lý Tình Huống Đặc Biệt

| Tình huống | Cách xử lý |
|---|---|
| User muốn multi-browser | Config thêm projects trong `playwright.config.ts` (Firefox, WebKit) |
| User có framework cũ cần refactor | Đọc code hiện tại — đề xuất migration plan — refactor từng phần |
| User không biết cấu trúc | Dùng template chuẩn trong skill `framework_architect` |

## Output

- **Project structure** đầy đủ (tất cả thư mục + files)
- **Build config** (`package.json`, `playwright.config.ts`, `tsconfig.json`)
- **Base classes** (`BasePage`, `env.config.ts`, `test-data.ts`)
- **Fixture pattern** (`auth.fixture.ts`, `base.fixture.ts`)
- **Example Page Object + Test** (`LoginPage` + `login.spec.ts`)
- **Allure Report integration**
- **GitHub Actions CI/CD pipeline**
- **README.md** (setup guide + project overview)
- **Artifact `task.md`** (checklist tiến độ)