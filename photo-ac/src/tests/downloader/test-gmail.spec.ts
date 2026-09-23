import * as path from 'path';
import { ProfileEditPage } from '@pages/downloader/profile-edit.page';
import { test, expect } from '../../fixtures/base.fixture';
import { searchGmailEmails, getLatestGmailEmail, getEmailBodyText, extractAmountsFromText, extractOrderId, extractPriceText } from '../../utils/gmail.utils';
import { EmailVerificationHelper, EmailVerificationResult } from '../../utils/email-verification.helper';
import { PdfUtils } from '@utils/pdf.utils';

// test('Test get email', async ({ profileEditPage }) => {
//     test.setTimeout(90_000);
//     // const emails = await getLatestGmailEmail({
//     //     subject: 'プレミアム会員サービス登録完了のご連絡'
//     // })
//     // console.log(emails);


//     const expectedOrderID = '注文ID：PRMPD-7506a55ab5416ad8';
//     const expectedPrice = '税別17,182円（税込18,900円）';

//     await EmailVerificationHelper.verifyTextInEmail({
//         subject: 'プレミアム会員サービス登録完了のご連絡',
//         expectedTexts: [expectedOrderID, expectedPrice],
//     });

//     //     await profileEditPage.goToProfileEditPage();

//     //     const priceOnProfile = await profileEditPage.getMembershipPriceText();

//     //     expect(priceText).toContain(priceOnProfile);
// })


// test('get Amount on edit page', async ({ profileEditPage }) => {
//     await profileEditPage.goToProfileEditPage();
//     let membershipText = await profileEditPage.getMembershipTypeText();

//     console.log('membershipAmounts', membershipText);

//     console.log('Amount: ', await profileEditPage.getMembershipAllAmounts());
//     console.log('Price Text: ', await profileEditPage.getMembershipPriceText());
// })

// test('Test PDF', async () => {
//     const pdfFile = path.resolve('ac_receipt_no_1910696.pdf');

//     PdfUtils.verifyContent(pdfFile, ['No. 1910696', '領収書', 'ACワークス株式会社', 'auto_company_20260719023038　御中', 'auto_person_20260719023038 様']);
//     PdfUtils.verifyContent(pdfFile, ['2026/07/13', 'ACプレミアム会員サービス', '毎月更新プラン', '1式', '¥1,800', '10%', '¥1,800']);
// })

