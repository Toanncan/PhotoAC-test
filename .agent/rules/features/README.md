---
trigger: model_decision
description: Hướng dẫn hệ thống Feature Catalog của Photo-AC và Illust-AC (Index catalogs, quy trình xác minh tính năng theo site, cách tạo catalog mới).
---

# Feature Catalog System — Photo-AC & Illust-AC

Hệ thống tài liệu catalog hóa đặc tả nghiệp vụ, sự khác biệt giao diện (Feature Parity Matrix), và hành vi theo từng vai trò (Behavior Matrix) giữa hai nền tảng **Photo-AC** và **Illust-AC**.

---

## 1. Danh Mục Feature Catalogs (Feature Index)

| Tính năng (Feature) | File Catalog | Khi nào cần đọc? |
|---|---|---|
| **Search & Filters** | [`.agent/rules/features/search.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/search.md) | Viết test tìm kiếm, bộ lọc toolbar, sắp xếp, phân trang, hạn mức tìm kiếm |
| **Download & Receipts** | [`.agent/rules/features/download.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/download.md) | Viết test tải ảnh, đếm ngược quảng cáo, hóa đơn PDF, thông tin gói cước |
| **Creator** | [`.agent/rules/features/creator.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/creator.md) | Viết test upload tác phẩm, bảng xếp hạng, quản lý tranh/ảnh |
| **Auth & Session** | [`.agent/rules/features/auth.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/auth.md) | Viết test đăng nhập, quản lý session storageState, ma trận 4 vai trò |
| **Tính năng mới** | `.agent/rules/features/<ten-feature>.md` | Nhân bản từ `_TEMPLATE.md` khi phát triển module mới |

---

## 2. Quy Trình Bắt Buộc 3 Bước Khi Viết Test

Mọi AI Agent và Developer trước khi viết kịch bản test **BẮT BUỘC** thực hiện theo quy trình 3 bước:

```
BƯỚC 1: XÁC ĐỊNH SITE
   Đọc đường dẫn file hiện tại:
   - photo-ac/ → Photo-AC (photo-ac.com)
   - illust-ac/ → Illust-AC (ac-illust.com)

BƯỚC 2: ĐỌC FEATURE CATALOG
   Mở file .agent/rules/features/<feature>.md → xác nhận tính năng có tồn tại (✅) hay không (❌) trên site.

BƯỚC 3: VERIFY TRÊN BROWSER (NẾU CHƯA RÕ)
   Mở browser bằng Playwright MCP → inspect DOM thực tế → TUYỆT ĐỐI KHÔNG ĐOÁN MÒ LOCATOR.
```

---

## 3. Quy Trình Chuẩn Khi Tạo Catalog Cho Tính Năng Mới

Khi dự án bổ sung một tính năng hoặc phân hệ lớn mới:
1. Sao chép [`.agent/rules/features/_TEMPLATE.md`](file:///Users/imac/Desktop/PhotoAC-test/.agent/rules/features/_TEMPLATE.md) thành `.agent/rules/features/<ten-feature>.md`.
2. Inspect DOM thực tế trên cả 2 website Photo-AC và Illust-AC.
3. Điền bảng **Feature Parity Matrix** (đánh dấu rõ ràng tính năng nào có trên Photo, tính năng nào có trên Illust).
4. Điền bảng **Behavior Matrix theo Role** (Guest, Free User, Premium User, Creator).
5. Commit file catalog này vào kho lưu trữ để các phiên làm việc tiếp theo tái sử dụng.
