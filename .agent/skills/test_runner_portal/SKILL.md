---
name: Local Test Portal Manager
description: Skill quan ly, van hanh, tuy bien va mo rong Local Test Portal cho team QA va non-tech members — bao gom Playwright runner UI, SSE realtime events, Allure report auto-generation, va 1-click cross-platform launchers.
---

# Local Test Portal Manager

## Mô Tả

Skill chuyên biệt giúp QA Automation Lead và kỹ sư kiểm thử vận hành, duy trì và mở rộng hệ thống **Local Test Portal** trong dự án Playwright TypeScript. 

Portal cho phép toàn bộ thành viên trong nhóm (Manual QA, Product Owner, BA) thực thi automation test mà không cần kiến thức lập trình hay thao tác dòng lệnh.

## Cấu Trúc Thành Phần Test Portal

```
dashboard/
├── server.js               # Node.js Server (REST API, SSE streaming, Static file server, Process manager)
├── reporter.js             # Playwright Custom Reporter truyen event stdout __TEST_EVENT__
└── public/
    └── index.html          # Web UI Dashboard (Dieu khien, Realtime progress, Report viewer)
Run-Test-App.bat            # 1-Click Launcher cho Windows
Run-Test-App.command        # 1-Click Launcher cho macOS / iMac
Setup-Lan-Dau.bat           # 1-Click Cai dat moi truong & browsers cho Windows
Setup-Lan-Dau.command       # 1-Click Cai dat moi truong & browsers cho macOS
Update-Tests.bat            # 1-Click Dong bo testcase moi tu Git cho Windows
Update-Tests.command        # 1-Click Dong bo testcase moi tu Git cho macOS
HUONG-DAN-SU-DUNG.md        # Tai lieu huong dan 3 buoc cho team non-tech
```

---

## Các Tính Năng Cốt Lõi

1. **Điều khiển linh hoạt:**
   - Chọn Trình duyệt / Role (`chromium-downloader`, `chromium-creator`, `firefox-downloader`, v.v.).
   - Chọn Chế độ: `Headed` (hiện trình duyệt để quan sát) hoặc `Headless` (chạy ngầm).
   - Chọn Phạm vi: Toàn bộ suite, từng file spec riêng lẻ, hoặc lọc theo tag `@smoke`, `@regression`.
   - Chọn số lượng worker (song song hoặc tuần tự).

2. **Giám sát Realtime (SSE - Server-Sent Events):**
   - Đếm số lượng testcase: Total, Passed, Failed, Skipped.
   - Hiển thị thanh tiến trình (%) và danh sách chi tiết từng testcase đang chạy / hoàn thành kèm thời gian thực thi (duration).
   - Live console log stream từ stdout.

3. **Báo Cáo Tự Động (Allure & Playwright HTML):**
   - Tự động gọi Allure CLI biên dịch báo cáo ngay khi suite kết thúc.
   - Host trực tiếp tại `http://localhost:4000/allure-report` (không cần chạy `allure open` riêng).
   - Cảnh báo trạng thái Java và hỗ trợ tải Java nếu máy chưa có.

---

## Hướng Dẫn Vận Hành & Tùy Biến

### 1. Thêm Dự Án Hoặc Trình Duyệt Mới
Khi thêm project mới vào `playwright.config.ts`, cập nhật danh sách project trong `dashboard/server.js` hoặc cấu hình động để UI tự nhận diện.

### 2. Thêm Tùy Chọn Lọc Tags
Tại `dashboard/public/index.html`, thêm các tùy chọn vào dropdown tag (ví dụ: `@payment`, `@auth`, `@profile`). Lệnh Playwright sẽ tự động thêm flag `--grep <tag>`.

### 3. Xử Lý Khắc Phục Sự Cố (Troubleshooting)
- **Lỗi thiếu Java khi tạo Allure:**
  - Windows: Chạy `winget install EclipseAdoptium.Temurin.17.JRE -e`
  - macOS: Chạy `brew install openjdk@17`
- **Lỗi cổng 4000 bị chiếm dụng:**
  - Thay đổi biến `PORT` trong `dashboard/server.js` (hoặc đặt biến môi trường `PORT=4001`).
- **Lỗi tiến trình browser không tắt khi dừng giữa chừng:**
  - Hàm `stopRun()` trong `dashboard/server.js` sử dụng `taskkill /pid <pid> /T /F` trên Windows và `pkill` trên macOS để dọn dẹp triệt để.
