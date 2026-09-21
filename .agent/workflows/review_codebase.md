---
description: Review toan dien codebase Playwright TypeScript theo chuan Senior Automation Dev Lead — kiem tra dong bo kien truc, chong hoi quy (zero regression), va bao ve file dung chung.
---

> **BẮT BUỘC (MANDATORY SKILL):** Bạn PHẢI nạp và đọc kỹ nội dung của skill **`code_review_guardian`** (tại [SKILL.md](file:///d:/Js/photo-ac-test/.agent/skills/code_review_guardian/SKILL.md)) và tuân thủ quy tắc tại [code_review_rules.md](file:///d:/Js/photo-ac-test/.agent/rules/code_review_rules.md) trước khi bắt đầu thực hiện tác vụ này.

# Workflow: Review Codebase & Quản Trị Rủi Ro Hồi Quy (Code Review Guardian)

Workflow này kích hoạt quy trình thanh tra mã nguồn tự động của **Senior Automation Dev Lead** để rà soát các thay đổi mã nguồn trước khi merge/commit.

---

## Nguyên Tắc Thực Thi

- **Khách quan & Tiêu chuẩn cao**: Không thỏa hiệp với các anti-patterns (`test.only`, `waitForTimeout`, `console.log`, hardcode data).
- **Zero-Regression là tiên quyết**: Bất kỳ sửa đổi nào trên file dùng chung (Tier 1/Tier 2) phải được chứng minh không làm gãy các tests hiện hữu.
- **Báo cáo chuẩn hóa**: Luôn đưa ra kết luận rõ ràng: **APPROVED ✅**, **CHANGES REQUESTED ⚠️**, hoặc **BLOCKED ⛔**.

---

## Các Bước Thực Hiện

### Bước 1: Xác Định Phạm Vi & Nhận Diện File Thay Đổi
1. Xác định phạm vi review dựa trên yêu cầu của User:
   - Nếu User chỉ định cụ thể file/thư mục: Tập trung vào phạm vi đó.
   - Nếu User yêu cầu "review code vừa sửa": Xác định các file đã được thêm/sửa đổi gần nhất.
2. Phân loại từng file theo ma trận 3 Tiers:
   - **Tier 1 (Core):** `playwright.config.ts`, `base.fixture.ts`, `base.page.ts`, `auth.fixture.ts`, `env.config.ts`...
   - **Tier 2 (Shared Module):** `src/pages/common/*.page.ts`, `src/utils/*.ts`...
   - **Tier 3 (Domain Specs/Pages):** `src/pages/downloader/**`, `src/tests/downloader/**`...

### Bước 2: Kiểm Soát File Dùng Chung & Vùng Ảnh Hưởng (Blast Radius Audit)
1. Nếu có file **Tier 1** hoặc **Tier 2** bị sửa đổi:
   - Dùng `grep_search` kiểm tra tất cả các vị trí trong `src/` đang gọi tới method/locator đó.
   - Kiểm tra xem method signature có bị thay đổi không. Nếu có thêm tham số, đã dùng `optional param` chưa?
   - Đảm bảo tuân thủ nguyên tắc **Tương thích ngược (Backward Compatibility)**.
2. Nếu không có file Tier 1/2 bị sửa: Chuyển thẳng sang Bước 3.

### Bước 3: Đánh Giá Tính Đồng Bộ Kiến Trúc (Consistency Audit)
Đối chiếu mã nguồn với chuẩn mực dự án:
1. **Import Check:** Spec có import đúng `{ test, expect }` từ `base.fixture.ts` không? (Tuyệt đối cấm import trực tiếp từ `@playwright/test`).
2. **POM Separation:** Page Object có chứa `expect()` nghiệp vụ không? (Nếu có -> Vi phạm POM).
3. **Locator Semantics:** Có dùng đúng thứ tự ưu tiên `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` không? Có dính dynamic CSS / raw XPath không?
4. **Allure Steps:** Các hành động và verify quan trọng có được bọc trong `test.step()` không?
5. **Test Data:** Có dùng `src/utils/test-data.ts` với tiền tố `auto_...` thay vì hardcode không?
6. **Multi-Role Matrix:** Có tôn trọng quy tắc session giữa Chromium và Firefox không?

### Bước 4: Quét Vi Phạm & Flaky Smells
Rà soát toàn bộ code thay đổi để tìm các vi phạm cấm tuyệt đối:
- Tìm kiếm sự tồn tại của: `test.only`, `describe.only`, `fit(`, `fdescribe(`.
- Tìm kiếm `waitForTimeout`, `sleep(`, `delay`.
- Tìm kiếm `console.log`, `debugger`.
- Tìm kiếm mật khẩu/token hardcode.
- Tìm kiếm các khối code lớn bị comment.

### Bước 5: Tổng Hợp Báo Cáo Phê Duyệt (Lead Sign-Off Report)
Xuất báo cáo Markdown chi tiết theo đúng định dạng mẫu trong `code_review_guardian` gồm 5 mục:
1. Phân loại thay đổi & Blast Radius.
2. Bảng scorecard kiểm định kiến trúc.
3. Danh mục code smells cần dọn dẹp.
4. Kế hoạch chạy kiểm thử hồi quy (Regression test command).
5. Kết luận (Verdict) và hướng dẫn tiếp theo.
