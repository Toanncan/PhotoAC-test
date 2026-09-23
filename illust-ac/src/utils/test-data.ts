/**
 * Test Data Generator
 * Generates unique, traceable test data for automation tests.
 * Format: [prefix]_[testName]_[timestamp]_[random]
 */

const getTimestamp = (): string => {
  return new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14); // YYYYMMDDHHmmss
};

const getRandomSuffix = (length: number = 4): string => {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
};

/**
 * Generate a unique, traceable email address.
 * @param testName - Short identifier for the test (e.g., 'login', 'register')
 * @returns Unique email like auto_login_20260709213700_A3F2@test.com
 */
export const generateEmail = (testName: string): string => {
  const sanitized = testName.toLowerCase().replace(/\s+/g, '_');
  return `auto_${sanitized}_${getTimestamp()}_${getRandomSuffix()}@test.com`;
};

/**
 * Generate a unique, traceable username.
 * @param testName - Short identifier for the test
 * @returns Unique username like auto_login_20260709213700_A3F2
 */
export const generateUsername = (testName: string): string => {
  const sanitized = testName.toLowerCase().replace(/\s+/g, '_');
  return `auto_${sanitized}_${getTimestamp()}_${getRandomSuffix()}`;
};

/**
 * Generate a random valid Vietnamese phone number.
 * @returns 10-digit phone string starting with 09x or 03x
 */
export const generatePhone = (): string => {
  const prefixes = ['090', '091', '092', '093', '094', '096', '097', '098',
    '032', '033', '034', '035', '036', '037', '038', '039'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 10_000_000).toString().padStart(7, '0');
  return `${prefix}${suffix}`;
};

/**
 * Generate a random password meeting common requirements.
 * @returns Password string with uppercase, lowercase, number, special char
 */
export const generatePassword = (): string => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*';
  const all = upper + lower + digits + special;

  const randomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)];
  const base = [
    randomChar(upper),
    randomChar(lower),
    randomChar(digits),
    randomChar(special),
    ...Array.from({ length: 8 }, () => randomChar(all)),
  ];

  // Shuffle
  return base.sort(() => Math.random() - 0.5).join('');
};

/**
 * Generate a random display name.
 * @param testName - Short identifier
 * @returns Display name like "Auto Test A3F2"
 */
export const generateDisplayName = (testName: string): string => {
  return `Auto ${testName} ${getRandomSuffix(4)}`;
};
