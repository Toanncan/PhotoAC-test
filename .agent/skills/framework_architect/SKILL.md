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
│   └── tests/                      # File spec chua cac test cases — to chuc theo module
│       ├── auth/
│       │   └── login.spec.ts       # Test cases cho chuc nang dang nhap
│       ├── dashboard/
│       │   └── dashboard.spec.ts   # Test cases cho dashboard
│       └── ...                     # Them thu muc theo module
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
- Khai bao tat ca locators o dau class (readonly)
- Constructor nhan `page: Page` tu Playwright
- Cac method mo ta hanh vi nguoi dung (khong phai thao tac DOM)
- Khong co assertion — assertion chi o test class

### `src/fixtures/auth.fixture.ts`
Fixture quan ly dang nhap:
- Luu trang thai dang nhap vao `storageState` sau lan dang nhap dau tien
- Tai su dung state da luu cho cac test sau — khong can dang nhap lai moi test
- Giam thoi gian chay test toan bo

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

### `src/tests/**/*.spec.ts`
Cac test spec:
- Moi file test mot tinh nang/module cu the
- Import `test` va `expect` tu `base.fixture.ts`
- Su dung Page Objects — khong goi truc tiep tren `page`
- Moi test doc lap — khong phu thuoc test khac
- Test data unique moi lan chay

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

---

## Tham Chieu Rules

Agent PHAI tuan thu:
- `.agent/rules/automation_rules.md` — Quy tac automation chung
- `.agent/rules/locator_strategy.md` — Chien luoc chon locator
- `.agent/rules/playwright_rules.md` — Quy tac Playwright cu the
