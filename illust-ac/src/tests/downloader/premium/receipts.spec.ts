// import { test, expect } from '../../../fixtures/base.fixture';
// import { PdfUtils } from '../../../utils/pdf.utils';
// import { EmailVerificationHelper } from '../../../utils/email-verification.helper';

// test.describe('領収書発行 — Receipt Issuance', () => {
//   // test.use({ storageState: { cookies: [], origins: [] } }); // Override to run unauthenticated

//   // Unique test data — traceable via timestamp
//   const timestamp = new Date().toISOString().replace(/[:\-T.Z]/g, '').slice(0, 14);
//   const testCompanyName = `auto_company_${timestamp}`;
//   const testPersonName = `auto_person_${timestamp}`;

//   test('TC-RECEIPTS-PREM-001: Nhập thông tin宛名, lưu, chọn radio, tải PDF và verify nội dung', async ({
//     page,
//     receiptsPage,
//   }) => {
//     // Step 1: Navigate directly to /user/receipts
//     await test.step('Navigate directly to 領収書発行 page (/user/receipts)', async () => {
//       await receiptsPage.goToReceiptsPage();
//     });

//     // Step 2: Verify page loaded
//     await test.step('Verify 領収書発行 page is displayed', async () => {
//       await expect(receiptsPage.pageHeading).toBeVisible({ timeout: 10_000 });
//       await expect(receiptsPage.companyNameInput).toBeVisible();
//       await expect(receiptsPage.personNameInput).toBeVisible();
//     });

//     // Step 3: Fill in recipient info
//     await test.step(`Fill 会社名="${testCompanyName}" and 担当者名="${testPersonName}"`, async () => {
//       await receiptsPage.fillRecipientInfo(testCompanyName, testPersonName);
//       await expect(receiptsPage.companyNameInput).toHaveValue(testCompanyName);
//       await expect(receiptsPage.personNameInput).toHaveValue(testPersonName);
//     });

//     // Step 4: Save recipient info (handle native JS alert)
//     await test.step('Click 宛名保存 and accept JS alert (宛名を保存しました。)', async () => {
//       page.once('dialog', async (dialog) => {
//         expect(dialog.message()).toContain('保存しました');
//         await dialog.accept();
//       });
//       await receiptsPage.saveRecipientInfo();
//     });

//     // Step 5: Reload page and verify saved info persists
//     await test.step('Reload page and verify 宛名 info is persisted', async () => {
//       await receiptsPage.goToReceiptsPage();
//       await expect(receiptsPage.companyNameInput).toHaveValue(testCompanyName);
//       await expect(receiptsPage.personNameInput).toHaveValue(testPersonName);
//     });

//     // Step 6: Select the first billing item (radio button)
//     await test.step('Select the first billing item radio button (outid_0)', async () => {
//       await receiptsPage.selectBillingItemByIndex(0);
//       await expect(receiptsPage.firstRadioButton).toBeChecked();
//     });

//     // Step 7: Download PDF and verify download event
//     let downloadedFilePath = '';
//     await test.step('Click ダウンロード and verify PDF file is downloaded', async () => {
//       const download = await receiptsPage.downloadReceiptPdf();
//       downloadedFilePath = await download.path() ?? '';

//       // Verify download filename matches pattern (領収書_*.pdf or similar)
//       const suggestedFilename = download.suggestedFilename();
//       expect(suggestedFilename).toMatch(/\.pdf$/i);

//       // Attach downloaded file path info to test report
//       await test.info().attach('downloaded-receipt-info.txt', {
//         body: Buffer.from(`Filename: ${suggestedFilename}\nPath: ${downloadedFilePath}`, 'utf-8'),
//         contentType: 'text/plain',
//       });
//     });

//     // Step 8: Verify PDF content using PdfUtils
//     await test.step('Verify PDF text content matches recipient and company info', async () => {
//       // PDF should contain: Company Name, Person Name, and AC Works company name
//       PdfUtils.verifyContent(downloadedFilePath, [testCompanyName, testPersonName, '領収書']);
//     });
//   });
// });
