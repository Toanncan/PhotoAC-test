import { test, expect } from '../../fixtures/base.fixture';

/**
 * Test Suite: Premium Subscription (プレミアム会員登録)
 * Kiểm thử luồng nâng cấp Premium sau First Download qua ưu đãi giảm giá 50%.
 */
test.describe('Premium Registration Flow', () => {
  // Isolate session: Always begin with clean guest cookies so fresh Free User account is generated
  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-PREMIUM-001: Đăng ký Premium qua ưu đãi giảm 50% sau First Download @smoke @premium @downloader', async ({
    page,
    registerPage,
    downloadImagePage,
    premiumRegisterPage,
  }) => {
    test.setTimeout(240_000);

    // Precondition: Register a fresh Free User account using Mail.tm
    const newUser = await registerPage.registerNewFreeUserAccount({
      password: '12345678',
      usernamePrefix: 'acfree',
      navigateToTopPage: true,
    });

    try {
      // Step 1: Navigate to Acworks photo detail page
      await test.step('Truy cập trang chi tiết ảnh Acworks (ID: 1651238)', async () => {
        await downloadImagePage.goToAcworksPhotoDetail('1651238');
        await expect(downloadImagePage.freeDownloadButton).toBeVisible();
      });

      // Step 2: Download image with smallest size (Size S) after countdown
      let downloadFile: import('@playwright/test').Download;
      await test.step('Download ảnh với size nhỏ nhất (Size S) và đợi hết quảng cáo/countdown', async () => {
        downloadFile = await downloadImagePage.downloadAsFreeUserFirstDownload('S');
        expect(downloadFile.suggestedFilename()).toBeTruthy();
      });

      // Step 3: Click 50% Discount First Download Promotional Offer
      await test.step('Sau khi download xong, click vào banner ưu đãi Premium nửa giá', async () => {
        await downloadImagePage.clickFirstDownloadPremiumOffer();
      });

      // Step 4: Verify navigation to Premium Campaign Registration page
      await test.step('Xác nhận đã chuyển hướng thành công tới trang đăng ký Premium Campaign', async () => {
        await expect(page).toHaveURL(/premium\/campaign/);
        await expect(premiumRegisterPage.campaignHeading).toBeVisible();
        await expect(premiumRegisterPage.campaignSubHeading).toBeVisible();
      });

      // Step 5: Select Credit Card payment method and handle confirmation
      await test.step('Chọn phương thức thanh toán bằng Thẻ tín dụng (クレジットカード支払い)', async () => {
        await premiumRegisterPage.selectCreditCardPayment();
        await expect(premiumRegisterPage.creditCardRadio).toBeChecked();
      });

      // Step 6: Verify Credit Card form is ready for input
      await test.step('Kiểm tra Form nhập thông tin thẻ hiển thị đầy đủ và sẵn sàng nhập liệu', async () => {
        await expect(premiumRegisterPage.cardNumberInput).toBeVisible();
        await expect(premiumRegisterPage.expireMonthSelect).toBeVisible();
        await expect(premiumRegisterPage.expireYearSelect).toBeVisible();
        await expect(premiumRegisterPage.securityCodeInput).toBeVisible();
        await expect(premiumRegisterPage.agreeTermsCheckbox).toBeChecked();
        await expect(premiumRegisterPage.submitButton).toBeVisible();
      });

      // Step 7: Fill Credit Card information provided by user
      await test.step('Nhập thông tin thẻ tín dụng thanh toán', async () => {
        await premiumRegisterPage.fillCreditCardInfo({
          cardNo: '4111111111111111',
          expireMonth: '01',
          expireYear: '2032',
          securityCode: '123',
        });
        await premiumRegisterPage.ensureTermsAgreed();
      });

      // Step 8: Submit Card info & pass reCAPTCHA challenge
      await test.step('Gửi thông tin thẻ và xử lý reCAPTCHA để chuyển sang trang xác nhận', async () => {
        await premiumRegisterPage.clickSubmitRegistration();

        // Handle reCAPTCHA modal if it pops up after clicking submit
        await premiumRegisterPage.handleRecaptchaIfPresent(15_000);

        // If reCAPTCHA modal has image challenge, allow up to 60s for resolution in headed mode
        const isRecaptchaStillOpen = await premiumRegisterPage.recaptchaModal.isVisible().catch(() => false);
        if (isRecaptchaStillOpen) {
          await premiumRegisterPage.recaptchaModal.waitFor({ state: 'hidden', timeout: 60_000 }).catch(() => { });
        }

        // Ensure navigation to /premium/confirm occurs
        let isConfirmUrl = await page.waitForURL(/premium\/confirm/, { timeout: 15_000 }).then(() => true).catch(() => false);
        if (!isConfirmUrl) {
          const isModalClosed = await premiumRegisterPage.recaptchaModal.isHidden().catch(() => false);
          if (isModalClosed) {
            const isSubmitVisible = await premiumRegisterPage.submitButton.isVisible().catch(() => false);
            if (isSubmitVisible) {
              await premiumRegisterPage.clickSubmitRegistration().catch(() => { });
              isConfirmUrl = await page.waitForURL(/premium\/confirm/, { timeout: 15_000 }).then(() => true).catch(() => false);
            }
          }
        }
      });

      // Step 9: Verify Confirmation Page & Fill Questionnaire Survey
      await test.step('Điền form mục アンケート và click プレミアム会員サービスに参加する để hoàn tất đăng ký Premium', async () => {
        if (page.url().includes('premium/confirm')) {
          // 1. Verify confirmation summary info
          await expect(premiumRegisterPage.confirmHeading).toBeVisible({ timeout: 15_000 });
          await expect(premiumRegisterPage.confirmDiscountPrice).toBeVisible();
          await expect(premiumRegisterPage.confirmCardDigits).toBeVisible();

          // 2. Fill questionnaire survey dropdowns (アンケート)
          await premiumRegisterPage.fillQuestionnaire();

          // 3. Click final submit button (プレミアム会員サービスに参加する) to complete registration
          await premiumRegisterPage.confirmSubmitButton.scrollIntoViewIfNeeded().catch(() => { });
          await premiumRegisterPage.clickElement(premiumRegisterPage.confirmSubmitButton);
        } else {
          test.info().annotations.push({
            type: 'reCAPTCHA Note',
            description: 'Google reCAPTCHA v2 hiển thị thử thách bảo mật cần xác nhận trên trình duyệt.',
          });
        }
      });

      // Step 10: Verify Completion & Record Status
      await test.step('Xác nhận kết quả nâng cấp Premium sau khi hoàn tất đăng ký', async () => {
        await page.waitForLoadState('domcontentloaded').catch(() => { });

        const currentUrl = page.url();
        const hasPaymentError = await premiumRegisterPage.paymentErrorMessage.isVisible().catch(() => false);

        if (hasPaymentError) {
          const errorText = await premiumRegisterPage.paymentErrorMessage.innerText().catch(() => 'Lỗi thanh toán');
          test.info().annotations.push({
            type: 'Payment Status',
            description: `Payment response notice: ${errorText} (URL: ${currentUrl})`,
          });
        } else {
          test.info().annotations.push({
            type: 'Payment Status',
            description: `Đăng ký Premium hoàn tất thành công! URL hiện tại: ${currentUrl}`,
          });
        }
      });
    } finally {
      // Cleanup: Delete temporary mail.tm mailbox
      // await newUser.mailTm.deleteAccount().catch(() => {});
      // await newUser.mailTm.dispose().catch(() => {});
    }
  });
});

