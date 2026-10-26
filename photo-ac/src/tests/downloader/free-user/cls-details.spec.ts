import { test, expect } from '../../../fixtures/base.fixture';

test.describe('CLs Details', () => {
    test('TC-Details-001: Open detail page for searchResultPage', async ({
        page,
        searchResultPage,
        photoDetailPage,
    }) => {
        for (let i = 0; i <= 10; i++) {
            await test.step(`Lần lặp ${i}: Mở và kiểm tra trang chi tiết ảnh thứ ${i + 1}`, async () => {
                await searchResultPage.navigate('/main/search?q=%E7%A7%8B&creator=acworks&layout=vertical');
                await searchResultPage.waitForResultDisplay();

                // Mở ảnh thứ i (đã tự động lọc bỏ quảng cáo)
                await searchResultPage.openDetailPageForItem(i);

                // Chờ chuyển hướng vào trang detail
                await page.waitForURL(/\/main\/detail\/\d+/, { timeout: 25_000 });
                await expect(page).toHaveURL(/\/main\/detail\/\d+/);

                // Cuộn xuống footer
                const footerElement = page.locator('footer#newFooter');
                await footerElement.scrollIntoViewIfNeeded().catch(() => { });

                // Kiểm tra và click vào tác giả ACworks (dùng locator semantic từ photoDetailPage)
                const creatorLink = page.locator('#main-thumb a:has-text("ACworks")');
                await creatorLink.scrollIntoViewIfNeeded();
                await expect(creatorLink).toBeVisible();
                await creatorLink.click();
            });
        }
    });
});
