---
trigger: always_on
description: Quy chuẩn Code Review & Quản trị rủi ro hồi quy đặc thù cho Monorepo Photo-AC & Illust-AC (bổ sung và override Global Rules).
---

# [Photo-AC & Illust-AC] Quy Chuẩn Code Review & Quản Trị Rủi Ro Hồi Quy (Project Override)

> 📌 **Quan hệ kế thừa:**
> - Tài liệu này là phần **mở rộng và override chi tiết** của bộ **Global Rules** (`code_review_rules.md`, `playwright_rules.md`, `locator_strategy.md`).
> - Mọi nguyên tắc kỹ thuật chung (1 URL Route = 1 Page Object, Không đặt test.step trong POM, Clean title, Zero Regression, Open-Closed Principle...) được kế thừa tự động từ Global Rules.
> - Tài liệu này xác lập cấu trúc file cụ thể, ranh giới an toàn và checklist đặc thù cho **Photo-AC & Illust-AC Monorepo**.

---

## 1. Ma Trận Vùng Ảnh Hưởng (Blast Radius Matrix — Photo-AC Specific)

Bản đồ phân tầng rủi ro chính xác theo cấu trúc mã nguồn thực tế của Monorepo:

| Phân tầng (Tier) | Danh sách file / thư mục thực tế trong Monorepo | Mức độ rủi ro | Quy chế can thiệp |
|---|---|---|---|
| **Tier 1: Core Framework (Dùng chung toàn hệ thống)** | `playwright.config.ts`<br>`photo-ac/playwright.config.ts`<br>`illust-ac/playwright.config.ts`<br>`src/fixtures/base.fixture.ts`<br>`src/fixtures/auth.fixture.ts`<br>`src/pages/common/base.page.ts`<br>`src/utils/env.config.ts`<br>`src/utils/global-setup.ts`<br>`tsconfig.json`, `package.json` | 🔴 **CRITICAL (Rủi ro cực cao)** | - Hạn chế tối đa can thiệp.<br>- Cấm đổi signature hàm đã có, chỉ mở rộng bằng optional params.<br>- Bắt buộc chạy regression trên toàn bộ test projects (`guest`, `free-user`, `premium`, `creator` trên cả Chromium & Firefox). |
| **Tier 2: Shared Module (Dùng chung cho nhiều spec Photo-AC)** | `src/pages/common/login.page.ts`<br>`src/pages/common/home.page.ts`<br>`src/pages/common/search-results.page.ts`<br>`src/pages/common/gmail.page.ts`<br>`src/utils/helpers.ts`<br>`src/utils/test-data.ts`<br>`src/utils/pdf.utils.ts`<br>`src/utils/mail-tm.helper.ts`<br>`src/utils/email-verification.helper.ts` | 🟠 **HIGH (Rủi ro cao)** | - Quét `grep_search` kiểm tra toàn bộ callers trước khi chỉnh sửa method/locator.<br>- Tuyệt đối không xóa/đổi tên locator đang dùng.<br>- Chạy lại toàn bộ specs phụ thuộc trực tiếp. |
| **Tier 3: Domain Pages & Specs (Độc lập theo phân vùng vai trò)** | `src/pages/downloader/**`<br>`src/pages/creator/**`<br>`src/tests/downloader/guest/**`<br>`src/tests/downloader/free-user/**`<br>`src/tests/downloader/premium/**`<br>`src/tests/creator/**`<br>`src/tests/auth/**`<br>`src/tests/mobile/**` | 🟢 **LOW / MEDIUM (Cục bộ)** | - Phải tuân thủ chuẩn POM 1 Route = 1 Page, gom nhóm search + wait.<br>- Đảm bảo độc lập tuyệt đối giữa các test case.<br>- Đảm bảo Cross-Role Parity giữa Guest, Free User và Premium (xem `automation_rules.md §6`). |

---

## 2. Quản Trị Session Storage Đặc Thù

- **Guest User**: Bắt buộc khởi tạo với storageState rỗng:
  ```typescript
  test.use({ storageState: { cookies: [], origins: [] } });
  ```
- **Free User / Premium User / Creator**:
  - Được cấu hình tự động thông qua các project trong `playwright.config.ts` trỏ tới file session lưu tại `.auth/`.
  - **TUYỆT ĐỐI CẤM** các file test tự ý đọc/ghi đè hoặc xóa các file trong thư mục `.auth/`.

---

## 3. Sign-off Checklist Bổ Sung (Dành Riêng Cho Photo-AC & Illust-AC)

Bên cạnh **11 tiêu chí cốt lõi của Global Checklist**, người review (hoặc AI agent) bắt buộc phải kiểm tra thêm **6 tiêu chí nghiệp vụ đặc thù** sau đây trước khi phê duyệt:

```markdown
[ ] 12. Ad-Blocker Safety:
        - Các test case chạy với vai trò Guest hoặc Free User đã gọi `await enableAdBlocker(page);` trong `beforeEach` để ngăn popup Google Vignette Ads làm nghẽn luồng tương tác chưa?

[ ] 13. Evidence Traceability & Naming:
        - Các bước assertion quan trọng, popup modal giới hạn hoặc kết quả tìm kiếm đã chụp ảnh qua `captureEvidenceWithUrl(page, testInfo, 'kebab-case-name')` chưa?
        - Tên ảnh bằng chứng có tuân thủ định dạng gạch nối không (ví dụ: `Filter-縦長`, `Filter-2人`, `Sort-Popular-Blocked`, CẤM dùng khoảng trắng)?

[ ] 14. Fake Email Lifecycle (MailTmHelper):
        - Các kịch bản đăng ký/nâng cấp dùng tài khoản ảo qua `MailTmHelper` đã bọc trong khối `try ... finally` để luôn gọi `await mailHelper.deleteAccount(); await mailHelper.dispose();` dọn dẹp hòm thư chưa?

[ ] 15. PDF Validation (/user/receipts):
        - Màn hình tải hóa đơn PDF đã kiểm tra cấu trúc qua `PdfUtils.validatePdfStructure()` và nội dung văn bản qua `PdfUtils.verifyContent()` chưa?

[ ] 16. Gmail API & Timeout (/payments):
        - Các kịch bản gọi `EmailVerificationHelper` (xác thực email thanh toán/kích hoạt) đã thiết lập `test.setTimeout(90_000)` để phòng ngừa độ trễ đồng bộ của Gmail API chưa?

[ ] 17. CJK / IME & Ký Tự Tiếng Nhật Đặc Thù:
        - Đã phân biệt chính xác Kanji `口` vs Katakana `ロ` trong các chuỗi UI (vd: `ログイン`) chưa?
        - Khoảng trắng tiếng Nhật full-width (`\u3000`) và half-width đã được xử lý chuẩn xác chưa?
        - Form submit có nút submit hoặc fallback Enter an toàn để không bị nuốt sự kiện IME composition trên Firefox chưa?
```

---

## 4. Tài Liệu Nghiệp Vụ Tham Chiếu Trực Tiếp

1. **Quy chuẩn Cốt lõi & Cross-Role Parity** ➔ [`.agent/rules/automation_rules.md`](file:///d:/Js/photo-ac-test/.agent/rules/automation_rules.md)
2. **Hướng dẫn Tiện ích dùng chung (PDF, Mail.tm, Gmail API, Helpers)** ➔ [`.agent/rules/utilities_guide.md`](file:///d:/Js/photo-ac-test/.agent/rules/utilities_guide.md)
3. **Đặc tả nghiệp vụ chi tiết từng tính năng** ➔ [`.agent/rules/features/`](file:///d:/Js/photo-ac-test/.agent/rules/features/)
4. **Hướng dẫn Local Test Portal & Runner** ➔ [`.agent/rules/local_test_runner.md`](file:///d:/Js/photo-ac-test/.agent/rules/local_test_runner.md)

