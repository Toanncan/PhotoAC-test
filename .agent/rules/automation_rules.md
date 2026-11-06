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
- **Tách biệt Assertions & Không đặt test.step trong Page Class (BẮT BUỘC):**
  - Page Class chỉ chứa selector và UI interactions (Click, Fill, Navigate, Getters).
  - Mọi `expect()` khẳng định nghiệp vụ BẮT BUỘC nằm trong file `.spec.ts`.
  - **TUYỆT ĐỐI CẤM đặt `test.step` trong Page Object class**: Việc bọc `test.step` trong Page gây ra lỗi "nested step hell" (lồng 2-3 tầng vô nghĩa trên Allure), gây nhiễu song ngữ Anh-Việt và vi phạm nguyên lý Single Responsibility. Mọi `test.step` chỉ được khai báo ở tầng file test (`.spec.ts`).
- **Import bắt buộc:** Mọi file spec **BẮT BUỘC** import `{ test, expect }` từ `base.fixture` (dùng `../../../fixtures/base.fixture` hoặc `@fixtures/base.fixture`). CẤM import trực tiếp từ `@playwright/test`.
- **Báo cáo Allure & Gom nhóm Thao tác:**
  - Bọc mọi luồng action và assertion quan trọng trong `test.step('Mô tả hành vi bằng Tiếng Việt')`.
  - **Gom nhóm Tìm kiếm & Đợi kết quả (Unified Search Step)**: Trong các kịch bản tìm kiếm, BẮT BUỘC gom `await homePage.search(keyword);` và `await searchResultPage.waitForResultDisplay();` vào chung **1 `test.step` duy nhất** (vd: `await test.step('Tìm kiếm từ khóa "..." và đợi kết quả hiển thị', async () => { ... });`), không tách rời hai thao tác này.

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
- **Đánh số Test Case ID & Loại bỏ hoàn toàn Tags trong Tiêu đề (No Tags in Test Titles - BẮT BUỘC):**
  - Format: `TC-[MODULE]-[ROLE]-[001]: Mô tả kịch bản ngắn gọn` tăng dần liên tục (`001`, `002`, `003`...). CẤM nhảy cóc số lộn xộn.
  - **TUYỆT ĐỐI CẤM gắn tag (`@smoke`, `@regression`, `@guest`, `@free-user`, `@premium`, `@creator`, `@mobile`...) vào tiêu đề test** (`test('TC-... @tag', ...)`). Tiêu đề phải sạch sẽ, tinh gọn để Allure Report trực quan, chuyên nghiệp.
  - **Không dùng `allure.tag('ui')` hoặc lặp lại parameter môi trường**: Các thông số Base URL, Environment đã được ghi tự động qua `global-setup.ts` vào file `environment.properties`.
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
| **Code lệch pha giữa các Role (Cross-Role Drift)** | Cùng test case nghiệp vụ UI chung nhưng Guest/Free/Premium code khác biến, khác keyword, khác step | Bắt buộc tuân thủ Quy chuẩn Đồng bộ hóa Đa vai trò (Mục 6) |
| **Dead Parameter (`testInfo` thừa)** | Khai báo `testInfo` trong hàm test nhưng không gọi `captureEvidenceWithUrl` | Xóa bỏ `testInfo` hoặc bổ sung chụp evidence tương ứng |
| **Đặt tên Screenshot có khoảng trắng** | Đặt `Filter 縦長` gây lỗi URL encoding `%20` trên Allure report | Bắt buộc dùng kebab-case có gạch nối (`Filter-縦長`) |
| **Đặt `test.step` trong Page Object class** | Gây lồng step 2-3 tầng vô nghĩa trên Allure, nhiễu song ngữ Anh-Việt, vi phạm SRP | Chỉ đặt UI actions/getters trong Page; toàn bộ `test.step` nằm ở file `.spec.ts` |
| **Gắn Tag (`@smoke`, `@role`...) vào tiêu đề test** | Làm rối tiêu đề trên Allure UI, trùng lặp với cấu trúc phân mục thư mục/role | Xóa sạch tag khỏi tiêu đề test, dùng `TC-[MODULE]-[ROLE]-[001]: Mô tả` |
| **Tách rời Search và waitForResultDisplay** | Khiến báo cáo Allure bị phân mảnh giữa bước nhập input và bước chờ kết quả | Bắt buộc gom `homePage.search()` và `searchResultPage.waitForResultDisplay()` vào chung 1 `test.step` |

---

## 6. Quy Chuẩn Đồng Bộ Hóa Đa Vai Trò (Cross-Role Parity Protocol - BẮT BUỘC)

Áp dụng bắt buộc cho các module kiểm thử đa vai trò (Multi-Role Specs như `downloader/guest/`, `downloader/free-user/`, `downloader/premium/`):

### 6.1 Phân Định Rạch Ròi 2 Nhóm Test Cases
1. **Nhóm Luồng Chức Năng Chung (Common Functional Flows)**:
   - Các test case kiểm thử tính năng UI chung (nhập từ khóa, AND search, bộ lọc Toolbar: chiều ảnh, PSD, kích thước, màu sắc, danh mục, số người mẫu, loại trừ AI, khớp chính xác, photo ID, tải ảnh tìm tương đồng, phân trang mặc định, sticky header search, related images...).
   - **BẮT BUỘC ĐỒNG BỘ 100% (IDENTICAL)** giữa các role về 7 yếu tố:
     - **Tên biến (Variable Naming)**: Thống nhất hoàn toàn (`keyword`, `initialKeyword`, `newKeyword`, `creatorName`, `excludeKeyword`, `excludeCreatorName`, `photoId`, `count`, `countPage1`...). Tuyệt đối cấm role này dùng `baseKeyword` role kia dùng `keyword`, hoặc `targetPhotoId` vs `photoId`.
     - **Bộ từ khóa dữ liệu (Unified Test Keywords)**: Dùng chung 1 bộ từ khóa chuẩn (`学生`, `猫`, `flower`, `sky`, `ビジネス`, `オフィス`...). Tuyệt đối cấm file này dùng tiếng Anh (`cat`, `landscape`), file kia dùng tiếng Nhật (`猫`, `桜`).
     - **Cấu trúc `test.step`**: Số lượng step, thứ tự step và nội dung step description phải giống nhau 100%. Không gắn tên role vào step description chung (CẤM viết: `Verify kết quả cho Free User` hay `...cho Premium User`).
     - **Khẳng định kết quả (`expect`) & Web-First Waiting**: Dùng chung các matchers và custom error message. Luôn có Web-First assertion (`resultHeading.toBeVisible()`, `resultItems.first().toBeVisible()`) trước khi đếm kết quả.
     - **Tên bằng chứng kiểm thử (`captureEvidenceWithUrl`)**: Bắt buộc dùng định dạng kebab-case chuẩn: `Filter-縦長`, `Filter-2人`, `Filter-ModelRelease`, `Sort-新着順`, `Default-70-items-p1`. Tuyệt đối cấm dùng khoảng trắng (`Filter 縦長`).
     - **Thời gian chờ (Timeout Synchronization)**: Bổ sung `test.setTimeout(90_000)` hoặc `120_000` đồng bộ cho cả 3 role ở các case chạy nhiều filter, phân trang hoặc tương tác phức tạp. Không bỏ quên Guest.
     - **Làm sạch tham số**: Không truyền `testInfo` nếu test không chụp ảnh.
2. **Nhóm Luồng Phân Hóa Phân Quyền (Role-Based Divergent Flows)**:
   - Chỉ được phép khác nhau ở các điểm nghiệp vụ phân quyền cốt lõi:
     - **Feature Gate (Sắp xếp theo độ phổ biến)**: Guest/Free bị chặn (hiển thị Popover nâng cấp); Premium cho phép (`srt=recent_popular`).
     - **Hạn mức tìm kiếm & AI Toggle**: Guest có CTA đăng ký nhận điểm + tooltip login, popup Semantic AI tự bật màu vàng; Free User ẩn CTA đăng ký, hiện nút coupon; Premium vô hạn lượt tìm kiếm và có toggle AI chủ động trên TopPage.
     - **Tùy chọn hiển thị 210 ảnh/trang**: Độc quyền trên Premium User (`pp=210`).
     - **Click ảnh trong kết quả**: Guest mở Quickview đòi login/signup; Free User chuyển hướng sang trang chi tiết (`/main/detail/{id}`); Premium mở Quickview có các nút tải nhanh S/M/L.
   - Các luồng này dù logic nghiệp vụ khác nhau nhưng văn phong `test.step`, tên biến (`popoverText`, `count`), và format evidence (`Sort-Popular-Popover-Blocked`, `Sort-Popular-Success`) vẫn phải tuân thủ chuẩn chung.

---

## 7. Tài Liệu Chuyên Biệt Tham Chiếu Nhanh

- **Hướng dẫn sử dụng Tiện ích dùng chung (PDF, Fake Mail, Gmail API, Helpers)** ➔ Xem [`.agent/rules/utilities_guide.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/utilities_guide.md).
- **Đặc tả tính năng & Ma trận hành vi 2 site (Search, Download, Creator, Auth)** ➔ Xem [`.agent/rules/features/README.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/README.md).
- **Quy chuẩn Code Review & Quản trị file dùng chung (Zero Regression)** ➔ Xem `code_review_rules.md`.
