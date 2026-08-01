import { test, expect } from '../../fixtures/base.fixture';
import { EmailVerificationHelper } from '../../utils/email-verification.helper';


test('TC001 - Verify số tiền 会員種別 trên trang profile/edit khớp với email Gmail', async ({
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

        // Precondition: account must be a premium member to have amounts
        // Free member text: "無料会員（プレミアム会員に登録する）" — no amounts
        if (membershipAmounts.length === 0) {
            test.skip(true, `Account is not a premium member — no amounts found.\n会員種別: "${membershipText}"`);
        }
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