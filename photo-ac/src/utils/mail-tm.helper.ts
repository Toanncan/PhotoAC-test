import { request, type APIRequestContext } from '@playwright/test';

/**
 * Interfaces representing mail.tm API data structures.
 * Reference: https://api.mail.tm
 */
export interface MailTmDomain {
  id: string;
  domain: string;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MailTmAccountResponse {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MailTmTokenResponse {
  token: string;
  id: string;
}

export interface MailTmSenderRecipient {
  address: string;
  name: string;
}

export interface MailTmMessageSummary {
  id: string;
  accountId: string;
  msgid: string;
  from: MailTmSenderRecipient;
  to: MailTmSenderRecipient[];
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MailTmMessageDetail extends MailTmMessageSummary {
  text?: string;
  html?: string[];
}

export interface MailTmAccountCredentials {
  address: string;
  password: string;
  token: string;
  accountId: string;
}

export interface CreateAccountOptions {
  /** Optional prefix for the username (default: 'ac_auto') */
  usernamePrefix?: string;
  /** Optional custom password (if omitted, a secure random one is generated) */
  password?: string;
  /** Optional specific domain from mail.tm (if omitted, the first active domain is chosen) */
  domain?: string;
}

export interface WaitForEmailOptions {
  /** Filter by email subject (case-insensitive substring match) */
  subjectContains?: string;
  /** Filter by sender address or name (case-insensitive substring match) */
  fromContains?: string;
  /** Maximum wait time in milliseconds (default: 60_000ms / 60s) */
  timeoutMs?: number;
  /** Polling interval in milliseconds (default: 3_000ms / 3s) */
  pollIntervalMs?: number;
}

/**
 * Helper client for mail.tm temporary disposable email service.
 * Used for automated registration, email verification, and activation flows
 * when temporary unique emails without '+' aliases are required.
 */
export class MailTmHelper {
  private static readonly BASE_URL = 'https://api.mail.tm';

  private requestContext?: APIRequestContext;
  private token: string = '';
  private accountId: string = '';
  private address: string = '';
  private password: string = '';

  /**
   * Optional constructor allowing injection of a pre-existing Playwright APIRequestContext.
   */
  constructor(requestContext?: APIRequestContext) {
    this.requestContext = requestContext;
  }

  /**
   * Ensure that an active APIRequestContext is available.
   */
  private async getContext(): Promise<APIRequestContext> {
    if (!this.requestContext) {
      this.requestContext = await request.newContext({
        baseURL: MailTmHelper.BASE_URL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
    return this.requestContext;
  }

  /**
   * Fetch all currently available and active domains from mail.tm.
   */
  public async getAvailableDomains(): Promise<string[]> {
    const context = await this.getContext();
    const response = await context.get('/domains?page=1');

    if (!response.ok()) {
      throw new Error(
        `[MailTmHelper] Failed to fetch domains: ${response.status()} ${response.statusText()}`
      );
    }

    const rawData = (await response.json()) as any;
    const domainList: MailTmDomain[] = Array.isArray(rawData)
      ? rawData
      : (rawData['hydra:member'] || []);

    const domains = domainList
      .filter((d) => d.isActive && !d.isPrivate)
      .map((d) => d.domain);

    if (domains.length === 0) {
      throw new Error('[MailTmHelper] No active public domains available on mail.tm');
    }

    return domains;
  }

  /**
   * Create a new temporary disposable email account and automatically authenticate to retrieve JWT token.
   *
   * @param options - Configuration options for username, password, and domain selection.
   * @returns Credentials containing the generated email address, password, token, and account ID.
   */
  public async createAccount(options?: CreateAccountOptions): Promise<MailTmAccountCredentials> {
    const context = await this.getContext();

    // 1. Determine domain
    let chosenDomain = options?.domain;
    if (!chosenDomain) {
      const activeDomains = await this.getAvailableDomains();
      chosenDomain = activeDomains[0];
    }

    // 2. Generate unique alphanumeric username (mail.tm only accepts [a-z0-9])
    const prefix = (options?.usernamePrefix || 'acfree')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    const timestampStr = Date.now().toString(36);
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const username = `${prefix}${timestampStr}${randomSuffix}`;
    const emailAddress = `${username}@${chosenDomain}`;

    const accountPassword =
      options?.password || `Pass_${randomSuffix}_${Math.floor(1000 + Math.random() * 9000)}!`;

    // 3. Register account on mail.tm
    const registerResponse = await context.post('/accounts', {
      data: {
        address: emailAddress,
        password: accountPassword,
      },
    });

    if (!registerResponse.ok()) {
      const errorBody = await registerResponse.text();
      throw new Error(
        `[MailTmHelper] Failed to register account (${emailAddress}): ${registerResponse.status()} - ${errorBody}`
      );
    }

    const accountData = (await registerResponse.json()) as MailTmAccountResponse;
    this.accountId = accountData.id;
    this.address = accountData.address;
    this.password = accountPassword;

    // 4. Authenticate to obtain JWT bearer token
    const tokenResponse = await context.post('/token', {
      data: {
        address: emailAddress,
        password: accountPassword,
      },
    });

    if (!tokenResponse.ok()) {
      const errorBody = await tokenResponse.text();
      throw new Error(
        `[MailTmHelper] Failed to obtain auth token for (${emailAddress}): ${tokenResponse.status()} - ${errorBody}`
      );
    }

    const tokenData = (await tokenResponse.json()) as MailTmTokenResponse;
    this.token = tokenData.token;

    return {
      address: this.address,
      password: this.password,
      token: this.token,
      accountId: this.accountId,
    };
  }

  /**
   * Get the current email address.
   */
  public getEmailAddress(): string {
    return this.address;
  }

  /**
   * Get the current account password.
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   * Fetch all messages in the inbox (summary list).
   */
  public async getMessages(page: number = 1): Promise<MailTmMessageSummary[]> {
    if (!this.token) {
      throw new Error('[MailTmHelper] Account has not been created or token is missing');
    }

    const context = await this.getContext();
    const response = await context.get(`/messages?page=${page}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(
        `[MailTmHelper] Failed to retrieve messages: ${response.status()} ${response.statusText()}`
      );
    }

    const rawData = (await response.json()) as any;
    const messages: MailTmMessageSummary[] = Array.isArray(rawData)
      ? rawData
      : (rawData['hydra:member'] || []);
    return messages;
  }

  /**
   * Fetch full message content (including HTML and plain text) by message ID.
   */
  public async getMessageDetail(messageId: string): Promise<MailTmMessageDetail> {
    if (!this.token) {
      throw new Error('[MailTmHelper] Account has not been created or token is missing');
    }

    const context = await this.getContext();
    const response = await context.get(`/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(
        `[MailTmHelper] Failed to retrieve message detail (${messageId}): ${response.status()} ${response.statusText()}`
      );
    }

    return (await response.json()) as MailTmMessageDetail;
  }

  /**
   * Poll the inbox until an email matching the criteria arrives or timeout occurs.
   *
   * @param options - Polling and filtering options.
   * @returns The full details of the first matched email.
   */
  public async waitForEmail(options?: WaitForEmailOptions): Promise<MailTmMessageDetail> {
    const timeoutMs = options?.timeoutMs ?? 60_000;
    const pollIntervalMs = options?.pollIntervalMs ?? 3_000;
    const subjectFilter = options?.subjectContains?.toLowerCase();
    const fromFilter = options?.fromContains?.toLowerCase();

    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      const messages = await this.getMessages(1);

      for (const msg of messages) {
        let isMatch = true;

        if (subjectFilter && !msg.subject.toLowerCase().includes(subjectFilter)) {
          isMatch = false;
        }

        if (
          fromFilter &&
          !msg.from.address.toLowerCase().includes(fromFilter) &&
          !msg.from.name.toLowerCase().includes(fromFilter)
        ) {
          isMatch = false;
        }

        if (isMatch) {
          // Retrieve complete message body (text and HTML)
          return await this.getMessageDetail(msg.id);
        }
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }

    throw new Error(
      `[MailTmHelper] Timeout after ${timeoutMs}ms waiting for email on ${this.address}. ` +
        `Filter: subject="${options?.subjectContains || '*'}", from="${options?.fromContains || '*'}"`
    );
  }

  /**
   * Extract all HTTP/HTTPS links from email body text or HTML content.
   */
  public extractLinks(content?: string): string[] {
    if (!content) return [];
    const urlRegex = /https?:\/\/[^\s"'<>]+/gi;
    const matches = content.match(urlRegex) || [];
    // Clean up trailing punctuation often attached to URLs in plain text
    return matches.map((url) => url.replace(/[.,;)]+$/, ''));
  }

  /**
   * Extract verification or activation link from email detail.
   * Looks through both plain text and HTML bodies.
   *
   * @param message - The received message detail.
   * @param customKeyword - Optional keyword or regex to match specific confirmation URL.
   */
  public extractActivationLink(
    message: MailTmMessageDetail,
    customKeyword: string | RegExp = /sendgrid\.net\/ls\/click|password-setting|confirm|verify|activate|registration|member/i
  ): string | null {
    // 1. Try finding anchor tag in HTML with text like '本登録', '認証', '確認'
    if (message.html && Array.isArray(message.html)) {
      const htmlContent = message.html.join(' ');
      const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let match: RegExpExecArray | null;
      while ((match = anchorRegex.exec(htmlContent)) !== null) {
        const href = match[1];
        const text = match[2].trim();
        if (/本登録|登録|認証|確認|activate|verify/i.test(text)) {
          // Clean up HTML entities in URL
          return href.replace(/&amp;/g, '&');
        }
      }
    }

    // 2. Fallback to searching all links matching keyword regex
    const allBodies: string[] = [];
    if (message.text) allBodies.push(message.text);
    if (message.html && Array.isArray(message.html)) allBodies.push(...message.html);

    for (const body of allBodies) {
      const links = this.extractLinks(body);
      const matched = links.find((link) => {
        if (typeof customKeyword === 'string') {
          return link.toLowerCase().includes(customKeyword.toLowerCase());
        }
        return customKeyword.test(link);
      });

      if (matched) {
        return matched.replace(/&amp;/g, '&');
      }
    }

    return null;
  }

  /**
   * Extract 4 to 8 digit verification OTP/code from email content.
   */
  public extractVerificationCode(content?: string, codeLength: number = 6): string | null {
    if (!content) return null;
    const regex = new RegExp(`\\b\\d{${codeLength}}\\b`);
    const match = content.match(regex);
    return match ? match[0] : null;
  }

  /**
   * Delete the temporary account from mail.tm to clean up resources.
   */
  public async deleteAccount(): Promise<void> {
    if (!this.accountId || !this.token) {
      return;
    }

    try {
      const context = await this.getContext();
      await context.delete(`/accounts/${this.accountId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch {
      // Ignore network failure on cleanup
    } finally {
      this.token = '';
      this.accountId = '';
    }
  }

  /**
   * Dispose of the internal Playwright APIRequestContext if created internally.
   */
  public async dispose(): Promise<void> {
    if (this.requestContext) {
      await this.requestContext.dispose().catch(() => {});
      this.requestContext = undefined;
    }
  }
}
