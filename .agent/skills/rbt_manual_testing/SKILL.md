---
name: RBT Manual Testing
description: Skill sinh manual test cases voi 2 modes — QUICK (sinh nhanh tu requirements) va FULL RBT (quy trinh AI-RBT 6 buoc co danh gia rui ro). Master skill cho moi tac vu manual test case.
---

# RBT Manual Testing

## Mô Tả

Đây là **Skill chính** cho mọi tác vụ sinh manual test cases. Skill cung cấp **2 chế độ hoạt động** phù hợp với mọi quy mô yêu cầu:

| Chế độ | Khi nào dùng | Thời gian |
|------|-------------|-----------|
| **QUICK** | Module đơn giản, cần test case nhanh, requirements rõ ràng | 1 lượt (không chờ user) |
| **FULL RBT** | Module phức tạp, cần phân tích rủi ro, hệ thống lớn | 6 bước tuần tự (có checkpoint) |

**Nguyên tắc cốt lõi:**
- Con người xác định chiến lược, mức độ rủi ro và tiêu chuẩn
- AI thực hiện phân tích, viết test cases và rà soát lỗ hổng
- Con người kiểm tra lại kết quả trước khi chốt

---

## Khi Nào Sử Dụng

Sử dụng skill này khi:

- Sinh manual test cases từ requirements / user stories
- Phân tích requirements để phát hiện điểm mơ hồ
- Phân rã hệ thống thành modules / features
- Xây dựng traceability matrix
- Áp dụng Risk-Based Testing (đánh giá rủi ro)
- Chuẩn hóa test cases sang bảng Markdown (Jira/Excel format)
- Sinh test cases nhanh từ requirements đơn giản

**KHÔNG** sử dụng skill này khi:
- Cần sinh automation code — dùng `qa_automation_engineer`
- Cần inspect DOM / sinh locator — dùng `ui_debug_agent` / `smart_locator_agent`
- Chỉ cần sinh test data — dùng `test_data_generator`

---

## Chọn Chế Độ

Agent tự động chọn chế độ dựa trên từ khóa và ngữ cảnh:

### Chế Độ QUICK

Kích hoạt khi:
- User dùng workflow `/generate_testcases_from_requirements`
- User nói: "sinh test cases nhanh", "tạo test case từ requirement này", "viết test cases cho form..."
- Requirements đã rõ ràng, scope nhỏ (1 module / 1 tính năng)
- User không yêu cầu phân tích rủi ro

### Chế Độ FULL RBT

Kích hoạt khi:
- User dùng workflow `/generate_manual_testcases_rbt`
- User nói: "quy trình 6 bước", "phân tích RBT", "sinh test cases đầy đủ", "sinh bộ test case bài bản"
- Scope lớn (nhiều modules, hệ thống phức tạp)
- User yêu cầu Traceability Matrix hoặc đánh giá mức độ rủi ro
- Requirements chưa rõ ràng, cần phân tích điểm mơ hồ

### Khi Không Xác Định Được

Nếu không xác định được chế độ, agent hỏi user:
```
Ban muon sinh test cases theo che do nao?
1. QUICK — Sinh nhanh tu requirements (khong qua buoc phan tich)
2. FULL RBT — Quy trinh 6 buoc day du (phan tich → phan ra → RBT → sinh test case)
```

---

# Chế Độ 1: QUICK — Sinh Test Cases Nhanh

## Mục Đích

Sinh test cases **nhanh, đủ chất lượng** từ requirements/user stories đã rõ ràng, phù hợp cho module đơn giản.

## Quy Trình (1 lượt duy nhất)

**Agent phải:**

1. **Đọc và hiểu requirements** được cung cấp
2. **Xác định các luồng chính:**
   - Happy Path (luồng chính)
   - Negative Path (dữ liệu sai, thiếu)
   - Boundary Cases (giá trị biên)
3. **Áp dụng kỹ thuật thiết kế test case:**
   - **Equivalence Partitioning (EP):** Chia input thành nhóm tương đương
   - **Boundary Value Analysis (BVA):** Test giá trị tại ranh giới
   - **Decision Table:** Liệt kê tổ hợp điều kiện (nếu có nhiều rules)
   - **State Transition:** Test chuyển đổi trạng thái (nếu có workflow)
4. **Validation chuyên biệt từng trường (Field-Level Validation):**
   - Liệt kê **tất cả input fields** trên form/UI
   - Sinh validation test cases **riêng cho TỪNG trường** theo đặc tính riêng
   - Áp dụng Bảng Field-Level Validation bên dưới
   - **KHÔNG** gộp validation nhiều trường vào 1 test case
5. **Sinh test cases** với đầy đủ fields:
   - Test case ID (format: `[DU_AN]_[MODULE]_TC_[SO]`)
   - Module
   - Test Case Title / Test Scenario
   - Pre-conditions
   - Test Steps (đánh số)
   - Expected Results (đánh số tương ứng)
   - Test Data (**phải cụ thể**, không placeholder)
   - Priority (Critical / High / Medium / Low)
6. **Xuất ra bảng Markdown** chuẩn, sẵn sàng copy sang Excel/Jira

## Bảng Output

```
| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
```

## Quy Tắc Test Data (áp dụng cho cả 2 chế độ)

```
Sai: "Nhap ma so hop le"
Dung: "Nhap ma: KH-2026-0012"

Sai: "Nhap email hop le"
Dung: "Nhap email: test_khachhang_01@domain.com"

Sai: "Nhap gia tri vuot gioi han"
Dung: "Nhap 256 ky tu vao truong Name (max: 255)"
```

## Bảng Field-Level Validation (áp dụng cho cả 2 chế độ)

Khi form/UI có các input fields, agent **BẮT BUỘC** phải liệt kê từng trường và sinh validation test cases riêng theo loại:

| Loại Field | Validation cần test |
|---|---|
| **Text (Name, Address...)** | Required/Optional, Min length, Max length, Chỉ khoảng trắng, Ký tự đặc biệt, XSS injection, SQL injection, Unicode/Emoji, Leading/trailing spaces |
| **Email** | Format hợp lệ (`user@domain.com`), Thiếu `@`, Thiếu domain, Domain không hợp lệ, Nhiều `@`, Max length, Email đã tồn tại (nếu unique) |
| **Phone** | Chỉ chấp nhận số, Prefix hợp lệ (`+84`, `0`), Min/Max length, Chữ cái xen lẫn, Dấu gạch ngang/chấm/khoảng trắng |
| **Date / DateTime** | Format đúng (dd/MM/yyyy, ISO...), Ngày không tồn tại (`31/02`), Năm nhuận (`29/02/2024`), Ngày quá khứ / tương lai, Giá trị min/max date |
| **Number / Currency** | Min/Max value, Số âm, Số 0, Số thập phân, Ký tự không phải số, Overflow |
| **Dropdown / Select** | Giá trị mặc định, Tất cả options hợp lệ, Option bị disabled, Required validation |
| **Checkbox / Radio** | Trạng thái mặc định, Check/Uncheck, Required validation, Nhóm radio (chỉ chọn 1) |
| **File Upload** | File type hợp lệ/không hợp lệ, Max size, File rỗng (0 KB), Tên file có ký tự đặc biệt, Nhiều files |
| **Password** | Min/Max length, Yêu cầu ký tự đặc biệt, Yêu cầu chữ hoa/thường, Yêu cầu số, Hiện/ẩn password, Confirm password |
| **Textarea** | Max length, Line breaks, HTML tags, Character counter (nếu có) |

Nguyên tắc: Mỗi trường có đặc tính riêng — validation riêng. Phân tích từng field trước khi sinh test cases.

---

# Chế Độ 2: FULL RBT — Quy Trình AI-RBT 6 Bước

## Mục Đích

Quy trình bài bản, tuần tự cho module phức tạp. Bao gồm phân tích điểm mơ hồ, phân rã hệ thống, Traceability Matrix, đánh giá mức độ rủi ro, và sinh test cases chi tiết.

> **QUAN TRỌNG:** Quy trình này **BẮT BUỘC chạy tuần tự** từng bước. KHÔNG được gộp nhiều bước chạy 1 lần. Mỗi bước phải hoàn thành và được user xác nhận trước khi sang bước tiếp.

---

### Bước 1: Khởi Tạo Ngữ Cảnh

**Mục đích:** Thiết lập vai trò Senior QA Engineer và nạp bối cảnh dự án.

**Agent phải:**
1. Yêu cầu user cung cấp: tên dự án / tính năng, mô tả hệ thống, mục tiêu kiểm thử, tài liệu yêu cầu
2. Đọc kỹ tài liệu và xác nhận đã hiểu bối cảnh
3. Tóm tắt scope kiểm thử
4. **Chờ user xác nhận** trước khi sang Bước 2

---

### Bước 2: Phân Tích Yêu Cầu

**Mục đích:** Phân tích tài liệu để phát hiện điểm mơ hồ, thiếu sót, mâu thuẫn.

**Agent phải:**
1. Xác định các luồng: Happy Path, Alternate Paths, Exception Paths
2. Phát hiện điểm mơ hồ: thiếu sót, mâu thuẫn, chưa rõ ràng
3. Đặt câu hỏi Q&A có đánh số (Q1, Q2...) cho user/PO/BA, kèm ngữ cảnh và assumption
4. **DỪNG LẠI — Chờ user trả lời** trước khi tiếp tục

> **Đây là điểm nghẽn quan trọng nhất.** Nếu agent bỏ qua bước này và tự đoán logic, test cases sẽ sai nghiêm trọng.

---

### Bước 3: Phân Rã Hệ Thống

**Mục đích:** Chia tính năng phức tạp thành các Module / Sub-module nhỏ, dễ quản lý.

**Agent phải:**
1. Phân rã theo UI (Header, Data Table, Form popup, Sidebar...) hoặc theo luồng (Tạo mới, Sửa, Xóa...)
2. Mô tả ngắn gọn chức năng từng Module
3. Chỉ ra Dependencies giữa các Module

---

### Bước 4: Đảm Bảo Độ Bao Phủ

**Mục đích:** Thiết lập ma trận truy vết để đảm bảo 100% requirements được phủ test scenarios.

**Agent phải:**
1. Map mỗi Module/Rule với mã yêu cầu (REQ-01, REQ-02...)
2. Cross-check xem có yêu cầu nào bị thiếu (Gap Analysis)
3. Liệt kê High-Level Test Scenarios: Security/phân quyền, UI Validation, Business Logic, Data Integrity, Error Handling
4. **Chờ user review** danh sách scenarios trước khi sinh test case chi tiết

---

### Bước 5: Sinh Test Case Chi Tiết

**Mục đích:** Sinh test cases chi tiết theo chiến lược Risk-Based Testing.

**Agent phải:**
1. Đánh giá mức độ rủi ro cho mỗi Module:
   - **Rủi ro cao:** Test kỹ, nhiều cases (nghiệp vụ quan trọng, liên quan tiền, bảo mật)
   - **Rủi ro trung bình:** Test vừa phải
   - **Rủi ro thấp:** Test cơ bản, happy path
2. Sinh test case với đầy đủ fields (mô tả, pre-conditions, steps, expected, test data, priority)
3. Bao phủ: Happy Path, Negative Path, Edge Cases
4. Validation chuyên biệt từng trường (áp dụng Bảng Field-Level Validation)
5. Áp dụng kỹ thuật EP, BVA, Decision Table, State Transition
6. Nếu scenarios quá nhiều — sinh từng Module, hỏi user để tiếp tục

---

### Bước 6: Chuẩn Hóa Format

**Mục đích:** Đóng gói test cases thành bảng Markdown chuẩn.

**Agent phải:**
1. Chuẩn hóa toàn bộ test cases vào bảng Markdown:
   ```
   | Test case ID | Module | Risk Level | Test Title | Pre-Condition | Test Steps |Test Data | Expected Result | Priority | 
   ```
2. Test case ID theo format thống nhất (ví dụ: `CRM_CUST_TC_001`)
3. Test Steps và Expected Result đánh số, dùng `<br>` xuống dòng trong cell
4. **TUYỆT ĐỐI không được bỏ sót** bất kỳ test case nào
5. Xuất output dưới dạng Artifact (`test_cases_<module>.md`)

---

## Các Lỗi Thường Gặp (NGHIÊM CẤM)

- Gộp nhiều bước chạy 1 lần trong FULL RBT
- Tự đoán business logic khi chưa hỏi user
- Bỏ qua bước phân tích điểm mơ hồ
- Sinh test data chung chung / placeholder
- Rút gọn hoặc bỏ sót test case khi mapping sang bảng
- Chỉ có Happy Path, thiếu Negative/Boundary cases
- Test Steps mơ hồ, không ghi rõ dữ liệu nhập
- Gộp validation nhiều trường vào 1 test case
- Bỏ qua security validation (XSS, SQL injection)

---

## Output Format

### Chế Độ QUICK

| Output | Mô tả |
|--------|--------|
| Bảng test case Markdown | Test Cases đầy đủ, sẵn sàng copy sang Excel/Jira |

### Chế Độ FULL RBT

| Bước | Output |
|------|--------|
| 1 | Xác nhận bối cảnh |
| 2 | Luồng + Điểm mơ hồ + Câu hỏi Q&A |
| 3 | Module Decomposition + Dependencies |
| 4 | Traceability Matrix + High-Level Scenarios |
| 5 | Test Cases chi tiết (Risk Level + Test Data) |
| 6 | Bảng Markdown chuẩn (Jira/Excel ready) |

Tất cả output phải bằng **Tiếng Việt**, format **Markdown**, sử dụng **Artifact** nếu nội dung dài.
