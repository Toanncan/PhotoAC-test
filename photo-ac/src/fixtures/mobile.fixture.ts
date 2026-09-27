import { test as baseTest, expect } from './base.fixture';
import { MobileSearchResultPage } from '../pages/mobile/mobile-search-results.page';

/**
 * Custom fixture types for Mobile testing.
 */
type MobileFixtures = {
  mobileSearchResultPage: MobileSearchResultPage;
};

/**
 * mobile.fixture.ts — Extends base.fixture with Mobile-specific Page Objects.
 *
 * All mobile spec files should import { test, expect } from this file.
 */
export const test = baseTest.extend<MobileFixtures>({
  mobileSearchResultPage: async ({ page }, use) => {
    const mobileSearchResultPage = new MobileSearchResultPage(page);
    await use(mobileSearchResultPage);
  },
});

export { expect };
