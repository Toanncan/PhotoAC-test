---
name: Smart Locator Agent
description: Skill sinh locator on dinh va de bao tri cho UI automation Playwright TypeScript.
---

# Smart Locator Agent

## Mô Tả

Skill chuyên biệt sinh locators ổn định và dễ bảo trì cho UI automation với Playwright TypeScript.

Nguyên tắc cốt lõi: **KHÔNG BAO GIỜ đoán locator** — phải inspect DOM thực tế trước khi sinh code.

---

## Khi Nào Sử Dụng

Sử dụng skill này khi:
- Sinh locators cho UI elements mới
- Xem xét locators hiện tại xem có ổn định không
- Debug test fail do element không tìm thấy
- Cần fallback locator khi primary locator không ổn định

---

## Trách Nhiệm

Agent phải:
1. Inspect DOM thực tế bằng MCP browser tools (KHÔNG đoán)
2. Xác định attributes ổn định
3. Sinh locator đáng tin cậy theo thứ tự ưu tiên
4. Xác minh locator unique trên trang
5. Cung cấp fallback locator nếu primary có thể bị vỡ

---

## Thứ Tự Ưu Tiên Locator (Playwright)

| Thứ tự | Locator | Khi nào dùng |
|---|---|---|
| 1 | `getByRole()` | Element có role + accessible name rõ ràng |
| 2 | `getByLabel()` | Form input có label liên kết |
| 3 | `getByPlaceholder()` | Input có placeholder, không có label |
| 4 | `getByText()` | Text content unique trên trang |
| 5 | `getByTestId()` | Element có attribute `data-testid` |
| 6 | `locator('css')` | Fallback — CSS selector ổn định |
| 7 | `locator('xpath')` | Lựa chọn cuối cùng — tránh dùng nếu có thể |

Tham chiếu chi tiết: `.agent/rules/locator_strategy.md`

---

## Ví Dụ Locator Playwright

```typescript
// Ưu tiên — Semantic locator
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')
page.getByPlaceholder('Enter your password')
page.getByTestId('submit-btn')

// Fallback — CSS selector khi không có semantic option
page.locator('button[type="submit"]')
page.locator('#email-input')

// Tránh dùng — Không ổn định
page.locator('.css-1abc-dynamic')          // Dynamic class
page.locator('//div[3]/form/button[1]')   // Positional XPath
```

---

## Quy Tắc Xác Minh

Trước khi đưa locator vào code, đảm bảo:
- Match đúng **1 element** duy nhất
- Element visible và có thể tương tác được
- Ổn định qua nhiều lần reload trang
- Không sử dụng dynamic class names
- Không sử dụng positional xpath

---

## Format Output

Khi sinh locators, cung cấp:

1. **Primary locator** — Lựa chọn tốt nhất, ổn định nhất
2. **Fallback locator** — Thay thế khi primary bị vỡ
3. **Lý do** — Giải thích tại sao chọn locator này

Ví dụ output:
```
| Element        | Primary Locator                              | Fallback Locator         | Ly do |
|----------------|----------------------------------------------|--------------------------|-------|
| Email input    | getByLabel('Email')                          | locator('#email')        | Co label lien ket |
| Login button   | getByRole('button', {name: 'Dang nhap'})    | locator('[type=submit]') | Co role + accessible name |
| Error message  | getByText('Email khong hop le')             | locator('.error-msg')    | Text content unique |
```

---

## Tham Chiếu Rules

- `.agent/rules/locator_strategy.md` — Chiến lược chọn locator tổng thể
- `.agent/rules/playwright_rules.md` — Quy tắc locator riêng cho Playwright
