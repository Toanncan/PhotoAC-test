---
name: requirements_analyzer
description: Ky nang phan tich trang web/module va sinh ra tai lieu Yeu cau (Requirements Document/User Stories) chuan muc.
---

# Kỹ Năng Phân Tích Yêu Cầu

Kỹ năng này giúp AI (Antigravity) chuyển đổi giao diện UI hoặc cấu trúc DOM/HTML của trang web thành tài liệu yêu cầu rõ ràng, chi tiết — phục vụ trực tiếp cho QA, Tester và Developer.

## 1. Mục Tiêu Cốt Lõi

- Xây dựng tài liệu yêu cầu bám sát thực tế hệ thống đang chạy.
- Đảm bảo tính nhất quán, bao quát cho cả Happy Path và Edge Cases.
- Định dạng xuất ra chuyên nghiệp (Artifact dạng Markdown).

## 2. Quy Trình Trích Xuất Thông Tin

Khi được yêu cầu tạo tài liệu yêu cầu từ trang web:

1. **Phân tích khung giao diện (Layout Analysis):**
   - Xác định các phần Header, Footer, Sidebar, và Nội dung chính.

2. **Thu thập Form và Inputs:**
   - Tìm tất cả các trường nhập liệu (`input`, `select`, `textarea`).
   - Ghi nhận thuộc tính: `type` (text, email, password, number), `required`, `maxlength`, `minlength`, `pattern`.

3. **Thu thập các nút tương tác (Buttons/Links/Actions):**
   - Xác định chức năng của từng button (Save, Submit, Cancel, Delete, Edit).
   - Các thông báo, cảnh báo (Alerts, Toasts, Validation Messages) xuất hiện khi tương tác lỗi.

4. **Trích xuất luồng công việc (Workflows):**
   - Sự phụ thuộc giữa các thành phần (ví dụ: button Submit chỉ enable khi đã tích chọn Checkbox).

## 3. Cấu Trúc Tài Liệu Yêu Cầu Đầu Ra

Tài liệu cần được format theo Markdown chuyên nghiệp, lưu dưới dạng Artifact (`requirements_spec.md`).

**Nội dung bắt buộc phải có:**

### 3.1. Tổng Quan (Overview)

Mô tả tóm tắt tính năng và mục đích của trang web/module.

### 3.2. Yêu Cầu Chức Năng (Functional Requirements)

Chia thành các User Stories hoặc Use Cases:
- **Tên tính năng** (Ví dụ: Chức năng Đăng nhập)
- **Mô tả:** "Là người dùng, tôi muốn... để có thể..."
- **Tiêu chí chấp nhận (Acceptance Criteria):** Ghi rõ các điều kiện cần thỏa mãn.

### 3.3. Đặc Tả Trường Dữ Liệu (Field Specifications)

Bảng Markdown liệt kê:
- Tên trường (Label)
- Loại (Type UI)
- Validation Rules (Bắt buộc / Mặc định / Giới hạn độ dài)
- Ghi chú (Notes)

### 3.4. Các Luồng Xử Lý và Báo Lỗi (Business Rules và Validations)

Liệt kê chi tiết các thông báo lỗi mong đợi khi người dùng nhập sai dữ liệu.

## 4. Quy Tắc Bắt Buộc

- Luôn viết bằng **Tiếng Việt**.
- Không tự suy diễn yêu cầu nghiệp vụ phức tạp nếu không có căn cứ từ UI. Nếu thiếu logic, liệt kê vào mục "Câu hỏi / Làm rõ với PO-User".
- Nếu có Playwright MCP, ưu tiên mở browser thực để screenshot/capture giao diện khi cần.
- Tham chiếu tài liệu yêu cầu từ workflow `/analyze_requirement_document` khi phân tích Jira ticket hoặc file .doc.
