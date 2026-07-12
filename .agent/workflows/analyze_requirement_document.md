---
description: Phan tich requirement document (Jira ticket, .doc, user story) — sinh tai lieu phan tich chi tiet, KHONG sinh test cases.
---

> **BẮT BUỘC (MANDATORY SKILL):** Bạn PHẢI nạp và đọc kỹ nội dung của skill **`requirements_analyzer`** (tại `.agent/skills/requirements_analyzer/SKILL.md`) để hiểu cách phân tích yêu cầu chuẩn trước khi bắt đầu.

# Workflow: Phân Tích Requirement Document

Workflow này phân tích requirement documents (Jira tickets, file .doc, user stories, design mockups) và sinh ra tài liệu phân tích chi tiết. **KHÔNG sinh test cases** — chỉ tập trung vào hiểu, phân rã, và phát hiện rủi ro/điểm mơ hồ trong yêu cầu.

## Khi Nào Sử Dụng

- User cung cấp Jira ticket (.doc) hoặc requirement document và yêu cầu "phân tích"
- User muốn hiểu rõ scope, acceptance criteria, và dependencies trước khi viết test
- User cần danh sách các điểm mơ hồ (ambiguities) để làm rõ với PO/BA
- User nói: "phan tich requirement", "review yeu cau", "analyze this ticket"

## Đầu Vào (Input)

Agent cần thu thập từ user:

| # | Input | Bắt buộc | Mô tả |
|---|---|---|---|
| 1 | **Requirement document** | Có | File .doc, .md, URL Jira, hoặc text mô tả yêu cầu |
| 2 | **Mockup/Screenshot** | Khuyến khích | Hình ảnh UI design, wireframe, hoặc screenshot hiện tại |
| 3 | **Tickets liên quan** | Tùy chọn | Các ticket phụ thuộc hoặc liên quan |
| 4 | **Thông tin bổ sung** | Tùy chọn | Thông tin về hệ thống hiện tại, business domain |

> Nếu user chỉ cung cấp file .doc mà không có mockup, agent vẫn phải phân tích đầy đủ dựa trên nội dung document. Nếu có mockup/screenshot, agent phân tích UI chi tiết hơn.

## Các Bước Thực Hiện

### Bước 1: Thu Thập và Đọc Hiểu

1. **Đọc requirement document** được user cung cấp (file .doc, .md, hoặc URL)
   - Nếu file .doc format HTML (export từ Jira): parse HTML để trích xuất nội dung
   - Xác định: Ticket ID, Type, Priority, Status, Reporter, Assignee, Fix Version, Sprint, Labels
2. **Đọc mockup/screenshot** nếu có — phân tích UI layout, components, fields
3. **Kiểm tra tickets liên quan** nếu có — đọc và tóm tắt dependencies
4. **Xác nhận** đã nắm được bối cảnh — tiếp tục phân tích

### Bước 2: Trích Xuất Thông Tin Cốt Lõi

1. **Tổng quan Ticket** — Bảng metadata (ID, Type, Priority, Status, Sprint, Assignee...)
2. **User Story** — Trích xuất format "As a... I want... So that..."
3. **Phạm vi áp dụng (Scope)** — Xác định rõ các module/page/component bị ảnh hưởng
4. **Acceptance Criteria** — Phân rã từng AC thành các nhóm logic, bao gồm:
   - Mô tả chi tiết từng AC
   - Bảng so sánh (nếu có cột mới, field mới, rule mới)
   - Phân biệt rõ mặc định vs tùy chọn

### Bước 3: Phân Tích UI từ Mockup (nếu có)

Nếu user cung cấp mockup/screenshot:

1. **Mô tả layout** — Breadcrumb, header, sidebar, main content, footer
2. **Liệt kê components** — Tables, forms, modals, buttons, dropdowns, tabs
3. **Chi tiết fields** — Tên field, loại (input/dropdown/date picker), label, placeholder
4. **So sánh** mockup với document — phát hiện sự không nhất quán
5. **Ghi lại quan sát** vào carousel trong artifact (nếu hình có sẵn)

### Bước 4: Phân Tích Dependencies

1. Xác định các ticket/feature liên quan
2. Đọc và tóm tắt nội dung ticket phụ thuộc
3. Nếu có mockup riêng cho dependency — phân tích UI chi tiết
4. Tổng hợp **Business Rules** từ tất cả requirements + mockups
5. Đánh dấu rõ quy tắc nào từ ticket chính vs ticket phụ thuộc

### Bước 5: Phát Hiện Điểm Mơ Hồ và Rủi Ro (Trọng Tâm)

> Đây là phần **giá trị cao nhất** của workflow — phát hiện những gì requirement KHÔNG nói rõ.

**5.1. Điểm Mơ Hồ (Ambiguities):**

Với mỗi điểm mơ hồ, ghi rõ:
- **Mã:** AMB-XX (đánh số tuần tự)
- **Câu hỏi:** Mô tả rõ ràng điều gì chưa rõ
- **Nguy cơ:** Impact nếu không được giải quyết
- **Mức độ:** Cao / Trung bình / Thấp

Các hướng phát hiện điểm mơ hồ:
- Từ khóa mơ hồ: "where applicable", "as needed", "similar to", "etc."
- Validation rules thiếu: min/max, format, required/optional
- Hành vi edge case: lỗi mạng, concurrent access, trống data
- Sự không nhất quán giữa document và mockup (tên cột, format, layout)
- Threshold/config chưa xác định
- Conflict giữa requirements cũ và mới

**5.2. Rủi Ro Kiểm Thử (Testing Risks):**

Với mỗi rủi ro, ghi rõ:
- **Mã:** RISK-XX
- **Tên rủi ro**
- **Mô tả**
- **Cách giảm thiểu**

### Bước 6: Tổng Hợp và Trình Bày

1. **Ma trận trạng thái** (nếu có state transitions) — bảng mapping trạng thái → hành vi
2. **Checklist AC** — Tóm tắt tất cả AC dạng checkbox, nhóm theo chức năng
3. **Khuyến nghị kiểm thử** — Gợi ý top 10 điều cần quan tâm nhất khi test
4. **Xuất Artifact** — Lưu toàn bộ phân tích vào file `.md`

## Cấu Trúc Output (Template Artifact)

Agent PHẢI xuất artifact theo cấu trúc sau:

```markdown
# Phan Tich Requirement: [TICKET-ID]
## [Ticket Title]

## 1. Tong Quan Ticket
(Bang metadata)

## 2. User Story
(As a... I want... So that...)

## 3. Pham Vi Ap Dung (Scope)
(Bang liet ke modules/pages bi anh huong)

## 4. Acceptance Criteria — Phan Tich Chi Tiet
### 4.1. [Nhom AC 1]
### 4.N. [Nhom AC N]

## 5. Phu Thuoc (Dependencies)
### 5.1. [Ticket phu thuoc]
#### 5.1.N. Business Rules tong hop

## 6. Phan Tich Mockup/Screenshot
### 6.N. [Mockup N]

## 7. Cac Diem Mo Ho va Rui Ro
### 7.1. Diem Mo Ho (Ambiguities)
(Bang: #, Cau hoi, Nguy co, Muc do)
### 7.2. Rui Ro Kiem Thu
(Bang: #, Rui ro, Mo ta, Cach giam thieu)

## 8. Ma Tran Trang Thai (neu applicable)
(Bang state → behavior)

## 9. Tom Tat Acceptance Criteria (Checklist)
(Checkbox nhom theo chuc nang)

## 10. Khuyen Nghi Cho Kiem Thu
(Danh sach goi y, KHONG phai test cases)
```

## Quy Tắc Quan Trọng

- KHÔNG sinh test cases — workflow này chỉ phân tích, không tạo test case
- KHÔNG tự đoán business logic nếu document không nói rõ — đưa vào Ambiguities
- KHÔNG bỏ qua comments trong Jira ticket — comments thường chứa thông tin quan trọng
- PHẢI đọc tickets liên quan nếu được reference trong AC
- PHẢI phân tích mockup chi tiết nếu được cung cấp (fields, layout, interactions)
- PHẢI ghi rõ sự không nhất quán giữa document và mockup
- PHẢI viết bằng Tiếng Việt, format Markdown, xuất Artifact
- PHẢI copy hình ảnh vào thư mục artifacts nếu cần embed trong artifact

## Mối Quan Hệ Với Workflows Khác

| Sau khi phân tích xong | Workflow tiếp theo |
|---|---|
| Cần sinh test cases nhanh | `/generate_testcases_from_requirements` |
| Cần sinh test cases bài bản (RBT 6 bước) | `/generate_manual_testcases_rbt` |
| Cần sinh automation scripts | `/generate_automation_from_testcases` |