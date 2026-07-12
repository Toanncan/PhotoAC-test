---
trigger: always_on
---

# Quy Tắc Dành Riêng Cho Playwright TypeScript

Áp dụng khi thiết lập và chạy automation với Playwright + TypeScript.

## 1. Thiết Lập Browser (BẮT BUỘC)

- **Viewport debug:** Mọi quá trình debug UI bắt buộc chạy với viewport desktop: **`1920x1080`**.
- **Playwright MCP — Resize bắt buộc:** Khi sử dụng Playwright MCP để debug UI, **LUÔN LUÔN** gọi `browser_resize(width=1920, height=1080)` **ngay sau khi mở browser**.

  ```
  Thu tu bat buoc:
  1. browser_navigate(url)              — mo trang
  2. browser_resize(width=1920, height=1080) — set viewport
  3. browser_snapshot() hoac browser_take_screenshot() — bat dau inspect
  ```

- **Headed mode:** Bắt buộc mở browser có hiển thị (headed) trong quá trình thiết lập và debug test.
- **Headless mode:** Chỉ được phép sử dụng khi:
  - Test đã debug PASS 100% trên headed mode
  - Hoặc trong CI/CD pipeline

## 2. Quy Trình Phát Triển và Tìm Element

- Ưu tiên sử dụng **Playwright MCP** để mở browser và tương tác với trang đích.
- **Inspect DOM thực tế:** Xác minh và thu thập selector trực tiếp từ browser DOM.
- **TUYỆT ĐỐI KHÔNG:**
  - Đoán locator
  - Sao chép locator từ code cũ mà không xác minh lại
  - Dựa vào tài liệu mà không xác nhận sự tồn tại trên UI thực

## 3. Thứ Tự Ưu Tiên Locator Playwright

| Thứ tự | Locator | Tốt nhất cho |
|---|---|---|
| 1 | `getByRole()` | Semantic elements (button, link, heading...) |
| 2 | `getByLabel()` | Form fields có label |
| 3 | `getByPlaceholder()` | Inputs có placeholder text |
| 4 | `getByText()` | Text content |
| 5 | `getByTestId()` | Element có `data-testid` |
| 6 | `locator("css")` | Fallback khi không có semantic option |

## 4. Chiến Lược Chờ Đợi (Wait Strategy)

**NGHIÊM CẤM:**
- `page.waitForTimeout()` — hard sleep
- `await new Promise(r => setTimeout(r, N))` — tự tạo delay

**SỬ DỤNG — Web-First Assertions (auto-waiting):**
```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Thanh cong');
await expect(page).toHaveURL(/dashboard/);
```

Chỉ dùng `waitForSelector()` khi `expect()` không đáp ứng được yêu cầu đặc biệt.

## 5. Cấu Trúc Test

```typescript
test.describe('Ten Module', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: navigate, login...
  });

  test('mo ta hanh vi can test', async ({ page }) => {
    // Arrange: khoi tao page objects, data
    // Act: thuc hien hanh dong
    // Assert: kiem tra ket qua
  });
});
```

- Mỗi test block phải có **assertion rõ ràng**
- Sử dụng `test.describe` để nhóm test theo module
- Sử dụng `beforeEach` / `afterEach` để setup / teardown
- Sử dụng **Fixtures** để tái sử dụng login state và setup phức tạp

## 6. Fixture Pattern

```typescript
// src/fixtures/base.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

- Dùng fixture thay vì lặp code login trong `beforeEach`
- `auth.fixture.ts` — lưu trạng thái đăng nhập qua `storageState`
- `base.fixture.ts` — mở rộng `test` với tất cả fixtures cần thiết
