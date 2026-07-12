---
name: Test Data Generator
description: Skill sinh test data co cau truc, unique, traceable cho automation tests, bao gom positive, negative, boundary va edge cases.
---

# Test Data Generator

## Mô Tả

Skill chuyên biệt sinh test data đáng tin cậy cho automation tests với Playwright TypeScript.

---

## Khi Nào Sử Dụng

Sử dụng skill này khi:
- Tạo test data cho test cases mới
- Sinh dữ liệu biên và edge cases
- Thiết lập data-driven tests
- Cần data unique cho mỗi lần chạy test

---

## Trách Nhiệm

Sinh test data cho:
- Registration forms (đăng ký)
- Login credentials (đăng nhập)
- Form submissions (nộp biểu mẫu)
- Search queries (tìm kiếm)
- File uploads (tải file lên)

---

## Quy Tắc Data

Tất cả data được sinh ra phải:
- **Unique** — Không trùng lặp trong cùng test suite
- **Traceable** — Có thể xác định được test nào sinh ra data này
- **Xác định được** — Cùng seed tạo ra cùng data khi cần

---

## Mẫu Tạo Data Unique

Format khuyến nghị:
```
<prefix>_<tenTest>_<timestamp>
```

Ví dụ:
```
auto_dangKy_20260402133000
test_login_1712024100
```

---

## Các Loại Data Thông Dụng

### Email
```
auto_<tenTest>_<timestamp>@test.com
```
Ví dụ: `auto_dangKy_20260402@test.com`

### Username
```
user_<tenTest>_<timestamp>
```
Ví dụ: `user_login_20260402133000`

### Số điện thoại
Số 10 chữ số bắt đầu bằng prefix hợp lệ (ví dụ: `0912345678`)

### Password
Kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt — Ví dụ: `Test@12345`

---

## Phân Loại Data

### Positive Data (Happy Path)
- Format đúng, trong giới hạn validation
- Tất cả trường bắt buộc đã điền
- Giá trị nghiệp vụ hợp lệ chuẩn

### Negative Data
- Thiếu trường bắt buộc
- Format sai (email sai, password ngắn)
- Ký tự không hợp lệ
- Giá trị đã tồn tại (duplicate check)

### Boundary Values (Giá Trị Biên)
- Độ dài tối thiểu (ví dụ: 1 ký tự)
- Độ dài tối đa (ví dụ: 255 ký tự)
- Min + 1, Max - 1
- Chuỗi rỗng vs null
- Số 0, số âm

### Edge Cases
- Unicode / ký tự đặc biệt
- Chuỗi rất dài
- SQL injection patterns (kiểm thử bảo mật)
- HTML tags trong text fields
- Khoảng trắng đầu/cuối

---

## Ràng Buộc

Test data phải:
- Tuân thủ validation rules của field (từ DOM inspection)
- Khớp với format input (format ngày, format số điện thoại)
- Không trùng lặp giữa các lần chạy test
- Không chứa thông tin cá nhân thực (PII)

---

## Format Output

Cung cấp data theo cấu trúc:

```json
{
  "positive": [
    { "email": "auto_tc01_20260402@test.com", "password": "Test@12345" }
  ],
  "negative": [
    { "email": "", "password": "Test@12345", "expectedError": "Email la bat buoc" },
    { "email": "email-khong-hop-le", "password": "Test@12345", "expectedError": "Format email khong dung" }
  ],
  "boundary": [
    { "email": "a@b.co", "password": "12345678", "note": "Do dai toi thieu" }
  ]
}
```

---

## Tham Chiếu Rules

- `.agent/rules/automation_rules.md` — Quy tắc sinh test data (Mục 2)
