---
trigger: model_decision
---

# Feature Catalog: Creator Features — Photo-AC & Illust-AC

> Load rule này khi làm việc với bất kỳ task nào liên quan đến:
> Creator Ranking, Upload tác phẩm, Quản lý portfolio, Creator Dashboard.

---

## Feature Parity Matrix — Creator

| Tính năng | Photo-AC | Illust-AC | Ghi chú |
|---|:---:|:---:|---|
| **Creator Ranking** | ✅ | ✅ | Page: `ranking.page.ts` / `ranking.spec.ts` |
| **Upload tác phẩm** | ✅ | ✅ | Chỉ Creator role |
| **Quản lý portfolio** | ✅ | ✅ | `/user/myworks` hoặc tương đương |
| **Creator Dashboard** | ✅ | ✅ | Thống kê lượt xem / tải |
| **AI-generated label** | ✅ | ✅ | Đánh dấu ảnh do AI tạo khi upload |

---

## Session Isolation — Creator Role

```typescript
// Creator session được inject từ project config:
// chromium-creator (.auth/creator.json)
// firefox-creator  (.auth/creator-firefox.json)

// TUYỆT ĐỐI KHÔNG hardcode trong spec:
// test.use({ storageState: '.auth/creator.json' }); ← SAI

// ĐỂ PROJECT tự inject (playwright.config.ts):
// Project "chromium-creator" đã cấu hình storageState sẵn
```

---

## Quy Trình Bắt Buộc Khi Viết Creator Test

```
1. Xác định feature có trên site (photo-ac/ hay illust-ac/)
2. Dùng đúng role: Creator session từ chromium-creator / firefox-creator
3. Không viết test Download/Receipts cho Creator (không áp dụng)
4. Mở browser verify DOM trước khi viết locator cho upload form
```

---

## Thêm Feature Creator Mới

Khi có feature Creator mới (VD: Creator Analytics, Creator Earnings):
1. Inspect DOM thực tế trên browser
2. Thêm vào Feature Parity Matrix bên trên
3. Tạo `src/pages/creator/<feature>.page.ts`
4. Tạo `src/tests/creator/<feature>.spec.ts`
5. Update file này với behavior matrix của feature mới
