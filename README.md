# 📸 photo-ac-test — Playwright E2E Automation Framework

> **E2E Web UI Automation Framework** dành cho website **[https://test-lien.photo-ac.com/](https://test-lien.photo-ac.com/)**
>
> 🚀 **Công nghệ sử dụng:** Playwright + TypeScript (Strict Mode) | **Báo cáo:** Allure Report + HTML Report

---

## 📋 Yêu cầu hệ thống (Prerequisites)

| Công cụ | Phiên bản khuyến nghị |
| :--- | :--- |
| **Node.js** | `>= 18.x` (LTS khuyến nghị) |
| **npm** | `>= 9.x` |
| **Allure CLI** | `>= 2.x` (Dùng để xuất báo cáo trực quan) |

---

## 🚀 Hướng dẫn cài đặt (Installation Guide)

Chọn tab tương ứng với hệ điều hành của bạn để cài đặt môi trường:

### 💻 Dành cho Windows

#### **Bước 1: Cài đặt Node.js**
Bạn có thể cài đặt Node.js bằng một trong các cách sau:
* **Tải trực tiếp:** Truy cập trang chủ [Node.js LTS](https://nodejs.org/) tải bản installer `.msi` và cài đặt.
* **Sử dụng Command Line (Khuyên dùng):**
  Mở **PowerShell** với quyền Admin và chạy lệnh:
  ```powershell
  winget install OpenJS.NodeJS
  ```
  *(Sau khi cài đặt xong, hãy khởi động lại Terminal và kiểm tra phiên bản bằng lệnh `node -v` và `npm -v`)*

#### **Bước 2: Cài đặt Allure CLI**
Để tạo và mở Allure Report, bạn cần cài đặt Allure CLI:
* **Cách 1: Cài đặt qua npm (Nhanh nhất)**
  ```powershell
  npm install -g allure-commandline --save-dev
  ```
* **Cách 2: Sử dụng Scoop (Nếu có)**
  ```powershell
  scoop install allure
  ```
* **Cách 3: Sử dụng Chocolatey (Nếu có)**
  ```powershell
  choco install allure
  ```

---

### 🍎 Dành cho macOS

#### **Bước 1: Cài đặt Node.js**
* **Sử dụng Homebrew (Khuyên dùng):**
  Mở **Terminal** và chạy:
  ```bash
  brew install node
  ```
* **Sử dụng NVM (Node Version Manager - Dành cho lập trình viên quản lý nhiều phiên bản Node):**
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # Sau đó khởi động lại terminal hoặc reload shell profile
  nvm install --lts
  nvm use --lts
  ```

#### **Bước 2: Cài đặt Allure CLI**
* **Sử dụng Homebrew (Khuyên dùng):**
  ```bash
  brew install allure
  ```
* **Sử dụng npm:**
  ```bash
  npm install -g allure-commandline --save-dev
  ```

---

### 🛠️ Các bước thiết lập dự án chung (Cả Windows & macOS)

Sau khi hoàn thành thiết lập môi trường, thực hiện các bước sau tại thư mục gốc dự án:

#### **Bước 3: Tải mã nguồn & Cài đặt Dependencies**
```bash
# Cài đặt các package cần thiết trong package.json
npm install
```

#### **Bước 4: Cài đặt Trình duyệt của Playwright**
Tải xuống các trình duyệt (Chromium, Firefox, WebKit) mà Playwright quản lý:
```bash
npx playwright install
# (Tùy chọn) Cài đặt kèm các thư viện hệ thống cần thiết (đặc biệt hữu ích trên Linux/macOS hoặc CI):
npx playwright install --with-deps
```

#### **Bước 5: Cấu hình Biến môi trường**
1. Nhân bản file cấu hình mẫu:
   * **Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env
     ```
   * **macOS / Linux (Terminal):**
     ```bash
     cp .env.example .env
     ```
2. Mở file `.env` vừa tạo và điền thông tin tài khoản test của bạn:
   ```env
   BASE_URL=https://test-lien.photo-ac.com
   
   # Thông tin tài khoản Download Member (người tải ảnh)
   TEST_USER_EMAIL=your-email@example.com
   TEST_USER_PASSWORD=your-password
   
   # Thông tin tài khoản Creator (người sáng tạo nội dung)
   CREATOR_EMAIL=your-creator-email@example.com
   CREATOR_PASSWORD=your-creator-password
   ```
   > ⚠️ **LƯU Ý:** Tuyệt đối không commit file `.env` lên Git để bảo mật thông tin tài khoản.

---

## 🧪 Thực thi Automation Test (Running Tests)

Hệ thống cung cấp sẵn các câu lệnh script trong [package.json](file:///d:/Js/photo-ac-test/package.json):

| Lệnh chạy | Mô tả |
| :--- | :--- |
| `npm test` | Chạy toàn bộ test suite ở chế độ ẩn danh (**headless mode**) |
| `npm run test:headed` | Chạy test và hiển thị trình duyệt trực quan (**headed mode**) |
| `npm run test:ui` | Mở giao diện tương tác **Playwright UI mode** (Cực kỳ tiện lợi khi phát triển test) |
| `npm run test:debug` | Khởi chạy chế độ **Playwright Inspector** để debug từng dòng code |
| `npm run test:chromium` | Chỉ chạy test trên trình duyệt **Chromium** |
| `npm run test:smoke` | Chỉ chạy các test case có gắn tag `@smoke` |
| `npm run test:regression` | Chỉ chạy các test case có gắn tag `@regression` |

---

## 📊 Xuất báo cáo kết quả (Reporting)

Dự án hỗ trợ xuất 2 loại báo cáo kết quả test:

### 1. Playwright HTML Report (Tích hợp sẵn)
Báo cáo mặc định nhẹ nhàng, hiển thị chi tiết các bước chạy và chụp ảnh màn hình lỗi (nếu có).
```bash
# Xem báo cáo sau khi test chạy xong
npm run report
```

### 2. Allure Report (Trực quan & Đẹp mắt)
Báo cáo chuyên sâu, biểu diễn bằng biểu đồ Dashboard sinh động.
```bash
# Bước 1: Tạo và tự động mở Allure Report trên trình duyệt local
npm run report:allure

# Bước 2: Chỉ mở lại báo cáo Allure đã tạo trước đó
npm run allure:open

# Bước 3: Dọn dẹp các kết quả chạy cũ
npm run clean
```

---

## 📁 Cấu trúc thư mục dự án (Project Structure)

Cấu trúc thư mục thực tế của dự án được tổ chức theo chuẩn **Page Object Model (POM)**:

```
photo-ac-test/
├── playwright.config.ts        # Cấu hình chính của Playwright (Timeout, viewport, browser...)
├── package.json                # Định nghĩa các thư viện phụ thuộc & script chạy test
├── tsconfig.json               # Cấu hình TypeScript (chế độ kiểm tra nghiêm ngặt strict)
├── .env.example                # File mẫu định nghĩa các biến môi trường
├── .env                        # File chứa tài khoản mật khẩu thực tế (bị gitignore)
├── .gitignore                  # Chỉ định các file/thư mục Git không theo dõi
├── README.md                   # Tài liệu hướng dẫn này
│
├── src/
│   ├── pages/                  # [Page Object Classes] Khai báo các Selector và Action trên giao diện
│   │   ├── base.page.ts        # Page cơ sở chứa các hàm dùng chung (Click, Type, Wait...)
│   │   ├── login.page.ts       # Trang đăng nhập của Member / Downloader
│   │   ├── creator-login.page.ts # Trang đăng nhập của Creator (Người sáng tạo)
│   │   ├── dashboard.page.ts   # Giao diện trang chủ / Dashboard sau đăng nhập
│   │   └── ranking.page.ts     # Giao diện trang Bảng xếp hạng (Ranking)
│   │
│   ├── fixtures/               # [Custom Fixtures] Khởi tạo sẵn các Page giúp code test gọn hơn
│   │   ├── base.fixture.ts     # Mở rộng Playwright test để tự động inject các page instances
│   │   └── auth.fixture.ts     # Xử lý lưu và tái sử dụng trạng thái đăng nhập (Session state)
│   │
│   ├── utils/                  # [Utilities] Các module bổ trợ tiện ích
│   │   ├── env.config.ts       # Đọc và định kiểu dữ liệu (Strict type) cho các biến .env
│   │   ├── global-setup.ts     # Cấu hình khởi chạy ban đầu (tạo môi trường ghi log Allure)
│   │   ├── helpers.ts          # Các helper function xử lý chuỗi, thời gian, định dạng...
│   │   └── test-data.ts        # Generator tạo dữ liệu test ngẫu nhiên, không trùng lặp
│   │
│   └── tests/                  # [Test Specifications] Chứa các test script thực tế
│       ├── auth/
│       │   ├── auth.setup.ts   # Thực hiện đăng nhập trước và lưu lại session token (.auth/)
│       │   └── login.spec.ts   # Các ca kiểm thử liên quan đến Đăng nhập
│       ├── creator/
│       │   └── ranking.spec.ts # Các ca kiểm thử liên quan đến Bảng xếp hạng Creator
│       └── downloader/         # Các ca kiểm thử cho Downloader (Chưa triển khai)
│
├── test-data/
│   └── users.json              # Dữ liệu test tĩnh (Data-driven) như tài khoản mẫu
│
├── allure-results/             # Dữ liệu Allure thô (Tự sinh ra khi chạy test)
├── allure-report/              # Thư mục chứa trang báo cáo Allure hoàn chỉnh (HTML tĩnh)
├── playwright-report/          # Thư mục báo cáo HTML mặc định của Playwright
└── .github/
    └── workflows/
        └── playwright.yml      # File cấu hình tự động chạy test trên GitHub Actions (CI/CD)
```

---

## 🏗️ Kiến trúc Framework & Quy tắc cốt lõi (Best Practices)

Để đảm bảo dự án chạy ổn định, song song và dễ bảo trì, mọi thành viên cần tuân thủ các nguyên tắc sau:

### 1. Phân tách rõ ràng (Separation of Concerns)
* **Page Object classes** (`src/pages/`): Chỉ khai báo Selector và các hành vi tương tác trên UI. **Không thực hiện Assertions tại đây**.
* **Test specs** (`src/tests/`): Chứa luồng kiểm thử chính và các câu lệnh so sánh kết quả (`expect`).

### 2. Quy tắc vàng khi phát triển Code

| ✅ Nên làm | ❌ Tránh làm |
| :--- | :--- |
| Luôn import `test` từ `base.fixture.ts` thay vì `@playwright/test` để tận dụng các page objects đã được khởi tạo tự động. | Không khởi tạo thủ công `new LoginPage(page)` trong từng file spec nếu đã có fixture hỗ trợ. |
| Sử dụng Web-First Assertions (`await expect(locator).toBeVisible()`) để tự động chờ element xuất hiện. | Tránh dùng hard-timeout như `page.waitForTimeout(5000)` làm chậm test suite. |
| Sử dụng bộ định vị ngữ nghĩa (Semantic Locator) như `page.getByRole()`, `page.getByLabel()`. | Không sử dụng XPath tuyệt đối dựa trên cấu trúc giao diện dễ bị thay đổi. |
| Mọi dữ liệu cần tính duy nhất (Email tạo mới, tên...) phải được sinh tự động bằng [test-data.ts](file:///d:/Js/photo-ac-test/src/utils/test-data.ts). | Không hardcode dữ liệu test trùng lặp gây xung đột khi chạy song song. |

### 3. Tối ưu hóa Đăng nhập (Session Sharing)
Dự án áp dụng cơ chế đăng nhập 1 lần qua `auth.setup.ts`. Session đăng nhập sẽ được lưu vào `.auth/user.json` và tự động đính kèm vào các test case chạy sau, giúp giảm thiểu thời gian đăng nhập lặp đi lặp lại.

---

## 🧹 Dọn dẹp thư mục rác (Clean Workspace)

Trong quá trình chạy test và debug, các thư mục log và report sẽ phình to ra. Bạn có thể xóa sạch chúng bằng lệnh:
```bash
npm run clean
```

---

*Tài liệu được cập nhật tự động bởi Antigravity AI — photo-ac E2E Automation Framework*
