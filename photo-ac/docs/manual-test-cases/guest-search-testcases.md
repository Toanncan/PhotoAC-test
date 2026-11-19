# BỘ TEST CASE MANUAL: TÌM KIẾM & BỘ LỌC — GUEST USER (PHOTO-AC)

> **Dự án**: Photo-AC (https://www.photo-ac.com/)  
> **Module**: Search & Filter (Tìm kiếm & Bộ lọc)  
> **Vai trò người dùng**: Guest User (Khách vãng lai - Chưa đăng nhập)  
> **Nguồn trích xuất từ Automation**: [`src/tests/downloader/guest/search.spec.ts`](file:///Users/imac/Desktop/PhotoAC-test/photo-ac/src/tests/downloader/guest/search.spec.ts)  
> **Tổng số kịch bản**: 38 Test Cases  
> **Tiêu chuẩn áp dụng**: ISTQB / AI-RBT / Allure Test Specification  

---

## 1. TỔNG QUAN & MA TRẬN PHÂN BỔ KIỂM THỬ

### 1.1 Thống kê theo mức độ ưu tiên (Priority)
| Mức độ ưu tiên | Ý nghĩa | Số lượng | Tỷ lệ |
|---|---|:---:|:---:|
| **P1 (Critical)** | Tính năng cốt lõi (Core Search, Filter chính, Feature Gate, Limit Modal, QuickView) | 16 | 42.1% |
| **P2 (High)** | Bộ lọc chi tiết, Tìm kiếm nâng cao, Phân trang, Phân loại phụ, Group Sites | 19 | 50.0% |
| **P3 (Medium/Low)** | Thao tác UI bổ trợ (Reset keyword, Sticky Header hide/show) | 3 | 7.9% |
| **Tổng cộng** | | **38** | **100%** |

### 1.2 Phân bổ theo nhóm chức năng
1. **Nhóm 1: Tìm kiếm cơ bản** (TC-001 ➔ TC-006): 6 Test Cases
2. **Nhóm 2: Bộ lọc đơn lẻ trên Toolbar** (TC-007 ➔ TC-017): 11 Test Cases
3. **Nhóm 3: Bộ lọc chi tiết (詳細検索) & Kết hợp** (TC-018 ➔ TC-023): 6 Test Cases
4. **Nhóm 4: Các phương thức tìm kiếm nâng cao** (TC-024 ➔ TC-028): 5 Test Cases
5. **Nhóm 5: Sắp xếp kết quả** (TC-029): 1 Test Case
6. **Nhóm 6: Phân quyền & Giới hạn theo Role** (TC-030, TC-032 ➔ TC-034): 4 Test Cases
7. **Nhóm 7: Phân trang & Tương tác giao diện** (TC-031, TC-035 ➔ TC-038): 5 Test Cases

---

## 2. BẢNG TỔNG HỢP DANH MỤC TEST CASES (TRACEABILITY MATRIX)

| Mã TC | Phân nhóm chức năng | Mức độ rủi ro | Tiêu đề kịch bản kiểm thử | Ưu tiên |
|---|---|:---:|---|:---:|
| **TC-SEARCH-GUEST-001** | Basic Search | 🔴 High | Tìm kiếm từ khóa hợp lệ hiển thị kết quả | **P1** |
| **TC-SEARCH-GUEST-002** | Basic Search | 🔴 High | Tìm kiếm nhiều từ khóa kết hợp (AND Search) | **P1** |
| **TC-SEARCH-GUEST-003** | Basic Search | 🟡 Medium | Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa | **P2** |
| **TC-SEARCH-GUEST-004** | Basic Search / UI | 🟢 Low | Xóa từ khóa bằng nút Reset và tìm kiếm mới | **P3** |
| **TC-SEARCH-GUEST-005** | Suggested Search | 🟡 Medium | Tìm kiếm bằng Top Keyword dưới thanh tìm kiếm | **P2** |
| **TC-SEARCH-GUEST-006** | Suggested Search | 🟡 Medium | Tìm kiếm bằng Popular Tag keyword | **P2** |
| **TC-SEARCH-GUEST-007** | Filter / Toolbar | 🔴 High | Lọc và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長) | **P1** |
| **TC-SEARCH-GUEST-008** | Filter / Toolbar | 🟡 Medium | Lọc định dạng ảnh PSD (sizesec=psd) | **P2** |
| **TC-SEARCH-GUEST-009** | Filter / Toolbar | 🟡 Medium | Lọc và chuyển đổi Kích thước ảnh (M / L) | **P2** |
| **TC-SEARCH-GUEST-010** | Filter / Toolbar | 🟡 Medium | Lọc ảnh theo Danh mục (人物 - People) | **P2** |
| **TC-SEARCH-GUEST-011** | Filter / Toolbar | 🟡 Medium | Lọc ảnh theo Màu sắc (青 / Blue) | **P2** |
| **TC-SEARCH-GUEST-012** | Filter / Toolbar | 🔴 High | Lọc và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) | **P1** |
| **TC-SEARCH-GUEST-013** | Filter / Toolbar | 🟡 Medium | Lọc người mẫu theo Độ tuổi (若者 - Young) | **P2** |
| **TC-SEARCH-GUEST-014** | Filter / Toolbar | 🔴 High | Lọc ảnh có Giấy phép người mẫu (Model Release 取得済のみ) | **P1** |
| **TC-SEARCH-GUEST-015** | Filter / Toolbar | 🟡 Medium | Lọc ảnh có Giấy phép tài sản (Property Release 取得済のみ) | **P2** |
| **TC-SEARCH-GUEST-016** | Filter / Toolbar | 🔴 High | Lọc loại trừ ảnh do AI tạo (AI生成を除く) | **P1** |
| **TC-SEARCH-GUEST-017** | Filter / Toolbar | 🟡 Medium | Lọc tìm kiếm khớp chính xác (完全一致) | **P2** |
| **TC-SEARCH-GUEST-018** | Detailed Filter | 🟡 Medium | Lọc theo Từ khóa loại trừ (除外キーワード) | **P2** |
| **TC-SEARCH-GUEST-019** | Detailed Filter | 🔴 High | Lọc ảnh theo Tác giả (Creator: Acworks) | **P2** |
| **TC-SEARCH-GUEST-020** | Detailed Filter | 🟡 Medium | Lọc ảnh loại trừ Tác giả (NG Creator: Acworks) | **P2** |
| **TC-SEARCH-GUEST-021** | Detailed Filter | 🔴 High | Lọc ảnh theo mã ID (Photo ID) | **P1** |
| **TC-SEARCH-GUEST-022** | Combined Filter | 🔴 High | Kết hợp từ khóa, 2 người mẫu và Model Release | **P1** |
| **TC-SEARCH-GUEST-023** | Combined Filter | 🔴 High | Kết hợp đa bộ lọc (Chiều ngang, Không người mẫu, Loại trừ AI) | **P1** |
| **TC-SEARCH-GUEST-024** | Advanced Search | 🔴 High | Tải ảnh lên tìm kiếm tương đồng (Reverse Image Search) | **P1** |
| **TC-SEARCH-GUEST-025** | Advanced Search | 🟡 Medium | Recommended Search (おすすめ) và phân trang | **P2** |
| **TC-SEARCH-GUEST-026** | Advanced Search | 🟡 Medium | PSD Format Search chuyên biệt và phân trang | **P2** |
| **TC-SEARCH-GUEST-027** | Advanced Search | 🔴 High | Tìm kiếm bằng AI Face từ trang Chi tiết ảnh (Photo Detail) | **P2** |
| **TC-SEARCH-GUEST-028** | Trends Module | 🔴 High | Kiểm tra trang Trends (人気の写真素材) hiển thị, sắp xếp và phân trang | **P2** |
| **TC-SEARCH-GUEST-029** | Sort & Pagination | 🔴 High | Sắp xếp kết quả theo "新着順" (Mới nhất) và bảo toàn sắp xếp khi sang Trang 2 | **P1** |
| **TC-SEARCH-GUEST-030** | Role Permission | 🔴 Critical | Chặn sắp xếp "人気順" (Phổ biến) và hiển thị popover nâng cấp Premium | **P1** |
| **TC-SEARCH-GUEST-031** | Pagination | 🔴 High | Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang | **P1** |
| **TC-SEARCH-GUEST-032** | Search Limit | 🔴 Critical | Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm (4 lần/ngày) | **P1** |
| **TC-SEARCH-GUEST-033** | AI Toggle | 🟡 Medium | AI Toggle ở trạng thái OFF khi chưa chạm hạn mức tìm kiếm | **P2** |
| **TC-SEARCH-GUEST-034** | AI Toggle | 🔴 Critical | AI Toggle bật màu vàng và cho phép tìm kiếm bằng AI khi hết lượt search thường | **P1** |
| **TC-SEARCH-GUEST-035** | Sticky Header | 🟢 Low | Hiển thị và ẩn thanh tìm kiếm cố định (Sticky Header) khi cuộn trang | **P3** |
| **TC-SEARCH-GUEST-036** | Sticky Header | 🔴 High | Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar | **P1** |
| **TC-SEARCH-GUEST-037** | Item Interaction | 🔴 Critical | Hiển thị popup Quickview yêu cầu đăng ký/đăng nhập khi click vào ảnh | **P1** |
| **TC-SEARCH-GUEST-038** | Group Sites | 🔴 High | Hiển thị popup tương ứng khi click tác phẩm của các trang nhóm ở cuối trang | **P2** |

---

## 3. BẢNG CHI TIẾT TỪNG TEST CASE CHUẨN SPREADSHEET / TESTRAIL

| TC ID | Tiêu đề kịch bản | Điều kiện tiên quyết | Các bước thực hiện | Dữ liệu kiểm thử | Kết quả mong đợi | Priority |
|---|---|---|---|---|---|:---:|
| **TC-SEARCH-GUEST-001** | Tìm kiếm từ khóa hợp lệ hiển thị kết quả | Mở trang chủ Photo-AC ở chế độ ẩn danh (Guest), còn lượt search | 1. Nhập từ khóa vào ô tìm kiếm.<br>2. Nhấn Enter hoặc click icon Tìm kiếm.<br>3. Chờ trang tải kết quả. | Từ khóa = `学生` | 1. URL chuyển thành `/main/search?q=%E5%AD%A6%E7%94%9F`.<br>2. Heading: `「学生」の写真素材`.<br>3. Danh sách ảnh có ít nhất 1 ảnh (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-002** | Tìm kiếm nhiều từ khóa kết hợp (AND Search) | Ở trang chủ Photo-AC (Guest) | 1. Nhập 2 từ khóa cách nhau bởi dấu cách.<br>2. Nhấn Enter tìm kiếm.<br>3. Chờ tải kết quả. | Cụm từ = `学生 笑顔` | 1. URL chứa cả 2 từ khóa đã nhập.<br>2. Heading: `「学生 笑顔」の写真素材`.<br>3. Danh sách ảnh thỏa mãn cả 2 tiêu chí (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-003** | Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa | Ở trang chủ Photo-AC (Guest) | 1. Nhập chuỗi ký tự ngẫu nhiên không tồn tại.<br>2. Nhấn Enter tìm kiếm. | Chuỗi = `xyzqwer123456nonexistent` | 1. URL chứa từ khóa đã nhập.<br>2. Hiển thị thông báo không tìm thấy kết quả phù hợp.<br>3. Số lượng ảnh hiển thị bằng 0. | **P2** |
| **TC-SEARCH-GUEST-004** | Xóa từ khóa bằng nút Reset và tìm kiếm mới | Đang ở trang kết quả tìm kiếm với từ khóa ban đầu | 1. Quan sát ô tìm kiếm hiển thị từ khóa cũ.<br>2. Click nút Reset (icon 'x').<br>3. Nhập từ khóa mới và submit. | Từ khóa ban đầu = `cat`<br>Từ khóa mới = `dog` | 1. Sau khi click Reset: ô input bị xóa trống (`value = ''`).<br>2. Tìm kiếm mới: URL có `q=dog`, heading `「dog」の写真素材`, hiển thị ảnh mới (`count > 0`). | **P3** |
| **TC-SEARCH-GUEST-005** | Tìm kiếm bằng Top Keyword dưới thanh tìm kiếm | Ở trang chủ Photo-AC, danh sách Top Keywords hiển thị | 1. Kiểm tra danh sách Top Keywords dưới search bar.<br>2. Click vào Top Keyword đầu tiên.<br>3. Chờ trang kết quả tải xong. | Top Keyword đầu tiên (vd: `桜`) | 1. URL chuyển sang `/main/search?q=[TopKeyword]`.<br>2. Heading: `「[TopKeyword]」の写真素材`.<br>3. Kết quả hiển thị danh sách ảnh tương ứng (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-006** | Tìm kiếm bằng Popular Tag keyword | Ở trang chủ Photo-AC | 1. Cuộn đến khu vực Popular Tags.<br>2. Click vào Popular Tag đầu tiên. | Popular Tag đầu tiên trên UI | 1. URL chuyển sang `/main/search?q=[TagText]`.<br>2. Heading hiển thị đúng tên tag.<br>3. Danh sách ảnh liên quan hiển thị đầy đủ (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-007** | Lọc và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長) | Đang ở trang kết quả tìm kiếm từ khóa `cat` | 1. Mở bộ lọc Chiều ảnh trên toolbar, chọn "縦長".<br>2. Kiểm tra kết quả.<br>3. Mở lại và chọn chuyển sang "横長". | Từ khóa = `cat`<br>Tùy chọn: `縦長` (0), `横長` (1) | 1. Chọn 縦長: URL có `orientation=0`, radio 縦長 check, badge `縦長` hiển thị, kết quả toàn ảnh dọc.<br>2. Chọn 横長: URL đổi `orientation=1`, radio 横長 check, badge đổi thành `横長`, kết quả toàn ảnh ngang. | **P1** |
| **TC-SEARCH-GUEST-008** | Lọc định dạng ảnh PSD | Đang ở trang kết quả tìm kiếm từ khóa `flower` | 1. Mở menu định dạng trên toolbar.<br>2. Tích chọn tùy chọn PSD (PSD形式ファイル). | Tùy chọn định dạng PSD (`sizesec=psd`) | 1. URL cập nhật có `sizesec=psd`.<br>2. Radio PSD được check.<br>3. Badge `PSD形式ファイル` xuất hiện.<br>4. Kết quả trả về các ảnh PSD (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-009** | Lọc và chuyển đổi Kích thước ảnh (M / L) | Đang ở trang kết quả tìm kiếm từ khóa `sky` | 1. Mở bộ lọc kích thước, chọn "Mサイズ以上がある".<br>2. Kiểm tra kết quả.<br>3. Chuyển sang chọn "Lサイズがある". | Tùy chọn kích thước: M (`sizesec=m`), L (`sizesec=l`) | 1. Chọn M: URL có `sizesec=m`, radio M check, badge `Mサイズ以上がある` hiển thị.<br>2. Chọn L: URL đổi `sizesec=l`, radio L check, badge đổi `Lサイズがある`, có ảnh hiển thị. | **P2** |
| **TC-SEARCH-GUEST-010** | Lọc ảnh theo Danh mục (人物 - People) | Đang ở trang kết quả tìm kiếm từ khóa `学生` | 1. Mở dropdown Danh mục trên toolbar.<br>2. Tích chọn checkbox "人物". | Danh mục = `人物` (`c_names=1` hoặc `c_id=1`) | 1. URL có `c_names=1` hoặc `c_id=1`.<br>2. Checkbox "人物" checked.<br>3. Badge `人物` hiển thị.<br>4. Danh sách trả về ảnh thuộc danh mục Người (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-011** | Lọc ảnh theo Màu sắc (青 / Blue) | Đang ở trang kết quả tìm kiếm từ khóa `flower` | 1. Mở bảng màu trên toolbar.<br>2. Chọn ô màu Xanh dương (Blue). | Màu xanh dương (`color=0000d6`) | 1. URL cập nhật `color=0000d6`.<br>2. Radio màu xanh checked.<br>3. Badge màu `0000d6` hiển thị.<br>4. Danh sách ảnh có tông màu xanh dương chủ đạo (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-012** | Lọc và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người) | Đang ở trang kết quả tìm kiếm từ khóa `ビジネス` | 1. Chọn số người = "無人" (0 người).<br>2. Chuyển sang chọn "1人" (1 người).<br>3. Chuyển sang chọn "3人以上" (3 người trở lên). | `model_count=0` (無人)<br>`model_count=1` (1人)<br>`model_count=3` (3人以上) | 1. Chọn 0: URL có `model_count=0`, badge `無人`, chỉ hiện ảnh không người.<br>2. Chọn 1: URL đổi `model_count=1`, badge `1人`, chỉ hiện ảnh 1 người.<br>3. Chọn 3+: URL đổi `model_count=3`, badge `3人以上`, hiện ảnh từ 3 người trở lên. | **P1** |
| **TC-SEARCH-GUEST-013** | Lọc người mẫu theo Độ tuổi (若者 - Young) | Đang ở trang kết quả tìm kiếm từ khóa `学生` | 1. Mở menu Độ tuổi người mẫu trên toolbar.<br>2. Chọn "若者". | Tùy chọn tuổi = `若者` (`age=W`) | 1. URL có `age=W`.<br>2. Radio "若者" checked.<br>3. Badge `若者` hiển thị.<br>4. Danh sách ảnh trả về người mẫu thanh thiếu niên/trẻ tuổi (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-014** | Lọc ảnh có Giấy phép người mẫu (Model Release: 取得済のみ) | Đang ở trang kết quả tìm kiếm từ khóa `ビジネス` | 1. Mở menu Model Release trên toolbar.<br>2. Chọn "取得済のみ". | Model Release = `取得済のみ` (`mdlrlrsec=on`) | 1. URL có `mdlrlrsec=on`.<br>2. Radio Model Release checked.<br>3. Badge `取得済のみ` hiển thị.<br>4. Danh sách trả về ảnh đã có Model Release (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-015** | Lọc ảnh có Giấy phép tài sản (Property Release: 取得済のみ) | Đang ở trang kết quả tìm kiếm từ khóa `東京` | 1. Mở menu Property Release trên toolbar.<br>2. Chọn "取得済のみ". | Property Release = `取得済のみ` (`prprlrsec=on`) | 1. URL có `prprlrsec=on`.<br>2. Radio Property Release checked.<br>3. Badge `取得済のみ` hiển thị.<br>4. Kết quả trả về ảnh có xác nhận Property Release (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-016** | Lọc loại trừ ảnh do AI tạo (AI生成を除く) | Đang ở trang kết quả tìm kiếm từ khóa `猫` | 1. Click tích chọn checkbox "AI生成を除く" trên toolbar. | Checkbox `exclude_ai=on` | 1. URL có `exclude_ai=on`.<br>2. Checkbox "AI生成を除く" ở trạng thái checked.<br>3. Danh sách loại trừ toàn bộ ảnh AI tạo (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-017** | Lọc tìm kiếm khớp chính xác (完全一致) | Đang ở trang kết quả tìm kiếm cụm từ `ビジネス スーツ` | 1. Tích chọn checkbox "完全一致" trên toolbar. | Checkbox `type_search=phrase` | 1. URL có `type_search=phrase`.<br>2. Checkbox "完全一致" checked.<br>3. Kết quả chỉ trả về ảnh khớp chính xác cả cụm từ (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-018** | Lọc theo Từ khóa loại trừ (除外キーワード) | Đang ở trang kết quả tìm kiếm từ khóa `猫` | 1. Mở bảng "詳細検索" (Tìm kiếm chi tiết).<br>2. Nhập từ khóa loại trừ vào ô "除外キーワード".<br>3. Bấm Tìm kiếm. | Từ khóa chính = `猫`<br>Từ khóa loại trừ = `子猫` (`nq=子猫`) | 1. URL có `nq=子猫`.<br>2. Ô input vẫn lưu `子猫`.<br>3. Xuất hiện badge `子猫`.<br>4. Danh sách loại bỏ toàn bộ ảnh có tag "子猫" (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-019** | Lọc ảnh theo Tác giả (Creator: Acworks) | Đang ở trang kết quả tìm kiếm từ khóa `空` | 1. Mở bảng "詳細検索".<br>2. Nhập `Acworks` vào ô Tác giả.<br>3. Bấm Tìm kiếm. | Tên tác giả = `Acworks` (`creator=Acworks`) | 1. URL có `creator=Acworks`.<br>2. Ô input hiển thị `Acworks`.<br>3. Badge `Acworks` hiển thị.<br>4. Toàn bộ ảnh trả về đều của tác giả Acworks (`count > 0`). | **P2** |
| **TC-SEARCH-GUEST-020** | Lọc ảnh loại trừ Tác giả (NG Creator: Acworks) | Đang ở trang kết quả tìm kiếm từ khóa `空` | 1. Mở bảng "詳細検索".<br>2. Nhập `Acworks` vào ô Loại trừ tác giả.<br>3. Bấm Tìm kiếm. | Tác giả loại trừ = `Acworks` (`ngcreator=Acworks`) | 1. URL có `ngcreator=Acworks`.<br>2. Ô input hiển thị `Acworks`.<br>3. Badge loại trừ `Acworks` hiển thị.<br>4. Danh sách không chứa tác phẩm nào của Acworks. | **P2** |
| **TC-SEARCH-GUEST-021** | Lọc ảnh theo mã ID (Photo ID) | Đang ở trang kết quả tìm kiếm từ khóa `桜` | 1. Mở bảng "詳細検索".<br>2. Nhập mã ID vào ô Photo ID.<br>3. Nhấn Áp dụng. | Photo ID = `24330999` (`qid=24330999`) | 1. URL có `qid=24330999`.<br>2. Input Photo ID hiển thị `24330999`.<br>3. Badge `24330999` hiển thị.<br>4. Kết quả trả về đúng bức ảnh có mã ID `24330999`. | **P1** |
| **TC-SEARCH-GUEST-022** | Kết hợp từ khóa, 2 người mẫu và Model Release | Đang ở trang kết quả tìm kiếm từ khóa `ビジネス` | 1. Mở toolbar chọn số người mẫu = "2人".<br>2. Chọn Model Release = "取得済のみ". | `model_count=2`<br>`mdlrlrsec=on` | 1. URL chứa cả 2 tham số: `model_count=2` và `mdlrlrsec=on`.<br>2. Cả 2 radio button checked.<br>3. Hiển thị 2 badges `2人` và `取得済のみ`.<br>4. Danh sách trả về ảnh có 2 người và có giấy phép (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-023** | Kết hợp đa bộ lọc (Chiều ngang, Không người mẫu, Loại trừ AI) | Đang ở trang kết quả tìm kiếm từ khóa `オフィス` | 1. Chọn Chiều ngang "横長".<br>2. Chọn Số người "無人".<br>3. Tích chọn checkbox "AI生成を除く". | `orientation=1`<br>`model_count=0`<br>`exclude_ai=on` | 1. URL chứa đủ 3 tham số.<br>2. UI hiển thị cả 3 tùy chọn được check/tích.<br>3. Hiển thị đủ các badges tương ứng.<br>4. Danh sách ảnh thỏa mãn cả 3 tiêu chí (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-024** | Tải ảnh lên tìm kiếm tương đồng (Reverse Image Search) | Ở trang chủ Photo-AC (Guest), có file JPEG hợp lệ | 1. Click icon Camera trên thanh tìm kiếm.<br>2. Chọn file ảnh mẫu từ máy tính để tải lên.<br>3. Chờ hệ thống xử lý tìm kiếm. | File `sample-search.jpg` | 1. Điều hướng sang `/search/ris`.<br>2. Heading: `アップロードされた画像に似ている写真素材`.<br>3. Danh sách ảnh tương đồng hiển thị (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-025** | Recommended Search (おすすめ) và phân trang | Chưa đăng nhập (Guest) | 1. Truy cập trang Recommended Search (`/main/search?rcm=1`).<br>2. Kiểm tra Trang 1.<br>3. Click chuyển sang Trang 2 trên thanh phân trang. | Tham số `rcm=1`, Phân trang `p=2` | 1. Trang 1: URL có `rcm=1`, heading `「おすすめ」の写真素材`, có ảnh.<br>2. Trang 2: URL giữ `rcm=1` và thêm `p=2`, active page là '2', ảnh trang 2 hiển thị. | **P2** |
| **TC-SEARCH-GUEST-026** | PSD Format Search chuyên biệt và phân trang | Chưa đăng nhập (Guest) | 1. Truy cập trang chuyên mục PSD (`sizesec=psd`).<br>2. Kiểm tra Trang 1.<br>3. Click sang Trang 2 trên phân trang. | Chuyên mục PSD (`sizesec=psd`), `p=2` | 1. Trang 1: Heading hiển thị `PSD素材`, danh sách có ảnh PSD.<br>2. Trang 2: URL bảo toàn `sizesec=psd` kèm `p=2`, active page là '2', có ảnh hiển thị. | **P2** |
| **TC-SEARCH-GUEST-027** | Tìm kiếm bằng AI Face từ trang Chi tiết ảnh (Photo Detail) | Truy cập trang chi tiết ảnh người có khuôn mặt AI | 1. Mở trang chi tiết ảnh ID `35133353`.<br>2. Cuộn tới mục "AIで同じモデルの写真を探す".<br>3. Click vào thumbnail khuôn mặt AI đầu tiên.<br>4. Kiểm tra phân trang nếu có. | Photo ID = `35133353` | 1. Điều hướng sang trang tìm kiếm với URL chứa `vector_face=...`.<br>2. Hiển thị danh sách ảnh cùng khuôn mặt người mẫu AI (`count > 0`).<br>3. Khi sang trang 2: vẫn giữ nguyên tham số `vector_face` và `p=2`. | **P2** |
| **TC-SEARCH-GUEST-028** | Kiểm tra trang Trends (人気の写真素材) hiển thị, sắp xếp và phân trang | Chưa đăng nhập (Guest) | 1. Truy cập `/main/trends`.<br>2. Kiểm tra heading và ảnh mặc định.<br>3. Đổi sắp xếp sang "新着順".<br>4. Chuyển sang Trang 2.<br>5. Tìm kiếm từ khóa `ビジネス` trên trang Trends. | URL `/main/trends`<br>Sort `新着順` (`-releasedate`)<br>Từ khóa `ビジネス` | 1. Heading: `人気の写真素材`, hiển thị từ 1 đến tối đa 70 ảnh.<br>2. Đổi sort: URL có `srt=-releasedate`, ảnh cập nhật mới nhất.<br>3. Sang trang 2: URL có `p=2`, giữ `srt` và `referer=more_ranking`.<br>4. Search lại: chuyển sang `/main/search?q=ビジネス`, kết quả hiển thị tốt. | **P2** |
| **TC-SEARCH-GUEST-029** | Sắp xếp kết quả theo "新着順" (Mới nhất) và bảo toàn khi sang Trang 2 | Đang ở trang kết quả tìm kiếm từ khóa `cat` | 1. Mở dropdown Sắp xếp, chọn "新着順".<br>2. Kiểm tra kết quả.<br>3. Chuyển sang Trang 2.<br>4. Khôi phục lại sắp xếp mặc định "関連性の高い順". | Từ khóa `cat`<br>Sort `新着順` (`srt=-releasedate`) | 1. Chọn Mới nhất: URL có `srt=-releasedate`, nút dropdown hiển thị `新着順`, có ảnh.<br>2. Sang trang 2: URL giữ `srt=-releasedate` và có `p=2`, nút dropdown vẫn là `新着順`.<br>3. Khôi phục: URL không còn `srt=-releasedate`, dropdown hiển thị `関連性の高い順`. | **P1** |
| **TC-SEARCH-GUEST-030** | Chặn sắp xếp "人気順" (Phổ biến nhất) và hiển thị popover nâng cấp Premium | Khách vãng lai (Guest) đang ở trang kết quả tìm kiếm từ khóa `cat` | 1. Mở dropdown Sắp xếp.<br>2. Click vào tùy chọn "人気順". | Tùy chọn sắp xếp "人気順" | 1. Hệ thống chặn: URL KHÔNG bị đổi sang `srt=recent_popular`.<br>2. Popover hiển thị thông báo: `プレミアム会員になると、人気順での並び替えができます。`. | **P1** |
| **TC-SEARCH-GUEST-031** | Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang | Đang ở trang kết quả tìm kiếm từ khóa `cat` | 1. Mở menu số lượng hiển thị, kiểm tra radio mặc định và đếm ảnh trang 1.<br>2. Click nút Next sang Trang 2 và đếm ảnh.<br>3. Click nút Prev quay lại Trang 1. | Từ khóa `cat` | 1. Radio `70件` check mặc định, text `70件表示`, trang 1 hiển thị tối đa 70 ảnh.<br>2. Click Next: URL có `p=2`, active page '2', trang 2 hiển thị tối đa 70 ảnh.<br>3. Click Prev: quay về trang 1 (hết `p=2`), active page '1', tối đa 70 ảnh. | **P1** |
| **TC-SEARCH-GUEST-032** | Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm (4 lần/ngày) | Khách vãng lai đã dùng hết 4 lượt tìm kiếm miễn phí trong ngày | 1. Nhập từ khóa tìm kiếm khi hạn mức còn lại bằng 0.<br>2. Quan sát modal giới hạn hiển thị.<br>3. Kiểm tra nút đăng ký nhận điểm và link Premium.<br>4. Click vào link Premium. | Từ khóa = `山`<br>Hạn mức `search_zancnt = 0` | 1. Modal giới hạn hiển thị với tiêu đề: `無料のキーワード検索は「1日4回」までです。`.<br>2. Hiển thị nút CTA: `無料会員登録してACポイント` và link Premium.<br>3. Click link Premium: xuất hiện tooltip `先にログインしてください。初めての方は無料会員登録`. | **P1** |
| **TC-SEARCH-GUEST-033** | AI Toggle ở trạng thái OFF khi chưa chạm hạn mức tìm kiếm | Khách vãng lai truy cập trang chủ, còn lượt tìm kiếm thường (> 0) | 1. Truy cập trang chủ Photo-AC.<br>2. Quan sát nút AI Search (AI Toggle) bên cạnh search bar. | Khách vãng lai chưa hết lượt | 1. Nút AI Search hiển thị.<br>2. Icon OFF hiển thị, icon ON vàng bị ẩn.<br>3. Input ẩn `by_ai` có giá trị `0`.<br>4. Nút AI Search bị vô hiệu hóa (disabled), không cho khách tự bật. | **P2** |
| **TC-SEARCH-GUEST-034** | AI Toggle bật màu vàng và cho phép tìm kiếm bằng AI khi hết lượt search thường | Khách vãng lai dùng hết hạn mức tìm kiếm thông thường (`search_zancnt = 0`) | 1. Hết hạn mức, reload lại trang chủ Photo-AC.<br>2. Quan sát popup Semantic Search.<br>3. Kiểm tra trạng thái AI Toggle.<br>4. Đóng popup Semantic Search.<br>5. Nhập câu truy vấn và submit tìm kiếm. | Câu truy vấn: `オフィスでパソコンを開くビジネスマン` | 1. Popup giới thiệu Semantic Search tự động xuất hiện.<br>2. Nút AI Toggle tự động bật sang ON màu vàng, `by_ai = 1`, tooltip `AI検索はオンの状態です`.<br>3. Submit tìm kiếm: URL có `by_ai=1`, heading `「オフィスでパソコンを開くビジネスマン」の写真素材`, hiển thị ảnh (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-035** | Hiển thị và ẩn thanh tìm kiếm cố định (Sticky Header) khi cuộn trang | Đang ở trang chủ Photo-AC, màn hình ở đỉnh trang | 1. Quan sát thanh Sticky Search Header ở đỉnh trang.<br>2. Cuộn trang xuống dưới (> 800px).<br>3. Cuộn trang ngược lên đỉnh. | Thao tác cuộn trang | 1. Đỉnh trang: Thanh Sticky Search Header bị ẩn hoàn toàn.<br>2. Cuộn xuống: Thanh Sticky tự động trượt xuống cố định ở đầu màn hình kèm ô input.<br>3. Cuộn lên đỉnh: Thanh Sticky tự động ẩn đi. | **P3** |
| **TC-SEARCH-GUEST-036** | Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar | Đang ở trang chủ Photo-AC | 1. Cuộn trang xuống để hiển thị thanh Sticky Header.<br>2. Nhập từ khóa vào ô tìm kiếm trên thanh Sticky.<br>3. Nhấn Enter hoặc click nút Tìm kiếm. | Từ khóa = `ビジネス` | 1. URL chuyển sang `/main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9`.<br>2. Heading: `「ビジネス」の写真素材`.<br>3. Danh sách ảnh hiển thị đúng theo từ khóa (`count > 0`). | **P1** |
| **TC-SEARCH-GUEST-037** | Hiển thị popup Quickview yêu cầu đăng ký/đăng nhập khi click vào ảnh | Khách vãng lai (Guest) đang ở trang kết quả tìm kiếm | 1. Click vào bất kỳ hình ảnh nào trong danh sách kết quả.<br>2. Quan sát popup hiển thị.<br>3. Kiểm tra tiêu đề và các nút CTA.<br>4. Click nút Đóng (Close) popup. | URL kết quả tìm kiếm | 1. Modal QuickView (`#quickViewBox`) mở ra.<br>2. Tiêu đề hiển thị: `会員登録で今すぐダウンロード！`.<br>3. Nút `無料ダウンロード` trỏ tới `/signup`; nút `ログイン` trỏ tới `/login`.<br>4. Click nút đóng: Modal đóng lại, trở về trang kết quả. | **P1** |
| **TC-SEARCH-GUEST-038** | Hiển thị popup tương ứng khi click tác phẩm của các trang nhóm ở cuối trang | Đang ở trang kết quả tìm kiếm, cuộn xuống khu vực `.related-search` | 1. Cuộn xuống khu vực gợi ý các trang nhóm liên kết.<br>2. Click ảnh Design AC ➔ kiểm tra ➔ đóng modal.<br>3. Click ảnh Illust AC ➔ kiểm tra ➔ đóng modal.<br>4. Click ảnh Silhouette AC ➔ kiểm tra ➔ đóng modal.<br>5. Click ảnh Video AC ➔ kiểm tra ➔ đóng modal. | 4 Group Sites (Design, Illust, Silhouette, Video AC) | Modal `#relatedSearchModal` hiển thị thông báo và nút tương ứng:<br>- Design AC: `グループサイトのデザインACが開きます。` ➔ link `design-ac.net`.<br>- Illust AC: `グループサイトのイラストACが開きます。` ➔ link `ac-illust.com`.<br>- Silhouette AC: `グループサイトのシルエットACが開きます。` ➔ link `silhouette-ac.com`.<br>- Video AC: `グループサイトの動画ACが開きます。` ➔ link `video-ac.com`. | **P2** |

---

---

## 4. CHI TIẾT ĐẶC TẢ TỪNG TEST CASE (DETAILED SPECIFICATIONS) (TEST SPECIFICATIONS)

### NHÓM 1: TÌM KIẾM CƠ BẢN (BASIC SEARCH)

---

#### TC-SEARCH-GUEST-001: Tìm kiếm từ khóa hợp lệ hiển thị kết quả
- **Phân loại**: Functional / Positive Test
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**:
  - Trình duyệt ở chế độ ẩn danh (Guest - không có cookie đăng nhập).
  - Đang ở Trang chủ Photo-AC (`https://www.photo-ac.com/`).
  - Hạn mức tìm kiếm còn hiệu lực (> 0 lượt).
- **Dữ liệu kiểm thử**: Từ khóa = `学生`
- **Các bước thực hiện**:
  1. Nhập từ khóa `学生` vào ô tìm kiếm chính trên trang chủ.
  2. Nhấn phím `Enter` hoặc click vào biểu tượng Kính lúp (Tìm kiếm).
  3. Chờ trang kết quả tìm kiếm tải xong hoàn toàn.
- **Kết quả mong đợi**:
  1. Trình duyệt chuyển hướng đến URL: `/main/search?q=%E5%AD%A6%E7%94%9F` (chứa `q=学生`).
  2. Tiêu đề Heading kết quả hiển thị chính xác text: `「学生」の写真素材`.
  3. Danh sách ảnh trả về có ít nhất 1 thumbnail hình ảnh hiển thị rõ ràng (`count > 0`).

---

#### TC-SEARCH-GUEST-002: Tìm kiếm nhiều từ khóa kết hợp (AND Search)
- **Phân loại**: Functional / Positive Test
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC với vai trò Guest.
- **Dữ liệu kiểm thử**: Từ khóa kết hợp = `学生 笑顔` (cách nhau bởi khoảng trắng)
- **Các bước thực hiện**:
  1. Nhập `学生 笑顔` vào ô tìm kiếm.
  2. Nhấn phím `Enter` hoặc click icon Kính lúp.
  3. Chờ trang tải kết quả.
- **Kết quả mong đợi**:
  1. URL chuyển hướng đến `/main/search` và chứa chuỗi mã hóa của cả 2 từ khóa.
  2. Tiêu đề Heading hiển thị: `「学生 笑顔」の写真素材`.
  3. Danh sách kết quả trả về các hình ảnh thỏa mãn đồng thời cả 2 từ khóa (`count > 0`).

---

#### TC-SEARCH-GUEST-003: Hiển thị thông báo khi không tìm thấy ảnh nào khớp từ khóa
- **Phân loại**: Functional / Negative Test
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC với vai trò Guest.
- **Dữ liệu kiểm thử**: Từ khóa không tồn tại, ví dụ: `xyzqwer123456nonexistent`
- **Các bước thực hiện**:
  1. Nhập từ khóa ngẫu nhiên không có thật vào thanh tìm kiếm.
  2. Nhấn `Enter` để thực hiện tìm kiếm.
- **Kết quả mong đợi**:
  1. URL có dạng `/main/search?q=[từ_khóa_vừa_nhập]`.
  2. Hiển thị thông báo không tìm thấy kết quả phù hợp (No results found message).
  3. Số lượng thumbnail ảnh hiển thị bằng 0.

---

#### TC-SEARCH-GUEST-004: Xóa từ khóa bằng nút Reset và tìm kiếm mới
- **Phân loại**: UI Interaction / Functional
- **Mức độ ưu tiên**: **P3 (Medium)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm với từ khóa ban đầu là `cat`.
- **Dữ liệu kiểm thử**: Từ khóa ban đầu = `cat`, Từ khóa mới = `dog`
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `cat` và chờ kết quả hiển thị.
  2. Quan sát ô tìm kiếm hiển thị giá trị `cat`. Click vào nút Reset (biểu tượng xóa 'x') trong thanh tìm kiếm.
  3. Kiểm tra ô tìm kiếm, sau đó nhập từ khóa mới `dog` và submit tìm kiếm lại.
- **Kết quả mong đợi**:
  1. Sau khi click nút Reset: Ô input tìm kiếm được xóa trắng (`value = ''`).
  2. Sau khi tìm kiếm `dog`: URL chuyển thành `...q=dog`, Heading đổi thành `「dog」の写真素材`, và danh sách hiển thị các ảnh liên quan tới `dog` (`count > 0`).

---

#### TC-SEARCH-GUEST-005: Tìm kiếm bằng Top Keyword dưới thanh tìm kiếm
- **Phân loại**: Functional / Shortcut
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC. Khu vực Top Keywords dưới thanh tìm kiếm hiển thị danh sách từ khóa.
- **Dữ liệu kiểm thử**: Click vào từ khóa Top Keyword đầu tiên (ví dụ: `桜`, `背景`, `ビジネス`...)
- **Các bước thực hiện**:
  1. Xác định từ khóa đầu tiên trong danh sách Top Keywords dưới thanh tìm kiếm trang chủ.
  2. Click chuột vào từ khóa đó.
  3. Chờ trang kết quả tải xong.
- **Kết quả mong đợi**:
  1. Trình duyệt điều hướng sang `/main/search` với tham số `q=[TopKeyword]`.
  2. Tiêu đề Heading hiển thị: `「[TopKeyword]」の写真素材`.
  3. Danh sách ảnh hiển thị đúng theo từ khóa đã click (`count > 0`).

---

#### TC-SEARCH-GUEST-006: Tìm kiếm bằng Popular Tag keyword
- **Phân loại**: Functional / Shortcut
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC.
- **Dữ liệu kiểm thử**: Popular Tag đầu tiên trong mục thẻ phổ biến.
- **Các bước thực hiện**:
  1. Cuộn trang đến khu vực các thẻ phổ biến (Popular Tags).
  2. Click vào Popular Tag đầu tiên hiển thị trên màn hình.
- **Kết quả mong đợi**:
  1. URL chuyển hướng đến `/main/search` chứa tham số của thẻ vừa click.
  2. Heading hiển thị đúng tên tag: `「[TagText]」の写真素材`.
  3. Danh sách ảnh liên quan hiển thị đầy đủ (`count > 0`).

---

### NHÓM 2: BỘ LỌC ĐƠN LẺ TRÊN TOOLBAR (TOOLBAR FILTERS)

---

#### TC-SEARCH-GUEST-007: Lọc và chuyển đổi Chiều ảnh (Dọc 縦長 / Ngang 横長)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm với từ khóa `cat`.
- **Dữ liệu kiểm thử**: Từ khóa = `cat`; Tùy chọn chiều ảnh: `縦長` (Dọc), `横長` (Ngang)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `cat`.
  2. Trên Toolbar bộ lọc, mở mục Chiều ảnh và chọn "縦長" (Chiều dọc).
  3. Quan sát URL, badge bộ lọc và kết quả hiển thị.
  4. Mở lại mục Chiều ảnh, chuyển sang chọn "横長" (Chiều ngang).
  5. Quan sát lại URL, badge và kết quả.
- **Kết quả mong đợi**:
  1. Khi chọn Chiều dọc: URL chứa `orientation=0`, radio "縦長" được chọn, hiển thị badge filter `縦長`, nút xóa bộ lọc (Clear all) xuất hiện, danh sách ảnh trả về toàn bộ ảnh chiều dọc (`count > 0`).
  2. Khi chuyển sang Chiều ngang: URL cập nhật thành `orientation=1`, radio "横長" được chọn, badge cập nhật thành `横長`, danh sách ảnh đổi sang hiển thị ảnh chiều ngang (`count > 0`).

---

#### TC-SEARCH-GUEST-008: Lọc định dạng ảnh PSD
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm với từ khóa `flower`.
- **Dữ liệu kiểm thử**: Từ khóa = `flower`; Tùy chọn định dạng PSD (`sizesec=psd`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `flower`.
  2. Trên Toolbar, mở menu định dạng và chọn tùy chọn "PSD形式ファイル".
- **Kết quả mong đợi**:
  1. URL cập nhật thêm tham số `sizesec=psd`.
  2. Radio PSD được chọn.
  3. Badge bộ lọc `PSD形式ファイル` xuất hiện.
  4. Danh sách trả về các ảnh có định dạng tệp PSD tải về (`count > 0`).

---

#### TC-SEARCH-GUEST-009: Lọc và chuyển đổi Kích thước ảnh (M / L)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `sky`.
- **Dữ liệu kiểm thử**: Kích thước M (`sizesec=m`), Kích thước L (`sizesec=l`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `sky`.
  2. Mở bộ lọc kích thước trên Toolbar, chọn "Mサイズ以上がある" (Từ size M trở lên).
  3. Kiểm tra kết quả.
  4. Mở lại và chuyển đổi sang chọn "Lサイズがある" (Có size L).
- **Kết quả mong đợi**:
  1. Khi chọn M: URL có `sizesec=m`, radio M được check, badge `Mサイズ以上がある` hiển thị, danh sách có ảnh (`count > 0`).
  2. Khi chọn L: URL đổi sang `sizesec=l`, radio L được check, badge đổi thành `Lサイズがある`, danh sách ảnh cập nhật (`count > 0`).

---

#### TC-SEARCH-GUEST-010: Lọc ảnh theo Danh mục (人物 - People)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `学生`.
- **Dữ liệu kiểm thử**: Danh mục `人物` (`c_names=1` hoặc `c_id=1`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `学生`.
  2. Trên Toolbar, mở dropdown Danh mục (Category) và tích chọn checkbox "人物".
- **Kết quả mong đợi**:
  1. URL cập nhật chứa `c_names=1` hoặc `c_id=1`.
  2. Checkbox "人物" hiển thị trạng thái checked.
  3. Xuất hiện badge `人物` trên danh sách bộ lọc đang áp dụng.
  4. Danh sách trả về các ảnh thuộc danh mục Con người (`count > 0`).

---

#### TC-SEARCH-GUEST-011: Lọc ảnh theo Màu sắc (青 / Blue)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `flower`.
- **Dữ liệu kiểm thử**: Màu Xanh dương (`color=0000d6`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `flower`.
  2. Mở bảng màu (Color filter) trên Toolbar, chọn ô màu Xanh dương.
- **Kết quả mong đợi**:
  1. URL cập nhật có `color=0000d6`.
  2. Radio/ô màu xanh được chọn.
  3. Badge màu sắc với mã `0000d6` hiển thị.
  4. Danh sách hiển thị các ảnh có tông màu xanh dương chủ đạo (`count > 0`).

---

#### TC-SEARCH-GUEST-012: Lọc và chuyển đổi số lượng người mẫu (0 người ➔ 1 người ➔ 3+ người)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `ビジネス`.
- **Dữ liệu kiểm thử**: 
  - 0 người mẫu: `無人` (`model_count=0`)
  - 1 người mẫu: `1人` (`model_count=1`)
  - Từ 3 người mẫu trở lên: `3人以上` (`model_count=3`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `ビジネス`.
  2. Trên Toolbar, mở menu Số người mẫu, chọn "無人" (0 người). Kiểm tra kết quả.
  3. Mở lại menu, chuyển sang chọn "1人" (1 người). Kiểm tra kết quả.
  4. Mở lại menu, chuyển sang chọn "3人以上" (3 người trở lên). Kiểm tra kết quả.
- **Kết quả mong đợi**:
  1. Tùy chọn 0 người: URL có `model_count=0`, radio "無人" checked, badge `無人` hiển thị, kết quả chỉ chứa ảnh không người (`count > 0`).
  2. Tùy chọn 1 người: URL đổi sang `model_count=1`, radio "1人" checked, badge đổi thành `1人`, kết quả chỉ chứa ảnh 1 người mẫu (`count > 0`).
  3. Tùy chọn 3+ người: URL đổi sang `model_count=3`, radio "3人以上" checked, badge đổi thành `3人以上`, kết quả hiển thị ảnh nhóm từ 3 người (`count > 0`).

---

#### TC-SEARCH-GUEST-013: Lọc người mẫu theo Độ tuổi (若者 - Young)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `学生`.
- **Dữ liệu kiểm thử**: Độ tuổi `若者` (`age=W`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `学生`.
  2. Trên Toolbar, mở menu Độ tuổi người mẫu và chọn "若者".
- **Kết quả mong đợi**:
  1. URL cập nhật thêm `age=W`.
  2. Radio "若者" được check.
  3. Badge bộ lọc `若者` hiển thị.
  4. Danh sách trả về ảnh của người mẫu độ tuổi thanh thiếu niên/trẻ tuổi (`count > 0`).

---

#### TC-SEARCH-GUEST-014: Lọc ảnh có Giấy phép người mẫu (Model Release: 取得済のみ)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `ビジネス`.
- **Dữ liệu kiểm thử**: Model Release = `取得済のみ` (`mdlrlrsec=on`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `ビジネス`.
  2. Mở menu Model Release trên Toolbar, chọn "取得済のみ" (Chỉ ảnh đã có xác nhận bản quyền người mẫu).
- **Kết quả mong đợi**:
  1. URL cập nhật có `mdlrlrsec=on`.
  2. Radio Model Release ở trạng thái checked.
  3. Badge `取得済のみ` hiển thị.
  4. Danh sách ảnh hiển thị các ảnh có gắn ký hiệu/xác thực Model Release (`count > 0`).

---

#### TC-SEARCH-GUEST-015: Lọc ảnh có Giấy phép tài sản (Property Release: 取得済のみ)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `東京`.
- **Dữ liệu kiểm thử**: Property Release = `取得済のみ` (`prprlrsec=on`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `東京`.
  2. Mở menu Property Release trên Toolbar, chọn "取得済のみ" (Chỉ ảnh đã có xác nhận bản quyền tài sản/địa điểm).
- **Kết quả mong đợi**:
  1. URL cập nhật có `prprlrsec=on`.
  2. Radio Property Release ở trạng thái checked.
  3. Badge `取得済のみ` hiển thị.
  4. Danh sách trả về các ảnh có Property Release hợp lệ (`count > 0`).

---

#### TC-SEARCH-GUEST-016: Lọc loại trừ ảnh do AI tạo (AI生成を除く)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `猫`.
- **Dữ liệu kiểm thử**: Checkbox `AI生成を除く` (`exclude_ai=on`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `猫`.
  2. Trên Toolbar, click tích chọn checkbox "AI生成を除く" (Loại trừ ảnh do AI tạo).
- **Kết quả mong đợi**:
  1. URL cập nhật thêm `exclude_ai=on`.
  2. Checkbox "AI生成を除く" hiển thị checked.
  3. Danh sách ảnh cập nhật, loại bỏ toàn bộ ảnh do phần mềm tạo ảnh AI sinh ra (`count > 0`).

---

#### TC-SEARCH-GUEST-017: Lọc tìm kiếm khớp chính xác (完全一致)
- **Phân loại**: Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm cụm từ `ビジネス スーツ`.
- **Dữ liệu kiểm thử**: Cụm từ `ビジネス スーツ`; Checkbox `完全一致` (`type_search=phrase`)
- **Các bước thực hiện**:
  1. Tìm kiếm cụm từ `ビジネス スーツ`.
  2. Trên Toolbar, click tích chọn checkbox "完全一致" (Khớp chính xác cả cụm từ).
- **Kết quả mong đợi**:
  1. URL cập nhật có `type_search=phrase`.
  2. Checkbox "完全一致" hiển thị checked.
  3. Danh sách kết quả trả về các ảnh khớp chính xác cụm từ tìm kiếm (`count > 0`).

---

### NHÓM 3: BỘ LỌC CHI TIẾT (詳細検索) & KẾT HỢP ĐA BỘ LỌC

---

#### TC-SEARCH-GUEST-018: Lọc theo Từ khóa loại trừ (除外キーワード)
- **Phân loại**: Detailed Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `猫`.
- **Dữ liệu kiểm thử**: Từ khóa chính = `猫`, Từ khóa loại trừ = `子猫` (`nq=子猫`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `猫`.
  2. Click mở bảng "詳細検索" (Tìm kiếm chi tiết).
  3. Nhập từ khóa `子猫` vào ô "除外キーワード" (Từ khóa loại trừ).
  4. Nhấn nút Áp dụng / Tìm kiếm.
- **Kết quả mong đợi**:
  1. URL cập nhật tham số `nq=%E5%AD%90%E7%8C%AB` (hoặc `nq=子猫`).
  2. Ô input 除外キーワード vẫn lưu giá trị `子猫`.
  3. Badge bộ lọc `子猫` hiển thị trong thanh filter.
  4. Danh sách trả về các ảnh về mèo nhưng không có mèo con (`count > 0`).

---

#### TC-SEARCH-GUEST-019: Lọc ảnh theo Tác giả (Creator: Acworks)
- **Phân loại**: Detailed Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `空`.
- **Dữ liệu kiểm thử**: Tên tác giả = `Acworks` (`creator=Acworks`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `空`.
  2. Mở bảng "詳細検索" (Tìm kiếm chi tiết).
  3. Nhập `Acworks` vào ô "クリエイター名" (Tên tác giả).
  4. Nhấn nút Tìm kiếm.
- **Kết quả mong đợi**:
  1. URL cập nhật thêm `creator=Acworks`.
  2. Ô input tác giả hiển thị giá trị `Acworks`.
  3. Xuất hiện badge `Acworks` trên thanh filter.
  4. Heading giữ nguyên `「空」の写真素材` và các tác phẩm hiển thị đều thuộc tác giả Acworks (`count > 0`).

---

#### TC-SEARCH-GUEST-020: Lọc ảnh loại trừ Tác giả (NG Creator: Acworks)
- **Phân loại**: Detailed Filter / Functional
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `空`.
- **Dữ liệu kiểm thử**: Tác giả cần loại trừ = `Acworks` (`ngcreator=Acworks`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `空`.
  2. Mở bảng "詳細検索" (Tìm kiếm chi tiết).
  3. Nhập `Acworks` vào ô "除外クリエイター名" (Tên tác giả cần loại trừ).
  4. Nhấn nút Tìm kiếm.
- **Kết quả mong đợi**:
  1. URL cập nhật thêm `ngcreator=Acworks`.
  2. Ô input loại trừ tác giả giữ giá trị `Acworks`.
  3. Badge loại trừ `Acworks` hiển thị trên thanh filter.
  4. Danh sách ảnh loại bỏ hoàn toàn các tác phẩm do Acworks đăng tải.

---

#### TC-SEARCH-GUEST-021: Lọc ảnh theo mã ID (Photo ID)
- **Phân loại**: Detailed Filter / Functional
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `桜`.
- **Dữ liệu kiểm thử**: Photo ID = `24330999` (`qid=24330999`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `桜`.
  2. Mở bảng "詳細検索".
  3. Nhập mã ID `24330999` vào ô Photo ID.
  4. Nhấn Enter hoặc nút Áp dụng.
- **Kết quả mong đợi**:
  1. URL cập nhật có `qid=24330999`.
  2. Input Photo ID hiển thị đúng `24330999`.
  3. Badge bộ lọc `24330999` hiển thị.
  4. Danh sách kết quả tìm kiếm hiển thị chính xác bức ảnh có mã ID `24330999`.

---

#### TC-SEARCH-GUEST-022: Kết hợp từ khóa, 2 người mẫu và Model Release
- **Phân loại**: Combined Filters / Complex Flow
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `ビジネス`.
- **Dữ liệu kiểm thử**: Từ khóa `ビジネス`, Số người mẫu = `2人` (`model_count=2`), Model Release = `取得済のみ` (`mdlrlrsec=on`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `ビジネス`.
  2. Mở menu Số người mẫu trên Toolbar, chọn "2人".
  3. Mở menu Model Release trên Toolbar, chọn "取得済のみ".
- **Kết quả mong đợi**:
  1. URL cập nhật đồng thời 2 tham số: `model_count=2` và `mdlrlrsec=on`.
  2. Cả 2 tùy chọn tương ứng trên UI đều hiển thị trạng thái được chọn.
  3. Hiển thị đồng thời 2 badges bộ lọc: `2人` và `取得済のみ`.
  4. Danh sách trả về các ảnh vừa có đúng 2 người mẫu vừa đã có Model Release (`count > 0`).

---

#### TC-SEARCH-GUEST-023: Kết hợp đa bộ lọc (Chiều ngang, Không người mẫu, Loại trừ AI)
- **Phân loại**: Combined Filters / Complex Flow
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `オフィス`.
- **Dữ liệu kiểm thử**: 
  - Từ khóa: `オフィス`
  - Chiều ảnh: `横長` (`orientation=1`)
  - Số người: `無人` (`model_count=0`)
  - Loại trừ AI: `AI生成を除く` (`exclude_ai=on`)
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `オフィス`.
  2. Chọn bộ lọc Chiều ngang "横長".
  3. Chọn bộ lọc Không người "無人".
  4. Tích chọn checkbox "AI生成を除く".
- **Kết quả mong đợi**:
  1. URL chứa đầy đủ cả 3 tham số: `orientation=1`, `model_count=0`, và `exclude_ai=on`.
  2. Trên giao diện, cả 3 tùy chọn đều ở trạng thái active/checked.
  3. Xuất hiện đầy đủ các badge bộ lọc: `横長`, `無人`.
  4. Danh sách trả về ảnh văn phòng thỏa mãn cả 3 điều kiện (`count > 0`).

---

### NHÓM 4: CÁC PHƯƠNG THỨC TÌM KIẾM NÂNG CAO (ADVANCED SEARCH)

---

#### TC-SEARCH-GUEST-024: Tải ảnh lên tìm kiếm tương đồng (Reverse Image Search)
- **Phân loại**: Advanced Search / File Upload
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC. Có file ảnh mẫu định dạng JPEG hợp lệ trên máy tính.
- **Dữ liệu kiểm thử**: File ảnh `sample-search.jpg`
- **Các bước thực hiện**:
  1. Click vào biểu tượng Camera (Tìm kiếm bằng hình ảnh) trên thanh tìm kiếm.
  2. Chọn tệp ảnh `sample-search.jpg` từ máy tính để tải lên.
  3. Chờ hệ thống upload và xử lý tìm kiếm tương đồng.
- **Kết quả mong đợi**:
  1. Trình duyệt điều hướng sang URL `/search/ris` (Reverse Image Search).
  2. Tiêu đề Heading hiển thị: `アップロードされた画像に似ている写真素材`.
  3. Danh sách kết quả trả về các hình ảnh có nét tương đồng về màu sắc/bố cục với ảnh đã tải lên (`count > 0`).

---

#### TC-SEARCH-GUEST-025: Recommended Search (おすすめ) và phân trang
- **Phân loại**: Advanced Search / Pagination
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Khách vãng lai (Guest).
- **Dữ liệu kiểm thử**: Trang đề xuất (`rcm=1`)
- **Các bước thực hiện**:
  1. Truy cập vào trang Recommended Search (hoặc click vào mục "おすすめ" từ menu điều hướng).
  2. Quan sát kết quả hiển thị trên Trang 1.
  3. Click vào nút chuyển sang Trang 2 trên thanh phân trang.
- **Kết quả mong đợi**:
  1. Trang 1: URL chứa `rcm=1`, Heading hiển thị `「おすすめ」の写真素材`, hiển thị danh sách ảnh (`count > 0`).
  2. Trang 2: URL bảo toàn tham số `rcm=1` và thêm `p=2`, số trang active hiển thị là '2', danh sách ảnh của trang 2 hiển thị thành công.

---

#### TC-SEARCH-GUEST-026: PSD Format Search chuyên biệt và phân trang
- **Phân loại**: Advanced Search / Format
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Khách vãng lai (Guest).
- **Dữ liệu kiểm thử**: Chuyên mục tìm kiếm PSD (`sizesec=psd`)
- **Các bước thực hiện**:
  1. Điều hướng trực tiếp đến trang tìm kiếm chuyên mục PSD.
  2. Kiểm tra danh sách hiển thị trên Trang 1.
  3. Click chuyển sang Trang 2 trên thanh phân trang.
- **Kết quả mong đợi**:
  1. Trang 1: Heading hiển thị `PSD素材`, danh sách ảnh có ít nhất 1 ảnh PSD hiển thị (`count > 0`).
  2. Trang 2: URL bảo toàn `sizesec=psd` kèm tham số `p=2`, trang active là '2', danh sách ảnh tiếp tục hiển thị bình thường.

---

#### TC-SEARCH-GUEST-027: Tìm kiếm bằng AI Face từ trang Chi tiết ảnh (Photo Detail)
- **Phân loại**: Advanced Search / AI Feature
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Khách vãng lai, truy cập vào trang chi tiết ảnh của người mẫu có khuôn mặt AI.
- **Dữ liệu kiểm thử**: Photo ID = `35133353`
- **Các bước thực hiện**:
  1. Truy cập trang chi tiết ảnh: `https://www.photo-ac.com/main/detail/35133353`.
  2. Cuộn xuống khu vực "AIで同じモデルの写真を探す" (Tìm ảnh cùng người mẫu bằng AI).
  3. Click vào thumbnail khuôn mặt AI đầu tiên.
  4. Quan sát trang kết quả hiển thị và thử click sang Trang 2 nếu có phân trang.
- **Kết quả mong đợi**:
  1. Trình duyệt điều hướng sang trang tìm kiếm với URL chứa tham số `vector_face=...`.
  2. Danh sách kết quả trả về các hình ảnh có cùng khuôn mặt người mẫu AI (`count > 0`).
  3. Khi sang trang 2: Tham số `vector_face=...` vẫn được giữ nguyên kèm `p=2`.

---

#### TC-SEARCH-GUEST-028: Kiểm tra trang Trends (人気の写真素材) hiển thị, sắp xếp và phân trang
- **Phân loại**: Trends Module / Navigation
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Khách vãng lai (Guest).
- **Dữ liệu kiểm thử**: URL `/main/trends`; Sắp xếp `新着順` (`srt=-releasedate`); Từ khóa tìm kiếm `ビジネス`
- **Các bước thực hiện**:
  1. Truy cập trang Trends: `https://www.photo-ac.com/main/trends`.
  2. Kiểm tra Heading và danh sách ảnh mặc định.
  3. Đổi sắp xếp sang "新着順" (Mới nhất).
  4. Click chuyển sang Trang 2 trên thanh phân trang.
  5. Nhập từ khóa `ビジネス` vào ô tìm kiếm trên trang Trends và submit tìm kiếm.
- **Kết quả mong đợi**:
  1. Bước 1-2: Heading hiển thị `人気の写真素材`, danh sách có ảnh hiển thị và không vượt quá 70 ảnh.
  2. Bước 3: URL cập nhật `srt=-releasedate`, danh sách ảnh cập nhật theo ngày phát hành mới nhất.
  3. Bước 4: URL có `p=2`, bảo toàn `srt=-releasedate` và `referer=more_ranking`, trang active là '2', có ảnh hiển thị.
  4. Bước 5: Chuyển hướng sang `/main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9`, heading hiển thị `「ビジネス」の写真素材`, hiển thị kết quả bình thường.

---

### NHÓM 5: SẮP XẾP & PHÂN TRANG (SORT & PAGINATION)

---

#### TC-SEARCH-GUEST-029: Sắp xếp kết quả theo "新着順" (Mới nhất) và bảo toàn sắp xếp khi sang Trang 2
- **Phân loại**: Sort / Pagination
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm với từ khóa `cat`.
- **Dữ liệu kiểm thử**: Sắp xếp `新着順` (`srt=-releasedate`), Phân trang Trang 2 (`p=2`), Sắp xếp mặc định `関連性の高い順`
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `cat`.
  2. Mở dropdown Sắp xếp (Sort), chọn "新着順" (Mới nhất).
  3. Kiểm tra URL và danh sách ảnh.
  4. Click chuyển sang Trang 2 trên thanh phân trang.
  5. Mở lại dropdown Sort và chọn khôi phục về "関連性の高い順" (Độ liên quan cao).
- **Kết quả mong đợi**:
  1. Khi chọn Mới nhất: URL có `srt=-releasedate`, nút sort dropdown hiển thị text `新着順`, radio "新着順" checked, danh sách hiển thị các ảnh mới nhất (`count > 0`).
  2. Khi sang trang 2: URL có `p=2` và vẫn giữ nguyên `srt=-releasedate`, nút dropdown và radio button vẫn là `新着順`, trang active là '2', danh sách có ảnh (`count > 0`).
  3. Khi khôi phục: URL không còn chứa `srt=-releasedate`, dropdown hiển thị `関連性の高い順`, radio "関連性の高い順" được check.

---

### NHÓM 6: PHÂN QUYỀN & GIỚI HẠN THEO ROLE (ROLE RESTRICTION & FEATURE GATES)

---

#### TC-SEARCH-GUEST-030: Chặn sắp xếp "人気順" (Phổ biến nhất) và hiển thị popover nâng cấp Premium
- **Phân loại**: Feature Gate / Security / Role Permission
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm với vai trò Khách vãng lai (Guest).
- **Dữ liệu kiểm thử**: Từ khóa = `cat`; Tùy chọn sắp xếp "人気順"
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `cat`.
  2. Mở dropdown Sắp xếp, click vào tùy chọn "人気順" (Sắp xếp theo độ phổ biến).
- **Kết quả mong đợi**:
  1. Hệ thống chặn thao tác: URL KHÔNG bị thay đổi sang `srt=recent_popular`.
  2. Xuất hiện Popover thông báo giới hạn tính năng độc quyền: `プレミアム会員になると、人気順での並び替えができます。` (Chỉ thành viên Premium mới có thể sắp xếp theo độ phổ biến).

---

#### TC-SEARCH-GUEST-031: Kiểm tra phân trang (Next / Prev) và hiển thị mặc định 70 ảnh/trang
- **Phân loại**: Pagination / Display Count
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm từ khóa `cat` (nhiều kết quả).
- **Các bước thực hiện**:
  1. Tìm kiếm từ khóa `cat`.
  2. Mở dropdown "表示件数" (Số ảnh hiển thị), kiểm tra tùy chọn mặc định và đếm số thumbnail ảnh ở Trang 1.
  3. Click vào nút "Next" (Trang kế tiếp) trên thanh phân trang.
  4. Kiểm tra trang 2 và đếm số lượng thumbnail ảnh.
  5. Click vào nút "Prev" (Trang trước).
- **Kết quả mong đợi**:
  1. Trang 1: Radio `70件` được check mặc định, nút dropdown hiển thị text `70件表示`, trang active là '1', số lượng ảnh hiển thị từ 1 đến tối đa 70 ảnh.
  2. Khi click Next sang Trang 2: URL có `p=2`, trang active là '2', số ảnh trang 2 từ 1 đến tối đa 70 ảnh.
  3. Khi click Prev về Trang 1: URL quay lại trang 1 (không còn tham số `p=2`), trang active là '1', số ảnh từ 1 đến tối đa 70 ảnh.

---

#### TC-SEARCH-GUEST-032: Hiển thị Modal giới hạn khi chạm hạn mức tìm kiếm (4 lần/ngày)
- **Phân loại**: Search Limit / Business Logic / Exception
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Khách vãng lai đã thực hiện hết 4 lượt tìm kiếm miễn phí trong ngày (Hạn mức còn lại = 0).
- **Dữ liệu kiểm thử**: Từ khóa tìm kiếm = `山`
- **Các bước thực hiện**:
  1. Khi đã dùng hết 4 lượt tìm kiếm, nhập từ khóa `山` và submit tìm kiếm.
  2. Quan sát màn hình khi Modal thông báo giới hạn xuất hiện.
  3. Kiểm tra các thành phần trên modal: Nút đăng ký nhận 15 điểm và link nâng cấp Premium.
  4. Click vào đường link Premium trên modal.
- **Kết quả mong đợi**:
  1. Modal giới hạn tìm kiếm hiển thị với tiêu đề chính xác: `無料のキーワード検索は「1日4回」までです。`.
  2. Hiển thị nút CTA kêu gọi đăng ký tài khoản miễn phí: `無料会員登録してACポイント` và đường link Premium.
  3. Khi click vào link Premium: Xuất hiện Tooltip yêu cầu đăng nhập trước: `先にログインしてください。初めての方は無料会員登録`.

---

#### TC-SEARCH-GUEST-033: AI Toggle ở trạng thái OFF khi chưa chạm hạn mức tìm kiếm
- **Phân loại**: AI Toggle / UI State
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Khách vãng lai truy cập trang chủ, hạn ngạch tìm kiếm thông thường vẫn còn lượt (> 0).
- **Các bước thực hiện**:
  1. Truy cập Trang chủ Photo-AC.
  2. Quan sát nút bấm "AI Toggle" bên cạnh thanh tìm kiếm.
- **Kết quả mong đợi**:
  1. Nút AI Search hiển thị trên trang chủ.
  2. Icon AI Search ở trạng thái OFF (icon xám).
  3. Icon ON màu vàng ở trạng thái ẩn.
  4. Trường ẩn `by_ai` mang giá trị `0`.
  5. Nút AI Search bị vô hiệu hóa (disabled), không cho phép khách vãng lai tự ý click bật/tắt thủ công khi còn lượt search thường.

---

#### TC-SEARCH-GUEST-034: AI Toggle bật màu vàng và cho phép tìm kiếm bằng AI khi hết lượt search thường
- **Phân loại**: AI Toggle / Business Logic
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Khách vãng lai đã dùng hết hạn mức tìm kiếm thông thường (`search_zancnt = 0`).
- **Dữ liệu kiểm thử**: Câu truy vấn ngôn ngữ tự nhiên = `オフィスでパソコンを開くビジネスマン`
- **Các bước thực hiện**:
  1. Ở trạng thái hết lượt tìm kiếm thông thường, tải lại trang chủ Photo-AC.
  2. Quan sát Popup "AI検索" xuất hiện trên màn hình.
  3. Kiểm tra trạng thái của nút AI Toggle trên thanh tìm kiếm.
  4. Click đóng popup Semantic Search.
  5. Nhập câu truy vấn `オフィスでパソコンを開くビジネスマン` vào ô tìm kiếm và submit.
- **Kết quả mong đợi**:
  1. Bước 2: Popup Semantic Search giới thiệu tìm kiếm bằng AI tự động bật mở.
  2. Bước 3: Nút AI Toggle tự động bật sang trạng thái ON màu vàng (icon ON hiển thị, icon OFF ẩn), trường `by_ai` có giá trị `1`, tooltip hiển thị: `AI検索はオンの状態です`.
  3. Bước 5: Thực hiện tìm kiếm thành công với AI, URL chuyển sang `/main/search?...by_ai=1`, heading hiển thị `「オフィスでパソコンを開くビジネスマン」の写真素材` và danh sách ảnh trả về kết quả tương thích (`count > 0`).

---

### NHÓM 7: PHÂN TRANG & TƯƠNG TÁC GIAO DIỆN (UI INTERACTIONS & GROUP SITES)

---

#### TC-SEARCH-GUEST-035: Hiển thị và ẩn thanh tìm kiếm cố định (Sticky Header) khi cuộn trang
- **Phân loại**: UI Interaction / Visual
- **Mức độ ưu tiên**: **P3 (Low)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC, vị trí cuộn trang ở đỉnh (Top of page).
- **Các bước thực hiện**:
  1. Quan sát phần đầu trang, kiểm tra thanh Sticky Search Header.
  2. Cuộn trang xuống dưới một đoạn (> 800px).
  3. Cuộn trang ngược lại lên đỉnh đầu trang.
- **Kết quả mong đợi**:
  1. Ở đỉnh trang: Thanh Sticky Search Header ở trạng thái ẩn hoàn toàn.
  2. Khi cuộn xuống: Thanh Sticky Search Header tự động trượt xuống và hiển thị cố định ở đầu màn hình kèm ô input tìm kiếm.
  3. Khi cuộn ngược lên đỉnh: Thanh Sticky Search Header tự động biến mất/ẩn đi.

---

#### TC-SEARCH-GUEST-036: Thực hiện tìm kiếm từ khóa thành công từ Sticky Header Search Bar
- **Phân loại**: Functional / UI Action
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở Trang chủ Photo-AC.
- **Dữ liệu kiểm thử**: Từ khóa = `ビジネス`
- **Các bước thực hiện**:
  1. Cuộn trang xuống dưới để kích hoạt hiển thị thanh Sticky Search Header.
  2. Nhập từ khóa `ビジネス` vào ô input trên thanh Sticky Search Header.
  3. Nhấn phím Enter hoặc click biểu tượng Tìm kiếm trên thanh Sticky.
- **Kết quả mong đợi**:
  1. Trình duyệt điều hướng sang URL: `/main/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9`.
  2. Tiêu đề Heading hiển thị đúng: `「ビジネス」の写真素材`.
  3. Danh sách ảnh hiển thị đúng theo từ khóa `ビジネス` (`count > 0`).

---

#### TC-SEARCH-GUEST-037: Hiển thị popup Quickview yêu cầu đăng ký/đăng nhập khi click vào ảnh
- **Phân loại**: Item Interaction / Role Restriction
- **Mức độ ưu tiên**: **P1 (Critical)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm với vai trò Khách vãng lai (Guest).
- **Dữ liệu kiểm thử**: URL kết quả tìm kiếm, ví dụ: `/main/search?q=%E7%A7%8B&creator=acworks&layout=vertical`
- **Các bước thực hiện**:
  1. Truy cập trang kết quả tìm kiếm.
  2. Click chuột vào hình ảnh đầu tiên trong danh sách kết quả.
  3. Quan sát Modal popup QuickView xuất hiện.
  4. Kiểm tra tiêu đề và các nút CTA trên popup.
  5. Click nút Đóng (Close) popup QuickView.
- **Kết quả mong đợi**:
  1. Modal QuickView (`#quickViewBox`) mở ra ngay trên màn hình.
  2. Tiêu đề modal hiển thị thông điệp yêu cầu đăng ký: `会員登録で今すぐダウンロード！` (Đăng ký thành viên để tải ngay!).
  3. Hiển thị nút "無料ダウンロード" (Đăng ký miễn phí) trỏ tới link `/signup` và nút/link "ログイン" (Đăng nhập) trỏ tới `/login`.
  4. Sau khi click nút đóng: Popup QuickView đóng lại mượt mà, người dùng tiếp tục xem danh sách ảnh.

---

#### TC-SEARCH-GUEST-038: Hiển thị popup tương ứng khi click tác phẩm của các trang nhóm ở cuối trang
- **Phân loại**: Group Sites Integration / External Modal
- **Mức độ ưu tiên**: **P2 (High)**
- **Điều kiện tiên quyết**: Đang ở trang kết quả tìm kiếm. Cuộn xuống khu vực tác phẩm đề xuất của các trang nhóm liên kết (`.related-search`).
- **Dữ liệu kiểm thử**: 4 trang nhóm trong hệ sinh thái AC Works:
  - **Design AC**: Thông báo `グループサイトのデザインACが開きます。` | Nút trỏ tới domain `design-ac.net`
  - **Illust AC**: Thông báo `グループサイトのイラストACが開きます。` | Nút trỏ tới domain `ac-illust.com`
  - **Silhouette AC**: Thông báo `グループサイトのシルエットACが開きます。` | Nút trỏ tới domain `silhouette-ac.com`
  - **Video AC**: Thông báo `グループサイトの動画ACが開きます。` | Nút trỏ tới domain `video-ac.com`
- **Các bước thực hiện**:
  1. Cuộn trang xuống cuối cùng tới khu vực gợi ý Group Sites (`.related-search`).
  2. Click vào ảnh tác phẩm của **Design AC** -> Kiểm tra nội dung modal -> Đóng modal.
  3. Click vào ảnh tác phẩm của **Illust AC** -> Kiểm tra nội dung modal -> Đóng modal.
  4. Click vào ảnh tác phẩm của **Silhouette AC** -> Kiểm tra nội dung modal -> Đóng modal.
  5. Click vào ảnh tác phẩm của **Video AC** -> Kiểm tra nội dung modal -> Đóng modal.
- **Kết quả mong đợi**:
  1. Với mỗi trang nhóm, modal `#relatedSearchModal` hiển thị chính xác dòng text thông báo và nút hành động chuyển hướng đến đúng domain tương ứng:
     - Design AC: Modal chứa text `グループサイトのデザインACが開きます。` và nút tải trỏ tới domain `design-ac.net`.
     - Illust AC: Modal chứa text `グループサイトのイラストACが開きます。` và nút tải trỏ tới domain `ac-illust.com`.
     - Silhouette AC: Modal chứa text `グループサイトのシルエットACが開きます。` và nút tải trỏ tới domain `silhouette-ac.com`.
     - Video AC: Modal chứa text `グループサイトの動画ACが開きます。` và nút tải trỏ tới domain `video-ac.com`.
  2. Modal đóng mở bình thường sau mỗi lần click kiểm tra.

---

## 5. HƯỚNG DẪN DÀNH CHO QA TESTER KHI THỰC HIỆN MANUAL TEST

1. **Quản lý Session & Môi trường**:
   - Sử dụng cửa sổ ẩn danh (Incognito Window) để đảm bảo không dính session cookie đăng nhập của các role khác (Free User, Premium).
   - Đảm bảo cài đặt extension chặn quảng cáo (AdBlock) hoặc cấu hình chặn Google Vignette Ads nếu quảng cáo làm gián đoạn luồng test trên trình duyệt thật.

2. **Hạn mức tìm kiếm 4 lần/ngày của Guest**:
   - Khách vãng lai chỉ có tối đa 4 lượt tìm kiếm thông thường mỗi ngày (dựa theo IP hoặc Cookie `search_zancnt`).
   - Để kiểm thử các kịch bản bình thường sau khi hết hạn mức: Có thể xóa cookie của site hoặc đổi IP/trình duyệt.
   - Để kiểm thử TC-032 và TC-034: Sử dụng hết 4 lượt hoặc mở DevTools Console gán `document.cookie = "search_zancnt=0; path=/";` và reload trang.

3. **Xử lý ký tự Tiếng Nhật (CJK & IME)**:
   - Các từ khóa tiếng Nhật (như `学生`, `猫`, `ビジネス`, `秋`, `オフィス`...) cần được copy/paste chính xác hoặc gõ qua bộ gõ tiếng Nhật và nhấn Enter xác nhận composition trước khi submit tìm kiếm.

4. **Định dạng bằng chứng kiểm thử (Evidence)**:
   - Khi chụp ảnh màn hình đính kèm báo cáo lỗi (Bug Report) hoặc kết quả Pass, khuyến nghị đặt tên theo chuẩn kebab-case đã được quy định trong tài liệu (ví dụ: `Filter-縦長.png`, `Sort-Popular-Popover-Blocked.png`, `Guest-QuickView-Register-Popup.png`).
