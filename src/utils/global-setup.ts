import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env before reading env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * global-setup.ts
 *
 * Runs ONCE before all tests. Generates the `environment.properties` file
 * inside `allure-results/` so the Allure Report dashboard displays
 * the "Environment" widget with project metadata.
 *
 * Format required by Allure: KEY=VALUE (one per line, no quotes)
 */
async function globalSetup(): Promise<void> {
  const allureResultsDir = path.resolve(process.cwd(), 'allure-results');

  // Ensure allure-results directory exists
  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }

  const env = process.env.ENV || 'staging';
  const baseUrl = process.env.BASE_URL || 'https://test-lien.photo-ac.com';
  const nodeVersion = process.version;
  const playwrightVersion = getPackageVersion('@playwright/test');
  const allureVersion = getPackageVersion('allure-playwright');
  const runDate = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  // environment.properties content — Allure reads this for the dashboard widget
  const content = [
    `Project=Photo AC`,
    `Environment=${env}`,
    `URL=${baseUrl}`,
    `Node.js=${nodeVersion}`,
    `Playwright=${playwrightVersion}`,
    `AllureVersion=${allureVersion}`,
    `RunDate=${runDate}`,
    `OS=${process.platform}`,
  ].join('\n');

  const envPropsPath = path.join(allureResultsDir, 'environment.properties');
  fs.writeFileSync(envPropsPath, content, 'utf-8');

  console.log(`[global-setup] environment.properties written to: ${envPropsPath}`);
}

/**
 * Read a package version from node_modules without importing the package.
 */
function getPackageVersion(packageName: string): string {
  try {
    const pkgPath = path.resolve(process.cwd(), 'node_modules', packageName, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as { version: string };
    return `v${pkg.version}`;
  } catch {
    return 'unknown';
  }
}

export default globalSetup;
