---
trigger: model_decision
---

# Feature Catalog: Auth & Session Management — Photo-AC & Illust-AC

> Load rule này khi làm việc với bất kỳ task nào liên quan đến:
> Login, Logout, Setup session, Auth fixtures, `.auth/*.json` management.

---

## 4 Roles — Session Matrix

| Vai trò | Biến `.env` | Setup Chromium | Setup Firefox | StorageState Chromium | StorageState Firefox | Project |
|---|---|---|---|---|---|---|
| **Guest** | *Không cần* | *Không cần* | *Không cần* | `cookies: []` | `cookies: []` | `chromium-guest` / `firefox-guest` |
| **Free User** | `FREE_USER_EMAIL` / `FREE_USER_PASSWORD` | `free-user.setup.ts` | `free-user-firefox.setup.ts` | `.auth/free-user.json` | `.auth/free-user-firefox.json` | `chromium-free-user` / `firefox-free-user` |
| **Premium User** | `PREMIUM_USER_EMAIL` / `PREMIUM_USER_PASSWORD` | `premium-user.setup.ts` | `premium-user-firefox.setup.ts` | `.auth/premium-user.json` | `.auth/premium-user-firefox.json` | `chromium-downloader` / `firefox-downloader` |
| **Creator** | `CREATOR_EMAIL` / `CREATOR_PASSWORD` | `creator.setup.ts` | `creator-firefox.setup.ts` | `.auth/creator.json` | `.auth/creator-firefox.json` | `chromium-creator` / `firefox-creator` |

---

## Quy Tắc Session Isolation (BẮT BUỘC)

```typescript
// ✅ ĐÚNG — Guest: cô lập hoàn toàn trong spec
test.use({ storageState: { cookies: [], origins: [] } });

// ✅ ĐÚNG — Free/Premium/Creator: để project config inject
// Không cần khai báo trong spec file

// ❌ SAI — Hardcode path trong spec
test.use({ storageState: '.auth/premium-user.json' }); // KHÔNG ĐƯỢC

// ❌ SAI — Dùng chung session Chromium và Firefox
// TUYỆT ĐỐI CẤM: chromium-free-user dùng free-user-firefox.json
```

---

## `.auth/*.json` — Quy Tắc Bảo Vệ

- **CẤM** tự ý sửa, xóa, hoặc ghi đè file `.auth/*.json` trong test spec.
- Các file này được sinh tự động bởi `*.setup.ts` khi chạy global setup.
- Nếu session hết hạn: **Xóa file `.auth/*.json` và chạy lại setup** — không sửa thủ công.

---

## Thêm Role Mới

Khi dự án có thêm role mới (VD: `moderator`, `admin`):
1. Thêm biến env vào `.env` và `.env.example`
2. Tạo `src/tests/auth/moderator.setup.ts` (copy từ `free-user.setup.ts`)
3. Thêm project mới vào `playwright.config.ts`
4. Thêm vào Session Matrix bên trên
5. KHÔNG sửa `base.fixture.ts` trừ khi thực sự cần fixture mới
