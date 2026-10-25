# 🎥 Video-AC URL Status Verifier (CLI Tool)

Tool độc lập kiểm tra trạng thái **HTTP Status 200** cho các link Video-AC (theo danh sách Google Sheet tab **VideoAC**).
---

## 🚀 2 Option Kiểm Tra

Hệ thống cung cấp đúng **2 Option**:

| Option | Môi trường | Base URL | Tài khoản Downloader | Tài khoản Creator |
|:---:|:---|:---|:---|:---|
| **`[1]`** | **Production** | `https://video-ac.com` (cố định) | `phihoang12b2@gmail.com` | `khanhnguyen3984610275+999@gmail.com` |
| **`[2]`** | **Site Test** | **Người dùng tự do nhập URL test**<br>*(Ví dụ: `https://test-lien.video-ac.com`, `https://test-xxx.video-ac.com`, hoặc `https://test.video-ac.com`)* | `phihoang12b2@gmail.com` | `a.cwork.s.toannguyen.1@gmail.com` |

---

## 📋 Quy Trình Thực Hiện Tự Động Khi Chạy

Khi bạn chọn **1** hoặc **2**:
1. **Bước 1 (Downloader):** Hệ thống tự động mở trình duyệt và đăng nhập tài khoản Downloader tương ứng ➔ Truy cập và in mã status trả về cho **12 URLs Downloader**.
2. **Bước 2 (Creator):** Hệ thống mở session mới và tự động đăng nhập tài khoản Creator tương ứng ➔ Truy cập và in mã status trả về cho **18 URLs Creator**.
3. **Bước 3 (Tổng kết):** In bảng tổng kết Scorecard trực tiếp ra màn hình Console:
   - Tổng số URLs đã kiểm tra (30 URLs)
   - Số lượng & Tỷ lệ % đạt chuẩn HTTP 200 OK
   - Số lượng chuyển hướng (3xx), lỗi Client (4xx), lỗi Server (5xx)
   - Tổng thời gian thực thi

---

## 🛠 Hướng Dẫn Cài Đặt Cho Thành Viên Mới (Lần đầu tiên)

1. **Yêu cầu máy tính:** Cài đặt sẵn [Node.js](https://nodejs.org/) (khuyên dùng bản LTS).
2. **Cài đặt môi trường:** Click đúp vào file **`setup.bat`** (Windows) hoặc chạy `./setup.sh` (Mac/Linux).
   - Tool sẽ tự động tải thư viện Playwright và trình duyệt Chromium cần thiết (~1-2 phút).
   - Chỉ cần chạy bước này **1 lần duy nhất**.

---

## 💻 Cách Chạy Hàng Ngày

### Cách 1: Click đúp vào file `run.bat` (Windows - Nhanh nhất)
1. Click đúp vào file **`run.bat`**.
2. Màn hình console hiện ra 2 lựa chọn:
   ```text
   [1] Production (https://video-ac.com)
   [2] Site Test  (Nhap URL test tuy y, vd: test-lien, test-xxx...)
   ```
3. Nhập `1` (để chạy Prod) hoặc `2` (để nhập URL site test mong muốn).
4. Nếu chọn `2`, bạn chỉ cần gõ hoặc paste URL site test (hoặc bấm Enter để dùng mặc định `https://test.video-ac.com`).

---

### Cách 2: Chạy Bằng Lệnh Terminal
Mở thư mục `video-ac-checker` trong terminal:

```bash
# Chạy với menu hỏi lựa chọn:
node check-urls.js

# Chạy thẳng Option 1 (Production):
node check-urls.js 1
npm run prod

# Chạy Option 2 (Site Test) với URL test cụ thể:
node check-urls.js 2 https://test.video-ac.com

# Tùy chọn mở cửa sổ Chrome xem thao tác:
node check-urls.js 1 --headed
```
