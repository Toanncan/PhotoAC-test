import { test, expect } from '../../fixtures/base.fixture';
import { envConfig } from '../../utils/env.config';
import { PdfUtils } from '../../utils/pdf.utils';
import { EmailVerificationHelper } from '../../utils/email-verification.helper';


test.describe('領収書発行 — Receipt Issuance', () => {
  // test.use({ storageState: { cookies: [], origins: [] } }); // Override to run unauthenticated

  // Unique test data — traceable via timestamp
  const timestamp = new Date().toISOString().replace(/[:\-T.Z]/g, '').slice(0, 14);
  const testCompanyName = `auto_company_${timestamp}`;
  const testPersonName = `auto_person_${timestamp}`;

  // test.beforeEach(async ({ loginPage }) => {
  //   // Login as downloader before each test
  //   await loginPage.loginAsDownloader(
  //     envConfig.testUser.email,
  //     envConfig.testUser.password,
  //   );
  // });


  // test('TC001 - Nhập thông tin宛名, lưu, chọn radio, tải PDF và verify nội dung', async ({
  //   page,
  //   receiptsPage,
  // }) => {
  //   // ─── Step 1: Navigate directly to /user/receipts ──────────────────────
  //   await test.step('Navigate directly to 領収書発行 page (/user/receipts)', async () => {
  //     await receiptsPage.goToReceiptsPage();
  //   });

  //   // ─── Step 2: Verify page loaded ───────────────────────────────────────
  //   await test.step('Verify 領収書発行 page is displayed', async () => {
  //     await expect(receiptsPage.pageHeading).toBeVisible({ timeout: 10_000 });
  //     await expect(receiptsPage.companyNameInput).toBeVisible();
  //     await expect(receiptsPage.personNameInput).toBeVisible();
  //   });

  //   // ─── Step 3: Fill in recipient info ───────────────────────────────────
  //   await test.step(`Fill 会社名="${testCompanyName}" and 担当者名="${testPersonName}"`, async () => {
  //     await receiptsPage.fillRecipientInfo(testCompanyName, testPersonName);
  //     await expect(receiptsPage.companyNameInput).toHaveValue(testCompanyName);
  //     await expect(receiptsPage.personNameInput).toHaveValue(testPersonName);
  //   });

  //   // ─── Step 4: Save recipient info (handle native JS alert) ─────────────
  //   await test.step('Click 宛名保存 and accept JS alert (宛名を保存しました。)', async () => {
  //     page.once('dialog', async (dialog) => {
  //       expect(dialog.message()).toContain('保存しました');
  //       await dialog.accept();
  //     });
  //     await receiptsPage.saveRecipientButton.click();
  //     await expect(receiptsPage.saveRecipientButton).toBeEnabled({ timeout: 10_000 });
  //   });

  //   // ─── Step 5: Verify saved values persisted ────────────────────────────
  //   await test.step('Verify saved recipient info persists in form fields', async () => {
  //     expect(await receiptsPage.getCompanyNameValue()).toBe(testCompanyName);
  //     expect(await receiptsPage.getPersonNameValue()).toBe(testPersonName);
  //   });

  //   // ─── Step 6: Select first radio + capture service label ───────────────
  //   let selectedServiceLabel = '';
  //   await test.step('Select first billing item (radio button outid_0)', async () => {
  //     await expect(receiptsPage.firstRadioButton).toBeVisible({ timeout: 10_000 });
  //     await receiptsPage.firstRadioButton.click();
  //     await expect(receiptsPage.firstRadioButton).toBeChecked();

  //     // Capture label text — will verify this appears in PDF
  //     selectedServiceLabel = (await receiptsPage.getRadioLabelText(0)).trim();
  //   });

  //   // ─── Step 7: Download PDF ─────────────────────────────────────────────
  //   let downloadPath = '';
  //   await test.step('Click ダウンロード and capture PDF download', async () => {
  //     await expect(receiptsPage.downloadButton).toBeVisible({ timeout: 10_000 });
  //     const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
  //     await receiptsPage.downloadButton.click();
  //     const download = await downloadPromise;

  //     // Save PDF and attach to test report using PdfUtils helper
  //     downloadPath = await PdfUtils.saveAndAttach(download, test.info(), 'receipt');
  //   });

  //   // ─── Step 8: Verify PDF binary structure ──────────────────────────────
  //   await test.step('Verify PDF file exists and has valid structure', async () => {
  //     // Validate file exists, has correct size, extension, and magic bytes
  //     PdfUtils.validatePdfStructure(downloadPath, 10000);
  //   });

  //   // ─── Step 9: Verify PDF text content using pdf-parse ─────────────────
  //   await test.step('Verify PDF text content: 領収書, 会社名, 担当者名, サービス名', async () => {
  //     const pdfData = await PdfUtils.getMetadata(downloadPath);
  //     const pdfText: string = pdfData.text;

  //     // Attach extracted text as artifact for debugging
  //     await test.info().attach('pdf-extracted-text.txt', {
  //       body: Buffer.from(pdfText, 'utf-8'),
  //       contentType: 'text/plain',
  //     });

  //     // 1. Verify receipt title exists
  //     expect(
  //       pdfText.includes('領収書'),
  //       `PDF should contain "領収書" (receipt title).\nExtracted text:\n${pdfText.slice(0, 500)}`
  //     ).toBe(true);

  //     // 2. Verify company name (宛名) appears in PDF
  //     expect(
  //       pdfText.includes(testCompanyName),
  //       `PDF should contain company name: "${testCompanyName}".\nExtracted text:\n${pdfText.slice(0, 800)}`
  //     ).toBe(true);

  //     // 3. Verify person name appears in PDF
  //     expect(
  //       pdfText.includes(testPersonName),
  //       `PDF should contain person name: "${testPersonName}".\nExtracted text:\n${pdfText.slice(0, 800)}`
  //     ).toBe(true);

  //     // 4. Verify service name from selected radio label appears in PDF
  //     // Radio label format may differ from PDF product name (line breaks, abbreviations).
  //     // Use a short common prefix (first ~8 chars) as a reliable search key.
  //     const serviceNameSegment = selectedServiceLabel.split(/\s{2,}/)[0]?.trim() ?? '';
  //     const searchKey = serviceNameSegment.slice(0, 8); // e.g. "ACプレミアム会員" — common prefix
  //     if (searchKey.length > 0) {
  //       expect(
  //         pdfText.includes(searchKey),
  //         `PDF should contain service prefix: "${searchKey}".\nFull label: "${serviceNameSegment}"\nExtracted text:\n${pdfText.slice(0, 800)}`
  //       ).toBe(true);
  //     }

  //     // 5. Verify page count (receipt should be 1 page)
  //     expect(pdfData.numPages, 'Receipt PDF should have exactly 1 page').toBe(1);
  //   });
  // });

  test('TC002 - Verify số tiền 会員種別 trên trang profile/edit khớp với email Gmail', async ({
    page,
    profileEditPage,
  }) => {
    // Increase timeout — Gmail API search may take time
    test.setTimeout(90_000);

    let membershipAmounts: string[] = [];
    let membershipText = '';

    // ─── Step 1: Navigate to /user/profile/edit ────────────────────────────
    await test.step('Navigate to Profile Edit page (/user/profile/edit)', async () => {
      await profileEditPage.goToProfileEditPage();
    });

    // ─── Step 2: Extract ALL amounts from 会員種別 section ─────────────────
    await test.step('Extract membership amounts from 会員種別', async () => {
      // Get full text of membership type section for debugging
      membershipText = await profileEditPage.getMembershipTypeText();

      // Extract ALL amounts (tax-excluded + tax-included)
      // e.g., "税別1,800円（税込1,980円）" → ['1800', '1980']
      membershipAmounts = await profileEditPage.getMembershipAllAmounts();

      // Attach membership info to test report
      await test.info().attach('membership-info.txt', {
        body: Buffer.from(
          `会員種別 Text: ${membershipText}\n` +
          `Membership Amounts: ${JSON.stringify(membershipAmounts)}`,
          'utf-8',
        ),
        contentType: 'text/plain',
      });

      // Take screenshot of profile page for evidence
      const profileScreenshot = await page.screenshot({ fullPage: true });
      await test.info().attach('profile-edit-page.png', {
        body: profileScreenshot,
        contentType: 'image/png',
      });

      // Ensure at least one amount was successfully extracted
      expect(
        membershipAmounts.length,
        `Should extract at least one amount from 会員種別 section.\n` +
        `会員種別 text: "${membershipText}"`,
      ).toBeGreaterThan(0);
    });

    // ─── Step 3: Verify amount in Gmail email using common helper ─────────
    await test.step('Verify membership amount exists in Gmail receipt email', async () => {
      await EmailVerificationHelper.verifyAmountInEmail({
        subject: 'プレミアム会員サービス登録完了のご連絡',
        expectedAmounts: membershipAmounts,
        contextLabel: '会員種別-Amount',
      });
    });
  });

  // test('TC003 - Verify trang /user/receipts hiển thị đúng cấu trúc', async ({
  //   page,
  //   receiptsPage,
  // }) => {
  //   await test.step('Navigate directly to /user/receipts', async () => {
  //     await receiptsPage.goToReceiptsPage();
  //   });

  //   await test.step('Verify page structure: heading, form fields, radio buttons, download button', async () => {
  //     await expect(receiptsPage.pageHeading).toBeVisible();
  //     await expect(receiptsPage.pageHeading).toHaveText('領収書発行');
  //     await expect(receiptsPage.companyNameInput).toBeVisible();
  //     await expect(receiptsPage.personNameInput).toBeVisible();
  //     await expect(receiptsPage.saveRecipientButton).toBeVisible();
  //     await expect(receiptsPage.firstRadioButton).toBeVisible();
  //     await expect(receiptsPage.downloadButton).toBeVisible();
  //   });

  //   await test.step('Verify column headers: 会社名, 担当者名, 宛名 are visible', async () => {
  //     await expect(page.getByText('会社名')).toBeVisible();
  //     await expect(page.getByText('担当者名')).toBeVisible();
  //     await expect(page.getByText('宛名')).toBeVisible();
  //   });

  //   // ─── Verify first radio button label has billing info ────────────────
  //   await test.step('Verify first billing item radio button has text content', async () => {
  //     const firstLabel = page.locator('label[for="outid_0"]');
  //     // Label text should contain billing period info (e.g., ACプレミアム会員サービス)
  //     const labelText = await firstLabel.textContent();
  //     expect(labelText?.trim().length, 'First radio label should have text').toBeGreaterThan(0);
  //   });
  // });
});
