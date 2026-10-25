import { test, expect } from '../../fixtures/base.fixture';

/**
 * Test Suite: Free User Registration (会員登録)
 * Quy trình đăng ký tài khoản Free User mới có thể tái sử dụng.
 */
test.describe('Free User Registration Flow', () => {
  // Isolate session: Registration must start with a clean Guest session
  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-REGISTER-FREE-001: Đăng ký tài khoản Free User mới thành công từ A-Z @smoke @register', async ({
    registerPage,
  }) => {
    test.setTimeout(120_000);

    // Call the common reusable registration method
    const newUser = await registerPage.registerNewFreeUserAccount({
      password: '12345678',
      usernamePrefix: 'acfree',
      navigateToTopPage: true,
    });

    try {
      // Verify account credentials are created and available for subsequent steps
      expect(newUser.email).toContain('@');
      expect(newUser.password).toBe('12345678');

      await test.step('Tài khoản đã sẵn sàng cho các bước tiếp theo (Upgrade Premium, Download...)', async () => {
        // Here you can proceed with subsequent business actions:
        // - Navigate to Premium Plan selection page
        // - Test download limits for new users
        // - Test user profile settings
      });
    } finally {
      // Cleanup: delete temporary account on mail.tm
      await newUser.mailTm.deleteAccount().catch(() => { });
      await newUser.mailTm.dispose().catch(() => { });
    }
  });
});

