---
trigger: always_on
---

# Chiến Lược Chọn Locator (Playwright TypeScript)

Mục tiêu: Locator phải ổn định, dễ đọc, và không bị ảnh hưởng bởi thay đổi giao diện.

Nguyên tắc cốt lõi: KHÔNG bao giờ chọn element dựa trên cấu trúc DOM gắn với styling. Xây dựng locator dựa trên thuộc tính có ngữ nghĩa.

## 1. Thứ Tự Ưu Tiên (Playwright)

Playwright cung cấp bộ locator semantic. Ưu tiên theo thứ tự:

| Thứ tự | Locator | Khi nào dùng |
|---|---|---|
| 1 | `getByRole()` | Element có role + accessible name rõ ràng (button, link, heading) |
| 2 | `getByLabel()` | Form input có label liên kết |
| 3 | `getByPlaceholder()` | Input có placeholder, không có label |
| 4 | `getByText()` | Text content unique trên trang |
| 5 | `getByTestId()` | Element có attribute `data-testid` |
| 6 | `locator('css')` | Fallback khi không có semantic option nào phù hợp |
| 7 | `locator('xpath')` | Lựa chọn cuối cùng — tránh dùng |

## 2. Quy Tắc Ổn Định

Mọi locator phải đảm bảo:
- Chỉ match **đúng 1 element** duy nhất trên trang.
- Sống sót qua thay đổi giao diện — không bị ảnh hưởng khi DOM thay đổi layout.

**NGHIÊM CẤM sử dụng:**
- CSS class name động / hash tạm thời (ví dụ: `css-1n2xyz-btn`)
- Chuỗi `nth-child`, `nth-of-type` khi có lựa chọn tốt hơn
- ID tự sinh bởi framework (auto-generated IDs)
- XPath tuyệt đối dựa trên vị trí (ví dụ: `//div[3]/div[2]/form/button`)

## 3. Quy Trình Xác Minh Locator

Trước khi đưa locator vào code, phải kiểm tra:

1. Locator có match **đúng 1 element** trong DOM không?
2. Element match có phải là thành phần người dùng tương tác được không?
3. Reload / navigate lại trang — locator có còn đúng không?
4. Thử trên nhiều trạng thái trang (loading, loaded, có data, không data).

## 4. Ví Dụ Đúng và Sai

```typescript
// Đúng — Semantic locator
page.getByRole('button', { name: 'Dang nhap' })
page.getByLabel('Email')
page.getByPlaceholder('Nhap mat khau')
page.getByTestId('submit-btn')

// Sai — Tránh dùng
page.locator('//button[@class="btn-login"]')      // XPath dựa vào class
page.locator('.form-input:nth-child(2)')          // Positional CSS
page.locator('.css-1abc-xyz')                     // Dynamic class name
```

## 5. Tham Chiếu Chi Tiết

- `.agent/rules/playwright_rules.md` — Quy tắc Playwright chi tiết