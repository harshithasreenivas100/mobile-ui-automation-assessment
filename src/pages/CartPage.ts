import BasePage from './BasePage';
import { testConfig } from '../utils/config';
import { testId } from '../utils/platform';

class CartPage extends BasePage {
  private readonly screen = testId('Cart Content');
  // The quantity box ("Amount") exists once per cart line and nowhere else in the app, so it is a
  // reliable per-item marker. "Item" is not used because the product list reuses that id.
  private readonly lineItem = testId('Amount');

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.screen);
  }

  /** Waits (up to WAIT_TIMEOUT) for the cart to reach `expected` lines and returns the count actually seen. */
  async waitForItemCount(expected: number): Promise<number> {
    await this.waitForVisible(this.screen);
    try {
      await driver.waitUntil(async () => (await this.count(this.lineItem)) === expected, {
        timeout: testConfig.waitTimeout,
        interval: 500
      });
    } catch {
      /* fall through: the caller asserts on the real count so the failure message is meaningful */
    }
    return this.count(this.lineItem);
  }
}

export default new CartPage();
