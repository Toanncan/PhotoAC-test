import { type Page, type Locator, test, expect } from '@playwright/test';
import { SearchResultPage } from '../common/search-results.page';

/**
 * MobileSearchResultPage — Page Object for Photo-AC search functionality on mobile viewports (< 1024px).
 *
 * Extends the desktop SearchResultPage and overrides/adds mobile-specific interactions
 * such as the slide-out filter drawer (#filter-horizontal) triggered by "詳細検索 ▼".
 */
export class MobileSearchResultPage extends SearchResultPage {
  // ─── Mobile-Specific Locators ─────────────────────────────────────────────

  /** Mobile "詳細検索 ▼" button in search box (only visible on screens < 1024px) */
  readonly detailedSearchButton: Locator = this.page.locator('a.d-1024-none:has-text("詳細検索"), a.d-1024-none[role="button"]').first();

  /** Mobile filter drawer container */
  readonly filterDrawer: Locator = this.page.locator('#filter-horizontal');

  /** Close button (✕) inside mobile filter drawer */
  readonly closeDrawerButton: Locator = this.page.locator('#filter-horizontal a[aria-label="Close"], #filter-horizontal [onclick*="clearOverlay"]').first();

  /** Cookie consent "同意" button at bottom of mobile screen */
  readonly cookieConsentButton: Locator = this.page.locator('a:has-text("同意"), button:has-text("同意")').first();

  // ─── Mobile Filter Elements inside #filter-horizontal ──────────────────────

  /** Orientation radio labels inside drawer */
  readonly mobileOrientationVerticalLabel: Locator = this.page.locator('#filter-horizontal label[for="orientation-0"], #filter-horizontal label:has-text("縦長")').first();
  readonly mobileOrientationHorizontalLabel: Locator = this.page.locator('#filter-horizontal label[for="orientation-1"], #filter-horizontal label:has-text("横長")').first();
  readonly mobileOrientationAllLabel: Locator = this.page.locator('#filter-horizontal label[for="orientation-all"], #filter-horizontal label:has-text("全て")').first();

  /** Sort radio labels inside drawer */
  readonly mobileSortNewestLabel: Locator = this.page.locator('#filter-horizontal label[for="filter-srt-releasedate"], #filter-horizontal label:has-text("新着順")').first();
  readonly mobileSortRelevanceLabel: Locator = this.page.locator('#filter-horizontal label[for="filter-srt-dlrank"], #filter-horizontal label:has-text("関連性の高い順")').first();
  readonly mobileSortPopularLabel: Locator = this.page.locator('#filter-horizontal label[for="filter-srt-recent_popular"], #filter-horizontal label:has-text("人気順")').first();

  constructor(page: Page) {
    super(page);
  }

  // ─── Mobile Actions ───────────────────────────────────────────────────────

  /**
   * Dismiss cookie consent banner if present to avoid intercepting touches/clicks on mobile.
   */
  async dismissCookieBannerIfPresent(): Promise<void> {
    try {
      if (await this.cookieConsentButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.cookieConsentButton.click({ force: true }).catch(() => {});
      }
    } catch {
      // Ignore if not present
    }
  }

  /**
   * Open the mobile filter drawer by clicking "詳細検索 ▼" and auto-wait for it to become active.
   */
  async openMobileFilterDrawer(): Promise<void> {
    await test.step('Open mobile filter drawer via "詳細検索 ▼"', async () => {
      await this.dismissCookieBannerIfPresent();
      await this.dismissIntroDialogIfPresent();

      // Check if drawer is already active
      const isActive = await this.filterDrawer.evaluate((el) => el.classList.contains('active')).catch(() => false);
      if (!isActive) {
        await this.clickElement(this.detailedSearchButton);
        await expect(this.filterDrawer).toHaveClass(/active/, { timeout: 10_000 });
      }
    });
  }

  /**
   * Close the mobile filter drawer.
   */
  async closeMobileFilterDrawer(): Promise<void> {
    await test.step('Close mobile filter drawer', async () => {
      const isActive = await this.filterDrawer.evaluate((el) => el.classList.contains('active')).catch(() => false);
      if (isActive) {
        await this.clickElement(this.closeDrawerButton);
        await expect(this.filterDrawer).not.toHaveClass(/active/, { timeout: 10_000 });
      }
    });
  }

  /**
   * Filter search results by orientation on mobile via the drawer.
   * Auto-submits upon clicking the radio label.
   */
  async selectOrientationMobile(orientation: 'vertical' | 'horizontal' | 'all'): Promise<void> {
    await test.step(`Mobile: Filter by orientation "${orientation}"`, async () => {
      await this.openMobileFilterDrawer();

      const targetLabel = orientation === 'vertical'
        ? this.mobileOrientationVerticalLabel
        : (orientation === 'horizontal' ? this.mobileOrientationHorizontalLabel : this.mobileOrientationAllLabel);

      await this.clickElement(targetLabel);
      await this.waitForResultDisplay();
    });
  }

  /**
   * Select sort option on mobile via the drawer.
   * Auto-submits upon clicking the sort label.
   */
  async selectSortMobile(sort: 'newest' | 'relevance' | 'popular'): Promise<void> {
    await test.step(`Mobile: Select sort option "${sort}"`, async () => {
      await this.openMobileFilterDrawer();

      const targetLabel = sort === 'newest'
        ? this.mobileSortNewestLabel
        : (sort === 'popular' ? this.mobileSortPopularLabel : this.mobileSortRelevanceLabel);

      await this.clickElement(targetLabel);
      await this.waitForResultDisplay();
    });
  }
}
