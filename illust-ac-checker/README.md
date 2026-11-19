# 🎨 Illust-AC URL Status Verifier (CLI Tool)

Tool độc lập kiểm tra trạng thái **HTTP Status 200** cho toàn bộ các link Illust-AC (tương tự như `video-ac-checker` và `ErrorScan.app`).

---

## 🚀 2 Môi Trường Kiểm Tra (Environment Options)

Hệ thống cung cấp **2 Lựa chọn môi trường**:

| Option | Môi trường | Base URL | HTTP Basic Auth | Tài khoản Downloader | Tài khoản Creator |
|:---:|:---|:---|:---|:---|:---|
| **`[1]`** | **Production** | `https://www.ac-illust.com` | Không | `phihoang12b2@gmail.com` | `phi.qtmax@gmail.com` |
| **`[2]`** | **Site Test** | **Nhập URL test tùy ý**<br>*(Mặc định: `https://test-giang.ac-illust.com`)* | Tự động chèn (`acworks` / `acworks!@#`) | `acworks.toannguyen1@gmail.com` | `acworks.toannguyen1@gmail.com` |

*(Lưu ý: Tool tự động nhận diện thông tin tài khoản trong file `illust-ac/.env` nếu có).*

---

## ⚡ Quy Trình Thực Hiện (Luôn Quét Toàn Bộ 42 URLs)

Khi bạn chọn **1** hoặc **2**, hệ thống sẽ **tự động chạy xuyên suốt toàn bộ 42 URLs** qua 3 giai đoạn:

1. **Giai đoạn 1 (Public - 11 URLs):** Kiểm tra các trang công khai dành cho khách vãng lai (Trang chủ, tìm kiếm từ khóa, chi tiết tranh, rankings, related, quickview...).
2. **Giai đoạn 2 (Creator - 20 URLs):** Tự động mở trình duyệt và đăng nhập tài khoản Creator ➔ Kiểm tra 20 trang quản trị (`dashboard.php`, `upload_lst.php`, `theme.php`, `tag_manage.php`, `comments.php`, `followers.php`, `ranking.php`, `identity.php`, `exchange.php`...).
3. **Giai đoạn 3 (Downloader - 11 URLs):** Mở session mới và tự động đăng nhập Downloader ➔ Kiểm tra 11 trang người dùng (`/user/`, `profile.php`, `bookmarks.php`, `downloads.php`, `order_history.php`, `receipts.php`...).
4. **Tổng kết Scorecard:** In bảng tổng kết tỷ lệ 200 OK, thống kê mã lỗi (3xx, 4xx, 5xx, timeout), danh sách link lỗi nếu có, và tổng thời gian chạy.

---

## 📋 Danh Sách 42 URLs Kiểm Tra Chi Tiết

### 1. Nhóm Public (11 URLs)
- `/` — Trang chủ (Home Page)
- `/main/search_result.php?word_id=1&word=%E8%83%8C%E6%99%AF&srt=dlrank&utm_source=top_keyword` — Tìm kiếm từ khóa (背景 - dlrank)
- `/main/profile.php?id=acworks&area=1` — Trang Profile tác giả (acworks)
- `/main/detail.php?id=22687650` — Chi tiết tranh minh họa (Detail ID 22687650)
- `/main/ranking.php` — Bảng xếp hạng tải về (Download Ranking)
- `/main/illustrator_ranking.php` — Bảng xếp hạng họa sĩ (Illustrator Ranking)
- `/main/latest.php` — Tranh minh họa mới nhất (Latest)
- `/main/ranking_prize.php` — Xếp hạng giải thưởng (Ranking Prize)
- `/main/related.php?id=1416439` — Tranh liên quan (Related ID 1416439)
- `/main/ranking_keywords.php` — Từ khóa phổ biến (Ranking Keywords)
- `/main/quick_view.php?id=427668` — Xem nhanh minh họa Quickview (ID 427668)

### 2. Nhóm Creator (20 URLs)
- `/creator/dashboard.php` — Dashboard tổng quan
- `/creator/upload_lst.php` — Danh sách tác phẩm đã tải lên
- `/creator/theme.php` — Chủ đề / Yêu cầu vẽ minh họa
- `/creator/tag_manage.php` — Quản lý thẻ tag
- `/creator/comments.php` — Quản lý bình luận của người dùng
- `/creator/followers.php` — Danh sách người theo dõi
- `/creator/following.php` — Danh sách đang theo dõi
- `/creator/advertising.php` — Quảng cáo & Khuyến mãi
- `/creator/mtrequests.php` — Yêu cầu tư liệu (Material Requests)
- `/creator/ranking.php` — Bảng xếp hạng đóng góp Creator
- `/creator/account.php` — Cài đặt tài khoản Creator
- `/creator/profile.php` — Chỉnh sửa hồ sơ Creator
- `/creator/imports.php` — Nhập tác phẩm hàng loạt
- `/creator/bitcoin_address.php` — Địa chỉ nhận thưởng Bitcoin
- `/creator/identity.php` — Xác minh danh tính
- `/creator/bank_info/index.php` — Thông tin tài khoản ngân hàng
- `/creator/exchange.php` — Đổi điểm thưởng (Points Exchange)
- `/creator/extra_licence.php` — Quản lý giấy phép mở rộng
- `/creator/associate.php` — Chương trình liên kết
- `/creator/account/leave.php` — Hủy / Rời tài khoản Creator

### 3. Nhóm Downloader (11 URLs)
- `/user/` — Trang cá nhân Downloader (Mypage)
- `/user/profile.php` — Chỉnh sửa hồ sơ Downloader
- `/user/bookmarks.php` — Tác phẩm đã đánh dấu (Bookmarks)
- `/user/downloads.php` — Lịch sử tải xuống (Downloads)
- `/user/order_history.php` — Lịch sử giao dịch (Order History)
- `/user/comments.php` — Bình luận đã gửi (Comments)
- `/user/fans.php` — Danh sách họa sĩ yêu thích (Fans)
- `/user/illust_requests.php` — Yêu cầu minh họa đã gửi
- `/user/receipts.php` — Tải biên lai / Hóa đơn điện tử (Receipts)
- `/user/presents.php` — Quà tặng nhận được (Presents)
- `/user/mailmaga.php` — Cài đặt bản tin Mail Magazine

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
  [1] Production (https://www.ac-illust.com)
  [2] Site Test  (Tự do nhập URL test: test-giang, test-xxx...)
  ```
- Nhập `1` hoặc `2`, hệ thống lập tức tự động chạy toàn bộ 42 URLs!

---

### Cách 2: Chạy trực tiếp qua Terminal CLI

Mở thư mục `illust-ac-checker` trong terminal:

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
node check-urls.js 2 https://test-giang.ac-illust.com

# Tùy chọn mở cửa sổ Chrome xem thao tác (Headed Mode):
node check-urls.js 1 --headed
```

---

## 📊 Báo Cáo Kết Quả (Scorecard Console)

Sau khi hoàn thành, hệ thống in bảng Scorecard trực quan:
- **Tỷ lệ đạt chuẩn 200 OK** (X/42 URLs - Y%).
- **Thống kê chi tiết**: Chuyển hướng (3xx), Lỗi Client (4xx), Lỗi Server (5xx), Timeout/Network Error.
- **Danh sách link lỗi**: Tự động liệt kê URL và mô tả trang lỗi để đội ngũ Dev/QA dễ dàng kiểm tra.
- **Tổng thời gian thực thi**.
