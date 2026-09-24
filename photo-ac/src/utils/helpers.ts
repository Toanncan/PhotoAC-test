/**
 * Common helper utilities for test automation.
 * Contains reusable pure functions for formatting, random data, and wait conditions.
 */

/**
 * Format a Date object to readable string (for logging/reporting).
 * @param date - Date object or undefined (defaults to now)
 * @param locale - Locale string (default: 'vi-VN')
 */
export const formatDate = (date: Date = new Date(), locale: string = 'vi-VN'): string => {
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Generate a random alphanumeric string.
 * @param length - Desired length (default: 8)
 */
export const randomString = (length: number = 8): string => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Generate a random integer between min and max (inclusive).
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Sleep for a given number of milliseconds.
 * USE ONLY when absolutely necessary (e.g., waiting for non-UI async events).
 * Prefer Playwright's built-in web-first assertions instead.
 * @param ms - Milliseconds to wait
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export const truncate = (str: string, maxLength: number = 50): string => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

/**
 * Normalize whitespace in a string (trim + collapse multiple spaces).
 */
export const normalizeWhitespace = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Pick a random element from an array.
 */
export const pickRandom = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Retry an async operation up to maxRetries times.
 * @param fn - Async function to retry
 * @param maxRetries - Maximum number of attempts
 * @param delayMs - Delay between retries in ms
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> => {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await sleep(delayMs);
      }
    }
  }
  throw lastError;
};
