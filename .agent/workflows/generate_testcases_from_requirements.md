---
description: Sinh manual test cases nhanh tu requirements (QUICK mode — khong qua quy trinh 6 buoc).
---

> **BẮT BUỘC (MANDATORY SKILL):** Bạn PHẢI nạp và đọc kỹ nội dung của skill **`rbt_manual_testing`** (tại `.agent/skills/rbt_manual_testing/SKILL.md`) trước khi bắt đầu thực hiện tác vụ này. Sử dụng **Chế Độ QUICK** của skill.

# Workflow: Sinh Manual Test Cases Nhanh từ Requirements

Workflow này sử dụng **Chế Độ QUICK** của skill `rbt_manual_testing` để sinh test cases nhanh từ requirements đã sẵn có.

## Nguyên Tắc

- **Chế độ:** QUICK (1 lượt duy nhất, không chờ user giữa chừng)
- Phù hợp cho module đơn giản, requirements đã rõ ràng
- Nếu phát hiện requirements quá phức tạp hoặc mơ hồ — **tự động chuyển sang FULL RBT** và thông báo user
- Tất cả output bằng **Tiếng Việt**

## Các Bước Thực Hiện

1. **Đọc và hiểu requirements** được user cung cấp
2. **Xác định các luồng chính:** Happy Path, Negative Path, Boundary Cases, Edge Cases
3. **Áp dụng kỹ thuật thiết kế test case:**
   - Equivalence Partitioning (EP)
   - Boundary Value Analysis (BVA)
   - Decision Table (nếu có nhiều rules)
   - State Transition (nếu có workflow)
4. **Validation chuyên biệt từng trường (Field-Level Validation):**
   - Liệt kê tất cả input fields trên form/UI
   - Sinh validation test cases **riêng cho TỪNG trường** theo đặc tính riêng (text, email, phone, date, number, dropdown, file upload, password...)
   - Áp dụng **Bảng Field-Level Validation** trong skill `rbt_manual_testing` để chọn validation phù hợp
   - KHÔNG gộp validation nhiều trường vào 1 test case
5. **Sinh test cases đầy đủ fields:**
   - Test case ID (format: `[DU_AN]_[MODULE]_TC_[SO]`)
   - Module
   - Test Scenario / Test Case Title
   - Pre-conditions
   - Test Steps (đánh số)
   - Expected Results (đánh số tương ứng)
   - Test Data (**phải cụ thể**, không placeholder)
   - Priority (Critical / High / Medium / Low)
6. **Xuất ra bảng Markdown chuẩn**

## Bảng Output

```
| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
```

## Quy Tắc Quan Trọng

- Test Data phải cụ thể: `test_login_01@domain.com`, không phải "email hợp lệ"
- Phải bao gồm cả Positive, Negative, Boundary, và Edge cases
- Mỗi trường input phải có validation test cases riêng (không gộp nhiều trường vào 1 test case)
- Test case ID theo format thống nhất do user quy ước hoặc mặc định `[DU_AN]_[MODULE]_TC_[SO]`
- Nếu quá nhiều test cases — chia thành Part 1, Part 2 và hỏi user

## Khi Nào Chuyển Sang FULL RBT

Agent **tự động đề xuất chuyển chế độ** nếu phát hiện:
- Requirements mơ hồ, cần hỏi Q&A
- Scope lớn (hơn 3 modules)
- Logic nghiệp vụ phức tạp, nhiều điều kiện chồng chéo
- User yêu cầu Traceability Matrix hoặc đánh giá mức độ rủi ro