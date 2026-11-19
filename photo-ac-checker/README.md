# 📷 Photo-AC URL Status Verifier (CLI Tool)

Tool độc lập kiểm tra trạng thái **HTTP Status 200** cho toàn bộ các link Photo-AC (tương tự như `illust-ac-checker`, `video-ac-checker` và `ErrorScan.app`).

---

## 🚀 2 Môi Trường Kiểm Tra (Environment Options)

Hệ thống cung cấp **2 Lựa chọn môi trường**:

| Option | Môi trường | Base URL | HTTP Basic Auth | Tài khoản Downloader | Tài khoản Creator |
|:---:|:---|:---|:---|:---|:---|
| **`[1]`** | **Production** | `https://www.photo-ac.com` | Không | `phihoang12b2@gmail.com` | `phi.qtmax@gmail.com` |
| **`[2]`** | **Site Test** | **Nhập URL test tùy ý**<br>*(Mặc định: `https://test-toan.photo-ac.com`)* | Tự động chèn (`acworks` / `acworks!@#`) | `acworks.toannguyen1@gmail.com` | `acworks.toannguyen1@gmail.com` |

*(Lưu ý: Tool tự động nhận diện thông tin tài khoản trong file `photo-ac/.env` nếu có).*

---

## ⚡ Quy Trình Thực Hiện (Luôn Quét Toàn Bộ 46 URLs)

Khi bạn chọn **1** hoặc **2**, hệ thống sẽ **tự động chạy xuyên suốt toàn bộ 46 URLs** qua 3 giai đoạn:

1. **Giai đoạn 1 (Public - 14 URLs):** Kiểm tra các trang công khai dành cho khách vãng lai (Trang chủ, chi tiết ảnh, tìm kiếm từ khóa `桜`, profile, rankings, models, pickup, latest, genface, image generator, campaign, business...).
2. **Giai đoạn 2 (Creator - 21 URLs):** Tự động mở trình duyệt và đăng nhập tài khoản Creator ➔ Kiểm tra 21 trang quản trị (`dashboard`, `list`, `theme`, `modelreleases`, `propertyreleases`, `comments`, `followers`, `ranking`, `bitcoin`, `identity`, `exchange`, `extralicence`, `associate`...).
3. **Giai đoạn 3 (Downloader - 11 URLs):** Mở session mới và tự động đăng nhập Downloader ➔ Kiểm tra 11 trang người dùng (`/user/dashboard`, `profile/edit`, `bookmarks`, `downloads`, `order/history`, `following`, `receipts`, `present`, `creditcard`, `mailmaga`...).
4. **Tổng kết Scorecard:** In bảng tổng kết tỷ lệ 200 OK, thống kê mã lỗi (3xx, 4xx, 5xx, timeout), danh sách link lỗi nếu có, và tổng thời gian chạy.

---

## 📋 Danh Sách 46 URLs Kiểm Tra Chi Tiết

### 1. Nhóm Public (14 URLs)
- `/` — Trang chủ (Home Page)
- `/main/detail/31413996?title=リビングでストレッチをする女性` — Chi tiết ảnh (Detail ID 31413996)
- `/main/search?q=桜&utm_source=top_keyword` — Tìm kiếm từ khóa (桜)
- `/profile/23801261` — Hồ sơ tác giả (Profile 23801261)
- `/ranking` — Bảng xếp hạng ảnh tải về (Ranking)
- `/models/` — Danh sách người mẫu (Models)
- `/pickup/1` — Bộ sưu tập nổi bật (Pickup 1)
- `/main/latest` — Ảnh mới nhất (Latest Photos)
- `/main/genface` — Tạo khuôn mặt AI (Genface)
- `/image-generator/` — Trình tạo ảnh AI (Image Generator)
- `/creator/auth/register` — Đăng ký tác giả (Creator Register)
- `/ranking/prize` — Xếp hạng giải thưởng (Ranking Prize)
- `/premium/campaign?target=premium_sozai` — Chiến dịch Premium (Campaign)
- `/premium/business` — Gói Doanh nghiệp (Business Plan)

### 2. Nhóm Creator (21 URLs)
- `/creator/dashboard` — Bảng điều khiển Creator (Dashboard)
- `/creator/list` — Danh sách ảnh đã tải lên (Photo List)
- `/creator/theme` — Chủ đề / Yêu cầu chụp ảnh (Themes)
- `/creator/account/modelreleases` — Giấy phát hành người mẫu (Model Releases)
- `/creator/account/propertyreleases` — Giấy phát hành tài sản (Property Releases)
- `/creator/comments` — Quản lý bình luận của người dùng (Comments)
- `/creator/followers` — Danh sách người theo dõi (Followers)
- `/creator/following` — Danh sách đang theo dõi (Following)
- `/creator/advertising` — Quảng cáo & Khuyến mãi (Advertising)
- `/creator/mtrequests` — Yêu cầu tư liệu (Material Requests)
- `/creator/ranking` — Bảng xếp hạng đóng góp Creator
- `/creator/account/edit` — Cài đặt tài khoản Creator (Account Edit)
- `/creator/profile/edit` — Chỉnh sửa hồ sơ Creator (Profile Edit)
- `/creator/import` — Nhập ảnh hàng loạt (Batch Import)
- `/creator/bitcoin` — Địa chỉ nhận thưởng Bitcoin
- `/creator/account/identity/` — Xác minh danh tính (Identity Verification)
- `/creator/bankinfo/index/` — Thông tin tài khoản ngân hàng (Bank Info)
- `/creator/account/leave` — Rời / Hủy tài khoản Creator
- `/creator/exchange` — Đổi điểm thưởng (Points Exchange)
- `/creator/extralicence` — Giấy phép mở rộng (Extra License)
- `/creator/associate/setting` — Cài đặt liên kết (Associate / Affiliate)

### 3. Nhóm Downloader (11 URLs)
- `/user/dashboard` — Trang tổng quan cá nhân (User Dashboard)
- `/user/profile/edit` — Chỉnh sửa hồ sơ cá nhân (Profile Edit)
- `/user/bookmarks` — Ảnh đã đánh dấu yêu thích (Bookmarks)
- `/user/downloads` — Lịch sử tải xuống (Downloads History)
- `/user/order/history` — Lịch sử đơn hàng / Giao dịch (Order History)
- `/user/comments` — Lịch sử bình luận đã gửi (Comments)
- `/user/following` — Danh sách tác giả đang theo dõi (Following)
- `/user/receipts` — Tải biên lai / Hóa đơn điện tử (Receipts)
- `/user/present` — Quà tặng nhận được (Present)
- `/user/creditcard` — Quản lý thẻ tín dụng (Credit Card)
- `/user/mailmaga` — Cài đặt bản tin Mail Magazine

---

## 🛠 Hướng Dẫn Cài Đặt (Chỉ cần làm 1 lần)

1. Yêu cầu: Đã cài đặt [Node.js](https://nodejs.org/) (khuyên dùng bản LTS).
2. Chạy file cài đặt:
   - **Windows**: Click đúp vào `setup.bat`.
   - **macOS**: Click đúp vào `setup.command` hoặc chạy `./setup.sh` trong terminal.

---

## 💻 Cách Chạy Kiểm Tra Hàng Ngày

### Cách 1: 1-Click Launchers (Đơn giản nhất)
- **Windows**: Click đúp vào file **`run.bat`**.
- **macOS**: Click đúp vào file **`run.command`**.
- Màn hình chỉ hỏi bạn chọn:
  ```text
  [1] Production (https://www.photo-ac.com)
  [2] Site Test  (Tự do nhập URL test: test-toan, test-lien...)
  ```
- Nhập `1` hoặc `2`, hệ thống lập tức tự động chạy toàn bộ 46 URLs!

---

### Cách 2: Chạy trực tiếp qua Terminal CLI

Mở thư mục `photo-ac-checker` trong terminal:

```bash
# Chạy với menu hỏi môi trường (1 hoặc 2):
node check-urls.js

# Chạy thẳng Option 1 (Production):
npm run prod
# hoặc:
node check-urls.js 1

# Chạy thẳng Option 2 (Site Test):
npm run test
# hoặc chỉ định URL site test cụ thể:
node check-urls.js 2 https://test-toan.photo-ac.com

# Tùy chọn mở cửa sổ Chrome xem thao tác (Headed Mode):
node check-urls.js 1 --headed
```

---

## 📊 Báo Cáo Kết Quả (Scorecard Console)

Sau khi hoàn thành, hệ thống in bảng Scorecard trực quan:
- **Tỷ lệ đạt chuẩn 200 OK** (X/46 URLs - Y%).
- **Thống kê chi tiết**: Chuyển hướng (3xx), Lỗi Client (4xx), Lỗi Server (5xx), Timeout/Network Error.
- **Danh sách link lỗi**: Tự động liệt kê URL và mô tả trang lỗi để đội ngũ Dev/QA dễ dàng kiểm tra.
- **Tổng thời gian thực thi**.
