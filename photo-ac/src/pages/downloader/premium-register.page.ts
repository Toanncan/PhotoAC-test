import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';

/**
 * PremiumRegisterPage — Page Object for the Premium registration / campaign checkout page.
 * Handles payment method selection (Credit Card, etc.), card input form, and subscription submission.
 */
export class PremiumRegisterPage extends BasePage {
  // Header & Campaign Locators
  /** Heading for the campaign / discounted offer */
  readonly campaignHeading: Locator = this.page.locator('text=一度限りの特別価格！');

  /** Sub-heading for the half-price first download promotion */
  readonly campaignSubHeading: Locator = this.page.locator(
    'text=「ダウンロードし放題」「検索し放題」のプレミアム会員が今だけ半額！'
  );

  /** Plan price tag (9,450 / 年) */
  readonly campaignPrice: Locator = this.page.locator('text=9,450');

  // Payment Methods
  /** Credit card payment radio input */
  readonly creditCardRadio: Locator = this.page.locator('#method-credit');

  /** Credit card payment clickable label */
  readonly creditCardLabel: Locator = this.page.locator('label[for="method-credit"]');

  /** Bank transfer / convenience store payment radio */
  readonly bankTransferRadio: Locator = this.page.locator('#premium-select-kouza');

  /** Bank transfer / convenience store payment label */
  readonly bankTransferLabel: Locator = this.page.locator('label[for="premium-select-kouza"]');

  /** Global site confirmation modal "登録を続ける" (Continue registration) button */
  readonly globalConfirmButton: Locator = this.page.locator('a.btn-hide-modal-global:has-text("登録を続ける")');

  // Credit Card Form Locators
  /** Credit card number input (placeholder: 0000111122223333) */
  readonly cardNumberInput: Locator = this.page.locator('#CardNo');

  /** Card expiration month dropdown (01 - 12) */
  readonly expireMonthSelect: Locator = this.page.locator('#expire_month');

  /** Card expiration year dropdown (YYYY) */
  readonly expireYearSelect: Locator = this.page.locator('#expire_year');

  /** Security code (CVC/CVV) input (placeholder: 123) */
  readonly securityCodeInput: Locator = this.page.locator('#SecurityCode');

  /** Terms and privacy policy agreement checkbox */
  readonly agreeTermsCheckbox: Locator = this.page.locator('#AgreeTerms');

  /** reCAPTCHA verification modal (#modal-recaptcha-limit-card) */
  readonly recaptchaModal: Locator = this.page.locator('#modal-recaptcha-limit-card');

  /** Close button for reCAPTCHA modal if needed */
  readonly recaptchaModalCloseButton: Locator = this.page.locator('#modal-recaptcha-limit-card .close, #modal-recaptcha-limit-card button:has-text("×")');

  /** Final subscription submit button for Credit Card (プレミアム会員サービスに参加する) */
  readonly submitButton: Locator = this.page
    .locator('form:has(#CardNo) button:has-text("プレミアム会員サービスに参加する"), button.ac-btn-photo:has-text("プレミアム会員サービスに参加する")')
    .first();

  /** Error alert banner if payment fails */
  readonly paymentErrorMessage: Locator = this.page.locator('.alert-danger, .error-msg, .text-danger:visible');

  // Confirm Page Locators (/premium/confirm)
  /** Confirm page heading (申し込み内容のご確認) */
  readonly confirmHeading: Locator = this.page.locator('text=申し込み内容のご確認');

  /** Discount badge on confirm page ([ 初回ダウンロードクーポン50%OFF適用 ]) */
  readonly confirmDiscountBadge: Locator = this.page.locator('text=初回ダウンロードクーポン50%OFF適用');

  /** Discounted price tag on confirm page (9,450円(税込)／年) */
  readonly confirmDiscountPrice: Locator = this.page.locator('text=9,450円(税込)／年');

  /** Card info display on confirm page (VISA 下4桁 1111) */
  readonly confirmCardDigits: Locator = this.page.locator('text=VISA 下4桁 1111');

  /** Questionnaire survey select dropdowns on /premium/confirm (アンケート) */
  readonly questionnaireSelects: Locator = this.page.locator('tr:has-text("アンケート") select, select');

  /** Final confirmation submit button on /premium/confirm (プレミアム会員サービスに参加する) */
  readonly confirmSubmitButton: Locator = this.page
    .locator('button:has-text("プレミアム会員サービスに参加する"), a:has-text("プレミアム会員サービスに参加する"), input[value*="プレミアム会員サービスに参加する"]')
    .last();

  /** Back button on confirm page (戻る) */
  readonly confirmBackButton: Locator = this.page.locator('button:has-text("戻る"), a:has-text("戻る")');

  /** Completion heading on /premium/complete or thanks page */
  readonly completionHeading: Locator = this.page
    .locator('h1, h2, .lead, strong')
    .filter({ hasText: /完了|ありがとう|プレミアム会員/ });

  constructor(page: Page) {
    super(page);
  }

  // Action Methods
  /**
   * Select Credit Card payment method.
   * Handles the global site confirmation popup ("このwebサイトは、日本版のイラストAC/写真ACサイトです... 登録を続けますか？")
   * if it appears upon selecting the radio option.
   */
  async selectCreditCardPayment(): Promise<void> {
    await test.step('Select Credit Card payment option and handle confirmation modal if needed', async () => {
      await this.creditCardLabel.scrollIntoViewIfNeeded().catch(() => {});
      await this.clickElement(this.creditCardLabel);

      // Wait for confirmation popup if it appears (Bootstrap modal transition)
      await this.globalConfirmButton.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {});
      if (await this.globalConfirmButton.isVisible().catch(() => false)) {
        await this.clickElement(this.globalConfirmButton);
        // Wait for confirmation modal to fade out
        await this.globalConfirmButton.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => {});
      }

      // If radio is not checked yet, click the label again now that confirmation modal is closed
      const isChecked = await this.creditCardRadio.isChecked().catch(() => false);
      if (!isChecked) {
        await this.clickElement(this.creditCardLabel);
      }

      // Wait for credit card number input to become visible
      await this.cardNumberInput.waitFor({ state: 'visible', timeout: 15_000 });
    });
  }

  /**
   * Fill credit card details into the form.
   * @param cardInfo - Card number, expiration month, expiration year, and security code
   */
  async fillCreditCardInfo(cardInfo: {
    cardNo: string;
    expireMonth: string;
    expireYear: string;
    securityCode: string;
  }): Promise<void> {
    await test.step('Fill Credit Card details', async () => {
      await this.fillInput(this.cardNumberInput, cardInfo.cardNo);
      await this.expireMonthSelect.selectOption(cardInfo.expireMonth);
      await this.expireYearSelect.selectOption(cardInfo.expireYear);
      await this.fillInput(this.securityCodeInput, cardInfo.securityCode);
    });
  }

  /**
   * Ensure Terms agreement checkbox is checked.
   */
  async ensureTermsAgreed(): Promise<void> {
    await test.step('Ensure Terms agreement checkbox is checked', async () => {
      const isChecked = await this.agreeTermsCheckbox.isChecked().catch(() => false);
      if (!isChecked) {
        await this.agreeTermsCheckbox.check();
      }
    });
  }

  /**
   * Click submit button to participate in Premium service.
   */
  async clickSubmitRegistration(): Promise<void> {
    await test.step('Click Submit Registration button (プレミアム会員サービスに参加する)', async () => {
      await this.clickElement(this.submitButton);
    });
  }

  /**
   * Handle reCAPTCHA modal if it appears after submitting registration.
   * Finds the reCAPTCHA anchor iframe and clicks the 'I am not a robot' checkbox.
   * @param timeoutMs - Maximum time to wait for reCAPTCHA modal to appear (default: 8000ms)
   */
  async handleRecaptchaIfPresent(timeoutMs: number = 8_000): Promise<boolean> {
    return await test.step('Handle reCAPTCHA challenge modal if present', async () => {
      const isModalVisible = await this.recaptchaModal
        .waitFor({ state: 'visible', timeout: timeoutMs })
        .then(() => true)
        .catch(() => false);

      if (!isModalVisible) {
        return false;
      }

      const recaptchaAnchor = this.page
        .frameLocator('iframe[src*="/recaptcha/api2/anchor"]')
        .locator('#recaptcha-anchor');

      await recaptchaAnchor.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {});
      if (await recaptchaAnchor.isVisible().catch(() => false)) {
        await recaptchaAnchor.click();

        // Wait for checkmark to appear (aria-checked="true")
        await this.page
          .frameLocator('iframe[src*="/recaptcha/api2/anchor"]')
          .locator('#recaptcha-anchor[aria-checked="true"]')
          .waitFor({ state: 'visible', timeout: 10_000 })
          .catch(() => {});
      }

      // Wait for modal to disappear after successful verification
      await this.recaptchaModal.waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
      return true;
    });
  }

  /**
   * Fill questionnaire survey dropdowns on /premium/confirm page (アンケート).
   * Iterates through visible select elements, filters valid non-empty options, and selects valid answers.
   */
  async fillQuestionnaire(): Promise<void> {
    await test.step('Fill questionnaire survey options on /premium/confirm (アンケート)', async () => {
      const selects = this.questionnaireSelects;
      const count = await selects.count();
      for (let i = 0; i < count; i++) {
        const select = selects.nth(i);
        if (await select.isVisible().catch(() => false)) {
          await select.scrollIntoViewIfNeeded().catch(() => {});
          const validValues = await select
            .locator('option')
            .evaluateAll((opts: HTMLOptionElement[]) =>
              opts.map((o) => o.value).filter((val) => val && val.trim() !== '' && val !== '0')
            )
            .catch(() => []);

          if (validValues.length > 0) {
            await select.selectOption(validValues[0]).catch(() => {});
          } else {
            await select.selectOption({ index: 1 }).catch(() => {});
          }
        }
      }
    });
  }

  /**
   * Complete subscription on /premium/confirm:
   * Fills the questionnaire survey and clicks the final submit button.
   */
  async confirmAndFinalizeSubscription(): Promise<void> {
    await test.step('Fill questionnaire survey and click final submit button on /premium/confirm', async () => {
      // 1. Fill questionnaire survey dropdowns
      await this.fillQuestionnaire();

      // 2. Click final submission button
      await this.confirmSubmitButton.waitFor({ state: 'visible', timeout: 15_000 });
      await this.confirmSubmitButton.scrollIntoViewIfNeeded().catch(() => {});
      await this.clickElement(this.confirmSubmitButton);
    });
  }
}

