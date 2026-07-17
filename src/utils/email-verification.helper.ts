import { test, expect } from '../fixtures/base.fixture';
import {
  searchGmailEmails,
  getLatestGmailEmail,
  getEmailBodyText,
  extractAmountsFromText,
} from './gmail.utils';

// Re-export for convenience — specs only need to import from this file
export { extractAmountsFromText };

/**
 * Result of an email verification operation.
 */
export interface EmailVerificationResult {
  /** Whether the verification passed */
  success: boolean;
  /** The matched email index (0-based), or -1 if not found */
  matchedEmailIndex: number;
  /** The matched value (amount or text) */
  matchedValue: string;
  /** Total emails found */
  totalEmails: number;
  /** Email body text of the matched email */
  matchedEmailBody: string;
  /** Subject of the matched email */
  matchedEmailSubject: string;
}

/**
 * Options for email amount verification.
 */
export interface VerifyAmountOptions {
  /** Email subject to search for */
  subject: string;
  /** Expected amounts to match (at least one must exist in email) */
  expectedAmounts: string[];
  /** Sender filter (optional) */
  from?: string;
  /** Context label for debug attachments (e.g., '会員種別') */
  contextLabel?: string;
}

/**
 * Options for email text content verification.
 */
export interface VerifyTextOptions {
  /** Email subject to search for */
  subject: string;
  /** Expected text strings to find in email body (ALL must exist) */
  expectedTexts: string[];
  /** Sender filter (optional) */
  from?: string;
  /** Context label for debug attachments */
  contextLabel?: string;
  /** If true, checks ANY text matches (OR logic). Default: ALL must match (AND logic) */
  matchAny?: boolean;
}

/**
 * Options for verifying email existence.
 */
export interface VerifyEmailExistsOptions {
  /** Email subject to search for */
  subject: string;
  /** Sender filter (optional) */
  from?: string;
  /** Context label for debug attachments */
  contextLabel?: string;
}

/**
 * EmailVerificationHelper — Reusable helper for verifying email content in tests.
 *
 * Wraps Gmail API calls with Playwright test.step integration,
 * automatic debug attachments, and clear assertion messages.
 *
 * @example
 * ```typescript
 * // Verify amount exists in email
 * await EmailVerificationHelper.verifyAmountInEmail({
 *   subject: 'プレミアム会員サービス登録完了のご連絡',
 *   expectedAmounts: ['1800', '1980'],
 * });
 *
 * // Verify text content in email
 * await EmailVerificationHelper.verifyTextInEmail({
 *   subject: '会員登録完了',
 *   expectedTexts: ['プレミアム会員', 'toancan@gmail.com'],
 * });
 *
 * // Just verify email exists
 * const email = await EmailVerificationHelper.verifyEmailExists({
 *   subject: '退会完了',
 * });
 * ```
 */
export class EmailVerificationHelper {

  /**
   * Verify that at least one email with the given subject contains
   * at least one of the expected amounts.
   *
   * Searches ALL emails matching the subject, extracts ¥/円 amounts
   * from each, and cross-compares with expected amounts.
   *
   * @param options - Verification options
   * @returns Verification result with match details
   */
  static async verifyAmountInEmail(
    options: VerifyAmountOptions,
  ): Promise<EmailVerificationResult> {
    const {
      subject,
      expectedAmounts,
      from,
      contextLabel = 'Email Amount Verification',
    } = options;

    return test.step(`[Email] Verify amount in email: "${subject}"`, async () => {
      // Search all matching emails
      const emails = await searchGmailEmails({
        subject,
        from,
        include_body: true,
        wait_time_sec: 10,
        max_wait_time_sec: 30,
      });

      // Assert: at least one email found
      expect(
        emails.length,
        `[${contextLabel}] Should find at least one email with subject "${subject}"`,
      ).toBeGreaterThan(0);

      // Log all emails for debugging
      const emailSummaries = emails.map((e, i) => {
        const body = getEmailBodyText(e);
        const amounts = extractAmountsFromText(body);
        return `Email #${i + 1}: Subject="${e.subject}", Amounts=${JSON.stringify(amounts)}`;
      });

      await test.info().attach(`${contextLabel}-all-emails.txt`, {
        body: Buffer.from(emailSummaries.join('\n'), 'utf-8'),
        contentType: 'text/plain',
      });

      // Cross-compare amounts
      let matchFound = false;
      let matchedEmailIndex = -1;
      let matchedAmount = '';
      const allEmailAmounts: string[][] = [];

      for (let i = 0; i < emails.length; i++) {
        const body = getEmailBodyText(emails[i]);
        const emailAmounts = extractAmountsFromText(body);
        allEmailAmounts.push(emailAmounts);

        for (const expected of expectedAmounts) {
          if (emailAmounts.includes(expected)) {
            matchFound = true;
            matchedEmailIndex = i;
            matchedAmount = expected;
            break;
          }
        }
        if (matchFound) break;
      }

      // Attach verification result
      await test.info().attach(`${contextLabel}-result.txt`, {
        body: Buffer.from(
          `Expected Amounts: ${JSON.stringify(expectedAmounts)}\n` +
          `Total emails found: ${emails.length}\n` +
          `All email amounts: ${JSON.stringify(allEmailAmounts)}\n` +
          `Match found: ${matchFound}\n` +
          `Matched amount: ${matchedAmount}\n` +
          `Matched email #: ${matchedEmailIndex + 1}`,
          'utf-8',
        ),
        contentType: 'text/plain',
      });

      // Assert
      expect(
        matchFound,
        `[${contextLabel}] Expected at least one email to contain amounts ${JSON.stringify(expectedAmounts)}.\n` +
        `Emails found: ${emails.length}\n` +
        `All email amounts: ${JSON.stringify(allEmailAmounts)}`,
      ).toBe(true);

      return {
        success: matchFound,
        matchedEmailIndex,
        matchedValue: matchedAmount,
        totalEmails: emails.length,
        matchedEmailBody: matchedEmailIndex >= 0
          ? getEmailBodyText(emails[matchedEmailIndex])
          : '',
        matchedEmailSubject: matchedEmailIndex >= 0
          ? emails[matchedEmailIndex].subject
          : '',
      };
    });
  }

  /**
   * Verify that an email with the given subject contains
   * the expected text content in its body.
   *
   * By default, ALL expected texts must be found (AND logic).
   * Set matchAny=true for OR logic (at least one text found).
   *
   * @param options - Verification options
   * @returns Verification result
   */
  static async verifyTextInEmail(
    options: VerifyTextOptions,
  ): Promise<EmailVerificationResult> {
    const {
      subject,
      expectedTexts,
      from,
      contextLabel = 'Email Text Verification',
      matchAny = false,
    } = options;

    return test.step(`[Email] Verify text in email: "${subject}"`, async () => {
      // Get latest matching email
      const email = await getLatestGmailEmail({
        subject,
        from,
        include_body: true,
        wait_time_sec: 10,
        max_wait_time_sec: 30,
      });

      expect(
        email,
        `[${contextLabel}] Should find email with subject "${subject}"`,
      ).not.toBeNull();

      const bodyText = getEmailBodyText(email!);

      // Attach email body for debugging
      await test.info().attach(`${contextLabel}-email-body.txt`, {
        body: Buffer.from(
          `Subject: ${email!.subject}\n---\n${bodyText}`,
          'utf-8',
        ),
        contentType: 'text/plain',
      });

      // Check text presence
      const results = expectedTexts.map((text) => ({
        text,
        found: bodyText.includes(text),
      }));

      const matchFound = matchAny
        ? results.some((r) => r.found)
        : results.every((r) => r.found);

      const matchedTexts = results.filter((r) => r.found).map((r) => r.text);
      const missingTexts = results.filter((r) => !r.found).map((r) => r.text);

      // Attach verification result
      await test.info().attach(`${contextLabel}-result.txt`, {
        body: Buffer.from(
          `Mode: ${matchAny ? 'ANY (OR)' : 'ALL (AND)'}\n` +
          `Expected texts: ${JSON.stringify(expectedTexts)}\n` +
          `Found: ${JSON.stringify(matchedTexts)}\n` +
          `Missing: ${JSON.stringify(missingTexts)}\n` +
          `Result: ${matchFound ? 'PASS' : 'FAIL'}`,
          'utf-8',
        ),
        contentType: 'text/plain',
      });

      // Assert
      expect(
        matchFound,
        `[${contextLabel}] Expected email body to contain ${matchAny ? 'at least one of' : 'all of'}: ${JSON.stringify(expectedTexts)}.\n` +
        `Missing: ${JSON.stringify(missingTexts)}\n` +
        `Subject: "${email!.subject}"`,
      ).toBe(true);

      return {
        success: matchFound,
        matchedEmailIndex: 0,
        matchedValue: matchedTexts.join(', '),
        totalEmails: 1,
        matchedEmailBody: bodyText,
        matchedEmailSubject: email!.subject,
      };
    });
  }

  /**
   * Verify that an email with the given subject exists in the inbox.
   * Returns the email body text for further custom verification.
   *
   * @param options - Search options
   * @returns Object with email body text and subject
   */
  static async verifyEmailExists(
    options: VerifyEmailExistsOptions,
  ): Promise<{ body: string; subject: string; allBodies: string[] }> {
    const {
      subject,
      from,
      contextLabel = 'Email Exists Check',
    } = options;

    return test.step(`[Email] Verify email exists: "${subject}"`, async () => {
      const emails = await searchGmailEmails({
        subject,
        from,
        include_body: true,
        wait_time_sec: 10,
        max_wait_time_sec: 30,
      });

      expect(
        emails.length,
        `[${contextLabel}] Should find at least one email with subject "${subject}"`,
      ).toBeGreaterThan(0);

      const latestBody = getEmailBodyText(emails[0]);
      const allBodies = emails.map((e) => getEmailBodyText(e));

      // Attach summary
      await test.info().attach(`${contextLabel}-summary.txt`, {
        body: Buffer.from(
          `Total emails found: ${emails.length}\n` +
          `Latest subject: ${emails[0].subject}\n` +
          `Latest body preview: ${latestBody.slice(0, 300)}...`,
          'utf-8',
        ),
        contentType: 'text/plain',
      });

      return {
        body: latestBody,
        subject: emails[0].subject,
        allBodies,
      };
    });
  }

  /**
   * Get all emails matching the given subject.
   * No assertions — returns raw data for custom verification.
   *
   * @param subject - Email subject to search
   * @param from - Optional sender filter
   * @returns Array of { subject, body, amounts }
   */
  static async getAllMatchingEmails(
    subject: string,
    from?: string,
  ): Promise<Array<{ subject: string; body: string; amounts: string[] }>> {
    const emails = await searchGmailEmails({
      subject,
      from,
      include_body: true,
      wait_time_sec: 10,
      max_wait_time_sec: 30,
    });

    return emails.map((e) => {
      const body = getEmailBodyText(e);
      return {
        subject: e.subject,
        body,
        amounts: extractAmountsFromText(body),
      };
    });
  }
}
