import { type Page, type TestInfo } from '@playwright/test';

/**
 * Common helper utilities for test automation.
 * Contains reusable pure functions for formatting, random data, and wait conditions.
 */

/**
 * Format a Date object to readable string (for logging/reporting).
 * @param date - Date object or undefined (defaults to now)
 * @param locale - Locale string (default: 'vi-VN')
 */
export const formatDate = (date: Date = new Date(), locale: string = 'vi-VN'): string => {
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Generate a random alphanumeric string.
 * @param length - Desired length (default: 8)
 */
export const randomString = (length: number = 8): string => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Generate a random integer between min and max (inclusive).
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Sleep for a given number of milliseconds.
 * USE ONLY when absolutely necessary (e.g., waiting for non-UI async events).
 * Prefer Playwright's built-in web-first assertions instead.
 * @param ms - Milliseconds to wait
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export const truncate = (str: string, maxLength: number = 50): string => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

/**
 * Normalize whitespace in a string (trim + collapse multiple spaces).
 */
export const normalizeWhitespace = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Pick a random element from an array.
 */
export const pickRandom = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Retry an async operation up to maxRetries times.
 * @param fn - Async function to retry
 * @param maxRetries - Maximum number of attempts
 * @param delayMs - Delay between retries in ms
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> => {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await sleep(delayMs);
      }
    }
  }
  throw lastError;
};

/**
 * Chụp ảnh bằng chứng có gắn thanh URL Watermark lên DOM và attach vào Allure Report.
 * An toàn tuyệt đối: Bọc try/catch, không bao giờ ném lỗi làm ảnh hưởng tới kết quả test.
 * @param page - Playwright Page instance
 * @param testInfo - Playwright TestInfo instance
 * @param attachmentName - Tên file đính kèm trong Allure Report (mặc định: 'filter-applied-evidence')
 */
export const captureEvidenceWithUrl = async (
  page: Page,
  testInfo: TestInfo,
  attachmentName: string = 'filter-applied-evidence',
): Promise<void> => {
  try {
    if (page.isClosed()) return;
    const currentUrl = page.url();

    // 1. Gắn thanh URL Watermark màu xanh đen trên đỉnh màn hình (đồng bộ với fixture)
    await page.evaluate((url) => {
      let banner = document.getElementById('qa-screenshot-url-banner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'qa-screenshot-url-banner';
        banner.style.position = 'fixed';
        banner.style.top = '0';
        banner.style.left = '0';
        banner.style.width = '100%';
        banner.style.backgroundColor = 'rgba(15, 23, 42, 0.92)';
        banner.style.color = '#22c55e';
        banner.style.fontFamily = 'Consolas, Menlo, Monaco, monospace';
        banner.style.fontSize = '13px';
        banner.style.fontWeight = 'bold';
        banner.style.padding = '6px 14px';
        banner.style.zIndex = '2147483647';
        banner.style.borderBottom = '2px solid #22c55e';
        banner.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.5)';
        banner.style.pointerEvents = 'none';
        document.body.prepend(banner);
      }
      banner.textContent = 'URL: ' + url;
    }, currentUrl).catch(() => { });

    // 2. Chụp ảnh Viewport hiển thị (1920x1080) lúc bộ lọc đang hiển thị đầy đủ
    const screenshot = await page.screenshot({ fullPage: false });
    await testInfo.attach(attachmentName, {
      body: screenshot,
      contentType: 'image/png',
    });

    // 3. Đính kèm URL text vào Allure để copy 1-click
    await testInfo.attach(`${attachmentName}-url`, {
      body: currentUrl,
      contentType: 'text/plain',
    });
  } catch {
    // Nuốt lỗi an toàn nếu page bị đóng đột ngột
  }
};

/**
 * Danh sách regex domain quảng cáo và trackers bên thứ ba.
 * Tập trung vào mạng quảng cáo Nhật Bản (Photo-AC / Illust-AC) và quốc tế.
 * Không chặn nhầm domain hệ thống (*.photo-ac.com, *.ac-illust.com, cdn, api).
 */
const AD_TRACKER_PATTERN =
  /googlesyndication|googleads|doubleclick|pagead|adservice\.google|yads\.c\.yimg\.jp|s\.yimg\.jp|microad\.(net|jp)|geniee\.jp|fluct\.jp|criteo\.(com|net)|taboola\.com|outbrain\.com|teads\.tv|amazon-adsystem\.com|gmossp\.jp|rtb-oveeo\.com|syncingbridge\.com|simpli\.fi|33across\.com|adnxs\.com|adpushup\.com|rubiconproject\.com/;

/**
 * CSS Rule ẩn triệt để các khung chứa quảng cáo, banner, và vignette overlay
 * để chống Layout Shift và ngăn chặn overlay che khuất các phần tử UI.
 */
const AD_HIDE_STYLES = `
  iframe[id*="google_ads"],
  iframe[src*="doubleclick"],
  iframe[src*="ad"],
  iframe[id*="aswift"],
  div[id*="google_ads"],
  div[id*="gpt-ad"],
  div[id*="ad-"],
  div[id*="ad_"],
  .ad-container,
  .ad_box,
  .ad-slot,
  .adsbygoogle,
  .advertisement,
  div[class*="ad-banner"],
  div[class*="ad_wrapper"],
  div[class*="google-ad"],
  ins.adsbygoogle {
    display: none !important;
    height: 0 !important;
    max-height: 0 !important;
    min-height: 0 !important;
    opacity: 0 !important;
    pointer-events: none !important;
    visibility: hidden !important;
  }
`;

/**
 * Kích hoạt Ad Blocker 2 tầng tối ưu (Network Abort + CSS Hidden).
 * - Tầng 1: Abort ngay lập tức các network request tới máy chủ quảng cáo và trackers bên thứ 3.
 * - Tầng 2: Inject script tự động chèn CSS ẩn khung chứa quảng cáo trước khi trang render, triệt tiêu Layout Shift.
 *
 * Lưu ý: Áp dụng có chọn lọc cho Free User / Guest User trong beforeEach.
 *
 * @param page - Playwright Page instance
 */
export const enableAdBlocker = async (page: Page): Promise<void> => {
  try {
    if (page.isClosed()) return;

    // 1. Tầng Network: Abort request đến máy chủ quảng cáo & trackers
    await page.route(AD_TRACKER_PATTERN, (route) => route.abort('blockedbyclient').catch(() => {}));

    // 2. Tầng CSS: Tự động ẩn container quảng cáo ngay khi DOM bắt đầu render
    await page.addInitScript((css) => {
      const injectStyle = () => {
        const style = document.createElement('style');
        style.id = 'qa-adblock-styles';
        style.textContent = css;
        if (document.head) {
          document.head.appendChild(style);
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            document.head?.appendChild(style);
          }, { once: true });
        }
      };
      injectStyle();
    }, AD_HIDE_STYLES).catch(() => {});
  } catch {
    // Nuốt lỗi an toàn nếu page bị đóng sớm
  }
};


