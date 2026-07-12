---
trigger: always_on
---

# Quy Tắc Chung cho QA Automation (Playwright TypeScript)

Áp dụng cho mọi tác vụ automation testing với Playwright và TypeScript.

## 1. Kiến Trúc và Framework

- Bắt buộc sử dụng mô hình **Page Object Model (POM)**.
- Phân tách rõ ràng:
  - **Page classes:** Khai báo locators + methods tương tác UI
  - **Test classes:** Chứa logic kiểm thử + assertions
  - **Fixtures:** Quản lý setup/teardown và tái sử dụng state
  - **Test data:** Tách riêng khỏi code chức năng (JSON, utils)
- Assertions chỉ đặt trong Test classes, KHÔNG đặt trong Page classes.

## 2. Sinh Dữ Liệu Test

- Tất cả trường yêu cầu unique (Email, Username, Mã...) **phải sinh động**, không hardcode.
- Sử dụng Timestamp hoặc thư viện Faker.
- Dữ liệu phải **traceable** — nhìn vào hệ thống biết ngay test nào tạo ra:
  ```
  Format: [prefix]_[tenTest]_[timestamp]_[random]
  Vi du:  auto_taoKhachHang_20260402_A3F2@test.com
  ```
- Hỗ trợ chạy song song: mỗi test method có data riêng biệt, không conflict.

## 3. Chất Lượng Code

- Không logic trùng lặp — tạo helper methods cho các hành động lặp đi lặp lại.
- Code phải đơn giản, dễ đọc, dễ bảo trì.
- Trước khi bàn giao code:
  - Xóa toàn bộ `console.log` sinh ra khi debug
  - Xóa code bị comment
  - Xóa locator / biến không sử dụng

## 4. Quản Lý File và Thư Mục

- KHÔNG tự động xóa file source khi chưa xác nhận với user.
- Kiểm tra cấu trúc thư mục hiện có trước khi tạo file mới — tránh trùng lặp.
- Đặt file đúng thư mục theo kiến trúc project (xem `framework_architect`).

## 5. Quy Tắc Đặt Tên (TypeScript / Playwright)

| Thành phần | Quy tắc | Ví dụ |
|---|---|---|
| Page class | PascalCase + hậu tố `Page` | `LoginPage.ts`, `CartPage.ts` |
| Test file | kebab-case + `.spec.ts` | `login.spec.ts`, `cart.spec.ts` |
| Test block | `test('mô tả hành vi')` | `test('dang nhap thanh cong')` |
| Locator biến | lowerCamelCase hoặc readonly | `readonly loginButton` |
| Fixture file | kebab-case + `.fixture.ts` | `auth.fixture.ts` |
| Utils | PascalCase hoặc kebab-case | `DataGenerator.ts`, `test-data.ts` |

## 6. Assertions (Kiểm Tra Kết Quả)

- Mỗi test case **BẮT BUỘC** có ít nhất 1 assertion ở cuối.
- Nên có assertion xen kẽ ở các bước quan trọng.
- Assert phải mô tả rõ expected behavior:
  ```typescript
  await expect(page.getByText('Dang nhap thanh cong')).toBeVisible();
  await expect(page).toHaveURL(/dashboard/);
  ```

## 7. Tính Độc Lập Của Test

- Mỗi test case phải **độc lập** — không phụ thuộc kết quả test khác.
- Setup/teardown rõ ràng qua `beforeEach` / `afterEach`.
- Không chia sẻ state giữa các test methods.
- Dùng fixture để tái sử dụng logic setup (đăng nhập, tạo data).
