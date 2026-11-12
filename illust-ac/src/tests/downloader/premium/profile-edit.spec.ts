// import { test, expect } from '../../../fixtures/base.fixture';
// import { EmailVerificationHelper } from '../../../utils/email-verification.helper';

// test.describe('Profile Edit — Premium User', () => {
//   test('TC-PROFILE-PREM-001: Verify số tiền 会員種別 trên trang profile/edit khớp với email Gmail', async ({
//       page,
//       profileEditPage,
//   }) => {
//       // Increase timeout — Gmail API search may take time
//       test.setTimeout(90_000);

//       let membershipAmounts: string[] = [];
//       let membershipText = '';

//       // Step 1: Navigate to /user/profile/edit
//       await test.step('Navigate to Profile Edit page (/user/profile/edit)', async () => {
//           await profileEditPage.goToProfileEditPage();
//       });

//       // Step 2: Extract ALL amounts from 会員種別 section
//       await test.step('Extract membership amounts from 会員種別', async () => {
//           // Get full text of membership type section for debugging
//           membershipText = await profileEditPage.getMembershipTypeText();

//           // Extract ALL amounts (tax-excluded + tax-included)
//           // e.g., "税別1,800円（税込1,980円）" → ['1800', '1980']
//           membershipAmounts = await profileEditPage.getMembershipAllAmounts();

//           // Attach membership info to test report
//           await test.info().attach('membership-info.txt', {
//               body: Buffer.from(
//                   `会員種別 Text: ${membershipText}\n` +
//                   `Membership Amounts: ${JSON.stringify(membershipAmounts)}`,
//                   'utf-8',
//               ),
//               contentType: 'text/plain',
//           });

//           // Take screenshot of profile page for evidence
//           const profileScreenshot = await page.screenshot({ fullPage: true });
//           await test.info().attach('profile-edit-screenshot.png', {
//               body: profileScreenshot,
//               contentType: 'image/png',
//           });

//           // Verify at least one amount was extracted from the profile page
//           expect(
//               membershipAmounts.length,
//               `Expected to find at least 1 amount in 会員種別 section. Full text: "${membershipText}"`,
//           ).toBeGreaterThan(0);
//       });

//       // Step 3: Search Gmail for receipt email
//       await test.step('Search Gmail for premium registration/receipt email', async () => {
//           const verification = await EmailVerificationHelper.verifyRegistrationReceiptEmail({
//               subjectQuery: 'プレミアム会員',
//               expectedAmounts: membershipAmounts,
//           });

//           // Attach email content to report
//           if (verification.emailSnippet) {
//               await test.info().attach('matched-email-snippet.txt', {
//                   body: Buffer.from(verification.emailSnippet, 'utf-8'),
//                   contentType: 'text/plain',
//               });
//           }

//           // Assert verification result
//           expect(
//               verification.success,
//               `Email verification failed: ${verification.message}\n` +
//               `Expected amounts from profile page: ${JSON.stringify(membershipAmounts)}\n` +
//               `Matched amounts in email: ${JSON.stringify(verification.matchedAmounts)}`,
//           ).toBe(true);
//       });
//   });
// });
