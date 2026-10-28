import { test, expect } from '../../../fixtures/base.fixture';
import { envConfig } from '../../../utils/env.config';
import { PdfUtils } from '../../../utils/pdf.utils';

/**
 * Test Suite: Premium Subscription, Receipt & Profile Flow
 *
 * Kiểm thử luồng nghiệp vụ cốt lõi từ A-Z:
 * 1. Đăng ký Free User mới & Tự động đăng nhập vào Photo-AC.
 * 2. Nâng cấp Premium qua thẻ tín dụng VISA (GMO-PG) tại /premium/campaign.
 * 3. Xác thực thông tin đơn hàng tại màn hình Confirm & Hoàn tất thanh toán.
 * 4. Kiểm tra tự động phát hành Hóa đơn điện tử PDF tại /user/receipts, tải về và đối soát số tiền.
 * 5. Kiểm tra Hồ sơ Hội viên tại /user/profile/edit và Email thông báo gửi về hòm thư người dùng.
 */
test.describe('Premium Registration, Receipt & Profile Flow', () => {
  // Isolate session: Always begin with clean guest cookies so fresh Free User account is generated
  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-[Register-Premium]-[FreeUser]-[001]: Đăng ký Free User mới, Nâng cấp Premium qua thẻ tín dụng, Verify Hóa đơn PDF và Profile @smoke @premium', async ({
    page,
    registerPage,
    premiumRegisterPage,
    receiptsPage,
    profileEditPage,
  }) => {
    test.setTimeout(240_000);

    // Tự động vô hiệu hóa modal cảnh báo timezone quốc tế (#alertModalGlobal)
    await page.addInitScript(() => {
      try {
        localStorage.setItem('hideModalGlobal', 'true');
      } catch (_) {}
    });

    // ── GIAI ĐOẠN 1: KHỞI TẠO TÀI KHOẢN FREE USER MỚI QUA MAIL.TM ───────────
    const newUser = await registerPage.registerNewFreeUserAccount({
      password: 'FreeUser@2026!',
      usernamePrefix: 'acfree',
      navigateToTopPage: false,
    });

    try {
      expect(newUser.email).toContain('@');

      // Đăng nhập tài khoản Free User mới qua SSO Login và xác nhận phiên làm việc
      await test.step('Đồng bộ phiên đăng nhập Free User sang Photo-AC qua SSO Login', async () => {
        const baseUrl = envConfig.baseUrl || 'https://test-lien.photo-ac.com';
        const loginUrl = `https://test-accounts.ac-illust.com/login?serviceURL=${encodeURIComponent(
          `${baseUrl}/auth/sso_login?redirect_to=${encodeURIComponent(`${baseUrl}/`)}`
        )}&lang=jp`;

        await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

        // Nếu dừng lại ở trang đăng nhập của Accounts, điền thông tin để đăng nhập
        if (page.url().includes('test-accounts.ac-illust.com/login')) {
          await page.getByPlaceholder('メールアドレス').fill(newUser.email);
          await page.getByPlaceholder('パスワード').fill(newUser.password);
          await page.getByRole('button', { name: 'ログイン' }).click();
        }

        await page.waitForURL(new RegExp(baseUrl.replace(/https?:\/\//, '')), { timeout: 30_000 });
        const freeUserAvatar = page
          .locator(
            '#user-info-dropdown:visible, header button:has-text("無料会員"):visible, header button:has-text("Avatar"):visible'
          )
          .first();
        await expect(freeUserAvatar).toBeVisible({ timeout: 20_000 });
      });

      // ── GIAI ĐOẠN 2: NÂNG CẤP PREMIUM BẰNG THẺ TÍN DỤNG TẠI /premium/campaign ─
      await test.step('Điều hướng đến trang đăng ký Premium (/premium/campaign)', async () => {
        await page.goto('/premium/campaign', { waitUntil: 'domcontentloaded' });
        await expect(page.getByRole('heading', { name: /ステップ1/ })).toBeVisible({
          timeout: 15_000,
        });
      });

      await test.step('Chọn phương thức thanh toán bằng Thẻ tín dụng (クレジットカード支払い)', async () => {
        await premiumRegisterPage.selectCreditCardPayment();
        await expect(premiumRegisterPage.creditCardRadio).toBeChecked();
      });

      await test.step('Điền thông tin thẻ tín dụng kiểm thử (4111 1111 1111 1111, 01/32, CVV 123)', async () => {
        await expect(premiumRegisterPage.cardNumberInput).toBeVisible();
        await premiumRegisterPage.fillCreditCardInfo({
          cardNo: '4111111111111111',
          expireMonth: '01',
          expireYear: '2032',
          securityCode: '123',
        });
        await premiumRegisterPage.ensureTermsAgreed();
      });

      await test.step('Gửi thông tin thẻ và vượt qua bảo mật Google reCAPTCHA v2', async () => {
        await premiumRegisterPage.clickSubmitRegistration();

        // Handle reCAPTCHA modal if it pops up after clicking submit
        await premiumRegisterPage.handleRecaptchaIfPresent(15_000);

        // Wait for redirect to /premium/confirm
        const isConfirmUrl = await page
          .waitForURL(/premium\/confirm/, { timeout: 20_000 })
          .then(() => true)
          .catch(() => false);

        // Fallback retry if navigation hasn't completed yet
        if (!isConfirmUrl) {
          if (await premiumRegisterPage.recaptchaModal.isVisible().catch(() => false)) {
            await premiumRegisterPage.handleRecaptchaIfPresent(5_000);
          }
          const isSubmitVisible = await premiumRegisterPage.submitButton.isVisible().catch(() => false);
          if (isSubmitVisible) {
            await premiumRegisterPage.clickSubmitRegistration().catch(() => {});
          }
          await page.waitForURL(/premium\/confirm/, { timeout: 30_000 });
        }
      });

      // ── GIAI ĐOẠN 3: ĐỐI SOÁT TẠI MÀN HÌNH CONFIRM & HOÀN TẤT ĐĂNG KÝ ────────
      let confirmDetails: {
        serviceName: string;
        priceText: string;
        paymentMethodText: string;
        registeredEmail: string;
        contractPeriodText: string;
      };
      let confirmedTotalAmount = '';

      await test.step('Trích xuất thông tin đối soát tại màn hình xác nhận (/premium/confirm)', async () => {
        await expect(premiumRegisterPage.confirmHeading).toBeVisible({ timeout: 15_000 });
        confirmDetails = await premiumRegisterPage.getConfirmBillingDetails();

        expect(confirmDetails.serviceName).toContain('プレミアム会員');
        expect(confirmDetails.paymentMethodText).toContain('1111');

        // Trích xuất số tiền thanh toán thực tế hiển thị trên màn hình xác nhận (vd: 18,900 hoặc 15,121)
        const amountMatch = confirmDetails.priceText.match(/([\d,]+)\s*円/);
        expect(amountMatch).toBeTruthy();
        confirmedTotalAmount = amountMatch![1];
      });

      await test.step('Hoàn tất khảo sát và bấm xác nhận đăng ký Premium', async () => {
        await premiumRegisterPage.confirmAndFinalizeSubscription();
        await page.waitForURL(/premium\/complete/, { timeout: 20_000 });
        await expect(premiumRegisterPage.completionHeading).toBeVisible({ timeout: 10_000 });
      });

      await test.step('Xác nhận trạng thái Header đã chuyển sang Premium Member', async () => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        const avatarBtn = page
          .locator('header button:has-text("プレミアム"):visible, #user-info-dropdown:visible')
          .first();
        await expect(avatarBtn).toBeVisible({ timeout: 15_000 });
      });

      // ── GIAI ĐOẠN 4: KIỂM TRA HÓA ĐƠN PDF TẠI /user/receipts ─────────────────
      const testCompanyName = 'AC Testing Corp';
      const testPersonName = 'Tuan QA';

      await test.step('Truy cập trang Quản lý Hóa đơn (/user/receipts)', async () => {
        await receiptsPage.goToReceiptsPage();
        await expect(receiptsPage.pageHeading).toBeVisible({ timeout: 15_000 });
        await expect(receiptsPage.firstRadioButton).toBeVisible({ timeout: 15_000 });
      });

      await test.step('Cập nhật tên công ty và người nhận hóa đơn (宛名保存)', async () => {
        await receiptsPage.fillRecipientInfo(testCompanyName, testPersonName);
        await receiptsPage.saveRecipientInfo();
        expect(await receiptsPage.getCompanyNameValue()).toBe(testCompanyName);
        expect(await receiptsPage.getPersonNameValue()).toBe(testPersonName);
      });

      await test.step('Chọn hóa đơn của giao dịch vừa thanh toán', async () => {
        await receiptsPage.selectBillingItemByIndex(0);
        await expect(receiptsPage.firstRadioButton).toBeChecked();
      });

      let downloadPath = '';
      await test.step('Tải file Hóa đơn PDF về máy', async () => {
        const download = await receiptsPage.downloadReceiptPdf();
        expect(download.suggestedFilename()).toContain('.pdf');
        downloadPath = await PdfUtils.saveAndAttach(download, test.info(), 'ac-receipt');
      });

      await test.step('Kiểm tra tính hợp lệ và bóc tách nội dung PDF hóa đơn', async () => {
        PdfUtils.validatePdfStructure(downloadPath, 5_000);

        const pdfText = await PdfUtils.extractText(downloadPath);

        // Verify core invoice indicators
        expect(pdfText).toContain('領収書');
        expect(pdfText).toContain('ACワークス株式会社');
        expect(pdfText).toContain(testCompanyName);
        expect(pdfText).toContain(testPersonName);

        // Verify amounts matching the confirm screen dynamically
        expect(pdfText).toContain(confirmedTotalAmount);

        // Verify service name
        expect(pdfText).toContain('ACプレミアム会員サービス');
      });

      // ── GIAI ĐOẠN 5: KIỂM TRA HỒ SƠ PROFILE VÀ EMAIL XÁC NHẬN ────────────────
      await test.step('Truy cập trang Hồ sơ Hội viên (/user/profile/edit)', async () => {
        await profileEditPage.goToProfileEditPage();
        await expect(profileEditPage.pageHeading).toBeVisible({ timeout: 15_000 });
      });

      await test.step('Kiểm tra thông tin chi tiết tại mục 会員種別 trên trang Profile', async () => {
        const membershipText = await profileEditPage.getMembershipTypeText();

        expect(membershipText).toContain('プレミアム会員');
        expect(membershipText).toContain('毎年更新プラン');
        expect(membershipText).toContain('決済完了');
        expect(membershipText).toContain('自動更新');
      });

      await test.step('Kiểm tra email thông báo đăng ký Premium gửi về hòm thư người dùng', async () => {
        const premiumEmail = await newUser.mailTm.waitForEmail({
          subjectContains: 'プレミアム会員サービス登録完了',
          timeoutMs: 45_000,
        });

        expect(premiumEmail.subject).toContain('プレミアム会員サービス登録完了');

        // Check order info inside email content matching confirm screen dynamically
        const emailContent = (premiumEmail.text || '') + ' ' + (premiumEmail.html || []).join(' ');
        expect(emailContent).toContain(confirmedTotalAmount);
        expect(emailContent).toContain('毎年更新');
      });
    } finally {
      // Teardown: Clean up temporary disposable mailbox
      await newUser.mailTm.deleteAccount().catch(() => {});
      await newUser.mailTm.dispose().catch(() => {});
    }
  });
});
