# 📸 photo-ac-test — Playwright E2E Automation Framework

> **E2E Web UI Automation Framework** 
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
   BASE_URL=link test.
   
   # Thông tin tài khoản Download Member - Premium
   PREMIUM_USER_EMAIL=your-email@example.com
   PREMIUM_USER_PASSWORD=your-password
   
   # Thông tin tài khoản Download Member - Free
   FREE_USER_EMAIL=your-free-email@example.com
   FREE_USER_PASSWORD=your-free-password
   
   # Thông tin tài khoản Creator (người sáng tạo nội dung)
   CREATOR_EMAIL=your-creator-email@example.com
   CREATOR_PASSWORD=your-creator-password
   ```
   > ⚠️ **LƯU Ý:** Tuyệt đối không commit file `.env` lên Git để bảo mật thông tin tài khoản.

---

## 🧪 Thực thi Automation Test (Running Tests)

Hệ thống cung cấp sẵn các câu lệnh script trong [package.json]:

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
├── photo-ac/                   # Workspace kiểm thử cho website Photo-AC (photo-ac.com)
│   ├── playwright.config.ts    # Cấu hình Playwright riêng cho Photo-AC
│   ├── tsconfig.json           # Cấu hình TypeScript riêng cho Photo-AC
│   ├── package.json            # Package config của Photo-AC workspace
│   ├── test-data/              # Dữ liệu test mẫu của Photo-AC
│   └── src/
│       ├── pages/              # [Page Object Classes] Khai báo Selector và Action UI
│       │   ├── common/         # Page objects dùng chung (Home, Login, Search Results...)
│       │   ├── downloader/     # Page objects cho Downloader (Profile, Receipts...)
│       │   ├── creator/        # Page objects cho Creator (Ranking...)
│       │   └── mobile/         # Page objects cho giao diện Mobile
│       ├── fixtures/           # [Custom Fixtures] Khởi tạo Page Objects & Auth Session
│       ├── tests/              # [Test Specifications] Test scripts (auth, downloader, creator, mobile)
│       └── utils/              # [Utilities] Tiện ích (Email, PDF, helpers, test-data...)
│
├── illust-ac/                  # Workspace kiểm thử cho website AC-Illust (ac-illust.com)
│   ├── playwright.config.ts    # Cấu hình Playwright riêng cho AC-Illust
│   ├── tsconfig.json           # Cấu hình TypeScript riêng cho AC-Illust
│   ├── package.json            # Package config của AC-Illust workspace
│   ├── test-data/              # Dữ liệu test mẫu của AC-Illust
│   └── src/
│       ├── pages/              # Page objects cho AC-Illust
│       ├── fixtures/           # Fixtures cho AC-Illust
│       ├── tests/              # Test specs cho AC-Illust
│       └── utils/              # Tiện ích bổ trợ cho AC-Illust
│
├── dashboard/                  # Server & Web Test Portal UI cho team QA (Chạy test 1-click)
├── .github/workflows/          # CI/CD pipelines (photo-ac.yml & illust-ac.yml)
├── package.json                # Quản lý Workspaces & Scripts điều phối
├── tsconfig.json               # Cấu hình TypeScript gốc cho Monorepo
├── Run-Test-App.bat            # Launcher khởi động Test Portal trên Windows
└── Setup-Lan-Dau.bat           # Script cài đặt môi trường ban đầu
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
| Mọi dữ liệu cần tính duy nhất (Email tạo mới, tên...) phải được sinh tự động bằng [test-data.ts](../src/utils/test-data.ts). | Không hardcode dữ liệu test trùng lặp gây xung đột khi chạy song song. |

### 3. Tối ưu hóa Đăng nhập (Session Sharing)
Dự án áp dụng cơ chế đăng nhập 1 lần qua `auth.setup.ts`. Session đăng nhập sẽ được lưu vào `.auth/user.json` và tự động đính kèm vào các test case chạy sau, giúp giảm thiểu thời gian đăng nhập lặp đi lặp lại.

---

## 🧹 Dọn dẹp thư mục rác (Clean Workspace)

Trong quá trình chạy test và debug, các thư mục log và report sẽ phình to ra. Bạn có thể xóa sạch chúng bằng lệnh:
```bash
npm run clean
```

---

