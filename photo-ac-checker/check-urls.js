const path = require('path');
const fs = require('fs');
const readline = require('readline');

// ============================================================================
// Cấu hình HTTP Basic Auth mặc định cho Site Test của Photo-AC
// ============================================================================
const defaultBasicUser = 'acworks';
const defaultBasicPass = 'acworks!@#';

// ANSI Colors for console formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m',
  bgYellow: '\x1b[43m\x1b[30m',
  bgCyan: '\x1b[46m\x1b[30m'
};

// ============================================================================
// Đọc cấu hình từ file .env (nếu có)
// ============================================================================
function loadLocalEnv() {
  const envPaths = [
    path.resolve(__dirname, '.env'),
    path.resolve(__dirname, '..', 'photo-ac', '.env'),
    path.resolve(__dirname, '..', '.env')
  ];

  const config = {};
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const idx = trimmed.indexOf('=');
            if (idx > 0) {
              const key = trimmed.slice(0, idx).trim();
              let val = trimmed.slice(idx + 1).trim();
              if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
              }
              if (!config[key]) config[key] = val;
            }
          }
        });
      } catch (_) { }
    }
  }
  return config;
}

const envVars = loadLocalEnv();

// ============================================================================
// Resolve Playwright from local node_modules
// ============================================================================
let playwright;
try {
  playwright = require('@playwright/test');
} catch (e) {
  try {
    playwright = require(path.resolve(__dirname, '..', 'node_modules', '@playwright/test'));
  } catch (e2) {
    try {
      playwright = require(path.resolve(__dirname, '..', 'photo-ac', 'node_modules', '@playwright/test'));
    } catch (e3) {
      console.error(`${colors.red}Lỗi: Không tìm thấy thư viện @playwright/test. Vui lòng chạy npm run setup hoặc npx playwright install.${colors.reset}`);
      process.exit(1);
    }
  }
}
const { chromium } = playwright;

// ============================================================================
// Danh Sách 46 URLs Kiểm Tra Cho Photo-AC (Public, Creator, Downloader)
// ============================================================================
const PHOTO_URLS = [
  // --------------------------------------------------------------------------
  // 1. PUBLIC PAGES (14 URLs) - Kiểm tra trạng thái khách vãng lai
  // --------------------------------------------------------------------------
  {
    stt: 1,
    role: 'Public',
    category: 'Public',
    path: '/',
    description: 'Trang chủ (Home Page)'
  },
  {
    stt: 2,
    role: 'Public',
    category: 'Public',
    path: '/main/detail/31413996?title=リビングでストレッチをする女性',
    description: 'Chi tiết ảnh (Detail ID 31413996)'
  },
  {
    stt: 3,
    role: 'Public',
    category: 'Public',
    path: '/main/search?q=桜&utm_source=top_keyword',
    description: 'Tìm kiếm từ khóa (桜)'
  },
  {
    stt: 4,
    role: 'Public',
    category: 'Public',
    path: '/profile/23801261',
    description: 'Hồ sơ tác giả (Profile 23801261)'
  },
  {
    stt: 5,
    role: 'Public',
    category: 'Public',
    path: '/ranking',
    description: 'Bảng xếp hạng ảnh tải về (Ranking)'
  },
  {
    stt: 6,
    role: 'Public',
    category: 'Public',
    path: '/models/',
    description: 'Danh sách người mẫu (Models)'
  },
  {
    stt: 7,
    role: 'Public',
    category: 'Public',
    path: '/pickup/1',
    description: 'Bộ sưu tập nổi bật (Pickup 1)'
  },
  {
    stt: 8,
    role: 'Public',
    category: 'Public',
    path: '/main/latest',
    description: 'Ảnh mới nhất (Latest Photos)'
  },
  {
    stt: 9,
    role: 'Public',
    category: 'Public',
    path: '/main/genface',
    description: 'Tạo khuôn mặt AI (Genface)'
  },
  {
    stt: 10,
    role: 'Public',
    category: 'Public',
    path: '/image-generator/',
    description: 'Trình tạo ảnh AI (Image Generator)'
  },
  {
    stt: 11,
    role: 'Public',
    category: 'Public',
    path: '/creator/auth/register',
    description: 'Đăng ký tác giả (Creator Register)'
  },
  {
    stt: 12,
    role: 'Public',
    category: 'Public',
    path: '/ranking/prize',
    description: 'Xếp hạng giải thưởng (Ranking Prize)'
  },
  {
    stt: 13,
    role: 'Public',
    category: 'Public',
    path: '/premium/campaign?target=premium_sozai',
    description: 'Chiến dịch Premium (Campaign)'
  },
  {
    stt: 14,
    role: 'Public',
    category: 'Public',
    path: '/premium/business',
    description: 'Gói Doanh nghiệp (Business Plan)'
  },

  // --------------------------------------------------------------------------
  // 2. CREATOR PAGES (21 URLs) - Yêu cầu đăng nhập tài khoản Creator
  // --------------------------------------------------------------------------
  {
    stt: 15,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/dashboard',
    description: 'Bảng điều khiển Creator (Dashboard)'
  },
  {
    stt: 16,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/list',
    description: 'Danh sách ảnh đã tải lên (Photo List)'
  },
  {
    stt: 17,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/theme',
    description: 'Chủ đề / Yêu cầu chụp ảnh (Themes)'
  },
  {
    stt: 18,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/account/modelreleases',
    description: 'Giấy phát hành người mẫu (Model Releases)'
  },
  {
    stt: 19,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/account/propertyreleases',
    description: 'Giấy phát hành tài sản (Property Releases)'
  },
  {
    stt: 20,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/comments',
    description: 'Quản lý bình luận của người dùng (Comments)'
  },
  {
    stt: 21,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/followers',
    description: 'Danh sách người theo dõi (Followers)'
  },
  {
    stt: 22,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/following',
    description: 'Danh sách đang theo dõi (Following)'
  },
  {
    stt: 23,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/advertising',
    description: 'Quảng cáo & Khuyến mãi (Advertising)'
  },
  {
    stt: 24,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/mtrequests',
    description: 'Yêu cầu tư liệu (Material Requests)'
  },
  {
    stt: 25,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/ranking',
    description: 'Bảng xếp hạng đóng góp Creator'
  },
  {
    stt: 26,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/account/edit',
    description: 'Cài đặt tài khoản Creator (Account Edit)'
  },
  {
    stt: 27,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/profile/edit',
    description: 'Chỉnh sửa hồ sơ Creator (Profile Edit)'
  },
  {
    stt: 28,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/import',
    description: 'Nhập ảnh hàng loạt (Batch Import)'
  },
  {
    stt: 29,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/bitcoin',
    description: 'Địa chỉ nhận thưởng Bitcoin'
  },
  {
    stt: 30,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/account/identity/',
    description: 'Xác minh danh tính (Identity Verification)'
  },
  {
    stt: 31,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/bankinfo/index/',
    description: 'Thông tin tài khoản ngân hàng (Bank Info)'
  },
  {
    stt: 32,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/account/leave',
    description: 'Rời / Hủy tài khoản Creator'
  },
  {
    stt: 33,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/exchange',
    description: 'Đổi điểm thưởng (Points Exchange)'
  },
  {
    stt: 34,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/extralicence',
    description: 'Giấy phép mở rộng (Extra License)'
  },
  {
    stt: 35,
    role: 'Creator',
    category: 'Creator',
    path: '/creator/associate/setting',
    description: 'Cài đặt liên kết (Associate / Affiliate)'
  },

  // --------------------------------------------------------------------------
  // 3. DOWNLOADER PAGES (11 URLs) - Yêu cầu đăng nhập tài khoản Downloader
  // --------------------------------------------------------------------------
  {
    stt: 36,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/dashboard',
    description: 'Trang tổng quan cá nhân (User Dashboard)'
  },
  {
    stt: 37,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/profile/edit',
    description: 'Chỉnh sửa hồ sơ cá nhân (Profile Edit)'
  },
  {
    stt: 38,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/bookmarks',
    description: 'Ảnh đã đánh dấu yêu thích (Bookmarks)'
  },
  {
    stt: 39,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/downloads',
    description: 'Lịch sử tải xuống (Downloads History)'
  },
  {
    stt: 40,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/order/history',
    description: 'Lịch sử đơn hàng / Giao dịch (Order History)'
  },
  {
    stt: 41,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/comments',
    description: 'Lịch sử bình luận đã gửi (Comments)'
  },
  {
    stt: 42,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/following',
    description: 'Danh sách tác giả đang theo dõi (Following)'
  },
  {
    stt: 43,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/receipts',
    description: 'Tải biên lai / Hóa đơn điện tử (Receipts)'
  },
  {
    stt: 44,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/present',
    description: 'Quà tặng nhận được (Present)'
  },
  {
    stt: 45,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/creditcard',
    description: 'Quản lý thẻ tín dụng (Credit Card)'
  },
  {
    stt: 46,
    role: 'Downloader',
    category: 'Downloader',
    path: '/user/mailmaga',
    description: 'Cài đặt bản tin Mail Magazine'
  }
];

// ============================================================================
// Tiện ích xử lý URL & Routing
// ============================================================================
function normalizeUrl(inputUrl, defaultUrl = 'https://www.photo-ac.com') {
  let u = (inputUrl || '').trim();
  if (!u) return defaultUrl;
  if (!u.startsWith('http://') && !u.startsWith('https://')) {
    u = 'https://' + u;
  }
  return u.replace(/\/+$/, '');
}

function sanitizeUrlForDisplay(url) {
  return url.replace(/https:\/\/[^@]+@/, 'https://');
}

// Bỏ qua quảng cáo và analytics để tăng tốc độ kiểm tra
async function setupAdBlocker(context) {
  await context.route('**/*', route => {
    const url = route.request().url();
    if (
      url.includes('googlesyndication.com') ||
      url.includes('doubleclick.net') ||
      url.includes('google-analytics.com') ||
      url.includes('pagead2.googlesyndication.com') ||
      url.includes('adnxs.com') ||
      url.includes('criteo.com')
    ) {
      return route.abort();
    }
    return route.continue();
  });
}

// ============================================================================
// Prompt tương tác với người dùng
// ============================================================================
async function promptUserConfig(cliArgs) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  let envChoice = null;
  let customUrl = null;

  // 1. Phân tích tham số dòng lệnh nếu được truyền vào
  for (const a of cliArgs) {
    const low = a.toLowerCase();
    if (low === '1' || low === '--env=prod' || low === '--prod') envChoice = '1';
    if (low === '2' || low === '--env=test' || low === '--test') envChoice = '2';

    if (a.startsWith('http://') || a.startsWith('https://')) {
      customUrl = a;
    } else if (a.startsWith('--base-url=')) {
      customUrl = a.split('=')[1];
    }
  }

  // Tự động nhận diện nếu truyền URL
  if (customUrl && !envChoice) {
    if (customUrl.includes('photo-ac.com') && !customUrl.includes('test')) {
      envChoice = '1';
    } else {
      envChoice = '2';
    }
  }

  // 2. Nếu chưa có lựa chọn môi trường, hỏi người dùng
  if (!envChoice) {
    console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}       PHOTO-AC URL STATUS CHECKER (CLI TOOL)                           ${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
    console.log(`\n${colors.bright}CHỌN MÔI TRƯỜNG KIỂM TRA:${colors.reset}`);
    console.log(`  ${colors.green}[1] Production${colors.reset} (https://www.photo-ac.com)`);
    console.log(`  ${colors.yellow}[2] Site Test${colors.reset}  (Tự do nhập URL test: test-toan, test-lien...)`);
    console.log(`------------------------------------------------------------------------`);

    const answer = await question(`Nhập lựa chọn của bạn [${colors.bright}1${colors.reset} hoặc ${colors.bright}2${colors.reset}] (Mặc định: 1): `);
    envChoice = answer.trim() === '2' ? '2' : '1';
  }

  // Cấu hình Base URL và tài khoản theo môi trường
  let targetConfig = null;

  if (envChoice === '1') {
    targetConfig = {
      id: 1,
      name: 'Production',
      baseUrl: 'https://www.photo-ac.com',
      downloader: {
        email: envVars.PROD_DOWNLOADER_EMAIL || 'phihoang12b2@gmail.com',
        pass: envVars.PROD_DOWNLOADER_PASSWORD || '12345678'
      },
      creator: {
        email: envVars.PROD_CREATOR_EMAIL || 'phi.qtmax@gmail.com',
        pass: envVars.PROD_CREATOR_PASSWORD || '12345678'
      },
      basicAuth: null
    };
  } else {
    // Option 2: Site Test
    const defaultTestUrl = envVars.BASE_URL ? normalizeUrl(envVars.BASE_URL) : 'https://test-toan.photo-ac.com';
    if (!customUrl) {
      const inputUrl = await question(`👉 Nhập URL Site Test [Enter để dùng ${defaultTestUrl}]: `);
      customUrl = normalizeUrl(inputUrl, defaultTestUrl);
    } else {
      customUrl = normalizeUrl(customUrl, defaultTestUrl);
    }

    // Basic Auth mặc định cho các site test acworks
    const basicAuth = {
      username: envVars.HTTP_USER || defaultBasicUser,
      password: envVars.HTTP_PASS || defaultBasicPass
    };

    targetConfig = {
      id: 2,
      name: 'Site Test',
      baseUrl: customUrl,
      downloader: {
        email: envVars.PREMIUM_USER_EMAIL || envVars.FREE_USER_EMAIL || 'acworks.toannguyen1@gmail.com',
        pass: envVars.PREMIUM_USER_PASSWORD || envVars.FREE_USER_PASSWORD || 'manhtoan123'
      },
      creator: {
        email: envVars.CREATOR_EMAIL || 'acworks.toannguyen1@gmail.com',
        pass: envVars.CREATOR_PASSWORD || 'manhtoan123'
      },
      basicAuth
    };
  }

  // Mặc định luôn luôn quét toàn bộ 46 URLs (All: Public -> Creator -> Downloader)
  targetConfig.scope = 'all';

  rl.close();
  return targetConfig;
}

// ============================================================================
// Luồng Đăng Nhập Downloader (SSO / UI Login)
// ============================================================================
async function loginDownloader(page, targetConfig, timeout = 30000) {
  const { email, pass } = targetConfig.downloader;
  const baseUrl = targetConfig.baseUrl;

  console.log(`\n${colors.cyan}[AUTH] Đang đăng nhập Downloader: ${colors.bright}${email}${colors.reset} ...`);

  // Sử dụng SSO accounts.ac-illust.com chuyển hướng về /auth/sso_login
  const ssoTarget = `${baseUrl}/auth/sso_login?redirect_to=${encodeURIComponent(baseUrl + '/user/dashboard')}`;
  const ssoUrl = `https://accounts.ac-illust.com/login?serviceURL=${encodeURIComponent(ssoTarget)}&lang=jp`;

  try {
    await page.goto(ssoUrl, { waitUntil: 'domcontentloaded', timeout }).catch(() => null);

    const emailInput = page.locator('#email, input[name="email"], input[type="email"]').first();
    const passInput = page.locator('#password, input[name="password"], input[type="password"]').first();
    const submitBtn = page.locator('button[type="submit"], input[type="submit"], button:has-text("ログイン")').first();

    if (await emailInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await emailInput.fill(email);
      await passInput.fill(pass);
      await Promise.all([
        page.waitForNavigation({ timeout, waitUntil: 'domcontentloaded' }).catch(() => { }),
        submitBtn.click()
      ]);
    } else {
      // Cách 2: Điều hướng tới trang chủ và click nút đăng nhập
      await page.goto(baseUrl + '/', { waitUntil: 'domcontentloaded', timeout });
      const loginBtn = page.getByRole('button', { name: /ログイン/ }).first();
      if (await loginBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
        await loginBtn.click();
        const dlBtn = page.locator('text=ダウンロードユーザー').first();
        if (await dlBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
          await dlBtn.click();
          await page.waitForNavigation({ timeout: 10000, waitUntil: 'domcontentloaded' }).catch(() => { });
        }
      }

      const pEmail = page.locator('#email, input[name="email"], input[type="email"]').first();
      const pPass = page.locator('#password, input[name="password"], input[type="password"]').first();
      if (await pEmail.isVisible({ timeout: 5000 }).catch(() => false)) {
        await pEmail.fill(email);
        await pPass.fill(pass);
        await Promise.all([
          page.waitForNavigation({ timeout, waitUntil: 'domcontentloaded' }).catch(() => { }),
          page.locator('button[type="submit"], input[type="submit"]').first().click()
        ]);
      }
    }

    // Kiểm tra trang /user/dashboard để xác nhận phiên đăng nhập
    await page.goto(baseUrl + '/user/dashboard', { waitUntil: 'domcontentloaded', timeout }).catch(() => { });
    console.log(`${colors.green}[AUTH] Đăng nhập Downloader thành công! (URL: ${page.url()})${colors.reset}`);
  } catch (err) {
    console.log(`${colors.yellow}[AUTH] Lưu ý đăng nhập Downloader: ${err.message}${colors.reset}`);
  }
}

// ============================================================================
// Luồng Đăng Nhập Creator (Modal / Sign-in Dialog)
// ============================================================================
async function loginCreator(page, targetConfig, timeout = 30000) {
  const { email, pass } = targetConfig.creator;
  const baseUrl = targetConfig.baseUrl;

  console.log(`\n${colors.cyan}[AUTH] Đang đăng nhập Creator: ${colors.bright}${email}${colors.reset} ...`);

  try {
    // 1. Mở trang chủ
    await page.goto(baseUrl + '/', { waitUntil: 'domcontentloaded', timeout });

    // 2. Click nút Login trên Header
    const loginBtn = page.getByRole('button', { name: /ログイン/ }).first();
    if (await loginBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await loginBtn.click();

      // 3. Click tùy chọn クリエイターログイン (Creator)
      const creatorOption = page.getByRole('link', { name: /クリエイターログイン/ })
        .or(page.locator('a:has-text("クリエイターログイン")'))
        .or(page.getByRole('button', { name: /クリエイター/ }))
        .or(page.locator('button:has-text("クリエイター")'))
        .first();

      if (await creatorOption.isVisible({ timeout: 5000 }).catch(() => false)) {
        await creatorOption.click();
      }
    }

    // 4. Modal đăng nhập Creator xuất hiện
    const creatorDialog = page.getByRole('dialog').or(page.locator('.modal.show, [class*="modal"]')).first();
    const cEmailInput = creatorDialog.getByPlaceholder('メールアドレス').or(creatorDialog.locator('input[name="email"], input[type="email"], #email')).first();
    const cPassInput = creatorDialog.getByPlaceholder('パスワード').or(creatorDialog.locator('input[name="password"], input[type="password"], #password')).first();
    const cSubmitBtn = creatorDialog.locator('button[type="submit"]').or(creatorDialog.getByRole('button', { name: /ログイン|口グイン/ })).first();

    if (await cEmailInput.isVisible({ timeout: 6000 }).catch(() => false)) {
      await cEmailInput.fill(email);
      await cPassInput.fill(pass);
      await Promise.all([
        page.waitForNavigation({ timeout, waitUntil: 'domcontentloaded' }).catch(() => { }),
        cSubmitBtn.click()
      ]);
    } else {
      // Fallback: Thử truy cập thẳng dashboard để kích hoạt form login nếu có
      await page.goto(baseUrl + '/creator/dashboard', { waitUntil: 'domcontentloaded', timeout }).catch(() => { });
      const fallbackEmail = page.locator('#email, #userid, input[name="email"], input[name="userid"]').first();
      const fallbackPass = page.locator('#password, #passwd, input[name="password"], input[name="passwd"]').first();
      const fallbackSubmit = page.locator('button[type="submit"], input[type="submit"]').first();

      if (await fallbackEmail.isVisible({ timeout: 4000 }).catch(() => false)) {
        await fallbackEmail.fill(email);
        await fallbackPass.fill(pass);
        await Promise.all([
          page.waitForNavigation({ timeout, waitUntil: 'domcontentloaded' }).catch(() => { }),
          fallbackSubmit.click()
        ]);
      }
    }

    // Xác nhận vào dashboard
    await page.goto(baseUrl + '/creator/dashboard', { waitUntil: 'domcontentloaded', timeout }).catch(() => { });
    console.log(`${colors.green}[AUTH] Đăng nhập Creator thành công! (URL: ${page.url()})${colors.reset}`);
  } catch (err) {
    console.log(`${colors.yellow}[AUTH] Lưu ý đăng nhập Creator: ${err.message}${colors.reset}`);
  }
}

// ============================================================================
// Kiểm tra danh sách URLs và in kết quả trực tiếp ra Console
// ============================================================================
async function checkUrlBatch(items, page, baseUrl, timeout, startOffset, totalAll) {
  const results = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const targetUrl = baseUrl + item.path;
    const globalIdx = startOffset + i + 1;
    const padIdx = `[${String(globalIdx).padStart(2, '0')}/${String(totalAll).padStart(2, '0')}]`;
    const padRole = `[${item.role}]`.padEnd(13, ' ');

    const startTime = Date.now();
    let status = null;
    let is200 = false;
    let errorMsg = null;

    try {
      let response = await page.goto(targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout
      });

      // Nếu gặp mã 202 do AWS WAF JS Challenge, đợi giải quyết thử thách
      if (response && response.status() === 202) {
        const nextDoc = await page.waitForResponse(
          res => res.request().resourceType() === 'document' && res.status() !== 202,
          { timeout: 12000 }
        ).catch(() => null);

        if (nextDoc) {
          if (nextDoc.status() >= 300 && nextDoc.status() < 400) {
            const finalDoc = await page.waitForResponse(
              res => res.request().resourceType() === 'document' && res.status() < 300,
              { timeout: 8000 }
            ).catch(() => null);
            response = finalDoc || nextDoc;
          } else {
            response = nextDoc;
          }
        }
      }

      const durationMs = Date.now() - startTime;
      if (response) {
        status = response.status();
        is200 = status === 200;
      } else {
        status = 'ERR';
        errorMsg = 'No response';
      }

      const padDuration = `${durationMs}ms`.padStart(7, ' ');
      let badge = '';

      if (status === 200) {
        badge = `${colors.bgGreen} 200 OK ${colors.reset}`;
      } else if (status >= 300 && status < 400) {
        badge = `${colors.bgYellow} ${status} REDIRECT ${colors.reset}`;
      } else if (status >= 400 && status < 500) {
        badge = `${colors.bgRed} ${status} CLIENT ERR ${colors.reset}`;
      } else if (status >= 500) {
        badge = `${colors.bgRed} ${status} SERVER ERR ${colors.reset}`;
      } else {
        badge = `${colors.bgRed} ${status} ${colors.reset}`;
      }

      const displayUrl = sanitizeUrlForDisplay(targetUrl);
      console.log(` ${colors.dim}${padIdx}${colors.reset} ${colors.cyan}${padRole}${colors.reset} ${badge} ${colors.gray}${padDuration}${colors.reset} | ${colors.bright}${displayUrl}${colors.reset}`);

      results.push({
        stt: item.stt,
        role: item.role,
        description: item.description,
        url: displayUrl,
        status,
        durationMs,
        is200
      });
    } catch (err) {
      const durationMs = Date.now() - startTime;
      const padDuration = `${durationMs}ms`.padStart(7, ' ');
      const badge = `${colors.bgRed} TIMEOUT / ERR ${colors.reset}`;
      const displayUrl = sanitizeUrlForDisplay(targetUrl);
      console.log(` ${colors.dim}${padIdx}${colors.reset} ${colors.cyan}${padRole}${colors.reset} ${badge} ${colors.gray}${padDuration}${colors.reset} | ${colors.bright}${displayUrl}${colors.reset} ${colors.red}(${err.message})${colors.reset}`);

      results.push({
        stt: item.stt,
        role: item.role,
        description: item.description,
        url: displayUrl,
        status: 'ERR',
        durationMs,
        is200: false,
        error: err.message
      });
    }
  }

  return results;
}

// ============================================================================
// In Bảng Tổng Kết Scorecard
// ============================================================================
function printScorecard(results, totalTimeMs, targetConfig) {
  const total = results.length;
  const count200 = results.filter(r => r.is200).length;
  const countRedirect = results.filter(r => typeof r.status === 'number' && r.status >= 300 && r.status < 400).length;
  const countClientErr = results.filter(r => typeof r.status === 'number' && r.status >= 400 && r.status < 500).length;
  const countServerErr = results.filter(r => typeof r.status === 'number' && r.status >= 500).length;
  const countNetworkErr = results.filter(r => r.status === 'ERR').length;
  const rate200 = total > 0 ? ((count200 / total) * 100).toFixed(1) : '0.0';

  console.log('\n' + colors.cyan + '='.repeat(78) + colors.reset);
  console.log(`${colors.bright}${colors.cyan}                     BẢNG TỔNG KẾT KIỂM TRA STATUS URL PHOTO-AC                   ${colors.reset}`);
  console.log(colors.cyan + '='.repeat(78) + colors.reset);
  console.log(` Môi trường kiểm tra    : ${colors.bright}${targetConfig.name.toUpperCase()} (${targetConfig.baseUrl})${colors.reset}`);
  console.log(` Phạm vi kiểm tra       : ${colors.bright}TOÀN BỘ 46 URLs (Public + Creator + Downloader)${colors.reset}`);
  console.log(` Tổng số link test      : ${colors.bright}${total} URLs${colors.reset}`);
  console.log(` ----------------------------------------------------------------------------`);
  console.log(` ${colors.green}Status 200 OK          : ${count200}/${total} (${rate200}%)${colors.reset}`);
  console.log(` ${colors.yellow}Chuyển hướng (3xx)     : ${countRedirect}${colors.reset}`);
  console.log(` ${colors.red}Lỗi Client (4xx)       : ${countClientErr}${colors.reset}`);
  console.log(` ${colors.red}Lỗi Server (5xx)       : ${countServerErr}${colors.reset}`);
  console.log(` ${colors.magenta}Lỗi mạng / Timeout     : ${countNetworkErr}${colors.reset}`);
  console.log(` ----------------------------------------------------------------------------`);
  console.log(` Tổng thời gian kiểm tra : ${colors.bright}${(totalTimeMs / 1000).toFixed(2)}s${colors.reset}`);

  // In danh sách các link không đạt 200 OK (nếu có)
  const failedItems = results.filter(r => !r.is200);
  if (failedItems.length > 0) {
    console.log(`\n${colors.red}${colors.bright}DANH SÁCH LINK CẦN LƯU Ý (${failedItems.length} link không trả về 200 OK):${colors.reset}`);
    failedItems.forEach(f => {
      console.log(` - [${f.status}] [${f.role}] ${f.url} (${f.description})`);
    });
  } else {
    console.log(`\n${colors.green}${colors.bright}🎉 Tuyệt vời! 100% URLs Photo-AC đều trả về HTTP Status 200 OK!${colors.reset}`);
  }

  console.log(colors.cyan + '='.repeat(78) + colors.reset + '\n');
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================
async function main() {
  const args = process.argv.slice(2);
  const targetConfig = await promptUserConfig(args);
  const isHeaded = args.includes('--headed');
  const timeout = 25000;

  console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}       BẮT ĐẦU KIỂM TRA PHOTO-AC URLS (46 URLS)                         ${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(` Môi trường  : ${colors.bright}${colors.green}${targetConfig.name.toUpperCase()} (${targetConfig.baseUrl})${colors.reset}`);
  console.log(` Tổng số link: ${colors.bright}46 URLs (Public: 14, Creator: 21, Downloader: 11)${colors.reset}`);
  console.log(` Downloader  : ${colors.bright}${targetConfig.downloader.email}${colors.reset}`);
  console.log(` Creator     : ${colors.bright}${targetConfig.creator.email}${colors.reset}`);
  console.log(`${colors.cyan}------------------------------------------------------------------------${colors.reset}`);

  const publicItems = PHOTO_URLS.filter(i => i.role === 'Public');
  const creatorItems = PHOTO_URLS.filter(i => i.role === 'Creator');
  const downloaderItems = PHOTO_URLS.filter(i => i.role === 'Downloader');
  const totalAll = PHOTO_URLS.length;

  const startTimeGlobal = Date.now();
  const browser = await chromium.launch({ headless: !isHeaded });
  const allResults = [];

  const contextOptions = {
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  if (targetConfig.basicAuth) {
    contextOptions.httpCredentials = {
      username: targetConfig.basicAuth.username,
      password: targetConfig.basicAuth.password
    };
  }

  let offset = 0;

  try {
    // ------------------------------------------------------------------------
    // BƯỚC 1: KIỂM TRA 14 PUBLIC PAGES (Không cần đăng nhập)
    // ------------------------------------------------------------------------
    if (publicItems.length > 0) {
      console.log(`\n${colors.bright}--- [1/3] KIỂM TRA TRẠNG THÁI PUBLIC PAGES (${publicItems.length} links) ---${colors.reset}`);
      const publicContext = await browser.newContext(contextOptions);
      await setupAdBlocker(publicContext);
      const publicPage = await publicContext.newPage();

      const resPublic = await checkUrlBatch(
        publicItems,
        publicPage,
        targetConfig.baseUrl,
        timeout,
        offset,
        totalAll
      );
      allResults.push(...resPublic);
      offset += publicItems.length;
      await publicContext.close();
    }

    // ------------------------------------------------------------------------
    // BƯỚC 2: ĐĂNG NHẬP CREATOR & KIỂM TRA 21 CREATOR PAGES
    // ------------------------------------------------------------------------
    if (creatorItems.length > 0) {
      console.log(`\n${colors.bright}--- [2/3] ĐĂNG NHẬP CREATOR & KIỂM TRA CREATOR PAGES (${creatorItems.length} links) ---${colors.reset}`);
      const creatorContext = await browser.newContext(contextOptions);
      await setupAdBlocker(creatorContext);
      const creatorPage = await creatorContext.newPage();

      await loginCreator(creatorPage, targetConfig, timeout);

      const resCreator = await checkUrlBatch(
        creatorItems,
        creatorPage,
        targetConfig.baseUrl,
        timeout,
        offset,
        totalAll
      );
      allResults.push(...resCreator);
      offset += creatorItems.length;
      await creatorContext.close();
    }

    // ------------------------------------------------------------------------
    // BƯỚC 3: ĐĂNG NHẬP DOWNLOADER & KIỂM TRA 11 DOWNLOADER PAGES
    // ------------------------------------------------------------------------
    if (downloaderItems.length > 0) {
      console.log(`\n${colors.bright}--- [3/3] ĐĂNG NHẬP DOWNLOADER & KIỂM TRA DOWNLOADER PAGES (${downloaderItems.length} links) ---${colors.reset}`);
      const downloaderContext = await browser.newContext(contextOptions);
      await setupAdBlocker(downloaderContext);
      const downloaderPage = await downloaderContext.newPage();

      await loginDownloader(downloaderPage, targetConfig, timeout);

      const resDownloader = await checkUrlBatch(
        downloaderItems,
        downloaderPage,
        targetConfig.baseUrl,
        timeout,
        offset,
        totalAll
      );
      allResults.push(...resDownloader);
      offset += downloaderItems.length;
      await downloaderContext.close();
    }

  } finally {
    await browser.close();
  }

  const totalTimeMs = Date.now() - startTimeGlobal;
  printScorecard(allResults, totalTimeMs, targetConfig);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Lỗi thực thi:', err);
    process.exit(1);
  });
}

module.exports = { main, PHOTO_URLS };
