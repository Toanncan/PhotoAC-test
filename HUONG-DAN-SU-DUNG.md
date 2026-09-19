# 📖 Hướng Dẫn Sử Dụng Test Automation Dành Cho Team

Dành cho Manual QA, PM, BA và các thành viên trong nhóm muốn chạy test automation mà **không cần biết lập trình hay gõ lệnh**.

---

## 🚀 3 Bước Đơn Giản Để Sử Dụng

### 1️⃣ Bước 1: Chuẩn bị lần đầu tiên (Chỉ làm 1 lần duy nhất)
Sau khi tải thư mục hoặc giải nén file code về máy:
- **Trên Windows:** Click đúp vào file `Setup-Lan-Dau.bat`.
- **Trên Mac (iMac/MacBook):** Click đúp vào file `Setup-Lan-Dau.command`.
> *Script sẽ tự động cài đặt trình duyệt và mọi thứ cần thiết cho bạn.*

---

### 2️⃣ Bước 2: Chạy Test hàng ngày
Bất cứ khi nào bạn muốn kiểm thử:
- **Trên Windows:** Click đúp vào file `Run-Test-App.bat`.
- **Trên Mac:** Click đúp vào file `Run-Test-App.command`.

Trình duyệt sẽ tự động mở trang web điều khiển:
1. **Chọn Trình duyệt:** Chrome (Downloader/Creator) hoặc Firefox.
2. **Chọn Chế độ:** 
   - `Mở Trình Duyệt`: Để xem robot tự động bấm trên màn hình.
   - `Chạy Ngầm`: Để test chạy ẩn bên dưới, không làm phiền bạn làm việc khác.
3. **Bấm [▶ BẮT ĐẦU CHẠY TEST]**:
   - Theo dõi tiến trình trực tiếp: Test nào Pass (xanh), Test nào Fail (đỏ).
   - Khi chạy xong, hệ thống sẽ **tự động mở tab Báo Cáo Allure** chi tiết cho bạn!

---

### 3️⃣ Bước 3: Cập nhật khi có Testcase mới
Khi Automation Engineer thông báo có kịch bản test mới được thêm vào:
- **Trên Windows:** Click đúp vào file `Update-Tests.bat`.
- **Trên Mac:** Click đúp vào file `Update-Tests.command`.
> *Hệ thống sẽ tự động đồng bộ mã nguồn mới nhất về máy bạn trong 5 giây!*

---

## ❓ Câu Hỏi Thường Gặp (FAQ)

- **Q: Tôi có cần cài VS Code hay mở terminal không?**
  👉 *Không. Bạn chỉ cần thao tác bằng chuột trên giao diện web.*
- **Q: Báo cáo Allure có xem lại được không?**
  👉 *Có. Ngay góc trên bên phải màn hình có nút "📊 Allure Report" để bạn mở lại bất cứ lúc nào.*
- **Q: Nếu test bị treo hoặc muốn dừng giữa chừng?**
  👉 *Bấm vào nút màu đỏ "[⏹ DỪNG TIẾN TRÌNH TEST]" trên màn hình là xong.*
