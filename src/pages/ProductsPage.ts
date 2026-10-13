import BasePage from './BasePage';
import { testId } from '../utils/platform';

class ProductsPage extends BasePage {
  private readonly title = testId('PRODUCTS');
  // One "ADD TO CART" per product; it flips to "REMOVE" once that product is in the cart.
  private readonly addToCartButton = testId('ADD TO CART');
  private readonly removeButton = testId('REMOVE');
  private readonly cartIcon = testId('Cart');

  async isProductsScreenVisible(): Promise<boolean> {
    return this.isVisible(this.title);
  }

  async addFirstProductToCart(): Promise<void> {
    await this.tapFirst(this.addToCartButton);
  }

  /**
   * The app exposes no id for the cart badge count (it is an unlabelled Text inside "test-Cart"), so
   * "added" is asserted through the button state change instead of by parsing badge text.
   */
  async isProductMarkedAsAdded(): Promise<boolean> {
    return this.isVisible(this.removeButton);
  }

  async openCart(): Promise<void> {
    await this.tap(this.cartIcon);
  }
}

export default new ProductsPage();
