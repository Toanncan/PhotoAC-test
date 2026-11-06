---
name: Framework Architect
description: Skill thiet ke va scaffold automation framework hoan chinh cho Playwright TypeScript — bao gom project structure, base classes, fixtures, config management, Allure reporting, va CI/CD integration.
---

# Framework Architect (Playwright TypeScript)

## Mô Tả

Skill chuyên biệt giúp agent thiết kế, scaffold và triển khai automation framework từ đầu với **Playwright + TypeScript**.

Agent có thể:
- Thiết kế project structure theo best practices
- Sinh base classes, config management, browser management
- Tích hợp Allure Report và HTML Report
- Cấu hình CI/CD pipeline (GitHub Actions)
- Sinh template Page Object Model, fixtures, helpers
- Tạo file cấu hình (`package.json`, `playwright.config.ts`, `tsconfig.json`)

---

## Khi Nào Sử Dụng

Sử dụng skill này khi:
- User yêu cầu tạo/thiết kế automation framework mới
- User cần scaffold project structure cho test automation
- User muốn chuẩn hóa framework hiện tại
- User cần tích hợp reporting hoặc CI/CD vào framework

Từ khóa kích hoạt: "create framework", "design framework", "scaffold project", "thiet ke framework", "tao project moi"

---

## Tech Stack

- **Nền tảng:** Web
- **Framework:** Playwright
- **Ngôn ngữ:** TypeScript
- **Test runner:** Playwright Test
- **Reporting:** Allure Report + HTML Report tích hợp sẵn

---

## Cấu Trúc Thư Mục Dự Án (Playwright + TypeScript)

Đây là cấu trúc **chuẩn** cho mọi dự án automation mới. Agent PHẢI tạo đúng theo cấu trúc này:

```
<ten-du-an>/
│
├── playwright.config.ts            # Cau hinh chinh cua Playwright (baseURL, viewport, timeout, reporter, projects)
├── package.json                    # Dependencies va scripts chay test
├── tsconfig.json                   # Cau hinh TypeScript (paths, strict mode)
├── .env.example                    # Template bien moi truong (KHONG commit .env that)
├── .gitignore                      # Loai tru node_modules, .env, allure-results, playwright-report
├── README.md                       # Huong dan setup, chay test, cau truc du an
│
├── src/
│   │
│   ├── pages/                      # Page Object Classes — moi trang 1 file
│   │   ├── base.page.ts            # Base page: cac method chung (navigate, click, fill, getText, waitFor)
│   │   ├── login.page.ts           # Page object cho trang dang nhap
│   │   └── dashboard.page.ts       # Page object cho trang dashboard (vi du)
│   │
│   ├── fixtures/                   # Custom fixtures — mo rong Playwright test
│   │   ├── base.fixture.ts         # Mo rong 'test' voi tat ca fixtures can thiet (import va re-export)
│   │   └── auth.fixture.ts         # Fixture quan ly trang thai dang nhap (storageState, login setup)
│   │
│   ├── utils/                      # Cac tien ich dung chung
│   │   ├── test-data.ts            # Sinh test data unique + traceable (email, username, phone...)
│   │   ├── env.config.ts           # Doc bien moi truong tu .env, export typed config object
│   │   └── helpers.ts              # Cac ham tien ich dung chung (format date, random string...)
│   │
│   └── tests/                      # File spec chua cac test cases — to chuc theo module & role
│       ├── auth/
│       │   └── login.spec.ts       # Test cases cho chuc nang dang nhap chung
│       ├── creator/                # Test cases cho Creator (upload, ranking...)
│       │   └── upload.spec.ts
│       ├── downloader/             # Test cases cho Downloader — phan 3 subfolder theo Role:
│       │   ├── guest/              # Guest (No login: search, download...)
│       │   ├── free-user/          # Free User (search, download, register...)
│       │   └── premium/            # Premium User (search, download, receipts, profile-edit...)
│       └── mobile/                 # Test cases cho Mobile interface
│
├── test-data/                      # Du lieu test ngoai (data-driven tests)
│   └── users.json                  # Du lieu mau nguoi dung (JSON)
│
├── allure-results/                 # Thu muc ket qua raw cua Allure (tu dong sinh)
│   └── .gitkeep
│
├── allure-report/                  # Thu muc bao cao HTML cua Allure (tu dong sinh)
│   └── .gitkeep
│
└── .github/
    └── workflows/
        └── playwright.yml          # Pipeline CI/CD cho GitHub Actions
```

---

## Mo Ta Chuc Nang Tung Thanh Phan

### `playwright.config.ts`
File cau hinh chinh cua toan bo du an. Chua:
- `baseURL` — URL goc cua ung dung
- `timeout` — Thoi gian timeout cho moi action va test
- `retries` — So lan thu lai khi test fail (khuyen nghi: 1 tren CI, 0 khi debug)
- `reporter` — Cau hinh Allure reporter va HTML reporter
- `use` — Cau hinh chung: viewport (1920x1080), screenshot on failure, video on failure
- `projects` — Cau hinh chay tren nhieu browser (Chromium la mac dinh)

### `src/pages/base.page.ts`
Base Page chua cac method tai su dung:
- `navigate(path)` — Di chuyen den URL
- `clickElement(locator)` — Click voi smart wait
- `fillInput(locator, value)` — Dien vao input
- `getText(locator)` — Lay text content
- `isVisible(locator)` — Kiem tra element co hien thi
- `waitForElement(locator)` — Cho element xuat hien

### `src/pages/*.page.ts`
Moi Page Object:
- **Ranh giới 1 Route = 1 Page Class**: Mỗi màn hình có URL/Route độc lập BẮT BUỘC có file Page Object riêng (vd: `/main/trends` -> `TrendsPage`, `/user/bookmarks` -> `BookmarksPage`, `/photo/:id` -> `PhotoDetailPage`). TUYỆT ĐỐI CẤM gom gộp locator của trang này vào trang khác.
- **Đặt tên theo Thực thể Trang (Entity-Based)**: Tên file và class phải phản ánh đúng bản chất toàn diện của màn hình UI (vd: `PhotoDetailPage` thay vì `DownloadImagePage`).
- **Nghiêm cấm đoán mò Locator**: Mọi locator BẮT BUỘC phải được inspect và verify trực tiếp trên DOM thực tế. Cấm bịa ra các message giả định (`noResultMessage` khi trang luôn có data) và cẩn trọng lỗi chính tả ký tự tiếng Nhật (Kanji `口` vs Katakana `ロ`).
- **Refactor đồng bộ toàn diện**: Khi đổi tên class/file, phải đổi đồng bộ trong file, trong `base.fixture.ts` và trong toàn bộ các test specs (Zero Residual Leak).
- Khai bao tat ca locators o dau class (readonly).
- Constructor nhan `page: Page` tu Playwright.
- Cac method mo ta hanh vi nguoi dung (khong phai thao tac DOM).
- Khong co assertion — assertion chi o test class (ngoai tru Web-First auto-wait truoc khi thao tac).
- **Tuyet doi KHONG dung `test.step` trong Page Object class**: Page Object chi lam nhiem vu tuong tac UI va lay du lieu. Mien cuong nhet `test.step` vao Page lam roi thu bac Allure, lai ngon ngu (step tieng Anh xen vao luong tieng Viet cua test) va vi pham nguyen ly Don Trach Nhiem (Single Responsibility).

### `src/fixtures/auth.fixture.ts`
Fixture quan ly dang nhap & Multi-Role Architecture:
- Quan ly duong dan file `storageState` cho tung vai tro (`premium-user`, `free-user`, `creator`)
- Tach biet session giua cac trinh duyet: Chromium (`.auth/{role}.json`) va Firefox (`.auth/{role}-firefox.json`)
- Setup files tuong ung: `{role}.setup.ts` (Chromium) va `{role}-firefox.setup.ts` (Firefox)
- Tai su dung state da luu cho cac test sau — khong can dang nhap lai moi test, dam bao chay song song khong conflict


### `src/fixtures/base.fixture.ts`
Fixture goc:
- Mo rong Playwright `test` voi tat ca fixtures cua du an
- Import va re-export `test` tu day de cac spec file su dung
- Cac spec file LUON import `test` tu `base.fixture.ts` thay vi tu `@playwright/test`

### `src/utils/test-data.ts`
Sinh test data:
- Ham sinh email unique: `generateEmail(testName)`
- Ham sinh username unique: `generateUsername(testName)`
- Ham sinh so dien thoai: `generatePhone()`
- Tat ca data co timestamp de traceable

### `src/utils/env.config.ts`
Quan ly cau hinh moi truong:
- Doc cac bien tu `.env`
- Export typed config object (BASE_URL, USERNAME, PASSWORD...)
- Khong commit file `.env` that — chi commit `.env.example`

### `src/tests/**/*.spec.ts` — Quy Tắc Phân Vùng Thư Mục Test Theo Role (BẮT BUỘC)
Cac test spec:
- **Phân vùng bắt buộc theo Role đối với Multi-Role modules**:
  - Với module có nhiều vai trò như Downloader, BẮT BUỘC đặt trong subfolder role:
    - Guest: `src/tests/downloader/guest/<feature>.spec.ts`
    - Free User: `src/tests/downloader/free-user/<feature>.spec.ts`
    - Premium User: `src/tests/downloader/premium/<feature>.spec.ts`
  - Authentication flows (login/logout chung): `src/tests/auth/login.spec.ts`.
  - Creator flows: `src/tests/creator/<feature>.spec.ts`.
  - **TUYỆT ĐỐI CẤM** tạo file `.spec.ts` trực tiếp ở thư mục cha `src/tests/downloader/` (tránh phá vỡ cơ chế project routing của Playwright).
- **Tên file spec tinh gọn**: Đặt theo tính năng (`search.spec.ts`, `download.spec.ts`), không lặp lại tên role trong file name.
- **Quy tắc Đồng bộ hóa Đa vai trò (Cross-Role Parity - BẮT BUỘC)**:
  - Khi scaffold hoặc mở rộng các test spec đa vai trò (ví dụ: `guest`, `free-user`, `premium` cho `search.spec.ts` hoặc `download.spec.ts`):
  - **Toàn bộ các test case có cùng luồng kiểm thử UI** (nhập từ khóa, bộ lọc Toolbar, phân trang, reset, liên kết nhóm...) **BẮT BUỘC phải code GIỐNG NHAU 100% (Identical)**:
    - Cùng tên biến và kiểu dữ liệu (`keyword`, `creatorName`, `photoId`, `count`...).
    - Cùng bộ từ khóa test data chuẩn (không pha trộn tiếng Anh ở role này và tiếng Nhật ở role khác).
    - Cùng số lượng bước, thứ tự và câu chữ mô tả trong `test.step()` (không gắn tên role vào step chung).
    - Cùng assertions, custom error messages, và Web-First waiting.
    - Cùng timeout (`test.setTimeout(90_000)` hoặc `120_000`).
    - Cùng format tên screenshot Allure (`kebab-case` có gạch nối: `Filter-縦長`).
  - **Chỉ được phép phân hóa ở các ca kiểm thử đặc thù phân quyền** (Feature Gate chặn/cho phép, hạn mức tìm kiếm, Quickview modal vs trang chi tiết).
- Import `test` va `expect` tu `base.fixture.ts` (dùng `../../../fixtures/base.fixture` hoặc alias `@fixtures/base.fixture`).
- Su dung Page Objects — khong goi truc tiep tren `page`.
- Moi test doc lap — khong phu thuoc test khac.
- Test data unique moi lan chay.
- **Không để Dead Parameter**: Cấm truyền `testInfo` vào hàm test nếu bên trong không dùng để chụp screenshot `captureEvidenceWithUrl`.
- **Khong gan tag (`@smoke`, `@regression`, `@role`) trong tieu de test**: Tieu de test phai ngan gon, ro rang, khong chua tag lam roi giao dien Allure Report.
- **Gop buoc Tim kiem & Doi ket qua**: Luon gop `await homePage.search(keyword)` va `await searchResultPage.waitForResultDisplay()` vao cung mot `test.step('Tìm kiếm từ khóa "..." và đợi kết quả hiển thị')`. CẤM tach thanh 2 step rieng gay loang bao cao Allure.

### `test-data/*.json`
Du lieu test ngoai:
- Dung cho data-driven tests (nhieu bo du lieu)
- JSON hoac YAML format
- Khong chua credentials that

---

## Cac Thanh Phan Bat Buoc (Framework Components)

### 1. Cau Hinh Du An (Bat Buoc)
- Cau truc thu muc ro rang, tach pages/tests/utils/fixtures/config
- File `README.md` huong dan setup + chay test
- File `.gitignore` phu hop

### 2. Quan Ly Cau Hinh (Bat Buoc)
- Quan ly environment (dev/staging/prod) qua config file hoac `.env`
- Centralized config — khong hardcode gia tri trong test
- Sensitive data (credentials) qua environment variables, KHONG commit vao repo

### 3. Quan Ly Browser (Bat Buoc)
- `playwright.config.ts` voi browser setup day du
- Fixture pattern cho auth state
- Viewport 1920x1080 mac dinh khi debug

### 4. Base Classes (Bat Buoc)
- `BasePage` — chua common methods (wait, click, fill, screenshot)
- Khong hardcode waits — chi dung smart waits

### 5. Page Object Model (Bat Buoc)
- Moi page/screen — 1 Page class
- Locators khai bao o dau class, khong inline trong test
- Methods mo ta hanh vi nguoi dung

### 6. Fixture Pattern (Bat Buoc)
- `auth.fixture.ts` — quan ly trang thai dang nhap tai su dung
- `base.fixture.ts` — mo rong test voi tat ca fixtures
- Cac spec file import `test` tu `base.fixture.ts`

### 7. Quan Ly Test Data (Bat Buoc)
- Data factory / builder pattern cho test data
- Data external (JSON) cho data-driven tests
- Data unique + traceable (timestamp/random prefix)

### 8. Tien Ich (Bat Buoc)
- Test data generators
- Environment config reader
- Common helper functions

### 9. Reporting (Bat Buoc)
- **Allure Report:** Bao cao chi tiet voi step-by-step, screenshot on failure, attach evidence
- **HTML Report:** Bao cao tich hop san cua Playwright
- Screenshot tu dong dinh kem khi test fail

### 10. CI/CD Pipeline (Khuyen khich)
- GitHub Actions template
- Chay headless tren CI
- Upload allure-results va allure-report la artifact

---

## Nguyen Tac Thiet Ke

1. **DRY (Don't Repeat Yourself)** — Moi logic chi viet 1 lan, tai su dung qua Base classes va Utils
2. **Single Responsibility** — Moi class/module lam 1 viec (Page chi chua UI interaction, Test chi chua test logic)
3. **Cau Hinh Thay The Code** — URL, timeout, credentials quan ly qua config, khong hardcode
4. **Fail Fast, Log Rich** — Screenshot on failure, assertion messages ro rang

---

## Cac Loi Thuong Gap (NGHIEM CAM)

| Sai | Dung |
|---|---|
| Hardcode URL/credentials trong code | Doc tu `.env` hoac config file |
| Locator inline trong test | Khai bao trong Page class |
| `waitForTimeout()` / hard sleep | Smart waits (`expect()`, `toBeVisible()`) |
| Dung `test` import tu `@playwright/test` trong spec | Import `test` tu `base.fixture.ts` |
| Login lai trong moi test | Dung `auth.fixture.ts` voi `storageState` |
| `console.log()` de debug | Logger hoac bo di khi deliver |
| 1 file spec qua lon | Tach theo module/feature |
| Cung 1 tinh nang nhung giua cac role code khac bien, khac keyword, khac step (Cross-Role Drift) | Dong bo 100% bien, test data, step, expect va timeouts giua cac role |
| Thua tham so `testInfo` khi khong chup evidence | Xoa bo tham so thua (Dead Parameter) |
| Dat ten screenshot Allure co khoang trang (`Filter 縦長`) | Dung kebab-case co gach noi (`Filter-縦長`) |
| Boc `test.step()` ben trong Page Object class | Chi dat `test.step()` trong test spec; Page class chi chua locators va UI actions |
| Gan the `@smoke`, `@regression`, `@role` vao tieu de test | Tieu de test ngan gon, sach se; quan ly role/suite qua thu muc va project Playwright |
| Tach roi `homePage.search()` va `waitForResultDisplay()` thanh 2 step Allure | Gop chung vao 1 `test.step` hanh dong tim kiem hoan chinh de Allure report gon gang |

---

## Tham Chieu Rules

Agent PHAI tuan thu:
- `.agent/rules/automation_rules.md` — Quy tac automation chung
- `.agent/rules/code_review_rules.md` — Quy chuan code review, chong hoi quy va bao ve file dung chung
- `.agent/rules/locator_strategy.md` — Chien luoc chon locator
- `.agent/rules/playwright_rules.md` — Quy tac Playwright cu the
