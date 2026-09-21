# Quy Tắc Thiết Kế và Quản Lý Local Test Portal (Playwright Runner)

Áp dụng cho toàn bộ kiến trúc Local Test Portal / Dashboard runner phục vụ thành viên non-tech và manual QA trong team.

## 1. Nguyên Tắc Cốt Lõi: Zero Breaking Changes

- **Không can thiệp logic test:** Local Test Portal chỉ là một tầng điều khiển (orchestration layer) bên ngoài. TUYỆT ĐỐI KHÔNG sửa đổi hành vi, cấu trúc hoặc logic của:
  - Page Objects (`src/pages/**`)
  - Fixtures (`src/fixtures/**`)
  - Test Specs (`src/tests/**`)
  - Test Data (`src/utils/test-data.ts`, JSON test data)
  - Config gốc (`playwright.config.ts`)
- **Độc lập CLI:** Mọi câu lệnh CLI hiện có (`npm test`, `npm run test:chromium`, `npx playwright test`) phải luôn hoạt động 100% bình thường kể cả khi không dùng Dashboard.

## 2. Tương Thích Đa Nền Tảng (Cross-Platform Compatibility)

- Bắt buộc hỗ trợ song song và tương đương tính năng trên cả **Windows** và **macOS (iMac / MacBook)**.
- **Xử lý đường dẫn (Paths):** Luôn dùng `path.join()`, `path.resolve()` hoặc chuẩn hóa `/` (POSIX). Không bao giờ hardcode dấu gạch chéo `\` của Windows trong logic chung.
- **Lệnh mở trình duyệt:** Sử dụng lệnh tương ứng theo hệ điều hành:
  - Windows: `start`
  - macOS: `open`
  - Linux: `xdg-open`
- **Launcher Scripts:** Cung cấp 2 file launcher tương ứng:
  - Windows: `Run-Test-App.bat`
  - macOS: `Run-Test-App.command`

## 3. Tự Động Hóa Môi Trường & Allure Dependency

- Tích hợp `allure-commandline` vào `devDependencies` để người dùng không cần cài đặt Allure CLI thủ công qua package manager của hệ điều hành.
- Thứ tự tìm kiếm Allure binary trong code server:
  1. `node_modules/.bin/allure` (ưu tiên cao nhất - có sẵn trong project)
  2. `npx allure-commandline`
  3. Lệnh toàn cục `allure`
- Kiểm tra trạng thái Java Runtime (`java -version`):
  - Hiển thị thông báo trạng thái rõ ràng trên UI nếu máy chưa có Java.
  - Cung cấp cơ chế auto-install qua `winget` (Windows) hoặc `brew` (macOS), hoặc đường link 1-click tải bản cài đặt.
  - Fallback an toàn: Luôn cho phép xem Playwright HTML Report (`/playwright-report`) nếu Allure chưa thể sinh do thiếu Java.

## 4. An Toàn Quản Lý Tiến Trình (Process Lifecycle & Zombie Prevention)

- **Khi chạy test:** Quản lý `ChildProcess` bằng PID cụ thể.
- **Khi dừng test (Stop):** Bắt buộc kill toàn bộ cây tiến trình (process tree) bao gồm process Playwright runner và các instance trình duyệt con (Chromium, Firefox) để tránh rò rỉ RAM (zombie process).
  - Windows: `taskkill /pid <PID> /T /F`
  - macOS / Linux: `kill -TERM -<PID>` hoặc kill tree bằng `pkill`.

## 5. Bắt Event và Truyền Dữ Liệu Realtime

- Dùng Custom Playwright Reporter (`dashboard/reporter.js`) in các chuỗi chuẩn hóa `__TEST_EVENT__{...}` ra stdout.
- Server bắt stdout stream, parse event và phát sóng qua **Server-Sent Events (SSE)** hoặc WebSocket tới UI.
- Không tạo kết nối mạng phức tạp giữa Reporter và Server để tránh lỗi firewall hoặc xung đột cổng (port collision).
