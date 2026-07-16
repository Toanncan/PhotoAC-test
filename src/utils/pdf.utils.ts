import * as fs from 'fs';
import * as path from 'path';
import { type Download, type TestInfo } from '@playwright/test';

// Dynamically import pdf-parse to avoid issues if not installed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require('pdf-parse');

/**
 * PdfUtils — Helper class for extracting and verifying PDF content.
 *
 * Requires: npm install pdf-parse @types/pdf-parse
 */
export class PdfUtils {
  /**
   * Save the downloaded PDF and attach it directly to the Playwright test report.
   * @param download - Playwright Download object
   * @param testInfo - Playwright TestInfo object
   * @param customPrefix - Fallback prefix for filename if not suggested
   * @returns Absolute path of the saved PDF file
   */
  static async saveAndAttach(
    download: Download,
    testInfo: TestInfo,
    customPrefix: string = 'downloaded_pdf'
  ): Promise<string> {
    const downloadDir = path.resolve('test-results', 'downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const suggestedFilename = download.suggestedFilename();
    const timestamp = new Date().toISOString().replace(/[:\-T.Z]/g, '').slice(0, 14);
    const filename = suggestedFilename || `${customPrefix}_${timestamp}.pdf`;
    const downloadPath = path.join(downloadDir, filename);

    await download.saveAs(downloadPath);

    const downloadFailure = await download.failure();
    if (downloadFailure) {
      throw new Error(`Download failed: ${downloadFailure}`);
    }

    // Read saved PDF and attach to test report
    const pdfBytes = fs.readFileSync(downloadPath);
    await testInfo.attach(filename, {
      body: pdfBytes,
      contentType: 'application/pdf',
    });

    return downloadPath;
  }

  /**
   * Extract plain text from a PDF file using pdf-parse.
   * @param pdfPath - Absolute or relative path to the PDF file
   * @returns Extracted text content
   */
  static async extractText(pdfPath: string): Promise<string> {
    const resolvedPath = path.resolve(pdfPath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`PDF file not found: ${resolvedPath}`);
    }
    const buffer = fs.readFileSync(resolvedPath);
    const data = await pdfParse(buffer);
    return data.text;
  }

  /**
   * Verify that a PDF contains all expected strings.
   * @param pdfPath - Path to the PDF file
   * @param expectedStrings - Array of strings that must appear in the PDF
   * @returns Object with found/missing breakdown
   */
  static async verifyContent(
    pdfPath: string,
    expectedStrings: string[]
  ): Promise<{ text: string; found: string[]; missing: string[] }> {
    const text = await PdfUtils.extractText(pdfPath);
    const found: string[] = [];
    const missing: string[] = [];

    for (const expected of expectedStrings) {
      if (text.includes(expected)) {
        found.push(expected);
      } else {
        missing.push(expected);
      }
    }

    return { text, found, missing };
  }

  /**
   * Verify PDF magic bytes — all valid PDFs start with %PDF-
   * @param pdfPath - Path to the PDF file
   */
  static verifyMagicBytes(pdfPath: string): boolean {
    const buffer = fs.readFileSync(pdfPath);
    const header = buffer.subarray(0, 5).toString('ascii');
    return header === '%PDF-';
  }

  /**
   * Run basic validation on the PDF file (existence, size, file extension, magic bytes).
   * @param pdfPath - Local path to the PDF
   * @param minSize - Minimum size in bytes (default 10_000)
   */
  static validatePdfStructure(pdfPath: string, minSize: number = 10000): void {
    const resolvedPath = path.resolve(pdfPath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`PDF file does not exist at: ${resolvedPath}`);
    }
    const stats = fs.statSync(resolvedPath);
    if (stats.size < minSize) {
      throw new Error(`PDF file size is too small: ${stats.size} bytes (expected at least ${minSize} bytes)`);
    }
    if (!resolvedPath.toLowerCase().endsWith('.pdf')) {
      throw new Error(`File extension is not .pdf: ${resolvedPath}`);
    }
    const isMagicValid = PdfUtils.verifyMagicBytes(resolvedPath);
    if (!isMagicValid) {
      throw new Error('Invalid PDF magic bytes: file must start with %PDF-');
    }
  }

  /**
   * Get basic PDF metadata (page count, pdf-parse info).
   * @param pdfPath - Path to the PDF file
   */
  static async getMetadata(pdfPath: string): Promise<{
    numPages: number;
    info: Record<string, unknown>;
    text: string;
  }> {
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(buffer);
    return {
      numPages: data.numpages,
      info: data.info,
      text: data.text,
    };
  }
}
