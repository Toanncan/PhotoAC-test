---
trigger: model_decision
---

# Feature Catalog: [TÊN FEATURE] — Photo-AC & Illust-AC

> Load rule này khi làm việc với bất kỳ task nào liên quan đến:
> [Mô tả ngắn: VD: Checkout flow, Payment, Subscription management]

---

## Feature Parity Matrix — [TÊN FEATURE]

| Tính năng | Photo-AC | Illust-AC | Ghi chú |
|---|:---:|:---:|---|
| **[Sub-feature 1]** | ✅ | ✅ | Ghi chú kỹ thuật |
| **[Sub-feature 2]** | ✅ | ❌ | Photo-AC only — lý do |
| **[Sub-feature 3]** | ❌ | ✅ | Illust-AC only — lý do |

> ⚠️ Nếu chưa inspect DOM thực tế → KHÔNG điền vào bảng, để trống và ghi "Cần verify".

---

## Behavior Matrix — Theo Role

| Hành vi | Guest | Free | Premium | Creator |
|---|:---:|:---:|:---:|:---:|
| [Hành vi 1] | ❌ | ✅ | ✅ | N/A |
| [Hành vi 2] | ❌ | ❌ | ✅ | N/A |

---

## URL Patterns

| Action | Photo-AC URL | Illust-AC URL |
|---|---|---|
| [Action 1] | `/path/to/page` | `/path/to/page` |

---

## Utilities Bắt Buộc Tái Sử Dụng

```typescript
// Liệt kê utility nào phải dùng cho feature này:
// VD: PdfUtils, EmailVerificationHelper, test-data.ts
```

---

## Quy Trình Bắt Buộc Khi Viết Test Cho Feature Này

```
1. [Bước đặc thù của feature]
2. Mở browser → inspect DOM → lấy locators thực tế
3. Kiểm tra feature có trên site không (photo-ac vs illust-ac)
4. Verify behavior theo Role matrix bên trên
```

---

## Hướng Dẫn Mở Rộng (Khi Có Sub-Feature Mới)

1. Inspect DOM thực tế trên browser
2. Thêm vào Feature Parity Matrix bên trên (✅/❌ rõ ràng)
3. Tạo Page Object: `src/pages/<role>/<feature>.page.ts`
4. Tạo Spec: `src/tests/<role>/<feature>.spec.ts`
5. Update Behavior Matrix nếu behavior thay đổi theo role
