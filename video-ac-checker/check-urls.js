const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Cấu hình HTTP Basic Auth mặc định cho Site Test của Video-AC
const defaultBasicUser = 'flux';
const defaultBasicPass = 'flux1234';

// Cấu hình HTTP Basic Auth riêng cho test.photo-ac.com
const photoAcBasicUser = 'acworks';
const photoAcBasicPass = 'acworks!@#';

// Gán routing tự động chèn header Authorization riêng cho test.photo-ac.com
async function applyContextRouting(context, envId) {
  if (envId === 2) {
    const photoAcAuth = 'Basic ' + Buffer.from(`${photoAcBasicUser}:${photoAcBasicPass}`).toString('base64');
    await context.route('**/*test.photo-ac.com/**', async route => {
      const headers = {
        ...route.request().headers(),
        'authorization': photoAcAuth
      };
      await route.continue({ headers });
    });
  }
}

// Resolve Playwright from local node_modules
let playwright;
try {
  playwright = require('@playwright/test');
} catch (e) {
  try {
    playwright = require(path.resolve(__dirname, '..', 'node_modules', '@playwright/test'));
  } catch (e2) {
    console.error('Lỗi: Không tìm thấy thư viện @playwright/test.');
    process.exit(1);
  }
}
const { chromium } = playwright;

// ----------------------------------------------------------------------------
// Danh Sách 30 URLs Từ Google Sheet "VideoAC" (Hàng 43 - 72)
// ----------------------------------------------------------------------------
const SHEET_URLS = [
  // Downloader Pages
  { stt: 1, category: 'Downloader', path: '/', fullUrl: 'https://video-ac.com/', description: 'Home Page' },
  { stt: 2, category: 'Downloader', path: '/user/dashboard', fullUrl: 'https://video-ac.com/user/dashboard', description: 'User Dashboard' },
  { stt: 3, category: 'Downloader', path: '/user/edit', fullUrl: 'https://video-ac.com/user/edit', description: 'User Edit Profile' },
  { stt: 4, category: 'Downloader', path: '/user/downloads', fullUrl: 'https://video-ac.com/user/downloads', description: 'Download History' },
  { stt: 5, category: 'Downloader', path: '/user/present', fullUrl: 'https://video-ac.com/user/present', description: 'User Present' },
  { stt: 6, category: 'Downloader', path: '/user/receipt', fullUrl: 'https://video-ac.com/user/receipt', description: 'User Receipts' },
  { stt: 7, category: 'Downloader', path: '/user/1', fullUrl: 'https://video-ac.com/user/1', description: 'User Detail ID 1' },
  { stt: 8, category: 'Downloader', path: '/video/discovery?search=%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9', fullUrl: 'https://video-ac.com/video/discovery?search=%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9', description: 'Video Discovery Search' },
  { stt: 9, category: 'Downloader', path: '/about-us', fullUrl: 'https://video-ac.com/about-us', description: 'About Us' },
  { stt: 10, category: 'Downloader', path: '/privacy-policy/', fullUrl: 'https://video-ac.com/privacy-policy/', description: 'Privacy Policy' },
  { stt: 11, category: 'Downloader', path: '/sitemap', fullUrl: 'https://video-ac.com/sitemap', description: 'Sitemap' },
  { stt: 12, category: 'Downloader', path: null, fullUrl: 'https://test.photo-ac.com/premium/campaign?ref=videoAC', description: 'Premium Campaign' },

  // Creator Pages
  { stt: 13, category: 'Creator', path: '/', fullUrl: 'https://video-ac.com/', description: 'Creator Home' },
  { stt: 14, category: 'Creator', path: '/video/discovery?search=%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9', fullUrl: 'https://video-ac.com/video/discovery?search=%E3%82%AD%E3%83%A9%E3%82%AD%E3%83%A9', description: 'Creator Search' },
  { stt: 15, category: 'Creator', path: '/creator/dashboard', fullUrl: 'https://video-ac.com/creator/dashboard', description: 'Creator Dashboard' },
  { stt: 16, category: 'Creator', path: '/creator/exchange', fullUrl: 'https://video-ac.com/creator/exchange', description: 'Points Exchange' },
  { stt: 17, category: 'Creator', path: '/creator/news', fullUrl: 'https://video-ac.com/creator/news', description: 'Creator News' },
  { stt: 18, category: 'Creator', path: '/creator/list', fullUrl: 'https://video-ac.com/creator/list', description: 'Materials List' },
  { stt: 19, category: 'Creator', path: '/creator/upload', fullUrl: 'https://video-ac.com/creator/upload', description: 'Upload Material' },
  { stt: 20, category: 'Creator', path: '/creator/comment', fullUrl: 'https://video-ac.com/creator/comment', description: 'Manage Comments' },
  { stt: 21, category: 'Creator', path: '/creator/followers', fullUrl: 'https://video-ac.com/creator/followers', description: 'Manage Followers' },
  { stt: 22, category: 'Creator', path: '/creator/following', fullUrl: 'https://video-ac.com/creator/following', description: 'Manage Following' },
  { stt: 23, category: 'Creator', path: '/creator/account/edit', fullUrl: 'https://video-ac.com/creator/account/edit', description: 'Account Settings' },
  { stt: 24, category: 'Creator', path: '/creator/profile/edit', fullUrl: 'https://video-ac.com/creator/profile/edit', description: 'Profile Edit' },
  { stt: 25, category: 'Creator', path: '/creator/bitcoin', fullUrl: 'https://video-ac.com/creator/bitcoin', description: 'Bitcoin Rewards' },
  { stt: 26, category: 'Creator', path: '/creator/ident', fullUrl: 'https://video-ac.com/creator/ident', description: 'Identity Verification' },
  { stt: 27, category: 'Creator', path: '/creator/bankInfo', fullUrl: 'https://video-ac.com/creator/bankInfo', description: 'Bank Information' },
  { stt: 28, category: 'Creator', path: '/creator/modelreleases', fullUrl: 'https://video-ac.com/creator/modelreleases', description: 'Model Releases' },
  { stt: 29, category: 'Creator', path: '/creator/propertyreleases', fullUrl: 'https://video-ac.com/creator/propertyreleases', description: 'Property Releases' },
  { stt: 30, category: 'Creator', path: '/creator/account/leave', fullUrl: 'https://video-ac.com/creator/account/leave', description: 'Deactivate Account' }
];

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
  bgYellow: '\x1b[43m\x1b[30m'
};

function normalizeUrl(inputUrl, defaultUrl = 'https://video-ac.com') {
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

function resolveTargetUrl(item, baseUrl, envId) {
  if (item.stt === 12 || item.stt === 42 || item.description === 'Premium Campaign') {
    return envId === 2
      ? `https://${encodeURIComponent(photoAcBasicUser)}:${encodeURIComponent(photoAcBasicPass)}@test.photo-ac.com/premium/campaign?ref=videoAC`
      : 'https://www.photo-ac.com/premium/campaign?ref=videoAC';
  }
  if (item.path !== null && item.path !== undefined) {
    return baseUrl + item.path;
  }
  return item.fullUrl;
}

// ----------------------------------------------------------------------------
// Prompt tương tác với người dùng
// ----------------------------------------------------------------------------
async function promptUserConfig(cliArgs) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  let choice = null;
  let customUrl = null;

  // Parse command line arguments if present
  for (const a of cliArgs) {
    if (a === '1' || a === '--env=prod' || a === '--prod') choice = '1';
    if (a === '2' || a === '--env=test' || a === '--test') choice = '2';
    if (a.startsWith('http://') || a.startsWith('https://')) {
      customUrl = a;
    } else if (a.startsWith('--base-url=')) {
      customUrl = a.split('=')[1];
    }
  }

  // Tự động nhận diện nếu người dùng truyền URL trực tiếp
  if (customUrl && !choice) {
    if (customUrl.includes('video-ac.com') && !customUrl.includes('test')) {
      choice = '1';
    } else {
      choice = '2';
    }
  }

  if (!choice) {
    console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}      VIDEO-AC STATUS CHECKER               ${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
    console.log(`\n${colors.bright}CHỌN 1 TRONG 2 OPTION ĐỂ CHẠY:${colors.reset}`);
    console.log(`  ${colors.green}[1] Production${colors.reset} (https://video-ac.com)`);
    console.log(`\n  ${colors.yellow}[2] Site Test${colors.reset}  (Tự do nhập URL site test)`);
    console.log(`------------------------------------------------------------------------`);

    const answer = await question(`Nhập lựa chọn của bạn [${colors.bright}1${colors.reset} hoặc ${colors.bright}2${colors.reset}] (Mặc định 1): `);
    choice = answer.trim() === '2' ? '2' : '1';
  }

  // Cấu hình dựa trên lựa chọn
  let targetConfig = null;

  if (choice === '1') {
    targetConfig = {
      id: 1,
      name: 'Production',
      baseUrl: 'https://video-ac.com',
      downloader: {
        email: 'phihoang12b2@gmail.com',
        pass: '123456768'
      },
      creator: {
        email: 'khanhnguyen3984610275+999@gmail.com',
        pass: '123456'
      },
      basicAuth: null
    };
  } else {
    // Option 2: Site Test -> Chỉ cần URL, tự động áp dụng defaultBasicUser và defaultBasicPass đã define
    if (!customUrl) {
      // console.log(`\n${colors.yellow}>> BẠN ĐÃ CHỌN SITE TEST (Mặc định Basic Auth: ${defaultBasicUser}:${defaultBasicPass})${colors.reset}`);
      const inputUrl = await question(`👉 Nhập URL Site Test [Enter để dùng https://test.video-ac.com]: `);
      customUrl = normalizeUrl(inputUrl, 'https://test.video-ac.com');
    } else {
      customUrl = normalizeUrl(customUrl, 'https://test.video-ac.com');
    }

    // Tự động sử dụng HTTP Basic Auth mặc định đã define (flux / flux1234), không hỏi người dùng
    const basicAuth = {
      username: defaultBasicUser,
      password: defaultBasicPass
    };

    targetConfig = {
      id: 2,
      name: 'Site Test',
      baseUrl: customUrl,
      downloader: {
        email: 'phihoang12b2@gmail.com',
        pass: '123456768'
      },
      creator: {
        email: 'a.cwork.s.toannguyen.1@gmail.com',
        pass: 'manhtoan123'
      },
      basicAuth
    };
  }

  rl.close();
  return targetConfig;
}

// ----------------------------------------------------------------------------
// Luồng Đăng Nhập Downloader
// ----------------------------------------------------------------------------
async function loginDownloader(page, targetConfig, timeout = 25000) {
  const { email, pass } = targetConfig.downloader;
  const baseUrl = targetConfig.baseUrl;

  console.log(`\n${colors.cyan}[AUTH] Đang đăng nhập Downloader: ${colors.bright}${email}${colors.reset} ...`);
  const ssoUrl = `https://accounts.ac-illust.com/login?lang=jp&serviceURL=${encodeURIComponent(baseUrl + '/api/auth/signin?redirect=' + baseUrl + '/')}`;

  try {
    await page.goto(ssoUrl, { waitUntil: 'domcontentloaded', timeout });
    await page.fill('#email', email);
    await page.fill('#password', pass);

    await Promise.all([
      page.waitForNavigation({ timeout, waitUntil: 'domcontentloaded' }).catch(() => { }),
      page.click('button[type="submit"], input[type="submit"]')
    ]);

    // Thử truy cập dashboard để đảm bảo cookie hoạt động
    await page.goto(baseUrl + '/user/dashboard', { waitUntil: 'domcontentloaded', timeout }).catch(() => { });
    console.log(`${colors.green}[AUTH] Đăng nhập Downloader thành công! (URL: ${page.url()})${colors.reset}`);
  } catch (err) {
    console.log(`${colors.red}[AUTH] Lưu ý đăng nhập Downloader: ${err.message}${colors.reset}`);
  }
}

// ----------------------------------------------------------------------------
// Luồng Đăng Nhập Creator
// ----------------------------------------------------------------------------
async function loginCreator(page, targetConfig, timeout = 25000) {
  const { email, pass } = targetConfig.creator;
  const baseUrl = targetConfig.baseUrl;

  console.log(`\n${colors.cyan}[AUTH] Đang đăng nhập Creator: ${colors.bright}${email}${colors.reset} ...`);
  const signinUrl = `${baseUrl}/creatorP/signin?callbackUrl=/creator/dashboard`;

  try {
    await page.goto(signinUrl, { waitUntil: 'domcontentloaded', timeout });
    await page.fill('#userid', email);
    await page.fill('#passwd', pass);

    await Promise.all([
      page.waitForNavigation({ timeout, waitUntil: 'domcontentloaded' }).catch(() => { }),
      page.click('button[type="submit"]')
    ]);

    await page.goto(baseUrl + '/creator/dashboard', { waitUntil: 'domcontentloaded', timeout }).catch(() => { });
    console.log(`${colors.green}[AUTH] Đăng nhập Creator thành công! (URL: ${page.url()})${colors.reset}`);
  } catch (err) {
    console.log(`${colors.red}[AUTH] Lưu ý đăng nhập Creator: ${err.message}${colors.reset}`);
  }
}

// ----------------------------------------------------------------------------
// Kiểm tra danh sách URLs và in status ra console
// ----------------------------------------------------------------------------
async function checkUrlBatch(items, page, baseUrl, timeout, startOffset, totalAll, envId) {
  const results = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const targetUrl = resolveTargetUrl(item, baseUrl, envId);
    const globalIdx = startOffset + i + 1;
    const padIdx = `[${String(globalIdx).padStart(2, '0')}/${totalAll}]`;
    const padCat = `[${item.category}]`.padEnd(12, ' ');

    const startTime = Date.now();
    let status = null;
    let is200 = false;
    let errorMsg = null;

    try {
      let response = await page.goto(targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout
      });

      // Nếu gặp mã 202 do AWS WAF JavaScript Challenge, đợi browser hoàn thành thử thách và nhận trang đích thực tế
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
      console.log(` ${colors.dim}${padIdx}${colors.reset} ${colors.cyan}${padCat}${colors.reset} ${badge} ${colors.gray}${padDuration}${colors.reset} | ${colors.bright}${displayUrl}${colors.reset}`);

      results.push({
        stt: item.stt,
        category: item.category,
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
      console.log(` ${colors.dim}${padIdx}${colors.reset} ${colors.cyan}${padCat}${colors.reset} ${badge} ${colors.gray}${padDuration}${colors.reset} | ${colors.bright}${displayUrl}${colors.reset} ${colors.red}(${err.message})${colors.reset}`);

      results.push({
        stt: item.stt,
        category: item.category,
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

// ----------------------------------------------------------------------------
// In Bảng Tổng Kết Scorecard
// ----------------------------------------------------------------------------
function printScorecard(results, totalTimeMs, targetConfig) {
  const total = results.length;
  const count200 = results.filter(r => r.is200).length;
  const countRedirect = results.filter(r => typeof r.status === 'number' && r.status >= 300 && r.status < 400).length;
  const countClientErr = results.filter(r => typeof r.status === 'number' && r.status >= 400 && r.status < 500).length;
  const countServerErr = results.filter(r => typeof r.status === 'number' && r.status >= 500).length;
  const countNetworkErr = results.filter(r => r.status === 'ERR').length;
  const rate200 = ((count200 / total) * 100).toFixed(1);

  console.log('\n' + colors.cyan + '='.repeat(76) + colors.reset);
  console.log(`${colors.bright}${colors.cyan}                      BẢNG TỔNG KẾT KIỂM TRA STATUS URL                      ${colors.reset}`);
  console.log(colors.cyan + '='.repeat(76) + colors.reset);
  console.log(` Môi trường kiểm tra    : ${colors.bright}${targetConfig.name.toUpperCase()} (${targetConfig.baseUrl})${colors.reset}`);
  console.log(` Tổng số link test      : ${colors.bright}${total} URLs${colors.reset}`);
  console.log(` --------------------------------------------------------------------------`);
  console.log(` ${colors.green}Status 200 OK      : ${count200}/${total} (${rate200}%)${colors.reset}`);
  console.log(` ${colors.yellow}Chuyển hướng (3xx)    : ${countRedirect}${colors.reset}`);
  console.log(` ${colors.red}Lỗi Client (4xx)      : ${countClientErr}${colors.reset}`);
  console.log(` ${colors.red}Lỗi Server (5xx)      : ${countServerErr}${colors.reset}`);
  console.log(` ${colors.magenta}Lỗi mạng / Timeout    : ${countNetworkErr}${colors.reset}`);
  console.log(` --------------------------------------------------------------------------`);
  console.log(` Tổng thời gian kiểm tra : ${colors.bright}${(totalTimeMs / 1000).toFixed(2)}s${colors.reset}`);
  console.log(colors.cyan + '='.repeat(76) + colors.reset + '\n');
}

// ----------------------------------------------------------------------------
// MAIN
// ----------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const targetConfig = await promptUserConfig(args);
  const isHeaded = args.includes('--headed');
  const timeout = 25000;

  console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}       BẮT ĐẦU KIỂM TRA          ${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(` Môi trường  : ${colors.bright}${colors.green}${targetConfig.name.toUpperCase()} (${targetConfig.baseUrl})${colors.reset}`);
  console.log(` Downloader  : ${colors.bright}${targetConfig.downloader.email}${colors.reset}`);
  console.log(` Creator     : ${colors.bright}${targetConfig.creator.email}${colors.reset}`);
  console.log(`${colors.cyan}------------------------------------------------------------------------${colors.reset}`);

  const downloaderItems = SHEET_URLS.filter(i => i.category === 'Downloader');
  const creatorItems = SHEET_URLS.filter(i => i.category === 'Creator');
  const totalAll = SHEET_URLS.length;

  const startTimeGlobal = Date.now();
  const browser = await chromium.launch({ headless: !isHeaded });
  const allResults = [];

  // Chuẩn bị options cho Browser Context (bao gồm User-Agent chuẩn và Basic Auth nếu có)
  const contextOptions = {
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };
  if (targetConfig.basicAuth) {
    contextOptions.httpCredentials = {
      username: targetConfig.basicAuth.username,
      password: targetConfig.basicAuth.password
    };
  }

  try {
    // ------------------------------------------------------------------------
    // BƯỚC 1: ĐĂNG NHẬP DOWNLOADER & KIỂM TRA 12 LINKS DOWNLOADER
    // ------------------------------------------------------------------------
    const contextDownloader = await browser.newContext(contextOptions);
    await applyContextRouting(contextDownloader, targetConfig.id);
    const pageDownloader = await contextDownloader.newPage();

    await loginDownloader(pageDownloader, targetConfig, timeout);

    console.log(`\n${colors.bright}--- [1/2] KIỂM TRA TRẠNG THÁI DOWNLOADER ---${colors.reset}`);
    const resDownloader = await checkUrlBatch(
      downloaderItems,
      pageDownloader,
      targetConfig.baseUrl,
      timeout,
      0,
      totalAll,
      targetConfig.id
    );
    allResults.push(...resDownloader);
    await contextDownloader.close();

    // ------------------------------------------------------------------------
    // BƯỚC 2: ĐĂNG NHẬP CREATOR & KIỂM TRA 18 LINKS CREATOR
    // ------------------------------------------------------------------------
    const contextCreator = await browser.newContext(contextOptions);
    await applyContextRouting(contextCreator, targetConfig.id);
    const pageCreator = await contextCreator.newPage();

    await loginCreator(pageCreator, targetConfig, timeout);

    console.log(`\n${colors.bright}--- [2/2] KIỂM TRA TRẠNG THÁI CREATOR ---${colors.reset}`);
    const resCreator = await checkUrlBatch(
      creatorItems,
      pageCreator,
      targetConfig.baseUrl,
      timeout,
      downloaderItems.length,
      totalAll,
      targetConfig.id
    );
    allResults.push(...resCreator);
    await contextCreator.close();

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

module.exports = { main, SHEET_URLS };
