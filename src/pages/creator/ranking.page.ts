import { type Page, type Locator, test } from '@playwright/test';
import { BasePage } from '../common/base.page';


export class RankingPage extends BasePage {
  // ─── URL ─────────────────────────────────────────────────────────────────

  readonly PAGE_URL = '/creator/ranking';

  // ─── Page Heading ─────────────────────────────────────────────────────────

  /** H1 heading: ランキング */
  readonly pageHeading: Locator = this.page.getByRole('heading', {
    name: 'ランキング',
    level: 1,
  });

  // ─── Info Alert (point calculation notice) ───────────────────────────────

  /** Alert message: ポイントを計測中です。結果の反映まで今しばらくお待ちください。 */
  readonly pointCalcAlert: Locator = this.page.getByRole('alert');

  // ─── Section Headers ─────────────────────────────────────────────────────

  /** Section 1 header text: ■ダウンロードランキング */
  readonly downloadRankingSection: Locator = this.page.locator(
    'text=■ダウンロードランキング'
  );

  /** Section 2 header text: ■ライセンス販売数 */
  readonly licenseRankingSection: Locator = this.page.locator(
    'text=■ライセンス販売数'
  );

  /** Section 3 header text: ■ページビューランキング */
  readonly pageViewRankingSection: Locator = this.page.locator(
    'text=■ページビューランキング'
  );

  /** Section 4 header text: ■写真掲載数・NICE!数・ファン数ランキング */
  readonly uploadNiceFanRankingSection: Locator = this.page.locator(
    'text=■写真掲載数・NICE!数・ファン数ランキング'
  );

  // ─── Tables ───────────────────────────────────────────────────────────────

  /** All ranking tables — expects 4 tables on the page */
  readonly rankingTables: Locator = this.page.getByRole('table');

  // ─── Table 1: Download Ranking ────────────────────────────────────────────

  /** Column headers for Download Ranking table */
  readonly downloadTableHeaders: Locator = this.rankingTables
    .first()
    .getByRole('columnheader');

  /** ダウンロード数 (Download count) row in Download Ranking */
  readonly downloadCountRow: Locator = this.rankingTables.first().getByRole('row', {
    name: /ダウンロード数/,
  });

  /** ランキング (Ranking position) row in Download Ranking */
  readonly downloadRankingRow: Locator = this.rankingTables.first().getByRole('row', {
    name: /ランキング/,
  });

  // ─── Table 2: License Sales Ranking ─────────────────────────────────────

  /** License sales count row */
  readonly licenseSalesCountRow: Locator = this.rankingTables.nth(1).getByRole('row', {
    name: /ダウンロード数/,
  });

  /** 獲得ポイント数 (Points earned) row */
  readonly licensePointsRow: Locator = this.rankingTables.nth(1).getByRole('row', {
    name: /獲得ポイント数/,
  });

  // ─── Table 3: Page View Ranking ───────────────────────────────────────────

  /** PV数 (Page view count) row */
  readonly pvCountRow: Locator = this.rankingTables.nth(2).getByRole('row', {
    name: /PV数/,
  });

  /** Ranking row for page views */
  readonly pvRankingRow: Locator = this.rankingTables.nth(2).getByRole('row', {
    name: /ランキング/,
  });

  // ─── Table 4: Upload / NICE / Fan Ranking ────────────────────────────────

  /** 写真総数 column header */
  readonly uploadCountHeader: Locator = this.rankingTables.nth(3).getByRole('columnheader', {
    name: '写真総数',
  });

  /** NICE!数 column header */
  readonly niceCountHeader: Locator = this.rankingTables.nth(3).getByRole('columnheader', {
    name: 'NICE!数',
  });

  /** ファン人数 column header */
  readonly fanCountHeader: Locator = this.rankingTables.nth(3).getByRole('columnheader', {
    name: 'ファン人数',
  });

  // ─── Daily Report Checkboxes ─────────────────────────────────────────────

  /** H2 heading: 毎日レポートをお送りしましょうか？ */
  readonly dailyReportHeading: Locator = this.page.getByRole('heading', {
    name: '毎日レポートをお送りしましょうか？',
    level: 2,
  });

  /** デイリーレポートを受け取る checkbox */
  readonly dailyReportCheckbox: Locator = this.page.getByRole('checkbox', {
    name: 'デイリーレポートを受け取る',
  });

  /** マンスリーレポートを受け取る checkbox */
  readonly monthlyReportCheckbox: Locator = this.page.getByRole('checkbox', {
    name: 'マンスリーレポートを受け取る（毎月1日配信）',
  });

  // ─── Methods ──────────────────────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the Creator Ranking page.
   */
  async goToRankingPage(): Promise<void> {
    await test.step('Navigate to Creator Ranking page', async () => {
      await this.navigate(this.PAGE_URL);
      // await this.waitForPageLoad();
    });
  }

  /**
   * Get the text content of all cells in the first column of a table.
   * Used to verify row labels are rendered correctly.
   * @param tableIndex - 0-based index of the table
   */
  async getTableRowLabels(tableIndex: number): Promise<string[]> {
    return await test.step(`Get row labels from table ${tableIndex + 1}`, async () => {
      const rows = this.rankingTables.nth(tableIndex).getByRole('row');
      const count = await rows.count();
      const labels: string[] = [];
      for (let i = 1; i < count; i++) {
        const cells = rows.nth(i).getByRole('cell');
        const firstCellText = await cells.first().textContent();
        if (firstCellText) {
          labels.push(firstCellText.trim());
        }
      }
      return labels;
    });
  }

  /**
   * Get the total number of ranking tables on the page.
   */
  async getTableCount(): Promise<number> {
    return await test.step('Count ranking tables on page', async () => {
      return this.rankingTables.count();
    });
  }

  /**
   * Check if all table column headers contain valid (non-empty, non-garbled) text.
   * Returns text from all column headers for assertion.
   */
  async getAllColumnHeaderTexts(): Promise<string[]> {
    return await test.step('Get all column header texts', async () => {
      const headers = this.page.getByRole('columnheader');
      const count = await headers.count();
      const texts: string[] = [];
      for (let i = 0; i < count; i++) {
        const text = await headers.nth(i).textContent();
        if (text) {
          texts.push(text.trim());
        }
      }
      return texts;
    });
  }

  /**
   * Evaluate font families applied to page elements.
   * Used to verify no font fallback (tofu/garbled) rendering.
   */
  async getFontFamiliesOnPage(): Promise<string[]> {
    return await test.step('Evaluate font families on page elements', async () => {
      return this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h1, h2, th, td')).slice(0, 20);
        return elements
          .map((el) => window.getComputedStyle(el).fontFamily)
          .filter((font, index, self) => self.indexOf(font) === index); // unique
      });
    });
  }

  /**
   * Check if any text on the page contains tofu (□) or replacement characters (???).
   * Returns list of suspicious text nodes found.
   */
  async getGarbledTextElements(): Promise<string[]> {
    return await test.step('Scan for garbled/tofu characters on page', async () => {
      return this.page.evaluate(() => {
        const allTextNodes: string[] = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          const text = node.textContent?.trim() ?? '';
          // Tofu char □ = U+25A1 or replacement char  = U+FFFD
          if (text && (text.includes('\u25A1') || text.includes('\uFFFD') || text.includes('????'))) {
            allTextNodes.push(text.substring(0, 100));
          }
          node = walker.nextNode();
        }
        return allTextNodes;
      });
    });
  }
}
