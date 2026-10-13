/**
 * Cross-platform locator handling.
 *
 * Most elements in the sample app share one locator on both platforms, so page objects declare a plain
 * string. Where Android and iOS genuinely differ, a page object declares { android, ios } and the
 * base page resolves it against the live session (driver.isIOS), so no test or step needs an if/else.
 */
export type PlatformLocator = { android: string; ios: string };
export type Locator = string | PlatformLocator;

export const resolveLocator = (locator: Locator): string =>
  typeof locator === 'string' ? locator : driver.isIOS ? locator.ios : locator.android;

/**
 * Accessibility-id locator for the Sauce Labs sample app.
 * The app tags every element "test-<name>": in `content-desc` on Android and as the accessibility
 * identifier on iOS, so the same `~test-<name>` selector works on both.
 */
export const testId = (name: string): string => `~test-${name}`;

const escapeQuotes = (value: string): string => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

/** Matches any element whose visible text contains `text` (native syntax differs per platform). */
export const containsText = (text: string): PlatformLocator => ({
  android: `android=new UiSelector().textContains("${escapeQuotes(text)}")`,
  ios: `-ios predicate string:label CONTAINS "${escapeQuotes(text)}"`
});
