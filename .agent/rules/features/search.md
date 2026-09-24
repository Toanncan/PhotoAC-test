---
trigger: model_decision
---

# Feature Catalog: Search & Filters — Photo-AC & Illust-AC

> Load rule này khi làm việc với bất kỳ task nào liên quan đến:
> Search, Filter Toolbar, Sort, Pagination, Search Limit, Image Upload Search.

---

## Nhận Biết Site Qua Đường Dẫn File

| Đường dẫn chứa | Site | Domain |
|---|---|---|
| `photo-ac/` | **Photo-AC** | `photo-ac.com` |
| `illust-ac/` | **Illust-AC** | `ac-illust.com` |

---

## Feature Parity Matrix — Search & Filters

| Tính năng / Filter | Photo-AC | Illust-AC | Ghi chú |
|---|:---:|:---:|---|
| **Định dạng: JPEG** | ✅ | ❌ | Photo-AC only |
| **Định dạng: PSD** | ✅ | ❌ | Photo-AC only |
| **Định dạng: M-size / L-size** | ✅ | ❌ | Photo-AC only (`sizesec=m/l`) |
| **Định dạng: Vector (EPS/AI)** | ❌ | ✅ | Illust-AC only (`format=vector`) |
| **Định dạng: PNG** | ❌ | ✅ | Illust-AC only (`format=png`) |
| **AI Search Toggle** | ✅ | ❌ | Photo-AC: `.search-by-ai` trên DOM; Illust-AC: hoàn toàn không có |
| **Model Release filter** | ✅ | ❌ | Photo-AC only (`mdlrlrsec=on`) |
| **Property Release filter** | ✅ | ❌ | Photo-AC only (`prprlrsec=on`) |
| **People Count filter** | ✅ | ❌ | Photo-AC only (0 người / 1 người / 3+ người) |
| **Age filter** | ✅ | ❌ | Photo-AC only (`age=W` - 若者) |
| **AI Face Search** | ✅ | ❌ | Photo-AC only (trang detail ảnh người) |
| **Category filter** | ✅ | ✅ | Khác nhau về `c_id` mapping |
| **Color filter** | ✅ | ✅ | Cùng cơ chế (`color=rrggbb`) |
| **Orientation filter** | ✅ | ✅ | Cùng cơ chế (`orientation=0/1`) |
| **Exclude AI filter** | ✅ | ✅ | Cùng cơ chế (`exclude_ai=on`) |
| **Exact Match filter** | ✅ | ✅ | Cùng cơ chế (`type_search=phrase`) |
| **Exclude Keyword** | ✅ | ✅ | Cùng cơ chế (`nq=`) |
| **Creator / NG Creator** | ✅ | ✅ | Cùng cơ chế (Detailed Search) |
| **Photo/Illust ID Search** | ✅ | ✅ | Cùng cơ chế (`qid=`) |
| **Image Upload Search** | ✅ | ✅ | Cùng cơ chế |
| **Recommended Search** | ✅ | ✅ | Cùng cơ chế (`rcm=1`) |
| **Sort: 新着順** | ✅ | ✅ | Cùng cơ chế (`srt=-releasedate`) |
| **Sort: 人気順** | ✅ | ✅ | Bị chặn Guest/Free; cho phép Premium (`srt=recent_popular`) |
| **Display Count: 70** | ✅ | ✅ | Guest / Free User default |
| **Display Count: 210** | ✅ | ✅ | Premium User privilege |
| **Search Limit: 4 lần/ngày** | ✅ | ✅ | Guest + Free User |
| **Heading format kết quả** | `「kw」の写真素材` | `「kw」のイラスト素材` | Khác nhau |
| **Image Upload heading** | `アップロードされた画像に似ている写真素材` | `アップロードされた画像に似ているイラスト素材` | Khác nhau |

---

## Search Limit Modal — Phân Biệt Theo Role

| Element | Guest | Free User | Premium |
|---|---|---|---|
| Modal hiển thị | ✅ (4 lần/ngày) | ✅ (4 lần/ngày) | ❌ (không giới hạn) |
| `searchLimitRegisterCta` (Đăng ký nhận PT) | ✅ Visible | ❌ Hidden | N/A |
| `searchLimitCouponButton` (Dùng vé) | ❌ Hidden | ✅ Visible | N/A |
| `searchLimitPremiumLink` | ✅ Visible | ✅ Visible | N/A |
| **Network mock để test** | `is_enable_search` → `search_zancnt: 0` | `is_enable_search` → `search_zancnt: 0` | Không cần mock |

---

## Quy Trình Bắt Buộc Khi Viết Search Test

```
1. Đọc đường dẫn file → xác định site (photo-ac/ hay illust-ac/)
2. Tra Feature Parity Matrix trên → xác nhận filter TỒN TẠI trên site
3. Nếu không chắc → MỞ BROWSER inspect DOM (KHÔNG ĐOÁN)
4. Nếu filter KHÔNG TỒN TẠI → KHÔNG viết test, báo User
```

## Ví Dụ Sai (Cần Tránh)

```typescript
// ❌ SAI: illust-ac/ nhưng test AI Search
await searchResultPage.toggleAiSearch(true); // KHÔNG TỒN TẠI trên Illust-AC!

// ❌ SAI: photo-ac/ nhưng dùng format=vector  
await searchResultPage.selectFormat('vector'); // Chỉ có trên Illust-AC!

// ✅ ĐÚNG: Kiểm tra path → photo-ac/ → dùng PSD
await searchResultPage.selectFormat('psd'); // PSD tồn tại trên Photo-AC
```
