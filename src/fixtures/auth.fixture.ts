/**
 * auth.fixture.ts — Authentication Fixture
 *
 * This module exports a helper to set up the authenticated storageState path.
 * The actual login is performed by auth.setup.ts (run as a "setup" project).
 *
 * Usage:
 * - auth.setup.ts: runs before tests to create .auth/user.json
 * - playwright.config.ts: browsers use storageState: '.auth/user.json'
 * - Tests automatically start in an authenticated state
 */

import * as path from 'path';
import * as fs from 'fs';

/** Path to the persisted downloader authentication state file (Chromium) */
export const DOWNLOADER_AUTH_STATE_PATH = path.resolve('.auth', 'downloader.json');

/** Path to the persisted creator authentication state file (Chromium) */
export const CREATOR_AUTH_STATE_PATH = path.resolve('.auth', 'creator.json');

/** Path to the persisted downloader authentication state file (Firefox) */
export const DOWNLOADER_AUTH_STATE_FIREFOX_PATH = path.resolve('.auth', 'downloader-firefox.json');

/** Path to the persisted creator authentication state file (Firefox) */
export const CREATOR_AUTH_STATE_FIREFOX_PATH = path.resolve('.auth', 'creator-firefox.json');

/**
 * Ensure the .auth directory exists.
 * Call this before saving storageState.
 */
export const ensureAuthDirExists = (): void => {
  const authDir = path.resolve('.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
};
