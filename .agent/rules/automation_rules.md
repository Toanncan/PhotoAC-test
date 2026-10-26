---
trigger: always_on
description: Bộ quy chuẩn cốt lõi bắt buộc cho QA Automation (Playwright TypeScript) trên Monorepo Photo-AC & Illust-AC.
---

# Quy Chuẩn Cốt Lõi Cho QA Automation (Playwright TypeScript)

Áp dụng bắt buộc cho mọi tác vụ automation testing trên **Monorepo Photo-AC & Illust-AC**.

---

## 1. Ranh Giới Kiến Trúc & Page Object Model (POM)

- **1 URL Route = 1 Page Object Class (Single Responsibility per Route - BẮT BUỘC):**
  - Mỗi màn hình có URL/Route độc lập BẮT BUỘC phải định nghĩa trong 1 file Page riêng (`/user/bookmarks` ➔ `BookmarksPage`, `/photo/:id` ➔ `PhotoDetailPage`, `/main/trends` ➔ `TrendsPage`).
  - **TUYỆT ĐỐI CẤM** gom gộp hoặc nhét locator của trang này vào class của trang khác.
- **Tên Page Object theo Thực thể Trang (Entity-Based Naming):**
  - Tên class và file phải phản ánh đúng thực thể toàn diện của trang (vd: `PhotoDetailPage` thay vì `DownloadImagePage`).
- **Tách biệt Assertions:**
  - Page Class chỉ chứa selector và UI interactions. Mọi `expect()` khẳng định nghiệp vụ BẮT BUỘC nằm trong file `.spec.ts`.
- **Import bắt buộc:** Mọi file spec **BẮT BUỘC** import `{ test, expect }` từ `base.fixture` (dùng `../../../fixtures/base.fixture` hoặc `@fixtures/base.fixture`). CẤM import trực tiếp từ `@playwright/test`.
- **Báo cáo Allure:** Bọc mọi action và assertion quan trọng trong `test.step('mô tả')`.

---

## 2. 100% Mô Phỏng Người Dùng Thật (True User Simulation)

- Mọi kịch bản E2E (đặc biệt Tìm kiếm & Bộ lọc) **BẮT BUỘC thao tác trực tiếp trên giao diện UI** (click mở toolbar/dropdown, fill input, chọn radio/checkbox, nhấn Enter/Apply).
- **TUYỆT ĐỐI CẤM** việc lạm dụng sửa URL / tiêm query params (`page.goto('...?param=val')`, `searchWithCombinedParams()`) để đi tắt hoặc giả lập filter (trừ test case chuyên biệt về deep-link routing hoặc URL persistence khi phân trang).
- Khi element nằm trong dropdown/modal, luôn dùng `:visible` scope để tránh tương tác nhầm vào element ẩn.

---

## 3. Quy Tắc Phân Vùng Thư Mục Test Bắt Buộc (Strict Test Spec Partitioning)

Mọi file test `.spec.ts` **BẮT BUỘC** lưu đúng theo ma trận phân cấp thư mục sau:

| Module / Vai trò | Thư mục Test Bắt Buộc | Quy ước đặt tên File Spec |
|---|---|---|
| **Guest** (Chưa đăng nhập) | `src/tests/downloader/guest/` | `search.spec.ts`, `download.spec.ts` |
| **Free User** (Tài khoản miễn phí) | `src/tests/downloader/free-user/` | `search.spec.ts`, `download.spec.ts`, `register.spec.ts` |
| **Premium User** (Tài khoản trả phí) | `src/tests/downloader/premium/` | `search.spec.ts`, `download.spec.ts`, `receipts.spec.ts`, `profile-edit.spec.ts` |
| **Creator** (Tác giả) | `src/tests/creator/` | `upload.spec.ts`, `ranking.spec.ts` |
| **Auth flows** (Login/Logout chung) | `src/tests/auth/` | `login.spec.ts` |
| **Mobile** (Giao diện di động) | `src/tests/mobile/` | `search-mobile.spec.ts` |

> ⛔ **CẢNH BÁO BẮT BUỘC:**
> - **TUYỆT ĐỐI CẤM tạo file spec trực tiếp ở gốc `src/tests/downloader/`** (phải luôn đặt trong subfolder role: `guest/`, `free-user/`, hoặc `premium/`).
> - **Tên file spec tinh gọn**: KHÔNG lặp lại tên role trong tên file (đặt `search.spec.ts`, CẤM đặt `search-guest.spec.ts` bên trong `guest/`).

---

## 4. Tiêu Chuẩn Viết Code, Locator & Test Data

- **CẤM ĐOÁN MÒ LOCATOR (Strict DOM Verification):**
  - Mọi locator BẮT BUỘC inspect trực tiếp trên DOM thực tế bằng Playwright MCP. CẤM copy locator cũ hoặc đoán mò selector.
  - Phân biệt chính xác ký tự tiếng Nhật (Kanji `口` vs Katakana `ロ` trong `ログイン`), khoảng trắng full-width (`\u3000`) vs half-width.
  - Chaining `.or()` an toàn cho các element đại diện trang (vd: heading fallback sang search form hoặc logo).
- **Thứ tự ưu tiên Semantic Locators:** `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > `getByTestId` > `css`. CẤM dùng positional xpath hoặc dynamic class.
- **Quy chuẩn Ngôn ngữ Phân tầng (Hybrid Layered Language):**
  - Tầng Kỹ thuật (`src/pages/`, `src/fixtures/`, `src/utils/`): **100% Tiếng Anh chuẩn (English only)**.
  - Tầng Kiểm thử (`src/tests/`): Tiêu đề test và Allure `test.step()` viết bằng **Tiếng Việt**, giữ nguyên các từ khóa UI Tiếng Nhật nguyên bản trên màn hình (vd: `「学生」の写真素材`, `今すぐ購入`).
- **Đánh số Test Case ID:** Format `TC-[MODULE]-[ROLE]-[001]` tăng dần liên tục (`001`, `002`, `003`...). CẤM nhảy cóc số lộn xộn.
- **Sinh Test Data:** Bắt buộc dùng `src/utils/test-data.ts` với format: `auto_[tenTest]_[timestamp]_[random]`.

---

## 5. Danh Mục Cấm Tuyệt Đối (Zero-Tolerance Anti-Patterns)

| Anti-Pattern | Lý do cấm | Giải pháp chuẩn |
|---|---|---|
| `test.only`, `describe.only` | Bỏ qua toàn bộ test suite khác, gây báo cáo sai trên CI/CD | Xóa bỏ trước khi review / commit |
| `page.waitForTimeout` / hard sleep | Gây flaky test và lãng phí tài nguyên | Dùng Web-First Assertions (`expect(locator).toBeVisible()`) |
| `console.log` / code comment rác | Làm bẩn output log và Allure report | Dọn dẹp sạch sẽ trước khi kết thúc task |
| Sửa/xóa trực tiếp `.auth/*.json` | Phá vỡ quản lý session dùng chung | Guest dùng cookies rỗng; Free/Premium/Creator để project tự inject |
| Ký tự box-drawing rườm rà (`─────`, `====`) | Gây nhiễu và khó đọc mã nguồn | Chỉ dùng comment 1 dòng ngắn gọn (vd: `// [Feature Name]`) |

---

## 6. Tài Liệu Chuyên Biệt Tham Chiếu Nhanh

- **Hướng dẫn sử dụng Tiện ích dùng chung (PDF, Fake Mail, Gmail API, Helpers)** ➔ Xem [`.agent/rules/utilities_guide.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/utilities_guide.md).
- **Đặc tả tính năng & Ma trận hành vi 2 site (Search, Download, Creator, Auth)** ➔ Xem [`.agent/rules/features/README.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/README.md).
- **Quy chuẩn Code Review & Quản trị file dùng chung (Zero Regression)** ➔ Xem `code_review_rules.md`.
