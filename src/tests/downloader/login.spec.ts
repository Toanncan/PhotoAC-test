import { test, expect } from '../../fixtures/base.fixture';

/**
 * Login Feature Test Suite
 * Tests for authentication functionality on photo-ac.
 *
 * NOTE: These tests run WITHOUT storageState (unauthenticated context)
 * to test the login flow itself.
 */
test.describe('Authentication — Login', () => {
  // test.use({ storageState: { cookies: [], origins: [] } }); // Override to run unauthenticated

  /**
   * TC-AUTH-001: Đăng nhập thành công với Downloader hợp lệ
   * @tags @smoke @regression
   */
  // test('TC-AUTH-001: Đăng nhập thành công với Downloader hợp lệ @smoke', async ({
  //   loginPage,
  //   page,
  // }) => {
  //   // Arrange
  //   const email = process.env.TEST_USER_EMAIL ?? '';
  //   const password = process.env.TEST_USER_PASSWORD ?? '';

  //   // Act
  //   await loginPage.loginAsDownloader(email, password);

  //   // Assert
  //   await test.step('Verify redirect to authenticated area after login', async () => {
  //     await expect(page).toHaveURL(/\/(dashboard|home|top|my-page|en)?/, {
  //       timeout: 15_000,
  //     });
  //   });
  // });

  /**
   * TC-AUTH-002: Hiển thị lỗi khi đăng nhập với password sai
   * @tags @regression
   */
  // test('TC-AUTH-002: Hiển thị thông báo lỗi khi password không đúng @regression', async ({
  //   loginPage,
  // }) => {
  //   // Arrange
  //   const email = process.env.TEST_USER_EMAIL ?? 'test@example.com';
  //   const wrongPassword = 'WrongPassword_Invalid_999!';

  //   // Act
  //   await loginPage.login(email, wrongPassword);

  //   // Assert
  //   const errorMessage = await loginPage.getErrorMessage();
  //   expect(
  //     errorMessage.length,
  //     'Error message should be displayed for invalid credentials',
  //   ).toBeGreaterThan(0);
  // });

  // /**
  //  * TC-AUTH-003: Không đăng nhập được khi email trống
  //  * @tags @regression
  //  */
  // test('TC-AUTH-003: Không thể submit form khi email bị bỏ trống @regression', async ({
  //   loginPage,
  //   page,
  // }) => {
  //   // Arrange & Act
  //   await loginPage.login('', 'somePassword123!');

  //   // Assert — should still be on login page or show validation error
  //   const currentUrl = page.url();
  //   const isOnLoginPage =
  //     currentUrl.includes('/login') ||
  //     currentUrl.includes('/signin') ||
  //     currentUrl === process.env.BASE_URL + '/';

  //   expect(
  //     isOnLoginPage,
  //     'User should NOT be redirected to dashboard when email is empty',
  //   ).toBe(true);
  // });
});
