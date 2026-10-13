import { testConfig } from '../utils/config';
import { log } from '../utils/logger';
import { Locator, resolveLocator } from '../utils/platform';

const STALE_ELEMENT = /stale element|no longer attached/i;

/**
 * Shared interaction layer. Every interaction waits for the exact state it needs (no fixed sleeps)
 * and fails with a message that names the locator, so a red test says what was missing.
 */
export default class BasePage {
  protected async waitForVisible(locator: Locator, timeout = testConfig.waitTimeout) {
    const selector = resolveLocator(locator);
    const element = await $(selector);
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `Element not displayed within ${timeout}ms: ${selector}`
    });
    return element;
  }

  async tap(locator: Locator): Promise<void> {
    await this.retryOnStale(async () => {
      const element = await this.waitForVisible(locator);
      log.debug(`tap ${resolveLocator(locator)}`);
      await element.click();
    });
  }

  /** Taps the first match when the same locator is repeated (e.g. one "ADD TO CART" per product). */
  async tapFirst(locator: Locator): Promise<void> {
    const selector = resolveLocator(locator);
    await this.waitForVisible(locator);
    await this.retryOnStale(async () => {
      const elements = await $$(selector);
      log.debug(`tap first of ${elements.length}: ${selector}`);
      await elements[0].click();
    });
  }

  async enterText(locator: Locator, value: string): Promise<void> {
    await this.retryOnStale(async () => {
      const element = await this.waitForVisible(locator);
      log.debug(`enter text into ${resolveLocator(locator)}`);
      await element.setValue(value);
    });
  }

  /** True if the element becomes visible within the timeout; false otherwise. Never throws on absence. */
  async isVisible(locator: Locator, timeout = testConfig.waitTimeout): Promise<boolean> {
    try {
      await this.waitForVisible(locator, timeout);
      return true;
    } catch {
      return false;
    }
  }

  async textOf(locator: Locator): Promise<string> {
    const element = await this.waitForVisible(locator);
    return element.getText();
  }

  async count(locator: Locator): Promise<number> {
    const elements = await $$(resolveLocator(locator));
    return elements.length;
  }

  /** The Android soft keyboard can cover the control below the field; iOS does not need this. */
  async hideKeyboardIfShown(): Promise<void> {
    if (!driver.isAndroid) return;
    try {
      if (await driver.isKeyboardShown()) {
        await driver.hideKeyboard();
      }
    } catch (error) {
      log.debug(`Keyboard could not be hidden (ignored): ${String(error)}`);
    }
  }

  /**
   * React Native re-renders can invalidate an element between lookup and click. That one failure mode is
   * retried once; anything else is a genuine failure and is rethrown untouched.
   */
  private async retryOnStale<T>(action: () => Promise<T>, attempts = 2): Promise<T> {
    for (let attempt = 1; ; attempt++) {
      try {
        return await action();
      } catch (error) {
        if (attempt >= attempts || !STALE_ELEMENT.test(String(error))) {
          throw error;
        }
        log.warn(`Stale element, retrying (${attempt}/${attempts - 1})`);
      }
    }
  }
}
