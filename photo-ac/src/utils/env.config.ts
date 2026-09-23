import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file relative to project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Typed environment configuration object.
 * All values are read from environment variables — never hardcoded.
 */
export const envConfig = {
  /** Base URL of the application under test */
  baseUrl: process.env.BASE_URL || '',

  /** Premium user credentials (download member - Premium) */
  premiumUser: {
    email: (process.env.PREMIUM_USER_EMAIL || process.env.TEST_USER_EMAIL)!,
    password: (process.env.PREMIUM_USER_PASSWORD || process.env.TEST_USER_PASSWORD)!,
  },

  /** Legacy alias for backward compatibility */
  get testUser() {
    return this.premiumUser;
  },

  /** Free user credentials (download member - Free) */
  freeUser: {
    email: process.env.FREE_USER_EMAIL!,
    password: process.env.FREE_USER_PASSWORD!,
  },

  /** Creator credentials */
  creatorUser: {
    email: process.env.CREATOR_EMAIL!,
    password: process.env.CREATOR_PASSWORD!,
  },

  /** Admin credentials */
  adminUser: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },

  /** Gmail credentials (for email receipt verification) */
  gmailUser: {
    email: process.env.GMAIL_EMAIL,
    password: process.env.GMAIL_PASSWORD,
  },

  /** Current environment name */
  env: process.env.ENV as 'local' | 'staging' | 'production',

  /** Allure results directory */
  allureResultsDir: process.env.ALLURE_RESULTS_DIR,
} as const;

export type EnvConfig = typeof envConfig;

