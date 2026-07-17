import * as path from 'path';

/**
 * Gmail Utility — Reads emails via Gmail API using gmail-tester.
 *
 * Prerequisites:
 * 1. Enable Gmail API in Google Cloud Console
 * 2. Create OAuth Desktop credentials → download as credentials.json
 * 3. Run: node node_modules/gmail-tester/init.js credentials.json gmail-token.json your@gmail.com
 * 4. Place credentials.json and gmail-token.json in project root
 *
 * @see https://www.npmjs.com/package/gmail-tester
 */

// gmail-tester uses CommonJS — require() is needed
// eslint-disable-next-line @typescript-eslint/no-require-imports
const gmail = require('gmail-tester');

/** Path to OAuth credentials file */
const CREDENTIALS_PATH = path.resolve(process.cwd(), 'credentials.json');

/** Path to OAuth token file */
const TOKEN_PATH = path.resolve(process.cwd(), 'gmail-token.json');

/**
 * Options for searching Gmail emails.
 */
interface GmailSearchOptions {
  /** Email subject to search for (partial match) */
  subject?: string;
  /** Sender email address filter */
  from?: string;
  /** Recipient email address filter */
  to?: string;
  /** Include body in results (default: true) */
  include_body?: boolean;
  /** Max wait time in seconds for email to arrive (default: 10) */
  wait_time_sec?: number;
  /** Max total wait time in milliseconds (default: 30000) */
  max_wait_time_sec?: number;
  /** Search after this date (ISO string or Date) */
  after?: Date | string;
  /** Search before this date (ISO string or Date) */
  before?: Date | string;
}

/**
 * Email object returned by gmail-tester.
 */
interface GmailEmail {
  /** Email subject */
  subject: string;
  /** Sender info */
  from: { name?: string; address: string };
  /** Recipient info */
  to: { name?: string; address: string };
  /** Email body (HTML) */
  body: {
    html: string;
    text?: string;
  };
  /** Received date */
  date: string;
  /** Message ID */
  message_id?: string;
}

/**
 * Search for emails in Gmail inbox matching the given criteria.
 * Uses Gmail API — no browser needed.
 *
 * @param options - Search criteria
 * @returns Array of matching emails, or empty array if none found
 */
export async function searchGmailEmails(
  options: GmailSearchOptions,
): Promise<GmailEmail[]> {
  const {
    subject,
    from,
    to,
    include_body = true,
    wait_time_sec = 10,
    max_wait_time_sec = 30,
    after,
    before,
  } = options;

  try {
    // Build options — only include defined fields to avoid 'undefined' in logs
    const searchOptions: Record<string, unknown> = {
      include_body,
      wait_time_sec,
      max_wait_time_sec,
    };
    if (subject) searchOptions.subject = subject;
    if (from) searchOptions.from = from;
    if (to) searchOptions.to = to;
    if (after) searchOptions.after = new Date(after);
    if (before) searchOptions.before = new Date(before);

    const emails = await gmail.check_inbox(
      CREDENTIALS_PATH,
      TOKEN_PATH,
      searchOptions,
    );

    return emails || [];
  } catch (error) {
    console.error('[Gmail Utils] Error searching emails:', error);
    return [];
  }
}

/**
 * Get the latest email matching the given criteria.
 *
 * @param options - Search criteria
 * @returns The latest matching email, or null if none found
 */
export async function getLatestGmailEmail(
  options: GmailSearchOptions,
): Promise<GmailEmail | null> {
  const emails = await searchGmailEmails(options);
  return emails.length > 0 ? emails[0] : null;
}

/**
 * Extract the email body text from a Gmail email object.
 * Falls back to stripping HTML tags if plain text is not available.
 *
 * @param email - Gmail email object
 * @returns Plain text body content
 */
export function getEmailBodyText(email: GmailEmail): string {
  if (email.body.text) {
    return email.body.text.trim();
  }
  // Fallback: strip HTML tags
  if (email.body.html) {
    return email.body.html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return '';
}

/**
 * Extract monetary amounts from email body text.
 * Supports formats: ¥1,980 / ￥1,980 / 1,980円 / 1980円
 *
 * @param emailBody - Plain text or HTML body
 * @returns Array of numeric amount strings (without commas)
 */
export function extractAmountsFromText(emailBody: string): string[] {
  // Strip HTML if needed
  const cleanText = emailBody.replace(/<[^>]*>/g, ' ');

  // Match Japanese Yen patterns: ¥1,980 / ￥1,980 / 1,980円 / 1980円
  // Note: No year filter needed — regex requires ¥/￥ prefix or 円 suffix,
  // so standalone year numbers (2026年) won't match.
  const amountRegex = /[¥￥]\s*([\d,]+)|([\d,]+)\s*円/g;
  const amounts: string[] = [];
  let match;

  while ((match = amountRegex.exec(cleanText)) !== null) {
    const amount = (match[1] || match[2]).replace(/,/g, '');
    amounts.push(amount);
  }

  return amounts;
}
